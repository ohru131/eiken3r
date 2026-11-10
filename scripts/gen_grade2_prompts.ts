// docs/grade2-image-prompts.md のカード別プロンプト部分をカードデータから生成する。
// 使い方: bunx tsx scripts/gen_grade2_prompts.ts（カードの story を直したら実行し直す）
import fs from 'fs';
import { GRADE2_CARDS } from '../src/data/grade2Cards';

const HEAD = fs.readFileSync('docs/grade2-image-prompts.md', 'utf8').split('<!-- cards:start -->')[0];
const body = GRADE2_CARDS.map((c) => {
  const panels = c.story!.panels
    .map((p, i) => {
      // 絵には文字を入れない。セリフはアプリが文字で表示するので、話している様子だけ描かせる
      let d = p.scene.description.replace(/^Panel \d+ \(([^)]*)\):\s*/, 'Scene: $1. ');
      if (p.speech) d += ` (${p.speech.speaker} is speaking with mouth open and a hand gesture. Do not draw the words or a speech bubble.)`;
      return `**コマ${i + 1}** → \`public/images/g2/${c.id}-${i + 1}.png\`${p.caption ? `（コマ上の言葉: ${p.caption}）` : ''}${p.speech ? `（セリフ: ${p.speech.speaker} "${p.speech.text}"）` : ''}\n\n\`\`\`\n${d}\n\`\`\``;
    })
    .join('\n\n');
  return `### ${c.id} ${c.title}（${c.japaneseTitle}）\n\n書き出し: ${c.story!.firstSentence}\n\n${panels}`;
}).join('\n\n');
fs.writeFileSync('docs/grade2-image-prompts.md', `${HEAD}<!-- cards:start -->\n\n${body}\n`);
console.log(`${GRADE2_CARDS.length} 枚分のプロンプトを書き出しました`);
