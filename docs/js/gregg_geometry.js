/**
 * Gregg Shorthand Vector Geometry Engine
 * Coordinates use screen space (+x right, +y down), unit scale U = 1.0, baseline at y = 0.
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.GreggGeometry = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    const WORD_GAP = 1.35;
    const PERIOD_GAP = 0.55;
    const CURVE_SAMPLES = 28;
    const LINE_SAMPLES = 14;
    const CIRCLE_SAMPLES = 40;
    const DOT_VIRTUAL_LENGTH = 0.25;

    /**
     * Primitive stroke specifications.
     * Every stroke begins at (0, 0).
     */
    const STROKES = {
        // Forward convex arches (open DOWN -> concaveSide: 'cw')
        K: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'start',
            end: { x: 1.30, y: 0 }, cp1: { x: 0.35, y: -0.36 }, cp2: { x: 1.00, y: -0.42 }
        },
        G: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'start',
            end: { x: 2.60, y: 0 }, cp1: { x: 0.70, y: -0.62 }, cp2: { x: 2.05, y: -0.72 }
        },

        // Forward concave bowls (open UP -> concaveSide: 'ccw')
        R: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'start',
            end: { x: 1.30, y: 0 }, cp1: { x: 0.30, y: 0.42 }, cp2: { x: 0.95, y: 0.36 }
        },
        L: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'start',
            end: { x: 2.60, y: 0 }, cp1: { x: 0.55, y: 0.72 }, cp2: { x: 1.90, y: 0.62 }
        },

        // Horizontal straight lines
        N: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 1.15, y: 0 }
        },
        M: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 2.35, y: 0 }
        },
        MN: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 3.55, y: 0 }
        },

        // Upward diagonal straight lines (~32 deg)
        T: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 0.95, y: -0.58 }
        },
        D: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 1.95, y: -1.20 }
        },
        TED: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 2.95, y: -1.80 }
        },

        // Upward short TH curves
        TH: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'start',
            end: { x: 0.82, y: -0.58 }, cp1: { x: 0.12, y: -0.42 }, cp2: { x: 0.50, y: -0.62 }
        },
        TH2: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'start',
            end: { x: 0.82, y: -0.58 }, cp1: { x: 0.36, y: -0.05 }, cp2: { x: 0.72, y: -0.24 }
        },

        // Downward steep straight slashes (~65 deg)
        SH: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'end',
            end: { x: -0.28, y: 0.62 }
        },
        CH: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'end',
            end: { x: -0.60, y: 1.32 }
        },
        J: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'end',
            end: { x: -0.95, y: 2.08 }
        },

        // Downward left-curves '(' (open RIGHT -> concaveSide: 'ccw')
        S_L: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'end',
            end: { x: -0.22, y: 0.62 }, cp1: { x: -0.28, y: 0.16 }, cp2: { x: -0.36, y: 0.44 }
        },
        P: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'end',
            end: { x: -0.52, y: 1.42 }, cp1: { x: -0.62, y: 0.32 }, cp2: { x: -0.82, y: 0.98 }
        },
        B: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'end',
            end: { x: -0.88, y: 2.42 }, cp1: { x: -1.05, y: 0.55 }, cp2: { x: -1.40, y: 1.68 }
        },

        // Downward right-curves ')' (open LEFT -> concaveSide: 'cw')
        S_R: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'end',
            end: { x: -0.22, y: 0.62 }, cp1: { x: 0.08, y: 0.18 }, cp2: { x: 0.00, y: 0.46 }
        },
        F: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'end',
            end: { x: -0.52, y: 1.42 }, cp1: { x: 0.16, y: 0.38 }, cp2: { x: -0.02, y: 1.05 }
        },
        V: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'end',
            end: { x: -0.88, y: 2.42 }, cp1: { x: 0.28, y: 0.65 }, cp2: { x: -0.04, y: 1.80 }
        },

        // Modified & nasal consonants
        X: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'end',
            end: { x: 0.18, y: 0.62 }, cp1: { x: 0.28, y: 0.15 }, cp2: { x: 0.34, y: 0.42 }
        },
        NG: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 1.08, y: 0.44 }
        },
        NK: {
            kind: 'stroke', type: 'straight', concaveSide: null, baselineAnchor: 'start',
            end: { x: 2.15, y: 0.88 }
        },

        // Vowel hooks
        O: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'start', isVowel: true,
            end: { x: 0.48, y: -0.02 }, cp1: { x: -0.10, y: 0.58 }, cp2: { x: 0.48, y: 0.58 }
        },
        O_SIDE: {
            kind: 'stroke', type: 'curve', concaveSide: 'ccw', baselineAnchor: 'start', isVowel: true,
            end: { x: 0.18, y: 0.36 }, cp1: { x: -0.42, y: 0.02 }, cp2: { x: -0.40, y: 0.38 }
        },
        OO: {
            kind: 'stroke', type: 'curve', concaveSide: 'cw', baselineAnchor: 'start', isVowel: true,
            end: { x: 0.48, y: 0.02 }, cp1: { x: -0.02, y: -0.58 }, cp2: { x: 0.56, y: -0.58 }
        }
    };

    const CIRCLES = {
        A: { kind: 'circle', radius: 0.42, reverse: false, broken: false, ellipse: null },
        E: { kind: 'circle', radius: 0.16, reverse: false, broken: false, ellipse: null },
        AR: { kind: 'circle', radius: 0.42, reverse: true, broken: false, ellipse: null },
        ER: { kind: 'circle', radius: 0.16, reverse: true, broken: false, ellipse: null },
        ARS: { kind: 'circle', radius: 0.34, reverse: true, broken: false, ellipse: { major: 0.62, minor: 0.34 } },
        ERS: { kind: 'circle', radius: 0.18, reverse: true, broken: false, ellipse: { major: 0.36, minor: 0.18 } },
        I_DIPH: { kind: 'circle', radius: 0.44, reverse: false, broken: true, ellipse: null },
        Y_A: { kind: 'circle', radius: 0.18, reverse: false, broken: false, ellipse: { major: 0.48, minor: 0.18 } },
        Y_E: { kind: 'circle', radius: 0.11, reverse: false, broken: false, ellipse: { major: 0.32, minor: 0.11 } }
    };

    const COMPOSITES = {
        U_DIPH: ['E', 'OO'],
        OW_DIPH: ['A', 'OO'],
        OI_DIPH: ['O', 'E'],
        SES: ['S_R', 'S_L']
    };

    const MODIFIERS = new Set(['H', 'ING', 'INGS', 'PAST_T', 'DOT_A', 'PERIOD']);

    function vecLen(x, y) {
        return Math.hypot(x, y);
    }

    function normalize(v) {
        const len = Math.hypot(v.x, v.y);
        if (len < 1e-9) return { x: 1, y: 0 };
        return { x: v.x / len, y: v.y / len };
    }

    /**
     * Screen coords (+x right, +y down):
     * CW 90 deg rotation of (tx, ty) is (-ty, tx).
     * CCW 90 deg rotation of (tx, ty) is (ty, -tx).
     */
    function getNormal(tangent, side) {
        const t = normalize(tangent);
        if (side === 'cw') {
            return { x: -t.y, y: t.x };
        }
        return { x: t.y, y: -t.x };
    }

    function evalCubic(p0, cp1, cp2, p1, t) {
        const mt = 1 - t;
        const mt2 = mt * mt;
        const t2 = t * t;
        return {
            x: mt2 * mt * p0.x + 3 * mt2 * t * cp1.x + 3 * mt * t2 * cp2.x + t2 * t * p1.x,
            y: mt2 * mt * p0.y + 3 * mt2 * t * cp1.y + 3 * mt * t2 * cp2.y + t2 * t * p1.y
        };
    }

    function evalCubicTangent(p0, cp1, cp2, p1, t) {
        const mt = 1 - t;
        const dx = 3 * mt * mt * (cp1.x - p0.x) + 6 * mt * t * (cp2.x - cp1.x) + 3 * t * t * (p1.x - cp2.x);
        const dy = 3 * mt * mt * (cp1.y - p0.y) + 6 * mt * t * (cp2.y - cp1.y) + 3 * t * t * (p1.y - cp2.y);
        return normalize({ x: dx, y: dy });
    }

    function getStrokeStartTangent(spec) {
        if (spec.type === 'straight') {
            return normalize(spec.end);
        }
        return evalCubicTangent({ x: 0, y: 0 }, spec.cp1, spec.cp2, spec.end, 0.001);
    }

    function getStrokeEndTangent(spec) {
        if (spec.type === 'straight') {
            return normalize(spec.end);
        }
        return evalCubicTangent({ x: 0, y: 0 }, spec.cp1, spec.cp2, spec.end, 0.999);
    }

    function parseToken(raw) {
        if (typeof raw !== 'string') return null;
        const parts = raw.split(':');
        const base = parts[0];
        const explicitSide = (parts[1] === 'cw' || parts[1] === 'ccw') ? parts[1] : null;
        return { raw, base, explicitSide };
    }

    function expandTokens(rawTokens) {
        const expanded = [];
        for (const raw of rawTokens) {
            const parsed = parseToken(raw);
            if (!parsed) continue;
            if (COMPOSITES[parsed.base]) {
                for (const sub of COMPOSITES[parsed.base]) {
                    expanded.push(parseToken(sub));
                }
            } else {
                expanded.push(parsed);
            }
        }
        return expanded;
    }

    function sampleStroke(spec, startPos) {
        const points = [];
        if (spec.type === 'straight') {
            const tangent = normalize(spec.end);
            const angle = Math.atan2(tangent.y, tangent.x);
            for (let i = 0; i <= LINE_SAMPLES; i++) {
                const t = i / LINE_SAMPLES;
                points.push({
                    x: startPos.x + spec.end.x * t,
                    y: startPos.y + spec.end.y * t,
                    angle
                });
            }
        } else {
            const p0 = startPos;
            const cp1 = { x: startPos.x + spec.cp1.x, y: startPos.y + spec.cp1.y };
            const cp2 = { x: startPos.x + spec.cp2.x, y: startPos.y + spec.cp2.y };
            const p1 = { x: startPos.x + spec.end.x, y: startPos.y + spec.end.y };
            for (let i = 0; i <= CURVE_SAMPLES; i++) {
                const t = i / CURVE_SAMPLES;
                const pt = evalCubic(p0, cp1, cp2, p1, t);
                const tan = evalCubicTangent(p0, cp1, cp2, p1, Math.min(0.999, Math.max(0.001, t)));
                points.push({
                    x: pt.x,
                    y: pt.y,
                    angle: Math.atan2(tan.y, tan.x)
                });
            }
        }
        const endPos = {
            x: startPos.x + spec.end.x,
            y: startPos.y + spec.end.y
        };
        return { points, endPos };
    }

    function flipSide(side) {
        return side === 'cw' ? 'ccw' : 'cw';
    }

    /**
     * Resolves circle center, sweep direction, and sampled points at anchor point P.
     */
    function buildCirclePoints(circleSpec, anchorPos, prevStroke, nextStroke, explicitSide) {
        const isReverse = circleSpec.reverse;
        const r = circleSpec.ellipse ? circleSpec.ellipse.minor : circleSpec.radius;

        let center;
        let dir; // +1 for CW, -1 for CCW
        let uAxis = { x: 1, y: 0 };
        let vAxis = { x: 0, y: 1 };

        if (!prevStroke && !nextStroke) {
            // Standalone circle: sits on baseline y = 0, center at (0, -r)
            dir = isReverse ? 1 : -1;
            center = { x: anchorPos.x, y: anchorPos.y - r };
            if (explicitSide) {
                dir = explicitSide === 'cw' ? 1 : -1;
            }
            uAxis = { x: 1, y: 0 };
            vAxis = { x: 0, y: -1 };
        } else if (!prevStroke && nextStroke) {
            // Start of outline before nextStroke
            const tNext = getStrokeStartTangent(nextStroke);
            let side;
            if (explicitSide) {
                side = explicitSide;
            } else if (nextStroke.type === 'curve') {
                side = isReverse ? flipSide(nextStroke.concaveSide) : nextStroke.concaveSide;
            } else {
                side = isReverse ? 'ccw' : 'cw';
            }
            dir = side === 'cw' ? 1 : -1;
            const n = getNormal(tNext, side);
            center = { x: anchorPos.x + n.x * r, y: anchorPos.y + n.y * r };
            uAxis = tNext;
            vAxis = n;
        } else if (prevStroke && !nextStroke) {
            // End of outline after prevStroke
            const tPrev = getStrokeEndTangent(prevStroke);
            let side;
            if (explicitSide) {
                side = explicitSide;
            } else if (prevStroke.type === 'curve') {
                side = isReverse ? flipSide(prevStroke.concaveSide) : prevStroke.concaveSide;
            } else {
                side = isReverse ? 'ccw' : 'cw';
            }
            dir = side === 'cw' ? 1 : -1;
            const n = getNormal(tPrev, side);
            center = { x: anchorPos.x + n.x * r, y: anchorPos.y + n.y * r };
            uAxis = tPrev;
            vAxis = n;
        } else {
            // Between prevStroke and nextStroke
            const t1 = getStrokeEndTangent(prevStroke);
            const t2 = getStrokeStartTangent(nextStroke);

            if (prevStroke.type === 'curve' && nextStroke.type === 'curve') {
                if (prevStroke.concaveSide === nextStroke.concaveSide) {
                    const baseSide = prevStroke.concaveSide;
                    const side = explicitSide || (isReverse ? flipSide(baseSide) : baseSide);
                    dir = side === 'cw' ? 1 : -1;
                    const n1 = getNormal(t1, side);
                    const n2 = getNormal(t2, side);
                    const nAvg = normalize({ x: n1.x + n2.x, y: n1.y + n2.y });
                    center = { x: anchorPos.x + nAvg.x * r, y: anchorPos.y + nAvg.y * r };
                    uAxis = normalize({ x: t1.x + t2.x, y: t1.y + t2.y });
                    vAxis = nAvg;
                } else {
                    const baseSide = nextStroke.concaveSide;
                    const side = explicitSide || (isReverse ? flipSide(baseSide) : baseSide);
                    dir = side === 'cw' ? 1 : -1;
                    const n = getNormal(t2, side);
                    center = { x: anchorPos.x + n.x * r, y: anchorPos.y + n.y * r };
                    uAxis = t2;
                    vAxis = n;
                }
            } else if (prevStroke.type === 'curve' || nextStroke.type === 'curve') {
                const curve = prevStroke.type === 'curve' ? prevStroke : nextStroke;
                const tCurve = prevStroke.type === 'curve' ? t1 : t2;
                const baseSide = curve.concaveSide;
                const side = explicitSide || (isReverse ? flipSide(baseSide) : baseSide);
                dir = side === 'cw' ? 1 : -1;
                const n = getNormal(tCurve, side);
                center = { x: anchorPos.x + n.x * r, y: anchorPos.y + n.y * r };
                uAxis = tCurve;
                vAxis = n;
            } else {
                // Straight + Straight
                const dot = t1.x * t2.x + t1.y * t2.y;
                if (dot > 0.92) {
                    // Collinear straights
                    const side = explicitSide || (isReverse ? 'ccw' : 'cw');
                    dir = side === 'cw' ? 1 : -1;
                    const n = getNormal(t1, side);
                    center = { x: anchorPos.x + n.x * r, y: anchorPos.y + n.y * r };
                    uAxis = t1;
                    vAxis = n;
                } else {
                    // Angled straights: place circle OUTSIDE the angle along outward bisector (T1 - T2)
                    const z = t1.x * t2.y - t1.y * t2.x;
                    let bOut = normalize({ x: t1.x - t2.x, y: t1.y - t2.y });
                    dir = z < 0 ? 1 : -1;
                    if (explicitSide) {
                        dir = explicitSide === 'cw' ? 1 : -1;
                    } else if (isReverse) {
                        bOut = { x: -bOut.x, y: -bOut.y };
                        dir = -dir;
                    }
                    center = { x: anchorPos.x + bOut.x * r, y: anchorPos.y + bOut.y * r };
                    uAxis = normalize({ x: t1.x + t2.x, y: t1.y + t2.y });
                    vAxis = bOut;
                }
            }
        }

        const points = [];
        const samples = circleSpec.broken ? 48 : CIRCLE_SAMPLES;

        if (circleSpec.ellipse) {
            const a = circleSpec.ellipse.major;
            const b = circleSpec.ellipse.minor;
            // Align center along vAxis at distance b from anchorPos
            center = { x: anchorPos.x + vAxis.x * b, y: anchorPos.y + vAxis.y * b };
            // Sweep sign aligned so entry tangent matches uAxis
            const phiSign = dir * (uAxis.x * vAxis.y - uAxis.y * vAxis.x >= 0 ? 1 : -1);
            for (let i = 0; i <= samples; i++) {
                const t = i / samples;
                const phi = t * Math.PI * 2;
                const x = center.x + uAxis.x * (a * Math.sin(phi)) - vAxis.x * (b * Math.cos(phi));
                const y = center.y + uAxis.y * (a * Math.sin(phi)) - vAxis.y * (b * Math.cos(phi));
                const dx = uAxis.x * (a * Math.cos(phi)) + vAxis.x * (b * Math.sin(phi));
                const dy = uAxis.y * (a * Math.cos(phi)) + vAxis.y * (b * Math.sin(phi));
                points.push({ x, y, angle: Math.atan2(dy, dx), _phiSign: phiSign });
            }
            // Ensure start/end touch anchorPos cleanly
            points[0].x = anchorPos.x;
            points[0].y = anchorPos.y;
            points[points.length - 1].x = anchorPos.x;
            points[points.length - 1].y = anchorPos.y;
            return {
                points,
                center,
                radius: Math.max(a, b),
                minorRadius: b,
                majorRadius: a
            };
        }

        const startAngle = Math.atan2(anchorPos.y - center.y, anchorPos.x - center.x);
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const theta = startAngle + dir * t * Math.PI * 2;
            let rad = r;
            if (circleSpec.broken && t >= 0.72 && t <= 0.92) {
                const u = (t - 0.72) / 0.20;
                const indent = 0.45 * r * 0.5 * (1 - Math.cos(2 * Math.PI * u));
                rad = r - indent;
            }
            const x = center.x + rad * Math.cos(theta);
            const y = center.y + rad * Math.sin(theta);
            const tx = -dir * Math.sin(theta);
            const ty = dir * Math.cos(theta);
            points.push({ x, y, angle: Math.atan2(ty, tx) });
        }

        // Fix exact numerical tangents for broken dimple segment
        if (circleSpec.broken) {
            for (let i = 0; i < points.length; i++) {
                const prev = points[Math.max(0, i - 1)];
                const next = points[Math.min(points.length - 1, i + 1)];
                points[i].angle = Math.atan2(next.y - prev.y, next.x - prev.x);
            }
        }

        return {
            points,
            center,
            radius: r,
            minorRadius: r,
            majorRadius: r
        };
    }

    function computePathLengths(points) {
        let total = 0;
        const out = [];
        for (let i = 0; i < points.length; i++) {
            if (i > 0) {
                total += vecLen(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
            }
            out.push({
                x: points[i].x,
                y: points[i].y,
                angle: points[i].angle,
                s: total
            });
        }
        return { points: out, length: total };
    }

    /**
     * Builds geometry for a single word outline (array of stroke/circle/modifier tokens).
     */
    function buildOutlineGeometry(rawTokens) {
        if (!Array.isArray(rawTokens) || rawTokens.length === 0) {
            throw new Error('Outline must be a non-empty array of tokens');
        }

        const tokens = expandTokens(rawTokens);
        const primaryTokens = [];
        let hasH = false;
        let hasIng = false;
        let hasIngs = false;
        let hasPastT = false;
        let hasDotA = false;
        let hasPeriod = false;

        for (const tok of tokens) {
            if (MODIFIERS.has(tok.base)) {
                if (tok.base === 'H') hasH = true;
                else if (tok.base === 'ING') hasIng = true;
                else if (tok.base === 'INGS') hasIngs = true;
                else if (tok.base === 'PAST_T') hasPastT = true;
                else if (tok.base === 'DOT_A') hasDotA = true;
                else if (tok.base === 'PERIOD') hasPeriod = true;
            } else if (STROKES[tok.base] || CIRCLES[tok.base]) {
                primaryTokens.push(tok);
            } else {
                throw new Error(`Unknown Gregg stroke token: "${tok.raw}"`);
            }
        }

        const subpaths = [];
        const circles = [];
        const mainPoints = [];
        let cursor = { x: 0, y: 0 };
        let firstConsonantInfo = null;
        let firstVowelBounds = null;
        let onlyVowels = true;

        // Handle standalone modifier outlines (e.g. DOT_A, PERIOD, H, ING)
        if (primaryTokens.length === 0) {
            if (hasDotA) {
                subpaths.push({
                    points: [{ x: 0, y: 0, angle: 0, s: 0 }],
                    length: DOT_VIRTUAL_LENGTH,
                    isDot: true,
                    token: 'DOT_A'
                });
            } else if (hasH) {
                subpaths.push({
                    points: [{ x: 0, y: -0.78, angle: 0, s: 0 }],
                    length: DOT_VIRTUAL_LENGTH,
                    isDot: true,
                    token: 'H'
                });
            } else if (hasIng) {
                subpaths.push({
                    points: [{ x: 0, y: 0.26, angle: 0, s: 0 }],
                    length: DOT_VIRTUAL_LENGTH,
                    isDot: true,
                    token: 'ING'
                });
            } else if (hasPeriod) {
                const pPts = [];
                for (let i = 0; i <= 8; i++) {
                    const t = i / 8;
                    pPts.push({ x: 0.26 * t, y: -0.14 + 0.28 * t, angle: Math.atan2(0.28, 0.26) });
                }
                const res = computePathLengths(pPts);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'PERIOD' });
            } else if (hasPastT) {
                const sampled = sampleStroke(STROKES.T, { x: 0, y: 0 });
                const res = computePathLengths(sampled.points);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'PAST_T' });
            } else if (hasIngs) {
                const sampled = sampleStroke(STROKES.S_L, { x: 0, y: 0 });
                const res = computePathLengths(sampled.points);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'INGS' });
            }
        } else {
            for (let i = 0; i < primaryTokens.length; i++) {
                const tok = primaryTokens[i];
                if (STROKES[tok.base]) {
                    const spec = STROKES[tok.base];
                    const sampled = sampleStroke(spec, cursor);
                    if (!spec.isVowel) {
                        onlyVowels = false;
                        if (!firstConsonantInfo) {
                            firstConsonantInfo = {
                                spec,
                                start: { x: cursor.x, y: cursor.y },
                                end: { x: sampled.endPos.x, y: sampled.endPos.y }
                            };
                        }
                    } else if (!firstVowelBounds) {
                        let minY = Infinity;
                        let sumX = 0;
                        for (const p of sampled.points) {
                            if (p.y < minY) minY = p.y;
                            sumX += p.x;
                        }
                        firstVowelBounds = {
                            cx: sumX / sampled.points.length,
                            topY: minY
                        };
                    }
                    if (mainPoints.length === 0) {
                        mainPoints.push(...sampled.points);
                    } else {
                        mainPoints.push(...sampled.points.slice(1));
                    }
                    cursor = sampled.endPos;
                } else if (CIRCLES[tok.base]) {
                    const circleSpec = CIRCLES[tok.base];
                    let prevStroke = null;
                    for (let j = i - 1; j >= 0; j--) {
                        if (STROKES[primaryTokens[j].base]) {
                            prevStroke = STROKES[primaryTokens[j].base];
                            break;
                        }
                    }
                    let nextStroke = null;
                    for (let j = i + 1; j < primaryTokens.length; j++) {
                        if (STROKES[primaryTokens[j].base]) {
                            nextStroke = STROKES[primaryTokens[j].base];
                            break;
                        }
                    }
                    const built = buildCirclePoints(circleSpec, cursor, prevStroke, nextStroke, tok.explicitSide);
                    const cMeta = {
                        token: tok.base,
                        cx: built.center.x,
                        cy: built.center.y,
                        r: built.radius,
                        minorR: built.minorRadius,
                        majorR: built.majorRadius,
                        reverse: circleSpec.reverse
                    };
                    circles.push(cMeta);

                    if (!firstVowelBounds) {
                        firstVowelBounds = {
                            cx: built.center.x,
                            topY: built.center.y - built.radius
                        };
                    }

                    if (mainPoints.length === 0) {
                        mainPoints.push(...built.points);
                    } else {
                        mainPoints.push(...built.points.slice(1));
                    }
                }
            }

            if (mainPoints.length > 0) {
                const res = computePathLengths(mainPoints);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'MAIN' });
            }

            // Compute stroke-derived bounds for fallback H placement
            let strokeMinY = Infinity;
            let strokeMinX = Infinity;
            let strokeMaxX = -Infinity;
            for (const p of mainPoints) {
                if (p.y < strokeMinY) strokeMinY = p.y;
                if (p.x < strokeMinX) strokeMinX = p.x;
                if (p.x > strokeMaxX) strokeMaxX = p.x;
            }

            const endPt = mainPoints[mainPoints.length - 1] || { x: 0, y: 0 };

            if (hasH) {
                const hx = firstVowelBounds ? firstVowelBounds.cx : (strokeMinX + strokeMaxX) / 2;
                const hy = (firstVowelBounds ? firstVowelBounds.topY : strokeMinY) - 0.28;
                subpaths.push({
                    points: [{ x: hx, y: hy, angle: 0, s: 0 }],
                    length: DOT_VIRTUAL_LENGTH,
                    isDot: true,
                    token: 'H'
                });
            }
            if (hasIng) {
                subpaths.push({
                    points: [{ x: endPt.x + 0.28, y: endPt.y + 0.16, angle: 0, s: 0 }],
                    length: DOT_VIRTUAL_LENGTH,
                    isDot: true,
                    token: 'ING'
                });
            }
            if (hasIngs) {
                const startPt = { x: endPt.x + 0.30, y: endPt.y - 0.18 };
                const sampled = sampleStroke(STROKES.S_L, startPt);
                const res = computePathLengths(sampled.points);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'INGS' });
            }
            if (hasPastT) {
                const startPt = { x: endPt.x + 0.26, y: endPt.y + 0.16 };
                const sampled = sampleStroke(STROKES.T, startPt);
                const res = computePathLengths(sampled.points);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'PAST_T' });
            }
            if (hasPeriod) {
                const px = endPt.x + 0.35;
                const pPts = [];
                for (let i = 0; i <= 8; i++) {
                    const t = i / 8;
                    pPts.push({ x: px + 0.26 * t, y: -0.14 + 0.28 * t, angle: Math.atan2(0.28, 0.26) });
                }
                const res = computePathLengths(pPts);
                subpaths.push({ points: res.points, length: res.length, isDot: false, token: 'PERIOD' });
            }
        }

        // Compute raw bounding box (x from all subpaths, y baseline shift from primary consonant rule)
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        for (const sp of subpaths) {
            for (const p of sp.points) {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            }
        }

        let shiftY = 0;
        if (firstConsonantInfo) {
            if (firstConsonantInfo.spec.baselineAnchor === 'end') {
                shiftY = -firstConsonantInfo.end.y;
            } else {
                shiftY = -firstConsonantInfo.start.y;
            }
        } else if (onlyVowels && primaryTokens.length > 0) {
            // Standalone vowel hooks rest with bottom near baseline
            if (STROKES[primaryTokens[0].base]) {
                shiftY = -maxY;
            }
        }

        const shiftX = -minX;

        for (const sp of subpaths) {
            for (const p of sp.points) {
                p.x += shiftX;
                p.y += shiftY;
            }
        }
        for (const c of circles) {
            c.cx += shiftX;
            c.cy += shiftY;
        }

        minX += shiftX;
        maxX += shiftX;
        minY += shiftY;
        maxY += shiftY;

        return {
            tokens: rawTokens,
            subpaths,
            circles,
            isPunctuationOnly: primaryTokens.length === 0 && hasPeriod && !hasDotA && !hasH && !hasIng,
            bounds: {
                minX,
                maxX,
                minY,
                maxY,
                width: Math.max(0, maxX - minX),
                height: Math.max(0, maxY - minY)
            }
        };
    }

    /**
     * Builds combined layout geometry for one or more word outlines (phrase/sentence).
     * @param {string[][]} outlines - Array of word token arrays, e.g. [['R', 'A', 'L']] or [['H', 'E'], ['W', 'E', 'L']]
     */
    function buildPhraseGeometry(outlines) {
        if (!Array.isArray(outlines) || outlines.length === 0) {
            throw new Error('outlines must be a non-empty array of token arrays');
        }

        const words = [];
        const allSubpaths = [];
        const allCircles = [];
        let cursorX = 0;
        let totalLength = 0;

        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;

        for (let wIdx = 0; wIdx < outlines.length; wIdx++) {
            const wordGeo = buildOutlineGeometry(outlines[wIdx]);
            const gap = wIdx === 0 ? 0 : (wordGeo.isPunctuationOnly ? PERIOD_GAP : WORD_GAP);
            const offsetX = wIdx === 0 ? 0 : cursorX + gap;

            for (const sp of wordGeo.subpaths) {
                const shiftedPts = sp.points.map(p => ({
                    x: p.x + offsetX,
                    y: p.y,
                    angle: p.angle,
                    s: p.s
                }));
                for (const p of shiftedPts) {
                    if (p.x < minX) minX = p.x;
                    if (p.x > maxX) maxX = p.x;
                    if (p.y < minY) minY = p.y;
                    if (p.y > maxY) maxY = p.y;
                }
                const subpathEntry = {
                    points: shiftedPts,
                    length: sp.length,
                    isDot: sp.isDot,
                    token: sp.token,
                    startOffset: totalLength,
                    wordIndex: wIdx
                };
                allSubpaths.push(subpathEntry);
                totalLength += sp.length;
            }

            for (const c of wordGeo.circles) {
                allCircles.push({
                    ...c,
                    cx: c.cx + offsetX,
                    wordIndex: wIdx
                });
            }

            words.push({
                wordIndex: wIdx,
                offsetX,
                bounds: {
                    ...wordGeo.bounds,
                    minX: wordGeo.bounds.minX + offsetX,
                    maxX: wordGeo.bounds.maxX + offsetX
                }
            });

            cursorX = offsetX + Math.max(0.25, wordGeo.bounds.width);
        }

        if (!Number.isFinite(minX)) {
            minX = 0; maxX = 0; minY = 0; maxY = 0;
        }

        return {
            words,
            subpaths: allSubpaths,
            circles: allCircles,
            totalLength,
            bounds: {
                minX,
                maxX,
                minY,
                maxY,
                width: Math.max(0, maxX - minX),
                height: Math.max(0, maxY - minY)
            }
        };
    }

    return {
        STROKES,
        CIRCLES,
        COMPOSITES,
        MODIFIERS,
        WORD_GAP,
        buildOutlineGeometry,
        buildPhraseGeometry
    };
}));
