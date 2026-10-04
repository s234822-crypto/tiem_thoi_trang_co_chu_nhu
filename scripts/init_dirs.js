const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Base directories
const BASE_DIR = path.join(__dirname, '..', 'public', 'assets', 'outfits');
const CATEGORIES = ['tops', 'bottoms', 'skirts', 'dresses', 'jackets', 'shoes', 'bags', 'accessories'];

CATEGORIES.forEach(cat => {
  const dir = path.join(BASE_DIR, cat);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Target directories initialized under public/assets/outfits/');
