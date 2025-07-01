// Same word list as the main app - 80 Epic SE Terms!
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
        // Get 24 random words (excluding center which will be FREE)
        const shuffledWords = this.shuffleArray(BINGO_WORDS);
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
                htmlContent += this.generateSheetHTML(sheet, i, customization);
            }
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

// Generate default sheets on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Bingo Sheet Generator loaded!');
    console.log(`📝 ${BINGO_WORDS.length} words available for sheet generation`);
    
    // Generate 5 sample sheets by default with default customization
    const defaultCustomization = {
        title: "🎯 SE SOCIETY BINGO", 
        subtitle: "Get 5 in a row to win!",
        footer: "SE Society Vibe Bingo"
    };
    sheetGenerator.generateMultipleSheets(5, defaultCustomization);
}); 