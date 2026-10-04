import sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from PIL import Image

BASE = r'C:\Users\NITRO V\Downloads\tiệm-thời-trang-cô-chủ-như\public\assets\outfits'
TARGET_SIZE = 256
PADDING = 18

def clean_icon(path):
    try:
        img = Image.open(path)
        # Convert RGB to RGBA removing near-white background
        if img.mode == 'RGB':
            img = img.convert('RGBA')
            data = list(img.getdata())
            new_data = []
            for px in data:
                r, g, b, a = px
                if r > 238 and g > 238 and b > 238:
                    new_data.append((r, g, b, 0))
                else:
                    new_data.append(px)
            img.putdata(new_data)
        elif img.mode not in ('RGBA', 'LA'):
            img = img.convert('RGBA')

        # Crop to bounding box of visible content
        bbox = img.getbbox()
        if not bbox:
            return False, 'empty'
        img = img.crop(bbox)
        cw, ch = img.size

        # Scale to fit inner area
        inner = TARGET_SIZE - 2 * PADDING
        scale = min(inner / cw, inner / ch)
        nw = max(1, int(cw * scale))
        nh = max(1, int(ch * scale))
        img = img.resize((nw, nh), Image.LANCZOS)

        # Create transparent canvas and center
        canvas = Image.new('RGBA', (TARGET_SIZE, TARGET_SIZE), (0,0,0,0))
        x = (TARGET_SIZE - nw) // 2
        y = (TARGET_SIZE - nh) // 2
        canvas.paste(img, (x, y), img)
        canvas.save(path, 'PNG', optimize=True)
        return True, f'{nw}x{nh}'
    except Exception as e:
        return False, str(e)

categories = ['shoes', 'tops', 'bottoms', 'dresses', 'jackets', 'bags', 'accessories']
total_ok = 0
total_files = 0

for cat in categories:
    folder = os.path.join(BASE, cat)
    if not os.path.exists(folder):
        continue
    files = sorted([f for f in os.listdir(folder) if f.lower().endswith('.png')])
    print(f'\n[{cat.upper()}] {len(files)} icons:')
    ok_count = 0
    for fname in files:
        path = os.path.join(folder, fname)
        ok, info = clean_icon(path)
        status = 'OK' if ok else 'FAIL'
        print(f'  {status} {fname}: {info}')
        if ok:
            ok_count += 1
    total_ok += ok_count
    total_files += len(files)
    print(f'  -> {ok_count}/{len(files)} done')

print(f'\nDone: {total_ok}/{total_files} icons cleaned to {TARGET_SIZE}x{TARGET_SIZE} RGBA')
