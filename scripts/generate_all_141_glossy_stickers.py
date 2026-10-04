import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageOps

BASE_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'outfits')

# Color palette matching reference sticker image
COLORS = {
    'red': {'main': (237, 41, 57), 'dark': (180, 20, 35), 'light': (255, 120, 130)},
    'white': {'main': (245, 245, 252), 'dark': (200, 205, 225), 'light': (255, 255, 255)},
    'pink': {'main': (248, 120, 168), 'dark': (210, 70, 120), 'light': (255, 180, 210)},
    'yellow': {'main': (255, 215, 0), 'dark': (215, 165, 0), 'light': (255, 245, 140)},
    'cream': {'main': (252, 244, 222), 'dark': (220, 200, 170), 'light': (255, 255, 250)},
    'blue': {'main': (68, 182, 246), 'dark': (30, 130, 195), 'light': (160, 225, 255)},
    'dark_blue': {'main': (48, 63, 159), 'dark': (28, 38, 110), 'light': (100, 120, 210)},
    'green': {'main': (46, 184, 86), 'dark': (25, 130, 55), 'light': (130, 230, 160)},
    'purple': {'main': (156, 60, 225), 'dark': (105, 30, 165), 'light': (205, 130, 255)},
    'denim': {'main': (70, 100, 180), 'dark': (40, 65, 130), 'light': (130, 160, 220)},
    'leather': {'main': (40, 40, 45), 'dark': (20, 20, 25), 'light': (90, 90, 100)},
    'gold': {'main': (255, 190, 40), 'dark': (200, 135, 10), 'light': (255, 235, 140)},
}

OUTLINE_COLOR = (44, 34, 30, 255) # Reference dark brown/black cartoon stroke

# Ensure directories exist
CATEGORIES = ['tops', 'bottoms', 'skirts', 'dresses', 'jackets', 'shoes', 'bags', 'accessories']
for cat in CATEGORIES:
    os.makedirs(os.path.join(BASE_DIR, cat), exist_ok=True)

print("Starting generation of glossy cartoon fashion stickers...")
