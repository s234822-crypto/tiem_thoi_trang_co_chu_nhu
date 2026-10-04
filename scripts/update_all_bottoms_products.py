import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

bottoms_exact_map = {
    'blue-skinny-jeans': ('skinny_jeans', '/assets/outfits/bottoms/skinny-jeans.png'),
    'straight-denim-jeans': ('straight_jeans', '/assets/outfits/bottoms/straight-jeans.png'),
    'wide-light-jeans': ('wide_leg_jeans', '/assets/outfits/bottoms/wide-leg-jeans.png'),
    'y2k-baggy-jeans': ('baggy_jeans', '/assets/outfits/bottoms/baggy-jeans.png'),
    'cuff-denim-shorts': ('denim_shorts', '/assets/outfits/bottoms/denim-shorts.png'),
    'kaki-white-shorts': ('khaki_shorts', '/assets/outfits/bottoms/khaki-shorts.png'),
    'tailored-beige-trousers': ('tailored_trousers', '/assets/outfits/bottoms/tailored-trousers.png'),
    'linen-straight-pants': ('straight_trousers', '/assets/outfits/bottoms/straight-trousers.png'),
    'pink-wide-pants': ('wide_leg_trousers', '/assets/outfits/bottoms/wide-leg-trousers.png'),
    'olive-cargo-pants': ('cargo_pants', '/assets/outfits/bottoms/cargo-pants.png'),
    'black-sport-jogger': ('jogger_pants', '/assets/outfits/bottoms/jogger-pants.png'),
    'high-waist-legging': ('leggings', '/assets/outfits/bottoms/leggings.png'),
    'pink-flared-culottes': ('culottes', '/assets/outfits/bottoms/culottes.png'),
    'breeze-linen-pants': ('linen_pants', '/assets/outfits/bottoms/linen-pants.png'),
    'high-waist-trousers': ('high_waist_pants', '/assets/outfits/bottoms/high-waist-pants.png'),
    'y2k-flare-pants': ('y2k_pants', '/assets/outfits/bottoms/y2k-pants.png'),
    'sporty-track-pants': ('sporty_pants', '/assets/outfits/bottoms/sporty-pants.png'),
    'biker-leather-pants': ('leather_pants', '/assets/outfits/bottoms/leather-pants.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in bottoms_exact_map:
            sub_cat, img_path = bottoms_exact_map[pid]
            # Replace subCategory if needed
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            # Replace or add image field
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]bottoms['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

# Replace within product objects
new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]bottoms['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/18 bottoms products in {file_path}")
