// Utility Implementations Part 2 (Tools 31-60)

// Silent Auction Timer
const SilentAuctionTimer = {
    timers: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Add Task Timer</h3>
                    <div style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 1rem; align-items: end;">
                        <div>
                            <label class="input-label">Task Name</label>
                            <input type="text" id="task-name" class="input-field" placeholder="e.g., Dishes, Laundry">
                        </div>
                        <div>
                            <label class="input-label">Minutes</label>
                            <input type="number" id="task-minutes" class="input-field" min="1" max="120" value="10">
                        </div>
                        <button id="add-timer" class="btn btn-primary">Add Timer</button>
                    </div>
                </div>

                <div id="timers-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
                </div>

                <div style="margin-top: 2rem; text-align: center;">
                    <button id="start-all" class="btn btn-primary" style="margin-right: 1rem;">Start All</button>
                    <button id="reset-all" class="btn btn-secondary">Reset All</button>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadTimers();
    },

    attachEvents() {
        document.getElementById('add-timer').addEventListener('click', () => this.addTimer());
        document.getElementById('task-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTimer();
        });
        document.getElementById('start-all').addEventListener('click', () => this.startAll());
        document.getElementById('reset-all').addEventListener('click', () => this.resetAll());
    },

    addTimer() {
        const name = document.getElementById('task-name').value.trim();
        const minutes = parseInt(document.getElementById('task-minutes').value);

        if (!name) return;

        const timer = {
            id: Date.now(),
            name,
            totalSeconds: minutes * 60,
            remainingSeconds: minutes * 60,
            isRunning: false,
            intervalId: null
        };

        this.timers.push(timer);
        this.renderTimers();
        this.saveTimers();

        document.getElementById('task-name').value = '';
        document.getElementById('task-minutes').value = '10';
    },

    renderTimers() {
        const grid = document.getElementById('timers-grid');

        grid.innerHTML = this.timers.map(timer => {
            const progress = ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100;
            const minutes = Math.floor(timer.remainingSeconds / 60);
            const seconds = timer.remainingSeconds % 60;
            const isComplete = timer.remainingSeconds === 0;

            return `
                <div style="background: ${isComplete ? 'var(--success)' : 'var(--bg-secondary)'};
                     padding: 1.5rem; border-radius: var(--radius); position: relative;">
                    <button onclick="SilentAuctionTimer.removeTimer(${timer.id})"
                        style="position: absolute; top: 0.5rem; right: 0.5rem; background: transparent;
                               border: none; color: var(--text-muted); cursor: pointer;">×</button>

                    <h4 style="margin-bottom: 1rem; color: ${isComplete ? 'white' : 'var(--text)'};">
                        ${timer.name}
                    </h4>

                    <div style="font-size: 2rem; font-weight: bold; text-align: center; margin: 1rem 0;
                         color: ${isComplete ? 'white' : 'var(--secondary)'};">
                        ${isComplete ? '✓' : `${minutes}:${seconds.toString().padStart(2, '0')}`}
                    </div>

                    <div style="height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                        <div style="width: ${progress}%; height: 100%; background: ${isComplete ? 'white' : 'var(--secondary)'};
                             transition: width 1s;"></div>
                    </div>

                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <button onclick="SilentAuctionTimer.toggleTimer(${timer.id})"
                            class="btn ${timer.isRunning ? 'btn-secondary' : 'btn-primary'}"
                            style="flex: 1; padding: 0.5rem;"
                            ${isComplete ? 'disabled' : ''}>
                            ${timer.isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button onclick="SilentAuctionTimer.resetTimer(${timer.id})"
                            class="btn btn-secondary" style="flex: 1; padding: 0.5rem;">
                            Reset
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleTimer(id) {
        const timer = this.timers.find(t => t.id === id);
        if (!timer) return;

        if (timer.isRunning) {
            clearInterval(timer.intervalId);
            timer.isRunning = false;
        } else {
            timer.isRunning = true;
            timer.intervalId = setInterval(() => this.tick(id), 1000);
        }

        this.renderTimers();
    },

    tick(id) {
        const timer = this.timers.find(t => t.id === id);
        if (!timer || !timer.isRunning) return;

        timer.remainingSeconds--;

        if (timer.remainingSeconds <= 0) {
            timer.remainingSeconds = 0;
            timer.isRunning = false;
            clearInterval(timer.intervalId);
            this.playSound();
            Core.Toast.show(`${timer.name} completed!`, 'success');
        }

        this.renderTimers();
        this.saveTimers();
    },

    resetTimer(id) {
        const timer = this.timers.find(t => t.id === id);
        if (!timer) return;

        clearInterval(timer.intervalId);
        timer.remainingSeconds = timer.totalSeconds;
        timer.isRunning = false;
        this.renderTimers();
        this.saveTimers();
    },

    removeTimer(id) {
        const timer = this.timers.find(t => t.id === id);
        if (timer && timer.intervalId) {
            clearInterval(timer.intervalId);
        }
        this.timers = this.timers.filter(t => t.id !== id);
        this.renderTimers();
        this.saveTimers();
    },

    startAll() {
        this.timers.forEach(timer => {
            if (!timer.isRunning && timer.remainingSeconds > 0) {
                timer.isRunning = true;
                timer.intervalId = setInterval(() => this.tick(timer.id), 1000);
            }
        });
        this.renderTimers();
    },

    resetAll() {
        this.timers.forEach(timer => {
            clearInterval(timer.intervalId);
            timer.remainingSeconds = timer.totalSeconds;
            timer.isRunning = false;
        });
        this.renderTimers();
        this.saveTimers();
    },

    playSound() {
        if (!Core.Capabilities.check('webAudio')) return;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = 800;
        gain.gain.value = 0.1;

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    },

    saveTimers() {
        Core.Storage.set('silent-timers', this.timers.map(t => ({
            id: t.id,
            name: t.name,
            totalSeconds: t.totalSeconds,
            remainingSeconds: t.remainingSeconds
        })));
    },

    loadTimers() {
        const saved = Core.Storage.get('silent-timers');
        if (saved) {
            this.timers = saved.map(t => ({
                ...t,
                isRunning: false,
                intervalId: null
            }));
            this.renderTimers();
        }
    }
};

// Color Emotion Mapper
const ColorEmotionMapper = {
    emotions: [
        { name: 'Joy', hue: 45, saturation: 100, lightness: 60 },
        { name: 'Calm', hue: 200, saturation: 50, lightness: 70 },
        { name: 'Energy', hue: 15, saturation: 100, lightness: 50 },
        { name: 'Love', hue: 350, saturation: 80, lightness: 65 },
        { name: 'Sadness', hue: 210, saturation: 30, lightness: 40 },
        { name: 'Anger', hue: 0, saturation: 100, lightness: 45 },
        { name: 'Fear', hue: 270, saturation: 20, lightness: 30 },
        { name: 'Peace', hue: 150, saturation: 40, lightness: 75 },
        { name: 'Excitement', hue: 30, saturation: 100, lightness: 55 },
        { name: 'Nostalgia', hue: 25, saturation: 30, lightness: 60 }
    ],

    currentMood: [],
    history: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2 style="text-align: center; margin-bottom: 2rem;">How are you feeling?</h2>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.emotions.map(emotion => `
                        <button class="emotion-btn" data-emotion="${emotion.name}"
                            style="padding: 1rem; background: hsl(${emotion.hue}, ${emotion.saturation}%, ${emotion.lightness}%);
                                   color: white; border: none; border-radius: var(--radius); cursor: pointer;
                                   transition: transform 0.2s;">
                            ${emotion.name}
                        </button>
                    `).join('')}
                </div>

                <div id="mood-gradient" style="height: 200px; border-radius: var(--radius-lg); margin-bottom: 2rem;
                     background: linear-gradient(135deg, #ddd 0%, #ddd 100%); position: relative;">
                    <div style="position: absolute; bottom: 1rem; left: 1rem; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                        <div id="mood-label" style="font-size: 1.5rem; font-weight: bold;">Select emotions above</div>
                        <div id="mood-date" style="opacity: 0.8;">${new Date().toLocaleDateString()}</div>
                    </div>
                </div>

                <div style="text-align: center; margin-bottom: 2rem;">
                    <button id="save-mood" class="btn btn-primary" disabled>Save Mood Gradient</button>
                    <button id="clear-mood" class="btn btn-secondary">Clear</button>
                </div>

                <div id="mood-history">
                    <h3>Your Mood History</h3>
                    <div id="history-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                         gap: 0.5rem; margin-top: 1rem;">
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadHistory();
    },

    attachEvents() {
        document.querySelectorAll('.emotion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleEmotion(e.target.dataset.emotion));
        });

        document.getElementById('save-mood').addEventListener('click', () => this.saveMood());
        document.getElementById('clear-mood').addEventListener('click', () => this.clearMood());
    },

    toggleEmotion(emotionName) {
        const btn = document.querySelector(`[data-emotion="${emotionName}"]`);

        if (this.currentMood.includes(emotionName)) {
            this.currentMood = this.currentMood.filter(e => e !== emotionName);
            btn.style.transform = 'scale(1)';
            btn.style.border = 'none';
        } else {
            if (this.currentMood.length < 3) {
                this.currentMood.push(emotionName);
                btn.style.transform = 'scale(1.1)';
                btn.style.border = '3px solid white';
            } else {
                Core.Toast.show('Maximum 3 emotions at once', 'info');
                return;
            }
        }

        this.updateGradient();
    },

    updateGradient() {
        const gradient = document.getElementById('mood-gradient');
        const label = document.getElementById('mood-label');
        const saveBtn = document.getElementById('save-mood');

        if (this.currentMood.length === 0) {
            gradient.style.background = 'linear-gradient(135deg, #ddd 0%, #ddd 100%)';
            label.textContent = 'Select emotions above';
            saveBtn.disabled = true;
        } else {
            const colors = this.currentMood.map(name => {
                const emotion = this.emotions.find(e => e.name === name);
                return `hsl(${emotion.hue}, ${emotion.saturation}%, ${emotion.lightness}%)`;
            });

            const stops = colors.map((color, i) =>
                `${color} ${(i / (colors.length - 1 || 1)) * 100}%`
            ).join(', ');

            gradient.style.background = `linear-gradient(135deg, ${stops})`;
            label.textContent = this.currentMood.join(' + ');
            saveBtn.disabled = false;
        }
    },

    clearMood() {
        this.currentMood = [];
        document.querySelectorAll('.emotion-btn').forEach(btn => {
            btn.style.transform = 'scale(1)';
            btn.style.border = 'none';
        });
        this.updateGradient();
    },

    saveMood() {
        if (this.currentMood.length === 0) return;

        const moodEntry = {
            emotions: [...this.currentMood],
            timestamp: Date.now(),
            gradient: document.getElementById('mood-gradient').style.background
        };

        this.history.unshift(moodEntry);
        this.history = this.history.slice(0, 30); // Keep last 30

        Core.Storage.set('mood-history', this.history);
        this.renderHistory();

        Core.Toast.show('Mood saved!', 'success');
        this.clearMood();
    },

    renderHistory() {
        const grid = document.getElementById('history-grid');

        if (this.history.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; color: var(--text-muted);">No mood history yet</p>';
        } else {
            grid.innerHTML = this.history.map(entry => `
                <div style="height: 60px; border-radius: var(--radius); ${entry.gradient};
                     cursor: pointer; position: relative;"
                     title="${entry.emotions.join(' + ')} - ${new Date(entry.timestamp).toLocaleDateString()}">
                    <div style="position: absolute; bottom: 2px; right: 4px; font-size: 0.7rem;
                         color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                        ${new Date(entry.timestamp).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </div>
                </div>
            `).join('');
        }
    },

    loadHistory() {
        this.history = Core.Storage.get('mood-history') || [];
        this.renderHistory();
    }
};

// Habit Stacker
const HabitStacker = {
    stacks: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Build a Habit Stack</h3>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">
                        Link small habits together to create a routine
                    </p>

                    <div id="habit-builder">
                        <div class="habit-block" style="background: var(--bg-secondary); padding: 1rem;
                             border-radius: var(--radius); margin-bottom: 0.5rem;">
                            <input type="text" class="input-field" placeholder="After I..." id="trigger-input">
                        </div>

                        <div style="text-align: center; color: var(--secondary); font-size: 1.5rem;">↓</div>

                        <div id="habit-chain" style="min-height: 50px;"></div>

                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <input type="text" id="new-habit" class="input-field" placeholder="I will..." style="flex: 1;">
                            <button id="add-habit" class="btn btn-primary">Add</button>
                        </div>

                        <button id="save-stack" class="btn btn-primary" style="width: 100%; margin-top: 1rem;" disabled>
                            Save Habit Stack
                        </button>
                    </div>
                </div>

                <div id="saved-stacks">
                    <h3>Your Habit Stacks</h3>
                    <div id="stacks-list"></div>
                </div>
            </div>
        `;

        this.currentStack = { trigger: '', habits: [] };
        this.attachEvents();
        this.loadStacks();
    },

    attachEvents() {
        document.getElementById('trigger-input').addEventListener('input', (e) => {
            this.currentStack.trigger = e.target.value;
            this.updateSaveButton();
        });

        document.getElementById('add-habit').addEventListener('click', () => this.addHabit());
        document.getElementById('new-habit').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addHabit();
        });

        document.getElementById('save-stack').addEventListener('click', () => this.saveStack());
    },

    addHabit() {
        const input = document.getElementById('new-habit');
        const habit = input.value.trim();

        if (!habit) return;

        this.currentStack.habits.push(habit);
        this.renderCurrentStack();
        input.value = '';
        this.updateSaveButton();
    },

    renderCurrentStack() {
        const chain = document.getElementById('habit-chain');

        chain.innerHTML = this.currentStack.habits.map((habit, index) => `
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <div class="habit-block" style="flex: 1; background: var(--secondary); color: white;
                     padding: 1rem; border-radius: var(--radius); position: relative;">
                    ${habit}
                    <button onclick="HabitStacker.removeHabit(${index})"
                        style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);
                               background: transparent; border: none; color: white; cursor: pointer;">×</button>
                </div>
            </div>
            ${index < this.currentStack.habits.length - 1 ?
                '<div style="text-align: center; color: var(--secondary); font-size: 1.5rem;">↓</div>' : ''}
        `).join('');
    },

    removeHabit(index) {
        this.currentStack.habits.splice(index, 1);
        this.renderCurrentStack();
        this.updateSaveButton();
    },

    updateSaveButton() {
        const btn = document.getElementById('save-stack');
        btn.disabled = !this.currentStack.trigger || this.currentStack.habits.length === 0;
    },

    saveStack() {
        if (!this.currentStack.trigger || this.currentStack.habits.length === 0) return;

        this.stacks.push({
            id: Date.now(),
            trigger: this.currentStack.trigger,
            habits: [...this.currentStack.habits],
            created: Date.now(),
            completed: 0
        });

        Core.Storage.set('habit-stacks', this.stacks);
        this.renderStacks();

        // Reset builder
        this.currentStack = { trigger: '', habits: [] };
        document.getElementById('trigger-input').value = '';
        document.getElementById('habit-chain').innerHTML = '';
        this.updateSaveButton();

        Core.Toast.show('Habit stack saved!', 'success');
    },

    renderStacks() {
        const list = document.getElementById('stacks-list');

        if (this.stacks.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No habit stacks yet</p>';
        } else {
            list.innerHTML = this.stacks.map(stack => `
                <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius); margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; margin-bottom: 0.5rem;">After I ${stack.trigger}</div>
                            ${stack.habits.map((habit, i) => `
                                <div style="display: flex; align-items: center; margin: 0.5rem 0;">
                                    <span style="color: var(--secondary); margin-right: 0.5rem;">${i + 1}.</span>
                                    I will ${habit}
                                </div>
                            `).join('')}
                            <div style="margin-top: 1rem; color: var(--text-muted); font-size: 0.875rem;">
                                Completed ${stack.completed} times
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="HabitStacker.completeStack(${stack.id})"
                                class="btn btn-primary" style="padding: 0.5rem;">✓</button>
                            <button onclick="HabitStacker.deleteStack(${stack.id})"
                                class="btn btn-danger" style="padding: 0.5rem;">×</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    },

    completeStack(id) {
        const stack = this.stacks.find(s => s.id === id);
        if (stack) {
            stack.completed++;
            Core.Storage.set('habit-stacks', this.stacks);
            this.renderStacks();
            Core.Toast.show('Great job completing your habit stack!', 'success');
        }
    },

    deleteStack(id) {
        this.stacks = this.stacks.filter(s => s.id !== id);
        Core.Storage.set('habit-stacks', this.stacks);
        this.renderStacks();
    },

    loadStacks() {
        this.stacks = Core.Storage.get('habit-stacks') || [];
        this.renderStacks();
    }
};

// Memory Palace Builder
const MemoryPalaceBuilder = {
    palaces: [],
    currentPalace: null,

    init() {
        const workspace = document.getElementById('utility-workspace');

        if (Core.Capabilities.check('canvas')) {
            this.initCanvas(workspace);
        } else {
            this.initFallback(workspace);
        }
    },

    initCanvas(workspace) {
        workspace.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto;">
                <div style="display: flex; gap: 2rem;">
                    <div style="flex: 2;">
                        <canvas id="palace-canvas" width="600" height="400"
                            style="border: 2px solid var(--border); border-radius: var(--radius);
                                   background: var(--bg); cursor: crosshair;"></canvas>

                        <div style="margin-top: 1rem;">
                            <input type="text" id="memory-item" class="input-field"
                                placeholder="Enter item to memorize..." style="width: 100%;">
                        </div>
                    </div>

                    <div style="flex: 1; background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius);">
                        <h3>Palace Rooms</h3>
                        <div id="room-selector" style="margin: 1rem 0;">
                            <select id="room-select" class="input-field" style="width: 100%;">
                                <option value="">Select a room...</option>
                                <option value="living">Living Room</option>
                                <option value="bedroom">Bedroom</option>
                                <option value="kitchen">Kitchen</option>
                                <option value="office">Office</option>
                            </select>
                        </div>

                        <h4 style="margin-top: 1rem;">Items in Room</h4>
                        <div id="room-items" style="max-height: 200px; overflow-y: auto;"></div>

                        <button id="test-memory" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                            Test Memory
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('palace-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.attachCanvasEvents();
    },

    initFallback(workspace) {
        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <h2>Memory Palace Builder</h2>
                <p style="color: var(--text-muted);">Create mental rooms and place items to remember</p>

                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-top: 2rem;">
                    <h3>Select Room</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                        <button onclick="MemoryPalaceBuilder.selectRoom('living')" class="btn btn-secondary">Living Room</button>
                        <button onclick="MemoryPalaceBuilder.selectRoom('bedroom')" class="btn btn-secondary">Bedroom</button>
                        <button onclick="MemoryPalaceBuilder.selectRoom('kitchen')" class="btn btn-secondary">Kitchen</button>
                        <button onclick="MemoryPalaceBuilder.selectRoom('office')" class="btn btn-secondary">Office</button>
                    </div>

                    <div id="room-display" style="margin-top: 2rem;"></div>
                </div>
            </div>
        `;
    },

    attachCanvasEvents() {
        const canvas = this.canvas;
        const roomSelect = document.getElementById('room-select');
        const itemInput = document.getElementById('memory-item');

        roomSelect.addEventListener('change', (e) => this.loadRoom(e.target.value));

        canvas.addEventListener('click', (e) => {
            if (!this.currentPalace || !itemInput.value.trim()) {
                Core.Toast.show('Select a room and enter an item first', 'error');
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.placeItem(x, y, itemInput.value.trim());
            itemInput.value = '';
        });

        document.getElementById('test-memory').addEventListener('click', () => this.testMemory());
    },

    loadRoom(roomType) {
        if (!roomType) return;

        let palace = this.palaces.find(p => p.room === roomType);
        if (!palace) {
            palace = {
                room: roomType,
                items: []
            };
            this.palaces.push(palace);
        }

        this.currentPalace = palace;
        this.drawRoom();
    },

    drawRoom() {
        const ctx = this.ctx;
        const canvas = this.canvas;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw room outline
        ctx.strokeStyle = 'var(--border)';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Draw room features based on type
        ctx.fillStyle = 'var(--text-muted)';
        ctx.font = '14px sans-serif';

        switch(this.currentPalace.room) {
            case 'living':
                // Sofa
                ctx.fillRect(50, 300, 150, 60);
                ctx.fillText('Sofa', 110, 340);
                // TV
                ctx.fillRect(400, 100, 100, 60);
                ctx.fillText('TV', 440, 140);
                break;
            case 'bedroom':
                // Bed
                ctx.fillRect(200, 250, 200, 100);
                ctx.fillText('Bed', 290, 310);
                // Dresser
                ctx.fillRect(50, 100, 80, 100);
                ctx.fillText('Dresser', 65, 160);
                break;
            case 'kitchen':
                // Counter
                ctx.fillRect(50, 200, 500, 30);
                ctx.fillText('Counter', 280, 220);
                // Fridge
                ctx.fillRect(450, 50, 80, 120);
                ctx.fillText('Fridge', 470, 115);
                break;
            case 'office':
                // Desk
                ctx.fillRect(200, 200, 200, 100);
                ctx.fillText('Desk', 285, 260);
                // Bookshelf
                ctx.fillRect(50, 50, 60, 200);
                ctx.fillText('Books', 60, 155);
                break;
        }

        // Draw placed items
        ctx.fillStyle = 'var(--secondary)';
        ctx.font = 'bold 12px sans-serif';

        this.currentPalace.items.forEach(item => {
            ctx.beginPath();
            ctx.arc(item.x, item.y, 20, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'white';
            ctx.fillText(item.text.substring(0, 3), item.x - 10, item.y + 5);
            ctx.fillStyle = 'var(--secondary)';
        });

        this.updateItemList();
    },

    placeItem(x, y, text) {
        this.currentPalace.items.push({ x, y, text });
        this.savePalaces();
        this.drawRoom();
        Core.Toast.show('Item placed in palace!', 'success');
    },

    updateItemList() {
        const list = document.getElementById('room-items');
        if (!list) return;

        if (this.currentPalace.items.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No items yet</p>';
        } else {
            list.innerHTML = this.currentPalace.items.map((item, i) => `
                <div style="padding: 0.5rem; background: var(--bg); border-radius: var(--radius);
                     margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                    <span>${i + 1}. ${item.text}</span>
                    <button onclick="MemoryPalaceBuilder.removeItem(${i})"
                        style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
                </div>
            `).join('');
        }
    },

    removeItem(index) {
        this.currentPalace.items.splice(index, 1);
        this.savePalaces();
        this.drawRoom();
    },

    testMemory() {
        if (!this.currentPalace || this.currentPalace.items.length === 0) {
            Core.Toast.show('No items to test', 'error');
            return;
        }

        const items = this.currentPalace.items.map(i => i.text);
        const question = `Can you recall all ${items.length} items in the ${this.currentPalace.room}?`;

        Core.Modal.show('Memory Test', `
            <p>${question}</p>
            <p style="margin-top: 1rem;">Try to recall them in order, then check your answer:</p>
            <details style="margin-top: 1rem;">
                <summary style="cursor: pointer; color: var(--secondary);">Show Items</summary>
                <ol style="margin-top: 1rem;">
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ol>
            </details>
        `, [
            { text: 'Close', onClick: () => Core.Modal.close() }
        ]);
    },

    selectRoom(roomType) {
        const display = document.getElementById('room-display');

        let palace = this.palaces.find(p => p.room === roomType);
        if (!palace) {
            palace = { room: roomType, items: [] };
            this.palaces.push(palace);
        }

        this.currentPalace = palace;

        display.innerHTML = `
            <h4>${roomType.charAt(0).toUpperCase() + roomType.slice(1)}</h4>
            <div style="margin: 1rem 0;">
                <input type="text" id="item-input" class="input-field" placeholder="Item to remember...">
                <button onclick="MemoryPalaceBuilder.addItem()" class="btn btn-primary" style="margin-top: 0.5rem;">
                    Add to Room
                </button>
            </div>
            <div id="items-list">
                ${palace.items.map((item, i) =>
                    `<div>${i + 1}. ${item.text}</div>`
                ).join('') || '<p style="color: var(--text-muted);">No items yet</p>'}
            </div>
        `;
    },

    addItem() {
        const input = document.getElementById('item-input');
        const text = input.value.trim();

        if (!text) return;

        this.currentPalace.items.push({
            text,
            x: Math.random() * 500 + 50,
            y: Math.random() * 300 + 50
        });

        this.savePalaces();
        this.selectRoom(this.currentPalace.room);
        input.value = '';
    },

    savePalaces() {
        Core.Storage.set('memory-palaces', this.palaces);
    },

    loadPalaces() {
        this.palaces = Core.Storage.get('memory-palaces') || [];
    }
};

// Continue with more implementations...

// Export utilities
window.SilentAuctionTimer = SilentAuctionTimer;
window.ColorEmotionMapper = ColorEmotionMapper;
window.HabitStacker = HabitStacker;
window.MemoryPalaceBuilder = MemoryPalaceBuilder;