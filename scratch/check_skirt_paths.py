import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}"
blocks = re.findall(pattern, content, flags=re.DOTALL)

print("Skirt products in products.ts:")
for b in blocks:
    if "category: 'skirts'" in b or 'category: "skirts"' in b:
        id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", b)
        sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", b)
        img_m = re.search(r"image:\s*['\"]([^'\"]+)['\"]", b)
        pid = id_m.group(1) if id_m else ''
        sub = sub_m.group(1) if sub_m else ''
        img = img_m.group(1) if img_m else ''
        print(f"  ID: {pid:25s} | subCategory: {sub:20s} | image: {img}")
