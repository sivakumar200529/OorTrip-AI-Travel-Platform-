# 🛕 OorTrip AI

> **"Discover Tamil Nadu. Your Journey, Intelligently Planned."**  
> *A Next-Generation Digital Tourism Platform Connecting Tourists, Heritage Destinations, Local Artisans, and State Tourism Administration.*

---

## 🌟 0. Project Vision

**OorTrip AI** is a digital tourism platform built specifically for the diverse cultural, coastal, and architectural landscape of Tamil Nadu. Rather than offering generic booking forms or relying on heavy AR/VR headsets, OorTrip AI delivers a **cinematic 3D-style travel user experience** through layered depth, CSS perspective, smooth parallax, real-time crowd prediction, and multimodal regional AI intelligence.

### The Core Ecosystem
$$\text{Tourists} \longleftrightarrow \text{Destinations} \longleftrightarrow \text{Local Artisans} \longleftrightarrow \text{Tourism Administration}$$

---

## 🏆 Key Differentiators

1. **Layered 3D Travel UI (Zero Heavy 3D Models / No AR)**:
   - Subtle CSS 3D transforms, perspective stacking, and responsive mouse parallax.
   - Clean 2D interactive OpenStreetMap / Leaflet geographic engine with custom category markers.
2. **9-Parameter Intelligent Itinerary Generation**:
   - Starting City, Destination Corridor, Duration, Budget, Category Interests, Travel Group, Transport, Dietary Preferences (Pure Veg / Vegan / Jain / Mess), and Accessibility Needs.
3. **Dynamic AI Itinerary Adjustments**:
   - If a monument reports peak congestion (e.g., Mahabalipuram at midday), the AI dynamically suggests secluded historic gems (e.g., Sadras Dutch Fort) with instant 1-click recalculation.
4. **AI Heritage Storytelling & Voice Guide**:
   - Spoken audio narratives of Dravidian stone architecture, Chola maritime history, and Sangam literature without AR gimmicks.
5. **Direct Artisan & Cultural Marketplace**:
   - Direct connection to GI-certified Kanchipuram silk pit loom weavers, Thanjavur 22K gold foil painters, and Athangudi tile makers.
6. **Smart Budget Companion**:
   - Audited expense tracking against budget caps (₹5,000 baseline) with Recharts visual category breakdowns and proactive spend warnings.
7. **Gamified Digital Tourist Pass**:
   - Collect digital city stamps across all 38 Tamil Nadu districts, earn badges, and accumulate tourist eco-credits.
8. **1-Tap Safety SOS & Location Beacon**:
   - One-touch dispatch simulation integrated with official Tamil Nadu emergency helplines (Police 100, Ambulance 108, Tourist Helpline 1363).
9. **Tourism Administration Intelligence**:
   - Executive dashboard for TTDC with tourist footfall forecasts, crowd distribution heatmaps, and sentiment analysis.
10. **Multilingual Architecture**:
    - Full English & Tamil (தமிழ்) UI translation support, architected for Hindi, Telugu, Malayalam, and Kannada.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite, React Router v6, Lucide Icons, Recharts, Leaflet, Canvas Confetti |
| **Backend** | Node.js, Express REST APIs, TypeScript (`tsx`), CORS, JSON Web Tokens (JWT), Bcrypt.js |
| **Database & ORM** | PostgreSQL & SQLite support, Prisma ORM 5.22, High-Fidelity Seeder |
| **AI Layer** | Clean Modular AI Service (Google Gemini 1.5 Flash API + Regional Tamil Nadu Fallback Engine) |
| **Mapping** | Leaflet 2D OpenStreetMap with custom crowd-coded pins and preview drawers |

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
# From the project root (c:\Users\siva2\Downloads\oortrip-ai)
npm run install:all
```

### 3. Initialize Database (Prisma)
```bash
# Push Prisma schema to SQLite (or PostgreSQL)
npm --prefix server run prisma:push

# Seed authentic Tamil Nadu destinations & demo profiles
npm --prefix server run prisma:seed
```

### 4. Start Full-Stack Application
```bash
# Starts both Backend (Port 5000) and Frontend (Port 5173) concurrently
npm run dev
```

- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Environment Configuration

### Backend (`server/.env`)
```ini
PORT=5000
DATABASE_URL="file:./dev.db"
# For production PostgreSQL:
# DATABASE_URL="postgresql://username:password@localhost:5432/oortrip_db?schema=public"

JWT_SECRET="oortrip_super_secret_jwt_key_hackathon_2026_tn"

# Optional: Add your Google Gemini API key to enable live Gemini AI chat
GEMINI_API_KEY=""

NODE_ENV="development"
```

---

## 👥 1-Click Demo Profiles

The platform includes **Instant 1-Click Role Logins** for smooth hackathon judging:

| Role | Name | Credentials | Key Features |
|---|---|---|---|
| **Tourist** | Siva | Click `Tourist Demo` | AI Planner, Pass, Smart Budget, 3D Cards |
| **Local Business** | Meenakshi Chettinad | Click `Business Demo` | Manage Experiences, Bookings, Revenue Tracking |
| **Tourism Admin** | TTDC Admin | Click `Admin Demo` | State Tourism Analytics, Crowd Balancing |

---

## 🗺️ Complete Hackathon Demo Flow (Section 46)

1. **Step 1**: Open [http://localhost:5173](http://localhost:5173).
2. **Step 2**: Experience the cinematic 3D hero with mouse parallax and layered destination cards.
3. **Step 3**: Click **[ PLAN MY TRIP ]**.
4. **Step 4**: Enter your travel preferences:
   - Starting: *Chennai*
   - Days: *2*
   - Budget: *₹5,000*
   - Interests: *Heritage + Food*
   - Transport: *Car*
   - Food: *Vegetarian*
   - Accessibility: *Senior Friendly*
5. **Step 5**: Observe the 5-stage AI optimization animation sequence.
6. **Step 6**: Arrive at **"YOUR PERFECT TAMIL NADU JOURNEY IS READY"**.
7. **Step 7**: Explore layered Day 01 (*Chennai → Mahabalipuram*) & Day 02 (*Kanchipuram → Thanjavur*) cards.
8. **Step 8**: Test the **Dynamic AI Change Alert** (*Shore Temple crowd detected → Sadras Fort alternative*). Click **[ ACCEPT ]** to watch the timeline dynamically recalculate!
9. **Step 9**: Open **Smart Map** in the navbar to interact with 2D Leaflet pins across Tamil Nadu.
10. **Step 10**: Click Mahabalipuram to view crowd density indicators (**HIGH CROWD**) and best time to visit.
11. **Step 11**: Click **[ LISTEN TO GUIDE ]** to trigger the AI Heritage Audio Guide.
12. **Step 12**: Click the floating **OorTrip AI** button on the bottom right.
13. **Step 13**: Ask: *"What can I eat near Mahabalipuram?"* or tap the mic for voice simulation.
14. **Step 14**: Open **Smart Budget** to examine the ₹5,000 budget vs ₹3,420 spent vs ₹1,580 remaining breakdown with Recharts pie and bar graphs.
15. **Step 15**: Navigate to **Experiences** and view the *Chettinad Heritage Masterclass* or direct *Kanchipuram Silk Guild*.
16. **Step 16**: Open **Digital Tourist Pass** to view Siva's travel passport with collected city stamps and celebrate with confetti!
17. **Step 17**: Switch role to **Tourism Admin** via the top navbar dropdown or login page to inspect statewide crowd analytics, monthly tourist volume, and sentiment metrics.

---

## 📡 REST API Documentation

### Authentication
- `POST /api/auth/register` — Register a tourist, local business, or admin
- `POST /api/auth/login` — Login with email/password or demo accounts

### Destinations
- `GET /api/destinations` — Retrieve all 14 curated Tamil Nadu destinations
- `GET /api/destinations/:id` — Retrieve comprehensive details, crowd prediction & audio text

### Trips & Itineraries
- `POST /api/trips/generate` — Generate multi-day AI optimized itinerary
- `GET /api/trips` — Get user's saved trips
- `GET /api/trips/:id` — Get specific trip details

### AI Companion
- `POST /api/ai/chat` — Context-aware regional AI chat with Gemini fallback
- `POST /api/ai/recommend` — Fast recommendations based on GPS/district
- `POST /api/ai/itinerary` — Algorithmic route calculation

### Marketplace & Expenses
- `GET /api/experiences` — Retrieve active village tours and artisan masterclasses
- `POST /api/experiences` — List a new experience (Business portal)
- `GET /api/expenses` — Retrieve tourist trip expense audit
- `POST /api/expenses` — Log a new transaction

### Administration
- `GET /api/admin/analytics` — Statewide footfall, crowd dispersal, and sentiment metrics

---

## 🏛️ Covered Tamil Nadu Destinations (14 Hubs)
1. **Chennai** — *Gateway to South India & Cultural Capital*
2. **Mahabalipuram** — *Where history meets the sea*
3. **Kanchipuram** — *Golden City of a Thousand Temples & Silk*
4. **Pondicherry** — *French Colonial Coastal Promenade*
5. **Thanjavur** — *Imperial Throne of the Great Cholas*
6. **Trichy** — *Ancient Rock Fortress on the banks of Kaveri*
7. **Madurai** — *The Sleepless City of Jasmine and Pandyan Kings*
8. **Rameswaram** — *Sacred Island & Coastal Gateway to the Coral Seas*
9. **Kanyakumari** — *Where Three Oceans Meet at the Tip of India*
10. **Ooty** — *Queen of Hill Stations in the Blue Mountains*
11. **Kodaikanal** — *Princess of Hill Stations & Misty Lakes*
12. **Chettinad** — *Palaces of Teak, Athangudi Tiles & Legendary Spice*
13. **Coimbatore** — *Manchester of South India at the Western Ghats*
14. **Yercaud** — *The Jewel of the Shevaroy Hills*

---

## ⚖️ License
Built with ❤️ for Tamil Nadu Digital Tourism • MIT License.
