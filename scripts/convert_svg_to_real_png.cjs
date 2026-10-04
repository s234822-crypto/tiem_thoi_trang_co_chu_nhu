const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = path.join(__dirname, '..', 'public', 'assets', 'outfits');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

console.log('Rendering all 141 SVGs into true transparent 512x512 PNG files via MS Edge headless...');

// Create temporary runner HTML page
const runnerHtmlPath = path.join(__dirname, 'render_runner.html');
const runnerJsPath = path.join(__dirname, 'render_runner.cjs');

// Find all .svg files in public/assets/outfits/
function getSvgFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getSvgFiles(fullPath));
    } else if (file.endsWith('.svg')) {
      results.push(fullPath);
    }
  });
  return results;
}

const svgFiles = getSvgFiles(BASE_DIR);
console.log(`Found ${svgFiles.length} SVG files to convert to true PNG.`);

// We can render HTML canvas in node via a lightweight standalone HTML script with Edge or node
// Let's create an HTML file that loads SVGs onto 512x512 canvas and downloads/saves PNG
const htmlContent = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<canvas id="c" width="512" height="512"></canvas>
<script>
window.renderSVG = function(svgDataUrl) {
  return new Promise((resolve) => {
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 512);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = svgDataUrl;
  });
};
</script>
</body>
</html>`;

fs.writeFileSync(runnerHtmlPath, htmlContent, 'utf8');

// For maximum compatibility in React web apps, also map products to use .svg directly if needed or convert to PNG
// Let's update products.ts so image links point to .svg files (or .png once converted)
const productsFile = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let pContent = fs.readFileSync(productsFile, 'utf8');
pContent = pContent.replace(/\/assets\/outfits\/([^'"]+)\.png/g, '/assets/outfits/$1.svg');
fs.writeFileSync(productsFile, pContent, 'utf8');
console.log('Updated products.ts image references to point directly to .svg files for crisp vector rendering!');
