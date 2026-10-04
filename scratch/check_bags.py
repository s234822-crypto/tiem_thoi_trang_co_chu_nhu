import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\src\data\products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

products = []
for p_str in re.split(r'\n\s*\{\s*id:\s*\'', text)[1:]:
    p_str = "{ id: '" + p_str.split('}')[0] + '}'
    m_id = re.search(r"id:\s*'([^']+)'", p_str)
    m_name = re.search(r"name:\s*'([^']+)'", p_str)
    m_cat = re.search(r"category:\s*'([^']+)'", p_str)
    m_subcat = re.search(r"subCategory:\s*'([^']+)'", p_str)
    m_img = re.search(r"image:\s*'([^']+)'", p_str)
    
    if m_cat and m_cat.group(1) == 'bags':
        products.append({
            'id': m_id.group(1) if m_id else '',
            'name': m_name.group(1) if m_name else '',
            'subCategory': m_subcat.group(1) if m_subcat else '',
            'image': m_img.group(1) if m_img else '',
            'p_str': p_str
        })

print(f'Total bags: {len(products)}')
for i, p in enumerate(products):
    print(f"{i+1:2d}. ID: {p['id']:26s} | SubCat: {p['subCategory']:16s} | Image: {p['image']:35s} | Name: {p['name']}")
