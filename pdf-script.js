// Same word list as the main app
const BINGO_WORDS = [
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
    "Documentation"
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
    
    // Generate a unique 5x5 bingo sheet
    generateUniqueSheet() {
        let attempts = 0;
        let sheet;
        
        do {
            // Get 24 random words (excluding center which will be FREE)
            const shuffledWords = this.shuffleArray(BINGO_WORDS);
            const selectedWords = shuffledWords.slice(0, 24);
            
            // Create 5x5 grid with FREE in center
            sheet = [];
            let wordIndex = 0;
            
            for (let i = 0; i < 25; i++) {
                if (i === 12) { // Center position (2,2)
                    sheet.push("FREE");
                } else {
                    sheet.push(selectedWords[wordIndex]);
                    wordIndex++;
                }
            }
            
            attempts++;
            
            // Prevent infinite loop (though very unlikely with 25 words)
            if (attempts > 1000) {
                console.warn("Could not generate unique sheet after 1000 attempts");
                break;
            }
            
        } while (this.isDuplicateSheet(sheet));
        
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
    generateSheetHTML(sheet, sheetNumber) {
        const headerRow = ['B', 'I', 'N', 'G', 'O'];
        
        return `
            <div class="bingo-sheet">
                <div class="sheet-header">
                    <h2>🎯 SE SOCIETY BINGO</h2>
                    <p>Sheet #${sheetNumber} - Get 5 in a row to win!</p>
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
                    SE Society Vibe Bingo - Generated ${new Date().toLocaleDateString()}
                </div>
            </div>
        `;
    }
    
    // Generate multiple sheets
    generateMultipleSheets(count) {
        const container = document.getElementById('sheetsContainer');
        container.innerHTML = '';
        
        // Reset for new generation
        this.generatedSheets = [];
        
        for (let i = 1; i <= count; i++) {
            const sheet = this.generateUniqueSheet();
            container.innerHTML += this.generateSheetHTML(sheet, i);
        }
        
        console.log(`✅ Generated ${count} unique bingo sheets!`);
    }
}

// Global generator instance
const sheetGenerator = new BingoSheetGenerator();

// Generate sheets function (called from HTML)
function generateSheets() {
    const count = parseInt(document.getElementById('sheetCount').value);
    
    if (count < 1 || count > 50) {
        alert('Please enter a number between 1 and 50');
        return;
    }
    
    if (count > 20) {
        const confirm = window.confirm(
            `Generating ${count} sheets might take a moment and create a large document. Continue?`
        );
        if (!confirm) return;
    }
    
    sheetGenerator.generateMultipleSheets(count);
    
    // Smooth scroll to first sheet
    setTimeout(() => {
        const firstSheet = document.querySelector('.bingo-sheet');
        if (firstSheet) {
            firstSheet.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Generate default sheets on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Bingo Sheet Generator loaded!');
    console.log(`📝 ${BINGO_WORDS.length} words available for sheet generation`);
    
    // Generate 5 sample sheets by default
    sheetGenerator.generateMultipleSheets(5);
}); 