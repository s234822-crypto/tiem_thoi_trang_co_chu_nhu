import os
import re

mapping = {
    'a_line_skirt': '/assets/outfits/skirts/a-line-skirt.png',
    'aline_skirt': '/assets/outfits/skirts/a-line-skirt.png',
    'tennis_skirt': '/assets/outfits/skirts/tennis-skirt.png',
    'pleated_skirt': '/assets/outfits/skirts/pleated-skirt.png',
    'denim_skirt': '/assets/outfits/skirts/denim-skirt.png',
    'midi_skirt': '/assets/outfits/skirts/midi-skirt.png',
    'maxi_skirt': '/assets/outfits/skirts/maxi-skirt.png',
    'pencil_skirt': '/assets/outfits/skirts/pencil-skirt.png',
    'mermaid_skirt': '/assets/outfits/skirts/mermaid-skirt.png',
    'satin_skirt': '/assets/outfits/skirts/satin-skirt.png',
    'lace_skirt': '/assets/outfits/skirts/lace-skirt.png',
    'plaid_skirt': '/assets/outfits/skirts/plaid-skirt.png',
    'caro_skirt': '/assets/outfits/skirts/plaid-skirt.png',
    'cargo_skirt': '/assets/outfits/skirts/cargo-skirt.png',
    'mini_skirt': '/assets/outfits/skirts/mini-skirt.png',
    'tiered_skirt': '/assets/outfits/skirts/tiered-skirt.png',
    'vintage_skirt': '/assets/outfits/skirts/vintage-skirt.png',
    'long_skirt': '/assets/outfits/skirts/maxi-skirt.png',
}

file_path = 'src/data/products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
updated_count = 0
for line in lines:
    if 'category: \'skirts\'' in line or 'category: "skirts"' in line:
        for k, v in mapping.items():
            if f"subCategory: '{k}'" in line or f'subCategory: "{k}"' in line:
                if 'image:' in line:
                    line = re.sub(r"image:\s*'[^']+'", f"image: '{v}'", line)
                    line = re.sub(r'image:\s*"[^"]+"', f"image: '{v}'", line)
                else:
                    line = line.replace('description:', f"image: '{v}', description:")
                updated_count += 1
                break
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Successfully updated {updated_count} skirt products in products.ts")
