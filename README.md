# Bone Fracture Detection - Frontend

Modern Next.js frontend for bone fracture detection using YOLOv7.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your Hugging Face Space URL:
```
NEXT_PUBLIC_HF_API_URL=https://your-space.hf.space
```

4. Run development server:
```bash
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this code to GitHub
2. Import project in Vercel
3. Set environment variable: `NEXT_PUBLIC_HF_API_URL`
4. Deploy

## Features

- Drag & drop image upload
- Clipboard paste support (Ctrl+V)
- Adjustable confidence threshold
- Real-time detection results
- Side-by-side image comparison
- Responsive design
