# Chotu Bot

A highly interactive, friendly **WhatsApp and Telegram personal AI assistant** landing page.
Features a live chat sandbox, interactive tools, pricing plans, and quick-start guides.

> The chat sandbox runs entirely on a built-in, self-contained response engine — **no API key required**.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Configuration

All configuration is optional. Copy `.env.example` to `.env.local` to override defaults:

| Variable   | Default | Description                                           |
| ---------- | ------- | ----------------------------------------------------- |
| `PORT`     | `3000`  | Port the server listens on                            |
| `NODE_ENV` | —       | Set to `production` to serve the built `dist/` bundle |
