import React from 'react';
import { Scene, SceneBackground } from '../types';

interface BgDef {
  top: string;
  bottom: string;
  floor: string;
  floorY: number; // %
  decor?: React.ReactNode;
  /** 床の上に描く（プールの水など） */
  overlay?: React.ReactNode;
}

const cloud = (x: number, y: number) => (
  <g fill="#ffffff" opacity="0.9">
    <ellipse cx={x} cy={y} rx="26" ry="11" />
    <ellipse cx={x + 18} cy={y - 7} rx="18" ry="10" />
  </g>
);
const clock = (cx: number, cy: number, r = 15) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#fff" stroke="#64748b" strokeWidth="3" />
    <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.6} stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    <line x1={cx} y1={cy} x2={cx + r * 0.45} y2={cy} stroke="#334155" strokeWidth="2" strokeLinecap="round" />
  </g>
);
const windowEl = (x: number, y: number) => (
  <g>
    <rect x={x} y={y} width="70" height="50" rx="3" fill="#bae6fd" stroke="#94a3b8" strokeWidth="3" />
    <line x1={x + 35} y1={y} x2={x + 35} y2={y + 50} stroke="#94a3b8" strokeWidth="3" />
  </g>
);

const BG: Record<SceneBackground, BgDef> = {
  park: { top: '#bfe3ff', bottom: '#e0f2fe', floor: '#86efac', floorY: 62, decor: <>{cloud(80, 40)}{cloud(220, 28)}</> },
  garden: { top: '#c7ecff', bottom: '#ecfeff', floor: '#a3e635', floorY: 64, decor: <>{cloud(120, 36)}<rect x="0" y="120" width="400" height="20" fill="#d6b88a" opacity="0.6" /></> },
  mountain: {
    top: '#a5d8ff',
    bottom: '#e0f2fe',
    floor: '#84cc16',
    floorY: 70,
    decor: (
      <>
        
        <polygon points="0,170 90,60 180,170" fill="#64748b" />
        <polygon points="70,84 90,60 110,84" fill="#f8fafc" />
        <polygon points="140,170 250,45 360,170" fill="#475569" />
        <polygon points="226,72 250,45 274,72" fill="#f8fafc" />
      </>
    ),
  },
  beach: {
    top: '#7dd3fc',
    bottom: '#bae6fd',
    floor: '#fde68a',
    floorY: 66,
    decor: (
      <>
        
        {cloud(90, 35)}
        <rect x="0" y="120" width="400" height="40" fill="#38bdf8" />
        <path d="M0,158 Q50,150 100,158 T200,158 T300,158 T400,158 L400,165 L0,165Z" fill="#e0f2fe" />
      </>
    ),
  },
  street: {
    top: '#cfe8ff',
    bottom: '#eef6ff',
    floor: '#cbd5e1',
    floorY: 66,
    decor: (
      <>
        <rect x="10" y="40" width="80" height="120" fill="#fca5a5" />
        <rect x="100" y="70" width="70" height="90" fill="#fde68a" />
        <rect x="300" y="50" width="90" height="110" fill="#a5b4fc" />
        {[20, 50, 310, 345].map((x) => (
          <rect key={x} x={x} y="60" width="20" height="18" fill="#e0f2fe" />
        ))}
      </>
    ),
  },
  station: {
    top: '#e2e8f0',
    bottom: '#f1f5f9',
    floor: '#94a3b8',
    floorY: 68,
    decor: (
      <>
        <rect x="0" y="20" width="400" height="16" fill="#334155" />
        <rect x="140" y="50" width="120" height="32" rx="4" fill="#0f172a" />
        <text x="200" y="72" textAnchor="middle" fontSize="14" fill="#fbbf24" fontFamily="monospace">
          10:15 TOKYO
        </text>
        <rect x="0" y="160" width="400" height="6" fill="#facc15" />
      </>
    ),
  },
  kitchen: {
    top: '#fff7ed',
    bottom: '#ffedd5',
    floor: '#e7c9a0',
    floorY: 68,
    decor: (
      <>
        {windowEl(300, 30)}
        <rect x="0" y="110" width="170" height="54" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="10" y="40" width="140" height="40" fill="#fde68a" stroke="#d6b88a" />
      </>
    ),
  },
  restaurant: {
    top: '#fef3c7',
    bottom: '#fff7ed',
    floor: '#b45309',
    floorY: 70,
    decor: (
      <>
        {windowEl(30, 30)}
        {windowEl(300, 30)}
        <rect x="150" y="30" width="100" height="40" rx="6" fill="#7c2d12" />
        <text x="200" y="56" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="sans-serif">
          MENU
        </text>
      </>
    ),
  },
  livingroom: {
    top: '#ede9fe',
    bottom: '#f5f3ff',
    floor: '#d6b88a',
    floorY: 70,
    decor: (
      <>
        {windowEl(40, 30)}
        <rect x="240" y="40" width="74" height="46" rx="4" fill="#1e293b" /><rect x="245" y="45" width="64" height="36" rx="2" fill="#334155" /><rect x="268" y="86" width="18" height="8" fill="#475569" />
        {clock(360, 60, 16)}
      </>
    ),
  },
  classroom: {
    top: '#ecfdf5',
    bottom: '#f0fdf4',
    floor: '#d6b88a',
    floorY: 72,
    decor: (
      <>
        <rect x="90" y="20" width="220" height="70" rx="4" fill="#166534" stroke="#a16207" strokeWidth="5" />
        {clock(360, 40, 15)}
        {windowEl(5, 30)}
      </>
    ),
  },
  library: {
    top: '#fef9c3',
    bottom: '#fefce8',
    floor: '#a16207',
    floorY: 72,
    decor: (
      <>
        {[0, 300].map((x) => (
          <g key={x}>
            <rect x={x} y="20" width="100" height="140" fill="#92400e" />
            {[30, 70, 110].map((y) => (
              <g key={y}>
                <rect x={x + 6} y={y} width="88" height="4" fill="#78350f" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect key={i} x={x + 8 + i * 11} y={y - 26} width="8" height="26" fill={['#ef4444', '#3b82f6', '#22c55e', '#eab308'][i % 4]} />
                ))}
              </g>
            ))}
          </g>
        ))}
      </>
    ),
  },
  shop: {
    top: '#fce7f3',
    bottom: '#fdf2f8',
    floor: '#e5e7eb',
    floorY: 70,
    decor: (
      <>
        <rect x="0" y="18" width="400" height="22" fill="#f472b6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path key={i} d={`M${i * 40},40 q20,14 40,0`} fill="#fbcfe8" />
        ))}
        {[20, 140, 260].map((x) => (
          <g key={x}>
            <rect x={x} y="62" width="110" height="80" fill="#fff" stroke="#f9a8d4" strokeWidth="3" />
            <line x1={x} y1="102" x2={x + 110} y2="102" stroke="#f9a8d4" strokeWidth="3" />
          </g>
        ))}
      </>
    ),
  },
  schoolyard: {
    top: '#bfdbfe',
    bottom: '#eff6ff',
    floor: '#e4c49a',
    floorY: 62,
    decor: (
      <>
        
        <rect x="230" y="30" width="160" height="110" fill="#f1f5f9" stroke="#94a3b8" />
        {clock(310, 55, 12)}
        {[245, 285, 325, 355].map((x) => (
          <rect key={x} x={x} y="85" width="24" height="20" fill="#bae6fd" />
        ))}
      </>
    ),
  },
  gym: {
    top: '#fde68a',
    bottom: '#fef3c7',
    floor: '#d97706',
    floorY: 66,
    decor: (
      <>
        <rect x="170" y="26" width="60" height="40" fill="#fff" stroke="#334155" strokeWidth="3" />
        <rect x="190" y="44" width="20" height="14" fill="none" stroke="#ef4444" strokeWidth="2" />
        <ellipse cx="200" cy="70" rx="13" ry="4" fill="none" stroke="#ef4444" strokeWidth="3" />
        <path d="M187,70 l4,14 h18 l4,-14 M193,70 l2,14 M207,70 l-2,14" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#fde68a" strokeWidth="2" opacity="0.7" />
      </>
    ),
  },
  zoo: {
    top: '#bbf7d0',
    bottom: '#ecfccb',
    floor: '#bef264',
    floorY: 62,
    decor: (
      <>
        
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={i * 20 + 4} y="110" width="5" height="50" fill="#78716c" />
        ))}
        <rect x="0" y="110" width="400" height="5" fill="#78716c" />
      </>
    ),
  },
  pool: {
    top: '#e0f2fe',
    bottom: '#f0f9ff',
    floor: '#e2e8f0',
    floorY: 58,
    decor: (
      <>
        {windowEl(30, 26)}
        {windowEl(300, 26)}
      </>
    ),
    overlay: (
      <>
        <rect x="0" y="150" width="400" height="90" fill="#38bdf8" />
        <rect x="0" y="150" width="400" height="6" fill="#0ea5e9" />
        {[175, 200, 225].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f87171" strokeWidth="2" strokeDasharray="8 6" />
        ))}
        <path d="M0,190 q25,-6 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" stroke="#bae6fd" strokeWidth="2" fill="none" />
      </>
    ),
  },
  rink: {
    top: '#dbeafe',
    bottom: '#eff6ff',
    floor: '#f1f5f9',
    floorY: 60,
    decor: (
      <>
        <rect x="0" y="122" width="400" height="22" fill="#1d4ed8" />
        <rect x="0" y="122" width="400" height="4" fill="#93c5fd" />
        <ellipse cx="200" cy="200" rx="60" ry="16" fill="none" stroke="#93c5fd" strokeWidth="2" />
        <line x1="200" y1="150" x2="200" y2="240" stroke="#fca5a5" strokeWidth="2" />
      </>
    ),
  },
  hospital: {
    top: '#e0f2fe',
    bottom: '#f8fafc',
    floor: '#cbd5e1',
    floorY: 70,
    decor: (
      <>
        <rect x="170" y="25" width="60" height="60" rx="8" fill="#fff" stroke="#94a3b8" />
        <rect x="193" y="35" width="14" height="40" fill="#ef4444" />
        <rect x="180" y="48" width="40" height="14" fill="#ef4444" />
        {windowEl(30, 30)}
      </>
    ),
  },
};

// ---- 家具（絵文字にないもの）: emoji に '[table]' '[bench]' と書くと SVG で描く ----
const Furniture: React.FC<{ kind: string }> = ({ kind }) =>
  kind === '[table]' ? (
    <svg viewBox="0 0 120 50" style={{ width: '2.6em', height: '1.08em', display: 'block' }} aria-hidden>
      <rect x="4" y="4" width="112" height="9" rx="2" fill="#b45309" />
      <rect x="4" y="11" width="112" height="4" fill="#92400e" />
      <rect x="12" y="15" width="7" height="34" fill="#92400e" />
      <rect x="101" y="15" width="7" height="34" fill="#92400e" />
    </svg>
  ) : kind === '[bench]' ? (
    <svg viewBox="0 0 120 56" style={{ width: '2.5em', height: '1.17em', display: 'block' }} aria-hidden>
      <rect x="6" y="2" width="108" height="7" rx="2" fill="#a16207" />
      <rect x="6" y="12" width="108" height="7" rx="2" fill="#a16207" />
      <rect x="2" y="22" width="116" height="8" rx="2" fill="#ca8a04" />
      <rect x="12" y="30" width="7" height="26" fill="#57534e" />
      <rect x="101" y="30" width="7" height="26" fill="#57534e" />
    </svg>
  ) : null;

// ---- 人物: 顔の絵文字の下に簡単な体を描き、「何をしているか」を分かりやすくする ----
const PERSON_HEADS = ['👦', '👧', '👨', '👩', '🧒', '🧑', '👴', '👵', '👱', '🧓'];
const SHIRTS = ['#2563eb', '#dc2626', '#059669', '#d97706', '#7c3aed', '#0891b2', '#db2777'];

function personInfo(emoji: string) {
  const first = Array.from(emoji)[0];
  if (!PERSON_HEADS.includes(first)) return null;
  const female = ['👧', '👩', '👵'].includes(first) || emoji.includes('♀');
  const child = ['👦', '👧', '🧒'].includes(first);
  return { female, child };
}

const Body: React.FC<{ female: boolean; child: boolean; color: string }> = ({ female, child, color }) => (
  <svg viewBox="0 0 40 52" style={{ width: '0.82em', height: child ? '0.95em' : '1.15em', marginTop: '-0.12em', display: 'block' }} aria-hidden>
    {/* arms */}
    <path d="M10,6 Q3,16 6,26" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M30,6 Q38,14 36,24" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    <circle cx="6" cy="27" r="3.2" fill="#f5c9a0" />
    <circle cx="36" cy="25" r="3.2" fill="#f5c9a0" />
    {/* torso */}
    <rect x="9" y="2" width="22" height="24" rx="7" fill={color} />
    {female ? <path d="M9,22 L5,36 L35,36 L31,22 Z" fill={color} opacity="0.85" /> : null}
    {/* legs */}
    <rect x="12" y={female ? 34 : 24} width="6" height={female ? 14 : 24} rx="2" fill={female ? '#f5c9a0' : '#334155'} />
    <rect x="22" y={female ? 34 : 24} width="6" height={female ? 14 : 24} rx="2" fill={female ? '#f5c9a0' : '#334155'} />
    <ellipse cx="15" cy="49" rx="5" ry="2.6" fill="#1f2937" />
    <ellipse cx="25" cy="49" rx="5" ry="2.6" fill="#1f2937" />
  </svg>
);

const Thought: React.FC<{ emoji: string }> = ({ emoji }) => (
  <div className="absolute left-1/2 top-0 -translate-y-[95%] translate-x-[5%]" style={{ fontSize: '0.5em' }}>
    <div className="rounded-[1em] border-[0.08em] border-slate-700 bg-white px-[0.3em] py-[0.15em] leading-none shadow-sm">{emoji}</div>
    <div className="absolute -bottom-[0.32em] left-[0.25em] h-[0.22em] w-[0.22em] rounded-full border-[0.05em] border-slate-700 bg-white" />
    <div className="absolute -bottom-[0.6em] left-[0.05em] h-[0.14em] w-[0.14em] rounded-full border-[0.04em] border-slate-700 bg-white" />
  </div>
);

export const SceneIllustration: React.FC<{ scene: Scene; className?: string }> = ({ scene, className = '' }) => {
  const bg = BG[scene.background] || BG.park;
  const floorTop = (bg.floorY / 100) * 240;
  let personIdx = 0;
  return (
    <div
      className={`relative w-full aspect-[5/3] overflow-hidden rounded-xl border-2 border-slate-800/80 bg-white ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      <svg viewBox="0 0 400 240" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`sky-${scene.background}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={bg.top} />
            <stop offset="1" stopColor={bg.bottom} />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#sky-${scene.background})`} />
        {/* 背景の小物は少し薄く（問題の対象物を目立たせる） */}
        <g opacity="0.7">{bg.decor}</g>
        <rect x="0" y={floorTop} width="400" height={240 - floorTop} fill={bg.floor} />
        <rect x="0" y={floorTop} width="400" height="3" fill="#000" opacity="0.08" />
        {bg.overlay}
      </svg>
      {scene.items.map((it, i) => {
        const person = personInfo(it.emoji);
        const furniture = it.emoji.startsWith('[');
        const size = (it.size ?? 3) * (person ? 2.75 : 3.2);
        const onGround = it.y >= bg.floorY - 6;
        const color = SHIRTS[(personIdx++ * 3 + scene.items.length) % SHIRTS.length];
        return (
          <div
            key={i}
            className="absolute select-none"
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              // 人物は「胴体の中心」が指定位置に来るように（手元の小物と並ぶ）
              transform: person ? 'translate(-50%, -62%)' : 'translate(-50%, -50%)',
              // 家具は奥（上に物を置いたり、下に物を置いたりできるように）
              zIndex: furniture ? 5 : Math.round(it.y) + (person ? 1 : 0),
              fontSize: `${size}cqw`,
            }}
          >
            <div className="relative flex flex-col items-center" style={{ transform: it.flip ? 'scaleX(-1)' : undefined }}>
              {(person || (onGround && !furniture)) && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/15 blur-[1px]"
                  style={{ bottom: person ? '-0.04em' : '-0.02em', width: person ? '0.8em' : '0.75em', height: '0.14em' }}
                />
              )}
              {furniture ? (
                <Furniture kind={it.emoji} />
              ) : (
                <div className="relative leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">{it.emoji}</div>
              )}
              {person && <Body female={person.female} child={person.child} color={color} />}
            </div>
            {it.thought && <Thought emoji={it.thought} />}
            {it.label && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-1 text-[11px] font-bold text-white">{it.label}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
