# Purva Ocean Adventures — Fullstack Workspace

This project is divided into two distinct, dedicated folders:

```
POA/
├── frontend/    # Next.js Fullstack Web Application (Port 3000)
└── backend/     # Express API & Content Management Server (Port 5000)
```

---

## 1. Frontend (`/frontend`)
* **Technology**: Next.js 15 (App Router), React 19, Tailwind CSS, TypeScript.
* **Public Website**:
  - Home (`/`)
  - Our Trips (`/trips` & `/trips/[slug]`)
  - Dive Certifications (`/courses` & `/courses/[slug]`)
  - Ocean Gallery (`/gallery`)
  - About (`/about`)
  - Instagram Reels (`/instagram`)
  - FAQ (`/faq`)
  - Contact & Bookings (`/contact`)
* **Admin Control Portal**:
  - Dashboard Overview: `http://localhost:3000/admin`
  - Sign-in: `http://localhost:3000/admin/sign-in`
  - Modules: Trips, Courses, Gallery, FAQs, Story, Instagram, Settings, Media Library, Inquiries, User Management.
  - **Live Dynamic Binding**: Every section dynamically renders updates made from the Admin panel!
  - **Image Uploading**: Built-in 1-click photo upload directly from your computer.

### Running Frontend:
```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:3000
```

---

## 2. Backend (`/backend`)
* **Technology**: Node.js, Express, Multer, CORS.
* **Capabilities**:
  - File upload engine with automatic synchronization to frontend `/media`.
  - JSON Content Store (`site-content.json`, `admin-users.json`, `enquiries.json`).
  - Google Sheets Webhook integration for real-time inquiry sync (`purvaoceanadventures@gmail.com`).
  - REST API Endpoints:
    - `GET  /api/health`
    - `POST /api/upload`
    - `GET  /api/content`
    - `POST /api/content`
    - `POST /api/auth/sign-in`
    - `GET  /api/enquiries`
    - `POST /api/enquiries`

### Running Backend:
```bash
cd backend
npm install
npm start
# Running at http://localhost:5000
```

