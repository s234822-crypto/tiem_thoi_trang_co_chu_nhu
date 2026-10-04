import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

accessories_exact_map = {
    'french-beret-hat': ('beret', '/assets/outfits/accessories/beret.png'),
    'pearl-earrings': ('earrings', '/assets/outfits/accessories/earrings.png'),
    'cat-eye-sunglasses': ('sunglasses', '/assets/outfits/accessories/sunglasses.png'),
    'satin-ribbon-bow': ('hair_clip', '/assets/outfits/accessories/hair-clip.png'),
    'layered-necklace': ('necklace', '/assets/outfits/accessories/necklace.png'),
    'pearl-headband': ('headband', '/assets/outfits/accessories/headband.png'),
    'scrunchie-set': ('scrunchie', '/assets/outfits/accessories/scrunchie.png'),
    'gold-belt': ('belt', '/assets/outfits/accessories/belt.png'),
    'charm-bracelet': ('bracelet', '/assets/outfits/accessories/bracelet.png'),
    'oversized-glasses': ('sunglasses', '/assets/outfits/accessories/sunglasses.png'),
    'accessories-sunglasses': ('sunglasses', '/assets/outfits/accessories/sunglasses.png'),
    'accessories-round-glasses': ('round_glasses', '/assets/outfits/accessories/round-glasses.png'),
    'accessories-baseball-cap': ('baseball_cap', '/assets/outfits/accessories/baseball-cap.png'),
    'accessories-beret': ('beret', '/assets/outfits/accessories/beret.png'),
    'accessories-bucket-hat': ('bucket_hat', '/assets/outfits/accessories/bucket-hat.png'),
    'accessories-straw-hat': ('straw_hat', '/assets/outfits/accessories/straw-hat.png'),
    'accessories-ring': ('ring', '/assets/outfits/accessories/ring.png'),
    'accessories-hair-bow': ('hair_bow', '/assets/outfits/accessories/hair-bow.png'),
    'accessories-scrunchie': ('scrunchie', '/assets/outfits/accessories/scrunchie.png'),
    'accessories-headband': ('headband', '/assets/outfits/accessories/headband.png'),
    'accessories-scarf': ('scarf', '/assets/outfits/accessories/scarf.png'),
    'accessories-watch': ('watch', '/assets/outfits/accessories/watch.png'),
    'accessories-brooch': ('brooch', '/assets/outfits/accessories/brooch.png'),
    'accessories-pearl-necklace': ('pearl_necklace', '/assets/outfits/accessories/pearl-necklace.png'),
    'accessories-high-socks': ('high_socks', '/assets/outfits/accessories/high-socks.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in accessories_exact_map:
            sub_cat, img_path = accessories_exact_map[pid]
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]accessories['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]accessories['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/25 accessories products in {file_path}")
