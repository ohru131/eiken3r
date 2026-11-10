// 英検2級の問題カード。
// No.2 は3コマ漫画のナレーション（story）。コマの絵は public/images/g2/<id>-1.png 〜 <id>-3.png を置くと表示される。
// 画像が無い間は scene.items の絵文字で描いた仮イラストを表示する。作成用プロンプトは docs/grade2-image-prompts.md
import type { ExamCard } from '../types';
import { G2_Q2_JA, G2_Q2_TEXT } from './grade2Shared';
import { GRADE2_CARDS_2 } from './grade2Cards2';
import { GRADE2_CARDS_3 } from './grade2Cards3';
import { GRADE2_CARDS_4 } from './grade2Cards4';

const BASE: ExamCard[] = [
  {
    id: 'g2-01',
    grade: '2',
    title: 'Reducing Food Waste',
    japaneseTitle: '食品ロスを減らす',
    category: '環境',
    level: 'basic',
    passage:
      'Today, a lot of food is thrown away at stores and restaurants even though it can still be eaten. This is a serious problem in many countries. Now, some companies offer smartphone apps that sell such food at low prices. More and more people use these apps, and by doing so they help reduce food waste in their communities.',
    passageJa:
      '今日、店やレストランでは、まだ食べられるのに多くの食品が捨てられています。これは多くの国で深刻な問題です。今では、そのような食品を安い値段で売るスマートフォンアプリを提供する会社もあります。ますます多くの人がこうしたアプリを使い、そうすることで地域の食品ロスを減らす手助けをしています。',
    vocabulary: [
      { word: 'throw away', meaning: '捨てる' },
      { word: 'even though', meaning: '〜にもかかわらず' },
      { word: 'serious', meaning: '深刻な' },
      { word: 'offer', meaning: '提供する' },
      { word: 'food waste', meaning: '食品ロス、食品廃棄物' },
      { word: 'community', meaning: '地域社会' },
    ],
    story: {
      firstSentence: 'One day, Mr. and Mrs. Sato were talking in their kitchen.',
      panels: [
        {
          scene: {
            background: 'kitchen',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '👩', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🗑️', x: 86, y: 78, size: 2.6 },
              { emoji: '🥬', x: 86, y: 62, size: 1.8 },
            ],
            description:
              'Panel 1 (in the kitchen): Mr. Sato is talking to his wife. There is a trash can full of leftover food next to them. Mr. Sato says, "We throw away too much food."',
          },
          speech: { speaker: 'Mr. Sato', text: 'We throw away too much food.' },
        },
        {
          caption: 'That weekend at a supermarket',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '📝', x: 43, y: 58, size: 2 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true, thought: '🥩' },
              { emoji: '🛒', x: 84, y: 72, size: 2.8 },
            ],
            description:
              'Panel 2 (that weekend at a supermarket): Mrs. Sato is checking a shopping list. Mr. Sato is pushing a shopping cart and thinking of buying some meat.',
          },
        },
        {
          caption: 'That evening',
          scene: {
            background: 'kitchen',
            items: [
              { emoji: '👨', x: 28, y: 62, size: 4.6 },
              { emoji: '🍳', x: 42, y: 58, size: 2.2 },
              { emoji: '👩', x: 70, y: 62, size: 4.6, flip: true, thought: '📦' },
              { emoji: '🥕', x: 84, y: 60, size: 1.8 },
            ],
            description:
              'Panel 3 (that evening in the kitchen): Mr. Sato is cooking dinner. Mrs. Sato is holding leftover vegetables and thinking of putting them in a container to keep them.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how do more and more people help reduce food waste in their communities?',
      ja: 'パッセージによると、ますます多くの人々はどのようにして地域の食品ロスを減らす手助けをしていますか？',
      modelAnswers: [
        'By using smartphone apps that sell food at low prices.',
        'They use smartphone apps that sell food that can still be eaten at low prices.',
      ],
      explanation:
        '最後の文の by doing so（そうすることで）が答えの目印。doing so は直前の use these apps を指し、these apps は前の文の「そのような食品を安く売るスマートフォンアプリ」のこと。these を具体的に言い換えて By using ~ で答えます。',
      point: 'by doing so の中身 → By ~ing（these を具体的に）',
      commonMistakes: [
        '「By using these apps.」と these のまま答える→ apps that sell food at low prices と具体的に言う',
        '「By use apps」と動詞を原形のままにする→ By using',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. and Mrs. Sato were talking in their kitchen. Mr. Sato said to his wife, "We throw away too much food." That weekend at a supermarket, Mrs. Sato was checking a shopping list. Mr. Sato was thinking of buying some meat. That evening, Mr. Sato was cooking dinner. Mrs. Sato was thinking of putting the leftover vegetables in a container.',
      ],
      explanation:
        'カードの1文で始め、各コマを2文ずつ、過去形・過去進行形で話します。1コマ目はセリフを said to ~, "..." でそのまま引用。2・3コマ目は矢印の言葉（That weekend at a supermarket など）で文を始め、人物の動作（was ~ing）と吹き出し（was thinking of ~ing）を1文ずつ言います。',
      point: '各コマ2文・過去形／矢印の言葉で始める',
      commonMistakes: [
        '「Mr. Sato is cooking dinner.」と現在形で話す→ was cooking（過去のお話として語る）',
        'カードの書き出しの文を言わずに始める→ One day, ... の文をそのまま読んでから続ける',
        '吹き出しの内容を言わない→ was thinking of ~ing で必ず触れる',
      ],
    },
    q3: {
      text: 'Some people say that restaurants should give customers smaller amounts of food to reduce waste. What do you think about that?',
      ja: '食品ロスを減らすために、レストランは客に出す料理の量を少なくするべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Many customers cannot finish all the food they order. Smaller amounts are good for both their health and the environment.',
        'I disagree. Many customers want to eat a lot when they go to restaurants. Restaurants should let them take leftover food home instead.',
      ],
      explanation:
        '最初に I agree. / I disagree. で立場をはっきり言い、理由を2文で続けます。1文目で主な理由、2文目で具体例や補足を足すと説得力が上がります。どちらの立場でも点数は同じです。',
      point: 'I agree / I disagree → 理由2文',
      commonMistakes: [
        '「I think so.」だけで理由を言わない→理由を2文で',
        '賛成・反対を言わずに説明を始める→最初に I agree. / I disagree.',
      ],
    },
    q4: {
      text: 'Today, many people buy things on the Internet. Do you think more people will do their shopping online in the future?',
      ja: '今日、多くの人がインターネットで買い物をします。今後、オンラインで買い物をする人はもっと増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'People can buy things at any time without going to stores. Also, things are often cheaper on the Internet.',
      ],
      modelAnswersNo: [
        'Many people want to see products with their own eyes before buying them. Also, some people worry about giving personal information online.',
      ],
      explanation:
        'まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。Also, ... や For example, ... で2文目を足しましょう。',
      point: 'Yes/No → 理由2文（主張＋補足）',
      commonMistakes: [
        '「Because convenient.」と単語だけで答える→ It is convenient because ... と文で',
        '理由が1文だけで終わる→ Also, ... で2文目を足す',
      ],
    },
  },
];

export const GRADE2_CARDS: ExamCard[] = [...BASE, ...GRADE2_CARDS_2, ...GRADE2_CARDS_3, ...GRADE2_CARDS_4];
