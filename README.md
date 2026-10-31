# Anil Yarlagadda – Portfolio

Static site: `index.html`, `style.css`, `script.js`, `robots.txt`, `sitemap.xml`, `favicon.ico`, `404.html`, `assets/`.

## 1. Edit before publishing
1. Replace `https://YOUR-DOMAIN.com` in `index.html`, `robots.txt`, `sitemap.xml` with your real URL.
2. Replace `YOUR-LINKEDIN` (index.html, 3 places) with your LinkedIn handle.
3. Replace `assets/anil-yarlagadda-profile.webp` with your real photo (WebP, about 600x720). The current file is a placeholder.
4. Fill project demo/GitHub links (`#`), certificate links, and the Student Management System card (it is not in your resumes).
5. Contact form: create a free form at formspree.io, copy the form ID, replace `YOUR_FORM_ID` in `index.html`. Until then the form opens the visitor's email app.
6. Remove skills you cannot discuss (C++, Off-Page SEO, Google Ads are in the brief but not in your resumes).

## 2. Deploy
**GitHub:** create a repo, upload all files (or `git init && git add . && git commit -m "Initial" && git remote add origin <url> && git push -u origin main`).

**GitHub Pages:** Settings > Pages > Source: Deploy from branch > main / root. Custom domain: add it under Pages, create a CNAME record to `<username>.github.io`, tick Enforce HTTPS.

**Vercel:** vercel.com > Add New Project > import the GitHub repo > Framework: Other > Deploy. Domain: Project > Settings > Domains > Add, then set the DNS records Vercel shows. HTTPS is issued automatically.

**Netlify:** app.netlify.com > Add new site > Import from Git > pick repo > no build command, publish directory `.` > Deploy. Domain: Domain management > Add custom domain > follow DNS steps. HTTPS: Domain management > HTTPS > Verify DNS / Provision certificate.

## 3. Google and Bing tools
- **Search Console:** search.google.com/search-console > Add property (URL prefix) > HTML tag method > paste the meta tag in `<head>` (placeholder comment in index.html) > redeploy > Verify > Sitemaps > submit `sitemap.xml`. Use URL Inspection > Request indexing for the home page.
- **GA4:** analytics.google.com > create property > Web data stream > copy `G-XXXXXXXXXX` > uncomment the GA block in `index.html` and replace the ID.
- **Tag Manager (optional):** create a container and paste its two snippets; then manage GA4 from GTM instead of the direct tag (do not use both).
- **PageSpeed Insights:** pagespeed.web.dev > enter the live URL > run Mobile and Desktop. Record real scores yourself; none are claimed here.
- **Bing Webmaster Tools:** bing.com/webmasters > import from Search Console, or add the site and the `msvalidate.01` meta tag > submit sitemap.

## 4. SEO checklist
- [x] Semantic HTML5, one H1, ordered H2/H3
- [x] Unique title and meta description
- [x] Canonical, Open Graph, Twitter Card
- [x] JSON-LD: WebSite, ProfilePage, Person, BreadcrumbList
- [x] robots.txt, sitemap.xml, 404.html (noindex)
- [x] Alt text, lazy-friendly small assets, WebP profile image, deferred Font Awesome
- [x] Keyboard focus styles, skip link, labelled form fields, reduced-motion support
- [ ] Replace placeholder domain, photo, LinkedIn, project links
- [ ] Verify in Search Console, submit sitemap
- [ ] Test with Rich Results Test and PageSpeed Insights
- [ ] Update `lastmod` in sitemap.xml when you change content

## 5. Verify
1. Open the live site on mobile and desktop; test both themes, menu and form.
2. Rich Results Test (search.google.com/test/rich-results) and validator.schema.org: paste the URL.
3. Search Console > URL Inspection > "Test live URL", then check Pages and Sitemaps reports after a few days.
4. PageSpeed Insights: aim for 90+, then fix whatever it flags. Only publish scores you measured.
