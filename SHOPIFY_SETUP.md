# NXTLVL Shopify App Setup Guide

This guide will help you convert your NXTLVL gaming e-commerce platform into a fully functional Shopify app.

## Prerequisites

1. **Shopify Partner Account**: [Create one here](https://partners.shopify.com/)
2. **Development Store**: A Shopify store for testing your app

## Step 1: Create a Shopify App

1. Log into your [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Click "Apps" in the sidebar
3. Click "Create app"
4. Choose "Create app manually"
5. Fill in the app details:
   - **App name**: NXTLVL Gaming Store
   - **App URL**: `https://your-domain.com` (your deployed URL)
   - **Allowed redirection URL(s)**: 
     ```
     https://your-domain.com/api/shopify/oauth/callback
     ```

## Step 2: Configure App Settings

### App Setup
- **App URL**: Your main application URL
- **Allowed redirection URLs**: The OAuth callback URL from Step 1
- **Webhook endpoints**: `https://your-domain.com/api/shopify/webhook/`

### App Permissions (Scopes)
Request the following permissions for your app:
- `read_products` - Read product information
- `write_products` - Create and update products
- `read_orders` - Read order information  
- `write_orders` - Create and update orders
- `read_customers` - Read customer information
- `write_customers` - Create and update customers

### Webhooks (Optional but Recommended)
Set up webhooks to keep data in sync:
- **Products**: `products/create`, `products/update`, `products/delete`
- **Orders**: `orders/create`, `orders/updated`, `orders/cancelled`
- **App**: `app/uninstalled`

## Step 3: Update Environment Variables

Add these environment variables to your `/app/backend/.env` file:

```env
# Shopify App Configuration
SHOPIFY_API_KEY=your_api_key_from_partner_dashboard
SHOPIFY_API_SECRET=your_api_secret_from_partner_dashboard
SHOPIFY_REDIRECT_URI=https://your-domain.com/api/shopify/oauth/callback
SHOPIFY_API_VERSION=2024-01
SHOPIFY_SCOPES=read_products,write_products,read_orders,write_orders,read_customers,write_customers
```

## Step 4: Install the App

1. Navigate to `/admin/shopify` in your NXTLVL platform
2. Enter your Shopify store domain (e.g., `my-store.myshopify.com`)
3. Click "Install NXTLVL App"
4. You'll be redirected to Shopify to authorize the app
5. After authorization, you'll be redirected back with confirmation

## Step 5: Sync Products

After installation, you can:
- **Manual Sync**: Use the "Sync Products" button in the admin panel
- **Automatic Sync**: Products will sync automatically via webhooks
- **View Products**: See all synced products from your Shopify store

## Features Included

### 🛍️ Product Management
- **Bi-directional sync**: Changes in Shopify reflect in NXTLVL and vice versa
- **Product variants**: Support for multiple sizes, colors, and SKUs
- **Inventory tracking**: Real-time inventory synchronization
- **Rich product data**: Images, descriptions, specifications, and pricing

### 🎯 Gaming-Specific Features
- **Product categories**: Automatic categorization of gaming products
- **Bundle deals**: Create gaming product bundles with discounts
- **SEO optimization**: Auto-generated gaming-focused SEO content
- **Product reviews**: Enhanced review system with gaming context

### 🚀 E-commerce Features
- **Shopping cart**: Integrated cart with Shopify checkout
- **Order processing**: Orders processed through Shopify's robust system
- **Customer management**: Leverage Shopify's customer database
- **Payment processing**: All major payment methods via Shopify Payments

## Troubleshooting

### Common Issues

**App Installation Fails**
- Check that your API credentials are correct
- Ensure the redirect URI matches exactly
- Verify your app has the required permissions

**Products Not Syncing**
- Check webhook configuration in your Shopify app settings
- Verify API permissions include product read/write access
- Try manual sync from the admin panel

**OAuth Errors**
- Ensure SHOPIFY_REDIRECT_URI matches your app settings
- Check that the shop domain is correct (.myshopify.com)
- Verify your API key and secret are set correctly

## Development vs Production

### Development Setup
- Use your development store for testing
- Set webhook URLs to your local/development environment
- Use Shopify's test payment gateway

### Production Setup
- Update app URLs to your production domain
- Configure production webhook endpoints
- Set up proper SSL certificates
- Configure production payment settings

## Support

For technical support:
1. Check the [Shopify App Development Documentation](https://shopify.dev/docs/apps)
2. Review the API logs in your NXTLVL admin panel
3. Test the integration with a development store first

## Next Steps

1. **Customize Branding**: Maintain NXTLVL's gaming aesthetic while following Shopify guidelines
2. **Add Gaming Features**: Implement gaming-specific product filters and recommendations
3. **Performance Optimization**: Optimize product loading and sync performance
4. **Analytics Integration**: Connect Shopify analytics with NXTLVL's gaming insights

---

**Ready to Level Up?** Your NXTLVL gaming store is now powered by Shopify's enterprise-grade e-commerce platform! 🎮