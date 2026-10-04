const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');

const TOPS_MAPPING = {
  basic_tshirt: '/assets/outfits/tops/basic-tshirt.png',
  oversize_tshirt: '/assets/outfits/tops/oversized-tshirt.png',
  croptop: '/assets/outfits/tops/crop-top.png',
  camisole: '/assets/outfits/tops/camisole-top.png',
  tank_top: '/assets/outfits/tops/tank-top.png',
  blouse: '/assets/outfits/tops/blouse.png',
  shirt: '/assets/outfits/tops/button-shirt.png',
  turtleneck: '/assets/outfits/tops/turtleneck-top.png',
  polo: '/assets/outfits/tops/polo-shirt.png',
  peplum: '/assets/outfits/tops/peplum-top.png',
  off_shoulder_top: '/assets/outfits/tops/off-shoulder-top.png',
  knit_top: '/assets/outfits/tops/knit-top.png',
  sweater: '/assets/outfits/tops/sweater.png',
  sweatshirt: '/assets/outfits/tops/sweater.png',
  hoodie: '/assets/outfits/tops/hoodie.png',
  short_cardigan: '/assets/outfits/tops/cropped-cardigan.png',
  long_cardigan: '/assets/outfits/tops/long-cardigan.png',
  corset: '/assets/outfits/tops/corset-top.png',
  baby_tee: '/assets/outfits/tops/baby-tee.png',
  babydoll_top: '/assets/outfits/tops/babydoll-top.png',
  lace_top: '/assets/outfits/tops/lace-top.png',
};

let count = 0;

Object.entries(TOPS_MAPPING).forEach(([subCat, imgPath]) => {
  const regex = new RegExp(`(subCategory:\\s*'${subCat}',[\\s\\S]*?image:\\s*')[^']+'`, 'g');
  content = content.replace(regex, (match, prefix) => {
    count++;
    return `${prefix}${imgPath}'`;
  });
});

fs.writeFileSync(PRODUCTS_FILE, content, 'utf8');
console.log(`Successfully mapped ${count} tops items in products.ts!`);
