const express = require('express');
const app = express();

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self';"
  );

  
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  
  res.setHeader('Cache-Control', 'no-store');

  
  res.setHeader('Permissions-Policy', 'geolocation=()');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello DevSecOps');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});
