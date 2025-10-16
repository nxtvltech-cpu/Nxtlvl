# NXTLVL Gaming - Social Media Widget Guide

## Overview
The NXTLVL Gaming Shopify theme now includes a **Floating Social Media Widget** that allows customers to easily connect with your brand on Instagram, TikTok, and WhatsApp. This widget is fully configurable through the Shopify theme customizer.

---

## Features

### 🎮 Interactive Floating Widget
- **Fixed Position**: Always visible in the bottom-right corner
- **Animated Toggle Button**: Eye-catching gradient button with pulse animation
- **Expandable Panel**: Clean, organized social media links
- **Gaming Aesthetic**: Matches NXTLVL's dark theme with neon green/purple accents

### 📱 Social Media Platforms
1. **Instagram**: For gaming setups and RGB showcase
2. **TikTok**: For gaming content and tips
3. **WhatsApp**: For direct customer support

### ✨ Smart Features
- **Configurable URLs**: Set social media links through theme settings
- **Coming Soon State**: Shows "Coming Soon" badge when URLs are not configured
- **Mobile Responsive**: Adapts perfectly to all screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Click Outside to Close**: User-friendly interaction

---

## Installation

The widget is already integrated into your Shopify theme! It's included in:
- **Snippet**: `/shopify-theme/snippets/social-media-float.liquid`
- **Layout**: Rendered in `theme.liquid` before closing `</body>` tag
- **Settings**: Configured in theme customizer

---

## Configuration

### Step 1: Enable the Widget
1. In Shopify Admin, go to **Online Store > Themes**
2. Click **Customize** on the NXTLVL Gaming theme
3. In the left sidebar, click **Theme settings**
4. Scroll to **Social Media** section
5. Find **"Floating Social Widget"** header
6. Check ✅ **"Enable Floating Social Widget"**

### Step 2: Configure Social Media Links

#### Instagram
1. In the **"Floating Social Widget"** section
2. Enter your Instagram URL in the **"Instagram URL"** field
   - Example: `https://instagram.com/nxtlvlgaming`
   - Include the full URL with `https://`
3. If left empty, the widget will show "Coming Soon"

#### TikTok
1. Enter your TikTok URL in the **"TikTok URL"** field
   - Example: `https://tiktok.com/@nxtlvlgaming`
   - Include the full URL with `https://`
2. If left empty, the widget will show "Coming Soon"

#### WhatsApp
1. Enter your WhatsApp number in the **"WhatsApp Number"** field
   - **Important**: Include country code without + symbol
   - Example for US: `14155551234`
   - Example for UK: `447911123456`
   - Example for Australia: `61412345678`
2. The widget automatically creates the WhatsApp chat link
3. If left empty, the widget will show "Coming Soon"

### Step 3: Save Your Changes
1. Click **Save** in the top-right corner
2. The widget will appear immediately on your store

---

## Customization

### CSS Variables Used
The widget uses your theme's CSS custom properties:
```css
--nx-green: #00FF85 (Primary brand color)
--nx-purple: #8A2BE2 (Secondary brand color)
--font-body-family: Your body font
```

### Editing Widget Position
To change the widget position, edit `/shopify-theme/snippets/social-media-float.liquid`:

```css
.social-float-widget {
  position: fixed;
  bottom: 30px;  /* Change vertical position */
  right: 30px;   /* Change horizontal position */
  z-index: 9999;
}
```

### Disabling the Widget
**Option 1**: Through Theme Customizer
- Uncheck **"Enable Floating Social Widget"** in Social Media settings

**Option 2**: Through Code
- In `settings_data.json`, set: `"enable_social_float": false`

---

## Widget States

### Active Social Link (URL Configured)
- Full color icon with gradient background
- Displays social media name and description
- Shows arrow (→) on hover
- Clickable and opens in new tab

### Inactive Social Link (No URL)
- Grayed out appearance (50% opacity)
- Shows "Coming Soon" text
- Displays 🔜 emoji badge
- Not clickable (disabled state)

---

## Mobile Responsive Behavior

### Desktop (> 768px)
- Full toggle button with "Connect" text
- Panel: 380px width
- All features visible

### Mobile (≤ 768px)
- Compact toggle button (icon only)
- Panel: Full width minus 40px margins
- Stacked social links
- Optimized touch targets

---

## Technical Details

### Files Modified/Created
1. **Created**: `/shopify-theme/snippets/social-media-float.liquid`
   - Contains the complete widget HTML, CSS, and JavaScript
   - Self-contained component

2. **Modified**: `/shopify-theme/layout/theme.liquid`
   - Added `{% render 'social-media-float' %}` before `</body>`

3. **Modified**: `/shopify-theme/config/settings_schema.json`
   - Added floating widget settings to Social Media section

4. **Modified**: `/shopify-theme/config/settings_data.json`
   - Added default values for widget configuration

### JavaScript Functionality
```javascript
// Toggle panel open/close
socialFloatToggle.addEventListener('click', ...)

// Close button
closeSocialFloat.addEventListener('click', ...)

// Click outside to close
document.addEventListener('click', ...)
```

### Animations
- **Pulse Glow**: Toggle button pulses between green and purple
- **Share Bounce**: Icon bounces subtly
- **Gradient Flow**: Top border has flowing gradient
- **Slide In**: Panel slides in from bottom with scale effect
- **Hover Effects**: Icons rotate and scale on hover

---

## Troubleshooting

### Widget Not Appearing
1. ✅ Check that **"Enable Floating Social Widget"** is checked
2. ✅ Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
3. ✅ Verify theme is published and not in preview mode

### Links Not Working
1. ✅ Ensure URLs include `https://`
2. ✅ Verify URL format is correct (no spaces)
3. ✅ For WhatsApp, check country code is correct (no + symbol)

### Widget Position Issues
- The widget uses `position: fixed` with `z-index: 9999`
- If covered by other elements, increase z-index in the CSS
- Check for conflicting CSS from other apps

### Mobile Display Issues
- Widget automatically adapts to mobile
- If text is cut off, the container width adjusts to screen
- Touch targets are optimized for mobile interaction

---

## Best Practices

### 1. Social Media Setup
- ✅ Create dedicated gaming content accounts before adding URLs
- ✅ Use consistent branding across all platforms
- ✅ Post regularly to engage your community

### 2. WhatsApp Business
- ✅ Use WhatsApp Business account for professional features
- ✅ Set up automated greeting messages
- ✅ Configure business hours
- ✅ Use quick replies for common questions

### 3. Content Strategy
- **Instagram**: Post gaming setup photos, product showcases, RGB aesthetics
- **TikTok**: Share gaming tips, product reviews, unboxing videos
- **WhatsApp**: Provide customer support, order tracking, personalized recommendations

### 4. Testing
- ✅ Test all links before promoting
- ✅ Check mobile responsiveness
- ✅ Verify WhatsApp number works correctly
- ✅ Test on different devices and browsers

---

## Advanced Customization

### Adding More Social Platforms

To add additional social media platforms (Discord, Twitter, YouTube, etc.):

1. Edit `/shopify-theme/snippets/social-media-float.liquid`
2. Add new settings field in `settings_schema.json`
3. Copy an existing social link block and modify:
   - Update icon SVG
   - Change href to new platform URL
   - Update color scheme for platform brand colors
   - Add appropriate aria-label

Example for Discord:
```liquid
{%- if settings.discord_url != blank -%}
  <a href="{{ settings.discord_url }}" 
     class="social-link discord" 
     target="_blank" 
     rel="noopener noreferrer"
     aria-label="Join our Discord">
    <div class="social-icon">
      <!-- Discord SVG icon -->
    </div>
    <div class="social-info">
      <span class="social-name">Discord</span>
      <span class="social-description">Join our community</span>
    </div>
    <div class="social-arrow">→</div>
  </a>
{%- endif -%}
```

### Custom Styling

Add custom CSS in **Theme Settings > Advanced > Custom CSS**:

```css
/* Change toggle button colors */
.social-float-toggle {
  background: linear-gradient(135deg, #FF0080, #7928CA) !important;
}

/* Change panel background */
.social-float-panel {
  background: rgba(10, 10, 10, 0.95) !important;
  border-color: #FF0080 !important;
}

/* Custom hover effects */
.social-link:hover {
  transform: scale(1.05) !important;
}
```

---

## SEO & Analytics

### Track Social Clicks
Add UTM parameters to your social URLs:
```
Instagram: https://instagram.com/nxtlvlgaming?utm_source=shopify&utm_medium=social_widget
TikTok: https://tiktok.com/@nxtlvlgaming?utm_source=shopify&utm_medium=social_widget
```

### Monitor Performance
- Track widget clicks using Google Analytics event tracking
- Monitor social media follower growth after implementation
- Analyze conversion rates from social traffic

---

## Support

### Getting Help
If you encounter issues:
1. Check this guide first
2. Review the code in `/shopify-theme/snippets/social-media-float.liquid`
3. Verify theme settings are correct
4. Clear cache and test in incognito mode
5. Check browser console for JavaScript errors

### Updating Social Links
You can update social media URLs anytime through:
- **Shopify Admin > Themes > Customize > Theme Settings > Social Media**

Changes take effect immediately after saving.

---

## Version History

### v1.0.0 (Current)
- Initial release of floating social media widget
- Support for Instagram, TikTok, and WhatsApp
- Configurable through theme customizer
- Mobile responsive design
- Gaming-themed animations and styling

---

## Future Enhancements

Potential features for future versions:
- 📊 Analytics dashboard integration
- 🎨 Color scheme customization
- 📍 Position customization (left/right, top/bottom)
- ⏰ Show/hide based on time or user behavior
- 🌐 Multi-language support
- 📱 More social platform integrations

---

## Credits

Created for NXTLVL Gaming Shopify Theme
- Design: Gaming-focused dark aesthetic
- Development: Custom Liquid, CSS, JavaScript
- Icons: Custom SVG icons for each platform
- Animations: CSS3 animations and transitions

---

**Ready to connect with your gaming community! 🎮**

For more theme documentation, see:
- [NXTLVL Shopify Theme Guide](/NXTLVL_SHOPIFY_THEME_GUIDE.md)
- [Shopify Setup Guide](/SHOPIFY_SETUP.md)
