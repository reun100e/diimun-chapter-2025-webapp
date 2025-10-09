# Social Media Meta Tags Implementation

This document explains how custom link previews are implemented for each page of the DIIMUN 2025 website.

## Overview

The website uses a dual-layered approach for meta tags to ensure proper social media previews:

1. **Static HTML files** - Pre-generated HTML with custom meta tags for each route (for social media crawlers)
2. **Dynamic meta tags** - React components that update meta tags client-side (for SEO and user experience)

## How It Works

### 1. Static Meta Tags (For Social Media Crawlers)

Social media platforms like WhatsApp, Facebook, and Twitter don't execute JavaScript when crawling links. They only read the initial HTML. To solve this, we:

- Generate separate `index.html` files for each route with custom meta tags
- Use Vercel rewrites to serve the correct HTML based on the URL
- This ensures crawlers see the correct Open Graph and Twitter Card meta tags

**Generated routes:**
- `/registration-guide` - Registration guide with hero image
- `/schedule` - Event schedule with timeline
- `/awards` - Awards and prizes information
- `/who-committee-guidelines` - WHO committee details with specific image
- `/great-assembly-guidelines` - Great Assembly info with specific image
- `/ipc-guidelines` - International Press Corps guidelines with IPC image
- `/ipc-submission` - IPC submission portal
- `/terms` - Terms and conditions
- `/technology-policy` - Technology usage policy

### 2. Dynamic Meta Tags (For SEO & Client-Side)

For users navigating the SPA and search engines that execute JavaScript:

- `react-helmet-async` updates meta tags when pages change
- `SEO` component manages meta tags dynamically
- Meta configurations are centralized in `src/utils/metaConfig.js`

## File Structure

```
src/
├── components/
│   └── common/
│       └── SEO.jsx              # Dynamic meta tag component
├── utils/
│   └── metaConfig.js            # Meta tag configurations for all pages
└── App.jsx                      # Main app with SEO component

scripts/
└── generateMetaHTML.js          # Build script to generate static HTML

dist/
├── index.html                   # Home page
├── registration-guide/
│   └── index.html              # Registration guide with custom meta tags
├── schedule/
│   └── index.html              # Schedule page with custom meta tags
└── ...                         # Other routes
```

## Meta Tag Configuration

Edit `src/utils/metaConfig.js` to customize meta tags for each page:

```javascript
export const META_CONFIG = {
  'page-route': {
    title: 'Page Title - DIIMUN 2025',
    description: 'Page description for social media and SEO',
    image: '/images/page-image.webp',
    url: 'https://dna.aghosh.in/page-route',
    keywords: 'relevant, keywords, here'
  }
}
```

## Build Process

When you run `npm run build`:

1. **Vite builds** the React app into the `dist/` folder
2. **Post-build script** (`scripts/generateMetaHTML.js`) runs automatically
3. Script reads the built `dist/index.html` as a template
4. For each route in `META_CONFIG`, it:
   - Creates a new directory (e.g., `dist/schedule/`)
   - Copies the template HTML
   - Replaces meta tags with route-specific values
   - Saves as `index.html` in the route directory

## Vercel Configuration

`vercel.json` includes rewrites to serve the correct HTML:

```json
{
  "rewrites": [
    { "source": "/registration-guide", "destination": "/registration-guide/index.html" },
    { "source": "/schedule", "destination": "/schedule/index.html" },
    ...
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures:
- Direct links to routes serve the correct static HTML
- Social media crawlers get the right meta tags
- The SPA still works normally for users

## Testing Social Media Previews

Use these tools to test your link previews:

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **WhatsApp**: Send the link to yourself or use a testing tool

## Adding New Pages

To add a new page with custom meta tags:

1. Add route configuration to `src/utils/metaConfig.js`
2. Add rewrite rule to `vercel.json`
3. Run `npm run build` to generate the new HTML file
4. Deploy to Vercel

## Best Practices

1. **Images**: Use high-resolution images (1200x630px recommended for OG images)
2. **Descriptions**: Keep between 150-300 characters for best display
3. **Titles**: Keep under 60 characters to avoid truncation
4. **URLs**: Always use absolute URLs for images and links
5. **Testing**: Always test on multiple platforms before deploying

## Troubleshooting

### Link preview not updating
- Clear social media platform's cache using their debugging tools
- Verify the correct HTML is being served using curl:
  ```bash
  curl https://dna.aghosh.in/schedule | grep "og:title"
  ```

### Wrong image showing
- Check that the image path is correct in `metaConfig.js`
- Ensure images are in the `public/images/` folder
- Verify absolute URL includes domain name

### Changes not reflecting
- Make sure to rebuild: `npm run build`
- Check that `generateMetaHTML.js` ran successfully
- Verify deployment to Vercel completed

## Maintenance

- Update `META_CONFIG` when page content changes significantly
- Keep image references up to date
- Test link previews after major updates
- Monitor social media platform requirements for meta tag standards

---

**Last Updated**: October 2025
**Maintained By**: DNA Development Team

