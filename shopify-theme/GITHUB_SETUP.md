# Connecting NXTLVL Gaming Theme to Shopify via GitHub

## 🎯 Overview

This guide will help you connect your NXTLVL Gaming Shopify theme to GitHub, enabling automatic updates and version control.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ A GitHub account
- ✅ A Shopify store (Partner or paid plan)
- ✅ Admin access to your Shopify store
- ✅ This theme repository

---

## 🚀 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. **Go to GitHub** and log in
2. Click **"New repository"** (green button)
3. Repository settings:
   - **Name**: `nxtlvl-gaming-shopify-theme`
   - **Description**: `NXTLVL Gaming - Professional Shopify Theme`
   - **Visibility**: Private (recommended) or Public
   - **Initialize**: Do NOT check any boxes
4. Click **"Create repository"**

### Step 2: Push Theme to GitHub

Open your terminal and run:

```bash
# Navigate to your theme directory
cd /path/to/shopify-theme

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - NXTLVL Gaming theme"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/nxtlvl-gaming-shopify-theme.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username.

### Step 3: Connect Shopify to GitHub

1. **Go to Shopify Admin**
2. Navigate to **Online Store** → **Themes**
3. Click **"Add theme"** button
4. Select **"Connect from GitHub"**

### Step 4: Authorize GitHub Access

1. Click **"Connect to GitHub"**
2. **Sign in to GitHub** (if not already logged in)
3. **Authorize Shopify** to access your repositories
4. Click **"Authorize Shopify"**

### Step 5: Select Repository and Branch

1. **Select your repository**: `nxtlvl-gaming-shopify-theme`
2. **Select branch**: `main`
3. Click **"Connect"**
4. Wait for Shopify to sync your theme

### Step 6: Publish Theme

1. Once connected, your theme appears in the theme library
2. Click **"Customize"** to preview and edit
3. When ready, click **"Publish"** to make it live

---

## 🔄 Automatic Updates

Now whenever you push changes to GitHub:

```bash
# Make changes to your theme files
git add .
git commit -m "Updated brand carousel colors"
git push origin main
```

**Shopify automatically syncs** the changes within minutes!

---

## 🌿 Branch Strategy

### Recommended Workflow

**Main Branch** (`main`):
- Production-ready code
- Connected to live Shopify store
- Only push tested changes

**Development Branch** (`dev`):
- Work-in-progress features
- Testing and experiments
- Not connected to live store

**Feature Branches**:
- Specific features or fixes
- Merge to `dev` when ready
- Then merge to `main` for production

### Create Development Branch

```bash
# Create and switch to dev branch
git checkout -b dev

# Push to GitHub
git push -u origin dev

# Connect to a test Shopify store
# Shopify Admin → Add theme → Connect from GitHub → Select 'dev' branch
```

---

## 📝 Git Workflow Example

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feature/new-section

# 2. Make your changes
# Edit files...

# 3. Commit changes
git add .
git commit -m "Add new gaming accessories section"

# 4. Push to GitHub
git push origin feature/new-section

# 5. Create Pull Request on GitHub
# Review changes

# 6. Merge to main
git checkout main
git merge feature/new-section
git push origin main

# 7. Shopify auto-syncs! ✅
```

---

## 🔒 Security Best Practices

### Environment Variables

**Never commit sensitive data!**

Create a `.gitignore` file:

```bash
# .gitignore
*.log
.DS_Store
.env
config/settings_data.json
```

### API Keys

If you need API keys (for apps, integrations):
1. Store in **Shopify Theme Settings**
2. Reference via Liquid: `{{ settings.api_key }}`
3. Never hardcode in files

---

## 🛠️ Shopify CLI Integration

### Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

### Connect CLI to Store

```bash
# Login to Shopify
shopify auth login

# Pull theme from store
shopify theme pull

# Start local development
shopify theme dev

# Push changes
shopify theme push
```

### CLI + GitHub Workflow

1. **Develop locally** with `shopify theme dev`
2. **Test changes** on localhost:9292
3. **Commit to Git** when satisfied
4. **Push to GitHub** to deploy

---

## 📊 Monitoring Changes

### View Sync Status

1. **Shopify Admin** → **Online Store** → **Themes**
2. Look for **"Connected to GitHub"** badge
3. Click **"View on GitHub"** to see repository

### Sync Logs

- Shopify logs all syncs from GitHub
- Check for errors in theme editor
- View commit history on GitHub

---

## 🎯 Common Workflows

### 1. Updating Brand Carousel

```bash
# Edit brand-carousel.liquid
# Add new brand or change colors

git add sections/brand-carousel.liquid
git commit -m "Add ASUS brand to carousel"
git push origin main

# Wait 2-5 minutes for Shopify to sync ✅
```

### 2. Changing Theme Colors

```bash
# Edit config/settings_schema.json
# Update color settings

git add config/settings_schema.json
git commit -m "Update default theme colors"
git push origin main
```

### 3. Adding New Section

```bash
# Create new section file
# sections/new-feature.liquid

git add sections/new-feature.liquid
git commit -m "Add new feature section"
git push origin main
```

---

## 🐛 Troubleshooting

### Theme Not Syncing

**Issue**: Changes not appearing in Shopify
**Solutions**:
1. Check GitHub webhook status
2. Verify branch is correct (`main`)
3. Disconnect and reconnect GitHub
4. Check Shopify status page

### Merge Conflicts

**Issue**: Git merge conflicts
**Solutions**:
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts manually
# Edit conflicting files

# Commit resolution
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Connection Lost

**Issue**: GitHub connection broken
**Solutions**:
1. Go to Shopify Admin → Themes
2. Click **"Disconnect"** on theme
3. Click **"Connect from GitHub"** again
4. Reauthorize and reconnect

---

## 📚 Additional Resources

### Official Documentation
- [Shopify GitHub Integration](https://shopify.dev/docs/themes/tools/github)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
- [Theme Development](https://shopify.dev/docs/themes)

### Git Resources
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## ✅ Setup Checklist

After completing setup, verify:

- [ ] Repository created on GitHub
- [ ] Theme files pushed to GitHub
- [ ] Shopify connected to GitHub repository
- [ ] Correct branch selected (`main`)
- [ ] Theme appears in Shopify admin
- [ ] Test change pushed and synced
- [ ] `.gitignore` configured
- [ ] Development workflow established

---

## 🎉 Success!

Your NXTLVL Gaming theme is now connected to GitHub!

**Benefits**:
✅ Version control for all changes
✅ Automatic deployment to Shopify
✅ Collaboration with team members
✅ Rollback to previous versions
✅ Professional development workflow

**Next Steps**:
1. Customize theme in Shopify editor
2. Make code changes via GitHub
3. Monitor automatic syncs
4. Enjoy seamless updates!

---

**Questions?** Check the troubleshooting section or Shopify support.

**Happy coding! 🎮💚**
