import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

tops_exact_map = {
    'sweatshirt-oversize-graphic': ('sweater', '/assets/outfits/tops/sweater.png'),
    'basic-red-tshirt': ('basic_tshirt', '/assets/outfits/tops/basic-tshirt.png'),
    'oversize-white-tee': ('oversized_tshirt', '/assets/outfits/tops/oversized-tshirt.png'),
    'pink-crop-top': ('crop_top', '/assets/outfits/tops/crop-top.png'),
    'yellow-camisole': ('camisole_top', '/assets/outfits/tops/camisole-top.png'),
    'sport-tank-top': ('tank_top', '/assets/outfits/tops/tank-top.png'),
    'cream-puffed-blouse': ('blouse', '/assets/outfits/tops/blouse.png'),
    'blue-casual-shirt': ('button_shirt', '/assets/outfits/tops/button-shirt.png'),
    'warm-turtleneck': ('turtleneck_top', '/assets/outfits/tops/turtleneck-top.png'),
    'green-sporty-polo': ('polo_shirt', '/assets/outfits/tops/polo-shirt.png'),
    'chic-peplum-top': ('peplum_top', '/assets/outfits/tops/peplum-top.png'),
    'off-shoulder-lace': ('off_shoulder_top', '/assets/outfits/tops/off-shoulder-top.png'),
    'ribbed-knit-top': ('knit_top', '/assets/outfits/tops/knit-top.png'),
    'purple-cozy-sweater': ('sweater', '/assets/outfits/tops/sweater.png'),
    'pink-hoodie': ('hoodie', '/assets/outfits/tops/hoodie.png'),
    'short-cardigan': ('cropped_cardigan', '/assets/outfits/tops/cropped-cardigan.png'),
    'long-sheer-cardigan': ('long_cardigan', '/assets/outfits/tops/long-cardigan.png'),
    'vintage-corset-top': ('corset_top', '/assets/outfits/tops/corset-top.png'),
    'sweet-baby-tee': ('baby_tee', '/assets/outfits/tops/baby-tee.png'),
    'babydoll-peplum-top': ('babydoll_top', '/assets/outfits/tops/babydoll-top.png'),
    'lace-romantic-top': ('lace_top', '/assets/outfits/tops/lace-top.png'),
    'pastel-cardigan': ('long_cardigan', '/assets/outfits/tops/long-cardigan.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in tops_exact_map:
            sub_cat, img_path = tops_exact_map[pid]
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]tops['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]tops['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/22 tops products in {file_path}")
