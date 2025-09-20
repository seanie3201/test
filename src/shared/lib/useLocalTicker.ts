import { useEffect, useRef, useState } from 'react';

type TickerOptions = {
  total?: number;      // 전체 칸 수 (기본 1000)
  batch?: number;      // 한 번에 채울 칸 수 (기본 5)
  intervalMs?: number; // 간격 (기본 50ms)
  autoplay?: boolean;  // 자동 진행 여부
};

export function useLocalTicker({
  total = 1000,
  batch = 5,
  intervalMs = 50,
  autoplay = true,
}: TickerOptions = {}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay) return;

    timerRef.current = window.setInterval(() => {
      setIndex((prev) => {
        const next = prev + batch;
        return next >= total ? (next % total) : next;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, total, batch, intervalMs]);

  return index;
}
