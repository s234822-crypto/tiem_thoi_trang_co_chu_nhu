import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

dresses_exact_map = {
    'french-tea-dress': ('floral_dress', '/assets/outfits/dresses/floral-dress.png'),
    'satin-evening-gown': ('satin_dress', '/assets/outfits/dresses/satin-dress.png'),
    'korean-minimal-shirtdress': ('shirt_dress', '/assets/outfits/dresses/shirt-dress.png'),
    'babydoll-dress': ('babydoll_dress', '/assets/outfits/dresses/babydoll-dress.png'),
    'maxi-boho-dress': ('maxi_dress', '/assets/outfits/dresses/maxi-dress.png'),
    'office-pencil-dress': ('office_dress', '/assets/outfits/dresses/office-dress.png'),
    'mini-party-dress': ('party_dress', '/assets/outfits/dresses/party-dress.png'),
    'floral-wrap-dress': ('floral_dress', '/assets/outfits/dresses/floral-dress.png'),
    'dresses-bodycon-dress': ('bodycon_dress', '/assets/outfits/dresses/bodycon-dress.png'),
    'dresses-midi-dress': ('midi_dress', '/assets/outfits/dresses/midi-dress.png'),
    'dresses-shirt-dress': ('shirt_dress', '/assets/outfits/dresses/shirt-dress.png'),
    'dresses-slip-dress': ('slip_dress', '/assets/outfits/dresses/slip-dress.png'),
    'dresses-off-shoulder-dress': ('off_shoulder_dress', '/assets/outfits/dresses/off-shoulder-dress.png'),
    'dresses-square-neck-dress': ('square_neck_dress', '/assets/outfits/dresses/square-neck-dress.png'),
    'dresses-lace-dress': ('lace_dress', '/assets/outfits/dresses/lace-dress.png'),
    'dresses-satin-dress': ('satin_dress', '/assets/outfits/dresses/satin-dress.png'),
    'dresses-sequin-dress': ('sequin_dress', '/assets/outfits/dresses/sequin-dress.png'),
    'dresses-vintage-dress': ('vintage_dress', '/assets/outfits/dresses/vintage-dress.png'),
    'dresses-korean-dress': ('korean_dress', '/assets/outfits/dresses/korean-dress.png'),
    'dresses-y2k-dress': ('y2k_dress', '/assets/outfits/dresses/y2k-dress.png'),
    'dresses-luxury-dress': ('luxury_dress', '/assets/outfits/dresses/luxury-dress.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in dresses_exact_map:
            sub_cat, img_path = dresses_exact_map[pid]
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]dresses['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]dresses['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/21 dresses products in {file_path}")
