// 英検2級の問題カード（g2-18〜g2-24）。g2-01 は grade2Cards.ts。
import type { ExamCard } from '../types';
import { G2_Q2_JA, G2_Q2_TEXT } from './grade2Shared';

export const GRADE2_CARDS_4: ExamCard[] = [
  // ===== g2-18 レジ袋有料化とエコバッグ =====
  {
    id: 'g2-18',
    grade: '2',
    title: 'Bringing Our Own Shopping Bags',
    japaneseTitle: 'エコバッグを持ち歩く',
    category: '環境',
    level: 'basic',
    passage:
      'Plastic shopping bags used to be given to customers for free at most stores in Japan. However, many of these bags ended up in rivers and oceans and harmed sea animals. Since 2020, stores have been required to charge money for plastic bags. Now, many shoppers carry reusable bags with them, and by doing so they help reduce the amount of plastic waste.',
    passageJa:
      '以前は、日本のほとんどの店でレジ袋が客に無料で渡されていました。しかし、こうした袋の多くは川や海に流れ着き、海の生き物に害を与えていました。2020年から、店はレジ袋を有料にすることが義務づけられています。今では、多くの買い物客が繰り返し使える袋を持ち歩き、そうすることでプラスチックごみの量を減らす手助けをしています。',
    vocabulary: [
      { word: 'for free', meaning: '無料で' },
      { word: 'end up in ~', meaning: '最終的に〜に行き着く' },
      { word: 'harm', meaning: '害を与える' },
      { word: 'be required to ~', meaning: '〜することを義務づけられている' },
      { word: 'charge', meaning: '（料金を）請求する' },
      { word: 'reusable', meaning: '再利用できる、繰り返し使える' },
    ],
    story: {
      firstSentence: 'One day, Mrs. Nakamura and her son Kenta were getting ready to go shopping.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '👦', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🛍️', x: 44, y: 66, size: 2.4 },
              { emoji: '👟', x: 80, y: 78, size: 2 },
            ],
            description:
              'Panel 1 (at home in the living room): Mrs. Nakamura is holding a reusable shopping bag and talking to her son Kenta. Kenta is putting on his shoes. Mrs. Nakamura says, "Let\'s take our own bag to the supermarket."',
          },
          speech: { speaker: 'Mrs. Nakamura', text: 'Let\'s take our own bag to the supermarket.' },
        },
        {
          caption: 'At the supermarket',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '💴', x: 44, y: 60, size: 2 },
              { emoji: '[table]', x: 50, y: 76, size: 2.6 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '🛍️', x: 82, y: 66, size: 2.4 },
              { emoji: '🍊', x: 82, y: 56, size: 1.8 },
            ],
            description:
              'Panel 2 (at the supermarket): Mrs. Nakamura is paying at the register. Kenta is putting food, such as oranges, into their reusable shopping bag.',
          },
        },
        {
          caption: 'On the way home',
          scene: {
            background: 'street',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🍊', x: 16, y: 80, size: 1.8 },
              { emoji: '🍊', x: 44, y: 80, size: 1.8 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '🛍️' },
              { emoji: '👜', x: 82, y: 68, size: 2.2 },
            ],
            description:
              'Panel 3 (on the way home on the street): The shopping bag has broken, and some oranges have fallen on the street. Kenta is picking up the oranges. Mrs. Nakamura is holding the broken bag and thinking of buying a stronger bag.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how do many shoppers help reduce the amount of plastic waste?',
      ja: 'パッセージによると、多くの買い物客はどのようにしてプラスチックごみの量を減らす手助けをしていますか？',
      modelAnswers: [
        'By carrying reusable bags with them.',
        'They carry their own reusable bags instead of buying plastic bags at stores.',
      ],
      explanation:
        '最後の文の by doing so（そうすることで）が答えの目印です。doing so は同じ文の前半 carry reusable bags with them を指します。By carrying ~ と動詞を ~ing 形にして答えましょう。',
      point: 'by doing so の中身 → By carrying ~',
      commonMistakes: [
        '「By doing so.」とそのまま答える→ doing so が指す carry reusable bags を具体的に言う',
        '「By carry reusable bags.」と原形のまま→ By carrying',
        '「Stores charge money for plastic bags.」と前の文を答える→質問は「買い物客がどうやって」なので客の行動を答える',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mrs. Nakamura and her son Kenta were getting ready to go shopping. Mrs. Nakamura said to Kenta, "Let\'s take our own bag to the supermarket." Kenta was putting on his shoes. At the supermarket, Mrs. Nakamura was paying at the register. Kenta was putting the food into their shopping bag. On the way home, the bag broke, and Kenta was picking up the oranges. Mrs. Nakamura was thinking of buying a stronger bag.',
      ],
      explanation:
        '1コマ目はセリフを said to Kenta, "..." で引用し、ケンタの動作（was putting on his shoes）を足します。2コマ目は At the supermarket で始めて2人の動作を was ~ing で。3コマ目は On the way home で始め、袋が破れた出来事（the bag broke）とオレンジを拾う動作、母親の吹き出し（was thinking of buying a stronger bag）を言います。',
      point: '出来事は過去形（broke）、動作は過去進行形',
      commonMistakes: [
        '「The bag is broken and Kenta picks up oranges.」と現在形→ the bag broke, and Kenta was picking up the oranges',
        '吹き出しの袋の絵を言わない→ was thinking of buying a stronger bag',
        '「pay the money at the cashier」とあいまいに言う→ was paying at the register',
      ],
    },
    q3: {
      text: 'Some people say that stores should stop giving plastic bags to customers completely. What do you think about that?',
      ja: '店は客にレジ袋を渡すのを完全にやめるべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Plastic bags are bad for the environment even if customers pay for them. People can easily get used to bringing their own bags.',
        'I disagree. Sometimes people go shopping without planning to do so. They need bags to carry the things they buy.',
      ],
      explanation:
        'I agree. / I disagree. で立場を示し、理由を2文で続けます。賛成なら「環境への害」「慣れれば困らない」、反対なら「急な買い物では袋が必要」など、身近な場面を思い浮かべると理由が作りやすくなります。',
      point: '立場 → 理由（主張）→ 補足',
      commonMistakes: [
        '「I agree. Because plastic bags are bad.」と Because だけの文で終わる→ Plastic bags are bad for the environment. と完全な文に',
        '「Plastic is not good for the environment.」の1文だけ→2文目で具体的に補足する',
      ],
    },
    q4: {
      text: 'Today, many young people cook their own meals at home. Do you think more young people will start cooking for themselves in the future?',
      ja: '今日、自宅で自分の食事を作る若者が多くいます。今後、自炊を始める若者はもっと増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Cooking at home is much cheaper than eating out. Also, people can find easy recipes on the Internet.',
      ],
      modelAnswersNo: [
        'Many young people are too busy with school or work to cook. Also, convenience stores sell cheap and tasty meals.',
      ],
      explanation:
        'Yes / No をはっきり言い、理由を2文で答えます。「お金」「時間」「手軽さ」の観点から考えると理由がすぐ思いつきます。2文目は Also, ... でつなげましょう。',
      point: 'Yes/No → 理由2文（お金・時間・手軽さ）',
      commonMistakes: [
        '「Because cheap.」と単語だけ→ Cooking at home is cheaper than eating out. と文で',
        '「I like cooking.」と自分の好みだけを言う→若者全体の傾向として理由を述べる',
      ],
    },
  },

  // ===== g2-19 オンライン診療 =====
  {
    id: 'g2-19',
    grade: '2',
    title: 'Seeing a Doctor Online',
    japaneseTitle: 'オンライン診療',
    category: '医療',
    level: 'basic',
    passage:
      'People who live far from hospitals often find it difficult to see a doctor. This is especially true for older people who cannot drive. Recently, some hospitals have started offering online medical care. Patients can talk with doctors through video calls on their computers or smartphones. In this way, they can get medical advice at home without traveling long distances.',
    passageJa:
      '病院から遠くに住んでいる人は、医者に診てもらうのが難しいことがよくあります。これは車を運転できない高齢者に特に当てはまります。最近、オンライン診療を始めた病院もあります。患者はパソコンやスマートフォンのビデオ通話で医者と話すことができます。このようにして、患者は長い距離を移動せずに、自宅で医療の助言を受けることができるのです。',
    vocabulary: [
      { word: 'find it difficult to ~', meaning: '〜するのが難しいと感じる' },
      { word: 'especially', meaning: '特に' },
      { word: 'offer', meaning: '提供する' },
      { word: 'medical care', meaning: '医療、診療' },
      { word: 'patient', meaning: '患者' },
      { word: 'distance', meaning: '距離' },
    ],
    story: {
      firstSentence: 'One day, Yuki Okada and her grandfather were talking in the living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👴', x: 30, y: 62, size: 4.6 },
              { emoji: '🤧', x: 44, y: 54, size: 2 },
              { emoji: '👧', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🍵', x: 80, y: 64, size: 2 },
            ],
            description:
              'Panel 1 (in the living room): Yuki\'s grandfather is coughing and talking to Yuki. Yuki is bringing him a cup of tea. Her grandfather says, "I have a bad cough, but the hospital is far away."',
          },
          speech: { speaker: 'Grandfather', text: 'I have a bad cough, but the hospital is far away.' },
        },
        {
          caption: 'The next morning',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👧', x: 28, y: 62, size: 4.6 },
              { emoji: '📱', x: 42, y: 60, size: 2.2 },
              { emoji: '👴', x: 64, y: 62, size: 4.6, flip: true },
              { emoji: '👨‍⚕️', x: 50, y: 40, size: 2.4 },
              { emoji: '[table]', x: 50, y: 76, size: 2.6 },
            ],
            description:
              'Panel 2 (the next morning in the living room): Yuki is holding a tablet and helping her grandfather with a video call. Her grandfather is talking with a doctor on the screen.',
          },
        },
        {
          caption: 'That evening',
          scene: {
            background: 'kitchen',
            items: [
              { emoji: '👴', x: 30, y: 62, size: 4.6 },
              { emoji: '💊', x: 44, y: 60, size: 2 },
              { emoji: '🥛', x: 16, y: 62, size: 1.8 },
              { emoji: '👧', x: 68, y: 62, size: 4.6, flip: true, thought: '🍲' },
              { emoji: '🍳', x: 82, y: 64, size: 2.2 },
            ],
            description:
              'Panel 3 (that evening in the kitchen): Yuki\'s grandfather is taking his medicine with a glass of water. Yuki is standing by the stove and thinking of making soup for him.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can patients get medical advice at home without traveling long distances?',
      ja: 'パッセージによると、患者はどのようにして長い距離を移動せずに自宅で医療の助言を受けることができますか？',
      modelAnswers: [
        'By talking with doctors through video calls on their computers or smartphones.',
        'They can talk with doctors through video calls on their computers or smartphones.',
      ],
      explanation:
        '最後の文の In this way（このようにして）が目印です。this way が指すのは直前の文「パソコンやスマートフォンのビデオ通話で医者と話す」こと。この内容を By talking with ~ の形で答えます。',
      point: 'In this way → 直前の文の内容を By ~ing で',
      commonMistakes: [
        '「In this way.」「By this way.」と答える→ this way の中身（video calls で話すこと）を具体的に',
        '「Because some hospitals started online medical care.」→ how の質問なので「方法」を By ~ing で答える方が的確',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Yuki Okada and her grandfather were talking in the living room. Her grandfather said to Yuki, "I have a bad cough, but the hospital is far away." Yuki was bringing him a cup of tea. The next morning, Yuki was helping her grandfather with a video call. He was talking with a doctor on the screen. That evening, he was taking his medicine. Yuki was thinking of making soup for him.',
      ],
      explanation:
        '1コマ目はおじいさんのセリフを said to Yuki, "..." で引用し、ユキの動作を1文足します。2コマ目は The next morning で始め、ユキがビデオ通話を手伝う動作と、おじいさんが画面の医者と話す動作を言います。3コマ目は That evening で始め、薬を飲む動作とユキの吹き出し（スープを作ろうと考えている）を was thinking of making soup で表します。',
      point: '「手伝う」は help 人 with ~／吹き出しは was thinking of ~ing',
      commonMistakes: [
        '「Yuki helped her grandfather to video call.」→ video call は名詞。helping her grandfather with a video call',
        '「He was drinking medicine.」→薬を飲むは take: was taking his medicine',
        '吹き出しのスープを言い忘れる→ was thinking of making soup for him',
      ],
    },
    q3: {
      text: 'Some people say that online medical care will become more common in the future. What do you think about that?',
      ja: '将来、オンライン診療はもっと一般的になるだろうと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Patients do not have to wait for a long time at hospitals. It is also safer because they do not catch colds from other patients.',
        'I disagree. Doctors cannot check patients carefully through a screen. Many older people also do not know how to use smartphones well.',
      ],
      explanation:
        '立場を言ったあと、理由を2文で述べます。賛成なら「待ち時間がない」「病気をうつされない」、反対なら「画面越しでは十分に診察できない」「機器の操作が難しい」が言いやすい理由です。',
      point: '立場 → 利点・欠点を2文で',
      commonMistakes: [
        '「I agree. It is convenient.」だけ→何がどう便利か（待たなくてよい など）を具体的に',
        '「Doctor cannot check.」と冠詞・複数形が抜ける→ Doctors cannot check patients ...',
      ],
    },
    q4: {
      text: 'These days, many people share information on social media. Do you think people spend too much time on social media?',
      ja: '最近、多くの人がSNSで情報を共有しています。人々はSNSに時間を使いすぎていると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many people look at their smartphones even while they are eating or walking. This can be bad for their health and studies.',
      ],
      modelAnswersNo: [
        'Most people use social media only in their free time. They can also get useful news and keep in touch with friends.',
      ],
      explanation:
        'Yes / No のあと、理由を2文で答えます。Yes なら具体的な場面（食事中・歩きながら）と悪影響、No なら使い方の実態と利点を述べるとまとまります。',
      point: 'Yes/No → 具体的な場面＋影響',
      commonMistakes: [
        '「Because I use SNS every day.」と自分の話だけ→ people 全体について答える',
        '「SNS」は英語では通じにくい→ social media と言う',
      ],
    },
  },

  // ===== g2-20 空き家の活用 =====
  {
    id: 'g2-20',
    grade: '2',
    title: 'New Uses for Empty Houses',
    japaneseTitle: '空き家の活用',
    category: '社会',
    level: 'standard',
    passage:
      'In many rural areas of Japan, the number of empty houses is increasing because young people move to cities. These houses can become dangerous if no one takes care of them. Some towns now repair empty houses and rent them to people who want to start a business, such as a café or a guesthouse. As a result, more visitors come to these towns.',
    passageJa:
      '日本の多くの地方では、若者が都市へ移り住むため、空き家の数が増えています。こうした家は、だれも手入れをしないと危険になることがあります。現在、空き家を修理して、カフェやゲストハウスなどの商売を始めたい人に貸し出している町もあります。その結果、こうした町を訪れる人が増えています。',
    vocabulary: [
      { word: 'rural area', meaning: '地方、田舎' },
      { word: 'empty house', meaning: '空き家' },
      { word: 'take care of ~', meaning: '〜の手入れをする、世話をする' },
      { word: 'repair', meaning: '修理する' },
      { word: 'rent', meaning: '貸す、賃貸する' },
      { word: 'start a business', meaning: '事業（商売）を始める' },
    ],
    story: {
      firstSentence: 'One day, Mr. and Mrs. Hasegawa were planning a weekend trip.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '💻', x: 44, y: 64, size: 2.2 },
              { emoji: '👨', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🗺️', x: 80, y: 60, size: 2.2 },
            ],
            description:
              'Panel 1 (at home in the living room): Mrs. Hasegawa is showing her husband a website on her computer. Mr. Hasegawa is looking at a map. Mrs. Hasegawa says, "Let\'s stay at that new guesthouse in the countryside."',
          },
          speech: { speaker: 'Mrs. Hasegawa', text: 'Let\'s stay at that new guesthouse in the countryside.' },
        },
        {
          caption: 'That weekend at the guesthouse',
          scene: {
            background: 'garden',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '📷', x: 44, y: 58, size: 2 },
              { emoji: '🏠', x: 50, y: 30, size: 2.8 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '🍚' },
              { emoji: '🧳', x: 82, y: 72, size: 2.2 },
            ],
            description:
              'Panel 2 (that weekend at the guesthouse, an old Japanese house): Mr. Hasegawa is taking pictures of the old house. Mrs. Hasegawa is holding a suitcase and looking forward to eating dinner there.',
          },
        },
        {
          caption: 'The next morning',
          scene: {
            background: 'street',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '☂️', x: 44, y: 54, size: 2.4 },
              { emoji: '🌧️', x: 50, y: 16, size: 2.6 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '☕' },
            ],
            description:
              'Panel 3 (the next morning on the street): It is raining. Mr. Hasegawa is opening an umbrella. Mrs. Hasegawa is thinking of going to a café nearby.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why do more visitors come to these towns?',
      ja: 'パッセージによると、なぜこうした町を訪れる人が増えているのですか？',
      modelAnswers: [
        'Because the towns repair empty houses and rent them to people who want to start businesses such as cafés or guesthouses.',
        'Some towns rent repaired empty houses to people who start cafés or guesthouses there.',
      ],
      explanation:
        '最後の文の As a result（その結果）が目印で、原因は直前の文に書かれています。直前の文の主語 Some towns は答えでは they ではなく the towns と言い、them（＝空き家）も empty houses と具体的に言い換えましょう。',
      point: 'As a result の前の文 → Because the towns ~',
      commonMistakes: [
        '「Because they repair them.」と代名詞のまま→ the towns repair empty houses と具体的に',
        '「Because young people move to cities.」と1文目を答える→それは空き家が増えた理由。訪問者が増えた理由は直前の文',
        '貸す相手を言い落とす→ rent them to people who want to start a business まで言う',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. and Mrs. Hasegawa were planning a weekend trip. Mrs. Hasegawa said to her husband, "Let\'s stay at that new guesthouse in the countryside." Mr. Hasegawa was looking at a map. That weekend at the guesthouse, Mr. Hasegawa was taking pictures of the old house. Mrs. Hasegawa was looking forward to eating dinner there. The next morning, it was raining, and Mr. Hasegawa was opening an umbrella. Mrs. Hasegawa was thinking of going to a café nearby.',
      ],
      explanation:
        '1コマ目は妻のセリフを said to her husband で引用し、夫の動作を1文足します。2コマ目は That weekend at the guesthouse で始め、夫の写真撮影と妻の吹き出し（夕食を楽しみにしている）を was looking forward to eating で表します。3コマ目は The next morning で始め、雨という状況（it was raining）と2人の様子を言います。',
      point: 'look forward to の後は ~ing（eating）',
      commonMistakes: [
        '「was looking forward to eat dinner」→ to の後は動名詞: looking forward to eating',
        '「It rained.」だけで人物の動作が無い→ Mr. Hasegawa was opening an umbrella も言う',
        '「take a photo the house」→ was taking pictures of the old house（of を忘れない）',
      ],
    },
    q3: {
      text: 'Some people say that the government should do more to help people move to the countryside. What do you think about that?',
      ja: '政府は人々が地方に移り住むのをもっと支援するべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Many towns in the countryside are losing their young people. If more people move there, local businesses and schools can survive.',
        'I disagree. People should decide where to live by themselves. The government should use the money for other things, such as education.',
      ],
      explanation:
        '立場を示して理由を2文続けます。賛成なら「地方の人口減少→店や学校の存続」、反対なら「住む場所は個人が決めること→お金は別のことに」と、原因と結果の流れで話すと説得力が出ます。',
      point: '理由は「問題 → 解決・結果」の流れで',
      commonMistakes: [
        '「The countryside is good.」と感想だけ→なぜ政府が支援するべきか（すべきでないか）を述べる',
        '「move to countryside」と冠詞を抜かす→ move to the countryside',
      ],
    },
    q4: {
      text: 'Today, many people keep pets such as dogs and cats. Do you think keeping a pet is good for children?',
      ja: '今日、犬や猫などのペットを飼っている人が多くいます。ペットを飼うことは子どもにとって良いと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Children can learn to be responsible by taking care of pets. They can also learn that life is important.',
      ],
      modelAnswersNo: [
        'Taking care of pets is hard work, so parents often have to do it instead. Also, some children have allergies to animals.',
      ],
      explanation:
        'Yes / No をはっきり言い、2文で理由を述べます。Yes なら「責任感が育つ」「命の大切さを学ぶ」、No なら「世話が大変」「アレルギー」が代表的な理由です。',
      point: 'Yes/No → 子どもへの影響を2文で',
      commonMistakes: [
        '「Pets are cute.」だけ→子どもにとって何が良いのかを答える',
        '「take care pets」→ take care of pets（of を忘れない）',
      ],
    },
  },

  // ===== g2-21 部活動の地域移行 =====
  {
    id: 'g2-21',
    grade: '2',
    title: 'Local Coaches for School Clubs',
    japaneseTitle: '部活動の地域移行',
    category: '教育',
    level: 'standard',
    passage:
      'In Japan, many teachers spend a lot of time on club activities after school and on weekends. This makes them very tired and leaves them less time to prepare for classes. Recently, some schools have started asking coaches from local sports clubs to lead these activities, so teachers can focus more on their lessons. Students can also learn skills from experienced coaches.',
    passageJa:
      '日本では、多くの教師が放課後や週末に部活動に多くの時間を費やしています。そのせいで教師はとても疲れ、授業の準備をする時間が少なくなっています。最近、地域のスポーツクラブのコーチにこうした活動の指導を頼む学校が出てきており、そのため教師は授業にもっと集中できます。生徒も経験豊富なコーチから技術を学ぶことができます。',
    vocabulary: [
      { word: 'club activities', meaning: '部活動' },
      { word: 'prepare for ~', meaning: '〜の準備をする' },
      { word: 'local', meaning: '地域の、地元の' },
      { word: 'lead', meaning: '指導する、率いる' },
      { word: 'focus on ~', meaning: '〜に集中する' },
      { word: 'experienced', meaning: '経験豊富な' },
    ],
    story: {
      firstSentence: 'One day, Riko Kondo and her father were talking after dinner.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '🎾', x: 44, y: 62, size: 2 },
              { emoji: '👨', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '📰', x: 80, y: 60, size: 2.2 },
            ],
            description:
              'Panel 1 (at home in the living room): Riko is holding a tennis ball and talking to her father. Her father is reading a newspaper. Riko says, "A new coach is coming to our tennis club tomorrow."',
          },
          speech: { speaker: 'Riko', text: 'A new coach is coming to our tennis club tomorrow.' },
        },
        {
          caption: 'The next day at school',
          scene: {
            background: 'schoolyard',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '🎾', x: 44, y: 46, size: 1.8 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '📋', x: 82, y: 60, size: 2 },
            ],
            description:
              'Panel 2 (the next day at school, on the tennis court): Riko is practicing her serve. The new coach is watching her and giving her advice.',
          },
        },
        {
          caption: 'That Saturday',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '🌧️', x: 16, y: 22, size: 2.6 },
              { emoji: '🎾', x: 44, y: 70, size: 1.8 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true, thought: '🏸' },
            ],
            description:
              'Panel 3 (that Saturday at home): It is raining outside, so Riko cannot play tennis. Riko is looking out the window sadly. Her father is thinking of taking her to an indoor gym to practice.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why can teachers focus more on their lessons?',
      ja: 'パッセージによると、なぜ教師は授業にもっと集中できるのですか？',
      modelAnswers: [
        'Because some schools have started asking coaches from local sports clubs to lead club activities.',
        'Coaches from local sports clubs lead club activities instead of teachers.',
      ],
      explanation:
        '3文目の so（だから）の前が理由です。ただし these activities のままでは何の活動か伝わらないので、1文目の club activities に言い換えて答えます。Because some schools ~ の形にしましょう。',
      point: 'so の前が理由／these activities → club activities',
      commonMistakes: [
        '「Because schools ask coaches to lead these activities.」と these のまま→ club activities と具体的に',
        '「Because teachers are very tired.」→それは問題点。集中できる理由は so の前の取り組み',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Riko Kondo and her father were talking after dinner. Riko said to her father, "A new coach is coming to our tennis club tomorrow." Her father was reading a newspaper. The next day at school, Riko was practicing her serve. The new coach was giving her advice. That Saturday, it was raining, so Riko was looking out the window sadly. Her father was thinking of taking her to an indoor gym to practice.',
      ],
      explanation:
        '1コマ目のリコのセリフは引用符の中なので現在進行形 is coming のままで構いません。地の文は過去形・過去進行形にします。2コマ目は The next day at school で始めてリコとコーチの動作を、3コマ目は That Saturday で始めて雨で外に出られない様子と父親の吹き出し（屋内の体育館に連れて行こうと考えている）を言います。',
      point: 'セリフの中はそのまま、地の文は過去形',
      commonMistakes: [
        'セリフの is coming を was coming に変えてしまう→引用符の中はカードの通りに',
        '「The coach was teaching her.」だけ→具体的に was giving her advice / was watching her serve',
        '雨の状況を言わない→ it was raining, so ... で理由もつなげる',
      ],
    },
    q3: {
      text: 'Some people say that school club activities should be run by local communities instead of teachers. What do you think about that?',
      ja: '学校の部活動は教師ではなく地域社会が運営するべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Teachers are too busy to lead club activities every day. Local coaches often have more experience in sports and music.',
        'I disagree. Teachers know their students well and can support them in many ways. It may also cost families more money to pay local coaches.',
      ],
      explanation:
        '賛成なら「教師の負担」「専門的な指導」、反対なら「生徒をよく知る教師の良さ」「費用負担」が理由になります。本文の内容を自分の言葉で使うのも有効です。',
      point: '本文の内容を理由に活用してよい',
      commonMistakes: [
        '「I agree. I like my club.」→意見と関係のない感想にしない',
        '「Teachers are busy.」だけで1文→ too busy to ~ を使って具体的に、さらにもう1文',
      ],
    },
    q4: {
      text: 'Today, many high school students have part-time jobs. Do you think high school students should have part-time jobs?',
      ja: '今日、アルバイトをしている高校生が多くいます。高校生はアルバイトをするべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Students can learn how hard it is to earn money. They can also learn how to talk with adults politely.',
      ],
      modelAnswersNo: [
        'High school students should spend their time on studying. Working late at night can also make them too tired for school.',
      ],
      explanation:
        'Yes / No のあと、理由を2文で答えます。Yes なら「お金の大切さ」「社会のマナー」、No なら「勉強の時間」「疲れ」が言いやすい理由です。',
      point: 'Yes/No → 学び or 勉強への影響',
      commonMistakes: [
        '「Because they can get money.」だけ→お金を得て何を学べるのかまで言う',
        '「arbeit」と言う→英語では part-time job',
      ],
    },
  },

  // ===== g2-22 24時間営業の見直し =====
  {
    id: 'g2-22',
    grade: '2',
    title: 'Convenience Stores at Night',
    japaneseTitle: '24時間営業の見直し',
    category: '社会',
    level: 'challenge',
    passage:
      'Many convenience stores in Japan have been open 24 hours a day for a long time. However, because of a shortage of workers, it has become hard for some store owners to keep their stores open all night. Some companies now allow stores to close late at night. By doing so, they can reduce the burden on owners and staff and also save energy.',
    passageJa:
      '日本の多くのコンビニエンスストアは、長い間1日24時間営業をしてきました。しかし、人手不足のために、一部の店のオーナーにとって一晩中店を開け続けることが難しくなっています。現在では、深夜に店を閉めることを認めている会社もあります。そうすることで、オーナーや従業員の負担を減らし、さらにエネルギーを節約することができます。',
    vocabulary: [
      { word: 'shortage', meaning: '不足' },
      { word: 'owner', meaning: '所有者、オーナー' },
      { word: 'allow ~ to ...', meaning: '〜が…するのを認める' },
      { word: 'burden', meaning: '負担' },
      { word: 'staff', meaning: '従業員、スタッフ' },
      { word: 'save energy', meaning: 'エネルギーを節約する' },
    ],
    story: {
      firstSentence: 'One day, Takuya Sakamoto and his sister Mai were studying late at night.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🕚', x: 50, y: 22, size: 2.4 },
              { emoji: '👧', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '📓', x: 80, y: 64, size: 2 },
              { emoji: '[table]', x: 50, y: 76, size: 2.6 },
            ],
            description:
              'Panel 1 (at home in the living room late at night): Takuya is talking to his sister Mai. Mai is doing her homework at the table. Takuya says, "Let\'s buy some snacks at the convenience store."',
          },
          speech: { speaker: 'Takuya', text: 'Let\'s buy some snacks at the convenience store.' },
        },
        {
          caption: 'Ten minutes later',
          scene: {
            background: 'street',
            items: [
              { emoji: '👦', x: 32, y: 62, size: 4.6 },
              { emoji: '🔦', x: 46, y: 60, size: 2 },
              { emoji: '🌙', x: 84, y: 18, size: 2.4 },
              { emoji: '👧', x: 64, y: 62, size: 4.6, thought: '🍦' },
            ],
            description:
              'Panel 2 (ten minutes later on a dark street): Takuya is walking to the convenience store with a flashlight. Mai is walking with him and looking forward to eating ice cream.',
          },
        },
        {
          caption: 'At the convenience store',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🚫', x: 44, y: 44, size: 2.4 },
              { emoji: '🔒', x: 44, y: 60, size: 2 },
              { emoji: '👧', x: 68, y: 62, size: 4.6, flip: true, thought: '🍜' },
            ],
            description:
              'Panel 3 (at the convenience store): The store is closed. Takuya is looking at a "Closed" sign on the door. Mai is thinking of going home and making instant noodles.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can some companies reduce the burden on owners and staff?',
      ja: 'パッセージによると、一部の会社はどのようにしてオーナーや従業員の負担を減らすことができますか？',
      modelAnswers: [
        'By allowing stores to close late at night.',
        'They let their stores close late at night instead of staying open 24 hours a day.',
      ],
      explanation:
        '最後の文の By doing so が目印です。doing so は直前の文 allow stores to close late at night を指します。allow を allowing にして By allowing stores to close late at night. と答えます。',
      point: 'By doing so → By allowing stores to ~',
      commonMistakes: [
        '「By closing late at night.」→「遅くまで開ける」と誤解されやすい。close late at night の前に allowing stores to を付ける',
        '「Because there is a shortage of workers.」→それは問題の原因。how には方法で答える',
        '「By allow stores ...」→ By allowing',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Takuya Sakamoto and his sister Mai were studying late at night. Takuya said to Mai, "Let\'s buy some snacks at the convenience store." Mai was doing her homework. Ten minutes later, Takuya was walking to the convenience store with a flashlight. Mai was looking forward to eating ice cream. At the convenience store, Takuya found that the store was closed. Mai was thinking of going home and making instant noodles.',
      ],
      explanation:
        '1コマ目はタクヤのセリフを引用し、マイの動作を足します。2コマ目は Ten minutes later で始め、懐中電灯を持って歩く様子と、マイの吹き出し（アイスを楽しみにしている）を言います。3コマ目は At the convenience store で始め、「店が閉まっていた」というオチを found that the store was closed などで伝え、マイの吹き出しも説明します。',
      point: '3コマ目のオチ（店が閉まっていた）をはっきり言う',
      commonMistakes: [
        '「The store closed.」→「閉店した（動作）」にも聞こえる。the store was closed（状態）',
        '吹き出しの2つの動作を片方だけ言う→ going home and making instant noodles',
        '「Mai wanted ice cream.」でもよいが、was looking forward to eating ice cream の方が絵に合う',
      ],
    },
    q3: {
      text: 'Some people say that stores do not need to be open 24 hours a day. What do you think about that?',
      ja: '店は1日24時間開いている必要はないと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Very few customers go shopping late at night. Closing at night can save energy and give workers enough rest.',
        'I disagree. Some people work at night and need to buy food after work. Convenience stores are also safe places for people in trouble at night.',
      ],
      explanation:
        '賛成なら「深夜の客は少ない」「節電・休息」、反対なら「夜に働く人の需要」「夜の安全な場所」という理由が考えられます。2文目は1文目を具体的に補う内容にしましょう。',
      point: '立場 → 客・働く人・社会の視点で理由',
      commonMistakes: [
        '「I disagree. Because it is convenient.」→だれにとってどう便利かを具体的に',
        '「24 hours」の後に a day を忘れる→ open 24 hours a day',
      ],
    },
    q4: {
      text: 'These days, many people take supplements to stay healthy. Do you think people depend too much on supplements?',
      ja: '最近、健康を保つためにサプリメントを飲む人が多くいます。人々はサプリメントに頼りすぎていると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Some people take supplements instead of eating healthy meals. It is better to get nutrients from food.',
      ],
      modelAnswersNo: [
        'Most people use supplements only when they cannot eat well. Supplements are useful for busy people.',
      ],
      explanation:
        'Yes / No を答えたあと、理由を2文で述べます。Yes なら「食事の代わりにしている」→「食べ物から栄養をとる方が良い」、No なら「必要なときだけ使っている」→「忙しい人には便利」と、主張と補足をセットにします。',
      point: 'depend on ~（〜に頼る）を理解して答える',
      commonMistakes: [
        '「I take vitamins.」と自分の習慣だけ→人々全体について意見を言う',
        '「Supplement is useful.」→数えられる名詞なので Supplements are useful.',
      ],
    },
  },

  // ===== g2-23 美術館・博物館のオンライン展示 =====
  {
    id: 'g2-23',
    grade: '2',
    title: 'Virtual Museum Tours',
    japaneseTitle: '美術館のバーチャルツアー',
    category: '文化',
    level: 'challenge',
    passage:
      'Visiting famous museums can be difficult for people who live far away or who cannot travel easily. To solve this problem, some museums have created virtual tours on their websites. Visitors can look at famous paintings and statues closely from any angle on their computers or smartphones. In this way, people all over the world can enjoy art without leaving their homes.',
    passageJa:
      '有名な美術館を訪れることは、遠くに住んでいる人や簡単に旅行ができない人にとって難しいことがあります。この問題を解決するため、ウェブサイト上にバーチャルツアーを作った美術館もあります。見学者はパソコンやスマートフォンで、有名な絵画や彫像をあらゆる角度から間近に見ることができます。このようにして、世界中の人々が家から出ずに芸術を楽しむことができるのです。',
    vocabulary: [
      { word: 'solve', meaning: '解決する' },
      { word: 'virtual tour', meaning: 'バーチャルツアー（仮想見学）' },
      { word: 'statue', meaning: '彫像' },
      { word: 'closely', meaning: '詳しく、間近に' },
      { word: 'angle', meaning: '角度' },
      { word: 'all over the world', meaning: '世界中の' },
    ],
    story: {
      firstSentence: 'One day, Haruto Aoki was talking with his grandmother in the living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👵', x: 30, y: 62, size: 4.6 },
              { emoji: '📖', x: 44, y: 62, size: 2.2 },
              { emoji: '👦', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '📱', x: 80, y: 60, size: 2 },
            ],
            description:
              'Panel 1 (in the living room): Haruto\'s grandmother is holding an art book and talking to Haruto. Haruto is holding a tablet. His grandmother says, "I want to see the famous paintings in Paris someday."',
          },
          speech: { speaker: 'Grandmother', text: 'I want to see the famous paintings in Paris someday.' },
        },
        {
          caption: 'That evening',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '📱', x: 44, y: 58, size: 2.2 },
              { emoji: '🖼️', x: 50, y: 36, size: 2.6 },
              { emoji: '👵', x: 66, y: 62, size: 4.6, flip: true, thought: '🎨' },
              { emoji: '[bench]', x: 50, y: 80, size: 2.6 },
            ],
            description:
              'Panel 2 (that evening in the living room): Haruto is showing his grandmother a virtual museum tour on his tablet. His grandmother is looking at a painting on the screen and thinking of painting a picture herself.',
          },
        },
        {
          caption: 'The next Sunday at a park',
          scene: {
            background: 'park',
            items: [
              { emoji: '👵', x: 30, y: 62, size: 4.6 },
              { emoji: '🖌️', x: 44, y: 58, size: 2 },
              { emoji: '🖼️', x: 16, y: 62, size: 2.4 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true, thought: '☔' },
              { emoji: '☁️', x: 84, y: 18, size: 2.6 },
            ],
            description:
              'Panel 3 (the next Sunday at a park): Haruto\'s grandmother is painting a picture of a lake. Haruto is looking up at the dark clouds and is worried that it will start to rain soon.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can people all over the world enjoy art without leaving their homes?',
      ja: 'パッセージによると、世界中の人々はどのようにして家から出ずに芸術を楽しむことができますか？',
      modelAnswers: [
        'By looking at famous paintings and statues on museums\' virtual tours on their computers or smartphones.',
        'They can use virtual tours on museum websites to see famous paintings and statues closely.',
      ],
      explanation:
        '最後の文の In this way が目印です。this way は直前の文「パソコンやスマホで絵画や彫像を間近に見る」ことを指しますが、それが「バーチャルツアー」で可能だという2文目の内容も合わせて答えると、より正確な答えになります。',
      point: 'In this way → 直前の2文をまとめて By ~ing',
      commonMistakes: [
        '「By looking at them on their computers.」→ them ではなく famous paintings and statues と具体的に',
        'バーチャルツアーに触れない→ virtual tours on museum websites を入れると伝わりやすい',
        '「Because some museums can be difficult to visit.」→問題点ではなく方法を答える',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Haruto Aoki was talking with his grandmother in the living room. His grandmother said to Haruto, "I want to see the famous paintings in Paris someday." Haruto was holding a tablet. That evening, Haruto was showing his grandmother a virtual museum tour on his tablet. She was thinking of painting a picture herself. The next Sunday at a park, his grandmother was painting a picture of a lake. Haruto was worried that it would start to rain soon.',
      ],
      explanation:
        '1コマ目は祖母のセリフを引用し、ハルトの動作を1文足します。2コマ目は That evening で始め、show 人 物（〜に…を見せる）の形でハルトの動作を、祖母の吹き出しを was thinking of painting で言います。3コマ目は The next Sunday at a park で始め、ハルトの不安を was worried that it would ~ と時制をそろえて表します。',
      point: 'was worried that の後は would（時制の一致）',
      commonMistakes: [
        '「was worried that it will rain」→時制をそろえて it would start to rain',
        '「showing a virtual tour to grandmother」→ showing his grandmother a virtual museum tour（所有格・語順に注意）',
        '吹き出しの絵の具を言わない→ was thinking of painting a picture herself',
      ],
    },
    q3: {
      text: 'Some people say that virtual tours will make people stop visiting real museums. What do you think about that?',
      ja: 'バーチャルツアーによって、人々は実際の美術館に行かなくなるだろうと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. People can see artworks online for free at any time. They may feel that they do not need to pay to go to museums.',
        'I disagree. Seeing real artworks is a special experience that people cannot get online. Virtual tours may even make more people want to visit museums.',
      ],
      explanation:
        '賛成なら「無料でいつでも見られる」、反対なら「本物を見る体験は特別」「かえって興味がわく」が理由になります。反対意見の2文目のように、相手の意見と逆の効果を示すと説得力が増します。',
      point: '反対意見は「逆の効果」を示すと強い',
      commonMistakes: [
        '「I disagree. Real is better.」→ Seeing real artworks is a special experience. と主語をはっきり',
        '「I agree. Because online is free.」→ People can see artworks online for free. と完全な文で',
      ],
    },
    q4: {
      text: 'Today, more and more people read e-books on their smartphones or tablets. Do you think e-books will replace paper books in the future?',
      ja: '今日、スマートフォンやタブレットで電子書籍を読む人がますます増えています。将来、電子書籍が紙の本に取って代わると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'People can carry many e-books in one small device. E-books are also often cheaper than paper books.',
      ],
      modelAnswersNo: [
        'Many people like to feel the paper when they read. Also, reading on a screen for a long time makes their eyes tired.',
      ],
      explanation:
        'Yes / No を答えたあと、理由を2文で述べます。Yes なら「持ち運び」「値段」、No なら「紙の手触り」「目の疲れ」が代表的です。replace（取って代わる）の意味を正しく理解して答えましょう。',
      point: 'replace = 取って代わる／理由2文',
      commonMistakes: [
        '「Yes. I like e-books.」→好みでなく、紙の本がなくなる理由を述べる',
        '「E-book is cheap.」→ E-books are often cheaper than paper books. と比較の形で',
      ],
    },
  },

  // ===== g2-24 高齢ドライバーと自動運転バス =====
  {
    id: 'g2-24',
    grade: '2',
    title: 'Self-Driving Buses for Older People',
    japaneseTitle: '高齢者と自動運転バス',
    category: '交通',
    level: 'challenge',
    passage:
      'In Japan, accidents caused by elderly drivers have become a social problem. However, many older people in rural areas need cars because there are few buses or trains. Some towns have started running small self-driving buses on fixed routes. Older people can use them to go shopping or see a doctor. As a result, more of them feel comfortable giving up their driver\'s licenses.',
    passageJa:
      '日本では、高齢ドライバーによる事故が社会問題になっています。しかし、地方に住む多くの高齢者は、バスや電車がほとんどないため車を必要としています。決まったルートで小型の自動運転バスを走らせ始めた町もあります。高齢者はそれを使って買い物に行ったり医者にかかったりすることができます。その結果、運転免許を返納してもよいと思える高齢者が増えています。',
    vocabulary: [
      { word: 'elderly', meaning: '高齢の' },
      { word: 'social problem', meaning: '社会問題' },
      { word: 'self-driving', meaning: '自動運転の' },
      { word: 'fixed route', meaning: '決まった路線' },
      { word: 'give up ~', meaning: '〜を手放す、あきらめる' },
      { word: 'driver\'s license', meaning: '運転免許証' },
    ],
    story: {
      firstSentence: 'One day, Mr. Nishimura and his daughter Emi were talking in the living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '👴', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🔑', x: 80, y: 60, size: 2 },
              { emoji: '🚗', x: 86, y: 30, size: 2.6 },
            ],
            description:
              'Panel 1 (in the living room): Emi is talking to her father, Mr. Nishimura. Mr. Nishimura is holding his car keys. Emi says, "Dad, I think you should stop driving soon."',
          },
          speech: { speaker: 'Emi', text: 'Dad, I think you should stop driving soon.' },
        },
        {
          caption: 'A week later at a bus stop',
          scene: {
            background: 'street',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '🚏', x: 16, y: 58, size: 2.6 },
              { emoji: '📄', x: 44, y: 58, size: 2 },
              { emoji: '👴', x: 66, y: 62, size: 4.6, flip: true, thought: '🛒' },
              { emoji: '🚌', x: 86, y: 74, size: 2.8 },
            ],
            description:
              'Panel 2 (a week later at a bus stop): Emi is reading the bus timetable. Mr. Nishimura is waiting for the small self-driving bus and thinking of going to the supermarket.',
          },
        },
        {
          caption: 'At the supermarket',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👴', x: 30, y: 62, size: 4.6 },
              { emoji: '🧺', x: 44, y: 70, size: 2.4 },
              { emoji: '🥕', x: 44, y: 58, size: 1.8 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '🛍️' },
            ],
            description:
              'Panel 3 (at the supermarket): Mr. Nishimura is putting a lot of food into his basket. Emi is worried that the shopping bags will be too heavy to carry.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why do more older people feel comfortable giving up their driver\'s licenses?',
      ja: 'パッセージによると、なぜ運転免許を返納してもよいと思える高齢者が増えているのですか？',
      modelAnswers: [
        'Because they can use small self-driving buses to go shopping or see a doctor.',
        'Some towns run small self-driving buses, so older people can go shopping or see a doctor without driving.',
      ],
      explanation:
        '最後の文の As a result の原因は直前の文にあります。ただし直前の文の them は「小型の自動運転バス」のことなので、Because they can use them ~ ではなく small self-driving buses と具体的に言い換えましょう。',
      point: 'As a result の前 → them を self-driving buses に',
      commonMistakes: [
        '「Because they can use them.」→ them が何か伝わらない。small self-driving buses と言う',
        '「Because there are few buses or trains.」→それは車が必要な理由。逆の内容なので注意',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. Nishimura and his daughter Emi were talking in the living room. Emi said to her father, "Dad, I think you should stop driving soon." Mr. Nishimura was holding his car keys. A week later at a bus stop, Emi was reading the bus timetable. Mr. Nishimura was thinking of going to the supermarket. At the supermarket, Mr. Nishimura was putting a lot of food into his basket. Emi was worried that the bags would be too heavy to carry.',
      ],
      explanation:
        '1コマ目はエミのセリフを said to her father で引用し、父親の動作を足します。2コマ目は A week later at a bus stop で始め、エミの動作と父親の吹き出し（スーパーに行こうと考えている）を言います。3コマ目は At the supermarket で始め、たくさん買い物をする父親と、エミの心配を was worried that ... would ~ で表します。',
      point: '心配は was worried that ... would ~',
      commonMistakes: [
        '「Emi was worried the bags are heavy.」→時制をそろえて would be too heavy to carry',
        '「Mr. Nishimura was buying many foods.」→ food は数えられない: a lot of food',
        '時刻表を「time table book」などと言う→ the bus timetable',
      ],
    },
    q3: {
      text: 'Some people say that elderly people should have to take a driving test every year. What do you think about that?',
      ja: '高齢者は毎年運転の試験を受けなければならないようにするべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Our ability to drive safely can change quickly as we get older. A test every year can help prevent serious accidents.',
        'I disagree. Many elderly people drive more carefully than young people. Taking a test every year would cost them a lot of time and money.',
      ],
      explanation:
        '賛成なら「年齢による能力の変化」「事故防止」、反対なら「高齢者でも安全な人は多い」「時間と費用の負担」が理由になります。年齢で一律に判断することの是非を考えるとよいでしょう。',
      point: '安全面 vs. 負担・公平さ',
      commonMistakes: [
        '「Old people are dangerous.」と決めつける→ Our ability to drive can change as we get older. のように丁寧に',
        '「take a test every years」→ every year（単数）',
      ],
    },
    q4: {
      text: 'These days, many Japanese people travel abroad. Do you think young people should travel to other countries?',
      ja: '最近、多くの日本人が海外旅行をしています。若者は外国を旅行するべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'They can learn about different cultures and ways of thinking. It is also a good chance to use English in real situations.',
      ],
      modelAnswersNo: [
        'Traveling abroad costs a lot of money for young people. They can learn about other countries on the Internet instead.',
      ],
      explanation:
        'Yes / No の後に理由を2文で述べます。Yes なら「異文化を学べる」「英語を使える」、No なら「費用が高い」「ネットでも学べる」が言いやすい理由です。',
      point: 'Yes/No → 学び or 費用',
      commonMistakes: [
        '「go to abroad」→ abroad は副詞なので go abroad / travel abroad',
        '「Because it is fun.」だけ→何が得られるかを具体的に',
      ],
    },
  },
];
