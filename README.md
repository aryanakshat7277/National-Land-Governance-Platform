# 🇮🇳 Bhoomi-Samvaad: National Digital Platform for Evidence-Based Land Governance

[![Smart India Hackathon](https://img.shields.io/badge/Smart%20India%20Hackathon-SIH26019-orange.svg)](https://sih.gov.in)
[![Ministry of Rural Development](https://img.shields.io/badge/Ministry-Rural%20Development%20(MoRD)-1A5276.svg)](https://rural.nic.in)
[![Department of Land Resources](https://img.shields.io/badge/Department-Land%20Resources%20(DoLR)-1E8449.svg)](https://dolr.gov.in)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)

> **Problem Statement ID:** SIH26019  
> **Problem Title:** National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance  
> **Organization:** Ministry of Rural Development · Department of Land Resources (DoLR)  
> **Department:** Ministry of Education's Innovation Cell (MIC)  
> **Category:** Software / Smart Automation  

---

## 🏛️ Executive Summary

Land is a finite, strategic resource underpinning economic growth, food security, environmental sustainability, and social equity in India. While massive national datasets are generated through the **Digital India Land Records Modernization Programme (DILRMP)**, **SVAMITVA** drone surveys, and satellite remote sensing, land administration has historically remained implementation-oriented with limited institutional focus on applied research, ex-ante policy experimentation, and econometric evidence.

**Bhoomi-Samvaad** is an AI-enabled, secure, and scalable national platform that integrates multi-departmental land datasets, satellite remote sensing, cadastral drone photogrammetry, econometric policy simulators, and academic research workspaces into a unified knowledge ecosystem.

---

## 🚀 Key Modules & Capabilities

```
+---------------------------------------------------------------------------------------+
|                                    BHOOMI-SAMVAAD                                     |
|                   National Land Governance Digital Platform (SIH26019)                |
+---------------------------------------------------------------------------------------+
        |                     |                       |                     |
+---------------+     +---------------+       +---------------+     +---------------+
|  Cadastral    |     |  Policy       |       |  Digital      |     |  Decision     |
|  WebGIS Hub   |     |  Simulation   |       |  Repository   |     |  Analytics    |
| • Bhu-Aadhaar |     | • Multi-param |       | • AI Summaries|     | • DILRMP KPIs |
| • Khasra RTK  |     | • Econometrics|       | • Citations   |     | • Dispute rate|
| • 1930 Shajra |     | • Fiscal ROI  |       | • Drag & Drop |     | • Custom SQL  |
+---------------+     +---------------+       +---------------+     +---------------+
        |                     |                       |                     |
+---------------+     +---------------+       +---------------+     +---------------+
| Collaboration |     | Innovation    |       | Domain AI     |     | Single Sign-On|
| • Workspaces  |     | • Hackathons  |       | • Bhu-Aadhaar |     | • Role-based  |
| • Live Chat   |     | • Grant Pool  |       | • Zero-API key|     | • DigiLocker  |
| • Working Grp |     | • Leaderboard |       | • High Speed  |     | • SVAMITVA    |
+---------------+     +---------------+       +---------------+     +---------------+
```

### 1. 🗺️ Professional Cadastral WebGIS Studio
- **14-Digit Bhu-Aadhaar (ULPIN) Search:** Real-time lookup with autocomplete for Unique Land Parcel Identification Numbers (e.g. `UP-28-LKO-4091-8842`) and administrative revenue villages with smooth animated navigation.
- **Multi-Basemap Engine:** High-resolution ESRI World Imagery Satellite Hybrid, Survey Cadastral Base (OSM), and Topographic Contours with 0 external API key dependencies.
- **Vector Cadastral Khasra Parcels:** High-precision polygon parcels color-coded by legal tenure status (Clear Title, KCC Bank Mortgage, Revenue Dispute, Gram Sabha Commons).
- **Comprehensive Parcel Dossier:** Slide-in audit drawer displaying ULPIN, metric area ($m^2$, Hectares, Bigha), encumbrance certificate verification, and Soil Health Card telemetry.
- **Historic Shajra vs. 2024 Drone RTK Swipe Tool:** Split-screen slider comparing British/pre-independence 1930s cloth maps (Shajra) against modern 5cm-accurate drone photogrammetry.
- **Cartographic Instrumentation:** True North compass rose (`TN 0.4° E`), dynamic graphic scale bar (1:2,500 cadastral village scale up to 1:2,500,000 national scale), and live WGS-84 coordinate streaming.

### 2. ⚡ Policy Simulation Sandbox
- **Ex-Ante Econometric Modeling:** Parameterized policy sliders adjusting digitization targets, revenue court fast-track capacity, stamp duty rationalization, and agro-ecological buffer zones.
- **Projected Outcome Radar:** Real-time recalculation of dispute caseload trajectory (2025–2030), farmer credit access unlocked, and state stamp duty revenue.
- **Executive Policy Memorandum Export:** Direct generation and download of formatted policy briefs for MoRD / NITI Aayog review.

### 3. 📚 Digital Research & Case Law Repository
- **5,000+ Verified Records:** Acts, DILRMP evaluation studies, Supreme Court & High Court land precedents, and spatial datasets.
- **Automated AI Summarizer:** Multi-bullet executive briefing engine summarizing 50+ page policy papers in seconds.
- **Citation Generator:** Instant copyable citations in APA 7th, MLA 9th, Chicago 17th, and BibTeX.
- **Self-Service Upload & OCR Verification:** Drag-and-drop submission modal with instant metadata extraction and indexing.

### 4. 📊 Decision Analytics & Support
- **National DILRMP Monitoring:** Interactive state-by-state progress tracking covering 6.08 lakh villages.
- **Revenue Litigation Pendency:** High Court and District Revenue Court backlog density metrics.
- **Custom SQL & Natural Language Data Lake Console:** Instant execution of queries against national land databases with CSV export.
- **Report Builder:** Custom indicator compiler with instant report download.

### 5. 🤝 Multi-Institutional Collaboration Hub
- Dedicated research workspaces for premier institutions (IIT Delhi, IIT Bombay, TERI, ISI Kolkata, NLU Delhi, CEPT University).
- Live discussion streams, shared GIS layers, and ground-truthing drone flight logs.

### 6. 💡 Innovation Portal & Grants
- National Hackathon management supporting student and startup challenges.
- Grant funding management for ICSSR, DST, and MoTA research fellowships (₹2.1 Cr challenge pool).
- Application receipt generation with official registration IDs (`#LG-XXXX`).

### 7. 🤖 Domain-Specific AI Assistant
- Context-aware chatbot trained on Indian land statutes (Land Acquisition Act 2013, Forest Rights Act 2006, SVAMITVA, DILRMP).
- Zero external API dependency — 100% reliable, deterministic, and instant responses.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6 |
| **UI & Styling** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **Animation & Micro-interactions** | Framer Motion 13 |
| **Geospatial & WebGIS** | Leaflet 1.9, React-Leaflet 5, GeoJSON (WGS-84 Datum) |
| **Data Visualization & Charts** | Recharts 3.10 (Radar, Bar, Line, Area sparklines) |
| **Icons & Visual Assets** | Lucide React, Custom SVG Indian Emblems |
| **Notifications & Toasts** | React Hot Toast |
| **Design System** | Executive Government Light Theme (`#FFFFFF`, `#F8FAFC`, `#1A5276`, `#F39C12`, `#1E8449`) |

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/aryanakshat7277/National-Land-Governance-Platform.git
cd National-Land-Governance-Platform

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# The platform will launch at http://localhost:3000
```

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 👥 Contributors & Institutional Attribution

Developed under the **Smart India Hackathon 2024** for the **Ministry of Rural Development (MoRD)**, Government of India.

* **Department of Land Resources (DoLR)**, Ministry of Rural Development, New Delhi
* **Ministry of Education's Innovation Cell (MIC)**, AICTE, New Delhi
* **National Informatics Centre (NIC)** Land Records Division
* **Survey of India**, Dehradun

---

*🇮🇳 Dedicated to transparent, accountable, and evidence-based land governance for Viksit Bharat 2047.*
