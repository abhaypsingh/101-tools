// Wellness Tools - Part 2 of 2
// Tools: ComfortZoneExpander, PersonalBandwidthMonitor, PerfectionismDimmer,
//        ComparisonBlocker, PermissionSlipGenerator, CognitiveReframeTool,
//        PersonalRitualBuilder

// ─────────────────────────────────────────────────────────────────────────────
// 8. ComfortZoneExpander
// ─────────────────────────────────────────────────────────────────────────────
window.ComfortZoneExpander = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:760px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Comfort Zone Expander</h2>
                <p style="color:#666;margin-top:0;">Add challenges to each zone. Track attempts. Move items as you grow.</p>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                            <h3 style="margin-top:0;">Add a Challenge</h3>
                            <input id="cze-name" type="text" placeholder="Describe the challenge..." style="width:100%;box-sizing:border-box;padding:9px;border:1px solid #ccc;border-radius:6px;margin-bottom:8px;">
                            <div style="display:flex;gap:8px;">
                                <select id="cze-zone" style="flex:1;padding:9px;border:1px solid #ccc;border-radius:6px;">
                                    <option value="comfort">Comfort Zone</option>
                                    <option value="growth" selected>Growth Zone</option>
                                    <option value="panic">Panic Zone</option>
                                </select>
                                <button id="cze-add-btn" style="padding:9px 18px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Add</button>
                            </div>
                        </div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;text-align:center;">
                            <h3 style="margin-top:0;">Zone Map</h3>
                            <svg id="cze-svg" width="240" height="240" viewBox="0 0 240 240"></svg>
                            <div id="cze-legend" style="font-size:12px;margin-top:6px;"></div>
                        </div>
                    </div>
                    <div>
                        <div id="cze-zones" style="display:flex;flex-direction:column;gap:12px;"></div>
                    </div>
                </div>
            </div>`;
        document.getElementById('cze-add-btn').addEventListener('click', () => this.addChallenge());
        document.getElementById('cze-name').addEventListener('keydown', e => { if (e.key === 'Enter') this.addChallenge(); });
        this.loadData();
    },

    addChallenge() {
        const name = document.getElementById('cze-name').value.trim();
        const zone = document.getElementById('cze-zone').value;
        if (!name) { Core.Toast.show('Describe the challenge.', 'warning'); return; }
        const items = Core.Storage.get('cze_items') || [];
        items.push({ id: Date.now(), name, zone, attempts: [], ts: Date.now() });
        Core.Storage.set('cze_items', items);
        document.getElementById('cze-name').value = '';
        Core.Toast.show('Challenge added.', 'success');
        this.loadData();
    },

    logAttempt(id, outcome) {
        const items = Core.Storage.get('cze_items') || [];
        const item = items.find(i => i.id === id);
        if (!item) return;
        item.attempts.push({ ts: Date.now(), outcome });
        // Auto-promote: 3 successes in growth zone -> comfort
        if (item.zone === 'growth') {
            const successes = item.attempts.filter(a => a.outcome === 'success').length;
            if (successes >= 3) { item.zone = 'comfort'; Core.Toast.show(`"${item.name}" moved to Comfort Zone!`, 'success'); }
        }
        // Auto-promote: 3 successes in panic -> growth
        if (item.zone === 'panic') {
            const successes = item.attempts.filter(a => a.outcome === 'success').length;
            if (successes >= 3) { item.zone = 'growth'; Core.Toast.show(`"${item.name}" moved to Growth Zone!`, 'success'); }
        }
        Core.Storage.set('cze_items', items);
        this.loadData();
    },

    deleteItem(id) {
        const items = (Core.Storage.get('cze_items') || []).filter(i => i.id !== id);
        Core.Storage.set('cze_items', items);
        this.loadData();
    },

    loadData() {
        const items = Core.Storage.get('cze_items') || [];
        const zones = { comfort: [], growth: [], panic: [] };
        items.forEach(i => (zones[i.zone] || zones.growth).push(i));
        const configs = [
            { key: 'comfort', label: 'Comfort Zone', color: '#27ae60', bg: '#eafaf1' },
            { key: 'growth',  label: 'Growth Zone',  color: '#f39c12', bg: '#fef9e7' },
            { key: 'panic',   label: 'Panic Zone',   color: '#e74c3c', bg: '#fdedec' },
        ];
        document.getElementById('cze-zones').innerHTML = configs.map(cfg => `
            <div style="background:${cfg.bg};border-radius:10px;padding:14px;border:2px solid ${cfg.color}22;">
                <h4 style="margin:0 0 10px;color:${cfg.color};">${cfg.label} (${zones[cfg.key].length})</h4>
                ${zones[cfg.key].length === 0 ? '<p style="color:#aaa;font-size:13px;margin:0;">Empty</p>' : zones[cfg.key].map(item => {
                    const last = item.attempts[item.attempts.length - 1];
                    const successCount = item.attempts.filter(a => a.outcome === 'success').length;
                    return `<div style="background:#fff;border-radius:8px;padding:10px;margin-bottom:8px;">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                            <div style="font-size:14px;font-weight:500;flex:1;">${this.escHtml(item.name)}</div>
                            <button onclick="window.ComfortZoneExpander.deleteItem(${item.id})" style="background:none;border:none;cursor:pointer;color:#ccc;font-size:16px;padding:0 0 0 8px;">x</button>
                        </div>
                        <div style="font-size:12px;color:#888;margin:4px 0;">
                            Attempts: ${item.attempts.length} | Successes: ${successCount}
                            ${last ? ` | Last: <span style="color:${last.outcome === 'success' ? '#27ae60' : last.outcome === 'partial' ? '#f39c12' : '#e74c3c'}">${last.outcome}</span>` : ''}
                        </div>
                        <div style="display:flex;gap:6px;margin-top:6px;">
                            <button onclick="window.ComfortZoneExpander.logAttempt(${item.id},'success')" style="padding:4px 10px;background:#27ae60;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;">Succeeded</button>
                            <button onclick="window.ComfortZoneExpander.logAttempt(${item.id},'partial')" style="padding:4px 10px;background:#f39c12;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;">Partially</button>
                            <button onclick="window.ComfortZoneExpander.logAttempt(${item.id},'toomuch')" style="padding:4px 10px;background:#e74c3c;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;">Too much</button>
                        </div>
                    </div>`;
                }).join('')}
            </div>`).join('');
        this.drawZoneMap(zones);
    },

    drawZoneMap(zones) {
        const svg = document.getElementById('cze-svg');
        if (!svg) return;
        const cx = 120, cy = 120;
        const total = Math.max(Object.values(zones).reduce((s, z) => s + z.length, 0), 1);
        const comfortR = 40 + (zones.comfort.length / total) * 30;
        const growthR  = comfortR + 28 + (zones.growth.length / total) * 30;
        const panicR   = growthR  + 24 + (zones.panic.length / total)  * 20;
        svg.innerHTML = `
            <circle cx="${cx}" cy="${cy}" r="${Math.min(panicR,110)}"  fill="#fdedec" stroke="#e74c3c" stroke-width="2"/>
            <circle cx="${cx}" cy="${cy}" r="${Math.min(growthR,85)}"  fill="#fef9e7" stroke="#f39c12" stroke-width="2"/>
            <circle cx="${cx}" cy="${cy}" r="${Math.min(comfortR,60)}" fill="#eafaf1" stroke="#27ae60" stroke-width="2"/>
            <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#27ae60" font-weight="bold">Comfort</text>
            <text x="${cx}" y="${cy - Math.min(growthR,85) + 14}" text-anchor="middle" font-size="10" fill="#f39c12">Growth</text>
            <text x="${cx}" y="${cy - Math.min(panicR,110) + 12}" text-anchor="middle" font-size="10" fill="#e74c3c">Panic</text>`;
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. PersonalBandwidthMonitor
// ─────────────────────────────────────────────────────────────────────────────
window.PersonalBandwidthMonitor = {
    categories: [
        { id: 'physical',  label: 'Physical',  color: '#e74c3c', recovery: 'Sleep 8 hours, gentle movement, nutrition check, hydration.' },
        { id: 'mental',    label: 'Mental',    color: '#3498db', recovery: 'Take a break from decisions. Read fiction. Spend 20 min in quiet.' },
        { id: 'emotional', label: 'Emotional', color: '#9b59b6', recovery: 'Call a trusted person. Journal for 10 min. Allow yourself to feel without fixing.' },
        { id: 'social',    label: 'Social',    color: '#27ae60', recovery: 'Take alone time. Decline optional social commitments this week.' },
        { id: 'creative',  label: 'Creative',  color: '#f39c12', recovery: 'Consume instead of create. Watch, read, listen. Let ideas refill.' },
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Personal Bandwidth Monitor</h2>
                <p style="color:#666;margin-top:0;">Track your available capacity across five dimensions. Save daily snapshots.</p>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Current Bandwidth</h3>
                        ${this.categories.map(c => `
                            <div style="margin-bottom:14px;">
                                <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px;">
                                    <span style="font-weight:500;color:${c.color};">${c.label}</span>
                                    <span id="pbm-val-${c.id}" style="font-weight:bold;">50</span>
                                </div>
                                <input type="range" id="pbm-${c.id}" min="0" max="100" value="50"
                                    style="width:100%;accent-color:${c.color};"
                                    oninput="window.PersonalBandwidthMonitor.onSlider('${c.id}')">
                            </div>`).join('')}
                        <button id="pbm-save-btn" style="padding:9px 20px;background:#2c3e50;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-top:4px;">Save Snapshot</button>
                    </div>

                    <div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;text-align:center;">
                            <h3 style="margin-top:0;">Overall Bandwidth</h3>
                            <div id="pbm-gauge" style="margin:10px auto;"></div>
                            <div id="pbm-overall" style="font-size:42px;font-weight:bold;"></div>
                            <div id="pbm-status" style="font-size:14px;color:#666;"></div>
                        </div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                            <h3 style="margin-top:0;">Warnings &amp; Recovery</h3>
                            <div id="pbm-warnings" style="font-size:13px;"></div>
                        </div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                    <h3 style="margin-top:0;">History</h3>
                    <canvas id="pbm-chart" width="640" height="120" style="width:100%;max-width:640px;"></canvas>
                    <div id="pbm-history" style="font-size:12px;max-height:160px;overflow-y:auto;margin-top:10px;"></div>
                </div>
            </div>`;
        document.getElementById('pbm-save-btn').addEventListener('click', () => this.saveSnapshot());
        this.loadData();
        this.updateDisplay();
    },

    onSlider(id) {
        const v = document.getElementById(`pbm-${id}`).value;
        document.getElementById(`pbm-val-${id}`).textContent = v;
        this.updateDisplay();
    },

    getValues() {
        const vals = {};
        this.categories.forEach(c => { vals[c.id] = parseInt(document.getElementById(`pbm-${c.id}`)?.value || 50); });
        return vals;
    },

    updateDisplay() {
        const vals = this.getValues();
        const avg = Math.round(Object.values(vals).reduce((a, b) => a + b, 0) / this.categories.length);
        const el = document.getElementById('pbm-overall');
        const status = document.getElementById('pbm-status');
        const color = avg < 30 ? '#e74c3c' : avg < 60 ? '#f39c12' : '#27ae60';
        if (el) { el.textContent = avg + '%'; el.style.color = color; }
        if (status) status.textContent = avg < 20 ? 'Critical — immediate rest needed' : avg < 40 ? 'Low — reduce commitments' : avg < 60 ? 'Moderate — proceed mindfully' : avg < 80 ? 'Good — maintain balance' : 'High capacity — great!';
        // Warnings
        const warnEl = document.getElementById('pbm-warnings');
        if (warnEl) {
            const warnings = this.categories.filter(c => vals[c.id] < 20);
            const moderate = this.categories.filter(c => vals[c.id] >= 20 && vals[c.id] < 40);
            let html = '';
            warnings.forEach(c => {
                html += `<div style="background:#fdedec;border-radius:6px;padding:8px;margin-bottom:6px;border-left:3px solid ${c.color};">
                    <strong style="color:${c.color};">⚠ ${c.label} critically low (${vals[c.id]}%)</strong>
                    <p style="margin:4px 0 0;font-size:12px;">${c.recovery}</p>
                </div>`;
            });
            moderate.forEach(c => {
                html += `<div style="background:#fef9e7;border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:12px;">
                    <strong style="color:#f39c12;">${c.label} low (${vals[c.id]}%)</strong> — ${c.recovery.split('.')[0]}.
                </div>`;
            });
            if (!html) html = '<p style="color:#27ae60;font-size:13px;">All areas look healthy! Keep it up.</p>';
            warnEl.innerHTML = html;
        }
    },

    saveSnapshot() {
        const vals = this.getValues();
        const history = Core.Storage.get('pbm_history') || [];
        history.unshift({ ts: Date.now(), vals });
        Core.Storage.set('pbm_history', history.slice(0, 90));
        Core.Toast.show('Bandwidth snapshot saved.', 'success');
        this.renderHistory();
        this.drawChart();
    },

    loadData() {
        const history = Core.Storage.get('pbm_history') || [];
        if (history.length > 0) {
            const last = history[0].vals;
            this.categories.forEach(c => {
                const slider = document.getElementById(`pbm-${c.id}`);
                if (slider && last[c.id] !== undefined) {
                    slider.value = last[c.id];
                    document.getElementById(`pbm-val-${c.id}`).textContent = last[c.id];
                }
            });
            this.updateDisplay();
        }
        this.renderHistory();
        this.drawChart();
    },

    drawChart() {
        const canvas = document.getElementById('pbm-chart');
        if (!canvas) return;
        const history = (Core.Storage.get('pbm_history') || []).slice(0, 30).reverse();
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        if (history.length < 2) { ctx.fillStyle = '#aaa'; ctx.font = '13px sans-serif'; ctx.fillText('Save 2+ snapshots to see trend.', 20, H / 2); return; }
        const pad = { l: 30, r: 10, t: 10, b: 20 };
        const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
        ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
        [0, 50, 100].forEach(v => {
            const y = pad.t + gH - (v / 100) * gH;
            ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + gW, y); ctx.stroke();
            ctx.fillStyle = '#bbb'; ctx.font = '9px sans-serif'; ctx.fillText(v, 2, y + 4);
        });
        this.categories.forEach(c => {
            ctx.beginPath();
            history.forEach((h, i) => {
                const x = pad.l + (i / (history.length - 1)) * gW;
                const y = pad.t + gH - ((h.vals[c.id] || 0) / 100) * gH;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            });
            ctx.strokeStyle = c.color; ctx.lineWidth = 1.5; ctx.stroke();
        });
        // Legend
        ctx.font = '10px sans-serif';
        this.categories.forEach((c, i) => {
            ctx.fillStyle = c.color;
            ctx.fillRect(pad.l + i * 100, H - 14, 10, 8);
            ctx.fillStyle = '#555';
            ctx.fillText(c.label, pad.l + i * 100 + 14, H - 7);
        });
    },

    renderHistory() {
        const history = Core.Storage.get('pbm_history') || [];
        const el = document.getElementById('pbm-history');
        if (!el) return;
        if (history.length === 0) { el.innerHTML = '<p style="color:#888;">No history yet.</p>'; return; }
        el.innerHTML = history.slice(0, 20).map(h => {
            const avg = Math.round(Object.values(h.vals).reduce((a, b) => a + b, 0) / this.categories.length);
            const color = avg < 30 ? '#e74c3c' : avg < 60 ? '#f39c12' : '#27ae60';
            return `<div style="border-bottom:1px solid #eee;padding:5px 0;display:flex;gap:12px;align-items:center;">
                <span style="color:#aaa;min-width:130px;">${new Date(h.ts).toLocaleString()}</span>
                <span style="font-weight:bold;color:${color};">Avg: ${avg}%</span>
                ${this.categories.map(c => `<span style="color:${c.color};">${c.label[0]}:${h.vals[c.id] || 0}</span>`).join(' ')}
            </div>`;
        }).join('');
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. PerfectionismDimmer
// ─────────────────────────────────────────────────────────────────────────────
window.PerfectionismDimmer = {
    quotes: [
        '"Done is better than perfect." — Sheryl Sandberg',
        '"Perfection is the enemy of progress." — Winston Churchill',
        '"Have no fear of perfection — you\'ll never reach it." — Salvador Dali',
        '"Striving for excellence motivates you; striving for perfection demoralizes you." — Harriet Braiker',
        '"The pursuit of perfection often impedes improvement." — George Will',
        '"Perfectionism is the voice of the oppressor." — Anne Lamott',
        '"Better a diamond with a flaw than a pebble without." — Confucius',
    ],

    timerInterval: null,
    timerSeconds: 0,
    activeTaskId: null,

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:720px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Perfectionism Dimmer</h2>
                <p style="color:#666;margin-top:0;">Set a "good enough" threshold for tasks and track when you exceed it.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Add Task</h3>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
                        <input id="pd-task" type="text" placeholder="Task name..." style="flex:1;min-width:180px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <label style="font-size:13px;white-space:nowrap;">Good enough at:</label>
                            <input type="range" id="pd-threshold" min="10" max="100" step="5" value="80" style="width:100px;">
                            <span id="pd-threshold-val" style="font-weight:bold;min-width:38px;">80%</span>
                        </div>
                        <button id="pd-add-btn" style="padding:9px 18px;background:#3498db;color:#fff;border:none;border-radius:6px;cursor:pointer;">Add</button>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Active Task Timer</h3>
                        <div id="pd-timer-section">
                            <p style="color:#888;font-size:13px;">Select a task and start the timer.</p>
                        </div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Time Saved Stats</h3>
                        <div id="pd-stats"></div>
                        <div id="pd-quote" style="margin-top:12px;font-size:13px;font-style:italic;color:#666;padding:10px;background:#fff;border-radius:6px;border-left:3px solid #3498db;"></div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                    <h3 style="margin-top:0;">Task List</h3>
                    <div id="pd-task-list"></div>
                </div>
            </div>`;

        document.getElementById('pd-threshold').addEventListener('input', function () {
            document.getElementById('pd-threshold-val').textContent = this.value + '%';
        });
        document.getElementById('pd-add-btn').addEventListener('click', () => this.addTask());
        this.showRandomQuote();
        this.loadData();
    },

    addTask() {
        const name = document.getElementById('pd-task').value.trim();
        const threshold = parseInt(document.getElementById('pd-threshold').value);
        if (!name) { Core.Toast.show('Enter a task name.', 'warning'); return; }
        const tasks = Core.Storage.get('pd_tasks') || [];
        tasks.unshift({ id: Date.now(), name, threshold, timeLogs: [], done: false });
        Core.Storage.set('pd_tasks', tasks);
        document.getElementById('pd-task').value = '';
        Core.Toast.show('Task added.', 'success');
        this.loadData();
    },

    startTimer(id) {
        if (this.timerInterval) { clearInterval(this.timerInterval); }
        this.activeTaskId = id;
        this.timerSeconds = 0;
        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            this.renderTimerSection();
        }, 1000);
        this.renderTimerSection();
    },

    stopTimer(accepted) {
        if (!this.timerInterval) return;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        const tasks = Core.Storage.get('pd_tasks') || [];
        const task = tasks.find(t => t.id === this.activeTaskId);
        if (task) {
            task.timeLogs.push({ ts: Date.now(), seconds: this.timerSeconds, accepted });
            if (accepted) { task.done = true; }
            Core.Storage.set('pd_tasks', tasks);
        }
        const msg = accepted ? 'Task accepted as good enough. Time saved!' : 'Timer stopped.';
        Core.Toast.show(msg, accepted ? 'success' : 'info');
        this.activeTaskId = null;
        this.timerSeconds = 0;
        this.loadData();
    },

    formatTime(s) {
        const m = Math.floor(s / 60), sec = s % 60;
        return `${m}:${String(sec).padStart(2,'0')}`;
    },

    renderTimerSection() {
        const el = document.getElementById('pd-timer-section');
        if (!el) return;
        if (!this.activeTaskId) { el.innerHTML = '<p style="color:#888;font-size:13px;">Select a task and start the timer.</p>'; return; }
        const tasks = Core.Storage.get('pd_tasks') || [];
        const task = tasks.find(t => t.id === this.activeTaskId);
        if (!task) return;
        const alertColor = this.timerSeconds > 1200 ? '#e74c3c' : '#3498db';
        el.innerHTML = `
            <div style="font-size:14px;font-weight:500;margin-bottom:8px;">${this.escHtml(task.name)}</div>
            <div style="font-size:13px;color:#888;margin-bottom:8px;">Good enough at: <strong>${task.threshold}%</strong></div>
            <div style="font-size:48px;font-weight:bold;color:${alertColor};margin-bottom:12px;">${this.formatTime(this.timerSeconds)}</div>
            ${this.timerSeconds > 900 ? '<div style="color:#e74c3c;font-size:13px;margin-bottom:10px;">You may have passed "good enough" — consider accepting it!</div>' : ''}
            <div style="display:flex;gap:8px;">
                <button onclick="window.PerfectionismDimmer.stopTimer(true)" style="flex:1;padding:9px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Accept as Good Enough</button>
                <button onclick="window.PerfectionismDimmer.stopTimer(false)" style="padding:9px 14px;background:#aaa;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Stop</button>
            </div>`;
    },

    loadData() {
        const tasks = Core.Storage.get('pd_tasks') || [];
        const el = document.getElementById('pd-task-list');
        if (tasks.length === 0) { el.innerHTML = '<p style="color:#888;">No tasks yet.</p>'; }
        else {
            el.innerHTML = tasks.slice(0, 30).map(t => {
                const totalTime = t.timeLogs.reduce((s, l) => s + l.seconds, 0);
                const sessions = t.timeLogs.length;
                return `<div style="background:${t.done ? '#eafaf1' : '#fff'};border-radius:8px;padding:12px;margin-bottom:8px;border-left:4px solid ${t.done ? '#27ae60' : '#3498db'};">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <div style="font-size:14px;font-weight:500;${t.done ? 'text-decoration:line-through;color:#888;' : ''}">${this.escHtml(t.name)}</div>
                            <div style="font-size:12px;color:#888;">Good enough: ${t.threshold}% | Sessions: ${sessions} | Total time: ${this.formatTime(totalTime)}</div>
                        </div>
                        <div style="display:flex;gap:6px;align-items:center;">
                            ${!t.done ? `<button onclick="window.PerfectionismDimmer.startTimer(${t.id})" style="padding:5px 10px;background:#3498db;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:12px;">Start Timer</button>` : ''}
                            <button onclick="window.PerfectionismDimmer.deleteTask(${t.id})" style="background:none;border:none;cursor:pointer;color:#ccc;font-size:16px;">x</button>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }
        // Stats
        const allLogs = tasks.flatMap(t => t.timeLogs.filter(l => l.accepted));
        const totalSaved = allLogs.reduce((s, l) => s + l.seconds, 0);
        document.getElementById('pd-stats').innerHTML = `
            <p style="margin:0 0 6px;font-size:14px;">Tasks accepted as good enough: <strong>${tasks.filter(t => t.done).length}</strong></p>
            <p style="margin:0;font-size:14px;">Total time on accepted tasks: <strong>${this.formatTime(totalSaved)}</strong></p>`;
        this.renderTimerSection();
    },

    deleteTask(id) {
        if (this.activeTaskId === id) { clearInterval(this.timerInterval); this.timerInterval = null; this.activeTaskId = null; }
        const tasks = (Core.Storage.get('pd_tasks') || []).filter(t => t.id !== id);
        Core.Storage.set('pd_tasks', tasks);
        this.loadData();
    },

    showRandomQuote() {
        const el = document.getElementById('pd-quote');
        if (el) el.textContent = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 11. ComparisonBlocker
// ─────────────────────────────────────────────────────────────────────────────
window.ComparisonBlocker = {
    perspectiveShifts: [
        'You are comparing your behind-the-scenes to their highlight reel.',
        'Every person you compare yourself to has private struggles you cannot see.',
        'Your path has a different timeline — not a worse one.',
        'Comparison is a measurement error: you are measuring apples against oranges.',
        'Their success does not diminish yours. The world is not a zero-sum game.',
        'You likely have strengths they quietly envy.',
        'Progress is personal. The only valid comparison is you vs. you yesterday.',
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Comparison Blocker</h2>
                <p style="color:#666;margin-top:0;">Write a comparison thought. Get perspective shifts and gratitude reframes.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">The Comparison</h3>
                    <textarea id="cb-thought" placeholder='e.g. "They have a better job / more followers / a nicer home..."' rows="3" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:14px;resize:vertical;"></textarea>
                    <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">
                        <select id="cb-topic" style="flex:1;min-width:160px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                            <option value="career">Career / Success</option>
                            <option value="relationship">Relationships</option>
                            <option value="appearance">Appearance / Body</option>
                            <option value="lifestyle">Lifestyle / Possessions</option>
                            <option value="social">Social life / Popularity</option>
                            <option value="intelligence">Intelligence / Skill</option>
                            <option value="other">Other</option>
                        </select>
                        <button id="cb-block-btn" style="padding:9px 20px;background:#2c3e50;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Block This Comparison</button>
                    </div>
                </div>

                <div id="cb-result" style="display:none;">
                    <div style="background:#eaf4fb;border-radius:10px;padding:16px;margin-bottom:16px;">
                        <h3 style="margin-top:0;color:#2980b9;">Perspective Shifts</h3>
                        <div id="cb-perspectives"></div>
                    </div>
                    <div style="background:#eafaf1;border-radius:10px;padding:16px;margin-bottom:16px;">
                        <h3 style="margin-top:0;color:#27ae60;">Gratitude Reframes</h3>
                        <div id="cb-gratitude"></div>
                    </div>
                    <button id="cb-save-btn" style="padding:9px 20px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Save &amp; Clear</button>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Topic Stats</h3>
                        <div id="cb-stats"></div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">History</h3>
                        <div id="cb-history" style="font-size:13px;max-height:220px;overflow-y:auto;"></div>
                    </div>
                </div>
            </div>`;
        document.getElementById('cb-block-btn').addEventListener('click', () => this.blockComparison());
        document.getElementById('cb-save-btn').addEventListener('click', () => this.saveEntry());
        this.loadData();
    },

    getGratitudeItems(topic) {
        const map = {
            career:       ['a skill you have that took real effort to build', 'a moment this week when your work mattered', 'flexibility or freedom your current situation provides'],
            relationship: ['a person who genuinely cares about you right now', 'a moment of real connection you have had recently', 'the freedom to be yourself in at least one relationship'],
            appearance:   ['something your body can do that you are grateful for', 'a feature you have been complimented on', 'your health and the ability to move through the world'],
            lifestyle:    ['something in your home that brings you comfort', 'an experience you have had that money cannot fully replicate', 'a simple pleasure you can access today'],
            social:       ['at least one person who would show up for you in a crisis', 'a social interaction recently that felt genuine', 'the peace of not having to maintain a large social image'],
            intelligence: ['something you figured out on your own recently', 'a type of intelligence you possess that is undervalued', 'a skill you are actively developing right now'],
            other:        ['something working in your life right now', 'a personal quality you are proud of', 'one area where you have genuinely grown this year'],
        };
        return map[topic] || map.other;
    },

    blockComparison() {
        const thought = document.getElementById('cb-thought').value.trim();
        if (!thought) { Core.Toast.show('Describe the comparison.', 'warning'); return; }
        // Pick 3 random perspective shifts
        const shuffled = [...this.perspectiveShifts].sort(() => Math.random() - 0.5).slice(0, 3);
        document.getElementById('cb-perspectives').innerHTML = shuffled.map((p, i) =>
            `<div style="background:#fff;border-radius:6px;padding:10px;margin-bottom:8px;border-left:4px solid #3498db;">
                <div style="font-size:12px;color:#3498db;font-weight:bold;margin-bottom:4px;">Shift ${i+1}</div>
                <div style="font-size:14px;">${p}</div>
            </div>`).join('');
        const topic = document.getElementById('cb-topic').value;
        const grats = this.getGratitudeItems(topic);
        document.getElementById('cb-gratitude').innerHTML = grats.map((g, i) =>
            `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;">
                <span style="color:#27ae60;font-size:18px;">&#10003;</span>
                <div style="font-size:14px;">I am grateful for <em>${g}</em>.</div>
            </div>`).join('');
        document.getElementById('cb-result').style.display = 'block';
    },

    saveEntry() {
        const thought = document.getElementById('cb-thought').value.trim();
        const topic = document.getElementById('cb-topic').value;
        const history = Core.Storage.get('cb_history') || [];
        history.unshift({ ts: Date.now(), thought, topic });
        Core.Storage.set('cb_history', history.slice(0, 100));
        document.getElementById('cb-thought').value = '';
        document.getElementById('cb-result').style.display = 'none';
        Core.Toast.show('Comparison blocked and saved.', 'success');
        this.loadData();
    },

    loadData() {
        const history = Core.Storage.get('cb_history') || [];
        const counts = {};
        history.forEach(e => { counts[e.topic] = (counts[e.topic] || 0) + 1; });
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const statsEl = document.getElementById('cb-stats');
        if (statsEl) {
            if (sorted.length === 0) { statsEl.innerHTML = '<p style="color:#888;font-size:13px;">No data yet.</p>'; }
            else {
                const max = sorted[0][1];
                statsEl.innerHTML = sorted.map(([t, c]) => `
                    <div style="margin-bottom:6px;font-size:13px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:2px;"><span>${t}</span><span>${c}</span></div>
                        <div style="background:#ddd;border-radius:4px;height:7px;"><div style="width:${Math.round(c/max*100)}%;background:#2c3e50;height:7px;border-radius:4px;"></div></div>
                    </div>`).join('');
            }
        }
        const histEl = document.getElementById('cb-history');
        if (histEl) {
            histEl.innerHTML = history.length === 0 ? '<p style="color:#888;">No history.</p>' :
                history.slice(0, 25).map(e => `
                    <div style="border-bottom:1px solid #eee;padding:6px 0;">
                        <div style="font-size:11px;color:#aaa;">${new Date(e.ts).toLocaleString()} — ${e.topic}</div>
                        <div style="font-size:13px;color:#444;font-style:italic;">"${this.escHtml(e.thought)}"</div>
                    </div>`).join('');
        }
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. PermissionSlipGenerator
// ─────────────────────────────────────────────────────────────────────────────
window.PermissionSlipGenerator = {
    presets: [
        { activity: 'rest without guilt', color: '#9b59b6' },
        { activity: 'say no to something today', color: '#e74c3c' },
        { activity: 'take a break from being productive', color: '#27ae60' },
        { activity: 'feel sad without trying to fix it', color: '#3498db' },
        { activity: 'ask for help', color: '#f39c12' },
        { activity: 'change my mind', color: '#1abc9c' },
        { activity: 'not have all the answers', color: '#e67e22' },
        { activity: 'take up space and have needs', color: '#c0392b' },
        { activity: 'do something just for fun', color: '#8e44ad' },
        { activity: 'be a work in progress', color: '#2980b9' },
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Permission Slip Generator</h2>
                <p style="color:#666;margin-top:0;">Create and collect official permission slips for self-care and self-compassion.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Create a Permission Slip</h3>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
                        <input id="psg-name" type="text" placeholder="Your name..." style="flex:1;min-width:140px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                        <input id="psg-activity" type="text" placeholder="Permission to... (e.g. rest, say no)" style="flex:2;min-width:200px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                        <input id="psg-color" type="color" value="#9b59b6" style="padding:4px;border:1px solid #ccc;border-radius:6px;height:40px;width:50px;">
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button id="psg-generate-btn" style="padding:9px 18px;background:#9b59b6;color:#fff;border:none;border-radius:6px;cursor:pointer;">Generate</button>
                        <button id="psg-random-btn" style="padding:9px 18px;background:#3498db;color:#fff;border:none;border-radius:6px;cursor:pointer;">Random Slip</button>
                        <button id="psg-random-saved-btn" style="padding:9px 18px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Show Saved Slip</button>
                    </div>
                </div>

                <div id="psg-slip-display" style="margin-bottom:16px;"></div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                    <h3 style="margin-top:0;">My Collection (<span id="psg-count">0</span> slips)</h3>
                    <div id="psg-collection" style="display:flex;flex-wrap:wrap;gap:10px;max-height:320px;overflow-y:auto;"></div>
                </div>
            </div>`;
        document.getElementById('psg-generate-btn').addEventListener('click', () => this.generateSlip());
        document.getElementById('psg-random-btn').addEventListener('click', () => this.randomPreset());
        document.getElementById('psg-random-saved-btn').addEventListener('click', () => this.showRandomSaved());
        this.loadData();
    },

    generateSlip(preset) {
        const name = preset ? (Core.Storage.get('psg_name') || 'You') : (document.getElementById('psg-name').value.trim() || 'You');
        const activity = preset ? preset.activity : document.getElementById('psg-activity').value.trim();
        const color = preset ? preset.color : document.getElementById('psg-color').value;
        if (!activity) { Core.Toast.show('Describe the permission.', 'warning'); return; }
        if (name && !preset) Core.Storage.set('psg_name', name);
        const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        this.renderSlip({ name, activity, color, date, id: Date.now() });
    },

    renderSlip(slip, save = true) {
        const el = document.getElementById('psg-slip-display');
        el.innerHTML = `
            <div id="psg-slip" style="background:linear-gradient(135deg, ${slip.color}22, ${slip.color}11);border:3px solid ${slip.color};border-radius:16px;padding:28px 32px;text-align:center;max-width:480px;margin:0 auto;position:relative;">
                <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${slip.color};margin-bottom:8px;font-weight:bold;">Official Permission Slip</div>
                <div style="font-size:28px;font-weight:bold;color:#2c3e50;margin-bottom:6px;">${this.escHtml(slip.name)}</div>
                <div style="font-size:15px;color:#555;margin-bottom:16px;">has full permission to</div>
                <div style="font-size:22px;font-weight:bold;color:${slip.color};margin-bottom:20px;font-style:italic;">${this.escHtml(slip.activity)}</div>
                <div style="border-top:2px solid ${slip.color}44;padding-top:12px;font-size:12px;color:#888;">
                    Issued: ${slip.date || new Date().toLocaleDateString()}<br>
                    <em>Signed with love and authority by: Yourself</em>
                </div>
            </div>
            <div style="text-align:center;margin-top:12px;display:flex;gap:10px;justify-content:center;">
                <button onclick="window.PermissionSlipGenerator.saveCurrentSlip()" style="padding:9px 20px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Save to Collection</button>
                <button onclick="window.print()" style="padding:9px 18px;background:#555;color:#fff;border:none;border-radius:6px;cursor:pointer;">Print</button>
            </div>`;
        this._currentSlip = slip;
    },

    saveCurrentSlip() {
        if (!this._currentSlip) return;
        const slips = Core.Storage.get('psg_slips') || [];
        slips.unshift({ ...this._currentSlip, savedTs: Date.now() });
        Core.Storage.set('psg_slips', slips.slice(0, 50));
        Core.Toast.show('Permission slip saved!', 'success');
        this.loadData();
    },

    randomPreset() {
        const p = this.presets[Math.floor(Math.random() * this.presets.length)];
        this.generateSlip(p);
    },

    showRandomSaved() {
        const slips = Core.Storage.get('psg_slips') || [];
        if (slips.length === 0) { Core.Toast.show('No saved slips yet.', 'info'); return; }
        const s = slips[Math.floor(Math.random() * slips.length)];
        this.renderSlip(s, false);
    },

    loadData() {
        const slips = Core.Storage.get('psg_slips') || [];
        document.getElementById('psg-count').textContent = slips.length;
        const el = document.getElementById('psg-collection');
        if (slips.length === 0) { el.innerHTML = '<p style="color:#888;font-size:13px;">No slips yet. Generate and save one!</p>'; return; }
        el.innerHTML = slips.map(s => `
            <div style="background:linear-gradient(135deg,${s.color}22,${s.color}11);border:2px solid ${s.color};border-radius:10px;padding:12px 16px;width:180px;text-align:center;position:relative;">
                <div style="font-size:10px;color:${s.color};letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Permission to</div>
                <div style="font-size:13px;color:${s.color};font-weight:bold;margin:6px 0;font-style:italic;">${this.escHtml(s.activity)}</div>
                <div style="font-size:11px;color:#888;">— ${this.escHtml(s.name)}</div>
                <button onclick="window.PermissionSlipGenerator.deleteSlip(${s.savedTs})" style="position:absolute;top:4px;right:6px;background:none;border:none;cursor:pointer;color:${s.color};font-size:14px;opacity:0.5;">x</button>
            </div>`).join('');
    },

    deleteSlip(savedTs) {
        const slips = (Core.Storage.get('psg_slips') || []).filter(s => s.savedTs !== savedTs);
        Core.Storage.set('psg_slips', slips);
        this.loadData();
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 13. CognitiveReframeTool
// ─────────────────────────────────────────────────────────────────────────────
window.CognitiveReframeTool = {
    distortions: {
        'all-or-nothing': {
            label: 'All-or-Nothing Thinking',
            description: 'Seeing things in black and white, with no middle ground.',
            reframes: [
                'What would a middle ground or partial success look like here?',
                'On a scale of 0-100, where does this actually fall — not just 0 or 100?',
                'What would you tell a friend who said this about themselves?',
            ],
        },
        'catastrophizing': {
            label: 'Catastrophizing',
            description: 'Expecting the worst possible outcome.',
            reframes: [
                'What is the most realistic outcome (not the worst, not the best)?',
                'Has a similar situation ever turned out better than you feared?',
                'If the worst happens, what would you do? You likely have more resources than you think.',
            ],
        },
        'mind-reading': {
            label: 'Mind Reading',
            description: 'Assuming you know what others think, usually negatively.',
            reframes: [
                'What evidence do you actually have for what they are thinking?',
                'What is another equally plausible reason for their behavior?',
                'Could you test this assumption by asking them directly?',
            ],
        },
        'fortune-telling': {
            label: 'Fortune Telling',
            description: 'Predicting a negative future as if it is certain.',
            reframes: [
                'How accurate have your negative predictions been in the past?',
                'What actions could change this predicted outcome?',
                'What would have to be true for things to go well?',
            ],
        },
        'emotional-reasoning': {
            label: 'Emotional Reasoning',
            description: 'Believing something is true because it feels true.',
            reframes: [
                'Feelings are real, but they are not always facts. What are the facts here?',
                'If you felt differently, would you interpret the situation the same way?',
                'Is there any objective evidence that contradicts this feeling?',
            ],
        },
        'should-statements': {
            label: 'Should Statements',
            description: 'Rigid rules about how you or others must behave.',
            reframes: [
                'Says who? Where did this "should" come from?',
                'What would happen if you replaced "should" with "it would be nice if"?',
                'Is this expectation realistic given all the circumstances?',
            ],
        },
        'labeling': {
            label: 'Labeling',
            description: 'Attaching a global negative label to yourself or others.',
            reframes: [
                'A specific behavior does not define an entire person. What specifically happened?',
                'Would you use this label to describe a friend in the same situation?',
                'What more accurate, specific, and compassionate description could you use?',
            ],
        },
        'personalization': {
            label: 'Personalization',
            description: 'Blaming yourself for things outside your control.',
            reframes: [
                'What other factors (besides you) contributed to this outcome?',
                'How much responsibility is actually yours vs. external circumstances?',
                'Are you holding yourself to a standard you would not apply to others?',
            ],
        },
        'overgeneralization': {
            label: 'Overgeneralization',
            description: 'Drawing broad conclusions from a single event.',
            reframes: [
                'Is this one instance truly representative of a pattern, or is it an outlier?',
                'What counter-examples exist that contradict this general conclusion?',
                'Replace "always/never" with specific language: "This time..." or "In this case..."',
            ],
        },
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:720px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Cognitive Reframe Tool</h2>
                <p style="color:#666;margin-top:0;">Identify negative automatic thoughts, name the distortion, get targeted reframes.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">The Automatic Thought</h3>
                    <textarea id="crt-thought" placeholder='Write the negative thought exactly as it appeared in your mind...' rows="3" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:14px;resize:vertical;"></textarea>
                    <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;align-items:center;">
                        <select id="crt-distortion" style="flex:1;min-width:220px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                            ${Object.entries(this.distortions).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}
                        </select>
                        <button id="crt-reframe-btn" style="padding:9px 20px;background:#8e44ad;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Get Reframes</button>
                    </div>
                    <div id="crt-distortion-desc" style="margin-top:10px;font-size:13px;color:#555;padding:8px;background:#fff;border-radius:6px;"></div>
                </div>

                <div id="crt-reframes-section" style="display:none;background:#f5eef8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;color:#8e44ad;">Reframes</h3>
                    <div id="crt-reframes-list"></div>
                    <textarea id="crt-new-thought" placeholder="Write a more balanced thought here..." rows="2" style="width:100%;box-sizing:border-box;padding:9px;border:1px solid #c39bd3;border-radius:6px;margin-top:12px;font-size:14px;resize:vertical;"></textarea>
                    <button id="crt-save-btn" style="margin-top:10px;padding:9px 20px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Save Entry</button>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Distortion Frequency</h3>
                        <div id="crt-freq-chart"></div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">History</h3>
                        <div id="crt-history" style="font-size:13px;max-height:220px;overflow-y:auto;"></div>
                    </div>
                </div>
            </div>`;
        document.getElementById('crt-distortion').addEventListener('change', () => this.showDistortionDesc());
        document.getElementById('crt-reframe-btn').addEventListener('click', () => this.showReframes());
        document.getElementById('crt-save-btn').addEventListener('click', () => this.saveEntry());
        this.showDistortionDesc();
        this.loadData();
    },

    showDistortionDesc() {
        const key = document.getElementById('crt-distortion').value;
        const d = this.distortions[key];
        const el = document.getElementById('crt-distortion-desc');
        if (el && d) el.textContent = d.description;
    },

    showReframes() {
        const thought = document.getElementById('crt-thought').value.trim();
        if (!thought) { Core.Toast.show('Write the automatic thought first.', 'warning'); return; }
        const key = document.getElementById('crt-distortion').value;
        const d = this.distortions[key];
        const section = document.getElementById('crt-reframes-section');
        section.style.display = 'block';
        document.getElementById('crt-reframes-list').innerHTML = d.reframes.map((r, i) => `
            <div style="background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;border-left:4px solid #8e44ad;">
                <div style="font-size:12px;color:#8e44ad;font-weight:bold;margin-bottom:4px;">Reframing Question ${i+1}</div>
                <div style="font-size:14px;line-height:1.6;">${r}</div>
            </div>`).join('');
    },

    saveEntry() {
        const thought = document.getElementById('crt-thought').value.trim();
        const key = document.getElementById('crt-distortion').value;
        const newThought = document.getElementById('crt-new-thought').value.trim();
        if (!thought) { Core.Toast.show('Nothing to save.', 'warning'); return; }
        const history = Core.Storage.get('crt_history') || [];
        history.unshift({ ts: Date.now(), thought, distortion: key, newThought });
        Core.Storage.set('crt_history', history.slice(0, 100));
        document.getElementById('crt-thought').value = '';
        document.getElementById('crt-new-thought').value = '';
        document.getElementById('crt-reframes-section').style.display = 'none';
        Core.Toast.show('Entry saved.', 'success');
        this.loadData();
    },

    loadData() {
        const history = Core.Storage.get('crt_history') || [];
        const counts = {};
        Object.keys(this.distortions).forEach(k => counts[k] = 0);
        history.forEach(e => { counts[e.distortion] = (counts[e.distortion] || 0) + 1; });
        const max = Math.max(...Object.values(counts), 1);
        document.getElementById('crt-freq-chart').innerHTML = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([k, c]) => `
                <div style="margin-bottom:5px;font-size:12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:2px;"><span>${this.distortions[k]?.label || k}</span><span>${c}</span></div>
                    <div style="background:#ddd;border-radius:4px;height:7px;"><div style="width:${Math.round(c/max*100)}%;background:#8e44ad;height:7px;border-radius:4px;"></div></div>
                </div>`).join('');
        const histEl = document.getElementById('crt-history');
        histEl.innerHTML = history.length === 0 ? '<p style="color:#888;">No entries yet.</p>' :
            history.slice(0, 20).map(e => `
                <div style="border-bottom:1px solid #eee;padding:8px 0;">
                    <div style="font-size:11px;color:#aaa;">${new Date(e.ts).toLocaleString()}</div>
                    <div style="font-size:12px;color:#8e44ad;font-weight:500;">${this.distortions[e.distortion]?.label || e.distortion}</div>
                    <div style="font-size:13px;font-style:italic;color:#555;">"${this.escHtml(e.thought)}"</div>
                    ${e.newThought ? `<div style="font-size:12px;color:#27ae60;margin-top:3px;">Reframe: "${this.escHtml(e.newThought)}"</div>` : ''}
                </div>`).join('');
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 14. PersonalRitualBuilder
// ─────────────────────────────────────────────────────────────────────────────
window.PersonalRitualBuilder = {
    timerInterval: null,
    timerState: null, // { stepIdx, remaining, running }

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:740px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Personal Ritual Builder</h2>
                <p style="color:#666;margin-top:0;">Build morning, transition, and evening rituals with timed steps. Follow along live.</p>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                            <h3 style="margin-top:0;">Create a Ritual</h3>
                            <div style="display:flex;gap:8px;margin-bottom:10px;">
                                <input id="prb-ritual-name" type="text" placeholder="Ritual name..." style="flex:1;padding:9px;border:1px solid #ccc;border-radius:6px;">
                                <select id="prb-ritual-type" style="padding:9px;border:1px solid #ccc;border-radius:6px;">
                                    <option value="morning">Morning</option>
                                    <option value="transition">Transition</option>
                                    <option value="evening">Evening</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <button id="prb-create-ritual-btn" style="padding:9px 18px;background:#2c3e50;color:#fff;border:none;border-radius:6px;cursor:pointer;width:100%;">Create Ritual</button>
                        </div>

                        <div id="prb-ritual-list" style="display:flex;flex-direction:column;gap:10px;"></div>
                    </div>

                    <div>
                        <div id="prb-editor" style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;display:none;">
                            <h3 id="prb-editor-title" style="margin-top:0;"></h3>
                            <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
                                <input id="prb-step-name" type="text" placeholder="Step name..." style="flex:1;min-width:120px;padding:8px;border:1px solid #ccc;border-radius:6px;">
                                <input id="prb-step-duration" type="number" min="1" max="120" value="5" placeholder="min" style="width:70px;padding:8px;border:1px solid #ccc;border-radius:6px;">
                                <button id="prb-add-step-btn" style="padding:8px 14px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Add Step</button>
                            </div>
                            <div id="prb-steps-list"></div>
                        </div>

                        <div id="prb-runner" style="background:#f8f8f8;border-radius:10px;padding:16px;display:none;">
                            <h3 id="prb-runner-title" style="margin-top:0;"></h3>
                            <div id="prb-runner-step" style="text-align:center;margin:16px 0;">
                                <div id="prb-runner-step-name" style="font-size:22px;font-weight:bold;color:#2c3e50;"></div>
                                <div id="prb-runner-step-num" style="font-size:13px;color:#888;margin-top:4px;"></div>
                                <div id="prb-runner-timer" style="font-size:52px;font-weight:bold;color:#e74c3c;margin:14px 0;font-variant-numeric:tabular-nums;"></div>
                                <div id="prb-runner-progress" style="background:#eee;border-radius:8px;height:10px;margin-bottom:16px;">
                                    <div id="prb-runner-bar" style="background:#27ae60;height:10px;border-radius:8px;width:0%;transition:width .5s;"></div>
                                </div>
                            </div>
                            <div style="display:flex;gap:8px;justify-content:center;">
                                <button id="prb-start-btn" style="padding:10px 20px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Start</button>
                                <button id="prb-next-btn" style="padding:10px 20px;background:#3498db;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Next Step</button>
                                <button id="prb-stop-btn" style="padding:10px 16px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Stop</button>
                            </div>
                            <div id="prb-runner-log" style="margin-top:14px;font-size:12px;color:#888;"></div>
                        </div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-top:16px;">
                    <h3 style="margin-top:0;">Completion History</h3>
                    <div id="prb-completion-history" style="font-size:13px;max-height:180px;overflow-y:auto;"></div>
                </div>
            </div>`;
        document.getElementById('prb-create-ritual-btn').addEventListener('click', () => this.createRitual());
        document.getElementById('prb-add-step-btn').addEventListener('click', () => this.addStep());
        document.getElementById('prb-start-btn').addEventListener('click', () => this.startRitual());
        document.getElementById('prb-next-btn').addEventListener('click', () => this.nextStep());
        document.getElementById('prb-stop-btn').addEventListener('click', () => this.stopRitual());
        this.loadData();
    },

    createRitual() {
        const name = document.getElementById('prb-ritual-name').value.trim();
        const type = document.getElementById('prb-ritual-type').value;
        if (!name) { Core.Toast.show('Enter a ritual name.', 'warning'); return; }
        const rituals = Core.Storage.get('prb_rituals') || [];
        const ritual = { id: Date.now(), name, type, steps: [], completions: 0 };
        rituals.push(ritual);
        Core.Storage.set('prb_rituals', rituals);
        document.getElementById('prb-ritual-name').value = '';
        Core.Toast.show('Ritual created.', 'success');
        this.loadData();
        this.openEditor(ritual.id);
    },

    openEditor(id) {
        const rituals = Core.Storage.get('prb_rituals') || [];
        const ritual = rituals.find(r => r.id === id);
        if (!ritual) return;
        this._editingId = id;
        document.getElementById('prb-editor').style.display = 'block';
        document.getElementById('prb-runner').style.display = 'none';
        document.getElementById('prb-editor-title').textContent = `Steps for: ${ritual.name}`;
        this.renderStepsList(ritual);
    },

    addStep() {
        const name = document.getElementById('prb-step-name').value.trim();
        const dur = parseInt(document.getElementById('prb-step-duration').value) || 5;
        if (!name) { Core.Toast.show('Enter step name.', 'warning'); return; }
        const rituals = Core.Storage.get('prb_rituals') || [];
        const ritual = rituals.find(r => r.id === this._editingId);
        if (!ritual) return;
        ritual.steps.push({ id: Date.now(), name, duration: dur });
        Core.Storage.set('prb_rituals', rituals);
        document.getElementById('prb-step-name').value = '';
        this.renderStepsList(ritual);
    },

    deleteStep(ritualId, stepId) {
        const rituals = Core.Storage.get('prb_rituals') || [];
        const ritual = rituals.find(r => r.id === ritualId);
        if (!ritual) return;
        ritual.steps = ritual.steps.filter(s => s.id !== stepId);
        Core.Storage.set('prb_rituals', rituals);
        this.renderStepsList(ritual);
    },

    renderStepsList(ritual) {
        const el = document.getElementById('prb-steps-list');
        if (ritual.steps.length === 0) { el.innerHTML = '<p style="color:#888;font-size:13px;">No steps yet. Add one above.</p>'; return; }
        el.innerHTML = ritual.steps.map((s, i) => `
            <div style="background:#fff;border-radius:7px;padding:9px 12px;margin-bottom:6px;display:flex;align-items:center;gap:10px;">
                <span style="color:#888;font-size:13px;min-width:20px;">${i+1}.</span>
                <span style="flex:1;font-size:14px;">${this.escHtml(s.name)}</span>
                <span style="font-size:13px;color:#3498db;font-weight:500;">${s.duration} min</span>
                <button onclick="window.PersonalRitualBuilder.deleteStep(${ritual.id},${s.id})" style="background:none;border:none;cursor:pointer;color:#ccc;font-size:15px;">x</button>
            </div>`).join('');
    },

    openRunner(id) {
        const rituals = Core.Storage.get('prb_rituals') || [];
        const ritual = rituals.find(r => r.id === id);
        if (!ritual || ritual.steps.length === 0) { Core.Toast.show('Add steps to this ritual first.', 'warning'); return; }
        this._runningRitual = ritual;
        this.timerState = { stepIdx: 0, remaining: ritual.steps[0].duration * 60, running: false, totalDuration: ritual.steps[0].duration * 60 };
        document.getElementById('prb-editor').style.display = 'none';
        document.getElementById('prb-runner').style.display = 'block';
        document.getElementById('prb-runner-title').textContent = ritual.name;
        this.updateRunnerDisplay();
    },

    startRitual() {
        if (!this.timerState) return;
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerState.running = true;
        this.timerInterval = setInterval(() => {
            if (!this.timerState) return;
            this.timerState.remaining--;
            if (this.timerState.remaining <= 0) {
                this.timerState.remaining = 0;
                this.updateRunnerDisplay();
                this.nextStep(true);
            } else {
                this.updateRunnerDisplay();
            }
        }, 1000);
        document.getElementById('prb-start-btn').textContent = 'Running...';
        document.getElementById('prb-start-btn').style.background = '#aaa';
    },

    nextStep(auto = false) {
        if (!this.timerState || !this._runningRitual) return;
        const ritual = this._runningRitual;
        const nextIdx = this.timerState.stepIdx + 1;
        if (nextIdx >= ritual.steps.length) {
            this.completeRitual();
            return;
        }
        this.timerState.stepIdx = nextIdx;
        this.timerState.remaining = ritual.steps[nextIdx].duration * 60;
        this.timerState.totalDuration = ritual.steps[nextIdx].duration * 60;
        if (!auto) {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.timerState.running = false;
            document.getElementById('prb-start-btn').textContent = 'Start';
            document.getElementById('prb-start-btn').style.background = '#27ae60';
        } else {
            this.startRitual();
        }
        this.updateRunnerDisplay();
    },

    completeRitual() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = null;
        const ritual = this._runningRitual;
        const log = Core.Storage.get('prb_completions') || [];
        log.unshift({ ts: Date.now(), ritualId: ritual.id, ritualName: ritual.name });
        Core.Storage.set('prb_completions', log.slice(0, 200));
        const rituals = Core.Storage.get('prb_rituals') || [];
        const r = rituals.find(x => x.id === ritual.id);
        if (r) { r.completions = (r.completions || 0) + 1; Core.Storage.set('prb_rituals', r); }
        Core.Toast.show(`Ritual "${ritual.name}" complete! Great work.`, 'success');
        document.getElementById('prb-runner-log').innerHTML = '<strong style="color:#27ae60;">Ritual complete!</strong>';
        document.getElementById('prb-runner').style.display = 'none';
        this.timerState = null;
        this._runningRitual = null;
        this.loadData();
    },

    stopRitual() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.timerState = null;
        this._runningRitual = null;
        document.getElementById('prb-runner').style.display = 'none';
        Core.Toast.show('Ritual stopped.', 'info');
    },

    updateRunnerDisplay() {
        if (!this.timerState || !this._runningRitual) return;
        const ritual = this._runningRitual;
        const step = ritual.steps[this.timerState.stepIdx];
        const m = Math.floor(this.timerState.remaining / 60);
        const s = this.timerState.remaining % 60;
        document.getElementById('prb-runner-step-name').textContent = step.name;
        document.getElementById('prb-runner-step-num').textContent = `Step ${this.timerState.stepIdx + 1} of ${ritual.steps.length}`;
        document.getElementById('prb-runner-timer').textContent = `${m}:${String(s).padStart(2,'0')}`;
        const pct = this.timerState.totalDuration > 0 ? Math.round(((this.timerState.totalDuration - this.timerState.remaining) / this.timerState.totalDuration) * 100) : 0;
        document.getElementById('prb-runner-bar').style.width = pct + '%';
        document.getElementById('prb-runner-timer').style.color = this.timerState.remaining < 30 ? '#e74c3c' : '#2c3e50';
    },

    deleteRitual(id) {
        if (this._runningRitual && this._runningRitual.id === id) this.stopRitual();
        const rituals = (Core.Storage.get('prb_rituals') || []).filter(r => r.id !== id);
        Core.Storage.set('prb_rituals', rituals);
        this.loadData();
    },

    loadData() {
        const rituals = Core.Storage.get('prb_rituals') || [];
        const typeColors = { morning: '#f39c12', transition: '#3498db', evening: '#9b59b6', custom: '#27ae60' };
        const el = document.getElementById('prb-ritual-list');
        if (rituals.length === 0) { el.innerHTML = '<p style="color:#888;font-size:13px;">No rituals yet. Create one!</p>'; }
        else {
            el.innerHTML = rituals.map(r => {
                const totalMin = r.steps.reduce((s, step) => s + step.duration, 0);
                const color = typeColors[r.type] || '#888';
                return `<div style="background:#f8f8f8;border-radius:10px;padding:14px;border-left:4px solid ${color};">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                        <div>
                            <div style="font-size:15px;font-weight:bold;">${this.escHtml(r.name)}</div>
                            <div style="font-size:12px;color:#888;">${r.type} | ${r.steps.length} steps | ${totalMin} min | Completed: ${r.completions || 0}x</div>
                        </div>
                        <button onclick="window.PersonalRitualBuilder.deleteRitual(${r.id})" style="background:none;border:none;cursor:pointer;color:#ccc;font-size:16px;">x</button>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button onclick="window.PersonalRitualBuilder.openEditor(${r.id})" style="flex:1;padding:7px;background:#eee;border:none;border-radius:5px;cursor:pointer;font-size:13px;">Edit Steps</button>
                        <button onclick="window.PersonalRitualBuilder.openRunner(${r.id})" style="flex:1;padding:7px;background:${color};color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:13px;">Start Ritual</button>
                    </div>
                </div>`;
            }).join('');
        }
        // Completion history
        const completions = Core.Storage.get('prb_completions') || [];
        const histEl = document.getElementById('prb-completion-history');
        histEl.innerHTML = completions.length === 0 ? '<p style="color:#888;">No completions yet.</p>' :
            completions.slice(0, 20).map(c => `
                <div style="border-bottom:1px solid #eee;padding:6px 0;font-size:13px;">
                    <span style="color:#27ae60;font-weight:500;">&#10003; ${this.escHtml(c.ritualName)}</span>
                    <span style="color:#aaa;margin-left:12px;font-size:11px;">${new Date(c.ts).toLocaleString()}</span>
                </div>`).join('');
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};
