import { useLocalTicker } from '@shared/lib/useLocalTicker';
import React from 'react';

type BedProps = {
  total?: number;          // 기본 1000
  batch?: number;          // 기본 5
  intervalMs?: number;     // 기본 50
  width?: number;          // SVG 가로
  height?: number;         // SVG 세로
  bg?: string;             // 바탕 색
  fill?: string;           // 채워지는 색
  radius?: number;         // 라운드
  externalIndex?: number;  // 전역 타이커 값(있으면 이걸로 진행)
};

const Bed: React.FC<BedProps> = ({
  total = 1000,
  batch = 5,
  intervalMs = 50,
  bg = '#1f2937',
  fill = '#22c55e',
  externalIndex,
}) => {
  const localIndex = useLocalTicker({ total, batch, intervalMs, autoplay: externalIndex === undefined });
  const index = externalIndex ?? localIndex;

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <rect x={0} y={0} width="1000" height="1000" fill={bg} />
      <rect x={0} y={0} width={(index / total) * 1000} height="1000" fill={fill} />
    </svg>
  );
};

export default Bed;
