import { LoadingOverlay } from '@/shared/index ';
import { BedGrid } from '@/widgets/bed-grid';
import { Header } from '@/widgets/header';
import { useState } from 'react';


export default function HomePage() {
  const [mode, setMode] = useState<'local' | 'global'>('local');
  const [bedCount, setBedCount] = useState<number>(4);

  return (
    <div>
      <Header
        currentMode={mode}
        onModeChange={setMode}
        bedCount={bedCount}
        onBedCountChange={setBedCount}
      />
      <BedGrid count={bedCount as 4 | 8 | 16 | 32 | 64 | 128} mode={mode} />
      <LoadingOverlay />
    </div>
  );
}
