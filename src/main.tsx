import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { GAME_VERSION, SAVE_SCHEMA_VERSION, BUILD_ID } from './constants/version.ts';
import { INITIAL_PRODUCTS } from './data/products.ts';

// Debug information logging for Production Domain & Deployment URL verification
console.log('[App Startup]', {
  gameVersion: GAME_VERSION,
  saveVersion: SAVE_SCHEMA_VERSION,
  buildId: BUILD_ID,
  hostname: window.location.hostname,
  productCount: INITIAL_PRODUCTS.length,
});

// Auto-reload once when a new Service Worker takes over
let isRefreshing = false;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!isRefreshing) {
      isRefreshing = true;
      console.log('[PWA] Service Worker controller changed -> Auto reloading to load new build...');
      window.location.reload();
    }
  });
}

// Register PWA Service Worker with immediate auto-update and periodic check
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[PWA] New deployment version detected! Activating new Service Worker...');
    updateSW(true);
  },
  onOfflineReady() {
    console.log('[PWA] Game is ready for offline play.');
  },
  onRegisteredSW(swUrl, registration) {
    console.log('[PWA] Service Worker registered:', swUrl);
    if (registration) {
      // Check for Vercel updates every 5 minutes while website is open
      setInterval(() => {
        registration.update().catch(() => {});
      }, 5 * 60 * 1000);
    }
  },
});

createRoot(document.getElementById('root')!).render(<App />);
