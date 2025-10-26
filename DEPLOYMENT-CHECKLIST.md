# Quanton Labs Website - Deployment Checklist

## What You Have Now

✓ **index.html** - Complete homepage with all sections
✓ **css/styles.css** - Comprehensive styling with brand colors
✓ **js/scripts.js** - Animations and interactive features
✓ **README.md** - Documentation and instructions

## What You Need to Do

### Step 1: Prepare Logo Files (5 minutes)

You have these files in your project directory:
- `quantonlabslogoprimary.png`
- `quantonlabslogoreverse.png`

**Actions:**
1. Download all files from this conversation to your computer
2. Create a new folder called `images` in the same location
3. Copy your logo files into the `images` folder
4. Rename `quantonlabslogoprimary.png` to `quantonlabs-logo.png`
5. Rename `quantonlabslogoreverse.png` to `quantonlabs-logo-reverse.png`

**Final folder structure on your computer:**
```
website-files/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
├── images/
│   ├── quantonlabs-logo.png
│   └── quantonlabs-logo-reverse.png
└── README.md
```

### Step 2: Upload to GitHub (5 minutes)

1. Go to github.com and open your `quantonlabs-website` repository
2. Click "Add file" → "Upload files"
3. Drag ALL files and folders into the upload area
   - GitHub will preserve the folder structure
4. Scroll down and add commit message: "Initial website deployment"
5. Click "Commit changes"

### Step 3: Verify Upload (2 minutes)

Check that your repository shows:
```
quantonlabs-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
├── images/
│   ├── quantonlabs-logo.png
│   └── quantonlabs-logo-reverse.png
└── README.md
```

**Critical:** `index.html` must be in the root directory (not in a subfolder).

### Step 4: Deploy to Vercel (10 minutes)

Once files are on GitHub, follow the Vercel deployment guide:
1. Log into Vercel
2. Import `quantonlabs-website` repository
3. Vercel auto-detects settings
4. Click "Deploy"
5. Site goes live in 30-60 seconds

## Quick Troubleshooting

**Problem:** Logos not showing after deployment
**Solution:** Verify image files are in `images/` folder with correct names

**Problem:** CSS not loading
**Solution:** Verify `css/styles.css` exists and `index.html` references it correctly

**Problem:** Site shows 404 error
**Solution:** Ensure `index.html` is in root directory, not nested in subfolder

## Contact Information Update

Before deployment, update the contact email in `index.html`:
- Line 288: `<a href="mailto:info@quantonlabs.com">`
- Change to your preferred contact email

## Optional Enhancements (After Launch)

1. Add Google Analytics tracking code
2. Add favicon for browser tab
3. Set up contact form with backend
4. Add Open Graph meta tags for social sharing
5. Configure custom error pages

## Support Resources

- **GitHub Help:** github.com/docs
- **Vercel Help:** vercel.com/docs
- **Web Dev Tools:** Chrome DevTools for debugging

---

**You're ready to deploy.** Complete Steps 1-4 above and your website will be live.