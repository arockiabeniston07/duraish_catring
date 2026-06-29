# 🍽️ Duraish Catering & Event Management — Production Website

> **A Premium Luxury Catering Website** built with React + Vite + Tailwind CSS + GSAP + Framer Motion + Lenis + Firebase.

---

## 🌐 Live Preview

Run locally:
```
npm install
npm run dev
```
Access: [http://localhost:5173](http://localhost:5173)
Admin: [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 📋 Prerequisites

| Requirement | Version |
|---|---|
| Node.js | v18+ (LTS recommended) |
| npm | v9+ |
| Firebase Project | Blaze or Spark plan |
| Firebase Services | Auth, Firestore, Storage |

---

## 🔥 Firebase Setup (Required)

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project** → name it `duraish-catering`
3. Disable Google Analytics (optional)

### 2. Enable Authentication
1. Firebase Console → **Authentication** → Get Started
2. Go to **Sign-in method** tab
3. Enable **Email/Password** provider
4. Click Save

### 3. Create Admin User
1. Authentication → Users → **Add user**
2. Email: `admin@duraishcatering.com` (or your choice)
3. Password: your secure password
4. **Save the email & password** — you'll use them to log in at `/admin`

### 4. Enable Firestore
1. Firebase Console → **Firestore Database** → Create database
2. Choose **Start in test mode** (for development)
3. Select your region → Done

### 5. Enable Storage
1. Firebase Console → **Storage** → Get Started
2. Start in test mode → Next → Done

> **Note:** For production, update Firestore & Storage security rules (see section below).

### 6. Get Firebase Config
1. Firebase Console → Project Settings → General
2. Scroll to **Your apps** → Register a Web App (`</>`)
3. Copy the `firebaseConfig` object values

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit `.env` to git.** It's already listed in `.gitignore`.

---

## 🚀 Installation & Running

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 🏗️ Project Structure

```
duraish-catering/
├── public/
│   ├── logo.jpeg          ← Brand logo (used everywhere)
│   ├── manifest.json      ← PWA manifest
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx   ← Luxury GSAP loading animation
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx            ← GSAP cinematic entrance
│   │   ├── About.jsx           ← Timeline + animated counters
│   │   ├── Gallery.jsx         ← Firestore images + lightbox
│   │   ├── Menu.jsx            ← Firestore menu + modal
│   │   ├── Reviews.jsx         ← Firestore reviews carousel
│   │   ├── FAQ.jsx
│   │   ├── Contact.jsx         ← Firestore bookings + WhatsApp
│   │   └── Footer.jsx
│   ├── admin/
│   │   ├── AdminLayout.jsx     ← Firebase Auth protected
│   │   ├── Dashboard.jsx       ← Live Firestore counts
│   │   ├── ManageMenu.jsx      ← Full CRUD on Firestore
│   │   ├── ManageGallery.jsx   ← CRUD + Firebase Storage upload
│   │   ├── Bookings.jsx        ← View/manage booking requests
│   │   ├── Reviews.jsx         ← Add/delete reviews
│   │   └── Settings.jsx        ← Contact info + password change
│   ├── contexts/
│   │   ├── AuthContext.jsx     ← Firebase Auth provider
│   │   └── useAuth.js          ← Auth hook (Fast Refresh compliant)
│   ├── firebase.js             ← Firebase init (auth, db, storage)
│   ├── App.jsx                 ← Router + Lenis + LoadingScreen
│   ├── index.css               ← Royal Purple/Gold luxury theme
│   └── main.jsx
├── index.html                  ← Full SEO meta tags
├── .env                        ← Firebase config (create this)
└── package.json
```

---

## 🔐 Admin Panel

### Login
Visit `/admin` → Enter Firebase email + password

### Features
| Section | Capability |
|---|---|
| Dashboard | Live counts from Firestore |
| Menu | Add / Edit / Delete menu items |
| Gallery | Add via URL **or** Upload file to Firebase Storage |
| Bookings | View booking requests, mark done, delete |
| Reviews | Add / Delete customer reviews |
| Settings | Update contact info · Change admin password |

### Change Admin Password
1. Log in to Admin Panel
2. Go to **Settings** → **Change Password**
3. Enter new password → Save
4. You'll need to re-login with the new password

---

## 🔒 Production Security Rules

### Firestore Rules (Firebase Console → Firestore → Rules)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for website data
    match /menu/{doc}        { allow read: if true; allow write: if request.auth != null; }
    match /gallery/{doc}     { allow read: if true; allow write: if request.auth != null; }
    match /reviews/{doc}     { allow read: if true; allow write: if request.auth != null; }
    match /settings/{doc}    { allow read: if true; allow write: if request.auth != null; }
    // Bookings: public write (form), admin read/delete
    match /bookings/{doc}    { allow create: if true; allow read, update, delete: if request.auth != null; }
  }
}
```

### Storage Rules (Firebase Console → Storage → Rules)
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🚀 Deployment

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```
> Add all `VITE_FIREBASE_*` variables in Vercel → Project → Settings → Environment Variables

### Deploy to Netlify
1. Build: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

---

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| `Firebase: Error (auth/invalid-credential)` | Wrong email/password. Reset via Firebase Console → Auth → Users |
| Gallery upload fails | Enable Firebase Storage in Console. Check Storage rules. |
| Firestore reads fail | Check security rules allow read. Test mode allows all reads for 30 days. |
| Build fails | Run `npm install` again. Check Node.js version (requires v18+) |
| Port 5173 already in use | `npm run dev -- --port 3000` |
| WhatsApp not opening | Ensure `https://wa.me/91XXXXXXXXXX` format with country code |
| Lenis scroll conflict | Don't use `scroll-behavior: smooth` in CSS alongside Lenis |

---

## 📞 Business Info

| | |
|---|---|
| **Phone / WhatsApp** | +91 88075 55909 |
| **Email** | iduraish@gmail.com |
| **Address** | 45, New Amma Park, Srinivasa Nagar, Podanur, Coimbatore – 641023 |
| **Hours** | Mon – Sun: 6:00 AM – 10:00 PM |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| Tailwind CSS | v4 | Styling |
| GSAP | 3 | Cinematic animations |
| Framer Motion | 12 | Micro-animations |
| Lenis | 1.3 | Smooth scroll |
| Firebase | 12 | Auth + Firestore + Storage |
| React Router | 7 | Routing |
| Lucide React | 1 | Icons |

---

*Built with ❤️ for Coimbatore's Finest Caterers — Duraish Catering & Event Management*
