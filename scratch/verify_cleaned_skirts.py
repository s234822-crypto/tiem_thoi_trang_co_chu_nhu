import os
from PIL import Image

skirt_dir = 'scratch/clean_skirts'
files = sorted([f for f in os.listdir(skirt_dir) if f.endswith('.png')])

# Create a 4x4 grid image to inspect all 16 cleaned skirt icons side by side
grid_w = 4 * 256
grid_h = 4 * 256
grid_img = Image.new('RGBA', (grid_w, grid_h), (255, 240, 245, 255)) # Light pastel background to verify transparency & clean edges

for idx, f in enumerate(files):
    row = idx // 4
    col = idx % 4
    path = os.path.join(skirt_dir, f)
    img = Image.open(path)
    grid_img.paste(img, (col * 256, row * 256), img)

grid_img.save('scratch/all_cleaned_skirts_grid.png')
print('Saved scratch/all_cleaned_skirts_grid.png for inspection!')
