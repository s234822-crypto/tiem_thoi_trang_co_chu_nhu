import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

from audit_whitelist import WHITELIST

label_lines = []
label_lines.append("export const SUBCATEGORY_LABELS: Record<SubCategory, string> = {")
for cat, items in WHITELIST.items():
    label_lines.append(f"  // {cat.upper()} ({len(items)})")
    for subcat, label in items:
        label_lines.append(f"  {subcat}: '{label}',")
label_lines.append("};")

new_labels_block = "\n".join(label_lines)

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content_updated = re.sub(
    r"export const SUBCATEGORY_LABELS:[^=]+=\s*\{[\s\S]+?\};",
    new_labels_block,
    content
)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content_updated)

print('Cleaned SUBCATEGORY_LABELS in src/data/products.ts!')
