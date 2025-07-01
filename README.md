# 🎯 SE Society Vibe Bingo

A fun, modern bingo calling app designed for live events! Perfect for projecting during presentations or gatherings.

## ✨ Features

### 🎮 Bingo Caller (Main App)
- **Spinning Wheel Animation**: Cool spinning UI with dramatic word reveals
- **25 Custom SE-themed Words**: Tech and software engineering themed bingo words
- **Real-time Game Tracking**: Shows total called words and remaining count
- **Called Words History**: Right sidebar showing all previously called words
- **Reset Protection**: Confirmation dialog to prevent accidental game resets
- **Responsive Design**: Works great on all screen sizes
- **Event-Ready**: Single-user interface perfect for projection

### 📄 PDF Sheet Generator
- **Printable Bingo Sheets**: Generate unique 5x5 bingo cards
- **Automatic Uniqueness**: Each sheet is guaranteed to be different
- **Customizable Quantity**: Generate 1-50 sheets at once
- **Print-Friendly**: Optimized layout for printing
- **FREE Center Square**: Classic bingo format with center free space

## 🚀 Getting Started

### Option 1: Quick Start (Local)
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "📄 Generate Bingo Sheets" to create printable cards
4. Use the main interface to call words during your event!

### Option 2: GitHub Pages Deployment (Recommended for Events)

#### Deploy to GitHub Pages:
1. **Fork this repository** to your GitHub account
2. Go to your forked repository settings
3. Scroll down to **"Pages"** section
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**
7. Wait 2-3 minutes, then visit: `https://yourusername.github.io/vibe-bingo`

#### Quick Deploy Alternative:
1. Create a new repository on GitHub
2. Upload all the files from this project
3. Enable GitHub Pages in settings
4. Your app will be live at: `https://yourusername.github.io/repository-name`

## 🎯 How to Use

### Before the Event:
1. **Generate Bingo Sheets**: 
   - Open the `pdf-generator.html` page (or click the PDF button)
   - Choose how many sheets you need (typically 10-20 for small events)
   - Click "Generate Sheets" then "Print All"
   - Distribute printed sheets to participants

### During the Event:
1. **Project the Main App**: Open `index.html` and project it for everyone to see
2. **Call Words**: Click "🎲 SPIN THE WHEEL" to randomly select words
3. **Enjoy the Show**: Watch the cool spinning animation and dramatic reveals!
4. **Track Progress**: Monitor called words in the right sidebar
5. **Reset if Needed**: Use the protected reset button (requires confirmation)

## 🛠️ Customization

### Adding Your Own Words:
Edit the `BINGO_WORDS` array in both `script.js` and `pdf-script.js`:

```javascript
const BINGO_WORDS = [
    "Your Custom Word 1",
    "Your Custom Word 2",
    "Your Custom Word 3",
    // Add up to 25 words
];
```

### Styling:
- Modify `style.css` to change colors, fonts, or layout
- The app uses CSS Grid and Flexbox for responsive design
- Colors use CSS gradients for that modern vibe ✨

## 📁 File Structure

```
vibe-bingo/
├── index.html          # Main bingo caller app
├── style.css           # Shared styles
├── script.js           # Bingo caller logic
├── pdf-generator.html  # Sheet generator page
├── pdf-script.js       # Sheet generator logic
└── README.md          # This file
```

## 🎨 Tech Stack

- **Pure HTML/CSS/JavaScript** - No frameworks needed!
- **CSS Grid & Flexbox** - Modern responsive layout
- **CSS Animations** - Smooth spinning and reveal effects
- **Web APIs** - Local storage for game state
- **Print Media Queries** - Optimized PDF generation

## 🐛 Troubleshooting

**Sheets won't print properly?**
- Make sure to use the "Print All" button
- Check your browser's print settings
- Try printing from the generated page view

**Animation looks choppy?**
- Ensure you're using a modern browser
- Check if hardware acceleration is enabled
- Try refreshing the page

**Words not randomizing?**
- Refresh the page to reset the random seed
- Make sure JavaScript is enabled

## 🎉 Perfect for:
- Software Engineering Society events
- Hackathons and coding meetups  
- Tech conferences and presentations
- Office parties and team building
- Any event where you want some interactive fun!

## 💡 Pro Tips
- **Test before your event**: Run through a few spins to make sure everything works
- **Have backup sheets**: Print a few extra bingo cards
- **Engage the audience**: Let participants call out "BINGO!" when they get 5 in a row
- **Multiple winners**: Consider having prizes for first bingo, blackout, etc.

---

Made with 💜 for the SE Society community. Ready to bring some vibe to your next event! 🚀
