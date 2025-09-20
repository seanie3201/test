import { useEffect, useState } from 'react';
import './LoadingOverlay.css';

export default function LoadingOverlay() {
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <span className="text-white text-3xl font-semibold">
        Loading
        <span className="dot dot-1">.</span>
        <span className="dot dot-2">.</span>
        <span className="dot dot-3">.</span>
      </span>
    </div>
  );
}
