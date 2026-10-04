const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(productsFilePath, 'utf8');

const bottomsMap = {
  'Quần jean skinny': '/assets/outfits/bottoms/skinny-jeans.png',
  'Quần jean ống đứng': '/assets/outfits/bottoms/straight-jeans.png',
  'Quần jean ống rộng': '/assets/outfits/bottoms/wide-leg-jeans.png',
  'Quần jean baggy': '/assets/outfits/bottoms/baggy-jeans.png',
  'Quần short jean': '/assets/outfits/bottoms/denim-shorts.png',
  'Quần short kaki': '/assets/outfits/bottoms/khaki-shorts.png',
  'Quần tây': '/assets/outfits/bottoms/tailored-trousers.png',
  'Quần ống suông': '/assets/outfits/bottoms/straight-trousers.png',
  'Quần ống rộng': '/assets/outfits/bottoms/wide-leg-trousers.png',
  'Quần cargo': '/assets/outfits/bottoms/cargo-pants.png',
  'Quần jogger': '/assets/outfits/bottoms/jogger-pants.png',
  'Quần legging': '/assets/outfits/bottoms/leggings.png',
  'Quần culottes': '/assets/outfits/bottoms/culottes.png',
  'Quần linen': '/assets/outfits/bottoms/linen-pants.png',
  'Quần cạp cao': '/assets/outfits/bottoms/high-waist-pants.png',
  'Quần Y2K': '/assets/outfits/bottoms/y2k-pants.png',
  'Quần sporty': '/assets/outfits/bottoms/sporty-pants.png',
  'Quần da': '/assets/outfits/bottoms/leather-pants.png',

  'skinny_jeans': '/assets/outfits/bottoms/skinny-jeans.png',
  'straight_jeans': '/assets/outfits/bottoms/straight-jeans.png',
  'wide_leg_jeans': '/assets/outfits/bottoms/wide-leg-jeans.png',
  'baggy_jeans': '/assets/outfits/bottoms/baggy-jeans.png',
  'denim_shorts': '/assets/outfits/bottoms/denim-shorts.png',
  'khaki_shorts': '/assets/outfits/bottoms/khaki-shorts.png',
  'tailored_trousers': '/assets/outfits/bottoms/tailored-trousers.png',
  'straight_trousers': '/assets/outfits/bottoms/straight-trousers.png',
  'wide_leg_trousers': '/assets/outfits/bottoms/wide-leg-trousers.png',
  'cargo_pants': '/assets/outfits/bottoms/cargo-pants.png',
  'jogger_pants': '/assets/outfits/bottoms/jogger-pants.png',
  'leggings': '/assets/outfits/bottoms/leggings.png',
  'culottes': '/assets/outfits/bottoms/culottes.png',
  'linen_pants': '/assets/outfits/bottoms/linen-pants.png',
  'high_waist_pants': '/assets/outfits/bottoms/high-waist-pants.png',
  'y2k_pants': '/assets/outfits/bottoms/y2k-pants.png',
  'sporty_pants': '/assets/outfits/bottoms/sporty-pants.png',
  'leather_pants': '/assets/outfits/bottoms/leather-pants.png',
};

let updatedCount = 0;

content = content.replace(/(\{\s*id:\s*['"](bottom-[^'"]+|[^'"]+)['"][\s\S]*?category:\s*['"]bottoms['"][\s\S]*?\})/g, (block) => {
  const subMatch = block.match(/subCategory:\s*['"]([^'"]+)['"]/);
  if (subMatch) {
    const subCat = subMatch[1].trim();
    let newImagePath = bottomsMap[subCat];

    if (!newImagePath) {
      const subLower = subCat.toLowerCase();
      if (subLower.includes('skinny')) newImagePath = bottomsMap['Quần jean skinny'];
      else if (subLower.includes('baggy')) newImagePath = bottomsMap['Quần jean baggy'];
      else if (subLower.includes('short') && subLower.includes('kaki')) newImagePath = bottomsMap['Quần short kaki'];
      else if (subLower.includes('short') || subLower.includes('denim')) newImagePath = bottomsMap['Quần short jean'];
      else if (subLower.includes('cargo')) newImagePath = bottomsMap['Quần cargo'];
      else if (subLower.includes('jogger')) newImagePath = bottomsMap['Quần jogger'];
      else if (subLower.includes('legging')) newImagePath = bottomsMap['Quần legging'];
      else if (subLower.includes('culottes')) newImagePath = bottomsMap['Quần culottes'];
      else if (subLower.includes('linen')) newImagePath = bottomsMap['Quần linen'];
      else if (subLower.includes('cạp cao') || subLower.includes('high_waist')) newImagePath = bottomsMap['Quần cạp cao'];
      else if (subLower.includes('y2k')) newImagePath = bottomsMap['Quần Y2K'];
      else if (subLower.includes('sporty')) newImagePath = bottomsMap['Quần sporty'];
      else if (subLower.includes('da') || subLower.includes('leather')) newImagePath = bottomsMap['Quần da'];
      else if (subLower.includes('tây') || subLower.includes('tailored')) newImagePath = bottomsMap['Quần tây'];
      else if (subLower.includes('ống suông')) newImagePath = bottomsMap['Quần ống suông'];
      else if (subLower.includes('ống rộng') && subLower.includes('trousers')) newImagePath = bottomsMap['Quần ống rộng'];
      else if (subLower.includes('ống rộng') || subLower.includes('wide')) newImagePath = bottomsMap['Quần jean ống rộng'];
      else if (subLower.includes('ống đứng') || subLower.includes('straight')) newImagePath = bottomsMap['Quần jean ống đứng'];
    }

    if (newImagePath) {
      updatedCount++;
      return block.replace(/image:\s*['"]([^'"]+)['"]/, `image: '${newImagePath}'`);
    }
  }
  return block;
});

fs.writeFileSync(productsFilePath, content, 'utf8');
console.log(`Updated ${updatedCount} bottoms products in src/data/products.ts`);
