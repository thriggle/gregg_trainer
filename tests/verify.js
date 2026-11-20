'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const GreggGeometry = require('../docs/js/gregg_geometry.js');
const GreggCanvasRenderer = require('../docs/js/stroke_renderer.js');
const GreggCurriculum = require('../docs/js/curriculum_data.js');
const GreggProgression = require('../docs/js/progression.js');
const GreggQuizEngine = require('../docs/js/quiz_engine.js');

function createMemoryStorage() {
    const map = new Map();
    return {
        getItem(k) { return map.has(k) ? map.get(k) : null; },
        setItem(k, v) { map.set(k, String(v)); },
        removeItem(k) { map.delete(k); }
    };
}

function testGeometryAndProportions() {
    // 1. Every primitive stroke produces finite points & non-zero length
    for (const name of Object.keys(GreggGeometry.STROKES)) {
        const geo = GreggGeometry.buildPhraseGeometry([[name]]);
        assert(geo.totalLength > 0, `Stroke ${name} should have positive length`);
        assert(Number.isFinite(geo.bounds.width), `Stroke ${name} width finite`);
        assert(Number.isFinite(geo.bounds.height), `Stroke ${name} height finite`);
        for (const sp of geo.subpaths) {
            assert(sp.points.length > 0, `Stroke ${name} has points`);
            for (const p of sp.points) {
                assert(Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.angle),
                    `Stroke ${name} has finite coords`);
            }
        }
    }

    // 2. True proportion ratios
    const len = (tok) => GreggGeometry.buildOutlineGeometry([tok]).subpaths[0].length;
    const width = (tok) => GreggGeometry.buildOutlineGeometry([tok]).bounds.width;

    const gkRatio = width('G') / width('K');
    assert(Math.abs(gkRatio - 2.0) < 0.05, `G/K width ratio expected ~2.0, got ${gkRatio}`);

    const lrRatio = width('L') / width('R');
    assert(Math.abs(lrRatio - 2.0) < 0.05, `L/R width ratio expected ~2.0, got ${lrRatio}`);

    const mnRatio = width('M') / width('N');
    assert(Math.abs(mnRatio - 2.0) < 0.1, `M/N width ratio expected ~2.0, got ${mnRatio}`);

    const dtRatio = len('D') / len('T');
    assert(Math.abs(dtRatio - 2.0) < 0.1, `D/T length ratio expected ~2.0, got ${dtRatio}`);

    const bpRatio = len('B') / len('P');
    assert(bpRatio >= 1.65 && bpRatio <= 1.80, `B/P length ratio expected ~1.7, got ${bpRatio}`);

    const vfRatio = len('V') / len('F');
    assert(vfRatio >= 1.65 && vfRatio <= 1.80, `V/F length ratio expected ~1.7, got ${vfRatio}`);

    const aeRatio = GreggGeometry.CIRCLES.A.radius / GreggGeometry.CIRCLES.E.radius;
    assert(aeRatio >= 2.4, `A/E radius ratio expected >= 2.4, got ${aeRatio}`);

    // 3. Circle placement correctness
    // R-A (ray) and L-A (lay): circle center strictly ABOVE curve chord (cy < 0)
    const rayGeo = GreggGeometry.buildOutlineGeometry(['R', 'A']);
    assert(rayGeo.circles[0].cy < 0, `R-A circle cy should be < 0, got ${rayGeo.circles[0].cy}`);

    const layGeo = GreggGeometry.buildOutlineGeometry(['L', 'A']);
    assert(layGeo.circles[0].cy < 0, `L-A circle cy should be < 0, got ${layGeo.circles[0].cy}`);

    // K-A (kay) and K-A-K (cake): circle center strictly BELOW curve chord (cy > 0)
    const kayGeo = GreggGeometry.buildOutlineGeometry(['K', 'A']);
    assert(kayGeo.circles[0].cy > 0, `K-A circle cy should be > 0, got ${kayGeo.circles[0].cy}`);

    const cakeGeo = GreggGeometry.buildOutlineGeometry(['K', 'A', 'K']);
    assert(cakeGeo.circles[0].cy > 0, `K-A-K circle cy should be > 0, got ${cakeGeo.circles[0].cy}`);

    // M-A (may) and M-A-N (main): normal circle center strictly BELOW baseline (cy > 0)
    const mayGeo = GreggGeometry.buildOutlineGeometry(['M', 'A']);
    assert(mayGeo.circles[0].cy > 0, `M-A circle cy should be > 0, got ${mayGeo.circles[0].cy}`);

    const mainGeo = GreggGeometry.buildOutlineGeometry(['M', 'A', 'N']);
    assert(mainGeo.circles[0].cy > 0, `M-A-N circle cy should be > 0, got ${mainGeo.circles[0].cy}`);

    // Reverse circle M-AR and AR-T on opposite side compared to normal A
    const marGeo = GreggGeometry.buildOutlineGeometry(['M', 'AR']);
    assert(marGeo.circles[0].cy < 0, `M-AR circle cy should be < 0 (opposite M-A), got ${marGeo.circles[0].cy}`);

    const atGeo = GreggGeometry.buildOutlineGeometry(['A', 'T']);
    const artGeo = GreggGeometry.buildOutlineGeometry(['AR', 'T']);
    assert(atGeo.circles[0].cy > 0 && artGeo.circles[0].cy < 0,
        `AR-T (${artGeo.circles[0].cy}) should be opposite side to A-T (${atGeo.circles[0].cy})`);

    // H dot strictly above circle's top edge
    for (const outline of [['H', 'A', 'L'], ['H', 'E']]) {
        const g = GreggGeometry.buildOutlineGeometry(outline);
        const hDot = g.subpaths.find(sp => sp.token === 'H');
        assert(hDot, `H dot missing on ${outline.join('-')}`);
        const c = g.circles[0];
        assert(hDot.points[0].y < c.cy - c.r,
            `H dot y (${hDot.points[0].y}) should be < circle top (${c.cy - c.r}) for ${outline.join('-')}`);
    }

    // Angle exterior rule: M-A-T outside corner (cy > 0), T-A-M outside top corner (cy < T.endY)
    const matGeo = GreggGeometry.buildOutlineGeometry(['M', 'A', 'T']);
    assert(matGeo.circles[0].cy > 0, `M-A-T circle cy should be > 0, got ${matGeo.circles[0].cy}`);

    const tamGeo = GreggGeometry.buildOutlineGeometry(['T', 'A', 'M']);
    const tEndY = GreggGeometry.STROKES.T.end.y; // negative
    assert(tamGeo.circles[0].cy < tEndY,
        `T-A-M circle cy (${tamGeo.circles[0].cy}) should be < T.endY (${tEndY})`);

    // Renderer scale helper sanity check
    const scale = GreggCanvasRenderer.computeIdealScale([['K', 'A', 'K']], 640, 220, false);
    assert(Number.isFinite(scale) && scale > 0, 'computeIdealScale returns finite positive number');
}

function testCurriculumIntegrity() {
    assert.strictEqual(GreggCurriculum.LESSONS.length, 12, 'Should have 12 lessons');

    const seenIds = new Set();
    let totalItems = 0;

    for (let i = 0; i < GreggCurriculum.LESSONS.length; i++) {
        const lesson = GreggCurriculum.LESSONS[i];
        assert.strictEqual(lesson.number, i + 1, `Lesson ${i + 1} number order`);
        assert(lesson.intro && lesson.intro.summary && lesson.intro.rules.length > 0, `Lesson ${lesson.number} intro metadata`);
        assert(lesson.intro.strokePreviews.length > 0, `Lesson ${lesson.number} strokePreviews`);
        assert(lesson.intro.wordExamples.length > 0, `Lesson ${lesson.number} wordExamples`);

        assert(lesson.stages.strokes.length >= 4, `Lesson ${lesson.number} strokes >= 4`);
        assert(lesson.stages.words.length >= 15, `Lesson ${lesson.number} words >= 15 (got ${lesson.stages.words.length})`);
        assert(lesson.stages.phrases.length >= 10, `Lesson ${lesson.number} phrases >= 10 (got ${lesson.stages.phrases.length})`);

        // Validate intro previews & examples build valid geometry
        for (const preview of [...lesson.intro.strokePreviews, ...lesson.intro.wordExamples]) {
            const geo = GreggGeometry.buildPhraseGeometry(preview.outlines);
            assert(geo.totalLength > 0 && Number.isFinite(geo.bounds.width),
                `Intro preview ${preview.label} geometry valid`);
        }

        for (const stage of GreggCurriculum.STAGES) {
            const sigs = new Set();
            const labels = new Set();
            for (const item of lesson.stages[stage]) {
                totalItems++;
                assert(!seenIds.has(item.id), `Duplicate item id: ${item.id}`);
                seenIds.add(item.id);

                assert.strictEqual(item.lessonId, lesson.id);
                assert.strictEqual(item.lessonNumber, lesson.number);
                assert.strictEqual(item.stage, stage);

                const sig = JSON.stringify(item.outlines);
                assert(!sigs.has(sig), `Duplicate outline in L${lesson.number} ${stage}: ${item.label} ${sig}`);
                sigs.add(sig);

                assert(!labels.has(item.label), `Duplicate label in L${lesson.number} ${stage}: ${item.label}`);
                labels.add(item.label);

                if (stage === 'strokes') {
                    const spoilerPattern = /\b(circle|dot|curve|slant|loop|hook|disjoined|reverse|backward|double|tiny|large|narrow|elongated|right-motion|left-motion|side form)\b/i;
                    assert(!spoilerPattern.test(item.label),
                        `Stroke quiz label "${item.label}" (${item.id}) contains a visual/shape spoiler`);
                }

                // Geometry builds cleanly
                const geo = GreggGeometry.buildPhraseGeometry(item.outlines);
                assert(Number.isFinite(geo.totalLength) && geo.totalLength > 0,
                    `Item ${item.id} invalid totalLength: ${geo.totalLength}`);
                assert(Number.isFinite(geo.bounds.width) && geo.bounds.width >= 0,
                    `Item ${item.id} invalid bounds.width`);
                assert(Number.isFinite(geo.bounds.height) && geo.bounds.height >= 0,
                    `Item ${item.id} invalid bounds.height`);

                // Strict cumulative token check
                for (const word of item.outlines) {
                    for (const rawTok of word) {
                        const base = rawTok.split(':')[0];
                        const introNum = GreggCurriculum.TOKEN_INTRO_LESSON[base];
                        assert(introNum !== undefined,
                            `Token ${base} in ${item.id} missing from TOKEN_INTRO_LESSON`);
                        assert(introNum <= lesson.number,
                            `Token ${base} (introduced in L${introNum}) leaked into L${lesson.number} item ${item.id}`);
                    }
                }
            }
        }
    }

    assert(totalItems >= 350, `Expected rich curriculum (>=350 items), got ${totalItems}`);
}

function testProgressionAndReset() {
    const storage = createMemoryStorage();
    const store = GreggProgression.createStore(storage);

    // 1. Fresh state unlocks ONLY Lesson 1 Strokes
    assert.strictEqual(store.isLessonUnlocked('lesson-1'), true);
    assert.strictEqual(store.isStageUnlocked('lesson-1', 'strokes'), true);
    assert.strictEqual(store.isStageUnlocked('lesson-1', 'words'), false);
    assert.strictEqual(store.isStageUnlocked('lesson-1', 'phrases'), false);
    for (let n = 2; n <= 12; n++) {
        assert.strictEqual(store.isLessonUnlocked(`lesson-${n}`), false, `Lesson ${n} starts locked`);
    }

    // 2. 7/7 correct (below windowSize 8) does NOT unlock Words
    for (let i = 0; i < 7; i++) {
        const res = store.recordAttempt('lesson-1', 'strokes', 'l1-s-k', true, { difficulty: 1 });
        assert.strictEqual(res.newlyUnlocked, null);
        assert.strictEqual(res.trailingRate, null);
    }
    assert.strictEqual(store.isStageUnlocked('lesson-1', 'words'), false);

    // 3. On a clean store, 2 misses then 6 hits -> 6/8 (75%) does NOT unlock Words;
    //    the 9th attempt (hit) shifts out a miss -> 7/8 (88%) unlocks Words
    const storeWindow = GreggProgression.createStore(createMemoryStorage());
    storeWindow.recordAttempt('lesson-1', 'strokes', 'l1-s-k', false, { difficulty: 1 });
    storeWindow.recordAttempt('lesson-1', 'strokes', 'l1-s-k', false, { difficulty: 1 });
    for (let i = 0; i < 6; i++) {
        const res = storeWindow.recordAttempt('lesson-1', 'strokes', 'l1-s-k', true, { difficulty: 1 });
        assert.strictEqual(res.newlyUnlocked, null);
        if (i === 5) assert.strictEqual(res.trailingRate, 75);
    }
    assert.strictEqual(storeWindow.isStageUnlocked('lesson-1', 'words'), false);

    const unlockRes = storeWindow.recordAttempt('lesson-1', 'strokes', 'l1-s-k', true, { difficulty: 1 });
    assert.strictEqual(unlockRes.trailingRate, 88);
    assert(unlockRes.newlyUnlocked && unlockRes.newlyUnlocked.stage === 'words', '7/8 (88%) unlocks Words');
    assert.strictEqual(storeWindow.isStageUnlocked('lesson-1', 'words'), true);

    // Finish unlocking Words on primary `store` (8th true -> 8/8 = 100%)
    const unlockedWordsRes = store.recordAttempt('lesson-1', 'strokes', 'l1-s-k', true, { difficulty: 1 });
    assert(unlockedWordsRes.newlyUnlocked && unlockedWordsRes.newlyUnlocked.stage === 'words', 'Should unlock Words at >=80% trailing');
    assert.strictEqual(store.isStageUnlocked('lesson-1', 'words'), true);

    // 4. Master Words -> unlocks Phrases
    let unlockedPhrases = null;
    for (let i = 0; i < 8; i++) {
        const r = store.recordAttempt('lesson-1', 'words', 'l1-w-ray', true, { difficulty: 2 });
        if (r.newlyUnlocked) unlockedPhrases = r.newlyUnlocked;
    }
    assert(unlockedPhrases && unlockedPhrases.stage === 'phrases', 'Should unlock Phrases');
    assert.strictEqual(store.isStageUnlocked('lesson-1', 'phrases'), true);

    // 5. Master Phrases -> unlocks Lesson 2 (strokes unlocked, introSeen false)
    let unlockedL2 = null;
    for (let i = 0; i < 8; i++) {
        const r = store.recordAttempt('lesson-1', 'phrases', 'l1-p-will-go', true, { difficulty: 2 });
        if (r.newlyUnlocked) unlockedL2 = r.newlyUnlocked;
    }
    assert(unlockedL2 && unlockedL2.type === 'lesson' && unlockedL2.lessonId === 'lesson-2',
        'Should unlock Lesson 2');
    assert.strictEqual(store.isLessonUnlocked('lesson-2'), true);
    assert.strictEqual(store.isStageUnlocked('lesson-2', 'strokes'), true);
    assert.strictEqual(store.getLessonState('lesson-2').introSeen, false);

    // 6. resetLesson('lesson-1') resets L1 without locking Lesson 2
    store.markIntroSeen('lesson-1');
    store.resetLesson('lesson-1');
    const l1After = store.getLessonState('lesson-1');
    assert.strictEqual(l1After.introSeen, false);
    assert.strictEqual(l1After.stages.strokes.unlocked, true);
    assert.strictEqual(l1After.stages.strokes.mastered, false);
    assert.strictEqual(l1After.stages.strokes.recentAttempts.length, 0);
    assert.strictEqual(l1After.stages.words.unlocked, false);
    assert.strictEqual(l1After.stages.phrases.unlocked, false);
    assert.strictEqual(store.isLessonUnlocked('lesson-2'), true, 'Lesson 2 remains unlocked after L1 reset');

    // 7. JSON serialization round-trip
    const exported = store.exportStateJson();
    const store2 = GreggProgression.createStore(createMemoryStorage());
    store2.importStateJson(exported);
    assert.strictEqual(store2.exportStateJson(), exported, 'JSON round-trip preserves exact state');
}

function testQuizEngineStress() {
    let roundsGenerated = 0;

    // Seeded deterministic PRNG (Mulberry32)
    let seed = 42;
    const rng = () => {
        seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    for (const lesson of GreggCurriculum.LESSONS) {
        for (const stage of GreggCurriculum.STAGES) {
            const pool = lesson.stages[stage];
            const typesForStage = stage === 'phrases'
                ? ['read-outline', 'find-outline', 'yes-no']
                : ['read-outline', 'find-outline', 'yes-no', 'match-three'];

            for (const qType of typesForStage) {
                for (let minD = 1; minD <= 3; minD++) {
                    const round = GreggQuizEngine.generateRound({
                        pool,
                        stage,
                        forcedQuizType: qType,
                        minDiff: minD,
                        maxDiff: 3,
                        rng
                    });
                    roundsGenerated++;
                    assert(round.target && round.target.id, 'Round has valid target');
                    assert(round.difficulty >= 1 && round.difficulty <= 3, `Difficulty in 1..3 (got ${round.difficulty})`);

                    if (qType === 'read-outline') {
                        assert.strictEqual(round.options.length, 4, `Read outline 4 options in ${lesson.id} ${stage}`);
                        const ids = new Set(round.options.map(o => o.id));
                        assert.strictEqual(ids.size, 4, 'Unique options in read-outline');
                        assert(ids.has(round.target.id), 'Target present in options');
                    } else if (qType === 'find-outline') {
                        assert(round.options.length >= 2 && round.options.length <= 3, 'Find outline 2-3 options');
                        const ids = new Set(round.options.map(o => o.id));
                        assert.strictEqual(ids.size, round.options.length, 'Unique options in find-outline');
                        assert(ids.has(round.target.id), 'Target present in find-outline');
                    } else if (qType === 'yes-no') {
                        assert(round.displayedItem && round.displayedItem.id, 'Yes/No has displayedItem');
                        assert(round.correctChoice === 'Yes' || round.correctChoice === 'No', 'Valid correctChoice');
                    } else if (qType === 'match-three') {
                        assert.strictEqual(round.options.length, 3, 'Match 3 has 3 options');
                        const ids = new Set(round.options.map(o => o.id));
                        assert.strictEqual(ids.size, 3, 'Unique options in match-three');
                        assert.strictEqual(round.labelChoices.length, 3, '3 labelChoices');
                    }
                }
            }
        }
    }

    // Cumulative Review mode stress test
    const allItems = GreggCurriculum.getAllItems();
    for (let i = 0; i < 60; i++) {
        const round = GreggQuizEngine.generateRound({
            pool: allItems,
            stage: 'all',
            rng
        });
        roundsGenerated++;
        assert(round.target && round.options && round.options.length >= 2);
    }

    assert(roundsGenerated >= 200, `Expected >=200 generated rounds, ran ${roundsGenerated}`);
}

function testHtmlScriptOrder() {
    const html = fs.readFileSync(path.join(__dirname, '..', 'docs', 'index.html'), 'utf8');
    const expectedOrder = [
        'js/gregg_geometry.js',
        'js/stroke_renderer.js',
        'js/curriculum_data.js',
        'js/progression.js',
        'js/quiz_engine.js',
        'js/app.js'
    ];
    let lastIdx = -1;
    for (const src of expectedOrder) {
        const idx = html.indexOf(`<script src="${src}"></script>`);
        assert(idx > lastIdx, `Script ${src} missing or out of order in index.html`);
        lastIdx = idx;
    }
}

function runAll() {
    testGeometryAndProportions();
    console.log('✓ Geometry & proportion invariants passed');

    testCurriculumIntegrity();
    console.log('✓ 12-lesson cumulative curriculum integrity passed');

    testProgressionAndReset();
    console.log('✓ Trailing proficiency, unlocks & per-lesson reset passed');

    testQuizEngineStress();
    console.log('✓ Quiz engine stress test (>400 rounds) passed');

    testHtmlScriptOrder();
    console.log('✓ HTML script load order verified');

    console.log('\nAll verification checks passed!');
}

runAll();
