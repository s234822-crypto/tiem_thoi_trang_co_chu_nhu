const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const TEST_SVG = path.join(__dirname, '..', 'public', 'assets', 'outfits', 'tops', 'basic-tshirt.svg');
const TEST_HTML = path.join(__dirname, 'test_render.html');
const TEST_PNG = path.join(__dirname, 'test_output.png');

const svgContent = fs.readFileSync(TEST_SVG, 'utf8');

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 0; background: transparent; overflow: hidden; width: 512px; height: 512px; }
  svg { width: 512px; height: 512px; }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;

fs.writeFileSync(TEST_HTML, html, 'utf8');

try {
  const cmd = `"${EDGE_PATH}" --headless --disable-gpu --screenshot="${TEST_PNG}" --window-size=512,512 "file:///${TEST_HTML.replace(/\\/g, '/')}"`;
  console.log('Running cmd:', cmd);
  execSync(cmd);
  console.log('Screenshot success! Output PNG size:', fs.statSync(TEST_PNG).size);
} catch(e) {
  console.error('Edge screenshot error:', e.message);
}
