# NewsRule 📺

**Your Feed. Your Rules.**  

NewsRule is an original smart TV news aggregator designed to run smoothly across generations of hardware. Powered by Google AI Studio, it parses live articles and delivers highly optimized, text-based summaries that look crisp and load instantly on anything from a modern 4K smart display to a legacy CRT television.

## ✨ Features

*   **Google AI Studio Integration:** Pulls live data using the Gemini API to summarize heavy, cluttered articles into punchy, easy-to-read bullet points.
*   **Automatic Hardware Profile Detection:** Automatically checks system memory and CPU core counts to dynamically switch layouts:
    *   *Modern Rich:* Enables transparent overlays, smooth transitions, and high-definition visual assets.
    *   *Legacy Lite:* Forces ultra-fast text summaries and strips heavy media to maximize performance on low-end processors.
*   **Manual Override Toggles:** Gives users complete control in the settings menu to manually lock the interface into "Lite" or "Rich" profiles regardless of automatic hardware scans.
*   **Anti-Copying Protection:** Built-in system blocks (`FLAG_SECURE`) prevent unauthorized screen recording or content copying, securing original layouts and data streams.
*   **High-Contrast White Theme:** A selectable option designed specifically for faded or aging televisions to maximize legibility from a distance.
*   **Burn-In Prevention Screensaver:** Automatically initializes a centered digital clock and bottom logo screensaver when the app is idle to protect older TV panels from burn-in.
*   **Live Weather Integration:** Built-in regional tracking providing real-time temperatures, conditions, and clothing alerts tailored for Baku, Azerbaijan.

## 🛠️ Project Setup

Ensure your layout repository files stay compliant and your credentials remain hidden before testing or compiling:

1. Create a local configuration properties file in your root workspace folder:
   ```properties
   // local.properties
   gemini.api.key=YOUR_SECURE_API_STUDIO_KEY
   ```
2. Confirm your configuration reader tracks this file path inside your `.gitignore` rules so it is never pushed publicly to the store platform.

## 📥 Installation

For direct deployment to an Android TV or Fire Stick:
1. Install the free **Downloader** utility app on your television.
2. Enter your direct GitHub Releases binary URL (`app-debug.apk`) to download and install the software instantly over your home network interface.
