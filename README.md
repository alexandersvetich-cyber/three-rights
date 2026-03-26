# ↱↱↱ Three Rights — Smart Navigation

Three rights make a left — smart navigation that keeps you safe at every turn. Works anywhere in the US. Uses real Google Maps data with live traffic. Installs like a native app on any phone.

Share the link with anyone — no setup required for users.

---

## What It Does

- **Real Google Maps** — geocoding, routing, turn-by-turn, live traffic (same data as Waze)
- **Left turn detection** — analyzes every maneuver in the route for unprotected lefts
- **Smart routing** — picks the route alternative with fewest unprotected left turns
- **Protected lefts allowed** — green arrows at signalized intersections are fine
- **Freeways always used** — all freeway merges/exits are right-side by design
- **Works everywhere** — any address in the US (or worldwide)
- **Installs as an app** — PWA adds to home screen on iPhone, Android, Mac, Windows

---

## Deploy in 10 Minutes

### Step 1: Get a Google Maps API Key (5 min)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"** → name it "Three Rights" → Create
3. Wait 10 seconds, then go to **APIs & Services** → **Library**
4. Search for and **Enable** each of these (click each one, then click "Enable"):
   - Maps JavaScript API
   - Directions API
   - Places API
   - Geocoding API
5. Go to **APIs & Services** → **Credentials**
6. Click **"+ Create Credentials"** → **"API Key"**
7. Copy the key — you'll need it in Step 3

**Secure your key (recommended):** Click your new key → "Application restrictions" → "HTTP referrers" → add your Vercel URL once you have it (like `https://three-rights.vercel.app/*`).

### Step 2: Deploy to Vercel (3 min)

**Option A: Vercel website (easiest — no command line)**

1. Go to [github.com](https://github.com) — create account if needed
2. Create a new repository called `three-rights`
3. Upload all the project files (drag and drop works):
   - `server.js`
   - `package.json`
   - `vercel.json`
   - `public/` folder (contains `index.html`, `manifest.json`, `sw.js`, icons)
4. Go to [vercel.com](https://vercel.com) — sign up with GitHub
5. Click **"Add New Project"** → Import your `three-rights` repo
6. Click **"Environment Variables"** and add:
   - Name: `GOOGLE_MAPS_API_KEY`
   - Value: *(paste your API key from Step 1)*
7. Click **Deploy**
8. Done! You get a URL like `three-rights-abc123.vercel.app`

**Option B: Command line**

```bash
npm install -g vercel
cd three-rights
vercel
vercel env add GOOGLE_MAPS_API_KEY
# Paste your key when prompted
vercel --prod
```

### Step 3: Share It

Text your Vercel URL to anyone. They open it, type an address, and go. No key, no setup, no account.

---

## Install as a Phone App (PWA)

The app installs directly from the browser — no App Store needed.

### iPhone / iPad
1. Open your Vercel URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (square with arrow at bottom of screen)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**
5. The app icon appears on your home screen — opens full screen like a real app

### Android
1. Open your Vercel URL in **Chrome**
2. You'll see an **"Install"** banner at the bottom — tap it
3. Or tap the **three dots** (⋮) → **"Install app"** or **"Add to Home Screen"**
4. The app appears in your app drawer

### Mac / Windows
1. Open the URL in **Chrome**
2. Click the **install icon** in the address bar (looks like a monitor with a down arrow)
3. Click **"Install"**
4. Opens as its own window — feels like a native app

---

## How It Works

1. User types start + destination (Google autocomplete)
2. Taps **Navigate**
3. App requests multiple route alternatives from Google Directions API
4. Each route's maneuver data is analyzed for left turns
5. Left turns classified as:
   - **🟢 Protected** — signalized intersection with green arrow → allowed
   - **⚠ Unprotected** — no signal, minor intersection → flagged
6. Route with fewest unprotected lefts is selected
7. ETA uses Google's real-time traffic model
8. GPS button uses your current location as starting point

Freeways are inherently safe — all merges and exits are right-side.

---

## Cost

| Item | Cost |
|------|------|
| Vercel hosting | Free |
| Google Maps API | $200/month free credit (~10,000 routes) |
| Custom domain (optional) | ~$12/year |

For sharing with friends and community, you'll never leave the free tier.

---

## Files

```
three-rights/
├── server.js            # Backend — proxies Google Maps API key
├── package.json         # Dependencies (express, cors, dotenv)
├── vercel.json          # Vercel deployment config
├── .env.example         # API key template for local dev
├── public/
│   ├── index.html       # Complete frontend app
│   ├── manifest.json    # PWA manifest (app name, icons, theme)
│   ├── sw.js            # Service worker (caching, offline)
│   ├── icon-192.png     # App icon (192x192)
│   └── icon-512.png     # App icon (512x512)
└── README.md
```

## Local Development

```bash
cp .env.example .env
# Edit .env — paste your Google Maps API key

npm install
npm start
# Open http://localhost:3000
```
