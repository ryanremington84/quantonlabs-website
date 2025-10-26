# Quanton Labs Website

## File Structure

```
quantonlabs-website/
├── index.html              # Main homepage
├── css/
│   └── styles.css          # All styling and responsive design
├── js/
│   └── scripts.js          # Animations, interactions, analytics
├── images/                 # Logo and asset folder (you need to add this)
│   ├── quantonlabs-logo.png
│   └── quantonlabs-logo-reverse.png
└── README.md               # This file
```

## Setup Instructions

### 1. Add Logo Files

Create an `images` folder and add your logo files:
- `quantonlabs-logo.png` (primary logo for navigation - light version)
- `quantonlabs-logo-reverse.png` (footer logo - reverse/white version)

You have these files in your project directory:
- Primary: `quantonlabslogoprimary.png`
- Reverse: `quantonlabslogoreverse.png`

**Action Required:**
1. Create folder: `images`
2. Copy `quantonlabslogoprimary.png` → rename to `quantonlabs-logo.png`
3. Copy `quantonlabslogoreverse.png` → rename to `quantonlabs-logo-reverse.png`

### 2. Upload to GitHub

1. Navigate to your `quantonlabs-website` repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop ALL files (maintaining folder structure):
   - `index.html`
   - `css/styles.css`
   - `js/scripts.js`
   - `images/quantonlabs-logo.png`
   - `images/quantonlabs-logo-reverse.png`
   - `README.md`
4. Commit with message: "Initial website deployment"

### 3. Connect to Vercel

Follow the Vercel deployment guide provided separately.

## Website Features

### Design Elements
- **Brand Colors**: Deep navy (#041227), medium blue (#31769e), ice white (#F3F3F3)
- **Typography**: Manrope font family (300-700 weights)
- **Responsive**: Mobile-first design with breakpoints at 1024px, 768px, 480px

### Sections
1. **Hero**: Value proposition with three key stats
2. **Problem**: Three pain points (Operational Chaos, Financial Instability, Growth Ceiling)
3. **Solution**: Growth OS framework explanation
4. **Architecture**: Seven operational layers
5. **AI Agents**: Three-tier architecture (Launch, Elevate, Command)
6. **Differentiation**: Competitive positioning vs COOs, integrators, automation agencies
7. **CTA**: Contact section
8. **Footer**: Navigation and branding

### Interactive Features
- Smooth scroll navigation
- Scroll-triggered animations
- Card hover parallax effects
- Animated statistics counters
- Loading screen on page load
- Responsive navigation
- Event tracking (ready for Google Analytics)

## Customization

### Update Contact Email
In `index.html`, line 288:
```html
<a href="mailto:info@quantonlabs.com" class="btn-primary large">Schedule Assessment</a>
```
Change email address if needed.

### Add Google Analytics
Add your Google Analytics tracking code in `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Add Favicon
Create favicon and add to `index.html` in `<head>` section:
```html
<link rel="icon" type="image/png" href="images/favicon.png">
```

## Technical Notes

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Performance
- Lazy loading for images
- Debounced scroll events
- Intersection Observer for animations
- Minimal JavaScript dependencies

### Dependencies
- **Font**: Manrope from Google Fonts (loaded via CDN)
- **Icons**: SVG inline code (no external library required)

## Future Enhancements

Consider adding:
1. Contact form with backend integration
2. Blog section for thought leadership content
3. Case studies page
4. Client testimonials
5. Implementation timeline visualizer
6. Interactive Growth OS configurator

## Support

For questions about deployment or customization:
- Review the Vercel Deployment Guide
- Check GitHub documentation at github.com/docs
- Review Vercel documentation at vercel.com/docs

---

**Quanton Labs** | The Architecture of Intelligent Business