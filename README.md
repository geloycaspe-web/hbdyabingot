# 💜 Purple Butterfly Interactive Scrapbook Website

A magical, mobile-first static interactive website inspired by the reference video, featuring an opening 3D envelope with a purple wax seal, vibrant multicolored butterflies fluttering in 3D space, an interactive handwritten letter on warm ivory paper, a Polaroid photo scrapbook with "Scratch me" reveal and full-screen lightbox, and a peaceful final scene with replay functionality.

---

## ✨ Features

1. 💌 **Scene 1 — The Envelope**:
   - Dreamy soft lavender background (`#F3E8FF`) with floating ambient sparkles.
   - Interactive 3D envelope with a purple wax seal and soft shadow.
   - "Tap to open" pulsing hint.
   - On tap: Wax seal breaks with a sparkle burst, top flap opens in 3D, letter slides out, and audio begins.

2. 🦋 **Scene 2 — Magical Multicolored Butterfly Reveal**:
   - Center eruption of over 28 vibrant, realistic butterflies.
   - **Original colors preserved**: Monarch orange with black venation and white dots, electric cyan/blue Morpho, rose pink swallowtail, emerald green, and golden yellow tiger swallowtails.
   - 3D wing-flapping physics across three depth layers (foreground, midground, background).
   - Interactive touch/cursor evasion (butterflies flutter away when touched).
   - Tapping the screen triggers a dramatic dispersal animation where butterflies part to reveal the letter.

3. 📜 **Scene 3 — Interactive Handwritten Letter**:
   - Warm ivory paper (`#FFFDF7`) with subtle ruled lines, vintage postage stamps, and postal marks.
   - Vintage cursive heading and readable serif typography in dark plum (`#4C1D95`).
   - Fully customizable letter text, recipient name, and sign-off.
   - "Explore Our Memories ➔" button leading to the scrapbook.

4. 📷 **Scene 4 — Polaroid Photo Scrapbook**:
   - Layered Polaroid photo cards with realistic drop shadows, tilted angles, washi tape, and cute stickers.
   - **Interactive "Scratch me" canvas**: Scratch with your finger/mouse or tap once to reveal the hidden photo with a sparkle burst!
   - Tapping any revealed photo opens an interactive high-resolution **Lightbox modal** with caption and moment tag.
   - Easily replaceable photo gallery.

5. 🌸 **Scene 5 — Final Scene**:
   - Soft purple floral dreamscape with a glowing centerpiece card.
   - Gently hovering butterflies and drifting purple petals.
   - "Replay Experience" button that resets all state and returns smoothly to Scene 1.

6. 🎶 **Audio System with Procedural Fallback**:
   - Plays `assets/audio/music.mp3` with animated equalizer waves.
   - **Built-in Web Audio API fallback**: Automatically generates a soothing music box lullaby if audio files are blocked by strict local browser security policies!

7. 📱 **Mobile-First & Fully Responsive**:
   - Perfectly formatted for 9:16 portrait mobile screens (320px to 430px wide, `100dvh`, safe area insets).
   - Centered mobile frame with ambient glowing aura for desktop screens.
   - Reduced-motion accessibility support (`prefers-reduced-motion`).

---

## 📂 Project Structure

```
purple-butterfly-scrapbook/
├── index.html              # Core HTML structure & customizable text
├── style.css               # Purple design tokens, 3D envelope & butterfly animations, polaroids
├── script.js               # 3D butterfly physics, scratch card engine, lightbox & audio controller
├── assets/
│   ├── images/             # Polaroid photos and decorative graphics
│   │   ├── photo1.svg      # Sunset walk
│   │   ├── photo2.svg      # Cozy cafe
│   │   ├── photo3.svg      # Roadtrip flowers
│   │   ├── photo4.svg      # Holding hands at dusk
│   │   ├── photo5.svg      # Stargazing night
│   │   └── photo6.svg      # Butterfly garden
│   └── audio/
│       └── music.mp3       # Background music track
└── README.md               # User guide & customization instructions
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Option 2: Local HTTP Server (Recommended)
To run with local streaming:
```powershell
cd "C:\Users\Mico Angelo\.gemini\antigravity\scratch\purple-butterfly-scrapbook"
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## ✏️ How to Customize

### 1. Change the Letter Message
Open `index.html` and look for the section labeled `CUSTOMIZABLE LETTER CONTENT`:
```html
<!-- Recipient Salutation -->
<h1 class="letter-heading" id="letterGreeting">My Dearest,</h1>

<!-- Letter Body -->
<div class="letter-body" id="letterBody">
  <p>Your custom message here...</p>
</div>

<!-- Sign-off -->
<p class="signature-name" id="letterSignOff">Forever &amp; Always 💜</p>
```

### 2. Replace the Polaroid Photographs
1. Save your photos as JPG or PNG into `assets/images/` (e.g., `myphoto1.jpg`, `myphoto2.jpg`).
2. Open `index.html`, find `CUSTOMIZABLE POLAROID PHOTO GALLERY`, and update the `src`, `data-caption`, and `data-date`:
```html
<article class="polaroid-card tilt-left" data-caption="Our Beach Trip" data-date="July 2026">
  <div class="polaroid-photo-box">
    <img class="polaroid-img" src="assets/images/myphoto1.jpg" alt="Our Beach Trip">
    <canvas class="scratch-canvas"></canvas>
    ...
  </div>
  <p class="polaroid-caption">Our Beach Trip</p>
</article>
```

### 3. Change Background Music
Replace `assets/audio/music.mp3` with any MP3 song of your choice!

### 4. Deploy to GitHub Pages or Hostinger
- **GitHub Pages**: Upload the contents of this folder to a GitHub repository, go to **Settings > Pages**, choose `main` branch `/root`, and click Save.
- **Hostinger**: Upload all files to your `public_html` folder using File Manager or FTP. All paths are relative, so it works instantly!

