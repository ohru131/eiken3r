# 英検3級・準2級・2級 2次試験 面接シミュレーター

英検3級・準2級・2級の面接を本番の流れどおりに練習できる Web アプリ。面接官の音声で自動進行し、受験者は話すだけ。

## 特徴

- **本番の流れを再現**: ノック → 入室 → 面接カード提出 → 名前・挨拶 → 黙読20秒 → 音読 → No.1〜No.3 → カードを裏返す → No.4・No.5（Yes/No と追加質問） → カード返却・退室
- **自動進行**: 面接官が話し終わるとマイクが自動でオン。話し終えて少し黙ると（既定 2.2 秒）自動で回答を送信し、次の質問へ進む
  - `Space` / `Enter` ですぐ回答終了、「Pardon?」と言う（またはボタン）と質問を繰り返す、無言なら1回だけ言い直してくれる
  - マイクが使えない環境ではキーボード入力に切り替え可能
- **効果音**: ノック・ドア・マイクON/OFF・黙読カウントダウン・カードめくり・採点結果・合格ファンファーレ（Web Audio で合成、音声ファイル不要）
- **2つのモード**
  - 本番モード: 途中で止まらず最後まで。採点は裏で並行して進むので、終了後すぐ結果が出る
  - 練習モード: 1問ごとに点数・良かった点・直すところ・満点解答（読み上げ付き）・解説・よくある間違いを表示。やり直しも可能。一定時間後に自動で次へ
- **3級: 40枚の問題カード**（基礎14・標準13・発展13）: パッセージ・イラスト・模範解答・解説・よくある間違い付き
- **準2級: 24枚の問題カード**（基礎8・標準8・発展8）: ホーム画面上部の「3級 / 準2級 / 2級」で切り替え
  - 本番どおり、イラストA（5人の動作を説明）・イラストB（状況を説明）・意見を問う No.4（Why? / Why not?）・No.5
  - 「This is the Grade Pre-2 test.」「Please turn over the card and put it down.」など台詞も準2級仕様
  - Claude 採点は準2級の基準（No.2 は説明できた人数、No.3 は状況＋吹き出しの2点、No.4/5 は理由2文）で採点
- **2級: 24枚の問題カード**（基礎8・標準8・発展8）
  - 本番どおり、約60語のパッセージ・No.1（パッセージ）・No.2（3コマ漫画のナレーション、準備20秒 →「Please begin.」）・カードを裏返して No.3（Some people say that ... に I agree / I disagree ＋理由）・No.4（Yes/No ＋ Why? / Why not?）の4問
  - 配点も本番どおり No.2 のみ10点（音読5＋No.1 5＋No.2 10＋No.3 5＋No.4 5＋アティチュード3＝33点）
  - AI 採点は2級の基準（No.2 は各コマの「動作」と「セリフ・吹き出し」、過去形、書き出しの文で採点）
- **お手本音読**: 練習モードでは音読の前にお手本を聞ける（設定でOFF可）。音読の解説・結果画面にもお手本音読ボタン
- **音読の発音評価（任意・Azure Speech）**: 単語ごとの発音の正確さ・流暢さ・読み落とし・抑揚を評価し、本文を色分け表示。Claude の採点にも反映
- **33点満点のスコアレポート**: 音読・各設問（5点。2級の No.2 は10点）＋アティチュード（3点）、合格目安20点、Claude による総合講評、学習履歴

## イラスト

- 3級: `public/images/cards/<カードID>.png`
- 準2級: `public/images/pre2/<カードID>-a.png`（イラストA）・`<カードID>-b.png`（イラストB）。作成用プロンプトは [docs/pre2-image-prompts.md](docs/pre2-image-prompts.md)
- 2級: 3コマ漫画は現在、絵文字で描いた仮イラスト（右上に「仮イラスト」表示）。画像生成AIで作った画像を `public/images/g2/<カードID>-1.png`〜`-3.png`（1コマ1枚・4:3）に置くと自動で差し替わる。書き出しの文・コマ上の言葉・セリフはアプリが文字で表示するので、絵に文字は不要。作成用プロンプトは [docs/grade2-image-prompts.md](docs/grade2-image-prompts.md)

画像ファイルが無いカードは、絵文字の仮イラストに自動で切り替わる。

## AI 採点（Claude API / Gemini API）

採点・講評に Anthropic の Claude API、または Google の Gemini API を使用。アプリ右上の「設定」→「AI 採点に使うサービス」で切り替える。

### Claude

1. 「設定」で Claude を選び、API キーを入力 → 「接続テスト」で確認。キーはブラウザの localStorage にだけ保存され、ブラウザから直接 Anthropic API を呼ぶ（GitHub Pages 版はこの方式）
2. ローカル開発時はサーバーの環境変数 `ANTHROPIC_API_KEY`（`.env.example` 参照）でも可

モデルは標準で「1問ごとの採点 = Haiku 5.5」「総合講評 = Sonnet 5.5」（面接1回 約0.02ドル）。設定画面でそれぞれ変更可能。

### Gemini

1. [Google AI Studio](https://aistudio.google.com/apikey) で API キーを発行（無料枠あり）
2. 「設定」で Gemini を選び、キーを入力 → 「接続テスト」。キーはブラウザの localStorage にだけ保存され、ブラウザから直接 Gemini API を呼ぶ（サーバー経由には未対応）
3. モデルは標準で「採点 = `gemini-flash-latest`」「講評 = `gemini-pro-latest`」（Google 側で最新の安定版に自動追従する名前）。`gemini-2.5-flash` など特定バージョンも入力可能

キー未設定時はローカルの簡易採点で動作。採点プロンプトは `src/lib/prompts.ts` で Claude / Gemini 共通。

## 音読の発音評価（Azure Speech・任意）

1. Azure ポータルで「Speech」リソースを作成（価格レベル F0 = 無料枠）
2. 「キーとエンドポイント」のキーとリージョン（例: `japaneast`）をアプリの「設定」に入力 →「接続テスト」
3. 音読の録音だけが Azure に送られる。質問への回答はブラウザの音声認識のまま。キーはブラウザの localStorage にのみ保存
4. Azure に接続できない場合は自動で通常の音声認識に切り替わる

## GitHub Pages で公開

`.github/workflows/pages.yml` が `main` への push で自動ビルド・デプロイする。初回のみリポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定。公開URL: `https://<ユーザー名>.github.io/eiken3r/`

## ローカル起動

```bash
bun install   # または npm install
cp .env.example .env   # 任意
bun run dev   # http://localhost:3000
```

本番ビルド: `bun run build && NODE_ENV=production bunx tsx server.ts`

推奨ブラウザ: Google Chrome / Microsoft Edge（Web Speech API の音声認識に対応）。

## 構成

- `server.ts` — Express + Vite。`/api/evaluate`（1問採点）・`/api/report`（総合講評）で Claude API を呼ぶ
- `src/lib/prompts.ts` — 採点・講評のプロンプトと出力スキーマ（Claude / Gemini 共通）
- `src/lib/claude.ts` / `src/lib/gemini.ts` — 各 API の呼び出し
- `src/engine/interview.ts` — 面接の進行スクリプト（発話 → 自動録音 → 無音検知 → 次へ）
- `src/lib/speech.ts` — 音声合成・音声認識の Promise ラッパー（中断対応）
- `src/lib/sfx.ts` — 効果音
- `src/lib/scoring.ts` — 簡易採点・アティチュード・合格目安
- `src/data/examCards.ts` — 3級の問題カード（examCards.ts + examCards2.ts、計40枚）
- `src/data/pre2Cards.ts` — 準2級の問題カード（pre2Cards.ts 〜 pre2Cards3.ts、計24枚）
- `src/data/grade2Cards.ts` — 2級の問題カード（grade2Cards.ts 〜 grade2Cards4.ts、計24枚）。`bun run check:cards` で形式チェック
- `src/components/StoryStrip.tsx` — 2級の3コマ漫画の表示
- `src/lib/grade.ts` — 級ごとの違い（表示名・設問の数と満点・設問ラベル・イラストの対応）
