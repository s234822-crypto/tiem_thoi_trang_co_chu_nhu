import re, os, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from collections import Counter

base_public = r'C:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\public'
products_file = r'C:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\src\data\products.ts'

with open(products_file, encoding='utf-8') as f:
    content = f.read()

paths = re.findall(r"image: '(/assets/outfits/[^']+)'", content)
print(f'Total image paths found: {len(paths)}')

missing = []
found = []
for p in paths:
    full = os.path.join(base_public, p.lstrip('/').replace('/', os.sep))
    if os.path.exists(full):
        found.append(p)
    else:
        missing.append(p)

print(f'OK: {len(found)}')
print(f'MISSING: {len(missing)}')
for m in missing:
    print(f'  404: {m}')

counter = Counter(paths)
dupes = {k: v for k, v in counter.items() if v > 1}
print(f'\nShared icons (multiple items using same icon): {len(dupes)}')
for icon, count in sorted(dupes.items(), key=lambda x: -x[1]):
    print(f'  x{count}: {icon}')
