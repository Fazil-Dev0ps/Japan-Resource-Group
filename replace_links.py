import glob
import re

html_files = glob.glob("*.html")

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace URL
    content = content.replace('supply_chain_management.html', 'vanning_inspection.html')
    
    # Replace dropdown text and footer text
    content = content.replace('Supply Chain Management', 'Vanning & Inspection')
    
    # Replace data-translate key
    content = content.replace('data-translate="supply_chain_management"', 'data-translate="vanning_inspection"')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# Update language-system.js
with open('language-system.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Just replace the keys
js_content = js_content.replace("'supply_chain_management': 'Supply Chain Management',", "'vanning_inspection': 'Vanning & Inspection',")
js_content = js_content.replace("'supply_chain_management': 'サプライチェーンマネジメント',", "'vanning_inspection': 'バンニング＆検査',")
js_content = js_content.replace("'supply_chain_management': '供应链管理',", "'vanning_inspection': '装箱与检查',")
js_content = js_content.replace("'supply_chain_management': '공급망 관리',", "'vanning_inspection': '배닝 및 검사',")

with open('language-system.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Updates complete.")
