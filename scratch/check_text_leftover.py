import os
from PIL import Image

skirt_dir = 'public/assets/outfits/skirts'
files = sorted([f for f in os.listdir(skirt_dir) if f.endswith('.png')])

for f in files:
    path = os.path.join(skirt_dir, f)
    img = Image.open(path).convert('RGBA')
    w, h = img.size
    pix = img.load()
    
    # Check y range 135 to 155 to see exact skirt bottom vs label top
    print(f"=== {f} ===")
    for y in range(130, min(160, h)):
        # Count non-transparent pixels
        row_pix = [pix[x, y] for x in range(w) if pix[x, y][3] > 20]
        count = len(row_pix)
        if count > 0:
            # Check average color
            r_avg = sum(p[0] for p in row_pix) // count
            g_avg = sum(p[1] for p in row_pix) // count
            b_avg = sum(p[2] for p in row_pix) // count
            print(f"  y={y:3d} | count={count:3d} | avg_color=({r_avg},{g_avg},{b_avg})")
