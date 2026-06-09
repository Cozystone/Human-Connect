# Human Connect

Human Connect is a browser-based 3D social lounge prototype where people with matching interests can enter anonymously, move through focused rooms, join topic tables, and start a more intentional one-to-one conversation.

## MVP Prototype

- Next.js App Router
- React Three Fiber lounge scene
- WASD movement with third-person camera
- Startup, developer, and design lounge presets
- Topic table seating, 1:1 private pod, profile cards, and moderation actions as local interactive flows
- Mock presence and conversation state ready to be replaced by Colyseus and LiveKit

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
vercel --prod
```
