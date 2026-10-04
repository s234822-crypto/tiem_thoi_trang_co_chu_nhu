import os
from PIL import Image

skirt_dir = 'public/assets/outfits/skirts'
files = [f for f in os.listdir(skirt_dir) if f.endswith('.png')]

for f in sorted(files):
    path = os.path.join(skirt_dir, f)
    img = Image.open(path).convert('RGBA')
    w, h = img.size
    
    # Bounding box of non-transparent pixels
    bbox = img.getbbox()
    
    # Check bottom 35% of the image for text/label pixels
    # Labels usually have white/light text or solid background bar at the bottom
    bottom_crop_y = int(h * 0.65)
    
    print(f"File: {f:20s} | Size: ({w}, {h}) | Non-transparent bbox: {bbox}")
