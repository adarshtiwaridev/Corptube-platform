self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

// Placeholder push handler to avoid errors if push events are received
self.addEventListener('push', (event) => {
	// No-op. Integrate Firebase messaging here if needed.
});


