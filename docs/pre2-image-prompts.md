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

### pre2-02 Online Classes（オンライン授業）

**イラストA** → `public/images/pre2/pre2-02-a.png`

```
Scene: a quiet library with tall bookshelves and a few tables.
From left to right:
1. A boy is carrying some books.
2. A woman is pushing a cart.
3. A man is reading a newspaper.
4. A girl is using a computer.
5. An old woman is taking a book from a shelf.
```

**イラストB** → `public/images/pre2/pre2-02-b.png`

```
Scene: a living room at home.
A boy in the center sits at a desk looking at a computer; the screen is frozen and shows a loading circle (no text).
Thought bubble: the boy's father, smiling and ready to help.
```

### pre2-03 Volunteer Work（ボランティア活動）

**イラストA** → `public/images/pre2/pre2-03-a.png`

```
Scene: a sunny community garden with flower beds, a small tree and a fence.
From left to right:
1. A boy is watering some flowers.
2. A girl is digging a hole.
3. A woman is carrying a bag of soil.
4. A man is pushing a cart.
5. An old man is sweeping the ground.
```

**イラストB** → `public/images/pre2/pre2-03-b.png`

```
Scene: a street near a station.
A girl in the center stands in front of a notice board with a colorful poster showing people cleaning a beach (pictures only, no words).
Thought bubble: the girl and her friend walking together to the beach.
```

### pre2-04 Local Festivals（地元のお祭り）

**イラストA** → `public/images/pre2/pre2-04-a.png`

```
Scene: a Japanese summer festival street with paper lanterns hanging overhead and a few food stalls.
From left to right:
1. A boy is beating a drum.
2. A girl is eating shaved ice.
3. A woman is selling fried noodles.
4. A man is taking a picture.
5. An old woman is carrying a lantern.
```

**イラストB** → `public/images/pre2/pre2-04-b.png`

```
Scene: a festival street at dusk with paper lanterns.
A boy in the center looks sadly at an ice cream cone that has fallen on the ground.
Thought bubble: a new ice cream cone.
```

### pre2-05 Recycling Clothes（服のリサイクル）

**イラストA** → `public/images/pre2/pre2-05-a.png`

```
Scene: a clothing shop with racks of clothes along the walls and a cash register on the right.
From left to right:
1. A boy is trying on a jacket.
2. A girl is looking in a mirror.
3. A woman is folding a sweater.
4. A man is paying for a shirt.
5. An old woman is carrying a shopping bag.
```

**イラストB** → `public/images/pre2/pre2-05-b.png`

```
Scene: a bedroom at home.
A woman in the center stands in front of an open closet that is so full that clothes are falling out.
Thought bubble: a shop bag full of clothes, to give them away.
```

### pre2-06 E-books（電子書籍）

**イラストA** → `public/images/pre2/pre2-06-a.png`

```
Scene: a bright bookstore with shelves full of colorful books (no readable titles).
From left to right:
1. A boy is reading a comic book.
2. A woman is using a tablet.
3. A man is putting books on a shelf.
4. A girl is carrying a basket.
5. An old man is talking on the phone.
```

**イラストB** → `public/images/pre2/pre2-06-b.png`

```
Scene: a train station platform.
A man in the center is waiting for a train with empty hands, looking into his bag and not finding a book.
Thought bubble: the man reading an e-book on his smartphone.
```

### pre2-07 Pets in Apartments（マンションでのペット）

**イラストA** → `public/images/pre2/pre2-07-a.png`

```
Scene: a quiet street in front of an apartment building, with a few trees and flower pots.
From left to right:
1. A boy is walking a dog.
2. A girl is holding a cat.
3. A woman is pushing a baby stroller.
4. A man is riding a bicycle.
5. An old man is watering some flowers.
```

**イラストB** → `public/images/pre2/pre2-07-b.png`

```
Scene: a pet shop.
A boy in the center presses his hands against a shop window and looks at cute puppies inside.
Thought bubble: the boy playing with his own puppy.
```

### pre2-08 Fresh Local Food（地元の新鮮な食べ物）

**イラストA** → `public/images/pre2/pre2-08-a.png`

```
Scene: an outdoor farmers' market with wooden stalls full of vegetables and fruit.
From left to right:
1. A boy is pushing a shopping cart.
2. A girl is choosing apples.
3. A woman is putting vegetables in a bag.
4. A man is carrying a box of carrots.
5. An old woman is paying for some vegetables.
```

**イラストB** → `public/images/pre2/pre2-08-b.png`

```
Scene: a kitchen.
A woman in the center opens a refrigerator door; the refrigerator is completely empty.
Thought bubble: fresh vegetables such as carrots and tomatoes at a market.
```

### pre2-09 School Trips Abroad（海外への修学旅行）

**イラストA** → `public/images/pre2/pre2-09-a.png`

```
Scene: an airport or station hall with a big window and a few benches.
From left to right:
1. A boy is pulling a suitcase.
2. A girl is looking at a map.
3. A woman is buying a ticket.
4. A man is looking at his watch.
5. An old man is talking on the phone.
```

**イラストB** → `public/images/pre2/pre2-09-b.png`

```
Scene: a bedroom at home.
A boy in the center tries to close a large suitcase on the floor that is overflowing with clothes.
Thought bubble: the boy taking some clothes out of the suitcase.
```

### pre2-10 Bicycles in Cities（都市での自転車）

**イラストA** → `public/images/pre2/pre2-10-a.png`

```
Scene: a city street with a bicycle lane, a traffic light and a bike parking area.
From left to right:
1. A boy is riding a bicycle.
2. A girl is putting on a helmet.
3. A woman is fixing a bicycle.
4. A man is waiting for the traffic light.
5. An old woman is locking a bicycle.
```

**イラストB** → `public/images/pre2/pre2-10-b.png`

```
Scene: a street in front of a house.
A woman in the center in work clothes crouches beside her bicycle and looks at its flat rear tire.
Thought bubble: a city bus.
```

### pre2-11 Museums with Audio Guides（音声ガイドのある美術館）

**イラストA** → `public/images/pre2/pre2-11-a.png`

```
Scene: a bright art museum gallery with a few framed paintings on the walls and a bench.
From left to right:
1. A girl is listening with headphones.
2. A boy is looking at a painting.
3. A woman is writing in a notebook.
4. A man is looking at a map.
5. An old woman is sitting on a bench.
```

**イラストB** → `public/images/pre2/pre2-11-b.png`

```
Scene: a museum hall with paintings on the wall.
A woman in the center holds a pair of headphones in her hand and looks at them with a puzzled face.
Thought bubble: a museum staff member in a uniform helping her.
```

### pre2-12 Working from Home（在宅勤務）

**イラストA** → `public/images/pre2/pre2-12-a.png`

```
Scene: a bright living room in a house, with a sofa and a table.
From left to right:
1. A man is using a laptop.
2. A woman is talking on the phone.
3. A boy is playing a video game.
4. A girl is cleaning the floor.
5. An old woman is watering a plant.
```

**イラストB** → `public/images/pre2/pre2-12-b.png`

```
Scene: a home office.
A man in the center sits alone at a desk with a laptop, resting his chin on his hand and looking lonely.
Thought bubble: an office building with coworkers waving.
```
