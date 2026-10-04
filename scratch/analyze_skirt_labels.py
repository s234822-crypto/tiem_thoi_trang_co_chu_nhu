import os
from PIL import Image

skirt_dir = 'public/assets/outfits/skirts'
files = [f for f in os.listdir(skirt_dir) if f.endswith('.png')]

for f in sorted(files):
    path = os.path.join(skirt_dir, f)
    img = Image.open(path).convert('RGBA')
    w, h = img.size
    pix = img.load()
    
    print(f"\n==================== File: {f} (size {w}x{h}) ====================")
    row_counts = []
    for y in range(h):
        cnt = sum(1 for x in range(w) if pix[x, y][3] > 20)
        row_counts.append((y, cnt))
    
    # Print bottom half rows (from h*0.5 to h)
    for y, cnt in row_counts[int(h*0.55):]:
        if cnt > 0:
            bar = "#" * (cnt // 4)
            print(f"  y={y:3d} | count={cnt:3d} | {bar}")
