const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'src', 'data', 'products.ts');
let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');

// SubCategory to icon filename map
const SUBCATEGORY_ICON_MAP = {
  // TOPS (20)
  basic_tshirt: 'tops/basic-tshirt.png',
  oversize_tshirt: 'tops/oversized-tshirt.png',
  croptop: 'tops/crop-top.png',
  camisole: 'tops/camisole-top.png',
  tank_top: 'tops/tank-top.png',
  blouse: 'tops/blouse.png',
  shirt: 'tops/button-shirt.png',
  turtleneck: 'tops/turtleneck-top.png',
  polo: 'tops/polo-shirt.png',
  peplum: 'tops/peplum-top.png',
  off_shoulder_top: 'tops/off-shoulder-top.png',
  knit_top: 'tops/knit-top.png',
  sweater: 'tops/sweater.png',
  sweatshirt: 'tops/sweater.png',
  hoodie: 'tops/hoodie.png',
  short_cardigan: 'tops/cropped-cardigan.png',
  long_cardigan: 'tops/long-cardigan.png',
  corset: 'tops/corset-top.png',
  baby_tee: 'tops/baby-tee.png',
  babydoll_top: 'tops/babydoll-top.png',
  lace_top: 'tops/lace-top.png',

  // BOTTOMS (18)
  skinny_jeans: 'bottoms/skinny-jeans.png',
  straight_jeans: 'bottoms/straight-jeans.png',
  wide_leg_jeans: 'bottoms/wide-leg-jeans.png',
  baggy_jeans: 'bottoms/baggy-jeans.png',
  denim_shorts: 'bottoms/denim-shorts.png',
  khaki_shorts: 'bottoms/khaki-shorts.png',
  tailored_trousers: 'bottoms/tailored-trousers.png',
  straight_trousers: 'bottoms/straight-trousers.png',
  wide_leg_trousers: 'bottoms/wide-leg-trousers.png',
  cargo_pants: 'bottoms/cargo-pants.png',
  jogger_pants: 'bottoms/jogger-pants.png',
  leggings: 'bottoms/leggings.png',
  culottes: 'bottoms/culottes.png',
  linen_pants: 'bottoms/linen-pants.png',
  high_waist_pants: 'bottoms/high-waist-pants.png',
  y2k_pants: 'bottoms/y2k-pants.png',
  sporty_pants: 'bottoms/sporty-pants.png',
  leather_pants: 'bottoms/leather-pants.png',

  // SKIRTS (15)
  aline_skirt: 'skirts/a-line-skirt.png',
  tennis_skirt: 'skirts/tennis-skirt.png',
  pleated_skirt: 'skirts/pleated-skirt.png',
  denim_skirt: 'skirts/denim-skirt.png',
  midi_skirt: 'skirts/midi-skirt.png',
  maxi_skirt: 'skirts/maxi-skirt.png',
  pencil_skirt: 'skirts/pencil-skirt.png',
  mermaid_skirt: 'skirts/mermaid-skirt.png',
  satin_skirt: 'skirts/satin-skirt.png',
  lace_skirt: 'skirts/lace-skirt.png',
  caro_skirt: 'skirts/plaid-skirt.png',
  plaid_skirt: 'skirts/plaid-skirt.png',
  cargo_skirt: 'skirts/cargo-skirt.png',
  mini_skirt: 'skirts/mini-skirt.png',
  tiered_skirt: 'skirts/tiered-skirt.png',
  vintage_skirt: 'skirts/vintage-skirt.png',

  // DRESSES (18)
  office_dress: 'dresses/office-dress.png',
  body_dress: 'dresses/bodycon-dress.png',
  bodycon_dress: 'dresses/bodycon-dress.png',
  party_dress: 'dresses/party-dress.png',
  floral_dress: 'dresses/floral-dress.png',
  babydoll_dress: 'dresses/babydoll-dress.png',
  maxi_dress: 'dresses/maxi-dress.png',
  midi_dress: 'dresses/midi-dress.png',
  shirt_dress: 'dresses/shirt-dress.png',
  slip_dress: 'dresses/slip-dress.png',
  off_shoulder_dress: 'dresses/off-shoulder-dress.png',
  square_neck_dress: 'dresses/square-neck-dress.png',
  lace_dress: 'dresses/lace-dress.png',
  satin_dress: 'dresses/satin-dress.png',
  sequin_dress: 'dresses/sequin-dress.png',
  vintage_dress: 'dresses/vintage-dress.png',
  korean_dress: 'dresses/korean-dress.png',
  y2k_dress: 'dresses/y2k-dress.png',
  luxury_dress: 'dresses/luxury-dress.png',

  // JACKETS (15)
  blazer: 'jackets/blazer.png',
  denim_jacket: 'jackets/denim-jacket.png',
  leather_jacket: 'jackets/leather-jacket.png',
  bomber_jacket: 'jackets/bomber-jacket.png',
  varsity_jacket: 'jackets/varsity-jacket.png',
  trench_coat: 'jackets/trench-coat.png',
  wool_coat: 'jackets/wool-coat.png',
  fur_jacket: 'jackets/fur-jacket.png',
  outer_cardigan: 'jackets/outer-cardigan.png',
  tweed_jacket: 'jackets/tweed-jacket.png',
  cropped_jacket: 'jackets/cropped-jacket.png',
  oversized_jacket: 'jackets/oversized-jacket.png',
  windbreaker: 'jackets/windbreaker.png',
  varsity_coat: 'jackets/varsity-coat.png',
  sporty_jacket: 'jackets/sporty-jacket.png',

  // SHOES (18)
  white_sneakers: 'shoes/white-sneakers.png',
  chunky_sneakers: 'shoes/chunky-sneakers.png',
  platform_sneakers: 'shoes/platform-sneakers.png',
  pointed_heels: 'shoes/pointed-heels.png',
  strap_heels: 'shoes/strap-heels.png',
  kitten_heels: 'shoes/kitten-heels.png',
  sandals: 'shoes/sandals.png',
  platform_sandals: 'shoes/platform-sandals.png',
  ankle_boots: 'shoes/ankle-boots.png',
  knee_high_boots: 'shoes/knee-high-boots.png',
  chelsea_boots: 'shoes/chelsea-boots.png',
  loafers: 'shoes/loafers.png',
  mary_jane: 'shoes/mary-jane-shoes.png',
  ballet_flats: 'shoes/ballet-flats.png',
  mules: 'shoes/mules.png',
  oxford: 'shoes/oxford-shoes.png',
  sport_shoes: 'shoes/sport-shoes.png',
  luxury_shoes: 'shoes/luxury-shoes.png',

  // BAGS (17)
  tote_bag: 'bags/tote-bag.png',
  mini_bag: 'bags/mini-bag.png',
  shoulder_bag: 'bags/shoulder-bag.png',
  crossbody_bag: 'bags/crossbody-bag.png',
  baguette_bag: 'bags/baguette-bag.png',
  bucket_bag: 'bags/bucket-bag.png',
  office_bag: 'bags/office-bag.png',
  clutch_bag: 'bags/clutch-bag.png',
  box_bag: 'bags/box-bag.png',
  leather_bag: 'bags/leather-bag.png',
  canvas_bag: 'bags/canvas-bag.png',
  pastel_bag: 'bags/pastel-bag.png',
  vintage_bag: 'bags/vintage-bag.png',
  y2k_bag: 'bags/y2k-bag.png',
  luxury_bag: 'bags/luxury-bag.png',
  bow_bag: 'bags/bow-bag.png',
  pearl_bag: 'bags/pearl-bag.png',

  // ACCESSORIES (20)
  sunglasses: 'accessories/sunglasses.png',
  round_glasses: 'accessories/round-glasses.png',
  baseball_cap: 'accessories/baseball-cap.png',
  beret: 'accessories/beret.png',
  bucket_hat: 'accessories/bucket-hat.png',
  straw_hat: 'accessories/straw-hat.png',
  earrings: 'accessories/earrings.png',
  necklace: 'accessories/necklace.png',
  bracelet: 'accessories/bracelet.png',
  ring: 'accessories/ring.png',
  belt: 'accessories/belt.png',
  hair_clip: 'accessories/hair-clip.png',
  hair_bow: 'accessories/hair-bow.png',
  scrunchie: 'accessories/scrunchie.png',
  headband: 'accessories/headband.png',
  scarf: 'accessories/scarf.png',
  watch: 'accessories/watch.png',
  brooch: 'accessories/brooch.png',
  pearl_necklace: 'accessories/pearl-necklace.png',
  high_socks: 'accessories/high-socks.png'
};

// Add image property back to each product in products.ts based on subCategory
let updatedCount = 0;

content = content.replace(/(\{\s*id:\s*'([^']+)',.*?subCategory:\s*'([^']+)',?)/g, (match, prefix, id, subCat) => {
  const iconRelPath = SUBCATEGORY_ICON_MAP[subCat];
  if (iconRelPath) {
    updatedCount++;
    return `${prefix}\n    image: '/assets/outfits/${iconRelPath}',`;
  }
  return match;
});

fs.writeFileSync(PRODUCTS_FILE, content, 'utf8');
console.log(`Successfully mapped image asset paths to ${updatedCount} products in products.ts!`);
