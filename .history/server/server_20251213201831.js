const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'under_construction',
    message: 'Site is under construction' 
  });
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Export for Vercel serverless
module.exports = app;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}