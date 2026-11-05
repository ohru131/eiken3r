# 英検3級 2次試験 面接シミュレーター (Eiken Grade 3 Interview Simulator)

AI面接官（音声認識 & 音声合成TTS搭載）とリアルタイムに対話練習ができる、英検3級2次試験（面接）対策Webアプリケーションです。

![Eiken Grade 3 Interview Simulator](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 主な特徴

- **本番準拠の面接フロー**:
  - 受験案内（入室・挨拶・名前と級の確認）
  - 問題カード黙読（20秒）
  - パッセージ音読
  - イラスト・パッセージに関する問1〜問3（Question 1, 2, 3）
  - カードを伏せて受験者自身に関する問4・問5（Question 4, 5）
  - 退出・結果集計
- **3DライクなアニメーションAI面接官**:
  - 音声発話（TTS）に合わせた自然な口パクと瞬き
  - 3人の面接官（Mr. Alex, Ms. Sarah, Mr. David）から選択可能
- **リアルタイム音声認識（STT）**:
  - ブラウザの Web Speech API を活用した途切れにくいマイク認識
  - 途中で沈黙しても継続して聞き取り、テキスト即時反映
- **即座フィードバック（Gemini AI & 英語模範解答読み上げ）**:
  - 受験者が実際に発話した英文をリアルタイム分析
  - 文法チェック、スコア採点、より自然な改善回答例の提示
  - 模範解答のネイティブ英語音声読み上げ（リピーティング練習対応）
- **公式準拠 33点満点スコアレポート**:
  - Reading (5点), Q1~Q5 (各5点), Attitude (3点) の詳細配点
  - 合否判定（合格基準スコア19点）、合格証書デザイン、学習アドバイス
- **全画面表示 & レスポンシブ最適化**:
  - スクロール不要で面接に集中できるビューポート収束レイアウト
  - 全画面モード切り替えボタン完備

---

## 🛠 技術スタック

- **フロントエンド**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion, Canvas Confetti
- **バックエンド**: Node.js, Express, tsx
- **AI / LLM**: Google Gemini API (`@google/genai`)
  - Primary: `gemini-2.5-flash`
  - Fallback: `gemini-3.8-flash`
- **音声機能**: Web Speech API (`SpeechRecognition`, `SpeechSynthesis`)

---

## 🚀 クイックスタート

### 1. リポジトリのクローン & パッケージインストール

```bash
git clone https://github.com/<your-username>/eiken-grade3-simulator.git
cd eiken-grade3-simulator
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env` を作成します：

```bash
cp .env.example .env
```

`.env` に Google Gemini API キーを設定します：

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

---

## 📁 ディレクトリ構成

```text
├── index.html
├── package.json
├── server.ts                  # Express サーバー & Gemini API 評価エンドポイント
├── src/
│   ├── App.tsx                # メインコントローラー & 全画面・タブ制御
│   ├── components/
│   │   ├── CardIllustrations.tsx   # 問題カードA・Bのベクターイラスト
│   │   ├── CardSelectorModal.tsx   # 6つの過去問カード・モード切替
│   │   ├── ExaminerAvatar.tsx      # 面接官アバター（口パク・瞬き）
│   │   ├── FinalReportModal.tsx    # 33点満点スコアレポート & 紙吹雪
│   │   ├── InstantFeedbackCard.tsx # AIフィードバック & 模範解答TTS
│   │   ├── ProblemCardView.tsx     # 問題カード表面・裏面ビュー
│   │   ├── SpeechInputPanel.tsx    # マイク音声認識パネル
│   │   └── StrategyGuideModal.tsx  # 英検3級面接のコツ・マナーガイド
│   ├── data/
│   │   └── examCards.ts            # 6題の本番形式問題データ
│   └── types/
│       └── index.ts                # TypeScript型定義
└── tsconfig.json
```

---

## 📄 ライセンス

Apache-2.0
