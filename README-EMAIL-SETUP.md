# Email Setup Guide for Japan Resource Group Website

## The Problem
You're getting CORS errors because you're opening the HTML file directly in the browser using the `file://` protocol. PHP files and AJAX requests don't work with this protocol.

## Solutions

### Option 1: Use the Simple Contact Page (Recommended for Testing)
1. Open `contact_simple.html` instead of `contact.html`
2. This version uses only mailto links and works without a server
3. When users submit the form, it opens their email client with pre-filled content

### Option 2: Set Up a Local Web Server

#### Using Python (if installed):
```bash
# Navigate to your project folder
cd "C:\Users\Osama\Documents\japan\japanstatic"

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000/contact.html`

#### Using Node.js (if installed):
```bash
# Install a simple server
npm install -g http-server

# Navigate to your project folder
cd "C:\Users\Osama\Documents\japan\japanstatic"

# Start server
http-server -p 8000
```
Then open: `http://localhost:8000/contact.html`

#### Using XAMPP/WAMP:
1. Download and install XAMPP or WAMP
2. Copy your project files to the `htdocs` folder
3. Start Apache server
4. Open: `http://localhost/japanstatic/contact.html`

### Option 3: Upload to a Web Server
1. Upload all files to any web hosting service
2. The PHP email functionality will work automatically
3. Make sure the hosting supports PHP

## Current Email Configuration
- **Recipient**: usamasaleem14@gmail.com
- **PHP File**: send_email.php (for server environments)
- **Fallback**: mailto links (works everywhere)

## Testing the Form
1. Fill out the contact form
2. Click "Send Message"
3. Your email client should open with pre-filled content
4. Send the email manually

## Files Created
- `contact.html` - Main contact page with PHP + mailto fallback
- `contact_simple.html` - Simple version with only mailto
- `send_email.php` - PHP email handler for server environments
- `README-EMAIL-SETUP.md` - This setup guide

Choose the option that works best for your current setup!
