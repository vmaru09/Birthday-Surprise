# A Little World Made for You ❤️
> A romantic, emotional, and interactive birthday website for the love of your life.

---

## 🌟 What This Website Does

1. **Before Her Birthday (Countdown Mode)**:
   - Her name with a gentle ambient glow.
   - Live animated countdown clock (Days, Hours, Minutes, Seconds).
   - Starry night sky with floating hearts canvas.
   - Cute **"A little sneak peek..."** button with playful teasers when clicked ("*Hey! No peeking early! 🤫 Good things take time...*").
   - Music player with a spinning vinyl disc.

2. **Midnight on Her Birthday (Automatic Transformation)**:
   - At 12:00 AM on her birthday, the website automatically transforms!
   - Celebration heart burst / fireworks effect.
   - Headline: *"Happy Birthday, my love. ❤️"*
   - Subheading: *"Today is the birthday of someone who makes my world a little more beautiful just by being in it."*
   - Soft background music starts playing.

3. **Our Memories (Photo Polaroids 📸)**:
   - Realistic Polaroid frames with handwritten captions, washi tape, realistic drop-shadows, and slight romantic tilts.
   - Clicking any photo opens an elegant zoomed Lightbox view.

4. **The Final Birthday Letter (Interactive 3D Envelope 💌)**:
   - 3D red envelope with a wax seal stamped with a pulsing heart.
   - Clicking the seal smoothly flips open the envelope flap, pulls out the parchment paper, and animates a handwritten typewriter effect revealing your personal love letter.
   - "Send A Heart ❤️" burst button and "Read Again 🔄" replay button.

---

## 📁 Project Structure

```text
My Love/
│
├── index.html           # Main website markup & layout
├── style.css            # Romantic styles, 3D envelope, polaroids, animations
├── script.js            # Countdown timer, canvas particles, envelope physics, audio
├── config.js            # ⭐ EVERYTHING YOU NEED TO EDIT IN ONE PLACE!
├── README.md            # Quick setup guide
│
└── assets/
    ├── photos/          # Drop your photos here (photo1.jpg, photo2.jpg, etc.)
    └── music.mp3        # (Optional) Drop your favorite romantic song here
```

---

## ⚙️ How to Personalize (In 2 Minutes!)

Open **`config.js`** in your editor:

1. **Her Name**:
   ```javascript
   recipientName: "My Love", // e.g. "Pooja", "Aaditi", "Sweetheart"
   ```

2. **Her Birthday Date & Time**:
   ```javascript
   // Format: "YYYY-MM-DDTHH:mm:ss" (24-hour time)
   birthdayDate: "2026-12-05T00:00:00",
   ```

3. **Add Your Photos**:
   - Save your photos into the folder `assets/photos/` named as `photo1.jpg`, `photo2.jpg`, etc.
   - You can edit their captions in `config.js` under `memories`.
   *(Note: Until you put your photos in, the site already has beautiful romantic placeholder pictures so nothing looks broken!)*

4. **Add Background Music**:
   - Place an audio file named `music.mp3` inside `assets/`.
   *(Note: If you don't have an mp3 file yet, the website has a built-in romantic music-box piano synthesizer that plays automatically when she taps the music button!)*

5. **Customize Your Letter**:
   - Edit `letter.paragraphs` in `config.js` with your heartfelt words.

---

## 🧪 How to Test It Right Now

- **Instant Dev Switch**: Look at the bottom-left corner of the website screen — there is a discreet **"Preview Surprise ✨"** button. Click it to toggle between the Countdown screen and the Midnight Reveal instantly!
- **URL Parameter**: You can also open the website with `index.html?preview=true`.

---

## 🚀 How to Host on GitHub Pages (Free)

1. Create a free repository on [GitHub](https://github.com) named `her-birthday` (or any cute name).
2. Upload all the files (`index.html`, `style.css`, `script.js`, `config.js`, and `assets/`).
3. Go to repository **Settings** → **Pages** → Branch: `main` → Save.
4. In ~30 seconds, GitHub gives you a live link like `https://yourusername.github.io/her-birthday/`.
5. Send her the link before her birthday and watch the magic unfold! ❤️
