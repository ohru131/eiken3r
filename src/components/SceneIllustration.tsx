import React from 'react';
import { Scene, SceneBackground } from '../types';

interface BgDef {
  top: string;
  bottom: string;
  floor: string;
  floorY: number; // %
  decor?: React.ReactNode;
}

const cloud = (x: number, y: number) => (
  <g fill="#ffffff" opacity="0.9">
    <ellipse cx={x} cy={y} rx="26" ry="11" />
    <ellipse cx={x + 18} cy={y - 7} rx="18" ry="10" />
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
        <rect x="250" y="40" width="60" height="45" fill="#fff" stroke="#a78bfa" strokeWidth="4" />
        <circle cx="360" cy="60" r="16" fill="#fff" stroke="#64748b" strokeWidth="3" />
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
        <circle cx="360" cy="40" r="15" fill="#fff" stroke="#64748b" strokeWidth="3" />
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
        <rect x="0" y="20" width="400" height="22" fill="#f472b6" />
        {[20, 140, 260].map((x) => (
          <rect key={x} x={x} y="60" width="110" height="60" fill="#fff" stroke="#f9a8d4" strokeWidth="3" />
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
        <circle cx="310" cy="55" r="12" fill="#fff" stroke="#64748b" strokeWidth="3" />
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
        <rect x="170" y="30" width="60" height="40" fill="#fff" stroke="#334155" strokeWidth="3" />
        <circle cx="200" cy="78" r="12" fill="none" stroke="#ef4444" strokeWidth="3" />
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

export const SceneIllustration: React.FC<{ scene: Scene; className?: string }> = ({ scene, className = '' }) => {
  const bg = BG[scene.background] || BG.park;
  const floorTop = (bg.floorY / 100) * 240;
  return (
    <div className={`relative w-full aspect-[5/3] overflow-hidden rounded-xl border-2 border-slate-800/80 bg-white ${className}`}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`sky-${scene.background}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={bg.top} />
            <stop offset="1" stopColor={bg.bottom} />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#sky-${scene.background})`} />
        {bg.decor}
        <rect x="0" y={floorTop} width="400" height={240 - floorTop} fill={bg.floor} />
        <rect x="0" y={floorTop} width="400" height="3" fill="#000" opacity="0.08" />
      </svg>
      {scene.items.map((it, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            transform: `translate(-50%, -50%)`,
            zIndex: Math.round(it.y),
          }}
        >
          <div
            className="leading-none drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)]"
            style={{ fontSize: `clamp(1rem, ${(it.size ?? 3) * 1.7}vmin, ${it.size ?? 3}rem)`, transform: it.flip ? 'scaleX(-1)' : undefined }}
          >
            {it.emoji}
          </div>
          {it.thought && (
            <div className="absolute -top-2 left-1/2 -translate-y-full translate-x-1">
              <div className="relative rounded-full border-2 border-slate-700 bg-white px-1.5 py-0.5 text-[clamp(0.8rem,3vmin,1.5rem)] leading-none shadow">
                {it.thought}
              </div>
              <div className="absolute -bottom-1.5 left-1 h-1.5 w-1.5 rounded-full border border-slate-700 bg-white" />
            </div>
          )}
          {it.label && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-1 text-[10px] font-bold text-white">{it.label}</div>
          )}
        </div>
      ))}
    </div>
  );
};
