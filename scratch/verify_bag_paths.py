import os, sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\src\data\products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

images = set(re.findall(r"/assets/outfits/bags/[a-zA-Z0-9_-]+\.png", text))
public_dir = r'c:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\public'

print(f'Found {len(images)} unique bag image references in products.ts:')
missing = 0
for img_ref in sorted(images):
    rel_path = img_ref.lstrip('/')
    full_path = os.path.join(public_dir, rel_path)
    exists = os.path.exists(full_path)
    if not exists:
        missing += 1
    print(f'  {img_ref:45s} -> {"OK" if exists else "MISSING!"}')

if missing == 0:
    print('\nALL BAG IMAGE REFERENCES ARE VALID AND PRESENT ON DISK!')
else:
    print(f'\nWARNING: {missing} missing image files!')
