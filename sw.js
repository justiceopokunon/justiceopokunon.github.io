// ==============================================
// Service Worker - Portfolio PWA
// ==============================================

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

// Files to cache immediately on install
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/FBX_7410.JPG'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
  // Google Fonts - Inter
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap',
  
  // Font Awesome CSS
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  
  // Font Awesome webfonts (most common formats)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-regular-400.woff2',
  
  // External images used in projects
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
];

const ALL_CACHE_ASSETS = [...CORE_ASSETS, ...EXTERNAL_RESOURCES];

// ==============================================
// Install Event - Cache all essential files
// ==============================================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all assets');
        // Cache core assets first
        return cache.addAll(CORE_ASSETS)
          .then(() => {
            // Then cache external resources, but don't fail if any fail
            return Promise.allSettled(
              EXTERNAL_RESOURCES.map(url => 
                cache.add(url).catch(err => {
                  console.warn(`[Service Worker] Failed to cache ${url}:`, err);
                  return null;
                })
              )
            );
          });
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// ==============================================
// Activate Event - Clean up old caches
// ==============================================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old caches
              return cacheName.startsWith('portfolio-cache-') && 
                     cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        // Claim all clients immediately
        return self.clients.claim();
      })
  );
});

// ==============================================
// Fetch Event - Serve from cache, fallback to network
// ==============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome extensions and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Different strategies for different types of requests
  
  // Cache-first strategy for static assets
  if (
    url.origin === location.origin || // Same origin
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.hostname === 'cdnjs.cloudflare.com' ||
    url.hostname === 'images.unsplash.com'
  ) {
    event.respondWith(cacheFirst(request));
  }
  // Network-first strategy for API calls and dynamic content
  else if (url.pathname.includes('/api/')) {
    event.respondWith(networkFirst(request));
  }
  // Default: Cache-first for everything else
  else {
    event.respondWith(cacheFirst(request));
  }
});

// ==============================================
// Cache-First Strategy
// ==============================================
async function cacheFirst(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[Service Worker] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    // If not in cache, fetch from network
    console.log('[Service Worker] Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache the new response for future use
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      // Clone the response because it can only be consumed once
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(CACHE_NAME);
      const cachedIndex = await cache.match('/index.html');
      if (cachedIndex) return cachedIndex;
    }
    
    // Return a custom offline response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'You are currently offline. Please check your internet connection.'
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}

// ==============================================
// Network-First Strategy
// ==============================================
async function networkFirst(request) {
  try {
    // Try network first
    console.log('[Service Worker] Fetching from network (network-first):', request.url);
    const networkResponse = await fetch(request);
    
    // Cache the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', request.url);
    
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'Unable to fetch data. You are currently offline.'
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}

// ==============================================
// Message Event - Handle messages from clients
// ==============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urls))
        .then(() => console.log('[Service Worker] Additional URLs cached'))
    );
  }
});

// ==============================================
// Handle offline detection
// ==============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-form-data') {
    event.waitUntil(syncFormData());
  }
});

async function syncFormData() {
  // This would handle syncing form submissions when back online
  console.log('[Service Worker] Syncing form data...');
  // Implementation would depend on where form data is stored
}

console.log('[Service Worker] Loaded');
