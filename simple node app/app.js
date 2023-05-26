const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to kubernetes</h1>
  `);
});

app.get('/error', (req, res) => {
  process.exit(1);
});

app.listen(5000);
