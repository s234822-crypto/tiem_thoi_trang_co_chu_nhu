import os
import sys

BASE_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'outfits')

def make_svg(inner_svg):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="sticker-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="6" flood-color="#2C221E" flood-opacity="0.25"/>
    </filter>
    <linearGradient id="red-shirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4D4D"/>
      <stop offset="70%" stop-color="#ED192D"/>
      <stop offset="100%" stop-color="#B30012"/>
    </linearGradient>
    <linearGradient id="white-shirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#F0F2F8"/>
      <stop offset="100%" stop-color="#D8DEF0"/>
    </linearGradient>
    <linearGradient id="pink-top" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF99CC"/>
      <stop offset="70%" stop-color="#FF55A0"/>
      <stop offset="100%" stop-color="#D81B70"/>
    </linearGradient>
    <linearGradient id="yellow-top" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF366"/>
      <stop offset="70%" stop-color="#FFD700"/>
      <stop offset="100%" stop-color="#E6A100"/>
    </linearGradient>
    <linearGradient id="cream-blouse" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0"/>
      <stop offset="70%" stop-color="#FFF3D6"/>
      <stop offset="100%" stop-color="#E6D2A8"/>
    </linearGradient>
    <linearGradient id="blue-shirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#66D9FF"/>
      <stop offset="70%" stop-color="#1AC6FF"/>
      <stop offset="100%" stop-color="#0099E6"/>
    </linearGradient>
    <linearGradient id="green-polo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4DDF78"/>
      <stop offset="70%" stop-color="#12C74B"/>
      <stop offset="100%" stop-color="#0B8E33"/>
    </linearGradient>
    <linearGradient id="purple-sweater" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B84DFF"/>
      <stop offset="70%" stop-color="#8C1AF5"/>
      <stop offset="100%" stop-color="#5E00B8"/>
    </linearGradient>
    <linearGradient id="denim-jeans" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8AA5F8"/>
      <stop offset="60%" stop-color="#4F75E8"/>
      <stop offset="100%" stop-color="#2848B8"/>
    </linearGradient>
    <linearGradient id="dark-leather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#555560"/>
      <stop offset="70%" stop-color="#2D2D35"/>
      <stop offset="100%" stop-color="#15151A"/>
    </linearGradient>
    <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2A3"/>
      <stop offset="70%" stop-color="#FFD034"/>
      <stop offset="100%" stop-color="#D49900"/>
    </linearGradient>
  </defs>
  <g filter="url(#sticker-shadow)">
    {inner_svg}
  </g>
</svg>'''

# 1. TOPS (20 items matching reference illustration details)
TOPS = {
    'basic-tshirt': '''
      <path d="M120 140 C160 120 200 90 256 90 C312 90 352 120 392 140 L450 190 C420 230 380 260 360 250 L330 220 L330 420 Q256 440 182 420 L182 220 L152 250 C132 260 92 230 62 190 Z" fill="url(#red-shirt)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M200 95 C220 145 292 145 312 95" fill="url(#yellow-top)" stroke="#2C221E" stroke-width="10"/>
      <path d="M182 220 C220 280 220 360 182 420 M330 220 C292 280 292 360 330 420" fill="none" stroke="#2C221E" stroke-width="6" opacity="0.4"/>
      <path d="M220 160 C256 180 292 160 330 140" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
    ''',
    'oversized-tshirt': '''
      <path d="M110 130 C160 110 200 85 256 85 C312 85 352 110 402 130 L462 200 C430 245 390 280 372 265 L352 230 L352 440 Q256 460 160 440 L160 230 L140 265 C122 280 82 245 50 200 Z" fill="url(#white-shirt)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M195 88 C215 135 297 135 317 88" fill="none" stroke="#2C221E" stroke-width="10"/>
      <path d="M160 230 C200 290 200 380 160 440 M352 230 C312 290 312 380 352 440" fill="none" stroke="#2C221E" stroke-width="6" opacity="0.3"/>
    ''',
    'crop-top': '''
      <path d="M140 140 C170 200 342 200 372 140 L420 180 L380 240 L350 220 L350 340 Q256 360 162 340 L162 220 L132 240 L92 180 Z" fill="url(#pink-top)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M170 140 C220 210 292 210 342 140" fill="none" stroke="#2C221E" stroke-width="10"/>
      <path d="M162 310 L350 310" stroke="#2C221E" stroke-width="8"/>
    ''',
    'camisole-top': '''
      <path d="M175 110 L175 180 M337 110 L337 180" stroke="#2C221E" stroke-width="12" stroke-linecap="round"/>
      <path d="M145 180 L256 210 L367 180 L355 420 Q256 440 157 420 Z" fill="url(#yellow-top)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M190 230 Q256 270 322 230" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
    ''',
    'blouse': '''
      <path d="M130 140 C180 90 332 90 382 140 L445 220 C420 280 370 290 340 240 L340 430 Q256 450 172 430 L172 240 C142 290 92 280 67 220 Z" fill="url(#cream-blouse)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M210 95 L256 160 L302 95" fill="url(#white-shirt)" stroke="#2C221E" stroke-width="8"/>
      <line x1="256" y1="160" x2="256" y2="430" stroke="#2C221E" stroke-width="6"/>
      <circle cx="256" cy="220" r="8" fill="url(#gold-metal)" stroke="#2C221E" stroke-width="3"/>
      <circle cx="256" cy="280" r="8" fill="url(#gold-metal)" stroke="#2C221E" stroke-width="3"/>
      <circle cx="256" cy="340" r="8" fill="url(#gold-metal)" stroke="#2C221E" stroke-width="3"/>
    ''',
    'button-shirt': '''
      <path d="M140 130 L205 90 L307 90 L372 130 L440 190 L372 250 L332 210 L332 430 Q256 450 180 430 L180 210 L140 250 L72 190 Z" fill="url(#blue-shirt)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M205 90 L256 150 L307 90" fill="url(#white-shirt)" stroke="#2C221E" stroke-width="8"/>
      <line x1="256" y1="150" x2="256" y2="430" stroke="#2C221E" stroke-width="6"/>
      <rect x="280" y="190" width="35" height="40" rx="4" fill="url(#blue-shirt)" stroke="#2C221E" stroke-width="6"/>
      <circle cx="256" cy="210" r="6" fill="#FFF"/><circle cx="256" cy="270" r="6" fill="#FFF"/><circle cx="256" cy="330" r="6" fill="#FFF"/>
    ''',
    'polo-shirt': '''
      <path d="M140 130 L205 90 L307 90 L372 130 L430 185 L372 245 L332 210 L332 420 Q256 440 180 420 L180 210 L140 245 L82 185 Z" fill="url(#green-polo)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <path d="M205 90 L256 150 L307 90" fill="url(#white-shirt)" stroke="#2C221E" stroke-width="8"/>
      <rect x="236" y="150" width="40" height="90" fill="url(#white-shirt)" stroke="#2C221E" stroke-width="6"/>
      <circle cx="256" cy="180" r="6" fill="#2C221E"/><circle cx="256" cy="215" r="6" fill="#2C221E"/>
      <path d="M82 185 L140 130 M430 185 L372 130" stroke="#FFF" stroke-width="10"/>
    ''',
    'sweater': '''
      <path d="M140 130 L200 85 L312 85 L372 130 L440 195 L370 265 L325 220 L325 420 Q256 440 187 420 L187 220 L142 265 L72 195 Z" fill="url(#purple-sweater)" stroke="#2C221E" stroke-width="12" stroke-linejoin="round"/>
      <rect x="200" y="85" width="112" height="40" rx="10" fill="url(#purple-sweater)" stroke="#2C221E" stroke-width="8"/>
      <rect x="187" y="405" width="138" height="30" rx="6" fill="url(#purple-sweater)" stroke="#2C221E" stroke-width="8"/>
    '''
}

# Generate items
count = 0
for item_id, svg_content in TOPS.items():
    svg_full = make_svg(svg_content)
    file_path = os.path.join(BASE_DIR, 'tops', f'{item_id}.svg')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(svg_full)
    count += 1

print(f"Rendered vector sticker pack for Tops ({count} items)!")
