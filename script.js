/**
 * ==========================================================
 *  PROJECT: "A Little World Made for You" ❤️
 *  Core JavaScript: Countdown, Midnight Transformation, 
 *  Canvas Stars & Hearts, Web Audio Music, Typewriter Letter
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial State & Configuration
  let countdownInterval = null;
  let isUnlockedPreview = false;
  let isPlayingMusic = false;
  let webAudioContext = null;
  let synthInterval = null;

  // DOM Elements
  const countdownSection = document.getElementById("countdownSection");
  const surpriseSection = document.getElementById("surpriseSection");
  const recipientNameElements = document.querySelectorAll(".recipient-name");
  const midnightGreeting = document.getElementById("midnightGreeting");
  const midnightSub = document.getElementById("midnightSub");
  const polaroidGallery = document.getElementById("polaroidGallery");

  // Audio Elements
  const bgMusic = document.getElementById("bgMusic");
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const vinylDisc = document.getElementById("vinylDisc");
  const audioLabel = document.getElementById("audioLabel");


  // Sneak Peek Modal Elements
  const sneakPeekBtn = document.getElementById("sneakPeekBtn");
  const sneakPeekModal = document.getElementById("sneakPeekModal");
  const sneakPeekText = document.getElementById("sneakPeekText");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Lightbox Elements
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

  // Video Memory Elements
  const memoryVideo      = document.getElementById("memoryVideo");
  const videoPlayOverlay = document.getElementById("videoPlayOverlay");
  const vidPlayPauseBtn  = document.getElementById("vidPlayPauseBtn");
  const vidPlayIcon      = document.getElementById("vidPlayIcon");
  const vidProgressBar   = document.getElementById("vidProgressBar");
  const vidProgressFill  = document.getElementById("vidProgressFill");
  const vidMuteBtn       = document.getElementById("vidMuteBtn");
  const vidMuteIcon      = document.getElementById("vidMuteIcon");
  const vidFullscreenBtn = document.getElementById("vidFullscreenBtn");

  // Envelope & Letter Elements
  const waxSealBtn = document.getElementById("waxSealBtn");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const letterBody = document.getElementById("letterBody");
  const letterBadge = document.getElementById("letterBadge");
  const letterSalutation = document.getElementById("letterSalutation");
  const letterClosing = document.getElementById("letterClosing");
  const letterSignature = document.getElementById("letterSignature");
  const letterActions = document.getElementById("letterActions");
  const sendLoveBtn = document.getElementById("sendLoveBtn");
  const replayLetterBtn = document.getElementById("replayLetterBtn");

  // 2. Personalize Text from CONFIG
  recipientNameElements.forEach(el => el.textContent = CONFIG.recipientName);
  if (midnightGreeting) midnightGreeting.innerHTML = CONFIG.midnightHeading;
  if (midnightSub) midnightSub.textContent = CONFIG.midnightSubheading;
  if (letterBadge) letterBadge.textContent = CONFIG.letter.badge;
  if (letterSalutation) letterSalutation.textContent = CONFIG.letter.salutation;
  if (letterClosing) letterClosing.textContent = CONFIG.letter.closing;
  if (letterSignature) letterSignature.textContent = CONFIG.letter.signature;
  const videoCaptionLine = document.getElementById("videoCaptionLine");
  if (videoCaptionLine && CONFIG.videoCaption) videoCaptionLine.textContent = CONFIG.videoCaption;
  if (memoryVideo && CONFIG.videoFile) {
    // Update <source> tags
    memoryVideo.querySelectorAll("source").forEach(s => {
      if (s.type === "video/mp4") s.src = CONFIG.videoFile;
    });
    memoryVideo.load();
  }

  // 3. Render Polaroid Memories Gallery
  function renderMemories() {
    polaroidGallery.innerHTML = "";
    CONFIG.memories.forEach((mem, index) => {
      const card = document.createElement("div");
      card.className = "polaroid-card";
      // Store base rotation as a data attribute so hover can reset it cleanly
      const rot = mem.rotation || 0;
      card.dataset.rotation = rot;
      card.style.transform = `rotate(${rot}deg) translateY(0)`;
      // Staggered transition delay for scroll reveal
      card.style.transitionDelay = `${index * 90}ms`;

      // --- Image wrapper ---
      const wrapper = document.createElement("div");
      wrapper.className = "polaroid-img-wrapper";

      // Shimmer stays until image loads
      const img = document.createElement("img");
      img.className = "polaroid-img loading";
      img.alt = mem.moment || "Special Memory";
      img.loading = "lazy";

      img.onload = () => {
        img.classList.remove("loading");
        wrapper.classList.add("loaded");
      };

      img.onerror = () => {
        img.src = mem.fallbackImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80";
        wrapper.classList.add("loaded");
      };

      // Set src after handlers are ready
      img.src = mem.image;

      // Heart hover overlay
      const heartOverlay = document.createElement("div");
      heartOverlay.className = "polaroid-hover-heart";
      heartOverlay.textContent = "❤️";

      // Moment badge (bottom-left of image)
      const moment = document.createElement("div");
      moment.className = "polaroid-moment";
      moment.textContent = mem.moment;

      wrapper.appendChild(img);
      wrapper.appendChild(heartOverlay);
      wrapper.appendChild(moment);

      // --- Caption ---
      const caption = document.createElement("div");
      caption.className = "polaroid-caption";
      caption.textContent = mem.caption;

      card.appendChild(wrapper);
      card.appendChild(caption);

      // Smooth hover: lift up slightly and un-rotate
      card.addEventListener("mouseenter", () => {
        card.style.transform = `rotate(0deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = `rotate(${rot}deg) translateY(0)`;
      });

      // Lightbox click
      card.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = mem.caption + "   ·   " + mem.moment;
        lightboxModal.classList.add("active");
      });

      polaroidGallery.appendChild(card);
    });

    // Scroll-reveal using IntersectionObserver
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".polaroid-card").forEach(card => revealObserver.observe(card));
  }
  renderMemories();

  // Lightbox Close Handlers
  lightboxCloseBtn.addEventListener("click", () => lightboxModal.classList.remove("active"));
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) lightboxModal.classList.remove("active");
  });

  // 3.5 Video Memory Player
  function initVideoPlayer() {
    if (!memoryVideo) return;

    // --- Overlay tap to start ---
    if (videoPlayOverlay) {
      videoPlayOverlay.addEventListener("click", () => {
        videoPlayOverlay.classList.add("hidden");
        memoryVideo.play().catch(() => {});
      });
    }

    // --- Play / Pause button ---
    function updatePlayIcon() {
      if (vidPlayIcon) vidPlayIcon.textContent = memoryVideo.paused ? "▶" : "⏸";
    }

    if (vidPlayPauseBtn) {
      vidPlayPauseBtn.addEventListener("click", () => {
        if (memoryVideo.paused) {
          memoryVideo.play().catch(() => {});
        } else {
          memoryVideo.pause();
        }
      });
    }

    memoryVideo.addEventListener("play",  updatePlayIcon);
    memoryVideo.addEventListener("pause", updatePlayIcon);

    // Hide overlay once video actually starts
    memoryVideo.addEventListener("playing", () => {
      if (videoPlayOverlay) videoPlayOverlay.classList.add("hidden");
    });

    // --- Progress bar ---
    memoryVideo.addEventListener("timeupdate", () => {
      if (!memoryVideo.duration) return;
      const pct = (memoryVideo.currentTime / memoryVideo.duration) * 100;
      if (vidProgressFill) vidProgressFill.style.width = pct + "%";
    });

    if (vidProgressBar) {
      vidProgressBar.addEventListener("click", (e) => {
        const rect = vidProgressBar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        memoryVideo.currentTime = ratio * memoryVideo.duration;
      });
    }

    // --- Mute toggle ---
    if (vidMuteBtn) {
      vidMuteBtn.addEventListener("click", () => {
        memoryVideo.muted = !memoryVideo.muted;
        if (vidMuteIcon) vidMuteIcon.textContent = memoryVideo.muted ? "🔇" : "🔊";
      });
    }

    // --- Fullscreen ---
    if (vidFullscreenBtn) {
      vidFullscreenBtn.addEventListener("click", () => {
        const wrap = memoryVideo.closest(".video-frame-wrapper") || memoryVideo;
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        } else {
          (wrap.requestFullscreen || wrap.webkitRequestFullscreen || (() => {})).call(wrap);
        }
      });
    }
  }
  initVideoPlayer();

  // 4. Live Countdown & Midnight Logic
  function calculateTimeLeft() {
    // Parse target date
    const targetDate = new Date(CONFIG.birthdayDate);
    const now = new Date();
    
    // Difference in milliseconds
    const diff = targetDate.getTime() - now.getTime();
    return diff;
  }

  function updateCountdownUI() {
    const diff = calculateTimeLeft();

    if (diff <= 0) {
      // Midnight has arrived — unlock the surprise!
      triggerMidnightSurprise();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  function startCountdown() {
    updateCountdownUI();
    countdownInterval = setInterval(updateCountdownUI, 1000);
  }

  // 5. Midnight Transformation Animation
  function triggerMidnightSurprise() {
    if (countdownInterval) clearInterval(countdownInterval);

    countdownSection.classList.remove("active");
    setTimeout(() => {
      countdownSection.style.display = "none";
      surpriseSection.style.display = "block";
      setTimeout(() => {
        surpriseSection.classList.add("active");
      }, 50);
    }, 400);

    // Launch celebration fireworks & hearts
    launchCelebrationBurst();

    // Start background music automatically on midnight surprise if not playing
    if (!isPlayingMusic) {
      playMusic();
    }
  }

  // Sneak Peek Dialog Handlers
  sneakPeekBtn.addEventListener("click", () => {
    const messages = CONFIG.sneakPeekMessages;
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    sneakPeekText.textContent = randomMsg;
    sneakPeekModal.classList.add("active");
  });

  closeModalBtn.addEventListener("click", () => sneakPeekModal.classList.remove("active"));
  sneakPeekModal.addEventListener("click", (e) => {
    if (e.target === sneakPeekModal) sneakPeekModal.classList.remove("active");
  });

  // 6. Interactive Envelope & Typewriter Letter
  let isEnvelopeOpen = false;
  let isTyping = false;

  waxSealBtn.addEventListener("click", () => {
    if (isEnvelopeOpen) return;
    openEnvelope();
  });

  function openEnvelope() {
    isEnvelopeOpen = true;
    envelopeWrapper.classList.add("open");

    // Start romantic background music if not playing yet
    if (!isPlayingMusic) {
      playMusic();
    }

    // Launch little hearts
    createFloatingHeartAtElement(waxSealBtn);

    // Wait for flap fold transition, then expand letter and start typing
    setTimeout(() => {
      envelopeWrapper.classList.add("expanded");
      typewriterEffect(CONFIG.letter.paragraphs);
    }, 1200);
  }

  function typewriterEffect(paragraphs) {
    if (isTyping) return;
    isTyping = true;
    letterBody.innerHTML = "";
    letterActions.classList.remove("visible");

    let pIndex = 0;
    let charIndex = 0;
    let currentP = document.createElement("p");
    letterBody.appendChild(currentP);

    function typeChar() {
      if (pIndex >= paragraphs.length) {
        isTyping = false;
        letterActions.classList.add("visible");
        return;
      }

      const text = paragraphs[pIndex];
      if (charIndex < text.length) {
        currentP.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 24);
      } else {
        pIndex++;
        charIndex = 0;
        if (pIndex < paragraphs.length) {
          currentP = document.createElement("p");
          letterBody.appendChild(currentP);
          setTimeout(typeChar, 350);
        } else {
          isTyping = false;
          letterActions.classList.add("visible");
        }
      }
    }

    typeChar();
  }

  // Replay Letter Button
  replayLetterBtn.addEventListener("click", () => {
    if (!isTyping) {
      typewriterEffect(CONFIG.letter.paragraphs);
    }
  });

  // "Send A Heart" Button
  sendLoveBtn.addEventListener("click", () => {
    launchCelebrationBurst();
    sendLoveBtn.innerHTML = "<span>Sent with Love! 💖</span>";
    setTimeout(() => {
      sendLoveBtn.innerHTML = "<span>Send A Heart ❤️</span>";
    }, 2000);
  });

  // 7. Audio Player (MP3 with Romantic Web Audio Lullaby Fallback)
  bgMusic.src = CONFIG.musicFile;
  bgMusic.volume = CONFIG.defaultVolume;

  audioToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  function playMusic() {
    if (isPlayingMusic) return;
    isPlayingMusic = true;
    vinylDisc.classList.add("spinning");
    audioLabel.textContent = "Pause Music";
    audioToggleBtn.classList.add("playing");

    // Attempt to play user's mp3
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("MP3 autoplay blocked or failed, using romantic synth fallback:", err);
        // Fallback: If no mp3 is found or blocked by browser policy, use Web Audio API Synth!
        playAmbientRomanticSynth();
      });
    }
  }

  function pauseMusic() {
    isPlayingMusic = false;
    vinylDisc.classList.remove("spinning");
    audioLabel.textContent = "Play Music";
    audioToggleBtn.classList.remove("playing");
    bgMusic.pause();
    stopAmbientRomanticSynth();
  }

  // Auto-start music on first tap or click anywhere on the page
  function handleFirstUserInteraction() {
    if (!isPlayingMusic) {
      playMusic();
    }
    // Remove listeners once activated
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      document.removeEventListener(evt, handleFirstUserInteraction);
    });
  }

  ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
    document.addEventListener(evt, handleFirstUserInteraction, { passive: true });
  });

  // Attempt to play immediately on load if browser autoplay policy allows
  window.addEventListener('load', () => {
    const startPromise = bgMusic.play();
    if (startPromise !== undefined) {
      startPromise.then(() => {
        isPlayingMusic = true;
        vinylDisc.classList.add("spinning");
        audioLabel.textContent = "Pause Music";
        audioToggleBtn.classList.add("playing");
      }).catch(() => {
        // Autoplay policy prevented immediate unmuted sound;
        // music will start smoothly on first touch/click!
      });
    }
  });

  // Web Audio Romantic Music-Box Synthesizer
  function playAmbientRomanticSynth() {
    if (synthInterval) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!webAudioContext) webAudioContext = new AudioCtx();
      if (webAudioContext.state === "suspended") webAudioContext.resume();

      // Gentle romantic arpeggio notes (Frequencies in Hz)
      // D major / B minor romantic lullaby scale: D4, F#4, A4, B4, C#5, D5
      const notes = [
        293.66, 369.99, 440.00, 493.88, 
        440.00, 369.99, 329.63, 293.66,
        246.94, 329.63, 369.99, 440.00
      ];

      let noteIdx = 0;
      synthInterval = setInterval(() => {
        if (!isPlayingMusic || !webAudioContext) return;
        const osc = webAudioContext.createOscillator();
        const gain = webAudioContext.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], webAudioContext.currentTime);

        gain.gain.setValueAtTime(0.001, webAudioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, webAudioContext.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, webAudioContext.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(webAudioContext.destination);

        osc.start();
        osc.stop(webAudioContext.currentTime + 1.3);

        noteIdx++;
      }, 480);
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  function stopAmbientRomanticSynth() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // 8. Canvas Particle System: Twinkling Stars & Drifting Hearts
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let celebrationParticles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Create ambient particles
  const particleCount = window.innerWidth < 768 ? 45 : 85;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      isHeart: Math.random() > 0.65
    });
  }

  function drawHeart(x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size * 1.2);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // 1. Ambient Background Particles
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
      p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));

      if (p.y < -20) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      if (p.isHeart) {
        drawHeart(p.x, p.y, p.size * 5, "#ff758c", p.alpha * 0.5);
      } else {
        // Twinkling Star
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#fffdfa";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    // 2. Active Celebration Burst Particles
    for (let i = celebrationParticles.length - 1; i >= 0; i--) {
      const cp = celebrationParticles[i];
      cp.x += cp.vx;
      cp.y += cp.vy;
      cp.vy += cp.gravity;
      cp.alpha -= 0.012;
      cp.rotation += cp.vRot;

      if (cp.alpha <= 0) {
        celebrationParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(cp.x, cp.y);
      ctx.rotate(cp.rotation);
      drawHeart(0, 0, cp.size, cp.color, cp.alpha);
      ctx.restore();
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Burst Helpers
  function launchCelebrationBurst() {
    const colors = ["#ff4081", "#ff79b0", "#ffd54f", "#ff80ab", "#ff1744", "#ffffff"];
    const count = 70;
    const originX = width / 2;
    const originY = height * 0.45;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      celebrationParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        gravity: 0.12,
        size: Math.random() * 12 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function createFloatingHeartAtElement(element) {
    const rect = element.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const colors = ["#ff4081", "#ff79b0", "#ff1744", "#ffd54f"];

    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      celebrationParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        gravity: 0.08,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.1
      });
    }
  }

  // 9. Kick off initial state — always start with countdown
  startCountdown();
});
