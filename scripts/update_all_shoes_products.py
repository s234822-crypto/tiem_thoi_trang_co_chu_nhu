import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

shoes_exact_map = {
    'mary-jane-shoes': ('mary_jane', '/assets/outfits/shoes/mary-jane-shoes.png'),
    'chunky-sneakers': ('chunky_sneakers', '/assets/outfits/shoes/chunky-sneakers.png'),
    'stiletto-pumps': ('pointed_heels', '/assets/outfits/shoes/pointed-heels.png'),
    'strappy-sandals': ('sandals', '/assets/outfits/shoes/sandals.png'),
    'ankle-boots': ('ankle_boots', '/assets/outfits/shoes/ankle-boots.png'),
    'loafer-shoes': ('loafers', '/assets/outfits/shoes/loafers.png'),
    'platform-sneaker': ('platform_sneakers', '/assets/outfits/shoes/platform-sneakers.png'),
    'kitten-heel': ('kitten_heels', '/assets/outfits/shoes/kitten-heels.png'),
    'shoes-white-sneakers': ('white_sneakers', '/assets/outfits/shoes/white-sneakers.png'),
    'shoes-chunky-sneakers': ('chunky_sneakers', '/assets/outfits/shoes/chunky-sneakers.png'),
    'shoes-platform-sneakers': ('platform_sneakers', '/assets/outfits/shoes/platform-sneakers.png'),
    'shoes-pointed-heels': ('pointed_heels', '/assets/outfits/shoes/pointed-heels.png'),
    'shoes-strap-heels': ('strap_heels', '/assets/outfits/shoes/strap-heels.png'),
    'shoes-kitten-heels': ('kitten_heels', '/assets/outfits/shoes/kitten-heels.png'),
    'shoes-sandals': ('sandals', '/assets/outfits/shoes/sandals.png'),
    'shoes-platform-sandals': ('platform_sandals', '/assets/outfits/shoes/platform-sandals.png'),
    'shoes-ankle-boots': ('ankle_boots', '/assets/outfits/shoes/ankle-boots.png'),
    'shoes-knee-high-boots': ('knee_high_boots', '/assets/outfits/shoes/knee-high-boots.png'),
    'shoes-chelsea-boots': ('chelsea_boots', '/assets/outfits/shoes/chelsea-boots.png'),
    'shoes-loafers': ('loafers', '/assets/outfits/shoes/loafers.png'),
    'shoes-ballet-flats': ('ballet_flats', '/assets/outfits/shoes/ballet-flats.png'),
    'shoes-mules': ('mules', '/assets/outfits/shoes/mules.png'),
    'shoes-oxford-shoes': ('oxford_shoes', '/assets/outfits/shoes/oxford-shoes.png'),
    'shoes-sport-shoes': ('sport_shoes', '/assets/outfits/shoes/sport-shoes.png'),
    'shoes-luxury-shoes': ('luxury_shoes', '/assets/outfits/shoes/luxury-shoes.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in shoes_exact_map:
            sub_cat, img_path = shoes_exact_map[pid]
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]shoes['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]shoes['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/25 shoes products in {file_path}")
