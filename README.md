# Purrfect — Pet Adoption Demo

This is a responsive, animated pet adoption demo built with plain HTML, CSS, and JavaScript — created as a showcase project.

Features
- Responsive layout with mobile menu
- Search, filter, sort pets
- Favorites (persisted in localStorage)
- Cart (Adoption cart) with persistence in localStorage
- Modal Checkout form (simulated) and saving adoptions to "Past Adoptions"
- Export past adoptions as JSON
- Smooth animations powered by GSAP (optional)
- Accessibility improvements: skip link, focus-visible, keyboard/ESC handling, ARIA roles

Run locally
1. Open `index.html` in a browser (or use a static server). Example using VS Code Live Server extension or Python:

   - Python 3 server:
     ```bash
     python3 -m http.server 5500
     # then open http://localhost:5500/index.html
     ```

2. Interact with the site: search, favorite, add pets to cart, checkout.

Deployment (GitHub Pages)
1. Create a GitHub repository and push the project.
2. In repository settings, enable GitHub Pages and set the branch to `main` and folder to `/ (root)`.
3. After a few minutes, the site will be available at `https://<username>.github.io/<repo>`.

Notes
- Images are stored in `img/` — you may replace them with optimized assets.
- This project uses no real payments; the checkout simulates adoption submissions and stores orders locally.

If you'd like, I can also:
- Prepare a minimal `index.html` screenshot and a short demo GIF for the README
- Add unit tests or simple Cypress end-to-end tests
- Set up GitHub Pages automatically and provide the live URL

---
Deployment instructions

1. Create a GitHub repository and push this project to the `main` branch.
2. Enable GitHub Pages in repository settings or use the included Actions workflow. The repository will deploy automatically on push to `main` using the workflow in `.github/workflows/pages.yml`.

Notes about Actions:
- The workflow uploads the repository contents as the artifact and deploys to GitHub Pages. No build is needed (static site).
- After a successful run, the pages site will be available at `https://<username>.github.io/<repo>` (may take a minute).

Created for showcasing frontend development and UI/UX skills.