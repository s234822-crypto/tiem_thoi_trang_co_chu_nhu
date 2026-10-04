const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_DIR = path.join(__dirname, '..', 'public', 'assets', 'outfits');
const TEMP_HTML = path.join(__dirname, 'temp_render.html');

console.log('Batch converting all 141 SVGs to true 512x512 PNG images via Edge headless...');

// Recursively find all .svg files in public/assets/outfits
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
console.log(`Found ${svgFiles.length} SVG files to process.`);

let convertedCount = 0;

svgFiles.forEach((svgPath, index) => {
  const pngPath = svgPath.replace(/\.svg$/, '.png');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  // Wrap SVG in full 512x512 transparent HTML page
  const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { margin: 0; padding: 0; background: transparent; overflow: hidden; width: 512px; height: 512px; }
  svg { width: 512px; height: 512px; display: block; }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;

  fs.writeFileSync(TEMP_HTML, html, 'utf8');

  try {
    const fileUrl = `file:///${TEMP_HTML.replace(/\\/g, '/')}`;
    const pngTarget = pngPath.replace(/\\/g, '/');
    const cmd = `"${EDGE_PATH}" --headless --disable-gpu --default-background-color=00000000 --screenshot="${pngTarget}" --window-size=512,512 "${fileUrl}"`;
    
    execSync(cmd, { stdio: 'ignore' });
    convertedCount++;
    if (convertedCount % 10 === 0 || convertedCount === svgFiles.length) {
      console.log(`Converted [${convertedCount}/${svgFiles.length}] PNG icons...`);
    }
  } catch (err) {
    console.error(`Error converting ${svgPath}:`, err.message);
  }
});

// Cleanup temp HTML
if (fs.existsSync(TEMP_HTML)) {
  fs.unlinkSync(TEMP_HTML);
}

console.log(`Finished converting all ${convertedCount} outfit icons to true 512x512 transparent PNG images!`);
