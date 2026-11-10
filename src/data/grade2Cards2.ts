// 英検2級の問題カード（g2-02〜g2-09）。g2-01 は grade2Cards.ts。
import type { ExamCard } from '../types';
import { G2_Q2_JA, G2_Q2_TEXT } from './grade2Shared';

export const GRADE2_CARDS_2: ExamCard[] = [
  // ───────── g2-02 ─────────
  {
    id: 'g2-02',
    grade: '2',
    title: 'Delivery Lockers',
    japaneseTitle: '宅配ロッカー',
    category: '生活',
    level: 'basic',
    passage:
      'These days, more and more people buy things online, so delivery companies are busy. However, there are not enough drivers, and they often have to visit the same house again because customers are out. Now, some companies are setting up delivery lockers at stations and supermarkets. Customers can pick up their packages there at any time, and in this way drivers can work more efficiently.',
    passageJa:
      '最近、ますます多くの人がオンラインで物を買うので、配送会社は忙しくなっています。しかし、配達員が足りず、客が家にいないために同じ家をもう一度訪ねなければならないことがよくあります。現在、駅やスーパーマーケットに宅配ロッカーを設置している会社もあります。客はいつでもそこで荷物を受け取ることができ、このようにして配達員はより効率的に働くことができます。',
    vocabulary: [
      { word: 'delivery', meaning: '配達' },
      { word: 'not enough', meaning: '足りない' },
      { word: 'set up', meaning: '設置する' },
      { word: 'locker', meaning: 'ロッカー' },
      { word: 'pick up', meaning: '受け取る' },
      { word: 'efficiently', meaning: '効率的に' },
    ],
    story: {
      firstSentence: 'One day, Mr. and Mrs. Kato were looking at a computer in their living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '💻', x: 46, y: 64, size: 2.4 },
              { emoji: '👩', x: 66, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (in the living room): Mr. and Mrs. Kato are looking at a computer together. Mrs. Kato says to her husband, "Let\'s order a birthday present for our son online."',
          },
          speech: { speaker: 'Mrs. Kato', text: "Let's order a birthday present for our son online." },
        },
        {
          caption: 'A few days later at a station',
          scene: {
            background: 'station',
            items: [
              { emoji: '🗄️', x: 16, y: 64, size: 2.8 },
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '📦', x: 44, y: 66, size: 2.2 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true, thought: '🎂' },
            ],
            description:
              'Panel 2 (a few days later at a station): Mrs. Kato is taking a package out of a delivery locker. Mr. Kato is standing next to her and thinking of buying a birthday cake.',
          },
        },
        {
          caption: 'That evening',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '🎀', x: 16, y: 70, size: 1.8 },
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '🎁', x: 44, y: 66, size: 2.4 },
              { emoji: '👦', x: 70, y: 62, size: 4.6, flip: true },
              { emoji: '🎒', x: 84, y: 66, size: 2 },
            ],
            description:
              'Panel 3 (that evening in the living room): Mr. Kato is wrapping the birthday present. Their son has just come home, and he sees the present.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why can drivers work more efficiently?',
      ja: 'パッセージによると、なぜ配達員はより効率的に働くことができるのですか？',
      modelAnswers: [
        'Because customers can pick up their packages from delivery lockers at stations and supermarkets at any time.',
        'Customers can pick up their packages at delivery lockers at any time.',
      ],
      explanation:
        '最後の文の in this way（このようにして）が答えの目印。in this way は同じ文の前半「客がいつでもそこで荷物を受け取れる」を指します。there は前の文の delivery lockers at stations and supermarkets のことなので、具体的に言い換えて答えましょう。',
      point: 'in this way の中身 → Because ~（there を具体的に）',
      commonMistakes: [
        '「Because customers can pick up their packages there.」と there のまま答える→ at delivery lockers と具体的に言う',
        '「Because there are not enough drivers.」と問題点を答える→答えは in this way の直前の内容',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. and Mrs. Kato were looking at a computer in their living room. Mrs. Kato said to her husband, "Let\'s order a birthday present for our son online." A few days later at a station, Mrs. Kato was taking a package out of a delivery locker. Mr. Kato was thinking of buying a birthday cake. That evening, Mr. Kato was wrapping the present. Their son came home and saw it.',
      ],
      explanation:
        '1コマ目はセリフを Mrs. Kato said to her husband, "..." と引用します。2コマ目は A few days later at a station で始め、「ロッカーから荷物を取り出す」は take a package out of a delivery locker で表せます。3コマ目は息子がプレゼントを見てしまったという小さなオチを、came home and saw it と過去形で伝えましょう。',
      point: 'take ~ out of ... ／ オチは過去形で',
      commonMistakes: [
        '「Mrs. Kato took a package from the box.」と box で済ませる→ a delivery locker と言うと状況が正確に伝わる',
        '「Their son comes home.」と現在形にする→ came home and saw it',
        '吹き出しのケーキに触れない→ Mr. Kato was thinking of buying a birthday cake.',
      ],
    },
    q3: {
      text: 'Some people say that people should pay more money for home delivery services. What do you think about that?',
      ja: '宅配サービスにはもっとお金を払うべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Delivery drivers work very hard, so they should get higher pay. Also, people would order things less often, and drivers would be less busy.',
        'I disagree. Many elderly people need home delivery to get daily goods. If it becomes more expensive, their lives will be more difficult.',
      ],
      explanation:
        '最初に I agree. / I disagree. で立場を示し、理由を2文で続けます。賛成なら「配達員の負担・給料」、反対なら「お年寄りなど配達を必要とする人」の視点を出すと理由が具体的になります。',
      point: '立場 → 誰にとって良い／困るかを具体的に',
      commonMistakes: [
        '「Because delivery is expensive.」と理由だけで始める→先に I agree. / I disagree.',
        '「Drivers are busy.」の1文で終わる→ so they should ... と結論までつなげる',
      ],
    },
    q4: {
      text: 'Today, many people pay with credit cards or smartphones instead of cash. Do you think cash will disappear in the future?',
      ja: '今日、多くの人が現金の代わりにクレジットカードやスマートフォンで支払います。将来、現金はなくなると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Paying with a smartphone is faster and easier than using cash. Also, more and more stores are introducing cashless payment systems.',
      ],
      modelAnswersNo: [
        'Some people, especially elderly people, prefer to use cash. Also, cashless payment cannot be used when there is a power outage.',
      ],
      explanation:
        'Yes / No をはっきり言ってから、理由を2文で答えます。Yes なら「速さ・便利さ」、No なら「現金を好む人がいる」「停電時に使えない」などが言いやすい理由です。',
      point: 'Yes/No → 理由2文（Also で補足）',
      commonMistakes: [
        '「Because smartphone is easy.」→ Paying with a smartphone is easy. と動名詞を主語にする',
        '「Cash is disappear.」→ Cash will disappear.（is と動詞を並べない）',
      ],
    },
  },

  // ───────── g2-03 ─────────
  {
    id: 'g2-03',
    grade: '2',
    title: 'Student Volunteers',
    japaneseTitle: '学生ボランティア',
    category: '社会',
    level: 'basic',
    passage:
      'The number of elderly people is growing in many Japanese towns, and some of them need help every day. However, there are not enough workers to support them. Now, more high school and university students are joining local volunteer programs. They visit elderly people and help them with shopping and cleaning. As a result, many elderly people can continue to live safely at home.',
    passageJa:
      '日本の多くの町でお年寄りの数が増えており、その中には毎日の手助けを必要とする人もいます。しかし、彼らを支える働き手は足りていません。現在、地域のボランティア活動に参加する高校生や大学生が増えています。彼らはお年寄りを訪ね、買い物や掃除を手伝います。その結果、多くのお年寄りが自宅で安全に暮らし続けることができています。',
    vocabulary: [
      { word: 'elderly', meaning: '年配の、お年寄りの' },
      { word: 'local', meaning: '地元の、地域の' },
      { word: 'support', meaning: '支える' },
      { word: 'volunteer program', meaning: 'ボランティア活動（の計画）' },
      { word: 'continue to ~', meaning: '〜し続ける' },
      { word: 'safely', meaning: '安全に' },
    ],
    story: {
      firstSentence: 'One day, Takuya and his friend Ken were looking at a poster at school.',
      panels: [
        {
          scene: {
            background: 'classroom',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '📜', x: 48, y: 30, size: 2.8 },
              { emoji: '👦', x: 66, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (in a classroom): Takuya and Ken are looking at a poster about a beach cleanup. Takuya says to Ken, "Let\'s join the beach cleanup this Sunday."',
          },
          speech: { speaker: 'Takuya', text: "Let's join the beach cleanup this Sunday." },
        },
        {
          caption: 'On Sunday at the beach',
          scene: {
            background: 'beach',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🥫', x: 44, y: 76, size: 1.8 },
              { emoji: '🗑️', x: 16, y: 72, size: 2.4 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true, thought: '🏊' },
            ],
            description:
              'Panel 2 (on Sunday at the beach): Takuya is picking up trash on the beach. Ken is thinking of swimming in the sea after the cleanup.',
          },
        },
        {
          caption: 'After the cleanup',
          scene: {
            background: 'beach',
            items: [
              { emoji: '🌧️', x: 50, y: 18, size: 2.8 },
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🥤', x: 44, y: 60, size: 2 },
              { emoji: '👦', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '🛟', x: 82, y: 66, size: 2.4 },
            ],
            description:
              'Panel 3 (after the cleanup at the beach): Takuya is drinking some water. It has started to rain, so Ken, who is holding a swim ring, cannot swim in the sea.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can many elderly people continue to live safely at home?',
      ja: 'パッセージによると、多くのお年寄りはどのようにして自宅で安全に暮らし続けることができていますか？',
      modelAnswers: [
        'By getting help with shopping and cleaning from student volunteers.',
        'High school and university students visit them and help them with shopping and cleaning.',
      ],
      explanation:
        '最後の文の As a result（その結果）の前の文が答えの根拠です。その文の They は「ボランティア活動に参加する高校生・大学生」のこと。They のままではなく students と具体的に言い換えましょう。',
      point: 'As a result の前の文 → They を具体的に',
      commonMistakes: [
        '「They visit elderly people.」と They のまま答える→ High school and university students と言い換える',
        '「By help with shopping.」→ By getting help with shopping（By の後は ~ing）',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Takuya and his friend Ken were looking at a poster at school. Takuya said to Ken, "Let\'s join the beach cleanup this Sunday." On Sunday at the beach, Takuya was picking up trash. Ken was thinking of swimming in the sea after the cleanup. After the cleanup, Takuya was drinking some water. It started to rain, so Ken could not swim in the sea.',
      ],
      explanation:
        '2コマ目の「ごみを拾う」は pick up trash、吹き出しは was thinking of swimming で表します。3コマ目は「雨が降ってきて泳げなかった」というオチ。It started to rain, so Ken could not swim. のように so で原因と結果をつなぐと自然です。',
      point: 'pick up trash ／ It started to rain, so ...',
      commonMistakes: [
        '「Takuya was picking trash.」と up を落とす→ picking up trash',
        '「It was raining, so Ken can\'t swim.」と時制がずれる→ could not swim',
        '3コマ目で雨に触れない→オチ（問題発生）は必ず説明する',
      ],
    },
    q3: {
      text: 'Some people say that high schools should make volunteer activities a requirement for all students. What do you think about that?',
      ja: '高校はすべての生徒にボランティア活動を必修にするべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Students can learn many things that they cannot learn in class. They can also understand the problems in their communities.',
        'I disagree. High school students are already busy with studying and club activities. Volunteer work should be something people choose to do.',
      ],
      explanation:
        '立場を示したら、賛成なら「授業では学べない経験」、反対なら「忙しさ」「自分で選ぶべきもの」を理由にすると言いやすいです。2文目で1文目を補足しましょう。',
      point: '立場 → 理由（学び／忙しさ・自主性）',
      commonMistakes: [
        '「Volunteer is good.」→ Volunteer work is good. / Volunteering is good.',
        '理由を言わずに I agree. で止まる→理由を2文続ける',
      ],
    },
    q4: {
      text: 'These days, many young people do not watch TV very often. Do you think TV will become less popular in the future?',
      ja: '最近、多くの若者はあまりテレビを見ません。将来、テレビの人気はもっと下がると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many people watch videos on their smartphones instead. They can watch what they want at any time.',
      ],
      modelAnswersNo: [
        'Many people still enjoy watching sports and the news on TV. Also, TV is easy to use for elderly people.',
      ],
      explanation:
        'Yes なら「スマートフォンで動画を見る」、No なら「スポーツやニュースはテレビで見る」「お年寄りに使いやすい」などが理由になります。理由は2文で答えましょう。',
      point: 'Yes/No → 理由2文（instead / Also）',
      commonMistakes: [
        '「Because YouTube.」と名詞だけで答える→ Many people watch videos on YouTube. と文で',
        '「TV will become less popular.」と質問を繰り返すだけ→理由を述べる',
      ],
    },
  },

  // ───────── g2-04 ─────────
  {
    id: 'g2-04',
    grade: '2',
    title: 'Charging Electric Cars',
    japaneseTitle: '電気自動車の充電',
    category: '環境',
    level: 'basic',
    passage:
      'Electric cars are good for the environment because they do not produce CO2. However, many people have not bought one because there are few places to charge them. Now, some convenience stores and shopping malls are setting up charging stations in their parking lots. Drivers can charge their cars while shopping, and by doing so they can use electric cars more easily.',
    passageJa:
      '電気自動車は二酸化炭素を出さないので、環境に良いものです。しかし、充電できる場所が多くないため、多くの人はまだ購入していません。現在、駐車場に充電スタンドを設置しているコンビニエンスストアやショッピングモールもあります。運転する人は買い物をしている間に車を充電することができ、そうすることで電気自動車をより手軽に使えます。',
    vocabulary: [
      { word: 'electric car', meaning: '電気自動車' },
      { word: 'produce', meaning: '生み出す、排出する' },
      { word: 'charge', meaning: '充電する' },
      { word: 'charging station', meaning: '充電スタンド' },
      { word: 'parking lot', meaning: '駐車場' },
      { word: 'easily', meaning: '簡単に、手軽に' },
    ],
    story: {
      firstSentence: 'One day, Mr. and Mrs. Yamada were planning a drive to the mountains.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '🗺️', x: 46, y: 62, size: 2.4 },
              { emoji: '👩', x: 66, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (in the living room): Mr. and Mrs. Yamada are looking at a map. Mr. Yamada says to his wife, "Let\'s go to the mountains in our new electric car."',
          },
          speech: { speaker: 'Mr. Yamada', text: "Let's go to the mountains in our new electric car." },
        },
        {
          caption: 'The next morning at a convenience store',
          scene: {
            background: 'shop',
            items: [
              { emoji: '🚗', x: 16, y: 72, size: 2.8 },
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '🔌', x: 44, y: 66, size: 2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '🍙' },
            ],
            description:
              'Panel 2 (the next morning at a convenience store): Mr. Yamada is charging their electric car. Mrs. Yamada is thinking of buying some rice balls for lunch.',
          },
        },
        {
          caption: 'At noon in the mountains',
          scene: {
            background: 'mountain',
            items: [
              { emoji: '👩', x: 28, y: 62, size: 4.6 },
              { emoji: '📷', x: 42, y: 58, size: 2 },
              { emoji: '👨', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '👥', x: 82, y: 70, size: 2.6 },
            ],
            description:
              'Panel 3 (at noon in the mountains): Mrs. Yamada is taking pictures of the view. Mr. Yamada finds that there is a long line of people in front of a restaurant.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can drivers use electric cars more easily?',
      ja: 'パッセージによると、運転する人はどのようにして電気自動車をより手軽に使うことができますか？',
      modelAnswers: [
        'By charging their cars at convenience stores and shopping malls while they are shopping.',
        'They charge their cars at charging stations while they shop.',
      ],
      explanation:
        '最後の文の by doing so（そうすることで）が目印。doing so は同じ文の前半「買い物の間に車を充電する」を指します。どこで充電するのか（コンビニやショッピングモール）まで言えるとより正確です。',
      point: 'by doing so の中身 → By charging ...',
      commonMistakes: [
        '「By doing so.」とそのまま答える→ doing so の中身を具体的に言う',
        '「Because they don\'t produce CO2.」と1文目を答える→質問は「どのようにして手軽に使えるか」',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. and Mrs. Yamada were planning a drive to the mountains. Mr. Yamada said to his wife, "Let\'s go to the mountains in our new electric car." The next morning at a convenience store, Mr. Yamada was charging their car. Mrs. Yamada was thinking of buying some rice balls. At noon in the mountains, Mrs. Yamada was taking pictures of the view. Mr. Yamada found that there was a long line in front of a restaurant.',
      ],
      explanation:
        '2コマ目の「車を充電する」は charge the car、吹き出しのおにぎりは rice balls です。3コマ目は「レストランに長い列ができていた」という問題発生。found that there was a long line ... のように found that ~ を使うと「気づいた」ことが伝わります。',
      point: 'charge the car ／ found that there was ...',
      commonMistakes: [
        '「Mr. Yamada was putting electricity.」→ was charging their car',
        '「There is a long line.」と現在形にする→ there was a long line',
        '2コマ目でおにぎりの吹き出しを飛ばす→ was thinking of buying some rice balls',
      ],
    },
    q3: {
      text: 'Some people say that the government should give more money to people who buy electric cars. What do you think about that?',
      ja: '政府は電気自動車を買う人にもっとお金を出すべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Electric cars are still more expensive than other cars. If the government helps, more people will buy them and protect the environment.',
        'I disagree. Many people do not buy electric cars because there are few places to charge them. The government should build more charging stations first.',
      ],
      explanation:
        '賛成なら「値段が高い→補助があれば広まる」、反対なら「充電できる場所が少ないのが原因→先に充電スタンドを増やすべき」が言いやすい理由です。If ~, ... の文は理由を詳しくするのに便利です。',
      point: '立場 → 理由（値段／お金の使い道）',
      commonMistakes: [
        '「Electric car is expensive.」→ Electric cars are expensive.（一般的な話は複数形）',
        '「government」の前の the を落とす→ the government',
      ],
    },
    q4: {
      text: 'Today, many supermarkets and convenience stores sell ready-made meals. Do you think people will cook at home less in the future?',
      ja: '今日、多くのスーパーやコンビニが調理済みの食事を売っています。将来、人々は家で料理をすることが減ると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many people are too busy with work to cook every day. Ready-made meals are also becoming cheaper and tastier.',
      ],
      modelAnswersNo: [
        'Cooking at home is usually healthier than eating ready-made meals. Also, many people enjoy cooking with their families.',
      ],
      explanation:
        'Yes なら「忙しくて料理する時間がない」、No なら「家で作るほうが健康的」「料理を楽しむ人も多い」が理由になります。too ~ to ... の形を使えると表現の幅が広がります。',
      point: 'Yes/No → 理由2文（too ~ to ...）',
      commonMistakes: [
        '「People are busy, so cook less.」と主語が抜ける→ so they cook less',
        '「Cooking at home is health.」→ healthy / healthier（形容詞を使う）',
      ],
    },
  },

  // ───────── g2-05 ─────────
  {
    id: 'g2-05',
    grade: '2',
    title: 'Working from Home',
    japaneseTitle: '在宅勤務',
    category: '仕事',
    level: 'standard',
    passage:
      'In the past, most office workers had to go to their offices every day, and many of them spent a long time on crowded trains. Recently, however, more companies have started allowing their workers to work from home a few days a week. These workers do not have to commute on those days, so they have more time to spend with their families.',
    passageJa:
      'かつては、ほとんどの会社員が毎日会社に行かなければならず、その多くが混雑した電車で長い時間を過ごしていました。しかし最近では、週に数日、社員が在宅で働くことを認める会社が増えています。こうした社員はその日には通勤する必要がないので、家族と過ごす時間が増えています。',
    vocabulary: [
      { word: 'office worker', meaning: '会社員' },
      { word: 'crowded', meaning: '混雑した' },
      { word: 'allow A to ~', meaning: 'Aが〜するのを認める' },
      { word: 'work from home', meaning: '在宅で働く' },
      { word: 'commute', meaning: '通勤する' },
    ],
    story: {
      firstSentence: 'One day, Mr. Suzuki was working from home in his living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '💻', x: 44, y: 64, size: 2.4 },
              { emoji: '👧', x: 68, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (in the living room): Mr. Suzuki is working on his computer at home. His daughter Mika says to him, "Can you come to my piano concert this afternoon?"',
          },
          speech: { speaker: 'Mika', text: 'Can you come to my piano concert this afternoon?' },
        },
        {
          caption: 'That afternoon in the school gym',
          scene: {
            background: 'gym',
            items: [
              { emoji: '🎹', x: 16, y: 70, size: 2.8 },
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '👨', x: 68, y: 62, size: 4.6, flip: true },
              { emoji: '📱', x: 54, y: 58, size: 2 },
            ],
            description:
              'Panel 2 (that afternoon in the school gym): Mika is playing the piano at the concert. Mr. Suzuki is taking a video of her with his smartphone.',
          },
        },
        {
          caption: 'That evening',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '💻', x: 44, y: 64, size: 2.4 },
              { emoji: '🎧', x: 18, y: 56, size: 1.8 },
              { emoji: '👧', x: 68, y: 62, size: 4.6, flip: true, thought: '📹' },
            ],
            description:
              'Panel 3 (that evening in the living room): Mr. Suzuki is having an online meeting on his computer. Mika is thinking of watching the concert video with him.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why do these workers have more time to spend with their families?',
      ja: 'パッセージによると、なぜこうした社員は家族と過ごす時間が増えているのですか？',
      modelAnswers: [
        'Because they do not have to commute on the days when they work from home.',
        'They can work from home a few days a week, so they do not need to go to the office.',
      ],
      explanation:
        '最後の文の so（だから）の前半が理由です。on those days（その日）は前の文の「在宅で働く週数日」のこと。those days を the days when they work from home と具体的に言い換えると満点の答えになります。',
      point: 'so の前が理由 → those days を具体的に',
      commonMistakes: [
        '「Because they do not have to commute on those days.」と those days のまま→ on the days when they work from home',
        '「Because they spent a long time on trains.」と過去の状況を答える→ so の直前の内容を答える',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. Suzuki was working from home in his living room. His daughter Mika said to him, "Can you come to my piano concert this afternoon?" That afternoon in the school gym, Mika was playing the piano. Mr. Suzuki was taking a video of her with his smartphone. That evening, Mr. Suzuki was having an online meeting. Mika was thinking of watching the concert video with him.',
      ],
      explanation:
        '1コマ目は疑問文のセリフも "Can you come ...?" とそのまま引用します。2コマ目の「動画を撮る」は take a video、3コマ目の「オンライン会議をしている」は have an online meeting。お父さんが忙しくて一緒に見られない状況を、Mika の吹き出しで伝えましょう。',
      point: 'take a video ／ have an online meeting',
      commonMistakes: [
        '「Mr. Suzuki was taking a photo.」→ スマートフォンを構えて演奏を撮っているので taking a video',
        '「Mr. Suzuki was working.」だけで済ませる→ was having an online meeting と具体的に',
        '「Mika thinks of watching ...」と現在形→ Mika was thinking of watching ...',
      ],
    },
    q3: {
      text: 'Some people say that working from home is better than working in an office. What do you think about that?',
      ja: '会社で働くより在宅で働くほうが良いと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. People do not have to spend time on crowded trains. They can use that time for their families or hobbies.',
        'I disagree. It is easier to talk with coworkers face to face in an office. Also, some people cannot concentrate on their work at home.',
      ],
      explanation:
        '賛成なら「通勤時間がなくなる」、反対なら「同僚と直接話しやすい」「家だと集中できない」が理由になります。パッセージの内容（crowded trains）を理由に使うのも有効です。',
      point: '立場 → 理由（通勤時間／対面・集中）',
      commonMistakes: [
        '「Work from home is good.」→ Working from home is good.（主語は動名詞）',
        '「I can\'t concentrate.」と自分の話だけにする→ some people cannot ... と一般的に述べる',
      ],
    },
    q4: {
      text: 'Today, many people continue working after the age of 65. Do you think companies should hire more elderly people?',
      ja: '今日、65歳を過ぎても働き続ける人が多くいます。会社はもっと高齢者を雇うべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Elderly people have a lot of experience and skills. They can teach young workers many useful things.',
      ],
      modelAnswersNo: [
        'Some jobs are physically hard for elderly people. Companies should give more chances to young people instead.',
      ],
      explanation:
        'Yes なら「経験や技術がある」「若い人に教えられる」、No なら「体力的にきつい仕事がある」「若い人に機会を」が理由になります。2文目で1文目を具体的にしましょう。',
      point: 'Yes/No → 理由2文（経験／体力・機会）',
      commonMistakes: [
        '「Old people is experienced.」→ Elderly people are experienced.（people は複数扱い）',
        '「Because they have experience.」で終わる→ 2文目で They can teach ... と補足',
      ],
    },
  },

  // ───────── g2-06 ─────────
  {
    id: 'g2-06',
    grade: '2',
    title: 'Bike Sharing in Cities',
    japaneseTitle: '都市のシェアサイクル',
    category: '交通',
    level: 'standard',
    passage:
      'In many cities, roads are crowded with cars, and buses are often late during rush hour. To solve this problem, some cities have introduced bike-sharing services. People can rent a bicycle with a smartphone app at one place and return it at another. Many people now use these bicycles to go to work or school. As a result, there is less traffic on the roads.',
    passageJa:
      '多くの都市では道路が車で混雑し、ラッシュアワーにはバスがよく遅れます。この問題を解決するために、シェアサイクルのサービスを導入した都市もあります。人々はスマートフォンのアプリで自転車をある場所で借り、別の場所で返すことができます。今では多くの人がこうした自転車を使って通勤や通学をしています。その結果、道路の交通量が減っています。',
    vocabulary: [
      { word: 'be crowded with ~', meaning: '〜で混雑している' },
      { word: 'rush hour', meaning: 'ラッシュアワー' },
      { word: 'introduce', meaning: '導入する' },
      { word: 'rent', meaning: '（お金を払って）借りる' },
      { word: 'return', meaning: '返す' },
      { word: 'traffic', meaning: '交通（量）' },
    ],
    story: {
      firstSentence: 'One day, Mr. Kimura and his son Haruto were at a station.',
      panels: [
        {
          scene: {
            background: 'station',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '👦', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🚲', x: 82, y: 72, size: 2.8 },
            ],
            description:
              'Panel 1 (at a station): Mr. Kimura and his son Haruto are standing near some shared bicycles. Haruto says to his father, "Let\'s rent bicycles and ride to the museum."',
          },
          speech: { speaker: 'Haruto', text: "Let's rent bicycles and ride to the museum." },
        },
        {
          caption: 'On the way to the museum',
          scene: {
            background: 'street',
            items: [
              { emoji: '🚲', x: 30, y: 74, size: 2.8 },
              { emoji: '👨', x: 30, y: 60, size: 4.6 },
              { emoji: '🚲', x: 68, y: 74, size: 2.8 },
              { emoji: '👦', x: 68, y: 60, size: 4.6, thought: '🍦' },
            ],
            description:
              'Panel 2 (on the way to the museum): Mr. Kimura is riding a bicycle on the street. Haruto is riding behind him and thinking of eating ice cream.',
          },
        },
        {
          caption: 'At the museum',
          scene: {
            background: 'street',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '🚲', x: 16, y: 72, size: 2.6 },
              { emoji: '👦', x: 66, y: 62, size: 4.6 },
              { emoji: '🚫', x: 82, y: 56, size: 2.4 },
            ],
            description:
              'Panel 3 (at the museum): Mr. Kimura is parking the bicycles. Haruto is looking at a sign that says the museum is closed today.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why is there less traffic on the roads?',
      ja: 'パッセージによると、なぜ道路の交通量が減っているのですか？',
      modelAnswers: [
        'Because many people use bicycles from bike-sharing services to go to work or school.',
        'Many people go to work or school on bicycles that they rent with a smartphone app.',
      ],
      explanation:
        '最後の文の As a result（その結果）の直前の文が理由です。その文の these bicycles は「スマートフォンのアプリで借りられるシェアサイクル」のこと。these のままにせず、どんな自転車かを具体的に言いましょう。',
      point: 'As a result の前の文 → these bicycles を具体的に',
      commonMistakes: [
        '「Because many people use these bicycles.」と these のまま→ bicycles from bike-sharing services',
        '「Because roads are crowded.」と問題点を答える→ As a result の前の内容が答え',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. Kimura and his son Haruto were at a station. Haruto said to his father, "Let\'s rent bicycles and ride to the museum." On the way to the museum, Mr. Kimura was riding a bicycle. Haruto was thinking of eating ice cream. At the museum, Mr. Kimura was parking the bicycles. Haruto found that the museum was closed.',
      ],
      explanation:
        '2コマ目の「自転車に乗っている」は was riding a bicycle、3コマ目の「自転車を止める」は park the bicycles です。3コマ目は「博物館が閉まっていた」というオチ。found that the museum was closed と、気づいた内容を過去形で言いましょう。',
      point: 'ride / park a bicycle ／ found that ~ was closed',
      commonMistakes: [
        '「Mr. Kimura was driving a bicycle.」→ 自転車は ride',
        '「The museum is closed.」と現在形にする→ the museum was closed',
        '「Haruto wanted ice cream.」でも可だが、吹き出しは was thinking of eating ice cream が定番',
      ],
    },
    q3: {
      text: 'Some people say that all bicycle riders should be required to wear helmets. What do you think about that?',
      ja: '自転車に乗る人は全員ヘルメットの着用を義務づけられるべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Helmets can protect riders\' heads in accidents. Many serious injuries could be prevented in this way.',
        'I disagree. People often ride bicycles only for short distances. Carrying a helmet all the time is not convenient for them.',
      ],
      explanation:
        '賛成なら「事故のとき頭を守れる」、反対なら「短い距離しか乗らない」「持ち歩くのが不便」が理由になります。シェアサイクルの利用者を思い浮かべると反対意見も考えやすいです。',
      point: '立場 → 理由（安全／手間）',
      commonMistakes: [
        '「Helmet is safe.」→ Helmets can protect riders.（何を守るのかまで言う）',
        '「I agree. Because ...」と because だけの文にする→ Helmets can ... と完全な文で',
      ],
    },
    q4: {
      text: 'Today, many people in Japan keep pets. Do you think more apartment buildings should allow people to have pets?',
      ja: '今日、日本では多くの人がペットを飼っています。ペットを飼えるマンションをもっと増やすべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Pets can make people\'s lives happier, especially for people who live alone. Many people give up having pets because of their apartments.',
      ],
      modelAnswersNo: [
        'Some people are afraid of animals or have allergies. Also, pets can make noise and cause problems with neighbors.',
      ],
      explanation:
        'Yes なら「一人暮らしの人の心の支えになる」、No なら「動物が苦手な人やアレルギーの人がいる」「騒音のトラブル」が理由になります。',
      point: 'Yes/No → 理由2文（気持ち／周りへの影響）',
      commonMistakes: [
        '「Pets is cute.」→ Pets are cute.（複数形と are）',
        '「Because I like dogs.」と好みだけ→社会全体にとっての理由も入れる',
      ],
    },
  },

  // ───────── g2-07 ─────────
  {
    id: 'g2-07',
    grade: '2',
    title: 'Helping Foreign Tourists',
    japaneseTitle: '外国人観光客への対応',
    category: '観光',
    level: 'standard',
    passage:
      'The number of foreign tourists visiting Japan has been increasing. However, many of them have trouble understanding signs and menus that are written only in Japanese. Now, some restaurants and train stations offer information in several languages, and some use translation apps on tablets. By doing so, they can communicate with visitors more smoothly. This also helps tourists enjoy their stay in Japan.',
    passageJa:
      '日本を訪れる外国人観光客の数は増え続けています。しかし、その多くは日本語だけで書かれた案内表示やメニューを理解するのに苦労しています。現在、いくつかの言語で情報を提供したり、タブレットで翻訳アプリを使ったりするレストランや駅もあります。そうすることで、訪問者とより円滑にコミュニケーションをとることができます。これは観光客が日本での滞在を楽しむ助けにもなっています。',
    vocabulary: [
      { word: 'foreign tourist', meaning: '外国人観光客' },
      { word: 'have trouble ~ing', meaning: '〜するのに苦労する' },
      { word: 'several', meaning: 'いくつかの' },
      { word: 'translation', meaning: '翻訳' },
      { word: 'communicate with ~', meaning: '〜と意思疎通する' },
      { word: 'smoothly', meaning: '円滑に' },
    ],
    story: {
      firstSentence: 'One day, Mr. and Mrs. Nakamura were working at their restaurant.',
      panels: [
        {
          scene: {
            background: 'restaurant',
            items: [
              { emoji: '👨', x: 30, y: 62, size: 4.6 },
              { emoji: '📋', x: 44, y: 60, size: 2 },
              { emoji: '👩', x: 66, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (at their restaurant): Mr. Nakamura is holding a Japanese menu. Mrs. Nakamura says to her husband, "We should make an English menu for foreign customers."',
          },
          speech: { speaker: 'Mrs. Nakamura', text: 'We should make an English menu for foreign customers.' },
        },
        {
          caption: 'The next week',
          scene: {
            background: 'restaurant',
            items: [
              { emoji: '👨', x: 28, y: 62, size: 4.6 },
              { emoji: '🍤', x: 88, y: 64, size: 2 },
              { emoji: '👨', x: 50, y: 62, size: 4.6 },
              { emoji: '📖', x: 62, y: 60, size: 2 },
              { emoji: '👩', x: 74, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 2 (the next week at the restaurant): Mr. Nakamura is giving the new English menu to a foreign customer. Mrs. Nakamura is cooking tempura in the kitchen.',
          },
        },
        {
          caption: 'A few days later',
          scene: {
            background: 'restaurant',
            items: [
              { emoji: '👩', x: 26, y: 62, size: 4.6 },
              { emoji: '👨', x: 46, y: 62, size: 4.6 },
              { emoji: '🇪🇸', x: 36, y: 40, size: 2.2 },
              { emoji: '👨', x: 72, y: 62, size: 4.6, flip: true, thought: '📱' },
            ],
            description:
              'Panel 3 (a few days later at the restaurant): Some customers are speaking Spanish. Mr. Nakamura cannot understand them, and he is thinking of using a translation app.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how can some restaurants and train stations communicate with visitors more smoothly?',
      ja: 'パッセージによると、いくつかのレストランや駅はどのようにして訪問者とより円滑にコミュニケーションをとることができますか？',
      modelAnswers: [
        'By offering information in several languages and using translation apps on tablets.',
        'They offer information in several languages, and some use translation apps.',
      ],
      explanation:
        '4文目の By doing so（そうすることで）が目印。doing so は直前の文の「いくつかの言語で情報を提供し、タブレットで翻訳アプリを使う」ことです。2つの内容を and でつなぎ、By offering ... and using ... と両方を ~ing にしましょう。',
      point: 'By doing so の中身 → By ~ing and ~ing',
      commonMistakes: [
        '「By offering information.」だけで終わる→ in several languages まで言う',
        '「By offering ... and use apps.」と2つ目を原形にする→ and using',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mr. and Mrs. Nakamura were working at their restaurant. Mrs. Nakamura said to her husband, "We should make an English menu for foreign customers." The next week, Mr. Nakamura was giving the new English menu to a customer. Mrs. Nakamura was cooking tempura. A few days later, some customers were speaking Spanish. Mr. Nakamura was thinking of using a translation app.',
      ],
      explanation:
        '2コマ目は「英語のメニューを渡している」を give the new English menu to a customer で表します。3コマ目は「スペイン語を話す客が来て英語のメニューが役に立たない」というオチ。客の動作（were speaking Spanish）と店主の吹き出し（was thinking of using a translation app）の2点を言いましょう。',
      point: 'give A to B ／ 客と店主の2点を言う',
      commonMistakes: [
        '「Mr. Nakamura was giving a customer to the menu.」と語順を誤る→ giving the menu to a customer',
        '「Some customers was speaking.」→ customers は複数なので were speaking',
        '3コマ目で客の話す言葉に触れない→ were speaking Spanish',
      ],
    },
    q3: {
      text: 'Some people say that tourists should pay a special tax when they visit popular sightseeing spots. What do you think about that?',
      ja: '観光客は人気の観光地を訪れるときに特別な税金を払うべきだと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Popular places become crowded and dirty because of too many visitors. The money can be used to keep those places clean.',
        'I disagree. A special tax may make fewer tourists want to visit. Local shops and hotels will lose money as a result.',
      ],
      explanation:
        '賛成なら「混雑や汚れ→税金で管理できる」、反対なら「観光客が減る→地元の店が困る」が理由になります。The money can be used to ~ は賛成意見で使いやすい表現です。',
      point: '立場 → 理由（環境の維持／地元経済）',
      commonMistakes: [
        '「Tax is bad.」だけで終わる→誰がどう困るのかを説明する',
        '「too many tourist」→ too many tourists（複数形）',
      ],
    },
    q4: {
      text: 'Today, many Japanese workers do not take long vacations. Do you think companies should give workers longer vacations?',
      ja: '今日、多くの日本の働く人は長い休暇をとりません。会社は働く人にもっと長い休暇を与えるべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Workers need time to rest and spend with their families. After a long vacation, they can work harder.',
      ],
      modelAnswersNo: [
        'Some companies do not have enough workers. If someone takes a long vacation, other workers will have to do more work.',
      ],
      explanation:
        'Yes なら「休息・家族との時間」「休んだ後よく働ける」、No なら「人手不足で他の人の負担が増える」が理由になります。If ~, ... で結果を示すと説得力が出ます。',
      point: 'Yes/No → 理由2文（休息／人手不足）',
      commonMistakes: [
        '「Workers are tired.」だけ→だから休暇が必要、と結論までつなげる',
        '「take a long holidays」→ take a long vacation / take long vacations',
      ],
    },
  },

  // ───────── g2-08 ─────────
  {
    id: 'g2-08',
    grade: '2',
    title: 'Children and Smartphones',
    japaneseTitle: '子どもとスマートフォン',
    category: '技術',
    level: 'challenge',
    passage:
      'Today, many elementary school students have their own smartphones. Although smartphones are useful for contacting family members, some children use them for too long and do not get enough sleep. To deal with this issue, some schools and parents are making rules together, such as not using smartphones after nine at night. In this way, they are trying to help children develop healthy habits.',
    passageJa:
      '今日、多くの小学生が自分のスマートフォンを持っています。スマートフォンは家族と連絡をとるのに便利ですが、長時間使いすぎて十分な睡眠がとれない子どももいます。この問題に対処するため、夜9時以降はスマートフォンを使わないといったルールを、学校と保護者が一緒に作っているところもあります。このようにして、子どもたちが健康的な習慣を身につけられるよう手助けしようとしています。',
    vocabulary: [
      { word: 'elementary school', meaning: '小学校' },
      { word: 'contact', meaning: '連絡をとる' },
      { word: 'deal with ~', meaning: '〜に対処する' },
      { word: 'issue', meaning: '問題' },
      { word: 'develop', meaning: '身につける、発達させる' },
      { word: 'habit', meaning: '習慣' },
    ],
    story: {
      firstSentence: 'One day, Mrs. Ogawa and her son Ren were talking in the living room.',
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '☕', x: 16, y: 64, size: 1.8 },
              { emoji: '👦', x: 66, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 1 (in the living room): Mrs. Ogawa is listening to her son Ren. Ren says to his mother, "I want my own smartphone like my friends."',
          },
          speech: { speaker: 'Ren', text: 'I want my own smartphone like my friends.' },
        },
        {
          caption: 'The next weekend at a shop',
          scene: {
            background: 'shop',
            items: [
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '📱', x: 44, y: 60, size: 2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '📝' },
            ],
            description:
              'Panel 2 (the next weekend at a shop): Ren is choosing a new smartphone. Mrs. Ogawa is thinking of making rules for using it.',
          },
        },
        {
          caption: 'Late that night',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '🕚', x: 50, y: 20, size: 2.6 },
              { emoji: '👦', x: 30, y: 62, size: 4.6 },
              { emoji: '🎮', x: 44, y: 62, size: 2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true },
            ],
            description:
              'Panel 3 (late that night in the living room): Ren is playing a game on his new smartphone. Mrs. Ogawa is pointing at the clock because it is already eleven.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, how are some schools and parents trying to help children develop healthy habits?',
      ja: 'パッセージによると、学校と保護者の一部はどのようにして子どもが健康的な習慣を身につける手助けをしようとしていますか？',
      modelAnswers: [
        'By making rules together, such as not using smartphones after nine at night.',
        'They make rules about smartphones together, for example, not using them after nine at night.',
      ],
      explanation:
        '最後の文の In this way（このようにして）が目印で、直前の文「夜9時以降は使わないなどのルールを一緒に作る」を指します。such as 以下の具体例まで言えると、より正確な答えになります。',
      point: 'In this way の中身 → By making rules ...',
      commonMistakes: [
        '「By making rules.」だけで終わる→ such as not using smartphones after nine at night まで言う',
        '「Because children do not get enough sleep.」と問題点を答える→質問は how（方法）',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mrs. Ogawa and her son Ren were talking in the living room. Ren said to his mother, "I want my own smartphone like my friends." The next weekend at a shop, Ren was choosing a new smartphone. Mrs. Ogawa was thinking of making rules for using it. Late that night, Ren was playing a game on his smartphone. Mrs. Ogawa was pointing at the clock because it was already eleven.',
      ],
      explanation:
        '2コマ目は「スマートフォンを選ぶ」を choose a smartphone、お母さんの吹き出しは was thinking of making rules で表します。3コマ目は「夜遅くまでゲームをしている」というオチ。お母さんの動作 point at the clock と、理由 because it was already eleven を合わせて言えると高得点です。',
      point: 'choose ／ point at the clock because ...',
      commonMistakes: [
        '「Ren was playing smartphone.」→ was playing a game on his smartphone',
        '「because it is already eleven」と現在形→ because it was already eleven',
        '「Mrs. Ogawa was angry.」だけで済ませる→時計を指している動作を具体的に言う',
      ],
    },
    q3: {
      text: 'Some people say that children should not have smartphones until they are in high school. What do you think about that?',
      ja: '子どもは高校生になるまでスマートフォンを持つべきではないと言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Young children often cannot control how long they use smartphones. They should spend more time studying and playing outside.',
        'I disagree. Smartphones are useful for contacting parents in an emergency. Children can also use them to learn many things.',
      ],
      explanation:
        '賛成なら「使う時間を自分で管理できない」、反対なら「緊急時に親と連絡できる」「学習にも使える」が理由になります。パッセージの contacting family members も反対意見の理由に使えます。',
      point: '立場 → 理由（自己管理／安全・学習）',
      commonMistakes: [
        '「Smartphone is dangerous.」→ Smartphones can be dangerous for children.（何にとってかを言う）',
        '「until high school student」→ until they are in high school',
      ],
    },
    q4: {
      text: 'Today, many convenience stores are open 24 hours a day. Do you think stores need to be open all night?',
      ja: '今日、多くのコンビニエンスストアは24時間営業しています。店は一晩中開いている必要があると思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Some people work at night and need to buy food after work. Stores are also safe places for people to go in an emergency.',
      ],
      modelAnswersNo: [
        'Very few customers come to stores late at night. Closing at night can save energy and help workers get enough rest.',
      ],
      explanation:
        'Yes なら「夜に働く人がいる」「緊急時に駆け込める」、No なら「客が少ない」「電気の節約・店員の休息」が理由になります。',
      point: 'Yes/No → 理由2文（利用者／省エネ・働く人）',
      commonMistakes: [
        '「Because night workers.」と名詞だけ→ Some people work at night. と文で',
        '「Stores is open.」→ Stores are open.',
      ],
    },
  },

  // ───────── g2-09 ─────────
  {
    id: 'g2-09',
    grade: '2',
    title: 'Giving Old Clothes a New Life',
    japaneseTitle: '古着に新しい命を',
    category: '環境',
    level: 'challenge',
    passage:
      'Every year, a huge amount of clothing is thrown away in Japan, and most of it is burned or buried. This is harmful to the environment. Recently, some clothing companies have begun collecting used clothes from customers at their stores. Clothes that are still in good condition are sold again or sent to people in need, so less clothing ends up as waste.',
    passageJa:
      '毎年、日本では大量の衣類が捨てられ、そのほとんどが燃やされたり埋められたりしています。これは環境に有害です。最近、店で客から古着を回収し始めた衣料品会社もあります。まだ状態の良い服は再び売られたり、困っている人々に送られたりするので、ごみになる衣類が減っています。',
    vocabulary: [
      { word: 'a huge amount of ~', meaning: '大量の〜' },
      { word: 'bury', meaning: '埋める' },
      { word: 'harmful', meaning: '有害な' },
      { word: 'collect', meaning: '集める、回収する' },
      { word: 'in good condition', meaning: '状態が良い' },
      { word: 'end up as ~', meaning: '最終的に〜になる' },
    ],
    story: {
      firstSentence: "One day, Mrs. Inoue and her daughter Mai were cleaning Mai's room.",
      panels: [
        {
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👩', x: 30, y: 62, size: 4.6 },
              { emoji: '👧', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '👕', x: 82, y: 64, size: 2.2 },
              { emoji: '👗', x: 82, y: 76, size: 2 },
            ],
            description:
              'Panel 1 (in Mai\'s room): Mrs. Inoue and Mai are cleaning the room. Mai is holding some old clothes and says to her mother, "These clothes are too small for me now."',
          },
          speech: { speaker: 'Mai', text: 'These clothes are too small for me now.' },
        },
        {
          caption: 'That weekend at a clothing store',
          scene: {
            background: 'shop',
            items: [
              { emoji: '📥', x: 16, y: 70, size: 2.6 },
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '👕', x: 22, y: 60, size: 1.8 },
              { emoji: '👩', x: 66, y: 62, size: 4.6, flip: true },
              { emoji: '🧥', x: 80, y: 62, size: 2.2 },
            ],
            description:
              'Panel 2 (that weekend at a clothing store): Mai is putting her old clothes into a collection box. Mrs. Inoue is looking at a jacket.',
          },
        },
        {
          caption: 'That evening at home',
          scene: {
            background: 'livingroom',
            items: [
              { emoji: '👧', x: 30, y: 62, size: 4.6 },
              { emoji: '🧥', x: 44, y: 62, size: 2.2 },
              { emoji: '👩', x: 68, y: 62, size: 4.6, flip: true, thought: '📥' },
              { emoji: '👚', x: 82, y: 66, size: 2 },
            ],
            description:
              'Panel 3 (that evening at home): Mai is trying on her new jacket. Mrs. Inoue is holding her own old clothes and thinking of taking them to the store next time.',
          },
        },
      ],
    },
    q1: {
      text: 'According to the passage, why does less clothing end up as waste?',
      ja: 'パッセージによると、なぜごみになる衣類が減っているのですか？',
      modelAnswers: [
        'Because clothing companies collect used clothes and sell them again or send them to people in need.',
        'Used clothes in good condition are collected at stores and sold again or given to people in need.',
      ],
      explanation:
        '最後の文の so（だから）の前半が理由です。ただし Clothes that are still in good condition だけでは「どこから来た服か」が分かりません。前の文の「会社が店で客から古着を回収する」ことと合わせて答えると完璧です。',
      point: 'so の前が理由 → 前の文の情報も補う',
      commonMistakes: [
        '「Because they are sold again.」と they で答える→ used clothes と具体的に言う',
        '「Because clothing is burned.」と問題点を答える→ so の前の取り組みが答え',
      ],
    },
    q2: {
      text: G2_Q2_TEXT,
      ja: G2_Q2_JA,
      modelAnswers: [
        'One day, Mrs. Inoue and her daughter Mai were cleaning Mai\'s room. Mai said to her mother, "These clothes are too small for me now." That weekend at a clothing store, Mai was putting her old clothes into a collection box. Mrs. Inoue was looking at a jacket. That evening at home, Mai was trying on her new jacket. Mrs. Inoue was thinking of taking her own old clothes to the store.',
      ],
      explanation:
        '2コマ目は「回収箱に入れる」を put ~ into a collection box、3コマ目の「試着する」は try on で表します。お母さんの吹き出しは「自分の古い服も持って行こう」という考えなので、was thinking of taking her own old clothes to the store と言いましょう。',
      point: 'put ~ into a box ／ try on ／ thinking of taking',
      commonMistakes: [
        '「Mai was throwing away her clothes.」→ 捨てているのではなく回収箱に入れている（putting ... into a collection box）',
        '「Mai was wearing on her jacket.」→ trying on her new jacket',
        '「Mrs. Inoue thought to take ...」→ was thinking of taking ...',
      ],
    },
    q3: {
      text: 'Some people say that people buy too many clothes these days. What do you think about that?',
      ja: '最近の人は服を買いすぎていると言う人がいます。あなたはそれについてどう思いますか？',
      modelAnswers: [
        'I agree. Clothes are so cheap now that people buy new ones very often. Many of them are thrown away after only a few uses.',
        'I disagree. Many people now use second-hand shops and clothing apps. They try not to waste clothes.',
      ],
      explanation:
        '賛成なら「服が安くなり、すぐ買い替える」、反対なら「古着店やフリマアプリを使う人が増えている」が理由になります。so ~ that ... の構文を使うと2級らしい理由になります。',
      point: '立場 → 理由（安さ・使い捨て／古着の活用）',
      commonMistakes: [
        '「Clothes are cheap, so buy.」と主語が抜ける→ so people buy new ones',
        '「second hand shop」→ second-hand shops（ハイフンと複数形）',
      ],
    },
    q4: {
      text: 'These days, many people enjoy watching international sports events. Do you think Japan should host more international sports events?',
      ja: '最近、多くの人が国際的なスポーツ大会を見て楽しんでいます。日本はもっと国際的なスポーツ大会を開催するべきだと思いますか？',
      followUpYes: 'Why?',
      followUpNo: 'Why not?',
      modelAnswers: ['Yes. / No.'],
      modelAnswersYes: [
        'Many people from other countries will visit Japan and learn about its culture. It is also good for the Japanese economy.',
      ],
      modelAnswersNo: [
        'Hosting big sports events costs a lot of money. The government should use the money for things like hospitals and schools.',
      ],
      explanation:
        'Yes なら「海外から人が来て文化を知ってもらえる」「経済に良い」、No なら「費用がかかる」「病院や学校に使うべき」が理由になります。',
      point: 'Yes/No → 理由2文（交流・経済／費用）',
      commonMistakes: [
        '「It is good for economy.」→ good for the economy（the を付ける）',
        '「Because money.」と単語だけ→ It costs a lot of money. と文で',
      ],
    },
  },
];
