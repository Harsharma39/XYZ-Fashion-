const express = require('express');
const app = express();

app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'under_construction',
    message: 'Site is under construction',
    contact: 'harsh39sh@gmail.com'
  });
});

module.exports = app;
