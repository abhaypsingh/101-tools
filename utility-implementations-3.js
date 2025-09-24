// Utility Implementations Part 3 (Additional Core Utilities)

// Focus Soundscape Generator
const FocusSoundscape = {
    audioContext: null,
    sources: [],
    presets: [
        { name: 'Rain', frequencies: [200, 400, 800], type: 'brown' },
        { name: 'Ocean', frequencies: [100, 300, 500], type: 'pink' },
        { name: 'Forest', frequencies: [500, 1000, 2000], type: 'white' },
        { name: 'Space', frequencies: [50, 150, 250], type: 'brown' },
        { name: 'Focus', frequencies: [432, 528, 639], type: 'sine' }
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');

        if (!Core.Capabilities.check('webAudio')) {
            this.initFallback(workspace);
            return;
        }

        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg);">
                    <h3 style="text-align: center; margin-bottom: 2rem;">Create Your Focus Soundscape</h3>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                        ${this.presets.map(preset => `
                            <button class="preset-btn" data-preset="${preset.name}"
                                style="padding: 1rem; background: var(--bg-secondary); border: 2px solid var(--border);
                                       border-radius: var(--radius); cursor: pointer;">
                                <div style="font-size: 2rem;">${this.getPresetEmoji(preset.name)}</div>
                                <div>${preset.name}</div>
                            </button>
                        `).join('')}
                    </div>

                    <div id="mixer" style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius);">
                        <h4>Sound Layers</h4>
                        <div id="layer-controls"></div>
                    </div>

                    <div style="text-align: center; margin-top: 2rem;">
                        <button id="play-soundscape" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem;">
                            ▶ Play
                        </button>
                        <button id="stop-soundscape" class="btn btn-secondary" style="font-size: 1.2rem; padding: 1rem 2rem; display: none;">
                            ⏹ Stop
                        </button>
                    </div>

                    <div style="margin-top: 2rem;">
                        <label>Timer (optional)</label>
                        <input type="range" id="timer-slider" min="0" max="60" value="0" style="width: 100%;">
                        <div style="text-align: center; color: var(--text-muted);">
                            <span id="timer-display">No timer</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    initFallback(workspace) {
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 4rem 2rem;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">🔇</div>
                <h2>Web Audio Not Available</h2>
                <p style="color: var(--text-muted); margin-top: 1rem;">
                    Your browser doesn't support Web Audio API.
                    Try using a modern browser for the full experience.
                </p>

                <div style="margin-top: 2rem; background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius);">
                    <h3>Alternative Focus Sounds</h3>
                    <p>Try these focus techniques instead:</p>
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>4-7-8 breathing technique</li>
                        <li>Box breathing pattern</li>
                        <li>Silent meditation</li>
                        <li>Nature sounds from other apps</li>
                    </ul>
                </div>
            </div>
        `;
    },

    getPresetEmoji(name) {
        const emojis = {
            'Rain': '🌧️',
            'Ocean': '🌊',
            'Forest': '🌲',
            'Space': '🌌',
            'Focus': '🎯'
        };
        return emojis[name] || '🔊';
    },

    attachEvents() {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = this.presets.find(p => p.name === e.currentTarget.dataset.preset);
                this.loadPreset(preset);
            });
        });

        document.getElementById('play-soundscape').addEventListener('click', () => this.play());
        document.getElementById('stop-soundscape').addEventListener('click', () => this.stop());

        document.getElementById('timer-slider').addEventListener('input', (e) => {
            const minutes = e.target.value;
            const display = document.getElementById('timer-display');
            display.textContent = minutes === '0' ? 'No timer' : `${minutes} minutes`;
        });
    },

    loadPreset(preset) {
        const controls = document.getElementById('layer-controls');

        controls.innerHTML = preset.frequencies.map((freq, i) => `
            <div style="margin-bottom: 1rem;">
                <label>Layer ${i + 1} (${freq}Hz)</label>
                <input type="range" class="layer-volume" data-freq="${freq}" data-type="${preset.type}"
                    min="0" max="100" value="50" style="width: 100%;">
            </div>
        `).join('');

        // Highlight selected preset
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.style.borderColor = btn.dataset.preset === preset.name ? 'var(--secondary)' : 'var(--border)';
        });
    },

    play() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Stop any existing sounds
        this.stop();

        // Get layer settings
        const layers = document.querySelectorAll('.layer-volume');

        layers.forEach(layer => {
            const freq = parseFloat(layer.dataset.freq);
            const type = layer.dataset.type;
            const volume = layer.value / 100;

            if (volume > 0) {
                this.createSoundLayer(freq, type, volume);
            }
        });

        // Set timer if needed
        const timerMinutes = document.getElementById('timer-slider').value;
        if (timerMinutes > 0) {
            setTimeout(() => this.stop(), timerMinutes * 60 * 1000);
        }

        // Update UI
        document.getElementById('play-soundscape').style.display = 'none';
        document.getElementById('stop-soundscape').style.display = 'inline-block';
    },

    createSoundLayer(frequency, type, volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        // Configure oscillator
        if (type === 'brown' || type === 'pink' || type === 'white') {
            // Create noise
            const bufferSize = 2 * this.audioContext.sampleRate;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const noise = this.audioContext.createBufferSource();
            noise.buffer = noiseBuffer;
            noise.loop = true;

            // Apply filter for colored noise
            filter.type = 'lowpass';
            filter.frequency.value = frequency;

            noise.connect(filter);
            filter.connect(gainNode);

            noise.start();
            this.sources.push(noise);
        } else {
            oscillator.type = type || 'sine';
            oscillator.frequency.value = frequency;
            oscillator.connect(gainNode);
            oscillator.start();
            this.sources.push(oscillator);
        }

        gainNode.gain.value = volume * 0.1; // Reduce overall volume
        gainNode.connect(this.audioContext.destination);
    },

    stop() {
        this.sources.forEach(source => {
            try {
                source.stop();
            } catch (e) {
                // Source already stopped
            }
        });

        this.sources = [];

        document.getElementById('play-soundscape').style.display = 'inline-block';
        document.getElementById('stop-soundscape').style.display = 'none';
    }
};

// Micro Journal
const MicroJournal = {
    entries: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Today's Entry</h3>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">
                        One sentence to capture today
                    </p>

                    <input type="text" id="journal-entry" class="input-field" style="width: 100%;"
                        placeholder="Today I..." maxlength="200">

                    <button id="save-entry" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Save Entry
                    </button>
                </div>

                <div id="word-cloud" style="min-height: 200px; background: var(--bg-secondary);
                     border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem;">
                    <h3>Your Word Cloud</h3>
                    <div id="cloud-display" style="margin-top: 1rem;"></div>
                </div>

                <div id="recent-entries">
                    <h3>Recent Entries</h3>
                    <div id="entries-list"></div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadEntries();
    },

    attachEvents() {
        const input = document.getElementById('journal-entry');
        const saveBtn = document.getElementById('save-entry');

        saveBtn.addEventListener('click', () => this.saveEntry());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveEntry();
        });

        // Check if there's already an entry today
        this.checkTodayEntry();
    },

    checkTodayEntry() {
        const today = new Date().toDateString();
        const todayEntry = this.entries.find(e => new Date(e.date).toDateString() === today);

        if (todayEntry) {
            document.getElementById('journal-entry').value = todayEntry.text;
            document.getElementById('save-entry').textContent = 'Update Entry';
        }
    },

    saveEntry() {
        const input = document.getElementById('journal-entry');
        const text = input.value.trim();

        if (!text) return;

        const today = new Date().toDateString();
        const existingIndex = this.entries.findIndex(e => new Date(e.date).toDateString() === today);

        if (existingIndex >= 0) {
            this.entries[existingIndex].text = text;
        } else {
            this.entries.unshift({
                text,
                date: Date.now(),
                id: Date.now()
            });
        }

        Core.Storage.set('micro-journal', this.entries);
        this.renderEntries();
        this.generateWordCloud();

        Core.Toast.show('Entry saved!', 'success');
        input.value = '';
    },

    renderEntries() {
        const list = document.getElementById('entries-list');
        const recentEntries = this.entries.slice(0, 7);

        if (recentEntries.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No entries yet</p>';
        } else {
            list.innerHTML = recentEntries.map(entry => {
                const date = new Date(entry.date);
                const isToday = date.toDateString() === new Date().toDateString();

                return `
                    <div style="padding: 1rem; background: ${isToday ? 'var(--secondary)' : 'var(--bg)'};
                         color: ${isToday ? 'white' : 'var(--text)'};
                         border-radius: var(--radius); margin-bottom: 0.5rem;">
                        <div style="font-weight: bold; margin-bottom: 0.5rem;">
                            ${date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div>${entry.text}</div>
                    </div>
                `;
            }).join('');
        }
    },

    generateWordCloud() {
        const allText = this.entries.map(e => e.text).join(' ');
        const words = allText.toLowerCase().split(/\W+/).filter(w => w.length > 3);

        const wordFreq = {};
        words.forEach(word => {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        });

        const topWords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20);

        const cloud = document.getElementById('cloud-display');

        if (topWords.length === 0) {
            cloud.innerHTML = '<p style="color: var(--text-muted);">Write more entries to see your word cloud</p>';
        } else {
            const maxFreq = topWords[0][1];

            cloud.innerHTML = topWords.map(([word, freq]) => {
                const size = 0.8 + (freq / maxFreq) * 1.5;
                const opacity = 0.5 + (freq / maxFreq) * 0.5;

                return `<span style="display: inline-block; margin: 0.5rem;
                    font-size: ${size}rem; opacity: ${opacity}; color: var(--secondary);">
                    ${word}
                </span>`;
            }).join('');
        }
    },

    loadEntries() {
        this.entries = Core.Storage.get('micro-journal') || [];
        this.renderEntries();
        this.generateWordCloud();
    }
};

// Decision Matrix
const DecisionMatrix = {
    currentDecision: {
        question: '',
        options: [],
        criteria: [],
        scores: {}
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Define Your Decision</h3>

                    <input type="text" id="decision-question" class="input-field" style="width: 100%; margin-bottom: 1rem;"
                        placeholder="What decision are you making?">

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h4>Options</h4>
                            <div id="options-list"></div>
                            <input type="text" id="new-option" class="input-field" placeholder="Add option..."
                                style="width: 100%; margin-top: 0.5rem;">
                        </div>

                        <div>
                            <h4>Criteria</h4>
                            <div id="criteria-list"></div>
                            <input type="text" id="new-criterion" class="input-field" placeholder="Add criterion..."
                                style="width: 100%; margin-top: 0.5rem;">
                        </div>
                    </div>

                    <button id="build-matrix" class="btn btn-primary" style="width: 100%; margin-top: 1rem;" disabled>
                        Build Decision Matrix
                    </button>
                </div>

                <div id="matrix-container"></div>
                <div id="results-container"></div>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('decision-question').addEventListener('input', (e) => {
            this.currentDecision.question = e.target.value;
            this.checkReady();
        });

        document.getElementById('new-option').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                this.addOption(e.target.value.trim());
                e.target.value = '';
            }
        });

        document.getElementById('new-criterion').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                this.addCriterion(e.target.value.trim());
                e.target.value = '';
            }
        });

        document.getElementById('build-matrix').addEventListener('click', () => this.buildMatrix());
    },

    addOption(option) {
        this.currentDecision.options.push(option);
        this.renderOptions();
        this.checkReady();
    },

    addCriterion(criterion) {
        this.currentDecision.criteria.push({
            name: criterion,
            weight: 1
        });
        this.renderCriteria();
        this.checkReady();
    },

    renderOptions() {
        const list = document.getElementById('options-list');
        list.innerHTML = this.currentDecision.options.map((option, i) => `
            <div style="padding: 0.5rem; background: var(--bg-secondary); border-radius: var(--radius);
                 margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                <span>${option}</span>
                <button onclick="DecisionMatrix.removeOption(${i})"
                    style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
            </div>
        `).join('') || '<p style="color: var(--text-muted);">No options yet</p>';
    },

    renderCriteria() {
        const list = document.getElementById('criteria-list');
        list.innerHTML = this.currentDecision.criteria.map((criterion, i) => `
            <div style="padding: 0.5rem; background: var(--bg-secondary); border-radius: var(--radius);
                 margin-bottom: 0.5rem;">
                <div style="display: flex; justify-content: space-between;">
                    <span>${criterion.name}</span>
                    <button onclick="DecisionMatrix.removeCriterion(${i})"
                        style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
                </div>
                <div style="margin-top: 0.5rem;">
                    <label style="font-size: 0.875rem; color: var(--text-muted);">
                        Weight: <span id="weight-${i}">${criterion.weight}</span>
                    </label>
                    <input type="range" min="1" max="5" value="${criterion.weight}"
                        onchange="DecisionMatrix.updateWeight(${i}, this.value)"
                        style="width: 100%;">
                </div>
            </div>
        `).join('') || '<p style="color: var(--text-muted);">No criteria yet</p>';
    },

    updateWeight(index, value) {
        this.currentDecision.criteria[index].weight = parseInt(value);
        document.getElementById(`weight-${index}`).textContent = value;
    },

    removeOption(index) {
        this.currentDecision.options.splice(index, 1);
        this.renderOptions();
        this.checkReady();
    },

    removeCriterion(index) {
        this.currentDecision.criteria.splice(index, 1);
        this.renderCriteria();
        this.checkReady();
    },

    checkReady() {
        const btn = document.getElementById('build-matrix');
        btn.disabled = !this.currentDecision.question ||
                      this.currentDecision.options.length < 2 ||
                      this.currentDecision.criteria.length < 1;
    },

    buildMatrix() {
        const container = document.getElementById('matrix-container');

        // Initialize scores
        this.currentDecision.options.forEach(option => {
            this.currentDecision.scores[option] = {};
            this.currentDecision.criteria.forEach(criterion => {
                this.currentDecision.scores[option][criterion.name] = 3; // Default middle score
            });
        });

        // Build matrix table
        container.innerHTML = `
            <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg);">
                <h3>${this.currentDecision.question}</h3>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                        <thead>
                            <tr>
                                <th style="padding: 0.75rem; background: var(--bg-secondary); text-align: left;">
                                    Options / Criteria
                                </th>
                                ${this.currentDecision.criteria.map(c => `
                                    <th style="padding: 0.75rem; background: var(--bg-secondary); text-align: center;">
                                        ${c.name}<br>
                                        <small style="color: var(--text-muted);">Weight: ${c.weight}</small>
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${this.currentDecision.options.map(option => `
                                <tr>
                                    <td style="padding: 0.75rem; font-weight: bold;">${option}</td>
                                    ${this.currentDecision.criteria.map(criterion => `
                                        <td style="padding: 0.75rem; text-align: center;">
                                            <input type="range" min="1" max="5" value="3"
                                                onchange="DecisionMatrix.updateScore('${option}', '${criterion.name}', this.value)"
                                                style="width: 80px;">
                                            <div id="score-${option}-${criterion.name}">3</div>
                                        </td>
                                    `).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <button onclick="DecisionMatrix.calculateResults()" class="btn btn-primary"
                    style="width: 100%; margin-top: 1rem;">
                    Calculate Results
                </button>
            </div>
        `;
    },

    updateScore(option, criterion, value) {
        this.currentDecision.scores[option][criterion] = parseInt(value);
        document.getElementById(`score-${option}-${criterion}`).textContent = value;
    },

    calculateResults() {
        const results = {};

        this.currentDecision.options.forEach(option => {
            let totalScore = 0;
            let maxPossible = 0;

            this.currentDecision.criteria.forEach(criterion => {
                const score = this.currentDecision.scores[option][criterion.name];
                const weight = criterion.weight;
                totalScore += score * weight;
                maxPossible += 5 * weight;
            });

            results[option] = {
                score: totalScore,
                percentage: (totalScore / maxPossible) * 100
            };
        });

        const sortedResults = Object.entries(results)
            .sort((a, b) => b[1].score - a[1].score);

        const container = document.getElementById('results-container');
        container.innerHTML = `
            <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-top: 2rem;">
                <h3>Results</h3>

                ${sortedResults.map(([option, data], index) => `
                    <div style="margin-bottom: 1rem; padding: 1rem; background: ${index === 0 ? 'var(--success)' : 'var(--bg-secondary)'};
                         color: ${index === 0 ? 'white' : 'var(--text)'}; border-radius: var(--radius);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span style="font-size: 1.5rem; font-weight: bold;">
                                    ${index === 0 ? '🏆' : index + 1 + '.'} ${option}
                                </span>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.25rem; font-weight: bold;">${data.percentage.toFixed(1)}%</div>
                                <div style="font-size: 0.875rem;">Score: ${data.score}</div>
                            </div>
                        </div>
                        <div style="margin-top: 0.5rem; height: 8px; background: rgba(255,255,255,0.2);
                             border-radius: 4px; overflow: hidden;">
                            <div style="width: ${data.percentage}%; height: 100%;
                                 background: ${index === 0 ? 'white' : 'var(--secondary)'};"></div>
                        </div>
                    </div>
                `).join('')}

                <button onclick="DecisionMatrix.saveDecision()" class="btn btn-secondary"
                    style="width: 100%; margin-top: 1rem;">
                    Save This Decision
                </button>
            </div>
        `;
    },

    saveDecision() {
        const decisions = Core.Storage.get('decision-history') || [];
        decisions.unshift({
            ...this.currentDecision,
            timestamp: Date.now()
        });

        Core.Storage.set('decision-history', decisions.slice(0, 10));
        Core.Toast.show('Decision saved!', 'success');
    }
};

// Export all utilities
window.FocusSoundscape = FocusSoundscape;
window.MicroJournal = MicroJournal;
window.DecisionMatrix = DecisionMatrix;