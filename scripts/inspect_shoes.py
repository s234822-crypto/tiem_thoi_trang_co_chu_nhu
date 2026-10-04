import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

items = []
chunks = text.split('{')
for chunk in chunks:
    if 'category:' in chunk and ('"shoes"' in chunk or "'shoes'" in chunk):
        id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", chunk)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", chunk)
        sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", chunk)
        img_m = re.search(r"image:\s*['\"]([^'\"]+)['\"]", chunk)
        if id_m and name_m:
            items.append({
                'id': id_m.group(1),
                'name': name_m.group(1),
                'subCategory': sub_m.group(1) if sub_m else 'N/A',
                'image': img_m.group(1) if img_m else 'N/A'
            })

print(f"Total shoes items found: {len(items)}")
for item in items:
    print(f"  {item['id']} | {item['name']} | subCategory: {item['subCategory']} | image: {item['image']}")
