const http = require('http');
require('dotenv').config();  

// Create server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Handle different routes
  if (req.url === '/') {
    res.end(`
      <h1>Welcome to Simple Server</h1>
      <p>Server is running successfully!</p>
      <p>Time: ${new Date().toLocaleString()}</p>
      <p>Try visiting:</p>
      <ul>
        <li><a href="/about">/about Auto Deployment</a></li>
        <li><a href="/api">/api</a></li>
      </ul>
    `);
  } else if (req.url === '/about') {
    res.end(`
      <h1>Saleh page</h1>
      <p>This is a simple Node.js server example.</p>
      <a href="/">← Back to Home</a>
    `);
  } else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from API!',
      timestamp: new Date().toISOString(),
      status: 'success'
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">← Back to Home</a>
    `);
  }
});

// Set port
const PORT = process.env.PORT || 3000;

// Start server with listener
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 Listening for requests...`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
