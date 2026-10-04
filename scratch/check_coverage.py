import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# match id: 'xxx'
ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
print(f'Total product IDs found: {len(ids)}')

# Find all blocks `{ id: ... }`
pattern = r"\{\s*id:[^\}]+\}"
blocks = re.findall(pattern, content, flags=re.DOTALL)

with_img = 0
without_img = []

for block in blocks:
    id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", block)
    if id_m:
        pid = id_m.group(1)
        if 'image:' in block:
            with_img += 1
        else:
            without_img.append(pid)

print(f'Total products parsed: {len(blocks)}')
print(f'With image: {with_img}')
print(f'Without image count: {len(without_img)}')
if without_img:
    print('Without image list:', without_img)
