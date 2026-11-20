/**
 * High-DPI HTML5 Canvas Renderer for Gregg Shorthand (Static & Animated).
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./gregg_geometry.js'));
    } else {
        root.GreggCanvasRenderer = factory(root.GreggGeometry);
    }
}(typeof self !== 'undefined' ? self : this, function (GreggGeometry) {
    'use strict';

    const SPEED_UNITS_PER_SEC = {
        slow: 2.2,
        normal: 3.8,
        fast: 6.2
    };

    const LIFT_PAUSE_MS = {
        slow: 180,
        normal: 115,
        fast: 70
    };

    const THEMES = {
        light: {
            bg: '#fdfbf7',
            ruleLine: '#cbd5e1',
            baseline: '#94a3b8',
            baselineLabel: '#64748b',
            centerGuide: 'rgba(148, 163, 184, 0.35)',
            ghost: '#cbd5e1',
            ink: '#0f172a',
            startDot: '#2563eb',
            startRing: '#ffffff',
            penDot: '#e11d48',
            chevron: '#38bdf8',
            guideChevron: 'rgba(59, 130, 246, 0.72)'
        },
        dark: {
            bg: '#161b26',
            ruleLine: '#273247',
            baseline: '#475569',
            baselineLabel: '#64748b',
            centerGuide: 'rgba(100, 116, 139, 0.25)',
            ghost: '#334155',
            ink: '#f8fafc',
            startDot: '#60a5fa',
            startRing: '#0f172a',
            penDot: '#fb7185',
            chevron: '#7dd3fc',
            guideChevron: 'rgba(96, 165, 250, 0.72)'
        }
    };

    function getCanvasLogicalSize(canvas, options) {
        const defaultW = options.compact ? 280 : 660;
        const defaultH = options.compact ? 150 : 220;
        const rect = (canvas && typeof canvas.getBoundingClientRect === 'function')
            ? canvas.getBoundingClientRect()
            : { width: 0, height: 0 };
        const width = options.width || (rect.width > 10 ? rect.width : (canvas && canvas.width > 0 ? canvas.width : defaultW));
        const height = options.height || (rect.height > 10 ? rect.height : (canvas && canvas.height > 0 ? canvas.height : defaultH));
        return { width, height };
    }

    function computeGeometryScale(geometry, width, height, compact) {
        const refScale = height * (compact ? 0.20 : 0.22);
        const padX = compact ? 18 : 34;
        const padTop = compact ? 14 : 22;
        const padBottom = compact ? 14 : 22;
        const baselineY = height * 0.58;

        const drawW = Math.max(40, width - padX * 2);
        const availAbove = Math.max(20, baselineY - padTop);
        const availBelow = Math.max(20, height - padBottom - baselineY);

        const b = geometry.bounds;
        const scaleX = b.width > 0.05 ? drawW / b.width : refScale;
        const topNeed = b.minY < -0.05 ? -b.minY : 0.05;
        const botNeed = b.maxY > 0.05 ? b.maxY : 0.05;
        const scaleAbove = availAbove / topNeed;
        const scaleBelow = availBelow / botNeed;

        return Math.max(6, Math.min(refScale, scaleX, scaleAbove, scaleBelow));
    }

    function computeIdealScale(outlines, width, height, compact) {
        const geo = GreggGeometry.buildPhraseGeometry(outlines);
        return computeGeometryScale(geo, width, height, Boolean(compact));
    }

    function interpolatePointAtDist(points, targetS) {
        if (!points || points.length === 0) return { x: 0, y: 0, angle: 0 };
        if (points.length === 1 || targetS <= 0) return points[0];
        const last = points[points.length - 1];
        if (targetS >= last.s) return last;

        let lo = 0;
        let hi = points.length - 1;
        while (lo + 1 < hi) {
            const mid = (lo + hi) >> 1;
            if (points[mid].s <= targetS) lo = mid;
            else hi = mid;
        }
        const a = points[lo];
        const b = points[hi];
        const span = b.s - a.s;
        const t = span > 1e-6 ? (targetS - a.s) / span : 0;
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t,
            angle: a.angle
        };
    }

    class StrokeCanvas {
        constructor(canvas, outlines, options = {}) {
            this.canvas = canvas;
            this.outlines = outlines;
            this.options = {
                mode: options.mode || 'animated',
                speed: options.speed || 'normal',
                showDirectionGuides: options.showDirectionGuides !== false,
                darkMode: Boolean(options.darkMode),
                forcedScale: options.forcedScale || null,
                compact: Boolean(options.compact),
                width: options.width || null,
                height: options.height || null,
                onComplete: typeof options.onComplete === 'function' ? options.onComplete : null
            };

            this.geometry = GreggGeometry.buildPhraseGeometry(outlines);
            this._rafId = null;
            this._destroyed = false;
            this._animState = null;

            this._setupCanvas();

            if (this.options.mode === 'animated') {
                this.play();
            } else {
                this.renderStatic();
            }
        }

        _setupCanvas() {
            const size = getCanvasLogicalSize(this.canvas, this.options);
            this.logicalWidth = size.width;
            this.logicalHeight = size.height;

            const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;
            this.dpr = dpr;

            if (this.canvas) {
                this.canvas.width = Math.round(this.logicalWidth * dpr);
                this.canvas.height = Math.round(this.logicalHeight * dpr);
                if (this.canvas.style) {
                    this.canvas.style.width = `${this.logicalWidth}px`;
                    this.canvas.style.maxWidth = '100%';
                    this.canvas.style.height = 'auto';
                }
                this.ctx = this.canvas.getContext ? this.canvas.getContext('2d') : null;
            }

            this.baselineY = this.logicalHeight * 0.58;
            const idealScale = computeGeometryScale(
                this.geometry,
                this.logicalWidth,
                this.logicalHeight,
                this.options.compact
            );
            this.scale = this.options.forcedScale ? Math.min(idealScale, this.options.forcedScale) : idealScale;
            this.originX = (this.logicalWidth - this.geometry.bounds.width * this.scale) / 2 - this.geometry.bounds.minX * this.scale;
            this.originY = this.baselineY;
        }

        _toCanvas(pt) {
            return {
                x: this.originX + pt.x * this.scale,
                y: this.originY + pt.y * this.scale
            };
        }

        _theme() {
            return this.options.darkMode ? THEMES.dark : THEMES.light;
        }

        _drawStenoPad() {
            const ctx = this.ctx;
            if (!ctx) return;
            const theme = this._theme();
            const w = this.logicalWidth;
            const h = this.logicalHeight;
            const by = this.baselineY;
            const ruleOffset = h * 0.28;

            ctx.save();
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

            // Background fill
            ctx.fillStyle = theme.bg;
            ctx.fillRect(0, 0, w, h);

            // Top & bottom rule lines
            ctx.strokeStyle = theme.ruleLine;
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(0, by - ruleOffset);
            ctx.lineTo(w, by - ruleOffset);
            ctx.moveTo(0, by + ruleOffset);
            ctx.lineTo(w, by + ruleOffset);
            ctx.stroke();

            // Vertical dashed center guide
            ctx.strokeStyle = theme.centerGuide;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(w / 2, 10);
            ctx.lineTo(w / 2, h - 10);
            ctx.stroke();

            // Baseline
            ctx.setLineDash([]);
            ctx.strokeStyle = theme.baseline;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(0, by);
            ctx.lineTo(w, by);
            ctx.stroke();

            if (!this.options.compact) {
                ctx.fillStyle = theme.baselineLabel;
                ctx.font = '600 9px system-ui, -apple-system, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('STENO BASELINE', 12, by - 5);
            }

            ctx.restore();
        }

        _drawSubpathFull(sp, strokeColor, lineWidth, dotRadius) {
            const ctx = this.ctx;
            if (!ctx || sp.points.length === 0) return;

            ctx.save();
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            if (sp.isDot) {
                const c = this._toCanvas(sp.points[0]);
                ctx.fillStyle = strokeColor;
                ctx.beginPath();
                ctx.arc(c.x, c.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.beginPath();
                const p0 = this._toCanvas(sp.points[0]);
                ctx.moveTo(p0.x, p0.y);
                for (let i = 1; i < sp.points.length; i++) {
                    const p = this._toCanvas(sp.points[i]);
                    ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }
            ctx.restore();
        }

        _drawSubpathPartial(sp, localDist, strokeColor, lineWidth, dotRadius) {
            const ctx = this.ctx;
            if (!ctx || sp.points.length === 0) return null;

            ctx.save();
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

            if (sp.isDot) {
                const c = this._toCanvas(sp.points[0]);
                const progress = Math.min(1, Math.max(0.2, localDist / Math.max(0.01, sp.length)));
                ctx.fillStyle = strokeColor;
                ctx.beginPath();
                ctx.arc(c.x, c.y, dotRadius * progress, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                return { x: sp.points[0].x, y: sp.points[0].y, angle: 0 };
            }

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            const p0 = this._toCanvas(sp.points[0]);
            ctx.moveTo(p0.x, p0.y);

            let tip = sp.points[0];
            for (let i = 1; i < sp.points.length; i++) {
                const prev = sp.points[i - 1];
                const curr = sp.points[i];
                if (curr.s <= localDist) {
                    const pc = this._toCanvas(curr);
                    ctx.lineTo(pc.x, pc.y);
                    tip = curr;
                } else {
                    const segLen = curr.s - prev.s;
                    const t = segLen > 1e-6 ? Math.max(0, (localDist - prev.s) / segLen) : 0;
                    const interp = {
                        x: prev.x + (curr.x - prev.x) * t,
                        y: prev.y + (curr.y - prev.y) * t,
                        angle: curr.angle
                    };
                    const pi = this._toCanvas(interp);
                    ctx.lineTo(pi.x, pi.y);
                    tip = interp;
                    break;
                }
            }
            ctx.stroke();
            ctx.restore();
            return tip;
        }

        _drawStartDot(pt) {
            const ctx = this.ctx;
            if (!ctx || !pt) return;
            const theme = this._theme();
            const c = this._toCanvas(pt);
            const r = this.options.compact ? 3.5 : 4.6;

            ctx.save();
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            ctx.fillStyle = theme.startDot;
            ctx.strokeStyle = theme.startRing;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        _drawChevron(pt, angle, color, size) {
            const ctx = this.ctx;
            if (!ctx || !pt) return;
            const c = this._toCanvas(pt);

            ctx.save();
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            ctx.translate(c.x, c.y);
            ctx.rotate(angle);
            ctx.strokeStyle = color;
            ctx.lineWidth = this.options.compact ? 1.8 : 2.2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(-size * 0.7, -size * 0.65);
            ctx.lineTo(size * 0.45, 0);
            ctx.lineTo(-size * 0.7, size * 0.65);
            ctx.stroke();
            ctx.restore();
        }

        _drawPenTip(tipPt, isDot) {
            const ctx = this.ctx;
            if (!ctx || !tipPt) return;
            const theme = this._theme();
            const c = this._toCanvas(tipPt);
            const r = this.options.compact ? 4.0 : 5.2;

            if (!isDot) {
                const offsetDist = (this.options.compact ? 9 : 12) / this.scale;
                const chevronPt = {
                    x: tipPt.x + Math.cos(tipPt.angle) * offsetDist,
                    y: tipPt.y + Math.sin(tipPt.angle) * offsetDist
                };
                this._drawChevron(chevronPt, tipPt.angle, theme.chevron, this.options.compact ? 4.5 : 6.0);
            }

            ctx.save();
            ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            ctx.fillStyle = theme.penDot;
            ctx.strokeStyle = theme.startRing;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        _drawDirectionChevrons() {
            if (!this.options.showDirectionGuides) return;
            const theme = this._theme();
            const size = this.options.compact ? 4.0 : 5.0;

            for (const sp of this.geometry.subpaths) {
                if (sp.isDot || sp.length < 0.35) continue;
                const sampleCount = sp.length > 2.8 ? 2 : 1;
                for (let k = 1; k <= sampleCount; k++) {
                    const targetS = sp.length * (k / (sampleCount + 1));
                    const pt = interpolatePointAtDist(sp.points, targetS);
                    this._drawChevron(pt, pt.angle, theme.guideChevron, size);
                }
            }
        }

        _drawGhost() {
            const theme = this._theme();
            const lw = this.options.compact ? 2.4 : 3.2;
            const dr = this.options.compact ? 2.4 : 3.2;
            for (const sp of this.geometry.subpaths) {
                this._drawSubpathFull(sp, theme.ghost, lw, dr);
            }
        }

        renderStatic() {
            this._cancelRaf();
            if (!this.ctx || this._destroyed) return;
            const theme = this._theme();
            const lw = this.options.compact ? 2.5 : 3.4;
            const dr = this.options.compact ? 2.6 : 3.5;

            this._drawStenoPad();
            this._drawGhost();

            for (const sp of this.geometry.subpaths) {
                this._drawSubpathFull(sp, theme.ink, lw, dr);
            }

            this._drawDirectionChevrons();

            if (this.geometry.subpaths.length > 0 && this.geometry.subpaths[0].points.length > 0) {
                this._drawStartDot(this.geometry.subpaths[0].points[0]);
            }
        }

        play() {
            this._cancelRaf();
            if (!this.ctx || this._destroyed) return;

            const speedUnits = SPEED_UNITS_PER_SEC[this.options.speed] || SPEED_UNITS_PER_SEC.normal;
            const pauseMs = LIFT_PAUSE_MS[this.options.speed] || LIFT_PAUSE_MS.normal;
            const subpaths = this.geometry.subpaths;

            if (subpaths.length === 0) {
                this.renderStatic();
                return;
            }

            const state = {
                spIdx: 0,
                localDist: 0,
                pauseRemainingMs: 0,
                lastTs: null
            };
            this._animState = state;

            const step = (ts) => {
                if (this._destroyed || this.options.mode !== 'animated') return;
                if (state.lastTs === null) state.lastTs = ts;
                const dtMs = Math.min(50, Math.max(0, ts - state.lastTs));
                state.lastTs = ts;

                if (state.pauseRemainingMs > 0) {
                    state.pauseRemainingMs -= dtMs;
                } else {
                    const sp = subpaths[state.spIdx];
                    state.localDist += (speedUnits * dtMs) / 1000;
                    if (state.localDist >= sp.length) {
                        state.localDist = sp.length;
                        if (state.spIdx < subpaths.length - 1) {
                            state.spIdx++;
                            state.localDist = 0;
                            state.pauseRemainingMs = pauseMs;
                        } else {
                            this.renderStatic();
                            if (this.options.onComplete) {
                                this.options.onComplete();
                            }
                            return;
                        }
                    }
                }

                this._renderFrame(state.spIdx, state.localDist);

                if (typeof requestAnimationFrame === 'function') {
                    this._rafId = requestAnimationFrame(step);
                }
            };

            this._renderFrame(0, 0.01);
            if (typeof requestAnimationFrame === 'function') {
                this._rafId = requestAnimationFrame(step);
            } else {
                this.renderStatic();
            }
        }

        _renderFrame(activeIdx, localDist) {
            const theme = this._theme();
            const lw = this.options.compact ? 2.5 : 3.4;
            const dr = this.options.compact ? 2.6 : 3.5;

            this._drawStenoPad();
            this._drawGhost();

            const subpaths = this.geometry.subpaths;
            for (let i = 0; i < activeIdx; i++) {
                this._drawSubpathFull(subpaths[i], theme.ink, lw, dr);
            }

            const activeSp = subpaths[activeIdx];
            const tip = this._drawSubpathPartial(activeSp, localDist, theme.ink, lw, dr);

            // Start point dot of the active word (and first word)
            if (subpaths[0].points.length > 0) {
                this._drawStartDot(subpaths[0].points[0]);
            }
            const activeWordIdx = activeSp.wordIndex;
            const activeWordStartSp = subpaths.find(s => s.wordIndex === activeWordIdx && !s.isDot);
            if (activeWordStartSp && activeWordStartSp !== subpaths[0] && activeWordStartSp.points.length > 0) {
                this._drawStartDot(activeWordStartSp.points[0]);
            }

            this._drawPenTip(tip, activeSp.isDot);
        }

        setMode(mode) {
            this.options.mode = mode;
            if (mode === 'animated') {
                this.play();
            } else {
                this.renderStatic();
            }
        }

        setSpeed(speed) {
            this.options.speed = speed;
        }

        setDarkMode(isDark) {
            this.options.darkMode = Boolean(isDark);
            if (this.options.mode === 'static' || this._rafId === null) {
                this.renderStatic();
            }
        }

        setShowDirectionGuides(show) {
            this.options.showDirectionGuides = Boolean(show);
            if (this.options.mode === 'static' || this._rafId === null) {
                this.renderStatic();
            }
        }

        resize() {
            this._setupCanvas();
            if (this.options.mode === 'static' || this._rafId === null) {
                this.renderStatic();
            }
        }

        _cancelRaf() {
            if (this._rafId !== null && typeof cancelAnimationFrame === 'function') {
                cancelAnimationFrame(this._rafId);
            }
            this._rafId = null;
        }

        destroy() {
            this._destroyed = true;
            this._cancelRaf();
        }
    }

    return {
        StrokeCanvas,
        computeIdealScale,
        THEMES
    };
}));
