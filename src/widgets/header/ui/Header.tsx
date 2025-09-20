import { Link } from '@tanstack/react-router';
import BedCountInput from './BedCountInput';


type HeaderProps = {
  currentMode: 'local' | 'global';
  onModeChange?: (mode: 'local' | 'global') => void;
  bedCount: number;
  onBedCountChange?: (value: number) => void;
};

export default function Header({
  currentMode,
  onModeChange,
  bedCount,
  onBedCountChange,
}: HeaderProps) {
  const toggleMode = () => {
    onModeChange?.(currentMode === 'local' ? 'global' : 'local');
  };

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-gray-100 shadow">
      <h1>
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          Test
        </Link>
      </h1>
      <BedCountInput value={bedCount} onChange={onBedCountChange} />

      <button
        onClick={toggleMode}
        className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
      >
        {currentMode === 'local' ? 'Switch to Global Interval' : 'Switch to Local Interval'}
      </button>
    </header>
  );
}
