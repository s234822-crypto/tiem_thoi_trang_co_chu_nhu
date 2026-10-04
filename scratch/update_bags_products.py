import re, sys
sys.stdout.reconfigure(encoding='utf-8')

filepath = r'c:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\src\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace products section or specific bag items
# 1. Update baguette-shoulder-bag subCategory to baguette_bag and image to /assets/outfits/bags/baguette-bag.png
content = content.replace(
    "{ id: 'baguette-shoulder-bag', name: 'Túi Kẹp Nách Baguette Y2K', category: 'bags', subCategory: 'mini_bag',\n    image: '/assets/outfits/bags/mini-bag.png',",
    "{ id: 'baguette-shoulder-bag', name: 'Túi Kẹp Nách Baguette Y2K', category: 'bags', subCategory: 'baguette_bag',\n    image: '/assets/outfits/bags/baguette-bag.png',"
)

# 2. Update bags-leather-bag to saddle_bag
content = content.replace(
    "{ id: 'bags-leather-bag', name: 'Túi Da Thật Đeo Chéo', category: 'bags', subCategory: 'leather_bag',\n    image: '/assets/outfits/bags/leather-bag.png',",
    "{ id: 'bags-leather-bag', name: 'Túi Saddle Bán Nguyệt Da', category: 'bags', subCategory: 'saddle_bag',\n    image: '/assets/outfits/bags/saddle-bag.png',"
)

# 3. Ensure bags-pearl-bag has heart-bag and chain-shoulder-bag following it
pearl_block = """  { id: 'bags-pearl-bag', name: 'Túi Đính Ngọc Trai Tiệc', category: 'bags', subCategory: 'pearl_bag',
    image: '/assets/outfits/bags/pearl-bag.png',
    styleTags: ['luxury', 'feminine'], colors: ['white'],
    occasions: ['party', 'formal'], cost: 1100000, price: 2400000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Đính ngọc trai thủ công.', accentColor: '#D87C9B' },"""

new_pearl_and_more = """  { id: 'bags-pearl-bag', name: 'Túi Đính Ngọc Trai Tiệc', category: 'bags', subCategory: 'pearl_bag',
    image: '/assets/outfits/bags/pearl-bag.png',
    styleTags: ['luxury', 'feminine'], colors: ['white'],
    occasions: ['party', 'formal'], cost: 1100000, price: 2400000,
    stock: 5, maxStock: 10, unlockLevel: 5, rarity: 'luxury',
    description: 'Đính ngọc trai thủ công.', accentColor: '#D87C9B' },

  { id: 'bags-heart-bag', name: 'Túi Trái Tim Nổi Bật', category: 'bags', subCategory: 'heart_bag',
    image: '/assets/outfits/bags/heart-bag.png',
    styleTags: ['cute', 'party', 'feminine'], colors: ['red', 'gold'],
    occasions: ['date', 'party'], cost: 750000, price: 1650000,
    stock: 5, maxStock: 10, unlockLevel: 4, rarity: 'rare',
    description: 'Dáng trái tim đỏ nổi bật phối móc khóa trái tim vàng xinh xắn.', accentColor: '#EF5350' },

  { id: 'bags-chain-shoulder-bag', name: 'Túi Dây Xích Sang Trọng', category: 'bags', subCategory: 'chain_shoulder_bag',
    image: '/assets/outfits/bags/chain-shoulder-bag.png',
    styleTags: ['luxury', 'chic', 'elegant'], colors: ['black', 'gold'],
    occasions: ['party', 'formal', 'date'], cost: 1050000, price: 2300000,
    stock: 4, maxStock: 10, unlockLevel: 6, rarity: 'luxury',
    description: 'Dáng kẹp nách sang trọng với quai dây xích mạ vàng kiêu sa.', accentColor: '#FFD54F' },"""

if 'bags-heart-bag' not in content:
    content = content.replace(pearl_block, new_pearl_and_more)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated products.ts with all bag mappings!')
