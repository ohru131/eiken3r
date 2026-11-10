import React from 'react';
import { Grade } from '../types';
import { GRADES } from '../lib/grade';
import { X, BookOpen, CheckCircle, HelpCircle, Award, Volume2, Sparkles } from 'lucide-react';

interface StrategyGuideModalProps {
  isOpen: boolean;
  /** 表示する級（省略時は 3級） */
  grade?: Grade;
  onClose: () => void;
}

type Step = { title: string; points: string[]; example?: string };

const PRE2_STEPS: Step[] = [
  {
    title: '入室・挨拶・黙読20秒',
    points: ['流れは3級と同じ。「This is the Grade Pre-2 test.」と言われたら「OK.」', '黙読ではタイトルと、No.1 の答えになりやすい「by doing so」「so」の位置を先に探す'],
  },
  {
    title: 'パッセージの音読 (5点満点)',
    points: ['タイトルから読む。約50語で3級より長いので、意味のまとまりで区切って落ち着いて', '固有名詞・知らない語も止まらずに読み切る'],
  },
  {
    title: 'No.1: パッセージについての質問',
    points: [
      'How ~? → 「by doing so」の doing so が指す内容を By ~ing で',
      'Why ~? → 「so」の前の部分を Because they ~ で',
      '名詞は代名詞（they / it）に置き換え、指示語（so / this）のままにしない',
    ],
    example: 'Q: How can some people reduce plastic waste?\nA: By filling their bottles with water or tea at home.',
  },
  {
    title: 'No.2: イラストA（5人の動作）',
    points: ['5人それぞれの動作を現在進行形で1文ずつ。左から順に言うと抜けにくい', '動詞が出なければ別の言い方で（take a picture → use a camera）。5人全員に触れるのが最優先'],
    example: 'A boy is kicking a ball. A woman is taking a picture. A man is carrying a box. ...',
  },
  {
    title: 'No.3: イラストB（状況説明）',
    points: ['「今の状況」＋「吹き出しの中身」の2点を so / because でつなぐ', '吹き出しは be thinking of ~ing / want to ~ で表す'],
    example: "Her bottle is empty, so she's thinking of filling it with water.",
  },
  {
    title: 'No.4: 意見を問う質問（カードを裏返して置く）',
    points: ['「Do you think ~?」に Yes / No → 「Why? / Why not?」に理由を2文で', '1文目で主張、2文目で具体例・補足（Also, ... / For example, ...）'],
    example: 'Yes. → Why?\nMany people are interested in the environment. Also, they can save money.',
  },
  {
    title: 'No.5: 日常生活・社会についての質問',
    points: ['Yes → 「Please tell me more.」に具体的な経験を2文で', 'No → 「Why not?」に理由を2文で。No でも減点されない'],
  },
];

const G2_STEPS: Step[] = [
  {
    title: '入室・挨拶・黙読20秒',
    points: ['流れは3級・準2級と同じ。「This is the Grade 2 test.」と言われたら「OK.」', '黙読ではタイトルと、No.1 の答えになりやすい「by doing so」「in this way」「so」「as a result」の位置を先に探す'],
  },
  {
    title: 'パッセージの音読 (5点満点)',
    points: ['タイトルから読む。約60語と長いので、意味のまとまり（カンマ・接続詞の前）で区切って落ち着いて', '知らない語も止まらずに読み切る。速さより、はっきり・一定のリズムで'],
  },
  {
    title: 'No.1: パッセージについての質問 (5点満点)',
    points: [
      'How ~? → 「by doing so」「in this way」が指す内容を By ~ing で',
      'Why ~? → 「so」「as a result」の前の部分を Because they ~ で',
      '指示語（such / these / so）は具体的な語句に言い換え、主語は代名詞（they / it）にする',
    ],
    example: 'Q: How do more and more people help reduce food waste?\nA: By using smartphone apps that sell food at low prices.',
  },
  {
    title: 'No.2: 3コマ漫画のナレーション (10点満点・準備20秒)',
    points: [
      '配点が一番高い設問。カードの1文（One day, ...）をそのまま読んで始める',
      '各コマ2文が目安: 「人物の動作・出来事」＋「セリフ／吹き出しの内容」',
      '2・3コマ目は矢印の言葉（The next day など）で文を始め、すべて過去形・過去進行形で語る',
      'セリフは said to ~, "..." で引用。吹き出しは was thinking of ~ing / was looking forward to ~ing / was worried that ... で',
      '準備の20秒では、各コマの「誰が・何をした」の動詞だけ先に決める',
    ],
    example:
      'One day, Mr. and Mrs. Sato were talking in their kitchen. Mr. Sato said to his wife, "We throw away too much food." That weekend at a supermarket, Mrs. Sato was checking a shopping list. Mr. Sato was thinking of buying some meat. ...',
  },
  {
    title: 'No.3: 意見を問う質問（カードを裏返して置く・5点満点）',
    points: [
      '「Some people say that ~. What do you think about that?」には、最初に I agree. / I disagree.',
      '続けて理由を2文。1文目で主な理由、2文目で具体例・補足（Also, ... / For example, ...）',
      '賛成・反対のどちらでも点数は同じ。理由を言いやすい方を選ぶ',
    ],
    example: 'I agree. Many customers cannot finish all the food they order. Smaller amounts are good for both their health and the environment.',
  },
  {
    title: 'No.4: 社会・日常についての質問 (5点満点)',
    points: ['「Do you think ~?」に Yes. / No. → 「Why? / Why not?」に理由を2文で', '自分の経験より「多くの人は〜」と一般論で答えると文を作りやすい（Many people ... / It is ... for people to ~）'],
    example: 'Yes. → Why?\nPeople can buy things at any time without going to stores. Also, things are often cheaper on the Internet.',
  },
];

/** 配点の説明 */
const SCORING: Record<Grade, string> = {
  '3': 'Reading 5点 ＋ Q&A No.1〜5 各5点=25点 ＋ Attitude 3点',
  pre2: 'Reading 5点 ＋ Q&A No.1〜5 各5点=25点 ＋ Attitude 3点',
  '2': 'Reading 5点 ＋ Q&A 25点（No.1 5点・No.2 10点・No.3 5点・No.4 5点）＋ Attitude 3点',
};

export const StrategyGuideModal: React.FC<StrategyGuideModalProps> = ({ isOpen, grade = '3', onClose }) => {
  if (!isOpen) return null;
  const steps = grade === 'pre2' ? PRE2_STEPS : grade === '2' ? G2_STEPS : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                英検{GRADES[grade].label} 2次面接試験 完全攻略ガイド
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                配点・減点されない受け答え・即効スコアアップの法則
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-slate-700 text-sm">
          {/* Overview Section */}
          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <h3 className="font-bold text-indigo-950 flex items-center gap-2 mb-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              試験の配点と合格基準
            </h3>
            <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed">
              満点は <strong>33点</strong>（{SCORING[grade]}）。
              合格ラインはおよそ <strong>19〜22点以上（約60%）</strong> です。全問正解できなくても、声を出して伝えようとする姿勢があれば合格できます！
            </p>
          </div>

          {/* Section: Steps breakdown */}
          <div className="space-y-4">
            {steps ? (
              <>
            {steps.map((st, i) => (
              <div key={st.title} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">{i + 1}</span>
                  <span>{st.title}</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {st.points.map((pt) => (
                    <li key={pt}>・{pt}</li>
                  ))}
                </ul>
                {st.example && <div className="mt-2 bg-slate-50 p-2.5 rounded-lg text-xs font-mono text-slate-800 whitespace-pre-line">{st.example}</div>}
              </div>
            ))}

              </>
            ) : (
              <>
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">1</span>
                <span>入室・挨拶・ウォームアップ</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                ドアをノックして「May I come in?」と言って入室。「Here you are.」「Thank you.」とカードを受け渡します。
              </p>
              <div className="bg-slate-50 p-2.5 rounded-lg text-xs font-mono text-slate-800">
                面接官: "How are you today?"<br />
                あなた: <strong>"I'm fine, thank you."</strong> または <strong>"I'm a little nervous, but I'll do my best."</strong>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">2</span>
                <span>パッセージの音読 (Reading: 5点満点)</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>・<strong>タイトルから必ず読む</strong>（タイトルを飛ばすと減点対象になります）。</li>
                <li>・カンマ(,)やピリオド(.)では一呼吸おいて、意味のまとまりごとに読む。</li>
                <li>・分からない単語があっても止まらず、前後の流れに乗って堂々と読む！</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">3</span>
                <span>No. 1: パッセージについての質問 (5点満点)</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                「Why〜?」で聞かれたら <strong>Because 〜</strong> で答え、「How〜?」で聞かれたら <strong>By 〜ing</strong> で答えるのが鉄則です。
              </p>
              <div className="bg-emerald-50 p-2.5 rounded-lg text-xs text-emerald-900 border border-emerald-200">
                本文中の「so」や「because」「by ...ing」の前後を探すとそのまま答えが見つかります！
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">4</span>
                <span>No. 2 & No. 3: イラストについての質問 (動作・数・位置)</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li>
                  ・<strong>No. 2:</strong> 「What is he/she doing?」には <strong>He is 〜ing. / She is 〜ing.</strong> で即答！
                </li>
                <li>
                  ・「What is he/she going to do?」には <strong>He/She is going to 〜.</strong>（吹き出しの中身がこれからすること）
                </li>
                <li>
                  ・<strong>No. 3:</strong> 「How many 〜 are there?」には <strong>There are two/three 〜.</strong>、「Where is 〜?」には <strong>It is on/under/next to the 〜.</strong>
                </li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs">5</span>
                <span>No. 4 & No. 5: 受験者自身への質問 (カードを裏返す)</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                1文だけで終わらせず、<strong>「理由」や「具体例」をもう1文付け足す</strong>と満点(5点)になります！
              </p>
              <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                <div>例1: "I like soccer." → <strong>"I often play it with my friends on Saturdays."</strong></div>
                <div>例2: "Yes." → <strong>"I like reading comic books in my room."</strong></div>
              </div>
            </div>

              </>
            )}

            {/* Pardon Rule */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>「聞き返し (Pardon?)」の公式ルール</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                英検の面接では、聞き取れなかった時に <strong>「Pardon?」や「Could you say that again, please?」と1回聞き返すのは減点されません！</strong>
                聞き取れないまま黙り込むのが一番の減点です。堂々と聞き返しましょう。
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm cursor-pointer"
          >
            理解した・閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
