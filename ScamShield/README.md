# ScamShield 🛡️

ScamShield is a modern, high-performance web application designed to educate and protect users against the rising threat of digital fraud. It combines real-time threat analysis tools with an interactive educational platform.

## 🚀 Key Features

### 1. Interactive Learn Module

- **Visual Data**: A custom-built SVG Interactive Chart visualizes the breakdown of cybercrimes (Phishing, UPI Fraud, Investment Scams, etc.).
- **Smart Overlay**: Features a glass-morphism overlay that provides detailed tactics and prevention tips for each scam category.
- **Data-Driven**: Displays real-time statistics on fraud volume, value, and risk concentration.

### 2. Branding & UI

- **Premium Aesthetics**: Built with a "Glassmorphism" design system (blur effects, translucent layers) and a dynamic particle background.
- **SAS Integration**: Features a specialized "Black Box" showcase on the Home page highlighting security partnerships.
- **Responsive**: Fully optimized for Desktop and Mobile/PWA experiences.

### 3. Cyber Safety Tools

- **Quick Scan**: Simulates scanning links and messages for phishing indicators.
- **Database**: A searchable repository of known scammer identifiers.

## 🛠️ Technical Architecture

ScamShield is built as a **Single Page Application (SPA)** using pure Vanilla standards. It requires **no node_modules** and **no build step**.

- **Frontend**: HTML5, CSS3 (Variables + Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Routing**: Custom Client-Side Router (`router.js`) handling navigation without page reloads.
- **Server**: A lightweight, dependency-free PowerShell script (`server.ps1`) that serves the app and handles SPA routing logic (fallback to index.html).
- **Performance**: Optimized asset loading with a custom boot sequence (`app.js`) to ensure smooth entry animations.

## 📥 How to Run

1.  **Open the Folder**: Navigate to the `ScamShield` folder.
2.  **Start the Server**:
    - Right-click `server.ps1` and select "Run with PowerShell".
    - _Alternatively_, open a terminal and run: `powershell -ExecutionPolicy Bypass -File server.ps1`
3.  **Launch**: Open your browser and go to `http://localhost:3000`.

## 📂 Project Structure

```
ScamShield/
├── components/         # Reusable UI elements (Navbar, Charts, Toast)
├── js/                # Core logic (Router, Utilities, Particle System)
├── pages/             # Page-specific request handlers (Home, Learn, Dashboard)
├── assets/            # Images and Icons
├── styles.css         # Global Design System
├── app.js             # Main Entry Point & Boot Loader
├── server.ps1         # Local Web Server
└── index.html         # SPA Root
```

---

_Built for performance, security, and user experience._
