import React, { useEffect, useState } from 'react';
import { ExaminerProfile } from '../types';

const SKIN: Record<string, string> = { smith: '#f6d3b3', brown: '#f3cfb0', tanaka: '#eac39b' };
const HAIR: Record<string, string> = { smith: '#8b5a2b', brown: '#c2410c', tanaka: '#1f2937' };

export const ExaminerFigure: React.FC<{ examiner: ExaminerProfile; speaking: boolean; listening: boolean }> = ({
  examiner,
  speaking,
  listening,
}) => {
  const [blink, setBlink] = useState(false);
  const [mouth, setMouth] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3800);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!speaking) return setMouth(0);
    const id = setInterval(() => setMouth(Math.random()), 110);
    return () => clearInterval(id);
  }, [speaking]);

  const female = examiner.id === 'brown';
  const skin = SKIN[examiner.id] || '#f6d3b3';
  const hair = HAIR[examiner.id] || '#333';
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      {/* desk */}
      <rect x="0" y="168" width="200" height="32" fill="#8b5e34" />
      <rect x="0" y="166" width="200" height="5" fill="#a47148" />
      {/* body */}
      <path d="M40,170 Q45,120 100,118 Q155,120 160,170Z" fill={female ? '#0f766e' : examiner.id === 'tanaka' ? '#334155' : '#1d4ed8'} />
      <path d="M88,120 L100,145 L112,120Z" fill="#fff" />
      {!female && <path d="M97,128 L103,128 L105,160 L100,166 L95,160Z" fill="#b91c1c" />}
      {/* neck */}
      <rect x="90" y="100" width="20" height="22" fill={skin} />
      {/* hair back (female long) */}
      {female && <path d="M58,70 Q55,130 75,130 L125,130 Q145,130 142,70Z" fill={hair} />}
      {/* head */}
      <ellipse cx="100" cy="70" rx="38" ry="42" fill={skin} />
      {/* hair top */}
      <path d={female ? 'M60,66 Q62,26 100,26 Q140,26 140,66 Q122,44 100,46 Q76,44 60,66Z' : 'M62,60 Q64,28 100,28 Q138,28 138,60 Q130,42 100,44 Q72,42 62,60Z'} fill={hair} />
      {/* glasses for tanaka */}
      {examiner.id === 'tanaka' && (
        <g fill="none" stroke="#1f2937" strokeWidth="2.5">
          <circle cx="84" cy="70" r="10" />
          <circle cx="116" cy="70" r="10" />
          <line x1="94" y1="70" x2="106" y2="70" />
        </g>
      )}
      {/* eyes */}
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
      {/* brows */}
      <g stroke={hair} strokeWidth="3" strokeLinecap="round">
        <line x1="77" y1={listening ? 57 : 59} x2="91" y2={listening ? 56 : 58} />
        <line x1="109" y1={listening ? 56 : 58} x2="123" y2={listening ? 57 : 59} />
      </g>
      {/* cheeks */}
      <circle cx="74" cy="86" r="6" fill="#fb7185" opacity="0.25" />
      <circle cx="126" cy="86" r="6" fill="#fb7185" opacity="0.25" />
      {/* mouth */}
      {speaking ? (
        <ellipse cx="100" cy="94" rx={7 + mouth * 3} ry={2 + mouth * 6} fill="#7f1d1d" />
      ) : (
        <path d="M89,92 Q100,101 111,92" stroke="#7f1d1d" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {/* nod when listening */}
      {listening && <circle cx="100" cy="70" r="46" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.4" className="animate-ping" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
    </svg>
  );
};
