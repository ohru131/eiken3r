import { useEffect, useRef } from 'react';

// 開いているモーダル（開いた順）。Esc は一番上だけが受け取り、背景の固定は全部閉じたら解除する
const stack: symbol[] = [];
let savedOverflow = '';

/** モーダル共通: Esc で閉じる・開いている間は背景をスクロールさせない */
export function useModal(open: boolean, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const id = Symbol('modal');
    if (stack.length === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    stack.push(id);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stack[stack.length - 1] === id) closeRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      stack.splice(stack.indexOf(id), 1);
      if (stack.length === 0) document.body.style.overflow = savedOverflow;
    };
  }, [open]);
}
