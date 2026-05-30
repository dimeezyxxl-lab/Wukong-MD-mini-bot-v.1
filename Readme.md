<div align="center">

# Wukong-MD
### The Celestial WhatsApp Guardian

[![Made with Baileys](https://img.shields.io/badge/Made%20with-Baileys-00bcd4?style=for-the-badge)](https://github.com/WhiskeySockets/Baileys)
[![Architecture](https://img.shields.io/badge/Architected%20by-XyzTech-9370DB?style=for-the-badge)](https://github.com/mruniquehacker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<!-- Wukong Identity -->
<img src="utils/wukong.jpg" alt="Wukong-MD" width="300">

</div>

**Wukong-MD** is a professional-grade WhatsApp MD bot architected by **XyzTech**. Designed for the digital battlefield, it is fast, stable, and highly maintainable. It leverages advanced resource management—including the **Celestial Repository**—to ensure your bot remains active within the digital heavens 24/7.

---

## ✨ Celestial Features

- **Celestial Purifier** – Automated temp file management to prevent system crashes (ENOSPC errors) and maintain harmony.
- **Identity Navigator** – Advanced LID-aware matching to seamlessly bridge the gap between mortal Phone Numbers and Linked Identifiers (LIDs).
- **Celestial Transmuter** – High-performance media conversion engine for shaping stickers, audio, and video for the WhatsApp environment.
- **Sacred Stats Manager** – Deep tracking of group activity and engagement through archived scrolls.
- **Modular Command System** – All powers (commands) are cataloged for easy expansion.
- **Optimized for Stability** – RAM‑optimized media streaming and refined session handling.

---

## 🚀 Manifestation (Deployment)

### 1. Fork the Repository
<div align="center">
<a href="https://github.com/mruniquehacker/Wukong-MD/fork" target="_blank">
  <img src="https://img.shields.io/badge/Fork%20Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Fork on GitHub">
</a>
</div>

### 2. Obtain Your Session
To obtain your unique **Wukong-MD** session string, generate it locally to ensure compatibility with your deployment:

1. **Clone your repository** to your local machine or Termux environment.
2. **Install dependencies** by running `npm install` in your terminal.
3. **Start the bot locally** using `node index.js`.
4. **Link your account** when prompted in the terminal by scanning the pairing code with your WhatsApp "Linked Devices" menu.
5. **Copy the generated session string** (formatted as `WukongMD!...`) displayed in your terminal.

### 3. Final Configuration
Paste your unique session string into your `config.js` or your Render Environment Variables:
```js
sessionID: 'WukongMD!YourUniqueStringHere'
