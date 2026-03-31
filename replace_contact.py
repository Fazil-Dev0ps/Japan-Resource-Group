import glob
import re

html_files = glob.glob("*.html")
# We'll use a regex that matches the start of the <div class="contact-item"> and the icon and the contact-details div, up to its closing </div>
# The key is to match the one that contains the whatsapp link

regex_pattern = re.compile(r'(<div class="contact-item">\s*<i class="fas fa-phone"></i>\s*<div class="contact-details">\s*<a href="https://wa\.me/818077048929".*?</p>\s*</div>\s*</div>)', re.MULTILINE | re.DOTALL)

replacement_html = """<div class="contact-item">
                        <i class="fas fa-phone-alt"></i>
                        <div class="contact-details">
                            <a href="tel:+81757546036" data-translate="footer-phone-2" style="text-decoration:none;">+81 75-754-6036</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-fax"></i>
                        <div class="contact-details">
                            <span data-translate="footer-phone-3">+81 75-754-6211</span>
                        </div>
                    </div>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = regex_pattern.subn(replacement_html, content)
    
    if count > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")

