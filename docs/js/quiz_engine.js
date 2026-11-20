/**
 * Quiz Engine: 4 quiz modes, mastery-weighted target selection,
 * minimal-pair confusable distractors, and difficulty calculation.
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./curriculum_data.js'));
    } else {
        root.GreggQuizEngine = factory(root.GreggCurriculum);
    }
}(typeof self !== 'undefined' ? self : this, function (GreggCurriculum) {
    'use strict';

    const QUIZ_TYPES = [
        {
            id: 'read-outline',
            name: 'Read Outline',
            description: 'See a Gregg outline and choose its meaning from 4 options.',
            allowedStages: ['strokes', 'words', 'phrases']
        },
        {
            id: 'find-outline',
            name: 'Find Outline',
            description: 'See a prompt and pick the matching Gregg outline card.',
            allowedStages: ['strokes', 'words', 'phrases']
        },
        {
            id: 'yes-no',
            name: 'Yes / No',
            description: 'Decide if the shown Gregg outline matches the prompt.',
            allowedStages: ['strokes', 'words', 'phrases']
        },
        {
            id: 'match-three',
            name: 'Match 3',
            description: 'Match three Gregg outlines to their meanings.',
            allowedStages: ['strokes', 'words']
        }
    ];

    function outlineSignature(outlines) {
        return JSON.stringify(outlines);
    }

    function shuffle(arr, rng = Math.random) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            const tmp = copy[i];
            copy[i] = copy[j];
            copy[j] = tmp;
        }
        return copy;
    }

    function pickWeightedTarget(pool, itemStats = {}, lastItemId = null, rng = Math.random) {
        if (!pool || pool.length === 0) return null;
        let candidates = pool.length > 1 && lastItemId
            ? pool.filter(it => it.id !== lastItemId)
            : pool;
        if (candidates.length === 0) candidates = pool;

        const weights = candidates.map(item => {
            const st = itemStats[item.id];
            if (!st || st.attempts === 0) return 4.0;
            const acc = st.correct / st.attempts;
            // Lower accuracy and fewer attempts get higher weight
            const accFactor = Math.max(0.4, 2.2 - acc * 1.6);
            const recencyFactor = st.attempts < 3 ? 1.5 : 1.0;
            return accFactor * recencyFactor;
        });

        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let r = rng() * totalWeight;
        for (let i = 0; i < candidates.length; i++) {
            r -= weights[i];
            if (r <= 0) return candidates[i];
        }
        return candidates[candidates.length - 1];
    }

    function computeOverlapInfo(target, candidate) {
        const overlappingTraits = [];
        const targetConf = target.confusables || [];
        const candConf = candidate.confusables || [];
        const isExplicitConfusable = targetConf.includes(candidate.id) || candConf.includes(target.id);
        if (isExplicitConfusable) {
            overlappingTraits.push('Minimal pair');
        }

        const tTags = new Set(target.tags || []);
        const sharedTags = (candidate.tags || []).filter(t => tTags.has(t));
        if (sharedTags.length > 0) {
            overlappingTraits.push(`Shared traits (${sharedTags.slice(0, 2).join(', ')})`);
        }

        if (candidate.lessonNumber === target.lessonNumber && candidate.stage === target.stage) {
            overlappingTraits.push(`Lesson ${target.lessonNumber}`);
        }

        let difficulty = 1;
        if (overlappingTraits.length >= 3 || (isExplicitConfusable && overlappingTraits.length >= 2)) {
            difficulty = 3;
        } else if (overlappingTraits.length === 2 || isExplicitConfusable) {
            difficulty = 2;
        }

        return {
            difficulty,
            overlappingTraits,
            score: overlappingTraits.length + (isExplicitConfusable ? 2 : 0) + sharedTags.length
        };
    }

    function computeRoundDifficulty(target, distractors) {
        if (!distractors || distractors.length === 0) {
            return { difficulty: 1, overlappingTraits: [] };
        }
        let best = { difficulty: 1, overlappingTraits: [] };
        for (const d of distractors) {
            const info = computeOverlapInfo(target, d);
            if (info.difficulty > best.difficulty ||
                (info.difficulty === best.difficulty && info.overlappingTraits.length > best.overlappingTraits.length)) {
                best = info;
            }
        }
        return {
            difficulty: best.difficulty,
            overlappingTraits: best.overlappingTraits
        };
    }

    function getFallbackPoolForTarget(target, primaryPool) {
        const sameStageInPrimary = primaryPool.filter(
            item => item.stage === target.stage && item.id !== target.id
        );
        if (sameStageInPrimary.length >= 4) return sameStageInPrimary;

        // Gather items of the same stage from lessons <= target.lessonNumber (plus primaryPool)
        const seen = new Set(sameStageInPrimary.map(i => i.id));
        seen.add(target.id);
        const extra = [];
        for (const lesson of GreggCurriculum.LESSONS) {
            if (lesson.number > target.lessonNumber) continue;
            for (const item of lesson.stages[target.stage]) {
                if (!seen.has(item.id)) {
                    seen.add(item.id);
                    extra.push(item);
                }
            }
        }
        return [...sameStageInPrimary, ...extra];
    }

    function selectDistractors(target, primaryPool, count, minDiff = 1, maxDiff = 3, rng = Math.random) {
        const targetSig = outlineSignature(target.outlines);
        const rawCandidates = getFallbackPoolForTarget(target, primaryPool);

        // Deduplicate by outline signature and label against target and each other
        const uniqueCandidates = [];
        const usedSigs = new Set([targetSig]);
        const usedLabels = new Set([target.label]);

        // Prioritize primaryPool candidates first when deduplicating
        const primaryIds = new Set(primaryPool.map(p => p.id));
        const ordered = [
            ...rawCandidates.filter(c => primaryIds.has(c.id)),
            ...rawCandidates.filter(c => !primaryIds.has(c.id))
        ];

        for (const cand of ordered) {
            const sig = outlineSignature(cand.outlines);
            if (usedSigs.has(sig) || usedLabels.has(cand.label)) continue;
            usedSigs.add(sig);
            usedLabels.add(cand.label);
            const info = computeOverlapInfo(target, cand);
            uniqueCandidates.push({ item: cand, info });
        }

        if (uniqueCandidates.length === 0) return [];

        const targetDiff = Math.floor(rng() * (maxDiff - minDiff + 1)) + minDiff;
        const inRange = uniqueCandidates.filter(
            c => c.info.difficulty >= minDiff && c.info.difficulty <= maxDiff
        );
        const preferred = inRange.length >= count ? inRange : uniqueCandidates;

        // Sort near targetDiff with slight randomness so rounds stay varied
        const sorted = shuffle(preferred, rng).sort((a, b) => {
            const da = Math.abs(a.info.difficulty - targetDiff);
            const db = Math.abs(b.info.difficulty - targetDiff);
            if (da !== db) return da - db;
            return b.info.score - a.info.score;
        });

        return sorted.slice(0, count).map(c => c.item);
    }

    function getAvailableQuizTypes(stage, allowedQuizTypes, poolSize) {
        const enabled = Array.isArray(allowedQuizTypes) && allowedQuizTypes.length > 0
            ? allowedQuizTypes
            : QUIZ_TYPES.map(q => q.id);

        let eligible = QUIZ_TYPES.filter(qt => {
            if (!enabled.includes(qt.id)) return false;
            if (stage && stage !== 'all' && !qt.allowedStages.includes(stage)) return false;
            if (qt.id === 'match-three' && poolSize < 3) return false;
            if (qt.id === 'find-outline' && poolSize < 2) return false;
            return true;
        });

        if (eligible.length === 0) {
            eligible = QUIZ_TYPES.filter(qt => {
                if (stage && stage !== 'all' && !qt.allowedStages.includes(stage)) return false;
                if (qt.id === 'match-three' && poolSize < 3) return false;
                return true;
            });
        }
        if (eligible.length === 0) {
            eligible = [QUIZ_TYPES[0]];
        }
        return eligible;
    }

    function getPromptText(quizTypeId, target) {
        const kindWord = target.stage === 'strokes'
            ? 'stroke'
            : (target.stage === 'phrases' ? 'phrase' : 'outline');
        switch (quizTypeId) {
            case 'read-outline':
                return `What does this Gregg ${kindWord} represent?`;
            case 'find-outline':
                return `Select the Gregg ${kindWord} for "${target.label}"`;
            case 'yes-no':
                return `Does this Gregg ${kindWord} represent "${target.label}"?`;
            case 'match-three':
                return `Match each Gregg ${kindWord} to its correct meaning:`;
            default:
                return `Identify this Gregg ${kindWord}:`;
        }
    }

    /**
     * Generates a single quiz round.
     * @param {Object} params
     * @param {Array} params.pool - Candidate target items (from lesson+stage or unlocked cumulative pool)
     * @param {string} params.stage - 'strokes' | 'words' | 'phrases' | 'all'
     * @param {string} [params.forcedQuizType] - Optional explicit quiz type ID
     * @param {string[]} [params.allowedQuizTypes]
     * @param {Object} [params.itemStats]
     * @param {string} [params.lastItemId]
     * @param {number} [params.minDiff]
     * @param {number} [params.maxDiff]
     * @param {Function} [params.rng]
     */
    function generateRound(params) {
        const {
            pool,
            stage = 'words',
            forcedQuizType = null,
            allowedQuizTypes = QUIZ_TYPES.map(q => q.id),
            itemStats = {},
            lastItemId = null,
            minDiff = 1,
            maxDiff = 3,
            rng = Math.random
        } = params;

        if (!Array.isArray(pool) || pool.length === 0) {
            throw new Error('Cannot generate quiz round from an empty pool');
        }

        let quizTypeObj;
        if (forcedQuizType) {
            quizTypeObj = QUIZ_TYPES.find(q => q.id === forcedQuizType) || QUIZ_TYPES[0];
        } else {
            const eligible = getAvailableQuizTypes(stage, allowedQuizTypes, pool.length);
            quizTypeObj = eligible[Math.floor(rng() * eligible.length)];
        }

        // For match-three in cumulative 'all' mode, avoid phrases
        let targetPool = pool;
        if (quizTypeObj.id === 'match-three') {
            const nonPhrases = pool.filter(it => it.stage !== 'phrases');
            if (nonPhrases.length >= 3) {
                targetPool = nonPhrases;
            } else {
                quizTypeObj = QUIZ_TYPES[0]; // fallback to read-outline
            }
        }

        const target = pickWeightedTarget(targetPool, itemStats, lastItemId, rng);
        const quizType = quizTypeObj.id;

        if (quizType === 'read-outline') {
            const distractors = selectDistractors(target, targetPool, 3, minDiff, maxDiff, rng);
            const options = shuffle([target, ...distractors], rng);
            const diffInfo = computeRoundDifficulty(target, distractors);
            return {
                quizType,
                target,
                options,
                question: getPromptText(quizType, target),
                difficulty: diffInfo.difficulty,
                overlappingTraits: diffInfo.overlappingTraits
            };
        }

        if (quizType === 'find-outline') {
            const desiredDistractors = targetPool.length === 2 ? 1 : 2;
            const distractors = selectDistractors(target, targetPool, desiredDistractors, minDiff, maxDiff, rng);
            const options = shuffle([target, ...distractors], rng);
            const diffInfo = computeRoundDifficulty(target, distractors);
            return {
                quizType,
                target,
                options,
                question: getPromptText(quizType, target),
                difficulty: diffInfo.difficulty,
                overlappingTraits: diffInfo.overlappingTraits
            };
        }

        if (quizType === 'yes-no') {
            const distractors = selectDistractors(target, targetPool, 1, minDiff, maxDiff, rng);
            const canShowWrong = distractors.length > 0;
            const isMatch = !canShowWrong || rng() < 0.5;
            const displayedItem = isMatch ? target : distractors[0];
            const diffInfo = isMatch
                ? computeRoundDifficulty(target, distractors)
                : computeRoundDifficulty(target, [displayedItem]);
            return {
                quizType,
                target,
                displayedItem,
                isMatch,
                correctChoice: isMatch ? 'Yes' : 'No',
                options: ['Yes', 'No'],
                question: getPromptText(quizType, target),
                difficulty: diffInfo.difficulty,
                overlappingTraits: diffInfo.overlappingTraits
            };
        }

        // match-three
        const distractors = selectDistractors(target, targetPool, 2, minDiff, maxDiff, rng);
        const cards = shuffle([target, ...distractors], rng);
        const labelChoices = [...cards].map(c => c.label).sort((a, b) => a.localeCompare(b));
        const diffInfo = computeRoundDifficulty(target, distractors);
        return {
            quizType: 'match-three',
            target,
            options: cards,
            labelChoices,
            question: getPromptText('match-three', target),
            difficulty: diffInfo.difficulty,
            overlappingTraits: diffInfo.overlappingTraits
        };
    }

    return {
        QUIZ_TYPES,
        generateRound,
        pickWeightedTarget,
        selectDistractors,
        computeOverlapInfo,
        computeRoundDifficulty,
        getAvailableQuizTypes
    };
}));
