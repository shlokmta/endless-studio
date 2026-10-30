# Endless Studio — website

Static site for [endless-studio.eu](https://www.endless-studio.eu), deployed on Vercel (clean URLs, see `vercel.json`).

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `grad-project.html` | The Grad Project |
| `graduation-studio.html` | Graduation Studio — Class of 2027 catalogue (purchase is code-locked) |
| `corporate.html` | Corporate Clothing |
| `about.html` | About |
| `contact.html` | Contact / enquiry form |

## Assets
- `assets/` — images, logo, hero video (`hero.mp4`), translations (`i18n.js`)
- `assets/studio/` — Graduation Studio product photos (hanger/flat + model shots)

Nav, ticker and footer are repeated in every page — change them in all six files.
To add a Graduation Studio product, add a block to the `products` list in `graduation-studio.html` and drop its photos in `assets/studio/`.

`_source/` holds raw photos, old versions and inspiration — it is git-ignored and not deployed.
