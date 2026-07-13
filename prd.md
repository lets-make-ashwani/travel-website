# Product Requirements Document (PRD)

## Project: Lumière Paris — Premium Travel Experiences Website

---

## 1. Executive Summary
Lumière Paris is a high-end travel booking landing page that curates premium experiences in Paris, France. The goal of the website is to capture the luxury, sophistication, and romance of Paris through a premium, state-of-the-art interactive scrolling web interface.

---

## 2. Key Product Features

### 2.1. Scroll-Driven Airplane Arrival Sequence
*   **Feature**: The website's background is an interactive, frame-by-frame 300 JPG visual sequence depicting a flight arrival scene over Paris.
*   **Behavior**: The frame sequence plays forward and backward in direct sync with the user's scroll depth, creating a movie-like interactive page transition.
*   **Canvas Drawing**: To maximize performance and limit layout thrashing, the background sequence is drawn onto an HTML5 Canvas using a high-performance easing loop.

### 2.2. Intelligent Asset Preloader
*   **Feature**: A preloader screen is displayed on initialization to guarantee all 300 image frames are cached.
*   **Behavior**: Displays a luxury "Lumière" loading card with a percentage load bar (`0%` to `100%`). The main page is revealed only after all frames have successfully loaded, avoiding flash of unstyled frames.

### 2.3. Glassmorphic User Interface (Premium Design System)
*   **Feature**: The entire visual UI uses curated, harmonize translucent colors, thin white borders, and heavy backdrop blurs to represent modern luxury glassmorphism.
*   **Components**:
    *   **Floating Navigation Capsule**: A centered header capsule containing links to navigation sections floating directly over the flight window view.
    *   **Itinerary Style Tab Selector**: Interactive widget card that switches between *Romantic*, *Culinary*, and *Culture* itineraries with quick click tab headers.
    *   **Signature Experiences Grid**: Category filters that sort cards (*Signature Tours*, *Cruises & Dining*, *Art & Culture*, *Excursions*) with detail modals for single selections.
    *   **Carousel Testimonials**: Twinkle-rated guest journals that auto-advance every 7 seconds, supporting manual click transitions.
    *   **Bespoke Inquiry Form**: Contact card with structured guest counts and dropdown interests.
    *   **Floating Glass Footer Card**: Redesigned as a floating capsule card (`bottom-6 w-[calc(100%-3rem)] max-w-7xl`) featuring transparent layouts (`bg-white/[0.02] backdrop-blur-xl border border-white/10`) to eliminate black block bars at the page bottom.

---

## 3. Performance & Optimization Specs

### 3.1. Zero-Rerender Scroll Listeners
*   **Problem**: In React, storing real-time scroll updates in state triggers full-page re-renders 60+ times a second, creating high UI lag and input block.
*   **Solution**: Scroll progress is tracked in a React `useRef` object (`scrollProgressRef`). Transitions and visibility states are modified directly on DOM elements using vanilla JS class list updates.
*   **Performance**: Renders smoothly at 60 FPS on standard modern browsers.

---

## 4. Technology Stack
*   **Core**: React 19 + TypeScript + Vite.
*   **Styling**: Tailwind CSS v4 (configured inside `src/index.css` via Vite plugin).
*   **Icons**: Inline lightweight SVGs.
*   **Hosting**: Vercel.

---

## 5. Build & Deployment Guidelines
1.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```
2.  **Run development server**:
    ```bash
    npm run dev
    ```
3.  **Compile production bundle**:
    ```bash
    npm run build
    ```
