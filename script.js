// SINGLE SOURCE OF TRUTH: Word list is managed in pdf-script.js
// This game will ALWAYS pull from the unified localStorage system
let BINGO_WORDS = []; // Will be populated by loadCustomWords()

class BingoGame {
    constructor() {
        this.calledWords = [];
        this.isSpinning = false;
        this.gameStarted = false;
        
        this.initializeElements();
        this.bindEvents();
        
        // Load custom words FIRST, then set available words
        this.loadCustomWords();
        this.availableWords = [...BINGO_WORDS];
        
        this.loadGameState();
        this.updateHistory(); // Ensure history loads on startup
        this.updateStats();
        this.setupBallAnimation();
        
        // Bind reset function to global scope for HTML button
        window.resetGame = () => this.resetGame();
    }
    
    initializeElements() {
        this.spinner = document.getElementById('spinner');
        this.spinnerWord = document.getElementById('spinnerWord');
        this.wordDisplay = document.getElementById('wordDisplay');
        this.spinBtn = document.getElementById('spinBtn');
        this.calledWordsContainer = document.getElementById('calledWords');
        this.totalCalled = document.getElementById('totalCalled');
        this.remaining = document.getElementById('remaining');
    }
    
    bindEvents() {
        this.spinBtn.addEventListener('click', () => this.spinWheel());
        
        // Add spacebar support for spinning
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !this.isSpinning) {
                event.preventDefault(); // Prevent page scroll
                this.spinWheel();
            }
        });
    }
    
    spinWheel() {
        if (this.isSpinning || this.availableWords.length === 0) return;
        
        this.isSpinning = true;
        this.gameStarted = true;
        this.spinBtn.disabled = true;
        this.spinBtn.textContent = '🌪️ SPINNING...';
        
        // Start ball animation
        this.startBallAnimation();
        
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
        
        console.log(`🎲 Selected word: "${selectedWord}" (was ${this.availableWords.length} words available)`);
        
        // Remove from available words and add to called words
        this.availableWords.splice(randomIndex, 1);
        this.calledWords.push({
            word: selectedWord,
            number: this.calledWords.length + 1,
            timestamp: new Date()
        });
        
        // Stop ball animation
        this.stopBallAnimation();
        
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
                '🎉 ALL DONE!' : '🎲 SPIN (or press SPACE)';
            this.wordDisplay.classList.remove('revealed');
        }, 800);
        
        // Update UI and save state
        this.updateHistory();
        this.updateStats();
        this.saveGameState();
        
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
        
        // Check if this is the first word or if we're loading saved state
        const existingItems = this.calledWordsContainer.querySelectorAll('.word-item');
        const isFirstLoad = existingItems.length === 0 || this.calledWords.length !== existingItems.length;
        
        if (isFirstLoad) {
            // Full rebuild for initial load or state restoration
            const recentWords = [...this.calledWords].reverse();
            this.calledWordsContainer.innerHTML = recentWords.map(item => `
                <div class="word-item">
                    <span>${item.word}</span>
                    <span class="word-number">#${item.number}</span>
                </div>
            `).join('');
        } else {
            // Smooth insertion of new word at top
            const latestWord = this.calledWords[this.calledWords.length - 1];
            const newWordElement = document.createElement('div');
            newWordElement.className = 'word-item new-word';
            newWordElement.innerHTML = `
                <span>${latestWord.word}</span>
                <span class="word-number">#${latestWord.number}</span>
            `;
            
            // Remove "no words" message if it exists
            const noWordsMsg = this.calledWordsContainer.querySelector('.no-words');
            if (noWordsMsg) {
                noWordsMsg.remove();
            }
            
            // Insert at the top
            this.calledWordsContainer.insertBefore(newWordElement, this.calledWordsContainer.firstChild);
            
            // Trigger animation after a brief delay for smooth insertion
            requestAnimationFrame(() => {
                newWordElement.classList.remove('new-word');
            });
        }
    }
    
    updateStats() {
        this.totalCalled.textContent = this.calledWords.length;
        this.remaining.textContent = this.availableWords.length;
    }
    
    setupBallAnimation() {
        // Create multiple animated bouncing balls inside spinner
        this.balls = [];
        this.ballCount = 15; // More balls for authentic bingo tumbler feel
        
        for (let i = 0; i < this.ballCount; i++) {
            const ball = document.createElement('div');
            ball.className = `bouncing-ball ball-${(i % 18) + 1}`; // Cycle through colors
            this.spinner.appendChild(ball);
            
            // Each ball has different properties for varied animation
            const spinnerSize = this.spinner.offsetWidth || 400;
            const maxPos = spinnerSize - 60; // Account for ball size and borders
            
            this.balls.push({
                element: ball,
                x: 50 + Math.random() * Math.max(100, maxPos - 100),
                y: 50 + Math.random() * Math.max(100, maxPos - 100),
                velocityX: (Math.random() - 0.5) * 12, // Faster speeds!
                velocityY: (Math.random() - 0.5) * 12,
                size: 20 + Math.random() * 10, // Varied sizes for more chaos
                rotation: Math.random() * 360, // Initial rotation
                rotationSpeed: (Math.random() - 0.5) * 8 // Spin speed
            });
        }
        
        this.isAnimating = false;
    }
    
    startBallAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const animate = () => {
            this.balls.forEach(ball => {
                // Update ball position with increased speed
                ball.x += ball.velocityX;
                ball.y += ball.velocityY;
                
                // Bounce off edges with MORE dramatic physics
                const spinnerRect = this.spinner.getBoundingClientRect();
                const containerSize = Math.min(spinnerRect.width, spinnerRect.height) - 40; // Dynamic size minus padding
                if (ball.x <= ball.size || ball.x >= containerSize - ball.size) {
                    ball.velocityX *= -0.98; // More energy retention for chaos!
                    ball.x = Math.max(ball.size, Math.min(containerSize - ball.size, ball.x));
                    // Add explosion effect on wall hit
                    ball.velocityY += (Math.random() - 0.5) * 3;
                    // Change spin direction on bounce
                    ball.rotationSpeed *= -0.8;
                }
                if (ball.y <= ball.size || ball.y >= containerSize - ball.size) {
                    ball.velocityY *= -0.98;
                    ball.y = Math.max(ball.size, Math.min(containerSize - ball.size, ball.y));
                    // Add explosion effect on wall hit
                    ball.velocityX += (Math.random() - 0.5) * 3;
                    // Change spin direction on bounce
                    ball.rotationSpeed *= -0.8;
                }
                
                // Apply gravity effect
                ball.velocityY += 0.15;
                
                // Update rotation for spinning effect
                ball.rotation += ball.rotationSpeed;
                
                // Apply position, size, and rotation
                ball.element.style.left = `${ball.x - ball.size/2}px`;
                ball.element.style.top = `${ball.y - ball.size/2}px`;
                ball.element.style.width = `${ball.size}px`;
                ball.element.style.height = `${ball.size}px`;
                ball.element.style.transform = `rotate(${ball.rotation}deg)`;
                
                // Add MORE random motion for chaos!
                if (Math.random() < 0.01) {
                    ball.velocityX += (Math.random() - 0.5) * 4;
                    ball.velocityY += (Math.random() - 0.5) * 4;
                }
                
                // Random direction changes for extra excitement
                if (Math.random() < 0.003) {
                    ball.velocityX *= -0.8;
                    ball.velocityY *= -0.8;
                    // Random spin direction changes
                    ball.rotationSpeed += (Math.random() - 0.5) * 4;
                }
            });
            
            if (this.isAnimating) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    stopBallAnimation() {
        this.isAnimating = false;
    }
    
    saveGameState() {
        const gameState = {
            availableWords: this.availableWords,
            calledWords: this.calledWords,
            gameStarted: this.gameStarted
        };
        localStorage.setItem('vibeBindoGameState', JSON.stringify(gameState));
    }
    
    loadGameState() {
        const savedState = localStorage.getItem('vibeBindoGameState');
        if (savedState) {
            try {
                const gameState = JSON.parse(savedState);
                this.availableWords = gameState.availableWords || [...BINGO_WORDS];
                this.calledWords = gameState.calledWords || [];
                this.gameStarted = gameState.gameStarted || false;
                
                // Update initial UI based on loaded state
                if (this.calledWords.length > 0) {
                    const lastCalled = this.calledWords[this.calledWords.length - 1];
                    this.wordDisplay.textContent = lastCalled.word.toUpperCase();
                    this.spinnerWord.textContent = lastCalled.word.toUpperCase();
                    
                    // Hot load the history display
                    this.updateHistory();
                }
                
                // Update button text
                this.spinBtn.textContent = this.availableWords.length === 0 ? 
                    '🎉 ALL DONE!' : '🎲 SPIN (or press SPACE)';
                
                console.log(`🎮 Game state loaded! ${this.calledWords.length} words already called.`);
            } catch (e) {
                console.log('🎮 Starting fresh game!');
                this.availableWords = [...BINGO_WORDS];
                this.calledWords = [];
                this.gameStarted = false;
            }
        }
    }
    
    celebrateGameEnd() {
        setTimeout(() => {
            this.wordDisplay.textContent = '🎉 ALL WORDS CALLED! 🎉';
            this.spinnerWord.textContent = 'GAME COMPLETE!';
        }, 1000);
    }
    
    resetGame() {
        // Confirm reset
        const confirmed = confirm('🔄 Are you sure you want to reset the game? This will clear all called words and start fresh.');
        if (!confirmed) return;
        
        // Stop any current animations
        this.stopBallAnimation();
        this.isSpinning = false;
        
        // Reload saved words and reset game state
        this.loadCustomWords();
        this.availableWords = [...BINGO_WORDS]; // Reset to full word list
        this.calledWords = [];
        this.gameStarted = false;
        
        // Reset UI elements
        this.wordDisplay.textContent = 'Press SPIN or SPACEBAR to start!';
        this.spinnerWord.textContent = 'READY?';
        this.spinBtn.disabled = false;
        this.spinBtn.textContent = '🎲 SPIN (or press SPACE)';
        this.wordDisplay.classList.remove('revealed');
        
        // Update display
        this.updateHistory();
        this.updateStats();
        this.saveGameState();
        
        console.log('🔄 Game reset! Ready for a fresh start.');
    }
    
    loadCustomWords() {
        console.log('🔄 Loading words from unified system...');
        
        // ALWAYS pull from the unified localStorage system
        let savedWords = localStorage.getItem('vibeBingoUnifiedWords');
        
        if (!savedWords) {
            // If no saved words exist, that means the PDF generator hasn't been used yet
            // We'll initialize with a basic fallback, but the user should use the PDF generator
            console.warn('📝 No unified word list found! Please use the PDF Generator to manage words.');
            const basicWords = this.getBasicFallbackWords();
            localStorage.setItem('vibeBingoUnifiedWords', JSON.stringify(basicWords));
            BINGO_WORDS = [...basicWords];
            console.log(`📝 Initialized with ${BINGO_WORDS.length} basic fallback words.`);
        } else {
            try {
                const parsedWords = JSON.parse(savedWords);
                if (parsedWords && Array.isArray(parsedWords) && parsedWords.length >= 25) {
                    BINGO_WORDS = [...parsedWords];
                    console.log(`📝 Loaded ${BINGO_WORDS.length} words from unified system!`);
                    console.log(`📝 First few words: ${BINGO_WORDS.slice(0, 5).join(', ')}...`);
                } else {
                    console.error(`📝 Invalid word list in localStorage (${parsedWords ? parsedWords.length : 0} words)`);
                    const basicWords = this.getBasicFallbackWords();
                    BINGO_WORDS = [...basicWords];
                    console.log(`📝 Using ${BINGO_WORDS.length} fallback words.`);
                }
            } catch (e) {
                console.error('📝 Error parsing saved words:', e);
                const basicWords = this.getBasicFallbackWords();
                BINGO_WORDS = [...basicWords];
                console.log(`📝 Error recovery: Using ${BINGO_WORDS.length} fallback words.`);
            }
        }
        
        console.log(`✅ Word loading complete! Using ${BINGO_WORDS.length} words for the game.`);
    }
    
    getBasicFallbackWords() {
        // Basic fallback list - the real word list is managed in the PDF generator
        return [
            "Stack Overflow", "Code Review", "Merge Conflict", "Rubber Duck", "Tech Debt",
            "Null Pointer", "Recursion", "Big O Notation", "Debugging", "Unit Tests",
            "Pair Programming", "Prod Down", "Works On My Machine", "All Nighter", "Imposter Syndrome",
            "Feature Creep", "Documentation", "Dependency Hell", "Memory Leak", "Edge Case",
            "Code Monkey", "Database Lock", "Observer Pattern", "Git Rebase", "Cherry Pick",
            "Pull Request", "Integration Test", "Dependency Injection", "SOLID", "Meeting About a Meeting",
            "Coffee Driven Development", "Works on Localhost", "Push to Main Friday", "No Tests? No Problem", "Magic Number 42",
            "TODO: Fix This Later", "It's Not a Bug, It's a Feature", "Have You Tried Restarting?", "Microservice Hell", "Code Review Nitpicking",
            "Intern Asked Good Question", "We'll Refactor Later", "Hotfix on Friday 5PM", "Off by One Error", "Segmentation Fault",
            "Infinite Loop", "Waterloo Works", "Leetcode Grinding", "System Design Interview", "Whiteboard Anxiety"
        ];
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.bingoGame = new BingoGame();
    console.log('🎯 SE Society Vibe Bingo loaded and ready!');
    console.log(`📝 ${BINGO_WORDS.length} words loaded for this epic game!`);
}); 