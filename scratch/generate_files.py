import re
import json
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

from audit_whitelist import WHITELIST

# 1. Update src/types/game.ts
with open('src/types/game.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

subcat_lines = []
for cat, items in WHITELIST.items():
    subcat_lines.append(f"  // {cat.upper()} ({len(items)})")
    keys = [f"'{subcat}'" for subcat, _ in items]
    subcat_lines.append("  | " + " | ".join(keys))

new_subcat_type = "export type SubCategory =\n" + "\n".join(subcat_lines) + ";"

ts_content_updated = re.sub(
    r"export type SubCategory =[\s\S]+?;",
    new_subcat_type,
    ts_content
)

with open('src/types/game.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content_updated)

print('Updated src/types/game.ts with 141 SubCategories!')

# 2. Build SUBCATEGORY_LABELS for src/data/products.ts
label_lines = []
label_lines.append("export const SUBCATEGORY_LABELS: Record<SubCategory, string> = {")
for cat, items in WHITELIST.items():
    label_lines.append(f"  // {cat.upper()}")
    for subcat, label in items:
        label_lines.append(f"  {subcat}: '{label}',")
label_lines.append("};")
new_labels_block = "\n".join(label_lines)

# 3. Read products.ts and update SUBCATEGORY_LABELS & products array
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    prod_content = f.read()

prod_content_updated = re.sub(
    r"export const SUBCATEGORY_LABELS: Record<SubCategory, string> = \{[\s\S]+?\};",
    new_labels_block,
    prod_content
)

with open('scratch/subcat_asset_map.json', 'r', encoding='utf-8') as f:
    ASSET_MAP = json.load(f)

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

ALL_VALID = {}
for cat, items in WHITELIST.items():
    for subcat, label in items:
        ALL_VALID[subcat] = (cat, label)

# Add missing sweatshirt item if needed
missing_item = """  { id: 'sweatshirt-oversize-graphic', image: '/assets/outfits/tops/sweater.png', name: 'Sweater Nỉ Oversize Graphic', category: 'tops', subCategory: 'sweatshirt',
    styleTags: ['streetwear', 'y2k', 'casual'], colors: ['gray', 'black', 'white'],
    occasions: ['school', 'street', 'coffee'], cost: 145000, price: 310000,
    stock: 5, maxStock: 10, unlockLevel: 2, rarity: 'uncommon',
    description: 'Áo sweater vải nỉ ngoại dầy dặn, in hình graphic Y2K năng động cá tính.',
    accentColor: '#90A4AE', visualEmoji: '🧥' },"""

def clean_product_block(match):
    block = match.group(0)
    sub_m = re.search(r"subCategory:\s*['\"]([^'\"]+)['\"]", block)
    if not sub_m:
        return block
    raw_subcat = sub_m.group(1)
    subcat = MAP_LEGACY_SUBCAT.get(raw_subcat, raw_subcat)
    if subcat not in ALL_VALID:
        return block
    cat, _ = ALL_VALID[subcat]
    block = re.sub(r"category:\s*['\"][^'\"]+['\"]", f"category: '{cat}'", block)
    block = re.sub(r"subCategory:\s*['\"][^'\"]+['\"]", f"subCategory: '{subcat}'", block)
    img_path = ASSET_MAP.get(subcat, f'/assets/outfits/{cat}/basic.png')
    if 'image:' in block:
        block = re.sub(r"image:\s*['\"][^'\"]+['\"]", f"image: '{img_path}'", block)
    else:
        block = re.sub(r"(id:\s*['\"][^'\"]+['\"],)", f"\\1 image: '{img_path}',", block)
    return block

pattern = r"\{\s*id:\s*['\"][^'\"]+['\"].*?\}"
prod_content_updated = re.sub(pattern, clean_product_block, prod_content_updated, flags=re.DOTALL)

# Insert missing item if 'sweatshirt-oversize-graphic' not in prod_content_updated
if 'sweatshirt-oversize-graphic' not in prod_content_updated:
    prod_content_updated = prod_content_updated.replace(
        "export const INITIAL_PRODUCTS: Product[] = [",
        "export const INITIAL_PRODUCTS: Product[] = [\n" + missing_item
    )

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(prod_content_updated)

print('Updated src/data/products.ts successfully!')
