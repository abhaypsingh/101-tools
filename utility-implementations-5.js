// Utility Implementations Part 5 - Productivity & Decision Tools

// Task Friction Analyzer
const TaskFrictionAnalyzer = {
    currentTask: '',
    frictions: [],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 700px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>What task feels hard?</h3>
                    <input type="text" id="task-name" class="input-field" style="width: 100%;"
                           placeholder="e.g., Starting the report, Calling the dentist...">
                    <button id="analyze-task" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        Analyze Friction Points
                    </button>
                </div>

                <div id="friction-analysis" style="display: none;">
                    <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                        <h3>Common Friction Points</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">Check all that apply:</p>

                        <div id="friction-checklist"></div>
                    </div>

                    <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                        <h3>Your Friction Profile</h3>
                        <canvas id="friction-chart" width="600" height="300"></canvas>
                    </div>

                    <div style="background: linear-gradient(135deg, var(--secondary), var(--secondary-light));
                         color: white; padding: 2rem; border-radius: var(--radius-lg);">
                        <h3>Friction Busters</h3>
                        <div id="solutions"></div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('analyze-task').addEventListener('click', () => this.analyzeTask());
    },

    analyzeTask() {
        const taskInput = document.getElementById('task-name');
        this.currentTask = taskInput.value.trim();

        if (!this.currentTask) {
            Core.Toast.show('Please enter a task', 'error');
            return;
        }

        this.showAnalysis();
    },

    showAnalysis() {
        document.getElementById('friction-analysis').style.display = 'block';

        const frictionTypes = [
            { id: 'unclear', label: 'Unclear where to start', category: 'clarity' },
            { id: 'tools', label: 'Don\'t have the right tools/resources', category: 'resources' },
            { id: 'skills', label: 'Not sure I have the skills', category: 'confidence' },
            { id: 'time', label: 'Seems like it will take forever', category: 'time' },
            { id: 'boring', label: 'It\'s boring/tedious', category: 'motivation' },
            { id: 'perfectionism', label: 'Afraid it won\'t be good enough', category: 'confidence' },
            { id: 'consequences', label: 'Worried about the outcome', category: 'fear' },
            { id: 'decisions', label: 'Too many decisions to make', category: 'clarity' },
            { id: 'interruptions', label: 'Keep getting interrupted', category: 'environment' },
            { id: 'energy', label: 'Don\'t have the energy', category: 'resources' }
        ];

        const checklist = document.getElementById('friction-checklist');
        checklist.innerHTML = frictionTypes.map(friction => `
            <label style="display: block; padding: 0.75rem; background: var(--bg); border-radius: var(--radius);
                   margin-bottom: 0.5rem; cursor: pointer;">
                <input type="checkbox" class="friction-check" data-friction="${friction.id}"
                       data-category="${friction.category}" style="margin-right: 0.5rem;">
                ${friction.label}
            </label>
        `).join('');

        document.querySelectorAll('.friction-check').forEach(check => {
            check.addEventListener('change', () => this.updateAnalysis());
        });
    },

    updateAnalysis() {
        const checked = document.querySelectorAll('.friction-check:checked');
        const categories = {};

        checked.forEach(check => {
            const category = check.dataset.category;
            categories[category] = (categories[category] || 0) + 1;
        });

        this.drawChart(categories);
        this.generateSolutions(Array.from(checked).map(c => c.dataset.friction));
    },

    drawChart(categories) {
        const canvas = document.getElementById('friction-chart');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const catArray = Object.entries(categories);
        if (catArray.length === 0) return;

        const maxValue = Math.max(...catArray.map(([_, v]) => v));
        const barWidth = width / (catArray.length * 2);
        const colors = ['#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#2ecc71'];

        catArray.forEach(([category, value], index) => {
            const x = (index * 2 + 0.5) * barWidth;
            const barHeight = (value / maxValue) * (height - 40);
            const y = height - barHeight - 20;

            // Draw bar
            ctx.fillStyle = colors[index % colors.length];
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw label
            ctx.fillStyle = 'var(--text)';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(category, x + barWidth/2, height - 5);

            // Draw value
            ctx.fillText(value, x + barWidth/2, y - 5);
        });
    },

    generateSolutions(frictions) {
        const solutions = document.getElementById('solutions');

        const solutionMap = {
            unclear: '• Break the task into 3 tiny first steps\n• Set a 5-minute timer to just explore\n• Find someone who\'s done it before',
            tools: '• List exactly what you need\n• Find alternatives or workarounds\n• Schedule time to get the tools',
            skills: '• Identify the specific skills needed\n• Find a tutorial or guide\n• Ask for help or pair with someone',
            time: '• Estimate realistically (then double it)\n• Break into 25-minute chunks\n• Set a "good enough" deadline',
            boring: '• Pair it with something enjoyable\n• Gamify with rewards\n• Do it in a new environment',
            perfectionism: '• Set a "good enough" standard\n• Time-box the effort\n• Remember: done > perfect',
            consequences: '• List worst-case scenarios\n• Plan contingencies\n• Remember: most fears don\'t materialize',
            decisions: '• Make quick decisions for reversible choices\n• Use a decision matrix for big ones\n• Set decision deadlines',
            interruptions: '• Block time on calendar\n• Find a quiet space\n• Use "do not disturb" mode',
            energy: '• Schedule for your peak energy time\n• Take breaks every 25 minutes\n• Fuel up with water and snacks'
        };

        if (frictions.length === 0) {
            solutions.innerHTML = '<p>Select friction points above to see solutions</p>';
        } else {
            solutions.innerHTML = frictions.map(f => `
                <div style="margin-bottom: 1rem;">
                    <strong style="display: block; margin-bottom: 0.5rem;">
                        ${f.charAt(0).toUpperCase() + f.slice(1)} Friction:
                    </strong>
                    <pre style="margin: 0; white-space: pre-wrap; opacity: 0.9; font-family: inherit;">
${solutionMap[f] || 'No specific solution available'}
                    </pre>
                </div>
            `).join('');
        }
    }
};

// Meeting Cost Calculator
const MeetingCostCalculator = {
    participants: [],
    duration: 60,
    isRunning: false,
    elapsed: 0,
    interval: null,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 700px; margin: 0 auto;">
                <div style="background: var(--bg); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3>Meeting Setup</h3>

                    <div style="margin-bottom: 1rem;">
                        <label class="input-label">Meeting Duration (minutes)</label>
                        <input type="number" id="meeting-duration" class="input-field" value="60" min="15" max="480">
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label class="input-label">Add Participant</label>
                        <div style="display: flex; gap: 1rem;">
                            <input type="text" id="participant-name" class="input-field" placeholder="Name" style="flex: 1;">
                            <input type="number" id="participant-salary" class="input-field" placeholder="Annual salary"
                                   style="flex: 1;">
                            <button id="add-participant" class="btn btn-primary">Add</button>
                        </div>
                    </div>

                    <div id="participants-list"></div>
                </div>

                <div style="background: linear-gradient(135deg, var(--danger), #c0392b); color: white;
                     padding: 3rem; border-radius: var(--radius-lg); text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 1rem; opacity: 0.9;">Meeting Cost</div>
                    <div id="total-cost" style="font-size: 4rem; font-weight: bold; margin: 1rem 0;">$0</div>
                    <div id="cost-per-minute" style="font-size: 1.2rem; opacity: 0.9;">$0/minute</div>
                </div>

                <div style="text-align: center;">
                    <button id="start-meeting" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem;">
                        Start Meeting Timer
                    </button>
                    <button id="stop-meeting" class="btn btn-danger" style="font-size: 1.2rem; padding: 1rem 2rem; display: none;">
                        End Meeting
                    </button>
                </div>

                <div id="running-stats" style="display: none; margin-top: 2rem; padding: 2rem;
                     background: var(--bg-secondary); border-radius: var(--radius-lg); text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold;" id="elapsed-time">00:00</div>
                    <div style="font-size: 1.5rem; color: var(--danger); margin-top: 1rem;" id="running-cost">$0</div>
                </div>

                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg); border-radius: var(--radius-lg);">
                    <h4>Make Meetings Worth It</h4>
                    <ul style="margin: 0; padding-left: 1.5rem;">
                        <li>Set clear agenda and outcomes</li>
                        <li>Start and end on time</li>
                        <li>Only invite essential participants</li>
                        <li>Consider async alternatives</li>
                        <li>Track action items</li>
                    </ul>
                </div>
            </div>
        `;

        this.attachEvents();
        this.loadParticipants();
    },

    attachEvents() {
        document.getElementById('add-participant').addEventListener('click', () => this.addParticipant());
        document.getElementById('participant-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addParticipant();
        });
        document.getElementById('meeting-duration').addEventListener('change', () => this.calculateCost());
        document.getElementById('start-meeting').addEventListener('click', () => this.startMeeting());
        document.getElementById('stop-meeting').addEventListener('click', () => this.stopMeeting());
    },

    addParticipant() {
        const name = document.getElementById('participant-name').value.trim();
        const salary = parseInt(document.getElementById('participant-salary').value);

        if (!name || !salary) {
            Core.Toast.show('Please enter name and salary', 'error');
            return;
        }

        this.participants.push({
            id: Date.now(),
            name,
            salary,
            hourlyRate: salary / 2080 // Assuming 2080 work hours per year
        });

        document.getElementById('participant-name').value = '';
        document.getElementById('participant-salary').value = '';

        this.renderParticipants();
        this.calculateCost();
        this.saveParticipants();
    },

    renderParticipants() {
        const list = document.getElementById('participants-list');

        if (this.participants.length === 0) {
            list.innerHTML = '<p style="color: var(--text-muted);">No participants added</p>';
        } else {
            list.innerHTML = `
                <h4>Participants (${this.participants.length})</h4>
                ${this.participants.map(p => `
                    <div style="padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius);
                         margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                        <div>
                            <strong>${p.name}</strong>
                            <span style="color: var(--text-muted); margin-left: 1rem;">
                                $${p.hourlyRate.toFixed(2)}/hour
                            </span>
                        </div>
                        <button onclick="MeetingCostCalculator.removeParticipant(${p.id})"
                            style="background: transparent; border: none; color: var(--danger); cursor: pointer;">×</button>
                    </div>
                `).join('')}
            `;
        }
    },

    removeParticipant(id) {
        this.participants = this.participants.filter(p => p.id !== id);
        this.renderParticipants();
        this.calculateCost();
        this.saveParticipants();
    },

    calculateCost() {
        const duration = parseInt(document.getElementById('meeting-duration').value) || 60;
        const totalHourlyRate = this.participants.reduce((sum, p) => sum + p.hourlyRate, 0);
        const totalCost = (totalHourlyRate * duration) / 60;
        const costPerMinute = totalHourlyRate / 60;

        document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;
        document.getElementById('cost-per-minute').textContent = `$${costPerMinute.toFixed(2)}/minute`;
    },

    startMeeting() {
        if (this.participants.length === 0) {
            Core.Toast.show('Add participants first', 'error');
            return;
        }

        this.isRunning = true;
        this.elapsed = 0;

        document.getElementById('start-meeting').style.display = 'none';
        document.getElementById('stop-meeting').style.display = 'inline-block';
        document.getElementById('running-stats').style.display = 'block';

        this.interval = setInterval(() => this.updateRunningCost(), 1000);
        Core.Toast.show('Meeting timer started!', 'success');
    },

    updateRunningCost() {
        this.elapsed++;

        const minutes = Math.floor(this.elapsed / 60);
        const seconds = this.elapsed % 60;
        document.getElementById('elapsed-time').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const totalHourlyRate = this.participants.reduce((sum, p) => sum + p.hourlyRate, 0);
        const runningCost = (totalHourlyRate * this.elapsed) / 3600;
        document.getElementById('running-cost').textContent = `$${runningCost.toFixed(2)}`;
    },

    stopMeeting() {
        this.isRunning = false;
        clearInterval(this.interval);

        const totalHourlyRate = this.participants.reduce((sum, p) => sum + p.hourlyRate, 0);
        const finalCost = (totalHourlyRate * this.elapsed) / 3600;

        Core.Modal.show('Meeting Ended', `
            <div style="text-align: center;">
                <div style="font-size: 1.5rem; margin-bottom: 1rem;">Total Meeting Cost</div>
                <div style="font-size: 3rem; font-weight: bold; color: var(--danger);">
                    $${finalCost.toFixed(2)}
                </div>
                <div style="margin-top: 1rem; color: var(--text-muted);">
                    Duration: ${Math.floor(this.elapsed / 60)} minutes ${this.elapsed % 60} seconds
                </div>
                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius);">
                    <strong>Was it worth it?</strong>
                    <p style="margin-top: 0.5rem;">Consider if the outcomes justified the cost.</p>
                </div>
            </div>
        `, [
            { text: 'Close', onClick: () => Core.Modal.close() }
        ]);

        document.getElementById('start-meeting').style.display = 'inline-block';
        document.getElementById('stop-meeting').style.display = 'none';
        document.getElementById('running-stats').style.display = 'none';
    },

    saveParticipants() {
        Core.Storage.set('meeting-participants', this.participants);
    },

    loadParticipants() {
        this.participants = Core.Storage.get('meeting-participants') || [];
        if (this.participants.length > 0) {
            this.renderParticipants();
            this.calculateCost();
        }
    }
};

// Life Pie Chart
const LifePieChart = {
    categories: [
        { name: 'Work', hours: 8, color: '#3498db' },
        { name: 'Sleep', hours: 8, color: '#9b59b6' },
        { name: 'Family', hours: 3, color: '#e74c3c' },
        { name: 'Personal', hours: 2, color: '#f39c12' },
        { name: 'Commute', hours: 1, color: '#95a5a6' },
        { name: 'Chores', hours: 1, color: '#1abc9c' },
        { name: 'Leisure', hours: 1, color: '#2ecc71' }
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2>How Do You Spend Your 24 Hours?</h2>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <canvas id="pie-chart" width="350" height="350"></canvas>
                    </div>

                    <div style="background: var(--bg); padding: 1.5rem; border-radius: var(--radius-lg);">
                        <h3>Adjust Your Day</h3>
                        <div id="category-sliders"></div>
                        <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius);">
                            <strong>Total: <span id="total-hours">24</span> hours</strong>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem; background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-lg);">
                    <h3>Insights</h3>
                    <div id="insights"></div>
                </div>

                <div style="margin-top: 2rem; text-align: center;">
                    <button id="save-allocation" class="btn btn-primary">Save This Allocation</button>
                    <button id="compare-ideal" class="btn btn-secondary">Compare with Ideal</button>
                </div>
            </div>
        `;

        this.renderSliders();
        this.drawPieChart();
        this.generateInsights();
        this.attachEvents();
    },

    renderSliders() {
        const container = document.getElementById('category-sliders');

        container.innerHTML = this.categories.map((cat, i) => `
            <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <label style="display: flex; align-items: center;">
                        <span style="width: 20px; height: 20px; background: ${cat.color};
                              border-radius: 4px; margin-right: 0.5rem;"></span>
                        ${cat.name}
                    </label>
                    <span id="hours-${i}">${cat.hours}h</span>
                </div>
                <input type="range" min="0" max="24" value="${cat.hours}" step="0.5"
                       data-index="${i}" class="hour-slider" style="width: 100%;">
            </div>
        `).join('');

        document.querySelectorAll('.hour-slider').forEach(slider => {
            slider.addEventListener('input', (e) => this.updateHours(e));
        });
    },

    updateHours(e) {
        const index = parseInt(e.target.dataset.index);
        const value = parseFloat(e.target.value);

        this.categories[index].hours = value;
        document.getElementById(`hours-${index}`).textContent = `${value}h`;

        const total = this.categories.reduce((sum, cat) => sum + cat.hours, 0);
        document.getElementById('total-hours').textContent = total.toFixed(1);

        if (Math.abs(total - 24) > 0.1) {
            document.getElementById('total-hours').style.color = 'var(--danger)';
        } else {
            document.getElementById('total-hours').style.color = 'var(--success)';
        }

        this.drawPieChart();
        this.generateInsights();
    },

    drawPieChart() {
        const canvas = document.getElementById('pie-chart');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 140;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const total = this.categories.reduce((sum, cat) => sum + cat.hours, 0);
        let currentAngle = -Math.PI / 2; // Start at top

        this.categories.forEach(cat => {
            if (cat.hours === 0) return;

            const sliceAngle = (cat.hours / total) * Math.PI * 2;

            // Draw slice
            ctx.fillStyle = cat.color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            // Draw label if slice is big enough
            if (cat.hours > 1) {
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

                ctx.fillStyle = 'white';
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${cat.hours}h`, labelX, labelY);
            }

            currentAngle += sliceAngle;
        });

        // Draw center circle
        ctx.fillStyle = 'var(--bg)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
        ctx.fill();

        // Draw center text
        ctx.fillStyle = 'var(--text)';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('24h', centerX, centerY);
    },

    generateInsights() {
        const insights = document.getElementById('insights');
        const work = this.categories.find(c => c.name === 'Work').hours;
        const sleep = this.categories.find(c => c.name === 'Sleep').hours;
        const personal = this.categories.find(c => c.name === 'Personal').hours;
        const family = this.categories.find(c => c.name === 'Family').hours;

        const messages = [];

        if (sleep < 7) {
            messages.push('⚠️ Less than 7 hours of sleep may affect your health and productivity');
        } else if (sleep > 9) {
            messages.push('💤 You\'re allocating a lot of time to sleep - make sure it\'s quality rest');
        }

        if (work > 10) {
            messages.push('⏰ Long work hours - consider work-life balance');
        }

        if (personal < 1) {
            messages.push('🚨 Very little personal time - self-care is important');
        }

        if (family < 2 && family > 0) {
            messages.push('👨‍👩‍👧 Consider if family time allocation meets your values');
        }

        const totalProductiveHours = work + this.categories.find(c => c.name === 'Chores').hours;
        if (totalProductiveHours > 12) {
            messages.push('💪 High productivity allocation - ensure sustainable pace');
        }

        if (messages.length === 0) {
            messages.push('✅ Your time allocation looks balanced!');
        }

        insights.innerHTML = messages.map(msg => `
            <div style="padding: 0.75rem; background: var(--bg); border-radius: var(--radius); margin-bottom: 0.5rem;">
                ${msg}
            </div>
        `).join('');
    },

    attachEvents() {
        document.getElementById('save-allocation').addEventListener('click', () => {
            Core.Storage.set('life-pie-allocation', this.categories);
            Core.Toast.show('Allocation saved!', 'success');
        });

        document.getElementById('compare-ideal').addEventListener('click', () => {
            const ideal = [
                { name: 'Work', hours: 8 },
                { name: 'Sleep', hours: 8 },
                { name: 'Family', hours: 4 },
                { name: 'Personal', hours: 2 },
                { name: 'Commute', hours: 0.5 },
                { name: 'Chores', hours: 1 },
                { name: 'Leisure', hours: 0.5 }
            ];

            const comparison = this.categories.map((cat, i) => {
                const idealHours = ideal.find(c => c.name === cat.name)?.hours || 0;
                const diff = cat.hours - idealHours;
                return { name: cat.name, current: cat.hours, ideal: idealHours, diff };
            });

            Core.Modal.show('Current vs Ideal', `
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border);">
                            <th style="text-align: left; padding: 0.5rem;">Category</th>
                            <th style="text-align: center; padding: 0.5rem;">Current</th>
                            <th style="text-align: center; padding: 0.5rem;">Ideal</th>
                            <th style="text-align: center; padding: 0.5rem;">Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${comparison.map(item => `
                            <tr>
                                <td style="padding: 0.5rem;">${item.name}</td>
                                <td style="text-align: center; padding: 0.5rem;">${item.current}h</td>
                                <td style="text-align: center; padding: 0.5rem;">${item.ideal}h</td>
                                <td style="text-align: center; padding: 0.5rem;
                                    color: ${item.diff > 0 ? 'var(--danger)' : item.diff < 0 ? 'var(--success)' : 'var(--text)'};">
                                    ${item.diff > 0 ? '+' : ''}${item.diff}h
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `, [
                { text: 'Apply Ideal', onClick: () => {
                    ideal.forEach((item, i) => {
                        if (this.categories[i]) {
                            this.categories[i].hours = item.hours;
                        }
                    });
                    this.renderSliders();
                    this.drawPieChart();
                    this.generateInsights();
                    Core.Modal.close();
                }},
                { text: 'Close', onClick: () => Core.Modal.close() }
            ]);
        });
    }
};

// Export utilities
window.TaskFrictionAnalyzer = TaskFrictionAnalyzer;
window.MeetingCostCalculator = MeetingCostCalculator;
window.LifePieChart = LifePieChart;