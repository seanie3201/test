import { Bed } from '@/widgets/bed';
import { useGlobalTicker } from '@shared/lib/useGlobalTicker';
import { useEffect, useState } from 'react';

type BedGridProps = {
  count: number;
  mode?: 'local' | 'global';
  barRatio?: number;
  headerHeight?: number;
};

function BedGridInner({
  count,
  mode,
  cellHeight,
}: {
  count: number;
  mode: 'local' | 'global';
  cellHeight: number;
}) {
  const cols = Math.ceil(Math.sqrt(count));
  const index = mode === 'global' ? useGlobalTicker() : undefined; // 전역 index 바로 구독

  return (
    <div
      className="grid border border-gray-500"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        height: `calc(100vh - 48px)`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center border border-gray-500"
          style={{ height: `${cellHeight}px` }}
        >
          <Bed externalIndex={index} />
        </div>
      ))}
    </div>
  );
}

const BedGrid: React.FC<BedGridProps> = ({
  count,
  mode = 'local',
  headerHeight = 48,
}) => {
  const [cellHeight, setCellHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const availableHeight = window.innerHeight - headerHeight -1;
      setCellHeight(availableHeight / rows);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count, headerHeight]);

  return <BedGridInner count={count} mode={mode} cellHeight={cellHeight} />;
};

export default BedGrid;
