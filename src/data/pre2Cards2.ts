// 英検準2級の問題カード（pre2-02〜pre2-12）。pre2-01 は pre2Cards.ts。
// イラストは public/images/pre2/<id>-a.png / <id>-b.png。作成用プロンプトは docs/pre2-image-prompts.md
import type { ExamCard } from '../types';

export const PRE2_CARDS_2: ExamCard[] = [
  {
    id: "pre2-02",
    grade: "pre2",
    title: "Online Classes",
    japaneseTitle: "オンライン授業",
    category: "教育",
    level: "basic",
    passage: "Many students now take classes online. They can study at home and save time because they do not have to travel to school. Some teachers also use videos in their lessons. Students can watch the videos again, and by doing so they can understand difficult points better.",
    passageJa: "今、多くの生徒がオンラインで授業を受けています。学校へ行く必要がないので、家で勉強して時間を節約できます。授業で動画を使う先生もいます。生徒は動画をもう一度見ることができ、そうすることで難しい点をより良く理解できます。",
    vocabulary: [
      {
        word: "online",
        meaning: "オンラインで"
      },
      {
        word: "save time",
        meaning: "時間を節約する"
      },
      {
        word: "travel",
        meaning: "移動する"
      },
      {
        word: "lesson",
        meaning: "授業"
      },
      {
        word: "understand",
        meaning: "理解する"
      }
    ],
    scene: {
      background: "library",
      image: "/images/pre2/pre2-02-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📚",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🛒",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📰",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "💻",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📖",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a library): five people are doing different things. A boy is carrying some books. A woman is pushing a cart. A man is reading a newspaper. A girl is using a computer. An old woman is taking a book from a shelf."
    },
    sceneB: {
      background: "livingroom",
      image: "/images/pre2/pre2-02-b.png",
      items: [
        {
          emoji: "👦",
          x: 45,
          y: 66,
          size: 4,
          thought: "👨"
        },
        {
          emoji: "💻",
          x: 56,
          y: 64,
          size: 2
        }
      ],
      description: "Picture B (a living room at home): a boy is sitting in front of his computer. The screen is frozen and he cannot join his online class. He is thinking of asking his father for help."
    },
    q1: {
      text: "According to the passage, how can students understand difficult points better?",
      ja: "パッセージによると、生徒はどのようにして難しい点をより良く理解できますか？",
      modelAnswers: [
        "By watching the videos again.",
        "They watch the videos again."
      ],
      explanation: "最後の文の by doing so が答えの目印。doing so は直前の「動画をもう一度見る」を指します。How ~? には By ~ing で答えるのが定番です。",
      point: "by doing so の指す内容 → By ~ing",
      commonMistakes: [
        "「By doing so.」と本文の語句をそのまま答える→ doing so の中身を具体的に言う",
        "「By watch the videos again」と動詞を原形のままにする→ By watching"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is carrying some books. A woman is pushing a cart. A man is reading a newspaper. A girl is using a computer. An old woman is taking a book from a shelf."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the boy in Picture B. Please describe the situation.",
      ja: "では、イラストBの男の子を見てください。状況を説明してください。",
      modelAnswers: [
        "His computer screen is frozen, so he can't join his class. He's thinking of asking his father for help.",
        "He can't join his online class because the screen is frozen. He wants to ask his father for help."
      ],
      explanation: "「画面が固まっていて授業に参加できない（状況）」と「お父さんに助けを頼もうと考えている（吹き出し）」の2点を、so や because でつないで言います。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "吹き出し（お父さん）だけを言う→画面が固まっている状況も説明する",
        "「He is thinking ask his father.」→ be thinking of asking"
      ]
    },
    q4: {
      text: "Do you think more students will study online in the future?",
      ja: "今後、オンラインで勉強する生徒は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Students can study at any time and in any place. Also, they can save money because they do not need to go to school."
      ],
      modelAnswersNo: [
        "Students need to meet their teachers and friends. Also, it is easier to stay focused in a classroom."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "Some people like to study with their friends. Do you like to study with other people?",
      ja: "友達と一緒に勉強するのが好きな人もいます。あなたは他の人と一緒に勉強するのが好きですか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often study with my friends at the library. We help each other when we have difficult questions."
      ],
      modelAnswersNo: [
        "I can focus better when I am alone. Also, I sometimes talk too much with my friends."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-03",
    grade: "pre2",
    title: "Volunteer Work",
    japaneseTitle: "ボランティア活動",
    category: "社会",
    level: "basic",
    passage: "Many high school students do volunteer work on weekends. Some of them clean parks, and others help old people with shopping. They want to help their town, so they join local groups. Volunteer work also gives them a good chance to meet new people of all ages.",
    passageJa: "多くの高校生が週末にボランティア活動をしています。公園を掃除する生徒もいれば、お年寄りの買い物を手伝う生徒もいます。彼らは町の役に立ちたいので、地元のグループに参加します。ボランティア活動は、あらゆる年齢の新しい人々に出会う良い機会にもなります。",
    vocabulary: [
      {
        word: "volunteer work",
        meaning: "ボランティア活動"
      },
      {
        word: "weekend",
        meaning: "週末"
      },
      {
        word: "local",
        meaning: "地元の"
      },
      {
        word: "join",
        meaning: "参加する"
      },
      {
        word: "chance",
        meaning: "機会"
      }
    ],
    scene: {
      background: "garden",
      image: "/images/pre2/pre2-03-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🚿",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "⛏️",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🛍️",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🛒",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👴",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🧹",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a community garden): five people are doing different things. A boy is watering some flowers. A girl is digging a hole. A woman is carrying a bag of soil. A man is pushing a cart. An old man is sweeping the ground."
    },
    sceneB: {
      background: "street",
      image: "/images/pre2/pre2-03-b.png",
      items: [
        {
          emoji: "👧",
          x: 45,
          y: 66,
          size: 4,
          thought: "👭"
        },
        {
          emoji: "📋",
          x: 56,
          y: 58,
          size: 2.2
        }
      ],
      description: "Picture B (a street near a station): a girl is looking at a poster about a beach cleanup. She wants to join it. She is thinking of asking her friend to go with her."
    },
    q1: {
      text: "According to the passage, why do many high school students join local groups?",
      ja: "パッセージによると、多くの高校生はなぜ地元のグループに参加するのですか？",
      modelAnswers: [
        "Because they want to help their town.",
        "They want to help their town."
      ],
      explanation: "3文目の ..., so ~ が答えの目印。so の前が理由（町の役に立ちたい）、後ろが結果（地元グループに参加する）です。Why ~? には Because they ... か They ... で答えます。",
      point: "..., so ~ の前の部分が理由 → Because they ...",
      commonMistakes: [
        "「Because join local groups.」と結果の部分を答える→理由の部分「want to help their town」を答える",
        "「Because they wants ...」→ they には want（三単現の s は付けない）"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is watering some flowers. A girl is digging a hole. A woman is carrying a bag of soil. A man is pushing a cart. An old man is sweeping the ground."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the girl in Picture B. Please describe the situation.",
      ja: "では、イラストBの女の子を見てください。状況を説明してください。",
      modelAnswers: [
        "She found a poster for a beach cleanup, so she wants to join it. She's thinking of asking her friend to go with her.",
        "She wants to join a beach cleanup because she saw a poster. She's thinking of going with her friend."
      ],
      explanation: "「ビーチ清掃のポスターを見ている（状況）」と「友達を誘おうと考えている（吹き出し）」の2点を so や because でつなぎます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "ポスターのことに触れず吹き出しだけ言う→何を見ているかも説明する",
        "「She is thinking ask her friend.」→ be thinking of asking"
      ]
    },
    q4: {
      text: "Do you think more young people will do volunteer work in the future?",
      ja: "今後、ボランティア活動をする若者は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Many young people want to be useful to other people. Also, schools are starting to encourage students to join volunteer activities."
      ],
      modelAnswersNo: [
        "Young people are busy with studying and club activities. Many of them do not have enough time on weekends."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "Some people spend their weekends with their families. Do you often spend time with your family on weekends?",
      ja: "週末を家族と過ごす人もいます。あなたは週末によく家族と過ごしますか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often go shopping with my family on Saturdays. After that, we usually eat lunch at a restaurant."
      ],
      modelAnswersNo: [
        "I usually go to my club activities on weekends. I also like to meet my friends."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-04",
    grade: "pre2",
    title: "Local Festivals",
    japaneseTitle: "地元のお祭り",
    category: "文化",
    level: "basic",
    passage: "Every summer, many towns hold festivals. People wear traditional clothes and enjoy music, dancing, and street food. Visitors from other places come to these festivals, and by doing so they can learn about the town's culture. Festivals also make local people proud of their town.",
    passageJa: "毎年夏に、多くの町がお祭りを開きます。人々は伝統的な服を着て、音楽やダンス、屋台の食べ物を楽しみます。他の地域からの訪問者がこれらのお祭りに来て、そうすることでその町の文化について学ぶことができます。お祭りは地元の人々が町を誇りに思うきっかけにもなります。",
    vocabulary: [
      {
        word: "hold",
        meaning: "開催する"
      },
      {
        word: "traditional",
        meaning: "伝統的な"
      },
      {
        word: "visitor",
        meaning: "訪問者"
      },
      {
        word: "culture",
        meaning: "文化"
      },
      {
        word: "proud of",
        meaning: "~を誇りに思う"
      }
    ],
    scene: {
      background: "street",
      image: "/images/pre2/pre2-04-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🥁",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🍧",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🍜",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📷",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🏮",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a summer festival): five people are doing different things. A boy is beating a drum. A girl is eating shaved ice. A woman is selling fried noodles. A man is taking a picture. An old woman is carrying a lantern."
    },
    sceneB: {
      background: "street",
      image: "/images/pre2/pre2-04-b.png",
      items: [
        {
          emoji: "👦",
          x: 45,
          y: 66,
          size: 4,
          thought: "🍦"
        },
        {
          emoji: "🏮",
          x: 82,
          y: 20,
          size: 2.4
        }
      ],
      description: "Picture B (a festival street): a boy has dropped his ice cream on the ground. He is sad. He is thinking of buying a new one."
    },
    q1: {
      text: "According to the passage, how can visitors learn about the town's culture?",
      ja: "パッセージによると、訪問者はどのようにしてその町の文化について学べますか？",
      modelAnswers: [
        "By coming to the festivals.",
        "They come to the festivals."
      ],
      explanation: "3文目の by doing so が答えの目印。doing so は直前の「お祭りに来る」を指します。come to ~ を coming to ~ に変えて By ~ing の形で答えましょう。",
      point: "by doing so の指す内容 → By ~ing",
      commonMistakes: [
        "「By doing so.」とだけ答える→ doing so の中身を具体的に言う",
        "「By come to the festivals」→ By coming to"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is beating a drum. A girl is eating shaved ice. A woman is selling fried noodles. A man is taking a picture. An old woman is carrying a lantern."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the boy in Picture B. Please describe the situation.",
      ja: "では、イラストBの男の子を見てください。状況を説明してください。",
      modelAnswers: [
        "He dropped his ice cream, so he is sad. He's thinking of buying a new one.",
        "He is sad because his ice cream fell on the ground. He wants to buy a new one."
      ],
      explanation: "「アイスを落とした（状況）」と「新しいのを買おうと考えている（吹き出し）」を so や because でつなぎます。dropped（落とした）が出てこなければ fell on the ground と言い換えられます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「He drop his ice cream.」と過去形にしない→ dropped",
        "悲しい理由を言わず吹き出しだけ→落としたという状況も説明する"
      ]
    },
    q4: {
      text: "Do you think more young people will take part in local festivals in the future?",
      ja: "今後、地元のお祭りに参加する若者は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Festivals are fun and give young people a chance to meet friends. Also, they can learn about their own town."
      ],
      modelAnswersNo: [
        "Many young people prefer to stay at home and play video games. Also, some festivals are held on weekdays."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "These days, many people take a lot of pictures with their smartphones. Do you often take pictures?",
      ja: "最近、スマートフォンでたくさん写真を撮る人が多いです。あなたはよく写真を撮りますか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often take pictures of my friends and food. I like to look at them later with my family."
      ],
      modelAnswersNo: [
        "I do not like to take pictures. I think it is more important to enjoy the moment."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-05",
    grade: "pre2",
    title: "Recycling Clothes",
    japaneseTitle: "服のリサイクル",
    category: "環境",
    level: "standard",
    passage: "Some people throw away clothes after wearing them only a few times. This makes a lot of waste, so some shops now collect old clothes from customers. The shops send the clothes to people in need or make them into new products. Many customers think this is a good idea.",
    passageJa: "数回着ただけで服を捨てる人もいます。これは大量のごみを生むので、今では客から古い服を集める店もあります。店はその服を困っている人々に送ったり、新しい製品に作り変えたりします。多くの客はこれを良い考えだと思っています。",
    vocabulary: [
      {
        word: "throw away",
        meaning: "捨てる"
      },
      {
        word: "collect",
        meaning: "集める"
      },
      {
        word: "customer",
        meaning: "客"
      },
      {
        word: "people in need",
        meaning: "困っている人々"
      },
      {
        word: "product",
        meaning: "製品"
      }
    ],
    scene: {
      background: "shop",
      image: "/images/pre2/pre2-05-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🧥",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🪞",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🧶",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "💴",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🛍️",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a clothing shop): five people are doing different things. A boy is trying on a jacket. A girl is looking in a mirror. A woman is folding a sweater. A man is paying for a shirt. An old woman is carrying a shopping bag."
    },
    sceneB: {
      background: "livingroom",
      image: "/images/pre2/pre2-05-b.png",
      items: [
        {
          emoji: "👩",
          x: 45,
          y: 66,
          size: 4,
          thought: "🛍️"
        },
        {
          emoji: "📦",
          x: 56,
          y: 64,
          size: 2.4
        }
      ],
      description: "Picture B (a bedroom at home): a woman has too many clothes and her closet is full. She is thinking of taking some of them to a shop to give away."
    },
    q1: {
      text: "According to the passage, why do some shops collect old clothes from customers?",
      ja: "パッセージによると、一部の店はなぜ客から古い服を集めるのですか？",
      modelAnswers: [
        "Because throwing away clothes makes a lot of waste.",
        "Because people throw away clothes and it makes a lot of waste."
      ],
      explanation: "2文目の ..., so ~ が答えの目印。so の前の「（服を捨てると）大量のごみが出る」が理由です。This は1文目の内容（服を捨てること）を指すので、答えでは throwing away clothes と具体的に言いましょう。",
      point: "..., so ~ の前が理由。This の中身を具体的に",
      commonMistakes: [
        "「Because this makes a lot of waste.」と This のまま答える→ This の中身を言い換える",
        "「Because they collect old clothes.」と結果を答える→理由（ごみが増えること）を答える"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is trying on a jacket. A girl is looking in a mirror. A woman is folding a sweater. A man is paying for a shirt. An old woman is carrying a shopping bag."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the woman in Picture B. Please describe the situation.",
      ja: "では、イラストBの女性を見てください。状況を説明してください。",
      modelAnswers: [
        "Her closet is full of clothes, so she is thinking of taking some to a shop.",
        "She has too many clothes because she buys a lot. She wants to give some of them away."
      ],
      explanation: "「クローゼットが服でいっぱい（状況）」と「店に持って行こうと考えている（吹き出し）」の2点を so や because でつなぎます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「Her closet is fulling.」→ is full of clothes",
        "吹き出しだけ言って状況が抜ける→なぜ持って行くのかを言う"
      ]
    },
    q4: {
      text: "Do you think more people will buy used clothes in the future?",
      ja: "今後、古着を買う人は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Used clothes are cheaper than new ones. Also, more people are interested in protecting the environment."
      ],
      modelAnswersNo: [
        "Many people want to wear new clothes. Also, some people do not like to wear clothes that other people used."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "Some people like to go shopping with their friends. Do you like shopping with friends?",
      ja: "友達と買い物に行くのが好きな人もいます。あなたは友達と買い物をするのが好きですか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often go to a shopping mall with my friends. We give each other advice about what to buy."
      ],
      modelAnswersNo: [
        "I prefer to shop alone. I can take my time and choose what I really want."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-06",
    grade: "pre2",
    title: "E-books",
    japaneseTitle: "電子書籍",
    category: "テクノロジー",
    level: "standard",
    passage: "More and more people read e-books on tablets and smartphones. They carry hundreds of books in one device, and by doing so they can enjoy reading anywhere. Some people, however, still like paper books very much. They say that turning pages gives them a special feeling.",
    passageJa: "タブレットやスマートフォンで電子書籍を読む人がますます増えています。彼らは1つの機器に何百冊もの本を入れて持ち歩き、そうすることでどこでも読書を楽しめます。しかし、今でも紙の本がとても好きな人もいます。彼らはページをめくることが特別な気持ちにさせてくれると言います。",
    vocabulary: [
      {
        word: "e-book",
        meaning: "電子書籍"
      },
      {
        word: "device",
        meaning: "機器"
      },
      {
        word: "hundreds of",
        meaning: "何百もの"
      },
      {
        word: "paper",
        meaning: "紙の"
      },
      {
        word: "special",
        meaning: "特別な"
      }
    ],
    scene: {
      background: "shop",
      image: "/images/pre2/pre2-06-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📖",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📱",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📚",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🧺",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👴",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📞",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a bookstore): five people are doing different things. A boy is reading a comic book. A woman is using a tablet. A man is putting books on a shelf. A girl is carrying a basket. An old man is talking on the phone."
    },
    sceneB: {
      background: "station",
      image: "/images/pre2/pre2-06-b.png",
      items: [
        {
          emoji: "👨",
          x: 45,
          y: 66,
          size: 4,
          thought: "📱"
        },
        {
          emoji: "🚆",
          x: 78,
          y: 56,
          size: 3
        }
      ],
      description: "Picture B (a train station): a man is waiting for a train, but he left his book at home. He is thinking of reading an e-book on his phone."
    },
    q1: {
      text: "According to the passage, how can people enjoy reading anywhere?",
      ja: "パッセージによると、人々はどのようにしてどこでも読書を楽しめますか？",
      modelAnswers: [
        "By carrying hundreds of books in one device.",
        "They carry hundreds of books in one device."
      ],
      explanation: "2文目の by doing so が答えの目印。doing so は直前の「1つの機器に何百冊もの本を入れて持ち歩く」を指します。carry を carrying にして By ~ing で答えます。",
      point: "by doing so の指す内容 → By ~ing",
      commonMistakes: [
        "「By doing so.」とだけ答える→具体的な中身を言う",
        "「By carry hundreds of books」→ By carrying"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is reading a comic book. A woman is using a tablet. A man is putting books on a shelf. A girl is carrying a basket. An old man is talking on the phone."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the man in Picture B. Please describe the situation.",
      ja: "では、イラストBの男性を見てください。状況を説明してください。",
      modelAnswers: [
        "He left his book at home, so he has nothing to read. He's thinking of reading an e-book on his phone.",
        "He can't read his book because he left it at home. He wants to read an e-book on his smartphone."
      ],
      explanation: "「本を家に忘れた（状況）」と「スマホで電子書籍を読もうと考えている（吹き出し）」を so や because でつなぎます。「忘れた」は left ~ at home で言えます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「He leaves his book at home.」と現在形にする→過去のこと： left",
        "吹き出しだけを言う→本を忘れた状況も説明する"
      ]
    },
    q4: {
      text: "Do you think paper books will become less popular in the future?",
      ja: "今後、紙の本は人気がなくなると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "E-books are cheaper and easier to carry. Also, young people use their smartphones more than books."
      ],
      modelAnswersNo: [
        "Many people love the feeling of paper books. Also, reading on a screen for a long time is bad for their eyes."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "These days, many people enjoy watching videos online. Do you often watch videos?",
      ja: "最近、オンラインで動画を見て楽しむ人が多いです。あなたはよく動画を見ますか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often watch cooking videos on my smartphone. I sometimes try to make the dishes by myself."
      ],
      modelAnswersNo: [
        "I do not watch videos very much. I prefer to read books or listen to music."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-07",
    grade: "pre2",
    title: "Pets in Apartments",
    japaneseTitle: "マンションでのペット",
    category: "生活",
    level: "standard",
    passage: "In Japan, many apartments do not allow pets. Some people want to keep dogs or cats, so they look for apartments that welcome animals. These apartments are often more expensive, but the owners are happy to live with their pets. Pets can make their lives happier.",
    passageJa: "日本では、多くの集合住宅がペットを飼うことを許していません。犬や猫を飼いたい人もいるので、動物を歓迎する住宅を探します。そのような住宅はたいてい家賃が高めですが、飼い主はペットと暮らせて幸せです。ペットは彼らの生活をより幸せにしてくれます。",
    vocabulary: [
      {
        word: "apartment",
        meaning: "マンション、アパート"
      },
      {
        word: "allow",
        meaning: "許可する"
      },
      {
        word: "keep (a pet)",
        meaning: "(ペットを)飼う"
      },
      {
        word: "welcome",
        meaning: "歓迎する"
      },
      {
        word: "expensive",
        meaning: "値段が高い"
      }
    ],
    scene: {
      background: "street",
      image: "/images/pre2/pre2-07-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🐕",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🐈",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "👶",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🚲",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👴",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🚿",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a street in front of an apartment building): five people are doing different things. A boy is walking a dog. A girl is holding a cat. A woman is pushing a baby stroller. A man is riding a bicycle. An old man is watering some flowers."
    },
    sceneB: {
      background: "shop",
      image: "/images/pre2/pre2-07-b.png",
      items: [
        {
          emoji: "👦",
          x: 45,
          y: 66,
          size: 4,
          thought: "🐶"
        },
        {
          emoji: "🐶",
          x: 57,
          y: 66,
          size: 2.2
        }
      ],
      description: "Picture B (a pet shop): a boy is looking at some puppies in a pet shop window. He likes dogs very much. He is thinking of having a puppy of his own."
    },
    q1: {
      text: "According to the passage, why do some people look for apartments that welcome animals?",
      ja: "パッセージによると、動物を歓迎する住宅を探す人がいるのはなぜですか？",
      modelAnswers: [
        "Because they want to keep dogs or cats.",
        "They want to keep dogs or cats."
      ],
      explanation: "2文目の ..., so ~ が答えの目印。so の前の「犬や猫を飼いたい」が理由です。Why ~? には Because they ... か They ... で答えます。",
      point: "..., so ~ の前の部分が理由 → Because they ...",
      commonMistakes: [
        "「Because many apartments do not allow pets.」と1文目を答える→ so の直前の文が理由",
        "「Because they want keep dogs」→ want to keep"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is walking a dog. A girl is holding a cat. A woman is pushing a baby stroller. A man is riding a bicycle. An old man is watering some flowers."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the boy in Picture B. Please describe the situation.",
      ja: "では、イラストBの男の子を見てください。状況を説明してください。",
      modelAnswers: [
        "He likes dogs, so he is looking at some puppies in a pet shop. He's thinking of having a puppy.",
        "He is looking at some puppies in a pet shop because he likes dogs. He wants to have a puppy."
      ],
      explanation: "「ペットショップで子犬を見ている（状況）」と「自分の子犬を飼おうと考えている（吹き出し）」を so や because でつなぎます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「He is looking puppies.」→ looking at",
        "状況だけで吹き出しの内容が抜ける→ He wants to have a puppy も言う"
      ]
    },
    q4: {
      text: "Do you think more apartments will allow pets in the future?",
      ja: "今後、ペットを許可するマンションは増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Many people want to live with pets. Also, apartment owners can get more customers if they allow pets."
      ],
      modelAnswersNo: [
        "Pets can make noise and a bad smell. Also, some people in apartments are afraid of animals."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "These days, many people enjoy cooking at home. Do you like cooking?",
      ja: "最近、家で料理を楽しむ人が多いです。あなたは料理が好きですか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I like making pasta for my family. I often learn new recipes from the Internet."
      ],
      modelAnswersNo: [
        "I am not good at cooking. I usually eat meals that my mother makes."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-08",
    grade: "pre2",
    title: "Fresh Local Food",
    japaneseTitle: "地元の新鮮な食べ物",
    category: "食",
    level: "standard",
    passage: "Many supermarkets now sell vegetables grown near their stores. These vegetables are fresh, and they do not travel far. Shoppers can learn about the farmers who grow them, and by doing so they feel safe about their food. Local farmers are also happy to have more customers.",
    passageJa: "今では、店の近くで育てられた野菜を売るスーパーが増えています。これらの野菜は新鮮で、遠くから運ばれてきません。買い物客はそれを育てた農家について知ることができ、そうすることで食べ物に安心感を持てます。地元の農家もお客が増えて喜んでいます。",
    vocabulary: [
      {
        word: "grow",
        meaning: "育てる"
      },
      {
        word: "fresh",
        meaning: "新鮮な"
      },
      {
        word: "farmer",
        meaning: "農家"
      },
      {
        word: "safe",
        meaning: "安全な、安心な"
      },
      {
        word: "customer",
        meaning: "客"
      }
    ],
    scene: {
      background: "street",
      image: "/images/pre2/pre2-08-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🛒",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🍎",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🥬",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🥕",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "💴",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (an outdoor farmers' market): five people are doing different things. A boy is pushing a shopping cart. A girl is choosing apples. A woman is putting vegetables in a bag. A man is carrying a box of carrots. An old woman is paying money."
    },
    sceneB: {
      background: "kitchen",
      image: "/images/pre2/pre2-08-b.png",
      items: [
        {
          emoji: "👩",
          x: 45,
          y: 66,
          size: 4,
          thought: "🥕"
        },
        {
          emoji: "🧊",
          x: 56,
          y: 62,
          size: 2.6
        }
      ],
      description: "Picture B (a kitchen): a woman wants to cook dinner, but her refrigerator is empty. She is thinking of buying vegetables at the market."
    },
    q1: {
      text: "According to the passage, how do shoppers feel safe about their food?",
      ja: "パッセージによると、買い物客はどのようにして食べ物に安心感を持てますか？",
      modelAnswers: [
        "By learning about the farmers who grow the vegetables.",
        "They learn about the farmers who grow them."
      ],
      explanation: "3文目の by doing so が答えの目印。doing so は直前の「野菜を育てた農家について知る」を指します。them は vegetables のことなので、答えでは the vegetables と言い換えるとより丁寧です。",
      point: "by doing so の指す内容 → By ~ing",
      commonMistakes: [
        "「By doing so.」とだけ答える→具体的な中身を言う",
        "「By learn about the farmers」→ By learning about"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is pushing a shopping cart. A girl is choosing apples. A woman is putting vegetables in a bag. A man is carrying a box of carrots. An old woman is paying money."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the woman in Picture B. Please describe the situation.",
      ja: "では、イラストBの女性を見てください。状況を説明してください。",
      modelAnswers: [
        "Her refrigerator is empty, so she can't cook dinner. She's thinking of buying vegetables at the market.",
        "She wants to cook dinner, but there is no food in her refrigerator. She is thinking of going to the market."
      ],
      explanation: "「冷蔵庫が空（状況）」と「市場で野菜を買おうと考えている（吹き出し）」を so や because でつなぎます。refrigerator が出なければ fridge でも構いません。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「Her refrigerator is empty」だけで終わる→吹き出し（買い物に行く）も言う",
        "「She is thinking buy vegetables.」→ thinking of buying"
      ]
    },
    q4: {
      text: "Do you think more people will buy local food in the future?",
      ja: "今後、地元の食べ物を買う人は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "People care more about their health these days. Also, buying local food helps farmers in their town."
      ],
      modelAnswersNo: [
        "Local food is sometimes more expensive than other food. Also, many people are too busy to go to markets."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "Some people like to eat out at restaurants. Do you often eat out?",
      ja: "レストランで外食するのが好きな人もいます。あなたはよく外食しますか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often eat out with my family on weekends. We especially like to go to Italian restaurants."
      ],
      modelAnswersNo: [
        "I usually eat at home. My mother cooks delicious meals, and eating out is expensive."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-09",
    grade: "pre2",
    title: "School Trips Abroad",
    japaneseTitle: "海外への修学旅行",
    category: "教育",
    level: "challenge",
    passage: "Some high schools take their students on trips abroad. The students stay with local families for a week and visit schools in other countries. They can practice English there, so many students become more interested in studying languages. However, these trips are expensive for some families.",
    passageJa: "生徒を海外旅行に連れて行く高校もあります。生徒は現地の家庭に1週間滞在し、他の国の学校を訪れます。そこで英語を練習できるので、多くの生徒が語学の勉強にもっと興味を持つようになります。しかし、これらの旅行は一部の家庭にとっては費用が高いです。",
    vocabulary: [
      {
        word: "abroad",
        meaning: "海外へ"
      },
      {
        word: "stay with",
        meaning: "~の家に滞在する"
      },
      {
        word: "practice",
        meaning: "練習する"
      },
      {
        word: "language",
        meaning: "言語"
      },
      {
        word: "expensive",
        meaning: "費用が高い"
      }
    ],
    scene: {
      background: "station",
      image: "/images/pre2/pre2-09-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🧳",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🗺️",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🎫",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "⌚",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👴",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📞",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (an airport): five people are doing different things. A boy is pulling a suitcase. A girl is looking at a map. A woman is buying a ticket. A man is looking at his watch. An old man is talking on the phone."
    },
    sceneB: {
      background: "livingroom",
      image: "/images/pre2/pre2-09-b.png",
      items: [
        {
          emoji: "👦",
          x: 45,
          y: 66,
          size: 4,
          thought: "👕"
        },
        {
          emoji: "🧳",
          x: 56,
          y: 66,
          size: 2.6
        }
      ],
      description: "Picture B (a bedroom at home): a boy is packing for a trip abroad, but his suitcase is too full to close. He is thinking of taking out some clothes."
    },
    q1: {
      text: "According to the passage, why do many students become more interested in studying languages?",
      ja: "パッセージによると、多くの生徒が語学の勉強にもっと興味を持つようになるのはなぜですか？",
      modelAnswers: [
        "Because they can practice English there.",
        "They can practice English in other countries."
      ],
      explanation: "3文目の ..., so ~ が答えの目印。so の前の「そこで英語を練習できる」が理由です。there は「滞在先の外国」を指しますが、そのまま there と言っても構いません。",
      point: "..., so ~ の前の部分が理由 → Because they ...",
      commonMistakes: [
        "「Because they become interested.」と結果を答える→理由（英語を練習できる）を答える",
        "「Because they can practicing English」→ can practice（原形）"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is pulling a suitcase. A girl is looking at a map. A woman is buying a ticket. A man is looking at his watch. An old man is talking on the phone."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the boy in Picture B. Please describe the situation.",
      ja: "では、イラストBの男の子を見てください。状況を説明してください。",
      modelAnswers: [
        "His suitcase is too full, so he can't close it. He's thinking of taking out some clothes.",
        "He can't close his suitcase because he has too many clothes in it. He wants to take some of them out."
      ],
      explanation: "「スーツケースがいっぱいで閉まらない（状況）」と「服を何枚か出そうと考えている（吹き出し）」を so や because でつなぎます。too ~（~すぎる）が便利です。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「The suitcase is very full to close.」→ too full to close / so he can't close it",
        "吹き出しの「服を出す」が抜ける→ He's thinking of taking out ... も言う"
      ]
    },
    q4: {
      text: "Do you think more high school students should study abroad?",
      ja: "もっと多くの高校生が留学するべきだと思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Students can learn about other cultures and become more independent. Also, they can improve their English very quickly."
      ],
      modelAnswersNo: [
        "Studying abroad is very expensive for many families. Also, some students may feel lonely and miss their families."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "These days, many people enjoy traveling abroad. Do you want to travel abroad in the future?",
      ja: "最近、海外旅行を楽しむ人が多いです。あなたは将来海外旅行をしたいですか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I want to visit Australia. I would like to see koalas and talk with local people in English."
      ],
      modelAnswersNo: [
        "I prefer to travel in Japan. I think there are many beautiful places that I have not seen yet."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-10",
    grade: "pre2",
    title: "Bicycles in Cities",
    japaneseTitle: "都市での自転車",
    category: "社会",
    level: "challenge",
    passage: "Many cities are trying to make streets safer for bicycles. They build special lanes and ask drivers to be careful. More people choose to ride bikes to work, and by doing so they can save money and stay healthy. However, cyclists must also follow traffic rules.",
    passageJa: "多くの都市が、自転車にとって安全な道にしようとしています。専用レーンを作り、運転手に注意するよう呼びかけています。自転車で通勤することを選ぶ人が増えていて、そうすることでお金を節約し、健康でいられます。しかし、自転車に乗る人も交通ルールを守らなければなりません。",
    vocabulary: [
      {
        word: "lane",
        meaning: "車線、レーン"
      },
      {
        word: "careful",
        meaning: "注意深い"
      },
      {
        word: "save money",
        meaning: "お金を節約する"
      },
      {
        word: "healthy",
        meaning: "健康な"
      },
      {
        word: "traffic rules",
        meaning: "交通ルール"
      }
    ],
    scene: {
      background: "street",
      image: "/images/pre2/pre2-10-a.png",
      items: [
        {
          emoji: "👦",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🚲",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "⛑️",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🔧",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🚦",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🔒",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a city street): five people are doing different things. A boy is riding a bicycle. A girl is putting on a helmet. A woman is fixing a bicycle. A man is waiting for the traffic light. An old woman is locking a bicycle."
    },
    sceneB: {
      background: "street",
      image: "/images/pre2/pre2-10-b.png",
      items: [
        {
          emoji: "👩",
          x: 45,
          y: 66,
          size: 4,
          thought: "🚌"
        },
        {
          emoji: "🚲",
          x: 57,
          y: 68,
          size: 2.6
        }
      ],
      description: "Picture B (a street in front of a house): a woman is looking at her bicycle. The tire is flat, so she cannot ride it. She is thinking of taking a bus to work."
    },
    q1: {
      text: "According to the passage, how can people save money and stay healthy?",
      ja: "パッセージによると、人々はどのようにしてお金を節約し、健康でいられますか？",
      modelAnswers: [
        "By riding bikes to work.",
        "They ride bikes to work."
      ],
      explanation: "3文目の by doing so が答えの目印。doing so は直前の「自転車で通勤する」を指します。ride を riding にして By ~ing で答えます。",
      point: "by doing so の指す内容 → By ~ing",
      commonMistakes: [
        "「By doing so.」とだけ答える→具体的な中身を言う",
        "「By ride bikes to work」→ By riding"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A boy is riding a bicycle. A girl is putting on a helmet. A woman is fixing a bicycle. A man is waiting for the traffic light. An old woman is locking a bicycle."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the woman in Picture B. Please describe the situation.",
      ja: "では、イラストBの女性を見てください。状況を説明してください。",
      modelAnswers: [
        "Her bicycle's tire is flat, so she can't ride it. She's thinking of taking a bus to work.",
        "She can't ride her bicycle because the tire is flat. She wants to take a bus to work."
      ],
      explanation: "「タイヤがパンクしている（状況）」と「バスで行こうと考えている（吹き出し）」を so や because でつなぎます。flat（パンクした）が出なければ broken と言い換えても通じます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「Her bicycle is break.」→ is broken / the tire is flat",
        "吹き出しの「バス」が抜ける→ taking a bus も言う"
      ]
    },
    q4: {
      text: "Do you think more people will use bicycles in cities in the future?",
      ja: "今後、都市で自転車を使う人は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Bicycles do not make air pollution and they are cheap. Also, cities are building more bicycle lanes."
      ],
      modelAnswersNo: [
        "Many people use cars or trains because it is more comfortable. Also, riding a bicycle on rainy days is difficult."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "These days, many people try to stay healthy by exercising. Do you do any sports or exercise regularly?",
      ja: "最近、運動して健康を保とうとする人が多いです。あなたは定期的にスポーツや運動をしていますか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I play tennis with my club members twice a week. It helps me relax after studying."
      ],
      modelAnswersNo: [
        "I am too busy with my homework. But I sometimes walk to school to get some exercise."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-11",
    grade: "pre2",
    title: "Museums with Audio Guides",
    japaneseTitle: "音声ガイドのある美術館",
    category: "文化",
    level: "challenge",
    passage: "Many museums now offer audio guides to visitors. Visitors wear headphones and listen to explanations while they walk around. They can learn at their own speed, so some of them enjoy the art more. However, other visitors say it is hard to talk with their friends.",
    passageJa: "今では訪問者に音声ガイドを提供する美術館が多くあります。訪問者はヘッドホンをつけ、歩き回りながら説明を聞きます。自分のペースで学べるので、芸術をより楽しむ人もいます。しかし、友達と話しにくいと言う訪問者もいます。",
    vocabulary: [
      {
        word: "museum",
        meaning: "美術館、博物館"
      },
      {
        word: "audio guide",
        meaning: "音声ガイド"
      },
      {
        word: "explanation",
        meaning: "説明"
      },
      {
        word: "at one's own speed",
        meaning: "自分のペースで"
      },
      {
        word: "visitor",
        meaning: "訪問者"
      }
    ],
    scene: {
      background: "library",
      image: "/images/pre2/pre2-11-a.png",
      items: [
        {
          emoji: "👧",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🎧",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👦",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🖼️",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📓",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👨",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🗺️",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "[bench]",
          x: 96,
          y: 76,
          size: 2.4
        }
      ],
      description: "Picture A (an art museum): five people are doing different things. A girl is listening with headphones. A boy is looking at a painting. A woman is writing in a notebook. A man is looking at a map. An old woman is sitting on a bench."
    },
    sceneB: {
      background: "library",
      image: "/images/pre2/pre2-11-b.png",
      items: [
        {
          emoji: "👩",
          x: 45,
          y: 66,
          size: 4,
          thought: "🙋"
        },
        {
          emoji: "🎧",
          x: 56,
          y: 60,
          size: 2.2
        }
      ],
      description: "Picture B (a museum hall): a woman cannot hear the audio guide because her headphones are not working. She is thinking of asking a staff member for help."
    },
    q1: {
      text: "According to the passage, why do some visitors enjoy the art more?",
      ja: "パッセージによると、芸術をより楽しむ訪問者がいるのはなぜですか？",
      modelAnswers: [
        "Because they can learn at their own speed.",
        "They can learn at their own speed."
      ],
      explanation: "3文目の ..., so ~ が答えの目印。so の前の「自分のペースで学べる」が理由です。own speed の言い換えは不要で、本文の語句をそのまま使って構いません。",
      point: "..., so ~ の前の部分が理由 → Because they ...",
      commonMistakes: [
        "「Because they enjoy the art more.」と結果を繰り返す→理由（自分のペースで学べる）を答える",
        "「Because they can learn at their speed」→ their own speed"
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A girl is listening with headphones. A boy is looking at a painting. A woman is writing in a notebook. A man is looking at a map. An old woman is sitting on a bench."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the woman in Picture B. Please describe the situation.",
      ja: "では、イラストBの女性を見てください。状況を説明してください。",
      modelAnswers: [
        "Her headphones are not working, so she can't hear the guide. She's thinking of asking a staff member for help.",
        "She can't listen to the audio guide because her headphones are broken. She wants to ask a staff member for help."
      ],
      explanation: "「ヘッドホンが動かなくて音声が聞こえない（状況）」と「係員に助けを求めようと考えている（吹き出し）」を so や because でつなぎます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「Her headphones are not work.」→ are not working",
        "吹き出しの「係員」が抜ける→ a staff member も言う"
      ]
    },
    q4: {
      text: "Do you think more museums will use new technology in the future?",
      ja: "今後、新しい技術を使う美術館は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Technology makes museums more fun, especially for young people. Also, visitors can learn in many languages."
      ],
      modelAnswersNo: [
        "Many people go to museums to see real art. Also, new technology is expensive for small museums."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "Some people enjoy drawing or painting in their free time. Do you like drawing or painting?",
      ja: "余暇に絵を描くのを楽しむ人もいます。あなたは絵を描くのが好きですか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I often draw pictures of my pet cat. I sometimes show them to my friends on social media."
      ],
      modelAnswersNo: [
        "I am not good at drawing. I like listening to music more."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  },
  {
    id: "pre2-12",
    grade: "pre2",
    title: "Working from Home",
    japaneseTitle: "在宅勤務",
    category: "仕事",
    level: "challenge",
    passage: "Many companies in Japan now let their workers work from home. Workers can start work without taking crowded trains, and by doing so they can spend more time with their families. However, some workers feel lonely at home. They miss talking with their coworkers during the day.",
    passageJa: "今では、従業員が自宅で働くことを認める日本の会社が多くあります。従業員は混んだ電車に乗らずに仕事を始められ、そうすることで家族とより多くの時間を過ごせます。しかし、家で孤独を感じる従業員もいます。彼らは日中、同僚と話すことをさみしく思っています。",
    vocabulary: [
      {
        word: "company",
        meaning: "会社"
      },
      {
        word: "worker",
        meaning: "従業員"
      },
      {
        word: "crowded",
        meaning: "混んでいる"
      },
      {
        word: "lonely",
        meaning: "孤独な"
      },
      {
        word: "coworker",
        meaning: "同僚"
      }
    ],
    scene: {
      background: "livingroom",
      image: "/images/pre2/pre2-12-a.png",
      items: [
        {
          emoji: "👨",
          x: 10,
          y: 64,
          size: 3.2
        },
        {
          emoji: "💻",
          x: 17,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👩",
          x: 30,
          y: 64,
          size: 3.2
        },
        {
          emoji: "📞",
          x: 37,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👦",
          x: 50,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🎮",
          x: 57,
          y: 62,
          size: 1.7
        },
        {
          emoji: "👧",
          x: 70,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🧹",
          x: 77,
          y: 66,
          size: 1.7
        },
        {
          emoji: "👵",
          x: 90,
          y: 64,
          size: 3.2
        },
        {
          emoji: "🪴",
          x: 96,
          y: 62,
          size: 1.7
        }
      ],
      description: "Picture A (a house): five people are doing different things. A man is using a laptop. A woman is talking on the phone. A boy is playing a video game. A girl is cleaning the floor. An old woman is watering a plant."
    },
    sceneB: {
      background: "livingroom",
      image: "/images/pre2/pre2-12-b.png",
      items: [
        {
          emoji: "👨",
          x: 45,
          y: 66,
          size: 4,
          thought: "🏢"
        },
        {
          emoji: "💻",
          x: 56,
          y: 64,
          size: 2.2
        }
      ],
      description: "Picture B (a home office): a man is working at his desk at home alone. He feels lonely. He is thinking of going to the office tomorrow to see his coworkers."
    },
    q1: {
      text: "According to the passage, how can workers spend more time with their families?",
      ja: "パッセージによると、従業員はどのようにして家族とより多くの時間を過ごせますか？",
      modelAnswers: [
        "By starting work without taking crowded trains.",
        "They start work without taking crowded trains."
      ],
      explanation: "2文目の by doing so が答えの目印。doing so は直前の「混んだ電車に乗らずに仕事を始める」を指します。start を starting にして By ~ing で答えます。",
      point: "by doing so の指す内容 → By ~ing",
      commonMistakes: [
        "「By doing so.」とだけ答える→具体的な中身を言う",
        "「By start work without ...」→ By starting work without taking ..."
      ]
    },
    q2: {
      text: "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
      ja: "では、イラストAの人々を見てください。彼らはいろいろなことをしています。彼らが何をしているか、できるだけたくさん話してください。",
      modelAnswers: [
        "A man is using a laptop. A woman is talking on the phone. A boy is playing a video game. A girl is cleaning the floor. An old woman is watering a plant."
      ],
      explanation: "5人の動作を1人1文ずつ、A boy is ~ing. の現在進行形で言います。左から順に説明すると抜けが出にくくなります。分からない動作があっても、知っている語で言い換えて5人全員について話しましょう。",
      point: "5人の動作を現在進行形で1文ずつ",
      commonMistakes: [
        "「A boy walks a dog.」と現在形にする→ is walking など現在進行形にする",
        "人数が足りない（3〜4人で止まる）→ 5人全員を説明する",
        "「He is ...」で始めて誰のことか分からない→ A boy / A woman など人物を特定する"
      ]
    },
    q3: {
      text: "Now, look at the man in Picture B. Please describe the situation.",
      ja: "では、イラストBの男性を見てください。状況を説明してください。",
      modelAnswers: [
        "He is working alone at home, so he feels lonely. He's thinking of going to the office tomorrow.",
        "He feels lonely because he is working alone at home. He wants to go to the office to see his coworkers."
      ],
      explanation: "「家で一人で働いてさみしい（状況）」と「明日会社に行こうと考えている（吹き出し）」を so や because でつなぎます。",
      point: "状況 + 吹き出し（so / because でつなぐ）",
      commonMistakes: [
        "「He is lonely」だけで理由が抜ける→一人で働いていることも言う",
        "「He is thinking go to the office.」→ thinking of going"
      ]
    },
    q4: {
      text: "Do you think more companies will let their workers work from home?",
      ja: "今後、従業員の在宅勤務を認める会社は増えると思いますか？",
      followUpYes: "Why?",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "Workers can save time and money by not traveling to the office. Also, many people want to have more free time."
      ],
      modelAnswersNo: [
        "Some jobs cannot be done at home. Also, it is difficult for workers to talk with each other."
      ],
      explanation: "まず Yes / No をはっきり言い、Why? / Why not? には理由を2文で答えます。1文目で主な理由、2文目で具体例や補足（Also, ... / For example, ...）を足すと説得力が上がります。",
      point: "Yes/No → 理由2文（主張＋具体例）",
      commonMistakes: [
        "「Because convenient.」と単語だけで答える→主語と動詞のある文で",
        "理由が1文だけで終わる→ Also, ... で2文目を足す"
      ]
    },
    q5: {
      text: "Some people like to live in big cities. Do you want to live in a big city in the future?",
      ja: "大都市に住むのが好きな人もいます。あなたは将来大都市に住みたいですか？",
      followUpYes: "Please tell me more.",
      followUpNo: "Why not?",
      modelAnswers: [
        "Yes. / No."
      ],
      modelAnswersYes: [
        "I want to live in Tokyo. There are many shops and I can find a good job there."
      ],
      modelAnswersNo: [
        "I prefer to live in the countryside. I like quiet places and fresh air."
      ],
      explanation: "Yes の場合は「何を・いつ・誰と」を具体的に2文で。No の場合は理由と、代わりに何をするのかを言うと自然です。",
      point: "Yes → 具体的な経験2文 / No → 理由2文",
      commonMistakes: [
        "Yes / No だけで止まる→追加質問に2文で答える"
      ]
    }
  }
];
