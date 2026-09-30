/**
 * ============================================================================
 * PURPLE BUTTERFLY INTERACTIVE SCRAPBOOK — JAVASCRIPT ENGINE
 * Mobile-First, Cinematic Transitions, 3D Multicolored Butterflies,
 * Scratch-to-Reveal Scrapbook, Lightbox Modal, and Procedural Audio Fallback.
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURATION & CUSTOMIZATION SETTINGS
  // ==========================================================================
  const CONFIG = {
    // Butterfly Swarm Settings
    butterflyCount: 28,        // Number of multicolored butterflies in Scene 2
    ambientButterflyCount: 6,  // Subtle resting/floating butterflies in other scenes
    flapSpeedMin: 0.18,        // Fastest wing flap in seconds
    flapSpeedMax: 0.36,        // Slowest wing flap in seconds
    
    // Scratch Card Sensitivity
    scratchThreshold: 0.35,    // Reveal full photo when 35% is scratched
    scratchBrushRadius: 24,    // Brush size for touch/mouse scratch

    // Ambient Particles (Petals & Sparkles)
    petalCount: 20,
    sparkleCount: 25,

    // Audio
    bgMusicVolume: 0.55
  };

  // ==========================================================================
  // 2. MULTICOLORED BUTTERFLY WING PALETTES (Strictly Preserving Original Colors)
  // Blue, Pink, Orange/Monarch, Emerald Green, Golden Yellow, and Lilac Shimmer
  // ==========================================================================
  const BUTTERFLY_SPECIES = [
    {
      id: 'monarch-orange',
      name: 'Monarch',
      gradStart: '#FF8800',
      gradMid: '#FF5400',
      gradEnd: '#FF3838',
      accentColor: '#FFFFFF',
      edgeColor: '#171717',
      veinColor: '#1C1917',
      spots: true
    },
    {
      id: 'morpho-blue',
      name: 'Blue Morpho',
      gradStart: '#00F0FF',
      gradMid: '#0072FF',
      gradEnd: '#00186B',
      accentColor: '#E0F7FA',
      edgeColor: '#0A0E1A',
      veinColor: '#0F172A',
      spots: true
    },
    {
      id: 'rose-blossom',
      name: 'Cherry Blossom Swallowtail',
      gradStart: '#FFCCD5',
      gradMid: '#FF4D6D',
      gradEnd: '#C9184A',
      accentColor: '#FFF0F3',
      edgeColor: '#590D22',
      veinColor: '#800F2F',
      spots: true
    },
    {
      id: 'emerald-papilio',
      name: 'Emerald Papilio',
      gradStart: '#A7F3D0',
      gradMid: '#10B981',
      gradEnd: '#047857',
      accentColor: '#D1FAE5',
      edgeColor: '#064E3B',
      veinColor: '#065F46',
      spots: true
    },
    {
      id: 'swallowtail-gold',
      name: 'Golden Tiger Swallowtail',
      gradStart: '#FEF08A',
      gradMid: '#F59E0B',
      gradEnd: '#D97706',
      accentColor: '#FEF9C3',
      edgeColor: '#18181B',
      veinColor: '#27272A',
      spots: true
    },
    {
      id: 'lilac-peach-shimmer',
      name: 'Pastel Lilac & Peach',
      gradStart: '#E9D5FF',
      gradMid: '#C084FC',
      gradEnd: '#9333EA',
      accentColor: '#FFEDD5',
      edgeColor: '#4C1D95',
      veinColor: '#581C87',
      spots: true
    }
  ];

  // Helper to generate realistic detailed vector butterfly SVG
  function createButterflySVG(species, uniqueId) {
    const s = species;
    return `
      <div class="butterfly-wings-wrapper">
        <!-- Left Wing -->
        <svg class="wing wing-left" viewBox="0 0 50 65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-l-${uniqueId}" x1="100%" y1="20%" x2="0%" y2="80%">
              <stop offset="0%" stop-color="${s.gradStart}" />
              <stop offset="55%" stop-color="${s.gradMid}" />
              <stop offset="100%" stop-color="${s.gradEnd}" />
            </linearGradient>
            <filter id="glow-l-${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="${s.gradEnd}" flood-opacity="0.3"/>
            </filter>
          </defs>
          <!-- Outer Wing Margin -->
          <path d="M48 30 C45 10 32 0 16 2 C4 4 1 14 3 24 C5 34 16 42 22 45 C15 48 8 52 12 59 C16 64 28 65 38 52 C44 45 48 38 48 30 Z"
                fill="${s.edgeColor}" filter="url(#glow-l-${uniqueId})" />
          <!-- Inner Colorful Wing Leaf -->
          <path d="M46 30 C43 13 32 4 18 6 C8 8 6 16 8 24 C10 32 20 39 26 42 C20 45 14 49 17 55 C20 59 30 59 37 49 C42 42 46 36 46 30 Z"
                fill="url(#grad-l-${uniqueId})" />
          <!-- Vein Lines -->
          <path d="M46 30 Q30 20 18 6 M46 30 Q28 28 8 24 M46 30 Q30 36 26 42 M46 30 Q32 48 37 49 M46 30 Q24 50 17 55"
                stroke="${s.veinColor}" stroke-width="1.2" fill="none" opacity="0.75" />
          <!-- Wing Margin Dots -->
          <circle cx="8" cy="8" r="1.5" fill="${s.accentColor}" opacity="0.9" />
          <circle cx="4" cy="18" r="1.4" fill="${s.accentColor}" opacity="0.9" />
          <circle cx="6" cy="28" r="1.2" fill="${s.accentColor}" opacity="0.8" />
          <circle cx="12" cy="58" r="1.3" fill="${s.accentColor}" opacity="0.9" />
          <circle cx="22" cy="61" r="1.3" fill="${s.accentColor}" opacity="0.9" />
        </svg>

        <!-- Butterfly Slender Center Body -->
        <div class="butterfly-body"></div>

        <!-- Right Wing -->
        <svg class="wing wing-right" viewBox="0 0 50 65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-r-${uniqueId}" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stop-color="${s.gradStart}" />
              <stop offset="55%" stop-color="${s.gradMid}" />
              <stop offset="100%" stop-color="${s.gradEnd}" />
            </linearGradient>
            <filter id="glow-r-${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="${s.gradEnd}" flood-opacity="0.3"/>
            </filter>
          </defs>
          <!-- Outer Wing Margin -->
          <path d="M2 30 C5 10 18 0 34 2 C46 4 49 14 47 24 C45 34 34 42 28 45 C35 48 42 52 38 59 C34 64 22 65 12 52 C6 45 2 38 2 30 Z"
                fill="${s.edgeColor}" filter="url(#glow-r-${uniqueId})" />
          <!-- Inner Colorful Wing Leaf -->
          <path d="M4 30 C7 13 18 4 32 6 C42 8 44 16 42 24 C40 32 30 39 24 42 C30 45 36 49 33 55 C30 59 20 59 13 49 C8 42 4 36 4 30 Z"
                fill="url(#grad-r-${uniqueId})" />
          <!-- Vein Lines -->
          <path d="M4 30 Q20 20 32 6 M4 30 Q22 28 42 24 M4 30 Q20 36 24 42 M4 30 Q18 48 13 49 M4 30 Q26 50 33 55"
                stroke="${s.veinColor}" stroke-width="1.2" fill="none" opacity="0.75" />
          <!-- Wing Margin Dots -->
          <circle cx="42" cy="8" r="1.5" fill="${s.accentColor}" opacity="0.9" />
          <circle cx="46" cy="18" r="1.4" fill="${s.accentColor}" opacity="0.9" />
          <circle cx="44" cy="28" r="1.2" fill="${s.accentColor}" opacity="0.8" />
          <circle cx="38" cy="58" r="1.3" fill="${s.accentColor}" opacity="0.9" />
          <circle cx="28" cy="61" r="1.3" fill="${s.accentColor}" opacity="0.9" />
        </svg>
      </div>
    `;
  }

  // ==========================================================================
  // 3. STATE MANAGEMENT & SCENE NAVIGATION
  // ==========================================================================
  const state = {
    currentScene: 1,
    isTransitioning: false,
    audioPlaying: false,
    proceduralAudioActive: false,
    butterflies: [],
    petals: [],
    sparkles: [],
    animationFrameId: null
  };

  const DOM = {
    app: document.getElementById('app'),
    stepDots: document.querySelectorAll('.step-dot'),
    musicToggle: document.getElementById('musicToggle'),
    bgMusic: document.getElementById('bgMusic'),
    ambientCanvas: document.getElementById('ambientCanvas'),
    // Scenes
    scene1: document.getElementById('scene1'),
    scene2: document.getElementById('scene2'),
    scene3: document.getElementById('scene3'),
    scene4: document.getElementById('scene4'),
    scene5: document.getElementById('scene5'),
    // Scene 1 Elements
    envelopeTrigger: document.getElementById('envelopeTrigger'),
    waxSeal: document.getElementById('waxSeal'),
    // Scene 2 Elements
    butterflyStage: document.getElementById('butterflyStage'),
    butterflyDisperseHint: document.getElementById('butterflyDisperseHint'),
    // Scene 3 Elements
    btnLetterContinue: document.getElementById('btnLetterContinue'),
    // Scene 4 Elements
    polaroidCards: document.querySelectorAll('.polaroid-card'),
    btnScrapbookContinue: document.getElementById('btnScrapbookContinue'),
    // Scene 5 Elements
    btnReplay: document.getElementById('btnReplay'),
    // Lightbox
    photoLightbox: document.getElementById('photoLightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxTitle: document.getElementById('lightboxTitle'),
    lightboxDate: document.getElementById('lightboxDate'),
    lightboxCloseBtn: document.getElementById('lightboxCloseBtn'),
    lightboxBackdrop: document.getElementById('lightboxBackdrop')
  };

  function updateStepDots(sceneNumber) {
    DOM.stepDots.forEach((dot) => {
      const dotScene = parseInt(dot.getAttribute('data-scene'), 10);
      if (dotScene === sceneNumber) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToScene(targetSceneNumber) {
    if (state.isTransitioning) return;
    state.isTransitioning = true;

    const currentSceneEl = document.getElementById(`scene${state.currentScene}`);
    const nextSceneEl = document.getElementById(`scene${targetSceneNumber}`);

    if (!nextSceneEl) {
      state.isTransitioning = false;
      return;
    }

    // Update Indicators
    updateStepDots(targetSceneNumber);

    // Fade out current scene
    if (currentSceneEl) {
      currentSceneEl.classList.remove('active');
      currentSceneEl.classList.add('exit');
    }

    setTimeout(() => {
      if (currentSceneEl) {
        currentSceneEl.classList.remove('exit');
      }

      // Enter next scene
      nextSceneEl.classList.add('active');
      state.currentScene = targetSceneNumber;

      // Handle Scene-specific initialization
      if (targetSceneNumber === 2) {
        initButterflySwarmScene();
      } else if (targetSceneNumber === 4) {
        initScrapbookScene();
      }

      state.isTransitioning = false;
    }, 600);
  }

  // ==========================================================================
  // 4. SCENE 1: THE ENVELOPE OPENING ANIMATION
  // ==========================================================================
  function setupScene1Envelope() {
    if (!DOM.envelopeTrigger) return;

    function handleEnvelopeOpen() {
      const envelopeBox = DOM.envelopeTrigger.querySelector('.envelope-box');
      if (envelopeBox.classList.contains('opened')) return;

      envelopeBox.classList.add('opened');

      // Play music or synthesized lullaby on first tap
      startAudioPlayback();

      // Trigger sparkle explosion around the wax seal
      createSparkleBurst(DOM.waxSeal);

      // Transition smoothly into Scene 2 (Butterfly Reveal) after letter peeks out
      setTimeout(() => {
        goToScene(2);
      }, 1200);
    }

    DOM.envelopeTrigger.addEventListener('click', handleEnvelopeOpen);
    DOM.envelopeTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnvelopeOpen();
      }
    });
  }

  function createSparkleBurst(targetEl) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 16; i++) {
      const spark = document.createElement('div');
      spark.className = 'sparkle-burst-particle';
      spark.innerHTML = ['✦', '✨', '💜', '🌸'][i % 4];
      spark.style.position = 'fixed';
      spark.style.left = `${centerX}px`;
      spark.style.top = `${centerY}px`;
      spark.style.color = '#7C3AED';
      spark.style.fontSize = `${Math.random() * 14 + 12}px`;
      spark.style.zIndex = '9999';
      spark.style.pointerEvents = 'none';
      spark.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5);
      const distance = Math.random() * 90 + 50;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${destX}px, ${destY}px) scale(${Math.random() * 0.5 + 0.8}) rotate(${Math.random() * 180}deg)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 950);
    }
  }

  // ==========================================================================
  // 5. SCENE 2: MAGICAL BUTTERFLY SWARM & 3D PHYSICS
  // ==========================================================================
  function initButterflySwarmScene() {
    if (!DOM.butterflyStage) return;
    DOM.butterflyStage.innerHTML = '';
    state.butterflies = [];

    const bounds = DOM.butterflyStage.getBoundingClientRect();
    const stageW = bounds.width || 380;
    const stageH = bounds.height || 640;

    // Generate balanced multicolored butterflies across 3 depths
    for (let i = 0; i < CONFIG.butterflyCount; i++) {
      const species = BUTTERFLY_SPECIES[i % BUTTERFLY_SPECIES.length];
      const uniqueId = `bf-${i}-${Date.now()}`;

      // Depth layer distribution (30% front, 45% mid, 25% back)
      let depthClass = 'depth-mid';
      let scale = 0.95 + Math.random() * 0.25;
      let zIndex = 25;
      let flapSpeed = 0.24 + Math.random() * 0.08;

      if (i % 5 === 0) {
        depthClass = 'depth-front';
        scale = 1.3 + Math.random() * 0.3;
        zIndex = 35;
        flapSpeed = 0.18 + Math.random() * 0.05;
      } else if (i % 4 === 0) {
        depthClass = 'depth-back';
        scale = 0.55 + Math.random() * 0.2;
        zIndex = 15;
        flapSpeed = 0.3 + Math.random() * 0.08;
      }

      const el = document.createElement('div');
      el.className = `butterfly ${depthClass}`;
      el.style.setProperty('--flap-speed', `${flapSpeed}s`);
      el.style.zIndex = zIndex;
      el.innerHTML = createButterflySVG(species, uniqueId);

      // Starting positions (erupting outward from center)
      const startX = stageW / 2 + (Math.random() - 0.5) * 80;
      const startY = stageH / 2 + (Math.random() - 0.5) * 80;

      // Flight state object
      const bfObj = {
        el,
        x: startX,
        y: startY,
        targetX: Math.random() * (stageW - 60) + 30,
        targetY: Math.random() * (stageH - 120) + 60,
        baseScale: scale,
        scale: scale,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        rotZ: 0,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.03 + Math.random() * 0.03,
        swayAmp: 25 + Math.random() * 20,
        species: species.name
      };

      DOM.butterflyStage.appendChild(el);
      state.butterflies.push(bfObj);

      // Subtle touch/click reaction on individual butterfly
      el.addEventListener('pointerdown', (ev) => {
        ev.stopPropagation();
        scatterSingleButterfly(bfObj);
      });
    }

    // Click anywhere on scene 2 to trigger Dispersal into Scene 3
    DOM.scene2.addEventListener('click', handleButterflyDispersal, { once: true });
  }

  function scatterSingleButterfly(bf) {
    bf.vx += (Math.random() - 0.5) * 8;
    bf.vy -= Math.random() * 6 + 3; // Flutters upwards
    bf.el.style.transform = `translate(${bf.x}px, ${bf.y}px) scale(${bf.scale * 1.25}) rotate(${bf.rotZ + 20}deg)`;
  }

  function handleButterflyDispersal() {
    if (state.currentScene !== 2) return;

    // Disperse butterflies outward to the screen corners
    const stageBounds = DOM.butterflyStage.getBoundingClientRect();
    const centerX = stageBounds.width / 2;
    const centerY = stageBounds.height / 2;

    state.butterflies.forEach((bf, idx) => {
      const dx = bf.x - centerX;
      const dy = bf.y - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.max(stageBounds.width, stageBounds.height) * 1.2;

      const disperseX = Math.cos(angle) * distance;
      const disperseY = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 90;

      bf.el.style.setProperty('--disperse-x', `${disperseX}px`);
      bf.el.style.setProperty('--disperse-y', `${disperseY}px`);
      bf.el.style.setProperty('--disperse-rot', `${rot}deg`);
      bf.el.classList.add('dispersed');
    });

    if (DOM.butterflyDisperseHint) {
      DOM.butterflyDisperseHint.style.opacity = '0';
      DOM.butterflyDisperseHint.style.transform = 'translateY(20px)';
    }

    // Transition smoothly into Scene 3 (Handwritten Letter)
    setTimeout(() => {
      goToScene(3);
    }, 850);
  }

  // Butterfly Physics Loop
  function updateButterflies() {
    if (state.currentScene !== 2 && state.currentScene !== 5) return;

    const bounds = DOM.butterflyStage?.getBoundingClientRect();
    const stageW = bounds?.width || 380;
    const stageH = bounds?.height || 640;

    state.butterflies.forEach((bf) => {
      if (bf.el.classList.contains('dispersed')) return;

      bf.swayPhase += bf.swaySpeed;

      // Smooth steer toward target
      const dx = bf.targetX - bf.x;
      const dy = bf.targetY - bf.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 40) {
        bf.targetX = Math.random() * (stageW - 80) + 40;
        bf.targetY = Math.random() * (stageH - 140) + 70;
      }

      bf.vx += (dx / dist) * 0.08;
      bf.vy += (dy / dist) * 0.08;

      // Add gentle sinusoidal flutter
      const swayX = Math.cos(bf.swayPhase) * (bf.swayAmp * 0.04);
      const swayY = Math.sin(bf.swayPhase * 1.5) * (bf.swayAmp * 0.03);

      bf.x += bf.vx + swayX;
      bf.y += bf.vy + swayY;

      // Dampening
      bf.vx *= 0.94;
      bf.vy *= 0.94;

      // Calculate orientation angle based on velocity
      const targetRot = Math.atan2(bf.vy, bf.vx) * (180 / Math.PI) - 90;
      bf.rotZ += (targetRot - bf.rotZ) * 0.1;

      // Apply 3D transform
      bf.el.style.transform = `translate3d(${bf.x}px, ${bf.y}px, 0) scale(${bf.scale}) rotateZ(${bf.rotZ}deg)`;
    });
  }

  // Interactive touch evasion in Scene 2
  if (DOM.scene2) {
    DOM.scene2.addEventListener('pointermove', (e) => {
      if (state.currentScene !== 2) return;
      const rect = DOM.scene2.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      state.butterflies.forEach((bf) => {
        const dist = Math.hypot(bf.x - pointerX, bf.y - pointerY);
        if (dist < 85) {
          const angle = Math.atan2(bf.y - pointerY, bf.x - pointerX);
          bf.vx += Math.cos(angle) * 4;
          bf.vy += Math.sin(angle) * 4;
        }
      });
    });
  }

  // ==========================================================================
  // 6. SCENE 3: INTERACTIVE HANDWRITTEN LETTER
  // ==========================================================================
  function setupScene3Letter() {
    if (DOM.btnLetterContinue) {
      DOM.btnLetterContinue.addEventListener('click', () => {
        goToScene(4);
      });
    }
  }

  // ==========================================================================
  // 7. SCENE 4: INTERACTIVE PHOTO SCRAPBOOK & SCRATCH REVEAL
  // ==========================================================================
  function initScrapbookScene() {
    DOM.polaroidCards.forEach((card) => {
      const canvas = card.querySelector('.scratch-canvas');
      if (!canvas || canvas.dataset.initialized) return;

      setupScratchCard(canvas, card);
    });

    if (DOM.btnScrapbookContinue) {
      DOM.btnScrapbookContinue.addEventListener('click', () => {
        goToScene(5);
      });
    }
  }

  function setupScratchCard(canvas, card) {
    canvas.dataset.initialized = 'true';
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let scratchedPixels = 0;
    let totalPixels = 0;
    let isRevealed = false;

    // Size canvas to match container exactly
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      totalPixels = rect.width * rect.height;

      // Draw elegant silvery-lilac scratch cover
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#E9D5FF');
      grad.addColorStop(0.5, '#DDD6FE');
      grad.addColorStop(1, '#C4B5FD');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add gentle shimmer pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 20; i++) {
        const sx = Math.random() * rect.width;
        const sy = Math.random() * rect.height;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resizeCanvas();

    function scratch(x, y) {
      if (isRevealed) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, CONFIG.scratchBrushRadius, 0, Math.PI * 2);
      ctx.fill();

      // Check scratch progress periodically
      scratchedPixels += Math.PI * (CONFIG.scratchBrushRadius * CONFIG.scratchBrushRadius) * 0.4;
      if (scratchedPixels / totalPixels >= CONFIG.scratchThreshold) {
        revealPhoto();
      }
    }

    function revealPhoto() {
      if (isRevealed) return;
      isRevealed = true;
      canvas.classList.add('scratched');
      card.classList.add('revealed');

      // Sparkle burst on reveal
      createSparkleBurst(card);
    }

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    // Touch & Mouse Events
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const { x, y } = getCoords(e);
      scratch(x, y);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const { x, y } = getCoords(e);
      scratch(x, y);
    });

    window.addEventListener('mouseup', () => {
      isDrawing = false;
    });

    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      const { x, y } = getCoords(e);
      scratch(x, y);
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const { x, y } = getCoords(e);
      scratch(x, y);
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      isDrawing = false;
    });

    // Single Tap fallback: tapping reveals instantly if user doesn't scratch
    card.addEventListener('click', () => {
      if (!isRevealed) {
        revealPhoto();
      } else {
        // Tapping already revealed photo opens Lightbox
        openLightbox(card);
      }
    });
  }

  // ==========================================================================
  // 8. LIGHTBOX MODAL (Full Photo Exploration)
  // ==========================================================================
  function setupLightbox() {
    function close() {
      DOM.photoLightbox.close();
    }

    DOM.lightboxCloseBtn?.addEventListener('click', close);
    DOM.lightboxBackdrop?.addEventListener('click', close);
    DOM.photoLightbox?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  function openLightbox(card) {
    const imgEl = card.querySelector('.polaroid-img');
    const caption = card.getAttribute('data-caption') || 'Memories';
    const date = card.getAttribute('data-date') || 'Special Moment';

    if (DOM.lightboxImg && imgEl) {
      DOM.lightboxImg.src = imgEl.src;
      DOM.lightboxImg.alt = caption;
    }
    if (DOM.lightboxTitle) {
      DOM.lightboxTitle.textContent = caption;
    }
    if (DOM.lightboxDate) {
      DOM.lightboxDate.textContent = date;
    }

    DOM.photoLightbox?.showModal();
  }

  // ==========================================================================
  // 9. SCENE 5: FINAL SCENE & REPLAY CONTROLLER
  // ==========================================================================
  function setupScene5Final() {
    if (DOM.btnReplay) {
      DOM.btnReplay.addEventListener('click', () => {
        // Reset all polaroids and canvases
        DOM.polaroidCards.forEach((card) => {
          card.classList.remove('revealed');
          const canvas = card.querySelector('.scratch-canvas');
          if (canvas) {
            canvas.classList.remove('scratched');
            delete canvas.dataset.initialized;
          }
        });

        // Close envelope
        const envelopeBox = DOM.envelopeTrigger?.querySelector('.envelope-box');
        if (envelopeBox) {
          envelopeBox.classList.remove('opened');
        }

        // Return to Scene 1 smoothly
        goToScene(1);
      });
    }
  }

  // ==========================================================================
  // 10. AMBIENT DRIFTING PETALS & FAIRY SPARKLES ENGINE (HTML5 Canvas)
  // ==========================================================================
  function initAmbientCanvas() {
    const canvas = DOM.ambientCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      const rect = DOM.app.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.width / (window.devicePixelRatio || 1);
    const h = () => canvas.height / (window.devicePixelRatio || 1);

    // Seed Petals
    state.petals = Array.from({ length: CONFIG.petalCount }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      size: Math.random() * 8 + 6,
      vx: Math.random() * 0.8 + 0.3,
      vy: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.4 + 0.35,
      color: ['#D8B4FE', '#C084FC', '#FBCFE8', '#DDD6FE'][Math.floor(Math.random() * 4)]
    }));

    // Seed Sparkles
    state.sparkles = Array.from({ length: CONFIG.sparkleCount }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      size: Math.random() * 2 + 1,
      alpha: Math.random(),
      fadeSpeed: Math.random() * 0.02 + 0.01,
      color: '#FFFFFF'
    }));

    function render() {
      ctx.clearRect(0, 0, w(), h());

      // Draw Petals
      state.petals.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > h() + 20) {
          p.y = -20;
          p.x = Math.random() * w();
        }
        if (p.x > w() + 20) {
          p.x = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        // Curved organic flower petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Sparkles
      state.sparkles.forEach((s) => {
        s.alpha += s.fadeSpeed;
        if (s.alpha > 1 || s.alpha < 0) {
          s.fadeSpeed = -s.fadeSpeed;
        }

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha * 0.75));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Update 3D butterflies flight positions
      updateButterflies();

      state.animationFrameId = requestAnimationFrame(render);
    }

    render();
  }

  // ==========================================================================
  // 11. AUDIO CONTROLLER & PROCEDURAL MUSIC BOX FALLBACK
  // ==========================================================================
  let audioCtx = null;
  let proceduralInterval = null;

  function initAudioController() {
    if (DOM.bgMusic) {
      DOM.bgMusic.volume = CONFIG.bgMusicVolume;

      // Handle loading error by falling back to Web Audio synthesizer
      DOM.bgMusic.addEventListener('error', () => {
        console.info('Using Web Audio procedural lullaby music synthesizer fallback.');
        state.proceduralAudioActive = true;
      });
    }

    DOM.musicToggle?.addEventListener('click', toggleAudio);
  }

  function startAudioPlayback() {
    if (state.audioPlaying) return;

    if (DOM.bgMusic && !state.proceduralAudioActive) {
      DOM.bgMusic.play()
        .then(() => {
          state.audioPlaying = true;
          DOM.musicToggle?.classList.add('playing');
        })
        .catch(() => {
          // Autoplay was prevented or audio file missing, fallback to Web Audio
          startProceduralMusicBox();
        });
    } else {
      startProceduralMusicBox();
    }
  }

  function toggleAudio() {
    if (state.audioPlaying) {
      // Pause
      if (DOM.bgMusic && !state.proceduralAudioActive) {
        DOM.bgMusic.pause();
      }
      stopProceduralMusicBox();
      state.audioPlaying = false;
      DOM.musicToggle?.classList.remove('playing');
    } else {
      // Resume / Start
      startAudioPlayback();
    }
  }

  // Soothing Web Audio API Music Box synthesizer playing a dreamy romantic lullaby
  function startProceduralMusicBox() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      state.audioPlaying = true;
      state.proceduralAudioActive = true;
      DOM.musicToggle?.classList.add('playing');

      // Romantic music box pentatonic chord progression (C major 9 / Am / F / G)
      const notes = [
        523.25, 587.33, 659.25, 783.99, 880.00, 987.77, 1046.50, // C5 to C6
        659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51
      ];

      let step = 0;
      clearInterval(proceduralInterval);

      proceduralInterval = setInterval(() => {
        if (!state.audioPlaying) return;
        const freq = notes[step % notes.length];
        playChime(freq);

        if (step % 3 === 0) {
          playChime(notes[(step + 4) % notes.length] * 0.5, 0.08); // Bass note
        }
        step = (step + 1) % notes.length;
      }, 480);

    } catch (err) {
      console.warn('Procedural audio initialization failed:', err);
    }
  }

  function playChime(freq, gainLevel = 0.05) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  }

  function stopProceduralMusicBox() {
    clearInterval(proceduralInterval);
  }

  // ==========================================================================
  // 12. INITIALIZATION ON DOM READY
  // ==========================================================================
  function init() {
    setupScene1Envelope();
    setupScene3Letter();
    setupLightbox();
    setupScene5Final();
    initAmbientCanvas();
    initAudioController();

    // Scene indicator dots manual clicks
    DOM.stepDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const sceneNum = parseInt(dot.getAttribute('data-scene'), 10);
        goToScene(sceneNum);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

