import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 inset-x-4 z-50 flex items-center justify-center pointer-events-none animate-gentle-bounce">
      <div className="bg-[#3E3431]/95 text-white border border-[#F4C7D9]/50 px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 text-[11px] font-bold">
        <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Chế độ Offline — Dữ liệu game lưu trên máy</span>
      </div>
    </div>
  );
};
