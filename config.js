/**
 * ==========================================================
 *  PROJECT: "A Little World Made for You" ❤️
 *  Configuration File
 * ==========================================================
 * 
 * You can customize all her details here!
 * Everything is organized so you don't have to touch HTML or CSS.
 */

const CONFIG = {
  // 1. HER DETAILS
  recipientName: "My Love", // Replace with her nickname or real name (e.g., "Aaditi", "Sweetheart", "Babe")
  senderName: "Yours, always ❤️", // How you want to sign off your letter

  // 2. HER BIRTHDAY DATE (Year, Month, Day, Hour:Minute:Second)
  // Format: "YYYY-MM-DDTHH:mm:ss" in 24-hour format
  // Example for December 5th, 2026 at Midnight IST: "2026-12-05T00:00:00"
  birthdayDate: "2026-11-28T00:00:00", 
  
  // Timezone setting: IST is +05:30 (India Standard Time)
  timezoneOffsetHours: 5.5,

  // 3. SNEAK PEEK MESSAGES (When she clicks "A little sneak peek..." before midnight)
  sneakPeekMessages: [
    "Hey! No peeking early! 🤫 Good things take time, just like the best moments with you.",
    "Nice try, cutie! But the lock is enchanted. Only midnight can break it. ✨",
    "Patience, sweetheart! Here is a little clue: It's all about you and the magic you bring into my world. 💫",
    "I caught you! 🙈 You'll have to wait, but I promise it will be worth every second."
  ],

  // 4. MEMORIES / PHOTOS SECTION 📸
  // Photos are in assets/photos/ — named exactly as below
  memories: [
    {
      image: "assets/photos/photo1.jpg.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      caption: "\u201cUnder these trees, with you beside me \u2014 this is my favorite kind of moment.\u201d",
      moment: "Us, just being us 🌿",
      rotation: -3
    },
    {
      image: "assets/photos/photo2.jpg.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      caption: "\u201cYou look like sunshine in that yellow, and I look like the luckiest person alive.\u201d",
      moment: "Bright days, brighter smiles ☀️",
      rotation: 2
    },
    {
      image: "assets/photos/photo3.jpg.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      caption: "\u201cEven in a crowd, it was always just you and me in our own little world.\u201d",
      moment: "A special occasion, a special us 🎊",
      rotation: -2
    },
    {
      image: "assets/photos/photo4.jpg.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      caption: "\u201cWhen you smile like that, every worry in the world disappears for me.\u201d",
      moment: "My heart in one frame 💗",
      rotation: 3
    },
    {
      image: "assets/photos/photo5.jpg.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "\u201cSitting by the river with you \u2014 the water was beautiful, but you were more.\u201d",
      moment: "Our little escape together 🌊",
      rotation: -1
    },
    {
      image: "assets/photos/photo6.jpg.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      caption: "\u201cWherever we stand together, that place becomes my favorite place on earth.\u201d",
      moment: "The river, the sky, and you 🩵",
      rotation: 2
    }
  ],

  // 5. BIRTHDAY WISH & LOVE LETTER 💌
  midnightHeading: "Happy Birthday, my love. ❤️",
  midnightSubheading: "Today is the birthday of someone who makes my world a little more beautiful just by being in it.",

  // The letter inside the interactive envelope:
  letter: {
    badge: "For Your Eyes Only",
    salutation: "My Dearest,",
    paragraphs: [
      "I still remember the first time you smiled at me. The world felt a little softer, a little brighter, and somehow, suddenly made sense.",
      "Thank you for being my safe haven, my happiest laugh, and my favorite adventure. Thank you for simply being you.",
      "As you blow out your candles today, I want you to remember that every dream you have is worth chasing, and I will always be right beside you, cheering you on.",
      "You are not just a part of my life.",
      "You are one of the most beautiful reasons I love my life."
    ],
    closing: "Happy Birthday, my love. ❤️",
    signature: "— Yours, always."
  },

  // 6. VIDEO MEMORY 🎞️
  // Drop your video file in 'assets/' folder and name it 'video.mp4'
  // Supported formats: .mp4 (recommended), .webm
  // Keep it under ~50MB for smooth mobile loading
  videoFile: "assets/video.mp4",
  videoCaption: "\"Every second of this — I would live it a thousand times over.\" ❤️",

  // 7. MUSIC CONFIGURATION
  // Drop your mp3 file in 'assets/music.mp3'
  // If the file is missing, the site plays a built-in gentle romantic piano/music-box chime melody automatically!
  musicFile: "assets/music.mp3",
  defaultVolume: 0.7,

  // 7. TESTING / PREVIEW CONTROLS
  // Set to true while designing if you want to bypass the countdown and see the midnight surprise immediately.
  // Tip: You can also append ?preview=true to the URL in your browser to test it anytime!
  forceUnlockPreview: false
};
