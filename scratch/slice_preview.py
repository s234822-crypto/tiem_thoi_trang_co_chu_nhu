from PIL import Image
import os

img = Image.open(r'C:\Users\NITRO V\.gemini\antigravity-ide\brain\3e94a838-4831-4181-91d2-ab8bc58f24ec\media__1791047353353.jpg')
w, h = img.size

# Let's crop Row 1 (Dresses), Row 2 (Jackets), Row 3 (Shoes), Row 4 (Bags), Row 5 (Accessories Row 1), Row 6 (Accessories Row 2)
rows = [
    ('row1_dresses', 50, 180),
    ('row2_jackets', 190, 305),
    ('row3_shoes', 315, 410),
    ('row4_bags', 430, 530),
    ('row5_acc1', 545, 635),
    ('row6_acc2', 635, 740),
]

out_dir = r'scratch\previews'
os.makedirs(out_dir, exist_ok=True)

for name, y1, y2 in rows:
    crop_img = img.crop((0, y1, w, y2))
    crop_img.save(os.path.join(out_dir, f'{name}.png'))
    print(f'Saved {name}.png ({crop_img.size})')
