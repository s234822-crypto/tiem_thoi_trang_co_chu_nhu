import os
import sys
from audit_whitelist import WHITELIST

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Gather all png files in public/assets/outfits
assets = {}
for root, dirs, files in os.walk('public/assets/outfits'):
    for f in files:
        if f.endswith('.png'):
            rel_path = os.path.relpath(os.path.join(root, f), 'public').replace('\\', '/')
            parts = rel_path.split('/')
            cat = parts[2] if len(parts) > 2 else 'other'
            fn = f[:-4] # filename without .png
            if cat not in assets:
                assets[cat] = {}
            assets[cat][fn] = '/' + rel_path

print('PNG Assets found per folder:')
for cat, files in assets.items():
    print(f'  {cat}: {len(files)} pngs')

ASSET_MAP = {}

for cat, subcats in WHITELIST.items():
    cat_assets = assets.get(cat, {})
    for subcat, label in subcats:
        matched = None
        # Exact match
        for afn, apath in cat_assets.items():
            norm_afn = afn.replace('-', '_')
            if norm_afn == subcat:
                matched = apath
                break
        
        if not matched:
            # Partial match
            for afn, apath in cat_assets.items():
                norm_afn = afn.replace('-', '_')
                if norm_afn in subcat or subcat in norm_afn:
                    matched = apath
                    break
        
        if not matched:
            # Fallback mappings for specific subCategories
            if cat == 'tops':
                matched = '/assets/outfits/tops/basic-tshirt.png'
            elif cat == 'bottoms':
                matched = '/assets/outfits/bottoms/straight-jeans.png'
            elif cat == 'skirts':
                matched = '/assets/outfits/skirts/aline-skirt.png'
            elif cat == 'dresses':
                matched = '/assets/outfits/dresses/floral-dress.png'
            elif cat == 'jackets':
                matched = '/assets/outfits/jackets/blazer.png'
            elif cat == 'shoes':
                matched = '/assets/outfits/shoes/white-sneakers.png'
            elif cat == 'bags':
                matched = '/assets/outfits/bags/tote-bag.png'
            elif cat == 'accessories':
                matched = '/assets/outfits/accessories/sunglasses.png'

        ASSET_MAP[subcat] = matched

print(f'\nTotal SubCategories mapped to asset images: {len(ASSET_MAP)}')
with open('scratch/subcat_asset_map.json', 'w', encoding='utf-8') as f:
    import json
    json.dump(ASSET_MAP, f, indent=2, ensure_ascii=False)
print('Saved scratch/subcat_asset_map.json')
