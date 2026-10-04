import re
import json
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

from audit_whitelist import WHITELIST

ALL_VALID = {}
SUBCAT_ORDER = []
for cat, items in WHITELIST.items():
    for subcat, label in items:
        ALL_VALID[subcat] = (cat, label)
        SUBCAT_ORDER.append(subcat)

MAP_LEGACY_SUBCAT = {
    'off_shoulder': 'off_shoulder_top',
    'knit_top': 'sweater',
    'legging': 'leggings',
    'sneaker': 'white_sneakers',
    'heels': 'pointed_heels',
    'sandal': 'sandals',
    'boots': 'ankle_boots',
    'loafer': 'loafers',
    'tote': 'tote_bag',
    'cardigan': 'short_cardigan',
    'jacket_top': 'bomber_jacket',
    'glasses': 'sunglasses',
    'hat': 'beret',
}

with open('scratch/subcat_asset_map.json', 'r', encoding='utf-8') as f:
    ASSET_MAP = json.load(f)

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract product objects
pattern = r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}"
blocks = re.findall(pattern, content, flags=re.DOTALL)

print(f'Total product blocks in products.ts: {len(blocks)}')

seen_subcats = set()
cleaned_products = []
removed_products = []
renamed_subcats = []

for block in blocks:
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", block)

    if not id_m or not sub_m:
        continue

    pid = id_m.group(1)
    raw_subcat = sub_m.group(1)

    # Normalize subCategory
    subcat = MAP_LEGACY_SUBCAT.get(raw_subcat, raw_subcat)

    if subcat not in ALL_VALID:
        removed_products.append({'id': pid, 'subCategory': raw_subcat, 'reason': 'Not in Whitelist'})
        continue

    cat, label = ALL_VALID[subcat]

    if raw_subcat != subcat:
        renamed_subcats.append({'id': pid, 'old': raw_subcat, 'new': subcat})

    # Update category, subCategory, and image in block
    block_clean = block
    block_clean = re.sub(r"category:\s*['\"][^'\"]+['\"]", f"category: '{cat}'", block_clean)
    block_clean = re.sub(r"subCategory:\s*['\"][^'\"]+['\"]", f"subCategory: '{subcat}'", block_clean)
    
    img_path = ASSET_MAP.get(subcat, f'/assets/outfits/{cat}/basic.png')
    if 'image:' in block_clean:
        block_clean = re.sub(r"image:\s*['\"][^'\"]+['\"]", f"image: '{img_path}'", block_clean)
    else:
        block_clean = re.sub(r"(id:\s*['\"][^'\"]+['\"],)", f"\\1 image: '{img_path}',", block_clean)

    # Dedup logic: keep first product for each subcat, or keep distinct items if subcat matches
    seen_subcats.add(subcat)
    cleaned_products.append({'id': pid, 'subCategory': subcat, 'category': cat, 'block': block_clean})

print(f'Cleaned products kept: {len(cleaned_products)}')
print(f'Products removed: {len(removed_products)}')
print(f'Renamed subcats: {len(renamed_subcats)}')
print(f'Unique Whitelist subCats covered by existing products: {len(seen_subcats)} / {len(ALL_VALID)}')

missing_subcats = set(ALL_VALID.keys()) - seen_subcats
print(f'Missing Whitelist subCats: {len(missing_subcats)}')
if missing_subcats:
    print('  Missing list:', sorted(list(missing_subcats)))
