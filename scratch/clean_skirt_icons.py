import os
from PIL import Image

skirt_dir = 'public/assets/outfits/skirts'
files = [f for f in os.listdir(skirt_dir) if f.endswith('.png')]

os.makedirs('scratch/clean_skirts', exist_ok=True)

for f in sorted(files):
    path = os.path.join(skirt_dir, f)
    img = Image.open(path).convert('RGBA')
    w, h = img.size
    pix = img.load()
    
    # Find row y where the label text begins
    # We look from bottom up (y = h-1 down to 0) to find the gap before the text
    # The text label is located at the bottom (y >= 148). Above it is a gap with very low/zero alpha count.
    
    # Calculate alpha count per row
    row_counts = [sum(1 for x in range(w) if pix[x, y][3] > 25) for y in range(h)]
    
    # Find the gap (row with minimum count between y=135 and y=155)
    gap_y = 146
    min_count = 9999
    for y in range(130, min(155, h)):
        if row_counts[y] <= min_count:
            min_count = row_counts[y]
            gap_y = y
            
    # Crop ONLY the skirt part (y from 0 to gap_y)
    skirt_crop = img.crop((0, 0, w, gap_y))
    
    # Autotrim transparent space around the skirt
    bbox = skirt_crop.getbbox()
    if bbox:
        trimmed_skirt = skirt_crop.crop(bbox)
    else:
        trimmed_skirt = skirt_crop
        
    tw, th = trimmed_skirt.size
    
    # Place in a clean 256x256 square canvas centered nicely
    canvas_size = 256
    padding = 24
    max_dim = canvas_size - (padding * 2)
    
    # Scale while maintaining aspect ratio
    scale = min(max_dim / tw, max_dim / th)
    nw = int(tw * scale)
    nh = int(th * scale)
    
    resized_skirt = trimmed_skirt.resize((nw, nh), Image.Resampling.LANCZOS)
    
    # Create final clean 256x256 transparent canvas
    final_img = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    pos_x = (canvas_size - nw) // 2
    pos_y = (canvas_size - nh) // 2
    final_img.paste(resized_skirt, (pos_x, pos_y), resized_skirt)
    
    # Save preview
    out_path = os.path.join('scratch/clean_skirts', f)
    final_img.save(out_path)
    
    print(f"Cleaned {f:20s}: original=({w}x{h}) -> gap_y={gap_y:3d} -> trimmed=({tw}x{th}) -> final=(256x256)")
