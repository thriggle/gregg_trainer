/**
 * Main UI Controller for Gregg Shorthand Trainer.
 */
(function () {
    'use strict';

    const store = window.GreggProgression.createStore();
    let currentView = 'quiz'; // 'quiz' | 'lessons'
    let roundActive = false;
    let currentRound = null;
    let lastItemId = null;
    let hintVisible = false;
    let activeCanvases = [];
    let modalCanvases = [];
    let pendingConfirmAction = null;
    let currentIntroLessonId = null;
    let currentLightboxCtx = null;
    let toastTimer = null;

    // DOM References
    const els = {
        contextBadge: document.getElementById('active-context-badge'),
        navLessonsBtn: document.getElementById('nav-lessons-btn'),
        navIntroBtn: document.getElementById('nav-intro-btn'),
        navSettingsBtn: document.getElementById('nav-settings-btn'),

        quizView: document.getElementById('quiz-view'),
        lessonsView: document.getElementById('lessons-view'),
        backToQuizBtn: document.getElementById('back-to-quiz-btn'),
        startCumulativeBtn: document.getElementById('start-cumulative-btn'),
        cumulativeSubtitle: document.getElementById('cumulative-subtitle'),
        lessonsList: document.getElementById('lessons-list'),

        stageTabs: document.getElementById('stage-tabs'),
        proficiencyStrip: document.getElementById('proficiency-strip'),
        proficiencyPips: document.getElementById('proficiency-pips'),
        proficiencyText: document.getElementById('proficiency-text'),

        quizModeBadge: document.getElementById('quiz-mode-badge'),
        difficultyStars: document.getElementById('difficulty-stars'),
        skipBtn: document.getElementById('skip-btn'),
        questionTitle: document.getElementById('question-title'),

        modeAnimatedBtn: document.getElementById('mode-animated-btn'),
        modeStaticBtn: document.getElementById('mode-static-btn'),
        replayAllBtn: document.getElementById('replay-all-btn'),
        hintToggleBtn: document.getElementById('hint-toggle-btn'),

        gameArea: document.getElementById('game-area'),
        hintBanner: document.getElementById('hint-banner'),
        hintText: document.getElementById('hint-text'),
        phoneticCode: document.getElementById('phonetic-code'),

        feedbackDeck: document.getElementById('feedback-deck'),
        feedbackBadge: document.getElementById('feedback-badge'),
        feedbackPoints: document.getElementById('feedback-points'),
        feedbackDetail: document.getElementById('feedback-detail'),
        unlockBanner: document.getElementById('unlock-banner'),
        unlockMessage: document.getElementById('unlock-message'),
        unlockCtaBtn: document.getElementById('unlock-cta-btn'),
        nextBtn: document.getElementById('next-btn'),

        ratio: document.getElementById('ratio'),
        totalRounds: document.getElementById('total-rounds'),
        streakVal: document.getElementById('streak-val'),
        bestStreakVal: document.getElementById('best-streak-val'),
        wins: document.getElementById('wins'),
        losses: document.getElementById('losses'),
        points: document.getElementById('points'),
        scoreDetails: document.getElementById('score-details'),
        toggleDetailsBtn: document.getElementById('toggle-details-btn'),
        toggleHistoryBtn: document.getElementById('toggle-history-btn'),
        resetScoreBtn: document.getElementById('reset-score-btn'),
        historySection: document.getElementById('history-section'),
        historyList: document.getElementById('history-list'),

        // Intro Modal
        introModal: document.getElementById('intro-modal'),
        closeIntroBtn: document.getElementById('close-intro-btn'),
        introLessonPill: document.getElementById('intro-lesson-pill'),
        introModalTitle: document.getElementById('intro-modal-title'),
        introSummary: document.getElementById('intro-summary'),
        introRulesList: document.getElementById('intro-rules-list'),
        introStrokesGrid: document.getElementById('intro-strokes-grid'),
        introExamplesGrid: document.getElementById('intro-examples-grid'),
        introStartBtn: document.getElementById('intro-start-btn'),

        // Lightbox Modal
        lightboxModal: document.getElementById('lightbox-modal'),
        closeLightboxBtn: document.getElementById('close-lightbox-btn'),
        lightboxTitle: document.getElementById('lightbox-title'),
        lightboxSlowBtn: document.getElementById('lightbox-slow-btn'),
        lightboxNormalBtn: document.getElementById('lightbox-normal-btn'),
        lightboxStaticBtn: document.getElementById('lightbox-static-btn'),
        lightboxCanvas: document.getElementById('lightbox-canvas'),
        lightboxInfo: document.getElementById('lightbox-info'),

        // Settings Modal
        settingsModal: document.getElementById('settings-modal'),
        closeSettingsBtn: document.getElementById('close-settings-btn'),
        settingDarkMode: document.getElementById('setting-dark-mode'),
        settingDirectionGuides: document.getElementById('setting-direction-guides'),
        settingRenderMode: document.getElementById('setting-render-mode'),
        settingAnimSpeed: document.getElementById('setting-anim-speed'),
        settingMinDiff: document.getElementById('setting-min-diff'),
        settingMaxDiff: document.getElementById('setting-max-diff'),
        minDiffVal: document.getElementById('min-diff-val'),
        maxDiffVal: document.getElementById('max-diff-val'),
        settingQuizTypes: document.getElementById('setting-quiz-types'),
        settingWindowSize: document.getElementById('setting-window-size'),
        settingThreshold: document.getElementById('setting-threshold'),
        settingsLessonResets: document.getElementById('settings-lesson-resets'),
        settingResetAllBtn: document.getElementById('setting-reset-all-btn'),

        // Confirm Modal
        confirmModal: document.getElementById('confirm-modal'),
        confirmTitle: document.getElementById('confirm-title'),
        confirmMessage: document.getElementById('confirm-message'),
        confirmCancelBtn: document.getElementById('confirm-cancel-btn'),
        confirmOkBtn: document.getElementById('confirm-ok-btn')
    };

    function showToast(msg) {
        const existing = document.querySelector('.toast-notice');
        if (existing) existing.remove();
        if (toastTimer) clearTimeout(toastTimer);

        const el = document.createElement('div');
        el.className = 'toast-notice';
        el.textContent = msg;
        document.body.appendChild(el);
        toastTimer = setTimeout(() => {
            el.remove();
        }, 2600);
    }

    function destroyActiveCanvases() {
        for (const c of activeCanvases) {
            if (c && typeof c.destroy === 'function') c.destroy();
        }
        activeCanvases = [];
    }

    function destroyModalCanvases() {
        for (const c of modalCanvases) {
            if (c && typeof c.destroy === 'function') c.destroy();
        }
        modalCanvases = [];
    }

    function applyTheme() {
        const isDark = Boolean(store.getSettings().darkMode);
        document.body.classList.toggle('dark-mode', isDark);
        for (const c of activeCanvases) c.setDarkMode(isDark);
        for (const c of modalCanvases) c.setDarkMode(isDark);
    }

    function syncRenderModeButtons() {
        const mode = store.getSettings().renderMode;
        els.modeAnimatedBtn.classList.toggle('active', mode === 'animated');
        els.modeStaticBtn.classList.toggle('active', mode === 'static');
    }

    function getActiveContext() {
        const state = store.getState();
        const sel = state.activeSelection;
        if (sel.mode === 'cumulative') {
            return {
                mode: 'cumulative',
                lessonId: null,
                stage: sel.cumulativeStage || 'all'
            };
        }

        let lesson = window.GreggCurriculum.getLessonById(sel.lessonId);
        if (!lesson || !store.isLessonUnlocked(lesson.id)) {
            lesson = window.GreggCurriculum.LESSONS[0];
        }
        let stage = sel.stage || 'strokes';
        if (!store.isStageUnlocked(lesson.id, stage)) {
            stage = 'strokes';
        }
        return {
            mode: 'lesson',
            lessonId: lesson.id,
            lesson,
            stage
        };
    }

    function updateHeaderBadge() {
        const ctx = getActiveContext();
        if (ctx.mode === 'cumulative') {
            const stageName = ctx.stage === 'all' ? 'All Unlocked' : window.GreggCurriculum.STAGE_LABELS[ctx.stage];
            els.contextBadge.textContent = `Cumulative Review · ${stageName}`;
            els.navIntroBtn.classList.add('hidden');
        } else {
            els.contextBadge.textContent = `Lesson ${ctx.lesson.number}: ${ctx.lesson.title} · ${window.GreggCurriculum.STAGE_LABELS[ctx.stage]}`;
            els.navIntroBtn.classList.remove('hidden');
        }
        els.navLessonsBtn.textContent = currentView === 'lessons' ? 'Quiz' : 'Lessons';
    }

    function renderStageTabs() {
        const ctx = getActiveContext();
        els.stageTabs.innerHTML = '';

        if (ctx.mode === 'cumulative') {
            els.proficiencyStrip.classList.add('hidden');
            const tabs = [
                { id: 'all', label: 'All Unlocked' },
                { id: 'strokes', label: '1. Strokes' },
                { id: 'words', label: '2. Words' },
                { id: 'phrases', label: '3. Phrases' }
            ];
            for (const t of tabs) {
                const count = store.getUnlockedItems(t.id).length;
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `stage-tab${ctx.stage === t.id ? ' active' : ''}`;
                btn.disabled = count === 0;
                btn.innerHTML = `<span>${t.label}</span><span>${count}</span>`;
                btn.onclick = () => {
                    store.setActiveSelection({ mode: 'cumulative', cumulativeStage: t.id });
                    renderStageTabs();
                    updateHeaderBadge();
                    startNewRound();
                };
                els.stageTabs.appendChild(btn);
            }
            return;
        }

        els.proficiencyStrip.classList.remove('hidden');
        for (const st of window.GreggCurriculum.STAGES) {
            const prof = store.getStageProficiency(ctx.lessonId, st);
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'stage-tab';
            if (ctx.stage === st) btn.classList.add('active');
            if (!prof.unlocked) btn.classList.add('locked');
            if (prof.mastered) btn.classList.add('mastered');

            let badgeText = '🔒';
            if (prof.mastered) {
                badgeText = '✓ Mastered';
            } else if (prof.unlocked) {
                badgeText = prof.attemptsInWindow > 0 ? `${prof.currentRate}%` : 'Unlocked';
            }

            btn.innerHTML = `<span>${window.GreggCurriculum.STAGE_LABELS[st]}</span><span>${badgeText}</span>`;
            btn.onclick = () => {
                if (!prof.unlocked) {
                    showToast(`Master the previous stage first (${prof.threshold}% over ${prof.windowSize} attempts).`);
                    return;
                }
                store.setActiveSelection({ mode: 'lesson', lessonId: ctx.lessonId, stage: st });
                renderStageTabs();
                renderProficiencyStrip();
                updateHeaderBadge();
                startNewRound();
            };
            els.stageTabs.appendChild(btn);
        }

        renderProficiencyStrip();
    }

    function renderProficiencyStrip() {
        const ctx = getActiveContext();
        if (ctx.mode !== 'lesson') {
            els.proficiencyStrip.classList.add('hidden');
            return;
        }
        els.proficiencyStrip.classList.remove('hidden');
        const prof = store.getStageProficiency(ctx.lessonId, ctx.stage);
        els.proficiencyPips.innerHTML = '';

        for (let i = 0; i < prof.windowSize; i++) {
            const pip = document.createElement('span');
            pip.className = 'prof-pip';
            if (i < prof.recentAttempts.length) {
                const ok = prof.recentAttempts[i];
                pip.classList.add(ok ? 'pass' : 'fail');
                pip.textContent = ok ? '✓' : '✗';
            } else {
                pip.textContent = '○';
            }
            els.proficiencyPips.appendChild(pip);
        }

        let unlockTargetName = '';
        if (ctx.stage === 'strokes') unlockTargetName = '2. Words';
        else if (ctx.stage === 'words') unlockTargetName = '3. Phrases';
        else {
            const nextLesson = window.GreggCurriculum.getLessonByNumber(ctx.lesson.number + 1);
            unlockTargetName = nextLesson ? `Lesson ${nextLesson.number}` : 'Mastery';
        }

        if (prof.mastered) {
            els.proficiencyText.textContent = `Trailing: ${prof.correctInWindow}/${prof.attemptsInWindow} (${prof.currentRate}%) — Mastered! ${unlockTargetName} unlocked ✓`;
        } else if (prof.attemptsInWindow < prof.windowSize) {
            els.proficiencyText.textContent = `Trailing: ${prof.correctInWindow}/${prof.attemptsInWindow} (${prof.currentRate}%) — Complete ${prof.windowSize} at ${prof.threshold}%+ to unlock ${unlockTargetName}`;
        } else {
            els.proficiencyText.textContent = `Trailing: ${prof.correctInWindow}/${prof.windowSize} (${prof.trailingRate}%) — Reach ${prof.threshold}% to unlock ${unlockTargetName}`;
        }
    }

    function createCanvasOptions(compact, extra = {}) {
        const settings = store.getSettings();
        return {
            mode: settings.renderMode,
            speed: settings.animSpeed,
            showDirectionGuides: settings.showDirectionGuides,
            darkMode: settings.darkMode,
            compact: Boolean(compact),
            ...extra
        };
    }

    function replayActiveCanvases() {
        for (const c of activeCanvases) {
            c.play();
        }
    }

    function setHintVisibility(visible) {
        hintVisible = visible;
        els.hintToggleBtn.classList.toggle('active', visible);
        if (!currentRound) {
            els.hintBanner.classList.add('hidden');
            return;
        }
        const hintSource = currentRound.quizType === 'yes-no'
            ? currentRound.displayedItem
            : currentRound.target;
        els.hintText.textContent = hintSource.hint;
        els.phoneticCode.textContent = hintSource.phonetic;
        els.hintBanner.classList.toggle('hidden', !visible);
    }

    function updateScoreBoard() {
        const { score, history } = store.getState();
        const total = score.wins + score.losses;
        const ratio = total === 0 ? 0 : Math.round((score.wins / total) * 100);
        els.ratio.textContent = ratio;
        els.totalRounds.textContent = total;
        els.streakVal.textContent = score.streak;
        els.bestStreakVal.textContent = score.bestStreak;
        els.wins.textContent = score.wins;
        els.losses.textContent = score.losses;
        els.points.textContent = score.points;

        els.historyList.innerHTML = '';
        for (const entry of history) {
            const li = document.createElement('li');
            li.className = entry.result;
            const pts = entry.pointsChange > 0 ? `+${entry.pointsChange}` : `${entry.pointsChange}`;
            const outcome = entry.result === 'win' ? 'Correct' : 'Missed';
            li.textContent = `[${entry.time}] ${outcome} (${pts} pts) — ${entry.label} [${entry.phonetic}] (${'⭐'.repeat(entry.difficulty)})`;
            els.historyList.appendChild(li);
        }
    }

    function startNewRound() {
        destroyActiveCanvases();
        const ctx = getActiveContext();
        const settings = store.getSettings();

        let pool;
        if (ctx.mode === 'cumulative') {
            pool = store.getUnlockedItems(ctx.stage);
        } else {
            pool = window.GreggCurriculum.getItemsForStage(ctx.lessonId, ctx.stage);
        }

        if (!pool || pool.length === 0) {
            els.gameArea.innerHTML = '<p class="muted-text">No items available for this selection yet.</p>';
            return;
        }

        currentRound = window.GreggQuizEngine.generateRound({
            pool,
            stage: ctx.stage,
            allowedQuizTypes: settings.allowedQuizTypes,
            itemStats: store.getState().itemStats,
            lastItemId,
            minDiff: settings.minDiff,
            maxDiff: settings.maxDiff
        });
        lastItemId = currentRound.target.id;
        roundActive = true;

        const qtInfo = window.GreggQuizEngine.QUIZ_TYPES.find(q => q.id === currentRound.quizType);
        els.quizModeBadge.textContent = qtInfo ? qtInfo.name : currentRound.quizType;
        els.difficultyStars.textContent = '⭐'.repeat(currentRound.difficulty);
        els.questionTitle.textContent = currentRound.question;
        els.skipBtn.classList.remove('hidden');
        els.feedbackDeck.classList.add('hidden');
        els.unlockBanner.classList.add('hidden');
        setHintVisibility(false);

        renderCurrentRound();
    }

    function makeOverlayActions(item, strokeCanvasGetter, isAnswerHidden) {
        const wrap = document.createElement('div');
        wrap.className = 'stage-overlay-actions';

        const replayBtn = document.createElement('button');
        replayBtn.type = 'button';
        replayBtn.className = 'mini-icon-btn';
        replayBtn.title = 'Replay stroke animation';
        replayBtn.textContent = '▶';
        replayBtn.onclick = (e) => {
            e.stopPropagation();
            const sc = strokeCanvasGetter();
            if (sc) sc.play();
        };

        const zoomBtn = document.createElement('button');
        zoomBtn.type = 'button';
        zoomBtn.className = 'mini-icon-btn';
        zoomBtn.title = 'Inspect outline in lightbox';
        zoomBtn.textContent = '🔍';
        zoomBtn.onclick = (e) => {
            e.stopPropagation();
            const revealed = !roundActive || !isAnswerHidden;
            openLightbox(item, revealed);
        };

        wrap.appendChild(replayBtn);
        wrap.appendChild(zoomBtn);
        return wrap;
    }

    function renderSingleCanvasStage(item, isAnswerHidden) {
        const stageDiv = document.createElement('div');
        stageDiv.className = 'canvas-stage';

        const canvas = document.createElement('canvas');
        const logicalW = Math.min(660, Math.max(300, els.gameArea.clientWidth || 640));
        const logicalH = 215;
        canvas.width = logicalW;
        canvas.height = logicalH;
        stageDiv.appendChild(canvas);

        const sc = new window.GreggCanvasRenderer.StrokeCanvas(
            canvas,
            item.outlines,
            createCanvasOptions(false, { width: logicalW, height: logicalH })
        );
        activeCanvases.push(sc);

        stageDiv.appendChild(makeOverlayActions(item, () => sc, isAnswerHidden));
        return stageDiv;
    }

    function renderCurrentRound() {
        els.gameArea.innerHTML = '';
        const round = currentRound;

        if (round.quizType === 'read-outline') {
            els.gameArea.appendChild(renderSingleCanvasStage(round.target, true));

            const grid = document.createElement('div');
            grid.className = 'choices-grid';
            const choiceControls = [];

            round.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'choice-btn';

                const textSpan = document.createElement('span');
                textSpan.textContent = opt.label;
                const keySpan = document.createElement('span');
                keySpan.className = 'choice-key';
                keySpan.textContent = String(idx + 1);

                btn.appendChild(textSpan);
                btn.appendChild(keySpan);
                grid.appendChild(btn);

                const isCorrect = opt.id === round.target.id;
                choiceControls.push({ item: opt, el: btn, isCorrect });

                btn.onclick = () => {
                    if (!roundActive) return;
                    finishRound(isCorrect, opt.label, () => {
                        choiceControls.forEach(c => {
                            c.el.disabled = true;
                            if (c.isCorrect) c.el.classList.add('is-correct');
                            else if (c.el === btn && !isCorrect) c.el.classList.add('is-wrong');
                        });
                    });
                };
            });

            round._keyChoices = choiceControls;
            els.gameArea.appendChild(grid);
            return;
        }

        if (round.quizType === 'yes-no') {
            els.gameArea.appendChild(renderSingleCanvasStage(round.displayedItem, true));

            const grid = document.createElement('div');
            grid.className = 'choices-grid two-col-yn';
            const choiceControls = [];

            ['Yes', 'No'].forEach((choice) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'choice-btn';

                const textSpan = document.createElement('span');
                textSpan.textContent = choice;
                const keySpan = document.createElement('span');
                keySpan.className = 'choice-key';
                keySpan.textContent = choice[0];

                btn.appendChild(textSpan);
                btn.appendChild(keySpan);
                grid.appendChild(btn);

                const isCorrect = choice === round.correctChoice;
                choiceControls.push({ choice, el: btn, isCorrect });

                btn.onclick = () => {
                    if (!roundActive) return;
                    finishRound(isCorrect, choice, () => {
                        choiceControls.forEach(c => {
                            c.el.disabled = true;
                            if (c.isCorrect) c.el.classList.add('is-correct');
                            else if (c.el === btn && !isCorrect) c.el.classList.add('is-wrong');
                        });
                    });
                };
            });

            round._ynChoices = choiceControls;
            els.gameArea.appendChild(grid);
            return;
        }

        if (round.quizType === 'find-outline') {
            const cardW = 260;
            const cardH = 150;
            const scales = round.options.map(opt =>
                window.GreggCanvasRenderer.computeIdealScale(opt.outlines, cardW, cardH, true)
            );
            const sharedScale = Math.min(...scales);

            const grid = document.createElement('div');
            grid.className = `cards-grid${round.options.length === 2 ? ' two-cards' : ''}`;
            const cardControls = [];

            round.options.forEach((opt, idx) => {
                const card = document.createElement('div');
                card.className = 'outline-card clickable';

                const stageDiv = document.createElement('div');
                stageDiv.className = 'canvas-stage';
                const canvas = document.createElement('canvas');
                canvas.width = cardW;
                canvas.height = cardH;
                stageDiv.appendChild(canvas);

                const sc = new window.GreggCanvasRenderer.StrokeCanvas(
                    canvas,
                    opt.outlines,
                    createCanvasOptions(true, { width: cardW, height: cardH, forcedScale: sharedScale })
                );
                activeCanvases.push(sc);

                stageDiv.appendChild(makeOverlayActions(opt, () => sc, true));

                const revealDiv = document.createElement('div');
                revealDiv.className = 'card-revealed-label hidden';
                revealDiv.innerHTML = `${opt.label}<span class="card-revealed-phonetic">${opt.phonetic}</span>`;

                const numHint = document.createElement('div');
                numHint.className = 'muted-text';
                numHint.style.textAlign = 'center';
                numHint.style.fontSize = '0.78rem';
                numHint.textContent = `Option ${idx + 1}`;

                card.appendChild(stageDiv);
                card.appendChild(numHint);
                card.appendChild(revealDiv);
                grid.appendChild(card);

                const isCorrect = opt.id === round.target.id;
                cardControls.push({ item: opt, el: card, revealDiv, numHint, isCorrect });

                card.onclick = () => {
                    if (!roundActive) return;
                    finishRound(isCorrect, opt.label, () => {
                        cardControls.forEach(c => {
                            c.el.classList.remove('clickable');
                            c.numHint.classList.add('hidden');
                            c.revealDiv.classList.remove('hidden');
                            if (c.isCorrect) c.el.classList.add('is-correct');
                            else if (c.el === card && !isCorrect) c.el.classList.add('is-wrong');
                        });
                    });
                };
            });

            round._cardChoices = cardControls;
            els.gameArea.appendChild(grid);
            return;
        }

        // match-three
        const cardW = 260;
        const cardH = 150;
        const scales = round.options.map(opt =>
            window.GreggCanvasRenderer.computeIdealScale(opt.outlines, cardW, cardH, true)
        );
        const sharedScale = Math.min(...scales);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        const matchControls = [];
        const selects = [];

        const submitWrap = document.createElement('div');
        submitWrap.className = 'match-submit-wrap';
        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = 'Submit Matches';
        submitBtn.disabled = true;
        submitWrap.appendChild(submitBtn);

        function updateDropdowns() {
            const chosen = selects.map(s => s.value).filter(Boolean);
            selects.forEach(select => {
                const currentVal = select.value;
                select.innerHTML = '<option value="">-- Select Outline --</option>';
                round.labelChoices.forEach(lbl => {
                    const o = document.createElement('option');
                    o.value = lbl;
                    o.textContent = lbl;
                    if (lbl === currentVal) {
                        o.selected = true;
                    } else if (chosen.includes(lbl)) {
                        o.disabled = true;
                    }
                    select.appendChild(o);
                });
            });
            submitBtn.disabled = chosen.length !== round.options.length;
        }

        round.options.forEach((opt) => {
            const card = document.createElement('div');
            card.className = 'outline-card';

            const stageDiv = document.createElement('div');
            stageDiv.className = 'canvas-stage';
            const canvas = document.createElement('canvas');
            canvas.width = cardW;
            canvas.height = cardH;
            stageDiv.appendChild(canvas);

            const sc = new window.GreggCanvasRenderer.StrokeCanvas(
                canvas,
                opt.outlines,
                createCanvasOptions(true, { width: cardW, height: cardH, forcedScale: sharedScale })
            );
            activeCanvases.push(sc);

            stageDiv.appendChild(makeOverlayActions(opt, () => sc, true));

            const select = document.createElement('select');
            select.className = 'card-select';
            select.addEventListener('change', updateDropdowns);
            selects.push(select);

            const revealDiv = document.createElement('div');
            revealDiv.className = 'card-revealed-label hidden';
            revealDiv.innerHTML = `${opt.label}<span class="card-revealed-phonetic">${opt.phonetic}</span>`;

            card.appendChild(stageDiv);
            card.appendChild(select);
            card.appendChild(revealDiv);
            grid.appendChild(card);

            matchControls.push({ item: opt, el: card, select, revealDiv });
        });

        updateDropdowns();

        submitBtn.onclick = () => {
            if (!roundActive) return;
            let allCorrect = true;
            matchControls.forEach(c => {
                c.isCorrect = c.select.value === c.item.label;
                if (!c.isCorrect) allCorrect = false;
            });

            finishRound(allCorrect, 'Match 3', () => {
                submitWrap.classList.add('hidden');
                matchControls.forEach(c => {
                    c.select.classList.add('hidden');
                    c.revealDiv.classList.remove('hidden');
                    c.el.classList.add(c.isCorrect ? 'is-correct' : 'is-wrong');
                });
            });
        };

        els.gameArea.appendChild(grid);
        els.gameArea.appendChild(submitWrap);
    }

    function finishRound(isCorrect, guessedLabel, uiRevealFn) {
        roundActive = false;
        els.skipBtn.classList.add('hidden');
        uiRevealFn();
        setHintVisibility(true);

        const ctx = getActiveContext();
        const recordLessonId = ctx.mode === 'lesson' ? ctx.lessonId : currentRound.target.lessonId;
        const recordStage = ctx.mode === 'lesson' ? ctx.stage : currentRound.target.stage;

        const res = store.recordAttempt(recordLessonId, recordStage, currentRound.target.id, isCorrect, {
            difficulty: currentRound.difficulty,
            label: currentRound.target.label,
            phonetic: currentRound.target.phonetic,
            guessed: guessedLabel,
            quizType: currentRound.quizType
        });

        els.feedbackBadge.textContent = isCorrect ? 'Correct!' : 'Incorrect';
        els.feedbackBadge.className = `status-tag ${isCorrect ? 'tag-correct' : 'tag-wrong'}`;
        els.feedbackPoints.textContent = res.pointsChange > 0
            ? `+${res.pointsChange} pts`
            : `${res.pointsChange} pts`;

        if (currentRound.quizType === 'yes-no') {
            const shown = currentRound.displayedItem;
            els.feedbackDetail.innerHTML = currentRound.isMatch
                ? `Yes — this outline reads <strong>${shown.label}</strong> (<code>${shown.phonetic}</code>). ${shown.hint}`
                : `No — this outline actually reads <strong>${shown.label}</strong> (<code>${shown.phonetic}</code>), not "${currentRound.target.label}".`;
        } else if (currentRound.quizType === 'match-three') {
            const summary = currentRound.options.map(o => `${o.label} (${o.phonetic})`).join(' · ');
            els.feedbackDetail.innerHTML = isCorrect
                ? `All three matched! ${summary}`
                : `Correct pairs: ${summary}`;
        } else {
            const t = currentRound.target;
            els.feedbackDetail.innerHTML = `<strong>${t.label}</strong> (<code>${t.phonetic}</code>) — ${t.hint}`;
        }

        if (res.newlyUnlocked && ctx.mode === 'lesson') {
            els.unlockBanner.classList.remove('hidden');
            els.unlockMessage.textContent = `🎉 Unlocked ${res.newlyUnlocked.label}!`;
            if (res.newlyUnlocked.type === 'stage') {
                els.unlockCtaBtn.textContent = `Continue to ${res.newlyUnlocked.label} →`;
                els.unlockCtaBtn.onclick = () => {
                    store.setActiveSelection({
                        mode: 'lesson',
                        lessonId: res.newlyUnlocked.lessonId,
                        stage: res.newlyUnlocked.stage
                    });
                    renderStageTabs();
                    updateHeaderBadge();
                    startNewRound();
                };
            } else {
                els.unlockCtaBtn.textContent = `Open Lesson ${res.newlyUnlocked.lessonNumber} Intro →`;
                els.unlockCtaBtn.onclick = () => {
                    selectLessonAndStart(res.newlyUnlocked.lessonId, 'strokes');
                };
            }
        } else {
            els.unlockBanner.classList.add('hidden');
        }

        els.feedbackDeck.classList.remove('hidden');
        renderStageTabs();
        updateScoreBoard();
    }

    function selectLessonAndStart(lessonId, stage) {
        store.setActiveSelection({ mode: 'lesson', lessonId, stage });
        switchView('quiz');
        const ls = store.getLessonState(lessonId);
        if (ls && !ls.introSeen) {
            openIntroModal(lessonId);
        }
        startNewRound();
    }

    function switchView(view) {
        currentView = view;
        if (view === 'lessons') {
            destroyActiveCanvases();
            els.quizView.classList.add('hidden');
            els.lessonsView.classList.remove('hidden');
            renderLessonsRoadmap();
        } else {
            els.lessonsView.classList.add('hidden');
            els.quizView.classList.remove('hidden');
            renderStageTabs();
        }
        updateHeaderBadge();
    }

    function renderLessonsRoadmap() {
        const unlockedCount = store.getUnlockedLessonCount();
        const unlockedItems = store.getUnlockedItems('all').length;
        els.cumulativeSubtitle.textContent = `${unlockedCount} of ${window.GreggCurriculum.LESSONS.length} lessons unlocked · ${unlockedItems} outlines ready for mixed practice.`;

        els.lessonsList.innerHTML = '';
        for (const lesson of window.GreggCurriculum.LESSONS) {
            const ls = store.getLessonState(lesson.id);
            const card = document.createElement('article');
            card.className = `lesson-card${ls.unlocked ? '' : ' locked'}`;

            const allMastered = window.GreggCurriculum.STAGES.every(s => ls.stages[s].mastered);
            const statusText = !ls.unlocked ? '🔒 Locked' : (allMastered ? '✓ Mastered' : 'In Progress');

            const top = document.createElement('div');
            top.className = 'lesson-card-top';
            top.innerHTML = `
                <div class="lesson-title-wrap">
                    <span class="lesson-num-badge">${lesson.number}</span>
                    <div>
                        <h3 class="lesson-card-title">${lesson.title}</h3>
                        <div class="lesson-substack">${lesson.substackRef}</div>
                    </div>
                </div>
                <span class="meta-pill">${statusText}</span>
            `;

            const chips = document.createElement('div');
            chips.className = 'token-chips';
            for (const tok of lesson.newTokens) {
                const span = document.createElement('span');
                span.className = 'token-chip';
                span.textContent = tok;
                chips.appendChild(span);
            }

            const stagesRow = document.createElement('div');
            stagesRow.className = 'lesson-stages-row';
            for (const st of window.GreggCurriculum.STAGES) {
                const prof = store.getStageProficiency(lesson.id, st);
                const pill = document.createElement('button');
                pill.type = 'button';
                pill.className = 'roadmap-stage-pill';
                if (!ls.unlocked || !prof.unlocked) pill.classList.add('locked');
                if (prof.mastered) pill.classList.add('mastered');

                const rightLabel = !ls.unlocked || !prof.unlocked
                    ? '🔒'
                    : (prof.mastered ? '✓' : `${prof.attemptsInWindow}/${prof.windowSize} (${prof.currentRate}%)`);
                pill.innerHTML = `<span>${window.GreggCurriculum.STAGE_LABELS[st]}</span><span>${rightLabel}</span>`;
                pill.onclick = () => {
                    if (!ls.unlocked || !prof.unlocked) {
                        showToast('Complete prior stages to unlock this stage.');
                        return;
                    }
                    selectLessonAndStart(lesson.id, st);
                };
                stagesRow.appendChild(pill);
            }

            const actions = document.createElement('div');
            actions.className = 'lesson-card-actions';

            const introBtn = document.createElement('button');
            introBtn.type = 'button';
            introBtn.className = 'btn btn-secondary btn-sm';
            introBtn.textContent = 'Intro Guide';
            introBtn.onclick = () => openIntroModal(lesson.id);

            const practiceBtn = document.createElement('button');
            practiceBtn.type = 'button';
            practiceBtn.className = 'btn btn-primary btn-sm';
            practiceBtn.textContent = ls.unlocked ? 'Practice' : 'Locked';
            practiceBtn.disabled = !ls.unlocked;
            practiceBtn.onclick = () => {
                // Pick highest unlocked non-mastered stage, or strokes
                let targetStage = 'strokes';
                for (const st of window.GreggCurriculum.STAGES) {
                    if (ls.stages[st].unlocked && !ls.stages[st].mastered) {
                        targetStage = st;
                        break;
                    }
                }
                selectLessonAndStart(lesson.id, targetStage);
            };

            actions.appendChild(introBtn);
            actions.appendChild(practiceBtn);

            if (ls.unlocked) {
                const resetBtn = document.createElement('button');
                resetBtn.type = 'button';
                resetBtn.className = 'btn btn-danger-outline btn-sm';
                resetBtn.textContent = 'Reset Lesson';
                resetBtn.onclick = () => confirmResetLesson(lesson);
                actions.appendChild(resetBtn);
            }

            card.appendChild(top);
            card.appendChild(chips);
            card.appendChild(stagesRow);
            card.appendChild(actions);
            els.lessonsList.appendChild(card);
        }
    }

    function openIntroModal(lessonId) {
        const lesson = window.GreggCurriculum.getLessonById(lessonId);
        if (!lesson) return;

        destroyModalCanvases();
        currentIntroLessonId = lesson.id;
        const ls = store.getLessonState(lesson.id);
        const isUnlocked = Boolean(ls && ls.unlocked);

        els.introLessonPill.textContent = `Lesson ${lesson.number} · ${lesson.substackRef}`;
        els.introModalTitle.textContent = lesson.title;
        els.introSummary.textContent = lesson.intro.summary;

        els.introRulesList.innerHTML = '';
        for (const rule of lesson.intro.rules) {
            const li = document.createElement('li');
            li.textContent = rule;
            els.introRulesList.appendChild(li);
        }

        function buildIntroCards(container, items) {
            container.innerHTML = '';
            const cardW = 195;
            const cardH = 110;
            const sharedScale = Math.min(...items.map(it =>
                window.GreggCanvasRenderer.computeIdealScale(it.outlines, cardW, cardH, true)
            ));

            for (const item of items) {
                const card = document.createElement('div');
                card.className = 'intro-preview-card';
                const canvas = document.createElement('canvas');
                canvas.width = cardW;
                canvas.height = cardH;
                const sc = new window.GreggCanvasRenderer.StrokeCanvas(
                    canvas,
                    item.outlines,
                    createCanvasOptions(true, {
                        mode: 'animated',
                        width: cardW,
                        height: cardH,
                        forcedScale: sharedScale
                    })
                );
                modalCanvases.push(sc);

                const title = document.createElement('div');
                title.className = 'intro-preview-title';
                title.textContent = `${item.label} [${item.phonetic}]`;
                const note = document.createElement('div');
                note.className = 'intro-preview-note';
                note.textContent = item.note;

                card.appendChild(canvas);
                card.appendChild(title);
                card.appendChild(note);
                card.onclick = () => sc.play();
                container.appendChild(card);
            }
        }

        buildIntroCards(els.introStrokesGrid, lesson.intro.strokePreviews);
        buildIntroCards(els.introExamplesGrid, lesson.intro.wordExamples);

        els.introStartBtn.textContent = isUnlocked ? 'Start Strokes Quiz →' : 'Close Preview';
        els.introModal.classList.remove('hidden');
    }

    function closeIntroModal(startQuiz) {
        destroyModalCanvases();
        els.introModal.classList.add('hidden');
        if (currentIntroLessonId && store.isLessonUnlocked(currentIntroLessonId)) {
            store.markIntroSeen(currentIntroLessonId);
        }
        if (startQuiz && currentIntroLessonId && store.isLessonUnlocked(currentIntroLessonId)) {
            const ctx = getActiveContext();
            if (ctx.mode !== 'lesson' || ctx.lessonId !== currentIntroLessonId) {
                store.setActiveSelection({ mode: 'lesson', lessonId: currentIntroLessonId, stage: 'strokes' });
                switchView('quiz');
                startNewRound();
            }
        }
        currentIntroLessonId = null;
    }

    function openLightbox(item, revealed) {
        destroyModalCanvases();
        currentLightboxCtx = { item, revealed };
        els.lightboxTitle.textContent = revealed ? `Inspect: ${item.label}` : 'Inspect Outline';
        els.lightboxInfo.innerHTML = revealed
            ? `<strong>${item.label}</strong> (<code>${item.phonetic}</code>) — ${item.hint}`
            : '<span class="muted-text">Submit your answer first to reveal the English translation.</span>';

        els.lightboxModal.classList.remove('hidden');

        const w = 640;
        const h = 230;
        const sc = new window.GreggCanvasRenderer.StrokeCanvas(
            els.lightboxCanvas,
            item.outlines,
            createCanvasOptions(false, { width: w, height: h, mode: 'animated', speed: 'slow' })
        );
        modalCanvases.push(sc);
        currentLightboxCtx.canvasCtrl = sc;
    }

    function closeLightbox() {
        destroyModalCanvases();
        currentLightboxCtx = null;
        els.lightboxModal.classList.add('hidden');
    }

    function populateSettingsModal() {
        const s = store.getSettings();
        els.settingDarkMode.checked = s.darkMode;
        els.settingDirectionGuides.checked = s.showDirectionGuides;
        els.settingRenderMode.value = s.renderMode;
        els.settingAnimSpeed.value = s.animSpeed;
        els.settingMinDiff.value = s.minDiff;
        els.settingMaxDiff.value = s.maxDiff;
        els.minDiffVal.textContent = s.minDiff;
        els.maxDiffVal.textContent = s.maxDiff;
        els.settingWindowSize.value = String(s.windowSize);
        els.settingThreshold.value = String(s.threshold);

        els.settingQuizTypes.innerHTML = '';
        for (const qt of window.GreggQuizEngine.QUIZ_TYPES) {
            const lbl = document.createElement('label');
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = s.allowedQuizTypes.includes(qt.id);
            cb.addEventListener('change', () => {
                let next = store.getSettings().allowedQuizTypes.slice();
                if (cb.checked) {
                    if (!next.includes(qt.id)) next.push(qt.id);
                } else {
                    if (next.length <= 1) {
                        cb.checked = true;
                        showToast('Keep at least one game mode enabled.');
                        return;
                    }
                    next = next.filter(id => id !== qt.id);
                }
                store.updateSettings({ allowedQuizTypes: next });
            });
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(`${qt.name} — ${qt.description}`));
            els.settingQuizTypes.appendChild(lbl);
        }

        els.settingsLessonResets.innerHTML = '';
        for (const lesson of window.GreggCurriculum.LESSONS) {
            if (!store.isLessonUnlocked(lesson.id)) continue;
            const row = document.createElement('div');
            row.className = 'settings-reset-row';
            row.innerHTML = `<span>Lesson ${lesson.number}: ${lesson.title}</span>`;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-danger-outline btn-sm';
            btn.textContent = 'Reset';
            btn.onclick = () => {
                closeSettingsModal();
                confirmResetLesson(lesson);
            };
            row.appendChild(btn);
            els.settingsLessonResets.appendChild(row);
        }
    }

    function openSettingsModal() {
        populateSettingsModal();
        els.settingsModal.classList.remove('hidden');
    }

    function closeSettingsModal() {
        els.settingsModal.classList.add('hidden');
    }

    function openConfirmModal(title, message, onConfirm) {
        els.confirmTitle.textContent = title;
        els.confirmMessage.textContent = message;
        pendingConfirmAction = onConfirm;
        els.confirmModal.classList.remove('hidden');
    }

    function closeConfirmModal() {
        pendingConfirmAction = null;
        els.confirmModal.classList.add('hidden');
    }

    function confirmResetLesson(lesson) {
        openConfirmModal(
            `Reset Lesson ${lesson.number}?`,
            `This will reset Lesson ${lesson.number} (${lesson.title}) back to Strokes and clear its trailing proficiency so you can re-learn it. Later unlocked lessons remain unlocked.`,
            () => {
                store.resetLesson(lesson.id);
                showToast(`Lesson ${lesson.number} reset.`);
                if (currentView === 'lessons') {
                    renderLessonsRoadmap();
                } else {
                    renderStageTabs();
                    updateHeaderBadge();
                    const ctx = getActiveContext();
                    if (ctx.mode === 'lesson' && ctx.lessonId === lesson.id) {
                        openIntroModal(lesson.id);
                    }
                    startNewRound();
                }
            }
        );
    }

    function bindEvents() {
        els.navLessonsBtn.addEventListener('click', () => {
            switchView(currentView === 'lessons' ? 'quiz' : 'lessons');
            if (currentView === 'quiz' && !currentRound) startNewRound();
        });

        els.backToQuizBtn.addEventListener('click', () => {
            switchView('quiz');
            if (!currentRound) startNewRound();
        });

        els.startCumulativeBtn.addEventListener('click', () => {
            store.setActiveSelection({ mode: 'cumulative', cumulativeStage: 'all' });
            switchView('quiz');
            startNewRound();
        });

        els.navIntroBtn.addEventListener('click', () => {
            const ctx = getActiveContext();
            if (ctx.mode === 'lesson') openIntroModal(ctx.lessonId);
        });

        els.navSettingsBtn.addEventListener('click', openSettingsModal);

        els.modeAnimatedBtn.addEventListener('click', () => {
            store.updateSettings({ renderMode: 'animated' });
            syncRenderModeButtons();
            activeCanvases.forEach(c => c.setMode('animated'));
        });

        els.modeStaticBtn.addEventListener('click', () => {
            store.updateSettings({ renderMode: 'static' });
            syncRenderModeButtons();
            activeCanvases.forEach(c => c.setMode('static'));
        });

        els.replayAllBtn.addEventListener('click', replayActiveCanvases);
        els.hintToggleBtn.addEventListener('click', () => setHintVisibility(!hintVisible));
        els.skipBtn.addEventListener('click', startNewRound);
        els.nextBtn.addEventListener('click', startNewRound);

        els.toggleDetailsBtn.addEventListener('click', () => {
            els.scoreDetails.classList.toggle('hidden');
        });
        els.toggleHistoryBtn.addEventListener('click', () => {
            els.historySection.classList.toggle('hidden');
        });
        els.resetScoreBtn.addEventListener('click', () => {
            openConfirmModal(
                'Reset Scoreboard & History?',
                'This clears your global wins, losses, points, streak, and round history without changing your lesson unlocks.',
                () => {
                    store.resetScoreAndHistory();
                    updateScoreBoard();
                    showToast('Scoreboard cleared.');
                }
            );
        });

        // Intro Modal
        els.closeIntroBtn.addEventListener('click', () => closeIntroModal(false));
        els.introStartBtn.addEventListener('click', () => closeIntroModal(true));
        els.introModal.addEventListener('click', (e) => {
            if (e.target === els.introModal) closeIntroModal(false);
        });

        // Lightbox Modal
        els.closeLightboxBtn.addEventListener('click', closeLightbox);
        els.lightboxModal.addEventListener('click', (e) => {
            if (e.target === els.lightboxModal) closeLightbox();
        });
        els.lightboxSlowBtn.addEventListener('click', () => {
            if (currentLightboxCtx && currentLightboxCtx.canvasCtrl) {
                currentLightboxCtx.canvasCtrl.setSpeed('slow');
                currentLightboxCtx.canvasCtrl.setMode('animated');
            }
        });
        els.lightboxNormalBtn.addEventListener('click', () => {
            if (currentLightboxCtx && currentLightboxCtx.canvasCtrl) {
                currentLightboxCtx.canvasCtrl.setSpeed('normal');
                currentLightboxCtx.canvasCtrl.setMode('animated');
            }
        });
        els.lightboxStaticBtn.addEventListener('click', () => {
            if (currentLightboxCtx && currentLightboxCtx.canvasCtrl) {
                currentLightboxCtx.canvasCtrl.setMode('static');
            }
        });

        // Settings Modal
        els.closeSettingsBtn.addEventListener('click', closeSettingsModal);
        els.settingsModal.addEventListener('click', (e) => {
            if (e.target === els.settingsModal) closeSettingsModal();
        });
        els.settingDarkMode.addEventListener('change', (e) => {
            store.updateSettings({ darkMode: e.target.checked });
            applyTheme();
        });
        els.settingDirectionGuides.addEventListener('change', (e) => {
            store.updateSettings({ showDirectionGuides: e.target.checked });
            activeCanvases.forEach(c => c.setShowDirectionGuides(e.target.checked));
        });
        els.settingRenderMode.addEventListener('change', (e) => {
            store.updateSettings({ renderMode: e.target.value });
            syncRenderModeButtons();
            activeCanvases.forEach(c => c.setMode(e.target.value));
        });
        els.settingAnimSpeed.addEventListener('change', (e) => {
            store.updateSettings({ animSpeed: e.target.value });
            activeCanvases.forEach(c => c.setSpeed(e.target.value));
        });

        function handleDiffSlider(e) {
            let min = parseInt(els.settingMinDiff.value, 10);
            let max = parseInt(els.settingMaxDiff.value, 10);
            if (min > max) {
                if (e.target === els.settingMinDiff) {
                    max = min;
                    els.settingMaxDiff.value = String(max);
                } else {
                    min = max;
                    els.settingMinDiff.value = String(min);
                }
            }
            els.minDiffVal.textContent = String(min);
            els.maxDiffVal.textContent = String(max);
            store.updateSettings({ minDiff: min, maxDiff: max });
        }
        els.settingMinDiff.addEventListener('input', handleDiffSlider);
        els.settingMaxDiff.addEventListener('input', handleDiffSlider);

        els.settingWindowSize.addEventListener('change', (e) => {
            store.updateSettings({ windowSize: parseInt(e.target.value, 10) });
            renderProficiencyStrip();
        });
        els.settingThreshold.addEventListener('change', (e) => {
            store.updateSettings({ threshold: parseInt(e.target.value, 10) });
            renderProficiencyStrip();
        });
        els.settingResetAllBtn.addEventListener('click', () => {
            closeSettingsModal();
            openConfirmModal(
                'Reset All Progress?',
                'This resets all lessons, trailing proficiency, scoreboard, and history back to Lesson 1.',
                () => {
                    store.resetAll();
                    updateScoreBoard();
                    switchView('quiz');
                    renderStageTabs();
                    startNewRound();
                    openIntroModal('lesson-1');
                    showToast('All progress reset.');
                }
            );
        });

        // Confirm Modal
        els.confirmCancelBtn.addEventListener('click', closeConfirmModal);
        els.confirmModal.addEventListener('click', (e) => {
            if (e.target === els.confirmModal) closeConfirmModal();
        });
        els.confirmOkBtn.addEventListener('click', () => {
            const action = pendingConfirmAction;
            closeConfirmModal();
            if (typeof action === 'function') action();
        });

        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!els.confirmModal.classList.contains('hidden')) closeConfirmModal();
                else if (!els.lightboxModal.classList.contains('hidden')) closeLightbox();
                else if (!els.introModal.classList.contains('hidden')) closeIntroModal(false);
                else if (!els.settingsModal.classList.contains('hidden')) closeSettingsModal();
                return;
            }

            // Ignore when any modal is open or user is interacting with a form field
            const anyModalOpen = !els.confirmModal.classList.contains('hidden') ||
                !els.lightboxModal.classList.contains('hidden') ||
                !els.introModal.classList.contains('hidden') ||
                !els.settingsModal.classList.contains('hidden');
            if (anyModalOpen || currentView !== 'quiz') return;

            const tag = document.activeElement && document.activeElement.tagName;
            if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'r') {
                e.preventDefault();
                replayActiveCanvases();
            } else if (key === 'h') {
                e.preventDefault();
                setHintVisibility(!hintVisible);
            } else if (key === 's' && roundActive) {
                e.preventDefault();
                startNewRound();
            } else if ((e.key === 'Enter' || e.key === ' ') && !roundActive) {
                e.preventDefault();
                startNewRound();
            } else if (roundActive && currentRound) {
                if (['1', '2', '3', '4'].includes(key)) {
                    const idx = parseInt(key, 10) - 1;
                    if (currentRound._keyChoices && currentRound._keyChoices[idx]) {
                        currentRound._keyChoices[idx].el.click();
                    } else if (currentRound._cardChoices && currentRound._cardChoices[idx]) {
                        currentRound._cardChoices[idx].el.click();
                    }
                } else if ((key === 'y' || key === 'n') && currentRound._ynChoices) {
                    const targetChoice = key === 'y' ? 'Yes' : 'No';
                    const match = currentRound._ynChoices.find(c => c.choice === targetChoice);
                    if (match) match.el.click();
                }
            }
        });

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                activeCanvases.forEach(c => c.resize());
            }, 150);
        });
    }

    function init() {
        applyTheme();
        syncRenderModeButtons();
        bindEvents();
        updateScoreBoard();
        renderStageTabs();
        updateHeaderBadge();
        startNewRound();

        const ctx = getActiveContext();
        if (ctx.mode === 'lesson') {
            const ls = store.getLessonState(ctx.lessonId);
            if (ls && !ls.introSeen) {
                openIntroModal(ctx.lessonId);
            }
        }
    }

    init();
})();
