import os
import sys
from PIL import Image

# UTF-8 stdout on Windows
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

SHEET_PATH = r'C:\Users\NITRO V\.gemini\antigravity-ide\brain\3e94a838-4831-4181-91d2-ab8bc58f24ec\media__1791101574849.jpg'
OUT_DIR = r'c:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\public\assets\outfits\tops'

os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SHEET_PATH).convert('RGBA')
w, h = img.size

# 5 rows x 4 columns
col_w = w / 4.0
row_h = h / 5.0

GRID_MAP = [
    # Row 0
    (0, 0, 'basic-tshirt.png', 'Áo thun basic'),
    (0, 1, 'oversized-tshirt.png', 'Áo thun oversize'),
    (0, 2, 'crop-top.png', 'Croptop'),
    (0, 3, 'camisole-top.png', 'Áo hai dây'),
    # Row 1
    (1, 0, 'tank-top.png', 'Áo tank top'),
    (1, 1, 'blouse.png', 'Áo blouse'),
    (1, 2, 'button-shirt.png', 'Áo sơ mi'),
    (1, 3, 'turtleneck-top.png', 'Áo cổ lọ'),
    # Row 2
    (2, 0, 'polo-shirt.png', 'Áo polo'),
    (2, 1, 'peplum-top.png', 'Áo peplum'),
    (2, 2, 'off-shoulder-top.png', 'Áo trễ vai'),
    (2, 3, 'knit-top.png', 'Áo len'),
    # Row 3
    (3, 0, 'sweater.png', 'Sweater'),
    (3, 1, 'hoodie.png', 'Hoodie'),
    (3, 2, 'cropped-cardigan.png', 'Cardigan ngắn'),
    (3, 3, 'long-cardigan.png', 'Cardigan dài'),
    # Row 4
    (4, 0, 'corset-top.png', 'Áo corset'),
    (4, 1, 'baby-tee.png', 'Áo baby tee'),
    (4, 2, 'babydoll-top.png', 'Áo babydoll'),
    (4, 3, 'lace-top.png', 'Áo kiểu ren'),
]

processed = []

for r, c, filename, title in GRID_MAP:
    left = int(c * col_w)
    top = int(r * row_h)
    right = int((c + 1) * col_w)
    bottom = int((r + 1) * row_h)
    
    cell_crop = img.crop((left, top, right, bottom))
    
    # Process black background (threshold < 28)
    datas = cell_crop.getdata()
    new_pixels = []
    
    for pixel in datas:
        r_val, g_val, b_val, a_val = pixel[0], pixel[1], pixel[2], pixel[3]
        if r_val < 28 and g_val < 28 and b_val < 28:
            new_pixels.append((0, 0, 0, 0))
        else:
            new_pixels.append((r_val, g_val, b_val, a_val))
            
    cell_crop.putdata(new_pixels)
    
    # Trim transparent padding
    bbox = cell_crop.getbbox()
    if bbox:
        cell_crop = cell_crop.crop(bbox)
        
    # Fit into 512x512 canvas with uniform padding
    canvas = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    target_max = 430
    
    cw, ch = cell_crop.size
    ratio = min(target_max / cw, target_max / ch)
    nw, nh = max(1, int(cw * ratio)), max(1, int(ch * ratio))
    
    resized = cell_crop.resize((nw, nh), Image.Resampling.LANCZOS)
    ox = (512 - nw) // 2
    oy = (512 - nh) // 2
    
    canvas.paste(resized, (ox, oy), resized)
    
    out_file = os.path.join(OUT_DIR, filename)
    canvas.save(out_file, 'PNG')
    processed.append((filename, title, out_file))
    print(f"Processed clean top icon [{len(processed)}/20]: {filename}")

print("All 20 clean top icons successfully processed and saved to public/assets/outfits/tops/")
