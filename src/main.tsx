import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Auto update PWA Service Worker when a new version is deployed
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[PWA] New version detected! Refreshing Service Worker...');
    updateSW(true);
  },
  onOfflineReady() {
    console.log('[PWA] Game is ready for offline play.');
  },
  onRegisteredSW(swUrl, registration) {
    console.log('[PWA] Service Worker active:', swUrl);
    if (registration) {
      // Check for deployment updates every 15 minutes while app is open
      setInterval(() => {
        registration.update().catch(() => {});
      }, 15 * 60 * 1000);
    }
  },
});

createRoot(document.getElementById('root')!).render(<App />);
