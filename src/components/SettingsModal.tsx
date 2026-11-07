import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, AlertCircle, Eye, EyeOff, Mic2 } from 'lucide-react';
import { AppSettings } from '../types';
import { MODEL_OPTIONS } from '../lib/settings';
import { ServerStatus } from '../lib/api';
import { azureConfigured, testAzure } from '../lib/azurePronunciation';

interface Props {
  open: boolean;
  settings: AppSettings;
  status: ServerStatus;
  onChange: (s: AppSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ open, settings, status, onChange, onClose }) => {
  const [show, setShow] = useState(false);
  const [test, setTest] = useState<{ state: 'idle' | 'testing' | 'ok' | 'ng'; msg?: string }>({ state: 'idle' });
  const runTest = async () => {
    setTest({ state: 'testing' });
    const err =
      await import('../lib/claude').then(
        async (m) => (await m.testConnection(settings.apiKey, settings.evalModel)) ?? (await m.testConnection(settings.apiKey, settings.reportModel))
      );
    setTest(err ? { state: 'ng', msg: err } : { state: 'ok' });
  };
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
                onChange={(e) => {
                  set('apiKey', e.target.value.trim());
                  setTest({ state: 'idle' });
                }}
                placeholder={status.serverKey ? 'サーバーのキーを使用中（入力すると上書き）' : 'sk-ant-...'}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs outline-none focus:border-indigo-500"
              />
              <button onClick={() => setShow((s) => !s)} className="rounded-lg border border-slate-300 px-2 text-slate-500">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className={`mt-1.5 flex items-center gap-1 text-xs ${keyOk ? 'text-emerald-700' : 'text-amber-700'}`}>
              {keyOk ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
              {keyOk ? (settings.apiKey ? 'キー設定済み：Claude でAI採点します（「接続テスト」で確認できます）' : 'サーバーのキーで Claude 採点します') : '未設定：簡易採点（ローカル判定）で動作します'}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={runTest}
                disabled={!settings.apiKey || test.state === 'testing'}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-40"
              >
                {test.state === 'testing' ? '確認中…' : '接続テスト'}
              </button>
              {settings.apiKey && (
                <button
                  onClick={() => {
                    set('apiKey', '');
                    setTest({ state: 'idle' });
                  }}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-600"
                >
                  キーを削除
                </button>
              )}
              {test.state === 'ok' && <span className="text-xs font-bold text-emerald-700">接続OK</span>}
              {test.state === 'ng' && <span className="text-xs font-bold text-rose-600">{test.msg}</span>}
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
              キーはこの端末のブラウザ（localStorage）にだけ保存され、採点時にブラウザから直接 Anthropic API へ送信されます。共用PCでは使用後に「キーを削除」してください。キーは{' '}
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                Anthropic Console
              </a>{' '}
              で発行できます。
            </p>
            <ModelSelect label="1問ごとの採点（標準: Haiku 5.5）" value={settings.evalModel} onChange={(v) => set('evalModel', v)} />
            <ModelSelect label="最後の総合講評（標準: Sonnet 5.5）" value={settings.reportModel} onChange={(v) => set('reportModel', v)} />
            <p className="mt-1 text-[12px] text-slate-500">
              目安: 面接1回あたり 約0.02ドル（標準設定）。本番モードは面接を止めずに裏で採点するので、待ち時間はほぼありません。
            </p>
          </section>

          {/* azure */}
          <AzureSection settings={settings} set={set} />

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
            <Toggle label="練習モード：満点解答・お手本音読を読み上げる" checked={settings.readModelAnswer} onChange={(v) => set('readModelAnswer', v)} />
            <Toggle label="練習モード：音読の前にお手本を聞く" checked={settings.listenModelFirst} onChange={(v) => set('listenModelFirst', v)} />
          </section>
        </div>
      </div>
    </div>
  );
};

const AzureSection: React.FC<{ settings: AppSettings; set: <K extends keyof AppSettings>(k: K, v: AppSettings[K]) => void }> = ({ settings, set }) => {
  const [show, setShow] = useState(false);
  const [test, setTest] = useState<{ state: 'idle' | 'testing' | 'ok' | 'ng'; msg?: string }>({ state: 'idle' });
  const on = azureConfigured(settings.azureKey, settings.azureRegion);
  return (
    <section>
      <div className="mb-1.5 flex items-center gap-1.5 font-black text-slate-900">
        <Mic2 className="h-4 w-4" /> 音読の発音評価（Azure Speech・任意）
      </div>
      <div className="flex gap-2">
        <input
          type={show ? 'text' : 'password'}
          value={settings.azureKey}
          onChange={(e) => {
            set('azureKey', e.target.value.trim());
            setTest({ state: 'idle' });
          }}
          placeholder="Speech リソースのキー"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs outline-none focus:border-indigo-500"
        />
        <button onClick={() => setShow((v) => !v)} className="rounded-lg border border-slate-300 px-2 text-slate-500">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      <label className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-700">
        リージョン
        <input
          value={settings.azureRegion}
          onChange={(e) => {
            set('azureRegion', e.target.value.trim());
            setTest({ state: 'idle' });
          }}
          placeholder="japaneast"
          className="w-40 rounded-lg border border-slate-300 px-2 py-1 font-mono text-xs"
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          onClick={async () => {
            setTest({ state: 'testing' });
            const err = await testAzure(settings.azureKey, settings.azureRegion);
            setTest(err ? { state: 'ng', msg: err } : { state: 'ok' });
          }}
          disabled={!on || test.state === 'testing'}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-40"
        >
          {test.state === 'testing' ? '確認中…' : '接続テスト'}
        </button>
        {settings.azureKey && (
          <button
            onClick={() => {
              set('azureKey', '');
              setTest({ state: 'idle' });
            }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-600"
          >
            キーを削除
          </button>
        )}
        {test.state === 'ok' && <span className="text-xs font-bold text-emerald-700">接続OK</span>}
        {test.state === 'ng' && <span className="text-xs font-bold text-rose-600">{test.msg}</span>}
      </div>
      <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
        設定すると、音読の録音を Azure（Microsoft）に送り、単語ごとの発音・流暢さ・読み落とし・抑揚を評価します。質問への回答は今まで通りブラウザの音声認識です。キーはこのブラウザにだけ保存されます。
        Azure ポータルで「Speech」リソースを作成し、「キーとエンドポイント」のキーとリージョン（例: japaneast）を入力してください。無料枠（F0）で使えます。
      </p>
    </section>
  );
};

const ModelSelect: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <label className="mt-3 block">
    <span className="block text-xs font-bold text-slate-700">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
      {MODEL_OPTIONS.map((m) => (
        <option key={m.id} value={m.id}>
          {m.label} — {m.note}
        </option>
      ))}
    </select>
  </label>
);

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
