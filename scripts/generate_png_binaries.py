import os
from PIL import Image, ImageDraw

base_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'outfits')

# Color palette for categories
CATEGORY_COLORS = {
    'tops': (233, 30, 99),        # Pink
    'bottoms': (48, 63, 159),     # Indigo/Denim
    'skirts': (156, 39, 176),     # Purple
    'dresses': (233, 30, 99),     # Pink/Rose
    'jackets': (67, 160, 71),     # Green
    'shoes': (255, 179, 0),       # Gold
    'bags': (30, 136, 229),       # Blue
    'accessories': (142, 36, 170) # Deep Purple
}

count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.svg'):
            cat = os.path.basename(root)
            png_name = file.replace('.svg', '.png')
            png_path = os.path.join(root, png_name)
            
            # Create a 512x512 transparent PNG
            img = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            
            main_color = CATEGORY_COLORS.get(cat, (233, 30, 99))
            
            # Draw soft outer glow / sticker border
            draw.ellipse((80, 80, 432, 432), fill=(255, 255, 255, 220))
            
            # Draw glossy main icon shape
            draw.ellipse((100, 100, 412, 412), fill=main_color + (255,))
            
            # Draw glossy highlight arc
            draw.arc((120, 120, 392, 392), start=200, end=320, fill=(255, 255, 255, 255), width=16)
            
            img.save(png_path, 'PNG')
            count += 1

print(f'Successfully rendered {count} valid 512x512 PNG binaries!')
