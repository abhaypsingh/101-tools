// Final Utility Implementations - Completing all 101 Tools

// Sleep Debt Calculator
const SleepDebtCalculator = {
    sleepLog: [],
    targetHours: 8,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;
                     padding: 3rem; border-radius: var(--radius-lg); text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 1rem; opacity: 0.9;">Current Sleep Debt</div>
                    <div id="debt-display" style="font-size: 4rem; font-weight: bold; margin: 1rem 0;">0h</div>
                    <div id="debt-message" style="font-size: 1rem; opacity: 0.9;">You're well rested!</div>
                </div>

                <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Log Last Night's Sleep</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="number" id="sleep-hours" class="input-field" placeholder="Hours" min="0" max="24">
                        <button id="log-sleep" class="btn btn-primary">Log Sleep</button>
                    </div>
                </div>

                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>This Week</h3>
                    <div id="week-chart"></div>
                </div>
            </div>
        `;
        this.attachEvents();
        this.loadData();
    },

    attachEvents() {
        document.getElementById('log-sleep').addEventListener('click', () => {
            const hours = parseFloat(document.getElementById('sleep-hours').value);
            if (hours >= 0 && hours <= 24) {
                this.logSleep(hours);
                document.getElementById('sleep-hours').value = '';
            }
        });
    },

    logSleep(hours) {
        this.sleepLog.push({
            date: new Date().toDateString(),
            hours,
            debt: this.targetHours - hours
        });
        this.saveData();
        this.updateDisplay();
        Core.Toast.show('Sleep logged!', 'success');
    },

    updateDisplay() {
        const weekDebt = this.sleepLog
            .slice(-7)
            .reduce((sum, entry) => sum + entry.debt, 0);

        document.getElementById('debt-display').textContent = `${Math.abs(weekDebt)}h`;
        document.getElementById('debt-message').textContent =
            weekDebt > 0 ? 'Time to catch up on sleep!' :
            weekDebt < 0 ? 'You\'re getting extra rest!' :
            'You\'re well rested!';

        // Week chart
        const chart = document.getElementById('week-chart');
        const last7 = this.sleepLog.slice(-7);
        chart.innerHTML = last7.map(entry => `
            <div style="display: flex; justify-content: space-between; padding: 0.5rem;
                 background: var(--bg); border-radius: var(--radius); margin-bottom: 0.5rem;">
                <span>${new Date(entry.date).toLocaleDateString('en', {weekday: 'short'})}</span>
                <span style="color: ${entry.hours >= this.targetHours ? 'var(--success)' : 'var(--danger)'};">
                    ${entry.hours}h
                </span>
            </div>
        `).join('') || '<p style="color: var(--text-muted);">No sleep data yet</p>';
    },

    saveData() {
        Core.Storage.set('sleep-debt', this.sleepLog);
    },

    loadData() {
        this.sleepLog = Core.Storage.get('sleep-debt') || [];
        this.updateDisplay();
    }
};

// Meal Dice
const MealDice = {
    meals: {
        breakfast: ['Oatmeal', 'Eggs & Toast', 'Smoothie', 'Yogurt Parfait', 'Avocado Toast'],
        lunch: ['Salad', 'Sandwich', 'Soup', 'Buddha Bowl', 'Wrap'],
        dinner: ['Pasta', 'Stir Fry', 'Tacos', 'Curry', 'Pizza', 'Grilled Protein & Veggies'],
        snack: ['Fruit', 'Nuts', 'Veggies & Hummus', 'Cheese & Crackers', 'Popcorn']
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2>What Should I Eat?</h2>

                <div id="dice-container" style="margin: 2rem 0;">
                    <div id="meal-result" style="font-size: 2rem; min-height: 100px; display: flex;
                         align-items: center; justify-content: center; padding: 2rem;
                         background: var(--bg-secondary); border-radius: var(--radius-lg);">
                        <span style="color: var(--text-muted);">Roll the dice!</span>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <button onclick="MealDice.roll('breakfast')" class="btn btn-secondary" style="padding: 1rem;">
                        🌅 Breakfast
                    </button>
                    <button onclick="MealDice.roll('lunch')" class="btn btn-secondary" style="padding: 1rem;">
                        ☀️ Lunch
                    </button>
                    <button onclick="MealDice.roll('dinner')" class="btn btn-secondary" style="padding: 1rem;">
                        🌙 Dinner
                    </button>
                    <button onclick="MealDice.roll('snack')" class="btn btn-secondary" style="padding: 1rem;">
                        🍿 Snack
                    </button>
                </div>

                <button onclick="MealDice.rollAll()" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem;">
                    🎲 Full Day Menu
                </button>
            </div>
        `;
    },

    roll(type) {
        const options = this.meals[type];
        const result = options[Math.floor(Math.random() * options.length)];

        const display = document.getElementById('meal-result');
        display.style.animation = 'spin 0.5s';

        setTimeout(() => {
            display.innerHTML = `
                <div>
                    <div style="font-size: 1rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                        ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                    <div style="font-size: 2.5rem;">
                        ${result}
                    </div>
                </div>
            `;
            display.style.animation = '';
        }, 500);
    },

    rollAll() {
        const fullDay = Object.keys(this.meals).map(type => ({
            type,
            meal: this.meals[type][Math.floor(Math.random() * this.meals[type].length)]
        }));

        const display = document.getElementById('meal-result');
        display.innerHTML = fullDay.map(item => `
            <div style="margin: 0.5rem 0;">
                <strong>${item.type.charAt(0).toUpperCase() + item.type.slice(1)}:</strong>
                ${item.meal}
            </div>
        `).join('');
    }
};

// Screen Break Enforcer
const ScreenBreakEnforcer = {
    interval: 20,
    breakDuration: 20,
    isActive: false,
    timer: null,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg);">
                    <h3>20-20-20 Rule Enforcer</h3>
                    <p style="color: var(--text-muted);">Every 20 minutes, look at something 20 feet away for 20 seconds</p>

                    <div style="margin: 2rem 0;">
                        <label>Work interval (minutes)</label>
                        <input type="range" id="work-interval" min="10" max="60" value="20" style="width: 100%;">
                        <div style="text-align: center;" id="interval-display">20 minutes</div>
                    </div>

                    <button id="toggle-enforcer" class="btn btn-primary" style="width: 100%;">
                        Start Break Reminders
                    </button>
                </div>

                <div id="break-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                     background: rgba(0,0,0,0.95); z-index: 9999; color: white; text-align: center;
                     display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="font-size: 4rem; margin-bottom: 2rem;">👁️</div>
                    <h1>Screen Break Time!</h1>
                    <p style="font-size: 1.5rem; margin: 1rem 0;">Look away from your screen</p>
                    <div id="break-timer" style="font-size: 3rem; margin: 2rem 0;">20</div>
                    <button onclick="ScreenBreakEnforcer.skipBreak()" class="btn btn-secondary">Skip Break</button>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('work-interval').addEventListener('input', (e) => {
            this.interval = parseInt(e.target.value);
            document.getElementById('interval-display').textContent = `${this.interval} minutes`;
        });

        document.getElementById('toggle-enforcer').addEventListener('click', () => this.toggle());
    },

    toggle() {
        const btn = document.getElementById('toggle-enforcer');

        if (this.isActive) {
            this.stop();
            btn.textContent = 'Start Break Reminders';
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-primary');
        } else {
            this.start();
            btn.textContent = 'Stop Break Reminders';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-danger');
        }
    },

    start() {
        this.isActive = true;
        this.timer = setTimeout(() => this.enforceBreak(), this.interval * 60 * 1000);
        Core.Toast.show('Break reminders activated!', 'success');
    },

    stop() {
        this.isActive = false;
        clearTimeout(this.timer);
        Core.Toast.show('Break reminders stopped', 'info');
    },

    enforceBreak() {
        const overlay = document.getElementById('break-overlay');
        overlay.style.display = 'flex';

        let remaining = this.breakDuration;
        const timer = document.getElementById('break-timer');

        const countdown = setInterval(() => {
            remaining--;
            timer.textContent = remaining;

            if (remaining <= 0) {
                clearInterval(countdown);
                overlay.style.display = 'none';
                Core.Toast.show('Great job taking a break!', 'success');

                if (this.isActive) {
                    this.timer = setTimeout(() => this.enforceBreak(), this.interval * 60 * 1000);
                }
            }
        }, 1000);
    },

    skipBreak() {
        document.getElementById('break-overlay').style.display = 'none';
        if (this.isActive) {
            this.timer = setTimeout(() => this.enforceBreak(), this.interval * 60 * 1000);
        }
    }
};

// Implement remaining utilities with simplified versions
const RemainingUtilities = {
    // Boundary Script Writer
    BoundaryScriptWriter: {
        init() {
            const workspace = document.getElementById('utility-workspace');
            workspace.innerHTML = `
                <div style="max-width: 600px; margin: 0 auto;">
                    <h2>Boundary Script Writer</h2>
                    <select id="situation" class="input-field" style="width: 100%; margin-bottom: 1rem;">
                        <option>Extra work request</option>
                        <option>Personal space invasion</option>
                        <option>Time boundary</option>
                        <option>Emotional boundary</option>
                    </select>
                    <button onclick="RemainingUtilities.generateScript()" class="btn btn-primary">Generate Script</button>
                    <div id="script-output" style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary);
                         border-radius: var(--radius); display: none;"></div>
                </div>
            `;
        }
    },

    generateScript() {
        const situation = document.getElementById('situation').value;
        const scripts = {
            'Extra work request': "I appreciate you thinking of me for this project. However, I'm at capacity with my current commitments. I need to honor those first before taking on additional work.",
            'Personal space invasion': "I value our relationship, and I need some personal space right now. Let's find a time that works better for both of us.",
            'Time boundary': "I have a hard stop at [time]. Let's make sure we cover the most important points before then.",
            'Emotional boundary': "I care about you, and I'm not able to provide the emotional support you need right now. Have you considered talking to someone who might be better equipped to help?"
        };

        const output = document.getElementById('script-output');
        output.textContent = scripts[situation] || "I need to set a boundary here. Let me think about how to best express this.";
        output.style.display = 'block';
    },

    // Compliment Generator
    ComplimentGenerator: {
        init() {
            const compliments = [
                "Your perspective always adds something valuable",
                "You have a gift for making complex things simple",
                "Your creativity inspires those around you",
                "You handle challenges with remarkable grace",
                "Your attention to detail makes a real difference"
            ];

            const workspace = document.getElementById('utility-workspace');
            workspace.innerHTML = `
                <div style="max-width: 500px; margin: 0 auto; text-align: center;">
                    <h2>Meaningful Compliment Generator</h2>
                    <div id="compliment-display" style="font-size: 1.5rem; padding: 2rem; margin: 2rem 0;
                         background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
                         color: white; border-radius: var(--radius-lg); min-height: 100px;
                         display: flex; align-items: center; justify-content: center;">
                        Click to generate
                    </div>
                    <button onclick="RemainingUtilities.newCompliment()" class="btn btn-primary">
                        Generate Compliment
                    </button>
                </div>
            `;
        }
    },

    newCompliment() {
        const compliments = [
            "Your perspective always adds something valuable",
            "You have a gift for making complex things simple",
            "Your creativity inspires those around you",
            "Your attention to detail makes a real difference",
            "You bring out the best in people",
            "Your enthusiasm is contagious",
            "You have a talent for seeing solutions others miss",
            "Your kindness doesn't go unnoticed",
            "You make difficult tasks look effortless",
            "Your dedication sets an amazing example"
        ];

        const display = document.getElementById('compliment-display');
        display.textContent = compliments[Math.floor(Math.random() * compliments.length)];
    },

    // Reading Time Bank
    ReadingTimeBank: {
        init() {
            const workspace = document.getElementById('utility-workspace');
            workspace.innerHTML = `
                <div style="max-width: 600px; margin: 0 auto;">
                    <h2>Reading Time Bank</h2>
                    <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg);">
                        <h3>Bank Balance: <span id="bank-balance">0</span> minutes</h3>
                        <input type="number" id="deposit-time" class="input-field" placeholder="Minutes read">
                        <button onclick="RemainingUtilities.deposit()" class="btn btn-primary">Deposit Time</button>
                        <button onclick="RemainingUtilities.withdraw()" class="btn btn-secondary">Withdraw 30min</button>
                    </div>
                </div>
            `;
            this.updateBalance();
        }
    },

    deposit() {
        const minutes = parseInt(document.getElementById('deposit-time').value) || 0;
        const current = parseInt(Core.Storage.get('reading-bank') || 0);
        Core.Storage.set('reading-bank', current + minutes);
        this.updateBalance();
        document.getElementById('deposit-time').value = '';
        Core.Toast.show(`Deposited ${minutes} minutes!`, 'success');
    },

    withdraw() {
        const current = parseInt(Core.Storage.get('reading-bank') || 0);
        if (current >= 30) {
            Core.Storage.set('reading-bank', current - 30);
            this.updateBalance();
            Core.Toast.show('Enjoy your reading time!', 'success');
        } else {
            Core.Toast.show('Insufficient balance!', 'error');
        }
    },

    updateBalance() {
        const balance = Core.Storage.get('reading-bank') || 0;
        const display = document.getElementById('bank-balance');
        if (display) display.textContent = balance;
    },

    // Conversation Starter Spinner
    ConversationStarterSpinner: {
        init() {
            const starters = [
                "What's the best advice you've ever received?",
                "If you could have dinner with anyone, who would it be?",
                "What's a skill you'd love to learn?",
                "What's your favorite way to spend a weekend?",
                "What's something you're looking forward to?",
                "What's a book that changed your perspective?",
                "If you could live anywhere, where would it be?",
                "What's your hidden talent?",
                "What's the most interesting place you've visited?",
                "What's a goal you're working toward?"
            ];

            const workspace = document.getElementById('utility-workspace');
            workspace.innerHTML = `
                <div style="max-width: 500px; margin: 0 auto; text-align: center;">
                    <h2>Conversation Starter</h2>
                    <div id="spinner-wheel" style="width: 300px; height: 300px; margin: 2rem auto;
                         background: conic-gradient(from 0deg, #3498db, #e74c3c, #f39c12, #2ecc71, #9b59b6);
                         border-radius: 50%; position: relative; cursor: pointer;"
                         onclick="RemainingUtilities.spinWheel()">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                             background: white; padding: 1rem; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                            SPIN
                        </div>
                    </div>
                    <div id="starter-result" style="font-size: 1.25rem; padding: 1rem;
                         background: var(--bg-secondary); border-radius: var(--radius); min-height: 60px;">
                        Spin the wheel!
                    </div>
                </div>
            `;
        }
    },

    spinWheel() {
        const starters = [
            "What's the best advice you've ever received?",
            "If you could have dinner with anyone, who would it be?",
            "What's a skill you'd love to learn?",
            "What's your favorite way to spend a weekend?",
            "What's something you're looking forward to?"
        ];

        const wheel = document.getElementById('spinner-wheel');
        const rotation = Math.random() * 360 + 720;
        wheel.style.transform = `rotate(${rotation}deg)`;
        wheel.style.transition = 'transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)';

        setTimeout(() => {
            const result = starters[Math.floor(Math.random() * starters.length)];
            document.getElementById('starter-result').textContent = result;
        }, 2000);
    },

    // Digital Detox Timer
    DigitalDetoxTimer: {
        init() {
            const workspace = document.getElementById('utility-workspace');
            workspace.innerHTML = `
                <div style="max-width: 500px; margin: 0 auto; text-align: center;">
                    <h2>Digital Detox Timer</h2>
                    <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg);">
                        <input type="number" id="detox-minutes" class="input-field" placeholder="Minutes" value="30">
                        <button onclick="RemainingUtilities.startDetox()" class="btn btn-primary" style="width: 100%;">
                            Start Detox
                        </button>
                        <div id="detox-message" style="margin-top: 2rem; display: none;
                             padding: 2rem; background: var(--success); color: white; border-radius: var(--radius);">
                            <h3>Detox Active!</h3>
                            <p>Put your devices away and enjoy the offline world.</p>
                            <div id="detox-timer" style="font-size: 2rem; margin-top: 1rem;">30:00</div>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    startDetox() {
        const minutes = parseInt(document.getElementById('detox-minutes').value);
        const message = document.getElementById('detox-message');
        message.style.display = 'block';

        let remaining = minutes * 60;
        const timer = document.getElementById('detox-timer');

        const interval = setInterval(() => {
            remaining--;
            const m = Math.floor(remaining / 60);
            const s = remaining % 60;
            timer.textContent = `${m}:${s.toString().padStart(2, '0')}`;

            if (remaining <= 0) {
                clearInterval(interval);
                Core.Toast.show('Detox complete! Welcome back.', 'success');
                message.style.display = 'none';
            }
        }, 1000);
    }
};

// Register all remaining utilities
window.SleepDebtCalculator = SleepDebtCalculator;
window.MealDice = MealDice;
window.ScreenBreakEnforcer = ScreenBreakEnforcer;
window.BoundaryScriptWriter = RemainingUtilities.BoundaryScriptWriter;
window.ComplimentGenerator = RemainingUtilities.ComplimentGenerator;
window.ReadingTimeBank = RemainingUtilities.ReadingTimeBank;
window.ConversationStarterSpinner = RemainingUtilities.ConversationStarterSpinner;
window.DigitalDetoxTimer = RemainingUtilities.DigitalDetoxTimer;

// Register function for remaining utilities helper
window.RemainingUtilities = RemainingUtilities;

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);