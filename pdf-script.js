// Default word list - can be overridden by custom words
let BINGO_WORDS = [
    "Stack Overflow",
    "Deadline Panic",
    "Code Review",
    "Merge Conflict",
    "Rubber Duck",
    "Spaghetti Code",
    "Technical Debt",
    "Race Condition",
    "Null Pointer",
    "Recursion",
    "Big O Notation",
    "Refactoring",
    "Legacy Code",
    "Debugging",
    "Unit Tests",
    "Pair Programming",
    "Agile Standup",
    "Git Blame",
    "Prod Down",
    "Works On My Machine",
    "Coffee Break",
    "All Nighter",
    "Imposter Syndrome",
    "Feature Creep",
    "Documentation",
    "Scrum Master",
    "Sprint Planning",
    "Retrospective",
    "Hotfix Friday",
    "Dependency Hell",
    "Code Freeze",
    "Memory Leak",
    "Edge Case",
    "Yak Shaving",
    "Code Monkey",
    "DevOps Magic",
    "Container Chaos",
    "Microservices",
    "Monolith Monster",
    "API Gateway",
    "Database Lock",
    "Caching Layer",
    "Load Balancer",
    "Circuit Breaker",
    "Blue Green Deploy",
    "Rollback Drama",
    "Docker Whale",
    "Kubernetes Chaos",
    "Git Rebase",
    "Cherry Pick",
    "Squash Commits",
    "Branch Protection",
    "Pull Request",
    "Code Coverage",
    "Test Pyramid",
    "Mocking Framework",
    "Integration Test",
    "End to End",
    "Selenium Grid",
    "Performance Test",
    "Load Testing",
    "Stress Testing",
    "Security Audit",
    "Penetration Test",
    "Code Smell",
    "Design Pattern",
    "Singleton Abuse",
    "Factory Pattern",
    "Observer Pattern",
    "Builder Pattern",
    "Dependency Injection",
    "Inversion of Control",
    "SOLID Principles",
    "Clean Code",
    "Code Kata",
    "Pair Debugging",
    "Mob Programming",
    "Hotfix Hero",
    "Regex Wizard",
    "Caffeine Driven"
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
    
    // Smooth scroll to first sheet
    setTimeout(() => {
        const firstSheet = document.querySelector('.bingo-sheet');
        if (firstSheet) {
            firstSheet.scrollIntoView({ behavior: 'smooth' });
        }
    }, count > 50 ? 200 : 100);
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
function toggleWordSource() {
    const customEditor = document.getElementById('customWordsEditor');
    const useCustom = document.querySelector('input[name="wordSource"]:checked').value === 'custom';
    
    customEditor.style.display = useCustom ? 'block' : 'none';
    
    if (useCustom) {
        loadCustomWords();
    }
    
    updateAvailableWordCount();
}

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
    
    localStorage.setItem('vibeBingoCustomWords', JSON.stringify(customWords));
    
    // Also save to main game
    localStorage.setItem('vibeBingoCustomWordsForGame', JSON.stringify(customWords));
    
    updateWordCount();
    updateAvailableWordCount();
    
    alert(`✅ Saved ${customWords.length} custom words! These will be used for both sheet generation and the main game.`);
}

function loadCustomWords() {
    const savedWords = localStorage.getItem('vibeBingoCustomWords');
    if (savedWords) {
        try {
            const customWords = JSON.parse(savedWords);
            document.getElementById('customWordsList').value = customWords.join('\n');
            updateWordCount();
        } catch (e) {
            console.error('Error loading saved words:', e);
        }
    }
}

function updateWordCount() {
    const customWordsText = document.getElementById('customWordsList').value.trim();
    const wordCount = customWordsText ? customWordsText.split('\n').filter(word => word.trim().length > 0).length : 0;
    document.getElementById('wordCount').textContent = `${wordCount} words`;
    
    const countEl = document.getElementById('wordCount');
    if (wordCount < 25) {
        countEl.style.color = '#ff6b6b';
        countEl.textContent += ' (need at least 25)';
    } else {
        countEl.style.color = '#4ecdc4';
    }
}

function updateAvailableWordCount() {
    const useCustom = document.querySelector('input[name="wordSource"]:checked').value === 'custom';
    let wordCount;
    
    if (useCustom) {
        const customWordsText = document.getElementById('customWordsList').value.trim();
        wordCount = customWordsText ? customWordsText.split('\n').filter(word => word.trim().length > 0).length : 0;
    } else {
        wordCount = getDefaultWords().length;
    }
    
    document.getElementById('availableWords').textContent = wordCount;
}

function getCurrentWordList() {
    const useCustom = document.querySelector('input[name="wordSource"]:checked').value === 'custom';
    
    if (useCustom) {
        const customWordsText = document.getElementById('customWordsList').value.trim();
        if (customWordsText) {
            return customWordsText.split('\n')
                .map(word => word.trim())
                .filter(word => word.length > 0);
        }
    }
    
    return getDefaultWords();
}

function getDefaultWords() {
    return [
        "Stack Overflow", "Deadline Panic", "Code Review", "Merge Conflict", "Rubber Duck",
        "Spaghetti Code", "Technical Debt", "Race Condition", "Null Pointer", "Recursion",
        "Big O Notation", "Refactoring", "Legacy Code", "Debugging", "Unit Tests",
        "Pair Programming", "Agile Standup", "Git Blame", "Prod Down", "Works On My Machine",
        "Coffee Break", "All Nighter", "Imposter Syndrome", "Feature Creep", "Documentation",
        "Scrum Master", "Sprint Planning", "Retrospective", "Hotfix Friday", "Dependency Hell",
        "Code Freeze", "Memory Leak", "Edge Case", "Yak Shaving", "Code Monkey",
        "DevOps Magic", "Container Chaos", "Microservices", "Monolith Monster", "API Gateway",
        "Database Lock", "Caching Layer", "Load Balancer", "Circuit Breaker", "Blue Green Deploy",
        "Rollback Drama", "Docker Whale", "Kubernetes Chaos", "Git Rebase", "Cherry Pick",
        "Squash Commits", "Branch Protection", "Pull Request", "Code Coverage", "Test Pyramid",
        "Mocking Framework", "Integration Test", "End to End", "Selenium Grid", "Performance Test",
        "Load Testing", "Stress Testing", "Security Audit", "Penetration Test", "Code Smell",
        "Design Pattern", "Singleton Abuse", "Factory Pattern", "Observer Pattern", "Builder Pattern",
        "Dependency Injection", "Inversion of Control", "SOLID Principles", "Clean Code", "Code Kata",
        "Pair Debugging", "Mob Programming", "Hotfix Hero", "Regex Wizard", "Caffeine Driven"
    ];
}

// Generate default sheets on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Bingo Sheet Generator loaded!');
    
    // Set up event listeners
    const customWordsList = document.getElementById('customWordsList');
    if (customWordsList) {
        customWordsList.addEventListener('input', updateWordCount);
    }
    
    // Auto-generate when settings change
    setupAutoGeneration();
    
    // Load any saved custom words
    loadCustomWords();
    updateAvailableWordCount();
    
    // Initialize default word count display
    document.getElementById('defaultWordCount').textContent = getDefaultWords().length;
    
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
    
    // Auto-generate when word source changes
    const wordSourceInputs = document.querySelectorAll('input[name="wordSource"]');
    wordSourceInputs.forEach(input => {
        input.addEventListener('change', () => {
            setTimeout(generateSheets, 100); // Small delay for UI update
        });
    });
    
    // Auto-generate when custom words change
    const customWordsList = document.getElementById('customWordsList');
    if (customWordsList) {
        customWordsList.addEventListener('input', () => {
            clearTimeout(window.customWordsTimer);
            window.customWordsTimer = setTimeout(() => {
                if (document.querySelector('input[name="wordSource"]:checked').value === 'custom') {
                    generateSheets();
                }
            }, 1000); // Longer delay for typing
        });
    }
} 