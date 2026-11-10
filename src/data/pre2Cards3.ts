// 英検準2級の問題カード（pre2-13〜pre2-24）。
// イラストは public/images/pre2/<id>-a.png / <id>-b.png。作成用プロンプトは docs/pre2-image-prompts.md
import type { ExamCard } from '../types';

export const PRE2_CARDS_3: ExamCard[] = [
  {
    id: 'pre2-13',
    grade: 'pre2',
    title: 'Cashless Payments',
    japaneseTitle: 'キャッシュレス決済',
    category: 'テクノロジー',
    level: 'basic',
    passage:
      'Many people now pay with smartphones or credit cards when they go shopping. Some small stores also accept these cashless payments. Customers only need to scan a QR code with their phones, and by doing so they can pay quickly without carrying cash.',
    passageJa:
      '今、多くの人が買い物をするときにスマートフォンやクレジットカードで支払いをします。一部の小さなお店でもこれらのキャッシュレス決済を受け付けています。客は電話でQRコードを読み取るだけでよく、そうすることで現金を持ち歩かずに素早く支払うことができます。',
    vocabulary: [
      { word: 'cashless', meaning: '現金のいらない、キャッシュレスの' },
      { word: 'accept', meaning: '受け入れる、受け付ける' },
      { word: 'customer', meaning: '客' },
      { word: 'scan', meaning: '読み取る' },
      { word: 'carry', meaning: '持ち歩く、運ぶ' },
    ],
    scene: {
      background: 'shop',
      image: '/images/pre2/pre2-13-a.png',
      items: [
        { emoji: '👩', x: 10, y: 64, size: 3.2 },
        { emoji: '📱', x: 17, y: 62, size: 1.6 },
        { emoji: '👨', x: 30, y: 64, size: 3.2 },
        { emoji: '🛍️', x: 37, y: 66, size: 1.8 },
        { emoji: '👦', x: 50, y: 64, size: 3.2 },
        { emoji: '🧾', x: 57, y: 62, size: 1.5 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🍎', x: 77, y: 66, size: 1.6 },
        { emoji: '👴', x: 90, y: 64, size: 3.2 },
        { emoji: '🧺', x: 96, y: 66, size: 1.8 },
      ],
      description:
        'Picture A (a grocery store): five people are doing different things. A woman is scanning a QR code with her smartphone. A man is putting groceries into an eco-bag. A boy is looking at a receipt. A girl is choosing some apples. An old man is holding a shopping basket.',
    },
    sceneB: {
      background: 'street',
      image: '/images/pre2/pre2-13-b.png',
      items: [
        { emoji: '👨', x: 45, y: 66, size: 4, thought: '🏧' },
        { emoji: '💳', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (an outdoor vegetable stand): a man wants to buy some vegetables, but the small shop only accepts cash and he only has a card. He is thinking of finding an ATM to get some cash.',
    },
    q1: {
      text: 'According to the passage, how can customers pay quickly without carrying cash?',
      ja: 'パッセージによると、客はどのようにして現金を持ち歩かずに素早く支払うことができますか？',
      modelAnswers: [
        'By scanning a QR code with their phones.',
        'They scan a QR code with their phones.',
      ],
      explanation:
        '最後の文の by doing so（そうすることで）が答えの目印。doing so は直前の「電話でQRコードを読み取る」を指します。How ~? には By ~ing で答えるのが定番です。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By doing so.」と本文の語句をそのまま答える→ 具体的な内容を言う',
        '「By scan a QR code」と原形にする→ By scanning と動名詞にする',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A woman is scanning a QR code with her smartphone. A man is putting groceries into an eco-bag. A boy is looking at a receipt. A girl is choosing some apples. An old man is holding a shopping basket.',
      ],
      explanation:
        '5人の動作を1人1文ずつ、現在進行形（is ~ing）で説明します。左から順に説明すると抜けが出にくくなります。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '人数が足りない（3〜4人で止まる）→ 5人全員を説明する',
        '「A woman scans...」と現在形にする→ is scanning など進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the man in Picture B. Please describe the situation.',
      ja: 'では、イラストBの男性を見てください。状況を説明してください。',
      modelAnswers: [
        "The shop only takes cash and he does not have enough cash, so he's thinking of finding an ATM.",
        "He cannot buy the vegetables because he only has a credit card. He wants to go to an ATM.",
      ],
      explanation:
        '「お店が現金のみで現金を持っていない（状況）」と「ATMを探そうと考えている（吹き出し）」の2点を、so や because でつないで言います。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '吹き出し（ATM）だけを言う→現金を持っていないという状況も説明する',
        '「He is thinking go to an ATM.」→ be thinking of going',
      ],
    },
    q4: {
      text: 'Do you think more stores will stop accepting cash in the future?',
      ja: '将来、現金の受け付けをやめるお店は増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Cashless payments make shopping faster and easier for customers. Also, stores do not need to keep lots of coins and bills safely.',
      ],
      modelAnswersNo: [
        'Many elderly people still prefer using paper money and coins. Also, cashless machines may not work when power outages occur.',
      ],
      explanation:
        'Yes / No を言った後、Why? / Why not? には理由を2文で答えます。利便性や防犯面、または高齢者の習慣や停電時のリスクを挙げると自然です。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['理由が1文だけで終わる→ Also, ... で2文目を足す'],
    },
    q5: {
      text: 'Today, many people buy things on the internet. Do you prefer shopping online or in real stores?',
      ja: '今日、多くの人がインターネットで買い物をします。あなたはオンラインでの買い物と実際の店での買い物のどちらが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Please tell me more.',
      modelAnswers: ['I prefer shopping online. / I prefer shopping in real stores.'],
      modelAnswersYes: [
        'I can buy clothes and books at any time without leaving home. Also, it is very easy to compare prices between shops.',
      ],
      modelAnswersNo: [
        'I like to check the size and quality of items with my own hands. Also, I can take the items home immediately.',
      ],
      explanation:
        '自分の好みを答えた後、具体的なメリットや理由を2文で説明します。時間節約・品揃え、または実物確認・即時持ち帰りなどを理由にできます。',
      point: '選択 → 理由・具体例2文',
      commonMistakes: ['単語だけで答える→主語と動詞のある完全な文で答える'],
    },
  },
  {
    id: 'pre2-14',
    grade: 'pre2',
    title: 'Solar Energy',
    japaneseTitle: '太陽光エネルギー',
    category: '環境',
    level: 'basic',
    passage:
      'In recent years, more families are putting solar panels on the roofs of their houses. Solar power produces clean electricity without making dirty smoke. Families generate their own electricity on sunny days, and by doing so they can save money and help the environment.',
    passageJa:
      '近年、自宅の屋根に太陽光パネルを設置する家庭が増えています。太陽光発電は汚れた煙を出さずにクリーンな電気を作り出します。晴れた日に家族は自分で電気を発電し、そうすることでお金を節約し環境を守る手助けができます。',
    vocabulary: [
      { word: 'solar panel', meaning: '太陽光パネル' },
      { word: 'produce', meaning: '生み出す、作り出す' },
      { word: 'electricity', meaning: '電気' },
      { word: 'generate', meaning: '（電気などを）発電する、発生させる' },
      { word: 'save money', meaning: 'お金を節約する' },
    ],
    scene: {
      background: 'garden',
      image: '/images/pre2/pre2-14-a.png',
      items: [
        { emoji: '👩', x: 10, y: 64, size: 3.2 },
        { emoji: '🚰', x: 18, y: 66, size: 1.6 },
        { emoji: '👦', x: 30, y: 64, size: 3.2 },
        { emoji: '📷', x: 37, y: 62, size: 1.5 },
        { emoji: '👨', x: 50, y: 64, size: 3.2 },
        { emoji: '🧹', x: 57, y: 64, size: 1.8 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🪴', x: 77, y: 68, size: 1.6 },
        { emoji: '👵', x: 90, y: 64, size: 3.2 },
        { emoji: '🍅', x: 96, y: 64, size: 1.5 },
      ],
      description:
        'Picture A (a community garden): five people are doing different things. A woman is watering some plants. A boy is taking a picture of a flower. A man is sweeping leaves with a broom. A girl is carrying a small flowerpot. An old woman is picking some tomatoes.',
    },
    sceneB: {
      background: 'park',
      image: '/images/pre2/pre2-14-b.png',
      items: [
        { emoji: '👧', x: 45, y: 66, size: 4, thought: '☀️' },
        { emoji: '📱', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a park): a girl is trying to charge her phone with a small solar charger, but her bench is under the shadow of a tree. She is thinking of moving to a sunny spot.',
    },
    q1: {
      text: 'According to the passage, how can families save money and help the environment?',
      ja: 'パッセージによると、家族はどのようにしてお金を節約し環境を守る手助けができますか？',
      modelAnswers: [
        'By generating their own electricity on sunny days.',
        'They generate their own electricity on sunny days.',
      ],
      explanation:
        '最後の文の by doing so が目印。直前の「晴れた日に自分で電気を発電する」を By ~ing に変えて答えます。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By sunny days」と名詞句だけにする→ By generating electricity と動名詞にする',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A woman is watering some plants. A boy is taking a picture of a flower. A man is sweeping leaves with a broom. A girl is carrying a flowerpot. An old woman is picking some tomatoes.',
      ],
      explanation:
        '5人の動作を1人1文ずつ現在進行形（is ~ing）で言います。水やり、写真撮影、掃除、運搬、収穫の5つを明確に述べましょう。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「She is watering.」と主語を全部代名詞にする→ A woman / A boy など誰かを言う',
      ],
    },
    q3: {
      text: 'Now, look at the girl in Picture B. Please describe the situation.',
      ja: 'では、イラストBの女の子を見てください。状況を説明してください。',
      modelAnswers: [
        "Her solar charger is in the shade, so she's thinking of moving to a sunny spot.",
        "She cannot charge her smartphone because there is no sunlight. She wants to sit under the sun.",
      ],
      explanation:
        '「充電器が日陰にあって充電できない（状況）」と「日当たりの良い場所に移動しようと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '吹き出しの太陽だけ言って終わる→日陰で充電できない状況も説明する',
      ],
    },
    q4: {
      text: 'Do you think more houses will have solar panels in the future?',
      ja: '将来、より多くの住宅に太陽光パネルが設置されると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Solar energy helps fight global warming by reducing carbon emissions. Also, electricity prices are high, so people want to produce their own power.',
      ],
      modelAnswersNo: [
        'Installing solar panels is still very expensive for many families. Also, they cannot generate enough power on rainy or snowy days.',
      ],
      explanation:
        'Yes なら環境保護や電気代削減、No なら初期費用の高さや天候による発電量の不安定さを理由に挙げます。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['理由が1文で止まる→ Also, ... で2文目を加える'],
    },
    q5: {
      text: 'These days, many people try to save energy in their daily lives. Do you do anything to save electricity?',
      ja: '最近、日常生活で省エネを心がける人が多いです。あなたは節電のために何かしていますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I always turn off the lights when I leave my room. Also, I try not to set the air conditioner too cold in the summer.',
      ],
      modelAnswersNo: [
        'I do not think about saving electricity very often in my daily life. However, I want to learn more ways to conserve energy.',
      ],
      explanation:
        'Yes ならこまめな消灯やエアコン温度設定、No なら普段意識していないことと今後学びたい姿勢を2文で答えます。',
      point: 'Yes → 具体例2文 / No → 理由2文',
      commonMistakes: ['Yes / No だけ言って黙ってしまう→2文で続ける'],
    },
  },
  {
    id: 'pre2-15',
    grade: 'pre2',
    title: 'Smartphones in School',
    japaneseTitle: '学校でのスマートフォン利用',
    category: '教育',
    level: 'standard',
    passage:
      'At some schools, teachers allow students to use smartphones during lessons. Students can search for information on the internet or look up difficult words. They share their ideas on the screen with classmates, and in this way they can enjoy learning together.',
    passageJa:
      '一部の学校では、先生が生徒に授業中のスマートフォン使用を許可しています。生徒はインターネットで情報を探したり、難しい単語を調べたりできます。彼らは画面上で考えをクラスメイトと共有し、このようにして一緒に楽しく学ぶことができます。',
    vocabulary: [
      { word: 'allow', meaning: '許可する' },
      { word: 'lesson', meaning: '授業' },
      { word: 'search for', meaning: '〜を探す、検索する' },
      { word: 'information', meaning: '情報' },
      { word: 'share', meaning: '共有する' },
    ],
    scene: {
      background: 'classroom',
      image: '/images/pre2/pre2-15-a.png',
      items: [
        { emoji: '👦', x: 10, y: 64, size: 3.2 },
        { emoji: '🔬', x: 18, y: 64, size: 1.6 },
        { emoji: '👧', x: 30, y: 64, size: 3.2 },
        { emoji: '📝', x: 37, y: 66, size: 1.5 },
        { emoji: '👨', x: 50, y: 64, size: 3.2 },
        { emoji: '🧪', x: 57, y: 64, size: 1.6 },
        { emoji: '👩', x: 70, y: 64, size: 3.2 },
        { emoji: '📊', x: 77, y: 62, size: 1.6 },
        { emoji: '🧑', x: 90, y: 64, size: 3.2 },
        { emoji: '🎒', x: 96, y: 66, size: 1.8 },
      ],
      description:
        'Picture A (a science classroom): five people are doing different things. A boy is looking through a microscope. A girl is writing notes in a notebook. A male student is washing a test tube. A female teacher is pointing at a whiteboard. Another student is packing books into a backpack.',
    },
    sceneB: {
      background: 'classroom',
      image: '/images/pre2/pre2-15-b.png',
      items: [
        { emoji: '👦', x: 45, y: 66, size: 4, thought: '🔌' },
        { emoji: '📱', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a classroom): a boy wants to use his smartphone for research, but the battery has run out. He is thinking of asking his classmate for a charger.',
    },
    q1: {
      text: 'According to the passage, how can students enjoy learning together?',
      ja: 'パッセージによると、生徒はどのようにして一緒に楽しく学ぶことができますか？',
      modelAnswers: [
        'By sharing their ideas on the screen with classmates.',
        'They share their ideas on the screen with classmates.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が目印。直前の「画面上で考えをクラスメイトと共有する」を By ~ing で答えます。',
      point: 'in this way の指す内容 → By ~ing',
      commonMistakes: [
        '「In this way」のまま答える→ By sharing ideas ... と具体的に言う',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A boy is looking through a microscope. A girl is writing notes in a notebook. A male student is washing a test tube. A female teacher is pointing at a whiteboard. Another student is packing books into a backpack.',
      ],
      explanation:
        '顕微鏡を覗く、ノートを取る、試験管を洗う、黒板を指差す、カバンに本を入れる、の5つの動作を現在進行形（is ~ing）で説明します。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「He is looking microscope.」→ look through a microscope',
      ],
    },
    q3: {
      text: 'Now, look at the boy in Picture B. Please describe the situation.',
      ja: 'では、イラストBの男の子を見てください。状況を説明してください。',
      modelAnswers: [
        "His smartphone battery has run out, so he's thinking of asking his classmate for a charger.",
        "He cannot use his phone because the battery is dead. He wants to borrow a charger.",
      ],
      explanation:
        '「バッテリーが切れて使えない（状況）」と「充電器を借りようと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「His phone is broken.」→ 壊れているのではなく充電が切れている（battery is dead / has run out）',
      ],
    },
    q4: {
      text: 'Do you think more schools will encourage students to use smartphones for studying?',
      ja: '勉強のためにスマートフォンを使うことを勧める学校は増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Smartphones allow students to find useful information and dictionary apps instantly. Also, learning how to use digital tools prepares them for the future.',
      ],
      modelAnswersNo: [
        'Some students might play games or check social media instead of studying. Also, looking at bright screens for too long is bad for their eyes.',
      ],
      explanation:
        'Yes なら検索の即時性やITスキルの習得、No なら授業中の集中力の低下や視力への影響を理由に挙げます。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['Yes / No で止まる→理由を2文で続ける'],
    },
    q5: {
      text: 'Many people communicate with their friends using messaging apps. Do you often send messages to your friends?',
      ja: '多くの人がメッセージアプリで友達と連絡を取り合っています。あなたはよく友達にメッセージを送りますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I send messages to my friends every day after school. We often talk about our homework and weekend plans.',
      ],
      modelAnswersNo: [
        'I prefer talking with my friends directly at school. Also, checking messages too often makes me feel tired.',
      ],
      explanation:
        'Yes なら頻度と話す話題（宿題や週末の予定）、No なら直接会って話すのが好きだということや画面疲れを答えます。',
      point: 'Yes → 頻度と話題2文 / No → 理由2文',
      commonMistakes: ['単語だけで短く答える→文の形で具体的に言う'],
    },
  },
  {
    id: 'pre2-16',
    grade: 'pre2',
    title: 'Community Sports Clubs',
    japaneseTitle: '地域のスポーツクラブ',
    category: '健康',
    level: 'basic',
    passage:
      'Staying healthy is important for people of all ages. Many towns organize local sports clubs where residents can play tennis, soccer, or badminton. Neighbors gather and exercise on weekends, and by doing so they can make new friends and stay fit.',
    passageJa:
      '健康を保つことはあらゆる年齢の人にとって重要です。多くの町では、住民がテニスやサッカー、バドミントンができる地域のスポーツクラブを企画しています。住民は週末に集まって運動し、そうすることで新しい友人を作り健康を保つことができます。',
    vocabulary: [
      { word: 'stay healthy', meaning: '健康を保つ' },
      { word: 'resident', meaning: '住民' },
      { word: 'gather', meaning: '集まる' },
      { word: 'exercise', meaning: '運動する' },
      { word: 'stay fit', meaning: '健康でいる、体力を維持する' },
    ],
    scene: {
      background: 'gym',
      image: '/images/pre2/pre2-16-a.png',
      items: [
        { emoji: '👩', x: 10, y: 64, size: 3.2 },
        { emoji: '🏃', x: 18, y: 64, size: 1.8 },
        { emoji: '👨', x: 30, y: 64, size: 3.2 },
        { emoji: '🏋️', x: 37, y: 62, size: 1.8 },
        { emoji: '👧', x: 50, y: 64, size: 3.2 },
        { emoji: '🧘', x: 57, y: 66, size: 1.6 },
        { emoji: '👦', x: 70, y: 64, size: 3.2 },
        { emoji: '🍶', x: 77, y: 64, size: 1.5 },
        { emoji: '👴', x: 90, y: 64, size: 3.2 },
        { emoji: '🚴', x: 96, y: 64, size: 1.8 },
      ],
      description:
        'Picture A (a fitness gym): five people are doing different things. A woman is running on a treadmill. A man is lifting dumbbells. A girl is stretching on an exercise mat. A boy is drinking water from a bottle. An old man is riding a stationary bike.',
    },
    sceneB: {
      background: 'gym',
      image: '/images/pre2/pre2-16-b.png',
      items: [
        { emoji: '👩', x: 45, y: 66, size: 4, thought: '🏸' },
        { emoji: '🎾', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a tennis court): a woman wants to play tennis, but the strings on her racket are broken. She is thinking of borrowing another racket from a staff member.',
    },
    q1: {
      text: 'According to the passage, how can neighbors make new friends and stay fit?',
      ja: 'パッセージによると、住民はどのようにして新しい友人を作り健康を保つことができますか？',
      modelAnswers: [
        'By gathering and exercising on weekends.',
        'They gather and exercise on weekends.',
      ],
      explanation:
        '最後の文の by doing so が目印。直前の「週末に集まって運動する」を By gathering and exercising on weekends. と答えます。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By play tennis」と動詞の形を間違える→ By gathering and exercising',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A woman is running on a treadmill. A man is lifting dumbbells. A girl is stretching on an exercise mat. A boy is drinking water from a bottle. An old man is riding a stationary bike.',
      ],
      explanation:
        'ルームランナーを走る、ダンベルを持ち上げる、マットでストレッチをする、水を飲む、エアロバイクをこぐ、の5人を現在進行形で言います。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A man is exercising.」と大雑把すぎる→ lifting dumbbells など具体的な動作を言う',
      ],
    },
    q3: {
      text: 'Now, look at the woman in Picture B. Please describe the situation.',
      ja: 'では、イラストBの女性を見てください。状況を説明してください。',
      modelAnswers: [
        "Her tennis racket is broken, so she's thinking of borrowing another racket.",
        "She cannot play tennis because her racket string is broken. She wants to borrow one.",
      ],
      explanation:
        '「ラケットが壊れていてテニスができない（状況）」と「予備のラケットを借りようと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「She is thinking borrow a racket.」→ be thinking of borrowing',
      ],
    },
    q4: {
      text: 'Do you think more people will join community sports clubs in the future?',
      ja: '将来、地域のスポーツクラブに参加する人は増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Exercising with other people is much more enjoyable than working out alone. Also, local clubs are usually cheaper than private fitness gyms.',
      ],
      modelAnswersNo: [
        'Many people are too busy with work and studies to join clubs on weekends. Also, some people prefer exercising at home with online videos.',
      ],
      explanation:
        'Yes なら仲間と運動する楽しさや費用の手頃さ、No なら多忙さや自宅でのオンライントレーニングの人気を理由にします。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['Why? に対して単語だけで答える→主語と動詞のある2文で'],
    },
    q5: {
      text: 'Some people like exercising outdoors, while others prefer exercising indoors. Which do you like better?',
      ja: '屋外で運動するのが好きな人もいれば、屋内で運動するのを好む人もいます。あなたはどちらが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Please tell me more.',
      modelAnswers: ['I like exercising outdoors better. / I prefer exercising indoors.'],
      modelAnswersYes: [
        'I enjoy running in the park while breathing fresh air. Also, exercising under the sunshine makes me feel refreshed.',
      ],
      modelAnswersNo: [
        'I can exercise comfortably inside without worrying about rain or strong wind. Also, indoor facilities have air conditioners during hot summers.',
      ],
      explanation:
        '屋外派なら新鮮な空気や日光の心地よさ、屋内派なら天候に左右されないことや空調の快適さを2文で説明します。',
      point: '選択 → 理由2文',
      commonMistakes: ['どちらか選んだだけで理由を言わない→2文で続ける'],
    },
  },
  {
    id: 'pre2-17',
    grade: 'pre2',
    title: 'Food Delivery Apps',
    japaneseTitle: 'フードデリバリーアプリ',
    category: '生活',
    level: 'basic',
    passage:
      'Food delivery services have become very popular in many cities. People can choose their favorite dishes from many local restaurants on their smartphones. Delivery staff bring hot meals straight to their front doors, and in this way people can enjoy restaurant meals without going outside.',
    passageJa:
      '多くの都市でフードデリバリーサービスが大人気になっています。人々はスマートフォンで多くの地元レストランからお気に入りの料理を選ぶことができます。配達スタッフが温かい料理を玄関先まで直接届けてくれ、このようにして人々は外出しなくても飲食店の料理を楽しむことができます。',
    vocabulary: [
      { word: 'delivery', meaning: '配達' },
      { word: 'service', meaning: 'サービス' },
      { word: 'popular', meaning: '人気のある' },
      { word: 'straight to', meaning: 'まっすぐ〜へ、直接〜へ' },
      { word: 'meal', meaning: '食事' },
    ],
    scene: {
      background: 'restaurant',
      image: '/images/pre2/pre2-17-a.png',
      items: [
        { emoji: '👨', x: 10, y: 64, size: 3.2 },
        { emoji: '🍝', x: 18, y: 64, size: 1.6 },
        { emoji: '👩', x: 30, y: 64, size: 3.2 },
        { emoji: '📱', x: 37, y: 62, size: 1.5 },
        { emoji: '🧑', x: 50, y: 64, size: 3.2 },
        { emoji: '🚰', x: 57, y: 64, size: 1.6 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🍨', x: 77, y: 66, size: 1.6 },
        { emoji: '👴', x: 90, y: 64, size: 3.2 },
        { emoji: '📖', x: 96, y: 62, size: 1.6 },
      ],
      description:
        'Picture A (a family restaurant): five people are doing different things. A waiter is carrying a plate of pasta. A woman is taking a picture of her food with her smartphone. A man is pouring water into a glass. A girl is eating ice cream with a spoon. An old man is reading a menu.',
    },
    sceneB: {
      background: 'livingroom',
      image: '/images/pre2/pre2-17-b.png',
      items: [
        { emoji: '🧑', x: 45, y: 66, size: 4, thought: '📞' },
        { emoji: '⏰', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a living room): a young man ordered lunch through a delivery app, but the food is thirty minutes late. He is thinking of calling the restaurant to check on his order.',
    },
    q1: {
      text: 'According to the passage, how can people enjoy restaurant meals without going outside?',
      ja: 'パッセージによると、人々はどのようにして外出しなくても飲食店の料理を楽しむことができますか？',
      modelAnswers: [
        'Delivery staff bring hot meals straight to their front doors.',
        'By having delivery staff bring hot meals straight to their front doors.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が目印。直前の「配達員が温かい料理を玄関先まで直接届ける」を答えます。',
      point: 'in this way の直前の文を答える',
      commonMistakes: [
        '「In this way they can...」と後半の文を繰り返す→直前の理由を答える',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A waiter is carrying a plate of pasta. A woman is taking a picture of her food. A man is pouring water into a glass. A girl is eating ice cream. An old man is reading a menu.',
      ],
      explanation:
        'パスタを運ぶウェイター、料理の写真を撮る女性、水を注ぐ男性、アイスを食べる少女、メニューを読む高齢男性の5人を現在進行形で伝えます。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A waiter carries pasta.」と現在形にする→ is carrying と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the young man in Picture B. Please describe the situation.',
      ja: 'では、イラストBの若い男性を見てください。状況を説明してください。',
      modelAnswers: [
        "His food delivery is very late, so he's thinking of calling the restaurant.",
        "He cannot eat lunch because the delivery driver has not arrived. He wants to call the shop.",
      ],
      explanation:
        '「注文した料理が遅れていて届かない（状況）」と「店に電話しようと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「He wants to call.」と吹き出しだけ言う→配達が遅れている状況も説明する',
      ],
    },
    q4: {
      text: 'Do you think food delivery services will continue to grow in the future?',
      ja: 'フードデリバリーサービスは将来も成長し続けると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many busy people do not have enough time to cook dinner after work. Also, people can try food from many different restaurants easily at home.',
      ],
      modelAnswersNo: [
        'Delivery fees make ordered food much more expensive than cooking at home. Also, deliveries create lots of plastic containers and waste.',
      ],
      explanation:
        'Yes なら忙しい人の時短や多様な店舗の料理が味わえること、No なら配達料の割高さや容器ごみの問題を理由にします。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['1文だけで止まる→ Also, ... で2文目を足す'],
    },
    q5: {
      text: 'Many people enjoy cooking meals for themselves. Do you often cook at home?',
      ja: '自分で料理を作るのを楽しむ人も多いです。あなたは家でよく料理をしますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I often help my parents make dinner on weekends. I especially like cooking curry and making fried rice for my family.',
      ],
      modelAnswersNo: [
        'My parents usually prepare all the meals for our family. However, I want to learn how to cook simple dishes in the future.',
      ],
      explanation:
        'Yes なら家族の手伝いをする頻度と好きな料理、No なら親が作ってくれることと今後の意欲を2文で伝えます。',
      point: 'Yes → 具体例2文 / No → 理由2文',
      commonMistakes: ['Yes / No だけ答えて沈黙する→2文で続ける'],
    },
  },
  {
    id: 'pre2-18',
    grade: 'pre2',
    title: 'Public Transportation',
    japaneseTitle: '公共交通機関の利用',
    category: '社会',
    level: 'basic',
    passage:
      'In large cities, many people take trains and subways every day. Using public transport produces less pollution than driving private cars. Commuters do not have to drive in heavy traffic, and by doing so they can travel to work or school without stress.',
    passageJa:
      '大都市では、多くの人が毎日電車や地下鉄を利用しています。公共交通機関を使うことは、自家用車を運転するよりも汚染を減らします。通勤者は激しい交通渋滞の中を運転する必要がなく、そうすることでストレスなく通勤や通学ができます。',
    vocabulary: [
      { word: 'subway', meaning: '地下鉄' },
      { word: 'public transport', meaning: '公共交通機関' },
      { word: 'pollution', meaning: '公害、環境汚染' },
      { word: 'commuter', meaning: '通勤通学客' },
      { word: 'heavy traffic', meaning: '激しい交通渋滞' },
    ],
    scene: {
      background: 'station',
      image: '/images/pre2/pre2-18-a.png',
      items: [
        { emoji: '👩', x: 10, y: 64, size: 3.2 },
        { emoji: '🖥️', x: 18, y: 58, size: 1.6 },
        { emoji: '👨', x: 30, y: 64, size: 3.2 },
        { emoji: '☕', x: 37, y: 64, size: 1.5 },
        { emoji: '👦', x: 50, y: 64, size: 3.2 },
        { emoji: '🎧', x: 56, y: 60, size: 1.6 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🧳', x: 77, y: 66, size: 1.8 },
        { emoji: '👵', x: 90, y: 64, size: 3.2 },
        { emoji: '📖', x: 96, y: 64, size: 1.5 },
      ],
      description:
        'Picture A (a train station platform): five people are doing different things. A woman is checking a timetable on a screen. A man is drinking canned coffee. A boy is listening to music with headphones. A girl is pulling a suitcase on wheels. An old woman is sitting on a bench reading a book.',
    },
    sceneB: {
      background: 'street',
      image: '/images/pre2/pre2-18-b.png',
      items: [
        { emoji: '👨', x: 45, y: 66, size: 4, thought: '🚕' },
        { emoji: '🌧️', x: 56, y: 40, size: 2.2 },
      ],
      description:
        'Picture B (a bus stop in heavy rain): a man holding an umbrella sees that the bus is delayed for an hour because of the storm. He is thinking of taking a taxi to work.',
    },
    q1: {
      text: 'According to the passage, how can commuters travel to work or school without stress?',
      ja: 'パッセージによると、通勤者はどのようにしてストレスなく通勤や通学ができますか？',
      modelAnswers: [
        'By not driving in heavy traffic.',
        'They do not have to drive in heavy traffic.',
      ],
      explanation:
        '最後の文の by doing so が目印。doing so は直前の「激しい渋滞の中を運転する必要がない」を指します。By not driving in heavy traffic. と答えるのが自然です。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By doing so.」と語句を繰り返す→ doing so の具体的な中身を言う',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A woman is checking a timetable on a screen. A man is drinking canned coffee. A boy is listening to music with headphones. A girl is pulling a suitcase. An old woman is sitting on a bench reading a book.',
      ],
      explanation:
        '時刻表を見る、缶コーヒーを飲む、音楽を聴く、スーツケースを引く、ベンチで本を読む、の5人を現在進行形で説明します。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A girl pulls suitcase.」→ is pulling a suitcase と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the man in Picture B. Please describe the situation.',
      ja: 'では、イラストBの男性を見てください。状況を説明してください。',
      modelAnswers: [
        "The bus is delayed because of the rain, so he's thinking of taking a taxi.",
        "He cannot take the bus because it is not coming. He wants to catch a taxi to work.",
      ],
      explanation:
        '「大雨でバスが遅れている（状況）」と「タクシーに乗ろうと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「He wants taxi.」と単語だけ言う→ He is thinking of taking a taxi と完全な文で言う',
      ],
    },
    q4: {
      text: 'Do you think governments should encourage more people to use trains and buses?',
      ja: '政府はもっと多くの人に電車やバスの利用を促すべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Using trains and buses reduces traffic jams in big cities. Also, public transportation produces much less carbon dioxide than private cars.',
      ],
      modelAnswersNo: [
        'In rural areas, buses and trains run very infrequently, so having a car is necessary. Also, driving a car is more convenient for carrying heavy luggage.',
      ],
      explanation:
        'Yes なら交通渋滞の緩和やCO2排出削減、No なら地方での運行本数の少なさや荷物運搬の不便さを理由に挙げます。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['理由が短すぎる→ Also, ... で具体例を付け加える'],
    },
    q5: {
      text: 'Some people like traveling to distant cities by train. Do you like taking train trips?',
      ja: '電車で遠くの街へ旅行するのが好きな人もいます。あなたは電車の旅が好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I love watching the beautiful scenery from the train window. Also, I can relax and read books while traveling.',
      ],
      modelAnswersNo: [
        'Trains can be very crowded and noisy during busy holiday seasons. Also, I easily get tired after sitting for many hours.',
      ],
      explanation:
        'Yes なら車窓の景色や読書のリラックス感、No なら混雑や長時間座ることによる疲れを答えます。',
      point: 'Yes → 経験・感想2文 / No → 理由2文',
      commonMistakes: ['単語だけで答える→主語と動詞のある文で答える'],
    },
  },
  {
    id: 'pre2-19',
    grade: 'pre2',
    title: 'Self-Checkout Machines',
    japaneseTitle: 'セルフレジ',
    category: '生活',
    level: 'basic',
    passage:
      'Supermarkets and convenience stores are introducing self-checkout machines. Customers scan the barcodes on their goods and pay by themselves with coins, cards, or phones. Shoppers can scan and pack their items at their own speed, and in this way they can finish shopping without waiting in long lines.',
    passageJa:
      'スーパーやコンビニがセルフレジを導入しています。客は商品のバーコードをスキャンし、小銭やカード、スマートフォンで自分で支払います。買い物客は自分のペースで商品をスキャンして袋詰めでき、このようにして長蛇の列に並ぶことなく買い物を終えることができます。',
    vocabulary: [
      { word: 'introduce', meaning: '導入する、紹介する' },
      { word: 'self-checkout', meaning: 'セルフレジ' },
      { word: 'scan', meaning: 'スキャンする、読み取る' },
      { word: 'barcode', meaning: 'バーコード' },
      { word: 'shopper', meaning: '買い物客' },
    ],
    scene: {
      background: 'shop',
      image: '/images/pre2/pre2-19-a.png',
      items: [
        { emoji: '👨', x: 10, y: 64, size: 3.2 },
        { emoji: '🥛', x: 17, y: 64, size: 1.6 },
        { emoji: '👦', x: 30, y: 64, size: 3.2 },
        { emoji: '🛒', x: 37, y: 66, size: 1.8 },
        { emoji: '👩', x: 50, y: 64, size: 3.2 },
        { emoji: '🍊', x: 57, y: 64, size: 1.6 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '📋', x: 77, y: 64, size: 1.5 },
        { emoji: '👵', x: 90, y: 64, size: 3.2 },
        { emoji: '🧺', x: 96, y: 66, size: 1.8 },
      ],
      description:
        'Picture A (a grocery supermarket): five people are doing different things. A man is taking a milk carton from a refrigerator. A boy is pushing a shopping cart. A woman is weighing some oranges on a scale. A girl is checking her shopping list. An old woman is carrying a shopping basket.',
    },
    sceneB: {
      background: 'shop',
      image: '/images/pre2/pre2-19-b.png',
      items: [
        { emoji: '👵', x: 45, y: 66, size: 4, thought: '🙋' },
        { emoji: '🖥️', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a self-checkout machine): an elderly woman cannot scan a price tag and the screen shows an error message. She is thinking of calling a store clerk for help.',
    },
    q1: {
      text: 'According to the passage, how can shoppers finish shopping without waiting in long lines?',
      ja: 'パッセージによると、買い物客はどのようにして長蛇の列に並ぶことなく買い物を終えることができますか？',
      modelAnswers: [
        'By scanning and packing their items at their own speed.',
        'They scan and pack their items at their own speed.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が目印。直前の「自分のペースで商品をスキャンして袋詰めする」を By ~ing で答えます。',
      point: 'in this way の直前の文を By ~ing に変える',
      commonMistakes: [
        '「By pay by themselves」と文法を崩す→ By scanning and packing their items at their own speed',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A man is taking a milk carton from a refrigerator. A boy is pushing a shopping cart. A woman is weighing some oranges. A girl is checking her shopping list. An old woman is carrying a shopping basket.',
      ],
      explanation:
        '牛乳を取る男性、カートを押す男の子、オレンジの重さを量る女性、メモを見る女の子、カゴを持つ高齢女性の5人を現在進行形で答えます。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A woman weighs oranges.」→ is weighing oranges と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the elderly woman in Picture B. Please describe the situation.',
      ja: 'では、イラストBの高齢の女性を見てください。状況を説明してください。',
      modelAnswers: [
        "The machine shows an error, so she's thinking of calling a store clerk.",
        "She cannot scan the item because the register has an error. She wants to ask a clerk for help.",
      ],
      explanation:
        '「機械にエラーが出てスキャンできない（状況）」と「店員を呼ぼうと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「She is thinking call a clerk.」→ be thinking of calling',
      ],
    },
    q4: {
      text: 'Do you think more stores will replace cashiers with self-checkout machines?',
      ja: 'レジ係をセルフレジに置き換えるお店は増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Self-checkout machines help stores reduce labor costs and deal with staff shortages. Also, shoppers can check out more quickly when they have few items.',
      ],
      modelAnswersNo: [
        'Some elderly people find digital screens difficult and confusing to use. Also, human cashiers provide friendly service and warm greetings.',
      ],
      explanation:
        'Yes なら人手不足解消や少量の買い物客の迅速さ、No なら高齢者の操作の難しさや対面接客の温かさを挙げます。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['理由が短すぎる→ 2文で具体的に述べる'],
    },
    q5: {
      text: 'These days, many stores do not provide free plastic bags. Do you usually bring a reusable shopping bag?',
      ja: '最近、多くの店が無料のレジ袋を提供していません。あなたは普段エコバッグを持参しますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I always keep a folded eco-bag inside my school backpack. Using it helps protect the environment and save small amounts of money.',
      ],
      modelAnswersNo: [
        'I often forget to bring a bag with me when I stop by stores. I usually pay a few yen to get a plastic bag at the counter.',
      ],
      explanation:
        'Yes ならカバンに常備していることと環境への配慮、No なら持参を忘れてしまうことやレジで購入することを2文で伝えます。',
      point: 'Yes → 習慣2文 / No → 理由2文',
      commonMistakes: ['Yes / No だけ言う→具体的に2文続ける'],
    },
  },
  {
    id: 'pre2-20',
    grade: 'pre2',
    title: 'Traditional Crafts',
    japaneseTitle: '伝統工芸の体験',
    category: '文化',
    level: 'standard',
    passage:
      'Many tourists like visiting craft workshops when they travel in Japan. There, local masters teach people how to make pottery, dye fabrics, or fold traditional paper. People create their own handmade souvenirs, and by doing so they can learn about history and support local craftspeople.',
    passageJa:
      '多くの観光客が日本を旅行するとき、伝統工芸の工房を訪れるのを好みます。そこでは地元の職人が陶芸や布染め、折り紙の作り方を教えます。人々は自分だけの手作りの記念品を作り、そうすることで歴史を学び地元の職人を支援することができます。',
    vocabulary: [
      { word: 'tourist', meaning: '観光客' },
      { word: 'workshop', meaning: '体験工房、作業場' },
      { word: 'pottery', meaning: '陶芸、陶器' },
      { word: 'handmade', meaning: '手作りの' },
      { word: 'craftsperson', meaning: '職人、工芸家' },
    ],
    scene: {
      background: 'classroom',
      image: '/images/pre2/pre2-20-a.png',
      items: [
        { emoji: '👩', x: 10, y: 64, size: 3.2 },
        { emoji: '🏺', x: 17, y: 66, size: 1.6 },
        { emoji: '👦', x: 30, y: 64, size: 3.2 },
        { emoji: '🖌️', x: 37, y: 64, size: 1.5 },
        { emoji: '👨', x: 50, y: 64, size: 3.2 },
        { emoji: '✂️', x: 57, y: 64, size: 1.5 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🍵', x: 77, y: 66, size: 1.5 },
        { emoji: '👴', x: 90, y: 64, size: 3.2 },
        { emoji: '🧵', x: 96, y: 64, size: 1.6 },
      ],
      description:
        'Picture A (a craft studio): five people are doing different things. A young woman is shaping clay on a pottery wheel. A boy is painting a wooden figure with a brush. A man is cutting colored paper with scissors. A girl is showing a finished ceramic cup. An old man is hanging dyed cloth on a rack.',
    },
    sceneB: {
      background: 'livingroom',
      image: '/images/pre2/pre2-20-b.png',
      items: [
        { emoji: '👧', x: 45, y: 66, size: 4, thought: '🧴' },
        { emoji: '🥣', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a room): a girl dropped her handmade ceramic bowl and it broke into two pieces. She is thinking of repairing it with strong glue.',
    },
    q1: {
      text: 'According to the passage, how can people learn about history and support local craftspeople?',
      ja: 'パッセージによると、人々はどのようにして歴史を学び地元の職人を支援することができますか？',
      modelAnswers: [
        'By creating their own handmade souvenirs.',
        'They create their own handmade souvenirs.',
      ],
      explanation:
        '最後の文の by doing so が目印。doing so は直前の「自分自身の手作り記念品を作る」を指します。By creating their own handmade souvenirs. と答えます。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By visit craft workshops」と前の方を答える→ by doing so の直前を By creating... で答える',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A young woman is shaping clay on a pottery wheel. A boy is painting a wooden figure with a brush. A man is cutting colored paper with scissors. A girl is showing a finished ceramic cup. An old man is hanging dyed cloth on a rack.',
      ],
      explanation:
        'ろくろで粘土を成形する、人形に色を塗る、色紙を切る、完成した器を見せる、染めた布を干す、の5人を現在進行形で説明します。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A man cuts paper.」→ is cutting paper と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the girl in Picture B. Please describe the situation.',
      ja: 'では、イラストBの女の子を見てください。状況を説明してください。',
      modelAnswers: [
        "Her handmade bowl is broken, so she's thinking of fixing it with glue.",
        "She cannot use her ceramic bowl because it broke into pieces. She wants to repair it with glue.",
      ],
      explanation:
        '「手作りの器が割れてしまった（状況）」と「接着剤で直そうと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「She is thinking fix it.」→ be thinking of fixing',
      ],
    },
    q4: {
      text: 'Do you think traditional crafts will continue to attract young people?',
      ja: '伝統工芸は将来も若者を惹きつけ続けると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Making physical handmade crafts gives people a peaceful break from smartphone screens. Also, traditional Japanese designs are popular on social media.',
      ],
      modelAnswersNo: [
        'Many young people are more interested in modern digital games and fast fashion. Also, mastering traditional craft skills takes many years of hard training.',
      ],
      explanation:
        'Yes ならスマホ離れのリフレッシュやSNSでの人気の高さ、No ならデジタル娯楽への関心や職人修行の大変さを理由にします。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['理由が1文で終わる→ Also, ... で2文目を加える'],
    },
    q5: {
      text: 'Many schools hold cultural festivals every autumn. Do you enjoy taking part in school festivals?',
      ja: '多くの学校が毎年秋に文化祭を開催します。あなたは文化祭に参加するのが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I love preparing classroom exhibitions and performances together with my classmates. We make great memories while practicing for the festival.',
      ],
      modelAnswersNo: [
        'Preparing for school festivals takes up a lot of time after school. I prefer focusing on my club activities or studying for exams.',
      ],
      explanation:
        'Yes ならクラスメイトとの準備の楽しさや思い出作り、No なら放課後の拘束時間の長さや部活・勉強優先の考えを伝えます。',
      point: 'Yes → 経験・感想2文 / No → 理由2文',
      commonMistakes: ['単語だけで短く答える→2文で具体的に述べる'],
    },
  },
  {
    id: 'pre2-21',
    grade: 'pre2',
    title: 'Flea Market Apps',
    japaneseTitle: 'フリマアプリの活用',
    category: '環境',
    level: 'basic',
    passage:
      'More and more people use flea market apps on their smartphones. Instead of throwing away old clothes, toys, or electronics, users can sell them to other people across the country. People find good items at low prices, and in this way they can reuse goods and reduce household waste.',
    passageJa:
      'ますます多くの人がスマートフォンでフリマアプリを利用しています。古い服やおもちゃ、電子機器を捨てる代わりに、利用者は全国の他の人にそれらを売ることができます。人々は手頃な価格で良い品物を見つけ、このようにして品物を再利用し家庭ゴミを減らすことができます。',
    vocabulary: [
      { word: 'flea market', meaning: 'フリーマーケット' },
      { word: 'instead of', meaning: '〜の代わりに' },
      { word: 'throw away', meaning: '捨てる' },
      { word: 'household waste', meaning: '家庭ゴミ' },
      { word: 'reuse', meaning: '再利用する' },
    ],
    scene: {
      background: 'park',
      image: '/images/pre2/pre2-21-a.png',
      items: [
        { emoji: '👩', x: 10, y: 64, size: 3.2 },
        { emoji: '🧥', x: 17, y: 64, size: 1.6 },
        { emoji: '👨', x: 30, y: 64, size: 3.2 },
        { emoji: '🏷️', x: 37, y: 64, size: 1.5 },
        { emoji: '👦', x: 50, y: 64, size: 3.2 },
        { emoji: '🤖', x: 57, y: 64, size: 1.6 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '📸', x: 77, y: 62, size: 1.5 },
        { emoji: '👵', x: 90, y: 64, size: 3.2 },
        { emoji: '🪙', x: 96, y: 66, size: 1.5 },
      ],
      description:
        'Picture A (an outdoor flea market): five people are doing different things. A woman is hanging jackets on a clothes rack. A man is putting price tags on books. A boy is looking at a toy robot. A girl is taking a photo of a handbag with her phone. An old woman is handing some coins to a seller.',
    },
    sceneB: {
      background: 'livingroom',
      image: '/images/pre2/pre2-21-b.png',
      items: [
        { emoji: '👩', x: 45, y: 66, size: 4, thought: '📱' },
        { emoji: '👗', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a bedroom): a woman has many clothes in her closet that she does not wear anymore. She is thinking of selling them on a flea market app.',
    },
    q1: {
      text: 'According to the passage, how can people reuse goods and reduce household waste?',
      ja: 'パッセージによると、人々はどのようにして品物を再利用し家庭ゴミを減らすことができますか？',
      modelAnswers: [
        'By finding good items at low prices.',
        'They find good items at low prices.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が目印。直前の「手頃な価格で良い品物を見つける」を By finding good items at low prices. と答えます。',
      point: 'in this way の直前の文を By ~ing に変える',
      commonMistakes: [
        '「In this way they can reuse」と結論を繰り返す→直前の手段を言う',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A woman is hanging jackets on a clothes rack. A man is putting price tags on books. A boy is looking at a toy robot. A girl is taking a photo of a handbag. An old woman is handing some coins to a seller.',
      ],
      explanation:
        '上着をラックに掛ける、本に値札を貼る、ロボットを見る、カバンの写真を撮る、コインを手渡す、の5人を現在進行形で表現します。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A boy looks robot.」→ is looking at a toy robot と進行形・前置詞に注意',
      ],
    },
    q3: {
      text: 'Now, look at the woman in Picture B. Please describe the situation.',
      ja: 'では、イラストBの女性を見てください。状況を説明してください。',
      modelAnswers: [
        "Her closet is full of old clothes, so she's thinking of selling them on a smartphone app.",
        "She has too many clothes that she does not wear. She wants to sell them online.",
      ],
      explanation:
        '「クローゼットに着ない服がたくさんある（状況）」と「アプリで売ろうと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「She is thinking sell them.」→ be thinking of selling',
      ],
    },
    q4: {
      text: 'Do you think flea market apps will become even more popular in the future?',
      ja: '将来、フリマアプリはさらに人気が高まると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Selling unwanted items helps people earn extra money and clear their rooms. Also, buying used goods is good for the environment.',
      ],
      modelAnswersNo: [
        'Packing and shipping sold items takes a lot of time and effort. Also, some buyers worry that used items might be damaged or dirty.',
      ],
      explanation:
        'Yes ならお小遣い稼ぎや部屋の片付け、環境保護のメリット、No なら梱包・発送の手間や中古品の汚れへの不安を挙げます。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['理由が1文で止まる→ Also, ... で2文目を足す'],
    },
    q5: {
      text: 'When you finish reading a book or playing a video game, do you usually keep it or give it away?',
      ja: '本を読み終えたりゲームをクリアしたりしたとき、普段は手元に取っておきますか、それとも誰かに譲りますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Please tell me more.',
      modelAnswers: ['I usually keep it. / I usually give it away.'],
      modelAnswersYes: [
        'I like collecting my favorite books and games on my shelf. I often want to read or play them again after a few months.',
      ],
      modelAnswersNo: [
        'I usually lend or give finished books to my friends. That way, my room stays clean and my friends can enjoy them too.',
      ],
      explanation:
        '取っておくなら再読・再プレイやコレクション、譲るなら部屋を片付けられることや友人と共有できることを理由に答えます。',
      point: '選択 → 理由2文',
      commonMistakes: ['「Keep.」と一言で終わる→完全な2文で答える'],
    },
  },
  {
    id: 'pre2-22',
    grade: 'pre2',
    title: 'AI in Daily Life',
    japaneseTitle: '日常生活のAI',
    category: 'テクノロジー',
    level: 'standard',
    passage:
      'Artificial intelligence, or AI, is used in many devices today. Smart speakers and voice assistants can answer questions, play favorite songs, or set timers. People give voice commands without using their hands, and by doing so they can manage daily tasks while cooking or cleaning.',
    passageJa:
      '人工知能、すなわちAIは、今日多くの機器で使われています。スマートスピーカーや音声アシスタントは、質問に答えたり、お気に入りの曲を流したり、タイマーをセットしたりできます。人々は手を使わずに音声で指示を出し、そうすることで料理や掃除をしながら日常の用事をこなすことができます。',
    vocabulary: [
      { word: 'artificial intelligence', meaning: '人工知能（AI）' },
      { word: 'device', meaning: '機器、装置' },
      { word: 'smart speaker', meaning: 'スマートスピーカー' },
      { word: 'voice command', meaning: '音声指示' },
      { word: 'manage', meaning: 'こなす、管理する' },
    ],
    scene: {
      background: 'shop',
      image: '/images/pre2/pre2-22-a.png',
      items: [
        { emoji: '👨', x: 10, y: 64, size: 3.2 },
        { emoji: '🎧', x: 17, y: 60, size: 1.6 },
        { emoji: '👦', x: 30, y: 64, size: 3.2 },
        { emoji: '💻', x: 37, y: 64, size: 1.8 },
        { emoji: '👩', x: 50, y: 64, size: 3.2 },
        { emoji: '📷', x: 57, y: 62, size: 1.5 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🧹', x: 77, y: 66, size: 1.6 },
        { emoji: '👴', x: 90, y: 64, size: 3.2 },
        { emoji: '📻', x: 96, y: 64, size: 1.5 },
      ],
      description:
        'Picture A (an electronics store): five people are doing different things. A man is trying on headphones. A boy is touching a screen on a tablet. A woman is asking a clerk about a camera. A girl is watching a robot cleaner move on the floor. An old man is holding a small radio.',
    },
    sceneB: {
      background: 'restaurant',
      image: '/images/pre2/pre2-22-b.png',
      items: [
        { emoji: '👦', x: 45, y: 66, size: 4, thought: '📱' },
        { emoji: '📜', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a cafe in a foreign city): a boy cannot read an English menu and does not know what food to order. He is thinking of scanning the menu with an AI translation app on his smartphone.',
    },
    q1: {
      text: 'According to the passage, how can people manage daily tasks while cooking or cleaning?',
      ja: 'パッセージによると、人々はどのようにして料理や掃除をしながら日常の用事をこなすことができますか？',
      modelAnswers: [
        'By giving voice commands without using their hands.',
        'They give voice commands without using their hands.',
      ],
      explanation:
        '最後の文の by doing so が目印。直前の「手を使わずに音声指示を出す」を By ~ing で答えます。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By give voice commands」→ By giving と動名詞にする',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A man is trying on headphones. A boy is touching a screen on a tablet. A woman is asking a clerk about a camera. A girl is watching a robot cleaner. An old man is holding a small radio.',
      ],
      explanation:
        'ヘッドホンを試着する、タブレットを触る、店員に質問する、お掃除ロボットを見る、ラジオを持つ、の5人を現在進行形で言います。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A girl watches robot.」→ is watching a robot cleaner と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the boy in Picture B. Please describe the situation.',
      ja: 'では、イラストBの男の子を見てください。状況を説明してください。',
      modelAnswers: [
        "He cannot read the foreign menu, so he's thinking of scanning it with a translation app.",
        "He does not understand the English menu. He wants to use an AI app on his smartphone to read it.",
      ],
      explanation:
        '「外国語のメニューが読めない（状況）」と「翻訳アプリでスキャンしようと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「He is thinking use an app.」→ be thinking of using',
      ],
    },
    q4: {
      text: "Do you think AI will make people's lives much more convenient in the future?",
      ja: '将来、AIは人々の生活をはるかに便利にすると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'AI can handle difficult tasks like instant translation and medical research quickly. It will save humans a lot of time and effort.',
      ],
      modelAnswersNo: [
        'Relying too much on AI might make people think and communicate less for themselves. Also, some people worry about personal privacy and mistakes.',
      ],
      explanation:
        'Yes なら自動翻訳や研究などの効率化・時短、No なら過度の依存による思考力低下やプライバシーの懸念を理由にします。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['Why? に対して単語だけで答える→2文で続ける'],
    },
    q5: {
      text: 'Today, many people search for information on the internet every day. What kind of information do you usually look up?',
      ja: '今日、多くの人が毎日インターネットで情報を探します。あなたは普段どんな情報を調べますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Please tell me more.',
      modelAnswers: [
        'I usually look up information about video games and movies.',
        'I often search for words and topics for my school homework.',
      ],
      modelAnswersYes: [
        'I check release dates and trailers for new video games on my phone. Also, I look up sports scores of my favorite baseball team.',
      ],
      modelAnswersNo: [
        'I search for difficult English words and history facts for my assignments. Also, I check the weather forecast before going out.',
      ],
      explanation:
        '趣味（ゲーム・映画・スポーツ結果）または学習（英単語・歴史・天気予報）など、自分がよく調べる具体的なトピックを2文で説明します。',
      point: '調べる内容 → 具体例2文',
      commonMistakes: ['「Games.」と1単語で答える→完全な文で答える'],
    },
  },
  {
    id: 'pre2-23',
    grade: 'pre2',
    title: 'Healthy School Lunches',
    japaneseTitle: '健康的な学校給食',
    category: '健康',
    level: 'basic',
    passage:
      'Many elementary and junior high schools provide nutritious school lunches. Dietitians create balanced menus with plenty of vegetables, milk, and fish. Students eat balanced meals together every day, and in this way they can build strong bodies and learn good eating habits.',
    passageJa:
      '多くの小中学校が栄養満点の学校給食を提供しています。栄養士が野菜や牛乳、魚をたくさん使ったバランスの取れた献立を作成します。生徒は毎日一緒にバランスの良い食事を食べ、このようにして丈夫な体を作り、良い食習慣を身につけることができます。',
    vocabulary: [
      { word: 'nutritious', meaning: '栄養のある' },
      { word: 'dietitian', meaning: '栄養士' },
      { word: 'balanced menu', meaning: 'バランスの取れた献立' },
      { word: 'healthy habit', meaning: '健康的な習慣' },
      { word: 'elementary school', meaning: '小学校' },
    ],
    scene: {
      background: 'classroom',
      image: '/images/pre2/pre2-23-a.png',
      items: [
        { emoji: '👧', x: 10, y: 64, size: 3.2 },
        { emoji: '🥣', x: 18, y: 64, size: 1.6 },
        { emoji: '👦', x: 30, y: 64, size: 3.2 },
        { emoji: '🍱', x: 37, y: 64, size: 1.8 },
        { emoji: '👩', x: 50, y: 64, size: 3.2 },
        { emoji: '🧽', x: 57, y: 66, size: 1.5 },
        { emoji: '🧑', x: 70, y: 64, size: 3.2 },
        { emoji: '🥛', x: 77, y: 64, size: 1.5 },
        { emoji: '👨', x: 90, y: 64, size: 3.2 },
        { emoji: '🧻', x: 96, y: 64, size: 1.5 },
      ],
      description:
        'Picture A (a school lunchroom): five people are doing different things. A girl wearing a white apron is serving soup with a ladle. A boy is carrying a tray with food. A female student is wiping a table with a cloth. A male student is opening a milk carton. A male teacher is handing out napkins.',
    },
    sceneB: {
      background: 'classroom',
      image: '/images/pre2/pre2-23-b.png',
      items: [
        { emoji: '👦', x: 45, y: 66, size: 4, thought: '🍌' },
        { emoji: '⚽', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a school hallway): a boy is very tired and hungry before his soccer practice, but his bento box is empty. He is thinking of buying a banana at the school shop.',
    },
    q1: {
      text: 'According to the passage, how can students build strong bodies and learn good eating habits?',
      ja: 'パッセージによると、生徒はどのようにして丈夫な体を作り、良い食習慣を身につけることができますか？',
      modelAnswers: [
        'By eating balanced meals together every day.',
        'They eat balanced meals together every day.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が目印。直前の「毎日一緒にバランスの良い食事を食べる」を By ~ing で答えます。',
      point: 'in this way の直前の文を By ~ing に変える',
      commonMistakes: [
        '「By eat balanced meals」→ By eating と動名詞にする',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A girl is serving soup with a ladle. A boy is carrying a tray with food. A female student is wiping a table with a cloth. A male student is opening a milk carton. A male teacher is handing out napkins.',
      ],
      explanation:
        'お玉でスープを配膳する、お盆を運ぶ、机を拭く、牛乳パックを開ける、ナプキンを配る先生、の5人を現在進行形で言います。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A girl serves soup.」→ is serving soup と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the boy in Picture B. Please describe the situation.',
      ja: 'では、イラストBの男の子を見てください。状況を説明してください。',
      modelAnswers: [
        "He is hungry before soccer practice, so he's thinking of buying a banana.",
        "He does not have enough energy for sports. He wants to buy a healthy snack at the shop.",
      ],
      explanation:
        '「部活前にお腹が空いて力が出ない（状況）」と「バナナを買おうと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「He wants banana.」と単語だけ言う→ He is thinking of buying a banana と文で言う',
      ],
    },
    q4: {
      text: 'Do you think schools should teach students more about nutrition and healthy eating?',
      ja: '学校は生徒にもっと栄養や健康的な食事について教えるべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Good eating habits help young people stay healthy throughout their entire lives. Also, students can learn what nutrients their bodies need for growth.',
      ],
      modelAnswersNo: [
        'Students already have many important subjects like English and math to study. Also, parents can teach healthy eating habits at home.',
      ],
      explanation:
        'Yes なら生涯にわたる健康維持や栄養知識の重要性、No なら主要教科の多忙さや家庭での教育役割を理由にします。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['1文だけで終わる→ Also, ... で2文目を足す'],
    },
    q5: {
      text: 'Do you try to eat balanced meals or vegetables every day?',
      ja: 'あなたは毎日バランスの取れた食事や野菜を食べるように心がけていますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'I always eat a green salad with my dinner at home. Also, I drink a glass of milk every morning to get calcium.',
      ],
      modelAnswersNo: [
        'I do not like bitter vegetables like green peppers or spinach very much. However, I try to drink fruit juice to stay healthy.',
      ],
      explanation:
        'Yes なら夕食のサラダや朝の牛乳、No なら苦手な野菜と代わりに工夫していることを2文で伝えます。',
      point: 'Yes → 実践している習慣2文 / No → 理由と工夫2文',
      commonMistakes: ['Yes / No だけで黙る→2文で続ける'],
    },
  },
  {
    id: 'pre2-24',
    grade: 'pre2',
    title: 'Disaster Preparedness',
    japaneseTitle: '災害への備え',
    category: '社会',
    level: 'standard',
    passage:
      'Because natural disasters like earthquakes and typhoons occur often, community disaster drills are very important. Local neighborhoods practice evacuating to school gymnasiums and sharing emergency supplies. Residents join these drills with their neighbors, and by doing so they can prepare for emergencies and stay calm during disasters.',
    passageJa:
      '地震や台風などの自然災害が頻繁に起こるため、地域の防災訓練はとても重要です。地域の住民は学校の体育館へ避難し、非常用物資を分け合う練習をします。住民は近所の人たちとこれらの訓練に参加し、そうすることで緊急事態に備え、災害時にも落ち着いて行動できます。',
    vocabulary: [
      { word: 'natural disaster', meaning: '自然災害' },
      { word: 'earthquake', meaning: '地震' },
      { word: 'evacuate', meaning: '避難する' },
      { word: 'emergency supplies', meaning: '非常用物資' },
      { word: 'stay calm', meaning: '落ち着いている、冷静でいる' },
    ],
    scene: {
      background: 'gym',
      image: '/images/pre2/pre2-24-a.png',
      items: [
        { emoji: '👨', x: 10, y: 64, size: 3.2 },
        { emoji: '📦', x: 18, y: 64, size: 1.8 },
        { emoji: '👩', x: 30, y: 64, size: 3.2 },
        { emoji: '🟦', x: 37, y: 66, size: 1.8 },
        { emoji: '👦', x: 50, y: 64, size: 3.2 },
        { emoji: '📻', x: 57, y: 64, size: 1.5 },
        { emoji: '👧', x: 70, y: 64, size: 3.2 },
        { emoji: '🗺️', x: 77, y: 60, size: 1.6 },
        { emoji: '👵', x: 90, y: 64, size: 3.2 },
        { emoji: '🛏️', x: 96, y: 64, size: 1.8 },
      ],
      description:
        'Picture A (an evacuation shelter in a gymnasium): five people are doing different things. A man is carrying a cardboard box of bottled water. A woman is spreading out a blue sleeping mat. A boy is tuning a portable radio. A girl is checking a map on the wall. An old woman is handing blankets to people.',
    },
    sceneB: {
      background: 'livingroom',
      image: '/images/pre2/pre2-24-b.png',
      items: [
        { emoji: '👧', x: 45, y: 66, size: 4, thought: '🔦' },
        { emoji: '🕯️', x: 56, y: 64, size: 1.8 },
      ],
      description:
        'Picture B (a dark living room during a typhoon): the lights went out due to a power outage and the room is pitch dark. A girl cannot see anything. She is thinking of getting a flashlight from the emergency bag.',
    },
    q1: {
      text: 'According to the passage, how can residents prepare for emergencies and stay calm during disasters?',
      ja: 'パッセージによると、住民はどのようにして緊急事態に備え、災害時にも落ち着いて行動できますか？',
      modelAnswers: [
        'By joining these drills with their neighbors.',
        'They join these drills with their neighbors.',
      ],
      explanation:
        '最後の文の by doing so が目印。直前の「近所の人たちとこれらの訓練に参加する」を By joining these drills with their neighbors. と答えます。',
      point: 'by doing so の指す内容 → By ~ing',
      commonMistakes: [
        '「By join these drills」→ By joining と動名詞にする',
      ],
    },
    q2: {
      text: 'Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.',
      ja: 'では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。',
      modelAnswers: [
        'A man is carrying a cardboard box of water. A woman is spreading out a sleeping mat. A boy is tuning a portable radio. A girl is checking a map on the wall. An old woman is handing blankets to people.',
      ],
      explanation:
        '水の段ボールを運ぶ、マットを広げる、携帯ラジオを合わせる、壁の地図を見る、毛布を配る、の5人を現在進行形で言います。',
      point: '5人の動作を現在進行形で1文ずつ',
      commonMistakes: [
        '「A man carries water.」→ is carrying a box of water と進行形にする',
      ],
    },
    q3: {
      text: 'Now, look at the girl in Picture B. Please describe the situation.',
      ja: 'では、イラストBの女の子を見てください。状況を説明してください。',
      modelAnswers: [
        "The power went out during the storm, so she's thinking of getting a flashlight.",
        "She cannot see anything because the lights are out. She wants to find a flashlight in her emergency kit.",
      ],
      explanation:
        '「台風で停電になり真っ暗で見えない（状況）」と「懐中電灯を取り出そうと考えている（吹き出し）」を so / because でつなぎます。',
      point: '状況 + 吹き出し（so / because でつなぐ）',
      commonMistakes: [
        '「She wants flashlight.」→ He/She is thinking of getting a flashlight と文にする',
      ],
    },
    q4: {
      text: 'Do you think every family should keep an emergency bag with water and food at home?',
      ja: 'すべての家庭が水や食料を入れた非常用持ち出し袋を家に備えておくべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Natural disasters can cut off water and electricity for several days. Having emergency supplies keeps families safe until rescue teams arrive.',
      ],
      modelAnswersNo: [
        'Buying special disaster supplies can be quite expensive for some households. Also, emergency food can expire if people forget to replace it regularly.',
      ],
      explanation:
        'Yes ならライフライン停止時の安全性や救助待ちの備え、No なら備蓄費用の負担や賞味期限切れの管理の難しさを理由にします。',
      point: 'Yes/No → 理由2文（主張＋具体例）',
      commonMistakes: ['Yes / No で止まる→理由を2文で続ける'],
    },
    q5: {
      text: 'Have you ever participated in an evacuation drill at your school or in your neighborhood?',
      ja: '学校や地域で避難訓練に参加したことがありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'We have an earthquake evacuation drill at my school twice a year. We practice protecting our heads under desks and walking out quietly.',
      ],
      modelAnswersNo: [
        'I have never joined an evacuation drill in my local community. However, my family discusses where to meet in an emergency.',
      ],
      explanation:
        'Yes なら学校での年2回の訓練や机の下で頭を守る練習、No なら地域訓練未経験であることと家庭での集合場所の話し合いを2文で答えます。',
      point: 'Yes → 訓練の経験2文 / No → 家族での備え2文',
      commonMistakes: ['Yes / No だけ言う→具体的に2文で続ける'],
    },
  },
];
