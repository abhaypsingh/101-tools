// Extended Utility Implementations

// Thought Untangler
const ThoughtUntangler = {
    thoughts: [],
    connections: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto;">
                <div style="margin-bottom: 2rem;">
                    <input type="text" id="thought-input" class="input-field"
                        placeholder="Enter a thought and press Enter..." style="width: 100%;">
                </div>

                <div id="thought-canvas" style="position: relative; height: 500px; background: var(--bg-secondary);
                    border-radius: var(--radius-lg); overflow: hidden;"></div>

                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button id="clear-thoughts" class="btn btn-secondary">Clear All</button>
                    <button id="export-thoughts" class="btn btn-primary">Export Map</button>
                    <button id="find-patterns" class="btn btn-primary">Find Patterns</button>
                </div>

                <div id="patterns" style="margin-top: 2rem; display: none;">
                    <h3>Detected Patterns</h3>
                    <div id="pattern-list"></div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('thought-canvas');
        this.attachEvents();
        this.loadState();
    },

    attachEvents() {
        document.getElementById('thought-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
                this.addThought(e.target.value.trim());
                e.target.value = '';
            }
        });

        document.getElementById('clear-thoughts').addEventListener('click', () => {
            if (confirm('Clear all thoughts?')) {
                this.thoughts = [];
                this.connections = [];
                this.render();
                this.saveState();
            }
        });

        document.getElementById('export-thoughts').addEventListener('click', () => this.exportMap());
        document.getElementById('find-patterns').addEventListener('click', () => this.findPatterns());
    },

    addThought(text) {
        const thought = {
            id: Date.now(),
            text,
            x: Math.random() * (this.canvas.offsetWidth - 150) + 50,
            y: Math.random() * (this.canvas.offsetHeight - 100) + 50,
            connections: []
        };

        // Find related thoughts
        this.thoughts.forEach(existing => {
            const similarity = this.calculateSimilarity(text, existing.text);
            if (similarity > 0.3) {
                this.connections.push({
                    from: thought.id,
                    to: existing.id,
                    strength: similarity
                });
            }
        });

        this.thoughts.push(thought);
        this.render();
        this.saveState();
    },

    calculateSimilarity(text1, text2) {
        const words1 = text1.toLowerCase().split(/\s+/);
        const words2 = text2.toLowerCase().split(/\s+/);
        const common = words1.filter(w => words2.includes(w)).length;
        return common / Math.max(words1.length, words2.length);
    },

    render() {
        this.canvas.innerHTML = '';

        // Draw connections
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';

        this.connections.forEach(conn => {
            const from = this.thoughts.find(t => t.id === conn.from);
            const to = this.thoughts.find(t => t.id === conn.to);
            if (from && to) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', from.x + 75);
                line.setAttribute('y1', from.y + 25);
                line.setAttribute('x2', to.x + 75);
                line.setAttribute('y2', to.y + 25);
                line.setAttribute('stroke', 'var(--secondary)');
                line.setAttribute('stroke-width', conn.strength * 5);
                line.setAttribute('opacity', 0.3);
                svg.appendChild(line);
            }
        });

        this.canvas.appendChild(svg);

        // Draw thought nodes
        this.thoughts.forEach(thought => {
            const node = document.createElement('div');
            node.style.position = 'absolute';
            node.style.left = thought.x + 'px';
            node.style.top = thought.y + 'px';
            node.style.padding = '0.75rem';
            node.style.background = 'var(--bg)';
            node.style.border = '2px solid var(--secondary)';
            node.style.borderRadius = 'var(--radius)';
            node.style.cursor = 'move';
            node.style.maxWidth = '150px';
            node.style.wordWrap = 'break-word';
            node.textContent = thought.text;

            // Make draggable
            let isDragging = false;
            let startX, startY;

            node.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - thought.x;
                startY = e.clientY - thought.y;
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    thought.x = e.clientX - startX;
                    thought.y = e.clientY - startY;
                    node.style.left = thought.x + 'px';
                    node.style.top = thought.y + 'px';
                    this.render();
                }
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    this.saveState();
                }
            });

            this.canvas.appendChild(node);
        });
    },

    findPatterns() {
        const patterns = [];

        // Find clusters
        const clusters = this.findClusters();
        if (clusters.length > 0) {
            patterns.push({
                type: 'Clusters',
                description: `Found ${clusters.length} thought clusters`
            });
        }

        // Find loops
        const loops = this.findLoops();
        if (loops.length > 0) {
            patterns.push({
                type: 'Circular Thinking',
                description: `Detected ${loops.length} circular thought patterns`
            });
        }

        // Show patterns
        const patternDiv = document.getElementById('patterns');
        const list = document.getElementById('pattern-list');

        if (patterns.length > 0) {
            list.innerHTML = patterns.map(p =>
                `<div style="padding: 1rem; background: var(--bg); border-radius: var(--radius); margin-bottom: 1rem;">
                    <strong>${p.type}:</strong> ${p.description}
                </div>`
            ).join('');
            patternDiv.style.display = 'block';
        } else {
            Core.Toast.show('No patterns detected yet. Add more thoughts!', 'info');
        }
    },

    findClusters() {
        // Simple clustering based on connection density
        const clusters = [];
        const visited = new Set();

        this.thoughts.forEach(thought => {
            if (!visited.has(thought.id)) {
                const cluster = this.expandCluster(thought.id, visited);
                if (cluster.length > 2) {
                    clusters.push(cluster);
                }
            }
        });

        return clusters;
    },

    expandCluster(thoughtId, visited) {
        const cluster = [thoughtId];
        visited.add(thoughtId);

        const connected = this.connections
            .filter(c => c.from === thoughtId || c.to === thoughtId)
            .map(c => c.from === thoughtId ? c.to : c.from);

        connected.forEach(id => {
            if (!visited.has(id)) {
                cluster.push(...this.expandCluster(id, visited));
            }
        });

        return cluster;
    },

    findLoops() {
        // Simple loop detection
        const loops = [];
        // Implementation would go here
        return loops;
    },

    exportMap() {
        const data = {
            thoughts: this.thoughts,
            connections: this.connections,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `thought-map-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Core.Toast.show('Thought map exported', 'success');
    },

    saveState() {
        Core.Storage.set('thought-untangler', {
            thoughts: this.thoughts,
            connections: this.connections
        });
    },

    loadState() {
        const saved = Core.Storage.get('thought-untangler');
        if (saved) {
            this.thoughts = saved.thoughts || [];
            this.connections = saved.connections || [];
            this.render();
        }
    }
};

// Time Capsule Messenger
const TimeCapsuleMessenger = {
    capsules: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Write to Your Future Self</h3>
                    <textarea id="capsule-message" class="input-field textarea-field" style="width: 100%; margin: 1rem 0;"
                        placeholder="Dear future me..."></textarea>

                    <div style="margin-bottom: 1rem;">
                        <label class="input-label">When should this unlock?</label>
                        <input type="date" id="unlock-date" class="input-field" style="width: 100%;"
                            min="${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">
                    </div>

                    <button id="seal-capsule" class="btn btn-primary" style="width: 100%;">
                        🔒 Seal Time Capsule
                    </button>
                </div>

                <div id="capsule-vault">
                    <h3>Your Time Capsules</h3>
                    <div id="capsule-list"></div>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadCapsules();
    },

    attachEvents() {
        document.getElementById('seal-capsule').addEventListener('click', () => this.createCapsule());
    },

    createCapsule() {
        const message = document.getElementById('capsule-message').value.trim();
        const unlockDate = document.getElementById('unlock-date').value;

        if (!message || !unlockDate) {
            Core.Toast.show('Please write a message and set an unlock date', 'error');
            return;
        }

        const capsule = {
            id: Date.now(),
            message: this.encrypt(message),
            created: Date.now(),
            unlockDate: new Date(unlockDate).getTime(),
            opened: false
        };

        this.capsules.push(capsule);
        this.saveCapsules();

        document.getElementById('capsule-message').value = '';
        document.getElementById('unlock-date').value = '';

        Core.Toast.show('Time capsule sealed! 🔒', 'success');
        this.renderCapsules();
    },

    encrypt(message) {
        // Simple obfuscation for demo - in production would use proper encryption
        return btoa(encodeURIComponent(message));
    },

    decrypt(encrypted) {
        return decodeURIComponent(atob(encrypted));
    },

    renderCapsules() {
        const list = document.getElementById('capsule-list');
        const now = Date.now();

        if (this.capsules.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No time capsules yet</p>';
            return;
        }

        list.innerHTML = this.capsules.map(capsule => {
            const timeLeft = capsule.unlockDate - now;
            const canOpen = timeLeft <= 0;
            const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));

            return `
                <div style="padding: 1.5rem; background: var(--bg); border-radius: var(--radius); margin-bottom: 1rem;
                    border: 2px solid ${canOpen ? 'var(--success)' : 'var(--border)'};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: bold; margin-bottom: 0.5rem;">
                                ${canOpen ? '🔓 Ready to Open!' : '🔒 Locked'}
                            </div>
                            <div style="color: var(--text-muted); font-size: 0.875rem;">
                                Created: ${new Date(capsule.created).toLocaleDateString()}
                            </div>
                            <div style="color: var(--text-muted); font-size: 0.875rem;">
                                ${canOpen
                                    ? 'Available now'
                                    : `Opens in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
                            </div>
                        </div>
                        ${canOpen && !capsule.opened
                            ? `<button onclick="TimeCapsuleMessenger.openCapsule(${capsule.id})"
                                class="btn btn-primary">Open</button>`
                            : ''}
                    </div>
                    ${capsule.opened
                        ? `<div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary);
                            border-radius: var(--radius);">
                            ${this.decrypt(capsule.message)}
                        </div>`
                        : ''}
                </div>
            `;
        }).join('');
    },

    openCapsule(id) {
        const capsule = this.capsules.find(c => c.id === id);
        if (capsule && Date.now() >= capsule.unlockDate) {
            capsule.opened = true;
            this.saveCapsules();
            this.renderCapsules();
            Core.Toast.show('Time capsule opened! 📜', 'success');
        }
    },

    saveCapsules() {
        Core.Storage.set('time-capsules', this.capsules);
    },

    loadCapsules() {
        this.capsules = Core.Storage.get('time-capsules') || [];
        this.renderCapsules();

        // Check for newly available capsules
        const now = Date.now();
        const newlyAvailable = this.capsules.filter(c =>
            !c.opened && c.unlockDate <= now && c.unlockDate > now - 24 * 60 * 60 * 1000
        );

        if (newlyAvailable.length > 0) {
            Core.Toast.show(`${newlyAvailable.length} time capsule(s) ready to open!`, 'success');
        }
    }
};

// Personal Value Sorter
const PersonalValueSorter = {
    values: [
        'Family', 'Career', 'Health', 'Friendship', 'Love', 'Money',
        'Adventure', 'Creativity', 'Security', 'Freedom', 'Knowledge',
        'Spirituality', 'Community', 'Achievement', 'Recognition',
        'Independence', 'Integrity', 'Growth', 'Balance', 'Fun',
        'Peace', 'Justice', 'Beauty', 'Tradition', 'Innovation'
    ],

    currentStep: 'initial',
    sorted: { important: [], notImportant: [] },
    ranked: [],

    init() {
        this.renderStep();
    },

    renderStep() {
        const workspace = document.getElementById('utility-workspace');

        if (this.currentStep === 'initial') {
            workspace.innerHTML = `
                <div style="max-width: 800px; margin: 0 auto;">
                    <h2 style="text-align: center; margin-bottom: 2rem;">Sort Your Values</h2>
                    <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem;">
                        Drag each value card to either "Important to Me" or "Not as Important"
                    </p>

                    <div id="value-cards" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;
                        margin-bottom: 2rem; min-height: 200px; padding: 1rem; background: var(--bg-secondary);
                        border-radius: var(--radius-lg);">
                        ${this.values.map(value => `
                            <div class="value-card" draggable="true" data-value="${value}"
                                style="padding: 0.75rem 1.5rem; background: var(--bg); border: 2px solid var(--border);
                                border-radius: var(--radius); cursor: move;">
                                ${value}
                            </div>
                        `).join('')}
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div id="important-zone" class="drop-zone" style="min-height: 200px; padding: 1rem;
                            background: rgba(39, 174, 96, 0.1); border: 2px dashed var(--success);
                            border-radius: var(--radius-lg);">
                            <h3 style="text-align: center; color: var(--success);">Important to Me</h3>
                        </div>

                        <div id="not-important-zone" class="drop-zone" style="min-height: 200px; padding: 1rem;
                            background: rgba(231, 76, 60, 0.1); border: 2px dashed var(--danger);
                            border-radius: var(--radius-lg);">
                            <h3 style="text-align: center; color: var(--danger);">Not as Important</h3>
                        </div>
                    </div>

                    <button id="proceed-ranking" class="btn btn-primary" style="width: 100%; margin-top: 2rem;"
                        disabled>Continue to Ranking</button>
                </div>
            `;

            this.attachSortingEvents();

        } else if (this.currentStep === 'ranking') {
            workspace.innerHTML = `
                <div style="max-width: 600px; margin: 0 auto;">
                    <h2 style="text-align: center; margin-bottom: 2rem;">Rank Your Important Values</h2>
                    <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem;">
                        Drag to reorder from most important (top) to least important (bottom)
                    </p>

                    <div id="ranking-list" style="background: var(--bg-secondary); padding: 1rem;
                        border-radius: var(--radius-lg);">
                        ${this.sorted.important.map((value, index) => `
                            <div class="rank-item" draggable="true" data-value="${value}" data-index="${index}"
                                style="padding: 1rem; margin-bottom: 0.5rem; background: var(--bg);
                                border-radius: var(--radius); cursor: move; display: flex; align-items: center;">
                                <span style="font-size: 1.5rem; margin-right: 1rem; color: var(--secondary);">
                                    ${index + 1}
                                </span>
                                ${value}
                            </div>
                        `).join('')}
                    </div>

                    <button id="generate-statement" class="btn btn-primary" style="width: 100%; margin-top: 2rem;">
                        Generate Value Statement
                    </button>
                </div>
            `;

            this.attachRankingEvents();

        } else if (this.currentStep === 'result') {
            const topValues = this.ranked.slice(0, 5);
            workspace.innerHTML = `
                <div style="max-width: 600px; margin: 0 auto;">
                    <h2 style="text-align: center; margin-bottom: 2rem;">Your Core Values</h2>

                    <div style="background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
                        color: white; padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Top 5 Values:</h3>
                        ${topValues.map((value, i) => `
                            <div style="font-size: ${1.5 - i * 0.1}rem; margin-bottom: 0.5rem;">
                                ${i + 1}. ${value}
                            </div>
                        `).join('')}
                    </div>

                    <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                        <h3>Your Value Statement:</h3>
                        <p style="line-height: 1.8; margin-top: 1rem;">
                            I prioritize ${topValues[0]} above all else,
                            closely followed by ${topValues[1]} and ${topValues[2]}.
                            ${topValues[3]} and ${topValues[4]} also guide my decisions and actions.
                            These values shape who I am and how I interact with the world.
                        </p>
                    </div>

                    <button id="restart-sorting" class="btn btn-secondary" style="width: 100%; margin-top: 2rem;">
                        Start Over
                    </button>
                </div>
            `;

            document.getElementById('restart-sorting').addEventListener('click', () => {
                this.currentStep = 'initial';
                this.sorted = { important: [], notImportant: [] };
                this.ranked = [];
                this.renderStep();
            });

            this.saveResults();
        }
    },

    attachSortingEvents() {
        const cards = document.querySelectorAll('.value-card');
        const zones = document.querySelectorAll('.drop-zone');
        const proceedBtn = document.getElementById('proceed-ranking');

        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', e.target.dataset.value);
                e.target.classList.add('dragging');
            });

            card.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                zone.style.background = zone.id === 'important-zone'
                    ? 'rgba(39, 174, 96, 0.2)'
                    : 'rgba(231, 76, 60, 0.2)';
            });

            zone.addEventListener('dragleave', (e) => {
                zone.style.background = zone.id === 'important-zone'
                    ? 'rgba(39, 174, 96, 0.1)'
                    : 'rgba(231, 76, 60, 0.1)';
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                const value = e.dataTransfer.getData('text/plain');
                const card = document.querySelector(`[data-value="${value}"]`);

                if (card) {
                    zone.appendChild(card);

                    // Update sorted arrays
                    this.sorted.important = Array.from(document.querySelectorAll('#important-zone .value-card'))
                        .map(c => c.dataset.value);
                    this.sorted.notImportant = Array.from(document.querySelectorAll('#not-important-zone .value-card'))
                        .map(c => c.dataset.value);

                    // Enable proceed button if all cards are sorted
                    const totalSorted = this.sorted.important.length + this.sorted.notImportant.length;
                    proceedBtn.disabled = totalSorted < this.values.length;
                }

                zone.style.background = zone.id === 'important-zone'
                    ? 'rgba(39, 174, 96, 0.1)'
                    : 'rgba(231, 76, 60, 0.1)';
            });
        });

        proceedBtn.addEventListener('click', () => {
            if (this.sorted.important.length === 0) {
                Core.Toast.show('Please mark at least one value as important', 'error');
                return;
            }
            this.currentStep = 'ranking';
            this.ranked = [...this.sorted.important];
            this.renderStep();
        });
    },

    attachRankingEvents() {
        const items = document.querySelectorAll('.rank-item');
        const list = document.getElementById('ranking-list');

        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', e.target.dataset.index);
                e.target.classList.add('dragging');
            });

            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggingItem = document.querySelector('.dragging');
                const afterElement = this.getDragAfterElement(list, e.clientY);
                if (afterElement == null) {
                    list.appendChild(draggingItem);
                } else {
                    list.insertBefore(draggingItem, afterElement);
                }
            });
        });

        document.getElementById('generate-statement').addEventListener('click', () => {
            // Update ranked order based on current DOM order
            this.ranked = Array.from(document.querySelectorAll('.rank-item'))
                .map(item => item.dataset.value);
            this.currentStep = 'result';
            this.renderStep();
        });
    },

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.rank-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    saveResults() {
        Core.Storage.set('personal-values', {
            ranked: this.ranked,
            timestamp: Date.now()
        });
    }
};

// Register all utility implementations
window.ThoughtUntangler = ThoughtUntangler;
window.TimeCapsuleMessenger = TimeCapsuleMessenger;
window.PersonalValueSorter = PersonalValueSorter;

// Create stub implementations for remaining utilities
const utilityStubs = [
    'SilentAuctionTimer', 'ColorEmotionMapper', 'HabitStacker', 'FocusSoundscape',
    'MemoryPalaceBuilder', 'MicroJournal', 'DecisionMatrix', 'SocialBatteryMeter',
    'GratitudeJar', 'EnergyTracker', 'BoundaryScriptWriter', 'ComplimentGenerator',
    'SleepDebtCalculator', 'WorryWindow', 'MealDice', 'ScreenBreakEnforcer',
    'TaskFrictionAnalyzer', 'EmotionColorPicker', 'ReadingTimeBank', 'ConversationStarterSpinner',
    'DigitalDetoxTimer', 'MotivationMomentum', 'IdeaCollisionTool', 'PersonalInflationTracker',
    'WalkingMeetingPacer', 'MindfulTransitionBell', 'GoalThermometer', 'DeclutterRoulette',
    'ValidationGenerator', 'TimePerceptionTest', 'FidgetPatternMaker', 'CommitmentThermometer',
    'MicroLearningQueue', 'ArgumentMapper', 'LifePieChart', 'ImpulsePurchaseDelay',
    'BodyScanGuide', 'TaskDelegator', 'CreativityUnlocker', 'MeetingCostCalculator',
    'PriorityPyramid', 'StressSignalDecoder', 'ProductivityWaveTracker', 'CommunicationStyleAdapter',
    'DistractionLogger', 'EnergyInvestmentPortfolio', 'SmallWinCollector', 'BoundaryVisualizer',
    'TaskEstimatorTrainer', 'EmotionThermometer', 'CognitiveLoadMeter', 'HabitBreaker',
    'FocusPhotography', 'GuiltLiberator', 'TaskMultiplier', 'ComfortZoneExpander',
    'ListeningModeIndicator', 'PersonalBandwidthMonitor', 'MicroAdventureGenerator',
    'ThoughtSpeedController', 'DecisionFatigueMeter', 'PerfectionismDimmer', 'SocialScriptLibrary',
    'TaskDecomposer', 'MotivationWeather', 'ComparisonBlocker', 'PermissionSlipGenerator',
    'CognitiveReframeTool', 'PersonalRitualBuilder', 'StressFingerprint', 'AccomplishmentAmplifier',
    'ContextSwitcher', 'EmotionalBandwidth', 'TaskAgingTracker', 'EnergyVampireDetector',
    'MicroCommitmentTracker', 'FlowStateTimer', 'PersonalNoiseFilter', 'TaskMomentumVisualizer',
    'OverwhelmOverflow', 'RecoveryTimeCalculator', 'AttentionSpanTrainer', 'PriorityShuffler',
    'EmotionalLaborTracker', 'PersonalPaceFinder', 'ObligationAuditor', 'MentalLoadDistributor',
    'TransitionRitualCreator', 'PersonalCompass', 'AssumptionChallenger', 'EnergyRecipeBook',
    'MicroProgressBar', 'CognitiveExitRamp', 'PersonalSeasonality', 'TomorrowVisualizer'
];

utilityStubs.forEach(name => {
    window[name] = {
        init() {
            const workspace = document.getElementById('utility-workspace');
            workspace.innerHTML = `
                <div style="text-align: center; padding: 4rem;">
                    <div style="font-size: 4rem; margin-bottom: 2rem;">🚧</div>
                    <h2>Coming Soon!</h2>
                    <p style="color: var(--text-muted); margin-top: 1rem;">
                        This utility is under construction and will be available soon.
                    </p>
                    <p style="color: var(--text-muted); margin-top: 1rem;">
                        In the meantime, try exploring our other ${Utilities.registry.length - 1} tools!
                    </p>
                    <button onclick="Core.Router.navigate('#/')" class="btn btn-primary" style="margin-top: 2rem;">
                        Explore Other Tools
                    </button>
                </div>
            `;
        }
    };
});