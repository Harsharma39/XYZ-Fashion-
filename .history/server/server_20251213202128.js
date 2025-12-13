const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'under_construction',
    message: 'Website is under construction',
    contact: 'harsh39sh@gmail.com'
  });
});

// Serve React frontend
app.get('*', (req, res) => {
  // In production, serve from client/build
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Under Construction</title>
        <style>
          body {
            background: #000;
            color: #fff;
            font-family: Arial;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            padding: 20px;
          }
          h1 { font-size: 48px; margin: 20px 0; }
          p { font-size: 20px; color: #ccc; }
          a { color: gold; }
        </style>
      </head>
      <body>
        <div style="font-size: 60px;">🚧</div>
        <h1>UNDER CONSTRUCTION</h1>
        <p>We're building something amazing!</p>
        <p>Contact: <a href="mailto:harsh39sh@gmail.com">harsh39sh@gmail.com</a></p>
      </body>
      </html>
    `);
  }
});

// Export for Vercel
module.exports = app;