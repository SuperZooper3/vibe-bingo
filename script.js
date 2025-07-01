// SE Society Bingo Words - Feel free to customize these!
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

class BingoGame {
    constructor() {
        this.availableWords = [...BINGO_WORDS];
        this.calledWords = [];
        this.isSpinning = false;
        this.gameStarted = false;
        
        this.initializeElements();
        this.bindEvents();
        this.updateStats();
    }
    
    initializeElements() {
        this.spinner = document.getElementById('spinner');
        this.spinnerWord = document.getElementById('spinnerWord');
        this.wordDisplay = document.getElementById('wordDisplay');
        this.spinBtn = document.getElementById('spinBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.resetConfirm = document.getElementById('resetConfirm');
        this.confirmReset = document.getElementById('confirmReset');
        this.cancelReset = document.getElementById('cancelReset');
        this.calledWordsContainer = document.getElementById('calledWords');
        this.totalCalled = document.getElementById('totalCalled');
        this.remaining = document.getElementById('remaining');
    }
    
    bindEvents() {
        this.spinBtn.addEventListener('click', () => this.spinWheel());
        this.resetBtn.addEventListener('click', () => this.showResetConfirm());
        this.confirmReset.addEventListener('click', () => this.resetGame());
        this.cancelReset.addEventListener('click', () => this.hideResetConfirm());
    }
    
    spinWheel() {
        if (this.isSpinning || this.availableWords.length === 0) return;
        
        this.isSpinning = true;
        this.gameStarted = true;
        this.spinBtn.disabled = true;
        this.spinBtn.textContent = '🌪️ SPINNING...';
        
        // Start spinning animation
        this.spinner.classList.add('spinning');
        
        // Show random words during spin
        this.showSpinningWords();
        
        // Stop spinning after 2 seconds and reveal word
        setTimeout(() => {
            this.revealWord();
        }, 2000);
    }
    
    showSpinningWords() {
        const spinDuration = 2000;
        const interval = 100;
        let elapsed = 0;
        
        const spinInterval = setInterval(() => {
            const randomWord = this.availableWords[Math.floor(Math.random() * this.availableWords.length)];
            this.spinnerWord.textContent = randomWord.toUpperCase();
            
            elapsed += interval;
            if (elapsed >= spinDuration) {
                clearInterval(spinInterval);
            }
        }, interval);
    }
    
    revealWord() {
        // Pick a random word from available words
        const randomIndex = Math.floor(Math.random() * this.availableWords.length);
        const selectedWord = this.availableWords[randomIndex];
        
        // Remove from available words and add to called words
        this.availableWords.splice(randomIndex, 1);
        this.calledWords.push({
            word: selectedWord,
            number: this.calledWords.length + 1,
            timestamp: new Date()
        });
        
        // Stop spinning animation
        this.spinner.classList.remove('spinning');
        
        // Dramatic reveal
        this.wordDisplay.textContent = selectedWord.toUpperCase();
        this.wordDisplay.classList.add('revealed');
        
        // Update spinner to show the word
        this.spinnerWord.textContent = selectedWord.toUpperCase();
        
        // Reset button states
        setTimeout(() => {
            this.isSpinning = false;
            this.spinBtn.disabled = this.availableWords.length === 0;
            this.spinBtn.textContent = this.availableWords.length === 0 ? 
                '🎉 ALL DONE!' : '🎲 SPIN THE WHEEL';
            this.wordDisplay.classList.remove('revealed');
            this.resetBtn.disabled = false;
        }, 800);
        
        // Update UI
        this.updateHistory();
        this.updateStats();
        
        // Celebration if all words called
        if (this.availableWords.length === 0) {
            this.celebrateGameEnd();
        }
    }
    
    updateHistory() {
        if (this.calledWords.length === 0) {
            this.calledWordsContainer.innerHTML = '<p class="no-words">No words called yet!</p>';
            return;
        }
        
        // Show most recent first
        const recentWords = [...this.calledWords].reverse();
        this.calledWordsContainer.innerHTML = recentWords.map(item => `
            <div class="word-item">
                <span>${item.word}</span>
                <span class="word-number">#${item.number}</span>
            </div>
        `).join('');
    }
    
    updateStats() {
        this.totalCalled.textContent = this.calledWords.length;
        this.remaining.textContent = this.availableWords.length;
    }
    
    showResetConfirm() {
        this.resetConfirm.style.display = 'block';
    }
    
    hideResetConfirm() {
        this.resetConfirm.style.display = 'none';
    }
    
    resetGame() {
        // Reset all game state
        this.availableWords = [...BINGO_WORDS];
        this.calledWords = [];
        this.isSpinning = false;
        this.gameStarted = false;
        
        // Reset UI elements
        this.spinnerWord.textContent = 'READY?';
        this.wordDisplay.textContent = 'Click SPIN to start!';
        this.spinBtn.disabled = false;
        this.spinBtn.textContent = '🎲 SPIN THE WHEEL';
        this.resetBtn.disabled = true;
        
        // Hide reset confirmation
        this.hideResetConfirm();
        
        // Update displays
        this.updateHistory();
        this.updateStats();
        
        console.log('🎮 Game reset! Ready for a new round!');
    }
    
    celebrateGameEnd() {
        setTimeout(() => {
            this.wordDisplay.textContent = '🎉 ALL WORDS CALLED! 🎉';
            this.spinnerWord.textContent = 'GAME COMPLETE!';
        }, 1000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.bingoGame = new BingoGame();
    console.log('🎯 SE Society Vibe Bingo loaded and ready!');
    console.log(`📝 ${BINGO_WORDS.length} words loaded for this epic game!`);
}); 