import glob
html_files = glob.glob("*.html")
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = content.replace('<div class="contact-info">                    <div class="contact-item">', '<div class="contact-info">\n                    <div class="contact-item">')
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
