# 英検準2級 問題カード イラスト作成プロンプト

準2級カードのイラスト（イラストA・イラストB）を画像生成AIで作るためのプロンプト集。
画像が無い間、アプリは絵文字で描いた仮イラストを表示し、右上に「仮イラスト」と出す。

## 置き場所とファイル名

| 用途 | パス | 例 |
| --- | --- | --- |
| イラストA（5人の動作 / No.2） | `public/images/pre2/<カードID>-a.png` | `public/images/pre2/pre2-01-a.png` |
| イラストB（人物の状況 / No.3） | `public/images/pre2/<カードID>-b.png` | `public/images/pre2/pre2-01-b.png` |

- 縦横比 **5:3**（推奨 1500×900px、最低 1000×600px）。表示枠が 5:3 で `object-cover` のため、他の比率は端が切れる
- PNG（JPEG/WebP にする場合は `src/data/pre2Cards*.ts` の `image` のパスも変える）
- 置いたらリロードするだけで反映。コード変更は不要

## 共通スタイル（全プロンプトの先頭に付ける）

```
Simple flat illustration for an English speaking test card, in the style of a Japanese EIKEN exam picture.
Clean black outlines, flat soft colors, white or very light background, no shading, no gradients.
Plain, clear composition so a junior-high student can identify each person and action at a glance.
No text, no letters, no numbers, no speech, no logos, no watermark. Aspect ratio 5:3, landscape.
```

### イラストA 用の追加指示

```
Five people in one scene, spread out horizontally from left to right with clear space between them, each doing ONE clearly different action.
Every person is fully visible (whole body), facing slightly toward the viewer, not overlapping each other.
Objects used in each action (ball, camera, box, etc.) are drawn large and clearly.
```

### イラストB 用の追加指示

```
One main person in the center, large in the frame. Show the situation clearly with one or two key objects.
A thought bubble (cloud-shaped, with small circles leading to the person's head) above the person shows what they are thinking or want to do.
The thought bubble contains a simple picture only, no words.
```

### ネガティブプロンプト（対応しているツールのみ）

```
text, letters, words, numbers, captions, speech balloon with text, watermark, signature, logo, photorealistic, 3d render, dark lighting, cluttered background, extra people, overlapping people, cropped bodies, deformed hands
```

## 作成時のチェックポイント

- イラストAの5人の動作が、カードの `scene.description`・No.2 模範解答と**完全に一致**しているか（採点AIは description を正解として扱う）
- 動作は1人1つ。持ち物（ボール・カメラ等）が小さすぎないか
- イラストBは「状況」と「吹き出しの中身」の2点が読み取れるか（No.3 は2点セットで答える設問）
- 文字が入っていないか（看板・本の表紙・Tシャツの文字も消す）
- 絵を差し替えて内容が変わった場合は、カードデータの `description` と No.2/No.3 の模範解答も直す

---

## カード別プロンプト

各カードの「イラストA」「イラストB」の英文を、上の共通スタイル＋A/B用追加指示の後ろに続けて使う。

### pre2-01 Reusable Bottles（繰り返し使えるボトル）

**イラストA** → `public/images/pre2/pre2-01-a.png`

```
Scene: a sunny park with grass, a few trees and a wooden bench on the right.
From left to right:
1. A boy is kicking a soccer ball.
2. A woman is taking a picture with a camera.
3. A man is carrying a large cardboard box.
4. A girl is feeding a small bird on the ground.
5. An old man is painting a wooden bench with a brush and a paint can.
```

**イラストB** → `public/images/pre2/pre2-01-b.png`

```
Scene: a street on a hot sunny day.
A girl in the center is holding her water bottle upside down and looking at it; the bottle is clearly empty (no drops come out).
Thought bubble: the girl filling her bottle with water at a drinking fountain.
```
