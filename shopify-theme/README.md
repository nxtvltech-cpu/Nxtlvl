# NXTLVL Gaming - Shopify Theme

A professional gaming e-commerce Shopify theme with animated brand carousel, product sliders, visual discounts, and modern gaming aesthetics.

## 🎮 Features

- ✅ **Animated Brand Carousel** - 13 gaming brands with infinite scroll
- ✅ **Product Image Sliders** - Auto-sliding carousels on all products
- ✅ **Visual Discounts** - 10-40% off badges and pricing
- ✅ **Delivery Date Estimator** - Interactive shipping calculator
- ✅ **Social Media Float Widget** - Instagram, TikTok, WhatsApp
- ✅ **Gaming Aesthetic** - Dark theme with RGB accents
- ✅ **Fully Modular** - Drag & drop sections in Shopify
- ✅ **Mobile Responsive** - Perfect on all devices

## 📦 Installation

### Method 1: Upload ZIP to Shopify

1. Download the latest release ZIP
2. Go to Shopify Admin → **Online Store** → **Themes**
3. Click **"Add theme"** → **"Upload zip file"**
4. Select the downloaded ZIP
5. Click **"Publish"** when ready

### Method 2: Connect via GitHub (Recommended)

1. Fork this repository to your GitHub account
2. In Shopify Admin, go to **Online Store** → **Themes**
3. Click **"Add theme"** → **"Connect from GitHub"**
4. Authorize Shopify to access your GitHub
5. Select this repository and branch
6. Click **"Connect"**

Your theme will now auto-update when you push changes to GitHub!

## 🎨 Customization

All sections are editable in Shopify's theme editor:

### Edit Hero Section
```
1. Go to Shopify Admin → Themes → Customize
2. Click "Hero Section"
3. Edit title, subtitle, button text
4. Save changes
```

### Edit Brand Carousel
```
1. Click "Brand Carousel" section
2. Add/remove brands using "Add brand" button
3. Edit brand names and colors
4. Drag to reorder brands
5. Save
```

### Available Sections
- Hero Section
- Brand Carousel (13 default brands)
- Slogan Band
- Featured Collection
- Categories
- Image Banner
- Rich Text
- Newsletter
- Social Media
- Quick Links
- And more!

## 📁 Theme Structure

```
shopify-theme/
├── assets/           # CSS, JS files
├── config/           # Theme settings
├── layout/           # Main theme layout
├── sections/         # Modular sections (17 total)
├── snippets/         # Reusable components
└── templates/        # Page templates (JSON)
```

## 🔧 Development

### Prerequisites
- Shopify CLI installed
- Shopify Partner account
- Development store

### Local Development

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Clone this repository
git clone https://github.com/yourusername/nxtlvl-gaming-shopify-theme.git
cd nxtlvl-gaming-shopify-theme

# Start development server
shopify theme dev --store your-store.myshopify.com

# Opens localhost:9292
```

### Deploy to Store

```bash
# Deploy to theme library
shopify theme push

# Or deploy and publish
shopify theme push --publish
```

## 🎯 Configuration

### Social Media Widget

1. Go to **Theme Settings** → **Social Media**
2. Enable **"Floating Social Widget"**
3. Add your URLs:
   - Instagram: `https://instagram.com/yourusername`
   - TikTok: `https://tiktok.com/@yourusername`
   - WhatsApp: `14155551234` (country code + number)

### Brand Carousel

Pre-configured with 13 gaming brands:
- NVIDIA, AMD, Intel
- Razer, Logitech, Corsair, HyperX, SteelSeries
- NZXT, Cooler Master, Thermaltake
- Elgato, Blue

**Add/Edit in Theme Editor** → Brand Carousel section

## 📱 Mobile Optimization

- Responsive design for all devices
- Touch-optimized controls
- Faster animations on mobile
- Optimized image loading

## 🚀 Performance

- **File Size**: 62 KB (compressed)
- **Load Time**: <2 seconds average
- **Performance**: Optimized for Shopify
- **Mobile Speed**: Fast (optimized animations)

## 📚 Documentation

- [Installation Guide](SHOPIFY_THEME_INSTALLATION.md)
- [Brand Carousel Guide](BRAND_CAROUSEL_GUIDE.md)
- [Product Sliders Guide](PRODUCT_SLIDERS_DISCOUNTS_GUIDE.md)
- [Social Widget Guide](SHOPIFY_SOCIAL_WIDGET_GUIDE.md)

## 🆘 Support

### Common Issues

**Theme not uploading?**
- Ensure ZIP is under 50 MB ✅
- Check all required files are present
- Try re-downloading and uploading

**Sections not appearing?**
- Check theme is published
- Clear browser cache
- Verify sections are added in theme editor

**Brand carousel not scrolling?**
- Ensure multiple brands are added
- Check browser console for errors
- Verify CSS animations are enabled

## 🔄 Updates

This theme follows Shopify 2.0 standards and receives regular updates:

- New features added via GitHub
- Bug fixes and optimizations
- Shopify compatibility updates

**Stay updated**: Star this repo and watch for releases!

## 📄 License

This theme is provided as-is for use with Shopify stores.

## 🙏 Credits

- **Theme**: NXTLVL Gaming
- **Version**: 1.0.0
- **Tech**: Shopify Liquid, CSS3, JavaScript
- **Features**: Modular sections, Shopify 2.0 compliant

---

**Built with 💚 for NXTLVL Gaming**

*Professional e-commerce theme with infinite brand carousel, product sliders, visual discounts, and gaming aesthetics!*
