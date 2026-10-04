import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

from audit_whitelist import WHITELIST

ALL_VALID = set()
for cat, items in WHITELIST.items():
    for subcat, label in items:
        ALL_VALID.add(subcat)

with open('src/types/game.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

sub_m = re.search(r"export type SubCategory =([\s\S]+?);", ts_content)
ts_subcats = set(re.findall(r"'([^']+)'", sub_m.group(1))) if sub_m else set()

print(f"SubCategory type union in game.ts count: {len(ts_subcats)}")
print(f"Matches whitelist exactly? {ts_subcats == ALL_VALID}")

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    prod_content = f.read()

labels_m = re.search(r"export const SUBCATEGORY_LABELS:[^=]+=\s*\{([\s\S]+?)\};", prod_content)
label_keys = set(re.findall(r"^\s*([a-zA-Z0-9_]+):", labels_m.group(1), re.MULTILINE)) if labels_m else set()

print(f"SUBCATEGORY_LABELS count: {len(label_keys)}")
print(f"Matches whitelist exactly? {label_keys == ALL_VALID}")
if label_keys != ALL_VALID:
    print(f"Diff: {ALL_VALID ^ label_keys}")

pattern = r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}"
blocks = re.findall(pattern, prod_content, flags=re.DOTALL)

prod_subcats = set()
invalid_prod_subcats = set()

for block in blocks:
    sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", block)
    if sub_m:
        sc = sub_m.group(1)
        prod_subcats.add(sc)
        if sc not in ALL_VALID:
            invalid_prod_subcats.add(sc)

print(f"Total product items in products.ts: {len(blocks)}")
print(f"Total unique subCategories represented in products: {len(prod_subcats)}")
print(f"Invalid product subCategories: {invalid_prod_subcats}")
print(f"Missing whitelist subCategories: {ALL_VALID - prod_subcats}")

print("\nFinal breakdown by Category:")
for cat, items in WHITELIST.items():
    sub_count = len(items)
    prod_count = sum(1 for b in blocks if f"category: '{cat}'" in b or f'category: "{cat}"' in b)
    print(f"  {cat.upper()}: {sub_count} subCategories | {prod_count} products in catalog")
