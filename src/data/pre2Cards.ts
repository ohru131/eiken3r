// 英検準2級の問題カード。
// イラストは public/images/pre2/<id>-a.png（イラストA）・<id>-b.png（イラストB）を置くと表示される。
// 画像が無い間は scene.items の絵文字で描いた仮イラストを表示する。作成用プロンプトは docs/pre2-image-prompts.md
import type { ExamCard } from '../types';
import { PRE2_CARDS_2 } from './pre2Cards2';

const BASE: ExamCard[] = [
  {
    id: 'pre2-01',
    grade: 'pre2',
    title: 'Reusable Bottles',
    japaneseTitle: '繰り返し使えるボトル',
    category: '環境',
    level: 'basic',
    passage:
      'Many people buy drinks in plastic bottles when they go out. However, plastic bottles can be bad for the environment. Now, some people carry reusable bottles. They fill their bottles with water or tea at home, and by doing so they can reduce plastic waste.',
    passageJa:
      '多くの人が外出するとき、ペットボトルの飲み物を買います。しかし、ペットボトルは環境に悪いことがあります。今、繰り返し使えるボトルを持ち歩く人もいます。彼らは家で水やお茶をボトルに入れ、そうすることでプラスチックごみを減らすことができます。',
    vocabulary: [
      { word: 'reusable', meaning: '繰り返し使える' },
      { word: 'environment', meaning: '環境' },
      { word: 'fill A with B', meaning: 'AをBで満たす' },
      { word: 'reduce', meaning: '減らす' },
      { word: 'waste', meaning: 'ごみ、廃棄物' },
    ],
    scene: {
      background: 'park',
      image: '/images/pre2/pre2-01-a.png',
      items: [
        { emoji: '👦', x: 12, y: 66, size: 3.2 },
        { emoji: '⚽', x: 20, y: 80, size: 1.6 },
        { emoji: '👩', x: 32, y: 64, size: 3.2 },
        { emoji: '📷', x: 39, y: 58, size: 1.6 },
        { emoji: '👨', x: 52, y: 64, size: 3.2 },
        { emoji: '📦', x: 59, y: 60, size: 1.8 },
        { emoji: '👧', x: 71, y: 68, size: 3 },
        { emoji: '🐦', x: 79, y: 82, size: 1.4 },
        { emoji: '👴', x: 89, y: 64, size: 3.2 },
        { emoji: '🖌️', x: 95, y: 62, size: 1.4 },
        { emoji: '[bench]', x: 92, y: 76, size: 2.4 },
        { emoji: '🌳', x: 50, y: 30, size: 4 },
      ],
      description:
        'Picture A (a park): five people are doing different things. A boy is kicking a ball. A woman is taking a picture. A man is carrying a box. A girl is feeding a bird. An old man is painting a bench.',
    },
    sceneB: {
      background: 'street',
      image: '/images/pre2/pre2-01-b.png',
      items: [
        { emoji: '👧', x: 45, y: 66, size: 4, thought: '🚰' },
        { emoji: '🍼', x: 56, y: 62, size: 1.8 },
        { emoji: '☀️', x: 85, y: 14, size: 2.4 },
      ],
      description:
        'Picture B (a street on a hot day): a girl is holding her bottle upside down. It is empty. She is thinking of filling it with water at a water fountain.',
    },
    q1: {
      text: 'According to the passage, how can some people reduce plastic waste?',
      ja: 'パッセージによると、一部の人々はどのようにしてプラスチックごみを減らすことができますか？',
      modelAnswers: [
        'By filling their bottles with water or tea at home.',
        'They fill their bottles with water or tea at home.',
      ],
      explanation:
        '最後の文の by doing so（そうすることで）が答えの目印。doing so は直前の「家で水やお茶をボトルに入れる」を指します。How ~? には By ~ing で答えるのが定番です。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By doing so.」と本文の語句をそのまま答える→ doing so の中身を具体的に言う',
        '「By fill their bottles」と動詞を原形のままにする→ By filling',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A boy is kicking a ball. A woman is taking a picture. A man is carrying a box. A girl is feeding a bird. An old man is painting a bench.',
      ],
      explanation:
        '5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A boy kicks a ball.」と現在形にする→ is kicking',
        '人数が足りない（3〜4人で止まる）→ 5人全員を説明する',
        '「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する',
      ],
    },
    q3: {
      text: 'Now, look at the girl in Picture B. Please describe the situation.',
      ja: 'では、イラストBの女の子を見てください。状況を説明してください。',
      modelAnswers: [
        "Her bottle is empty, so she's thinking of filling it with water.",
        "She can't drink anything because her bottle is empty. She wants to fill it with water.",
      ],
      explanation:
        '「ボトルが空である（状況）」と「水を入れようと考えている（吹き出し）」の2点を、so や because でつないで1〜2文で言います。吹き出しは be thinking of ~ing や want to ~ で表します。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '吹き出しの内容だけを言う→ボトルが空だという状況も説明する',
        '「She is thinking fill it.」→ be thinking of ~ing',
      ],
    },
    q4: {
      text: 'Do you think more people will carry their own bottles in the future?',
      ja: '今後、自分のボトルを持ち歩く人は増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many people are interested in protecting the environment. Also, they can save money by not buying drinks.',
      ],
      modelAnswersNo: [
        'Carrying a bottle every day is not easy. Many people think buying drinks at convenience stores is more convenient.',
      ],
      explanation:
        'まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: [
        '「Because environment.」と単語だけで答える→主語と動詞のある文で',
        '理由が1文だけで終わる→ Also, ... で2文目を足す',
      ],
    },
    q5: {
      text: 'These days, many people enjoy outdoor activities such as camping. Do you like to spend time outdoors?',
      ja: '最近、キャンプなどの野外活動を楽しむ人が多いです。あなたは屋外で過ごすのが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I often go hiking with my family on weekends. We enjoy walking in the mountains and taking pictures.',
      ],
      modelAnswersNo: [
        'I prefer to stay at home and read books. Also, I don\'t like hot weather.',
      ],
      explanation:
        'Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。',
      point: 'Yes → 具体的な経験2文 / No → 理由2文',
      commonMistakes: ['Yes / No だけで止まる→追加質問に2文で答える'],
    },
  },
];

export const PRE2_CARDS: ExamCard[] = [...BASE, ...PRE2_CARDS_2];
