# 英検3級 2次試験 面接シミュレーター

英検3級の面接を本番の流れどおりに練習できる Web アプリ。面接官の音声で自動進行し、受験者は話すだけ。

## 特徴

- **本番の流れを再現**: ノック → 入室 → 面接カード提出 → 名前・挨拶 → 黙読20秒 → 音読 → No.1〜No.3 → カードを裏返す → No.4・No.5（Yes/No と追加質問） → カード返却・退室
- **自動進行**: 面接官が話し終わるとマイクが自動でオン。話し終えて少し黙ると（既定 2.2 秒）自動で回答を送信し、次の質問へ進む
  - `Space` / `Enter` ですぐ回答終了、「Pardon?」と言う（またはボタン）と質問を繰り返す、無言なら1回だけ言い直してくれる
  - マイクが使えない環境ではキーボード入力に切り替え可能
- **効果音**: ノック・ドア・マイクON/OFF・黙読カウントダウン・カードめくり・採点結果・合格ファンファーレ（Web Audio で合成、音声ファイル不要）
- **2つのモード**
  - 本番モード: 途中で止まらず最後まで。採点は裏で並行して進むので、終了後すぐ結果が出る
  - 練習モード: 1問ごとに点数・良かった点・直すところ・満点解答（読み上げ付き）・解説・よくある間違いを表示。やり直しも可能。一定時間後に自動で次へ
- **24枚の問題カード**（基礎・標準・発展 各8枚）: パッセージ・イラスト・模範解答・解説・よくある間違い付き
- **33点満点のスコアレポート**: 音読・No.1〜5（各5点）＋アティチュード（3点）、合格目安20点、Claude による総合講評、学習履歴

## AI 採点（Claude API）

採点・講評に Anthropic の Claude API を使用。

1. アプリ右上の「設定」で API キーを入力 → 「接続テスト」で確認。キーはブラウザの localStorage にだけ保存され、ブラウザから直接 Anthropic API を呼ぶ（GitHub Pages 版はこの方式）
2. ローカル開発時はサーバーの環境変数 `ANTHROPIC_API_KEY`（`.env.example` 参照）でも可

モデルは標準で「1問ごとの採点 = Haiku 5.5」「総合講評 = Sonnet 5.5」（面接1回 約0.02ドル）。設定画面でそれぞれ変更可能。キー未設定時はローカルの簡易採点で動作。

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
- `src/engine/interview.ts` — 面接の進行スクリプト（発話 → 自動録音 → 無音検知 → 次へ）
- `src/lib/speech.ts` — 音声合成・音声認識の Promise ラッパー（中断対応）
- `src/lib/sfx.ts` — 効果音
- `src/lib/scoring.ts` — 簡易採点・アティチュード・合格目安
- `src/data/examCards.ts` — 問題カード 24 枚
