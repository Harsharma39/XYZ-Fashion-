const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'under_construction',
    message: 'Website is under construction',
    contact: 'harsh39sh@gmail.com',
    timestamp: new Date().toISOString()
  });
});

// In production, serve React build
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, './client/build')));
  
  // Handle React routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });
} else {
  // Development: Simple under construction page
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Under Construction</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #000000;
            color: #ffffff;
            font-family: Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            padding: 2rem;
          }
          .icon {
            font-size: 5rem;
            margin-bottom: 2rem;
            color: #FFD700;
          }
          h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #ffffff;
          }
          p {
            font-size: 1.2rem;
            color: #cccccc;
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .contact a {
            color: #FFD700;
            text-decoration: none;
            font-size: 1.1rem;
          }
          .contact a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">🚧</div>
          <h1>UNDER CONSTRUCTION</h1>
          <p>We're building something amazing!<br>Please check back soon.</p>
          <div class="contact">
            <p>Contact: <a href="mailto:harsh39sh@gmail.com">harsh39sh@gmail.com</a></p>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
              Running in development mode
            </p>
          </div>
        </div>
      </body>
      </html>
    `);
  });
}

// Start server (for local development)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 API: http://localhost:${PORT}/api/status`);
  });
}

// Export for Vercel
module.exports = app;