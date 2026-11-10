# 英検2級 問題カード イラスト作成プロンプト

2級カードの3コマ漫画（No.2）を画像生成AIで作るためのプロンプト集。
画像が無い間、アプリは絵文字で描いた仮イラストを表示し、右上に「仮イラスト」と出す。

## 置き場所とファイル名

| 用途 | パス | 例 |
| --- | --- | --- |
| 1コマ目 | `public/images/g2/<カードID>-1.png` | `public/images/g2/g2-01-1.png` |
| 2コマ目 | `public/images/g2/<カードID>-2.png` | `public/images/g2/g2-01-2.png` |
| 3コマ目 | `public/images/g2/<カードID>-3.png` | `public/images/g2/g2-01-3.png` |

- 1コマ1ファイル。縦横比 **4:3**（推奨 1200×900px、最低 800×600px）。表示枠が 4:3 で `object-cover` のため、他の比率は端が切れる
- 置いたらリロードするだけで反映。コード変更は不要
- **絵に文字は入れない**。書き出しの文・コマ上の言葉（The next day など）・セリフはアプリが文字で表示する。吹き出し（考えていること）は絵だけで描く

## 共通スタイル（全プロンプトの先頭に付ける）

```
Simple flat illustration for an English speaking test card, in the style of a Japanese EIKEN Grade 2 exam comic panel.
Clean black outlines, flat soft colors, white or very light background, no shading, no gradients.
One panel of a three-panel story. Two or three people, large in the frame, whole upper body visible, actions clear at a glance.
If a person is thinking about something, draw a cloud-shaped thought bubble above that person containing a simple picture only.
No text, no letters, no numbers, no speech bubbles, no logos, no watermark. Aspect ratio 4:3, landscape.
Keep the same characters (same faces, hair and clothes) across the three panels of one card.
```

### ネガティブプロンプト（対応しているツールのみ）

```
text, letters, words, numbers, captions, speech balloon, watermark, signature, logo, photorealistic, 3d render, dark lighting, cluttered background, extra people, cropped heads, deformed hands
```

## 作成時のチェックポイント

- 各コマの内容が、カードの `story.panels[n].scene.description`・No.2 模範解答と一致しているか（採点AIは description を正解として扱う）
- 3コマで人物の見た目（髪型・服）がそろっているか。1枚のカードの3コマは同じ会話の中で続けて生成すると安定する
- 吹き出しの中身が、description の「thinking of ~」の内容と分かる絵になっているか
- 絵を差し替えて内容が変わった場合は、カードデータの `description` と No.2 模範解答も直す
- カードデータを直したら `bunx tsx scripts/gen_grade2_prompts.ts` でこの文書の下半分を作り直す

---

## カード別プロンプト

共通スタイルの後ろに、各コマの英文を続けて使う。

<!-- cards:start -->

### g2-01 Reducing Food Waste（食品ロスを減らす）

書き出し: One day, Mr. and Mrs. Sato were talking in their kitchen.

**コマ1** → `public/images/g2/g2-01-1.png`（セリフ: Mr. Sato "We throw away too much food."）

```
Scene: in the kitchen. Mr. Sato is talking to his wife. There is a trash can full of leftover food next to them. Mr. Sato says, "We throw away too much food." (Mr. Sato is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-01-2.png`（コマ上の言葉: That weekend at a supermarket）

```
Scene: that weekend at a supermarket. Mrs. Sato is checking a shopping list. Mr. Sato is pushing a shopping cart and thinking of buying some meat.
```

**コマ3** → `public/images/g2/g2-01-3.png`（コマ上の言葉: That evening）

```
Scene: that evening in the kitchen. Mr. Sato is cooking dinner. Mrs. Sato is holding leftover vegetables and thinking of putting them in a container to keep them.
```

### g2-02 Delivery Lockers（宅配ロッカー）

書き出し: One day, Mr. and Mrs. Kato were looking at a computer in their living room.

**コマ1** → `public/images/g2/g2-02-1.png`（セリフ: Mrs. Kato "Let's order a birthday present for our son online."）

```
Scene: in the living room. Mr. and Mrs. Kato are looking at a computer together. Mrs. Kato says to her husband, "Let's order a birthday present for our son online." (Mrs. Kato is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-02-2.png`（コマ上の言葉: A few days later at a station）

```
Scene: a few days later at a station. Mrs. Kato is taking a package out of a delivery locker. Mr. Kato is standing next to her and thinking of buying a birthday cake.
```

**コマ3** → `public/images/g2/g2-02-3.png`（コマ上の言葉: That evening）

```
Scene: that evening in the living room. Mr. Kato is wrapping the birthday present. Their son has just come home, and he sees the present.
```

### g2-03 Student Volunteers（学生ボランティア）

書き出し: One day, Takuya and his friend Ken were looking at a poster at school.

**コマ1** → `public/images/g2/g2-03-1.png`（セリフ: Takuya "Let's join the beach cleanup this Sunday."）

```
Scene: in a classroom. Takuya and Ken are looking at a poster about a beach cleanup. Takuya says to Ken, "Let's join the beach cleanup this Sunday." (Takuya is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-03-2.png`（コマ上の言葉: On Sunday at the beach）

```
Scene: on Sunday at the beach. Takuya is picking up trash on the beach. Ken is thinking of swimming in the sea after the cleanup.
```

**コマ3** → `public/images/g2/g2-03-3.png`（コマ上の言葉: After the cleanup）

```
Scene: after the cleanup at the beach. Takuya is drinking some water. It has started to rain, so Ken, who is holding a swim ring, cannot swim in the sea.
```

### g2-04 Charging Electric Cars（電気自動車の充電）

書き出し: One day, Mr. and Mrs. Yamada were planning a drive to the mountains.

**コマ1** → `public/images/g2/g2-04-1.png`（セリフ: Mr. Yamada "Let's go to the mountains in our new electric car."）

```
Scene: in the living room. Mr. and Mrs. Yamada are looking at a map. Mr. Yamada says to his wife, "Let's go to the mountains in our new electric car." (Mr. Yamada is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-04-2.png`（コマ上の言葉: The next morning at a convenience store）

```
Scene: the next morning at a convenience store. Mr. Yamada is charging their electric car. Mrs. Yamada is thinking of buying some rice balls for lunch.
```

**コマ3** → `public/images/g2/g2-04-3.png`（コマ上の言葉: At noon in the mountains）

```
Scene: at noon in the mountains. Mrs. Yamada is taking pictures of the view. Mr. Yamada finds that there is a long line of people in front of a restaurant.
```

### g2-05 Working from Home（在宅勤務）

書き出し: One day, Mr. Suzuki was working from home in his living room.

**コマ1** → `public/images/g2/g2-05-1.png`（セリフ: Mika "Can you come to my piano concert this afternoon?"）

```
Scene: in the living room. Mr. Suzuki is working on his computer at home. His daughter Mika says to him, "Can you come to my piano concert this afternoon?" (Mika is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-05-2.png`（コマ上の言葉: That afternoon in the school gym）

```
Scene: that afternoon in the school gym. Mika is playing the piano at the concert. Mr. Suzuki is taking a video of her with his smartphone.
```

**コマ3** → `public/images/g2/g2-05-3.png`（コマ上の言葉: That evening）

```
Scene: that evening in the living room. Mr. Suzuki is having an online meeting on his computer. Mika is thinking of watching the concert video with him.
```

### g2-06 Bike Sharing in Cities（都市のシェアサイクル）

書き出し: One day, Mr. Kimura and his son Haruto were at a station.

**コマ1** → `public/images/g2/g2-06-1.png`（セリフ: Haruto "Let's rent bicycles and ride to the museum."）

```
Scene: at a station. Mr. Kimura and his son Haruto are standing near some shared bicycles. Haruto says to his father, "Let's rent bicycles and ride to the museum." (Haruto is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-06-2.png`（コマ上の言葉: On the way to the museum）

```
Scene: on the way to the museum. Mr. Kimura is riding a bicycle on the street. Haruto is riding behind him and thinking of eating ice cream.
```

**コマ3** → `public/images/g2/g2-06-3.png`（コマ上の言葉: At the museum）

```
Scene: at the museum. Mr. Kimura is parking the bicycles. Haruto is looking at a sign that says the museum is closed today.
```

### g2-07 Helping Foreign Tourists（外国人観光客への対応）

書き出し: One day, Mr. and Mrs. Nakamura were working at their restaurant.

**コマ1** → `public/images/g2/g2-07-1.png`（セリフ: Mrs. Nakamura "We should make an English menu for foreign customers."）

```
Scene: at their restaurant. Mr. Nakamura is holding a Japanese menu. Mrs. Nakamura says to her husband, "We should make an English menu for foreign customers." (Mrs. Nakamura is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-07-2.png`（コマ上の言葉: The next week）

```
Scene: the next week at the restaurant. Mr. Nakamura is giving the new English menu to a foreign customer. Mrs. Nakamura is cooking tempura in the kitchen.
```

**コマ3** → `public/images/g2/g2-07-3.png`（コマ上の言葉: A few days later）

```
Scene: a few days later at the restaurant. Some customers are speaking Spanish. Mr. Nakamura cannot understand them, and he is thinking of using a translation app.
```

### g2-08 Children and Smartphones（子どもとスマートフォン）

書き出し: One day, Mrs. Ogawa and her son Ren were talking in the living room.

**コマ1** → `public/images/g2/g2-08-1.png`（セリフ: Ren "I want my own smartphone like my friends."）

```
Scene: in the living room. Mrs. Ogawa is listening to her son Ren. Ren says to his mother, "I want my own smartphone like my friends." (Ren is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-08-2.png`（コマ上の言葉: The next weekend at a shop）

```
Scene: the next weekend at a shop. Ren is choosing a new smartphone. Mrs. Ogawa is thinking of making rules for using it.
```

**コマ3** → `public/images/g2/g2-08-3.png`（コマ上の言葉: Late that night）

```
Scene: late that night in the living room. Ren is playing a game on his new smartphone. Mrs. Ogawa is pointing at the clock because it is already eleven.
```

### g2-09 Giving Old Clothes a New Life（古着に新しい命を）

書き出し: One day, Mrs. Inoue and her daughter Mai were cleaning Mai's room.

**コマ1** → `public/images/g2/g2-09-1.png`（セリフ: Mai "These clothes are too small for me now."）

```
Scene: in Mai's room. Mrs. Inoue and Mai are cleaning the room. Mai is holding some old clothes and says to her mother, "These clothes are too small for me now." (Mai is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-09-2.png`（コマ上の言葉: That weekend at a clothing store）

```
Scene: that weekend at a clothing store. Mai is putting her old clothes into a collection box. Mrs. Inoue is looking at a jacket.
```

**コマ3** → `public/images/g2/g2-09-3.png`（コマ上の言葉: That evening at home）

```
Scene: that evening at home. Mai is trying on her new jacket. Mrs. Inoue is holding her own old clothes and thinking of taking them to the store next time.
```

### g2-10 Buying Food from Local Farmers（地元の農家から食べ物を買う）

書き出し: One day, Mr. and Mrs. Kimura were talking in their living room.

**コマ1** → `public/images/g2/g2-10-1.png`（セリフ: Mrs. Kimura "Let's buy vegetables at the farmers' market tomorrow."）

```
Scene: in the living room. Mrs. Kimura is showing her husband a flyer about a farmers' market. Mrs. Kimura says, "Let's buy vegetables at the farmers' market tomorrow." (Mrs. Kimura is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-10-2.png`（コマ上の言葉: The next morning at the market）

```
Scene: the next morning at the market. Mr. Kimura is buying tomatoes from an old farmer. Mrs. Kimura is holding a basket and thinking of making a salad with the vegetables.
```

**コマ3** → `public/images/g2/g2-10-3.png`（コマ上の言葉: That evening）

```
Scene: that evening in the kitchen. Mrs. Kimura is cutting vegetables. Mr. Kimura is looking into an empty shopping bag and realizes that he left the tomatoes at the market.
```

### g2-11 Elderly People and Animals（高齢者と動物）

書き出し: One day, Yuta Yamada was visiting his grandmother.

**コマ1** → `public/images/g2/g2-11-1.png`（セリフ: Yuta "Grandma, let's visit a pet shop this weekend."）

```
Scene: at his grandmother's house. Yuta is talking to his grandmother, who looks a little lonely. Yuta says, "Grandma, let's visit a pet shop this weekend." (Yuta is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-11-2.png`（コマ上の言葉: That weekend at a pet shop）

```
Scene: that weekend at a pet shop. Yuta is looking at a puppy. His grandmother is standing near a kitten and thinking of buying a cat.
```

**コマ3** → `public/images/g2/g2-11-3.png`（コマ上の言葉: A week later）

```
Scene: a week later at his grandmother's house. Yuta's grandmother is happily playing with her new cat. Yuta is sneezing because of the cat.
```

### g2-12 Paying Without Cash（現金を使わない支払い）

書き出し: One day, Mr. Hayashi and his daughter Mika were shopping at a supermarket.

**コマ1** → `public/images/g2/g2-12-1.png`（セリフ: Mr. Hayashi "Let's pay with my smartphone. It's quicker."）

```
Scene: at a supermarket register. Mr. Hayashi is holding up his smartphone to pay. Mika is standing next to a shopping cart. Mr. Hayashi says, "Let's pay with my smartphone. It's quicker." (Mr. Hayashi is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-12-2.png`（コマ上の言葉: That weekend at a festival）

```
Scene: that weekend at a festival. Mika is eating dango. Mr. Hayashi is standing in front of a food stand and thinking of buying takoyaki.
```

**コマ3** → `public/images/g2/g2-12-3.png`（コマ上の言葉: A few minutes later）

```
Scene: a few minutes later at the food stand. There is a sign that says "Cash Only." Mr. Hayashi is holding his smartphone and looks troubled because he cannot use it. Mika is taking some coins out of her purse.
```

### g2-13 Preparing for Natural Disasters（自然災害への備え）

書き出し: One day, Mrs. Ikeda and her son Takuya were watching the news about an earthquake.

**コマ1** → `public/images/g2/g2-13-1.png`（セリフ: Mrs. Ikeda "We should prepare an emergency bag for our family."）

```
Scene: in the living room. Mrs. Ikeda and Takuya are watching news about an earthquake on TV. Mrs. Ikeda says, "We should prepare an emergency bag for our family." (Mrs. Ikeda is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-13-2.png`（コマ上の言葉: That weekend at a store）

```
Scene: that weekend at a store. Takuya is putting bottles of water into a shopping cart that already has a box of cookies in it. Mrs. Ikeda is thinking of buying a flashlight.
```

**コマ3** → `public/images/g2/g2-13-3.png`（コマ上の言葉: That night）

```
Scene: that night in the living room. Mrs. Ikeda is packing water and a flashlight into an emergency bag. Takuya is eating the cookies that they bought for the emergency bag.
```

### g2-14 Studying Abroad Online（オンライン留学）

書き出し: One day, Mr. Mori and his daughter Saki were talking about her summer vacation.

**コマ1** → `public/images/g2/g2-14-1.png`（セリフ: Saki "I want to join a summer program in Canada."）

```
Scene: in the living room. Saki is showing her father a pamphlet about a study abroad program. Saki says, "I want to join a summer program in Canada." (Saki is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-14-2.png`（コマ上の言葉: A month later in Canada）

```
Scene: a month later at a school in Canada. Saki is talking with her new friends. One of her friends is taking a picture of them with a camera.
```

**コマ3** → `public/images/g2/g2-14-3.png`（コマ上の言葉: After she returned to Japan）

```
Scene: after she returned to Japan, late at night. Saki is having a video call with her friends in Canada on her computer. The clock shows midnight. Her father is worried that she is staying up too late and thinking that she should go to bed.
```

### g2-15 Robots in Restaurants（レストランで働くロボット）

書き出し: One day, Mrs. Ishikawa and her son Riku went to a new restaurant.

**コマ1** → `public/images/g2/g2-15-1.png`（セリフ: Riku "Look, a robot is bringing our food!"）

```
Scene: at a restaurant. A robot is carrying food to their table. Riku is pointing at the robot and says, "Look, a robot is bringing our food!" (Riku is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-15-2.png`（コマ上の言葉: After dinner）

```
Scene: after dinner at the restaurant. Mrs. Ishikawa is paying at the register. Riku is taking a picture of the robot with a smartphone.
```

**コマ3** → `public/images/g2/g2-15-3.png`（コマ上の言葉: That evening at home）

```
Scene: that evening at home. Riku is making a robot out of cardboard boxes, and the room is messy. Mrs. Ishikawa is surprised and thinking of telling him to clean up the room.
```

### g2-16 New Services at Public Libraries（公共図書館の新しいサービス）

書き出し: One day, Mr. Ogawa and his granddaughter Emi saw a poster at the library.

**コマ1** → `public/images/g2/g2-16-1.png`（セリフ: Emi "Grandpa, why don't you join this computer class?"）

```
Scene: at the library. Emi and Mr. Ogawa are looking at a poster about a computer class. Emi says, "Grandpa, why don't you join this computer class?" (Emi is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-16-2.png`（コマ上の言葉: On the day of the class）

```
Scene: on the day of the class at the library. Mr. Ogawa is using a computer. A woman teacher is showing him how to send an e-mail.
```

**コマ3** → `public/images/g2/g2-16-3.png`（コマ上の言葉: That night）

```
Scene: that night. On the left, Mr. Ogawa is happily typing an e-mail on his computer at his house. On the right, Emi is looking at her smartphone in surprise because she has received many e-mails from her grandfather.
```

### g2-17 Getting Enough Sleep（十分な睡眠をとる）

書き出し: One day, Mrs. Fujita and her son Kota were having breakfast.

**コマ1** → `public/images/g2/g2-17-1.png`（セリフ: Mrs. Fujita "You look tired because you played games late again."）

```
Scene: in the kitchen in the morning. Kota looks very sleepy at the breakfast table. Mrs. Fujita says, "You look tired because you played games late again." (Mrs. Fujita is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-17-2.png`（コマ上の言葉: That night）

```
Scene: that night in the living room. Kota is putting his smartphone into a box. Mrs. Fujita is bringing him a cup of warm milk.
```

**コマ3** → `public/images/g2/g2-17-3.png`（コマ上の言葉: The next morning）

```
Scene: the next morning. Kota is still sleeping deeply on the sofa. Mrs. Fujita is pointing at a clock that shows eight o'clock and is worried that he will be late for school.
```

### g2-18 Bringing Our Own Shopping Bags（エコバッグを持ち歩く）

書き出し: One day, Mrs. Nakamura and her son Kenta were getting ready to go shopping.

**コマ1** → `public/images/g2/g2-18-1.png`（セリフ: Mrs. Nakamura "Let's take our own bag to the supermarket."）

```
Scene: at home in the living room. Mrs. Nakamura is holding a reusable shopping bag and talking to her son Kenta. Kenta is putting on his shoes. Mrs. Nakamura says, "Let's take our own bag to the supermarket." (Mrs. Nakamura is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-18-2.png`（コマ上の言葉: At the supermarket）

```
Scene: at the supermarket. Mrs. Nakamura is paying at the register. Kenta is putting food, such as oranges, into their reusable shopping bag.
```

**コマ3** → `public/images/g2/g2-18-3.png`（コマ上の言葉: On the way home）

```
Scene: on the way home on the street. The shopping bag has broken, and some oranges have fallen on the street. Kenta is picking up the oranges. Mrs. Nakamura is holding the broken bag and thinking of buying a stronger bag.
```

### g2-19 Seeing a Doctor Online（オンライン診療）

書き出し: One day, Yuki Okada and her grandfather were talking in the living room.

**コマ1** → `public/images/g2/g2-19-1.png`（セリフ: Grandfather "I have a bad cough, but the hospital is far away."）

```
Scene: in the living room. Yuki's grandfather is coughing and talking to Yuki. Yuki is bringing him a cup of tea. Her grandfather says, "I have a bad cough, but the hospital is far away." (Grandfather is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-19-2.png`（コマ上の言葉: The next morning）

```
Scene: the next morning in the living room. Yuki is holding a tablet and helping her grandfather with a video call. Her grandfather is talking with a doctor on the screen.
```

**コマ3** → `public/images/g2/g2-19-3.png`（コマ上の言葉: That evening）

```
Scene: that evening in the kitchen. Yuki's grandfather is taking his medicine with a glass of water. Yuki is standing by the stove and thinking of making soup for him.
```

### g2-20 New Uses for Empty Houses（空き家の活用）

書き出し: One day, Mr. and Mrs. Hasegawa were planning a weekend trip.

**コマ1** → `public/images/g2/g2-20-1.png`（セリフ: Mrs. Hasegawa "Let's stay at that new guesthouse in the countryside."）

```
Scene: at home in the living room. Mrs. Hasegawa is showing her husband a website on her computer. Mr. Hasegawa is looking at a map. Mrs. Hasegawa says, "Let's stay at that new guesthouse in the countryside." (Mrs. Hasegawa is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-20-2.png`（コマ上の言葉: That weekend at the guesthouse）

```
Scene: that weekend at the guesthouse, an old Japanese house. Mr. Hasegawa is taking pictures of the old house. Mrs. Hasegawa is holding a suitcase and looking forward to eating dinner there.
```

**コマ3** → `public/images/g2/g2-20-3.png`（コマ上の言葉: The next morning）

```
Scene: the next morning on the street. It is raining. Mr. Hasegawa is opening an umbrella. Mrs. Hasegawa is thinking of going to a café nearby.
```

### g2-21 Local Coaches for School Clubs（部活動の地域移行）

書き出し: One day, Riko Kondo and her father were talking after dinner.

**コマ1** → `public/images/g2/g2-21-1.png`（セリフ: Riko "A new coach is coming to our tennis club tomorrow."）

```
Scene: at home in the living room. Riko is holding a tennis ball and talking to her father. Her father is reading a newspaper. Riko says, "A new coach is coming to our tennis club tomorrow." (Riko is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-21-2.png`（コマ上の言葉: The next day at school）

```
Scene: the next day at school, on the tennis court. Riko is practicing her serve. The new coach is watching her and giving her advice.
```

**コマ3** → `public/images/g2/g2-21-3.png`（コマ上の言葉: That Saturday）

```
Scene: that Saturday at home. It is raining outside, so Riko cannot play tennis. Riko is looking out the window sadly. Her father is thinking of taking her to an indoor gym to practice.
```

### g2-22 Convenience Stores at Night（24時間営業の見直し）

書き出し: One day, Takuya Sakamoto and his sister Mai were studying late at night.

**コマ1** → `public/images/g2/g2-22-1.png`（セリフ: Takuya "Let's buy some snacks at the convenience store."）

```
Scene: at home in the living room late at night. Takuya is talking to his sister Mai. Mai is doing her homework at the table. Takuya says, "Let's buy some snacks at the convenience store." (Takuya is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-22-2.png`（コマ上の言葉: Ten minutes later）

```
Scene: ten minutes later on a dark street. Takuya is walking to the convenience store with a flashlight. Mai is walking with him and looking forward to eating ice cream.
```

**コマ3** → `public/images/g2/g2-22-3.png`（コマ上の言葉: At the convenience store）

```
Scene: at the convenience store. The store is closed. Takuya is looking at a "Closed" sign on the door. Mai is thinking of going home and making instant noodles.
```

### g2-23 Virtual Museum Tours（美術館のバーチャルツアー）

書き出し: One day, Haruto Aoki was talking with his grandmother in the living room.

**コマ1** → `public/images/g2/g2-23-1.png`（セリフ: Grandmother "I want to see the famous paintings in Paris someday."）

```
Scene: in the living room. Haruto's grandmother is holding an art book and talking to Haruto. Haruto is holding a tablet. His grandmother says, "I want to see the famous paintings in Paris someday." (Grandmother is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-23-2.png`（コマ上の言葉: That evening）

```
Scene: that evening in the living room. Haruto is showing his grandmother a virtual museum tour on his tablet. His grandmother is looking at a painting on the screen and thinking of painting a picture herself.
```

**コマ3** → `public/images/g2/g2-23-3.png`（コマ上の言葉: The next Sunday at a park）

```
Scene: the next Sunday at a park. Haruto's grandmother is painting a picture of a lake. Haruto is looking up at the dark clouds and is worried that it will start to rain soon.
```

### g2-24 Self-Driving Buses for Older People（高齢者と自動運転バス）

書き出し: One day, Mr. Nishimura and his daughter Emi were talking in the living room.

**コマ1** → `public/images/g2/g2-24-1.png`（セリフ: Emi "Dad, I think you should stop driving soon."）

```
Scene: in the living room. Emi is talking to her father, Mr. Nishimura. Mr. Nishimura is holding his car keys. Emi says, "Dad, I think you should stop driving soon." (Emi is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)
```

**コマ2** → `public/images/g2/g2-24-2.png`（コマ上の言葉: A week later at a bus stop）

```
Scene: a week later at a bus stop. Emi is reading the bus timetable. Mr. Nishimura is waiting for the small self-driving bus and thinking of going to the supermarket.
```

**コマ3** → `public/images/g2/g2-24-3.png`（コマ上の言葉: At the supermarket）

```
Scene: at the supermarket. Mr. Nishimura is putting a lot of food into his basket. Emi is worried that the shopping bags will be too heavy to carry.
```
