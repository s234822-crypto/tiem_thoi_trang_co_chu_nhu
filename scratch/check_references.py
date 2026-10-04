import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    prod_content = f.read()

prod_ids = set(re.findall(r"id:\s*['\"]([^'\"]+)['\"]", prod_content))
print(f'Total product IDs in products.ts: {len(prod_ids)}')

with open('src/data/collections.ts', 'r', encoding='utf-8') as f:
    col_content = f.read()

col_prod_ids = set(re.findall(r"['\"]([a-zA-Z0-9\-_]+)['\"]", col_content))
# Filter out collection IDs, theme keys, skin keys, etc.
missing_in_prod = []
for pid in col_prod_ids:
    if pid.startswith('col-') or pid.startswith('skin-') or pid in ['money', 'skin', 'Casual & Minimal', 'Cute & Feminine', 'Korean Style', 'Office & Elegant', 'Streetwear & Y2K', 'Party & Glamour', 'Summer Breeze']:
        continue
    if pid not in prod_ids:
        missing_in_prod.append(pid)

print(f'Collection product IDs missing in products.ts: {missing_in_prod}')
