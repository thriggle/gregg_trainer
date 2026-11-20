/**
 * 12-Lesson Cumulative Gregg Shorthand Curriculum
 * Ordered sequentially after "The Learn Gregg Shorthand Project" (learngreggshorthand.substack.com).
 * Every word and phrase in Lesson N strictly uses only tokens unlocked in Lessons 1..N.
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.GreggCurriculum = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    const STAGES = ['strokes', 'words', 'phrases'];

    const STAGE_LABELS = {
        strokes: '1. Strokes',
        words: '2. Words',
        phrases: '3. Phrases'
    };

    /**
     * Exact lesson number where each geometry token is introduced.
     * Used for strict cumulative curriculum validation.
     */
    const TOKEN_INTRO_LESSON = {
        K: 1, G: 1, R: 1, L: 1, A: 1, E: 1, PERIOD: 1,
        N: 2, M: 2, T: 2, D: 2, DOT_A: 2,
        H: 3, ING: 3, TH: 3, TH2: 3,
        TED: 4, MN: 4,
        P: 5, B: 5, F: 5, V: 5, SH: 5, CH: 5, J: 5,
        S_R: 6, S_L: 6, SES: 6,
        X: 7, PAST_T: 7,
        O: 8, O_SIDE: 8,
        AR: 9, ER: 9, ARS: 9, ERS: 9,
        OO: 10,
        NG: 11, NK: 11, Y_A: 11, Y_E: 11, INGS: 11,
        I_DIPH: 12, OW_DIPH: 12, OI_DIPH: 12, U_DIPH: 12
    };

    function makeItem(lessonNumber, stage, slug, label, phonetic, outlines, hint, tags, confusables) {
        const prefix = `l${lessonNumber}-${stage[0]}`;
        return {
            id: `${prefix}-${slug}`,
            lessonId: `lesson-${lessonNumber}`,
            lessonNumber,
            stage,
            label,
            phonetic,
            outlines,
            hint,
            tags: tags || [],
            confusables: confusables || []
        };
    }

    const LESSONS = [
        // =====================================================================
        // LESSON 1: Forward Curves & Circle Vowels (Substack Lesson 1, Part A)
        // =====================================================================
        {
            id: 'lesson-1',
            number: 1,
            title: 'Forward Curves & Circle Vowels',
            substackRef: 'Lesson 1 (Part A) — Alphabet Basics & Circle Vowels',
            newTokens: ['K', 'G', 'R', 'L', 'A', 'E'],
            intro: {
                summary: 'Gregg Shorthand writes by sound rather than spelling. Your first building blocks are four forward curved strokes and two circle vowels written from left to right.',
                rules: [
                    'Proportion matters: G is twice the length of K; L is twice the length of R.',
                    'K & G arch upward (convex hills, open underneath). R & L bowl downward (concave cups, open on top).',
                    'Large circle = A (long a, short a, ah). Tiny circle = E (long e, short e, short i). Circles tuck smoothly inside curves.'
                ],
                strokePreviews: [
                    { label: 'K (can)', phonetic: 'K', outlines: [['K']], note: 'Short forward arch; brief form for "can".' },
                    { label: 'G (go / good)', phonetic: 'G', outlines: [['G']], note: 'Long forward arch (2x K); brief form for "go, good".' },
                    { label: 'R (are / our)', phonetic: 'R', outlines: [['R']], note: 'Short upward-opening bowl; brief form for "are, our, hour".' },
                    { label: 'L (will / well)', phonetic: 'L', outlines: [['L']], note: 'Long upward-opening bowl (2x R); brief form for "will, well".' },
                    { label: 'A (large circle)', phonetic: 'A', outlines: [['A']], note: 'Large counter-clockwise circle resting on the baseline.' },
                    { label: 'E (tiny circle)', phonetic: 'E', outlines: [['E']], note: 'Tiny circle (less than half the size of A).' }
                ],
                wordExamples: [
                    { label: 'ray', phonetic: 'R - A', outlines: [['R', 'A']], note: 'Short bowl R ending with large A circle tucked inside.' },
                    { label: 'lay', phonetic: 'L - A', outlines: [['L', 'A']], note: 'Long bowl L (2x R) with large A circle tucked inside.' },
                    { label: 'cake', phonetic: 'K - A - K', outlines: [['K', 'A', 'K']], note: 'Two short K arches with large A circle underneath the junction.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(1, 'strokes', 'k', 'K (can)', 'K', [['K']], 'Short forward convex arch; also the brief form for "can".', ['convex', 'short', 'forward', 'k-g'], ['l1-s-g', 'l1-s-r']),
                    makeItem(1, 'strokes', 'g', 'G (go / good)', 'G', [['G']], 'Long forward convex arch (twice K); brief form for "go / good".', ['convex', 'long', 'forward', 'k-g'], ['l1-s-k', 'l1-s-l']),
                    makeItem(1, 'strokes', 'r', 'R (are / our)', 'R', [['R']], 'Short concave bowl opening upward; brief form for "are / our".', ['concave', 'short', 'forward', 'r-l'], ['l1-s-l', 'l1-s-k']),
                    makeItem(1, 'strokes', 'l', 'L (will / well)', 'L', [['L']], 'Long concave bowl (twice R); brief form for "will / well".', ['concave', 'long', 'forward', 'r-l'], ['l1-s-r', 'l1-s-g']),
                    makeItem(1, 'strokes', 'a', 'A (cat, make)', 'A', [['A']], 'Large circle vowel representing A sounds.', ['circle', 'large', 'vowel-a'], ['l1-s-e']),
                    makeItem(1, 'strokes', 'e', 'E / I (get, me)', 'E', [['E']], 'Tiny circle vowel representing E and short I sounds.', ['circle', 'tiny', 'vowel-e'], ['l1-s-a'])
                ],
                words: [
                    makeItem(1, 'words', 'ray', 'ray', 'R - A', [['R', 'A']], 'Short R bowl + large A circle tucked inside.', ['r-l', 'vowel-a'], ['l1-w-lay', 'l1-w-air', 'l1-w-rare']),
                    makeItem(1, 'words', 'lay', 'lay', 'L - A', [['L', 'A']], 'Long L bowl + large A circle tucked inside.', ['r-l', 'vowel-a'], ['l1-w-ray', 'l1-w-ail', 'l1-w-lee']),
                    makeItem(1, 'words', 'air', 'air', 'A - R', [['A', 'R']], 'Large A circle flowing from baseline into short R.', ['r-l', 'vowel-a', 'leading-vowel'], ['l1-w-ail', 'l1-w-ear', 'l1-w-ray']),
                    makeItem(1, 'words', 'ail', 'ail', 'A - L', [['A', 'L']], 'Large A circle flowing into long L bowl.', ['r-l', 'vowel-a', 'leading-vowel'], ['l1-w-air', 'l1-w-lay']),
                    makeItem(1, 'words', 'rare', 'rare', 'R - A - R', [['R', 'A', 'R']], 'Short R + large A inside junction + second short R.', ['r-l', 'vowel-a', 'double-curve'], ['l1-w-rail', 'l1-w-lair', 'l1-w-ray']),
                    makeItem(1, 'words', 'rail', 'rail', 'R - A - L', [['R', 'A', 'L']], 'Short R + large A inside + long L bowl.', ['r-l', 'vowel-a'], ['l1-w-lair', 'l1-w-rare']),
                    makeItem(1, 'words', 'lair', 'lair', 'L - A - R', [['L', 'A', 'R']], 'Long L + large A inside + short R bowl.', ['r-l', 'vowel-a'], ['l1-w-rail', 'l1-w-rare']),
                    makeItem(1, 'words', 'lee', 'lee', 'L - E', [['L', 'E']], 'Long L bowl + tiny E circle tucked inside.', ['r-l', 'vowel-e'], ['l1-w-lay', 'l1-w-key']),
                    makeItem(1, 'words', 'key', 'key', 'K - E', [['K', 'E']], 'Short K arch + tiny E circle underneath.', ['k-g', 'vowel-e'], ['l1-w-gay', 'l1-w-lee', 'l1-w-kick']),
                    makeItem(1, 'words', 'gay', 'gay', 'G - A', [['G', 'A']], 'Long G arch + large A circle underneath.', ['k-g', 'vowel-a'], ['l1-w-key', 'l1-w-gale']),
                    makeItem(1, 'words', 'cake', 'cake', 'K - A - K', [['K', 'A', 'K']], 'Short K + large A underneath + second short K.', ['k-g', 'vowel-a', 'double-curve'], ['l1-w-rake', 'l1-w-kick', 'l1-w-ache']),
                    makeItem(1, 'words', 'ache', 'ache', 'A - K', [['A', 'K']], 'Large A circle leading into short K arch.', ['k-g', 'vowel-a', 'leading-vowel'], ['l1-w-cake', 'l1-w-egg']),
                    makeItem(1, 'words', 'ear', 'ear', 'E - R', [['E', 'R']], 'Tiny E circle leading into short R bowl.', ['r-l', 'vowel-e', 'leading-vowel'], ['l1-w-air', 'l1-w-gear']),
                    makeItem(1, 'words', 'lake', 'lake', 'L - A - K', [['L', 'A', 'K']], 'Long L bowl + large A + short K arch.', ['r-l', 'k-g', 'vowel-a'], ['l1-w-rake', 'l1-w-leak', 'l1-w-lag']),
                    makeItem(1, 'words', 'rake', 'rake', 'R - A - K', [['R', 'A', 'K']], 'Short R bowl + large A + short K arch.', ['r-l', 'k-g', 'vowel-a'], ['l1-w-lake', 'l1-w-cake', 'l1-w-rag']),
                    makeItem(1, 'words', 'leak', 'leak', 'L - E - K', [['L', 'E', 'K']], 'Long L bowl + tiny E + short K arch.', ['r-l', 'k-g', 'vowel-e'], ['l1-w-lake', 'l1-w-kick']),
                    makeItem(1, 'words', 'gale', 'gale', 'G - A - L', [['G', 'A', 'L']], 'Long G arch + large A + long L bowl.', ['k-g', 'r-l', 'vowel-a'], ['l1-w-gay', 'l1-w-lake']),
                    makeItem(1, 'words', 'egg', 'egg', 'E - G', [['E', 'G']], 'Tiny E circle into long G arch.', ['k-g', 'vowel-e', 'leading-vowel'], ['l1-w-ache', 'l1-w-gear']),
                    makeItem(1, 'words', 'rag', 'rag', 'R - A - G', [['R', 'A', 'G']], 'Short R bowl + large A + long G arch.', ['r-l', 'k-g', 'vowel-a'], ['l1-w-lag', 'l1-w-rake']),
                    makeItem(1, 'words', 'lag', 'lag', 'L - A - G', [['L', 'A', 'G']], 'Long L bowl + large A + long G arch.', ['r-l', 'k-g', 'vowel-a'], ['l1-w-rag', 'l1-w-lake']),
                    makeItem(1, 'words', 'kick', 'kick', 'K - E - K', [['K', 'E', 'K']], 'Short K + tiny E underneath + short K.', ['k-g', 'vowel-e'], ['l1-w-cake', 'l1-w-key']),
                    makeItem(1, 'words', 'gear', 'gear', 'G - E - R', [['G', 'E', 'R']], 'Long G arch + tiny E + short R bowl.', ['k-g', 'r-l', 'vowel-e'], ['l1-w-ear', 'l1-w-gale'])
                ],
                phrases: [
                    makeItem(1, 'phrases', 'will-go', 'will go', 'L | G', [['L'], ['G']], 'Brief forms L (will) and G (go).', ['brief-pair'], ['l1-p-can-go', 'l1-p-will-air']),
                    makeItem(1, 'phrases', 'can-go', 'can go', 'K | G', [['K'], ['G']], 'Brief forms K (can) and G (go).', ['brief-pair'], ['l1-p-will-go', 'l1-p-can-rake']),
                    makeItem(1, 'phrases', 'our-lake', 'our lake', 'R | L-A-K', [['R'], ['L', 'A', 'K']], 'Brief form R (our) + lake (L-A-K).', ['our-phrase'], ['l1-p-our-rail', 'l1-p-our-key']),
                    makeItem(1, 'phrases', 'our-key', 'our key', 'R | K-E', [['R'], ['K', 'E']], 'Brief form R (our) + key (K-E).', ['our-phrase'], ['l1-p-our-gear', 'l1-p-good-cake']),
                    makeItem(1, 'phrases', 'our-rail', 'our rail', 'R | R-A-L', [['R'], ['R', 'A', 'L']], 'Brief form R (our) + rail (R-A-L).', ['our-phrase'], ['l1-p-our-lake', 'l1-p-our-gear']),
                    makeItem(1, 'phrases', 'our-gear', 'our gear', 'R | G-E-R', [['R'], ['G', 'E', 'R']], 'Brief form R (our) + gear (G-E-R).', ['our-phrase'], ['l1-p-our-key', 'l1-p-good-gale']),
                    makeItem(1, 'phrases', 'good-cake', 'good cake', 'G | K-A-K', [['G'], ['K', 'A', 'K']], 'Brief form G (good) + cake (K-A-K).', ['good-phrase'], ['l1-p-good-egg', 'l1-p-good-gale']),
                    makeItem(1, 'phrases', 'good-gale', 'good gale', 'G | G-A-L', [['G'], ['G', 'A', 'L']], 'Brief form G (good) + gale (G-A-L).', ['good-phrase'], ['l1-p-good-cake', 'l1-p-our-lake']),
                    makeItem(1, 'phrases', 'good-egg', 'good egg', 'G | E-G', [['G'], ['E', 'G']], 'Brief form G (good) + egg (E-G).', ['good-phrase'], ['l1-p-good-cake']),
                    makeItem(1, 'phrases', 'will-leak', 'will leak', 'L | L-E-K', [['L'], ['L', 'E', 'K']], 'Brief form L (will) + leak (L-E-K).', ['will-phrase'], ['l1-p-will-air', 'l1-p-will-go']),
                    makeItem(1, 'phrases', 'can-rake', 'can rake', 'K | R-A-K', [['K'], ['R', 'A', 'K']], 'Brief form K (can) + rake (R-A-K).', ['can-phrase'], ['l1-p-can-kick', 'l1-p-can-go']),
                    makeItem(1, 'phrases', 'can-kick', 'can kick', 'K | K-E-K', [['K'], ['K', 'E', 'K']], 'Brief form K (can) + kick (K-E-K).', ['can-phrase'], ['l1-p-can-rake']),
                    makeItem(1, 'phrases', 'will-air', 'will air', 'L | A-R', [['L'], ['A', 'R']], 'Brief form L (will) + air (A-R).', ['will-phrase'], ['l1-p-will-leak']),
                    makeItem(1, 'phrases', 'will-go-well', 'will go well.', 'L | G | L .', [['L'], ['G'], ['L'], ['PERIOD']], 'Full sentence ending with the Gregg period slash.', ['sentence'])
                ]
            }
        },

        // =====================================================================
        // LESSON 2: Straight Strokes N, M, T, D (Substack Lesson 1, Part B)
        // =====================================================================
        {
            id: 'lesson-2',
            number: 2,
            title: 'Straight Strokes: N, M, T, D',
            substackRef: 'Lesson 1 (Part B) — Straight Consonants & Brief Forms',
            newTokens: ['N', 'M', 'T', 'D', 'DOT_A'],
            intro: {
                summary: 'Next come four straight consonant strokes: horizontal N/M and upward-slanted T/D, plus the baseline dot for "a / an" and standalone large circle for "I".',
                rules: [
                    'M is twice the length of N (both flat horizontal left-to-right). D is twice the length of T (both written UPWARD at an angle).',
                    'On a single straight stroke or between two aligned straight strokes, circles loop clockwise (right motion).',
                    'Between straight strokes that form an angle (like M-A-T), the circle goes OUTSIDE the angle.'
                ],
                strokePreviews: [
                    { label: 'N (in / not)', phonetic: 'N', outlines: [['N']], note: 'Short horizontal straight line; brief form for "in, not".' },
                    { label: 'M (am / more)', phonetic: 'M', outlines: [['M']], note: 'Long horizontal line (2x N); brief form for "am, more".' },
                    { label: 'T (it / at)', phonetic: 'T', outlines: [['T']], note: 'Short upward diagonal line; brief form for "it, at".' },
                    { label: 'D (would)', phonetic: 'D', outlines: [['D']], note: 'Long upward diagonal line (2x T); brief form for "would".' },
                    { label: 'a / an (dot)', phonetic: 'DOT_A', outlines: [['DOT_A']], note: 'Single dot resting right on the steno baseline.' },
                    { label: 'I (pronoun)', phonetic: 'A', outlines: [['A']], note: 'Standalone large circle on the baseline = "I".' }
                ],
                wordExamples: [
                    { label: 'may', phonetic: 'M - A', outlines: [['M', 'A']], note: 'Long horizontal M with clockwise A circle underneath.' },
                    { label: 'day', phonetic: 'D - A', outlines: [['D', 'A']], note: 'Long upward D with clockwise A circle at the top.' },
                    { label: 'late', phonetic: 'L - A - T', outlines: [['L', 'A', 'T']], note: 'Long concave bowl L + A tucked inside + short upward T.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(2, 'strokes', 'n', 'N (in / not)', 'N', [['N']], 'Short horizontal line; brief form for "in / not".', ['straight', 'horizontal', 'n-m'], ['l2-s-m', 'l2-s-t']),
                    makeItem(2, 'strokes', 'm', 'M (am / more)', 'M', [['M']], 'Long horizontal line (2x N); brief form for "am / more".', ['straight', 'horizontal', 'n-m'], ['l2-s-n', 'l2-s-d']),
                    makeItem(2, 'strokes', 't', 'T (it / at)', 'T', [['T']], 'Short upward diagonal stroke; brief form for "it / at".', ['straight', 'upward', 't-d'], ['l2-s-d', 'l2-s-n']),
                    makeItem(2, 'strokes', 'd', 'D (would)', 'D', [['D']], 'Long upward diagonal stroke (2x T); brief form for "would".', ['straight', 'upward', 't-d'], ['l2-s-t', 'l2-s-m']),
                    makeItem(2, 'strokes', 'dot-a', 'a / an', 'DOT_A', [['DOT_A']], 'Single dot on the steno baseline = "a" or "an".', ['dot', 'brief'], ['l1-s-e']),
                    makeItem(2, 'strokes', 'pron-i', 'I (pronoun)', 'A', [['A']], 'Standalone large circle on the baseline = "I".', ['circle', 'brief'], ['l2-s-dot-a'])
                ],
                words: [
                    makeItem(2, 'words', 'may', 'may', 'M - A', [['M', 'A']], 'Long horizontal M + large A underneath.', ['n-m', 'vowel-a'], ['l2-w-nay', 'l2-w-me', 'l2-w-main']),
                    makeItem(2, 'words', 'nay', 'nay', 'N - A', [['N', 'A']], 'Short horizontal N + large A underneath.', ['n-m', 'vowel-a'], ['l2-w-may', 'l2-w-knee']),
                    makeItem(2, 'words', 'me', 'me', 'M - E', [['M', 'E']], 'Long horizontal M + tiny E circle.', ['n-m', 'vowel-e'], ['l2-w-may', 'l2-w-knee', 'l2-w-mean']),
                    makeItem(2, 'words', 'knee', 'knee', 'N - E', [['N', 'E']], 'Short horizontal N + tiny E circle.', ['n-m', 'vowel-e'], ['l2-w-me', 'l2-w-nay', 'l2-w-need']),
                    makeItem(2, 'words', 'main', 'main', 'M - A - N', [['M', 'A', 'N']], 'M + large A underneath + short N.', ['n-m', 'vowel-a'], ['l2-w-mean', 'l2-w-man', 'l2-w-may']),
                    makeItem(2, 'words', 'mean', 'mean', 'M - E - N', [['M', 'E', 'N']], 'M + tiny E underneath + short N.', ['n-m', 'vowel-e'], ['l2-w-main', 'l2-w-meet', 'l2-w-me']),
                    makeItem(2, 'words', 'day', 'day', 'D - A', [['D', 'A']], 'Long upward D + large A circle.', ['t-d', 'vowel-a'], ['l2-w-tea', 'l2-w-date', 'l2-w-may']),
                    makeItem(2, 'words', 'tea', 'tea', 'T - E', [['T', 'E']], 'Short upward T + tiny E circle.', ['t-d', 'vowel-e'], ['l2-w-day', 'l2-w-eat', 'l2-w-take']),
                    makeItem(2, 'words', 'eat', 'eat', 'E - T', [['E', 'T']], 'Tiny E leading into short upward T.', ['t-d', 'vowel-e', 'leading-vowel'], ['l2-w-aid', 'l2-w-tea']),
                    makeItem(2, 'words', 'aid', 'aid', 'A - D', [['A', 'D']], 'Large A leading into long upward D.', ['t-d', 'vowel-a', 'leading-vowel'], ['l2-w-eat', 'l2-w-aim', 'l2-w-day']),
                    makeItem(2, 'words', 'aim', 'aim', 'A - M', [['A', 'M']], 'Large A leading into long horizontal M.', ['n-m', 'vowel-a', 'leading-vowel'], ['l2-w-aid', 'l2-w-may']),
                    makeItem(2, 'words', 'late', 'late', 'L - A - T', [['L', 'A', 'T']], 'Long L bowl + large A inside + short upward T.', ['r-l', 't-d', 'vowel-a'], ['l2-w-rate', 'l2-w-lead', 'l2-w-date']),
                    makeItem(2, 'words', 'rate', 'rate', 'R - A - T', [['R', 'A', 'T']], 'Short R bowl + large A inside + short upward T.', ['r-l', 't-d', 'vowel-a'], ['l2-w-late', 'l2-w-read', 'l2-w-date']),
                    makeItem(2, 'words', 'read', 'read', 'R - E - D', [['R', 'E', 'D']], 'Short R bowl + tiny E inside + long upward D.', ['r-l', 't-d', 'vowel-e'], ['l2-w-lead', 'l2-w-rate']),
                    makeItem(2, 'words', 'lead', 'lead', 'L - E - D', [['L', 'E', 'D']], 'Long L bowl + tiny E inside + long upward D.', ['r-l', 't-d', 'vowel-e'], ['l2-w-read', 'l2-w-late']),
                    makeItem(2, 'words', 'date', 'date', 'D - A - T', [['D', 'A', 'T']], 'Long D + large A clockwise + short T.', ['t-d', 'vowel-a'], ['l2-w-day', 'l2-w-rate']),
                    makeItem(2, 'words', 'take', 'take', 'T - A - K', [['T', 'A', 'K']], 'Short upward T + large A inside K + short K.', ['t-d', 'k-g', 'vowel-a'], ['l2-w-make', 'l2-w-tea']),
                    makeItem(2, 'words', 'make', 'make', 'M - A - K', [['M', 'A', 'K']], 'Long M + large A inside K + short K.', ['n-m', 'k-g', 'vowel-a'], ['l2-w-take', 'l2-w-name']),
                    makeItem(2, 'words', 'name', 'name', 'N - A - M', [['N', 'A', 'M']], 'Short N + large A underneath + long M.', ['n-m', 'vowel-a'], ['l2-w-main', 'l2-w-make']),
                    makeItem(2, 'words', 'team', 'team', 'T - E - M', [['T', 'E', 'M']], 'Short upward T + tiny E outside corner + long M.', ['t-d', 'n-m', 'vowel-e'], ['l2-w-game', 'l2-w-meet']),
                    makeItem(2, 'words', 'game', 'game', 'G - A - M', [['G', 'A', 'M']], 'Long G arch + large A underneath + long M.', ['k-g', 'n-m', 'vowel-a'], ['l2-w-gate', 'l2-w-name']),
                    makeItem(2, 'words', 'gate', 'gate', 'G - A - T', [['G', 'A', 'T']], 'Long G arch + large A underneath + short upward T.', ['k-g', 't-d', 'vowel-a'], ['l2-w-game', 'l2-w-date']),
                    makeItem(2, 'words', 'rain', 'rain', 'R - A - N', [['R', 'A', 'N']], 'Short R bowl + large A inside + short N.', ['r-l', 'n-m', 'vowel-a'], ['l2-w-train', 'l2-w-main']),
                    makeItem(2, 'words', 'train', 'train', 'T - R - A - N', [['T', 'R', 'A', 'N']], 'Upward T + short R + A inside + short N.', ['t-d', 'r-l', 'n-m'], ['l2-w-rain', 'l2-w-clean']),
                    makeItem(2, 'words', 'clean', 'clean', 'K - L - E - N', [['K', 'L', 'E', 'N']], 'Short K + long L + tiny E inside + short N.', ['k-g', 'r-l', 'vowel-e'], ['l2-w-green', 'l2-w-train']),
                    makeItem(2, 'words', 'green', 'green', 'G - R - E - N', [['G', 'R', 'E', 'N']], 'Long G + short R + tiny E inside + short N.', ['k-g', 'r-l', 'vowel-e'], ['l2-w-clean', 'l2-w-rain']),
                    makeItem(2, 'words', 'need', 'need', 'N - E - D', [['N', 'E', 'D']], 'Short N + tiny E outside angle + long upward D.', ['n-m', 't-d', 'vowel-e'], ['l2-w-meet', 'l2-w-net']),
                    makeItem(2, 'words', 'meet', 'meet', 'M - E - T', [['M', 'E', 'T']], 'Long M + tiny E outside angle + short upward T.', ['n-m', 't-d', 'vowel-e'], ['l2-w-need', 'l2-w-ten']),
                    makeItem(2, 'words', 'net', 'net', 'N - E - T', [['N', 'E', 'T']], 'Short N + tiny E outside angle + short upward T.', ['n-m', 't-d', 'vowel-e'], ['l2-w-ten', 'l2-w-need', 'l2-w-meet']),
                    makeItem(2, 'words', 'ten', 'ten', 'T - E - N', [['T', 'E', 'N']], 'Short upward T + tiny E outside angle + short N.', ['t-d', 'n-m', 'vowel-e'], ['l2-w-net', 'l2-w-let']),
                    makeItem(2, 'words', 'get', 'get', 'G - E - T', [['G', 'E', 'T']], 'Long G arch + tiny E underneath + short upward T.', ['k-g', 't-d', 'vowel-e'], ['l2-w-let', 'l2-w-gate']),
                    makeItem(2, 'words', 'let', 'let', 'L - E - T', [['L', 'E', 'T']], 'Long L bowl + tiny E inside + short upward T.', ['r-l', 't-d', 'vowel-e'], ['l2-w-get', 'l2-w-late'])
                ],
                phrases: [
                    makeItem(2, 'phrases', 'i-am', 'I am', 'A | M', [['A'], ['M']], 'Large circle (I) + long M (am).', ['pronoun-i'], ['l2-p-i-will', 'l2-p-i-would']),
                    makeItem(2, 'phrases', 'i-will', 'I will', 'A | L', [['A'], ['L']], 'Large circle (I) + long L (will).', ['pronoun-i'], ['l2-p-i-am', 'l2-p-i-would']),
                    makeItem(2, 'phrases', 'in-it', 'in it', 'N | T', [['N'], ['T']], 'Short N (in) + short upward T (it).', ['brief-pair'], ['l2-p-at-it', 'l2-p-it-would']),
                    makeItem(2, 'phrases', 'at-it', 'at it', 'T | T', [['T'], ['T']], 'Two short T strokes (at + it).', ['brief-pair'], ['l2-p-in-it', 'l2-p-it-would']),
                    makeItem(2, 'phrases', 'it-would', 'it would', 'T | D', [['T'], ['D']], 'Short T (it) + long D (would).', ['brief-pair'], ['l2-p-i-would', 'l2-p-in-it']),
                    makeItem(2, 'phrases', 'i-would', 'I would', 'A | D', [['A'], ['D']], 'Large circle (I) + long D (would).', ['pronoun-i'], ['l2-p-it-would', 'l2-p-i-will']),
                    makeItem(2, 'phrases', 'in-a-day', 'in a day', 'N | DOT_A | D-A', [['N'], ['DOT_A'], ['D', 'A']], 'N (in) + baseline dot (a) + day (D-A).', ['dot-a'], ['l2-p-good-day']),
                    makeItem(2, 'phrases', 'i-can-make-it', 'I can make it.', 'A | K | M-A-K | T .', [['A'], ['K'], ['M', 'A', 'K'], ['T'], ['PERIOD']], 'Complete sentence using brief forms I, can, it.', ['sentence'], ['l2-p-it-will-rain']),
                    makeItem(2, 'phrases', 'it-will-rain', 'it will rain.', 'T | L | R-A-N .', [['T'], ['L'], ['R', 'A', 'N'], ['PERIOD']], 'T (it) + L (will) + rain (R-A-N).', ['sentence'], ['l2-p-take-a-train']),
                    makeItem(2, 'phrases', 'take-a-train', 'take a train.', 'T-A-K | DOT_A | T-R-A-N .', [['T', 'A', 'K'], ['DOT_A'], ['T', 'R', 'A', 'N'], ['PERIOD']], 'take + baseline dot (a) + train.', ['sentence'], ['l2-p-meet-me-at-ten']),
                    makeItem(2, 'phrases', 'meet-me-at-ten', 'meet me at ten.', 'M-E-T | M-E | T | T-E-N .', [['M', 'E', 'T'], ['M', 'E'], ['T'], ['T', 'E', 'N'], ['PERIOD']], 'Practice M/T/N distinctions in context.', ['sentence'], ['l2-p-i-am-late']),
                    makeItem(2, 'phrases', 'i-am-late', 'I am late.', 'A | M | L-A-T .', [['A'], ['M'], ['L', 'A', 'T'], ['PERIOD']], 'I + am + late.', ['sentence'], ['l2-p-good-day']),
                    makeItem(2, 'phrases', 'good-day', 'good day', 'G | D-A', [['G'], ['D', 'A']], 'Brief form G (good) + day (D-A).', ['brief-pair'], ['l2-p-in-a-day']),
                    makeItem(2, 'phrases', 'a-green-lake', 'a green lake', 'DOT_A | G-R-E-N | L-A-K', [['DOT_A'], ['G', 'R', 'E', 'N'], ['L', 'A', 'K']], 'Baseline dot (a) + green + lake.', ['dot-a'], ['l2-p-take-a-train'])
                ]
            }
        },

        // =====================================================================
        // LESSON 3: H, -ing, and TH Sounds (Substack Lesson 2)
        // =====================================================================
        {
            id: 'lesson-3',
            number: 3,
            title: 'H, -ing, and TH Sounds',
            substackRef: 'Lesson 2 — Aspirate H, -ing Dot & TH Curves',
            newTokens: ['H', 'ING', 'TH', 'TH2'],
            intro: {
                summary: 'This lesson adds the aspirate H dot above a vowel, the trailing -ing dot at the end of verbs, and the two tiny upward TH curves.',
                rules: [
                    'H is written as a crisp dot directly ABOVE the vowel it precedes (write the word first, then tap H above the vowel).',
                    '-ing is a crisp dot placed just past the final stroke of a word.',
                    'TH is a short curved upward stroke (over-curve or under-curve depending on the adjoining stroke); TH alone = "the, their, there".'
                ],
                strokePreviews: [
                    { label: 'H (aspirate dot)', phonetic: 'H', outlines: [['H']], note: 'Dot placed high above the vowel (or above line).' },
                    { label: '-ing (ending dot)', phonetic: 'ING', outlines: [['ING']], note: 'Dot placed right after the end of a word.' },
                    { label: 'TH (over-curve)', phonetic: 'TH', outlines: [['TH']], note: 'Short upward over-curve; brief form for "the, their, there".' },
                    { label: 'TH2 (under-curve)', phonetic: 'TH2', outlines: [['TH2']], note: 'Short upward under-curve variant for smooth joining.' },
                    { label: 'he (H + E)', phonetic: 'H - E', outlines: [['H', 'E']], note: 'Tiny E circle with H dot directly above it.' }
                ],
                wordExamples: [
                    { label: 'hail', phonetic: 'H - A - L', outlines: [['H', 'A', 'L']], note: 'A-L outline with H dot placed right above the A circle.' },
                    { label: 'reading', phonetic: 'R - E - D - ING', outlines: [['R', 'E', 'D', 'ING']], note: 'R-E-D followed by a crisp -ing dot at the end.' },
                    { label: 'they', phonetic: 'TH - A', outlines: [['TH', 'A']], note: 'Short upward TH over-curve with large A tucked inside.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(3, 'strokes', 'h', 'H', 'H', [['H']], 'Dot placed directly above the vowel.', ['dot', 'h-dot'], ['l3-s-ing', 'l3-s-he']),
                    makeItem(3, 'strokes', 'ing', '-ing', 'ING', [['ING']], 'Dot placed just after the end of a word.', ['dot', 'ing-dot'], ['l3-s-h']),
                    makeItem(3, 'strokes', 'th', 'TH (the / their / there)', 'TH', [['TH']], 'Short upward over-curve; brief form for "the, their, there".', ['curve', 'th-stroke'], ['l3-s-th2', 'l2-s-t']),
                    makeItem(3, 'strokes', 'th2', 'TH (alternate form)', 'TH2', [['TH2']], 'Short upward under-curve variant of TH.', ['curve', 'th-stroke'], ['l3-s-th', 'l2-s-t']),
                    makeItem(3, 'strokes', 'he', 'he', 'H - E', [['H', 'E']], 'Tiny E circle with the H dot above.', ['h-dot', 'brief'], ['l3-s-h', 'l1-s-e'])
                ],
                words: [
                    makeItem(3, 'words', 'hay', 'hay', 'H - A', [['H', 'A']], 'Large A circle with H dot directly above.', ['h-dot', 'vowel-a'], ['l3-w-hail', 'l3-w-hair', 'l3-w-he']),
                    makeItem(3, 'words', 'he', 'he', 'H - E', [['H', 'E']], 'Tiny E circle with H dot directly above.', ['h-dot', 'vowel-e'], ['l3-w-hay', 'l3-w-hear']),
                    makeItem(3, 'words', 'hat', 'hat', 'H - A - T', [['H', 'A', 'T']], 'Large A + upward T + H dot above A.', ['h-dot', 't-d', 'vowel-a'], ['l3-w-heat', 'l3-w-ham']),
                    makeItem(3, 'words', 'heat', 'heat', 'H - E - T', [['H', 'E', 'T']], 'Tiny E + upward T + H dot above E.', ['h-dot', 't-d', 'vowel-e'], ['l3-w-hat', 'l3-w-hid', 'l3-w-head']),
                    makeItem(3, 'words', 'hid', 'hid', 'H - E - D', [['H', 'E', 'D']], 'Tiny E + long upward D + H dot above E.', ['h-dot', 't-d', 'vowel-e'], ['l3-w-heat', 'l3-w-head']),
                    makeItem(3, 'words', 'hail', 'hail', 'H - A - L', [['H', 'A', 'L']], 'A-L with H dot directly above the A circle.', ['h-dot', 'r-l', 'vowel-a'], ['l3-w-hair', 'l3-w-hill', 'l3-w-hay']),
                    makeItem(3, 'words', 'hair', 'hair', 'H - A - R', [['H', 'A', 'R']], 'A-R with H dot directly above the A circle.', ['h-dot', 'r-l', 'vowel-a'], ['l3-w-hail', 'l3-w-hear']),
                    makeItem(3, 'words', 'hear', 'hear', 'H - E - R', [['H', 'E', 'R']], 'E-R with H dot directly above the E circle.', ['h-dot', 'r-l', 'vowel-e'], ['l3-w-hair', 'l3-w-hill', 'l3-w-hearing']),
                    makeItem(3, 'words', 'hill', 'hill', 'H - E - L', [['H', 'E', 'L']], 'E-L with H dot directly above the E circle.', ['h-dot', 'r-l', 'vowel-e'], ['l3-w-hail', 'l3-w-hear']),
                    makeItem(3, 'words', 'ham', 'ham', 'H - A - M', [['H', 'A', 'M']], 'A-M with H dot directly above the A circle.', ['h-dot', 'n-m', 'vowel-a'], ['l3-w-hat', 'l3-w-head']),
                    makeItem(3, 'words', 'making', 'making', 'M - A - K - ING', [['M', 'A', 'K', 'ING']], 'make (M-A-K) + trailing -ing dot.', ['ing-dot'], ['l3-w-taking', 'l3-w-meeting']),
                    makeItem(3, 'words', 'taking', 'taking', 'T - A - K - ING', [['T', 'A', 'K', 'ING']], 'take (T-A-K) + trailing -ing dot.', ['ing-dot'], ['l3-w-making', 'l3-w-eating']),
                    makeItem(3, 'words', 'hearing', 'hearing', 'H - E - R - ING', [['H', 'E', 'R', 'ING']], 'hear (H-E-R) + trailing -ing dot.', ['ing-dot', 'h-dot'], ['l3-w-reading', 'l3-w-raining']),
                    makeItem(3, 'words', 'reading', 'reading', 'R - E - D - ING', [['R', 'E', 'D', 'ING']], 'read (R-E-D) + trailing -ing dot.', ['ing-dot'], ['l3-w-hearing', 'l3-w-eating']),
                    makeItem(3, 'words', 'eating', 'eating', 'E - T - ING', [['E', 'T', 'ING']], 'eat (E-T) + trailing -ing dot.', ['ing-dot'], ['l3-w-taking', 'l3-w-meeting']),
                    makeItem(3, 'words', 'meeting', 'meeting', 'M - E - T - ING', [['M', 'E', 'T', 'ING']], 'meet (M-E-T) + trailing -ing dot.', ['ing-dot'], ['l3-w-making', 'l3-w-eating']),
                    makeItem(3, 'words', 'raining', 'raining', 'R - A - N - ING', [['R', 'A', 'N', 'ING']], 'rain (R-A-N) + trailing -ing dot.', ['ing-dot'], ['l3-w-reading', 'l3-w-hearing']),
                    makeItem(3, 'words', 'they', 'they', 'TH - A', [['TH', 'A']], 'TH over-curve + large A circle inside.', ['th-stroke', 'vowel-a'], ['l3-w-that', 'l3-w-then']),
                    makeItem(3, 'words', 'that', 'that', 'TH - A - T', [['TH', 'A', 'T']], 'TH + large A + short upward T.', ['th-stroke', 'vowel-a'], ['l3-w-they', 'l3-w-threat']),
                    makeItem(3, 'words', 'then', 'then', 'TH - E - N', [['TH', 'E', 'N']], 'TH + tiny E + short N.', ['th-stroke', 'vowel-e'], ['l3-w-them', 'l3-w-they']),
                    makeItem(3, 'words', 'them', 'them', 'TH - E - M', [['TH', 'E', 'M']], 'TH + tiny E + long M.', ['th-stroke', 'vowel-e'], ['l3-w-then', 'l3-w-teeth']),
                    makeItem(3, 'words', 'teeth', 'teeth', 'T - E - TH2', [['T', 'E', 'TH2']], 'T + tiny E + upward TH under-curve.', ['th-stroke', 'vowel-e'], ['l3-w-death', 'l3-w-earth']),
                    makeItem(3, 'words', 'earth', 'earth', 'E - R - TH', [['E', 'R', 'TH']], 'Tiny E + short R + TH.', ['th-stroke', 'vowel-e'], ['l3-w-health', 'l3-w-teeth']),
                    makeItem(3, 'words', 'health', 'health', 'H - E - L - TH', [['H', 'E', 'L', 'TH']], 'E-L-TH with H dot above E.', ['th-stroke', 'h-dot'], ['l3-w-earth', 'l3-w-hill']),
                    makeItem(3, 'words', 'three', 'three', 'TH - R - E', [['TH', 'R', 'E']], 'TH over-curve + short R + tiny E.', ['th-stroke', 'vowel-e'], ['l3-w-threat', 'l3-w-they']),
                    makeItem(3, 'words', 'thick', 'thick', 'TH - E - K', [['TH', 'E', 'K']], 'TH over-curve + tiny E + short K.', ['th-stroke', 'k-g'], ['l3-w-then', 'l3-w-teeth']),
                    makeItem(3, 'words', 'death', 'death', 'D - E - TH2', [['D', 'E', 'TH2']], 'Long D + tiny E + TH under-curve.', ['th-stroke', 't-d'], ['l3-w-teeth', 'l3-w-threat']),
                    makeItem(3, 'words', 'threat', 'threat', 'TH - R - E - T', [['TH', 'R', 'E', 'T']], 'TH + short R + tiny E + short T.', ['th-stroke', 't-d'], ['l3-w-three', 'l3-w-that'])
                ],
                phrases: [
                    makeItem(3, 'phrases', 'in-the', 'in the', 'N | TH', [['N'], ['TH']], 'Short N (in) + TH (the).', ['th-phrase'], ['l3-p-at-the', 'l3-p-he-will']),
                    makeItem(3, 'phrases', 'at-the', 'at the', 'T | TH', [['T'], ['TH']], 'Short T (at) + TH (the).', ['th-phrase'], ['l3-p-in-the', 'l3-p-at-the-gate']),
                    makeItem(3, 'phrases', 'he-will', 'he will', 'H-E | L', [['H', 'E'], ['L']], 'he (H-E) + L (will).', ['he-phrase'], ['l3-p-he-can', 'l3-p-he-will-go']),
                    makeItem(3, 'phrases', 'he-can', 'he can', 'H-E | K', [['H', 'E'], ['K']], 'he (H-E) + K (can).', ['he-phrase'], ['l3-p-he-will', 'l3-p-he-can-make-it']),
                    makeItem(3, 'phrases', 'he-will-go', 'he will go.', 'H-E | L | G .', [['H', 'E'], ['L'], ['G'], ['PERIOD']], 'he + will + go.', ['sentence'], ['l3-p-he-can-make-it']),
                    makeItem(3, 'phrases', 'he-can-make-it', 'he can make it.', 'H-E | K | M-A-K | T .', [['H', 'E'], ['K'], ['M', 'A', 'K'], ['T'], ['PERIOD']], 'he + can + make + it.', ['sentence'], ['l3-p-he-will-go']),
                    makeItem(3, 'phrases', 'in-the-rain', 'in the rain', 'N | TH | R-A-N', [['N'], ['TH'], ['R', 'A', 'N']], 'in + the + rain.', ['th-phrase'], ['l3-p-in-the-air', 'l3-p-at-the-gate']),
                    makeItem(3, 'phrases', 'at-the-gate', 'at the gate', 'T | TH | G-A-T', [['T'], ['TH'], ['G', 'A', 'T']], 'at + the + gate.', ['th-phrase'], ['l3-p-in-the-rain']),
                    makeItem(3, 'phrases', 'in-the-air', 'in the air', 'N | TH | A-R', [['N'], ['TH'], ['A', 'R']], 'in + the + air.', ['th-phrase'], ['l3-p-in-the-rain', 'l3-p-the-green-hill']),
                    makeItem(3, 'phrases', 'they-will-meet-me', 'they will meet me.', 'TH-A | L | M-E-T | M-E .', [['TH', 'A'], ['L'], ['M', 'E', 'T'], ['M', 'E'], ['PERIOD']], 'they + will + meet + me.', ['sentence'], ['l3-p-they-are-reading']),
                    makeItem(3, 'phrases', 'the-green-hill', 'the green hill', 'TH | G-R-E-N | H-E-L', [['TH'], ['G', 'R', 'E', 'N'], ['H', 'E', 'L']], 'the + green + hill.', ['th-phrase'], ['l3-p-in-the-air']),
                    makeItem(3, 'phrases', 'they-are-reading', 'they are reading.', 'TH-A | R | R-E-D-ING .', [['TH', 'A'], ['R'], ['R', 'E', 'D', 'ING'], ['PERIOD']], 'they + are + reading.', ['sentence', 'ing-dot'], ['l3-p-he-can-hear-them']),
                    makeItem(3, 'phrases', 'he-can-hear-them', 'he can hear them.', 'H-E | K | H-E-R | TH-E-M .', [['H', 'E'], ['K'], ['H', 'E', 'R'], ['TH', 'E', 'M'], ['PERIOD']], 'he + can + hear + them.', ['sentence'], ['l3-p-they-will-meet-me']),
                    makeItem(3, 'phrases', 'taking-the-train', 'I am taking the train.', 'A | M | T-A-K-ING | TH | T-R-A-N .', [['A'], ['M'], ['T', 'A', 'K', 'ING'], ['TH'], ['T', 'R', 'A', 'N'], ['PERIOD']], 'I + am + taking + the + train.', ['sentence', 'ing-dot'], ['l3-p-they-are-reading'])
                ]
            }
        },

        // =====================================================================
        // LESSON 4: Blends D+T & M+N + Phrasing (Substack Lessons 3 & 4)
        // =====================================================================
        {
            id: 'lesson-4',
            number: 4,
            title: 'Blends (D+T, M+N) & Phrasing',
            substackRef: 'Lessons 3 & 4 — Blended Strokes & Common Phrases',
            newTokens: ['TED', 'MN'],
            intro: {
                summary: 'When two same-direction straight strokes follow each other without an angle, Gregg blends them into a single extra-long stroke — cutting pen lifts and speeding up -ted/-ded and m-n words.',
                rules: [
                    'TED / DED (extra-long upward diagonal, ~3x T): expresses T+D, D+T, D+D, and endings -ted or -ded.',
                    'MN / MEM (extra-long horizontal line, ~3x N): expresses M+N, N+M, or M+M (such as men, many, memory).',
                    'Common brief words join seamlessly into phrases without lifting the pen (e.g., I-can, I-will, in-the).'
                ],
                strokePreviews: [
                    { label: 'TED / DED blend', phonetic: 'TED', outlines: [['TED']], note: 'Extra-long upward stroke (~3x T) for ted, ded, did.' },
                    { label: 'MN / MEM blend', phonetic: 'MN', outlines: [['MN']], note: 'Extra-long horizontal stroke (~3x N) for mn, mem.' },
                    { label: 'I can (phrase)', phonetic: 'A - K', outlines: [['A', 'K']], note: 'Joined phrase: large circle I flowing directly into K.' },
                    { label: 'I will (phrase)', phonetic: 'A - L', outlines: [['A', 'L']], note: 'Joined phrase: large circle I flowing directly into L.' },
                    { label: 'in the (phrase)', phonetic: 'N - TH', outlines: [['N', 'TH']], note: 'Joined phrase: horizontal N + upward TH.' }
                ],
                wordExamples: [
                    { label: 'needed', phonetic: 'N - E - TED', outlines: [['N', 'E', 'TED']], note: 'Short N + tiny E + extra-long upward TED blend.' },
                    { label: 'many', phonetic: 'MN - E', outlines: [['MN', 'E']], note: 'Extra-long MN blend + tiny final E circle.' },
                    { label: 'memory', phonetic: 'MN - R - E', outlines: [['MN', 'R', 'E']], note: 'Extra-long MN blend (mem) + R + E.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(4, 'strokes', 'ted', 'TED / DED', 'TED', [['TED']], 'Extra-long upward diagonal (~3x T) for -ted/-ded/did.', ['blend', 'upward'], ['l2-s-d', 'l4-s-mn']),
                    makeItem(4, 'strokes', 'mn', 'MN / MEM', 'MN', [['MN']], 'Extra-long horizontal stroke (~3x N) for m-n/mem.', ['blend', 'horizontal'], ['l2-s-m', 'l4-s-ted']),
                    makeItem(4, 'strokes', 'i-can', 'I can', 'A - K', [['A', 'K']], 'Joined phrase outline for "I can".', ['phrase-stroke'], ['l4-s-i-will', 'l1-w-ache']),
                    makeItem(4, 'strokes', 'i-will', 'I will', 'A - L', [['A', 'L']], 'Joined phrase outline for "I will".', ['phrase-stroke'], ['l4-s-i-can', 'l1-w-ail']),
                    makeItem(4, 'strokes', 'in-the', 'in the', 'N - TH', [['N', 'TH']], 'Joined phrase outline for "in the".', ['phrase-stroke'], ['l3-s-th', 'l2-s-n'])
                ],
                words: [
                    makeItem(4, 'words', 'men', 'men', 'MN', [['MN']], 'Extra-long horizontal MN blend.', ['blend-mn'], ['l4-w-many', 'l4-w-minute', 'l4-w-mend']),
                    makeItem(4, 'words', 'many', 'many', 'MN - E', [['MN', 'E']], 'Extra-long MN + tiny E circle.', ['blend-mn'], ['l4-w-men', 'l4-w-memory', 'l4-w-minute']),
                    makeItem(4, 'words', 'memory', 'memory', 'MN - R - E', [['MN', 'R', 'E']], 'MN (mem) + short R + tiny E.', ['blend-mn'], ['l4-w-many', 'l4-w-manner']),
                    makeItem(4, 'words', 'minute', 'minute', 'MN - T', [['MN', 'T']], 'Extra-long MN + short upward T.', ['blend-mn'], ['l4-w-mend', 'l4-w-men']),
                    makeItem(4, 'words', 'mend', 'mend', 'MN - D', [['MN', 'D']], 'Extra-long MN + long upward D.', ['blend-mn'], ['l4-w-minute', 'l4-w-men']),
                    makeItem(4, 'words', 'manner', 'manner', 'MN - R', [['MN', 'R']], 'Extra-long MN + short R bowl.', ['blend-mn'], ['l4-w-memory', 'l4-w-many']),
                    makeItem(4, 'words', 'today', 'today', 'T - D', [['T', 'D']], 'Upward T+D outline (brief form for "today").', ['brief-compound'], ['l4-w-did', 'l4-w-data']),
                    makeItem(4, 'words', 'did', 'did / date', 'TED', [['TED']], 'Extra-long upward TED/DED blend.', ['blend-ted'], ['l4-w-added', 'l4-w-needed']),
                    makeItem(4, 'words', 'needed', 'needed', 'N - E - TED', [['N', 'E', 'TED']], 'Short N + tiny E + extra-long TED blend.', ['blend-ted'], ['l4-w-ended', 'l4-w-dated']),
                    makeItem(4, 'words', 'dated', 'dated', 'D - A - TED', [['D', 'A', 'TED']], 'Long D + large A + extra-long TED blend.', ['blend-ted'], ['l4-w-rated', 'l4-w-hated']),
                    makeItem(4, 'words', 'heated', 'heated', 'H - E - TED', [['H', 'E', 'TED']], 'E-TED with H dot above E.', ['blend-ted', 'h-dot'], ['l4-w-hated', 'l4-w-needed']),
                    makeItem(4, 'words', 'rated', 'rated', 'R - A - TED', [['R', 'A', 'TED']], 'Short R + large A + extra-long TED blend.', ['blend-ted'], ['l4-w-dated', 'l4-w-treated']),
                    makeItem(4, 'words', 'hated', 'hated', 'H - A - TED', [['H', 'A', 'TED']], 'A-TED with H dot above A.', ['blend-ted', 'h-dot'], ['l4-w-heated', 'l4-w-dated']),
                    makeItem(4, 'words', 'added', 'added', 'A - TED', [['A', 'TED']], 'Large A circle + extra-long TED blend.', ['blend-ted'], ['l4-w-ended', 'l4-w-did']),
                    makeItem(4, 'words', 'treated', 'treated', 'T - R - E - TED', [['T', 'R', 'E', 'TED']], 'T-R-E + extra-long TED blend.', ['blend-ted'], ['l4-w-rated', 'l4-w-dated']),
                    makeItem(4, 'words', 'handed', 'handed', 'H - A - N - TED', [['H', 'A', 'N', 'TED']], 'A-N-TED with H dot above A.', ['blend-ted', 'h-dot'], ['l4-w-ended', 'l4-w-added']),
                    makeItem(4, 'words', 'ended', 'ended', 'E - N - TED', [['E', 'N', 'TED']], 'Tiny E + short N + extra-long TED blend.', ['blend-ted'], ['l4-w-needed', 'l4-w-handed']),
                    makeItem(4, 'words', 'data', 'data', 'D - A - T - A', [['D', 'A', 'T', 'A']], 'Long D + A + short T + A.', ['t-d', 'vowel-a'], ['l4-w-detail', 'l4-w-dated']),
                    makeItem(4, 'words', 'detail', 'detail', 'D - E - T - A - L', [['D', 'E', 'T', 'A', 'L']], 'D-E-T-A-L.', ['t-d', 'r-l'], ['l4-w-data', 'l4-w-dated'])
                ],
                phrases: [
                    makeItem(4, 'phrases', 'i-can', 'I can', 'A-K', [['A', 'K']], 'Joined phrase: large A (I) + K (can).', ['joined-phrase'], ['l4-p-i-will', 'l4-p-i-am']),
                    makeItem(4, 'phrases', 'i-will', 'I will', 'A-L', [['A', 'L']], 'Joined phrase: large A (I) + L (will).', ['joined-phrase'], ['l4-p-i-can', 'l4-p-i-would']),
                    makeItem(4, 'phrases', 'i-would', 'I would', 'A-D', [['A', 'D']], 'Joined phrase: large A (I) + D (would).', ['joined-phrase'], ['l4-p-i-will', 'l4-p-he-would']),
                    makeItem(4, 'phrases', 'i-am', 'I am', 'A-M', [['A', 'M']], 'Joined phrase: large A (I) + M (am).', ['joined-phrase'], ['l4-p-i-can', 'l4-p-i-would']),
                    makeItem(4, 'phrases', 'he-would', 'he would', 'H-E-D', [['H', 'E', 'D']], 'Joined phrase: he (H-E) + would (D).', ['joined-phrase'], ['l4-p-they-would', 'l4-p-i-would']),
                    makeItem(4, 'phrases', 'they-would', 'they would', 'TH-A-D', [['TH', 'A', 'D']], 'Joined phrase: they (TH-A) + would (D).', ['joined-phrase'], ['l4-p-he-would', 'l4-p-it-will']),
                    makeItem(4, 'phrases', 'it-will', 'it will', 'T-L', [['T', 'L']], 'Joined phrase: it (T) + will (L).', ['joined-phrase'], ['l4-p-did-he', 'l4-p-i-will']),
                    makeItem(4, 'phrases', 'did-he', 'did he', 'TED | H-E', [['TED'], ['H', 'E']], 'did (TED) + he (H-E).', ['blend-phrase'], ['l4-p-he-needed-it']),
                    makeItem(4, 'phrases', 'he-needed-it', 'he needed it.', 'H-E | N-E-TED | T .', [['H', 'E'], ['N', 'E', 'TED'], ['T'], ['PERIOD']], 'he + needed + it.', ['sentence'], ['l4-p-it-would-not']),
                    makeItem(4, 'phrases', 'it-would-not', 'it would not.', 'T-D | N .', [['T', 'D'], ['N'], ['PERIOD']], 'it-would (joined T-D) + not (N).', ['sentence'], ['l4-p-he-needed-it']),
                    makeItem(4, 'phrases', 'he-will-go-today', 'he will go today.', 'H-E-L | G | T-D .', [['H', 'E', 'L'], ['G'], ['T', 'D'], ['PERIOD']], 'he-will + go + today.', ['sentence'], ['l4-p-needed-more-data']),
                    makeItem(4, 'phrases', 'needed-more-data', 'they needed more data.', 'TH-A | N-E-TED | M | D-A-T-A .', [['TH', 'A'], ['N', 'E', 'TED'], ['M'], ['D', 'A', 'T', 'A'], ['PERIOD']], 'they + needed + more + data.', ['sentence'], ['l4-p-a-good-detail']),
                    makeItem(4, 'phrases', 'a-good-detail', 'a good detail', 'DOT_A | G | D-E-T-A-L', [['DOT_A'], ['G'], ['D', 'E', 'T', 'A', 'L']], 'a + good + detail.', ['phrase'], ['l4-p-many-men-here']),
                    makeItem(4, 'phrases', 'many-men-here', 'many men are here.', 'MN-E | MN | R | H-E-R .', [['MN', 'E'], ['MN'], ['R'], ['H', 'E', 'R'], ['PERIOD']], 'many + men + are + here.', ['sentence'], ['l4-p-he-will-go-today'])
                ]
            }
        },

        // =====================================================================
        // LESSON 5: Downward Strokes P/B, F/V, SH/CH/J (Substack Lessons 5 & 6)
        // =====================================================================
        {
            id: 'lesson-5',
            number: 5,
            title: 'Downward Strokes: P/B, F/V, SH/CH/J',
            substackRef: 'Lessons 5 & 6 — Unlocking the Downward Consonants',
            newTokens: ['P', 'B', 'F', 'V', 'SH', 'CH', 'J'],
            intro: {
                summary: 'Downward strokes open up hundreds of everyday words. Notice the three directional shapes: left-curves "(", right-curves ")", and straight downward slashes.',
                rules: [
                    'P & B curve downward like a left parenthesis "(" (B is longer than P). Brief forms: P = put, B = be / by / but.',
                    'F & V curve downward like a right parenthesis ")" (V is longer than F). Brief forms: F = for, V = have.',
                    'SH (short), CH (medium), and J (long) are straight downward slashes. Brief forms: SH = shall / ship, CH = which / change.'
                ],
                strokePreviews: [
                    { label: 'P (put)', phonetic: 'P', outlines: [['P']], note: 'Medium downward left-curve "(".' },
                    { label: 'B (be / by / but)', phonetic: 'B', outlines: [['B']], note: 'Long downward left-curve "(".' },
                    { label: 'F (for)', phonetic: 'F', outlines: [['F']], note: 'Medium downward right-curve ")".' },
                    { label: 'V (have)', phonetic: 'V', outlines: [['V']], note: 'Long downward right-curve ")".' },
                    { label: 'SH (shall / ship)', phonetic: 'SH', outlines: [['SH']], note: 'Short downward slash.' },
                    { label: 'CH (which / change)', phonetic: 'CH', outlines: [['CH']], note: 'Medium downward slash.' },
                    { label: 'J (age)', phonetic: 'J', outlines: [['J']], note: 'Long downward slash.' }
                ],
                wordExamples: [
                    { label: 'pay', phonetic: 'P - A', outlines: [['P', 'A']], note: 'Downward P ending on the baseline with A tucked inside.' },
                    { label: 'brief', phonetic: 'B - R - E - F', outlines: [['B', 'R', 'E', 'F']], note: 'Long downward B + R + E + downward F.' },
                    { label: 'check', phonetic: 'CH - E - K', outlines: [['CH', 'E', 'K']], note: 'Medium downward CH + tiny E + short K arch.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(5, 'strokes', 'p', 'P (put)', 'P', [['P']], 'Medium downward left-curve "("; brief form for "put".', ['downward', 'left-curve', 'p-b'], ['l5-s-b', 'l5-s-f']),
                    makeItem(5, 'strokes', 'b', 'B (be / by / but)', 'B', [['B']], 'Long downward left-curve "("; brief form for "be / by / but".', ['downward', 'left-curve', 'p-b'], ['l5-s-p', 'l5-s-v']),
                    makeItem(5, 'strokes', 'f', 'F (for)', 'F', [['F']], 'Medium downward right-curve ")"; brief form for "for".', ['downward', 'right-curve', 'f-v'], ['l5-s-v', 'l5-s-p']),
                    makeItem(5, 'strokes', 'v', 'V (have)', 'V', [['V']], 'Long downward right-curve ")"; brief form for "have".', ['downward', 'right-curve', 'f-v'], ['l5-s-f', 'l5-s-b']),
                    makeItem(5, 'strokes', 'sh', 'SH (shall / ship)', 'SH', [['SH']], 'Short straight downward slash; brief form for "shall / ship".', ['downward', 'slash', 'sh-ch-j'], ['l5-s-ch', 'l5-s-j']),
                    makeItem(5, 'strokes', 'ch', 'CH (which / change)', 'CH', [['CH']], 'Medium straight downward slash; brief form for "which / change".', ['downward', 'slash', 'sh-ch-j'], ['l5-s-sh', 'l5-s-j']),
                    makeItem(5, 'strokes', 'j', 'J (age)', 'J', [['J']], 'Long straight downward slash.', ['downward', 'slash', 'sh-ch-j'], ['l5-s-ch', 'l5-s-sh'])
                ],
                words: [
                    makeItem(5, 'words', 'pay', 'pay', 'P - A', [['P', 'A']], 'Medium P + large A inside curve.', ['p-b', 'vowel-a'], ['l5-w-bay', 'l5-w-pea', 'l5-w-page']),
                    makeItem(5, 'words', 'bay', 'bay', 'B - A', [['B', 'A']], 'Long B + large A inside curve.', ['p-b', 'vowel-a'], ['l5-w-pay', 'l5-w-baby']),
                    makeItem(5, 'words', 'pea', 'pea', 'P - E', [['P', 'E']], 'Medium P + tiny E inside curve.', ['p-b', 'vowel-e'], ['l5-w-pay', 'l5-w-fee', 'l5-w-ape']),
                    makeItem(5, 'words', 'ape', 'ape', 'A - P', [['A', 'P']], 'Large A leading into downward P.', ['p-b', 'leading-vowel'], ['l5-w-pay', 'l5-w-age']),
                    makeItem(5, 'words', 'fee', 'fee', 'F - E', [['F', 'E']], 'Medium F right-curve + tiny E inside.', ['f-v', 'vowel-e'], ['l5-w-free', 'l5-w-fear', 'l5-w-pea']),
                    makeItem(5, 'words', 'free', 'free', 'F - R - E', [['F', 'R', 'E']], 'Medium F + short R + tiny E.', ['f-v', 'r-l'], ['l5-w-fee', 'l5-w-fair', 'l5-w-fresh']),
                    makeItem(5, 'words', 'fair', 'fair', 'F - A - R', [['F', 'A', 'R']], 'Medium F + large A + short R.', ['f-v', 'r-l'], ['l5-w-fear', 'l5-w-free', 'l5-w-share']),
                    makeItem(5, 'words', 'fear', 'fear', 'F - E - R', [['F', 'E', 'R']], 'Medium F + tiny E + short R.', ['f-v', 'r-l'], ['l5-w-fair', 'l5-w-fee']),
                    makeItem(5, 'words', 'vein', 'vein', 'V - A - N', [['V', 'A', 'N']], 'Long V + large A + short N.', ['f-v', 'n-m'], ['l5-w-leave', 'l5-w-fair']),
                    makeItem(5, 'words', 'leave', 'leave', 'L - E - V', [['L', 'E', 'V']], 'Long L + tiny E + long downward V.', ['f-v', 'r-l'], ['l5-w-vein', 'l5-w-brief']),
                    makeItem(5, 'words', 'brief', 'brief', 'B - R - E - F', [['B', 'R', 'E', 'F']], 'Long B + R + tiny E + medium F.', ['p-b', 'f-v'], ['l5-w-bridge', 'l5-w-leave']),
                    makeItem(5, 'words', 'paper', 'paper', 'P - A - P - R', [['P', 'A', 'P', 'R']], 'P-A-P-R.', ['p-b'], ['l5-w-page', 'l5-w-pay']),
                    makeItem(5, 'words', 'baby', 'baby', 'B - A - B - E', [['B', 'A', 'B', 'E']], 'Long B + A + long B + E.', ['p-b'], ['l5-w-bay', 'l5-w-back']),
                    makeItem(5, 'words', 'back', 'back', 'B - A - K', [['B', 'A', 'K']], 'Long B + large A + short K.', ['p-b', 'k-g'], ['l5-w-bag', 'l5-w-big']),
                    makeItem(5, 'words', 'bag', 'bag', 'B - A - G', [['B', 'A', 'G']], 'Long B + large A + long G.', ['p-b', 'k-g'], ['l5-w-back', 'l5-w-big']),
                    makeItem(5, 'words', 'big', 'big', 'B - E - G', [['B', 'E', 'G']], 'Long B + tiny E + long G.', ['p-b', 'k-g'], ['l5-w-bag', 'l5-w-back']),
                    makeItem(5, 'words', 'deep', 'deep', 'D - E - P', [['D', 'E', 'P']], 'Long D + tiny E + medium P.', ['p-b', 't-d'], ['l5-w-keep', 'l5-w-peach']),
                    makeItem(5, 'words', 'keep', 'keep', 'K - E - P', [['K', 'E', 'P']], 'Short K + tiny E + medium P.', ['p-b', 'k-g'], ['l5-w-deep', 'l5-w-cheap']),
                    makeItem(5, 'words', 'cheap', 'cheap', 'CH - E - P', [['CH', 'E', 'P']], 'Medium CH + tiny E + medium P.', ['sh-ch-j', 'p-b'], ['l5-w-check', 'l5-w-keep']),
                    makeItem(5, 'words', 'check', 'check', 'CH - E - K', [['CH', 'E', 'K']], 'Medium CH + tiny E + short K.', ['sh-ch-j', 'k-g'], ['l5-w-cheap', 'l5-w-each']),
                    makeItem(5, 'words', 'each', 'each', 'E - CH', [['E', 'CH']], 'Tiny E leading into medium downward CH.', ['sh-ch-j', 'leading-vowel'], ['l5-w-reach', 'l5-w-age']),
                    makeItem(5, 'words', 'reach', 'reach', 'R - E - CH', [['R', 'E', 'CH']], 'Short R + tiny E + medium downward CH.', ['sh-ch-j', 'r-l'], ['l5-w-each', 'l5-w-peach']),
                    makeItem(5, 'words', 'age', 'age', 'A - J', [['A', 'J']], 'Large A leading into long downward J.', ['sh-ch-j', 'leading-vowel'], ['l5-w-page', 'l5-w-ape']),
                    makeItem(5, 'words', 'page', 'page', 'P - A - J', [['P', 'A', 'J']], 'Medium P + large A + long J.', ['p-b', 'sh-ch-j'], ['l5-w-age', 'l5-w-jail']),
                    makeItem(5, 'words', 'jail', 'jail', 'J - A - L', [['J', 'A', 'L']], 'Long J + large A + long L.', ['sh-ch-j', 'r-l'], ['l5-w-jam', 'l5-w-page']),
                    makeItem(5, 'words', 'jam', 'jam', 'J - A - M', [['J', 'A', 'M']], 'Long J + large A + long M.', ['sh-ch-j', 'n-m'], ['l5-w-jail', 'l5-w-age']),
                    makeItem(5, 'words', 'she', 'she', 'SH - E', [['SH', 'E']], 'Short downward SH + tiny E.', ['sh-ch-j'], ['l5-w-shape', 'l5-w-shell']),
                    makeItem(5, 'words', 'shape', 'shape', 'SH - A - P', [['SH', 'A', 'P']], 'Short SH + large A + medium P.', ['sh-ch-j', 'p-b'], ['l5-w-share', 'l5-w-shade']),
                    makeItem(5, 'words', 'share', 'share', 'SH - A - R', [['SH', 'A', 'R']], 'Short SH + large A + short R.', ['sh-ch-j', 'r-l'], ['l5-w-shape', 'l5-w-fair']),
                    makeItem(5, 'words', 'shade', 'shade', 'SH - A - D', [['SH', 'A', 'D']], 'Short SH + large A + long D.', ['sh-ch-j', 't-d'], ['l5-w-shape', 'l5-w-share']),
                    makeItem(5, 'words', 'shell', 'shell', 'SH - E - L', [['SH', 'E', 'L']], 'Short SH + tiny E + long L.', ['sh-ch-j', 'r-l'], ['l5-w-she', 'l5-w-fish']),
                    makeItem(5, 'words', 'cash', 'cash', 'K - A - SH', [['K', 'A', 'SH']], 'Short K + large A + short SH.', ['sh-ch-j', 'k-g'], ['l5-w-fish', 'l5-w-dish']),
                    makeItem(5, 'words', 'fish', 'fish', 'F - E - SH', [['F', 'E', 'SH']], 'Medium F + tiny E + short SH.', ['sh-ch-j', 'f-v'], ['l5-w-dish', 'l5-w-fresh']),
                    makeItem(5, 'words', 'dish', 'dish', 'D - E - SH', [['D', 'E', 'SH']], 'Long D + tiny E + short SH.', ['sh-ch-j', 't-d'], ['l5-w-fish', 'l5-w-cash']),
                    makeItem(5, 'words', 'fresh', 'fresh', 'F - R - E - SH', [['F', 'R', 'E', 'SH']], 'Medium F + short R + tiny E + short SH.', ['sh-ch-j', 'f-v'], ['l5-w-fish', 'l5-w-free']),
                    makeItem(5, 'words', 'bridge', 'bridge', 'B - R - E - J', [['B', 'R', 'E', 'J']], 'Long B + short R + tiny E + long J.', ['sh-ch-j', 'p-b'], ['l5-w-brief', 'l5-w-big']),
                    makeItem(5, 'words', 'peach', 'peach', 'P - E - CH', [['P', 'E', 'CH']], 'Medium P + tiny E + medium CH.', ['sh-ch-j', 'p-b'], ['l5-w-reach', 'l5-w-cheap'])
                ],
                phrases: [
                    makeItem(5, 'phrases', 'i-have', 'I have', 'A-V', [['A', 'V']], 'Large circle (I) + long V (have).', ['joined-phrase'], ['l5-p-will-be', 'l5-p-can-be']),
                    makeItem(5, 'phrases', 'will-be', 'will be', 'L-B', [['L', 'B']], 'Long L (will) + long B (be).', ['joined-phrase'], ['l5-p-can-be', 'l5-p-would-be']),
                    makeItem(5, 'phrases', 'can-be', 'can be', 'K-B', [['K', 'B']], 'Short K (can) + long B (be).', ['joined-phrase'], ['l5-p-will-be', 'l5-p-would-be']),
                    makeItem(5, 'phrases', 'would-be', 'would be', 'D-B', [['D', 'B']], 'Long D (would) + long B (be).', ['joined-phrase'], ['l5-p-will-be', 'l5-p-can-be']),
                    makeItem(5, 'phrases', 'for-the', 'for the', 'F-TH', [['F', 'TH']], 'Medium F (for) + TH (the).', ['joined-phrase'], ['l5-p-for-me', 'l5-p-by-the']),
                    makeItem(5, 'phrases', 'for-me', 'for me', 'F-M-E', [['F', 'M', 'E']], 'Medium F (for) + M-E (me).', ['joined-phrase'], ['l5-p-for-the']),
                    makeItem(5, 'phrases', 'by-the', 'by the', 'B-TH', [['B', 'TH']], 'Long B (by) + TH (the).', ['joined-phrase'], ['l5-p-for-the']),
                    makeItem(5, 'phrases', 'she-will', 'she will', 'SH-E-L', [['SH', 'E', 'L']], 'Joined she (SH-E) + will (L).', ['joined-phrase'], ['l5-p-she-can']),
                    makeItem(5, 'phrases', 'she-can', 'she can', 'SH-E-K', [['SH', 'E', 'K']], 'Joined she (SH-E) + can (K).', ['joined-phrase'], ['l5-p-she-will']),
                    makeItem(5, 'phrases', 'it-will-be', 'it will be.', 'T-L-B .', [['T', 'L', 'B'], ['PERIOD']], 'Joined phrase: it + will + be.', ['sentence'], ['l5-p-will-be']),
                    makeItem(5, 'phrases', 'keep-the-big-bag', 'keep the big bag.', 'K-E-P | TH | B-E-G | B-A-G .', [['K', 'E', 'P'], ['TH'], ['B', 'E', 'G'], ['B', 'A', 'G'], ['PERIOD']], 'keep + the + big + bag.', ['sentence'], ['l5-p-check-each-page']),
                    makeItem(5, 'phrases', 'check-each-page', 'check each page.', 'CH-E-K | E-CH | P-A-J .', [['CH', 'E', 'K'], ['E', 'CH'], ['P', 'A', 'J'], ['PERIOD']], 'check + each + page.', ['sentence'], ['l5-p-pay-for-paper']),
                    makeItem(5, 'phrases', 'share-fresh-peach', 'she will share a fresh peach.', 'SH-E-L | SH-A-R | DOT_A | F-R-E-SH | P-E-CH .', [['SH', 'E', 'L'], ['SH', 'A', 'R'], ['DOT_A'], ['F', 'R', 'E', 'SH'], ['P', 'E', 'CH'], ['PERIOD']], 'she will + share + a + fresh + peach.', ['sentence'], ['l5-p-keep-the-big-bag']),
                    makeItem(5, 'phrases', 'pay-for-paper', 'pay for the paper.', 'P-A | F-TH | P-A-P-R .', [['P', 'A'], ['F', 'TH'], ['P', 'A', 'P', 'R'], ['PERIOD']], 'pay + for-the + paper.', ['sentence'], ['l5-p-check-each-page'])
                ]
            }
        },

        // =====================================================================
        // LESSON 6: Writing S and Z (Substack Lessons 7 & 8)
        // =====================================================================
        {
            id: 'lesson-6',
            number: 6,
            title: 'Writing S, Z & Multiple S Sounds',
            substackRef: 'Lessons 7 & 8 — Left/Right Motion S & SES',
            newTokens: ['S_R', 'S_L', 'SES'],
            intro: {
                summary: 'S and Z share the exact same tiny downward curved stroke — written either right-motion ")" or left-motion "(" so it joins every consonant without awkward angles.',
                rules: [
                    'Right-motion S ")" pairs naturally with P, B, F, V, K, G and downward strokes (e.g., say, safe, face, case).',
                    'Left-motion S "(" pairs naturally with T, D, N, M, R, L, CH, J (e.g., see, days, best, desk, test).',
                    'Two S strokes joined back-to-back express plural/double S syllables like -ses or -ces (e.g., faces, cases, senses).'
                ],
                strokePreviews: [
                    { label: 'S (right-motion)', phonetic: 'S_R', outlines: [['S_R']], note: 'Tiny downward right-curve ")".' },
                    { label: 'S (left-motion)', phonetic: 'S_L', outlines: [['S_L']], note: 'Tiny downward left-curve "(".' },
                    { label: 'SES (double S)', phonetic: 'SES', outlines: [['SES']], note: 'Joined right+left S strokes for -ses / -ces.' },
                    { label: 'is / his (brief)', phonetic: 'E - S_L', outlines: [['E', 'S_L']], note: 'Tiny E + left-motion S = "is" or "his".' },
                    { label: 'as / has (brief)', phonetic: 'A - S_L', outlines: [['A', 'S_L']], note: 'Large A + left-motion S = "as" or "has".' }
                ],
                wordExamples: [
                    { label: 'safe', phonetic: 'S_R - A - F', outlines: [['S_R', 'A', 'F']], note: 'Right-motion S + A inside + downward F.' },
                    { label: 'desk', phonetic: 'D - E - S_L - K', outlines: [['D', 'E', 'S_L', 'K']], note: 'Long D + tiny E + left-motion S + short K.' },
                    { label: 'faces', phonetic: 'F - A - SES', outlines: [['F', 'A', 'SES']], note: 'F + A + double SES ending.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(6, 'strokes', 'sr', 'S / Z (with P, B, F, V, K, G)', 'S_R', [['S_R']], 'Tiny downward right-curve ")"; used for both S and Z.', ['s-curve', 'right-curve'], ['l6-s-sl', 'l5-s-f']),
                    makeItem(6, 'strokes', 'sl', 'S / Z (with T, D, N, M, R, L)', 'S_L', [['S_L']], 'Tiny downward left-curve "("; used for both S and Z.', ['s-curve', 'left-curve'], ['l6-s-sr', 'l5-s-p']),
                    makeItem(6, 'strokes', 'ses', 'SES / CES', 'SES', [['SES']], 'Double S stroke for syllables like -ses / -ces.', ['s-curve', 'double-s'], ['l6-s-sr', 'l6-s-sl']),
                    makeItem(6, 'strokes', 'is-his', 'is / his', 'E - S_L', [['E', 'S_L']], 'Tiny E + left-motion S = "is / his".', ['s-curve', 'brief'], ['l6-s-as-has', 'l6-s-sl']),
                    makeItem(6, 'strokes', 'as-has', 'as / has', 'A - S_L', [['A', 'S_L']], 'Large A + left-motion S = "as / has".', ['s-curve', 'brief'], ['l6-s-is-his', 'l6-s-sl'])
                ],
                words: [
                    makeItem(6, 'words', 'say', 'say', 'S_R - A', [['S_R', 'A']], 'Right-motion S + large A tucked inside.', ['s-curve', 'vowel-a'], ['l6-w-see', 'l6-w-safe', 'l6-w-stay']),
                    makeItem(6, 'words', 'see', 'see', 'S_L - E', [['S_L', 'E']], 'Left-motion S + tiny E tucked inside.', ['s-curve', 'vowel-e'], ['l6-w-say', 'l6-w-sleep']),
                    makeItem(6, 'words', 'safe', 'safe', 'S_R - A - F', [['S_R', 'A', 'F']], 'Right S + large A + downward F.', ['s-curve', 'f-v'], ['l6-w-save', 'l6-w-face', 'l6-w-say']),
                    makeItem(6, 'words', 'save', 'save', 'S_R - A - V', [['S_R', 'A', 'V']], 'Right S + large A + long downward V.', ['s-curve', 'f-v'], ['l6-w-safe', 'l6-w-say']),
                    makeItem(6, 'words', 'face', 'face', 'F - A - S_R', [['F', 'A', 'S_R']], 'Downward F + large A + right S.', ['s-curve', 'f-v'], ['l6-w-safe', 'l6-w-case', 'l6-w-faces']),
                    makeItem(6, 'words', 'case', 'case', 'K - A - S_R', [['K', 'A', 'S_R']], 'Short K + large A + right S.', ['s-curve', 'k-g'], ['l6-w-face', 'l6-w-base', 'l6-w-cases']),
                    makeItem(6, 'words', 'base', 'base', 'B - A - S_R', [['B', 'A', 'S_R']], 'Long B + large A + right S.', ['s-curve', 'p-b'], ['l6-w-case', 'l6-w-pace']),
                    makeItem(6, 'words', 'pace', 'pace', 'P - A - S_R', [['P', 'A', 'S_R']], 'Medium P + large A + right S.', ['s-curve', 'p-b'], ['l6-w-base', 'l6-w-pass', 'l6-w-passes']),
                    makeItem(6, 'words', 'race', 'race', 'R - A - S_L', [['R', 'A', 'S_L']], 'Short R + large A + left S.', ['s-curve', 'r-l'], ['l6-w-races', 'l6-w-days', 'l6-w-pace']),
                    makeItem(6, 'words', 'days', 'days', 'D - A - S_L', [['D', 'A', 'S_L']], 'Long D + large A + left S.', ['s-curve', 't-d'], ['l6-w-keys', 'l6-w-race']),
                    makeItem(6, 'words', 'keys', 'keys', 'K - E - S_L', [['K', 'E', 'S_L']], 'Short K + tiny E + left S.', ['s-curve', 'k-g'], ['l6-w-days', 'l6-w-trees']),
                    makeItem(6, 'words', 'trees', 'trees', 'T - R - E - S_L', [['T', 'R', 'E', 'S_L']], 'T-R-E + left S.', ['s-curve', 'r-l'], ['l6-w-keys', 'l6-w-leaves']),
                    makeItem(6, 'words', 'leaves', 'leaves', 'L - E - V - S_R', [['L', 'E', 'V', 'S_R']], 'L-E-V + right S.', ['s-curve', 'f-v'], ['l6-w-trees', 'l6-w-less']),
                    makeItem(6, 'words', 'sleep', 'sleep', 'S_L - L - E - P', [['S_L', 'L', 'E', 'P']], 'Left S + long L + tiny E + medium P.', ['s-curve', 'p-b'], ['l6-w-step', 'l6-w-see']),
                    makeItem(6, 'words', 'step', 'step', 'S_L - T - E - P', [['S_L', 'T', 'E', 'P']], 'Left S + short T + tiny E + medium P.', ['s-curve', 't-d'], ['l6-w-stay', 'l6-w-state', 'l6-w-sleep']),
                    makeItem(6, 'words', 'stay', 'stay', 'S_L - T - A', [['S_L', 'T', 'A']], 'Left S + upward T + large A.', ['s-curve', 't-d'], ['l6-w-state', 'l6-w-say', 'l6-w-step']),
                    makeItem(6, 'words', 'state', 'state', 'S_L - T - A - T', [['S_L', 'T', 'A', 'T']], 'Left S + T + A + T.', ['s-curve', 't-d'], ['l6-w-stay', 'l6-w-test']),
                    makeItem(6, 'words', 'desk', 'desk', 'D - E - S_L - K', [['D', 'E', 'S_L', 'K']], 'Long D + tiny E + left S + short K.', ['s-curve', 't-d'], ['l6-w-task', 'l6-w-ask']),
                    makeItem(6, 'words', 'task', 'task', 'T - A - S_L - K', [['T', 'A', 'S_L', 'K']], 'Short T + large A + left S + short K.', ['s-curve', 't-d'], ['l6-w-desk', 'l6-w-ask']),
                    makeItem(6, 'words', 'ask', 'ask', 'A - S_L - K', [['A', 'S_L', 'K']], 'Large A + left S + short K.', ['s-curve', 'leading-vowel'], ['l6-w-task', 'l6-w-desk']),
                    makeItem(6, 'words', 'gas', 'gas', 'G - A - S_R', [['G', 'A', 'S_R']], 'Long G + large A + right S.', ['s-curve', 'k-g'], ['l6-w-grass', 'l6-w-glass']),
                    makeItem(6, 'words', 'grass', 'grass', 'G - R - A - S_L', [['G', 'R', 'A', 'S_L']], 'G-R-A + left S.', ['s-curve', 'k-g'], ['l6-w-glass', 'l6-w-gas']),
                    makeItem(6, 'words', 'glass', 'glass', 'G - L - A - S_L', [['G', 'L', 'A', 'S_L']], 'G-L-A + left S.', ['s-curve', 'k-g'], ['l6-w-grass', 'l6-w-less']),
                    makeItem(6, 'words', 'miss', 'miss', 'M - E - S_L', [['M', 'E', 'S_L']], 'Long M + tiny E + left S.', ['s-curve', 'n-m'], ['l6-w-less', 'l6-w-sense']),
                    makeItem(6, 'words', 'less', 'less', 'L - E - S_L', [['L', 'E', 'S_L']], 'Long L + tiny E + left S.', ['s-curve', 'r-l'], ['l6-w-miss', 'l6-w-last']),
                    makeItem(6, 'words', 'best', 'best', 'B - E - S_L - T', [['B', 'E', 'S_L', 'T']], 'Long B + tiny E + left S + short T.', ['s-curve', 'p-b'], ['l6-w-fast', 'l6-w-rest', 'l6-w-test']),
                    makeItem(6, 'words', 'fast', 'fast', 'F - A - S_L - T', [['F', 'A', 'S_L', 'T']], 'Medium F + large A + left S + short T.', ['s-curve', 'f-v'], ['l6-w-last', 'l6-w-best']),
                    makeItem(6, 'words', 'last', 'last', 'L - A - S_L - T', [['L', 'A', 'S_L', 'T']], 'Long L + large A + left S + short T.', ['s-curve', 'r-l'], ['l6-w-fast', 'l6-w-east']),
                    makeItem(6, 'words', 'east', 'east', 'E - S_L - T', [['E', 'S_L', 'T']], 'Tiny E + left S + short T.', ['s-curve', 'leading-vowel'], ['l6-w-rest', 'l6-w-test']),
                    makeItem(6, 'words', 'rest', 'rest', 'R - E - S_L - T', [['R', 'E', 'S_L', 'T']], 'Short R + tiny E + left S + short T.', ['s-curve', 'r-l'], ['l6-w-test', 'l6-w-best']),
                    makeItem(6, 'words', 'test', 'test', 'T - E - S_L - T', [['T', 'E', 'S_L', 'T']], 'Short T + tiny E + left S + short T.', ['s-curve', 't-d'], ['l6-w-rest', 'l6-w-best', 'l6-w-state']),
                    makeItem(6, 'words', 'sense', 'sense', 'S_L - E - N - S_L', [['S_L', 'E', 'N', 'S_L']], 'S-E-N-S.', ['s-curve', 'n-m'], ['l6-w-senses', 'l6-w-miss']),
                    makeItem(6, 'words', 'senses', 'senses', 'S_L - E - N - SES', [['S_L', 'E', 'N', 'SES']], 'S-E-N + double SES ending.', ['double-s'], ['l6-w-sense', 'l6-w-cases']),
                    makeItem(6, 'words', 'faces', 'faces', 'F - A - SES', [['F', 'A', 'SES']], 'F + A + double SES.', ['double-s'], ['l6-w-face', 'l6-w-cases']),
                    makeItem(6, 'words', 'cases', 'cases', 'K - A - SES', [['K', 'A', 'SES']], 'K + A + double SES.', ['double-s'], ['l6-w-case', 'l6-w-faces']),
                    makeItem(6, 'words', 'passes', 'passes', 'P - A - SES', [['P', 'A', 'SES']], 'P + A + double SES.', ['double-s'], ['l6-w-pace', 'l6-w-races']),
                    makeItem(6, 'words', 'races', 'races', 'R - A - SES', [['R', 'A', 'SES']], 'R + A + double SES.', ['double-s'], ['l6-w-race', 'l6-w-passes'])
                ],
                phrases: [
                    makeItem(6, 'phrases', 'he-is', 'he is', 'H-E-S_L', [['H', 'E', 'S_L']], 'Joined phrase: he + is.', ['joined-phrase'], ['l6-p-she-is', 'l6-p-is-it']),
                    makeItem(6, 'phrases', 'she-is', 'she is', 'SH-E-S_L', [['SH', 'E', 'S_L']], 'Joined phrase: she + is.', ['joined-phrase'], ['l6-p-he-is', 'l6-p-it-is']),
                    makeItem(6, 'phrases', 'it-is', 'it is', 'T-E-S_L', [['T', 'E', 'S_L']], 'Joined phrase: it + is.', ['joined-phrase'], ['l6-p-is-it', 'l6-p-there-is']),
                    makeItem(6, 'phrases', 'there-is', 'there is', 'TH-E-S_L', [['TH', 'E', 'S_L']], 'Joined phrase: there (TH) + is (E-S).', ['joined-phrase'], ['l6-p-it-is', 'l6-p-she-is']),
                    makeItem(6, 'phrases', 'is-it', 'is it', 'E-S_L-T', [['E', 'S_L', 'T']], 'Joined phrase: is + it.', ['joined-phrase'], ['l6-p-it-is', 'l6-p-he-is']),
                    makeItem(6, 'phrases', 'his-name', 'his name', 'E-S_L | N-A-M', [['E', 'S_L'], ['N', 'A', 'M']], 'Brief form his (E-S) + name.', ['s-phrase'], ['l6-p-his-desk']),
                    makeItem(6, 'phrases', 'his-desk', 'his desk', 'E-S_L | D-E-S_L-K', [['E', 'S_L'], ['D', 'E', 'S_L', 'K']], 'Brief form his (E-S) + desk.', ['s-phrase'], ['l6-p-his-name']),
                    makeItem(6, 'phrases', 'she-is-safe', 'she is safe.', 'SH-E-S_L | S_R-A-F .', [['SH', 'E', 'S_L'], ['S_R', 'A', 'F'], ['PERIOD']], 'she-is + safe.', ['sentence'], ['l6-p-it-is-best']),
                    makeItem(6, 'phrases', 'it-is-best', 'it is the best case.', 'T-E-S_L | TH | B-E-S_L-T | K-A-S_R .', [['T', 'E', 'S_L'], ['TH'], ['B', 'E', 'S_L', 'T'], ['K', 'A', 'S_R'], ['PERIOD']], 'it-is + the + best + case.', ['sentence'], ['l6-p-fair-test']),
                    makeItem(6, 'phrases', 'save-his-seat', 'save his seat.', 'S_R-A-V | E-S_L | S_L-E-T .', [['S_R', 'A', 'V'], ['E', 'S_L'], ['S_L', 'E', 'T'], ['PERIOD']], 'save + his + seat.', ['sentence'], ['l6-p-pass-glass']),
                    makeItem(6, 'phrases', 'says-it-fast', 'he says it is fast.', 'H-E | S_R-A-S_L | T-E-S_L | F-A-S_L-T .', [['H', 'E'], ['S_R', 'A', 'S_L'], ['T', 'E', 'S_L'], ['F', 'A', 'S_L', 'T'], ['PERIOD']], 'he + says + it-is + fast.', ['sentence'], ['l6-p-she-is-safe']),
                    makeItem(6, 'phrases', 'pass-glass', 'pass the glass.', 'P-A-S_R | TH | G-L-A-S_L .', [['P', 'A', 'S_R'], ['TH'], ['G', 'L', 'A', 'S_L'], ['PERIOD']], 'pass + the + glass.', ['sentence'], ['l6-p-fair-test']),
                    makeItem(6, 'phrases', 'fair-test', 'this is a fair test.', 'TH-E-S_L | E-S_L | DOT_A | F-A-R | T-E-S_L-T .', [['TH', 'E', 'S_L'], ['E', 'S_L'], ['DOT_A'], ['F', 'A', 'R'], ['T', 'E', 'S_L', 'T'], ['PERIOD']], 'this + is + a + fair + test.', ['sentence'], ['l6-p-it-is-best'])
                ]
            }
        },

        // =====================================================================
        // LESSON 7: X, -tion/-sion, and Past Tense (Substack Lessons 9 & 10)
        // =====================================================================
        {
            id: 'lesson-7',
            number: 7,
            title: 'X, -tion/-sion & Past Tense',
            substackRef: 'Lessons 9 & 10 — Backward S for X, -tion & Past Tense',
            newTokens: ['X', 'PAST_T'],
            intro: {
                summary: 'Gregg expresses X as a backward-slanted S, compresses -tion/-sion suffixes into a single SH stroke, and marks past tense verbs cleanly.',
                rules: [
                    'X is written as a tiny downward curve slanted slightly BACKWARD (rightward as it descends).',
                    'The common endings -tion and -sion (nation, action, mission) are written simply with SH.',
                    'Past tense -ed joins directly as T or D when clear, or uses a disjoined tiny T after brief forms and awkward joins.'
                ],
                strokePreviews: [
                    { label: 'X (backward S)', phonetic: 'X', outlines: [['X']], note: 'Tiny downward curve slanted slightly backward.' },
                    { label: '-tion / -sion (SH)', phonetic: 'SH', outlines: [['SH']], note: 'Short SH slash represents -tion / -sion at word ends.' },
                    { label: 'Past Tense (disjoined T)', phonetic: 'PAST_T', outlines: [['PAST_T']], note: 'Disjoined tiny upward T after brief forms/S.' },
                    { label: 'next (brief)', phonetic: 'N - E - X', outlines: [['N', 'E', 'X']], note: 'N-E-X = "next".' },
                    { label: 'passed (past tense)', phonetic: 'P - A - S_R + T', outlines: [['P', 'A', 'S_R', 'PAST_T']], note: 'Base outline "pass" + disjoined past-tense T.' }
                ],
                wordExamples: [
                    { label: 'tax', phonetic: 'T - A - X', outlines: [['T', 'A', 'X']], note: 'Upward T + large A + backward-slanted X.' },
                    { label: 'station', phonetic: 'S_L - T - A - SH', outlines: [['S_L', 'T', 'A', 'SH']], note: 'S-T-A + short SH for -tion.' },
                    { label: 'fixed', phonetic: 'F - E - X + T', outlines: [['F', 'E', 'X', 'PAST_T']], note: 'F-E-X + disjoined past-tense T.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(7, 'strokes', 'x', 'X', 'X', [['X']], 'Tiny downward curve slanted slightly backward.', ['x-stroke'], ['l6-s-sr', 'l7-s-past-t']),
                    makeItem(7, 'strokes', 'tion', '-tion / -sion', 'SH', [['SH']], 'SH slash expresses the suffixes -tion and -sion.', ['suffix-tion'], ['l7-s-x', 'l5-s-ch']),
                    makeItem(7, 'strokes', 'past-t', 'Past tense (-ed)', 'PAST_T', [['PAST_T']], 'Disjoined short upward T marks past tense.', ['past-tense'], ['l2-s-t', 'l7-s-x']),
                    makeItem(7, 'strokes', 'next', 'next', 'N - E - X', [['N', 'E', 'X']], 'N + E + backward X = "next".', ['x-stroke', 'brief'], ['l7-w-text', 'l7-w-tax']),
                    makeItem(7, 'strokes', 'passed', 'passed', 'P - A - S_R + T', [['P', 'A', 'S_R', 'PAST_T']], 'pass + disjoined T.', ['past-tense'], ['l6-w-pace', 'l7-w-asked'])
                ],
                words: [
                    makeItem(7, 'words', 'tax', 'tax', 'T - A - X', [['T', 'A', 'X']], 'T + large A + X.', ['x-stroke'], ['l7-w-fax', 'l7-w-text', 'l7-w-fix']),
                    makeItem(7, 'words', 'fax', 'fax', 'F - A - X', [['F', 'A', 'X']], 'F + large A + X.', ['x-stroke'], ['l7-w-tax', 'l7-w-fix']),
                    makeItem(7, 'words', 'fix', 'fix', 'F - E - X', [['F', 'E', 'X']], 'F + tiny E + X.', ['x-stroke'], ['l7-w-mix', 'l7-w-six', 'l7-w-fixed']),
                    makeItem(7, 'words', 'mix', 'mix', 'M - E - X', [['M', 'E', 'X']], 'M + tiny E + X.', ['x-stroke'], ['l7-w-fix', 'l7-w-six']),
                    makeItem(7, 'words', 'six', 'six', 'S_L - E - X', [['S_L', 'E', 'X']], 'Left S + tiny E + X.', ['x-stroke'], ['l7-w-mix', 'l7-w-fix', 'l7-w-next']),
                    makeItem(7, 'words', 'next', 'next', 'N - E - X', [['N', 'E', 'X']], 'N + E + X.', ['x-stroke'], ['l7-w-text', 'l7-w-exit']),
                    makeItem(7, 'words', 'text', 'text', 'T - E - X - T', [['T', 'E', 'X', 'T']], 'T + E + X + T.', ['x-stroke'], ['l7-w-next', 'l7-w-tax']),
                    makeItem(7, 'words', 'exit', 'exit', 'E - X - T', [['E', 'X', 'T']], 'E + X + T.', ['x-stroke'], ['l7-w-extra', 'l7-w-next']),
                    makeItem(7, 'words', 'extra', 'extra', 'E - X - T - R - A', [['E', 'X', 'T', 'R', 'A']], 'E + X + T + R + A.', ['x-stroke'], ['l7-w-exit']),
                    makeItem(7, 'words', 'nation', 'nation', 'N - A - SH', [['N', 'A', 'SH']], 'N + large A + SH (-tion).', ['suffix-tion'], ['l7-w-station', 'l7-w-fashion']),
                    makeItem(7, 'words', 'station', 'station', 'S_L - T - A - SH', [['S_L', 'T', 'A', 'SH']], 'S-T-A + SH (-tion).', ['suffix-tion'], ['l7-w-nation', 'l7-w-section']),
                    makeItem(7, 'words', 'action', 'action', 'A - K - SH', [['A', 'K', 'SH']], 'A + K + SH (-tion).', ['suffix-tion'], ['l7-w-section', 'l7-w-nation']),
                    makeItem(7, 'words', 'fashion', 'fashion', 'F - A - SH', [['F', 'A', 'SH']], 'F + A + SH (-ion).', ['suffix-tion'], ['l7-w-nation', 'l7-w-mission']),
                    makeItem(7, 'words', 'mission', 'mission', 'M - E - SH', [['M', 'E', 'SH']], 'M + E + SH (-sion).', ['suffix-tion'], ['l7-w-session', 'l7-w-mention']),
                    makeItem(7, 'words', 'session', 'session', 'S_L - E - SH', [['S_L', 'E', 'SH']], 'S + E + SH (-sion).', ['suffix-tion'], ['l7-w-mission', 'l7-w-section']),
                    makeItem(7, 'words', 'mention', 'mention', 'MN - SH', [['MN', 'SH']], 'MN blend + SH (-tion).', ['suffix-tion'], ['l7-w-mission', 'l7-w-nation']),
                    makeItem(7, 'words', 'section', 'section', 'S_R - E - K - SH', [['S_R', 'E', 'K', 'SH']], 'S + E + K + SH (-tion).', ['suffix-tion'], ['l7-w-action', 'l7-w-session']),
                    makeItem(7, 'words', 'asked', 'asked', 'A - S_L - K + T', [['A', 'S_L', 'K', 'PAST_T']], 'ask + disjoined past T.', ['past-tense'], ['l7-w-passed', 'l7-w-checked']),
                    makeItem(7, 'words', 'saved', 'saved', 'S_R - A - V + T', [['S_R', 'A', 'V', 'PAST_T']], 'save + disjoined past T.', ['past-tense'], ['l7-w-shared', 'l7-w-named']),
                    makeItem(7, 'words', 'fixed', 'fixed', 'F - E - X + T', [['F', 'E', 'X', 'PAST_T']], 'fix + disjoined past T.', ['past-tense', 'x-stroke'], ['l7-w-fix', 'l7-w-missed']),
                    makeItem(7, 'words', 'named', 'named', 'N - A - M + T', [['N', 'A', 'M', 'PAST_T']], 'name + disjoined past T.', ['past-tense'], ['l7-w-saved', 'l7-w-reached']),
                    makeItem(7, 'words', 'checked', 'checked', 'CH - E - K + T', [['CH', 'E', 'K', 'PAST_T']], 'check + disjoined past T.', ['past-tense'], ['l7-w-reached', 'l7-w-asked']),
                    makeItem(7, 'words', 'reached', 'reached', 'R - E - CH + T', [['R', 'E', 'CH', 'PAST_T']], 'reach + disjoined past T.', ['past-tense'], ['l7-w-checked', 'l7-w-shared']),
                    makeItem(7, 'words', 'shared', 'shared', 'SH - A - R + T', [['SH', 'A', 'R', 'PAST_T']], 'share + disjoined past T.', ['past-tense'], ['l7-w-saved', 'l7-w-rested']),
                    makeItem(7, 'words', 'missed', 'missed', 'M - E - S_L + T', [['M', 'E', 'S_L', 'PAST_T']], 'miss + disjoined past T.', ['past-tense'], ['l7-w-fixed', 'l7-w-passed']),
                    makeItem(7, 'words', 'rested', 'rested', 'R - E - S_L - TED', [['R', 'E', 'S_L', 'TED']], 'rest + joined TED blend.', ['past-tense', 'blend-ted'], ['l7-w-shared', 'l7-w-missed'])
                ],
                phrases: [
                    makeItem(7, 'phrases', 'next-train', 'the next train', 'TH | N-E-X | T-R-A-N', [['TH'], ['N', 'E', 'X'], ['T', 'R', 'A', 'N']], 'the + next + train.', ['phrase'], ['l7-p-at-station']),
                    makeItem(7, 'phrases', 'at-station', 'at the station', 'T-TH | S_L-T-A-SH', [['T', 'TH'], ['S_L', 'T', 'A', 'SH']], 'at-the + station.', ['phrase'], ['l7-p-next-train']),
                    makeItem(7, 'phrases', 'six-extra-pages', 'six extra pages', 'S_L-E-X | E-X-T-R-A | P-A-J-S_L', [['S_L', 'E', 'X'], ['E', 'X', 'T', 'R', 'A'], ['P', 'A', 'J', 'S_L']], 'six + extra + pages.', ['phrase'], ['l7-p-next-section']),
                    makeItem(7, 'phrases', 'fixed-desk', 'he fixed the desk.', 'H-E | F-E-X+T | TH | D-E-S_L-K .', [['H', 'E'], ['F', 'E', 'X', 'PAST_T'], ['TH'], ['D', 'E', 'S_L', 'K'], ['PERIOD']], 'he + fixed + the + desk.', ['sentence'], ['l7-p-passed-test']),
                    makeItem(7, 'phrases', 'passed-test', 'she passed the test.', 'SH-E | P-A-S_R+T | TH | T-E-S_L-T .', [['SH', 'E'], ['P', 'A', 'S_R', 'PAST_T'], ['TH'], ['T', 'E', 'S_L', 'T'], ['PERIOD']], 'she + passed + the + test.', ['sentence'], ['l7-p-fixed-desk']),
                    makeItem(7, 'phrases', 'asked-action', 'they asked for action.', 'TH-A | A-S_L-K+T | F | A-K-SH .', [['TH', 'A'], ['A', 'S_L', 'K', 'PAST_T'], ['F'], ['A', 'K', 'SH'], ['PERIOD']], 'they + asked + for + action.', ['sentence'], ['l7-p-mission-safe']),
                    makeItem(7, 'phrases', 'mission-safe', 'his mission is safe.', 'E-S_L | M-E-SH | E-S_L | S_R-A-F .', [['E', 'S_L'], ['M', 'E', 'SH'], ['E', 'S_L'], ['S_R', 'A', 'F'], ['PERIOD']], 'his + mission + is + safe.', ['sentence'], ['l7-p-asked-action']),
                    makeItem(7, 'phrases', 'next-section', 'check the next section.', 'CH-E-K | TH | N-E-X | S_R-E-K-SH .', [['CH', 'E', 'K'], ['TH'], ['N', 'E', 'X'], ['S_R', 'E', 'K', 'SH'], ['PERIOD']], 'check + the + next + section.', ['sentence'], ['l7-p-six-extra-pages']),
                    makeItem(7, 'phrases', 'reached-exit', 'he reached the exit.', 'H-E | R-E-CH+T | TH | E-X-T .', [['H', 'E'], ['R', 'E', 'CH', 'PAST_T'], ['TH'], ['E', 'X', 'T'], ['PERIOD']], 'he + reached + the + exit.', ['sentence'], ['l7-p-saved-text']),
                    makeItem(7, 'phrases', 'saved-text', 'she saved the text.', 'SH-E | S_R-A-V+T | TH | T-E-X-T .', [['SH', 'E'], ['S_R', 'A', 'V', 'PAST_T'], ['TH'], ['T', 'E', 'X', 'T'], ['PERIOD']], 'she + saved + the + text.', ['sentence'], ['l7-p-reached-exit'])
                ]
            }
        },

        // =====================================================================
        // LESSON 8: The O-Hook (Substack Lessons 11 & 12)
        // =====================================================================
        {
            id: 'lesson-8',
            number: 8,
            title: 'The O-Hook (o, aw, oh)',
            substackRef: 'Lessons 11 & 12 — The O-Hook & High-Frequency Brief Forms',
            newTokens: ['O', 'O_SIDE'],
            intro: {
                summary: 'The O-hook is a tiny deep cup (like a narrow "u") representing long O (no, boat), AW (law, tall), and short O (hot, lot).',
                rules: [
                    'Keep the O-hook narrow and deep so it never looks like the wide, shallow bowl R.',
                    'Before N, M, R, and L, the O-hook turns on its side opening RIGHT (unless preceded by a downward stroke like shore or door, or kept upright after K/G? Note: side-hook flows smoothly into N/M/R/L).',
                    'Brief forms: O alone = "of"; O-L = "all"; O-N = "on"; O-R = "or".'
                ],
                strokePreviews: [
                    { label: 'O-hook (upright)', phonetic: 'O', outlines: [['O']], note: 'Deep narrow upward cup "u"; brief form for "of".' },
                    { label: 'O-hook (on side)', phonetic: 'O_SIDE', outlines: [['O_SIDE']], note: 'O-hook turned on its side to flow into N, M, R, L.' },
                    { label: 'all (O + L)', phonetic: 'O_SIDE - L', outlines: [['O_SIDE', 'L']], note: 'Side O-hook flowing into long L = "all".' },
                    { label: 'on (O + N)', phonetic: 'O_SIDE - N', outlines: [['O_SIDE', 'N']], note: 'Side O-hook flowing into short N = "on".' },
                    { label: 'or (O + R)', phonetic: 'O_SIDE - R', outlines: [['O_SIDE', 'R']], note: 'Side O-hook flowing into short R = "or".' }
                ],
                wordExamples: [
                    { label: 'boat', phonetic: 'B - O - T', outlines: [['B', 'O', 'T']], note: 'Long B + upright O cup + upward T.' },
                    { label: 'home', phonetic: 'H - O_SIDE - M', outlines: [['H', 'O_SIDE', 'M']], note: 'Side O-hook into M with H dot above.' },
                    { label: 'tall', phonetic: 'T - O_SIDE - L', outlines: [['T', 'O_SIDE', 'L']], note: 'Upward T + side O-hook + long L.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(8, 'strokes', 'o', 'O / AW (of)', 'O', [['O']], 'Deep narrow upward cup "u"; brief form for "of".', ['o-hook'], ['l8-s-o-side', 'l1-s-r']),
                    makeItem(8, 'strokes', 'o-side', 'O / AW (before N, M, R, L)', 'O_SIDE', [['O_SIDE']], 'Sideways O-hook used smoothly before N, M, R, L.', ['o-hook'], ['l8-s-o']),
                    makeItem(8, 'strokes', 'all', 'all', 'O_SIDE - L', [['O_SIDE', 'L']], 'Side O-hook + long L = "all".', ['o-hook', 'brief'], ['l8-s-on', 'l8-s-or']),
                    makeItem(8, 'strokes', 'on', 'on', 'O_SIDE - N', [['O_SIDE', 'N']], 'Side O-hook + short N = "on".', ['o-hook', 'brief'], ['l8-s-all', 'l8-s-or']),
                    makeItem(8, 'strokes', 'or', 'or', 'O_SIDE - R', [['O_SIDE', 'R']], 'Side O-hook + short R = "or".', ['o-hook', 'brief'], ['l8-s-on', 'l8-s-all'])
                ],
                words: [
                    makeItem(8, 'words', 'no', 'no / know', 'N - O', [['N', 'O']], 'Short N + upright O-hook.', ['o-hook'], ['l8-w-so', 'l8-w-note']),
                    makeItem(8, 'words', 'so', 'so', 'S_R - O', [['S_R', 'O']], 'Right S + O-hook.', ['o-hook'], ['l8-w-show', 'l8-w-no']),
                    makeItem(8, 'words', 'show', 'show', 'SH - O', [['SH', 'O']], 'Short SH + O-hook.', ['o-hook'], ['l8-w-so', 'l8-w-shore']),
                    makeItem(8, 'words', 'low', 'low', 'L - O', [['L', 'O']], 'Long L + O-hook.', ['o-hook'], ['l8-w-row', 'l8-w-law']),
                    makeItem(8, 'words', 'row', 'row', 'R - O', [['R', 'O']], 'Short R + O-hook.', ['o-hook'], ['l8-w-low', 'l8-w-road']),
                    makeItem(8, 'words', 'law', 'law', 'L - O_SIDE', [['L', 'O_SIDE']], 'Long L + O-hook (law).', ['o-hook'], ['l8-w-low', 'l8-w-saw']),
                    makeItem(8, 'words', 'saw', 'saw', 'S_L - O', [['S_L', 'O']], 'Left S + O-hook.', ['o-hook'], ['l8-w-so', 'l8-w-paw']),
                    makeItem(8, 'words', 'paw', 'paw', 'P - O', [['P', 'O']], 'Medium P + O-hook.', ['o-hook'], ['l8-w-jaw', 'l8-w-saw']),
                    makeItem(8, 'words', 'jaw', 'jaw', 'J - O', [['J', 'O']], 'Long J + O-hook.', ['o-hook'], ['l8-w-paw', 'l8-w-job']),
                    makeItem(8, 'words', 'hot', 'hot', 'H - O - T', [['H', 'O', 'T']], 'O + T with H dot above O.', ['o-hook', 'h-dot'], ['l8-w-lot', 'l8-w-got']),
                    makeItem(8, 'words', 'lot', 'lot', 'L - O - T', [['L', 'O', 'T']], 'Long L + O + short T.', ['o-hook'], ['l8-w-hot', 'l8-w-got']),
                    makeItem(8, 'words', 'got', 'got', 'G - O - T', [['G', 'O', 'T']], 'Long G + O + short T.', ['o-hook'], ['l8-w-lot', 'l8-w-coat']),
                    makeItem(8, 'words', 'dog', 'dog', 'D - O - G', [['D', 'O', 'G']], 'Long D + O + long G.', ['o-hook'], ['l8-w-got', 'l8-w-job']),
                    makeItem(8, 'words', 'job', 'job', 'J - O - B', [['J', 'O', 'B']], 'Long J + O + long B.', ['o-hook'], ['l8-w-jaw', 'l8-w-dog']),
                    makeItem(8, 'words', 'top', 'top', 'T - O - P', [['T', 'O', 'P']], 'Short T + O + medium P.', ['o-hook'], ['l8-w-shop', 'l8-w-stop']),
                    makeItem(8, 'words', 'shop', 'shop', 'SH - O - P', [['SH', 'O', 'P']], 'Short SH + O + medium P.', ['o-hook'], ['l8-w-stop', 'l8-w-top']),
                    makeItem(8, 'words', 'stop', 'stop', 'S_L - T - O - P', [['S_L', 'T', 'O', 'P']], 'Left S + T + O + P.', ['o-hook'], ['l8-w-shop', 'l8-w-top']),
                    makeItem(8, 'words', 'hope', 'hope', 'H - O - P', [['H', 'O', 'P']], 'O + P with H dot above O.', ['o-hook', 'h-dot'], ['l8-w-rope', 'l8-w-top']),
                    makeItem(8, 'words', 'rope', 'rope', 'R - O - P', [['R', 'O', 'P']], 'Short R + O + medium P.', ['o-hook'], ['l8-w-hope', 'l8-w-road']),
                    makeItem(8, 'words', 'coat', 'coat', 'K - O - T', [['K', 'O', 'T']], 'Short K + O + short T.', ['o-hook'], ['l8-w-boat', 'l8-w-got']),
                    makeItem(8, 'words', 'boat', 'boat', 'B - O - T', [['B', 'O', 'T']], 'Long B + O + short T.', ['o-hook'], ['l8-w-coat', 'l8-w-road']),
                    makeItem(8, 'words', 'road', 'road', 'R - O - D', [['R', 'O', 'D']], 'Short R + O + long D.', ['o-hook'], ['l8-w-load', 'l8-w-boat']),
                    makeItem(8, 'words', 'load', 'load', 'L - O - D', [['L', 'O', 'D']], 'Long L + O + long D.', ['o-hook'], ['l8-w-road', 'l8-w-lot']),
                    makeItem(8, 'words', 'note', 'note', 'N - O - T', [['N', 'O', 'T']], 'Short N + O + short T.', ['o-hook'], ['l8-w-no', 'l8-w-tone']),
                    makeItem(8, 'words', 'home', 'home', 'H - O_SIDE - M', [['H', 'O_SIDE', 'M']], 'Side O + M with H dot above.', ['o-hook', 'h-dot'], ['l8-w-phone', 'l8-w-stone']),
                    makeItem(8, 'words', 'phone', 'phone', 'F - O_SIDE - N', [['F', 'O_SIDE', 'N']], 'Medium F + side O + N.', ['o-hook'], ['l8-w-home', 'l8-w-bone']),
                    makeItem(8, 'words', 'stone', 'stone', 'S_L - T - O_SIDE - N', [['S_L', 'T', 'O_SIDE', 'N']], 'S-T + side O + N.', ['o-hook'], ['l8-w-bone', 'l8-w-tone']),
                    makeItem(8, 'words', 'bone', 'bone', 'B - O_SIDE - N', [['B', 'O_SIDE', 'N']], 'Long B + side O + N.', ['o-hook'], ['l8-w-stone', 'l8-w-tone']),
                    makeItem(8, 'words', 'tone', 'tone', 'T - O_SIDE - N', [['T', 'O_SIDE', 'N']], 'Short T + side O + N.', ['o-hook'], ['l8-w-bone', 'l8-w-tall']),
                    makeItem(8, 'words', 'tall', 'tall', 'T - O_SIDE - L', [['T', 'O_SIDE', 'L']], 'Short T + side O + long L.', ['o-hook'], ['l8-w-call', 'l8-w-ball']),
                    makeItem(8, 'words', 'call', 'call', 'K - O_SIDE - L', [['K', 'O_SIDE', 'L']], 'Short K + side O + long L.', ['o-hook'], ['l8-w-tall', 'l8-w-ball', 'l8-w-small']),
                    makeItem(8, 'words', 'ball', 'ball', 'B - O_SIDE - L', [['B', 'O_SIDE', 'L']], 'Long B + side O + long L.', ['o-hook'], ['l8-w-fall', 'l8-w-hall']),
                    makeItem(8, 'words', 'fall', 'fall', 'F - O_SIDE - L', [['F', 'O_SIDE', 'L']], 'Medium F + side O + long L.', ['o-hook'], ['l8-w-ball', 'l8-w-floor']),
                    makeItem(8, 'words', 'hall', 'hall', 'H - O_SIDE - L', [['H', 'O_SIDE', 'L']], 'Side O + L with H dot above.', ['o-hook', 'h-dot'], ['l8-w-ball', 'l8-w-call']),
                    makeItem(8, 'words', 'small', 'small', 'S_L - M - O_SIDE - L', [['S_L', 'M', 'O_SIDE', 'L']], 'S-M + side O + L.', ['o-hook'], ['l8-w-call', 'l8-w-tall']),
                    makeItem(8, 'words', 'door', 'door', 'D - O_SIDE - R', [['D', 'O_SIDE', 'R']], 'Long D + side O + short R.', ['o-hook'], ['l8-w-store', 'l8-w-floor']),
                    makeItem(8, 'words', 'shore', 'shore', 'SH - O_SIDE - R', [['SH', 'O_SIDE', 'R']], 'Short SH + side O + short R.', ['o-hook'], ['l8-w-store', 'l8-w-door']),
                    makeItem(8, 'words', 'store', 'store', 'S_L - T - O_SIDE - R', [['S_L', 'T', 'O_SIDE', 'R']], 'S-T + side O + short R.', ['o-hook'], ['l8-w-shore', 'l8-w-door']),
                    makeItem(8, 'words', 'floor', 'floor', 'F - L - O_SIDE - R', [['F', 'L', 'O_SIDE', 'R']], 'F-L + side O + short R.', ['o-hook'], ['l8-w-door', 'l8-w-fall']),
                    makeItem(8, 'words', 'core', 'core', 'K - O_SIDE - R', [['K', 'O_SIDE', 'R']], 'Short K + side O + short R.', ['o-hook'], ['l8-w-door', 'l8-w-call'])
                ],
                phrases: [
                    makeItem(8, 'phrases', 'of-the', 'of the', 'O-TH', [['O', 'TH']], 'Brief form O (of) + TH (the).', ['o-phrase'], ['l8-p-on-the', 'l8-p-all-the']),
                    makeItem(8, 'phrases', 'on-the', 'on the', 'O_SIDE-N-TH', [['O_SIDE', 'N', 'TH']], 'on (O-N) + TH (the).', ['o-phrase'], ['l8-p-of-the', 'l8-p-all-the']),
                    makeItem(8, 'phrases', 'all-the', 'all the', 'O_SIDE-L-TH', [['O_SIDE', 'L', 'TH']], 'all (O-L) + TH (the).', ['o-phrase'], ['l8-p-of-the', 'l8-p-on-the']),
                    makeItem(8, 'phrases', 'go-home', 'go home', 'G | H-O_SIDE-M', [['G'], ['H', 'O_SIDE', 'M']], 'go (G) + home.', ['phrase'], ['l8-p-call-me']),
                    makeItem(8, 'phrases', 'call-me', 'call me', 'K-O_SIDE-L | M-E', [['K', 'O_SIDE', 'L'], ['M', 'E']], 'call + me.', ['phrase'], ['l8-p-go-home']),
                    makeItem(8, 'phrases', 'on-the-road', 'on the road', 'O_SIDE-N-TH | R-O-D', [['O_SIDE', 'N', 'TH'], ['R', 'O', 'D']], 'on-the + road.', ['phrase'], ['l8-p-stop-at-shop']),
                    makeItem(8, 'phrases', 'stop-at-shop', 'stop at the shop.', 'S_L-T-O-P | T-TH | SH-O-P .', [['S_L', 'T', 'O', 'P'], ['T', 'TH'], ['SH', 'O', 'P'], ['PERIOD']], 'stop + at-the + shop.', ['sentence'], ['l8-p-on-the-road']),
                    makeItem(8, 'phrases', 'close-the-door', 'close the door.', 'K-L-O-S_L | TH | D-O_SIDE-R .', [['K', 'L', 'O', 'S_L'], ['TH'], ['D', 'O_SIDE', 'R'], ['PERIOD']], 'close + the + door.', ['sentence'], ['l8-p-got-small-boat']),
                    makeItem(8, 'phrases', 'got-small-boat', 'he got a small boat.', 'H-E | G-O-T | DOT_A | S_L-M-O_SIDE-L | B-O-T .', [['H', 'E'], ['G', 'O', 'T'], ['DOT_A'], ['S_L', 'M', 'O_SIDE', 'L'], ['B', 'O', 'T'], ['PERIOD']], 'he + got + a + small + boat.', ['sentence'], ['l8-p-saw-tall-dog']),
                    makeItem(8, 'phrases', 'saw-tall-dog', 'she saw a tall dog.', 'SH-E | S_L-O | DOT_A | T-O_SIDE-L | D-O-G .', [['SH', 'E'], ['S_L', 'O'], ['DOT_A'], ['T', 'O_SIDE', 'L'], ['D', 'O', 'G'], ['PERIOD']], 'she + saw + a + tall + dog.', ['sentence'], ['l8-p-got-small-boat']),
                    makeItem(8, 'phrases', 'note-on-phone', 'take a note on the phone.', 'T-A-K | DOT_A | N-O-T | O_SIDE-N-TH | F-O_SIDE-N .', [['T', 'A', 'K'], ['DOT_A'], ['N', 'O', 'T'], ['O_SIDE', 'N', 'TH'], ['F', 'O_SIDE', 'N'], ['PERIOD']], 'take + a + note + on-the + phone.', ['sentence'], ['l8-p-close-the-door']),
                    makeItem(8, 'phrases', 'all-tall-trees', 'all of the tall trees', 'O_SIDE-L | O-TH | T-O_SIDE-L | T-R-E-S_L', [['O_SIDE', 'L'], ['O', 'TH'], ['T', 'O_SIDE', 'L'], ['T', 'R', 'E', 'S_L']], 'all + of-the + tall + trees.', ['phrase'], ['l8-p-all-the'])
                ]
            }
        },

        // =====================================================================
        // LESSON 9: Implied R & con-/com- Prefixes (Substack Lessons 13-16)
        // =====================================================================
        {
            id: 'lesson-9',
            number: 9,
            title: 'Implied R & con-/com- Prefixes',
            substackRef: 'Lessons 13–16 — Reverse Circles, Elongated Loops & Phrasing',
            newTokens: ['AR', 'ER', 'ARS', 'ERS'],
            intro: {
                summary: 'Instead of writing an extra R stroke, writing a vowel circle in the REVERSE (counter-clockwise) direction implies a following R sound! Elongating that reverse loop adds S.',
                rules: [
                    'Reverse large circle (AR) implies A + R (art, arm, hard, card, farm). Reverse tiny circle (ER) implies E/I/U + R (earn, bird, turn, term).',
                    'Elongating the reverse circle into a narrow loop (ARS / ERS) implies R + S (cars, jars, cheers, fears).',
                    'Prefix K at the start of longer words expresses con-, com-, coun- (common, compare, complete). In phrases, joined T expresses "to" and B-L expresses "able".'
                ],
                strokePreviews: [
                    { label: 'AR (reverse A)', phonetic: 'AR', outlines: [['AR', 'T']], note: 'Counter-clockwise circle on straight stroke implies R (art).' },
                    { label: 'ER (reverse E)', phonetic: 'ER', outlines: [['ER', 'N']], note: 'Reverse tiny circle implies E/I/U + R (earn).' },
                    { label: 'ARS (loop)', phonetic: 'K - ARS', outlines: [['K', 'ARS']], note: 'Elongated reverse large loop implies R + S (cars).' },
                    { label: 'ERS (loop)', phonetic: 'F - ERS', outlines: [['F', 'ERS']], note: 'Elongated reverse tiny loop implies R + S (fears).' },
                    { label: 'con- / com- (prefix K)', phonetic: 'K - P - L - E - T', outlines: [['K', 'P', 'L', 'E', 'T']], note: 'Prefix K expresses con-/com- (complete).' }
                ],
                wordExamples: [
                    { label: 'arm', phonetic: 'AR - M', outlines: [['AR', 'M']], note: 'Reverse A circle ABOVE baseline M implies R.' },
                    { label: 'bird', phonetic: 'B - ER - D', outlines: [['B', 'ER', 'D']], note: 'Reverse tiny E loop between B and D implies R.' },
                    { label: 'cards', phonetic: 'K - AR - D - S_L', outlines: [['K', 'AR', 'D', 'S_L']], note: 'K + reverse A + D + S.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(9, 'strokes', 'ar', 'AR (as in art)', 'AR - T', [['AR', 'T']], 'Reverse A circle on T implies R ("art").', ['reverse-r', 'vowel-a'], ['l9-s-er', 'l2-w-aid']),
                    makeItem(9, 'strokes', 'er', 'ER (as in earn)', 'ER - N', [['ER', 'N']], 'Reverse tiny E circle on N implies R ("earn").', ['reverse-r', 'vowel-e'], ['l9-s-ar', 'l2-w-knee']),
                    makeItem(9, 'strokes', 'ars', 'ARS (as in cars)', 'K - ARS', [['K', 'ARS']], 'Elongated reverse loop adds R+S ("cars").', ['reverse-r', 'loop'], ['l9-s-ers', 'l9-s-ar']),
                    makeItem(9, 'strokes', 'ers', 'ERS (as in fears)', 'F - ERS', [['F', 'ERS']], 'Elongated reverse tiny loop adds R+S ("fears").', ['reverse-r', 'loop'], ['l9-s-ars', 'l9-s-er']),
                    makeItem(9, 'strokes', 'con-com', 'con- / com- (as in compare)', 'K - P - A - R', [['K', 'P', 'A', 'R']], 'Initial K stands for con-, com-, coun- ("compare").', ['prefix'], ['l9-w-complete', 'l9-w-common'])
                ],
                words: [
                    makeItem(9, 'words', 'art', 'art', 'AR - T', [['AR', 'T']], 'Reverse A circle above T.', ['reverse-r'], ['l9-w-arm', 'l9-w-heart']),
                    makeItem(9, 'words', 'arm', 'arm', 'AR - M', [['AR', 'M']], 'Reverse A circle above M.', ['reverse-r'], ['l9-w-art', 'l9-w-harm']),
                    makeItem(9, 'words', 'hard', 'hard', 'H - AR - D', [['H', 'AR', 'D']], 'AR-D with H dot above.', ['reverse-r', 'h-dot'], ['l9-w-heart', 'l9-w-harm', 'l9-w-card']),
                    makeItem(9, 'words', 'heart', 'heart', 'H - AR - T', [['H', 'AR', 'T']], 'AR-T with H dot above.', ['reverse-r', 'h-dot'], ['l9-w-hard', 'l9-w-art']),
                    makeItem(9, 'words', 'harm', 'harm', 'H - AR - M', [['H', 'AR', 'M']], 'AR-M with H dot above.', ['reverse-r', 'h-dot'], ['l9-w-arm', 'l9-w-hard']),
                    makeItem(9, 'words', 'start', 'start', 'S_L - T - AR - T', [['S_L', 'T', 'AR', 'T']], 'S-T + reverse AR + T.', ['reverse-r'], ['l9-w-smart', 'l9-w-chart']),
                    makeItem(9, 'words', 'smart', 'smart', 'S_L - M - AR - T', [['S_L', 'M', 'AR', 'T']], 'S-M + reverse AR + T.', ['reverse-r'], ['l9-w-start', 'l9-w-mark']),
                    makeItem(9, 'words', 'chart', 'chart', 'CH - AR - T', [['CH', 'AR', 'T']], 'CH + reverse AR + T.', ['reverse-r'], ['l9-w-start', 'l9-w-card']),
                    makeItem(9, 'words', 'card', 'card', 'K - AR - D', [['K', 'AR', 'D']], 'K + reverse AR + D.', ['reverse-r'], ['l9-w-dark', 'l9-w-cards', 'l9-w-hard']),
                    makeItem(9, 'words', 'dark', 'dark', 'D - AR - K', [['D', 'AR', 'K']], 'D + reverse AR + K.', ['reverse-r'], ['l9-w-mark', 'l9-w-park', 'l9-w-card']),
                    makeItem(9, 'words', 'mark', 'mark', 'M - AR - K', [['M', 'AR', 'K']], 'M + reverse AR + K.', ['reverse-r'], ['l9-w-dark', 'l9-w-park']),
                    makeItem(9, 'words', 'park', 'park', 'P - AR - K', [['P', 'AR', 'K']], 'P + reverse AR + K.', ['reverse-r'], ['l9-w-mark', 'l9-w-dark']),
                    makeItem(9, 'words', 'barn', 'barn', 'B - AR - N', [['B', 'AR', 'N']], 'B + reverse AR + N.', ['reverse-r'], ['l9-w-farm', 'l9-w-burn']),
                    makeItem(9, 'words', 'farm', 'farm', 'F - AR - M', [['F', 'AR', 'M']], 'F + reverse AR + M.', ['reverse-r'], ['l9-w-barn', 'l9-w-harm']),
                    makeItem(9, 'words', 'earn', 'earn', 'ER - N', [['ER', 'N']], 'Reverse tiny ER + N.', ['reverse-r'], ['l9-w-learn', 'l9-w-turn']),
                    makeItem(9, 'words', 'learn', 'learn', 'L - ER - N', [['L', 'ER', 'N']], 'Long L + reverse ER + N.', ['reverse-r'], ['l9-w-earn', 'l9-w-turn']),
                    makeItem(9, 'words', 'turn', 'turn', 'T - ER - N', [['T', 'ER', 'N']], 'T + reverse ER + N.', ['reverse-r'], ['l9-w-burn', 'l9-w-learn']),
                    makeItem(9, 'words', 'burn', 'burn', 'B - ER - N', [['B', 'ER', 'N']], 'B + reverse ER + N.', ['reverse-r'], ['l9-w-turn', 'l9-w-barn', 'l9-w-bird']),
                    makeItem(9, 'words', 'bird', 'bird', 'B - ER - D', [['B', 'ER', 'D']], 'B + reverse ER + D.', ['reverse-r'], ['l9-w-burn', 'l9-w-shirt', 'l9-w-dirt']),
                    makeItem(9, 'words', 'shirt', 'shirt', 'SH - ER - T', [['SH', 'ER', 'T']], 'SH + reverse ER + T.', ['reverse-r'], ['l9-w-dirt', 'l9-w-bird']),
                    makeItem(9, 'words', 'dirt', 'dirt', 'D - ER - T', [['D', 'ER', 'T']], 'D + reverse ER + T.', ['reverse-r'], ['l9-w-shirt', 'l9-w-bird']),
                    makeItem(9, 'words', 'term', 'term', 'T - ER - M', [['T', 'ER', 'M']], 'T + reverse ER + M.', ['reverse-r'], ['l9-w-turn', 'l9-w-serve']),
                    makeItem(9, 'words', 'serve', 'serve', 'S_R - ER - V', [['S_R', 'ER', 'V']], 'Right S + reverse ER + V.', ['reverse-r'], ['l9-w-term', 'l9-w-fears']),
                    makeItem(9, 'words', 'cars', 'cars', 'K - ARS', [['K', 'ARS']], 'K + elongated ARS loop.', ['reverse-r', 'loop'], ['l9-w-jars', 'l9-w-bars']),
                    makeItem(9, 'words', 'jars', 'jars', 'J - ARS', [['J', 'ARS']], 'J + elongated ARS loop.', ['reverse-r', 'loop'], ['l9-w-cars', 'l9-w-bars']),
                    makeItem(9, 'words', 'bars', 'bars', 'B - ARS', [['B', 'ARS']], 'B + elongated ARS loop.', ['reverse-r', 'loop'], ['l9-w-cars', 'l9-w-jars']),
                    makeItem(9, 'words', 'fears', 'fears', 'F - ERS', [['F', 'ERS']], 'F + elongated ERS loop.', ['reverse-r', 'loop'], ['l9-w-cheers', 'l9-w-serve']),
                    makeItem(9, 'words', 'cheers', 'cheers', 'CH - ERS', [['CH', 'ERS']], 'CH + elongated ERS loop.', ['reverse-r', 'loop'], ['l9-w-fears', 'l9-w-chart']),
                    makeItem(9, 'words', 'common', 'common', 'K - O_SIDE - M - N', [['K', 'O_SIDE', 'M', 'N']], 'Prefix K (com) + O-M-N.', ['prefix'], ['l9-w-compare', 'l9-w-connect']),
                    makeItem(9, 'words', 'compare', 'compare', 'K - P - A - R', [['K', 'P', 'A', 'R']], 'Prefix K (com) + P-A-R.', ['prefix'], ['l9-w-complete', 'l9-w-common']),
                    makeItem(9, 'words', 'complete', 'complete', 'K - P - L - E - T', [['K', 'P', 'L', 'E', 'T']], 'Prefix K (com) + P-L-E-T.', ['prefix'], ['l9-w-compare', 'l9-w-contain']),
                    makeItem(9, 'words', 'connect', 'connect', 'K - N - E - K - T', [['K', 'N', 'E', 'K', 'T']], 'Prefix K (con) + N-E-K-T.', ['prefix'], ['l9-w-contain', 'l9-w-common']),
                    makeItem(9, 'words', 'contain', 'contain', 'K - T - A - N', [['K', 'T', 'A', 'N']], 'Prefix K (con) + T-A-N.', ['prefix'], ['l9-w-connect', 'l9-w-complete'])
                ],
                phrases: [
                    makeItem(9, 'phrases', 'hard-to-learn', 'hard to learn', 'H-AR-D | T-L-ER-N', [['H', 'AR', 'D'], ['T', 'L', 'ER', 'N']], 'hard + joined to-learn (T-L-ER-N).', ['phrase'], ['l9-p-able-to-go']),
                    makeItem(9, 'phrases', 'start-the-car', 'start the car.', 'S_L-T-AR-T | TH | K-AR .', [['S_L', 'T', 'AR', 'T'], ['TH'], ['K', 'AR'], ['PERIOD']], 'start + the + car.', ['sentence'], ['l9-p-turn-the-card']),
                    makeItem(9, 'phrases', 'a-dark-park', 'a dark park', 'DOT_A | D-AR-K | P-AR-K', [['DOT_A'], ['D', 'AR', 'K'], ['P', 'AR', 'K']], 'a + dark + park.', ['phrase'], ['l9-p-a-smart-bird']),
                    makeItem(9, 'phrases', 'a-smart-bird', 'a smart bird', 'DOT_A | S_L-M-AR-T | B-ER-D', [['DOT_A'], ['S_L', 'M', 'AR', 'T'], ['B', 'ER', 'D']], 'a + smart + bird.', ['phrase'], ['l9-p-a-dark-park']),
                    makeItem(9, 'phrases', 'turn-the-card', 'turn the card.', 'T-ER-N | TH | K-AR-D .', [['T', 'ER', 'N'], ['TH'], ['K', 'AR', 'D'], ['PERIOD']], 'turn + the + card.', ['sentence'], ['l9-p-start-the-car']),
                    makeItem(9, 'phrases', 'as-good-as', 'as good as', 'A-S_L-G-A-S_L', [['A', 'S_L', 'G', 'A', 'S_L']], 'Phrased "as good as".', ['as-phrase'], ['l9-p-as-fast-as', 'l9-p-as-far-as']),
                    makeItem(9, 'phrases', 'as-fast-as', 'as fast as', 'A-S_L | F-A-S_L-T | A-S_L', [['A', 'S_L'], ['F', 'A', 'S_L', 'T'], ['A', 'S_L']], 'as + fast + as.', ['as-phrase'], ['l9-p-as-good-as', 'l9-p-as-far-as']),
                    makeItem(9, 'phrases', 'as-far-as', 'as far as', 'A-S_L-F-AR-S_L', [['A', 'S_L', 'F', 'AR', 'S_L']], 'Phrased "as far as".', ['as-phrase'], ['l9-p-as-good-as', 'l9-p-as-fast-as']),
                    makeItem(9, 'phrases', 'able-to-go', 'able to go', 'A-B-T-G', [['A', 'B', 'T', 'G']], 'Joined phrase: able (A-B) + to (T) + go (G).', ['able-phrase'], ['l9-p-able-to-see']),
                    makeItem(9, 'phrases', 'able-to-see', 'able to see', 'A-B-T-S_L-E', [['A', 'B', 'T', 'S_L', 'E']], 'Joined phrase: able + to + see.', ['able-phrase'], ['l9-p-able-to-go']),
                    makeItem(9, 'phrases', 'complete-chart', 'complete the chart.', 'K-P-L-E-T | TH | CH-AR-T .', [['K', 'P', 'L', 'E', 'T'], ['TH'], ['CH', 'AR', 'T'], ['PERIOD']], 'complete + the + chart.', ['sentence'], ['l9-p-compare-terms']),
                    makeItem(9, 'phrases', 'compare-terms', 'compare the terms.', 'K-P-A-R | TH | T-ER-M-S_L .', [['K', 'P', 'A', 'R'], ['TH'], ['T', 'ER', 'M', 'S_L'], ['PERIOD']], 'compare + the + terms.', ['sentence'], ['l9-p-complete-chart'])
                ]
            }
        },

        // =====================================================================
        // LESSON 10: The OO-Hook & W Sounds (Substack Lessons 17-19)
        // =====================================================================
        {
            id: 'lesson-10',
            number: 10,
            title: 'The OO-Hook & W Sounds',
            substackRef: 'Lessons 17–19 — The OO-Hook (u, oo) & Initial W',
            newTokens: ['OO'],
            intro: {
                summary: 'The OO-hook is an upside-down O-hook (a narrow arch "n") representing short U (up, cup), short OO (book, look), and long OO (too, moon, who).',
                rules: [
                    'OO-hook opens DOWNWARD ("n") — the exact mirror of the upward O-hook ("u").',
                    'Because W sounds like a quick OO glide, initial W is written with the OO-hook before the following vowel (we = OO-E, way = OO-A, wait = OO-A-T).',
                    'Brief forms: OO alone = "you / your"; OO-E = "we"; OO-S = "was"; OO-T = "what".'
                ],
                strokePreviews: [
                    { label: 'OO-hook (you / your)', phonetic: 'OO', outlines: [['OO']], note: 'Narrow downward arch "n"; brief form for "you / your".' },
                    { label: 'we (W = OO-hook)', phonetic: 'OO - E', outlines: [['OO', 'E']], note: 'Initial OO-hook + tiny E = "we".' },
                    { label: 'way (W + A)', phonetic: 'OO - A', outlines: [['OO', 'A']], note: 'Initial OO-hook + large A = "way".' },
                    { label: 'was (brief)', phonetic: 'OO - S_L', outlines: [['OO', 'S_L']], note: 'OO-hook + left S = "was".' },
                    { label: 'what (brief)', phonetic: 'OO - T', outlines: [['OO', 'T']], note: 'OO-hook + short T = "what".' }
                ],
                wordExamples: [
                    { label: 'too', phonetic: 'T - OO', outlines: [['T', 'OO']], note: 'Upward T + downward OO-hook.' },
                    { label: 'book', phonetic: 'B - OO - K', outlines: [['B', 'OO', 'K']], note: 'Long B + OO-hook + short K.' },
                    { label: 'work', phonetic: 'OO - ER - K', outlines: [['OO', 'ER', 'K']], note: 'Initial W (OO) + reverse ER + K.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(10, 'strokes', 'oo', 'OO / U (you / your)', 'OO', [['OO']], 'Narrow downward arch "n"; brief form for "you / your".', ['oo-hook'], ['l8-s-o', 'l10-s-we']),
                    makeItem(10, 'strokes', 'we', 'we', 'OO - E', [['OO', 'E']], 'Initial OO-hook (W) + tiny E = "we".', ['oo-hook', 'w-sound', 'brief'], ['l10-s-way', 'l10-s-oo']),
                    makeItem(10, 'strokes', 'way', 'way', 'OO - A', [['OO', 'A']], 'Initial OO-hook (W) + large A = "way".', ['oo-hook', 'w-sound'], ['l10-s-we', 'l10-s-what']),
                    makeItem(10, 'strokes', 'was', 'was', 'OO - S_L', [['OO', 'S_L']], 'OO-hook + left S = "was".', ['oo-hook', 'brief'], ['l10-s-what', 'l10-s-we']),
                    makeItem(10, 'strokes', 'what', 'what', 'OO - T', [['OO', 'T']], 'OO-hook + short T = "what".', ['oo-hook', 'brief'], ['l10-s-was', 'l10-s-oo'])
                ],
                words: [
                    makeItem(10, 'words', 'too', 'too / to', 'T - OO', [['T', 'OO']], 'Short T + downward OO-hook.', ['oo-hook'], ['l10-w-do', 'l10-w-took']),
                    makeItem(10, 'words', 'do', 'do', 'D - OO', [['D', 'OO']], 'Long D + downward OO-hook.', ['oo-hook'], ['l10-w-too', 'l10-w-food']),
                    makeItem(10, 'words', 'shoe', 'shoe', 'SH - OO', [['SH', 'OO']], 'Short SH + OO-hook.', ['oo-hook'], ['l10-w-blue', 'l10-w-school']),
                    makeItem(10, 'words', 'blue', 'blue', 'B - L - OO', [['B', 'L', 'OO']], 'Long B + long L + OO-hook.', ['oo-hook'], ['l10-w-true', 'l10-w-book']),
                    makeItem(10, 'words', 'true', 'true', 'T - R - OO', [['T', 'R', 'OO']], 'T + R + OO-hook.', ['oo-hook'], ['l10-w-blue', 'l10-w-truck']),
                    makeItem(10, 'words', 'room', 'room', 'R - OO - M', [['R', 'OO', 'M']], 'R + OO + M.', ['oo-hook'], ['l10-w-moon', 'l10-w-noon']),
                    makeItem(10, 'words', 'moon', 'moon', 'M - OO - N', [['M', 'OO', 'N']], 'M + OO + N.', ['oo-hook'], ['l10-w-noon', 'l10-w-room']),
                    makeItem(10, 'words', 'noon', 'noon', 'N - OO - N', [['N', 'OO', 'N']], 'N + OO + N.', ['oo-hook'], ['l10-w-moon', 'l10-w-soon']),
                    makeItem(10, 'words', 'soon', 'soon', 'S_L - OO - N', [['S_L', 'OO', 'N']], 'Left S + OO + N.', ['oo-hook'], ['l10-w-noon', 'l10-w-spoon']),
                    makeItem(10, 'words', 'spoon', 'spoon', 'S_R - P - OO - N', [['S_R', 'P', 'OO', 'N']], 'S-P + OO + N.', ['oo-hook'], ['l10-w-soon', 'l10-w-pool']),
                    makeItem(10, 'words', 'food', 'food', 'F - OO - D', [['F', 'OO', 'D']], 'Medium F + OO + long D.', ['oo-hook'], ['l10-w-foot', 'l10-w-wood']),
                    makeItem(10, 'words', 'cool', 'cool', 'K - OO - L', [['K', 'OO', 'L']], 'Short K + OO + long L.', ['oo-hook'], ['l10-w-pool', 'l10-w-school']),
                    makeItem(10, 'words', 'pool', 'pool', 'P - OO - L', [['P', 'OO', 'L']], 'Medium P + OO + long L.', ['oo-hook'], ['l10-w-cool', 'l10-w-spoon']),
                    makeItem(10, 'words', 'school', 'school', 'S_R - K - OO - L', [['S_R', 'K', 'OO', 'L']], 'S-K + OO + L.', ['oo-hook'], ['l10-w-cool', 'l10-w-look']),
                    makeItem(10, 'words', 'book', 'book', 'B - OO - K', [['B', 'OO', 'K']], 'Long B + OO + short K.', ['oo-hook'], ['l10-w-look', 'l10-w-cook']),
                    makeItem(10, 'words', 'look', 'look', 'L - OO - K', [['L', 'OO', 'K']], 'Long L + OO + short K.', ['oo-hook'], ['l10-w-book', 'l10-w-took']),
                    makeItem(10, 'words', 'took', 'took', 'T - OO - K', [['T', 'OO', 'K']], 'Short T + OO + short K.', ['oo-hook'], ['l10-w-cook', 'l10-w-look']),
                    makeItem(10, 'words', 'cook', 'cook', 'K - OO - K', [['K', 'OO', 'K']], 'Short K + OO + short K.', ['oo-hook'], ['l10-w-took', 'l10-w-cup']),
                    makeItem(10, 'words', 'foot', 'foot', 'F - OO - T', [['F', 'OO', 'T']], 'Medium F + OO + short T.', ['oo-hook'], ['l10-w-food', 'l10-w-wood']),
                    makeItem(10, 'words', 'wood', 'wood', 'OO - D', [['OO', 'D']], 'OO-hook + long D.', ['oo-hook', 'w-sound'], ['l10-w-foot', 'l10-w-food']),
                    makeItem(10, 'words', 'cup', 'cup', 'K - OO - P', [['K', 'OO', 'P']], 'Short K + OO + medium P.', ['oo-hook'], ['l10-w-cut', 'l10-w-up']),
                    makeItem(10, 'words', 'cut', 'cut', 'K - OO - T', [['K', 'OO', 'T']], 'Short K + OO + short T.', ['oo-hook'], ['l10-w-cup', 'l10-w-cook']),
                    makeItem(10, 'words', 'up', 'up', 'OO - P', [['OO', 'P']], 'OO-hook + medium P.', ['oo-hook'], ['l10-w-us', 'l10-w-cup']),
                    makeItem(10, 'words', 'us', 'us', 'OO - S_L', [['OO', 'S_L']], 'OO-hook + left S.', ['oo-hook'], ['l10-w-up', 'l10-w-bus']),
                    makeItem(10, 'words', 'bus', 'bus', 'B - OO - S_L', [['B', 'OO', 'S_L']], 'Long B + OO + left S.', ['oo-hook'], ['l10-w-us', 'l10-w-book']),
                    makeItem(10, 'words', 'duck', 'duck', 'D - OO - K', [['D', 'OO', 'K']], 'Long D + OO + short K.', ['oo-hook'], ['l10-w-truck', 'l10-w-mud']),
                    makeItem(10, 'words', 'truck', 'truck', 'T - R - OO - K', [['T', 'R', 'OO', 'K']], 'T-R + OO + K.', ['oo-hook'], ['l10-w-duck', 'l10-w-true']),
                    makeItem(10, 'words', 'run', 'run', 'R - OO - N', [['R', 'OO', 'N']], 'Short R + OO + short N.', ['oo-hook'], ['l10-w-fun', 'l10-w-rug']),
                    makeItem(10, 'words', 'fun', 'fun', 'F - OO - N', [['F', 'OO', 'N']], 'Medium F + OO + short N.', ['oo-hook'], ['l10-w-run', 'l10-w-mud']),
                    makeItem(10, 'words', 'rug', 'rug', 'R - OO - G', [['R', 'OO', 'G']], 'Short R + OO + long G.', ['oo-hook'], ['l10-w-run', 'l10-w-mud']),
                    makeItem(10, 'words', 'mud', 'mud', 'M - OO - D', [['M', 'OO', 'D']], 'Long M + OO + long D.', ['oo-hook'], ['l10-w-duck', 'l10-w-rug']),
                    makeItem(10, 'words', 'wait', 'wait', 'OO - A - T', [['OO', 'A', 'T']], 'W (OO) + large A + short T.', ['w-sound'], ['l10-w-wet', 'l10-w-week']),
                    makeItem(10, 'words', 'week', 'week', 'OO - E - K', [['OO', 'E', 'K']], 'W (OO) + tiny E + short K.', ['w-sound'], ['l10-w-work', 'l10-w-wait']),
                    makeItem(10, 'words', 'work', 'work', 'OO - ER - K', [['OO', 'ER', 'K']], 'W (OO) + reverse ER + K.', ['w-sound', 'reverse-r'], ['l10-w-week', 'l10-w-walk']),
                    makeItem(10, 'words', 'walk', 'walk', 'OO - O_SIDE - K', [['OO', 'O_SIDE', 'K']], 'W (OO) + O + K.', ['w-sound'], ['l10-w-wall', 'l10-w-work']),
                    makeItem(10, 'words', 'wall', 'wall', 'OO - O_SIDE - L', [['OO', 'O_SIDE', 'L']], 'W (OO) + side O + L.', ['w-sound'], ['l10-w-walk', 'l10-w-wash']),
                    makeItem(10, 'words', 'watch', 'watch', 'OO - O - CH', [['OO', 'O', 'CH']], 'W (OO) + O + CH.', ['w-sound'], ['l10-w-wash', 'l10-w-walk']),
                    makeItem(10, 'words', 'wash', 'wash', 'OO - O - SH', [['OO', 'O', 'SH']], 'W (OO) + O + SH.', ['w-sound'], ['l10-w-watch', 'l10-w-wish']),
                    makeItem(10, 'words', 'win', 'win', 'OO - E - N', [['OO', 'E', 'N']], 'W (OO) + tiny E + short N.', ['w-sound'], ['l10-w-wish', 'l10-w-wet']),
                    makeItem(10, 'words', 'wish', 'wish', 'OO - E - SH', [['OO', 'E', 'SH']], 'W (OO) + tiny E + short SH.', ['w-sound'], ['l10-w-win', 'l10-w-wash']),
                    makeItem(10, 'words', 'wet', 'wet', 'OO - E - T', [['OO', 'E', 'T']], 'W (OO) + tiny E + short T.', ['w-sound'], ['l10-w-west', 'l10-w-wait']),
                    makeItem(10, 'words', 'west', 'west', 'OO - E - S_L - T', [['OO', 'E', 'S_L', 'T']], 'W (OO) + E + S + T.', ['w-sound'], ['l10-w-wet', 'l10-w-win'])
                ],
                phrases: [
                    makeItem(10, 'phrases', 'you-are', 'you are', 'OO-R', [['OO', 'R']], 'Joined phrase: you (OO) + are (R).', ['joined-phrase'], ['l10-p-you-will', 'l10-p-we-are']),
                    makeItem(10, 'phrases', 'you-will', 'you will', 'OO-L', [['OO', 'L']], 'Joined phrase: you (OO) + will (L).', ['joined-phrase'], ['l10-p-you-can', 'l10-p-you-are']),
                    makeItem(10, 'phrases', 'you-can', 'you can', 'OO-K', [['OO', 'K']], 'Joined phrase: you (OO) + can (K).', ['joined-phrase'], ['l10-p-you-will', 'l10-p-we-can']),
                    makeItem(10, 'phrases', 'we-are', 'we are', 'OO-E-R', [['OO', 'E', 'R']], 'Joined phrase: we (OO-E) + are (R).', ['joined-phrase'], ['l10-p-we-will', 'l10-p-you-are']),
                    makeItem(10, 'phrases', 'we-will', 'we will', 'OO-E-L', [['OO', 'E', 'L']], 'Joined phrase: we + will.', ['joined-phrase'], ['l10-p-we-can', 'l10-p-you-will']),
                    makeItem(10, 'phrases', 'we-can', 'we can', 'OO-E-K', [['OO', 'E', 'K']], 'Joined phrase: we + can.', ['joined-phrase'], ['l10-p-we-will', 'l10-p-you-can']),
                    makeItem(10, 'phrases', 'do-you', 'do you', 'D-OO | OO', [['D', 'OO'], ['OO']], 'do (D-OO) + you (OO).', ['phrase'], ['l10-p-what-is']),
                    makeItem(10, 'phrases', 'what-is', 'what is', 'OO-T | E-S_L', [['OO', 'T'], ['E', 'S_L']], 'what (OO-T) + is.', ['phrase'], ['l10-p-do-you']),
                    makeItem(10, 'phrases', 'look-at-book', 'we will look at the book.', 'OO-E-L | L-OO-K | T-TH | B-OO-K .', [['OO', 'E', 'L'], ['L', 'OO', 'K'], ['T', 'TH'], ['B', 'OO', 'K'], ['PERIOD']], 'we-will + look + at-the + book.', ['sentence'], ['l10-p-walk-to-school']),
                    makeItem(10, 'phrases', 'walk-to-school', 'you can walk to school.', 'OO-K | OO-O_SIDE-K | T-OO | S_R-K-OO-L .', [['OO', 'K'], ['OO', 'O_SIDE', 'K'], ['T', 'OO'], ['S_R', 'K', 'OO', 'L'], ['PERIOD']], 'you-can + walk + to + school.', ['sentence'], ['l10-p-look-at-book']),
                    makeItem(10, 'phrases', 'cool-blue-room', 'it is a cool blue room.', 'T-E-S_L | DOT_A | K-OO-L | B-L-OO | R-OO-M .', [['T', 'E', 'S_L'], ['DOT_A'], ['K', 'OO', 'L'], ['B', 'L', 'OO'], ['R', 'OO', 'M'], ['PERIOD']], 'it-is + a + cool + blue + room.', ['sentence'], ['l10-p-wait-at-noon']),
                    makeItem(10, 'phrases', 'wait-at-noon', 'wait for us at noon.', 'OO-A-T | F | OO-S_L | T | N-OO-N .', [['OO', 'A', 'T'], ['F'], ['OO', 'S_L'], ['T'], ['N', 'OO', 'N'], ['PERIOD']], 'wait + for + us + at + noon.', ['sentence'], ['l10-p-good-luck-week']),
                    makeItem(10, 'phrases', 'good-luck-week', 'good work this week.', 'G | OO-ER-K | TH-E-S_L | OO-E-K .', [['G'], ['OO', 'ER', 'K'], ['TH', 'E', 'S_L'], ['OO', 'E', 'K'], ['PERIOD']], 'good + work + this + week.', ['sentence'], ['l10-p-wait-at-noon'])
                ]
            }
        },

        // =====================================================================
        // LESSON 11: Y, NG, NK & Prefixes in-/un-/ex- (Substack Lessons 20-21)
        // =====================================================================
        {
            id: 'lesson-11',
            number: 11,
            title: 'Y, NG, NK & Common Prefixes',
            substackRef: 'Lessons 20 & 21 — Y Loops, NG/NK, Prefixes & -ings',
            newTokens: ['NG', 'NK', 'Y_A', 'Y_E', 'INGS'],
            intro: {
                summary: 'Master nasal endings -ng and -nk, the narrow Y loops, the prefix ex-, prefixes in-/un-/en-, and the plural -ings / -ingly endings.',
                rules: [
                    'NG is a short stroke slanted slightly DOWNWARD-RIGHT; NK is twice as long on the same downward slant.',
                    'Before A or E, Y becomes a narrow oval loop (Y_A, Y_E) as in yard, yes, young, yellow.',
                    'Prefix ex- is written E-S; prefixes in-/un-/en- are written with N; plural -ings is a disjoined tiny S at the end.'
                ],
                strokePreviews: [
                    { label: 'NG (short slant)', phonetic: 'NG', outlines: [['NG']], note: 'Short straight stroke slanted slightly downward-right.' },
                    { label: 'NK (long slant)', phonetic: 'NK', outlines: [['NK']], note: 'Long downward-right slant (2x NG).' },
                    { label: 'Y + A (narrow loop)', phonetic: 'Y_A', outlines: [['Y_A']], note: 'Narrow elongated loop for Y + A (yard, yarn).' },
                    { label: 'Y + E (tiny loop)', phonetic: 'Y_E', outlines: [['Y_E']], note: 'Narrow tiny loop for Y + E/I (yes, yet, young).' },
                    { label: '-ings (disjoined S)', phonetic: 'INGS', outlines: [['INGS']], note: 'Disjoined S stroke at the end of a verb/noun (things, savings).' }
                ],
                wordExamples: [
                    { label: 'sing', phonetic: 'S_L - E - NG', outlines: [['S_L', 'E', 'NG']], note: 'Left S + tiny E + short downward-slanted NG.' },
                    { label: 'thank', phonetic: 'TH - A - NK', outlines: [['TH', 'A', 'NK']], note: 'Upward TH + large A + long downward-slanted NK.' },
                    { label: 'yes', phonetic: 'Y_E - S_L', outlines: [['Y_E', 'S_L']], note: 'Narrow Y_E loop flowing into left S.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(11, 'strokes', 'ng', 'NG (sing, ring)', 'NG', [['NG']], 'Short downward-right slanted line.', ['nasal', 'ng-nk'], ['l11-s-nk', 'l2-s-n']),
                    makeItem(11, 'strokes', 'nk', 'NK (sink, bank)', 'NK', [['NK']], 'Long downward-right slanted line (2x NG).', ['nasal', 'ng-nk'], ['l11-s-ng', 'l2-s-m']),
                    makeItem(11, 'strokes', 'ya', 'YA (yard, yarn)', 'Y_A', [['Y_A']], 'Narrow elongated oval loop for Y + A.', ['y-loop'], ['l11-s-ye', 'l1-s-a']),
                    makeItem(11, 'strokes', 'ye', 'YE / YI (yes, yet)', 'Y_E', [['Y_E']], 'Tiny narrow oval loop for Y + E.', ['y-loop'], ['l11-s-ya', 'l1-s-e']),
                    makeItem(11, 'strokes', 'ings', '-ings', 'INGS', [['INGS']], 'Disjoined tiny S stroke for -ings.', ['suffix-ings'], ['l6-s-sl', 'l3-s-ing'])
                ],
                words: [
                    makeItem(11, 'words', 'yes', 'yes', 'Y_E - S_L', [['Y_E', 'S_L']], 'Y_E loop + left S.', ['y-loop'], ['l11-w-yet', 'l11-w-year']),
                    makeItem(11, 'words', 'yet', 'yet', 'Y_E - T', [['Y_E', 'T']], 'Y_E loop + short upward T.', ['y-loop'], ['l11-w-yes', 'l11-w-yell']),
                    makeItem(11, 'words', 'yard', 'yard', 'Y_A - AR - D', [['Y_A', 'AR', 'D']], 'Y_A loop + reverse AR + D.', ['y-loop', 'reverse-r'], ['l11-w-yarn', 'l11-w-year']),
                    makeItem(11, 'words', 'yarn', 'yarn', 'Y_A - AR - N', [['Y_A', 'AR', 'N']], 'Y_A loop + reverse AR + N.', ['y-loop', 'reverse-r'], ['l11-w-yard', 'l11-w-young']),
                    makeItem(11, 'words', 'year', 'year', 'Y_E - R', [['Y_E', 'R']], 'Y_E loop + short R.', ['y-loop'], ['l11-w-yell', 'l11-w-yard']),
                    makeItem(11, 'words', 'yell', 'yell', 'Y_E - L', [['Y_E', 'L']], 'Y_E loop + long L.', ['y-loop'], ['l11-w-yellow', 'l11-w-year']),
                    makeItem(11, 'words', 'yellow', 'yellow', 'Y_E - L - O', [['Y_E', 'L', 'O']], 'Y_E + long L + O-hook.', ['y-loop', 'o-hook'], ['l11-w-yell', 'l11-w-young']),
                    makeItem(11, 'words', 'young', 'young', 'Y_E - NG', [['Y_E', 'NG']], 'Y_E + short NG slant.', ['y-loop', 'ng-nk'], ['l11-w-ring', 'l11-w-sing']),
                    makeItem(11, 'words', 'ring', 'ring', 'R - E - NG', [['R', 'E', 'NG']], 'R + E + NG.', ['ng-nk'], ['l11-w-sing', 'l11-w-wing', 'l11-w-bring']),
                    makeItem(11, 'words', 'sing', 'sing', 'S_L - E - NG', [['S_L', 'E', 'NG']], 'Left S + E + NG.', ['ng-nk'], ['l11-w-ring', 'l11-w-sink', 'l11-w-song']),
                    makeItem(11, 'words', 'king', 'king', 'K - E - NG', [['K', 'E', 'NG']], 'Short K + E + NG.', ['ng-nk'], ['l11-w-wing', 'l11-w-thing']),
                    makeItem(11, 'words', 'wing', 'wing', 'OO - E - NG', [['OO', 'E', 'NG']], 'W (OO) + E + NG.', ['ng-nk', 'w-sound'], ['l11-w-ring', 'l11-w-king']),
                    makeItem(11, 'words', 'bring', 'bring', 'B - R - E - NG', [['B', 'R', 'E', 'NG']], 'B-R-E + NG.', ['ng-nk'], ['l11-w-spring', 'l11-w-ring']),
                    makeItem(11, 'words', 'spring', 'spring', 'S_R - P - R - E - NG', [['S_R', 'P', 'R', 'E', 'NG']], 'S-P-R-E + NG.', ['ng-nk'], ['l11-w-string', 'l11-w-bring']),
                    makeItem(11, 'words', 'string', 'string', 'S_L - T - R - E - NG', [['S_L', 'T', 'R', 'E', 'NG']], 'S-T-R-E + NG.', ['ng-nk'], ['l11-w-strong', 'l11-w-spring']),
                    makeItem(11, 'words', 'strong', 'strong', 'S_L - T - R - O_SIDE - NG', [['S_L', 'T', 'R', 'O_SIDE', 'NG']], 'S-T-R-O + NG.', ['ng-nk'], ['l11-w-string', 'l11-w-long']),
                    makeItem(11, 'words', 'long', 'long', 'L - O_SIDE - NG', [['L', 'O_SIDE', 'NG']], 'Long L + O + NG.', ['ng-nk'], ['l11-w-song', 'l11-w-along']),
                    makeItem(11, 'words', 'song', 'song', 'S_R - O_SIDE - NG', [['S_R', 'O_SIDE', 'NG']], 'Right S + O + NG.', ['ng-nk'], ['l11-w-long', 'l11-w-strong']),
                    makeItem(11, 'words', 'along', 'along', 'A - L - O_SIDE - NG', [['A', 'L', 'O_SIDE', 'NG']], 'A + L + O + NG.', ['ng-nk'], ['l11-w-among', 'l11-w-long']),
                    makeItem(11, 'words', 'among', 'among', 'A - M - OO - NG', [['A', 'M', 'OO', 'NG']], 'A + M + OO + NG.', ['ng-nk'], ['l11-w-along', 'l11-w-young']),
                    makeItem(11, 'words', 'thing', 'thing', 'TH - E - NG', [['TH', 'E', 'NG']], 'TH + E + NG.', ['ng-nk', 'th-stroke'], ['l11-w-think', 'l11-w-things']),
                    makeItem(11, 'words', 'think', 'think', 'TH - E - NK', [['TH', 'E', 'NK']], 'TH + E + long NK.', ['ng-nk', 'th-stroke'], ['l11-w-thing', 'l11-w-thank']),
                    makeItem(11, 'words', 'thank', 'thank', 'TH - A - NK', [['TH', 'A', 'NK']], 'TH + large A + long NK.', ['ng-nk', 'th-stroke'], ['l11-w-think', 'l11-w-bank']),
                    makeItem(11, 'words', 'bank', 'bank', 'B - A - NK', [['B', 'A', 'NK']], 'Long B + A + NK.', ['ng-nk'], ['l11-w-tank', 'l11-w-rank']),
                    makeItem(11, 'words', 'tank', 'tank', 'T - A - NK', [['T', 'A', 'NK']], 'Short T + A + NK.', ['ng-nk'], ['l11-w-bank', 'l11-w-sank']),
                    makeItem(11, 'words', 'rank', 'rank', 'R - A - NK', [['R', 'A', 'NK']], 'Short R + A + NK.', ['ng-nk'], ['l11-w-bank', 'l11-w-sank']),
                    makeItem(11, 'words', 'sank', 'sank', 'S_L - A - NK', [['S_L', 'A', 'NK']], 'Left S + A + NK.', ['ng-nk'], ['l11-w-tank', 'l11-w-sink']),
                    makeItem(11, 'words', 'ink', 'ink', 'E - NK', [['E', 'NK']], 'Tiny E + NK.', ['ng-nk'], ['l11-w-pink', 'l11-w-link']),
                    makeItem(11, 'words', 'pink', 'pink', 'P - E - NK', [['P', 'E', 'NK']], 'Medium P + E + NK.', ['ng-nk'], ['l11-w-ink', 'l11-w-drink']),
                    makeItem(11, 'words', 'link', 'link', 'L - E - NK', [['L', 'E', 'NK']], 'Long L + E + NK.', ['ng-nk'], ['l11-w-ink', 'l11-w-sink']),
                    makeItem(11, 'words', 'drink', 'drink', 'D - R - E - NK', [['D', 'R', 'E', 'NK']], 'D-R-E + NK.', ['ng-nk'], ['l11-w-pink', 'l11-w-sink']),
                    makeItem(11, 'words', 'sink', 'sink', 'S_L - E - NK', [['S_L', 'E', 'NK']], 'Left S + E + NK.', ['ng-nk'], ['l11-w-sing', 'l11-w-sank']),
                    makeItem(11, 'words', 'unfair', 'unfair', 'N - F - A - R', [['N', 'F', 'A', 'R']], 'Prefix N (un-) + fair.', ['prefix-un'], ['l11-w-unsafe', 'l11-w-unseen']),
                    makeItem(11, 'words', 'unsafe', 'unsafe', 'N - S_R - A - F', [['N', 'S_R', 'A', 'F']], 'Prefix N (un-) + safe.', ['prefix-un'], ['l11-w-unfair', 'l11-w-unseen']),
                    makeItem(11, 'words', 'unseen', 'unseen', 'N - S_L - E - N', [['N', 'S_L', 'E', 'N']], 'Prefix N (un-) + seen.', ['prefix-un'], ['l11-w-unfair', 'l11-w-income']),
                    makeItem(11, 'words', 'income', 'income', 'N - K - OO - M', [['N', 'K', 'OO', 'M']], 'Prefix N (in-) + K-OO-M.', ['prefix-in'], ['l11-w-inform', 'l11-w-exam']),
                    makeItem(11, 'words', 'inform', 'inform', 'N - F - O_SIDE - R - M', [['N', 'F', 'O_SIDE', 'R', 'M']], 'Prefix N (in-) + F-O-R-M.', ['prefix-in'], ['l11-w-income', 'l11-w-explain']),
                    makeItem(11, 'words', 'exact', 'exact', 'E - S_R - A - K - T', [['E', 'S_R', 'A', 'K', 'T']], 'Prefix E-S (ex-) + A-K-T.', ['prefix-ex'], ['l11-w-exam', 'l11-w-expect']),
                    makeItem(11, 'words', 'exam', 'exam', 'E - S_R - A - M', [['E', 'S_R', 'A', 'M']], 'Prefix E-S (ex-) + A-M.', ['prefix-ex'], ['l11-w-exact', 'l11-w-exist']),
                    makeItem(11, 'words', 'exist', 'exist', 'E - S_R - E - S_L - T', [['E', 'S_R', 'E', 'S_L', 'T']], 'Prefix E-S (ex-) + E-S-T.', ['prefix-ex'], ['l11-w-expect', 'l11-w-exam']),
                    makeItem(11, 'words', 'expect', 'expect', 'E - S_R - P - E - K - T', [['E', 'S_R', 'P', 'E', 'K', 'T']], 'Prefix E-S (ex-) + P-E-K-T.', ['prefix-ex'], ['l11-w-explain', 'l11-w-exact']),
                    makeItem(11, 'words', 'explain', 'explain', 'E - S_R - P - L - A - N', [['E', 'S_R', 'P', 'L', 'A', 'N']], 'Prefix E-S (ex-) + P-L-A-N.', ['prefix-ex'], ['l11-w-expect', 'l11-w-inform']),
                    makeItem(11, 'words', 'things', 'things', 'TH - E - INGS', [['TH', 'E', 'INGS']], 'TH + E + disjoined -ings.', ['suffix-ings'], ['l11-w-thing', 'l11-w-savings']),
                    makeItem(11, 'words', 'savings', 'savings', 'S_R - A - V - INGS', [['S_R', 'A', 'V', 'INGS']], 'save + disjoined -ings.', ['suffix-ings'], ['l11-w-feelings', 'l11-w-things']),
                    makeItem(11, 'words', 'feelings', 'feelings', 'F - E - L - INGS', [['F', 'E', 'L', 'INGS']], 'feel + disjoined -ings.', ['suffix-ings'], ['l11-w-savings', 'l11-w-things'])
                ],
                phrases: [
                    makeItem(11, 'phrases', 'thank-you', 'thank you', 'TH-A-NK | OO', [['TH', 'A', 'NK'], ['OO']], 'thank + you.', ['phrase'], ['l11-p-i-think']),
                    makeItem(11, 'phrases', 'i-think', 'I think', 'A | TH-E-NK', [['A'], ['TH', 'E', 'NK']], 'I + think.', ['phrase'], ['l11-p-thank-you']),
                    makeItem(11, 'phrases', 'a-long-song', 'a long song', 'DOT_A | L-O_SIDE-NG | S_R-O_SIDE-NG', [['DOT_A'], ['L', 'O_SIDE', 'NG'], ['S_R', 'O_SIDE', 'NG']], 'a + long + song.', ['phrase'], ['l11-p-bring-the-ring']),
                    makeItem(11, 'phrases', 'bring-the-ring', 'bring the ring.', 'B-R-E-NG | TH | R-E-NG .', [['B', 'R', 'E', 'NG'], ['TH'], ['R', 'E', 'NG'], ['PERIOD']], 'bring + the + ring.', ['sentence'], ['l11-p-a-long-song']),
                    makeItem(11, 'phrases', 'a-strong-spring', 'a strong spring', 'DOT_A | S_L-T-R-O_SIDE-NG | S_R-P-R-E-NG', [['DOT_A'], ['S_L', 'T', 'R', 'O_SIDE', 'NG'], ['S_R', 'P', 'R', 'E', 'NG']], 'a + strong + spring.', ['phrase'], ['l11-p-in-the-yard']),
                    makeItem(11, 'phrases', 'in-the-yard', 'in the yard', 'N-TH | Y_A-AR-D', [['N', 'TH'], ['Y_A', 'AR', 'D']], 'in-the + yard.', ['phrase'], ['l11-p-this-year']),
                    makeItem(11, 'phrases', 'this-year', 'this year', 'TH-E-S_L | Y_E-R', [['TH', 'E', 'S_L'], ['Y_E', 'R']], 'this + year.', ['phrase'], ['l11-p-in-the-yard']),
                    makeItem(11, 'phrases', 'yes-you-can', 'yes you can.', 'Y_E-S_L | OO-K .', [['Y_E', 'S_L'], ['OO', 'K'], ['PERIOD']], 'yes + you-can.', ['sentence'], ['l11-p-think-you-win']),
                    makeItem(11, 'phrases', 'think-you-win', 'I think you will win.', 'A | TH-E-NK | OO-L | OO-E-N .', [['A'], ['TH', 'E', 'NK'], ['OO', 'L'], ['OO', 'E', 'N'], ['PERIOD']], 'I + think + you-will + win.', ['sentence'], ['l11-p-yes-you-can']),
                    makeItem(11, 'phrases', 'thank-your-help', 'thank you for your help.', 'TH-A-NK | OO | F | OO | H-E-L-P .', [['TH', 'A', 'NK'], ['OO'], ['F'], ['OO'], ['H', 'E', 'L', 'P'], ['PERIOD']], 'thank + you + for + your + help.', ['sentence'], ['l11-p-ink-to-exam']),
                    makeItem(11, 'phrases', 'ink-to-exam', 'bring your ink to the exam.', 'B-R-E-NG | OO | E-NK | T-TH | E-S_R-A-M .', [['B', 'R', 'E', 'NG'], ['OO'], ['E', 'NK'], ['T', 'TH'], ['E', 'S_R', 'A', 'M'], ['PERIOD']], 'bring + your + ink + to-the + exam.', ['sentence'], ['l11-p-sing-long-song']),
                    makeItem(11, 'phrases', 'sing-long-song', 'she will sing a long song.', 'SH-E-L | S_L-E-NG | DOT_A | L-O_SIDE-NG | S_R-O_SIDE-NG .', [['SH', 'E', 'L'], ['S_L', 'E', 'NG'], ['DOT_A'], ['L', 'O_SIDE', 'NG'], ['S_R', 'O_SIDE', 'NG'], ['PERIOD']], 'she-will + sing + a + long + song.', ['sentence'], ['l11-p-bring-the-ring'])
                ]
            }
        },

        // =====================================================================
        // LESSON 12: Diphthongs I, OW, OI, U (Substack Lessons 22-24)
        // =====================================================================
        {
            id: 'lesson-12',
            number: 12,
            title: 'Diphthongs (I, OW, OI, U) & Fluency',
            substackRef: 'Lessons 22–24 — All Four Diphthongs & Full Reading Fluency',
            newTokens: ['I_DIPH', 'OW_DIPH', 'OI_DIPH', 'U_DIPH'],
            intro: {
                summary: 'Your final core building blocks are the four English diphthongs: I (broken A circle) plus three compact vowel combinations (OW = A+OO, OI = O+E, U = E+OO).',
                rules: [
                    'Diphthong I (my, time, night) is a large circle with a crisp inward indentation / notch.',
                    'Diphthong OW (now, out, house) joins A + OO; Diphthong OI (oil, boy, coin) joins O + E; Diphthong U (use, new, music) joins E + OO.',
                    'With all 12 lessons complete, you can decode entire everyday sentences in Gregg Shorthand!'
                ],
                strokePreviews: [
                    { label: 'Diphthong I (broken A)', phonetic: 'I_DIPH', outlines: [['I_DIPH']], note: 'Large notched circle for long I (my, life, time).' },
                    { label: 'Diphthong OW (A + OO)', phonetic: 'OW_DIPH', outlines: [['OW_DIPH']], note: 'Large A circle flowing into OO-hook (now, out).' },
                    { label: 'Diphthong OI (O + E)', phonetic: 'OI_DIPH', outlines: [['OI_DIPH']], note: 'O-hook flowing into tiny E circle (oil, boy).' },
                    { label: 'Diphthong U (E + OO)', phonetic: 'U_DIPH', outlines: [['U_DIPH']], note: 'Tiny E circle flowing into OO-hook (use, new).' }
                ],
                wordExamples: [
                    { label: 'time', phonetic: 'T - I_DIPH - M', outlines: [['T', 'I_DIPH', 'M']], note: 'Upward T + notched Diphthong I + long M.' },
                    { label: 'house', phonetic: 'H - OW_DIPH - S_R', outlines: [['H', 'OW_DIPH', 'S_R']], note: 'OW diphthong + S with H dot directly above.' },
                    { label: 'music', phonetic: 'M - U_DIPH - S_R - E - K', outlines: [['M', 'U_DIPH', 'S_R', 'E', 'K']], note: 'M + U diphthong (E-OO) + S + E + K.' }
                ]
            },
            stages: {
                strokes: [
                    makeItem(12, 'strokes', 'i-diph', 'I (my, time)', 'I_DIPH', [['I_DIPH']], 'Large notched circle representing diphthong I.', ['diphthong', 'diph-i'], ['l12-s-ow', 'l1-s-a']),
                    makeItem(12, 'strokes', 'ow-diph', 'OW (now, out)', 'OW_DIPH', [['OW_DIPH']], 'Large A circle + OO-hook representing OW.', ['diphthong', 'diph-ow'], ['l12-s-i', 'l12-s-u']),
                    makeItem(12, 'strokes', 'oi-diph', 'OI (oil, boy)', 'OI_DIPH', [['OI_DIPH']], 'O-hook + tiny E circle representing OI/OY.', ['diphthong', 'diph-oi'], ['l12-s-u', 'l8-s-o']),
                    makeItem(12, 'strokes', 'u-diph', 'U (use, new)', 'U_DIPH', [['U_DIPH']], 'Tiny E circle + OO-hook representing long U.', ['diphthong', 'diph-u'], ['l12-s-ow', 'l12-s-oi'])
                ],
                words: [
                    makeItem(12, 'words', 'my', 'my', 'M - I_DIPH', [['M', 'I_DIPH']], 'M + notched Diphthong I.', ['diph-i'], ['l12-w-mine', 'l12-w-high']),
                    makeItem(12, 'words', 'high', 'high', 'H - I_DIPH', [['H', 'I_DIPH']], 'Diphthong I with H dot above.', ['diph-i', 'h-dot'], ['l12-w-my', 'l12-w-sky']),
                    makeItem(12, 'words', 'sky', 'sky', 'S_R - K - I_DIPH', [['S_R', 'K', 'I_DIPH']], 'S-K + Diphthong I.', ['diph-i'], ['l12-w-fly', 'l12-w-try']),
                    makeItem(12, 'words', 'fly', 'fly', 'F - L - I_DIPH', [['F', 'L', 'I_DIPH']], 'F-L + Diphthong I.', ['diph-i'], ['l12-w-sky', 'l12-w-life']),
                    makeItem(12, 'words', 'try', 'try', 'T - R - I_DIPH', [['T', 'R', 'I_DIPH']], 'T-R + Diphthong I.', ['diph-i'], ['l12-w-bright', 'l12-w-tie']),
                    makeItem(12, 'words', 'buy', 'buy', 'B - I_DIPH', [['B', 'I_DIPH']], 'Long B + Diphthong I.', ['diph-i'], ['l12-w-pie', 'l12-w-bright']),
                    makeItem(12, 'words', 'tie', 'tie', 'T - I_DIPH', [['T', 'I_DIPH']], 'Short T + Diphthong I.', ['diph-i'], ['l12-w-pie', 'l12-w-time']),
                    makeItem(12, 'words', 'pie', 'pie', 'P - I_DIPH', [['P', 'I_DIPH']], 'Medium P + Diphthong I.', ['diph-i'], ['l12-w-tie', 'l12-w-buy']),
                    makeItem(12, 'words', 'time', 'time', 'T - I_DIPH - M', [['T', 'I_DIPH', 'M']], 'T + Diphthong I + M.', ['diph-i'], ['l12-w-fine', 'l12-w-mine']),
                    makeItem(12, 'words', 'fine', 'fine', 'F - I_DIPH - N', [['F', 'I_DIPH', 'N']], 'F + Diphthong I + N.', ['diph-i'], ['l12-w-line', 'l12-w-mine']),
                    makeItem(12, 'words', 'line', 'line', 'L - I_DIPH - N', [['L', 'I_DIPH', 'N']], 'L + Diphthong I + N.', ['diph-i'], ['l12-w-fine', 'l12-w-light']),
                    makeItem(12, 'words', 'mine', 'mine', 'M - I_DIPH - N', [['M', 'I_DIPH', 'N']], 'M + Diphthong I + N.', ['diph-i'], ['l12-w-fine', 'l12-w-my']),
                    makeItem(12, 'words', 'life', 'life', 'L - I_DIPH - F', [['L', 'I_DIPH', 'F']], 'L + Diphthong I + F.', ['diph-i'], ['l12-w-light', 'l12-w-line']),
                    makeItem(12, 'words', 'light', 'light', 'L - I_DIPH - T', [['L', 'I_DIPH', 'T']], 'L + Diphthong I + T.', ['diph-i'], ['l12-w-night', 'l12-w-right']),
                    makeItem(12, 'words', 'night', 'night', 'N - I_DIPH - T', [['N', 'I_DIPH', 'T']], 'N + Diphthong I + T.', ['diph-i'], ['l12-w-light', 'l12-w-right']),
                    makeItem(12, 'words', 'right', 'right', 'R - I_DIPH - T', [['R', 'I_DIPH', 'T']], 'R + Diphthong I + T.', ['diph-i'], ['l12-w-bright', 'l12-w-night']),
                    makeItem(12, 'words', 'bright', 'bright', 'B - R - I_DIPH - T', [['B', 'R', 'I_DIPH', 'T']], 'B-R + Diphthong I + T.', ['diph-i'], ['l12-w-right', 'l12-w-try']),
                    makeItem(12, 'words', 'side', 'side', 'S_L - I_DIPH - D', [['S_L', 'I_DIPH', 'D']], 'S + Diphthong I + D.', ['diph-i'], ['l12-w-smile', 'l12-w-light']),
                    makeItem(12, 'words', 'smile', 'smile', 'S_L - M - I_DIPH - L', [['S_L', 'M', 'I_DIPH', 'L']], 'S-M + Diphthong I + L.', ['diph-i'], ['l12-w-side', 'l12-w-line']),
                    makeItem(12, 'words', 'now', 'now', 'N - OW_DIPH', [['N', 'OW_DIPH']], 'N + OW diphthong.', ['diph-ow'], ['l12-w-out', 'l12-w-how']),
                    makeItem(12, 'words', 'out', 'out', 'OW_DIPH - T', [['OW_DIPH', 'T']], 'OW diphthong + T.', ['diph-ow'], ['l12-w-now', 'l12-w-loud']),
                    makeItem(12, 'words', 'how', 'how', 'H - OW_DIPH', [['H', 'OW_DIPH']], 'OW diphthong with H dot above.', ['diph-ow', 'h-dot'], ['l12-w-now', 'l12-w-house']),
                    makeItem(12, 'words', 'loud', 'loud', 'L - OW_DIPH - D', [['L', 'OW_DIPH', 'D']], 'L + OW + D.', ['diph-ow'], ['l12-w-out', 'l12-w-round']),
                    makeItem(12, 'words', 'house', 'house', 'H - OW_DIPH - S_R', [['H', 'OW_DIPH', 'S_R']], 'OW + S with H dot above.', ['diph-ow', 'h-dot'], ['l12-w-how', 'l12-w-town']),
                    makeItem(12, 'words', 'town', 'town', 'T - OW_DIPH - N', [['T', 'OW_DIPH', 'N']], 'T + OW + N.', ['diph-ow'], ['l12-w-round', 'l12-w-sound']),
                    makeItem(12, 'words', 'round', 'round', 'R - OW_DIPH - N - D', [['R', 'OW_DIPH', 'N', 'D']], 'R + OW + N + D.', ['diph-ow'], ['l12-w-sound', 'l12-w-town']),
                    makeItem(12, 'words', 'sound', 'sound', 'S_L - OW_DIPH - N - D', [['S_L', 'OW_DIPH', 'N', 'D']], 'S + OW + N + D.', ['diph-ow'], ['l12-w-round', 'l12-w-loud']),
                    makeItem(12, 'words', 'oil', 'oil', 'OI_DIPH - L', [['OI_DIPH', 'L']], 'OI diphthong + long L.', ['diph-oi'], ['l12-w-boy', 'l12-w-coin']),
                    makeItem(12, 'words', 'boy', 'boy', 'B - OI_DIPH', [['B', 'OI_DIPH']], 'Long B + OI diphthong.', ['diph-oi'], ['l12-w-joy', 'l12-w-toy']),
                    makeItem(12, 'words', 'joy', 'joy', 'J - OI_DIPH', [['J', 'OI_DIPH']], 'Long J + OI diphthong.', ['diph-oi'], ['l12-w-boy', 'l12-w-join']),
                    makeItem(12, 'words', 'toy', 'toy', 'T - OI_DIPH', [['T', 'OI_DIPH']], 'Short T + OI diphthong.', ['diph-oi'], ['l12-w-boy', 'l12-w-coin']),
                    makeItem(12, 'words', 'join', 'join', 'J - OI_DIPH - N', [['J', 'OI_DIPH', 'N']], 'Long J + OI + N.', ['diph-oi'], ['l12-w-coin', 'l12-w-joy']),
                    makeItem(12, 'words', 'coin', 'coin', 'K - OI_DIPH - N', [['K', 'OI_DIPH', 'N']], 'Short K + OI + N.', ['diph-oi'], ['l12-w-join', 'l12-w-choice']),
                    makeItem(12, 'words', 'voice', 'voice', 'V - OI_DIPH - S_R', [['V', 'OI_DIPH', 'S_R']], 'Long V + OI + S.', ['diph-oi'], ['l12-w-noise', 'l12-w-choice']),
                    makeItem(12, 'words', 'noise', 'noise', 'N - OI_DIPH - S_L', [['N', 'OI_DIPH', 'S_L']], 'Short N + OI + S.', ['diph-oi'], ['l12-w-voice', 'l12-w-choice']),
                    makeItem(12, 'words', 'choice', 'choice', 'CH - OI_DIPH - S_R', [['CH', 'OI_DIPH', 'S_R']], 'Medium CH + OI + S.', ['diph-oi'], ['l12-w-voice', 'l12-w-coin']),
                    makeItem(12, 'words', 'use', 'use', 'U_DIPH - S_L', [['U_DIPH', 'S_L']], 'U diphthong + left S.', ['diph-u'], ['l12-w-few', 'l12-w-unit']),
                    makeItem(12, 'words', 'few', 'few', 'F - U_DIPH', [['F', 'U_DIPH']], 'Medium F + U diphthong.', ['diph-u'], ['l12-w-view', 'l12-w-new']),
                    makeItem(12, 'words', 'view', 'view', 'V - U_DIPH', [['V', 'U_DIPH']], 'Long V + U diphthong.', ['diph-u'], ['l12-w-few', 'l12-w-new']),
                    makeItem(12, 'words', 'new', 'new', 'N - U_DIPH', [['N', 'U_DIPH']], 'Short N + U diphthong.', ['diph-u'], ['l12-w-few', 'l12-w-unit']),
                    makeItem(12, 'words', 'unit', 'unit', 'U_DIPH - N - E - T', [['U_DIPH', 'N', 'E', 'T']], 'U diphthong + N + E + T.', ['diph-u'], ['l12-w-cute', 'l12-w-use']),
                    makeItem(12, 'words', 'cute', 'cute', 'K - U_DIPH - T', [['K', 'U_DIPH', 'T']], 'Short K + U diphthong + T.', ['diph-u'], ['l12-w-unit', 'l12-w-music']),
                    makeItem(12, 'words', 'music', 'music', 'M - U_DIPH - S_R - E - K', [['M', 'U_DIPH', 'S_R', 'E', 'K']], 'M + U + S + E + K.', ['diph-u'], ['l12-w-cute', 'l12-w-use'])
                ],
                phrases: [
                    makeItem(12, 'phrases', 'right-now', 'right now', 'R-I_DIPH-T | N-OW_DIPH', [['R', 'I_DIPH', 'T'], ['N', 'OW_DIPH']], 'right + now.', ['phrase'], ['l12-p-how-are-you']),
                    makeItem(12, 'phrases', 'how-are-you', 'how are you', 'H-OW_DIPH | R | OO', [['H', 'OW_DIPH'], ['R'], ['OO']], 'how + are + you.', ['phrase'], ['l12-p-right-now']),
                    makeItem(12, 'phrases', 'my-house', 'my house', 'M-I_DIPH | H-OW_DIPH-S_R', [['M', 'I_DIPH'], ['H', 'OW_DIPH', 'S_R']], 'my + house.', ['phrase'], ['l12-p-in-my-life']),
                    makeItem(12, 'phrases', 'by-the-way', 'by the way', 'B-TH | OO-A', [['B', 'TH'], ['OO', 'A']], 'by-the + way.', ['phrase'], ['l12-p-out-of-town']),
                    makeItem(12, 'phrases', 'in-my-life', 'in my life', 'N | M-I_DIPH | L-I_DIPH-F', [['N'], ['M', 'I_DIPH'], ['L', 'I_DIPH', 'F']], 'in + my + life.', ['phrase'], ['l12-p-my-house']),
                    makeItem(12, 'phrases', 'at-night', 'at night', 'T | N-I_DIPH-T', [['T'], ['N', 'I_DIPH', 'T']], 'at + night.', ['phrase'], ['l12-p-good-night']),
                    makeItem(12, 'phrases', 'good-night', 'good night', 'G | N-I_DIPH-T', [['G'], ['N', 'I_DIPH', 'T']], 'good + night.', ['phrase'], ['l12-p-at-night']),
                    makeItem(12, 'phrases', 'fine-time', 'fine time', 'F-I_DIPH-N | T-I_DIPH-M', [['F', 'I_DIPH', 'N'], ['T', 'I_DIPH', 'M']], 'fine + time.', ['phrase'], ['l12-p-new-view']),
                    makeItem(12, 'phrases', 'out-of-town', 'out of town', 'OW_DIPH-T | O | T-OW_DIPH-N', [['OW_DIPH', 'T'], ['O'], ['T', 'OW_DIPH', 'N']], 'out + of + town.', ['phrase'], ['l12-p-by-the-way']),
                    makeItem(12, 'phrases', 'new-view', 'a new view', 'DOT_A | N-U_DIPH | V-U_DIPH', [['DOT_A'], ['N', 'U_DIPH'], ['V', 'U_DIPH']], 'a + new + view.', ['phrase'], ['l12-p-fine-time']),
                    makeItem(12, 'phrases', 'try-new-things', 'I like to try new things.', 'A | L-I_DIPH-K | T | T-R-I_DIPH | N-U_DIPH | TH-E-INGS .', [['A'], ['L', 'I_DIPH', 'K'], ['T'], ['T', 'R', 'I_DIPH'], ['N', 'U_DIPH'], ['TH', 'E', 'INGS'], ['PERIOD']], 'I + like + to + try + new + things.', ['sentence'], ['l12-p-bright-coin']),
                    makeItem(12, 'phrases', 'bright-coin', 'the boy got a bright coin.', 'TH | B-OI_DIPH | G-O-T | DOT_A | B-R-I_DIPH-T | K-OI_DIPH-N .', [['TH'], ['B', 'OI_DIPH'], ['G', 'O', 'T'], ['DOT_A'], ['B', 'R', 'I_DIPH', 'T'], ['K', 'OI_DIPH', 'N'], ['PERIOD']], 'the + boy + got + a + bright + coin.', ['sentence'], ['l12-p-join-music']),
                    makeItem(12, 'phrases', 'join-music', 'join us for music in town.', 'J-OI_DIPH-N | OO-S_L | F | M-U_DIPH-S_R-E-K | N | T-OW_DIPH-N .', [['J', 'OI_DIPH', 'N'], ['OO', 'S_L'], ['F'], ['M', 'U_DIPH', 'S_R', 'E', 'K'], ['N'], ['T', 'OW_DIPH', 'N'], ['PERIOD']], 'join + us + for + music + in + town.', ['sentence'], ['l12-p-house-right-side']),
                    makeItem(12, 'phrases', 'house-right-side', 'my house is on the right side.', 'M-I_DIPH | H-OW_DIPH-S_R | E-S_L | O_SIDE-N-TH | R-I_DIPH-T | S_L-I_DIPH-D .', [['M', 'I_DIPH'], ['H', 'OW_DIPH', 'S_R'], ['E', 'S_L'], ['O_SIDE', 'N', 'TH'], ['R', 'I_DIPH', 'T'], ['S_L', 'I_DIPH', 'D'], ['PERIOD']], 'my + house + is + on-the + right + side.', ['sentence'], ['l12-p-read-gregg']),
                    makeItem(12, 'phrases', 'read-gregg', 'now you can read Gregg shorthand.', 'N-OW_DIPH | OO-K | R-E-D | G-R-E-G | SH-O_SIDE-R-T-H-A-N-D .', [['N', 'OW_DIPH'], ['OO', 'K'], ['R', 'E', 'D'], ['G', 'R', 'E', 'G'], ['SH', 'O_SIDE', 'R', 'T', 'H', 'A', 'N', 'D'], ['PERIOD']], 'now + you-can + read + Gregg + shorthand.', ['sentence'], ['l12-p-try-new-things'])
                ]
            }
        }
    ];

    function getLessonById(lessonId) {
        return LESSONS.find(l => l.id === lessonId) || null;
    }

    function getLessonByNumber(num) {
        return LESSONS.find(l => l.number === num) || null;
    }

    function getAllItems() {
        const items = [];
        for (const lesson of LESSONS) {
            for (const stage of STAGES) {
                items.push(...lesson.stages[stage]);
            }
        }
        return items;
    }

    function getItemsForStage(lessonId, stage) {
        const lesson = getLessonById(lessonId);
        if (!lesson || !lesson.stages[stage]) return [];
        return lesson.stages[stage];
    }

    return {
        STAGES,
        STAGE_LABELS,
        TOKEN_INTRO_LESSON,
        LESSONS,
        getLessonById,
        getLessonByNumber,
        getAllItems,
        getItemsForStage
    };
}));
