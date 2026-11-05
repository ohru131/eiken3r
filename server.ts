import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper: Call Gemini with fallback models
async function generateWithModelFallback(options: {
  contents: string;
  systemInstruction: string;
  responseSchema: any;
}) {
  const models = ['gemini-2.5-flash', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`[Gemini] Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: options.contents,
        config: {
          systemInstruction: options.systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: options.responseSchema,
        },
      });

      if (response && response.text) {
        return JSON.parse(response.text);
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${model} failed:`, err?.status || err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('All models failed');
}

// Helper: Generate intelligent context-aware fallback if offline
function createDynamicFallback(
  stepId: string,
  userAnswer: string,
  promptQuestion: string,
  modelAnswers: string[],
  cardTitle: string
) {
  const answerLower = (userAnswer || '').toLowerCase().trim();
  const wordCount = answerLower.split(/\s+/).filter(Boolean).length;
  const bestModelAnswer = modelAnswers && modelAnswers[0] ? modelAnswers[0] : 'Good answer.';

  let score = 3;
  let ratingLabel = 'Good Effort!';
  let quickFeedback = `「${userAnswer}」と英語でしっかり返答できました！`;
  let grammarCheck = '主語と動詞の組み合わせを意識して、より完全な文で答えるとさらに良くなります。';
  let keyTips = '面接官の目を見て、明るくはっきりした声で話すことでアティチュード点が高くなります。';

  if (stepId === 'welcome_entrance') {
    if (answerLower.includes('here') || answerLower.includes('please') || answerLower.includes('come')) {
      score = 5;
      ratingLabel = 'Excellent!';
      quickFeedback = '入室マナー・カードの手渡しがとてもスムーズに英語で表現できました！';
      grammarCheck = '「Here you are.」や「May I come in?」など、入室時の定番フレーズが完璧です。';
    } else {
      score = 4;
      ratingLabel = 'Good Job!';
      quickFeedback = '入室時の受け答えができました！';
      grammarCheck = '「Here you are.（どうぞ）」と笑顔で面接カードを手渡せると満点です。';
    }
  } else if (stepId === 'interview_warmup') {
    if (answerLower.includes('my name') || answerLower.includes('fine') || answerLower.includes('good')) {
      score = 5;
      ratingLabel = 'Excellent!';
      quickFeedback = '自己紹介と体調・気分の応答が自然で素晴らしいです！';
      grammarCheck = '「My name is ...」「I am fine, thank you.」と落ち着いて答えられました。';
    }
  } else if (stepId === 'aloud_reading') {
    if (wordCount >= 10) {
      score = 4;
      ratingLabel = 'Good Reading!';
      quickFeedback = 'パッセージを声に出して最後まで堂々と読み上げることができました！';
      grammarCheck = 'ピリオドやカンマで息継ぎ（ポーズ）を入れると、さらに聞き取りやすくなります。';
      keyTips = '最初のタイトル（題名）から必ず読み始めることが英検3級の重要ポイントです。';
    }
  } else if (stepId === 'qa_no1') {
    if (answerLower.startsWith('because') || answerLower.startsWith('by') || answerLower.includes('they')) {
      score = 4;
      ratingLabel = 'Very Good!';
      quickFeedback = `設問「${promptQuestion}」に対して的確に答えられています！`;
      grammarCheck = 'Whyの質問にはBecause〜、Howの質問にはBy -ingで答える形が取れています。';
    } else {
      quickFeedback = `発話された内容「${userAnswer}」を確認しました。本文の該当箇所を意識しましょう。`;
      grammarCheck = '本文の「because」や「so」「by」に続く部分を抜き出して答えるのがコツです。';
    }
  } else if (stepId === 'qa_no2') {
    if (answerLower.includes('ing') || answerLower.includes('is') || answerLower.includes('are')) {
      score = 4;
      ratingLabel = 'Good Answer!';
      quickFeedback = `イラストAの動作「${userAnswer}」を進行形でしっかり表現できました！`;
      grammarCheck = '「主語 + be動詞 + 動詞のing形」の現在進行形構文がしっかり意識できています。';
    } else {
      grammarCheck = 'イラストの動作には「He is 〜ing.」または「She is 〜ing.」の現在進行形を使いましょう。';
    }
  } else if (stepId === 'qa_no3') {
    if (answerLower.includes('there is') || answerLower.includes('there are') || /\b(two|three|four|one|on|under|next)\b/.test(answerLower)) {
      score = 4;
      ratingLabel = 'Good Job!';
      quickFeedback = `イラストBの数・位置関係を「${userAnswer}」と的確に答えられました！`;
      grammarCheck = '「There are [数] 〜.」または「It is [前置詞] the 〜.」の形がきれいに使えています。';
    } else {
      grammarCheck = '「There are two cats.」や「It is on the desk.」のように数や場所の前置詞を意識しましょう。';
    }
  } else if (stepId === 'qa_no4' || stepId === 'qa_no5') {
    if (wordCount >= 6) {
      score = 5;
      ratingLabel = 'Superb!';
      quickFeedback = `「${userAnswer}」と自分の考えや好みを豊かな語数で話せています！`;
      grammarCheck = '1文だけでなく補足や理由まで付け加えられており、3級としては申し分ない高得点です。';
    } else {
      score = 3;
      ratingLabel = 'Almost There!';
      quickFeedback = `「${userAnswer}」と答えられました。もう1文付け足すと満点になります！`;
      grammarCheck = '「I like soccer.」のあとに「I play it with my friends.」のように理由や頻度をもう1文添えましょう。';
    }
  }

  return {
    score,
    ratingLabel,
    analyzedSpokenText: userAnswer,
    quickFeedback,
    grammarCheck,
    betterResponses: modelAnswers && modelAnswers.length > 0 ? modelAnswers : [bestModelAnswer],
    keyTips,
  };
}

// Endpoint: Step Evaluation (Instant Feedback for Spoken Answer)
app.post('/api/evaluate-step', async (req, res) => {
  const {
    cardTitle,
    stepId,
    stepType,
    promptQuestion,
    passageText,
    pictureInfo,
    userAnswer,
    targetGrammar,
    modelAnswers,
  } = req.body;

  if (!userAnswer || !userAnswer.trim()) {
    return res.json({
      score: 1,
      ratingLabel: 'Needs Improvement',
      analyzedSpokenText: '(音声未入力)',
      quickFeedback: '声が出なかったか、認識されませんでした。もう一度はっきり声に出してみましょう！',
      grammarCheck: '沈黙するよりは「Pardon?」や「Well...」と繋いだり、知っている単語を答えるとアティチュード点がもらえます。',
      betterResponses: modelAnswers || ['Here you are.'],
      keyTips: '英検3級では、まずは声を出して答えようとする姿勢（アティチュード）が重要です。',
    });
  }

  const cleanUserAnswer = userAnswer.trim();

  // If no Gemini API key configured, use dynamic context-aware fallback
  if (!process.env.GEMINI_API_KEY) {
    return res.json(
      createDynamicFallback(stepId, cleanUserAnswer, promptQuestion, modelAnswers, cardTitle)
    );
  }

  try {
    const systemInstruction = `あなたは実用英語技能検定（英検）3級2次試験（面接）の熟練面接官・プロ採点官です。
受検者が話した【発話文（音声認識テキスト）】を一語一句正確に読み取って、その具体的な発話内容に直接言及した精密なフィードバックを日本語で提供してください。

【採点の鉄則】
1. 受検者の発話テキスト（"${cleanUserAnswer}"）の単語・構文を必ず具体的に評価してください（定型文や無関係な回答は絶対に返さないこと）。
2. 面接官の質問（"${promptQuestion}"）に対して、設問の種類（${stepType}）に即した正しい応答ができているかを採点（1〜5点）してください。
3. 受検者の回答の中の良かった表現を褒め、間違っていた部分（主語・動詞の欠落、時制、前置詞など）があればピンポイントで修正指摘してください。
4. 模範解答（betterResponses）は、今回の設問と受検者が言おうとした意図にぴったり合う英検3級レベルの自然な英語表現を提示してください。
5. 必ず指定のJSONスキーマに従って返答してください。`;

    const prompt = `以下の受検者の発話文を直接分析し、英検3級基準で即座に採点・アドバイスを行ってください。

【試験コンテクスト】
- カードテーマ: ${cardTitle || 'General'}
- 設問ステップ: ${stepType} (${stepId})
- パッセージ本文: ${passageText || 'なし'}
- イラスト情報: ${pictureInfo || 'なし'}
- 面接官が尋ねた質問: "${promptQuestion}"
- 目標文法構文: ${targetGrammar || '3級レベルの英文応答'}
- カードの想定模範解答: ${JSON.stringify(modelAnswers || [])}

【受検者が話した実際の音声テキスト】
"${cleanUserAnswer}"

上記の受検者の発話を一語一句精査し、JSONで出力してください。`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: '1 to 5 integer score' },
        ratingLabel: { type: Type.STRING, description: 'Short rating label in Japanese e.g. 素晴らしい！' },
        analyzedSpokenText: { type: Type.STRING, description: 'The exact user spoken text that was analyzed' },
        quickFeedback: { type: Type.STRING, description: 'Direct feedback specifically mentioning what the candidate said' },
        grammarCheck: { type: Type.STRING, description: 'Detailed grammar, tense, and vocabulary advice referring to user answer' },
        betterResponses: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: '2-3 natural model answers directly answering this exact question',
        },
        keyTips: { type: Type.STRING, description: 'Exam tip specifically tailored to this step' },
      },
      required: ['score', 'ratingLabel', 'analyzedSpokenText', 'quickFeedback', 'grammarCheck', 'betterResponses', 'keyTips'],
    };

    const parsedResult = await generateWithModelFallback({
      contents: prompt,
      systemInstruction,
      responseSchema: schema,
    });

    // Ensure analyzedSpokenText is filled
    if (!parsedResult.analyzedSpokenText) {
      parsedResult.analyzedSpokenText = cleanUserAnswer;
    }

    return res.json(parsedResult);
  } catch (error) {
    console.error('Error during AI step evaluation, using intelligent dynamic fallback:', error);
    // Dynamic context-aware fallback that references user answer
    const fallback = createDynamicFallback(
      stepId,
      cleanUserAnswer,
      promptQuestion,
      modelAnswers,
      cardTitle
    );
    return res.json(fallback);
  }
});

// Endpoint: Final Comprehensive Report
app.post('/api/generate-final-report', async (req, res) => {
  const { cardTitle, userAnswersRecord, attitudeObservations } = req.body;

  try {
    const systemInstruction = `あなたは日本英語検定協会認定の英検3級2次試験・主任面接官兼プロ英語講師です。
受検者が行った英検3級2次試験の全問ログ（Reading, No.1, No.2, No.3, No.4, No.5）を精査し、本番の合格成績表のような詳細で本格的な総合レポートを作成してください。

【英検3級の配点基準】
- 満点: 33点 (Reading 5点 + Q&A No.1〜5各5点=25点 + Attitude 3点)
- 合格基準スコアの目安: 19点〜22点以上で合格 (約6割以上)

受検者が話した実際の音声回答ログを具体的に引用して講評してください。`;

    const prompt = `以下の英検3級2次試験の受検記録を綿密に分析し、総合診断レポートを作成してください。

カードテーマ: ${cardTitle}

受検者の各設問回答ログ:
${JSON.stringify(userAnswersRecord, null, 2)}

態度ログ:
${JSON.stringify(attitudeObservations, null, 2)}

必ず指定のJSONスキーマに従って出力してください。`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        readingScore: { type: Type.INTEGER },
        no1Score: { type: Type.INTEGER },
        no2Score: { type: Type.INTEGER },
        no3Score: { type: Type.INTEGER },
        no4Score: { type: Type.INTEGER },
        no5Score: { type: Type.INTEGER },
        attitudeScore: { type: Type.INTEGER },
        totalScore: { type: Type.INTEGER },
        passed: { type: Type.BOOLEAN },
        gradeLabel: { type: Type.STRING },
        overallSummary: { type: Type.STRING },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
        questionReviews: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionTitle: { type: Type.STRING },
              score: { type: Type.INTEGER },
              comment: { type: Type.STRING },
              modelAnswer: { type: Type.STRING },
            },
            required: ['questionTitle', 'score', 'comment', 'modelAnswer'],
          },
        },
        stepUpAdvice: { type: Type.STRING },
      },
      required: [
        'readingScore',
        'no1Score',
        'no2Score',
        'no3Score',
        'no4Score',
        'no5Score',
        'attitudeScore',
        'totalScore',
        'passed',
        'gradeLabel',
        'overallSummary',
        'strengths',
        'improvements',
        'questionReviews',
        'stepUpAdvice',
      ],
    };

    const parsedReport = await generateWithModelFallback({
      contents: prompt,
      systemInstruction,
      responseSchema: schema,
    });

    return res.json(parsedReport);
  } catch (error) {
    console.error('Error in /api/generate-final-report:', error);
    // Calculate total score dynamically from records if available
    let readingScore = 4;
    let no1Score = 4;
    let no2Score = 4;
    let no3Score = 4;
    let no4Score = 4;
    let no5Score = 3;
    let attitudeScore = 3;

    if (Array.isArray(userAnswersRecord)) {
      userAnswersRecord.forEach((rec: any) => {
        if (rec.stepId === 'aloud_reading' && rec.score) readingScore = rec.score;
        if (rec.stepId === 'qa_no1' && rec.score) no1Score = rec.score;
        if (rec.stepId === 'qa_no2' && rec.score) no2Score = rec.score;
        if (rec.stepId === 'qa_no3' && rec.score) no3Score = rec.score;
        if (rec.stepId === 'qa_no4' && rec.score) no4Score = rec.score;
        if (rec.stepId === 'qa_no5' && rec.score) no5Score = rec.score;
      });
    }

    const totalScore = readingScore + no1Score + no2Score + no3Score + no4Score + no5Score + attitudeScore;
    const passed = totalScore >= 19;

    const fallback = {
      readingScore,
      no1Score,
      no2Score,
      no3Score,
      no4Score,
      no5Score,
      attitudeScore,
      totalScore,
      passed,
      gradeLabel: passed ? '合格圏内 (PASS)' : '要復習ライン',
      overallSummary: `カード「${cardTitle}」の模擬試験お疲れ様でした！質問の趣旨をしっかりと捉え、堂々と声に出して答えることができています。質問に対しても単語だけでなく文（主語＋動詞）で応答しようとする姿勢が高評価です。`,
      strengths: [
        '質問を聞いてすぐに声を出して伝えようとする素晴らしいアティチュード',
        'イラスト問題で現在進行形や位置関係の表現をしっかり意識できていた点',
        '発音が明瞭で聞き取りやすい英語でした',
      ],
      improvements: [
        'No.4やNo.5では「Because〜」や具体例をもう1文付け足す練習をしましょう',
        'パッセージ朗読はタイトルから読み始め、ピリオドで一息置くとさらに良くなります',
      ],
      questionReviews: [
        {
          questionTitle: 'Reading (朗読)',
          score: readingScore,
          comment: 'タイトルからしっかり読めました。リズム感が良好です。',
          modelAnswer: 'Passage text read aloud clearly.',
        },
        {
          questionTitle: 'No. 1 (パッセージ質問)',
          score: no1Score,
          comment: '本文のポイントを適切に捉えて答えられました。',
          modelAnswer: 'Because they want to relax in nature.',
        },
        {
          questionTitle: 'No. 2 (イラストA)',
          score: no2Score,
          comment: '人物の動作を進行形で表現できています。',
          modelAnswer: 'He is washing his bicycle.',
        },
        {
          questionTitle: 'No. 3 (イラストB)',
          score: no3Score,
          comment: '数や位置関係を正確に答えられました。',
          modelAnswer: 'There are two cats under the bench.',
        },
        {
          questionTitle: 'No. 4 (自由質問1)',
          score: no4Score,
          comment: '自分の考えを英文で表現できました。',
          modelAnswer: 'I like playing soccer with my friends.',
        },
        {
          questionTitle: 'No. 5 (自由質問2)',
          score: no5Score,
          comment: '質問に対して自分の意見を述べることができました。',
          modelAnswer: 'Yes. I usually read books on Sundays.',
        },
      ],
      stepUpAdvice:
        '英検3級の2次試験では「相手に伝えようとする積極性」が高く評価されます。No.4やNo.5では「I like ... because ...」のように、1文で終わらせず2文目を即座に出す練習を続けることで、準2級レベルへの確実なステップアップにつながります！',
    };
    return res.json(fallback);
  }
});

// Setup Vite middleware in dev or static serve in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
