// 控えめで大人っぽい紙吹雪（落ち着いた配色・少なめの粒数）
import confetti from 'canvas-confetti';

const COLORS = ['#6366f1', '#10b981', '#e2e8f0', '#f59e0b', '#0ea5e9'];

export function celebratePass() {
  const base = { particleCount: 60, spread: 60, startVelocity: 45, ticks: 220, gravity: 1.1, scalar: 0.9, colors: COLORS, disableForReducedMotion: true };
  confetti({ ...base, angle: 60, origin: { x: 0, y: 0.75 } });
  confetti({ ...base, angle: 120, origin: { x: 1, y: 0.75 } });
}

export function celebrateSmall(x = 0.5, y = 0.4) {
  confetti({ particleCount: 28, spread: 50, startVelocity: 28, ticks: 140, scalar: 0.75, colors: COLORS, origin: { x, y }, disableForReducedMotion: true });
}
