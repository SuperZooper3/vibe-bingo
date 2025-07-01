// SE Society Bingo Words - 80 Epic Terms!
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

class BingoGame {
    constructor() {
        this.availableWords = [...BINGO_WORDS];
        this.calledWords = [];
        this.isSpinning = false;
        this.gameStarted = false;
        
        this.initializeElements();
        this.bindEvents();
        this.loadGameState();
        this.updateStats();
        this.setupBallAnimation();
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
    
    setupBallAnimation() {
        // Create multiple animated bouncing balls inside spinner
        this.balls = [];
        this.ballCount = 5;
        
        for (let i = 0; i < this.ballCount; i++) {
            const ball = document.createElement('div');
            ball.className = `bouncing-ball ball-${i + 1}`;
            this.spinner.appendChild(ball);
            
            // Each ball has different properties for varied animation
            const spinnerSize = this.spinner.offsetWidth || 400;
            const maxPos = spinnerSize - 60; // Account for ball size and borders
            
            this.balls.push({
                element: ball,
                x: 50 + Math.random() * Math.max(100, maxPos - 100),
                y: 50 + Math.random() * Math.max(100, maxPos - 100),
                velocityX: (Math.random() - 0.5) * 8,
                velocityY: (Math.random() - 0.5) * 8,
                size: 25
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
                
                // Bounce off edges with more dramatic physics
                const spinnerRect = this.spinner.getBoundingClientRect();
                const containerSize = Math.min(spinnerRect.width, spinnerRect.height) - 40; // Dynamic size minus padding
                if (ball.x <= ball.size || ball.x >= containerSize - ball.size) {
                    ball.velocityX *= -0.95; // Slight energy loss for realism
                    ball.x = Math.max(ball.size, Math.min(containerSize - ball.size, ball.x));
                }
                if (ball.y <= ball.size || ball.y >= containerSize - ball.size) {
                    ball.velocityY *= -0.95;
                    ball.y = Math.max(ball.size, Math.min(containerSize - ball.size, ball.y));
                }
                
                // Apply gravity effect
                ball.velocityY += 0.1;
                
                // Apply position
                ball.element.style.left = `${ball.x - ball.size/2}px`;
                ball.element.style.top = `${ball.y - ball.size/2}px`;
                
                // Add some random motion to keep it interesting
                if (Math.random() < 0.005) {
                    ball.velocityX += (Math.random() - 0.5) * 2;
                    ball.velocityY += (Math.random() - 0.5) * 2;
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
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.bingoGame = new BingoGame();
    console.log('🎯 SE Society Vibe Bingo loaded and ready!');
    console.log(`📝 ${BINGO_WORDS.length} words loaded for this epic game!`);
}); 