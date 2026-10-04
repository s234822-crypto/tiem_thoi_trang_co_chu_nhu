import re

from audit_whitelist import WHITELIST

# Flatten all valid subCategories into a set
ALL_VALID_SUBCATS = set()
SUBCAT_TO_CAT = {}
SUBCAT_TO_LABEL = {}

for cat, items in WHITELIST.items():
    for subcat, label in items:
        ALL_VALID_SUBCATS.add(subcat)
        SUBCAT_TO_CAT[subcat] = cat
        SUBCAT_TO_LABEL[subcat] = label

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse all products
pattern = r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}"
blocks = re.findall(pattern, content, flags=re.DOTALL)

products = []
subcats_found = set()
invalid_subcats = set()

for block in blocks:
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", block)
    cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", block)
    name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
    
    pid = id_m.group(1) if id_m else ''
    subcat = sub_m.group(1) if sub_m else ''
    cat = cat_m.group(1) if cat_m else ''
    name = name_m.group(1) if name_m else ''
    
    products.append({'id': pid, 'subCategory': subcat, 'category': cat, 'name': name, 'block': block})
    if subcat:
        subcats_found.add(subcat)
        if subcat not in ALL_VALID_SUBCATS:
            invalid_subcats.add(subcat)

print(f'Total products parsed: {len(products)}')
print(f'Total subCategories found: {len(subcats_found)}')
print(f'Invalid subCategories found ({len(invalid_subcats)}): {invalid_subcats}')

missing_whitelist = ALL_VALID_SUBCATS - subcats_found
print(f'Whitelist subCategories missing from products ({len(missing_whitelist)}): {missing_whitelist}')
