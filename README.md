# Next Pixel

**Next Pixel** is a Game Search Engine that lets you find and save your favourite games!  
🌐 **Try it instantly:** 👉 [next-pixel-pi.vercel.app](https://next-pixel-pi.vercel.app) 👈

➡️ *No need to install anything locally—check out the hosted demo above to get started right away!*

---

## Features

- 🔎 **Search Games:** Quickly search for games using the [RAWG API](https://rawg.io/apidocs).
- 💾 **Save Favourites:** Mark games as favourites to keep them handy between sessions (stored locally).
- 🎮 **Game Details:** View details including images, release date, ratings, maturity, publishers, and supported platforms, all in a stylish modal.
- 🏷️ **Platform Badges:** Instantly see which platforms (e.g., PC, Nintendo) a game is available for.
- ⚡ **Modern UI:** Responsive and modern UI built using [Next.js](https://nextjs.org/) App Router, Tailwind CSS, and Radix UI components.

---

## Getting Started Locally

While you can use the live demo **without any setup**, you can also run Next Pixel on your machine:

### 1. Clone and install dependencies:

```bash
git clone https://github.com/ZashShadow/next-pixel.git
cd next-pixel
npm install
```

### 2. Add your RAWG API key

Create a `.env.local` file at the project root and add:

```
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key
```

### 3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Go to [http://localhost:3000](http://localhost:3000) to see the app.

---

## Technology Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, Radix UI
- **Icons:** Lucide-react
- **API:** [RAWG Video Games Database API](https://rawg.io/apidocs)
- **State & Hooks:** React (useState, useEffect)
- **Deployment:** [Vercel](https://vercel.com)

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [RAWG API Docs](https://rawg.io/apidocs)

---

## License

This project is for educational/personal use. Check the repository for license details.

---
Made with ❤️ by [ZashShadow](https://github.com/ZashShadow)
