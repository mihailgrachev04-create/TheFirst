const express = require('express');
const app = express();

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Полный CSP (исправляет warning 10055)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
  );

  // Новый заголовок (исправляет COOP)
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

  // Уже был (COEP)
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

  // Cache (убирает warning)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  res.setHeader('Permissions-Policy', 'geolocation=()');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});

// чтобы убрать WARN по 404
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nDisallow:');
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml; charset=utf-8').send('<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>');
});

app.get('/', (req, res) => {
  res.send('Hello DevSecOps');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});
