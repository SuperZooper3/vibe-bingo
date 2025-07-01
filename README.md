# 🎯 SE Society Vibe Bingo

A fun, modern bingo calling app designed for live events! Perfect for projecting during presentations or gatherings.

## ✨ Features

### 🎮 Bingo Caller (Main App)
- **Bouncing Ball Animation**: Epic physics-based ball animation with dramatic word reveals
- **80 Custom SE-themed Words**: Comprehensive tech and software engineering vocabulary
- **Real-time Game Tracking**: Shows total called words and remaining count
- **Called Words History**: Right sidebar showing all previously called words
- **Reset Protection**: Confirmation dialog to prevent accidental game resets
- **Responsive Design**: Works great on all screen sizes
- **Event-Ready**: Single-user interface perfect for projection

### 📄 PDF Sheet Generator
- **Custom Word Lists**: Use your own words or stick with default SE terms - saves to browser storage
- **Print-Optimized Sheets**: Monochrome black & white design for clear printing
- **Thick Grid Lines**: 3px borders for excellent visibility and photocopying
- **Name Fields**: Built-in space for participants to write their names
- **Massive Scale Support**: Generate up to 200 sheets for large events
- **Full Customization**: Customize event title, subtitle, and footer text
- **Clean Print Layout**: Removes browser headers/footers for professional sheets
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
   - Choose how many sheets you need (1-200 sheets supported!)
   - Customize your event title, subtitle, and footer text
   - Click "Generate Sheets" then "Print All"
   - **Print Tip**: Turn OFF "Headers and footers" in browser print dialog for cleanest results
   - Distribute printed sheets to participants

### During the Event:
1. **Project the Main App**: Open `index.html` and project it for everyone to see
2. **Call Words**: Click "🎲 SPIN THE WHEEL" to randomly select words
3. **Enjoy the Show**: Watch the epic bouncing ball animation and dramatic reveals!
4. **Track Progress**: Monitor called words in the right sidebar
5. **Reset if Needed**: Use the protected reset button (requires confirmation)

## 🛠️ Customization

### Adding Your Own Words:
**Easy Way (Recommended):**
1. Open the PDF Generator page
2. Select "Use Custom Words" 
3. Enter your words (one per line, minimum 25 recommended)
4. Click "💾 Save Words" - this saves them for both sheet generation AND the main game!
5. Your custom words are saved in your browser and will persist between sessions

**Manual Way (Advanced):**
Edit the `BINGO_WORDS` array in both `script.js` and `pdf-script.js`:

```javascript
const BINGO_WORDS = [
    "Your Custom Word 1",
    "Your Custom Word 2",
    "Your Custom Word 3",
    // Add up to 80 words (or as many as you want!)
];
```

### Customizing Sheet Text:
Use the PDF generator's built-in customization fields:
- **Event Title**: Main header on each sheet
- **Subtitle**: Description text (will automatically include sheet numbers)
- **Footer Text**: Bottom text on each sheet

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
