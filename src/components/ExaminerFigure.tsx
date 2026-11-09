import React, { useEffect, useState } from 'react';
import { ExaminerProfile } from '../types';

interface Coord {
  x: number;
  y: number;
}

interface FaceMeta {
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
    skin: '#f8dcc2',
    lip: '#c6736a',
    inside: '#5a1818',
    mouth: { x: 50.8, y: 62.0 },
    leftEye: { x: 38.5, y: 46.7 },
    rightEye: { x: 62.5, y: 46.7 },
    eyeWidth: 9,
    mouthWidth: 11,
  },
  brown: {
    skin: '#fae0cc',
    lip: '#c76e6b',
    inside: '#5a1818',
    mouth: { x: 50.0, y: 61.8 },
    leftEye: { x: 38.6, y: 48.2 },
    rightEye: { x: 61.9, y: 47.8 },
    eyeWidth: 8.5,
    mouthWidth: 10.5,
  },
  tanaka: {
    skin: '#f6d5ba',
    lip: '#bf7068',
    inside: '#551818',
    mouth: { x: 50.7, y: 63.7 },
    leftEye: { x: 37.5, y: 44.5 },
    rightEye: { x: 62.8, y: 45.6 },
    eyeWidth: 9,
    mouthWidth: 10.5,
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

  // 発話中のリップシンク（リアルタイム口パク）
  useEffect(() => {
    if (!speaking) {
      setMouthOpen(0);
      return;
    }

    // 口の開き具合を母音のように変化させる
    const vowels = [0.25, 0.75, 0.4, 0.9, 0.1, 0.6, 0.85, 0.3];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % vowels.length;
      // ランダム要素を加えて単調さを防ぐ
      const target = vowels[step] * (0.8 + Math.random() * 0.4);
      setMouthOpen(Math.min(1, Math.max(0, target)));
    }, 110);

    return () => clearInterval(interval);
  }, [speaking]);

  const rawSrc = examiner.avatar || `/images/examiners/${examiner.id}.png`;
  const base = import.meta.env.BASE_URL || '/';
  const avatarSrc = rawSrc.startsWith('/') ? `${base.endsWith('/') ? base : base + '/'}${rawSrc.slice(1)}` : rawSrc;

  const meta = FACE_META[examiner.id] || FACE_META.smith;

  // ハイクオリティ画像アバター
  if (avatarSrc && !imgError) {
    return (
      <div className="relative flex h-full w-full items-center justify-center select-none">
        {/* 聞き取り中（listening）の波紋エフェクト */}
        {listening && (
          <div className="absolute inset-1 -z-10 animate-ping rounded-3xl bg-emerald-400/30 duration-1000" />
        )}

        <div
          className={`relative h-full w-full overflow-hidden rounded-2xl border-2 bg-gradient-to-b from-white to-slate-100 shadow-md transition-all duration-300 ${
            speaking
              ? 'border-indigo-500 shadow-indigo-200'
              : listening
              ? 'border-emerald-500 shadow-emerald-200'
              : 'border-slate-300'
          }`}
        >
          {/* 面接官の全身・頭部レイヤー（話す・聞くのモーション付き） */}
          <div
            className={`relative h-full w-full transition-transform duration-300 ${
              speaking
                ? 'animate-examiner-talk'
                : listening
                ? 'animate-examiner-listen'
                : 'animate-examiner-idle'
            }`}
            style={{
              transformOrigin: 'bottom center',
            }}
          >
            {/* ベースイラスト */}
            <img
              src={avatarSrc}
              alt={examiner.name}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top pointer-events-none"
            />

            {/* 瞬き（Blink）オーバーレイ */}
            {blink && (
              <>
                {/* 左目 */}
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${meta.leftEye.x}%`,
                    top: `${meta.leftEye.y}%`,
                    width: `${meta.eyeWidth}%`,
                    height: '4%',
                  }}
                >
                  <svg viewBox="0 0 40 18" className="h-full w-full">
                    {/* まぶた（肌色カバー） */}
                    <ellipse cx="20" cy="9" rx="19" ry="8" fill={meta.skin} />
                    {/* 閉じた笑顔のまつ毛ライン */}
                    <path
                      d="M4,10 Q20,16 36,10"
                      stroke="#2d221e"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* 右目 */}
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${meta.rightEye.x}%`,
                    top: `${meta.rightEye.y}%`,
                    width: `${meta.eyeWidth}%`,
                    height: '4%',
                  }}
                >
                  <svg viewBox="0 0 40 18" className="h-full w-full">
                    <ellipse cx="20" cy="9" rx="19" ry="8" fill={meta.skin} />
                    <path
                      d="M4,10 Q20,16 36,10"
                      stroke="#2d221e"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </>
            )}

            {/* 口パク（Talking Mouth）オーバーレイ */}
            {speaking && mouthOpen > 0.15 && (
              <div
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${meta.mouth.x}%`,
                  top: `${meta.mouth.y}%`,
                  width: `${meta.mouthWidth * (0.85 + mouthOpen * 0.25)}%`,
                  height: `${7 * (0.6 + mouthOpen * 0.9)}%`,
                  transition: 'height 0.08s ease-out, width 0.08s ease-out',
                }}
              >
                <svg viewBox="0 0 60 40" className="h-full w-full overflow-visible">
                  {/* 周囲の肌に馴染ませるぼかしシャドウ/カバー */}
                  <ellipse cx="30" cy="20" rx="28" ry="17" fill={meta.skin} />

                  {/* 開いた口の中 */}
                  <ellipse
                    cx="30"
                    cy="20"
                    rx={20 + mouthOpen * 4}
                    ry={9 + mouthOpen * 8}
                    fill={meta.inside}
                  />

                  {/* 上の歯 */}
                  <path
                    d={`M${18 - mouthOpen * 2},${17 - mouthOpen * 2} Q30,${22 - mouthOpen} ${42 + mouthOpen * 2},${17 - mouthOpen * 2} Z`}
                    fill="#ffffff"
                    opacity="0.95"
                  />

                  {/* 舌 */}
                  <ellipse
                    cx="30"
                    cy={24 + mouthOpen * 3}
                    rx={12 + mouthOpen * 2}
                    ry={6 + mouthOpen * 2}
                    fill="#df7575"
                  />

                  {/* 上唇のライン */}
                  <path
                    d={`M${10 - mouthOpen * 2},20 Q30,${12 - mouthOpen * 4} ${50 + mouthOpen * 2},20`}
                    stroke={meta.lip}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* 下唇のライン */}
                  <path
                    d={`M${12 - mouthOpen * 2},20 Q30,${27 + mouthOpen * 8} ${48 + mouthOpen * 2},20`}
                    stroke={meta.lip}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
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
                  className="w-1 rounded-full bg-indigo-400 animate-pulse"
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
              <span className="h-2 w-2 rounded-full bg-white animate-ping" />
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
      {listening && <circle cx="100" cy="70" r="46" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.4" className="animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
    </svg>
  );
};
