const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');

// Replace all .svg image references with .png in products.ts
content = content.replace(/\/assets\/outfits\/([^'"]+)\.svg/g, '/assets/outfits/$1.png');

// Check that every image reference exists in public/
let missingCount = 0;
let totalCount = 0;

const regex = /image:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  totalCount++;
  const relPath = match[1];
  const fullPath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    console.error(`MISSING IMAGE FILE: ${relPath} (Full: ${fullPath})`);
    missingCount++;
  }
}

fs.writeFileSync(PRODUCTS_FILE, content, 'utf8');

console.log(`Verified ${totalCount} product image paths. Missing files: ${missingCount}`);
