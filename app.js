const express = require('express');
const app = express();

// Убираем X-Powered-By
app.disable('x-powered-by');

// Добавляем заголовки безопасности
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Permissions-Policy', 'geolocation=()');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello DevSecOps');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});
