/* Build: node tools/build.js — writes every page to the repo root. */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const dir = path.join(__dirname, 'pages');

fs.readdirSync(dir).filter((f) => f.endsWith('.js')).forEach((f) => {
  const mod = require(path.join(dir, f));
  const out = { 'home.js': 'index.html' }[f] || f.replace(/\.js$/, '.html');
  fs.writeFileSync(path.join(ROOT, out), mod);
  console.log('wrote', out);
});

/* Old URLs from the previous build → redirect so shared links don't 404. */
const redirect = (to) => `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Bundle</title><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${to}"></head><body><a href="${to}">Continue</a></body></html>\n`;
fs.writeFileSync(path.join(ROOT, 'services.html'), redirect('index.html#departments'));
fs.writeFileSync(path.join(ROOT, 'insights.html'), redirect('work.html'));
console.log('wrote services.html, insights.html (redirects)');
