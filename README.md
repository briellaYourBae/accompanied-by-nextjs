# Portfolio Next.js

Portfolio website Next.js 15 dengan Tailwind CSS dan TypeScript.

## Setup

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Struktur

```
app/
  layout.tsx          # Root layout dengan font Inter & Syne
  page.tsx            # Main portfolio page (client component)
  globals.css         # Tailwind + custom CSS untuk animasi
public/
  IMG/
    foto_kamu-removebg-preview.png
    contoh_project1.jpg
    sertivikat1.jpg
    sertivikat2.jpg
```

## Fitur

- ✅ Custom cursor dengan hover effect
- ✅ Preloader animation
- ✅ Scroll reveal dengan IntersectionObserver
- ✅ Marquee infinite scroll
- ✅ Project hover effects (grayscale to color)
- ✅ Certificate lightbox
- ✅ Responsive design

## Catatan Teknis

- Font: Inter (body) & Syne (display) via next/font/google
- Efek unik (cursor, preloader, marquee, clip-path) di CSS kustom
- Layout & spacing menggunakan Tailwind utilities
- TypeScript strict mode enabled
- Semua animasi dari HTML source dipertahankan
