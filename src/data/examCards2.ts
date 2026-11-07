import type { ExamCard } from '../types';

export const EXAM_CARDS_2: ExamCard[] = [
  {
    id: 'card-25',
    title: 'Fishing',
    japaneseTitle: '釣り',
    category: '趣味',
    level: 'basic',
    passage:
      'Fishing is a popular hobby for many people. They can relax by sitting quietly near the water. Some people cook the fish they catch and enjoy it with their families.',
    passageJa:
      '釣りは多くの人々に人気のある趣味です。水辺で静かに座ることによって、彼らはリラックスすることができます。釣った魚を料理して、家族と一緒に楽しむ人もいます。',
    vocabulary: [
      { word: 'hobby', meaning: '趣味' },
      { word: 'relax', meaning: 'くつろぐ' },
      { word: 'quietly', meaning: '静かに' },
      { word: 'catch', meaning: '捕まえる、釣る' },
    ],
    scene: {
      background: 'beach',
      items: [
        { emoji: '👦', x: 22, y: 68, size: 3.6 },
        { emoji: '🎣', x: 33, y: 64, size: 2.2 },
        { emoji: '🪣', x: 68, y: 80, size: 2 },
        { emoji: '🐟', x: 52, y: 83, size: 1.8 },
        { emoji: '🐟', x: 58, y: 83, size: 1.8 },
        { emoji: '🐟', x: 64, y: 83, size: 1.8 },
        { emoji: '⛵', x: 85, y: 38, size: 2.4 },
        { emoji: '☀️', x: 12, y: 12, size: 2.4 },
      ],
      description:
        'At the seaside, a boy is fishing with a fishing rod. There are three fish on the sand next to a bucket on the right. A sailboat is on the sea in the background and the sun is in the sky.',
    },
    q1: {
      text: 'Please look at the passage. How can people relax?',
      ja: 'パッセージを見てください。人々はどうすればリラックスできますか？',
      modelAnswers: [
        'By sitting quietly near the water.',
        'They can relax by sitting quietly near the water.',
      ],
      explanation:
        '2文目の by sitting ~ が方法を表しています。How で聞かれたら By ~ing で答えます。文で答えるときは、主語の people を they に変えます。',
      point: 'By + ~ing（方法・手段）',
      commonMistakes: [
        '「Because they sit quietly.」と Because で答える→ How には By ~ing で答える',
        '「People can relax ...」と people をそのまま言う→ they にする',
      ],
    },
    q2: {
      text: 'Please look at the picture. How many fish are there next to the bucket?',
      ja: 'イラストを見てください。バケツのそばに魚は何匹いますか？',
      modelAnswers: ['There are three fish.', 'There are three.', 'Three fish.'],
      explanation:
        'バケツのそばの砂の上にいる魚を数えます。3匹です。How many ~ are there? には There are ~. で答えます。fish は単数も複数も同じ形なので fishes にしません。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There are three fishes.」→ fish は複数でも fish',
        '「There is three fish.」→複数なので There are',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the boy doing?',
      ja: 'イラストを見てください。男の子は何をしていますか？',
      modelAnswers: [
        'He is fishing.',
        'He is fishing at the sea.',
        'He is catching fish.',
      ],
      explanation:
        '男の子が釣りざおを持って釣りをしています。人物の動作は He is ~ing. の現在進行形で答えます。the boy は He にします。',
      point: '現在進行形 He is ~ing',
      commonMistakes: [
        '「He fishes.」と現在形で答える→ is fishing の進行形にする',
        '「She is fishing.」と性別を間違える→男の子は He',
      ],
    },
    q4: {
      text: 'What did you do last weekend?',
      ja: 'あなたは先週末、何をしましたか？',
      modelAnswers: [
        'I played soccer with my friends. It was a lot of fun.',
        'I went shopping with my mother. We bought a new bag.',
        'I stayed home and watched TV.',
      ],
      explanation:
        '過去のことを聞かれているので、動詞は過去形で答えます。何をしたか＋ひとこと補足（誰と・どうだったか）を言うと良い答えになります。',
      point: '過去形 I played / I went ...',
      commonMistakes: [
        '「I play soccer.」と現在形で答える→ last weekend は過去なので played にする',
        '「I go shopping.」→ went にする',
      ],
    },
    q5: {
      text: 'Have you ever been fishing?',
      ja: 'あなたは釣りに行ったことがありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Where do you want to go this summer?',
      modelAnswers: [
        'Yes. I went fishing with my father last summer.',
        'No. I want to go to the sea this summer.',
      ],
      modelAnswersYes: [
        'I went to a river with my father last summer. I caught two fish.',
        'I went fishing at the sea. It was very exciting.',
      ],
      modelAnswersNo: [
        'I want to go to Okinawa. I want to swim in the sea.',
        'I want to go camping in the mountains with my family.',
      ],
      explanation:
        'Have you ever ~? は経験を聞く質問です。Yes ならいつ・どこで・誰とを答えます。No なら、追加質問の「どこへ行きたいか」に I want to go to ~. で答えます。',
      point: '経験 Have you ever ~? / want to go to ~',
      commonMistakes: [
        'Yes のあと過去の話なのに現在形で答える→ I went ... と過去形にする',
        'No のあと Where の質問に Because ... と理由で答える→場所を答える',
      ],
    },
  },
  {
    id: 'card-26',
    title: 'Comic Books',
    japaneseTitle: 'マンガ',
    category: '趣味',
    level: 'basic',
    passage:
      'Comic books are popular among many junior high school students. They like them because the stories are funny and the pictures are beautiful. Some students share their comic books with friends after school.',
    passageJa:
      'マンガは多くの中学生に人気があります。物語がおもしろく、絵が美しいので、彼らはマンガが好きです。放課後に友達とマンガを貸し合う生徒もいます。',
    vocabulary: [
      { word: 'comic book', meaning: 'マンガ本' },
      { word: 'popular', meaning: '人気のある' },
      { word: 'funny', meaning: 'おもしろい' },
      { word: 'share', meaning: '分け合う、貸し合う' },
    ],
    scene: {
      background: 'livingroom',
      items: [
        { emoji: '👧', x: 26, y: 68, size: 3.6 },
        { emoji: '📖', x: 36, y: 70, size: 2 },
        { emoji: '🛋️', x: 70, y: 74, size: 4 },
        { emoji: '🐱', x: 70, y: 67, size: 2 },
        { emoji: '🪴', x: 90, y: 72, size: 2.4 },
        { emoji: '🕐', x: 50, y: 18, size: 2 },
        { emoji: '🖼️', x: 82, y: 24, size: 2.2 },
      ],
      description:
        'In a living room, a girl is reading a comic book (an open book in her hands). A cat is sitting on the sofa on the right. There is a plant next to the sofa, a clock on the wall and a picture on the wall.',
    },
    q1: {
      text: 'Please look at the passage. Why do many students like comic books?',
      ja: 'パッセージを見てください。なぜ多くの生徒はマンガが好きなのですか？',
      modelAnswers: [
        'Because the stories are funny and the pictures are beautiful.',
        'Because the stories are funny and the pictures are beautiful in them.',
      ],
      explanation:
        '2文目の because 以降に理由があります。Why には Because で答えます。理由の部分は the stories are funny and the pictures are beautiful とそのまま言えば大丈夫です。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because they like them.」と本文にない理由を言う→ because 以降の内容を使う',
        'funny だけ答えて pictures の部分を落とす→ 2つの理由を両方言う',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the girl doing?',
      ja: 'イラストを見てください。女の子は何をしていますか？',
      modelAnswers: [
        'She is reading a comic book.',
        'She is reading a book.',
        "She's reading.",
      ],
      explanation:
        '女の子が本（マンガ）を読んでいます。人物の動作は She is ~ing ... で答えます。the girl は She にします。',
      point: '現在進行形 She is ~ing',
      commonMistakes: [
        '「He is reading.」と性別を間違える→女の子は She',
        '「She reads a book.」と現在形で答える→ is reading にする',
      ],
    },
    q3: {
      text: 'Please look at the picture. Where is the cat?',
      ja: 'イラストを見てください。猫はどこにいますか？',
      modelAnswers: [
        "It's on the sofa.",
        'It is on the sofa.',
        'The cat is on the sofa.',
      ],
      explanation:
        '猫はソファーの上にいます。場所を聞く Where is ~? には、位置を表す on / under / by などを使って It is on the ~. と答えます。the cat は代名詞の It にします。',
      point: 'Where is ~? / It is on ~.',
      commonMistakes: [
        '「It is in the sofa.」と in を使う→ソファーの上なので on',
        '「She is on the sofa.」と猫を She と言う→動物は普通 It',
      ],
    },
    q4: {
      text: 'What kind of books do you like to read?',
      ja: 'あなたはどんな種類の本を読むのが好きですか？',
      modelAnswers: [
        'I like to read mystery books. They are exciting.',
        'I like comic books. I read them every night.',
        'I like books about animals.',
      ],
      explanation:
        '好きな本の種類を答えて、理由や読む時間などを1文足しましょう。What kind of ~? には種類の名前（mystery, history, comic など）で答えます。',
      point: 'I like to read ~. + 補足',
      commonMistakes: [
        '本のタイトルだけを答えて種類を言わない→ mystery books など種類で答える',
        '「I like read books.」→ like to read または like reading',
      ],
    },
    q5: {
      text: 'Do you often read comic books?',
      ja: 'あなたはよくマンガを読みますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you like to do after dinner?',
      modelAnswers: [
        'Yes. I read comic books every weekend.',
        'No. I usually watch TV after dinner.',
      ],
      modelAnswersYes: [
        'I read them in my room on Sundays. My favorite one is about soccer.',
        'I borrow them from my friends. We talk about the stories.',
      ],
      modelAnswersNo: [
        'I like to listen to music and do my homework.',
        'I usually play video games with my brother.',
      ],
      explanation:
        'まず Yes / No をはっきり答えます。Yes なら好きなマンガやいつ読むかを、No なら夕食後にしたいことを1~2文で答えましょう。',
      point: 'Yes/No + 具体的な答え',
      commonMistakes: [
        'Yes / No だけで止まる→追加質問にも必ず答える',
        'No のあとに「I do not read comic books.」と繰り返すだけで質問に答えない→ After dinner にすることを言う',
      ],
    },
  },
  {
    id: 'card-27',
    title: 'Science Museums',
    japaneseTitle: '科学館',
    category: '科学',
    level: 'basic',
    passage:
      'Science museums are interesting places for children. Visitors can learn about space and animals by touching many exhibits. In the future, more museums will have special events for families.',
    passageJa:
      '科学館は子どもたちにとっておもしろい場所です。多くの展示物にふれることによって、訪問者は宇宙や動物について学ぶことができます。将来、もっと多くの科学館が家族向けの特別なイベントを開くでしょう。',
    vocabulary: [
      { word: 'museum', meaning: '博物館、科学館' },
      { word: 'space', meaning: '宇宙' },
      { word: 'exhibit', meaning: '展示物' },
      { word: 'special', meaning: '特別な' },
    ],
    scene: {
      background: 'classroom',
      items: [
        { emoji: '👦', x: 25, y: 68, size: 3.6, thought: '🔭' },
        { emoji: '🔭', x: 38, y: 72, size: 2.4 },
        { emoji: '🤖', x: 60, y: 72, size: 2.2 },
        { emoji: '🤖', x: 70, y: 72, size: 2.2 },
        { emoji: '🤖', x: 80, y: 72, size: 2.2 },
        { emoji: '🌍', x: 50, y: 20, size: 2.2 },
        { emoji: '⭐', x: 15, y: 20, size: 1.8 },
      ],
      description:
        'In a science museum, a boy is standing next to a telescope and is going to look through it (thought bubble shows a telescope). There are three robots in a row on the right. There is a globe and a star on the wall.',
    },
    q1: {
      text: 'Please look at the passage. How can visitors learn about space and animals?',
      ja: 'パッセージを見てください。訪問者はどうすれば宇宙や動物について学べますか？',
      modelAnswers: [
        'By touching many exhibits.',
        'They can learn about them by touching many exhibits.',
      ],
      explanation:
        '2文目の by touching ~ が方法です。How には By ~ing で答えます。文で答えるなら、visitors は they にします。',
      point: 'By + ~ing（方法・手段）',
      commonMistakes: [
        '「Because they touch many exhibits.」と Because で答える→ How には By ~ing',
        '「Visitors can learn ...」と主語を名詞のまま言う→ they にする',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the boy going to do?',
      ja: 'イラストを見てください。男の子はこれから何をしますか？',
      modelAnswers: [
        'He is going to look through a telescope.',
        'He is going to use a telescope.',
        'He is going to look at the stars.',
      ],
      explanation:
        '男の子の頭の上の吹き出しに望遠鏡が描かれています。これからすることを聞かれたら He is going to ~. で答えます。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「He is looking through a telescope.」と進行形で答える→これから行う動作は going to',
        '「He will looks ...」→ going to のあとは動詞の原形',
      ],
    },
    q3: {
      text: 'Please look at the picture. How many robots are there?',
      ja: 'イラストを見てください。ロボットは何体いますか？',
      modelAnswers: ['There are three robots.', 'There are three.', 'Three robots.'],
      explanation:
        '右側に並んでいるロボットを数えます。3体です。There are ~. で答えます。地球儀や星は数えません。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There is three robots.」→複数なので There are',
        '地球儀や星まで数えて five と答える→ロボットだけ数える',
      ],
    },
    q4: {
      text: 'Where do you want to go this summer?',
      ja: 'あなたはこの夏、どこへ行きたいですか？',
      modelAnswers: [
        'I want to go to the sea. I want to swim with my friends.',
        'I want to go to Hokkaido. I want to eat delicious food.',
        'I want to visit my grandmother. She lives in Kyoto.',
      ],
      explanation:
        '行きたい場所を I want to go to ~. で答え、そこで何をしたいかを1文足しましょう。',
      point: 'I want to go to ~. + I want to ~.',
      commonMistakes: [
        '「I want to go the sea.」と to を抜かす→ go to the sea',
        '場所だけ言って文にしない→ I want to go to ~. と言う',
      ],
    },
    q5: {
      text: 'Have you ever been to a science museum?',
      ja: 'あなたは科学館に行ったことがありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What kind of places do you like to visit?',
      modelAnswers: [
        'Yes. I went there with my class last year.',
        'No. I like to visit zoos.',
      ],
      modelAnswersYes: [
        'I went there on a school trip. I saw a big robot.',
        'I went there with my family. I enjoyed the space show.',
      ],
      modelAnswersNo: [
        'I like to visit zoos. I like to see animals.',
        'I like to visit old temples. They are quiet and beautiful.',
      ],
      explanation:
        'Have you ever been to ~? は経験を聞く質問で、Yes / No で答えます。Yes ならいつ誰と行ったか、No なら好きな場所を答えます。',
      point: '経験 Have you ever been to ~?',
      commonMistakes: [
        '「Yes, I have been there last year.」のように last year と現在完了を一緒に使う→ I went there last year.',
        'No のあとに「Because ...」と理由を言う→好きな場所を答える',
      ],
    },
  },
  {
    id: 'card-28',
    title: 'Aquariums',
    japaneseTitle: '水族館',
    category: '動物',
    level: 'basic',
    passage:
      'Aquariums are popular places for families. Visitors can see colorful fish and dolphins, and many children are excited to see them. Some aquariums have shows, so visitors can enjoy them all day.',
    passageJa:
      '水族館は家族に人気の場所です。訪問者はカラフルな魚やイルカを見ることができ、多くの子どもたちはそれらを見てわくわくします。ショーがある水族館もあるので、訪問者は一日中楽しむことができます。',
    vocabulary: [
      { word: 'aquarium', meaning: '水族館' },
      { word: 'colorful', meaning: 'カラフルな' },
      { word: 'dolphin', meaning: 'イルカ' },
      { word: 'excited', meaning: 'わくわくした' },
    ],
    scene: {
      background: 'zoo',
      items: [
        { emoji: '👩', x: 82, y: 68, size: 3.6 },
        { emoji: '🐢', x: 20, y: 82, size: 2.2 },
        { emoji: '🐢', x: 32, y: 82, size: 2.2 },
        { emoji: '🪑', x: 58, y: 74, size: 3.4 },
        { emoji: '🎒', x: 58, y: 83, size: 1.8 },
        { emoji: '🐬', x: 40, y: 36, size: 2.6 },
        { emoji: '🐠', x: 18, y: 32, size: 2 },
      ],
      description:
        'In an aquarium, a woman is standing on the right. There are two turtles on the floor on the left. A bag is under the bench in the middle. A dolphin and a colorful fish are in the water at the top.',
    },
    q1: {
      text: 'Please look at the passage. What can visitors see at aquariums?',
      ja: 'パッセージを見てください。訪問者は水族館で何を見ることができますか？',
      modelAnswers: [
        'They can see colorful fish and dolphins.',
        'Colorful fish and dolphins.',
      ],
      explanation:
        '2文目に see colorful fish and dolphins とあります。What で聞かれたら、見られるものを答えます。主語の visitors は they にします。',
      point: 'What ~? には「もの」で答える',
      commonMistakes: [
        '「Visitors can see ...」と visitors をそのまま言う→ they にする',
        '「Because they can see colorful fish.」と Because で答える→ What には物を答える',
      ],
    },
    q2: {
      text: 'Please look at the picture. How many turtles are there?',
      ja: 'イラストを見てください。カメは何匹いますか？',
      modelAnswers: ['There are two turtles.', 'There are two.', 'Two turtles.'],
      explanation:
        '左側の床にいるカメを数えます。2匹です。イルカや魚は数えません。How many ~ are there? には There are ~. で答えます。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There is two turtles.」→複数なので There are',
        'イルカや魚まで数えて four と答える→カメだけ数える',
      ],
    },
    q3: {
      text: 'Please look at the picture. Where is the bag?',
      ja: 'イラストを見てください。かばんはどこにありますか？',
      modelAnswers: [
        "It's under the bench.",
        'It is under the bench.',
        'The bag is under the bench.',
      ],
      explanation:
        'かばんはベンチの下にあります。Where is ~? には It is under the ~. のように位置を表す語で答えます。the bag は It にします。',
      point: 'Where is ~? / It is under ~.',
      commonMistakes: [
        '「It is on the bench.」と on を使う→ベンチの下なので under',
        '「They are under the bench.」→かばんは1つなので It is',
      ],
    },
    q4: {
      text: 'What time do you usually get up on weekends?',
      ja: 'あなたは週末、たいてい何時に起きますか？',
      modelAnswers: [
        'I usually get up at eight. I eat breakfast with my family.',
        'I usually get up at nine. I like to sleep a lot.',
        'I get up at seven. I walk my dog.',
      ],
      explanation:
        '時刻を聞かれているので At ~ / I usually get up at ~. で答えます。起きたあとにすることを1文足しましょう。',
      point: 'I usually get up at ~.',
      commonMistakes: [
        '「I usually get up eight.」と at を抜かす→時刻の前は at',
        '「I get up in eight.」→ in ではなく at',
      ],
    },
    q5: {
      text: 'Do you want to visit an aquarium?',
      ja: 'あなたは水族館に行ってみたいですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you want to do this weekend?',
      modelAnswers: [
        'Yes. I want to see dolphins.',
        'No. I want to play soccer this weekend.',
      ],
      modelAnswersYes: [
        'I want to see dolphins and sharks. I like sea animals very much.',
        'I want to go with my family. I want to take many pictures.',
      ],
      modelAnswersNo: [
        'I want to play soccer with my friends.',
        'I want to go shopping with my mother.',
      ],
      explanation:
        'Yes なら見たいものやその理由を、No なら今週末にしたいことを I want to ~. で答えます。',
      point: 'I want to ~.（したいこと）',
      commonMistakes: [
        '「I want go shopping.」と to を抜かす→ want to go',
        'No のあとに行きたくない理由だけを言って質問に答えない→週末にしたいことを言う',
      ],
    },
  },
  {
    id: 'card-29',
    title: 'Movie Theaters',
    japaneseTitle: '映画館',
    category: '趣味',
    level: 'basic',
    passage:
      'Movie theaters are popular places on weekends. People can enjoy the big screen and loud sound there, so movies are more exciting. Some people go with their friends, and others go with their families.',
    passageJa:
      '映画館は週末に人気の場所です。そこでは大きなスクリーンと大きな音を楽しめるので、映画はよりワクワクします。友達と行く人もいれば、家族と行く人もいます。',
    vocabulary: [
      { word: 'screen', meaning: 'スクリーン、画面' },
      { word: 'loud', meaning: '音が大きい' },
      { word: 'sound', meaning: '音' },
      { word: 'exciting', meaning: 'ワクワクする' },
    ],
    scene: {
      background: 'street',
      items: [
        { emoji: '🎬', x: 50, y: 18, size: 2.4 },
        { emoji: '👨', x: 25, y: 68, size: 3.6 },
        { emoji: '🍿', x: 34, y: 70, size: 2 },
        { emoji: '👧', x: 68, y: 68, size: 3.6, thought: '🎟️' },
        { emoji: '🚪', x: 90, y: 58, size: 4 },
      ],
      description:
        'In front of a movie theater, a man is eating popcorn (popcorn in his hand). A girl is standing in front of the entrance and is going to buy a ticket (thought bubble shows a ticket). A door is on the right and a movie sign is on the wall.',
    },
    q1: {
      text: 'Please look at the passage. Why are movies more exciting at movie theaters?',
      ja: 'パッセージを見てください。なぜ映画館では映画がよりワクワクするのですか？',
      modelAnswers: [
        'Because they can enjoy the big screen and loud sound.',
        'Because people can enjoy the big screen and loud sound there.',
      ],
      explanation:
        '2文目の ..., so movies are more exciting の「so」の前が理由です。Why には Because で答え、people は they にします。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「So they can enjoy ...」と So で答える→ Why には Because で答える',
        '「Because people can enjoy ...」と people をそのまま使う→ they にする',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the man doing?',
      ja: 'イラストを見てください。男性は何をしていますか？',
      modelAnswers: [
        'He is eating popcorn.',
        'He is eating some popcorn.',
        "He's eating popcorn.",
      ],
      explanation:
        '左側の男性がポップコーンを食べています。動作は He is ~ing ... で答えます。the man は He にします。',
      point: '現在進行形 He is ~ing',
      commonMistakes: [
        '「He is buying popcorn.」と別の動作を言う→手にしているポップコーンを食べている',
        '「He eats popcorn.」と現在形で答える→ is eating にする',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the girl going to do?',
      ja: 'イラストを見てください。女の子はこれから何をしますか？',
      modelAnswers: [
        'She is going to buy a ticket.',
        'She is going to buy a movie ticket.',
        'She is going to watch a movie.',
      ],
      explanation:
        '女の子の吹き出しにチケットが描かれています。これからすることなので She is going to ~. で答えます。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「She is buying a ticket.」と現在進行形で答える→ going to を使う',
        '「He is going to ...」と男性と間違える→女の子は She',
      ],
    },
    q4: {
      text: 'How do you usually go to school?',
      ja: 'あなたはたいていどうやって学校に行きますか？',
      modelAnswers: [
        'I usually go to school by bike. It takes ten minutes.',
        'I usually walk to school with my friends.',
        'I usually go by train.',
      ],
      explanation:
        '交通手段を聞かれているので by bike / by bus / by train や walk で答えます。かかる時間などを1文足せるとよいです。',
      point: 'by + 乗り物 / walk',
      commonMistakes: [
        '「I go by a bike.」と a をつける→ by bike（冠詞なし）',
        '「I go by walk.」→「歩いて」は on foot か I walk',
      ],
    },
    q5: {
      text: 'Do you often watch movies?',
      ja: 'あなたはよく映画を見ますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you like to do on weekends?',
      modelAnswers: [
        'Yes. I watch movies with my family every month.',
        'No. I like to play basketball on weekends.',
      ],
      modelAnswersYes: [
        'I like action movies. I usually watch them at home with my brother.',
        'I go to the movie theater with my friends. We eat popcorn.',
      ],
      modelAnswersNo: [
        'I like to play basketball with my friends.',
        'I usually study at the library and read books.',
      ],
      explanation:
        'Yes なら好きな映画の種類やいつ誰と見るかを、No なら週末にすることを1~2文で答えます。',
      point: 'Yes/No + 具体的な答え',
      commonMistakes: [
        'Yes / No だけで止まる→追加質問に答える',
        '「I like watch movies.」→ like watching / like to watch',
      ],
    },
  },
  {
    id: 'card-30',
    title: 'Bookstores',
    japaneseTitle: '本屋',
    category: '地域',
    level: 'basic',
    passage:
      'Bookstores are good places to find new books. Customers can find books easily because the staff put them on shelves by type. Some bookstores also sell notebooks and pens.',
    passageJa:
      '本屋は新しい本を見つけるのによい場所です。店員が種類ごとに本を棚に置いているので、お客さんは簡単に本を見つけることができます。ノートやペンを売っている本屋もあります。',
    vocabulary: [
      { word: 'customer', meaning: '客' },
      { word: 'easily', meaning: '簡単に' },
      { word: 'staff', meaning: '店員、スタッフ' },
      { word: 'shelf', meaning: '棚' },
    ],
    scene: {
      background: 'shop',
      items: [
        { emoji: '🚪', x: 88, y: 58, size: 4.2 },
        { emoji: '☂️', x: 80, y: 66, size: 2.2 },
        { emoji: '📕', x: 20, y: 72, size: 2 },
        { emoji: '📕', x: 30, y: 72, size: 2 },
        { emoji: '📕', x: 40, y: 72, size: 2 },
        { emoji: '🪴', x: 10, y: 78, size: 2.4 },
        { emoji: '🕐', x: 55, y: 20, size: 2 },
      ],
      description:
        'Inside a bookstore, an umbrella is standing on the floor next to the door on the right. There are three red books in a row on the left. A plant is at the far left and a clock is on the wall. There are no people in the picture.',
    },
    q1: {
      text: 'Please look at the passage. Why can customers find books easily?',
      ja: 'パッセージを見てください。なぜお客さんは簡単に本を見つけられるのですか？',
      modelAnswers: [
        'Because the staff put books on shelves by type.',
        'Because the staff put them on shelves by type.',
      ],
      explanation:
        '2文目の because 以降が理由です。Why には Because で答えます。聞かれた customers が主語ではなく理由の主語は the staff なので、そのまま使って大丈夫です。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because customers put them on shelves.」と主語を間違える→棚に置くのは the staff',
        '「Because the staff puts ...」と staff を単数扱いして puts にする→ここでは複数扱いで put',
      ],
    },
    q2: {
      text: 'Please look at the picture. Where is the umbrella?',
      ja: 'イラストを見てください。傘はどこにありますか？',
      modelAnswers: [
        "It's next to the door.",
        'It is by the door.',
        'The umbrella is next to the door.',
      ],
      explanation:
        '傘は右側のドアのそばにあります。位置は next to ~ / by ~ で表せます。the umbrella は It にします。',
      point: 'Where is ~? / It is next to ~.',
      commonMistakes: [
        '「It is on the door.」と on を使う→ドアに「かかっている」わけではないので next to / by',
        '「They are next to the door.」→傘は1本なので It is',
      ],
    },
    q3: {
      text: 'Please look at the picture. How many books are there?',
      ja: 'イラストを見てください。本は何冊ありますか？',
      modelAnswers: ['There are three books.', 'There are three.', 'Three books.'],
      explanation:
        '左側に並んでいる赤い本を数えます。3冊です。How many ~ are there? には There are ~. で答えます。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There is three books.」→複数なので There are',
        '「There are three book.」→複数形の books にする',
      ],
    },
    q4: {
      text: 'What kind of books do you want to buy?',
      ja: 'あなたはどんな本を買いたいですか？',
      modelAnswers: [
        'I want to buy a cookbook. I want to make cakes.',
        'I want to buy a comic book. I like funny stories.',
        'I want to buy a book about soccer.',
      ],
      explanation:
        '買いたい本の種類を I want to buy ~. で答え、理由を1文足しましょう。',
      point: 'I want to buy ~.',
      commonMistakes: [
        '「I want buy a book.」と to を抜かす→ want to buy',
        '「I want to buy.」と目的語を言わない→何を買うか言う',
      ],
    },
    q5: {
      text: 'Are you going to go shopping this weekend?',
      ja: 'あなたは今週末、買い物に行く予定ですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What are you going to do this weekend?',
      modelAnswers: [
        'Yes. I am going to buy a new bag.',
        'No. I am going to stay home and study.',
      ],
      modelAnswersYes: [
        'I am going to buy a new bag with my mother. We are going to go to the shopping mall.',
        'I am going to buy shoes. My old shoes are too small.',
      ],
      modelAnswersNo: [
        'I am going to play soccer with my friends.',
        'I am going to visit my grandmother.',
      ],
      explanation:
        'Are you going to ~? には Yes, I am. / No, I am not. のように be going to を使って答えます。追加質問にも I am going to ~. で答えるとよいです。',
      point: 'be going to ~（予定）',
      commonMistakes: [
        '「Yes, I do.」と do で答える→ Are you ~? には am で答える',
        '追加質問に過去形で答える→予定を聞かれているので going to を使う',
      ],
    },
  },
  {
    id: 'card-31',
    title: 'Board Games',
    japaneseTitle: 'ボードゲーム',
    category: '趣味',
    level: 'standard',
    passage:
      'Board games are popular among friends and families. Players can use their brains and talk with each other, so they can have a great time. Some people enjoy playing them on rainy days.',
    passageJa:
      'ボードゲームは友達や家族の間で人気があります。プレイヤーは頭を使い、お互いに話すことができるので、素晴らしい時間を過ごせます。雨の日にそれらを楽しむ人もいます。',
    vocabulary: [
      { word: 'board game', meaning: 'ボードゲーム' },
      { word: 'brain', meaning: '頭脳' },
      { word: 'each other', meaning: 'お互い' },
      { word: 'great', meaning: '素晴らしい' },
    ],
    scene: {
      background: 'livingroom',
      items: [
        { emoji: '👦', x: 24, y: 68, size: 3.6, thought: '♟️' },
        { emoji: '👧', x: 66, y: 68, size: 3.6 },
        { emoji: '🧃', x: 75, y: 70, size: 1.8 },
        { emoji: '🛋️', x: 90, y: 74, size: 3.6 },
        { emoji: '🪟', x: 48, y: 24, size: 3 },
      ],
      description:
        'In a living room, a boy is standing on the left and is going to play chess (thought bubble shows a chess piece). A girl on the right is drinking juice from a juice box. A sofa is on the far right and a window is on the wall.',
    },
    q1: {
      text: 'Please look at the passage. Why can players have a great time?',
      ja: 'パッセージを見てください。なぜプレイヤーは素晴らしい時間を過ごせるのですか？',
      modelAnswers: [
        'Because they can use their brains and talk with each other.',
        'Because they can use their brains and talk to each other.',
      ],
      explanation:
        '2文目の ..., so they can have a great time の前が理由にあたります。Why には Because で答え、players は they にします。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「So they can use their brains.」と So で始める→ Because で答える',
        '「Because players can use ...」と players を言い直す→ they にする',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the boy going to do?',
      ja: 'イラストを見てください。男の子はこれから何をしますか？',
      modelAnswers: [
        'He is going to play chess.',
        'He is going to play a board game.',
        'He is going to play a game.',
      ],
      explanation:
        '男の子の吹き出しにチェスの駒が描かれています。これからすることなので He is going to ~. で答えます。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「He is playing chess.」と進行形で答える→これからの動作は going to',
        '「He is going to plays chess.」→ going to のあとは動詞の原形',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the girl doing?',
      ja: 'イラストを見てください。女の子は何をしていますか？',
      modelAnswers: [
        'She is drinking juice.',
        'She is drinking some juice.',
        "She's drinking juice.",
      ],
      explanation:
        '右側の女の子がジュースを飲んでいます。動作は She is ~ing ... で答えます。the girl は She にします。',
      point: '現在進行形 She is ~ing',
      commonMistakes: [
        '「She is going to drink juice.」と going to で答える→今していることは進行形',
        '「He is drinking juice.」と性別を間違える→女の子は She',
      ],
    },
    q4: {
      text: 'What do you like to do with your friends?',
      ja: 'あなたは友達と何をするのが好きですか？',
      modelAnswers: [
        'I like to play video games with my friends. We have a lot of fun.',
        'I like to play soccer with them after school.',
        'I like to talk and eat snacks.',
      ],
      explanation:
        '友達としたいことを I like to ~. で答えます。どこでするか、どんな気持ちかを1文足すと良い答えになります。',
      point: 'I like to ~. + 補足',
      commonMistakes: [
        '「I like to play with my friends.」だけで何をして遊ぶか言わない→遊びの内容を言う',
        '「I like play soccer.」と to を抜かす→ like to play / like playing',
      ],
    },
    q5: {
      text: 'Do you like playing games?',
      ja: 'あなたはゲームをするのが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you like to do in your free time?',
      modelAnswers: [
        'Yes. I play card games with my family.',
        'No. I like to read books in my free time.',
      ],
      modelAnswersYes: [
        'I play card games with my family on weekends. My father is very strong.',
        'I like video games. I play them with my friends.',
      ],
      modelAnswersNo: [
        'I like to read books and listen to music.',
        'I usually play basketball in the park.',
      ],
      explanation:
        'Yes なら好きなゲームや誰とするかを、No なら暇な時間にすることを答えます。1~2文で具体的に言いましょう。',
      point: 'Yes/No + 具体的な答え',
      commonMistakes: [
        'Yes / No だけで止まる→追加質問に答える',
        '「Yes, I like.」と目的語なしで答える→ Yes, I do. / Yes. I like games.',
      ],
    },
  },
  {
    id: 'card-32',
    title: 'Making Cakes',
    japaneseTitle: 'ケーキ作り',
    category: '食事',
    level: 'standard',
    passage:
      'Many people enjoy making cakes at home. They can make cakes by following easy recipes, and they can decorate them with fruit. Some people give the cakes to their friends as presents.',
    passageJa:
      '多くの人が家でケーキ作りを楽しんでいます。簡単なレシピに従うことでケーキを作ることができ、フルーツで飾ることもできます。友達にプレゼントとしてケーキをあげる人もいます。',
    vocabulary: [
      { word: 'recipe', meaning: 'レシピ' },
      { word: 'follow', meaning: '従う' },
      { word: 'decorate', meaning: '飾る' },
      { word: 'present', meaning: 'プレゼント' },
    ],
    scene: {
      background: 'kitchen',
      items: [
        { emoji: '👧', x: 26, y: 66, size: 3.8, thought: '🍰' },
        { emoji: '🥣', x: 38, y: 72, size: 2 },
        { emoji: '🥚', x: 46, y: 76, size: 1.8 },
        { emoji: '🪑', x: 70, y: 74, size: 3.4 },
        { emoji: '🐱', x: 70, y: 83, size: 2 },
      ],
      description:
        'In a kitchen, a girl is holding a mixing bowl with an egg next to her and is going to make a cake (thought bubble shows a cake). A cat is under the chair in the middle right.',
    },
    q1: {
      text: 'Please look at the passage. How can people make cakes at home?',
      ja: 'パッセージを見てください。人々は家でどうやってケーキを作れますか？',
      modelAnswers: [
        'By following easy recipes.',
        'They can make cakes by following easy recipes.',
      ],
      explanation:
        '2文目の by following ~ が方法です。How には By ~ing で答えます。文で答えるなら people は they にします。',
      point: 'By + ~ing（方法・手段）',
      commonMistakes: [
        '「Because they follow easy recipes.」と Because で答える→ How には By ~ing',
        '「By follow easy recipes.」と動詞を原形のままにする→ by のあとは following',
      ],
    },
    q2: {
      text: 'Please look at the picture. Where is the cat?',
      ja: 'イラストを見てください。猫はどこにいますか？',
      modelAnswers: [
        "It's under the chair.",
        'It is under the chair.',
        'The cat is under the chair.',
      ],
      explanation:
        '猫は椅子の下にいます。Where is ~? には It is under the ~. のように位置を表す語で答えます。the cat は It にします。',
      point: 'Where is ~? / It is under ~.',
      commonMistakes: [
        '「It is on the chair.」と on を使う→椅子の下なので under',
        '「It is in the kitchen.」とざっくり答える→椅子との位置関係を言う',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the girl going to do?',
      ja: 'イラストを見てください。女の子はこれから何をしますか？',
      modelAnswers: [
        'She is going to make a cake.',
        'She is going to bake a cake.',
        'She is going to cook.',
      ],
      explanation:
        '女の子の吹き出しにケーキが描かれ、ボールと卵も置かれています。これからすることなので She is going to ~. で答えます。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「She is making a cake.」と進行形で答える→これからの動作は going to',
        '「She is going to eat a cake.」と食べると答える→作る準備をしている',
      ],
    },
    q4: {
      text: 'What kind of food can you cook?',
      ja: 'あなたはどんな料理が作れますか？',
      modelAnswers: [
        'I can cook curry and rice. I often make it for my family.',
        'I can make omelets. They are easy.',
        'I can make sandwiches.',
      ],
      explanation:
        '作れる料理を I can cook ~. / I can make ~. で答えます。いつ作るかなどを1文足しましょう。',
      point: 'I can cook ~. / I can make ~.',
      commonMistakes: [
        '「I can cooking curry.」→ can のあとは動詞の原形（cook）',
        '「I cannot cook.」だけで終える→作れなくても、作ってみたい料理を言う',
      ],
    },
    q5: {
      text: 'Have you ever made a cake?',
      ja: 'あなたはケーキを作ったことがありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you want to make?',
      modelAnswers: [
        'Yes. I made a cake for my mother last year.',
        'No. I want to make cookies.',
      ],
      modelAnswersYes: [
        'I made a chocolate cake for my mother on her birthday. She was very happy.',
        'I made a cake with my sister. It was a little difficult.',
      ],
      modelAnswersNo: [
        'I want to make cookies. I want to give them to my friends.',
        'I want to make pizza with my family.',
      ],
      explanation:
        'Have you ever ~? は経験を聞く質問です。Yes ならいつ誰のために作ったかを過去形で、No なら作りたいものを I want to make ~. で答えます。',
      point: '経験 Have you ever ~? / 過去形',
      commonMistakes: [
        'Yes のあと過去の話を現在形で言う→ I made ... と過去形にする',
        '「I want make cookies.」と to を抜かす→ want to make',
      ],
    },
  },
  {
    id: 'card-33',
    title: 'Ice Skating',
    japaneseTitle: 'アイススケート',
    category: 'スポーツ',
    level: 'standard',
    passage:
      'Ice skating is a popular winter sport. Beginners can learn quickly because many skating rinks have kind teachers. Some people practice every weekend to skate better.',
    passageJa:
      'アイススケートは人気のあるウィンタースポーツです。多くのスケート場には親切な先生がいるので、初心者はすぐに上達できます。上手に滑るために毎週末練習する人もいます。',
    vocabulary: [
      { word: 'beginner', meaning: '初心者' },
      { word: 'quickly', meaning: 'すばやく、早く' },
      { word: 'rink', meaning: 'スケートリンク' },
      { word: 'practice', meaning: '練習する' },
    ],
    scene: {
      background: 'rink',
      items: [
        { emoji: '👦', x: 28, y: 68, size: 3.6 },
        { emoji: '⛸️', x: 28, y: 82, size: 2 },
        { emoji: '⛄', x: 66, y: 72, size: 2.4 },
        { emoji: '⛄', x: 80, y: 72, size: 2.4 },
        { emoji: '❄️', x: 15, y: 18, size: 1.8 },
        { emoji: '❄️', x: 50, y: 14, size: 1.8 },
      ],
      description:
        'At an ice rink, a boy is ice skating on the ice (ice skates under his feet). There are two snowmen on the right. Snowflakes are in the air at the top.',
    },
    q1: {
      text: 'Please look at the passage. Why can beginners learn quickly?',
      ja: 'パッセージを見てください。なぜ初心者はすぐに上達できるのですか？',
      modelAnswers: [
        'Because many skating rinks have kind teachers.',
        'Because many rinks have kind teachers.',
      ],
      explanation:
        '2文目の because 以降が理由です。Why には Because で答えます。skating rinks は主語ですが、ここは聞かれた beginners と別のものなので、そのまま言って構いません。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because they have kind teachers.」と they を使う→ they が beginners を指すように聞こえるので skating rinks と言う',
        '「Because many skating rinks has kind teachers.」→主語が複数なので have',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the boy doing?',
      ja: 'イラストを見てください。男の子は何をしていますか？',
      modelAnswers: [
        'He is skating.',
        'He is ice skating.',
        "He's skating on the ice.",
      ],
      explanation:
        '男の子はスケート靴をはいて氷の上を滑っています。動作は He is ~ing. で答えます。the boy は He にします。',
      point: '現在進行形 He is ~ing',
      commonMistakes: [
        '「He is skiing.」とスキーと言う→スケートは skating',
        '「He skates.」と現在形で答える→ is skating にする',
      ],
    },
    q3: {
      text: 'Please look at the picture. How many snowmen are there?',
      ja: 'イラストを見てください。雪だるまは何体ありますか？',
      modelAnswers: ['There are two snowmen.', 'There are two.', 'Two snowmen.'],
      explanation:
        '右側にある雪だるまを数えます。2体です。snowman の複数形は snowmen です。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There are two snowmans.」→ snowman の複数形は snowmen',
        '雪の結晶まで数えて four と答える→雪だるまだけ数える',
      ],
    },
    q4: {
      text: 'What did you do last winter vacation?',
      ja: 'あなたは去年の冬休みに何をしましたか？',
      modelAnswers: [
        'I visited my grandparents. We ate a lot of food.',
        'I went skiing with my family.',
        'I stayed home and played video games.',
      ],
      explanation:
        '過去のことを聞かれているので過去形で答えます。何をしたか、誰とか、どうだったかを1文足しましょう。',
      point: '過去形 I visited / I went ...',
      commonMistakes: [
        '「I go skiing with my family.」と現在形で答える→ went にする',
        '「I did ski.」と did を使う→ I went skiing.',
      ],
    },
    q5: {
      text: 'Do you like winter sports?',
      ja: 'あなたはウィンタースポーツが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you like to do in winter?',
      modelAnswers: [
        'Yes. I like skiing very much.',
        'No. I like to stay home and read books in winter.',
      ],
      modelAnswersYes: [
        'I go skiing with my family every January. It is really exciting.',
        'I like snowboarding. I want to be good at it.',
      ],
      modelAnswersNo: [
        'I like to stay home and play games with my sister.',
        'I like to eat hot food with my family.',
      ],
      explanation:
        'Yes ならどのスポーツをいつするかを、No なら冬にしたいことを答えます。1~2文で具体的に言いましょう。',
      point: 'Yes/No + 具体的な答え',
      commonMistakes: [
        'Yes / No だけで止まる→追加質問に答える',
        '「I like ski.」→動詞をそのまま使わず like skiing にする',
      ],
    },
  },
  {
    id: 'card-34',
    title: 'Picnics',
    japaneseTitle: 'ピクニック',
    category: '季節・行事',
    level: 'standard',
    passage:
      'Picnics are a nice way to enjoy spring. Families can eat lunch outside and play games together on the grass. Many people make sandwiches the day before because they want to start early.',
    passageJa:
      'ピクニックは春を楽しむ素敵な方法です。家族は外で昼食を食べ、芝生の上で一緒にゲームをすることができます。早く出発したいので、前の日にサンドイッチを作る人がたくさんいます。',
    vocabulary: [
      { word: 'picnic', meaning: 'ピクニック' },
      { word: 'outside', meaning: '外で' },
      { word: 'grass', meaning: '芝生、草' },
      { word: 'the day before', meaning: '前の日に' },
    ],
    scene: {
      background: 'park',
      items: [
        { emoji: '👧', x: 24, y: 68, size: 3.6, thought: '🪁' },
        { emoji: '🧺', x: 62, y: 76, size: 2.4 },
        { emoji: '🥪', x: 48, y: 82, size: 1.8 },
        { emoji: '🥪', x: 54, y: 82, size: 1.8 },
        { emoji: '🥪', x: 60, y: 84, size: 1.8 },
        { emoji: '🌳', x: 90, y: 45, size: 5 },
        { emoji: '☀️', x: 12, y: 12, size: 2.4 },
      ],
      description:
        'In a park, a girl is standing on the grass and is going to fly a kite (thought bubble shows a kite). There is a picnic basket in the middle and there are three sandwiches on the grass next to the basket. A tree is on the right and the sun is in the sky.',
    },
    q1: {
      text: 'Please look at the passage. Why do many people make sandwiches the day before?',
      ja: 'パッセージを見てください。なぜ多くの人は前の日にサンドイッチを作るのですか？',
      modelAnswers: [
        'Because they want to start early.',
        'They want to start early.',
      ],
      explanation:
        '3文目の because 以降が理由です。Why には Because で答えます。many people は they にします。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because many people want to start early.」と主語を名詞のまま答える→ they にする',
        '「Because they want start early.」→ want to start と to を入れる',
      ],
    },
    q2: {
      text: 'Please look at the picture. How many sandwiches are there?',
      ja: 'イラストを見てください。サンドイッチは何個ありますか？',
      modelAnswers: [
        'There are three sandwiches.',
        'There are three.',
        'Three sandwiches.',
      ],
      explanation:
        'バスケットのそばの芝生にあるサンドイッチを数えます。3個です。バスケットは数えません。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There are three sandwich.」→複数形の sandwiches にする',
        'バスケットまで数えて four と答える→サンドイッチだけ数える',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the girl going to do?',
      ja: 'イラストを見てください。女の子はこれから何をしますか？',
      modelAnswers: [
        'She is going to fly a kite.',
        'She is going to play with a kite.',
        'She is going to fly her kite.',
      ],
      explanation:
        '女の子の吹き出しに凧が描かれています。これからすることなので She is going to ~. で答えます。凧をあげるは fly a kite です。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「She is flying a kite.」と進行形で答える→これからの動作は going to',
        '「She is going to play a kite.」→凧は play ではなく fly',
      ],
    },
    q4: {
      text: 'Where do you want to go this spring?',
      ja: 'あなたはこの春、どこに行きたいですか？',
      modelAnswers: [
        'I want to go to a park. I want to eat lunch outside.',
        'I want to go to Kyoto. I want to see cherry blossoms.',
        'I want to go to the mountains with my family.',
      ],
      explanation:
        '行きたい場所を I want to go to ~. で答え、そこでしたいことを1文足しましょう。',
      point: 'I want to go to ~. + I want to ~.',
      commonMistakes: [
        '「I want to go to there.」→ there の前に to は不要',
        '場所だけ言って文にしない→ I want to go to ~. と言う',
      ],
    },
    q5: {
      text: 'Have you ever gone on a picnic?',
      ja: 'あなたはピクニックに行ったことがありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Where do you want to go with your family?',
      modelAnswers: [
        'Yes. I went on a picnic with my family last spring.',
        'No. I want to go to a lake with my family.',
      ],
      modelAnswersYes: [
        'I went to a big park with my family. We ate sandwiches under a tree.',
        'I went on a picnic with my class. We played games.',
      ],
      modelAnswersNo: [
        'I want to go to a lake. I want to eat lunch there.',
        'I want to go to the mountains and see beautiful flowers.',
      ],
      explanation:
        'Have you ever ~? は経験を聞く質問です。Yes ならいつどこへ誰と行ったかを過去形で、No なら家族と行きたい場所を答えます。',
      point: '経験 Have you ever ~? / 過去形',
      commonMistakes: [
        'Yes のあと過去の話を現在形で言う→ I went ... と過去形にする',
        'No のあとに行きたい場所を言わず Because ... と言う→ Where には場所を答える',
      ],
    },
  },
  {
    id: 'card-35',
    title: 'Hot Springs',
    japaneseTitle: '温泉',
    category: '旅行',
    level: 'standard',
    passage:
      'Hot springs are popular among tourists. They can relax in the warm water and see beautiful mountains. Some towns have free foot baths, so tourists can enjoy hot springs easily.',
    passageJa:
      '温泉は観光客に人気があります。温かいお湯でくつろぎ、美しい山々を見ることができます。無料の足湯がある町もあるので、観光客は簡単に温泉を楽しめます。',
    vocabulary: [
      { word: 'hot spring', meaning: '温泉' },
      { word: 'tourist', meaning: '観光客' },
      { word: 'warm', meaning: '温かい' },
      { word: 'foot bath', meaning: '足湯' },
    ],
    scene: {
      background: 'mountain',
      items: [
        { emoji: '👨', x: 24, y: 68, size: 3.6, thought: '🛁' },
        { emoji: '♨️', x: 40, y: 72, size: 2.4 },
        { emoji: '🪨', x: 70, y: 77, size: 3 },
        { emoji: '🐱', x: 70, y: 69, size: 2 },
        { emoji: '🌲', x: 90, y: 50, size: 4.5 },
      ],
      description:
        'In the mountains, a man is standing next to a hot spring sign and is going to take a bath (thought bubble shows a bathtub). A cat is sitting on a big rock in the middle right. A tree is on the far right.',
    },
    q1: {
      text: 'Please look at the passage. Why can tourists enjoy hot springs easily in some towns?',
      ja: 'パッセージを見てください。なぜ一部の町では観光客は簡単に温泉を楽しめるのですか？',
      modelAnswers: [
        'Because they have free foot baths.',
        'Because some towns have free foot baths.',
      ],
      explanation:
        '3文目の ..., so tourists can enjoy ... の前が理由です。Why には Because で答え、some towns は they に言い換えます。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「So they have free foot baths.」と So で始める→ Why には Because',
        '「Because they has free foot baths.」→ they には have',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the man going to do?',
      ja: 'イラストを見てください。男性はこれから何をしますか？',
      modelAnswers: [
        'He is going to take a bath.',
        'He is going to take a hot spring bath.',
        'He is going to take a hot bath.',
      ],
      explanation:
        '男性の吹き出しに浴槽が描かれ、そばに温泉のマークがあります。これからすることなので He is going to ~. で答えます。「お風呂に入る」は take a bath です。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「He is taking a bath.」と進行形で答える→これからの動作は going to',
        '「He is going to enter a bath.」→「入浴する」は take a bath',
      ],
    },
    q3: {
      text: 'Please look at the picture. Where is the cat?',
      ja: 'イラストを見てください。猫はどこにいますか？',
      modelAnswers: [
        "It's on the rock.",
        'It is on the rock.',
        'The cat is on the rock.',
      ],
      explanation:
        '猫は大きな岩の上に座っています。位置は on で表します。the cat は It にします。',
      point: 'Where is ~? / It is on ~.',
      commonMistakes: [
        '「It is under the rock.」と under を使う→岩の上なので on',
        '「It is in the rock.」と in を使う→岩の中ではなく on',
      ],
    },
    q4: {
      text: 'What time do you usually take a bath?',
      ja: 'あなたはたいてい何時にお風呂に入りますか？',
      modelAnswers: [
        'I usually take a bath at nine. I feel very relaxed.',
        'I take a bath at eight after dinner.',
        'I usually take a bath at seven thirty.',
      ],
      explanation:
        '時刻を聞かれているので I usually take a bath at ~. で答えます。そのあとにすることなどを1文足しましょう。',
      point: 'I usually take a bath at ~.',
      commonMistakes: [
        '「I usually take a bath in nine.」→時刻の前は at',
        '「I take a bath nine.」と at を抜かす→ at nine',
      ],
    },
    q5: {
      text: 'Have you ever been to a hot spring?',
      ja: 'あなたは温泉に行ったことがありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'Where do you want to go on your next vacation?',
      modelAnswers: [
        'Yes. I went to a hot spring with my family last winter.',
        'No. I want to go to Hokkaido.',
      ],
      modelAnswersYes: [
        'I went to a hot spring in Hakone last winter. The water was very warm.',
        'I went with my grandparents. We ate delicious food there.',
      ],
      modelAnswersNo: [
        'I want to go to Okinawa. I want to swim in the sea.',
        'I want to go to Kyoto and visit old temples.',
      ],
      explanation:
        'Have you ever been to ~? は経験を聞く質問です。Yes なら過去形で行ったときのことを、No なら次の休みに行きたい場所を答えます。',
      point: '経験 Have you ever been to ~?',
      commonMistakes: [
        '「Yes, I have been there last winter.」と last winter と現在完了を一緒に使う→ I went there last winter.',
        'No のあと「I do not like.」だけで場所を答えない→ Where には場所を答える',
      ],
    },
  },
  {
    id: 'card-36',
    title: 'English Camps',
    japaneseTitle: '英語キャンプ',
    category: '学校生活',
    level: 'challenge',
    passage:
      'English camps are becoming popular among junior high school students. Participants speak only English for three days, so they can improve their speaking skills. In the future, more schools will hold these camps.',
    passageJa:
      '英語キャンプは中学生の間で人気になってきています。参加者は3日間英語だけを話すので、スピーキング力を伸ばすことができます。将来、もっと多くの学校がこのキャンプを開くでしょう。',
    vocabulary: [
      { word: 'participant', meaning: '参加者' },
      { word: 'improve', meaning: '上達させる、向上させる' },
      { word: 'skill', meaning: '技能、力' },
      { word: 'hold', meaning: '開催する' },
    ],
    scene: {
      background: 'classroom',
      items: [
        { emoji: '👦', x: 25, y: 68, size: 3.6 },
        { emoji: '📖', x: 35, y: 70, size: 2 },
        { emoji: '🪑', x: 70, y: 76, size: 3.4 },
        { emoji: '🎒', x: 70, y: 68, size: 1.8 },
        { emoji: '🌍', x: 50, y: 20, size: 2.2 },
        { emoji: '🕐', x: 15, y: 20, size: 2 },
      ],
      description:
        'In a classroom, a boy is reading a book (an open book in his hands). A school bag is on a chair on the right. A globe and a clock are on the wall.',
    },
    q1: {
      text: 'Please look at the passage. Why can participants improve their speaking skills?',
      ja: 'パッセージを見てください。なぜ参加者はスピーキング力を伸ばせるのですか？',
      modelAnswers: [
        'Because they speak only English for three days.',
        'They speak only English for three days.',
      ],
      explanation:
        '2文目の ..., so they can improve ... の前が理由です。Why には Because で答えます。participants は they にします。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「So they speak only English.」と So で答える→ Why には Because',
        '「Because participants speak ...」と participants を言い直す→ they にする',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the boy doing?',
      ja: 'イラストを見てください。男の子は何をしていますか？',
      modelAnswers: [
        'He is reading a book.',
        'He is reading an English book.',
        "He's reading.",
      ],
      explanation:
        '男の子が本を開いて読んでいます。動作は He is ~ing ... で答えます。the boy は He にします。',
      point: '現在進行形 He is ~ing',
      commonMistakes: [
        '「He is writing a book.」と write を使う→読んでいるので reading',
        '「He reads a book.」と現在形で答える→ is reading にする',
      ],
    },
    q3: {
      text: 'Please look at the picture. Where is the bag?',
      ja: 'イラストを見てください。かばんはどこにありますか？',
      modelAnswers: [
        "It's on the chair.",
        'It is on the chair.',
        'The bag is on the chair.',
      ],
      explanation:
        'かばんは右側の椅子の上に置かれています。位置は on で表します。the bag は It にします。',
      point: 'Where is ~? / It is on ~.',
      commonMistakes: [
        '「It is under the chair.」と under を使う→椅子の上なので on',
        '「It is in the chair.」と in を使う→ on にする',
      ],
    },
    q4: {
      text: 'What subject do you like the best?',
      ja: 'あなたはどの教科がいちばん好きですか？',
      modelAnswers: [
        'I like English the best. I enjoy talking with my English teacher.',
        'I like math the best. It is interesting.',
        'I like P.E. the best. I love sports.',
      ],
      explanation:
        '好きな教科を I like ~ the best. で答え、理由を1文足しましょう。',
      point: 'I like ~ the best. + 理由',
      commonMistakes: [
        '「I like English best of all subjects.」のように長くして文法を崩す→ I like English the best. とシンプルに',
        '教科名だけで答える→文で答え、理由を足す',
      ],
    },
    q5: {
      text: 'Do you want to live in another country in the future?',
      ja: 'あなたは将来、ほかの国に住みたいですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you want to do in the future?',
      modelAnswers: [
        'Yes. I want to live in Canada.',
        'No. I want to be a teacher in Japan.',
      ],
      modelAnswersYes: [
        'I want to live in Canada. I want to make friends from many countries.',
        'I want to live in Australia. I like koalas and the sea.',
      ],
      modelAnswersNo: [
        'I want to be a teacher in my town.',
        'I want to work at a hospital and help sick people.',
      ],
      explanation:
        'Yes なら住みたい国と理由を、No なら将来したいことを I want to ~. で答えます。',
      point: 'I want to ~.（したいこと）',
      commonMistakes: [
        '「I want live in Canada.」と to を抜かす→ want to live',
        'No のあとに将来の夢ではなく現在のことを答える→ in the future についてのことを言う',
      ],
    },
  },
  {
    id: 'card-37',
    title: 'Art Club',
    japaneseTitle: '美術部',
    category: '学校生活',
    level: 'challenge',
    passage:
      'Many students join the art club at junior high school. They enjoy it because they can draw anything they like. Some members paint pictures of nature, and others make posters for school events.',
    passageJa:
      '多くの生徒が中学校の美術部に入ります。好きなものを何でも描けるので、彼らは美術部を楽しんでいます。自然の絵を描く部員もいれば、学校行事のポスターを作る部員もいます。',
    vocabulary: [
      { word: 'join', meaning: '入る、参加する' },
      { word: 'draw', meaning: '描く' },
      { word: 'paint', meaning: '絵の具で描く' },
      { word: 'poster', meaning: 'ポスター' },
    ],
    scene: {
      background: 'classroom',
      items: [
        { emoji: '🖼️', x: 20, y: 22, size: 2.4 },
        { emoji: '🖼️', x: 38, y: 22, size: 2.4 },
        { emoji: '🖼️', x: 56, y: 22, size: 2.4 },
        { emoji: '👧', x: 30, y: 68, size: 3.6 },
        { emoji: '🎨', x: 42, y: 72, size: 2 },
        { emoji: '🖌️', x: 39, y: 64, size: 1.8 },
        { emoji: '🪴', x: 88, y: 76, size: 2.4 },
      ],
      description:
        'In an art room, there are three framed pictures on the wall at the top. A girl is painting a picture (holding a paintbrush next to a paint palette). A plant is on the far right.',
    },
    q1: {
      text: 'Please look at the passage. Why do many students enjoy the art club?',
      ja: 'パッセージを見てください。なぜ多くの生徒は美術部を楽しんでいるのですか？',
      modelAnswers: [
        'Because they can draw anything they like.',
        'They can draw anything they like.',
      ],
      explanation:
        '2文目の because 以降が理由です。Why には Because で答えます。they は多くの生徒を指します。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because many students can draw ...」と名詞のまま言う→ they にする',
        '「Because they can draw anything they likes.」→ they には like',
      ],
    },
    q2: {
      text: 'Please look at the picture. How many pictures are there on the wall?',
      ja: 'イラストを見てください。壁に絵は何枚ありますか？',
      modelAnswers: [
        'There are three pictures.',
        'There are three.',
        'Three pictures.',
      ],
      explanation:
        '壁にかかっている額に入った絵を数えます。3枚です。女の子が描いている絵は数えません。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There is three pictures.」→複数なので There are',
        '女の子が描いている絵まで数えて four と答える→壁にある絵だけ数える',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the girl doing?',
      ja: 'イラストを見てください。女の子は何をしていますか？',
      modelAnswers: [
        'She is painting a picture.',
        'She is drawing a picture.',
        "She's painting.",
      ],
      explanation:
        '女の子が筆を持って絵を描いています。動作は She is ~ing ... で答えます。the girl は She にします。',
      point: '現在進行形 She is ~ing',
      commonMistakes: [
        '「She is going to paint a picture.」と going to で答える→今していることは進行形',
        '「She paints a picture.」と現在形で答える→ is painting にする',
      ],
    },
    q4: {
      text: 'What kind of pictures do you like?',
      ja: 'あなたはどんな絵が好きですか？',
      modelAnswers: [
        'I like pictures of animals. They are cute.',
        'I like pictures of mountains. They are beautiful.',
        'I like comic pictures.',
      ],
      explanation:
        '好きな絵の種類を I like pictures of ~. で答え、理由を1文足しましょう。',
      point: 'I like pictures of ~.',
      commonMistakes: [
        '「I like picture of animals.」→複数形 pictures にする',
        '絵の種類でなく好きな画家の名前だけ答える→どんな絵かを説明する',
      ],
    },
    q5: {
      text: 'Do you like drawing pictures?',
      ja: 'あなたは絵を描くのが好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you like to do at school?',
      modelAnswers: [
        'Yes. I often draw pictures of my cat.',
        'No. I like to play soccer at school.',
      ],
      modelAnswersYes: [
        'I often draw pictures of my cat. I want to be a good artist.',
        'I draw pictures in my free time. My friends say they are nice.',
      ],
      modelAnswersNo: [
        'I like to play soccer with my friends at school.',
        'I like to read books in the library.',
      ],
      explanation:
        'Yes ならどんな絵をいつ描くかを、No なら学校でしたいことを答えます。1~2文で具体的に言いましょう。',
      point: 'Yes/No + 具体的な答え',
      commonMistakes: [
        'Yes / No だけで止まる→追加質問に答える',
        '「I like draw pictures.」→ like drawing / like to draw',
      ],
    },
  },
  {
    id: 'card-38',
    title: 'Flower Shops',
    japaneseTitle: '花屋',
    category: '地域',
    level: 'challenge',
    passage:
      'Flower shops are busy in spring. Many customers buy flowers for their mothers or teachers because they want to say thank you. Some shops also teach people how to make flower arrangements.',
    passageJa:
      '花屋は春に忙しくなります。ありがとうと伝えたいので、多くのお客さんは母親や先生のために花を買います。フラワーアレンジメントの作り方を教える店もあります。',
    vocabulary: [
      { word: 'customer', meaning: '客' },
      { word: 'busy', meaning: '忙しい' },
      { word: 'thank you', meaning: 'ありがとう' },
      { word: 'arrangement', meaning: 'アレンジメント、飾り付け' },
    ],
    scene: {
      background: 'shop',
      items: [
        { emoji: '🚪', x: 10, y: 58, size: 4 },
        { emoji: '🪣', x: 22, y: 80, size: 2 },
        { emoji: '👩', x: 45, y: 68, size: 3.8 },
        { emoji: '💐', x: 55, y: 70, size: 2.2 },
        { emoji: '🌷', x: 72, y: 74, size: 2 },
        { emoji: '🌻', x: 80, y: 74, size: 2 },
        { emoji: '🌹', x: 88, y: 74, size: 2 },
      ],
      description:
        'In a flower shop, a woman is making a bouquet (holding a bunch of flowers). A bucket is on the floor next to the door on the left. A tulip, a sunflower and a rose are in a row on the right.',
    },
    q1: {
      text: 'Please look at the passage. Why do many customers buy flowers?',
      ja: 'パッセージを見てください。なぜ多くのお客さんは花を買うのですか？',
      modelAnswers: [
        'Because they want to say thank you.',
        'They want to say thank you.',
      ],
      explanation:
        '2文目の because 以降が理由です。Why には Because で答えます。many customers は they にします。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because many customers want to say thank you.」と名詞のまま言う→ they にする',
        '「Because they want to say thanks you.」→ say thank you',
      ],
    },
    q2: {
      text: 'Please look at the picture. Where is the bucket?',
      ja: 'イラストを見てください。バケツはどこにありますか？',
      modelAnswers: [
        "It's next to the door.",
        'It is by the door.',
        'The bucket is next to the door.',
      ],
      explanation:
        'バケツは左側のドアのそばにあります。位置は next to ~ / by ~ で表します。the bucket は It にします。',
      point: 'Where is ~? / It is next to ~.',
      commonMistakes: [
        '「It is on the door.」と on を使う→ドアのそばなので next to / by',
        '「It is near.」だけで何の近くか言わない→ the door を言う',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the woman doing?',
      ja: 'イラストを見てください。女性は何をしていますか？',
      modelAnswers: [
        'She is making a bouquet.',
        'She is holding flowers.',
        'She is making flower arrangements.',
      ],
      explanation:
        '女性が花束を持って花を作っています。動作は She is ~ing ... で答えます。the woman は She にします。',
      point: '現在進行形 She is ~ing',
      commonMistakes: [
        '「She is buying flowers.」と客のように言う→店の人が花束を作っている',
        '「She makes a bouquet.」と現在形で答える→ is making にする',
      ],
    },
    q4: {
      text: 'What kind of flowers do you like?',
      ja: 'あなたはどんな花が好きですか？',
      modelAnswers: [
        'I like roses. They are beautiful and smell good.',
        'I like sunflowers. They are big and bright.',
        'I like cherry blossoms. I see them every spring.',
      ],
      explanation:
        '好きな花を答えて、理由を1文足しましょう。複数の花を言うときは roses のように s をつけます。',
      point: 'I like ~. + 理由',
      commonMistakes: [
        '「I like rose.」→複数形 roses にする',
        '花の名前だけで終える→文で答えて理由を足す',
      ],
    },
    q5: {
      text: 'Do you have any plants at home?',
      ja: 'あなたの家には植物がありますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What kind of plants do you want to have?',
      modelAnswers: [
        'Yes. We have some flowers in our garden.',
        'No. I want to have a small cactus.',
      ],
      modelAnswersYes: [
        'We have roses in our garden. My mother takes care of them every morning.',
        'I have a small plant in my room. I give it water every day.',
      ],
      modelAnswersNo: [
        'I want to have a small cactus. It is easy to take care of.',
        'I want to have sunflowers in my room.',
      ],
      explanation:
        'Yes ならどんな植物か、誰が世話をしているかを、No なら欲しい植物を I want to have ~. で答えます。',
      point: 'We have ~. / I want to have ~.',
      commonMistakes: [
        '「Yes, I have.」と have だけで答える→ Yes, I do. / Yes. We have ...',
        '「I want have a plant.」と to を抜かす→ want to have',
      ],
    },
  },
  {
    id: 'card-39',
    title: 'The Rainy Season',
    japaneseTitle: '梅雨',
    category: '季節・行事',
    level: 'challenge',
    passage:
      'The rainy season starts in June in many parts of Japan. People use umbrellas and raincoats because they want to stay dry. Some people do not like the rain, but others enjoy the beautiful flowers.',
    passageJa:
      '日本の多くの地域で、梅雨は6月に始まります。ぬれたくないので、人々は傘やレインコートを使います。雨を好まない人もいれば、美しい花を楽しむ人もいます。',
    vocabulary: [
      { word: 'rainy season', meaning: '梅雨、雨期' },
      { word: 'umbrella', meaning: '傘' },
      { word: 'raincoat', meaning: 'レインコート' },
      { word: 'dry', meaning: '乾いた、ぬれていない' },
    ],
    scene: {
      background: 'street',
      items: [
        { emoji: '👧', x: 28, y: 68, size: 3.6, thought: '☂️' },
        { emoji: '🐸', x: 52, y: 83, size: 1.8 },
        { emoji: '🐸', x: 62, y: 83, size: 1.8 },
        { emoji: '🐸', x: 72, y: 83, size: 1.8 },
        { emoji: '☁️', x: 25, y: 14, size: 2.6 },
        { emoji: '🌧️', x: 62, y: 14, size: 2.6 },
        { emoji: '🏠', x: 90, y: 52, size: 4.5 },
      ],
      description:
        'On a rainy street, a girl is standing in front of her house and is going to use an umbrella (thought bubble shows an umbrella). There are three frogs on the ground in a row. Rain clouds are in the sky and a house is on the far right.',
    },
    q1: {
      text: 'Please look at the passage. Why do people use umbrellas and raincoats?',
      ja: 'パッセージを見てください。なぜ人々は傘やレインコートを使うのですか？',
      modelAnswers: [
        'Because they want to stay dry.',
        'They want to stay dry.',
      ],
      explanation:
        '2文目の because 以降が理由です。Why には Because で答えます。people は they にします。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「Because people want to stay dry.」と名詞のまま言う→ they にする',
        '「Because they want stay dry.」→ want to stay と to を入れる',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the girl going to do?',
      ja: 'イラストを見てください。女の子はこれから何をしますか？',
      modelAnswers: [
        'She is going to use an umbrella.',
        'She is going to open her umbrella.',
        'She is going to go out in the rain.',
      ],
      explanation:
        '女の子の吹き出しに傘が描かれています。雨が降っているので、これから傘を使います。これからすることなので She is going to ~. で答えます。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「She is using an umbrella.」と進行形で答える→これからの動作は going to',
        '「She is going to uses an umbrella.」→ going to のあとは動詞の原形',
      ],
    },
    q3: {
      text: 'Please look at the picture. How many frogs are there?',
      ja: 'イラストを見てください。カエルは何匹いますか？',
      modelAnswers: ['There are three frogs.', 'There are three.', 'Three frogs.'],
      explanation:
        '地面に並んでいるカエルを数えます。3匹です。How many ~ are there? には There are ~. で答えます。',
      point: 'How many ~? / There are ~.',
      commonMistakes: [
        '「There is three frogs.」→複数なので There are',
        '「There are three frog.」→複数形の frogs にする',
      ],
    },
    q4: {
      text: 'What do you usually do on rainy days?',
      ja: 'あなたは雨の日、たいてい何をしますか？',
      modelAnswers: [
        'I usually read books at home. I like to relax.',
        'I usually play video games with my brother.',
        'I usually practice the piano.',
      ],
      explanation:
        '雨の日にすることを I usually ~. で答え、1文補足しましょう。',
      point: 'I usually ~.（習慣）',
      commonMistakes: [
        '「I usually reading books.」→ usually のあとは動詞の原形（read）',
        '「I went to the park.」と過去形で答える→ usually（習慣）なので現在形',
      ],
    },
    q5: {
      text: 'Do you like rainy days?',
      ja: 'あなたは雨の日が好きですか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What season do you like the best?',
      modelAnswers: [
        'Yes. I like the sound of rain.',
        'No. I like summer the best.',
      ],
      modelAnswersYes: [
        'I like the sound of rain. I feel calm when I read books at home.',
        'I like to wear my new raincoat. It is yellow.',
      ],
      modelAnswersNo: [
        'I like summer the best. I can swim in the sea.',
        'I like spring the best. The flowers are beautiful.',
      ],
      explanation:
        'Yes なら雨の日の好きなところを、No なら一番好きな季節を I like ~ the best. で答えます。理由も1文足せると良いです。',
      point: 'I like ~ the best.',
      commonMistakes: [
        '「I like the summer best.」のように the をつけてしまう→季節名は無冠詞（I like summer the best.）',
        'No のあとに Because ... と理由だけ言う→好きな季節を答える',
      ],
    },
  },
  {
    id: 'card-40',
    title: 'Strawberry Picking',
    japaneseTitle: 'いちご狩り',
    category: '季節・行事',
    level: 'challenge',
    passage:
      'Strawberry picking is a popular activity at farms. Farmers grow strawberries in warm greenhouses, so visitors can pick them even in winter. Many families go there on weekends.',
    passageJa:
      'いちご狩りは農園で人気のある活動です。農家が暖かいビニールハウスでいちごを育てているので、訪問者は冬でもいちごを摘むことができます。多くの家族が週末にそこへ行きます。',
    vocabulary: [
      { word: 'activity', meaning: '活動' },
      { word: 'farmer', meaning: '農家の人' },
      { word: 'greenhouse', meaning: '温室、ビニールハウス' },
      { word: 'pick', meaning: '摘む' },
    ],
    scene: {
      background: 'garden',
      items: [
        { emoji: '👦', x: 24, y: 68, size: 3.6 },
        { emoji: '🍓', x: 34, y: 74, size: 2 },
        { emoji: '🧺', x: 10, y: 80, size: 2 },
        { emoji: '👧', x: 68, y: 68, size: 3.6, thought: '🍦' },
        { emoji: '🌿', x: 88, y: 76, size: 2.4 },
        { emoji: '☀️', x: 12, y: 12, size: 2.4 },
      ],
      description:
        'At a strawberry farm, a boy is picking strawberries (a strawberry in front of him and a basket on the ground). A girl on the right is going to eat ice cream (thought bubble shows an ice cream cone). Green plants are on the far right and the sun is in the sky.',
    },
    q1: {
      text: 'Please look at the passage. Why can visitors pick strawberries even in winter?',
      ja: 'パッセージを見てください。なぜ訪問者は冬でもいちごを摘めるのですか？',
      modelAnswers: [
        'Because they grow strawberries in warm greenhouses.',
        'Because farmers grow strawberries in warm greenhouses.',
      ],
      explanation:
        '2文目の ..., so visitors can pick ... の前が理由です。Why には Because で答えます。farmers は they に言い換えられます。',
      point: 'Because + 主語 + 動詞（理由）',
      commonMistakes: [
        '「So they grow strawberries ...」と So で始める→ Why には Because',
        '「Because they grows strawberries ...」→ they には grow',
      ],
    },
    q2: {
      text: 'Please look at the picture. What is the boy doing?',
      ja: 'イラストを見てください。男の子は何をしていますか？',
      modelAnswers: [
        'He is picking strawberries.',
        'He is picking a strawberry.',
        "He's picking strawberries.",
      ],
      explanation:
        '男の子がいちごを摘んでいます。動作は He is ~ing ... で答えます。the boy は He にします。',
      point: '現在進行形 He is ~ing',
      commonMistakes: [
        '「He is eating strawberries.」と食べていると答える→摘んでいる',
        '「He picks strawberries.」と現在形で答える→ is picking にする',
      ],
    },
    q3: {
      text: 'Please look at the picture. What is the girl going to do?',
      ja: 'イラストを見てください。女の子はこれから何をしますか？',
      modelAnswers: [
        'She is going to eat ice cream.',
        'She is going to eat an ice cream.',
        'She is going to have ice cream.',
      ],
      explanation:
        '女の子の吹き出しにアイスクリームが描かれています。これからすることなので She is going to ~. で答えます。',
      point: 'be going to ~（これからの予定）',
      commonMistakes: [
        '「She is eating ice cream.」と進行形で答える→これからの動作は going to',
        '「She is going to picks strawberries.」→男の子の動作と混同しない',
      ],
    },
    q4: {
      text: 'What kind of fruit do you like?',
      ja: 'あなたはどんな果物が好きですか？',
      modelAnswers: [
        'I like strawberries. They are sweet.',
        'I like apples. I eat one every morning.',
        'I like oranges. They are juicy.',
      ],
      explanation:
        '好きな果物を答え、理由を1文足しましょう。複数形で答えると自然です（strawberries / apples）。',
      point: 'I like ~. + 理由',
      commonMistakes: [
        '「I like strawberry.」→複数形の strawberries にする',
        '果物の名前だけ言って文にしない→ I like ~. と言う',
      ],
    },
    q5: {
      text: 'Do you often eat fruit?',
      ja: 'あなたはよく果物を食べますか？',
      followUpYes: 'Please tell me more.',
      followUpNo: 'What do you like to eat for dessert?',
      modelAnswers: [
        'Yes. I eat fruit every morning.',
        'No. I like to eat ice cream for dessert.',
      ],
      modelAnswersYes: [
        'I eat an apple every morning. My mother says it is good for my health.',
        'I eat fruit after dinner. I like grapes very much.',
      ],
      modelAnswersNo: [
        'I like to eat ice cream. It is cold and sweet.',
        'I like to eat cake with my family.',
      ],
      explanation:
        'Yes ならどんな果物をいつ食べるかを、No ならデザートに食べたいものを答えます。1~2文で具体的に言いましょう。',
      point: 'Yes/No + 具体的な答え',
      commonMistakes: [
        'Yes / No だけで止まる→追加質問に答える',
        '「I eat fruits every morning.」と fruits を使う→ 果物全般は fruit（種類を言うときだけ複数形）',
      ],
    },
  },
];
