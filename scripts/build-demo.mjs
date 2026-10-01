// Turns the demo build (dist-demo/) into one self-contained HTML fragment: dist-demo/demo.html
// (no doctype/html/head/body, so it can be published as a single-file artifact). Uses localStorage, no Supabase.
import fs from 'node:fs'; import path from 'node:path';
const dir = 'dist-demo', html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"[^>]*>/g)].map((m) => fs.readFileSync(path.join(dir, m[1].replace(/^\.?\//, '')), 'utf8')).join('\n');
const js = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g)].map((m) => fs.readFileSync(path.join(dir, m[1].replace(/^\.?\//, '')), 'utf8')).join('\n');
const title = (html.match(/<title>([^<]*)<\/title>/) || [, 'Prealgebra Workshop'])[1];
const out = `<title>${title}</title>\n<style>${css}</style>\n<div id="app"></div>\n<script>${js.replace(/<\/script/gi, '<\\/script')}</script>\n`;
fs.writeFileSync(path.join(dir, 'demo.html'), out);
console.log('demo.html', (out.length / 1024).toFixed(0) + ' KB');
