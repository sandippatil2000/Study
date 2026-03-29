# AdminPro – React TypeScript Dashboard Walkthrough

## What Was Built

A full **React 18 + TypeScript** admin dashboard scaffolded with Vite, using **Material UI v6**, React Router v6, and Recharts.

---

## Project Structure

```
src/
├── theme/theme.ts              # MUI red & white theme
├── types/auth.ts               # Auth TypeScript types
├── context/AuthContext.tsx     # Auth state + login/SSO/logout
├── components/
│   ├── ProtectedRoute.tsx      # Route guard
│   └── layout/
│       ├── Sidebar.tsx         # Collapsible nav sidebar
│       ├── Navbar.tsx          # Top bar with search & notifications
│       └── DashboardLayout.tsx # Layout wrapper
├── pages/
│   ├── LoginPage.tsx           # Login + SSO page
│   ├── DashboardPage.tsx       # Main dashboard
│   └── UsersPage.tsx           # Users management table
└── App.tsx                     # Router config
```

---

## Login Page

![Login Page](file:///C:/Users/Sandip/.gemini/antigravity/brain/10f4fe55-da39-49b9-b299-dac9d82315e2/login_page_1774623427421.png)

**Features:**
- Red gradient branding panel (left) with stats
- Email/password form with show/hide password toggle
- Remember me checkbox + Forgot password link
- SSO buttons: **Google**, **Microsoft**, **GitHub**
- Default credentials: `admin@example.com` / `password123`

---

## Dashboard

![Dashboard Page](file:///C:/Users/Sandip/.gemini/antigravity/brain/10f4fe55-da39-49b9-b299-dac9d82315e2/dashboard_page_1774623446082.png)

**Features:**
- **Sidebar**: Collapsible nav with red active-state highlight, nested menus
- **Navbar**: Search bar, notification badge, user profile dropdown
- **4 Stat Cards**: Total Users, Total Orders, Revenue, Growth Rate
- **Area Chart**: Monthly Revenue & Users
- **Donut Chart**: Traffic Sources (Direct, Social, Email, Other)
- **Bar Chart**: Daily Sales (weekly)
- **Orders Table**: Latest 5 orders with status badges
- **Top Countries**: Progress bar visualization

---

## Running the App

```bash
# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build
```

## Build Status
✅ `npm run build` passes with no errors (chunk size warning from bundled MUI is expected)
