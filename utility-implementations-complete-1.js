// Complete Implementations Part 1 - Utilities 29-50

// Motivation Momentum
const MotivationMomentum = {
    streaks: [],
    currentStreak: 0,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 700px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2>Motivation Momentum Chain</h2>
                    <div style="font-size: 4rem; font-weight: bold; color: var(--secondary);">
                        ${this.currentStreak}
                    </div>
                    <div style="color: var(--text-muted);">Days in a row</div>
                </div>

                <div id="chain-visualization" style="background: var(--bg-secondary); padding: 2rem;
                     border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <canvas id="chain-canvas" width="600" height="200"></canvas>
                </div>

                <div style="text-align: center;">
                    <button onclick="MotivationMomentum.markToday()" class="btn btn-primary"
                            style="font-size: 1.2rem; padding: 1rem 2rem;">
                        ✓ Mark Today Complete
                    </button>
                </div>

                <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <div style="background: var(--bg); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: var(--success);">
                            ${this.getLongestStreak()}
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.875rem;">Longest Streak</div>
                    </div>
                    <div style="background: var(--bg); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: var(--warning);">
                            ${this.getTotalDays()}
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.875rem;">Total Days</div>
                    </div>
                    <div style="background: var(--bg); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: var(--secondary);">
                            ${this.getCompletionRate()}%
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.875rem;">Success Rate</div>
                    </div>
                </div>
            </div>
        `;

        this.loadData();
        this.drawChain();
    },

    markToday() {
        const today = new Date().toDateString();
        if (!this.streaks.includes(today)) {
            this.streaks.push(today);
            this.updateStreak();
            this.saveData();
            this.init();
            Core.Toast.show('Great job! Keep the momentum going!', 'success');
        } else {
            Core.Toast.show('Already marked today!', 'info');
        }
    },

    updateStreak() {
        const today = new Date();
        let streak = 0;

        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            if (this.streaks.includes(checkDate.toDateString())) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }

        this.currentStreak = streak;
    },

    drawChain() {
        const canvas = document.getElementById('chain-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const days = 30;
        const linkWidth = width / days;
        const linkHeight = height * 0.6;
        const y = (height - linkHeight) / 2;

        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (days - i - 1));
            const dateStr = date.toDateString();
            const isComplete = this.streaks.includes(dateStr);

            const x = i * linkWidth;

            // Draw link
            ctx.fillStyle = isComplete ? 'var(--success)' : 'var(--border)';
            ctx.fillRect(x + 2, y, linkWidth - 4, linkHeight);

            // Draw connection
            if (i < days - 1) {
                ctx.fillStyle = isComplete ? 'var(--success)' : 'var(--border)';
                ctx.fillRect(x + linkWidth - 10, y + linkHeight/2 - 10, 20, 20);
            }
        }
    },

    getLongestStreak() {
        let longest = 0;
        let current = 0;
        const sorted = [...this.streaks].sort();

        for (let i = 0; i < sorted.length; i++) {
            const date = new Date(sorted[i]);
            const prevDate = i > 0 ? new Date(sorted[i-1]) : null;

            if (prevDate && (date - prevDate) / (1000 * 60 * 60 * 24) === 1) {
                current++;
            } else {
                current = 1;
            }

            longest = Math.max(longest, current);
        }

        return longest;
    },

    getTotalDays() {
        return this.streaks.length;
    },

    getCompletionRate() {
        if (this.streaks.length === 0) return 0;
        const firstDate = new Date(this.streaks[0]);
        const daysSince = Math.floor((new Date() - firstDate) / (1000 * 60 * 60 * 24)) + 1;
        return Math.round((this.streaks.length / daysSince) * 100);
    },

    saveData() {
        Core.Storage.set('motivation-momentum', {
            streaks: this.streaks,
            currentStreak: this.currentStreak
        });
    },

    loadData() {
        const data = Core.Storage.get('motivation-momentum');
        if (data) {
            this.streaks = data.streaks || [];
            this.updateStreak();
        }
    }
};

// Idea Collision Tool
const IdeaCollisionTool = {
    categories: {
        objects: ['pencil', 'cloud', 'tree', 'clock', 'mirror', 'key', 'bridge', 'wave', 'star', 'door'],
        concepts: ['growth', 'connection', 'balance', 'flow', 'transformation', 'discovery', 'harmony', 'resilience'],
        actions: ['combining', 'reversing', 'amplifying', 'simplifying', 'hiding', 'revealing', 'breaking', 'merging'],
        contexts: ['underwater', 'in space', 'microscopic', 'ancient times', 'future', 'dream world', 'inside out']
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 700px; margin: 0 auto; text-align: center;">
                <h2>Idea Collision Tool</h2>
                <p style="color: var(--text-muted);">Smash random concepts together for creative inspiration</p>

                <div id="collision-display" style="margin: 2rem 0;">
                    <div style="display: flex; justify-content: center; align-items: center; gap: 2rem;">
                        <div id="idea1" class="idea-bubble" style="width: 150px; height: 150px;
                             background: linear-gradient(135deg, #667eea, #764ba2); color: white;
                             border-radius: 50%; display: flex; align-items: center; justify-content: center;
                             font-size: 1.2rem; padding: 1rem; text-align: center;">
                            ?
                        </div>
                        <div style="font-size: 2rem;">💥</div>
                        <div id="idea2" class="idea-bubble" style="width: 150px; height: 150px;
                             background: linear-gradient(135deg, #f093fb, #f5576c); color: white;
                             border-radius: 50%; display: flex; align-items: center; justify-content: center;
                             font-size: 1.2rem; padding: 1rem; text-align: center;">
                            ?
                        </div>
                    </div>
                </div>

                <button onclick="IdeaCollisionTool.collide()" class="btn btn-primary"
                        style="font-size: 1.2rem; padding: 1rem 2rem;">
                    🎲 Generate Collision
                </button>

                <div id="inspiration" style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-secondary);
                     border-radius: var(--radius-lg); display: none;">
                    <h3>What could this create?</h3>
                    <div id="prompts"></div>
                </div>

                <div style="margin-top: 2rem;">
                    <button onclick="IdeaCollisionTool.saveIdea()" class="btn btn-secondary">
                        💾 Save This Collision
                    </button>
                </div>

                <div id="saved-ideas" style="margin-top: 2rem;">
                    <h3>Saved Collisions</h3>
                    <div id="saved-list"></div>
                </div>
            </div>
        `;

        this.loadSaved();
    },

    collide() {
        const allItems = [
            ...this.categories.objects,
            ...this.categories.concepts,
            ...this.categories.actions,
            ...this.categories.contexts
        ];

        const idea1 = allItems[Math.floor(Math.random() * allItems.length)];
        const idea2 = allItems[Math.floor(Math.random() * allItems.length)];

        // Animate collision
        document.getElementById('idea1').style.animation = 'pulse 0.5s';
        document.getElementById('idea2').style.animation = 'pulse 0.5s';

        setTimeout(() => {
            document.getElementById('idea1').textContent = idea1;
            document.getElementById('idea2').textContent = idea2;
            document.getElementById('idea1').style.animation = '';
            document.getElementById('idea2').style.animation = '';

            this.generatePrompts(idea1, idea2);
        }, 500);
    },

    generatePrompts(idea1, idea2) {
        const prompts = [
            `What if ${idea1} was made entirely of ${idea2}?`,
            `How would ${idea1} work in a world dominated by ${idea2}?`,
            `Design a product that combines ${idea1} with ${idea2}`,
            `Write a story where ${idea1} transforms into ${idea2}`,
            `What problem could ${idea1} + ${idea2} solve?`
        ];

        const inspirationDiv = document.getElementById('inspiration');
        const promptsDiv = document.getElementById('prompts');

        promptsDiv.innerHTML = prompts.map(p =>
            `<div style="padding: 0.5rem; margin: 0.5rem 0; background: var(--bg);
                  border-radius: var(--radius);">• ${p}</div>`
        ).join('');

        inspirationDiv.style.display = 'block';

        this.currentCollision = { idea1, idea2, timestamp: Date.now() };
    },

    saveIdea() {
        if (!this.currentCollision) {
            Core.Toast.show('Generate a collision first!', 'error');
            return;
        }

        const saved = Core.Storage.get('saved-collisions') || [];
        saved.unshift(this.currentCollision);
        Core.Storage.set('saved-collisions', saved.slice(0, 20));

        this.loadSaved();
        Core.Toast.show('Collision saved!', 'success');
    },

    loadSaved() {
        const saved = Core.Storage.get('saved-collisions') || [];
        const list = document.getElementById('saved-list');

        if (saved.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No saved collisions yet</p>';
        } else {
            list.innerHTML = saved.slice(0, 5).map(item =>
                `<div style="padding: 0.75rem; background: var(--bg); border-radius: var(--radius);
                      margin-bottom: 0.5rem;">
                    <strong>${item.idea1}</strong> 💥 <strong>${item.idea2}</strong>
                    <div style="font-size: 0.875rem; color: var(--text-muted);">
                        ${new Date(item.timestamp).toLocaleDateString()}
                    </div>
                </div>`
            ).join('');
        }
    }
};

// Personal Inflation Tracker
const PersonalInflationTracker = {
    items: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>Personal Inflation Tracker</h2>

                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Add Item to Track</h3>
                    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 1rem;">
                        <input type="text" id="item-name" class="input-field" placeholder="Item name">
                        <input type="number" id="old-price" class="input-field" placeholder="Old price" step="0.01">
                        <input type="number" id="new-price" class="input-field" placeholder="Current price" step="0.01">
                        <button onclick="PersonalInflationTracker.addItem()" class="btn btn-primary">Add</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, var(--danger), #e74c3c); color: white;
                         padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: bold;" id="inflation-rate">0%</div>
                        <div>Your Inflation Rate</div>
                    </div>
                    <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: bold; color: var(--warning);" id="total-increase">$0</div>
                        <div>Total Increase</div>
                    </div>
                    <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: bold; color: var(--secondary);" id="item-count">0</div>
                        <div>Items Tracked</div>
                    </div>
                </div>

                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>Your Basket</h3>
                    <div id="items-list"></div>
                </div>

                <canvas id="inflation-chart" width="700" height="300" style="margin-top: 2rem;"></canvas>
            </div>
        `;

        this.loadData();
    },

    addItem() {
        const name = document.getElementById('item-name').value.trim();
        const oldPrice = parseFloat(document.getElementById('old-price').value);
        const newPrice = parseFloat(document.getElementById('new-price').value);

        if (!name || !oldPrice || !newPrice) {
            Core.Toast.show('Please fill all fields', 'error');
            return;
        }

        const increase = ((newPrice - oldPrice) / oldPrice) * 100;

        this.items.push({
            id: Date.now(),
            name,
            oldPrice,
            newPrice,
            increase,
            date: Date.now()
        });

        this.saveData();
        this.updateDisplay();

        // Clear inputs
        document.getElementById('item-name').value = '';
        document.getElementById('old-price').value = '';
        document.getElementById('new-price').value = '';

        Core.Toast.show('Item added to tracker', 'success');
    },

    updateDisplay() {
        // Calculate overall inflation
        const totalOld = this.items.reduce((sum, item) => sum + item.oldPrice, 0);
        const totalNew = this.items.reduce((sum, item) => sum + item.newPrice, 0);
        const inflationRate = totalOld > 0 ? ((totalNew - totalOld) / totalOld) * 100 : 0;
        const totalIncrease = totalNew - totalOld;

        document.getElementById('inflation-rate').textContent = inflationRate.toFixed(1) + '%';
        document.getElementById('total-increase').textContent = '$' + totalIncrease.toFixed(2);
        document.getElementById('item-count').textContent = this.items.length;

        // Update items list
        const list = document.getElementById('items-list');
        if (this.items.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No items tracked yet</p>';
        } else {
            list.innerHTML = this.items.map(item => `
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 1rem;
                     padding: 0.75rem; background: var(--bg); border-radius: var(--radius); margin-bottom: 0.5rem;">
                    <div><strong>${item.name}</strong></div>
                    <div>$${item.oldPrice.toFixed(2)}</div>
                    <div>$${item.newPrice.toFixed(2)}</div>
                    <div style="color: ${item.increase > 0 ? 'var(--danger)' : 'var(--success)'};">
                        ${item.increase > 0 ? '+' : ''}${item.increase.toFixed(1)}%
                    </div>
                    <button onclick="PersonalInflationTracker.removeItem(${item.id})"
                        style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
                </div>
            `).join('');
        }

        this.drawChart();
    },

    drawChart() {
        const canvas = document.getElementById('inflation-chart');
        if (!canvas || this.items.length === 0) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Sort items by increase percentage
        const sorted = [...this.items].sort((a, b) => b.increase - a.increase);
        const barWidth = width / sorted.length;

        sorted.forEach((item, index) => {
            const barHeight = Math.abs(item.increase) * 2;
            const x = index * barWidth;
            const y = height / 2 - (item.increase > 0 ? barHeight : 0);

            ctx.fillStyle = item.increase > 0 ? 'var(--danger)' : 'var(--success)';
            ctx.fillRect(x + 5, y, barWidth - 10, Math.abs(barHeight));

            // Label
            ctx.fillStyle = 'var(--text)';
            ctx.font = '10px sans-serif';
            ctx.save();
            ctx.translate(x + barWidth/2, height - 10);
            ctx.rotate(-Math.PI/4);
            ctx.fillText(item.name, 0, 0);
            ctx.restore();
        });

        // Zero line
        ctx.strokeStyle = 'var(--text)';
        ctx.beginPath();
        ctx.moveTo(0, height/2);
        ctx.lineTo(width, height/2);
        ctx.stroke();
    },

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveData();
        this.updateDisplay();
    },

    saveData() {
        Core.Storage.set('inflation-tracker', this.items);
    },

    loadData() {
        this.items = Core.Storage.get('inflation-tracker') || [];
        this.updateDisplay();
    }
};

// Walking Meeting Pacer
const WalkingMeetingPacer = {
    isActive: false,
    steps: 0,
    startTime: null,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2>Walking Meeting Pacer</h2>
                <p style="color: var(--text-muted);">Keep moving during virtual meetings</p>

                <div style="background: var(--bg); padding: 3rem; border-radius: var(--radius-lg); margin: 2rem 0;">
                    <div id="step-display" style="font-size: 5rem; font-weight: bold; color: var(--secondary);">
                        ${this.steps}
                    </div>
                    <div style="color: var(--text-muted);">steps</div>
                </div>

                <div id="meeting-stats" style="display: none; background: var(--bg-secondary);
                     padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div>
                            <div style="font-size: 1.5rem; font-weight: bold;" id="duration">0:00</div>
                            <div style="color: var(--text-muted); font-size: 0.875rem;">Duration</div>
                        </div>
                        <div>
                            <div style="font-size: 1.5rem; font-weight: bold;" id="pace">0</div>
                            <div style="color: var(--text-muted); font-size: 0.875rem;">Steps/Min</div>
                        </div>
                        <div>
                            <div style="font-size: 1.5rem; font-weight: bold;" id="calories">0</div>
                            <div style="color: var(--text-muted); font-size: 0.875rem;">Calories</div>
                        </div>
                    </div>
                </div>

                <button id="meeting-toggle" onclick="WalkingMeetingPacer.toggle()" class="btn btn-primary"
                        style="font-size: 1.2rem; padding: 1rem 2rem;">
                    Start Meeting Walk
                </button>

                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg); border-radius: var(--radius);">
                    <p><strong>How to use:</strong></p>
                    <p style="color: var(--text-muted);">Click or tap the screen with each step, or use spacebar</p>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.isActive) {
                e.preventDefault();
                this.addStep();
            }
        });

        document.getElementById('step-display').addEventListener('click', () => {
            if (this.isActive) this.addStep();
        });
    },

    toggle() {
        const btn = document.getElementById('meeting-toggle');
        const stats = document.getElementById('meeting-stats');

        if (this.isActive) {
            this.isActive = false;
            btn.textContent = 'Start Meeting Walk';
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-primary');

            this.showSummary();
        } else {
            this.isActive = true;
            this.steps = 0;
            this.startTime = Date.now();
            btn.textContent = 'End Meeting';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-danger');
            stats.style.display = 'block';

            this.updateTimer = setInterval(() => this.updateStats(), 1000);
        }
    },

    addStep() {
        this.steps++;
        document.getElementById('step-display').textContent = this.steps;

        // Animate
        const display = document.getElementById('step-display');
        display.style.transform = 'scale(1.1)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 100);

        this.updateStats();
    },

    updateStats() {
        if (!this.isActive) return;

        const elapsed = Date.now() - this.startTime;
        const minutes = elapsed / 60000;
        const pace = minutes > 0 ? Math.round(this.steps / minutes) : 0;
        const calories = Math.round(this.steps * 0.04);

        document.getElementById('duration').textContent =
            `${Math.floor(minutes)}:${Math.floor((minutes % 1) * 60).toString().padStart(2, '0')}`;
        document.getElementById('pace').textContent = pace;
        document.getElementById('calories').textContent = calories;
    },

    showSummary() {
        clearInterval(this.updateTimer);

        const duration = Math.floor((Date.now() - this.startTime) / 60000);
        const calories = Math.round(this.steps * 0.04);

        Core.Modal.show('Meeting Walk Summary', `
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: bold; color: var(--success); margin: 1rem 0;">
                    ${this.steps} steps
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin: 2rem 0;">
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${duration} min</div>
                        <div style="color: var(--text-muted);">Duration</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${calories}</div>
                        <div style="color: var(--text-muted);">Calories burned</div>
                    </div>
                </div>
                <p style="margin-top: 2rem; color: var(--text-muted);">
                    Great job staying active during your meeting!
                </p>
            </div>
        `, [
            { text: 'Close', onClick: () => Core.Modal.close() }
        ]);

        // Save to history
        const history = Core.Storage.get('walking-meetings') || [];
        history.push({
            steps: this.steps,
            duration,
            calories,
            date: Date.now()
        });
        Core.Storage.set('walking-meetings', history);
    }
};

// Export utilities
window.MotivationMomentum = MotivationMomentum;
window.IdeaCollisionTool = IdeaCollisionTool;
window.PersonalInflationTracker = PersonalInflationTracker;
window.WalkingMeetingPacer = WalkingMeetingPacer;