import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

jackets_exact_map = {
    'rose-blazer': ('blazer', '/assets/outfits/jackets/blazer.png'),
    'tweed-boucle-jacket': ('tweed_jacket', '/assets/outfits/jackets/tweed-jacket.png'),
    'leather-biker-jacket': ('leather_jacket', '/assets/outfits/jackets/leather-jacket.png'),
    'varsity-jacket': ('varsity_jacket', '/assets/outfits/jackets/varsity-jacket.png'),
    'jackets-denim-jacket': ('denim_jacket', '/assets/outfits/jackets/denim-jacket.png'),
    'jackets-leather-jacket': ('leather_jacket', '/assets/outfits/jackets/leather-jacket.png'),
    'jackets-bomber-jacket': ('bomber_jacket', '/assets/outfits/jackets/bomber-jacket.png'),
    'jackets-varsity-jacket': ('varsity_jacket', '/assets/outfits/jackets/varsity-jacket.png'),
    'jackets-trench-coat': ('trench_coat', '/assets/outfits/jackets/trench-coat.png'),
    'jackets-wool-coat': ('wool_coat', '/assets/outfits/jackets/wool-coat.png'),
    'jackets-fur-jacket': ('fur_jacket', '/assets/outfits/jackets/fur-jacket.png'),
    'jackets-outer-cardigan': ('outer_cardigan', '/assets/outfits/jackets/outer-cardigan.png'),
    'jackets-tweed-jacket': ('tweed_jacket', '/assets/outfits/jackets/tweed-jacket.png'),
    'jackets-cropped-jacket': ('cropped_jacket', '/assets/outfits/jackets/cropped-jacket.png'),
    'jackets-oversized-jacket': ('oversized_jacket', '/assets/outfits/jackets/oversized-jacket.png'),
    'jackets-windbreaker': ('windbreaker', '/assets/outfits/jackets/windbreaker.png'),
    'jackets-varsity-coat': ('varsity_coat', '/assets/outfits/jackets/varsity-coat.png'),
    'jackets-sporty-jacket': ('sporty_jacket', '/assets/outfits/jackets/sporty-jacket.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in jackets_exact_map:
            sub_cat, img_path = jackets_exact_map[pid]
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]jackets['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]jackets['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/18 jackets products in {file_path}")
