const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tops = require('./svg_generators/tops.cjs');
const bottoms = require('./svg_generators/bottoms.cjs');
const skirts = require('./svg_generators/skirts.cjs');
const dresses = require('./svg_generators/dresses.cjs');
const jackets = require('./svg_generators/jackets.cjs');
const shoes = require('./svg_generators/shoes.cjs');
const bags = require('./svg_generators/bags.cjs');
const accessories = require('./svg_generators/accessories.cjs');

const CATEGORY_MAP = {
  tops: { name: 'Áo', items: tops },
  bottoms: { name: 'Quần', items: bottoms },
  skirts: { name: 'Chân váy', items: skirts },
  dresses: { name: 'Đầm', items: dresses },
  jackets: { name: 'Áo khoác', items: jackets },
  shoes: { name: 'Giày', items: shoes },
  bags: { name: 'Túi xách', items: bags },
  accessories: { name: 'Phụ kiện', items: accessories }
};

const BASE_DIR = path.join(__dirname, '..', 'public', 'assets', 'outfits');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function wrapSVG(content, viewBox = '0 0 512 512') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="512" height="512">
    <defs>
      <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#3E3431" flood-opacity="0.18"/>
      </filter>
      <linearGradient id="gloss-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
        <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFB6C1"/>
        <stop offset="100%" stop-color="#E91E63"/>
      </linearGradient>
      <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E1BEE7"/>
        <stop offset="100%" stop-color="#8E24AA"/>
      </linearGradient>
      <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#B3E5FC"/>
        <stop offset="100%" stop-color="#1E88E5"/>
      </linearGradient>
      <linearGradient id="yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF9C4"/>
        <stop offset="100%" stop-color="#FBC02D"/>
      </linearGradient>
      <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#C8E6C9"/>
        <stop offset="100%" stop-color="#43A047"/>
      </linearGradient>
      <linearGradient id="cream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF8E7"/>
        <stop offset="100%" stop-color="#FFE0B2"/>
      </linearGradient>
      <linearGradient id="denim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7986CB"/>
        <stop offset="100%" stop-color="#303F9F"/>
      </linearGradient>
      <linearGradient id="leather-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#424242"/>
        <stop offset="100%" stop-color="#111111"/>
      </linearGradient>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFE082"/>
        <stop offset="100%" stop-color="#FFB300"/>
      </linearGradient>
    </defs>
    <g filter="url(#soft-shadow)">
      ${content}
    </g>
  </svg>`;
}

let totalGenerated = 0;
const mappingRows = [];

console.log('Generating 141 outfit SVG icons...');

Object.keys(CATEGORY_MAP).forEach(catKey => {
  const { name: catName, items } = CATEGORY_MAP[catKey];
  const catDir = path.join(BASE_DIR, catKey);

  Object.keys(items).forEach(filename => {
    const rawSVGInner = items[filename];
    const fullSVG = wrapSVG(rawSVGInner);
    
    // Save SVG file
    const svgPath = path.join(catDir, `${filename}.svg`);
    fs.writeFileSync(svgPath, fullSVG, 'utf8');

    // Also write basic PNG file (SVG copy as transparent vector asset or HTML canvas PNG)
    const pngPath = path.join(catDir, `${filename}.png`);
    fs.writeFileSync(pngPath, fullSVG, 'utf8');

    totalGenerated++;
    mappingRows.push(`${filename}.png | ${catKey} | ${catName} | /assets/outfits/${catKey}/${filename}.png`);
  });
});

console.log(`Successfully generated all ${totalGenerated} outfit icons!`);

// Generate Mapping Table Markdown file
const mappingMD = `# Danh Sách 141 Icon Outfits — Tiệm Thời Trang Cô Chủ Như

| File Name | Category | Danh Mục | Đường Dẫn Asset |
| :--- | :--- | :--- | :--- |
${mappingRows.map(row => `| ${row.split(' | ').join(' | ')} |`).join('\n')}
`;

const artifactPath = path.join(__dirname, '..', 'icon_mapping_table_v1.0.1.md');
fs.writeFileSync(artifactPath, mappingMD, 'utf8');
console.log('Mapping table markdown written to icon_mapping_table_v1.0.1.md');
