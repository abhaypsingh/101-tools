// Wellness Tools - Part 1 of 2
// Tools: StressSignalDecoder, EnergyInvestmentPortfolio, SmallWinCollector,
//        BoundaryVisualizer, EmotionThermometer, HabitBreaker, GuiltLiberator

// ─────────────────────────────────────────────────────────────────────────────
// 1. StressSignalDecoder
// ─────────────────────────────────────────────────────────────────────────────
window.StressSignalDecoder = {
    signals: [
        { id: 'headache',     label: 'Headache',           relief: 'Apply a cold or warm compress to your forehead. Try slow neck rolls and drink a full glass of water.' },
        { id: 'shoulders',    label: 'Tight shoulders',    relief: 'Roll shoulders backward 10 times. Try the "ear-to-shoulder" stretch, holding 20 seconds each side.' },
        { id: 'jaw',          label: 'Jaw clenching',      relief: 'Place your tongue on the roof of your mouth. Let your teeth part slightly. Massage jaw muscles in circles.' },
        { id: 'stomach',      label: 'Stomach issues',     relief: 'Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s. Avoid caffeine and drink peppermint tea.' },
        { id: 'heartrate',    label: 'Rapid heartbeat',    relief: 'Activate the dive reflex: splash cold water on your face or hold ice cubes. Breathe out slowly through pursed lips.' },
        { id: 'breathing',    label: 'Shallow breathing',  relief: 'Place one hand on your belly. Breathe so only that hand moves. Inhale for 4 counts, exhale for 6 counts.' },
        { id: 'fatigue',      label: 'Sudden fatigue',     relief: 'Step outside for 5 minutes of daylight. Do 20 jumping jacks to reset your alertness level.' },
        { id: 'irritability', label: 'Irritability',       relief: 'Name 5 things you can see right now. Ground yourself in the present before responding to anything.' },
        { id: 'hands',        label: 'Cold/sweaty hands',  relief: 'Rub your hands together briskly for 30 seconds. This activates the parasympathetic nervous system.' },
        { id: 'concentration',label: 'Poor concentration', relief: 'Take a 5-minute break from screens. Focus on a distant object. Try the Pomodoro technique for your next task.' },
        { id: 'appetite',     label: 'Appetite change',    relief: 'Eat small, balanced snacks every 3–4 hours to stabilize blood sugar. Avoid skipping meals when stressed.' },
        { id: 'sleep',        label: 'Sleep disturbance',  relief: 'Write tomorrow\'s tasks down before bed to offload mental load. Keep your room cool (65–68 °F / 18–20 °C).' },
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:720px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Stress Signal Decoder</h2>
                <p style="color:#666;margin-top:0;">Check every signal you notice right now, then log the entry.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Today's Signals</h3>
                    <div id="ssd-signal-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;"></div>
                    <button id="ssd-log-btn" style="margin-top:14px;padding:10px 24px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:15px;">Log Entry</button>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Frequency Chart</h3>
                        <div id="ssd-freq-chart"></div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Pattern Insights</h3>
                        <div id="ssd-patterns" style="font-size:14px;color:#444;"></div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-top:16px;">
                    <h3 style="margin-top:0;">Targeted Relief</h3>
                    <div id="ssd-relief"></div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-top:16px;">
                    <h3 style="margin-top:0;">Recent Log</h3>
                    <div id="ssd-log-list" style="font-size:13px;max-height:220px;overflow-y:auto;"></div>
                    <button id="ssd-clear-btn" style="margin-top:10px;padding:6px 16px;background:#aaa;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Clear All Data</button>
                </div>
            </div>`;
        this.renderSignalGrid();
        this.loadData();
        this.attachEvents();
    },

    renderSignalGrid() {
        const grid = document.getElementById('ssd-signal-grid');
        grid.innerHTML = this.signals.map(s => `
            <label style="display:flex;align-items:center;gap:8px;background:#fff;border-radius:8px;padding:10px;cursor:pointer;border:2px solid transparent;" id="ssd-lbl-${s.id}">
                <input type="checkbox" id="ssd-${s.id}" style="width:18px;height:18px;cursor:pointer;">
                <span style="font-size:14px;">${s.label}</span>
            </label>`).join('');

        this.signals.forEach(s => {
            const cb = document.getElementById(`ssd-${s.id}`);
            cb.addEventListener('change', () => this.updateRelief());
        });
    },

    attachEvents() {
        document.getElementById('ssd-log-btn').addEventListener('click', () => this.logEntry());
        document.getElementById('ssd-clear-btn').addEventListener('click', () => {
            if (confirm('Clear all stress signal data?')) {
                Core.Storage.set('ssd_log', []);
                this.loadData();
                Core.Toast.show('Data cleared.', 'info');
            }
        });
    },

    getChecked() {
        return this.signals.filter(s => document.getElementById(`ssd-${s.id}`)?.checked).map(s => s.id);
    },

    logEntry() {
        const checked = this.getChecked();
        if (checked.length === 0) { Core.Toast.show('Check at least one signal.', 'warning'); return; }
        const log = Core.Storage.get('ssd_log') || [];
        const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        log.unshift({ ts: Date.now(), day, signals: checked });
        Core.Storage.set('ssd_log', log);
        // uncheck all
        this.signals.forEach(s => { const cb = document.getElementById(`ssd-${s.id}`); if (cb) cb.checked = false; });
        Core.Toast.show('Stress entry logged.', 'success');
        this.loadData();
    },

    loadData() {
        const log = Core.Storage.get('ssd_log') || [];
        this.renderFreqChart(log);
        this.renderPatterns(log);
        this.renderLogList(log);
        this.updateRelief();
    },

    renderFreqChart(log) {
        const counts = {};
        this.signals.forEach(s => counts[s.id] = 0);
        log.forEach(e => e.signals.forEach(id => counts[id]++));
        const max = Math.max(...Object.values(counts), 1);
        const el = document.getElementById('ssd-freq-chart');
        el.innerHTML = this.signals.map(s => {
            const pct = Math.round((counts[s.id] / max) * 100);
            const color = pct > 66 ? '#e74c3c' : pct > 33 ? '#e67e22' : '#3498db';
            return `<div style="margin-bottom:6px;">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px;">
                    <span>${s.label}</span><span>${counts[s.id]}</span>
                </div>
                <div style="background:#ddd;border-radius:4px;height:8px;">
                    <div style="width:${pct}%;background:${color};height:8px;border-radius:4px;transition:width .4s;"></div>
                </div>
            </div>`;
        }).join('');
    },

    renderPatterns(log) {
        const el = document.getElementById('ssd-patterns');
        if (log.length < 3) { el.innerHTML = '<p style="color:#888;">Log at least 3 entries to see patterns.</p>'; return; }
        // Day-of-week analysis
        const byDay = {};
        log.forEach(e => {
            if (!byDay[e.day]) byDay[e.day] = [];
            e.signals.forEach(id => byDay[e.day].push(id));
        });
        // Signal frequency
        const sigCount = {};
        this.signals.forEach(s => sigCount[s.id] = 0);
        log.forEach(e => e.signals.forEach(id => sigCount[id]++));
        const topSig = Object.entries(sigCount).sort((a, b) => b[1] - a[1])[0];
        const topSigLabel = this.signals.find(s => s.id === topSig[0])?.label || topSig[0];
        // Most stressful day
        const dayTotals = Object.entries(byDay).map(([day, sigs]) => ({ day, count: sigs.length }));
        dayTotals.sort((a, b) => b.count - a.count);
        const insights = [`<p>Your most frequent signal: <strong>${topSigLabel}</strong> (${topSig[1]} times).</p>`];
        if (dayTotals.length > 0) insights.push(`<p>Most stressful day pattern: <strong>${dayTotals[0].day}</strong>.</p>`);
        // Signal co-occurrence
        const coFreq = {};
        log.forEach(e => {
            if (e.signals.length > 1) {
                const key = e.signals.slice().sort().join('+');
                coFreq[key] = (coFreq[key] || 0) + 1;
            }
        });
        const topPair = Object.entries(coFreq).sort((a, b) => b[1] - a[1])[0];
        if (topPair && topPair[1] > 1) {
            const ids = topPair[0].split('+');
            const names = ids.map(id => this.signals.find(s => s.id === id)?.label || id).join(' + ');
            insights.push(`<p>Often occur together: <strong>${names}</strong>.</p>`);
        }
        el.innerHTML = insights.join('');
    },

    renderLogList(log) {
        const el = document.getElementById('ssd-log-list');
        if (log.length === 0) { el.innerHTML = '<p style="color:#888;">No entries yet.</p>'; return; }
        el.innerHTML = log.slice(0, 20).map(e => {
            const labels = e.signals.map(id => this.signals.find(s => s.id === id)?.label || id).join(', ');
            const date = new Date(e.ts).toLocaleString();
            return `<div style="border-bottom:1px solid #ddd;padding:6px 0;"><span style="color:#888;font-size:11px;">${date} — ${e.day}</span><br>${labels}</div>`;
        }).join('');
    },

    updateRelief() {
        const checked = this.getChecked();
        const el = document.getElementById('ssd-relief');
        if (!el) return;
        if (checked.length === 0) { el.innerHTML = '<p style="color:#888;">Check signals above to see targeted relief suggestions.</p>'; return; }
        el.innerHTML = checked.map(id => {
            const sig = this.signals.find(s => s.id === id);
            return sig ? `<div style="background:#fff;border-left:4px solid #e74c3c;border-radius:6px;padding:10px;margin-bottom:10px;">
                <strong>${sig.label}</strong>
                <p style="margin:6px 0 0;font-size:14px;">${sig.relief}</p>
            </div>` : '';
        }).join('');
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. EnergyInvestmentPortfolio
// ─────────────────────────────────────────────────────────────────────────────
window.EnergyInvestmentPortfolio = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:720px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Energy Investment Portfolio</h2>
                <p style="color:#666;margin-top:0;">Rate activities from -5 (drains you) to +5 (energizes you).</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Add Activity</h3>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <input id="eip-name" type="text" placeholder="Activity name..." style="flex:1;min-width:180px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                        <select id="eip-category" style="padding:9px;border:1px solid #ccc;border-radius:6px;">
                            <option value="work">Work</option>
                            <option value="social">Social</option>
                            <option value="health">Health</option>
                            <option value="hobby">Hobby</option>
                            <option value="chore">Chore</option>
                            <option value="other">Other</option>
                        </select>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <input id="eip-rating" type="range" min="-5" max="5" value="0" step="1" style="width:120px;">
                            <span id="eip-rating-display" style="font-weight:bold;min-width:28px;text-align:center;">0</span>
                        </div>
                        <button id="eip-add-btn" style="padding:9px 20px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Add</button>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;color:#27ae60;">Investments (+)</h3>
                        <div id="eip-investments"></div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;color:#e74c3c;">Expenses (-)</h3>
                        <div id="eip-expenses"></div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Portfolio ROI</h3>
                        <div id="eip-roi" style="text-align:center;"></div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Energy Breakdown</h3>
                        <canvas id="eip-chart" width="220" height="220" style="display:block;margin:0 auto;"></canvas>
                    </div>
                </div>

                <div style="background:#fff3cd;border-radius:10px;padding:16px;margin-top:16px;">
                    <h3 style="margin-top:0;">Rebalancing Advice</h3>
                    <div id="eip-advice" style="font-size:14px;"></div>
                </div>
            </div>`;

        document.getElementById('eip-rating').addEventListener('input', function () {
            const v = parseInt(this.value);
            document.getElementById('eip-rating-display').textContent = v > 0 ? `+${v}` : `${v}`;
        });
        document.getElementById('eip-add-btn').addEventListener('click', () => this.addActivity());
        this.loadData();
    },

    addActivity() {
        const name = document.getElementById('eip-name').value.trim();
        const category = document.getElementById('eip-category').value;
        const rating = parseInt(document.getElementById('eip-rating').value);
        if (!name) { Core.Toast.show('Enter an activity name.', 'warning'); return; }
        const items = Core.Storage.get('eip_items') || [];
        items.push({ id: Date.now(), name, category, rating });
        Core.Storage.set('eip_items', items);
        document.getElementById('eip-name').value = '';
        document.getElementById('eip-rating').value = 0;
        document.getElementById('eip-rating-display').textContent = '0';
        Core.Toast.show('Activity added.', 'success');
        this.loadData();
    },

    deleteActivity(id) {
        const items = (Core.Storage.get('eip_items') || []).filter(i => i.id !== id);
        Core.Storage.set('eip_items', items);
        this.loadData();
    },

    loadData() {
        const items = Core.Storage.get('eip_items') || [];
        const investments = items.filter(i => i.rating > 0).sort((a, b) => b.rating - a.rating);
        const expenses = items.filter(i => i.rating < 0).sort((a, b) => a.rating - b.rating);
        const neutral = items.filter(i => i.rating === 0);

        const renderList = (list) => list.length === 0 ? '<p style="color:#888;font-size:13px;">None yet.</p>' :
            list.map(i => {
                const color = i.rating > 0 ? '#27ae60' : '#e74c3c';
                const badge = i.rating > 0 ? `+${i.rating}` : `${i.rating}`;
                return `<div style="display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:6px;padding:8px 10px;margin-bottom:6px;">
                    <div>
                        <span style="font-size:14px;font-weight:500;">${i.name}</span>
                        <span style="font-size:11px;color:#888;margin-left:6px;">${i.category}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-weight:bold;color:${color};">${badge}</span>
                        <button onclick="window.EnergyInvestmentPortfolio.deleteActivity(${i.id})" style="background:none;border:none;cursor:pointer;color:#aaa;font-size:16px;">x</button>
                    </div>
                </div>`;
            }).join('');

        document.getElementById('eip-investments').innerHTML = renderList(investments);
        document.getElementById('eip-expenses').innerHTML = renderList(expenses);

        const totalPos = investments.reduce((s, i) => s + i.rating, 0);
        const totalNeg = expenses.reduce((s, i) => s + Math.abs(i.rating), 0);
        const roi = totalPos - totalNeg;
        const roiEl = document.getElementById('eip-roi');
        const roiColor = roi > 0 ? '#27ae60' : roi < 0 ? '#e74c3c' : '#888';
        roiEl.innerHTML = `
            <div style="font-size:48px;font-weight:bold;color:${roiColor};">${roi > 0 ? '+' : ''}${roi}</div>
            <p style="color:#666;font-size:13px;">Net energy ROI</p>
            <p style="font-size:13px;">Total in: <strong style="color:#27ae60;">+${totalPos}</strong> &nbsp; Total out: <strong style="color:#e74c3c;">-${totalNeg}</strong></p>`;

        this.drawPieChart(items);
        this.renderAdvice(roi, investments, expenses, neutral);
    },

    drawPieChart(items) {
        const canvas = document.getElementById('eip-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const cats = ['work', 'social', 'health', 'hobby', 'chore', 'other'];
        const colors = { work: '#3498db', social: '#9b59b6', health: '#27ae60', hobby: '#e67e22', chore: '#e74c3c', other: '#95a5a6' };
        const totals = {};
        cats.forEach(c => totals[c] = 0);
        items.forEach(i => { totals[i.category] = (totals[i.category] || 0) + Math.abs(i.rating) + 1; });
        const grand = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
        const cx = 110, cy = 110, r = 90;
        ctx.clearRect(0, 0, 220, 220);
        let start = -Math.PI / 2;
        cats.forEach(cat => {
            const slice = (totals[cat] / grand) * 2 * Math.PI;
            if (slice < 0.01) return;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, start, start + slice);
            ctx.closePath();
            ctx.fillStyle = colors[cat];
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Label
            const mid = start + slice / 2;
            const lx = cx + (r * 0.65) * Math.cos(mid);
            const ly = cy + (r * 0.65) * Math.sin(mid);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            if (slice > 0.3) ctx.fillText(cat, lx, ly);
            start += slice;
        });
    },

    renderAdvice(roi, investments, expenses) {
        const el = document.getElementById('eip-advice');
        const lines = [];
        if (expenses.length > investments.length) lines.push('You have more drains than sources of energy. Try to add at least one energizing activity per day.');
        if (roi < -5) lines.push('Your net energy is significantly negative. Prioritize reducing your highest-cost expenses first.');
        if (investments.length === 0) lines.push('You have no activities marked as energizing. Identify what genuinely gives you energy and protect time for it.');
        if (roi > 5) lines.push('Great portfolio! Your energy is net positive. Keep protecting these energizing activities.');
        if (lines.length === 0) lines.push('Your portfolio looks balanced. Keep tracking to stay aware of energy shifts.');
        el.innerHTML = lines.map(l => `<p style="margin:0 0 8px;">&#8226; ${l}</p>`).join('');
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SmallWinCollector
// ─────────────────────────────────────────────────────────────────────────────
window.SmallWinCollector = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <style>
                @keyframes swc-pop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2);} 100%{transform:scale(1);opacity:1} }
                @keyframes swc-float { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-60px)} }
            </style>
            <div style="max-width:680px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Small Win Collector</h2>
                <p style="color:#666;margin-top:0;">Every win counts. Log it, celebrate it, remember it.</p>

                <div style="background:#fffbf0;border-radius:10px;padding:16px;margin-bottom:16px;border:2px solid #f39c12;">
                    <div style="display:flex;gap:10px;">
                        <input id="swc-input" type="text" placeholder="What did you accomplish today, even if small?" style="flex:1;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:15px;">
                        <button id="swc-add-btn" style="padding:10px 20px;background:#f39c12;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:15px;font-weight:bold;">+ Win!</button>
                    </div>
                    <div id="swc-celebrate" style="height:48px;position:relative;overflow:hidden;"></div>
                </div>

                <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:12px 20px;flex:1;min-width:120px;text-align:center;">
                        <div id="swc-total" style="font-size:32px;font-weight:bold;color:#f39c12;">0</div>
                        <div style="font-size:12px;color:#888;">Total wins</div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:12px 20px;flex:1;min-width:120px;text-align:center;">
                        <div id="swc-streak" style="font-size:32px;font-weight:bold;color:#e74c3c;">0</div>
                        <div style="font-size:12px;color:#888;">Day streak</div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:12px 20px;flex:1;min-width:120px;text-align:center;">
                        <div id="swc-today" style="font-size:32px;font-weight:bold;color:#27ae60;">0</div>
                        <div style="font-size:12px;color:#888;">Today's wins</div>
                    </div>
                    <button id="swc-random-btn" style="padding:12px 16px;background:#9b59b6;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:13px;font-weight:bold;">Remind me of a win</button>
                </div>

                <div style="display:flex;gap:8px;margin-bottom:12px;">
                    <button class="swc-view-btn" data-view="day" style="padding:7px 16px;border:none;border-radius:6px;cursor:pointer;background:#f39c12;color:#fff;">Today</button>
                    <button class="swc-view-btn" data-view="week" style="padding:7px 16px;border:none;border-radius:6px;cursor:pointer;background:#eee;color:#444;">This week</button>
                    <button class="swc-view-btn" data-view="month" style="padding:7px 16px;border:none;border-radius:6px;cursor:pointer;background:#eee;color:#444;">This month</button>
                    <button class="swc-view-btn" data-view="all" style="padding:7px 16px;border:none;border-radius:6px;cursor:pointer;background:#eee;color:#444;">All time</button>
                </div>
                <div id="swc-list" style="max-height:320px;overflow-y:auto;"></div>

                <div id="swc-random-display" style="display:none;background:#9b59b6;color:#fff;border-radius:10px;padding:20px;margin-top:16px;text-align:center;font-size:17px;font-style:italic;"></div>
            </div>`;

        document.getElementById('swc-add-btn').addEventListener('click', () => this.addWin());
        document.getElementById('swc-input').addEventListener('keydown', e => { if (e.key === 'Enter') this.addWin(); });
        document.getElementById('swc-random-btn').addEventListener('click', () => this.showRandomWin());
        document.querySelectorAll('.swc-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.swc-view-btn').forEach(b => { b.style.background = '#eee'; b.style.color = '#444'; });
                btn.style.background = '#f39c12'; btn.style.color = '#fff';
                this.renderList(btn.dataset.view);
            });
        });
        this.loadData();
    },

    addWin() {
        const input = document.getElementById('swc-input');
        const text = input.value.trim();
        if (!text) { Core.Toast.show('Describe your win!', 'warning'); return; }
        const wins = Core.Storage.get('swc_wins') || [];
        wins.unshift({ id: Date.now(), text, ts: Date.now() });
        Core.Storage.set('swc_wins', wins);
        input.value = '';
        this.celebrate();
        Core.Toast.show('Win logged! Keep going!', 'success');
        this.loadData();
    },

    celebrate() {
        const container = document.getElementById('swc-celebrate');
        const emojis = ['🎉', '⭐', '🏆', '✨', '🌟', '💪', '🎊', '🥳'];
        for (let i = 0; i < 6; i++) {
            const span = document.createElement('span');
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.cssText = `position:absolute;font-size:24px;left:${10 + Math.random() * 80}%;animation:swc-float 1.2s ease-out forwards;animation-delay:${i * 0.1}s;`;
            container.appendChild(span);
            setTimeout(() => span.remove(), 1500);
        }
    },

    loadData() {
        const wins = Core.Storage.get('swc_wins') || [];
        document.getElementById('swc-total').textContent = wins.length;
        // Today count
        const todayStr = new Date().toDateString();
        const todayWins = wins.filter(w => new Date(w.ts).toDateString() === todayStr);
        document.getElementById('swc-today').textContent = todayWins.length;
        // Streak
        let streak = 0;
        const days = new Set(wins.map(w => new Date(w.ts).toDateString()));
        let d = new Date();
        while (days.has(d.toDateString())) {
            streak++;
            d.setDate(d.getDate() - 1);
        }
        document.getElementById('swc-streak').textContent = streak;
        this.renderList('day');
    },

    renderList(view) {
        const wins = Core.Storage.get('swc_wins') || [];
        const now = new Date();
        let filtered = wins;
        if (view === 'day') filtered = wins.filter(w => new Date(w.ts).toDateString() === now.toDateString());
        else if (view === 'week') {
            const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
            filtered = wins.filter(w => new Date(w.ts) >= weekAgo);
        } else if (view === 'month') {
            filtered = wins.filter(w => {
                const d = new Date(w.ts);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            });
        }
        const el = document.getElementById('swc-list');
        if (filtered.length === 0) { el.innerHTML = '<p style="color:#888;text-align:center;">No wins in this period yet.</p>'; return; }
        el.innerHTML = filtered.map(w => `
            <div style="display:flex;align-items:center;gap:10px;background:#fffbf0;border-radius:8px;padding:10px 14px;margin-bottom:8px;border-left:4px solid #f39c12;animation:swc-pop 0.3s ease;">
                <span style="font-size:20px;">⭐</span>
                <div style="flex:1;">
                    <div style="font-size:14px;">${this.escHtml(w.text)}</div>
                    <div style="font-size:11px;color:#aaa;">${new Date(w.ts).toLocaleString()}</div>
                </div>
                <button onclick="window.SmallWinCollector.deleteWin(${w.id})" style="background:none;border:none;cursor:pointer;color:#ccc;font-size:18px;">x</button>
            </div>`).join('');
    },

    deleteWin(id) {
        const wins = (Core.Storage.get('swc_wins') || []).filter(w => w.id !== id);
        Core.Storage.set('swc_wins', wins);
        this.loadData();
    },

    showRandomWin() {
        const wins = Core.Storage.get('swc_wins') || [];
        const el = document.getElementById('swc-random-display');
        if (wins.length === 0) { Core.Toast.show('Log some wins first!', 'info'); return; }
        const w = wins[Math.floor(Math.random() * wins.length)];
        el.style.display = 'block';
        el.innerHTML = `"${this.escHtml(w.text)}"<br><span style="font-size:12px;opacity:0.7;">${new Date(w.ts).toLocaleDateString()}</span>`;
    },

    escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. BoundaryVisualizer
// ─────────────────────────────────────────────────────────────────────────────
window.BoundaryVisualizer = {
    areas: [
        { id: 'work',     label: 'Work',     color: '#3498db' },
        { id: 'family',   label: 'Family',   color: '#e74c3c' },
        { id: 'social',   label: 'Social',   color: '#9b59b6' },
        { id: 'personal', label: 'Personal', color: '#27ae60' },
        { id: 'health',   label: 'Health',   color: '#f39c12' },
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:740px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Boundary Visualizer</h2>
                <p style="color:#666;margin-top:0;">Set boundary strength (0=none, 100=very strong) for each life area.</p>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                            <h3 style="margin-top:0;">Boundary Sliders</h3>
                            ${this.areas.map(a => `
                                <div style="margin-bottom:14px;">
                                    <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:500;margin-bottom:4px;">
                                        <span style="color:${a.color};">&#9632; ${a.label}</span>
                                        <span id="bv-val-${a.id}">50</span>
                                    </div>
                                    <input type="range" id="bv-${a.id}" min="0" max="100" value="50"
                                        style="width:100%;accent-color:${a.color};"
                                        oninput="window.BoundaryVisualizer.onSlider('${a.id}')">
                                </div>`).join('')}
                            <button id="bv-save-btn" style="padding:9px 20px;background:#2c3e50;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-top:4px;">Save Snapshot</button>
                        </div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                            <h3 style="margin-top:0;">Boundary Health</h3>
                            <div id="bv-health"></div>
                        </div>
                    </div>
                    <div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;text-align:center;margin-bottom:16px;">
                            <h3 style="margin-top:0;">Boundary Map</h3>
                            <svg id="bv-svg" width="260" height="260" viewBox="0 0 260 260"></svg>
                        </div>
                        <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                            <h3 style="margin-top:0;">History</h3>
                            <div id="bv-history" style="font-size:13px;max-height:200px;overflow-y:auto;"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.getElementById('bv-save-btn').addEventListener('click', () => this.saveSnapshot());
        this.loadData();
        this.drawMap();
        this.updateHealth();
    },

    onSlider(id) {
        document.getElementById(`bv-val-${id}`).textContent = document.getElementById(`bv-${id}`).value;
        this.drawMap();
        this.updateHealth();
    },

    getValues() {
        const vals = {};
        this.areas.forEach(a => { vals[a.id] = parseInt(document.getElementById(`bv-${a.id}`)?.value || 50); });
        return vals;
    },

    drawMap() {
        const svg = document.getElementById('bv-svg');
        if (!svg) return;
        const cx = 130, cy = 130, maxR = 110;
        const vals = this.getValues();
        let html = '';
        // Draw from largest to smallest (background circles)
        [...this.areas].reverse().forEach((a, i) => {
            const r = (vals[a.id] / 100) * maxR;
            const alpha = 0.15 + (vals[a.id] / 100) * 0.45;
            html += `<circle cx="${cx}" cy="${cy}" r="${Math.max(r,4)}" fill="${a.color}" fill-opacity="${alpha}" stroke="${a.color}" stroke-width="1.5" stroke-opacity="0.6"/>`;
        });
        // Labels
        this.areas.forEach((a, i) => {
            const angle = (i / this.areas.length) * 2 * Math.PI - Math.PI / 2;
            const r = (vals[a.id] / 100) * maxR;
            const lx = cx + (r + 14) * Math.cos(angle);
            const ly = cy + (r + 14) * Math.sin(angle);
            html += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="${a.color}" font-weight="bold">${a.label}</text>`;
        });
        svg.innerHTML = html;
    },

    updateHealth() {
        const vals = this.getValues();
        const el = document.getElementById('bv-health');
        if (!el) return;
        el.innerHTML = this.areas.map(a => {
            const v = vals[a.id];
            const status = v < 30 ? { label: 'Needs work', color: '#e74c3c' } : v < 60 ? { label: 'Moderate', color: '#e67e22' } : { label: 'Healthy', color: '#27ae60' };
            return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:13px;">
                <span style="color:${a.color};font-weight:500;">${a.label}</span>
                <span style="color:${status.color};">${status.label} (${v})</span>
            </div>`;
        }).join('');
    },

    saveSnapshot() {
        const vals = this.getValues();
        const history = Core.Storage.get('bv_history') || [];
        history.unshift({ ts: Date.now(), vals });
        Core.Storage.set('bv_history', history.slice(0, 50));
        Core.Toast.show('Boundary snapshot saved.', 'success');
        this.renderHistory();
    },

    loadData() {
        const history = Core.Storage.get('bv_history') || [];
        if (history.length > 0) {
            const last = history[0].vals;
            this.areas.forEach(a => {
                const slider = document.getElementById(`bv-${a.id}`);
                if (slider && last[a.id] !== undefined) {
                    slider.value = last[a.id];
                    document.getElementById(`bv-val-${a.id}`).textContent = last[a.id];
                }
            });
            this.drawMap();
            this.updateHealth();
        }
        this.renderHistory();
    },

    renderHistory() {
        const history = Core.Storage.get('bv_history') || [];
        const el = document.getElementById('bv-history');
        if (!el) return;
        if (history.length === 0) { el.innerHTML = '<p style="color:#888;">No snapshots yet.</p>'; return; }
        el.innerHTML = history.slice(0, 15).map(h => {
            const avg = Math.round(Object.values(h.vals).reduce((a, b) => a + b, 0) / this.areas.length);
            return `<div style="border-bottom:1px solid #ddd;padding:6px 0;">
                <span style="color:#888;font-size:11px;">${new Date(h.ts).toLocaleString()}</span>
                <span style="margin-left:8px;font-weight:500;">Avg: ${avg}/100</span>
                ${this.areas.map(a => `<span style="margin-left:6px;font-size:11px;color:${a.color};">${a.label[0]}${h.vals[a.id]}</span>`).join('')}
            </div>`;
        }).join('');
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. EmotionThermometer
// ─────────────────────────────────────────────────────────────────────────────
window.EmotionThermometer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Emotion Thermometer</h2>
                <p style="color:#666;margin-top:0;">Set your emotional intensity (0=numb, 100=overwhelmed). Log and track trends.</p>

                <div style="display:grid;grid-template-columns:auto 1fr;gap:24px;background:#f8f8f8;border-radius:10px;padding:20px;margin-bottom:16px;align-items:start;">
                    <div style="text-align:center;">
                        <svg id="et-svg" width="80" height="300" viewBox="0 0 80 300"></svg>
                        <div style="font-size:13px;color:#666;margin-top:4px;">Drag slider</div>
                    </div>
                    <div>
                        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
                            <input type="range" id="et-slider" min="0" max="100" value="50"
                                style="flex:1;height:8px;" oninput="window.EmotionThermometer.onSlider()">
                            <span id="et-value" style="font-size:36px;font-weight:bold;min-width:52px;">50</span>
                        </div>
                        <div id="et-label" style="font-size:16px;font-weight:500;margin-bottom:12px;color:#555;"></div>
                        <textarea id="et-note" placeholder="Optional note about how you feel..." rows="3" style="width:100%;box-sizing:border-box;padding:9px;border:1px solid #ccc;border-radius:6px;resize:vertical;font-size:14px;"></textarea>
                        <button id="et-log-btn" style="margin-top:10px;padding:10px 24px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:15px;">Log Reading</button>
                        <div id="et-strategy" style="margin-top:14px;background:#fff;border-radius:8px;padding:12px;font-size:14px;border-left:4px solid #e74c3c;display:none;"></div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">7-Day Trend</h3>
                    <canvas id="et-chart" width="640" height="120" style="width:100%;max-width:640px;"></canvas>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                    <h3 style="margin-top:0;">Recent Log</h3>
                    <div id="et-log" style="max-height:220px;overflow-y:auto;font-size:13px;"></div>
                </div>
            </div>`;
        document.getElementById('et-log-btn').addEventListener('click', () => this.logReading());
        this.onSlider();
        this.loadData();
    },

    getLabel(v) {
        if (v <= 10) return { text: 'Numb / Disconnected', color: '#3498db' };
        if (v <= 25) return { text: 'Very Calm', color: '#5dade2' };
        if (v <= 40) return { text: 'Calm', color: '#76b7c5' };
        if (v <= 55) return { text: 'Moderate', color: '#7dcea0' };
        if (v <= 65) return { text: 'Activated', color: '#f39c12' };
        if (v <= 75) return { text: 'Stressed', color: '#e67e22' };
        if (v <= 87) return { text: 'Highly Distressed', color: '#e74c3c' };
        return { text: 'Overwhelmed', color: '#c0392b' };
    },

    getStrategy(v) {
        if (v <= 25) return 'You seem disconnected. Try gentle movement, a warm drink, or calling a friend to re-engage.';
        if (v <= 50) return 'You\'re in a regulated window. A good time to journal, plan, or engage in creative work.';
        if (v <= 70) return 'Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times.';
        if (v <= 85) return 'Step outside for cool air and a slow walk. Ground yourself: name 5 things you can see right now.';
        return 'You are very overwhelmed. Put ice in your hands, splash cold water on your face, or call someone you trust. You do not have to manage this alone.';
    },

    drawThermometer(v) {
        const svg = document.getElementById('et-svg');
        if (!svg) return;
        const ratio = v / 100;
        const bulbY = 260, tubeTop = 30, tubeH = 220;
        const fillH = tubeH * ratio;
        const fillY = tubeTop + tubeH - fillH;
        // Color gradient: blue → green → yellow → red
        const r = Math.round(52 + 180 * ratio);
        const g = Math.round(152 - 80 * ratio);
        const b = Math.round(219 - 200 * ratio);
        const fillColor = `rgb(${r},${g},${b})`;
        svg.innerHTML = `
            <!-- tube background -->
            <rect x="28" y="${tubeTop}" width="24" height="${tubeH}" rx="12" fill="#ddd"/>
            <!-- fill -->
            <rect x="28" y="${fillY}" width="24" height="${fillH}" rx="6" fill="${fillColor}"/>
            <!-- bulb background -->
            <circle cx="40" cy="${bulbY}" r="20" fill="#ddd"/>
            <!-- bulb fill -->
            <circle cx="40" cy="${bulbY}" r="18" fill="${fillColor}"/>
            <!-- tube border -->
            <rect x="28" y="${tubeTop}" width="24" height="${tubeH}" rx="12" fill="none" stroke="#999" stroke-width="2"/>
            <!-- tick marks -->
            ${[0,25,50,75,100].map(t => {
                const ty = tubeTop + tubeH - (t / 100) * tubeH;
                return `<line x1="52" y1="${ty}" x2="60" y2="${ty}" stroke="#999" stroke-width="1.5"/>
                        <text x="63" y="${ty}" dominant-baseline="middle" font-size="9" fill="#888">${t}</text>`;
            }).join('')}`;
    },

    onSlider() {
        const v = parseInt(document.getElementById('et-slider').value);
        const info = this.getLabel(v);
        document.getElementById('et-value').textContent = v;
        document.getElementById('et-value').style.color = info.color;
        const lbl = document.getElementById('et-label');
        lbl.textContent = info.text;
        lbl.style.color = info.color;
        this.drawThermometer(v);
        const strat = document.getElementById('et-strategy');
        strat.style.display = 'block';
        strat.textContent = this.getStrategy(v);
        strat.style.borderLeftColor = info.color;
    },

    logReading() {
        const v = parseInt(document.getElementById('et-slider').value);
        const note = document.getElementById('et-note').value.trim();
        const log = Core.Storage.get('et_log') || [];
        log.unshift({ ts: Date.now(), v, note });
        Core.Storage.set('et_log', log.slice(0, 200));
        document.getElementById('et-note').value = '';
        Core.Toast.show('Reading logged.', 'success');
        this.loadData();
    },

    loadData() {
        const log = Core.Storage.get('et_log') || [];
        this.drawTrendChart(log);
        this.renderLog(log);
    },

    drawTrendChart(log) {
        const canvas = document.getElementById('et-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        if (log.length < 2) { ctx.fillStyle = '#aaa'; ctx.font = '14px sans-serif'; ctx.fillText('Log at least 2 readings to see a trend.', 20, H / 2); return; }
        const now = Date.now();
        const weekAgo = now - 7 * 24 * 3600 * 1000;
        const recent = log.filter(e => e.ts >= weekAgo).slice(0, 50).reverse();
        if (recent.length < 2) { ctx.fillStyle = '#aaa'; ctx.font = '14px sans-serif'; ctx.fillText('Need readings in the past 7 days.', 20, H / 2); return; }
        const pad = { l: 36, r: 16, t: 10, b: 24 };
        const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
        // Grid
        ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1;
        [0, 25, 50, 75, 100].forEach(v => {
            const y = pad.t + gH - (v / 100) * gH;
            ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + gW, y); ctx.stroke();
            ctx.fillStyle = '#bbb'; ctx.font = '10px sans-serif'; ctx.fillText(v, 2, y + 4);
        });
        // Line
        ctx.beginPath();
        recent.forEach((e, i) => {
            const x = pad.l + (i / (recent.length - 1)) * gW;
            const y = pad.t + gH - (e.v / 100) * gH;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2; ctx.stroke();
        // Dots
        recent.forEach((e, i) => {
            const x = pad.l + (i / (recent.length - 1)) * gW;
            const y = pad.t + gH - (e.v / 100) * gH;
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#e74c3c'; ctx.fill();
        });
    },

    renderLog(log) {
        const el = document.getElementById('et-log');
        if (!el) return;
        if (log.length === 0) { el.innerHTML = '<p style="color:#888;">No readings yet.</p>'; return; }
        el.innerHTML = log.slice(0, 30).map(e => {
            const info = this.getLabel(e.v);
            return `<div style="display:flex;align-items:center;gap:10px;border-bottom:1px solid #eee;padding:7px 0;">
                <div style="width:36px;height:36px;border-radius:50%;background:${info.color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:13px;">${e.v}</div>
                <div>
                    <div style="font-size:13px;font-weight:500;color:${info.color};">${info.text}</div>
                    ${e.note ? `<div style="font-size:12px;color:#666;">${this.escHtml(e.note)}</div>` : ''}
                    <div style="font-size:11px;color:#aaa;">${new Date(e.ts).toLocaleString()}</div>
                </div>
            </div>`;
        }).join('');
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. HabitBreaker
// ─────────────────────────────────────────────────────────────────────────────
window.HabitBreaker = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Habit Breaker</h2>
                <p style="color:#666;margin-top:0;">Track a habit you want to break. Log urges and whether you resisted.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Habit Setup</h3>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <input id="hb-habit-name" type="text" placeholder="Habit to break (e.g. nail biting)" style="flex:1;min-width:200px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                        <button id="hb-set-btn" style="padding:9px 18px;background:#2c3e50;color:#fff;border:none;border-radius:6px;cursor:pointer;">Set Habit</button>
                    </div>
                    <div id="hb-current-habit" style="margin-top:10px;font-size:14px;color:#555;"></div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:14px;text-align:center;">
                        <div id="hb-streak" style="font-size:36px;font-weight:bold;color:#27ae60;">0</div>
                        <div style="font-size:12px;color:#888;">Day streak (clean)</div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:14px;text-align:center;">
                        <div id="hb-rate" style="font-size:36px;font-weight:bold;color:#3498db;">-</div>
                        <div style="font-size:12px;color:#888;">Resistance rate</div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:14px;text-align:center;">
                        <div id="hb-total" style="font-size:36px;font-weight:bold;color:#9b59b6;">0</div>
                        <div style="font-size:12px;color:#888;">Total urges logged</div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Log an Urge</h3>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
                        <select id="hb-trigger" style="flex:1;min-width:160px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                            <option value="">-- Select trigger --</option>
                            <option value="boredom">Boredom</option>
                            <option value="stress">Stress</option>
                            <option value="social">Social situations</option>
                            <option value="after-meal">After a meal</option>
                            <option value="morning">Morning routine</option>
                            <option value="evening">Evening wind-down</option>
                            <option value="anxiety">Anxiety</option>
                            <option value="habit-chain">Triggered by another habit</option>
                            <option value="other">Other</option>
                        </select>
                        <input id="hb-trigger-note" type="text" placeholder="Situation details (optional)" style="flex:1;min-width:160px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                    </div>
                    <div style="display:flex;gap:10px;">
                        <button id="hb-gave-in" style="flex:1;padding:10px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">I gave in</button>
                        <button id="hb-resisted" style="flex:1;padding:10px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">I resisted!</button>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Trigger Patterns</h3>
                        <div id="hb-triggers-chart"></div>
                    </div>
                    <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                        <h3 style="margin-top:0;">Alternative Actions</h3>
                        <div id="hb-alternatives" style="font-size:14px;"></div>
                    </div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                    <h3 style="margin-top:0;">Recent Log</h3>
                    <div id="hb-log" style="max-height:200px;overflow-y:auto;font-size:13px;"></div>
                </div>
            </div>`;
        document.getElementById('hb-set-btn').addEventListener('click', () => this.setHabit());
        document.getElementById('hb-gave-in').addEventListener('click', () => this.logUrge(false));
        document.getElementById('hb-resisted').addEventListener('click', () => this.logUrge(true));
        this.loadData();
    },

    setHabit() {
        const name = document.getElementById('hb-habit-name').value.trim();
        if (!name) { Core.Toast.show('Enter the habit name.', 'warning'); return; }
        Core.Storage.set('hb_habit', name);
        document.getElementById('hb-habit-name').value = '';
        Core.Toast.show(`Tracking: "${name}"`, 'success');
        this.loadData();
    },

    logUrge(resisted) {
        const habit = Core.Storage.get('hb_habit');
        if (!habit) { Core.Toast.show('Set a habit to track first.', 'warning'); return; }
        const trigger = document.getElementById('hb-trigger').value;
        const note = document.getElementById('hb-trigger-note').value.trim();
        const log = Core.Storage.get('hb_log') || [];
        const hour = new Date().getHours();
        log.unshift({ ts: Date.now(), resisted, trigger, note, hour });
        Core.Storage.set('hb_log', log);
        document.getElementById('hb-trigger-note').value = '';
        Core.Toast.show(resisted ? 'Great job resisting!' : 'Logged. Keep going — each attempt builds strength.', resisted ? 'success' : 'info');
        this.loadData();
    },

    loadData() {
        const habit = Core.Storage.get('hb_habit');
        const log = Core.Storage.get('hb_log') || [];
        document.getElementById('hb-current-habit').innerHTML = habit
            ? `Tracking: <strong style="color:#e74c3c;">${this.escHtml(habit)}</strong>`
            : 'No habit set. Enter one above.';
        // Streak (days without giving in)
        let streak = 0;
        const today = new Date().toDateString();
        const byDay = {};
        log.forEach(e => {
            const d = new Date(e.ts).toDateString();
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(e);
        });
        let d = new Date();
        while (true) {
            const key = d.toDateString();
            const dayLogs = byDay[key] || [];
            if (dayLogs.some(e => !e.resisted)) break;
            if (dayLogs.length > 0 || key === today) streak++;
            else break;
            d.setDate(d.getDate() - 1);
            if (streak > 365) break;
        }
        document.getElementById('hb-streak').textContent = streak;
        document.getElementById('hb-total').textContent = log.length;
        const resisted = log.filter(e => e.resisted).length;
        document.getElementById('hb-rate').textContent = log.length > 0 ? Math.round((resisted / log.length) * 100) + '%' : '-';
        this.renderTriggersChart(log);
        this.renderAlternatives();
        this.renderLog(log);
    },

    renderTriggersChart(log) {
        const counts = {};
        log.forEach(e => { if (e.trigger) counts[e.trigger] = (counts[e.trigger] || 0) + 1; });
        const el = document.getElementById('hb-triggers-chart');
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        if (sorted.length === 0) { el.innerHTML = '<p style="color:#888;font-size:13px;">Log urges with triggers to see patterns.</p>'; return; }
        const max = sorted[0][1];
        el.innerHTML = sorted.map(([t, c]) => `
            <div style="margin-bottom:6px;font-size:13px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:2px;"><span>${t}</span><span>${c}</span></div>
                <div style="background:#ddd;border-radius:4px;height:7px;">
                    <div style="width:${Math.round((c/max)*100)}%;background:#e74c3c;height:7px;border-radius:4px;"></div>
                </div>
            </div>`).join('');
    },

    renderAlternatives() {
        const alternatives = [
            'Take 5 slow, deep breaths through your nose.',
            'Drink a full glass of cold water.',
            'Do 10 jumping jacks or a short walk.',
            'Text a supportive friend.',
            'Write down why you want to quit.',
            'Delay 10 minutes — urges usually pass.',
            'Chew gum or eat a healthy snack.',
            'Engage in a quick puzzle or game.',
        ];
        document.getElementById('hb-alternatives').innerHTML = alternatives.map(a =>
            `<div style="padding:5px 0;border-bottom:1px solid #eee;font-size:13px;">&#8226; ${a}</div>`
        ).join('');
    },

    renderLog(log) {
        const el = document.getElementById('hb-log');
        if (log.length === 0) { el.innerHTML = '<p style="color:#888;">No entries yet.</p>'; return; }
        el.innerHTML = log.slice(0, 30).map(e => `
            <div style="display:flex;align-items:center;gap:8px;border-bottom:1px solid #eee;padding:6px 0;">
                <span style="font-size:18px;">${e.resisted ? '✅' : '❌'}</span>
                <div>
                    <span style="font-size:13px;font-weight:500;color:${e.resisted ? '#27ae60' : '#e74c3c'};">${e.resisted ? 'Resisted' : 'Gave in'}</span>
                    ${e.trigger ? `<span style="font-size:12px;color:#888;margin-left:6px;">Trigger: ${e.trigger}</span>` : ''}
                    ${e.note ? `<span style="font-size:12px;color:#666;margin-left:6px;">${this.escHtml(e.note)}</span>` : ''}
                    <div style="font-size:11px;color:#aaa;">${new Date(e.ts).toLocaleString()}</div>
                </div>
            </div>`).join('');
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. GuiltLiberator
// ─────────────────────────────────────────────────────────────────────────────
window.GuiltLiberator = {
    reframes: {
        'effort': [
            'You did the best you could with the information and energy you had at that time.',
            'Guilt means you have values — that is a strength, not a flaw.',
            'One moment does not define your character or your entire relationship.',
        ],
        'expectation': [
            'Whose standard is this? Many guilt feelings are inherited, not chosen.',
            'You are allowed to have limits. Needs are not selfish — they are human.',
            'You are one person, not a limitless resource. Rest is productive.',
        ],
        'mistake': [
            'Mistakes are how humans learn. Without them, growth is impossible.',
            'You cannot go back and change it, but you can choose what to do next.',
            'If a friend described this situation to you, would you judge them the way you judge yourself?',
        ],
        'inaction': [
            'Not acting is sometimes the wisest choice. Protect yourself from haste.',
            'You cannot pour from an empty cup. Recovery is not failure.',
            'You may have needed rest, space, or time — and that is valid.',
        ],
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <style>
                @keyframes gl-release { 0%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.2)} 100%{opacity:0;transform:scale(0.5)} }
            </style>
            <div style="max-width:700px;margin:0 auto;font-family:sans-serif;">
                <h2 style="margin-bottom:4px;">Guilt Liberator</h2>
                <p style="color:#666;margin-top:0;">Write a guilty thought. Receive reframes. Choose to release it.</p>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;">Express the Guilt</h3>
                    <textarea id="gl-thought" placeholder="Write the guilty thought here..." rows="3" style="width:100%;box-sizing:border-box;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:14px;resize:vertical;"></textarea>
                    <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">
                        <select id="gl-type" style="flex:1;min-width:160px;padding:9px;border:1px solid #ccc;border-radius:6px;">
                            <option value="effort">I didn't try hard enough</option>
                            <option value="expectation">I failed others' expectations</option>
                            <option value="mistake">I made a mistake</option>
                            <option value="inaction">I didn't do something I should have</option>
                        </select>
                        <button id="gl-reframe-btn" style="padding:9px 20px;background:#9b59b6;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Get Reframes</button>
                    </div>
                </div>

                <div id="gl-reframes-section" style="display:none;background:#f0eafb;border-radius:10px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin-top:0;color:#9b59b6;">Cognitive Reframes</h3>
                    <div id="gl-reframes-list"></div>
                    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
                        <button id="gl-save-btn" style="padding:9px 20px;background:#27ae60;color:#fff;border:none;border-radius:6px;cursor:pointer;">Save to History</button>
                        <button id="gl-release-btn" style="padding:9px 20px;background:#e74c3c;color:#fff;border:none;border-radius:6px;cursor:pointer;">Release this guilt</button>
                    </div>
                    <div id="gl-release-anim" style="height:48px;position:relative;overflow:hidden;"></div>
                </div>

                <div style="background:#f8f8f8;border-radius:10px;padding:16px;">
                    <h3 style="margin-top:0;">Past Entries</h3>
                    <div id="gl-history" style="max-height:280px;overflow-y:auto;font-size:13px;"></div>
                </div>
            </div>`;
        document.getElementById('gl-reframe-btn').addEventListener('click', () => this.getReframes());
        document.getElementById('gl-save-btn').addEventListener('click', () => this.saveEntry());
        document.getElementById('gl-release-btn').addEventListener('click', () => this.releaseGuilt());
        this.loadData();
    },

    getReframes() {
        const thought = document.getElementById('gl-thought').value.trim();
        if (!thought) { Core.Toast.show('Write your guilty thought first.', 'warning'); return; }
        const type = document.getElementById('gl-type').value;
        const frames = this.reframes[type] || this.reframes['effort'];
        const section = document.getElementById('gl-reframes-section');
        section.style.display = 'block';
        document.getElementById('gl-reframes-list').innerHTML = frames.map((f, i) => `
            <div style="background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;border-left:4px solid #9b59b6;">
                <div style="font-size:12px;color:#9b59b6;font-weight:bold;margin-bottom:4px;">Reframe ${i + 1}</div>
                <div style="font-size:14px;line-height:1.6;">${f}</div>
            </div>`).join('');
    },

    saveEntry() {
        const thought = document.getElementById('gl-thought').value.trim();
        if (!thought) { Core.Toast.show('Nothing to save.', 'warning'); return; }
        const type = document.getElementById('gl-type').value;
        const frames = this.reframes[type] || [];
        const history = Core.Storage.get('gl_history') || [];
        history.unshift({ ts: Date.now(), thought, type, frames, released: false });
        Core.Storage.set('gl_history', history.slice(0, 100));
        Core.Toast.show('Saved to history.', 'success');
        this.loadData();
    },

    releaseGuilt() {
        const container = document.getElementById('gl-release-anim');
        const thought = document.getElementById('gl-thought').value.trim();
        // Mark latest entry as released
        if (thought) {
            const history = Core.Storage.get('gl_history') || [];
            const idx = history.findIndex(e => e.thought === thought);
            if (idx !== -1) { history[idx].released = true; Core.Storage.set('gl_history', history); }
        }
        // Animate
        const words = ['Let go', 'Released', 'Free', 'Peace', 'Released'];
        words.forEach((w, i) => {
            const span = document.createElement('span');
            span.textContent = w;
            span.style.cssText = `position:absolute;font-size:20px;color:#9b59b6;font-weight:bold;left:${10 + Math.random() * 70}%;animation:gl-release 1.5s ease-out forwards;animation-delay:${i * 0.2}s;`;
            container.appendChild(span);
            setTimeout(() => span.remove(), 2200);
        });
        document.getElementById('gl-thought').value = '';
        document.getElementById('gl-reframes-section').style.display = 'none';
        Core.Toast.show('Guilt released. You are free from this one.', 'success');
        this.loadData();
    },

    loadData() {
        const history = Core.Storage.get('gl_history') || [];
        const el = document.getElementById('gl-history');
        if (history.length === 0) { el.innerHTML = '<p style="color:#888;">No past entries yet.</p>'; return; }
        el.innerHTML = history.slice(0, 30).map(e => `
            <div style="border-bottom:1px solid #eee;padding:10px 0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <span style="font-size:11px;color:#aaa;">${new Date(e.ts).toLocaleString()}</span>
                    ${e.released ? '<span style="font-size:11px;color:#27ae60;font-weight:bold;">Released</span>' : '<span style="font-size:11px;color:#9b59b6;">Held</span>'}
                </div>
                <div style="font-size:14px;color:#333;font-style:italic;">"${this.escHtml(e.thought)}"</div>
                <div style="font-size:12px;color:#888;margin-top:2px;">Type: ${e.type}</div>
            </div>`).join('');
    },

    escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
};
