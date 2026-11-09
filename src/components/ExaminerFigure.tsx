import React, { useEffect, useState } from 'react';
import { ExaminerProfile } from '../types';

interface Coord {
  x: number;
  y: number;
}

/**
 * 顔パーツ位置は元画像のピクセル座標で保持する。
 * 画像と同じアスペクト比のレイヤー上に重ねるため、表示枠のサイズや
 * object-fit のトリミングに左右されずに目・口の位置が一致する。
 */
interface FaceMeta {
  imgW: number;
  imgH: number;
  skin: string;
  lip: string;
  inside: string;
  mouth: Coord;
  leftEye: Coord;
  rightEye: Coord;
  eyeWidth: number;
  mouthWidth: number;
}

const FACE_META: Record<string, FaceMeta> = {
  smith: {
    imgW: 458,
    imgH: 768,
    skin: '#fcd0b0',
    lip: '#c6736a',
    inside: '#5a1818',
    mouth: { x: 234, y: 296 },
    leftEye: { x: 194, y: 221 },
    rightEye: { x: 271, y: 221 },
    eyeWidth: 36,
    mouthWidth: 66,
  },
  brown: {
    imgW: 458,
    imgH: 768,
    skin: '#f8cdb3',
    lip: '#c76e6b',
    inside: '#5a1818',
    mouth: { x: 234, y: 304 },
    leftEye: { x: 188, y: 236 },
    rightEye: { x: 272, y: 236 },
    eyeWidth: 36,
    mouthWidth: 60,
  },
  tanaka: {
    imgW: 460,
    imgH: 768,
    skin: '#fbcba7',
    lip: '#bf7068',
    inside: '#551818',
    mouth: { x: 236, y: 302 },
    leftEye: { x: 191, y: 231 },
    rightEye: { x: 272, y: 231 },
    eyeWidth: 34,
    mouthWidth: 66,
  },
};

export const ExaminerFigure: React.FC<{ examiner: ExaminerProfile; speaking: boolean; listening: boolean }> = ({
  examiner,
  speaking,
  listening,
}) => {
  const [blink, setBlink] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0);
  const [imgError, setImgError] = useState(false);

  // 定期的な自然な瞬き（3.5〜5秒ごと）
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const triggerBlink = () => {
      setBlink(true);
      timeoutId = setTimeout(() => {
        setBlink(false);
        scheduleNext();
      }, 140);
    };

    const scheduleNext = () => {
      const delay = 3200 + Math.random() * 2000;
      timeoutId = setTimeout(triggerBlink, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  // 発話中のリップシンク（口パク）
  useEffect(() => {
    if (!speaking) {
      setMouthOpen(0);
      return;
    }

    // 母音っぽい開閉パターン。0 付近も含めて「閉じ→開き」を自然に繰り返す
    const vowels = [0.35, 0.8, 0.5, 0.15, 0.7, 0.95, 0.4, 0.05, 0.6, 0.3];
    let step = 0;
    setMouthOpen(vowels[0]);
    const interval = setInterval(() => {
      step = (step + 1) % vowels.length;
      const target = vowels[step] * (0.85 + Math.random() * 0.3);
      setMouthOpen(Math.min(1, Math.max(0, target)));
    }, 120);

    return () => clearInterval(interval);
  }, [speaking]);

  const rawSrc = examiner.avatar || `/images/examiners/${examiner.id}.png`;
  const base = import.meta.env.BASE_URL || '/';
  const avatarSrc = rawSrc.startsWith('/') ? `${base.endsWith('/') ? base : base + '/'}${rawSrc.slice(1)}` : rawSrc;

  const meta = FACE_META[examiner.id] || FACE_META.smith;

  // 元画像ピクセル座標 → 画像レイヤー内の % 位置
  const px = (v: number) => `${(v / meta.imgW) * 100}%`;
  const py = (v: number) => `${(v / meta.imgH) * 100}%`;

  const eyeW = meta.eyeWidth * 1.15;
  const eyeH = meta.eyeWidth * 0.6;
  const mouthBoxW = meta.mouthWidth * 1.3;
  const mouthBoxH = mouthBoxW * (40 / 60);
  // 開いた口の内側形状（中身・クリップ・唇輪郭で共用）
  const mouthPath = `M${15 - mouthOpen * 2},19 Q30,${17 - mouthOpen * 2} ${45 + mouthOpen * 2},19 Q30,${21 + mouthOpen * 24} ${15 - mouthOpen * 2},19 Z`;

  // ハイクオリティ画像アバター
  if (avatarSrc && !imgError) {
    return (
      <div className="relative flex h-full w-full items-center justify-center select-none">
        <div
          className={`relative h-full w-full overflow-hidden rounded-2xl border-2 bg-gradient-to-b from-white to-slate-100 shadow-md transition-colors duration-300 ${
            speaking
              ? 'border-indigo-500 shadow-indigo-200'
              : listening
              ? 'border-emerald-500 shadow-emerald-200'
              : 'border-slate-300'
          }`}
        >
          {/* 画像と同じアスペクト比のレイヤー（上端基準で表示枠からはみ出た下部は切り取り）。
              画面酔い防止のため、頭部・全体の揺れアニメーションは付けない（口パク・瞬きのみ） */}
          <div className="absolute left-0 right-0 top-0" style={{ aspectRatio: `${meta.imgW} / ${meta.imgH}` }}>
            {/* ベースイラスト */}
            <img
              src={avatarSrc}
              alt={examiner.name}
              onError={() => setImgError(true)}
              draggable={false}
              className="absolute inset-0 block h-full w-full pointer-events-none"
            />

            {/* 瞬き（Blink）オーバーレイ */}
            {blink &&
              [meta.leftEye, meta.rightEye].map((eye, i) => (
                <div
                  key={i}
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{ left: px(eye.x), top: py(eye.y), width: px(eyeW), height: py(eyeH) }}
                >
                  <svg viewBox="0 0 40 22" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    {/* まぶた（肌色カバー） */}
                    <ellipse cx="20" cy="11" rx="19" ry="10" fill={meta.skin} />
                    {/* 閉じた目のまつ毛ライン */}
                    <path d="M5,11 Q20,17 35,11" stroke="#2d221e" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              ))}

            {/* 口パク（Talking Mouth）オーバーレイ：発話中は常に表示し、開き具合だけ変える */}
            {speaking && (
              <div
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ left: px(meta.mouth.x), top: py(meta.mouth.y), width: px(mouthBoxW), height: py(mouthBoxH) }}
              >
                <svg viewBox="0 0 60 40" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                  <defs>
                    <filter id={`mouth-soft-${examiner.id}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                    {/* 舌・歯が口の外にはみ出さないよう口内形状でクリップ */}
                    <clipPath id={`mouth-clip-${examiner.id}`}>
                      <path d={mouthPath} />
                    </clipPath>
                  </defs>
                  {/* 元イラストの口を隠す肌色カバー（縁をぼかして馴染ませる） */}
                  <ellipse cx="30" cy="20" rx="27" ry="15" fill={meta.skin} filter={`url(#mouth-soft-${examiner.id})`} />

                  {mouthOpen < 0.12 ? (
                    // ほぼ閉じた口
                    <path d="M14,20 Q30,25 46,20" stroke={meta.lip} strokeWidth="2.6" strokeLinecap="round" fill="none" />
                  ) : (
                    <>
                      {/* 開いた口の中 */}
                      <path d={mouthPath} fill={meta.inside} />
                      {/* 上の歯 */}
                      <path
                        d={`M${18 - mouthOpen},${19 - mouthOpen * 0.5} Q30,${17.5 - mouthOpen} ${42 + mouthOpen},${19 - mouthOpen * 0.5} Q30,${21 + mouthOpen * 2} ${18 - mouthOpen},${19 - mouthOpen * 0.5} Z`}
                        fill="#ffffff"
                        clipPath={`url(#mouth-clip-${examiner.id})`}
                      />
                      {/* 舌 */}
                      <ellipse
                        cx="30"
                        cy={20 + mouthOpen * 11}
                        rx={6 + mouthOpen * 3}
                        ry={1.5 + mouthOpen * 2.5}
                        fill="#d96a6a"
                        clipPath={`url(#mouth-clip-${examiner.id})`}
                      />
                      {/* 唇の輪郭 */}
                      <path
                        d={mouthPath}
                        stroke={meta.lip}
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </>
                  )}
                </svg>
              </div>
            )}
          </div>

          {/* デスク風の木目バー */}
          <div className="absolute bottom-0 left-0 right-0 h-4 border-t border-amber-900/30 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 shadow-sm" />

          {/* 発話中（speaking）の音声波形インジケーター */}
          {speaking && (
            <div className="absolute bottom-6 right-3 flex items-end gap-1 rounded-full bg-slate-900/80 px-2 py-1 shadow-lg backdrop-blur-sm">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-indigo-400 animate-pulse motion-reduce:animate-none"
                  style={{
                    height: `${8 + Math.round(mouthOpen * 12) * (i === 1 ? 1.4 : 0.9)}px`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* 傾聴中（listening）のインジケーター */}
          {listening && (
            <div className="absolute bottom-6 right-3 flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-lg backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-white animate-ping motion-reduce:animate-none" />
              Listening
            </div>
          )}
        </div>
      </div>
    );
  }

  // フォールバック用SVG
  const female = examiner.id === 'brown';
  const skin = meta.skin;
  const hair = examiner.id === 'brown' ? '#c2410c' : examiner.id === 'tanaka' ? '#1f2937' : '#8b5a2b';
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <rect x="0" y="168" width="200" height="32" fill="#8b5e34" />
      <rect x="0" y="166" width="200" height="5" fill="#a47148" />
      <path d="M40,170 Q45,120 100,118 Q155,120 160,170Z" fill={female ? '#0f766e' : examiner.id === 'tanaka' ? '#334155' : '#1d4ed8'} />
      <path d="M88,120 L100,145 L112,120Z" fill="#fff" />
      {!female && <path d="M97,128 L103,128 L105,160 L100,166 L95,160Z" fill="#b91c1c" />}
      <rect x="90" y="100" width="20" height="22" fill={skin} />
      {female && <path d="M58,70 Q55,130 75,130 L125,130 Q145,130 142,70Z" fill={hair} />}
      <ellipse cx="100" cy="70" rx="38" ry="42" fill={skin} />
      <path d={female ? 'M60,66 Q62,26 100,26 Q140,26 140,66 Q122,44 100,46 Q76,44 60,66Z' : 'M62,60 Q64,28 100,28 Q138,28 138,60 Q130,42 100,44 Q72,42 62,60Z'} fill={hair} />
      {examiner.id === 'tanaka' && (
        <g fill="none" stroke="#1f2937" strokeWidth="2.5">
          <circle cx="84" cy="70" r="10" />
          <circle cx="116" cy="70" r="10" />
          <line x1="94" y1="70" x2="106" y2="70" />
        </g>
      )}
      {blink ? (
        <g stroke="#1f2937" strokeWidth="2.5">
          <line x1="79" y1="70" x2="89" y2="70" />
          <line x1="111" y1="70" x2="121" y2="70" />
        </g>
      ) : (
        <g fill="#1f2937">
          <circle cx="84" cy="70" r="4" />
          <circle cx="116" cy="70" r="4" />
        </g>
      )}
      <g stroke={hair} strokeWidth="3" strokeLinecap="round">
        <line x1="77" y1={listening ? 57 : 59} x2="91" y2={listening ? 56 : 58} />
        <line x1="109" y1={listening ? 56 : 58} x2="123" y2={listening ? 57 : 59} />
      </g>
      <circle cx="74" cy="86" r="6" fill="#fb7185" opacity="0.25" />
      <circle cx="126" cy="86" r="6" fill="#fb7185" opacity="0.25" />
      {speaking ? (
        <ellipse cx="100" cy="94" rx={7 + mouthOpen * 3} ry={2 + mouthOpen * 6} fill="#7f1d1d" />
      ) : (
        <path d="M89,92 Q100,101 111,92" stroke="#7f1d1d" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {listening && <circle cx="100" cy="70" r="46" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.4" className="animate-ping motion-reduce:animate-none" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
    </svg>
  );
};
