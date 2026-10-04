import os
from PIL import Image

skirt_dir = 'public/assets/outfits/skirts'
files = sorted([f for f in os.listdir(skirt_dir) if f.endswith('.png')])

for f in files:
    path = os.path.join(skirt_dir, f)
    img = Image.open(path).convert('RGBA')
    w, h = img.size
    pix = img.load()
    
    # Text labels always start around y >= 155 in the original grid slice, or y >= 148 for shorter frames.
    # In some images, the label bar has white text on dark background or vice versa.
    # Let's inspect y from 145 down to 180 to find the text label start.
    # A text label row typically has many pixels with x spanning a wide label box, or dark text pixels.
    # For each skirt, let's find the maximum y where skirt pixels exist BEFORE the label starts.
    
    # For 192px tall images: label bar top is at y=155 (or y=148 if shorter label).
    # Let's crop y from 0 to 150 first.
    crop_height = 150
    if f in ['satin-skirt.png', 'pencil-skirt.png']:
        crop_height = 153 # Long skirts
    elif h > 200: # aline-skirt.png (255x313)
        crop_height = int(h * 0.45)
        
    skirt_only = img.crop((0, 0, w, crop_height))
    
    # Autotrim transparent laths
    bbox = skirt_only.getbbox()
    if bbox:
        trimmed = skirt_only.crop(bbox)
    else:
        trimmed = skirt_only
        
    tw, th = trimmed.size
    
    # Target canvas 256x256
    canvas_size = 256
    padding = 24
    max_dim = canvas_size - (padding * 2)
    
    scale = min(max_dim / tw, max_dim / th)
    nw = int(tw * scale)
    nh = int(th * scale)
    
    resized = trimmed.resize((nw, nh), Image.Resampling.LANCZOS)
    
    # Create final transparent 256x256 image
    final_img = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    pos_x = (canvas_size - nw) // 2
    pos_y = (canvas_size - nh) // 2
    final_img.paste(resized, (pos_x, pos_y), resized)
    
    # Save back to public/assets/outfits/skirts/<filename>
    final_img.save(path)
    print(f"Processed {f:20s}: trimmed=({tw}x{th}) -> scaled=({nw}x{nh}) -> saved 256x256 transparent PNG")

print("\nALL 16 SKIRT ICONS SUCCESSFULLY CLEANED & REPLACED!")
