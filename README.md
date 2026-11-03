# Fold & Fly

A small, responsive paper airplane field guide. Select one of six designs for illustrated, step-by-step instructions using A4 or US Letter paper.

Includes difficulty filters, step navigation, printable guides, launch advice, and completed-plane markers saved in your browser. No account, dependencies, build step, or backend required.

## Preview locally

Run `python3 -m http.server 8000` from this directory, then visit http://localhost:8000.

## GitHub Pages

In this repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then **main** and **/ (root)**. Click **Save**. GitHub will show the published URL when deployment finishes.

The site uses relative asset paths and hash navigation, so it works in a GitHub Pages project subdirectory. Google Fonts is optional; system fonts are used when unavailable.

## Files

- `index.html`: collection and page shell
- `style.css`: responsive design and print styles
- `app.js`: six folding guides, SVG illustrations, and browser interactions

The folding diagrams are simplified. Written instructions describe placement and measurements. Flight behavior varies with paper, symmetry, launch, and adjustments.
