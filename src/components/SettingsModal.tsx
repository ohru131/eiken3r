import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { AppSettings } from '../types';
import { MODEL_OPTIONS } from '../lib/settings';
import { ServerStatus } from '../lib/api';

interface Props {
  open: boolean;
  settings: AppSettings;
  status: ServerStatus;
  onChange: (s: AppSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ open, settings, status, onChange, onClose }) => {
  const [show, setShow] = useState(false);
  if (!open) return null;
  const set = <K extends keyof AppSettings>(k: K, v: AppSettings[K]) => onChange({ ...settings, [k]: v });
  const keyOk = !!settings.apiKey || status.serverKey;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h2 className="text-base font-black">設定</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-5 p-5 text-sm">
          {/* API */}
          <section>
            <div className="mb-1.5 flex items-center gap-1.5 font-black text-slate-900">
              <KeyRound className="h-4 w-4" /> Claude API キー
            </div>
            <div className="flex gap-2">
              <input
                type={show ? 'text' : 'password'}
                value={settings.apiKey}
                onChange={(e) => set('apiKey', e.target.value.trim())}
                placeholder={status.serverKey ? 'サーバーのキーを使用中（入力すると上書き）' : 'sk-ant-...'}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs outline-none focus:border-indigo-500"
              />
              <button onClick={() => setShow((s) => !s)} className="rounded-lg border border-slate-300 px-2 text-slate-500">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className={`mt-1.5 flex items-center gap-1 text-xs ${keyOk ? 'text-emerald-700' : 'text-amber-700'}`}>
              {keyOk ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
              {keyOk ? 'Claude による詳細なAI採点が有効です' : '未設定：簡易採点（ローカル判定）で動作します'}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              キーはこのブラウザ（localStorage）にだけ保存され、採点時にこのアプリのサーバー経由で Anthropic API に送られます。サーバー側で環境変数 ANTHROPIC_API_KEY を設定しても使えます。
            </p>
            <label className="mt-3 block text-xs font-bold text-slate-700">採点モデル</label>
            <select value={settings.model} onChange={(e) => set('model', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
              {MODEL_OPTIONS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {m.note}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-slate-500">本番モードは面接を止めずに裏で採点するので、待ち時間はほぼありません。</p>
          </section>

          {/* flow */}
          <section className="space-y-3">
            <div className="font-black text-slate-900">進行・音声</div>
            <Range
              label="面接官の話す速さ"
              value={settings.speechRate}
              min={0.7}
              max={1.2}
              step={0.05}
              display={`${Math.round(settings.speechRate * 100)}%`}
              onChange={(v) => set('speechRate', v)}
            />
            <Range
              label="回答終了とみなす無音時間"
              value={settings.silenceSec}
              min={1.2}
              max={4}
              step={0.2}
              display={`${settings.silenceSec.toFixed(1)}秒`}
              onChange={(v) => set('silenceSec', v)}
            />
            <Toggle label="効果音" checked={settings.sfx} onChange={(v) => set('sfx', v)} />
            <Toggle label="練習モード：解説後に自動で次へ進む" checked={settings.autoAdvance} onChange={(v) => set('autoAdvance', v)} />
            <Toggle label="練習モード：満点解答を読み上げる" checked={settings.readModelAnswer} onChange={(v) => set('readModelAnswer', v)} />
          </section>
        </div>
      </div>
    </div>
  );
};

const Range: React.FC<{ label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void }> = (p) => (
  <label className="block">
    <div className="flex justify-between text-xs font-bold text-slate-700">
      <span>{p.label}</span>
      <span className="tabular-nums text-indigo-700">{p.display}</span>
    </div>
    <input type="range" min={p.min} max={p.max} step={p.step} value={p.value} onChange={(e) => p.onChange(Number(e.target.value))} className="w-full accent-indigo-600" />
  </label>
);

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center justify-between text-xs font-bold text-slate-700">
    {label}
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  </label>
);
