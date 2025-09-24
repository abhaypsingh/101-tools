// Utility Implementations Part 4 - Wellness & Mindfulness Tools

// Gratitude Jar
const GratitudeJar = {
    gratitudes: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <div id="jar-container" style="position: relative; margin: 2rem auto;">
                    <svg width="300" height="400" viewBox="0 0 300 400">
                        <defs>
                            <linearGradient id="jarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#e3f2fd;stop-opacity:0.8" />
                                <stop offset="100%" style="stop-color:#bbdefb;stop-opacity:0.9" />
                            </linearGradient>
                        </defs>
                        <ellipse cx="150" cy="380" rx="80" ry="15" fill="#ccc" opacity="0.3"/>
                        <path d="M 70 100 Q 70 80, 90 80 L 210 80 Q 230 80, 230 100 L 230 350 Q 230 370, 210 370 L 90 370 Q 70 370, 70 350 Z"
                              fill="url(#jarGradient)" stroke="var(--secondary)" stroke-width="3"/>
                        <ellipse cx="150" cy="80" rx="80" ry="20" fill="none" stroke="var(--secondary)" stroke-width="3"/>
                        <rect x="120" y="60" width="60" height="20" rx="5" fill="var(--secondary)"/>
                        <text x="150" y="200" text-anchor="middle" fill="var(--text)" font-size="60" id="jar-count">0</text>
                        <text x="150" y="230" text-anchor="middle" fill="var(--text-muted)" font-size="14">gratitudes</text>
                    </svg>
                </div>

                <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <input type="text" id="gratitude-input" class="input-field"
                           placeholder="What are you grateful for today?" style="width: 100%;">
                    <button id="add-gratitude" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Add to Jar
                    </button>
                </div>

                <button id="shake-jar" class="btn btn-secondary" style="margin-top: 2rem; font-size: 1.2rem; padding: 1rem 2rem;">
                    🎲 Shake Jar & Pick One
                </button>

                <div id="picked-gratitude" style="display: none; margin-top: 2rem; padding: 2rem;
                     background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
                     color: white; border-radius: var(--radius-lg);"></div>
            </div>
        `;

        this.attachEvents();
        this.loadGratitudes();
    },

    attachEvents() {
        document.getElementById('add-gratitude').addEventListener('click', () => this.addGratitude());
        document.getElementById('gratitude-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addGratitude();
        });
        document.getElementById('shake-jar').addEventListener('click', () => this.shakeJar());
    },

    addGratitude() {
        const input = document.getElementById('gratitude-input');
        const text = input.value.trim();

        if (!text) return;

        this.gratitudes.push({
            text,
            date: Date.now(),
            id: Date.now()
        });

        this.saveGratitudes();
        this.updateJar();
        input.value = '';

        // Animate jar
        const jar = document.querySelector('#jar-container svg');
        jar.style.animation = 'bounce 0.5s';
        setTimeout(() => jar.style.animation = '', 500);

        Core.Toast.show('Added to your gratitude jar!', 'success');
    },

    shakeJar() {
        if (this.gratitudes.length === 0) {
            Core.Toast.show('Add some gratitudes first!', 'info');
            return;
        }

        const jar = document.querySelector('#jar-container svg');
        jar.style.animation = 'shake 0.5s';

        setTimeout(() => {
            jar.style.animation = '';
            const random = this.gratitudes[Math.floor(Math.random() * this.gratitudes.length)];
            const display = document.getElementById('picked-gratitude');
            const date = new Date(random.date).toLocaleDateString();

            display.innerHTML = `
                <div style="font-size: 1.25rem; margin-bottom: 0.5rem;">"${random.text}"</div>
                <div style="opacity: 0.8; font-size: 0.875rem;">From ${date}</div>
            `;
            display.style.display = 'block';
        }, 500);
    },

    updateJar() {
        document.getElementById('jar-count').textContent = this.gratitudes.length;
    },

    saveGratitudes() {
        Core.Storage.set('gratitude-jar', this.gratitudes);
    },

    loadGratitudes() {
        this.gratitudes = Core.Storage.get('gratitude-jar') || [];
        this.updateJar();
    }
};

// Social Battery Meter
const SocialBatteryMeter = {
    currentLevel: 75,
    history: [],
    interactions: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div id="battery-display" style="width: 200px; height: 80px; margin: 0 auto; position: relative;
                         border: 3px solid var(--text); border-radius: 10px; padding: 5px;">
                        <div style="position: absolute; right: -10px; top: 25px; width: 10px; height: 30px;
                             background: var(--text); border-radius: 0 5px 5px 0;"></div>
                        <div id="battery-fill" style="height: 100%; border-radius: 5px; transition: width 0.5s;
                             background: linear-gradient(90deg, var(--success), var(--success));"></div>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                             font-size: 1.5rem; font-weight: bold; color: var(--text);" id="battery-percent">75%</div>
                    </div>

                    <div style="margin-top: 1rem;">
                        <input type="range" id="battery-slider" min="0" max="100" value="75" style="width: 300px;">
                    </div>
                </div>

                <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Quick Adjustments</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem;">
                        <button onclick="SocialBatteryMeter.adjust('meeting', -15)" class="btn btn-secondary">
                            👥 Meeting (-15%)
                        </button>
                        <button onclick="SocialBatteryMeter.adjust('alone', 10)" class="btn btn-secondary">
                            🧘 Alone Time (+10%)
                        </button>
                        <button onclick="SocialBatteryMeter.adjust('party', -30)" class="btn btn-secondary">
                            🎉 Party (-30%)
                        </button>
                        <button onclick="SocialBatteryMeter.adjust('nap', 20)" class="btn btn-secondary">
                            😴 Nap (+20%)
                        </button>
                        <button onclick="SocialBatteryMeter.adjust('call', -10)" class="btn btn-secondary">
                            📞 Phone Call (-10%)
                        </button>
                        <button onclick="SocialBatteryMeter.adjust('walk', 15)" class="btn btn-secondary">
                            🚶 Walk (+15%)
                        </button>
                    </div>
                </div>

                <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>Today's Interactions</h3>
                    <div id="interaction-log"></div>
                </div>

                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius);">
                    <h4>Recharge Suggestions</h4>
                    <div id="suggestions"></div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.updateDisplay();
        this.loadData();
    },

    attachEvents() {
        document.getElementById('battery-slider').addEventListener('input', (e) => {
            this.currentLevel = parseInt(e.target.value);
            this.updateDisplay();
            this.saveData();
        });
    },

    adjust(type, amount) {
        const oldLevel = this.currentLevel;
        this.currentLevel = Math.max(0, Math.min(100, this.currentLevel + amount));

        this.interactions.push({
            type,
            amount,
            time: Date.now(),
            before: oldLevel,
            after: this.currentLevel
        });

        this.updateDisplay();
        this.saveData();

        const emoji = amount > 0 ? '⚡' : '🔋';
        Core.Toast.show(`${emoji} Battery ${amount > 0 ? '+' : ''}${amount}%`, 'info');
    },

    updateDisplay() {
        const fill = document.getElementById('battery-fill');
        const percent = document.getElementById('battery-percent');
        const slider = document.getElementById('battery-slider');

        fill.style.width = `${this.currentLevel}%`;
        percent.textContent = `${this.currentLevel}%`;
        slider.value = this.currentLevel;

        // Update color based on level
        if (this.currentLevel < 20) {
            fill.style.background = 'var(--danger)';
        } else if (this.currentLevel < 50) {
            fill.style.background = 'var(--warning)';
        } else {
            fill.style.background = 'var(--success)';
        }

        this.updateInteractionLog();
        this.updateSuggestions();
    },

    updateInteractionLog() {
        const log = document.getElementById('interaction-log');
        const todayInteractions = this.interactions.filter(i => {
            const today = new Date().toDateString();
            return new Date(i.time).toDateString() === today;
        });

        if (todayInteractions.length === 0) {
            log.innerHTML = '<p style="color: var(--text-muted);">No interactions logged today</p>';
        } else {
            log.innerHTML = todayInteractions.reverse().slice(0, 5).map(i => `
                <div style="padding: 0.5rem; background: var(--bg-secondary); border-radius: var(--radius);
                     margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                    <span>${this.getInteractionLabel(i.type)}</span>
                    <span style="color: ${i.amount > 0 ? 'var(--success)' : 'var(--danger)'};">
                        ${i.amount > 0 ? '+' : ''}${i.amount}%
                    </span>
                </div>
            `).join('');
        }
    },

    getInteractionLabel(type) {
        const labels = {
            meeting: '👥 Meeting',
            alone: '🧘 Alone Time',
            party: '🎉 Party',
            nap: '😴 Nap',
            call: '📞 Phone Call',
            walk: '🚶 Walk'
        };
        return labels[type] || type;
    },

    updateSuggestions() {
        const suggestions = document.getElementById('suggestions');

        if (this.currentLevel < 30) {
            suggestions.innerHTML = `
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li>Take a 20-minute break alone</li>
                    <li>Cancel non-essential social plans</li>
                    <li>Try a guided meditation</li>
                    <li>Take a quiet walk</li>
                </ul>
            `;
        } else if (this.currentLevel < 60) {
            suggestions.innerHTML = `
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li>Limit social interactions today</li>
                    <li>Schedule some quiet time</li>
                    <li>Choose smaller group activities</li>
                </ul>
            `;
        } else {
            suggestions.innerHTML = `
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li>You have good social energy!</li>
                    <li>Consider connecting with friends</li>
                    <li>Good time for group activities</li>
                </ul>
            `;
        }
    },

    saveData() {
        Core.Storage.set('social-battery', {
            level: this.currentLevel,
            interactions: this.interactions,
            lastUpdate: Date.now()
        });
    },

    loadData() {
        const data = Core.Storage.get('social-battery');
        if (data) {
            this.currentLevel = data.level;
            this.interactions = data.interactions || [];
            this.updateDisplay();
        }
    }
};

// Energy Tracker
const EnergyTracker = {
    entries: [],
    patterns: {},

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>How's Your Energy Right Now?</h3>

                    <div style="display: flex; justify-content: space-around; margin: 2rem 0;">
                        ${[1,2,3,4,5].map(level => `
                            <button class="energy-level-btn" data-level="${level}"
                                style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--border);
                                       background: var(--bg); cursor: pointer; font-size: 1.5rem;">
                                ${this.getLevelEmoji(level)}
                            </button>
                        `).join('')}
                    </div>

                    <div style="text-align: center; color: var(--text-muted);">
                        <span style="margin: 0 2rem;">Exhausted</span>
                        <span style="margin: 0 2rem;">Low</span>
                        <span style="margin: 0 2rem;">Okay</span>
                        <span style="margin: 0 2rem;">Good</span>
                        <span style="margin: 0 2rem;">Peak</span>
                    </div>
                </div>

                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Your Energy Patterns</h3>
                    <canvas id="energy-chart" width="700" height="300"></canvas>
                </div>

                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>Peak Hours Analysis</h3>
                    <div id="peak-analysis"></div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadData();
        this.drawChart();
    },

    getLevelEmoji(level) {
        const emojis = ['', '😴', '🥱', '😐', '😊', '🚀'];
        return emojis[level];
    },

    attachEvents() {
        document.querySelectorAll('.energy-level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = parseInt(e.currentTarget.dataset.level);
                this.recordEnergy(level);
            });
        });
    },

    recordEnergy(level) {
        const now = new Date();
        const hour = now.getHours();

        this.entries.push({
            level,
            timestamp: Date.now(),
            hour,
            date: now.toDateString()
        });

        // Update patterns
        if (!this.patterns[hour]) {
            this.patterns[hour] = [];
        }
        this.patterns[hour].push(level);

        this.saveData();
        this.drawChart();
        this.analyzePatterns();

        Core.Toast.show('Energy level recorded!', 'success');

        // Visual feedback
        document.querySelectorAll('.energy-level-btn').forEach(btn => {
            btn.style.transform = btn.dataset.level == level ? 'scale(1.2)' : 'scale(1)';
            btn.style.background = btn.dataset.level == level ? 'var(--secondary)' : 'var(--bg)';
            btn.style.color = btn.dataset.level == level ? 'white' : 'var(--text)';
        });

        setTimeout(() => {
            document.querySelectorAll('.energy-level-btn').forEach(btn => {
                btn.style.transform = 'scale(1)';
                btn.style.background = 'var(--bg)';
                btn.style.color = 'var(--text)';
            });
        }, 1000);
    },

    drawChart() {
        const canvas = document.getElementById('energy-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = 'var(--border)';
        ctx.lineWidth = 1;

        // Horizontal lines
        for (let i = 1; i <= 5; i++) {
            const y = height - (i * height / 5);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw average pattern
        const hoursData = Array(24).fill(null);
        for (let hour = 0; hour < 24; hour++) {
            if (this.patterns[hour] && this.patterns[hour].length > 0) {
                const avg = this.patterns[hour].reduce((a, b) => a + b, 0) / this.patterns[hour].length;
                hoursData[hour] = avg;
            }
        }

        // Draw line
        ctx.strokeStyle = 'var(--secondary)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        let started = false;
        for (let hour = 0; hour < 24; hour++) {
            if (hoursData[hour] !== null) {
                const x = (hour / 23) * width;
                const y = height - (hoursData[hour] / 5) * height;

                if (!started) {
                    ctx.moveTo(x, y);
                    started = true;
                } else {
                    ctx.lineTo(x, y);
                }

                // Draw point
                ctx.fillStyle = 'var(--secondary)';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.stroke();

        // Draw hour labels
        ctx.fillStyle = 'var(--text-muted)';
        ctx.font = '12px sans-serif';
        for (let hour = 0; hour < 24; hour += 3) {
            const x = (hour / 23) * width;
            ctx.fillText(`${hour}:00`, x - 15, height + 20);
        }
    },

    analyzePatterns() {
        const analysis = document.getElementById('peak-analysis');

        const hourlyAverages = {};
        for (let hour = 0; hour < 24; hour++) {
            if (this.patterns[hour] && this.patterns[hour].length > 0) {
                hourlyAverages[hour] = this.patterns[hour].reduce((a, b) => a + b, 0) / this.patterns[hour].length;
            }
        }

        const sorted = Object.entries(hourlyAverages).sort((a, b) => b[1] - a[1]);
        const peakHours = sorted.slice(0, 3);
        const lowHours = sorted.slice(-3);

        analysis.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <strong>Your Peak Energy Hours:</strong>
                <ul style="margin-top: 0.5rem;">
                    ${peakHours.map(([hour, avg]) => `
                        <li>${hour}:00 - Average: ${avg.toFixed(1)}/5</li>
                    `).join('')}
                </ul>
            </div>
            <div>
                <strong>Your Low Energy Hours:</strong>
                <ul style="margin-top: 0.5rem;">
                    ${lowHours.map(([hour, avg]) => `
                        <li>${hour}:00 - Average: ${avg.toFixed(1)}/5</li>
                    `).join('')}
                </ul>
            </div>
            ${sorted.length < 5 ? '<p style="color: var(--text-muted); margin-top: 1rem;">Track more data for better patterns!</p>' : ''}
        `;
    },

    saveData() {
        Core.Storage.set('energy-tracker', {
            entries: this.entries,
            patterns: this.patterns
        });
    },

    loadData() {
        const data = Core.Storage.get('energy-tracker');
        if (data) {
            this.entries = data.entries || [];
            this.patterns = data.patterns || {};
        }
    }
};

// Worry Window
const WorryWindow = {
    worryTime: null,
    worries: [],
    currentWorries: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Schedule Your Worry Time</h3>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">
                        Set aside 15-30 minutes daily to process worries
                    </p>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label class="input-label">Time</label>
                            <input type="time" id="worry-time" class="input-field" style="width: 100%;">
                        </div>
                        <div>
                            <label class="input-label">Duration</label>
                            <select id="worry-duration" class="input-field" style="width: 100%;">
                                <option value="15">15 minutes</option>
                                <option value="20">20 minutes</option>
                                <option value="30">30 minutes</option>
                            </select>
                        </div>
                    </div>

                    <button id="set-worry-time" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Set Worry Window
                    </button>
                </div>

                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h4>Worry Parking Lot</h4>
                    <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
                        Capture worries here to process during your worry window
                    </p>

                    <div style="display: flex; gap: 1rem;">
                        <input type="text" id="worry-input" class="input-field" style="flex: 1;"
                               placeholder="What's worrying you?">
                        <button id="park-worry" class="btn btn-secondary">Park It</button>
                    </div>

                    <div id="parked-worries" style="margin-top: 1rem;"></div>
                </div>

                <div id="worry-window-active" style="display: none; background: var(--warning); color: white;
                     padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                    <h3>Worry Window Active!</h3>
                    <p style="margin: 1rem 0;">Time to process your worries</p>
                    <div id="worry-timer" style="font-size: 2rem; font-weight: bold; margin: 1rem 0;">15:00</div>
                    <button id="start-processing" class="btn btn-primary" style="background: white; color: var(--text);">
                        Start Processing
                    </button>
                </div>

                <div id="worry-stats" style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h4>This Week's Worries</h4>
                    <div id="stats-display"></div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadData();
        this.checkWorryTime();
    },

    attachEvents() {
        document.getElementById('set-worry-time').addEventListener('click', () => this.setWorryTime());
        document.getElementById('park-worry').addEventListener('click', () => this.parkWorry());
        document.getElementById('worry-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.parkWorry();
        });
    },

    setWorryTime() {
        const time = document.getElementById('worry-time').value;
        const duration = document.getElementById('worry-duration').value;

        if (!time) {
            Core.Toast.show('Please select a time', 'error');
            return;
        }

        this.worryTime = { time, duration: parseInt(duration) };
        Core.Storage.set('worry-window-time', this.worryTime);

        Core.Toast.show('Worry window scheduled!', 'success');
        this.scheduleNotification();
    },

    parkWorry() {
        const input = document.getElementById('worry-input');
        const worry = input.value.trim();

        if (!worry) return;

        this.currentWorries.push({
            text: worry,
            timestamp: Date.now(),
            processed: false
        });

        input.value = '';
        this.saveData();
        this.renderParkedWorries();

        Core.Toast.show('Worry parked! Deal with it during worry time.', 'success');
    },

    renderParkedWorries() {
        const container = document.getElementById('parked-worries');
        const unprocessed = this.currentWorries.filter(w => !w.processed);

        if (unprocessed.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted);">No worries parked</p>';
        } else {
            container.innerHTML = unprocessed.map((worry, i) => `
                <div style="padding: 0.75rem; background: var(--bg); border-radius: var(--radius);
                     margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                    <span>${worry.text}</span>
                    <button onclick="WorryWindow.removeWorry(${i})"
                        style="background: transparent; border: none; color: var(--text-muted); cursor: pointer;">✓</button>
                </div>
            `).join('');
        }

        this.updateStats();
    },

    removeWorry(index) {
        this.currentWorries[index].processed = true;
        this.saveData();
        this.renderParkedWorries();
    },

    checkWorryTime() {
        if (!this.worryTime) return;

        const now = new Date();
        const [hours, minutes] = this.worryTime.time.split(':');
        const worryDate = new Date();
        worryDate.setHours(parseInt(hours), parseInt(minutes), 0);

        const diff = worryDate - now;
        if (diff > 0 && diff < 60000) { // Within a minute
            this.activateWorryWindow();
        }

        // Check every minute
        setTimeout(() => this.checkWorryTime(), 60000);
    },

    activateWorryWindow() {
        const windowDiv = document.getElementById('worry-window-active');
        windowDiv.style.display = 'block';

        let remaining = this.worryTime.duration * 60;
        const timer = document.getElementById('worry-timer');

        const interval = setInterval(() => {
            remaining--;
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            timer.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            if (remaining <= 0) {
                clearInterval(interval);
                windowDiv.style.display = 'none';
                Core.Toast.show('Worry window closed. Great job processing!', 'success');
            }
        }, 1000);
    },

    updateStats() {
        const stats = document.getElementById('stats-display');
        const thisWeek = this.worries.filter(w => {
            const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            return w.timestamp > weekAgo;
        });

        const processed = thisWeek.filter(w => w.processed).length;
        const pending = thisWeek.filter(w => !w.processed).length;

        stats.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
                <div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--success);">${processed}</div>
                    <div style="color: var(--text-muted);">Processed</div>
                </div>
                <div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--warning);">${pending}</div>
                    <div style="color: var(--text-muted);">Pending</div>
                </div>
            </div>
        `;
    },

    scheduleNotification() {
        // This would use Notification API in a real implementation
        console.log('Worry window scheduled for', this.worryTime);
    },

    saveData() {
        Core.Storage.set('worry-window-data', {
            worries: this.worries,
            currentWorries: this.currentWorries
        });
    },

    loadData() {
        const data = Core.Storage.get('worry-window-data');
        if (data) {
            this.worries = data.worries || [];
            this.currentWorries = data.currentWorries || [];
            this.renderParkedWorries();
        }

        const time = Core.Storage.get('worry-window-time');
        if (time) {
            this.worryTime = time;
            document.getElementById('worry-time').value = time.time;
            document.getElementById('worry-duration').value = time.duration;
        }
    }
};

// Export utilities
window.GratitudeJar = GratitudeJar;
window.SocialBatteryMeter = SocialBatteryMeter;
window.EnergyTracker = EnergyTracker;
window.WorryWindow = WorryWindow;