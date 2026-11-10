// 2級カードデータの形式チェック。使い方: bunx tsx scripts/check_grade2.ts [ファイル...]
// 引数なしなら src/data/grade2Cards.ts（全カード）を検査する。
import path from 'path';
import { pathToFileURL } from 'url';
import type { ExamCard } from '../src/types';
import { G2_Q2_TEXT } from '../src/data/grade2Shared';

const BACKGROUNDS = ['park', 'kitchen', 'classroom', 'library', 'street', 'station', 'beach', 'livingroom', 'shop', 'schoolyard', 'garden', 'mountain', 'restaurant', 'gym', 'zoo', 'hospital', 'pool', 'rink'];
const wc = (s: string) => s.trim().split(/\s+/).length;
const sentences = (s: string) => (s.replace(/\b(Mr|Mrs|Ms|Dr)\./g, '$1').match(/[.!?]["”]?(\s|$)/g) || []).length;

const files = process.argv.slice(2).length ? process.argv.slice(2) : ['src/data/grade2Cards.ts'];
let errors = 0;
const seen = new Set<string>();
const titles = new Set<string>();
let count = 0;

for (const f of files) {
  const mod = await import(pathToFileURL(path.resolve(f)).href);
  const cards = Object.values(mod).find((v) => Array.isArray(v)) as ExamCard[];
  for (const c of cards) {
    count++;
    const err = (m: string) => {
      errors++;
      console.log(`✗ ${c.id}: ${m}`);
    };
    if (!/^g2-\d\d$/.test(c.id)) err('id は g2-NN');
    if (seen.has(c.id)) err('id が重複');
    seen.add(c.id);
    if (titles.has(c.title)) err('title が重複');
    titles.add(c.title);
    if (c.grade !== '2') err("grade は '2'");
    if (!['basic', 'standard', 'challenge'].includes(c.level)) err('level');
    const n = wc(c.passage);
    if (n < 52 || n > 68) err(`passage は 55〜65語程度（現在 ${n}語）`);
    if (!c.passageJa || c.vocabulary.length < 5) err('passageJa / vocabulary（5語以上）');
    if (c.q5) err('2級に q5 は無い');
    if (c.scene || c.sceneB) err('2級は scene / sceneB ではなく story を使う');

    const st = c.story;
    if (!st || st.panels.length !== 3) {
      err('story.panels は3コマ');
      continue;
    }
    if (!/^One day, .+\.$/.test(st.firstSentence)) err('firstSentence は "One day, ... ." の形');
    if (!st.panels[0].speech) err('1コマ目に speech（セリフ）が必要');
    if (st.panels[0].caption) err('1コマ目に caption は付けない');
    st.panels.forEach((p, i) => {
      if (i > 0 && !p.caption) err(`${i + 1}コマ目に caption が必要`);
      if (!BACKGROUNDS.includes(p.scene.background)) err(`${i + 1}コマ目 background が不正: ${p.scene.background}`);
      if ((p.scene as any).image) err(`${i + 1}コマ目: image は書かない（自動で決まる）`);
      if (!p.scene.description.startsWith(`Panel ${i + 1}`)) err(`${i + 1}コマ目 description は "Panel ${i + 1} (...)" で始める`);
      const people = p.scene.items.filter((it) => /^(👦|👧|👨|👩|🧒|🧑|👴|👵|👱|🧓)/u.test(it.emoji));
      if (people.length < 1 || people.length > 3) err(`${i + 1}コマ目 人物は1〜3人（現在 ${people.length}人）`);
      if (p.scene.items.length > 7) err(`${i + 1}コマ目 items は7個まで`);
      for (const it of p.scene.items) {
        if (it.x < 6 || it.x > 94 || it.y < 10 || it.y > 88) err(`${i + 1}コマ目 ${it.emoji} の座標が範囲外 (${it.x}, ${it.y})`);
        if (it.thought && !people.includes(it)) err(`${i + 1}コマ目 thought は人物に付ける`);
      }
      if (p.speech && !p.scene.description.includes(p.speech.text)) err(`${i + 1}コマ目 description に speech の文をそのまま含める`);
      if (p.speech && wc(p.speech.text) > 12) err(`${i + 1}コマ目 speech は12語以内`);
      if (p.caption && wc(p.caption) > 7) err(`${i + 1}コマ目 caption は7語以内`);
    });

    if (!/^According to the passage, (how|why) /.test(c.q1.text)) err('q1 は "According to the passage, how/why ...?"');
    if (c.q2.text !== G2_Q2_TEXT) err('q2.text は G2_Q2_TEXT');
    const story = c.q2.modelAnswers[0] || '';
    if (c.q2.modelAnswers.length !== 1) err('q2.modelAnswers は1つ');
    if (!story.startsWith(st.firstSentence)) err('q2 模範解答は firstSentence で始める');
    if (sentences(story) < 6 || sentences(story) > 8) err(`q2 模範解答は7文前後（現在 ${sentences(story)}文）`);
    if (/\b(is|are) \w+ing\b/.test(story.replace(/"[^"]*"/g, ''))) err('q2 模範解答の地の文は過去形・過去進行形');
    st.panels.forEach((p, i) => {
      if (p.caption && !story.includes(p.caption)) err(`q2 模範解答に ${i + 1}コマ目の caption "${p.caption}" を含める`);
      if (p.speech && !story.includes(p.speech.text)) err(`q2 模範解答に ${i + 1}コマ目のセリフを含める`);
    });
    if (!/^Some people say that .+ What do you think about that\?$/.test(c.q3.text)) err('q3 は "Some people say that ... What do you think about that?"');
    if (c.q3.modelAnswers.length !== 2 || !c.q3.modelAnswers[0].startsWith('I agree.') || !c.q3.modelAnswers[1].startsWith('I disagree.'))
      err('q3.modelAnswers は [I agree. ..., I disagree. ...] の2つ');
    c.q3.modelAnswers.forEach((m) => sentences(m) !== 3 && err('q3 模範解答は「I agree/disagree.＋理由2文」の3文'));
    if (!/^(Today|These days|Nowadays), .+ Do you think .+\?$/.test(c.q4.text)) err('q4 は "Today, ... Do you think ...?"');
    if (c.q4.followUpYes !== 'Why?' || c.q4.followUpNo !== 'Why not?') err('q4 の追加質問は Why? / Why not?');
    if (c.q4.modelAnswers[0] !== 'Yes. / No.') err("q4.modelAnswers は ['Yes. / No.']");
    for (const m of [...(c.q4.modelAnswersYes || []), ...(c.q4.modelAnswersNo || [])]) if (sentences(m) !== 2) err('q4 の Yes/No 模範解答は2文');
    if (!c.q4.modelAnswersYes?.length || !c.q4.modelAnswersNo?.length) err('q4 modelAnswersYes / No');
    for (const k of ['q1', 'q2', 'q3', 'q4'] as const) {
      const q = c[k];
      if (!q.ja || !q.explanation || !q.point || !q.commonMistakes?.length) err(`${k}: ja / explanation / point / commonMistakes`);
    }
  }
}
console.log(errors ? `\n${errors} 件の問題` : `OK: ${count} 枚`);
process.exit(errors ? 1 : 0);
