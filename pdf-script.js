// 🎯 SINGLE SOURCE OF TRUTH FOR ALL BINGO WORDS
// This is the ONLY place where the default word list is defined
// Both the main game and PDF generator pull from the unified localStorage system
const BINGO_WORDS = [
    "Stack Overflow",
    "Vibe Coding",
    "Code Review",
    "Merge Conflict",
    "Rubber Duck",
    "Your Spaghetti Code",
    "Tech Debt",
    "Null Pointer",
    "Recursion",
    "Big O Notation",
    "Debugging",
    "Unit Tests",
    "Pair Programming",
    "Third Standup of the Day",
    "Prod Down",
    "I Broke Prod",
    "Works On My Machine",
    "All Nighter",
    "Imposter Syndrome",
    "Feature Creep",
    '"Documentation"',
    "Dependency Hell",
    "Memory Leak",
    "Edge Case",
    "Code Monkey",
    "Fuck Kubernetes",
    "Database Lock",
    "AVL Tree",
    "Observer Pattern",
    "Generating Series",
    "Rollback Drama",
    "Git Rebase",
    "Cherry Pick",
    "Pull Request",
    "Integration Test",
    "Penetration Test",
    "Dependency Injection",
    "SOLID",
    "Meeting About a Meeting",
    "Coffee Driven Development",
    "Works on Localhost",
    "Push to Main Friday",
    "No Tests? No Problem",
    "Magic Number 42",
    "TODO: Fix This Later",
    "It's Not a Bug, It's a Feature",
    "Have You Tried Restarting?",
    "Microservice Hell",
    "Ticket Limbo",
    "Slack Notification PTSD",
    "Code Review Nitpicking",
    "Intern Asked Good Question",
    "We'll Refactor Later",
    "I use Linux Actually",
    "Hotfix on Friday 5PM",
    "Off by One Error",
    "Segmentation Fault",
    "Infinite Loop",
    "Waterloo Works",
    "Coop Job Rejection",
    "Resume Padding",
    "Leetcode Grinding",
    "System Design Interview",
    "Whiteboard Anxiety",
    "Networking Event Small Talk",
    "LinkedIn Humble Brag",
    "Startup Ping Pong Table",
    "Free Pizza Motivation",
    "Hackathons",
    "Open Source Contribution",
    "GitHub Green Squares",
    "Stackoverflow Reputation",
    "Vim Exit Tutorial",
    "Dark Mode Everything",
    "RGB Keyboard Priorities",
    "Mechanical Keyboard Noise",
    "Multiple Monitor Setup",
    "Merge Conflict Nightmare",
    "Git Rebase Gone Wrong",
    "Force Push Main",
    "Deprecated Library Usage",
    "Legacy Code Archaeology",
    "Technical Debt Compound Interest",
    "Code Review Perfectionism",
    "Console.log Everywhere",
];

class BingoSheetGenerator {
    constructor() {
        this.generatedSheets = [];
    }
    
    // Fisher-Yates shuffle algorithm
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Generate a randomized 5x5 bingo sheet
    generateUniqueSheet() {
        // Get current word list (default or custom)
        const currentWords = getCurrentWordList();
        
        console.log(`🎲 Using ${currentWords.length} words for sheet generation`);
        
        if (currentWords.length < 24) {
            alert(`⚠️ Need at least 24 words to generate bingo sheets! You have ${currentWords.length} words.`);
            return null;
        }
        
        // Get 24 random words (excluding center which will be FREE)
        const shuffledWords = this.shuffleArray(currentWords);
        const selectedWords = shuffledWords.slice(0, 24);
        
        // Create 5x5 grid with FREE in center
        const sheet = [];
        let wordIndex = 0;
        
        for (let i = 0; i < 25; i++) {
            if (i === 12) { // Center position (2,2)
                sheet.push("FREE");
            } else {
                sheet.push(selectedWords[wordIndex]);
                wordIndex++;
            }
        }
        
        // For large sheet counts, we don't enforce strict uniqueness 
        // as it becomes mathematically improbable with limited word sets
        this.generatedSheets.push(sheet);
        return sheet;
    }
    
    // Check if a sheet is a duplicate
    isDuplicateSheet(sheet) {
        return this.generatedSheets.some(existingSheet => 
            this.arraysEqual(existingSheet, sheet)
        );
    }
    
    // Compare two arrays for equality
    arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        return a.every((val, index) => val === b[index]);
    }
    
    // Generate HTML for a single bingo sheet
    generateSheetHTML(sheet, sheetNumber, customization = {}) {
        const headerRow = ['B', 'I', 'N', 'G', 'O'];
        const title = customization.title || "🎯 SE SOCIETY BINGO";
        const subtitle = `Sheet #${sheetNumber} - ${customization.subtitle || "Get 5 in a row to win!"}`;
        const footer = customization.footer || "SE Society Vibe Bingo";
        
        return `
            <div class="bingo-sheet">
                <div class="sheet-header">
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                </div>
                <div class="name-section">
                    <strong>Name:</strong>
                    <div class="name-line"></div>
                </div>
                <div class="bingo-grid">
                    ${headerRow.map(letter => 
                        `<div class="bingo-cell header">${letter}</div>`
                    ).join('')}
                    ${sheet.map((word, index) => 
                        `<div class="bingo-cell ${word === 'FREE' ? 'free' : ''}">${word}</div>`
                    ).join('')}
                </div>
                <div class="sheet-footer">
                    ${footer} - Generated ${new Date().toLocaleDateString()}
                </div>
            </div>
        `;
    }
    
    // Generate multiple sheets
    generateMultipleSheets(count, customization = {}) {
        const container = document.getElementById('sheetsContainer');
        container.innerHTML = '';
        
        // Reset for new generation
        this.generatedSheets = [];
        
        // Show progress for large batches
        if (count > 50) {
            container.innerHTML = `<div style="text-align: center; color: white; padding: 40px;">
                <h3>🎲 Generating ${count} sheets...</h3>
                <p>This might take a moment for large batches!</p>
            </div>`;
        }
        
        // Use setTimeout to allow UI to update
        setTimeout(() => {
            let htmlContent = '';
            for (let i = 1; i <= count; i++) {
                const sheet = this.generateUniqueSheet();
                if (!sheet) {
                    // Error already shown in generateUniqueSheet
                    return;
                }
                htmlContent += this.generateSheetHTML(sheet, i, customization);
            }
            
            // Only add sheets to container, no extra text
            container.innerHTML = htmlContent;
            console.log(`✅ Generated ${count} unique bingo sheets!`);
        }, count > 50 ? 100 : 0);
    }
}

// Global generator instance
const sheetGenerator = new BingoSheetGenerator();

// Generate sheets function (called from HTML)
function generateSheets() {
    const count = parseInt(document.getElementById('sheetCount').value);
    
    if (count < 1 || count > 200) {
        alert('Please enter a number between 1 and 200');
        return;
    }
    
    if (count > 50) {
        const confirm = window.confirm(
            `Generating ${count} sheets will create a large document and might take a moment. Continue?`
        );
        if (!confirm) return;
    }
    
    // Get customization values
    const customization = {
        title: document.getElementById('eventTitle').value || "🎯 SE SOCIETY BINGO",
        subtitle: document.getElementById('eventSubtitle').value || "Get 5 in a row to win!",
        footer: document.getElementById('footerText').value || "SE Society Vibe Bingo"
    };
    
    sheetGenerator.generateMultipleSheets(count, customization);
}

// Simple, reliable print function
function printSheets() {
    // Check if there are sheets to print
    const sheetsContainer = document.getElementById('sheetsContainer');
    const sheets = sheetsContainer.querySelectorAll('.bingo-sheet');
    
    if (sheets.length === 0) {
        alert('⚠️ No sheets to print! Please generate some sheets first.');
        return;
    }
    
    console.log(`🖨️ Printing ${sheets.length} sheets...`);
    
    // Hide the generator panel during printing
    const generatorPanel = document.querySelector('.generator-panel');
    const originalDisplay = generatorPanel.style.display;
    generatorPanel.style.display = 'none';
    
    // Force clean print styles
    document.body.style.background = 'white';
    document.body.style.color = 'black';
    
    // Trigger print
    window.print();
    
    // Restore original styles after print dialog closes
    setTimeout(() => {
        generatorPanel.style.display = originalDisplay;
        document.body.style.background = '';
        document.body.style.color = '';
    }, 1000);
}

// Custom word management
// Remove toggleWordSource function as we no longer need radio buttons

function saveCustomWords() {
    const customWordsText = document.getElementById('customWordsList').value.trim();
    if (!customWordsText) {
        alert('Please enter some words first!');
        return;
    }
    
    const customWords = customWordsText.split('\n')
        .map(word => word.trim())
        .filter(word => word.length > 0);
    
    if (customWords.length < 25) {
        alert('⚠️ You need at least 25 words for bingo sheets to work properly!');
        return;
    }
    
    // Save to unified storage
    localStorage.setItem('vibeBingoUnifiedWords', JSON.stringify(customWords));
    
    updateWordCount();
    updateAvailableWordCount();
    
    alert(`✅ Saved ${customWords.length} words! These will be used for both sheet generation and the main game.`);
}

function loadSavedWords() {
    const savedWords = localStorage.getItem('vibeBingoUnifiedWords');
    if (savedWords) {
        try {
            const words = JSON.parse(savedWords);
            document.getElementById('customWordsList').value = words.join('\n');
            updateWordCount();
        } catch (e) {
            console.error('Error loading saved words:', e);
            // Load defaults if error
            document.getElementById('customWordsList').value = getDefaultWords().join('\n');
            updateWordCount();
        }
    } else {
        // Initialize with defaults
        const defaultWords = getDefaultWords();
        localStorage.setItem('vibeBingoUnifiedWords', JSON.stringify(defaultWords));
        document.getElementById('customWordsList').value = defaultWords.join('\n');
        updateWordCount();
    }
}

function resetToDefaultWords() {
    const confirmed = confirm('🔄 Reset to default SE words? This will replace your current word list.');
    if (!confirmed) return;
    
    const defaultWords = getDefaultWords();
    localStorage.setItem('vibeBingoUnifiedWords', JSON.stringify(defaultWords));
    document.getElementById('customWordsList').value = defaultWords.join('\n');
    updateWordCount();
    updateAvailableWordCount();
    
    alert('✅ Reset to default SE words! Your main game will use these words too.');
}

function updateWordCount() {
    const customWordsText = document.getElementById('customWordsList').value.trim();
    // Count actual entries, not just lines (filters out empty lines and trims whitespace)
    const actualEntries = customWordsText ? 
        customWordsText.split('\n')
            .map(word => word.trim())
            .filter(word => word.length > 0) : [];
    
    const entryCount = actualEntries.length;
    document.getElementById('wordCount').textContent = `${entryCount} entries`;
    
    const countEl = document.getElementById('wordCount');
    if (entryCount < 25) {
        countEl.style.color = '#ff6b6b';
        countEl.textContent += ' (need at least 25)';
    } else {
        countEl.style.color = '#4ecdc4';
    }
    
    // Debug log to show actual vs expected
    console.log(`📊 Textarea entries: ${entryCount}, Default array entries: ${BINGO_WORDS.length}`);
}

function updateAvailableWordCount() {
    const savedWords = getCurrentWordList();
    document.getElementById('availableWords').textContent = savedWords.length;
    console.log(`🎯 Available words for generation: ${savedWords.length}`);
}

function getCurrentWordList() {
    // Always use the unified saved word list
    const savedWords = localStorage.getItem('vibeBingoUnifiedWords');
    
    if (savedWords) {
        try {
            const parsedWords = JSON.parse(savedWords);
            if (parsedWords && parsedWords.length >= 24) {
                return parsedWords;
            }
        } catch (e) {
            console.error('Error loading saved words:', e);
        }
    }
    
    // Fallback to defaults if no saved words
    return getDefaultWords();
}

function getDefaultWords() {
    return BINGO_WORDS;
}

// Generate default sheets on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Bingo Sheet Generator loaded!');
    console.log('🎯 This is the SINGLE SOURCE OF TRUTH for all bingo words');
    
    // Set up event listeners
    const customWordsList = document.getElementById('customWordsList');
    if (customWordsList) {
        customWordsList.addEventListener('input', () => {
            // Update word count immediately for visual feedback
            updateWordCount();
            // Update available word count
            updateAvailableWordCount();
        });
    }
    
    // Auto-generate when settings change
    setupAutoGeneration();
    
    // Load the unified word list (this initializes the system if needed)
    loadSavedWords();
    updateAvailableWordCount();
    
    // Auto-generate initial sheets
    generateSheets();
});

function setupAutoGeneration() {
    // Auto-generate when any setting changes
    const autoTriggerElements = [
        'sheetCount',
        'eventTitle', 
        'eventSubtitle',
        'footerText'
    ];
    
    autoTriggerElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                // Debounce to avoid too many rapid generations
                clearTimeout(window.autoGenTimer);
                window.autoGenTimer = setTimeout(generateSheets, 500);
            });
        }
    });
    
    // Auto-generate when word list changes
    const customWordsList = document.getElementById('customWordsList');
    if (customWordsList) {
        customWordsList.addEventListener('input', () => {
            clearTimeout(window.customWordsTimer);
            window.customWordsTimer = setTimeout(() => {
                generateSheets();
            }, 3000); // Wait 3 seconds after user stops typing
        });
    }
} 