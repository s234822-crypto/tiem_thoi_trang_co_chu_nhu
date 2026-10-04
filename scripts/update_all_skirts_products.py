import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

skirts_exact_map = {
    'pink-aline-skirt': ('a_line_skirt', '/assets/outfits/skirts/a-line-skirt.png'),
    'tennis-white-skirt': ('tennis_skirt', '/assets/outfits/skirts/tennis-skirt.png'),
    'purple-pleated-skirt': ('pleated_skirt', '/assets/outfits/skirts/pleated-skirt.png'),
    'denim-mini-skirt': ('denim_skirt', '/assets/outfits/skirts/denim-skirt.png'),
    'yellow-midi-skirt': ('midi_skirt', '/assets/outfits/skirts/midi-skirt.png'),
    'mint-maxi-skirt': ('maxi_skirt', '/assets/outfits/skirts/maxi-skirt.png'),
    'red-pencil-skirt': ('pencil_skirt', '/assets/outfits/skirts/pencil-skirt.png'),
    'mermaid-glam-skirt': ('mermaid_skirt', '/assets/outfits/skirts/mermaid-skirt.png'),
    'satin-silk-skirt': ('satin_skirt', '/assets/outfits/skirts/satin-skirt.png'),
    'lace-white-skirt': ('lace_skirt', '/assets/outfits/skirts/lace-skirt.png'),
    'caro-plaid-skirt': ('plaid_skirt', '/assets/outfits/skirts/plaid-skirt.png'),
    'cargo-pocket-skirt': ('cargo_skirt', '/assets/outfits/skirts/cargo-skirt.png'),
    'cute-mini-skirt': ('mini_skirt', '/assets/outfits/skirts/mini-skirt.png'),
    'purple-tiered-skirt': ('tiered_skirt', '/assets/outfits/skirts/tiered-skirt.png'),
    'vintage-floral-skirt': ('vintage_skirt', '/assets/outfits/skirts/vintage-skirt.png'),
}

updated_count = 0

def replace_product(match):
    global updated_count
    block = match.group(0)
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if pid in skirts_exact_map:
            sub_cat, img_path = skirts_exact_map[pid]
            block = re.sub(r"subCategory:\s*['\"]([^'\"]+)['\"]", f"subCategory: '{sub_cat}'", block)
            if "image:" in block:
                block = re.sub(r"image:\s*['\"]([^'\"]+)['\"]", f"image: '{img_path}'", block)
            else:
                block = re.sub(r"(category:\s*['\"]skirts['\"])", f"\\1,\n    image: '{img_path}'", block)
            updated_count += 1
            print(f"Updated {pid} -> subCategory: {sub_cat}, image: {img_path}")
    return block

new_content = re.sub(r"\{\s*id:\s*['\"][^'\"]+['\"][\s\S]*?category:\s*['\"]skirts['\"][\s\S]*?\}", replace_product, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! Updated {updated_count}/15 skirts products in {file_path}")
