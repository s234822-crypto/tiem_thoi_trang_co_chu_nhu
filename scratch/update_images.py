import re

file_path = 'src/data/products.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

ID_TO_IMAGE = {
    # Dresses
    'french-tea-dress': '/assets/outfits/dresses/floral-dress.png',
    'satin-evening-gown': '/assets/outfits/dresses/satin-dress.png',
    'korean-minimal-shirtdress': '/assets/outfits/dresses/shirt-dress.png',
    'babydoll-dress': '/assets/outfits/dresses/babydoll-dress.png',
    'maxi-boho-dress': '/assets/outfits/dresses/floral-dress.png',
    'office-pencil-dress': '/assets/outfits/dresses/office-dress.png',
    'mini-party-dress': '/assets/outfits/dresses/sequin-dress.png',
    'floral-wrap-dress': '/assets/outfits/dresses/floral-dress.png',

    'dresses-office-dress': '/assets/outfits/dresses/office-dress.png',
    'dresses-bodycon-dress': '/assets/outfits/dresses/bodycon-dress.png',
    'dresses-party-dress': '/assets/outfits/dresses/party-dress.png',
    'dresses-floral-dress': '/assets/outfits/dresses/floral-dress.png',
    'dresses-babydoll-dress': '/assets/outfits/dresses/babydoll-dress.png',
    'dresses-maxi-dress': '/assets/outfits/dresses/floral-dress.png',
    'dresses-midi-dress': '/assets/outfits/dresses/midi-dress.png',
    'dresses-shirt-dress': '/assets/outfits/dresses/shirt-dress.png',
    'dresses-slip-dress': '/assets/outfits/dresses/slip-dress.png',
    'dresses-off-shoulder-dress': '/assets/outfits/dresses/off-shoulder-dress.png',
    'dresses-square-neck-dress': '/assets/outfits/dresses/square-neck-dress.png',
    'dresses-lace-dress': '/assets/outfits/dresses/lace-dress.png',
    'dresses-satin-dress': '/assets/outfits/dresses/satin-dress.png',
    'dresses-sequin-dress': '/assets/outfits/dresses/sequin-dress.png',
    'dresses-vintage-dress': '/assets/outfits/dresses/vintage-dress.png',
    'dresses-korean-dress': '/assets/outfits/dresses/korean-dress.png',
    'dresses-y2k-dress': '/assets/outfits/dresses/bodycon-dress.png',
    'dresses-luxury-dress': '/assets/outfits/dresses/luxury-dress.png',

    # Jackets
    'rose-blazer': '/assets/outfits/jackets/blazer.png',
    'tweed-boucle-jacket': '/assets/outfits/jackets/tweed-jacket.png',
    'leather-biker-jacket': '/assets/outfits/jackets/leather-jacket.png',
    'varsity-jacket': '/assets/outfits/jackets/varsity-jacket.png',
    'pastel-cardigan': '/assets/outfits/jackets/outer-cardigan.png',

    'jackets-blazer': '/assets/outfits/jackets/blazer.png',
    'jackets-denim-jacket': '/assets/outfits/jackets/denim-jacket.png',
    'jackets-leather-jacket': '/assets/outfits/jackets/leather-jacket.png',
    'jackets-bomber-jacket': '/assets/outfits/jackets/bomber-jacket.png',
    'jackets-varsity-jacket': '/assets/outfits/jackets/varsity-jacket.png',
    'jackets-trench-coat': '/assets/outfits/jackets/trench-coat.png',
    'jackets-wool-coat': '/assets/outfits/jackets/wool-coat.png',
    'jackets-fur-jacket': '/assets/outfits/jackets/fur-jacket.png',
    'jackets-outer-cardigan': '/assets/outfits/jackets/outer-cardigan.png',
    'jackets-tweed-jacket': '/assets/outfits/jackets/tweed-jacket.png',
    'jackets-cropped-jacket': '/assets/outfits/jackets/cropped-jacket.png',
    'jackets-oversized-jacket': '/assets/outfits/jackets/oversized-jacket.png',
    'jackets-windbreaker': '/assets/outfits/jackets/windbreaker.png',
    'jackets-varsity-coat': '/assets/outfits/jackets/varsity-coat.png',
    'jackets-sporty-jacket': '/assets/outfits/jackets/sporty-jacket.png',

    # Shoes
    'mary-jane-shoes': '/assets/outfits/shoes/mary-jane.png',
    'chunky-sneakers': '/assets/outfits/shoes/chunky-sneakers.png',
    'stiletto-pumps': '/assets/outfits/shoes/pointed-heels.png',
    'strappy-sandals': '/assets/outfits/shoes/strap-heels.png',
    'ankle-boots': '/assets/outfits/shoes/ankle-boots.png',
    'loafer-shoes': '/assets/outfits/shoes/loafers.png',
    'platform-sneaker': '/assets/outfits/shoes/platform-sneakers.png',
    'kitten-heel': '/assets/outfits/shoes/kitten-heels.png',
    'shoes-knee-high-boots': '/assets/outfits/shoes/ankle-boots.png',
    'shoes-chelsea-boots': '/assets/outfits/shoes/ankle-boots.png',

    'shoes-white-sneakers': '/assets/outfits/shoes/white-sneakers.png',
    'shoes-chunky-sneakers': '/assets/outfits/shoes/chunky-sneakers.png',
    'shoes-platform-sneakers': '/assets/outfits/shoes/platform-sneakers.png',
    'shoes-pointed-heels': '/assets/outfits/shoes/pointed-heels.png',
    'shoes-strap-heels': '/assets/outfits/shoes/strap-heels.png',
    'shoes-kitten-heels': '/assets/outfits/shoes/kitten-heels.png',
    'shoes-sandals': '/assets/outfits/shoes/sandals.png',
    'shoes-platform-sandals': '/assets/outfits/shoes/platform-sandals.png',
    'shoes-ankle-boots': '/assets/outfits/shoes/ankle-boots.png',
    'shoes-loafers': '/assets/outfits/shoes/loafers.png',
    'shoes-mary-jane': '/assets/outfits/shoes/mary-jane.png',
    'shoes-ballet-flats': '/assets/outfits/shoes/ballet-flats.png',
    'shoes-mules': '/assets/outfits/shoes/mules.png',
    'shoes-oxford-shoes': '/assets/outfits/shoes/oxford-shoes.png',
    'shoes-sport-shoes': '/assets/outfits/shoes/sport-shoes.png',
    'shoes-luxury-shoes': '/assets/outfits/shoes/luxury-shoes.png',

    # Bags
    'canvas-tote-bag': '/assets/outfits/bags/tote-bag.png',
    'quilted-crossbody-bag': '/assets/outfits/bags/crossbody-bag.png',
    'vintage-leather-shoulder': '/assets/outfits/bags/leather-bag.png',
    'baguette-shoulder-bag': '/assets/outfits/bags/baguette-bag.png',
    'quilted-chain-bag': '/assets/outfits/bags/clutch-bag.png',
    'mini-crossbody': '/assets/outfits/bags/crossbody-bag.png',
    'office-tote': '/assets/outfits/bags/office-bag.png',
    'bucket-hat-bag': '/assets/outfits/bags/bucket-bag.png',

    'bags-tote-bag': '/assets/outfits/bags/tote-bag.png',
    'bags-mini-bag': '/assets/outfits/bags/mini-bag.png',
    'bags-shoulder-bag': '/assets/outfits/bags/shoulder-bag.png',
    'bags-office-bag': '/assets/outfits/bags/office-bag.png',
    'bags-crossbody-bag': '/assets/outfits/bags/crossbody-bag.png',
    'bags-clutch-bag': '/assets/outfits/bags/clutch-bag.png',
    'bags-bucket-bag': '/assets/outfits/bags/bucket-bag.png',
    'bags-baguette-bag': '/assets/outfits/bags/baguette-bag.png',
    'bags-box-bag': '/assets/outfits/bags/box-bag.png',
    'bags-canvas-bag': '/assets/outfits/bags/canvas-bag.png',
    'bags-leather-bag': '/assets/outfits/bags/leather-bag.png',
    'bags-vintage-bag': '/assets/outfits/bags/vintage-bag.png',
    'bags-y2k-bag': '/assets/outfits/bags/y2k-bag.png',
    'bags-pastel-bag': '/assets/outfits/bags/pastel-bag.png',
    'bags-pearl-bag': '/assets/outfits/bags/pearl-bag.png',
    'bags-bow-bag': '/assets/outfits/bags/bow-bag.png',

    # Accessories
    'pearl-drop-earrings': '/assets/outfits/accessories/pearl-necklace.png',
    'cat-eye-sunglasses': '/assets/outfits/accessories/sunglasses.png',
    'satin-ribbon-bow': '/assets/outfits/accessories/hair-bow.png',
    'layered-necklace': '/assets/outfits/accessories/necklace.png',
    'pearl-headband': '/assets/outfits/accessories/headband.png',
    'scrunchie-set': '/assets/outfits/accessories/scrunchie.png',
    'gold-belt': '/assets/outfits/accessories/belt.png',
    'charm-bracelet': '/assets/outfits/accessories/bracelet.png',
    'oversized-glasses': '/assets/outfits/accessories/round-glasses.png',
    'french-beret-hat': '/assets/outfits/accessories/beret.png',
    'pearl-earrings': '/assets/outfits/accessories/earrings.png',

    'accessories-sunglasses': '/assets/outfits/accessories/sunglasses.png',
    'accessories-round-glasses': '/assets/outfits/accessories/round-glasses.png',
    'accessories-baseball-cap': '/assets/outfits/accessories/baseball-cap.png',
    'accessories-beret': '/assets/outfits/accessories/beret.png',
    'accessories-bucket-hat': '/assets/outfits/accessories/bucket-hat.png',
    'accessories-straw-hat': '/assets/outfits/accessories/straw-hat.png',
    'accessories-ring': '/assets/outfits/accessories/ring.png',
    'accessories-hair-bow': '/assets/outfits/accessories/hair-bow.png',
    'accessories-scrunchie': '/assets/outfits/accessories/scrunchie.png',
    'accessories-headband': '/assets/outfits/accessories/headband.png',
    'accessories-scarf': '/assets/outfits/accessories/scarf.png',
    'accessories-watch': '/assets/outfits/accessories/watch.png',
    'accessories-brooch': '/assets/outfits/accessories/brooch.png',
    'accessories-pearl-necklace': '/assets/outfits/accessories/pearl-necklace.png',
    'accessories-high-socks': '/assets/outfits/accessories/high-socks.png',

    'acc-sunglasses': '/assets/outfits/accessories/sunglasses.png',
    'acc-round-glasses': '/assets/outfits/accessories/round-glasses.png',
    'acc-beret': '/assets/outfits/accessories/beret.png',
    'acc-bucket-hat': '/assets/outfits/accessories/bucket-hat.png',
    'acc-baseball-cap': '/assets/outfits/accessories/baseball-cap.png',
    'acc-straw-hat': '/assets/outfits/accessories/straw-hat.png',
    'acc-earrings': '/assets/outfits/accessories/earrings.png',
    'acc-necklace': '/assets/outfits/accessories/necklace.png',
    'acc-pearl-necklace': '/assets/outfits/accessories/pearl-necklace.png',
    'acc-bracelet': '/assets/outfits/accessories/bracelet.png',
    'acc-ring': '/assets/outfits/accessories/ring.png',
    'acc-brooch': '/assets/outfits/accessories/brooch.png',
    'acc-scarf': '/assets/outfits/accessories/scarf.png',
    'acc-hair-clip': '/assets/outfits/accessories/hair-clip.png',
    'acc-hair-bow': '/assets/outfits/accessories/hair-bow.png',
    'acc-headband': '/assets/outfits/accessories/headband.png',
    'acc-belt': '/assets/outfits/accessories/belt.png',
    'acc-scrunchie': '/assets/outfits/accessories/scrunchie.png',
    'acc-high-socks': '/assets/outfits/accessories/high-socks.png',
    'acc-watch': '/assets/outfits/accessories/watch.png',

    # Tops missing image
    'warm-turtleneck': '/assets/outfits/tops/sweater.png',
    'chic-peplum-top': '/assets/outfits/tops/blouse.png',
    'off-shoulder-lace': '/assets/outfits/tops/croptop.png',
    'ribbed-knit-top': '/assets/outfits/tops/basic-tshirt.png',
    'pink-hoodie': '/assets/outfits/tops/sweater.png',
    'short-cardigan': '/assets/outfits/tops/croptop.png',
    'long-sheer-cardigan': '/assets/outfits/tops/sweater.png',
    'oversize-tshirt-white': '/assets/outfits/tops/oversize-tshirt.png',
    'croptop-ribbed': '/assets/outfits/tops/croptop.png',
    'cami-top-lace': '/assets/outfits/tops/camisole.png',
    'tank-top-ribbed': '/assets/outfits/tops/basic-tshirt.png',
    'blouse-chiffon': '/assets/outfits/tops/blouse.png',
    'white-oxford-shirt': '/assets/outfits/tops/shirt.png',
    'turtleneck-sweater': '/assets/outfits/tops/sweater.png',
    'polo-shirt-stripes': '/assets/outfits/tops/polo.png',
    'peplum-floral-top': '/assets/outfits/tops/blouse.png',
    'off-shoulder-top': '/assets/outfits/tops/croptop.png',
    'sweater-knit-oversize': '/assets/outfits/tops/sweater.png',
    'hoodie-fleece-pastel': '/assets/outfits/tops/sweater.png',
    'short-cardigan-crop': '/assets/outfits/tops/croptop.png',
    'long-cardigan-knit': '/assets/outfits/tops/sweater.png',
    'vintage-corset-top': '/assets/outfits/tops/croptop.png',
    'lace-romantic-top': '/assets/outfits/tops/blouse.png',

    # Bottoms missing image
    'kaki-white-shorts': '/assets/outfits/bottoms/denim-shorts.png',
    'linen-straight-pants': '/assets/outfits/bottoms/straight-jeans.png',
    'high-waist-legging': '/assets/outfits/bottoms/skinny-jeans.png',
    'breeze-linen-pants': '/assets/outfits/bottoms/culottes.png',
    'biker-leather-pants': '/assets/outfits/bottoms/skinny-jeans.png',
    'black-trousers-wide': '/assets/outfits/bottoms/trousers.png',
    'cargo-pants-khaki': '/assets/outfits/bottoms/cargo-pants.png',
    'culottes-linen-beige': '/assets/outfits/bottoms/culottes.png',
    'jogger-sweatpants-gray': '/assets/outfits/bottoms/jogger-pants.png',

    # Skirts missing image
    'mermaid-glam-skirt': '/assets/outfits/skirts/mermaid-skirt.png',
    'satin-silk-skirt': '/assets/outfits/skirts/satin-skirt.png',
    'lace-white-skirt': '/assets/outfits/skirts/lace-skirt.png',
    'cargo-pocket-skirt': '/assets/outfits/skirts/cargo-skirt.png',
}

def replace_product(match):
    block = match.group(0)
    id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_match:
        pid = id_match.group(1)
        if pid in ID_TO_IMAGE:
            img_path = ID_TO_IMAGE[pid]
            if 'image:' in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(id:\s*['\"][^'\"]+['\"],)", f"\\1 image: '{img_path}',", block)
    return block

pattern = r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}"
new_content = re.sub(pattern, replace_product, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done updating all images!')
