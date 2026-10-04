const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), 'utf8');

const items = [];
const lines = content.split('\n');
let cur = null;
for (let line of lines) {
  if (line.includes('id:')) {
    if (cur && cur.category === 'bottoms') items.push(cur);
    cur = {};
    const m = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (m) cur.id = m[1];
  }
  if (cur) {
    if (line.includes('name:')) {
      const m = line.match(/name:\s*['"]([^'"]+)['"]/);
      if (m) cur.name = m[1];
    }
    if (line.includes('category:')) {
      const m = line.match(/category:\s*['"]([^'"]+)['"]/);
      if (m) cur.category = m[1];
    }
    if (line.includes('subCategory:')) {
      const m = line.match(/subCategory:\s*['"]([^'"]+)['"]/);
      if (m) cur.subCategory = m[1];
    }
    if (line.includes('image:')) {
      const m = line.match(/image:\s*['"]([^'"]+)['"]/);
      if (m) cur.image = m[1];
    }
  }
}
if (cur && cur.category === 'bottoms') items.push(cur);

console.log('Total bottoms items found:', items.length);
items.forEach(i => console.log(i.id, '|', i.name, '| subCategory:', i.subCategory, '| image:', i.image));
