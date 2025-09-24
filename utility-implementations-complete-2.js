// Complete Implementations Part 2 - Remaining Utilities

// Mindful Transition Bell
const MindfulTransitionBell = {
    transitions: [],
    isActive: false,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <h2>Mindful Transition Bell</h2>
                <p style="color: var(--text-muted);">Gentle reminders between tasks</p>

                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Add Transition</h3>
                    <input type="text" id="transition-name" class="input-field" placeholder="e.g., Work to Lunch" style="margin-bottom: 1rem;">
                    <input type="time" id="transition-time" class="input-field" style="margin-bottom: 1rem;">
                    <button onclick="MindfulTransitionBell.addTransition()" class="btn btn-primary" style="width: 100%;">
                        Add Transition Bell
                    </button>
                </div>

                <div id="transitions-list"></div>

                <div style="text-align: center; margin-top: 2rem;">
                    <button onclick="MindfulTransitionBell.toggleBells()" id="toggle-bells"
                            class="btn btn-secondary" style="font-size: 1.2rem; padding: 1rem 2rem;">
                        ${this.isActive ? '⏸️ Pause Bells' : '▶️ Activate Bells'}
                    </button>
                </div>
            </div>
        `;

        this.loadTransitions();
    },

    addTransition() {
        const name = document.getElementById('transition-name').value.trim();
        const time = document.getElementById('transition-time').value;

        if (!name || !time) return;

        this.transitions.push({
            id: Date.now(),
            name,
            time,
            active: true
        });

        this.saveTransitions();
        this.renderTransitions();
        Core.Toast.show('Transition bell added', 'success');

        document.getElementById('transition-name').value = '';
        document.getElementById('transition-time').value = '';
    },

    renderTransitions() {
        const list = document.getElementById('transitions-list');

        if (this.transitions.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No transition bells set</p>';
        } else {
            list.innerHTML = `
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>Your Transitions</h3>
                    ${this.transitions.map(t => `
                        <div style="display: flex; justify-content: space-between; align-items: center;
                             padding: 0.75rem; background: var(--bg); border-radius: var(--radius); margin-bottom: 0.5rem;">
                            <div>
                                <strong>${t.name}</strong>
                                <span style="margin-left: 1rem; color: var(--text-muted);">${t.time}</span>
                            </div>
                            <button onclick="MindfulTransitionBell.removeTransition(${t.id})"
                                style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    },

    removeTransition(id) {
        this.transitions = this.transitions.filter(t => t.id !== id);
        this.saveTransitions();
        this.renderTransitions();
    },

    toggleBells() {
        this.isActive = !this.isActive;
        document.getElementById('toggle-bells').innerHTML =
            this.isActive ? '⏸️ Pause Bells' : '▶️ Activate Bells';

        if (this.isActive) {
            this.startChecking();
            Core.Toast.show('Mindful bells activated', 'success');
        } else {
            clearInterval(this.checkInterval);
            Core.Toast.show('Bells paused', 'info');
        }
    },

    startChecking() {
        this.checkInterval = setInterval(() => {
            const now = new Date();
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            this.transitions.forEach(t => {
                if (t.time === currentTime && t.active) {
                    this.ringBell(t.name);
                }
            });
        }, 30000); // Check every 30 seconds
    },

    ringBell(transitionName) {
        // Visual notification
        Core.Modal.show('🔔 Mindful Transition', `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔔</div>
                <h2>${transitionName}</h2>
                <p style="margin-top: 1rem; color: var(--text-muted);">
                    Take a moment to mindfully transition to your next activity.
                </p>
                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius);">
                    <p><strong>Try this:</strong></p>
                    <p>Take 3 deep breaths before starting your next task.</p>
                </div>
            </div>
        `, [
            { text: 'Thank you', onClick: () => Core.Modal.close() }
        ]);

        // Audio if available
        if (Core.Capabilities.check('webAudio')) {
            this.playBellSound();
        }
    },

    playBellSound() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.value = 432; // Calming frequency
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

        osc.start();
        osc.stop(ctx.currentTime + 2);
    },

    saveTransitions() {
        Core.Storage.set('mindful-transitions', this.transitions);
    },

    loadTransitions() {
        this.transitions = Core.Storage.get('mindful-transitions') || [];
        this.renderTransitions();
    }
};

// Goal Thermometer
const GoalThermometer = {
    goals: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <h2>Goal Thermometer</h2>

                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Create Goal</h3>
                    <input type="text" id="goal-name" class="input-field" placeholder="Goal name" style="margin-bottom: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="number" id="goal-target" class="input-field" placeholder="Target amount">
                        <input type="number" id="goal-current" class="input-field" placeholder="Current progress">
                    </div>
                    <button onclick="GoalThermometer.addGoal()" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Add Goal
                    </button>
                </div>

                <div id="goals-display"></div>
            </div>
        `;

        this.loadGoals();
    },

    addGoal() {
        const name = document.getElementById('goal-name').value.trim();
        const target = parseFloat(document.getElementById('goal-target').value);
        const current = parseFloat(document.getElementById('goal-current').value) || 0;

        if (!name || !target) return;

        this.goals.push({
            id: Date.now(),
            name,
            target,
            current,
            created: Date.now()
        });

        this.saveGoals();
        this.renderGoals();

        document.getElementById('goal-name').value = '';
        document.getElementById('goal-target').value = '';
        document.getElementById('goal-current').value = '';
    },

    renderGoals() {
        const display = document.getElementById('goals-display');

        if (this.goals.length === 0) {
            display.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No goals yet</p>';
        } else {
            display.innerHTML = this.goals.map(goal => {
                const percentage = Math.min((goal.current / goal.target) * 100, 100);
                const color = percentage >= 100 ? 'var(--success)' :
                             percentage >= 75 ? 'var(--warning)' :
                             percentage >= 50 ? 'var(--secondary)' : 'var(--danger)';

                return `
                    <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);
                         margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                            <h3>${goal.name}</h3>
                            <button onclick="GoalThermometer.removeGoal(${goal.id})"
                                style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
                        </div>

                        <div style="display: flex; align-items: center; gap: 2rem;">
                            <div style="width: 80px; height: 200px; position: relative; background: var(--border);
                                 border-radius: 40px; overflow: hidden;">
                                <div style="position: absolute; bottom: 0; left: 0; right: 0;
                                     height: ${percentage}%; background: ${color}; transition: height 0.5s;">
                                </div>
                                <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
                                     width: 60px; height: 60px; border-radius: 50%; background: ${color};">
                                </div>
                            </div>

                            <div style="flex: 1;">
                                <div style="font-size: 2rem; font-weight: bold; color: ${color};">
                                    ${percentage.toFixed(1)}%
                                </div>
                                <div style="color: var(--text-muted); margin: 0.5rem 0;">
                                    ${goal.current} / ${goal.target}
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <input type="number" id="update-${goal.id}" class="input-field"
                                           placeholder="Update progress" style="width: 150px;">
                                    <button onclick="GoalThermometer.updateGoal(${goal.id})"
                                            class="btn btn-secondary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    updateGoal(id) {
        const input = document.getElementById(`update-${id}`);
        const value = parseFloat(input.value);

        if (!value) return;

        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            goal.current = value;
            this.saveGoals();
            this.renderGoals();

            if (goal.current >= goal.target) {
                Core.Toast.show('🎉 Goal achieved!', 'success');
            }
        }
    },

    removeGoal(id) {
        this.goals = this.goals.filter(g => g.id !== id);
        this.saveGoals();
        this.renderGoals();
    },

    saveGoals() {
        Core.Storage.set('goal-thermometer', this.goals);
    },

    loadGoals() {
        this.goals = Core.Storage.get('goal-thermometer') || [];
        this.renderGoals();
    }
};

// Declutter Roulette
const DeclutterRoulette = {
    rooms: ['Bedroom', 'Kitchen', 'Living Room', 'Bathroom', 'Office', 'Closet', 'Garage', 'Basement'],
    areas: ['Top drawer', 'Under sink', 'Shelf', 'Corner', 'Tabletop', 'Floor area', 'Cabinet', 'Box'],
    times: ['5 minutes', '10 minutes', '15 minutes', '20 minutes', '30 minutes'],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2>Declutter Roulette</h2>
                <p style="color: var(--text-muted);">Random decluttering targets to beat decision fatigue</p>

                <div id="roulette-result" style="background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
                     color: white; padding: 3rem; border-radius: var(--radius-lg); margin: 2rem 0; min-height: 200px;
                     display: flex; align-items: center; justify-content: center;">
                    <div id="result-text" style="font-size: 1.5rem;">
                        Ready to declutter?
                    </div>
                </div>

                <button onclick="DeclutterRoulette.spin()" class="btn btn-primary"
                        style="font-size: 1.5rem; padding: 1rem 3rem;">
                    🎰 Spin for Task
                </button>

                <div id="task-timer" style="display: none; margin-top: 2rem; padding: 2rem;
                     background: var(--bg); border-radius: var(--radius-lg);">
                    <div id="timer-display" style="font-size: 3rem; font-weight: bold; color: var(--secondary);">
                        00:00
                    </div>
                    <button onclick="DeclutterRoulette.startTimer()" class="btn btn-secondary" style="margin-top: 1rem;">
                        Start Timer
                    </button>
                </div>

                <div style="margin-top: 2rem; background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>Decluttering Stats</h3>
                    <div id="stats"></div>
                </div>
            </div>
        `;

        this.loadStats();
    },

    spin() {
        const room = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        const area = this.areas[Math.floor(Math.random() * this.areas.length)];
        const time = this.times[Math.floor(Math.random() * this.times.length)];

        const result = document.getElementById('roulette-result');
        result.style.animation = 'pulse 0.5s';

        setTimeout(() => {
            document.getElementById('result-text').innerHTML = `
                <div>
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📦 ${room}</div>
                    <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">${area}</div>
                    <div style="font-size: 1rem; opacity: 0.9;">for ${time}</div>
                </div>
            `;
            result.style.animation = '';

            document.getElementById('task-timer').style.display = 'block';
            this.currentTask = { room, area, time: parseInt(time) };
        }, 500);
    },

    startTimer() {
        if (!this.currentTask) return;

        let remaining = this.currentTask.time * 60;
        const display = document.getElementById('timer-display');

        this.timerInterval = setInterval(() => {
            remaining--;
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

            if (remaining <= 0) {
                clearInterval(this.timerInterval);
                this.completeTask();
            }
        }, 1000);

        Core.Toast.show('Timer started! Get decluttering!', 'success');
    },

    completeTask() {
        Core.Toast.show('Great job decluttering!', 'success');

        // Save to stats
        const stats = Core.Storage.get('declutter-stats') || { sessions: 0, totalTime: 0 };
        stats.sessions++;
        stats.totalTime += this.currentTask.time;
        Core.Storage.set('declutter-stats', stats);

        this.loadStats();
        document.getElementById('task-timer').style.display = 'none';
    },

    loadStats() {
        const stats = Core.Storage.get('declutter-stats') || { sessions: 0, totalTime: 0 };
        document.getElementById('stats').innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--secondary);">
                        ${stats.sessions}
                    </div>
                    <div style="color: var(--text-muted);">Sessions completed</div>
                </div>
                <div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--success);">
                        ${stats.totalTime}
                    </div>
                    <div style="color: var(--text-muted);">Minutes decluttered</div>
                </div>
            </div>
        `;
    }
};

// Validation Generator
const ValidationGenerator = {
    validations: {
        struggle: [
            "It's okay to find this difficult. Hard things are hard.",
            "Your feelings are valid and make complete sense.",
            "You're doing the best you can with what you have right now.",
            "This is challenging, and you're facing it with courage.",
            "It's normal to struggle. You're human, not a machine."
        ],
        achievement: [
            "You worked hard for this. You deserve to celebrate.",
            "This accomplishment is yours. Own it fully.",
            "Your effort and dedication made this possible.",
            "You've earned this moment. Savor it.",
            "This success reflects your capabilities and persistence."
        ],
        emotion: [
            "Whatever you're feeling right now is okay to feel.",
            "Your emotions are messengers, not enemies.",
            "It's safe to feel this. You can handle these emotions.",
            "There's wisdom in what you're feeling.",
            "Your emotional experience is real and valid."
        ],
        rest: [
            "Rest is productive. You're not a machine.",
            "Taking breaks is part of sustainable success.",
            "You deserve rest without earning it first.",
            "Recharging is not giving up.",
            "Your worth isn't measured by your productivity."
        ]
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2>Validation Generator</h2>
                <p style="color: var(--text-muted);">Self-compassion when you need it most</p>

                <div style="margin: 2rem 0;">
                    <h3>What do you need validation for?</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                        <button onclick="ValidationGenerator.generate('struggle')" class="btn btn-secondary"
                                style="padding: 1.5rem;">
                            💪 I'm Struggling
                        </button>
                        <button onclick="ValidationGenerator.generate('achievement')" class="btn btn-secondary"
                                style="padding: 1.5rem;">
                            🏆 I Achieved Something
                        </button>
                        <button onclick="ValidationGenerator.generate('emotion')" class="btn btn-secondary"
                                style="padding: 1.5rem;">
                            💭 I'm Feeling Things
                        </button>
                        <button onclick="ValidationGenerator.generate('rest')" class="btn btn-secondary"
                                style="padding: 1.5rem;">
                            😴 I Need Rest
                        </button>
                    </div>
                </div>

                <div id="validation-display" style="display: none; background: linear-gradient(135deg, #667eea, #764ba2);
                     color: white; padding: 3rem; border-radius: var(--radius-lg); margin: 2rem 0;">
                    <div id="validation-text" style="font-size: 1.5rem; line-height: 1.8;"></div>
                </div>

                <button id="save-validation" onclick="ValidationGenerator.save()" style="display: none;"
                        class="btn btn-primary">
                    💜 Save This Validation
                </button>

                <div id="saved-validations" style="margin-top: 2rem;"></div>
            </div>
        `;

        this.loadSaved();
    },

    generate(type) {
        const messages = this.validations[type];
        const message = messages[Math.floor(Math.random() * messages.length)];

        const display = document.getElementById('validation-display');
        const text = document.getElementById('validation-text');

        display.style.display = 'block';
        display.style.animation = 'fadeIn 0.5s';
        text.textContent = message;

        this.currentValidation = { type, message, timestamp: Date.now() };

        document.getElementById('save-validation').style.display = 'inline-block';
    },

    save() {
        if (!this.currentValidation) return;

        const saved = Core.Storage.get('saved-validations') || [];
        saved.unshift(this.currentValidation);
        Core.Storage.set('saved-validations', saved.slice(0, 10));

        this.loadSaved();
        Core.Toast.show('Validation saved for when you need it', 'success');
    },

    loadSaved() {
        const saved = Core.Storage.get('saved-validations') || [];
        const container = document.getElementById('saved-validations');

        if (saved.length > 0) {
            container.innerHTML = `
                <h3>Your Saved Validations</h3>
                ${saved.slice(0, 3).map(v => `
                    <div style="padding: 1rem; background: var(--bg); border-radius: var(--radius);
                         margin-bottom: 0.5rem; text-align: left;">
                        <div style="color: var(--secondary); font-style: italic;">"${v.message}"</div>
                        <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem;">
                            ${new Date(v.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                `).join('')}
            `;
        }
    }
};

// Time Perception Test
const TimePerceptionTest = {
    targetTimes: [5, 10, 15, 30, 45, 60],
    currentTarget: null,
    startTime: null,
    results: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2>Time Perception Test</h2>
                <p style="color: var(--text-muted);">How accurate is your internal clock?</p>

                <div id="test-area" style="background: var(--bg); padding: 3rem; border-radius: var(--radius-lg);
                     margin: 2rem 0; min-height: 300px;">
                    <div id="test-content">
                        <h3>Ready to test your time sense?</h3>
                        <p style="margin: 2rem 0; color: var(--text-muted);">
                            You'll be asked to estimate different time intervals without looking at a clock.
                        </p>
                        <button onclick="TimePerceptionTest.startTest()" class="btn btn-primary"
                                style="font-size: 1.2rem; padding: 1rem 2rem;">
                            Start Test
                        </button>
                    </div>
                </div>

                <div id="results-area" style="display: none;"></div>
            </div>
        `;
    },

    startTest() {
        this.results = [];
        this.runNextTest();
    },

    runNextTest() {
        if (this.results.length >= 3) {
            this.showResults();
            return;
        }

        this.currentTarget = this.targetTimes[Math.floor(Math.random() * this.targetTimes.length)];

        document.getElementById('test-content').innerHTML = `
            <h3>Estimate ${this.currentTarget} seconds</h3>
            <p style="margin: 2rem 0; color: var(--text-muted);">
                Click start, then click stop when you think ${this.currentTarget} seconds have passed.
                Don't count!
            </p>
            <button onclick="TimePerceptionTest.startTimer()" class="btn btn-primary"
                    style="font-size: 1.5rem; padding: 1rem 3rem;">
                START
            </button>
        `;
    },

    startTimer() {
        this.startTime = Date.now();

        document.getElementById('test-content').innerHTML = `
            <div style="font-size: 5rem; margin: 2rem 0;">⏱️</div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">
                Click when ${this.currentTarget} seconds have passed
            </p>
            <button onclick="TimePerceptionTest.stopTimer()" class="btn btn-danger"
                    style="font-size: 1.5rem; padding: 1rem 3rem;">
                STOP
            </button>
        `;
    },

    stopTimer() {
        const elapsed = (Date.now() - this.startTime) / 1000;
        const accuracy = 100 - Math.abs(((elapsed - this.currentTarget) / this.currentTarget) * 100);

        this.results.push({
            target: this.currentTarget,
            actual: elapsed,
            accuracy: Math.max(0, accuracy)
        });

        document.getElementById('test-content').innerHTML = `
            <h3>Result</h3>
            <div style="margin: 2rem 0;">
                <div>Target: ${this.currentTarget} seconds</div>
                <div>Your estimate: ${elapsed.toFixed(1)} seconds</div>
                <div style="font-size: 2rem; margin-top: 1rem; color: ${accuracy > 90 ? 'var(--success)' :
                                                                       accuracy > 70 ? 'var(--warning)' :
                                                                       'var(--danger)'};">
                    ${accuracy.toFixed(1)}% accurate
                </div>
            </div>
            <button onclick="TimePerceptionTest.runNextTest()" class="btn btn-primary">
                ${this.results.length < 3 ? 'Next Test' : 'See Final Results'}
            </button>
        `;
    },

    showResults() {
        const avgAccuracy = this.results.reduce((sum, r) => sum + r.accuracy, 0) / this.results.length;

        document.getElementById('test-area').style.display = 'none';
        document.getElementById('results-area').style.display = 'block';
        document.getElementById('results-area').innerHTML = `
            <div style="background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
                 color: white; padding: 3rem; border-radius: var(--radius-lg);">
                <h2>Your Time Perception Score</h2>
                <div style="font-size: 4rem; margin: 1rem 0;">${avgAccuracy.toFixed(1)}%</div>
                <div style="font-size: 1.2rem;">
                    ${avgAccuracy > 90 ? 'Excellent time perception!' :
                      avgAccuracy > 70 ? 'Good time sense!' :
                      avgAccuracy > 50 ? 'Average time perception' :
                      'Your time perception needs work'}
                </div>
            </div>

            <div style="margin-top: 2rem;">
                <h3>Test Details</h3>
                ${this.results.map(r => `
                    <div style="padding: 1rem; background: var(--bg); border-radius: var(--radius);
                         margin-bottom: 0.5rem;">
                        ${r.target}s target → ${r.actual.toFixed(1)}s actual
                        (${r.accuracy.toFixed(1)}% accurate)
                    </div>
                `).join('')}
            </div>

            <button onclick="TimePerceptionTest.init()" class="btn btn-primary" style="margin-top: 2rem;">
                Try Again
            </button>
        `;

        // Save results
        const history = Core.Storage.get('time-perception-history') || [];
        history.push({
            accuracy: avgAccuracy,
            date: Date.now()
        });
        Core.Storage.set('time-perception-history', history);
    }
};

// Register all utilities
window.MindfulTransitionBell = MindfulTransitionBell;
window.GoalThermometer = GoalThermometer;
window.DeclutterRoulette = DeclutterRoulette;
window.ValidationGenerator = ValidationGenerator;
window.TimePerceptionTest = TimePerceptionTest;