// 英検2級の問題カード（g2-10〜g2-17）。g2-01 は grade2Cards.ts。
import type { ExamCard } from '../types';
import { G2_Q2_JA, G2_Q2_TEXT } from './grade2Shared';

export const GRADE2_CARDS_3: ExamCard[] = [
  {
    id: 'g2-10',
    grade: '2',
    title: 'Buying Food from Local Farmers',
    japaneseTitle: '地元の農家から食べ物を買う',
    category: '食',
    level: 'basic',
    passage:
      'Today, many small farmers find it difficult to sell their vegetables at good prices. In addition, food from far away needs a lot of energy to transport. Now, some towns have opened markets where local farmers sell fresh vegetables directly to customers. Many people shop at these markets, and by doing so they support farmers in their area.',
    passageJa:
      '今日、多くの小規模な農家は、野菜を良い値段で売るのが難しいと感じています。さらに、遠くから運ばれる食品は輸送に多くのエネルギーを必要とします。今では、地元の農家が新鮮な野菜を客に直接売る市場を開いた町もあります。多くの人がこうした市場で買い物をし、そうすることで地域の農家を支えています。',
    vocabulary: [
      { word: 'find it difficult to ~', meaning: '〜するのが難しいと感じる' },
      { word: 'in addition', meaning: 'さらに、その上' },
      { word: 'transport', meaning: '輸送する' },
      { word: 'local', meaning: '地元の' },
      { word: 'directly', meaning: '直接に' },
      { word: 'support', meaning: '支える、支援する' },
    ],
    story: {
      firstSentence: 'One day, Mr. and Mrs. Kimura were talking in their living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '📰', x: 44, y: 60, size: 2 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '[table]', x: 84, y: 76, size: 2.6 },
            ],
            description:
              'Panel 1 (in the living room): Mrs. Kimura is showing her husband a flyer about a farmers\' market. Mrs. Kimura says, "Let\'s buy vegetables at the farmers\' market tomorrow."',
          },
          speech: { speaker: 'Mrs. Kimura', text: "Let's buy vegetables at the farmers' market tomorrow." },
        },
        {
          caption: 'The next morning at the market',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👨', x: 28, y: 62, size: 4.6 },
              { emoji: '🍅', x: 42, y: 60, size: 2 },
              { emoji: '👴', x: 52, y: 62, size: 4.6, flip: true },
              { emoji: '👩', x: 74, y: 62, size: 4.6, flip: true, thought: '🥗' },
              { emoji: '🧺', x: 88, y: 74, size: 2.2 },
            ],
            description:
              'Panel 2 (the next morning at the market): Mr. Kimura is buying tomatoes from an old farmer. Mrs. Kimura is holding a basket and thinking of making a salad with the vegetables.',
          },
        },
        {
          caption: 'That evening',
          scene: {
            background: 'kitchen',
            items: [
              { emoji: '👩', x: 28, y: 62, size: 4.6 },
              { emoji: '🔪', x: 42, y: 60, size: 2 },
              { emoji: '👨', x: 70, y: 62, size: 4.6, flip: true, thought: '🍅' },
              { emoji: '🛍️', x: 84, y: 66, size: 2.4 },
            ],
            description:
              'Panel 3 (that evening in the kitchen): Mrs. Kimura is cutting vegetables. Mr. Kimura is looking into an empty shopping bag and realizes that he left the tomatoes at the market.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how do many people support farmers in their area?',
      ja: 'パッセージによると、多くの人々はどのようにして地域の農家を支えていますか？',
      modelAnswers: [
        'By shopping at markets where local farmers sell fresh vegetables directly to customers.',
        'They shop at markets where local farmers sell their vegetables directly.',
      ],
      explanation:
        '最後の文の by doing so（そうすることで）が目印。doing so は直前の shop at these markets を指し、these markets は前の文の「地元の農家が新鮮な野菜を直接売る市場」のこと。these を where 以下で具体的に言い換えて By shopping ~ で答えます。',
      point: 'by doing so の中身 → By ~ing（these markets を具体的に）',
      commonMistakes: [
        '「By shopping at these markets.」と these のまま答える→ markets where local farmers sell vegetables directly と具体的に言う',
        '「By shop at markets」と動詞を原形のままにする→ By shopping',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. and Mrs. Kimura were talking in their living room. Mrs. Kimura said to her husband, "Let\'s buy vegetables at the farmers\' market tomorrow." The next morning at the market, Mr. Kimura was buying tomatoes from a farmer. Mrs. Kimura was thinking of making a salad. That evening, Mrs. Kimura was cutting vegetables in the kitchen. Mr. Kimura realized that he had left the tomatoes at the market.',
      ],
      explanation:
        '1コマ目はセリフを Mrs. Kimura said to her husband, "..." と引用します。2コマ目は The next morning at the market で始め、夫の動作（was buying tomatoes）と妻の吹き出し（was thinking of making a salad）を言います。3コマ目は空の袋を見ている夫の様子を realized that he had left ~（置き忘れたことに気づいた）と過去完了で表せると高評価です。',
      point: '「置き忘れた」は had left ~ at ...／吹き出しは was thinking of ~ing',
      commonMistakes: [
        '「Mr. Kimura forgets the tomatoes.」と現在形で話す→ realized that he had left the tomatoes（過去のお話として語る）',
        '「Mrs. Kimura wanted salad.」と吹き出しを単語で済ませる→ was thinking of making a salad と動作で言う',
        '2コマ目を矢印の言葉なしで始める→ The next morning at the market, ... で始める',
      ],
    },
    q3: {
      text: 'Some people say that schools should use more local food in school lunches. What do you think about that?',
      ja: '学校は給食にもっと地元の食材を使うべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Students can eat fresh and healthy food. They can also learn about farming in their area.',
        'I disagree. Local food is sometimes more expensive than food from other places. Schools need to keep the cost of lunches low.',
      ],
      explanation:
        '最初に I agree. / I disagree. で立場を示し、理由を2文で続けます。賛成なら「新鮮さ・食育」、反対なら「費用」のように、1文目で主な理由、2文目で補足を言うとまとまります。',
      point: 'I agree / I disagree → 理由2文（主な理由＋補足）',
      commonMistakes: [
        '「Local food is good.」だけで終わる→ fresh and healthy など、なぜ良いのかを具体的に',
        '「School lunch use local food.」と主語と動詞が合わない→ Schools should use local food.',
      ],
    },
    q4: {
      text: 'Today, many cities have buses and trains that are easy to use. Do you think more people should use public transportation instead of cars?',
      ja: '今日、多くの都市には使いやすいバスや電車があります。もっと多くの人が車の代わりに公共交通機関を使うべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Public transportation produces less CO2 than cars. It also helps reduce traffic jams in cities.',
      ],
      modelAnswersNo: [
        'Buses and trains are not convenient in many rural areas. People with small children often find cars easier to use.',
      ],
      explanation:
        'Yes / No をはっきり言い、理由を2文で答えます。Yes なら環境・渋滞、No なら地方の不便さ・子ども連れなど、だれにとってどう良い（悪い）のかを具体的に言いましょう。',
      point: 'Yes/No → 理由2文（環境・便利さなど具体的に）',
      commonMistakes: [
        '「Because eco.」と単語で答える→ It produces less CO2 than cars. と文で',
        '「public transportations」と複数形にする→ public transportation（数えられない名詞）',
      ],
    },
  },
  {
    id: 'g2-11',
    grade: '2',
    title: 'Elderly People and Animals',
    japaneseTitle: '高齢者と動物',
    category: '社会',
    level: 'basic',
    passage:
      'These days, many elderly people live alone and do not have many chances to talk with others. Some of them feel lonely and become less active. Now, some care centers invite volunteers to bring dogs to visit elderly people. Elderly people enjoy playing with these friendly dogs, and in this way they become more cheerful and active.',
    passageJa:
      '最近、多くの高齢者が一人で暮らしていて、他の人と話す機会があまりありません。中には寂しさを感じて、あまり活動的でなくなる人もいます。今では、ボランティアに犬を連れて高齢者を訪問してもらう介護施設もあります。高齢者はこうした人なつっこい犬と遊ぶことを楽しみ、このようにしてより明るく活動的になっています。',
    vocabulary: [
      { word: 'elderly', meaning: '高齢の' },
      { word: 'lonely', meaning: '寂しい' },
      { word: 'active', meaning: '活動的な' },
      { word: 'care center', meaning: '介護施設' },
      { word: 'volunteer', meaning: 'ボランティア' },
      { word: 'cheerful', meaning: '明るい、元気な' },
    ],
    story: {
      firstSentence: 'One day, Yuta Yamada was visiting his grandmother.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '👵', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '🍵', x: 84, y: 66, size: 2 },
            ],
            description:
              'Panel 1 (at his grandmother\'s house): Yuta is talking to his grandmother, who looks a little lonely. Yuta says, "Grandma, let\'s visit a pet shop this weekend."',
          },
          speech: { speaker: 'Yuta', text: "Grandma, let's visit a pet shop this weekend." },
        },
        {
          caption: 'That weekend at a pet shop',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🐶', x: 44, y: 70, size: 2.4 },
              { emoji: '👵', x: 68, y: 62, size: 4.6, flip: true, thought: '🐱' },
              { emoji: '🐱', x: 84, y: 70, size: 2.2 },
            ],
            description:
              'Panel 2 (that weekend at a pet shop): Yuta is looking at a puppy. His grandmother is standing near a kitten and thinking of buying a cat.',
          },
        },
        {
          caption: 'A week later',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👵', x: 30, y: 62, size: 4.6 },
              { emoji: '🐈', x: 44, y: 72, size: 2.4 },
              { emoji: '👦', x: 70, y: 62, size: 4.6, flip: true },
              { emoji: '🤧', x: 82, y: 50, size: 2 },
            ],
            description:
              'Panel 3 (a week later at his grandmother\'s house): Yuta\'s grandmother is happily playing with her new cat. Yuta is sneezing because of the cat.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how do elderly people become more cheerful and active?',
      ja: 'パッセージによると、高齢者はどのようにしてより明るく活動的になっていますか？',
      modelAnswers: [
        'By playing with dogs that volunteers bring to care centers.',
        'They enjoy playing with dogs that volunteers bring to visit them.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が目印。直前の enjoy playing with these friendly dogs が答えで、these dogs は前の文の「ボランティアが介護施設に連れてくる犬」のこと。these を that volunteers bring ~ で具体的に言い換えます。',
      point: 'in this way の中身 → By ~ing（these dogs を具体的に）',
      commonMistakes: [
        '「By playing with these dogs.」と these のまま答える→ dogs that volunteers bring to care centers と具体的に',
        '「Because they are lonely.」と問題の部分を答える→ 明るくなった方法（犬と遊ぶこと）を答える',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Yuta Yamada was visiting his grandmother. Yuta said to her, "Grandma, let\'s visit a pet shop this weekend." That weekend at a pet shop, Yuta was looking at a puppy. His grandmother was thinking of buying a cat. A week later, his grandmother was playing with her new cat. Yuta was sneezing because of the cat.',
      ],
      explanation:
        '1コマ目は Yuta said to her, "..." とセリフをそのまま引用します。2コマ目は That weekend at a pet shop で始め、Yuta の動作と祖母の吹き出し（was thinking of buying a cat）を言います。3コマ目のオチは was sneezing because of the cat（猫のせいでくしゃみをしていた）のように理由まで言えると伝わりやすいです。',
      point: '3コマ目のオチは because of ~ で理由まで',
      commonMistakes: [
        '「Yuta is sneezing.」と現在形で話す→ was sneezing',
        '「Grandmother wanted to buy a cat.」で吹き出しの絵をあいまいにする→ was thinking of buying a cat',
        '「dog」と「puppy」「cat」と「kitten」で迷って止まる→ 迷ったら dog / cat で十分',
      ],
    },
    q3: {
      text: 'Some people say that more apartments should allow people to keep pets. What do you think about that?',
      ja: 'もっと多くのマンションでペットを飼うことを許可するべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Pets can make people feel happier and less lonely. Many people want to have pets but cannot because of the rules.',
        'I disagree. Some pets make loud noises and bother neighbors. Also, some people are allergic to animals.',
      ],
      explanation:
        '立場を言ってから理由を2文で述べます。賛成なら「ペットが心を癒やす」、反対なら「騒音・アレルギー」など、周りの人への影響まで考えると説得力が出ます。',
      point: 'I agree / I disagree → 理由2文（Also で2つ目）',
      commonMistakes: [
        '「Pets are cute.」だけで終わる→ make people feel happier など、社会的な理由に広げる',
        '「allow to keep pets」と目的語を抜く→ allow people to keep pets',
      ],
    },
    q4: {
      text: 'These days, many people go to sports gyms to stay healthy. Do you think more people will go to gyms in the future?',
      ja: '最近、多くの人が健康を保つためにスポーツジムに通っています。今後、ジムに通う人はもっと増えると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'More people are interested in their health these days. Also, many gyms are open twenty-four hours, so they are easy to use.',
      ],
      modelAnswersNo: [
        'Going to a gym every month costs a lot of money. People can exercise for free by walking or running in parks.',
      ],
      explanation:
        'Yes / No のあと理由を2文で答えます。Yes なら健康志向・24時間営業、No なら費用・無料でできる運動など、身近な具体例を入れましょう。',
      point: 'Yes/No → 理由2文（具体例を入れる）',
      commonMistakes: [
        '「Because healthy.」と単語で答える→ People are interested in their health. と文で',
        '「go to gym」と冠詞を抜く→ go to a gym / go to gyms',
      ],
    },
  },
  {
    id: 'g2-12',
    grade: '2',
    title: 'Paying Without Cash',
    japaneseTitle: '現金を使わない支払い',
    category: '技術',
    level: 'basic',
    passage:
      'In the past, most people in Japan paid for things with cash. However, counting coins and bills takes time, especially at busy stores. Today, more and more shops accept payment by smartphone or credit card. Customers can pay just by touching a machine with their phones or cards. As a result, they do not have to wait in long lines at the register.',
    passageJa:
      'かつて、日本のほとんどの人は現金で支払いをしていました。しかし、硬貨や紙幣を数えるのは、特に混んでいる店では時間がかかります。今日、スマートフォンやクレジットカードでの支払いを受け付ける店がますます増えています。客はスマートフォンやカードを機械にかざすだけで支払うことができます。その結果、レジで長い列に並んで待つ必要がありません。',
    vocabulary: [
      { word: 'cash', meaning: '現金' },
      { word: 'bill', meaning: '紙幣' },
      { word: 'accept', meaning: '受け付ける' },
      { word: 'payment', meaning: '支払い' },
      { word: 'as a result', meaning: 'その結果' },
      { word: 'register', meaning: 'レジ' },
    ],
    story: {
      firstSentence: 'One day, Mr. Hayashi and his daughter Mika were shopping at a supermarket.',
      panels: [
        {
          scene: {
            background: 'shop',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '📱', x: 44, y: 58, size: 2 },
              { emoji: '👧', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🛒', x: 82, y: 72, size: 2.6 },
            ],
            description:
              'Panel 1 (at a supermarket register): Mr. Hayashi is holding up his smartphone to pay. Mika is standing next to a shopping cart. Mr. Hayashi says, "Let\'s pay with my smartphone. It\'s quicker."',
          },
          speech: { speaker: 'Mr. Hayashi', text: "Let's pay with my smartphone. It's quicker." },
        },
        {
          caption: 'That weekend at a festival',
          scene: {
            background: 'street',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '🏮', x: 16, y: 30, size: 2.4 },
              { emoji: '🍡', x: 44, y: 58, size: 2 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true, thought: '🐙' },
              { emoji: '⛺', x: 84, y: 66, size: 2.8 },
            ],
            description:
              'Panel 2 (that weekend at a festival): Mika is eating dango. Mr. Hayashi is standing in front of a food stand and thinking of buying takoyaki.',
          },
        },
        {
          caption: 'A few minutes later',
          scene: {
            background: 'street',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '📱', x: 44, y: 58, size: 2 },
              { emoji: '💴', x: 18, y: 30, size: 2.4 },
              { emoji: '👧', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '👛', x: 82, y: 64, size: 2 },
            ],
            description:
              'Panel 3 (a few minutes later at the food stand): There is a sign that says "Cash Only." Mr. Hayashi is holding his smartphone and looks troubled because he cannot use it. Mika is taking some coins out of her purse.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why do customers not have to wait in long lines at the register?',
      ja: 'パッセージによると、なぜ客はレジで長い列に並んで待つ必要がないのですか？',
      modelAnswers: [
        'Because they can pay just by touching a machine with their phones or cards.',
        'They can pay quickly by touching a machine with their smartphones or credit cards.',
      ],
      explanation:
        '最後の文の As a result（その結果）が目印で、その原因は直前の文に書かれています。「スマートフォンやカードを機械にかざすだけで払える」ことを、主語を they にして Because they can pay ~ で答えます。',
      point: 'As a result の前の文が理由 → Because they ~',
      commonMistakes: [
        '「Because counting coins takes time.」と問題点を答える→ 新しい方法（かざすだけで払える）を答える',
        '「Because customers can pay ...」と言ってもよいが、主語は they に言い換えると自然',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. Hayashi and his daughter Mika were shopping at a supermarket. Mr. Hayashi said to Mika, "Let\'s pay with my smartphone. It\'s quicker." That weekend at a festival, Mika was eating dango. Mr. Hayashi was thinking of buying takoyaki. A few minutes later, Mr. Hayashi found out that the food stand accepted only cash. Mika was taking some coins out of her purse.',
      ],
      explanation:
        '1コマ目は2文のセリフも Mr. Hayashi said to Mika, "..." でまとめて引用します。2コマ目は That weekend at a festival で始め、Mika の動作と父の吹き出し（was thinking of buying takoyaki）を言います。3コマ目の看板は found out that the food stand accepted only cash（現金しか使えないとわかった）と説明すると状況が伝わります。',
      point: '看板の内容は found out that ~ で説明',
      commonMistakes: [
        '「Mr. Hayashi can\'t pay.」と現在形で話す→ couldn\'t pay / found out that ...',
        '「Mika was taking money from her wallet.」も可。ただし何もせず立っていると言わない→ 絵の動作を was ~ing で',
        '屋台の食べ物の英語に詰まって止まる→ some food / takoyaki などで言い切る',
      ],
    },
    q3: {
      text: 'Some people say that Japan should stop using cash in the future. What do you think about that?',
      ja: '日本は将来、現金を使うのをやめるべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Cashless payment is faster and more convenient. Stores also do not need to spend time counting money.',
        'I disagree. Some elderly people do not know how to use smartphones. They would have trouble buying things without cash.',
      ],
      explanation:
        '立場を言ってから理由を2文で。賛成なら「速さ・便利さ」、反対なら「スマホが苦手な高齢者」など、だれが困るか・得をするかを考えると理由が出やすいです。',
      point: 'I agree / I disagree → 理由2文（だれにとって？）',
      commonMistakes: [
        '「Cashless is convenient.」と名詞が抜ける→ Cashless payment is convenient.',
        '理由を1文で終える→ Also, ... や They would ... で2文目を足す',
      ],
    },
    q4: {
      text: 'Today, many people read news on the Internet instead of in newspapers. Do you think newspapers will disappear in the future?',
      ja: '今日、多くの人が新聞ではなくインターネットでニュースを読みます。将来、新聞はなくなると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'People can read the latest news on their smartphones for free. Also, young people rarely buy newspapers these days.',
      ],
      modelAnswersNo: [
        'Many elderly people still enjoy reading newspapers every morning. Newspapers also have information that people can trust.',
      ],
      explanation:
        'Yes / No のあと理由を2文で。Yes ならネットの手軽さ・若者の新聞離れ、No なら高齢者の習慣・情報の信頼性などが言いやすい理由です。',
      point: 'Yes/No → 理由2文（ネット vs. 新聞の長所）',
      commonMistakes: [
        '「Because Internet is free.」と冠詞を抜く→ the Internet',
        '「newspaper will disappear」と単数のまま→ newspapers（全体を言うときは複数形）',
      ],
    },
  },
  {
    id: 'g2-13',
    grade: '2',
    title: 'Preparing for Natural Disasters',
    japaneseTitle: '自然災害への備え',
    category: '防災',
    level: 'standard',
    passage:
      'Japan has many natural disasters such as earthquakes and heavy rain. However, many families have not prepared enough water and food for emergencies. Recently, some cities have started holding disaster drills in which residents practice walking to shelters together. People take part in such drills, and by doing so, they learn what they should do when a disaster happens.',
    passageJa:
      '日本では地震や大雨などの自然災害が多くあります。しかし、多くの家庭では非常時に備えた水や食料を十分に用意していません。最近、住民が一緒に避難所まで歩く練習をする防災訓練を始めた市もあります。人々はそのような訓練に参加し、そうすることで、災害が起きたときに何をすべきかを学んでいます。',
    vocabulary: [
      { word: 'natural disaster', meaning: '自然災害' },
      { word: 'emergency', meaning: '非常時、緊急事態' },
      { word: 'disaster drill', meaning: '防災訓練' },
      { word: 'resident', meaning: '住民' },
      { word: 'shelter', meaning: '避難所' },
      { word: 'take part in', meaning: '〜に参加する' },
    ],
    story: {
      firstSentence: 'One day, Mrs. Ikeda and her son Takuya were watching the news about an earthquake.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '📺', x: 50, y: 40, size: 2.8 },
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (in the living room): Mrs. Ikeda and Takuya are watching news about an earthquake on TV. Mrs. Ikeda says, "We should prepare an emergency bag for our family."',
          },
          speech: { speaker: 'Mrs. Ikeda', text: 'We should prepare an emergency bag for our family.' },
        },
        {
          caption: 'That weekend at a store',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🛒', x: 16, y: 72, size: 2.6 },
              { emoji: '💧', x: 44, y: 60, size: 2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '🔦' },
            ],
            description:
              'Panel 2 (that weekend at a store): Takuya is putting bottles of water into a shopping cart. Mrs. Ikeda is thinking of buying a flashlight.',
          },
        },
        {
          caption: 'That night',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '🎒', x: 44, y: 70, size: 2.6 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '🍪', x: 82, y: 58, size: 2 },
            ],
            description:
              'Panel 3 (that night in the living room): Mrs. Ikeda is packing water and a flashlight into an emergency bag. Takuya is eating the cookies that they bought for the emergency bag.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how do people learn what they should do when a disaster happens?',
      ja: 'パッセージによると、人々はどのようにして災害が起きたときに何をすべきかを学んでいますか？',
      modelAnswers: [
        'By taking part in disaster drills in which they practice walking to shelters together.',
        'They take part in drills where residents practice walking to shelters.',
      ],
      explanation:
        '最後の文の by doing so が目印。doing so は take part in such drills を指し、such drills は前の文の「住民が一緒に避難所まで歩く練習をする防災訓練」のこと。such を具体的に言い換えて By taking part in ~ で答えます。',
      point: 'by doing so の中身 → By ~ing（such drills を具体的に）',
      commonMistakes: [
        '「By taking part in such drills.」と such のまま答える→ disaster drills in which they practice walking to shelters と具体的に',
        '「By preparing water and food.」と問題点の文から答える→ 新しい取り組み（防災訓練）の文を使う',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mrs. Ikeda and her son Takuya were watching the news about an earthquake. Mrs. Ikeda said to Takuya, "We should prepare an emergency bag for our family." That weekend at a store, Takuya was putting bottles of water into a shopping cart. Mrs. Ikeda was thinking of buying a flashlight. That night, Mrs. Ikeda was packing an emergency bag. Takuya was eating the cookies that they had bought for the emergency bag.',
      ],
      explanation:
        '1コマ目は Mrs. Ikeda said to Takuya, "..." とセリフを引用します。2コマ目は That weekend at a store で始め、Takuya の動作（was putting bottles of water into ~）と母の吹き出し（was thinking of buying a flashlight）を言います。3コマ目のオチは「非常用に買ったクッキーを食べていた」ことを the cookies that they had bought for ~ と説明できると高評価です。',
      point: '「〜に入れていた」は was putting A into B／オチは関係代名詞で説明',
      commonMistakes: [
        '「Takuya eats cookies.」と現在形で話す→ was eating the cookies',
        '「flashlight」が出てこず止まる→ a light でもよいので言い切る',
        '3コマ目で母の動作を言い忘れる→ was packing an emergency bag と2人とも説明',
      ],
    },
    q3: {
      text: 'Some people say that schools should hold more disaster drills for students. What do you think about that?',
      ja: '学校は生徒のためにもっと防災訓練を行うべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Students need to know what to do in an emergency. Practicing many times helps them stay calm when a real disaster happens.',
        'I disagree. Students already have drills a few times a year. Schools should use that time for classes instead.',
      ],
      explanation:
        '立場を言ってから理由を2文で。賛成なら「何度も練習すると本番で落ち着ける」、反対なら「すでに年数回ある・授業時間が減る」などが言いやすい理由です。',
      point: 'I agree / I disagree → 理由2文（練習の効果 or 時間）',
      commonMistakes: [
        '「Disaster is dangerous.」と一般論だけ→ なぜ訓練を増やすべきか（増やすべきでないか）を言う',
        '「help them to calm」→ help them stay calm',
      ],
    },
    q4: {
      text: 'Today, most junior high and high schools in Japan have school uniforms. Do you think students should be allowed to choose what to wear to school?',
      ja: '今日、日本のほとんどの中学校・高校には制服があります。生徒は学校に着ていく服を自分で選べるようにすべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Students can wear clothes that are comfortable for them. They can also show their own personality.',
      ],
      modelAnswersNo: [
        'Students would spend too much time choosing their clothes every morning. Uniforms also help students feel that they belong to their school.',
      ],
      explanation:
        'Yes / No のあと理由を2文で。Yes なら快適さ・個性、No なら服選びの手間・学校への一体感などが使えます。仮定の話なので No の答えでは would を使うと自然です。',
      point: 'Yes/No → 理由2文（仮定は would）',
      commonMistakes: [
        '「Uniform is not free.」とあいまいに言う→ Students cannot show their personality. など具体的に',
        '「choose their clothes」を「choose clothes freely」だけで終える→ なぜ良いのかまで言う',
      ],
    },
  },
  {
    id: 'g2-14',
    grade: '2',
    title: 'Studying Abroad Online',
    japaneseTitle: 'オンライン留学',
    category: '教育',
    level: 'standard',
    passage:
      'Many Japanese students want to study abroad to improve their English. However, studying in a foreign country is very expensive, and some students cannot afford it. Recently, some schools have started online study abroad programs. Students take classes with foreign teachers and talk with students in other countries through the Internet, so they can learn English and other cultures without leaving Japan.',
    passageJa:
      '多くの日本の学生は、英語を上達させるために留学したいと思っています。しかし、外国で勉強するのはとても費用がかかり、その費用を払えない学生もいます。最近、オンライン留学プログラムを始めた学校もあります。学生はインターネットを通じて外国人の先生の授業を受けたり、他の国の学生と話したりするので、日本を離れずに英語や他の文化を学ぶことができます。',
    vocabulary: [
      { word: 'study abroad', meaning: '留学する' },
      { word: 'improve', meaning: '向上させる' },
      { word: 'expensive', meaning: '費用がかかる、高価な' },
      { word: "can't afford ~", meaning: '〜を払う余裕がない' },
      { word: 'program', meaning: 'プログラム、計画' },
      { word: 'culture', meaning: '文化' },
    ],
    story: {
      firstSentence: 'One day, Mr. Mori and his daughter Saki were talking about her summer vacation.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '📄', x: 44, y: 58, size: 2 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '[table]', x: 84, y: 76, size: 2.6 },
            ],
            description:
              'Panel 1 (in the living room): Saki is showing her father a pamphlet about a study abroad program. Saki says, "I want to join a summer program in Canada."',
          },
          speech: { speaker: 'Saki', text: 'I want to join a summer program in Canada.' },
        },
        {
          caption: 'A month later in Canada',
          scene: {
            background: 'schoolyard',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '👦', x: 54, y: 62, size: 4.6, flip: true },
              { emoji: '👩', x: 76, y: 62, size: 4.6, flip: true },
              { emoji: '📷', x: 88, y: 58, size: 2 },
            ],
            description:
              'Panel 2 (a month later at a school in Canada): Saki is talking with her new friends. One of her friends is taking a picture of them with a camera.',
          },
        },
        {
          caption: 'After she returned to Japan',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '💻', x: 44, y: 64, size: 2.4 },
              { emoji: '🌙', x: 50, y: 18, size: 2.2 },
              { emoji: '👨', x: 70, y: 62, size: 4.6, flip: true, thought: '🛏️' },
              { emoji: '🕛', x: 84, y: 32, size: 2 },
            ],
            description:
              'Panel 3 (after she returned to Japan, late at night): Saki is having a video call with her friends in Canada on her computer. The clock shows midnight. Her father is worried that she is staying up too late and thinking that she should go to bed.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can students learn English and other cultures without leaving Japan?',
      ja: 'パッセージによると、学生はどのようにして日本を離れずに英語や他の文化を学ぶことができますか？',
      modelAnswers: [
        'By taking classes with foreign teachers and talking with students in other countries through the Internet.',
        'They take online classes with foreign teachers and talk with students abroad.',
      ],
      explanation:
        '最後の文の so（だから）の前が理由・方法です。「インターネットを通じて外国人の先生の授業を受け、他国の学生と話す」ことを By taking ~ and talking ~ と2つとも ~ing にして答えます。',
      point: 'so の前の部分 → By ~ing and ~ing',
      commonMistakes: [
        '「By studying abroad.」と答える→ 日本を離れずに、が条件なので online / through the Internet を必ず入れる',
        '「By taking classes and talk with ...」と2つ目の動詞を原形にする→ and talking',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. Mori and his daughter Saki were talking about her summer vacation. Saki said to her father, "I want to join a summer program in Canada." A month later in Canada, Saki was talking with her new friends. One of her friends was taking a picture of them. After she returned to Japan, Saki was having a video call with her friends late at night. Her father was worried that she was staying up too late.',
      ],
      explanation:
        '1コマ目は Saki said to her father, "..." とセリフを引用します。2コマ目は A month later in Canada で始め、Saki と友だちの動作をそれぞれ was ~ing で。3コマ目は時計とお父さんの吹き出しから、was worried that she was staying up too late（夜更かしを心配していた）と気持ちを説明しましょう。',
      point: '心配の吹き出しは was worried that ~（時制を過去にそろえる）',
      commonMistakes: [
        '「Her father was worried that she is staying up late.」と that の後を現在形にする→ she was staying up',
        '「video call」が出てこず止まる→ was talking with her friends online でもよい',
        '2コマ目の写真を撮っている人物を言い忘れる→ One of her friends was taking a picture.',
      ],
    },
    q3: {
      text: 'Some people say that online study abroad programs are as good as studying in a foreign country. What do you think about that?',
      ja: 'オンライン留学プログラムは外国で勉強するのと同じくらい良いと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Students can take classes with foreign teachers at a low cost. They can also continue studying at their own schools.',
        'I disagree. Students cannot experience the real culture of a country online. Living abroad teaches them how to communicate in daily life.',
      ],
      explanation:
        '立場を言ってから理由を2文で。賛成なら「安い・自分の学校に通い続けられる」、反対なら「本物の文化に触れられない・日常のコミュニケーション力」などが言いやすいです。',
      point: 'I agree / I disagree → 理由2文（費用 or 実体験）',
      commonMistakes: [
        '「Online is cheap.」と名詞が抜ける→ Online programs are cheap.',
        '「experience real culture」と冠詞を抜く→ the real culture of a country',
      ],
    },
    q4: {
      text: 'These days, many people watch movies at home on streaming services. Do you think movie theaters will become less popular in the future?',
      ja: '最近、多くの人が動画配信サービスを使って家で映画を見ます。今後、映画館の人気は下がると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Watching movies at home is cheaper and more convenient. People can also watch them at any time they like.',
      ],
      modelAnswersNo: [
        'Movie theaters have big screens and great sound. Many people enjoy the special experience of watching movies there.',
      ],
      explanation:
        'Yes / No のあと理由を2文で。Yes なら安さ・好きな時間に見られる、No なら大画面・特別な体験など、家と映画館の違いを比べると答えやすいです。',
      point: 'Yes/No → 理由2文（家 vs. 映画館を比べる）',
      commonMistakes: [
        '「Because it is cheap.」の it が何かあいまい→ Watching movies at home is cheaper. と主語をはっきり',
        '「movie theater will be less popular」と単数のまま→ movie theaters',
      ],
    },
  },
  {
    id: 'g2-15',
    grade: '2',
    title: 'Robots in Restaurants',
    japaneseTitle: 'レストランで働くロボット',
    category: '技術',
    level: 'standard',
    passage:
      'Today, many restaurants in Japan do not have enough workers. Because of this, staff members are often very busy, and customers sometimes have to wait a long time for their food. Now, some restaurants use robots that carry dishes from the kitchen to the tables. These robots do simple work for the staff, and in this way they help restaurants serve customers more quickly.',
    passageJa:
      '今日、日本の多くのレストランでは働き手が足りていません。そのため、店員はとても忙しいことが多く、客は料理を長い時間待たなければならないこともあります。今では、厨房からテーブルまで料理を運ぶロボットを使うレストランもあります。こうしたロボットは店員の代わりに簡単な仕事をし、このようにしてレストランが客により早く料理を出す手助けをしています。',
    vocabulary: [
      { word: 'enough', meaning: '十分な' },
      { word: 'staff member', meaning: '店員、職員' },
      { word: 'carry', meaning: '運ぶ' },
      { word: 'dish', meaning: '料理、皿' },
      { word: 'simple', meaning: '簡単な' },
      { word: 'serve', meaning: '（料理を）出す、給仕する' },
    ],
    story: {
      firstSentence: 'One day, Mrs. Ishikawa and her son Riku went to a new restaurant.',
      panels: [
        {
          scene: {
            background: 'restaurant',
            items: [
              { emoji: '👦', x: 28, y: 62, size: 4.6 },
              { emoji: '🤖', x: 50, y: 64, size: 2.8 },
              { emoji: '🍝', x: 50, y: 50, size: 2 },
              { emoji: '👩', x: 72, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (at a restaurant): A robot is carrying food to their table. Riku is pointing at the robot and says, "Look, a robot is bringing our food!"',
          },
          speech: { speaker: 'Riku', text: 'Look, a robot is bringing our food!' },
        },
        {
          caption: 'After dinner',
          scene: {
            background: 'restaurant',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '💳', x: 16, y: 60, size: 2 },
              { emoji: '👦', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '📱', x: 54, y: 58, size: 1.8 },
              { emoji: '🤖', x: 84, y: 66, size: 2.8 },
            ],
            description:
              'Panel 2 (after dinner at the restaurant): Mrs. Ishikawa is paying at the register. Riku is taking a picture of the robot with a smartphone.',
          },
        },
        {
          caption: 'That evening at home',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '📦', x: 44, y: 70, size: 2.6 },
              { emoji: '📦', x: 16, y: 74, size: 2.2 },
              { emoji: '👩', x: 70, y: 62, size: 4.6, flip: true, thought: '🧹' },
            ],
            description:
              'Panel 3 (that evening at home): Riku is making a robot out of cardboard boxes, and the room is messy. Mrs. Ishikawa is surprised and thinking of telling him to clean up the room.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how do robots help restaurants serve customers more quickly?',
      ja: 'パッセージによると、ロボットはどのようにしてレストランが客により早く料理を出す手助けをしていますか？',
      modelAnswers: [
        'By doing simple work such as carrying dishes from the kitchen to the tables.',
        'They carry dishes from the kitchen to the tables for the staff.',
      ],
      explanation:
        '最後の文の in this way の前、do simple work for the staff が答えの中心です。simple work（簡単な仕事）だけではあいまいなので、前の文の「厨房からテーブルまで料理を運ぶ」を such as ~ で加えて具体的に答えます。',
      point: 'in this way の中身 → By ~ing（simple work を具体的に）',
      commonMistakes: [
        '「By doing simple work.」だけで終わる→ such as carrying dishes from the kitchen to the tables と具体的に',
        '「Because restaurants don\'t have enough workers.」と問題点を答える→ how の質問には方法を答える',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mrs. Ishikawa and her son Riku went to a new restaurant. Riku said to his mother, "Look, a robot is bringing our food!" After dinner, Mrs. Ishikawa was paying at the register. Riku was taking a picture of the robot. That evening at home, Riku was making a robot out of boxes. Mrs. Ishikawa was thinking of telling him to clean up the room.',
      ],
      explanation:
        '1コマ目のセリフは現在進行形のままで引用してかまいません（"Look, a robot is bringing our food!"）。地の文は過去形で、2コマ目は After dinner で始め、母が was paying at the register、Riku が was taking a picture of the robot と言います。3コマ目は making a robot out of boxes（箱でロボットを作る）と、母の吹き出し was thinking of telling him to clean up を言えれば十分です。',
      point: 'セリフの中は現在形のまま、地の文は過去形／make A out of B',
      commonMistakes: [
        '「Riku said a robot was bringing ...」とセリフを言い換えて間違える→ カードのセリフをそのまま引用する',
        '「Mrs. Ishikawa pays at the register.」と現在形で話す→ was paying',
        '「cardboard」が出てこず止まる→ boxes で十分',
      ],
    },
    q3: {
      text: 'Some people say that robots will take away many people\'s jobs in the future. What do you think about that?',
      ja: '将来、ロボットが多くの人の仕事を奪うだろうと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Robots can work for long hours without getting tired. Companies may use robots instead of people to save money.',
        'I disagree. Robots can only do simple tasks. Many jobs still need people who can communicate with others.',
      ],
      explanation:
        '立場を言ってから理由を2文で。賛成なら「疲れない・人件費の節約」、反対なら「簡単な作業しかできない・人とのコミュニケーションが必要」などが言いやすい理由です。',
      point: 'I agree / I disagree → 理由2文（ロボットの得意・不得意）',
      commonMistakes: [
        '「Robot is useful.」と単数・無冠詞→ Robots are useful.',
        '「without get tired」→ without getting tired（前置詞の後は ~ing）',
      ],
    },
    q4: {
      text: 'Today, many people use translation apps when they talk with people from other countries. Do you think it is still important to study foreign languages?',
      ja: '今日、多くの人が外国の人と話すときに翻訳アプリを使います。それでも外国語を勉強することは大切だと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Translation apps sometimes make mistakes. Speaking directly in a foreign language helps people understand each other better.',
      ],
      modelAnswersNo: [
        'Translation apps are getting better and better every year. People can use that time to study other important subjects.',
      ],
      explanation:
        'Yes / No のあと理由を2文で。Yes なら翻訳アプリの間違い・直接話す良さ、No ならアプリの進歩・他の勉強に時間を使えることなどが使えます。',
      point: 'Yes/No → 理由2文（アプリの長所・短所）',
      commonMistakes: [
        '「Because apps are not perfect.」で終わる→ どう困るのか2文目で補足',
        '「study foreign language」と単数・無冠詞→ study foreign languages / a foreign language',
      ],
    },
  },
  {
    id: 'g2-16',
    grade: '2',
    title: 'New Services at Public Libraries',
    japaneseTitle: '公共図書館の新しいサービス',
    category: '地域',
    level: 'challenge',
    passage:
      'Public libraries have long been places for borrowing books. However, the number of visitors has been decreasing in many towns because people can easily find information online. To deal with this problem, some libraries now hold events such as cooking classes and computer lessons, and they also lend e-books. As a result, more people of all ages have started using their local libraries again.',
    passageJa:
      '公共図書館は長い間、本を借りるための場所でした。しかし、人々がインターネットで簡単に情報を見つけられるため、多くの町で利用者の数が減り続けています。この問題に対処するため、今では料理教室やパソコン教室などのイベントを開き、電子書籍の貸し出しも行う図書館があります。その結果、あらゆる年代のより多くの人が、再び地元の図書館を利用し始めています。',
    vocabulary: [
      { word: 'borrow', meaning: '借りる' },
      { word: 'decrease', meaning: '減少する' },
      { word: 'deal with', meaning: '〜に対処する' },
      { word: 'lend', meaning: '貸す' },
      { word: 'e-book', meaning: '電子書籍' },
      { word: 'of all ages', meaning: 'あらゆる年代の' },
    ],
    story: {
      firstSentence: 'One day, Mr. Ogawa and his granddaughter Emi saw a poster at the library.',
      panels: [
        {
          scene: {
            background: 'library',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '📋', x: 50, y: 34, size: 2.8 },
              { emoji: '💻', x: 50, y: 48, size: 1.8 },
              { emoji: '👴', x: 70, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (at the library): Emi and Mr. Ogawa are looking at a poster about a computer class. Emi says, "Grandpa, why don\'t you join this computer class?"',
          },
          speech: { speaker: 'Emi', text: "Grandpa, why don't you join this computer class?" },
        },
        {
          caption: 'On the day of the class',
          scene: {
            background: 'library',
            items: [
              { emoji: '👴', x: 30, y: 62, size: 4.6 },
              { emoji: '💻', x: 44, y: 64, size: 2.4 },
              { emoji: '👩', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '📖', x: 80, y: 58, size: 2 },
            ],
            description:
              'Panel 2 (on the day of the class at the library): Mr. Ogawa is using a computer. A woman teacher is showing him how to send an e-mail.',
          },
        },
        {
          caption: 'That night',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👴', x: 28, y: 62, size: 4.6 },
              { emoji: '💻', x: 42, y: 64, size: 2.4 },
              { emoji: '👧', x: 72, y: 62, size: 4.6, flip: true },
              { emoji: '📱', x: 86, y: 58, size: 2 },
              { emoji: '📧', x: 86, y: 40, size: 2.2 },
            ],
            description:
              'Panel 3 (that night): On the left, Mr. Ogawa is happily typing an e-mail on his computer at his house. On the right, Emi is looking at her smartphone in surprise because she has received many e-mails from her grandfather.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why have more people of all ages started using their local libraries again?',
      ja: 'パッセージによると、なぜあらゆる年代のより多くの人が再び地元の図書館を利用し始めたのですか？',
      modelAnswers: [
        'Because some libraries now hold events such as cooking classes and computer lessons, and they also lend e-books.',
        'Libraries hold events like computer lessons, and they also lend e-books.',
      ],
      explanation:
        '最後の文の As a result（その結果）の原因は直前の文です。「料理教室やパソコン教室などのイベントを開き、電子書籍も貸し出している」の2点を両方言うのがポイント。Because libraries ~ と主語を具体的にして答えます。',
      point: 'As a result の前の文 → Because ~（2つの取り組みを両方）',
      commonMistakes: [
        '「Because they hold events.」だけで e-books を落とす→ 2つの取り組みを両方言う',
        '「Because people can find information online.」と問題点を答える→ 利用者が戻った理由（新しいサービス）を答える',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. Ogawa and his granddaughter Emi saw a poster at the library. Emi said to her grandfather, "Grandpa, why don\'t you join this computer class?" On the day of the class, Mr. Ogawa was using a computer. A teacher was showing him how to send an e-mail. That night, Mr. Ogawa was writing an e-mail at his house. Emi was surprised because she got many e-mails from him.',
      ],
      explanation:
        '1コマ目は Emi said to her grandfather, "..." とセリフを引用します。2コマ目は On the day of the class で始め、祖父の動作と先生の動作（was showing him how to send an e-mail）を言います。3コマ目は左右で場所が違う2人を、祖父の動作と Emi の驚き（was surprised because ~）に分けて説明しましょう。',
      point: '「〜のやり方を教える」は show 人 how to ~／驚きは was surprised because ~',
      commonMistakes: [
        '「The teacher was teaching computer.」とあいまいに言う→ was showing him how to send an e-mail',
        '「Emi is surprised.」と現在形で話す→ was surprised',
        '3コマ目を祖父のことだけで終える→ Emi の様子も1文で言う',
      ],
    },
    q3: {
      text: 'Some people say that local governments should spend more money on public libraries. What do you think about that?',
      ja: '地方自治体は公共図書館にもっとお金を使うべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Libraries are places where anyone can study for free. They are also important for children who cannot buy many books.',
        'I disagree. Many people get information on the Internet these days. The money should be used for things like hospitals and roads.',
      ],
      explanation:
        '立場を言ってから理由を2文で。賛成なら「だれでも無料で学べる」、反対なら「ネットで十分・他にお金を使うべきもの」など、税金の使い道として考えると理由が作りやすいです。',
      point: 'I agree / I disagree → 理由2文（お金の使い道として）',
      commonMistakes: [
        '「I like libraries.」と個人の好みだけ→ 社会にとっての利点・欠点を言う',
        '「spend money for libraries」→ spend money on libraries',
      ],
    },
    q4: {
      text: 'These days, fast food restaurants are popular with many people. Do you think people eat too much fast food?',
      ja: '最近、ファストフード店は多くの人に人気があります。人々はファストフードを食べすぎていると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many people eat fast food because it is quick and cheap. However, eating it too often is bad for their health.',
      ],
      modelAnswersNo: [
        'Most people eat fast food only once in a while. Also, many fast food restaurants now offer healthy food such as salads.',
      ],
      explanation:
        'Yes / No のあと理由を2文で。Yes なら「手軽で安いから食べすぎる→健康に悪い」、No なら「たまにしか食べない・健康的なメニューもある」などが使えます。',
      point: 'Yes/No → 理由2文（However / Also でつなぐ）',
      commonMistakes: [
        '「Because fast food is unhealthy.」だけで終わる→ 食べすぎている理由（安い・早い）も言う',
        '「eat fast foods」と複数形にする→ fast food（ふつう数えない）',
      ],
    },
  },
  {
    id: 'g2-17',
    grade: '2',
    title: 'Getting Enough Sleep',
    japaneseTitle: '十分な睡眠をとる',
    category: '健康',
    level: 'challenge',
    passage:
      'These days, many people do not get enough sleep because they use smartphones until late at night. Lack of sleep can make it hard to concentrate and may even cause health problems. Some schools and companies now teach people about the importance of sleep and advise them to stop using screens an hour before bed. Many people follow this advice, so they can sleep better.',
    passageJa:
      '最近、多くの人が夜遅くまでスマートフォンを使うため、十分な睡眠をとっていません。睡眠不足は集中するのを難しくし、健康上の問題を引き起こすことさえあります。今では、睡眠の大切さについて教え、寝る1時間前には画面を見るのをやめるよう助言する学校や会社もあります。多くの人がこの助言に従い、そのためによく眠れるようになっています。',
    vocabulary: [
      { word: 'lack of ~', meaning: '〜の不足' },
      { word: 'concentrate', meaning: '集中する' },
      { word: 'cause', meaning: '引き起こす' },
      { word: 'importance', meaning: '大切さ、重要性' },
      { word: 'advise', meaning: '助言する' },
      { word: 'follow', meaning: '（助言などに）従う' },
    ],
    story: {
      firstSentence: 'One day, Mrs. Fujita and her son Kota were having breakfast.',
      panels: [
        {
          scene: {
            background: 'kitchen',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '🍞', x: 50, y: 66, size: 2 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '🥱', x: 80, y: 46, size: 2 },
              { emoji: '[table]', x: 50, y: 76, size: 2.6 },
            ],
            description:
              'Panel 1 (in the kitchen in the morning): Kota looks very sleepy at the breakfast table. Mrs. Fujita says, "You look tired because you played games late again."',
          },
          speech: { speaker: 'Mrs. Fujita', text: 'You look tired because you played games late again.' },
        },
        {
          caption: 'That night',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '📱', x: 44, y: 66, size: 2 },
              { emoji: '📦', x: 44, y: 74, size: 2.2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '🥛', x: 82, y: 60, size: 2 },
            ],
            description:
              'Panel 2 (that night in the living room): Kota is putting his smartphone into a box. Mrs. Fujita is bringing him a cup of warm milk.',
          },
        },
        {
          caption: 'The next morning',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👦', x: 30, y: 66, size: 4.6 },
              { emoji: '💤', x: 40, y: 44, size: 2.2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '🏫' },
              { emoji: '⏰', x: 84, y: 34, size: 2.4 },
            ],
            description:
              'Panel 3 (the next morning): Kota is still sleeping deeply on the sofa. Mrs. Fujita is pointing at a clock that shows eight o\'clock and is worried that he will be late for school.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can many people sleep better?',
      ja: 'パッセージによると、多くの人はどのようにしてよく眠れるようになっていますか？',
      modelAnswers: [
        'By stopping using screens an hour before they go to bed.',
        'They stop using their smartphones and other screens an hour before bed.',
      ],
      explanation:
        '最後の文の so（だから）の前の follow this advice が答えのもと。this advice は前の文の「寝る1時間前に画面を使うのをやめる」という助言のことです。this advice のままでなく、助言の中身を By stopping using ~ と具体的に言います。',
      point: 'so の前＋this advice の中身 → By ~ing',
      commonMistakes: [
        '「By following this advice.」と this のまま答える→ 助言の中身（寝る1時間前に画面を見ない）を言う',
        '「By stop using screens」→ By stopping using screens（by の後は ~ing）',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mrs. Fujita and her son Kota were having breakfast. Mrs. Fujita said to Kota, "You look tired because you played games late again." That night, Kota was putting his smartphone into a box. Mrs. Fujita was bringing him a cup of warm milk. The next morning, Kota was still sleeping on the sofa. Mrs. Fujita was worried that he would be late for school.',
      ],
      explanation:
        '1コマ目は Mrs. Fujita said to Kota, "..." とセリフを引用します。2コマ目は That night で始め、Kota の動作（was putting his smartphone into a box）と母の動作を言います。3コマ目は時計と吹き出しから、was worried that he would be late for school と will を would にして過去の文にそろえるのがポイントです。',
      point: '過去の心配は was worried that he would ~（will → would）',
      commonMistakes: [
        '「was worried that he will be late」→ he would be late（時制の一致）',
        '「Kota is still sleeping.」と現在形で話す→ was still sleeping',
        '2コマ目のホットミルクを言えず止まる→ was bringing him a drink でもよい',
      ],
    },
    q3: {
      text: 'Some people say that schools should start classes later in the morning so that students can sleep longer. What do you think about that?',
      ja: '生徒がもっと長く眠れるように、学校は朝の授業開始を遅くするべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Many students are too sleepy to concentrate in morning classes. Starting later would help them study better.',
        'I disagree. If classes start later, they will also finish later. Students would have less time for club activities and homework.',
      ],
      explanation:
        '立場を言ってから理由を2文で。賛成なら「朝は眠くて集中できない」、反対なら「終わりも遅くなり部活や宿題の時間が減る」など、学校生活への影響を具体的に言いましょう。',
      point: 'I agree / I disagree → 理由2文（学校生活への影響）',
      commonMistakes: [
        '「I want to sleep more.」と自分の希望だけ→ 生徒全体にとっての利点・欠点を言う',
        '「too sleepy to concentrate」を「very sleepy to concentrate」とする→ too ~ to ...（〜すぎて…できない）',
      ],
    },
    q4: {
      text: 'These days, fewer young people read books. Do you think young people should read more books?',
      ja: '最近、本を読む若者が減っています。若者はもっと本を読むべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Reading books helps them learn many new words and ideas. It also helps them understand other people\'s feelings.',
      ],
      modelAnswersNo: [
        'Young people can learn a lot from the Internet and videos. They should be able to choose how they spend their free time.',
      ],
      explanation:
        'Yes / No のあと理由を2文で。Yes なら語彙・考え方・他人の気持ちの理解、No ならネットや動画でも学べる・時間の使い方は自由、などが使えます。',
      point: 'Yes/No → 理由2文（help 人 ~ を使う）',
      commonMistakes: [
        '「Because books are interesting.」だけで終わる→ 読書で何が身につくのかを言う',
        '「helps them to learning」→ helps them learn',
      ],
    },
  },
];
