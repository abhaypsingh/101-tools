// Productivity Tools - Full Implementations

window.DistractionLogger = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Distraction Logger</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="display:flex;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;">
                        <select id="dl-cat" class="input-field" style="flex:1;min-width:150px;">
                            <option value="social-media">Social Media</option>
                            <option value="phone">Phone</option>
                            <option value="people">People</option>
                            <option value="thoughts">Wandering Thoughts</option>
                            <option value="email">Email/Messages</option>
                            <option value="other">Other</option>
                        </select>
                        <input type="text" id="dl-note" class="input-field" placeholder="Quick note..." style="flex:2;min-width:200px;">
                        <button id="dl-log" class="btn btn-primary">Log</button>
                    </div>
                    <div id="dl-streak" style="text-align:center;padding:1rem;background:var(--bg-secondary);border-radius:var(--radius);">
                        <div style="font-size:.85rem;color:var(--text-muted);">Distraction-free streak</div>
                        <div id="dl-streak-val" style="font-size:2rem;font-weight:bold;">0 min</div>
                        <button id="dl-reset" class="btn btn-secondary" style="margin-top:.5rem;">Reset Streak</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <h3>By Category</h3>
                        <canvas id="dl-chart" width="300" height="200"></canvas>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <h3>Recent</h3>
                        <div id="dl-recent" style="max-height:200px;overflow-y:auto;"></div>
                    </div>
                </div>
                <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius);margin-top:1.5rem;">
                    <strong>Today:</strong> <span id="dl-today">0</span> distractions
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
        this.startStreak();
    },
    attachEvents() {
        document.getElementById('dl-log').addEventListener('click', () => this.log());
        document.getElementById('dl-note').addEventListener('keypress', e => { if (e.key === 'Enter') this.log(); });
        document.getElementById('dl-reset').addEventListener('click', () => { this.streakStart = Date.now(); this.saveData(); this.updateStreak(); });
    },
    log() {
        const cat = document.getElementById('dl-cat').value;
        const note = document.getElementById('dl-note').value.trim();
        this.entries.push({ cat, note, time: Date.now() });
        this.streakStart = Date.now();
        document.getElementById('dl-note').value = '';
        this.saveData();
        this.render();
        Core.Toast.show('Distraction logged', 'info');
    },
    render() {
        const today = new Date().toDateString();
        const todayEntries = this.entries.filter(e => new Date(e.time).toDateString() === today);
        document.getElementById('dl-today').textContent = todayEntries.length;
        const cats = {};
        todayEntries.forEach(e => { cats[e.cat] = (cats[e.cat] || 0) + 1; });
        this.drawChart(cats);
        const recent = document.getElementById('dl-recent');
        recent.innerHTML = this.entries.slice(-10).reverse().map(e => `
            <div style="padding:.5rem;border-bottom:1px solid var(--border);font-size:.85rem;">
                <strong>${e.cat}</strong> ${e.note ? '- ' + e.note : ''}<br>
                <span style="color:var(--text-muted);">${new Date(e.time).toLocaleTimeString()}</span>
            </div>`).join('') || '<p style="color:var(--text-muted);">No distractions logged</p>';
    },
    drawChart(cats) {
        const canvas = document.getElementById('dl-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 300, 200);
        const labels = Object.keys(cats);
        if (!labels.length) { ctx.fillStyle = 'gray'; ctx.fillText('No data yet', 100, 100); return; }
        const max = Math.max(...Object.values(cats), 1);
        const barW = Math.min(40, 280 / labels.length - 10);
        const colors = ['#e74c3c','#3498db','#f39c12','#9b59b6','#2ecc71','#e67e22'];
        labels.forEach((l, i) => {
            const h = (cats[l] / max) * 150;
            const x = 10 + i * (barW + 10);
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(x, 180 - h, barW, h);
            ctx.fillStyle = 'var(--text)';
            ctx.font = '10px sans-serif';
            ctx.fillText(l.slice(0, 8), x, 195);
            ctx.fillText(cats[l], x + barW / 2 - 4, 175 - h);
        });
    },
    startStreak() {
        this.updateStreak();
        this._si = setInterval(() => this.updateStreak(), 10000);
    },
    updateStreak() {
        const el = document.getElementById('dl-streak-val');
        if (!el) { clearInterval(this._si); return; }
        const mins = Math.floor((Date.now() - this.streakStart) / 60000);
        el.textContent = mins < 60 ? `${mins} min` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
    },
    saveData() { Core.Storage.set('distraction-logger', { entries: this.entries, streakStart: this.streakStart }); },
    loadData() { const d = Core.Storage.get('distraction-logger'); this.entries = d?.entries || []; this.streakStart = d?.streakStart || Date.now(); }
};

window.TaskEstimatorTrainer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Task Estimator Trainer</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>New Task</h3>
                    <input type="text" id="tet-name" class="input-field" placeholder="Task name" style="width:100%;margin-bottom:.75rem;">
                    <div style="display:flex;gap:1rem;">
                        <input type="number" id="tet-est" class="input-field" placeholder="Estimated minutes" style="flex:1;" min="1">
                        <button id="tet-start" class="btn btn-primary">Start Task</button>
                    </div>
                </div>
                <div id="tet-active" style="display:none;background:var(--warning);color:#333;padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;text-align:center;">
                    <h3 id="tet-active-name"></h3>
                    <div style="font-size:.9rem;">Estimated: <span id="tet-active-est"></span> min</div>
                    <div style="font-size:2rem;font-weight:bold;margin:1rem 0;" id="tet-elapsed">0:00</div>
                    <button id="tet-done" class="btn btn-primary" style="background:#333;color:white;">Mark Complete</button>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:center;">
                        <div style="color:var(--text-muted);font-size:.85rem;">Accuracy Score</div>
                        <div id="tet-accuracy" style="font-size:2.5rem;font-weight:bold;">-</div>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:center;">
                        <div style="color:var(--text-muted);font-size:.85rem;">Tendency</div>
                        <div id="tet-tendency" style="font-size:1.2rem;font-weight:bold;">-</div>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>History</h3>
                    <div id="tet-history" style="max-height:250px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('tet-start').addEventListener('click', () => this.startTask());
        document.getElementById('tet-done').addEventListener('click', () => this.completeTask());
    },
    startTask() {
        const name = document.getElementById('tet-name').value.trim();
        const est = parseInt(document.getElementById('tet-est').value);
        if (!name || !est) { Core.Toast.show('Enter task name and estimate', 'warning'); return; }
        this.active = { name, est, start: Date.now() };
        document.getElementById('tet-active').style.display = 'block';
        document.getElementById('tet-active-name').textContent = name;
        document.getElementById('tet-active-est').textContent = est;
        document.getElementById('tet-name').value = '';
        document.getElementById('tet-est').value = '';
        this._ti = setInterval(() => {
            const el = document.getElementById('tet-elapsed');
            if (!el) { clearInterval(this._ti); return; }
            const s = Math.floor((Date.now() - this.active.start) / 1000);
            el.textContent = `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
        }, 1000);
    },
    completeTask() {
        clearInterval(this._ti);
        const actual = Math.round((Date.now() - this.active.start) / 60000);
        const accuracy = Math.round((1 - Math.abs(actual - this.active.est) / Math.max(actual, this.active.est)) * 100);
        this.history.push({ name: this.active.name, est: this.active.est, actual: Math.max(1, actual), accuracy, date: Date.now() });
        this.active = null;
        document.getElementById('tet-active').style.display = 'none';
        this.saveData();
        this.render();
        Core.Toast.show(`Task complete! Accuracy: ${accuracy}%`, accuracy > 70 ? 'success' : 'info');
    },
    render() {
        if (this.history.length > 0) {
            const avg = Math.round(this.history.reduce((a, h) => a + h.accuracy, 0) / this.history.length);
            document.getElementById('tet-accuracy').textContent = avg + '%';
            const overCount = this.history.filter(h => h.est > h.actual).length;
            const underCount = this.history.filter(h => h.est < h.actual).length;
            document.getElementById('tet-tendency').textContent = overCount > underCount ? 'Over-estimates' : underCount > overCount ? 'Under-estimates' : 'Well-balanced';
        }
        document.getElementById('tet-history').innerHTML = this.history.slice().reverse().map(h => `
            <div style="padding:.75rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
                <div><strong>${h.name}</strong><br><span style="color:var(--text-muted);font-size:.8rem;">Est: ${h.est}m / Actual: ${h.actual}m</span></div>
                <div style="font-weight:bold;color:${h.accuracy > 70 ? 'var(--success)' : h.accuracy > 40 ? 'var(--warning)' : 'var(--danger)'};">${h.accuracy}%</div>
            </div>`).join('') || '<p style="color:var(--text-muted);">No tasks completed yet</p>';
    },
    saveData() { Core.Storage.set('task-estimator', { history: this.history }); },
    loadData() { const d = Core.Storage.get('task-estimator'); this.history = d?.history || []; this.active = null; }
};

window.CognitiveLoadMeter = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Cognitive Load Meter</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);text-align:center;margin-bottom:1.5rem;">
                    <canvas id="clm-gauge" width="300" height="180"></canvas>
                    <div style="font-size:2rem;font-weight:bold;margin:.5rem 0;" id="clm-val">0</div>
                    <div style="color:var(--text-muted);" id="clm-label">Low Load</div>
                    <input type="range" id="clm-slider" min="0" max="100" value="0" style="width:80%;margin:1rem 0;">
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Quick Adjustments</h3>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-top:1rem;">
                        <button class="btn btn-secondary clm-adj" data-val="10">+10 New Task</button>
                        <button class="btn btn-secondary clm-adj" data-val="15">+15 Meeting</button>
                        <button class="btn btn-secondary clm-adj" data-val="20">+20 Deadline</button>
                        <button class="btn btn-secondary clm-adj" data-val="-10">-10 Break</button>
                        <button class="btn btn-secondary clm-adj" data-val="-15">-15 Task Done</button>
                        <button class="btn btn-secondary clm-adj" data-val="-20">-20 Delegated</button>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Today's Load History</h3>
                    <canvas id="clm-history" width="500" height="150"></canvas>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.drawGauge();
        this.drawHistory();
    },
    attachEvents() {
        document.getElementById('clm-slider').addEventListener('input', e => { this.load = parseInt(e.target.value); this.update(); });
        document.querySelectorAll('.clm-adj').forEach(b => b.addEventListener('click', e => {
            this.load = Math.max(0, Math.min(100, this.load + parseInt(e.target.dataset.val)));
            document.getElementById('clm-slider').value = this.load;
            this.update();
        }));
    },
    update() {
        this.history.push({ val: this.load, time: Date.now() });
        this.saveData();
        this.drawGauge();
        this.drawHistory();
        document.getElementById('clm-val').textContent = this.load;
        const label = this.load < 30 ? 'Low Load' : this.load < 60 ? 'Moderate Load' : this.load < 80 ? 'High Load' : 'Overloaded!';
        document.getElementById('clm-label').textContent = label;
        if (this.load >= 80) Core.Toast.show('Cognitive load is very high! Consider taking a break.', 'warning');
    },
    drawGauge() {
        const c = document.getElementById('clm-gauge'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 300, 180);
        const cx = 150, cy = 160, r = 120;
        // Background arc
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.lineWidth = 25;
        ctx.strokeStyle = '#eee'; ctx.stroke();
        // Colored arc
        const angle = Math.PI + (this.load / 100) * Math.PI;
        const grad = ctx.createLinearGradient(30, 0, 270, 0);
        grad.addColorStop(0, '#2ecc71'); grad.addColorStop(0.5, '#f39c12'); grad.addColorStop(1, '#e74c3c');
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, angle); ctx.lineWidth = 25;
        ctx.strokeStyle = grad; ctx.stroke();
    },
    drawHistory() {
        const c = document.getElementById('clm-history'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 500, 150);
        const today = new Date().toDateString();
        const pts = this.history.filter(h => new Date(h.time).toDateString() === today);
        if (pts.length < 2) { ctx.fillStyle = 'gray'; ctx.fillText('More data needed', 200, 75); return; }
        ctx.strokeStyle = 'var(--secondary)'; ctx.lineWidth = 2; ctx.beginPath();
        pts.forEach((p, i) => {
            const x = (i / (pts.length - 1)) * 480 + 10;
            const y = 140 - (p.val / 100) * 130;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
    },
    saveData() { Core.Storage.set('cognitive-load', { load: this.load, history: this.history.slice(-200) }); },
    loadData() { const d = Core.Storage.get('cognitive-load'); this.load = d?.load || 0; this.history = d?.history || []; }
};

window.TaskMultiplier = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Task Multiplier</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Add Tasks</h3>
                    <div style="display:flex;gap:.75rem;">
                        <input type="text" id="tm-input" class="input-field" placeholder="Enter a task..." style="flex:1;">
                        <button id="tm-add" class="btn btn-primary">Add</button>
                    </div>
                    <div id="tm-tasks" style="margin-top:1rem;"></div>
                </div>
                <button id="tm-find" class="btn btn-primary" style="width:100%;margin-bottom:1.5rem;">Find Synergies</button>
                <div id="tm-synergies" style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);display:none;">
                    <h3>Suggested Combinations</h3>
                    <div id="tm-combos"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.renderTasks();
    },
    KEYWORDS: {
        email: ['email', 'inbox', 'reply', 'message', 'send'],
        errands: ['shop', 'buy', 'pick up', 'store', 'grocery', 'errand', 'drop off'],
        cleaning: ['clean', 'organize', 'tidy', 'declutter', 'sort', 'laundry', 'dishes'],
        exercise: ['walk', 'run', 'exercise', 'gym', 'stretch', 'yoga'],
        calls: ['call', 'phone', 'ring', 'contact', 'reach out'],
        writing: ['write', 'draft', 'document', 'blog', 'article', 'report'],
        reading: ['read', 'review', 'study', 'learn', 'book'],
        cooking: ['cook', 'meal', 'prep', 'food', 'recipe', 'bake']
    },
    attachEvents() {
        document.getElementById('tm-add').addEventListener('click', () => this.addTask());
        document.getElementById('tm-input').addEventListener('keypress', e => { if (e.key === 'Enter') this.addTask(); });
        document.getElementById('tm-find').addEventListener('click', () => this.findSynergies());
    },
    addTask() {
        const input = document.getElementById('tm-input');
        const text = input.value.trim();
        if (!text) return;
        this.tasks.push({ text, id: Date.now() });
        input.value = '';
        this.saveData();
        this.renderTasks();
    },
    renderTasks() {
        document.getElementById('tm-tasks').innerHTML = this.tasks.map(t => `
            <div style="padding:.5rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:.5rem;display:flex;justify-content:space-between;align-items:center;">
                <span>${t.text}</span>
                <button onclick="TaskMultiplier.removeTask(${t.id})" style="background:none;border:none;cursor:pointer;color:var(--danger);">x</button>
            </div>`).join('') || '<p style="color:var(--text-muted);">Add tasks to find synergies</p>';
    },
    removeTask(id) { this.tasks = this.tasks.filter(t => t.id !== id); this.saveData(); this.renderTasks(); },
    findSynergies() {
        if (this.tasks.length < 2) { Core.Toast.show('Add at least 2 tasks', 'warning'); return; }
        const combos = [];
        for (let i = 0; i < this.tasks.length; i++) {
            for (let j = i + 1; j < this.tasks.length; j++) {
                const cat1 = this.categorize(this.tasks[i].text);
                const cat2 = this.categorize(this.tasks[j].text);
                if (cat1 && cat1 === cat2) combos.push({ a: this.tasks[i].text, b: this.tasks[j].text, reason: `Both are ${cat1}-related — batch them together!` });
            }
        }
        if (this.tasks.length >= 3) {
            const errands = this.tasks.filter(t => this.categorize(t.text) === 'errands');
            if (errands.length >= 2) combos.push({ a: errands.map(e => e.text).join(' + '), b: '', reason: 'Combine into one trip!' });
        }
        if (combos.length === 0) combos.push({ a: this.tasks[0].text, b: this.tasks[1].text, reason: 'Try doing these back-to-back to maintain momentum.' });
        const el = document.getElementById('tm-synergies');
        el.style.display = 'block';
        document.getElementById('tm-combos').innerHTML = combos.map(c => `
            <div style="padding:1rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:1rem;border-left:4px solid var(--secondary);">
                <strong>${c.a}</strong>${c.b ? ` + <strong>${c.b}</strong>` : ''}<br>
                <span style="color:var(--text-muted);font-size:.85rem;">${c.reason}</span>
            </div>`).join('');
    },
    categorize(text) {
        const lower = text.toLowerCase();
        for (const [cat, words] of Object.entries(this.KEYWORDS)) {
            if (words.some(w => lower.includes(w))) return cat;
        }
        return null;
    },
    saveData() { Core.Storage.set('task-multiplier', { tasks: this.tasks }); },
    loadData() { const d = Core.Storage.get('task-multiplier'); this.tasks = d?.tasks || []; }
};

window.DecisionFatigueMeter = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Decision Fatigue Meter</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);text-align:center;margin-bottom:1.5rem;">
                    <div style="font-size:.9rem;color:var(--text-muted);">Decision Capacity Remaining</div>
                    <div id="dfm-capacity" style="font-size:4rem;font-weight:bold;">100</div>
                    <div style="width:100%;height:20px;background:var(--bg-secondary);border-radius:10px;overflow:hidden;margin:1rem 0;">
                        <div id="dfm-bar" style="height:100%;width:100%;background:var(--success);transition:width .5s;border-radius:10px;"></div>
                    </div>
                    <div id="dfm-status" style="font-weight:bold;color:var(--success);">Full Capacity</div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Log a Decision</h3>
                    <input type="text" id="dfm-desc" class="input-field" placeholder="What did you decide?" style="width:100%;margin-bottom:.75rem;">
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;">
                        <button class="btn btn-secondary dfm-log" data-cost="3" data-cat="trivial">Trivial (-3)</button>
                        <button class="btn btn-secondary dfm-log" data-cost="8" data-cat="moderate">Moderate (-8)</button>
                        <button class="btn btn-secondary dfm-log" data-cost="15" data-cat="major">Major (-15)</button>
                    </div>
                </div>
                <div id="dfm-tips" style="display:none;background:var(--warning);color:#333;padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Low Capacity Tips</h3>
                    <ul style="margin:0;padding-left:1.5rem;">
                        <li>Defer non-urgent decisions to tomorrow</li>
                        <li>Use defaults or presets where possible</li>
                        <li>Take a 15-minute break</li>
                        <li>Simplify choices — flip a coin for trivial ones</li>
                    </ul>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Today's Decisions (<span id="dfm-count">0</span>)</h3>
                    <div id="dfm-list" style="max-height:200px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.querySelectorAll('.dfm-log').forEach(b => b.addEventListener('click', e => {
            this.logDecision(parseInt(e.target.dataset.cost), e.target.dataset.cat);
        }));
    },
    logDecision(cost, cat) {
        const desc = document.getElementById('dfm-desc').value.trim() || `${cat} decision`;
        this.capacity = Math.max(0, this.capacity - cost);
        this.decisions.push({ desc, cost, cat, time: Date.now() });
        document.getElementById('dfm-desc').value = '';
        this.saveData();
        this.render();
        Core.Toast.show(`Decision logged (-${cost})`, 'info');
    },
    render() {
        const today = new Date().toDateString();
        const todayD = this.decisions.filter(d => new Date(d.time).toDateString() === today);
        document.getElementById('dfm-capacity').textContent = this.capacity;
        document.getElementById('dfm-bar').style.width = this.capacity + '%';
        const bar = document.getElementById('dfm-bar');
        bar.style.background = this.capacity > 60 ? 'var(--success)' : this.capacity > 30 ? 'var(--warning)' : 'var(--danger)';
        const status = this.capacity > 60 ? 'Full Capacity' : this.capacity > 30 ? 'Getting Tired' : 'Decision Fatigue!';
        document.getElementById('dfm-status').textContent = status;
        document.getElementById('dfm-status').style.color = this.capacity > 60 ? 'var(--success)' : this.capacity > 30 ? 'var(--warning)' : 'var(--danger)';
        document.getElementById('dfm-tips').style.display = this.capacity <= 30 ? 'block' : 'none';
        document.getElementById('dfm-count').textContent = todayD.length;
        document.getElementById('dfm-list').innerHTML = todayD.reverse().map(d => `
            <div style="padding:.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
                <span>${d.desc}</span><span style="color:var(--danger);">-${d.cost}</span>
            </div>`).join('') || '<p style="color:var(--text-muted);">No decisions yet today</p>';
    },
    saveData() {
        const today = new Date().toDateString();
        const lastDate = Core.Storage.get('dfm-date');
        if (lastDate !== today) { this.capacity = 100; this.decisions = this.decisions.filter(d => new Date(d.time).toDateString() === today); Core.Storage.set('dfm-date', today); }
        Core.Storage.set('decision-fatigue', { capacity: this.capacity, decisions: this.decisions });
    },
    loadData() {
        const today = new Date().toDateString();
        const lastDate = Core.Storage.get('dfm-date');
        const d = Core.Storage.get('decision-fatigue');
        if (lastDate !== today) { this.capacity = 100; this.decisions = []; Core.Storage.set('dfm-date', today); }
        else { this.capacity = d?.capacity ?? 100; this.decisions = d?.decisions || []; }
    }
};

window.TaskDecomposer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Task Decomposer</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="display:flex;gap:.75rem;">
                        <input type="text" id="td-main" class="input-field" placeholder="Enter a big task to break down..." style="flex:1;">
                        <button id="td-add" class="btn btn-primary">Break Down</button>
                    </div>
                </div>
                <div id="td-trees"></div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('td-add').addEventListener('click', () => this.addTree());
        document.getElementById('td-main').addEventListener('keypress', e => { if (e.key === 'Enter') this.addTree(); });
    },
    addTree() {
        const name = document.getElementById('td-main').value.trim();
        if (!name) return;
        this.trees.push({ id: Date.now(), name, done: false, children: [] });
        document.getElementById('td-main').value = '';
        this.saveData();
        this.render();
    },
    addChild(treeId, parentPath) {
        const name = prompt('Subtask name:');
        if (!name) return;
        const node = this.findNode(treeId, parentPath);
        if (node) { node.children.push({ id: Date.now(), name, done: false, children: [] }); this.saveData(); this.render(); }
    },
    toggleDone(treeId, path) {
        const node = this.findNode(treeId, path);
        if (node) { node.done = !node.done; this.saveData(); this.render(); }
    },
    removeTree(id) { this.trees = this.trees.filter(t => t.id !== id); this.saveData(); this.render(); },
    findNode(treeId, path) {
        const tree = this.trees.find(t => t.id === treeId);
        if (!tree) return null;
        if (!path || path.length === 0) return tree;
        let node = tree;
        for (const idx of path) { node = node.children[idx]; if (!node) return null; }
        return node;
    },
    getProgress(node) {
        if (!node.children.length) return node.done ? 100 : 0;
        const childProgress = node.children.map(c => this.getProgress(c));
        return Math.round(childProgress.reduce((a, b) => a + b, 0) / childProgress.length);
    },
    renderNode(treeId, node, path = [], depth = 0) {
        const progress = this.getProgress(node);
        const pathStr = JSON.stringify(path);
        return `
            <div style="margin-left:${depth * 24}px;padding:.5rem;border-left:${depth ? '2px solid var(--border)' : 'none'};margin-bottom:.25rem;">
                <div style="display:flex;align-items:center;gap:.5rem;">
                    <input type="checkbox" ${node.done ? 'checked' : ''} onchange="TaskDecomposer.toggleDone(${treeId},${pathStr})">
                    <span style="${node.done ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${node.name}</span>
                    ${node.children.length ? `<span style="font-size:.75rem;color:var(--text-muted);">(${progress}%)</span>` : ''}
                    <button onclick="TaskDecomposer.addChild(${treeId},${pathStr})" style="background:none;border:none;cursor:pointer;color:var(--secondary);font-size:.8rem;">+ sub</button>
                </div>
                ${node.children.map((c, i) => this.renderNode(treeId, c, [...path, i], depth + 1)).join('')}
            </div>`;
    },
    render() {
        document.getElementById('td-trees').innerHTML = this.trees.map(tree => {
            const progress = this.getProgress(tree);
            return `
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <h3 style="margin:0;">${tree.name}</h3>
                        <button onclick="TaskDecomposer.removeTree(${tree.id})" style="background:none;border:none;cursor:pointer;color:var(--danger);">Delete</button>
                    </div>
                    <div style="width:100%;height:8px;background:var(--bg-secondary);border-radius:4px;margin-bottom:1rem;">
                        <div style="width:${progress}%;height:100%;background:var(--success);border-radius:4px;transition:width .3s;"></div>
                    </div>
                    ${this.renderNode(tree.id, tree)}
                </div>`;
        }).join('') || '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Enter a big task above to start breaking it down</p>';
    },
    saveData() { Core.Storage.set('task-decomposer', { trees: this.trees }); },
    loadData() { const d = Core.Storage.get('task-decomposer'); this.trees = d?.trees || []; }
};

window.ContextSwitcher = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Context Switcher</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="display:flex;gap:.75rem;">
                        <input type="text" id="cs-context" class="input-field" placeholder="What are you working on now?" style="flex:1;">
                        <button id="cs-switch" class="btn btn-primary">Switch To</button>
                    </div>
                    <div id="cs-current" style="margin-top:1rem;padding:1rem;background:var(--secondary);color:white;border-radius:var(--radius);display:none;">
                        <div style="font-size:.8rem;">Currently working on:</div>
                        <div id="cs-current-name" style="font-size:1.3rem;font-weight:bold;"></div>
                        <div id="cs-current-time" style="font-size:.85rem;margin-top:.25rem;"></div>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:center;">
                        <div style="color:var(--text-muted);font-size:.85rem;">Switches Today</div>
                        <div id="cs-count" style="font-size:2.5rem;font-weight:bold;">0</div>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:center;">
                        <div style="color:var(--text-muted);font-size:.85rem;">Avg Focus Time</div>
                        <div id="cs-avg" style="font-size:2.5rem;font-weight:bold;">-</div>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Today's Timeline</h3>
                    <div id="cs-timeline" style="margin-top:1rem;"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
        this._ti = setInterval(() => this.updateCurrentTime(), 10000);
    },
    attachEvents() {
        document.getElementById('cs-switch').addEventListener('click', () => this.switchContext());
        document.getElementById('cs-context').addEventListener('keypress', e => { if (e.key === 'Enter') this.switchContext(); });
    },
    switchContext() {
        const name = document.getElementById('cs-context').value.trim();
        if (!name) return;
        if (this.current) { this.current.end = Date.now(); this.sessions.push(this.current); }
        this.current = { name, start: Date.now(), end: null };
        document.getElementById('cs-context').value = '';
        this.saveData();
        this.render();
        const todaySwitches = this.getTodaySessions().length;
        if (todaySwitches > 10) Core.Toast.show('Lots of context switches today — try to focus longer!', 'warning');
        else Core.Toast.show(`Switched to: ${name}`, 'info');
    },
    getTodaySessions() { const today = new Date().toDateString(); return this.sessions.filter(s => new Date(s.start).toDateString() === today); },
    updateCurrentTime() {
        if (!this.current) return;
        const el = document.getElementById('cs-current-time');
        if (!el) { clearInterval(this._ti); return; }
        const mins = Math.floor((Date.now() - this.current.start) / 60000);
        el.textContent = `${mins} min so far`;
    },
    render() {
        if (this.current) {
            document.getElementById('cs-current').style.display = 'block';
            document.getElementById('cs-current-name').textContent = this.current.name;
            this.updateCurrentTime();
        }
        const today = this.getTodaySessions();
        document.getElementById('cs-count').textContent = today.length;
        if (today.length > 0) {
            const durations = today.map(s => (s.end - s.start) / 60000);
            const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
            document.getElementById('cs-avg').textContent = avg + 'm';
        }
        document.getElementById('cs-timeline').innerHTML = [...today].reverse().map(s => {
            const dur = Math.round((s.end - s.start) / 60000);
            return `<div style="padding:.5rem;border-left:3px solid var(--secondary);margin-bottom:.5rem;padding-left:1rem;">
                <strong>${s.name}</strong> <span style="color:var(--text-muted);">${dur} min</span>
                <div style="font-size:.75rem;color:var(--text-muted);">${new Date(s.start).toLocaleTimeString()} - ${new Date(s.end).toLocaleTimeString()}</div>
            </div>`;
        }).join('') || '<p style="color:var(--text-muted);">No context switches recorded today</p>';
    },
    saveData() { Core.Storage.set('context-switcher', { sessions: this.sessions.slice(-100), current: this.current }); },
    loadData() { const d = Core.Storage.get('context-switcher'); this.sessions = d?.sessions || []; this.current = d?.current || null; }
};

window.TaskAgingTracker = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Task Aging Tracker</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="display:flex;gap:.75rem;">
                        <input type="text" id="tat-input" class="input-field" placeholder="Add a task..." style="flex:1;">
                        <button id="tat-add" class="btn btn-primary">Add</button>
                    </div>
                </div>
                <div id="tat-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-bottom:1.5rem;">
                    <div style="background:#2ecc71;color:white;padding:1rem;border-radius:var(--radius);text-align:center;">
                        <div style="font-size:1.5rem;font-weight:bold;" id="tat-fresh">0</div><div style="font-size:.75rem;">&lt;3 days</div>
                    </div>
                    <div style="background:#f39c12;color:white;padding:1rem;border-radius:var(--radius);text-align:center;">
                        <div style="font-size:1.5rem;font-weight:bold;" id="tat-aging">0</div><div style="font-size:.75rem;">3-7 days</div>
                    </div>
                    <div style="background:#e67e22;color:white;padding:1rem;border-radius:var(--radius);text-align:center;">
                        <div style="font-size:1.5rem;font-weight:bold;" id="tat-old">0</div><div style="font-size:.75rem;">7-14 days</div>
                    </div>
                    <div style="background:#e74c3c;color:white;padding:1rem;border-radius:var(--radius);text-align:center;">
                        <div style="font-size:1.5rem;font-weight:bold;" id="tat-stale">0</div><div style="font-size:.75rem;">&gt;14 days</div>
                    </div>
                </div>
                <div id="tat-list" style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);"></div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('tat-add').addEventListener('click', () => this.addTask());
        document.getElementById('tat-input').addEventListener('keypress', e => { if (e.key === 'Enter') this.addTask(); });
    },
    addTask() {
        const text = document.getElementById('tat-input').value.trim();
        if (!text) return;
        this.tasks.push({ text, created: Date.now(), id: Date.now() });
        document.getElementById('tat-input').value = '';
        this.saveData(); this.render();
    },
    getAge(created) { return Math.floor((Date.now() - created) / 86400000); },
    getColor(days) { return days < 3 ? '#2ecc71' : days < 7 ? '#f39c12' : days < 14 ? '#e67e22' : '#e74c3c'; },
    completeTask(id) { this.tasks = this.tasks.filter(t => t.id !== id); this.saveData(); this.render(); Core.Toast.show('Task completed!', 'success'); },
    render() {
        const sorted = [...this.tasks].sort((a, b) => a.created - b.created);
        document.getElementById('tat-fresh').textContent = sorted.filter(t => this.getAge(t.created) < 3).length;
        document.getElementById('tat-aging').textContent = sorted.filter(t => { const a = this.getAge(t.created); return a >= 3 && a < 7; }).length;
        document.getElementById('tat-old').textContent = sorted.filter(t => { const a = this.getAge(t.created); return a >= 7 && a < 14; }).length;
        document.getElementById('tat-stale').textContent = sorted.filter(t => this.getAge(t.created) >= 14).length;
        document.getElementById('tat-list').innerHTML = sorted.map(t => {
            const age = this.getAge(t.created);
            return `<div style="padding:.75rem;border-left:4px solid ${this.getColor(age)};margin-bottom:.5rem;background:var(--bg-secondary);border-radius:0 var(--radius) var(--radius) 0;display:flex;justify-content:space-between;align-items:center;">
                <div><strong>${t.text}</strong><br><span style="font-size:.8rem;color:var(--text-muted);">${age} day${age !== 1 ? 's' : ''} old</span></div>
                <button onclick="TaskAgingTracker.completeTask(${t.id})" class="btn btn-secondary" style="font-size:.8rem;">Done</button>
            </div>`;
        }).join('') || '<p style="color:var(--text-muted);text-align:center;">No tasks tracked</p>';
    },
    saveData() { Core.Storage.set('task-aging', { tasks: this.tasks }); },
    loadData() { const d = Core.Storage.get('task-aging'); this.tasks = d?.tasks || []; }
};

window.MicroCommitmentTracker = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Micro Commitment Tracker</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="font-size:3rem;font-weight:bold;" id="mct-streak">0</div>
                    <div style="color:var(--text-muted);">day streak</div>
                </div>
                <div id="mct-commitments" style="margin-bottom:1.5rem;"></div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Set Today's Commitments</h3>
                    <div style="display:flex;gap:.5rem;margin-top:1rem;">
                        <input type="text" id="mct-input" class="input-field" placeholder="A tiny commitment..." style="flex:1;">
                        <button id="mct-add" class="btn btn-primary">Add</button>
                    </div>
                    <p style="font-size:.8rem;color:var(--text-muted);margin-top:.5rem;">Tip: Keep commitments small and achievable (max 5)</p>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('mct-add').addEventListener('click', () => this.addCommitment());
        document.getElementById('mct-input').addEventListener('keypress', e => { if (e.key === 'Enter') this.addCommitment(); });
    },
    addCommitment() {
        if (this.commitments.length >= 5) { Core.Toast.show('Max 5 commitments!', 'warning'); return; }
        const text = document.getElementById('mct-input').value.trim();
        if (!text) return;
        this.commitments.push({ text, done: false, id: Date.now() });
        document.getElementById('mct-input').value = '';
        this.saveData(); this.render();
    },
    toggle(id) {
        const c = this.commitments.find(c => c.id === id);
        if (c) { c.done = !c.done; this.checkAllDone(); this.saveData(); this.render(); }
    },
    remove(id) { this.commitments = this.commitments.filter(c => c.id !== id); this.saveData(); this.render(); },
    checkAllDone() {
        if (this.commitments.length > 0 && this.commitments.every(c => c.done)) {
            const today = new Date().toDateString();
            if (this.lastComplete !== today) { this.streak++; this.lastComplete = today; Core.Toast.show('All commitments done! Streak: ' + this.streak, 'success'); }
        }
    },
    render() {
        document.getElementById('mct-streak').textContent = this.streak;
        document.getElementById('mct-commitments').innerHTML = this.commitments.map(c => `
            <div style="background:var(--bg);padding:1rem;border-radius:var(--radius);margin-bottom:.5rem;display:flex;align-items:center;gap:1rem;">
                <input type="checkbox" ${c.done ? 'checked' : ''} onchange="MicroCommitmentTracker.toggle(${c.id})" style="width:24px;height:24px;">
                <span style="flex:1;${c.done ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${c.text}</span>
                <button onclick="MicroCommitmentTracker.remove(${c.id})" style="background:none;border:none;cursor:pointer;color:var(--danger);">x</button>
            </div>`).join('');
    },
    saveData() {
        const today = new Date().toDateString();
        Core.Storage.set('micro-commitments', { commitments: this.commitments, streak: this.streak, lastComplete: this.lastComplete, date: today });
    },
    loadData() {
        const d = Core.Storage.get('micro-commitments');
        const today = new Date().toDateString();
        if (d && d.date === today) { this.commitments = d.commitments || []; }
        else { this.commitments = []; }
        this.streak = d?.streak || 0;
        this.lastComplete = d?.lastComplete || '';
        // Reset streak if missed a day
        if (this.lastComplete && this.lastComplete !== today) {
            const last = new Date(this.lastComplete);
            const diff = Math.floor((Date.now() - last.getTime()) / 86400000);
            if (diff > 1) this.streak = 0;
        }
    }
};

window.FlowStateTimer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Flow State Timer</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div id="fst-timer" style="font-size:4rem;font-weight:bold;font-family:monospace;">0:00:00</div>
                    <input type="text" id="fst-activity" class="input-field" placeholder="What are you flowing on?" style="width:100%;margin:1rem 0;">
                    <div style="display:flex;gap:1rem;justify-content:center;">
                        <button id="fst-start" class="btn btn-primary">Start Flow</button>
                        <button id="fst-stop" class="btn btn-danger" style="display:none;">End Flow</button>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <div style="color:var(--text-muted);font-size:.85rem;">Today's Flow</div>
                        <div id="fst-today" style="font-size:2rem;font-weight:bold;">0 min</div>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <div style="color:var(--text-muted);font-size:.85rem;">This Week</div>
                        <div id="fst-week" style="font-size:2rem;font-weight:bold;">0 min</div>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Recent Sessions</h3>
                    <div id="fst-sessions" style="max-height:200px;overflow-y:auto;text-align:left;"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('fst-start').addEventListener('click', () => this.start());
        document.getElementById('fst-stop').addEventListener('click', () => this.stop());
    },
    start() {
        const activity = document.getElementById('fst-activity').value.trim() || 'Deep work';
        this.active = { activity, start: Date.now() };
        document.getElementById('fst-start').style.display = 'none';
        document.getElementById('fst-stop').style.display = 'inline-block';
        document.getElementById('fst-activity').disabled = true;
        this._ti = setInterval(() => {
            const el = document.getElementById('fst-timer');
            if (!el) { clearInterval(this._ti); return; }
            const s = Math.floor((Date.now() - this.active.start) / 1000);
            el.textContent = `${Math.floor(s / 3600)}:${(Math.floor(s / 60) % 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
        }, 1000);
    },
    stop() {
        clearInterval(this._ti);
        const duration = Math.round((Date.now() - this.active.start) / 60000);
        this.sessions.push({ activity: this.active.activity, start: this.active.start, duration, date: new Date().toDateString() });
        this.active = null;
        document.getElementById('fst-start').style.display = 'inline-block';
        document.getElementById('fst-stop').style.display = 'none';
        document.getElementById('fst-activity').disabled = false;
        document.getElementById('fst-activity').value = '';
        document.getElementById('fst-timer').textContent = '0:00:00';
        this.saveData(); this.render();
        Core.Toast.show(`Flow session: ${duration} minutes!`, 'success');
    },
    render() {
        const today = new Date().toDateString();
        const todayMins = this.sessions.filter(s => s.date === today).reduce((a, s) => a + s.duration, 0);
        document.getElementById('fst-today').textContent = todayMins + ' min';
        const weekAgo = Date.now() - 7 * 86400000;
        const weekMins = this.sessions.filter(s => s.start > weekAgo).reduce((a, s) => a + s.duration, 0);
        document.getElementById('fst-week').textContent = weekMins + ' min';
        document.getElementById('fst-sessions').innerHTML = this.sessions.slice(-10).reverse().map(s => `
            <div style="padding:.5rem;border-bottom:1px solid var(--border);">
                <strong>${s.activity}</strong> - ${s.duration} min
                <div style="font-size:.75rem;color:var(--text-muted);">${new Date(s.start).toLocaleString()}</div>
            </div>`).join('') || '<p style="color:var(--text-muted);">No flow sessions yet</p>';
    },
    saveData() { Core.Storage.set('flow-state-timer', { sessions: this.sessions }); },
    loadData() { const d = Core.Storage.get('flow-state-timer'); this.sessions = d?.sessions || []; this.active = null; }
};

window.TaskMomentumVisualizer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Task Momentum Visualizer</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;text-align:center;">
                    <button id="tmv-complete" class="btn btn-primary" style="font-size:1.2rem;padding:1rem 2rem;">
                        Log Completed Task
                    </button>
                    <div style="margin-top:1rem;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
                        <div><div style="font-size:2rem;font-weight:bold;" id="tmv-today">0</div><div style="color:var(--text-muted);font-size:.8rem;">Today</div></div>
                        <div><div style="font-size:2rem;font-weight:bold;" id="tmv-week">0</div><div style="color:var(--text-muted);font-size:.8rem;">This Week</div></div>
                        <div><div style="font-size:2rem;font-weight:bold;" id="tmv-trend">-</div><div style="color:var(--text-muted);font-size:.8rem;">Trend</div></div>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Velocity (Tasks/Day - Last 14 Days)</h3>
                    <canvas id="tmv-chart" width="600" height="200"></canvas>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('tmv-complete').addEventListener('click', () => {
            this.completions.push(Date.now());
            this.saveData(); this.render();
            Core.Toast.show('Task logged!', 'success');
        });
    },
    render() {
        const today = new Date().toDateString();
        const todayCount = this.completions.filter(c => new Date(c).toDateString() === today).length;
        document.getElementById('tmv-today').textContent = todayCount;
        const weekAgo = Date.now() - 7 * 86400000;
        document.getElementById('tmv-week').textContent = this.completions.filter(c => c > weekAgo).length;
        // Calculate daily counts for last 14 days
        const days = [];
        for (let i = 13; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i);
            const ds = d.toDateString();
            days.push({ date: ds, count: this.completions.filter(c => new Date(c).toDateString() === ds).length, label: d.toLocaleDateString('en', { weekday: 'short' }) });
        }
        // Trend
        const firstHalf = days.slice(0, 7).reduce((a, d) => a + d.count, 0);
        const secondHalf = days.slice(7).reduce((a, d) => a + d.count, 0);
        const trendEl = document.getElementById('tmv-trend');
        if (secondHalf > firstHalf) { trendEl.textContent = 'Up'; trendEl.style.color = 'var(--success)'; }
        else if (secondHalf < firstHalf) { trendEl.textContent = 'Down'; trendEl.style.color = 'var(--danger)'; }
        else { trendEl.textContent = 'Stable'; trendEl.style.color = 'var(--text-muted)'; }
        // Draw chart
        const c = document.getElementById('tmv-chart'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 600, 200);
        const max = Math.max(...days.map(d => d.count), 1);
        const barW = 35;
        days.forEach((d, i) => {
            const h = (d.count / max) * 160;
            const x = 10 + i * 42;
            ctx.fillStyle = i >= 7 ? 'var(--secondary)' : 'var(--border)';
            ctx.fillRect(x, 180 - h, barW, h);
            ctx.fillStyle = 'var(--text-muted)';
            ctx.font = '10px sans-serif';
            ctx.fillText(d.label, x + 2, 195);
            if (d.count > 0) { ctx.fillStyle = 'var(--text)'; ctx.fillText(d.count, x + barW / 2 - 4, 175 - h); }
        });
    },
    saveData() { Core.Storage.set('task-momentum', { completions: this.completions.slice(-500) }); },
    loadData() { const d = Core.Storage.get('task-momentum'); this.completions = d?.completions || []; }
};

window.AttentionSpanTrainer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Attention Span Trainer</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="color:var(--text-muted);font-size:.85rem;">Current Challenge</div>
                    <div id="ast-level" style="font-size:2rem;font-weight:bold;margin:.5rem 0;"></div>
                    <div id="ast-timer" style="font-size:4rem;font-weight:bold;font-family:monospace;margin:1rem 0;">0:00</div>
                    <div id="ast-dot" style="width:40px;height:40px;background:var(--secondary);border-radius:50%;margin:1rem auto;display:none;"></div>
                    <p id="ast-instruction" style="color:var(--text-muted);">Focus on the dot without looking away. Press Start when ready.</p>
                    <button id="ast-start" class="btn btn-primary" style="font-size:1.1rem;">Start Challenge</button>
                    <button id="ast-fail" class="btn btn-danger" style="display:none;">I Lost Focus</button>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <div style="color:var(--text-muted);font-size:.85rem;">Personal Best</div>
                        <div id="ast-best" style="font-size:2rem;font-weight:bold;">0 sec</div>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <div style="color:var(--text-muted);font-size:.85rem;">Sessions</div>
                        <div id="ast-sessions" style="font-size:2rem;font-weight:bold;">0</div>
                    </div>
                </div>
            </div>`;
        this.loadData();
        this.level = Math.min(2 + this.sessions.length, 30);
        document.getElementById('ast-level').textContent = this.level + ' minutes';
        this.render();
        this.attachEvents();
    },
    attachEvents() {
        document.getElementById('ast-start').addEventListener('click', () => this.start());
        document.getElementById('ast-fail').addEventListener('click', () => this.fail());
    },
    start() {
        this.startTime = Date.now();
        this.target = this.level * 60;
        document.getElementById('ast-start').style.display = 'none';
        document.getElementById('ast-fail').style.display = 'inline-block';
        document.getElementById('ast-dot').style.display = 'block';
        document.getElementById('ast-instruction').textContent = 'Stay focused on the dot...';
        this._ti = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const el = document.getElementById('ast-timer');
            if (!el) { clearInterval(this._ti); return; }
            el.textContent = `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}`;
            if (elapsed >= this.target) { clearInterval(this._ti); this.succeed(); }
        }, 1000);
    },
    succeed() {
        const dur = Math.floor((Date.now() - this.startTime) / 1000);
        this.sessions.push({ duration: dur, success: true, date: Date.now() });
        if (dur > this.best) this.best = dur;
        this.level = Math.min(this.level + 1, 30);
        this.saveData(); this.reset();
        Core.Toast.show('Challenge complete! Level up!', 'success');
    },
    fail() {
        clearInterval(this._ti);
        const dur = Math.floor((Date.now() - this.startTime) / 1000);
        this.sessions.push({ duration: dur, success: false, date: Date.now() });
        if (dur > this.best) this.best = dur;
        this.saveData(); this.reset();
        Core.Toast.show(`Focused for ${dur} seconds. Keep practicing!`, 'info');
    },
    reset() {
        document.getElementById('ast-start').style.display = 'inline-block';
        document.getElementById('ast-fail').style.display = 'none';
        document.getElementById('ast-dot').style.display = 'none';
        document.getElementById('ast-timer').textContent = '0:00';
        document.getElementById('ast-level').textContent = this.level + ' minutes';
        document.getElementById('ast-instruction').textContent = 'Focus on the dot without looking away. Press Start when ready.';
        this.render();
    },
    render() {
        document.getElementById('ast-best').textContent = this.best >= 60 ? Math.floor(this.best / 60) + 'm ' + (this.best % 60) + 's' : this.best + ' sec';
        document.getElementById('ast-sessions').textContent = this.sessions.length;
    },
    saveData() { Core.Storage.set('attention-trainer', { sessions: this.sessions, best: this.best, level: this.level }); },
    loadData() { const d = Core.Storage.get('attention-trainer'); this.sessions = d?.sessions || []; this.best = d?.best || 0; this.level = d?.level || 2; }
};

window.PriorityShuffler = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Priority Shuffler</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="display:flex;gap:.75rem;">
                        <input type="text" id="ps-input" class="input-field" placeholder="Add a low-priority task..." style="flex:1;">
                        <button id="ps-add" class="btn btn-primary">Add</button>
                    </div>
                    <div id="ps-tasks" style="margin-top:1rem;text-align:left;"></div>
                </div>
                <button id="ps-shuffle" class="btn btn-primary" style="font-size:1.3rem;padding:1rem 3rem;margin-bottom:1.5rem;">
                    Shuffle & Pick One
                </button>
                <div id="ps-result" style="display:none;background:linear-gradient(135deg,var(--secondary),var(--secondary-light));color:white;padding:2rem;border-radius:var(--radius-lg);font-size:1.5rem;margin-bottom:1rem;"></div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.renderTasks();
    },
    attachEvents() {
        document.getElementById('ps-add').addEventListener('click', () => this.addTask());
        document.getElementById('ps-input').addEventListener('keypress', e => { if (e.key === 'Enter') this.addTask(); });
        document.getElementById('ps-shuffle').addEventListener('click', () => this.shuffle());
    },
    addTask() {
        const text = document.getElementById('ps-input').value.trim();
        if (!text) return;
        this.tasks.push({ text, id: Date.now(), picked: 0 });
        document.getElementById('ps-input').value = '';
        this.saveData(); this.renderTasks();
    },
    removeTask(id) { this.tasks = this.tasks.filter(t => t.id !== id); this.saveData(); this.renderTasks(); },
    shuffle() {
        if (!this.tasks.length) { Core.Toast.show('Add some tasks first!', 'warning'); return; }
        const pick = this.tasks[Math.floor(Math.random() * this.tasks.length)];
        pick.picked++;
        const el = document.getElementById('ps-result');
        el.style.display = 'block';
        el.textContent = pick.text;
        this.saveData(); this.renderTasks();
    },
    renderTasks() {
        document.getElementById('ps-tasks').innerHTML = this.tasks.map(t => `
            <div style="padding:.5rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:.5rem;display:flex;justify-content:space-between;align-items:center;">
                <span>${t.text} <span style="color:var(--text-muted);font-size:.75rem;">(picked ${t.picked}x)</span></span>
                <button onclick="PriorityShuffler.removeTask(${t.id})" style="background:none;border:none;cursor:pointer;color:var(--danger);">x</button>
            </div>`).join('');
    },
    saveData() { Core.Storage.set('priority-shuffler', { tasks: this.tasks }); },
    loadData() { const d = Core.Storage.get('priority-shuffler'); this.tasks = d?.tasks || []; }
};

window.ProductivityWaveTracker = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Productivity Wave Tracker</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Rate Your Productivity Now</h3>
                    <div style="display:flex;justify-content:space-around;margin:1.5rem 0;">
                        ${[1,2,3,4,5].map(l => `<button class="btn btn-secondary pwt-rate" data-val="${l}" style="width:55px;height:55px;border-radius:50%;font-size:1.3rem;">${l}</button>`).join('')}
                    </div>
                    <div style="display:flex;justify-content:space-between;color:var(--text-muted);font-size:.8rem;">
                        <span>Very Low</span><span>Low</span><span>Medium</span><span>High</span><span>Peak</span>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Today's Productivity Wave</h3>
                    <canvas id="pwt-chart" width="600" height="200"></canvas>
                </div>
                <div style="background:var(--bg-secondary);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Peak Hours</h3>
                    <div id="pwt-peaks"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.drawChart();
        this.showPeaks();
    },
    attachEvents() {
        document.querySelectorAll('.pwt-rate').forEach(b => b.addEventListener('click', e => {
            const val = parseInt(e.target.dataset.val);
            const hour = new Date().getHours();
            if (!this.data[hour]) this.data[hour] = [];
            this.data[hour].push(val);
            this.saveData();
            this.drawChart();
            this.showPeaks();
            Core.Toast.show(`Productivity ${val}/5 logged for ${hour}:00`, 'success');
            document.querySelectorAll('.pwt-rate').forEach(b2 => { b2.style.background = b2.dataset.val == val ? 'var(--secondary)' : ''; b2.style.color = b2.dataset.val == val ? 'white' : ''; });
        }));
    },
    drawChart() {
        const c = document.getElementById('pwt-chart'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 600, 200);
        ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) { const y = 190 - i * 35; ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(590, y); ctx.stroke(); }
        const avgs = [];
        for (let h = 6; h <= 23; h++) {
            if (this.data[h] && this.data[h].length) { avgs.push({ h, avg: this.data[h].reduce((a, b) => a + b, 0) / this.data[h].length }); }
        }
        if (avgs.length < 2) { ctx.fillStyle = 'gray'; ctx.fillText('Log productivity at different hours to see your wave', 150, 100); return; }
        ctx.strokeStyle = 'var(--secondary)'; ctx.lineWidth = 3; ctx.beginPath();
        avgs.forEach((p, i) => {
            const x = 30 + ((p.h - 6) / 17) * 560;
            const y = 190 - p.avg * 35;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
        avgs.forEach(p => {
            const x = 30 + ((p.h - 6) / 17) * 560;
            const y = 190 - p.avg * 35;
            ctx.fillStyle = 'var(--secondary)'; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
        });
        ctx.fillStyle = 'var(--text-muted)'; ctx.font = '11px sans-serif';
        for (let h = 6; h <= 23; h += 2) { ctx.fillText(h + ':00', 25 + ((h - 6) / 17) * 560, 205); }
    },
    showPeaks() {
        const avgs = {};
        for (let h = 0; h < 24; h++) { if (this.data[h] && this.data[h].length) avgs[h] = this.data[h].reduce((a, b) => a + b, 0) / this.data[h].length; }
        const sorted = Object.entries(avgs).sort((a, b) => b[1] - a[1]);
        const el = document.getElementById('pwt-peaks');
        if (!sorted.length) { el.innerHTML = '<p style="color:var(--text-muted);">Log more data to see peak hours</p>'; return; }
        el.innerHTML = sorted.slice(0, 3).map(([h, avg]) =>
            `<div style="padding:.5rem;margin-bottom:.5rem;background:var(--bg);border-radius:var(--radius);">${h}:00 — Average: ${avg.toFixed(1)}/5</div>`
        ).join('');
    },
    saveData() { Core.Storage.set('productivity-wave', { data: this.data }); },
    loadData() { const d = Core.Storage.get('productivity-wave'); this.data = d?.data || {}; }
};

console.log('Productivity tools loaded.');
