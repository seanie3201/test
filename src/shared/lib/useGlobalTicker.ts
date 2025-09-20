import { useEffect, useState } from 'react';

type GlobalTickerOptions = {
  total?: number;      // 전체 칸 수 (기본 1000)
  batch?: number;      // 한 번에 채울 칸 수 (기본 5)
  intervalMs?: number; // 간격 (기본 50ms)
};

let globalIndex = 0;
let subscribers: ((value: number) => void)[] = [];
let timer: number | null = null;

function startTicker(total: number, batch: number, intervalMs: number) {
  if (timer !== null) return; // 이미 돌고 있으면 중복 생성 방지

  timer = window.setInterval(() => {
    globalIndex = (globalIndex + batch) % total;
    subscribers.forEach(cb => cb(globalIndex));
  }, intervalMs);
}

export function useGlobalTicker({
  total = 1000,
  batch = 5,
  intervalMs = 50,
}: GlobalTickerOptions = {}) {
  const [index, setIndex] = useState(globalIndex);

  useEffect(() => {
    // 구독 등록
    subscribers.push(setIndex);

    // 전역 타이머 시작
    startTicker(total, batch, intervalMs);

    // cleanup
    return () => {
      subscribers = subscribers.filter((cb) => cb !== setIndex);
      if (subscribers.length === 0 && timer !== null) {
        clearInterval(timer);
        timer = null;
        globalIndex = 0; // 필요 시 초기화
      }
    };
  }, [total, batch, intervalMs]);

  return index;
}
