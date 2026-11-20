/**
 * Trailing Proficiency, Unlock Progression, and Persistence Engine.
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./curriculum_data.js'));
    } else {
        root.GreggProgression = factory(root.GreggCurriculum);
    }
}(typeof self !== 'undefined' ? self : this, function (GreggCurriculum) {
    'use strict';

    const STORAGE_KEY = 'greggTrainerState_v1';
    const MAX_HISTORY = 100;

    function createDefaultSettings() {
        return {
            darkMode: false,
            renderMode: 'animated',
            animSpeed: 'normal',
            showDirectionGuides: true,
            windowSize: 8,
            threshold: 80,
            allowedQuizTypes: ['read-outline', 'find-outline', 'yes-no', 'match-three'],
            minDiff: 1,
            maxDiff: 3
        };
    }

    function createStageState(unlocked) {
        return {
            unlocked: Boolean(unlocked),
            mastered: false,
            recentAttempts: [],
            totalCorrect: 0,
            totalAttempts: 0
        };
    }

    function createInitialState() {
        const lessons = {};
        for (const lesson of GreggCurriculum.LESSONS) {
            const isFirst = lesson.number === 1;
            lessons[lesson.id] = {
                unlocked: isFirst,
                introSeen: false,
                stages: {
                    strokes: createStageState(isFirst),
                    words: createStageState(false),
                    phrases: createStageState(false)
                }
            };
        }
        return {
            version: 1,
            settings: createDefaultSettings(),
            lessons,
            itemStats: {},
            score: {
                wins: 0,
                losses: 0,
                points: 0,
                streak: 0,
                bestStreak: 0
            },
            history: [],
            activeSelection: {
                mode: 'lesson',
                lessonId: 'lesson-1',
                stage: 'strokes',
                cumulativeStage: 'all'
            }
        };
    }

    function mergeWithDefaults(raw) {
        const base = createInitialState();
        if (!raw || typeof raw !== 'object') return base;

        if (raw.settings && typeof raw.settings === 'object') {
            base.settings = { ...base.settings, ...raw.settings };
            if (!Array.isArray(base.settings.allowedQuizTypes) || base.settings.allowedQuizTypes.length === 0) {
                base.settings.allowedQuizTypes = createDefaultSettings().allowedQuizTypes;
            }
            base.settings.windowSize = Math.max(3, Math.min(20, Number(base.settings.windowSize) || 8));
            base.settings.threshold = Math.max(50, Math.min(100, Number(base.settings.threshold) || 80));
            base.settings.minDiff = Math.max(1, Math.min(3, Number(base.settings.minDiff) || 1));
            base.settings.maxDiff = Math.max(base.settings.minDiff, Math.min(3, Number(base.settings.maxDiff) || 3));
        }

        if (raw.lessons && typeof raw.lessons === 'object') {
            for (const lesson of GreggCurriculum.LESSONS) {
                const src = raw.lessons[lesson.id];
                if (!src) continue;
                const dst = base.lessons[lesson.id];
                dst.unlocked = Boolean(src.unlocked || lesson.number === 1);
                dst.introSeen = Boolean(src.introSeen);
                for (const st of GreggCurriculum.STAGES) {
                    if (src.stages && src.stages[st]) {
                        const sSrc = src.stages[st];
                        dst.stages[st] = {
                            unlocked: Boolean(sSrc.unlocked),
                            mastered: Boolean(sSrc.mastered),
                            recentAttempts: Array.isArray(sSrc.recentAttempts)
                                ? sSrc.recentAttempts.slice(-base.settings.windowSize).map(Boolean)
                                : [],
                            totalCorrect: Number(sSrc.totalCorrect) || 0,
                            totalAttempts: Number(sSrc.totalAttempts) || 0
                        };
                    }
                }
                if (dst.unlocked && !dst.stages.strokes.unlocked) {
                    dst.stages.strokes.unlocked = true;
                }
            }
        }

        if (raw.itemStats && typeof raw.itemStats === 'object') {
            base.itemStats = { ...raw.itemStats };
        }

        if (raw.score && typeof raw.score === 'object') {
            base.score = {
                wins: Number(raw.score.wins) || 0,
                losses: Number(raw.score.losses) || 0,
                points: Number(raw.score.points) || 0,
                streak: Number(raw.score.streak) || 0,
                bestStreak: Number(raw.score.bestStreak) || 0
            };
        }

        if (Array.isArray(raw.history)) {
            base.history = raw.history.slice(0, MAX_HISTORY);
        }

        if (raw.activeSelection && typeof raw.activeSelection === 'object') {
            base.activeSelection = { ...base.activeSelection, ...raw.activeSelection };
        }

        return base;
    }

    function createStore(storageAdapter) {
        const storage = storageAdapter || (typeof localStorage !== 'undefined' ? localStorage : null);
        let state = load();

        function load() {
            if (!storage) return createInitialState();
            try {
                const raw = storage.getItem(STORAGE_KEY);
                if (!raw) return createInitialState();
                return mergeWithDefaults(JSON.parse(raw));
            } catch (e) {
                return createInitialState();
            }
        }

        function save() {
            if (!storage) return;
            try {
                storage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                // Ignore quota/storage errors
            }
        }

        function getState() {
            return state;
        }

        function getSettings() {
            return state.settings;
        }

        function updateSettings(partial) {
            state.settings = mergeWithDefaults({
                ...state,
                settings: { ...state.settings, ...partial }
            }).settings;
            save();
            return state.settings;
        }

        function setActiveSelection(sel) {
            state.activeSelection = { ...state.activeSelection, ...sel };
            save();
        }

        function markIntroSeen(lessonId) {
            if (state.lessons[lessonId]) {
                state.lessons[lessonId].introSeen = true;
                save();
            }
        }

        function getLessonState(lessonId) {
            return state.lessons[lessonId] || null;
        }

        function isLessonUnlocked(lessonId) {
            return Boolean(state.lessons[lessonId] && state.lessons[lessonId].unlocked);
        }

        function isStageUnlocked(lessonId, stage) {
            const ls = state.lessons[lessonId];
            return Boolean(ls && ls.unlocked && ls.stages[stage] && ls.stages[stage].unlocked);
        }

        function getStageProficiency(lessonId, stage) {
            const ls = state.lessons[lessonId];
            const st = ls && ls.stages[stage];
            const windowSize = state.settings.windowSize;
            const threshold = state.settings.threshold;
            if (!st) {
                return {
                    unlocked: false,
                    mastered: false,
                    recentAttempts: [],
                    correctInWindow: 0,
                    attemptsInWindow: 0,
                    windowSize,
                    threshold,
                    trailingRate: null,
                    currentRate: 0
                };
            }
            const recent = st.recentAttempts.slice(-windowSize);
            const correctInWindow = recent.filter(Boolean).length;
            const attemptsInWindow = recent.length;
            const trailingRate = attemptsInWindow >= windowSize
                ? Math.round((correctInWindow / windowSize) * 100)
                : null;
            const currentRate = attemptsInWindow > 0
                ? Math.round((correctInWindow / attemptsInWindow) * 100)
                : 0;

            return {
                unlocked: st.unlocked,
                mastered: st.mastered,
                recentAttempts: recent,
                correctInWindow,
                attemptsInWindow,
                windowSize,
                threshold,
                trailingRate,
                currentRate,
                totalCorrect: st.totalCorrect,
                totalAttempts: st.totalAttempts
            };
        }

        function recordAttempt(lessonId, stage, itemId, isCorrect, meta = {}) {
            const success = Boolean(isCorrect);
            const difficulty = Math.max(1, Math.min(3, Number(meta.difficulty) || 1));
            const pointsChange = success ? difficulty : -(4 - difficulty);

            if (itemId) {
                const prev = state.itemStats[itemId] || { attempts: 0, correct: 0, lastSeen: 0 };
                state.itemStats[itemId] = {
                    attempts: prev.attempts + 1,
                    correct: prev.correct + (success ? 1 : 0),
                    lastSeen: Date.now()
                };
            }

            if (success) {
                state.score.wins++;
                state.score.streak++;
                state.score.bestStreak = Math.max(state.score.bestStreak, state.score.streak);
            } else {
                state.score.losses++;
                state.score.streak = 0;
            }
            state.score.points += pointsChange;

            state.history.unshift({
                result: success ? 'win' : 'loss',
                itemId: itemId || null,
                label: meta.label || '',
                phonetic: meta.phonetic || '',
                guessed: meta.guessed || '',
                quizType: meta.quizType || 'read-outline',
                lessonId: lessonId || null,
                stage: stage || null,
                difficulty,
                pointsChange,
                time: meta.time || new Date().toLocaleTimeString()
            });
            if (state.history.length > MAX_HISTORY) {
                state.history.length = MAX_HISTORY;
            }

            let newlyUnlocked = null;
            const windowSize = state.settings.windowSize;
            const threshold = state.settings.threshold;
            const lessonState = lessonId ? state.lessons[lessonId] : null;
            const stageObj = lessonState && stage ? lessonState.stages[stage] : null;

            if (stageObj && stageObj.unlocked) {
                stageObj.recentAttempts.push(success);
                if (stageObj.recentAttempts.length > windowSize) {
                    stageObj.recentAttempts = stageObj.recentAttempts.slice(-windowSize);
                }
                stageObj.totalAttempts++;
                if (success) stageObj.totalCorrect++;

                const prof = getStageProficiency(lessonId, stage);
                if (prof.trailingRate !== null && prof.trailingRate >= threshold) {
                    stageObj.mastered = true;
                    if (stage === 'strokes' && !lessonState.stages.words.unlocked) {
                        lessonState.stages.words.unlocked = true;
                        newlyUnlocked = {
                            type: 'stage',
                            lessonId,
                            stage: 'words',
                            label: GreggCurriculum.STAGE_LABELS.words
                        };
                    } else if (stage === 'words' && !lessonState.stages.phrases.unlocked) {
                        lessonState.stages.phrases.unlocked = true;
                        newlyUnlocked = {
                            type: 'stage',
                            lessonId,
                            stage: 'phrases',
                            label: GreggCurriculum.STAGE_LABELS.phrases
                        };
                    } else if (stage === 'phrases') {
                        const currLesson = GreggCurriculum.getLessonById(lessonId);
                        const nextLesson = currLesson ? GreggCurriculum.getLessonByNumber(currLesson.number + 1) : null;
                        if (nextLesson && state.lessons[nextLesson.id] && !state.lessons[nextLesson.id].unlocked) {
                            state.lessons[nextLesson.id].unlocked = true;
                            state.lessons[nextLesson.id].stages.strokes.unlocked = true;
                            newlyUnlocked = {
                                type: 'lesson',
                                lessonId: nextLesson.id,
                                lessonNumber: nextLesson.number,
                                stage: 'strokes',
                                label: `Lesson ${nextLesson.number}: ${nextLesson.title}`
                            };
                        }
                    }
                }
            }

            save();

            const updatedProf = getStageProficiency(lessonId, stage);
            return {
                trailingRate: updatedProf.trailingRate,
                currentRate: updatedProf.currentRate,
                correctInWindow: updatedProf.correctInWindow,
                attemptsInWindow: updatedProf.attemptsInWindow,
                windowSize,
                threshold,
                newlyUnlocked,
                pointsChange
            };
        }

        function resetLesson(lessonId) {
            const lessonState = state.lessons[lessonId];
            if (!lessonState) return false;
            lessonState.unlocked = true;
            lessonState.introSeen = false;
            lessonState.stages.strokes = createStageState(true);
            lessonState.stages.words = createStageState(false);
            lessonState.stages.phrases = createStageState(false);

            if (state.activeSelection.lessonId === lessonId) {
                state.activeSelection.stage = 'strokes';
            }
            save();
            return true;
        }

        function resetScoreAndHistory() {
            state.score = { wins: 0, losses: 0, points: 0, streak: 0, bestStreak: 0 };
            state.history = [];
            save();
        }

        function resetAll() {
            const preservedDarkMode = state.settings.darkMode;
            state = createInitialState();
            state.settings.darkMode = preservedDarkMode;
            save();
            return state;
        }

        function getUnlockedItems(stageFilter = 'all') {
            const items = [];
            for (const lesson of GreggCurriculum.LESSONS) {
                const ls = state.lessons[lesson.id];
                if (!ls || !ls.unlocked) continue;
                for (const st of GreggCurriculum.STAGES) {
                    if (stageFilter !== 'all' && stageFilter !== st) continue;
                    if (ls.stages[st] && ls.stages[st].unlocked) {
                        items.push(...lesson.stages[st]);
                    }
                }
            }
            return items;
        }

        function getUnlockedLessonCount() {
            return GreggCurriculum.LESSONS.filter(l => state.lessons[l.id] && state.lessons[l.id].unlocked).length;
        }

        function exportStateJson() {
            return JSON.stringify(state);
        }

        function importStateJson(jsonStr) {
            const parsed = JSON.parse(jsonStr);
            state = mergeWithDefaults(parsed);
            save();
            return state;
        }

        return {
            getState,
            getSettings,
            updateSettings,
            setActiveSelection,
            markIntroSeen,
            getLessonState,
            isLessonUnlocked,
            isStageUnlocked,
            getStageProficiency,
            recordAttempt,
            resetLesson,
            resetScoreAndHistory,
            resetAll,
            getUnlockedItems,
            getUnlockedLessonCount,
            exportStateJson,
            importStateJson,
            save
        };
    }

    return {
        STORAGE_KEY,
        createInitialState,
        createStore
    };
}));
