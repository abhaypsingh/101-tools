// Remaining Tool Implementations - Batch 1 (13 tools)

window.MicroProgressBar = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Micro Progress Bar</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>New Goal</h3>
                    <input type="text" id="mpb-name" class="input-field" placeholder="Goal name (e.g., Read 50 pages)" style="width:100%;margin-bottom:.75rem;">
                    <input type="number" id="mpb-target" class="input-field" placeholder="Target number" min="1" style="width:100%;margin-bottom:.75rem;">
                    <button id="mpb-add" class="btn btn-primary" style="width:100%;">Create Goal</button>
                </div>
                <div id="mpb-goals"></div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('mpb-add').addEventListener('click', () => this.addGoal());
    },
    addGoal() {
        const name = document.getElementById('mpb-name').value.trim();
        const target = parseInt(document.getElementById('mpb-target').value);
        if (!name || !target) { Core.Toast.show('Enter name and target', 'warning'); return; }
        this.goals.push({ name, target, current: 0, id: Date.now() });
        document.getElementById('mpb-name').value = '';
        document.getElementById('mpb-target').value = '';
        this.saveData(); this.render();
    },
    increment(id) {
        const g = this.goals.find(g => g.id === id);
        if (g && g.current < g.target) {
            g.current++;
            if (g.current === g.target) Core.Toast.show(`Goal "${g.name}" completed!`, 'success');
            this.saveData(); this.render();
        }
    },
    removeGoal(id) { this.goals = this.goals.filter(g => g.id !== id); this.saveData(); this.render(); },
    render() {
        document.getElementById('mpb-goals').innerHTML = this.goals.map(g => {
            const pct = Math.round((g.current / g.target) * 100);
            return `<div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1rem;">
                <div style="display:flex;justify-content:space-between;margin-bottom:.5rem;">
                    <strong>${g.name}</strong>
                    <button onclick="MicroProgressBar.removeGoal(${g.id})" style="background:none;border:none;cursor:pointer;color:var(--danger);">x</button>
                </div>
                <div style="width:100%;height:24px;background:var(--bg-secondary);border-radius:12px;overflow:hidden;margin-bottom:.75rem;">
                    <div style="width:${pct}%;height:100%;background:${pct >= 100 ? 'var(--success)' : 'var(--secondary)'};border-radius:12px;transition:width .3s;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span>${g.current} / ${g.target} (${pct}%)</span>
                    ${g.current < g.target ? `<button onclick="MicroProgressBar.increment(${g.id})" class="btn btn-secondary" style="font-size:.85rem;">+1</button>` : '<span style="color:var(--success);font-weight:bold;">Complete!</span>'}
                </div>
            </div>`;
        }).join('') || '<p style="text-align:center;color:var(--text-muted);padding:2rem;">Create a goal to track progress</p>';
    },
    saveData() { Core.Storage.set('micro-progress', { goals: this.goals }); },
    loadData() { const d = Core.Storage.get('micro-progress'); this.goals = d?.goals || []; }
};

window.StressFingerprint = {
    CATEGORIES: {
        physical: ['Headache', 'Muscle tension', 'Fatigue', 'Stomach issues', 'Rapid heartbeat', 'Shallow breathing'],
        emotional: ['Irritability', 'Anxiety', 'Sadness', 'Overwhelm', 'Restlessness', 'Numbness'],
        behavioral: ['Procrastination', 'Overeating', 'Withdrawal', 'Fidgeting', 'Insomnia', 'Snapping at others'],
        cognitive: ['Racing thoughts', 'Forgetfulness', 'Indecision', 'Negativity', 'Poor concentration', 'Catastrophizing']
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        let checkboxes = '';
        for (const [cat, symptoms] of Object.entries(this.CATEGORIES)) {
            checkboxes += `<div style="margin-bottom:1rem;"><h4 style="text-transform:capitalize;margin-bottom:.5rem;">${cat}</h4>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
                    ${symptoms.map(s => `<label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;padding:.25rem;">
                        <input type="checkbox" class="sf-check" data-cat="${cat}" data-sym="${s}"> ${s}
                    </label>`).join('')}
                </div></div>`;
        }
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Stress Fingerprint</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Current Stress Symptoms</h3>
                    ${checkboxes}
                    <button id="sf-save" class="btn btn-primary" style="width:100%;margin-top:1rem;">Save Fingerprint</button>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Your Most Common Pattern</h3>
                    <div id="sf-pattern"></div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>History (<span id="sf-count">0</span> fingerprints)</h3>
                    <div id="sf-history" style="max-height:200px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('sf-save').addEventListener('click', () => this.saveFingerprint());
        this.render();
    },
    saveFingerprint() {
        const checked = [];
        document.querySelectorAll('.sf-check:checked').forEach(cb => {
            checked.push({ cat: cb.dataset.cat, sym: cb.dataset.sym });
        });
        if (!checked.length) { Core.Toast.show('Check at least one symptom', 'warning'); return; }
        this.fingerprints.push({ symptoms: checked, date: Date.now() });
        document.querySelectorAll('.sf-check').forEach(cb => cb.checked = false);
        this.saveData(); this.render();
        Core.Toast.show('Stress fingerprint saved', 'success');
    },
    render() {
        document.getElementById('sf-count').textContent = this.fingerprints.length;
        // Pattern analysis
        const freq = {};
        this.fingerprints.forEach(fp => fp.symptoms.forEach(s => { freq[s.sym] = (freq[s.sym] || 0) + 1; }));
        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        document.getElementById('sf-pattern').innerHTML = sorted.length ?
            sorted.slice(0, 5).map(([sym, count]) => `<div style="padding:.5rem;margin-bottom:.25rem;background:var(--bg-secondary);border-radius:var(--radius);display:flex;justify-content:space-between;">
                <span>${sym}</span><span style="font-weight:bold;">${count}x</span></div>`).join('') :
            '<p style="color:var(--text-muted);">Save fingerprints to see patterns</p>';
        document.getElementById('sf-history').innerHTML = this.fingerprints.slice().reverse().slice(0, 10).map(fp =>
            `<div style="padding:.5rem;border-bottom:1px solid var(--border);font-size:.85rem;">
                <span style="color:var(--text-muted);">${new Date(fp.date).toLocaleDateString()}</span> —
                ${fp.symptoms.map(s => s.sym).join(', ')}
            </div>`).join('') || '<p style="color:var(--text-muted);">No fingerprints yet</p>';
    },
    saveData() { Core.Storage.set('stress-fingerprint', { fingerprints: this.fingerprints }); },
    loadData() { const d = Core.Storage.get('stress-fingerprint'); this.fingerprints = d?.fingerprints || []; }
};

window.AccomplishmentAmplifier = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Accomplishment Amplifier</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>What did you accomplish?</h3>
                    <input type="text" id="aa-input" class="input-field" placeholder="Even something small..." style="width:100%;margin-bottom:.75rem;">
                    <button id="aa-amplify" class="btn btn-primary" style="width:100%;">Amplify!</button>
                </div>
                <div id="aa-result" style="display:none;margin-bottom:1.5rem;"></div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Amplified Accomplishments (<span id="aa-count">0</span>)</h3>
                    <div id="aa-list" style="max-height:300px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('aa-amplify').addEventListener('click', () => this.amplify());
        this.render();
    },
    amplify() {
        const text = document.getElementById('aa-input').value.trim();
        if (!text) { Core.Toast.show('Describe your accomplishment', 'warning'); return; }
        const skills = this.generateSkills(text);
        const impact = this.generateImpact(text);
        const growth = this.generateGrowth(text);
        const entry = { text, skills, impact, growth, date: Date.now() };
        this.entries.push(entry);
        document.getElementById('aa-input').value = '';
        const el = document.getElementById('aa-result');
        el.style.display = 'block';
        el.innerHTML = `
            <div style="background:linear-gradient(135deg,var(--secondary),var(--secondary-light));color:white;padding:2rem;border-radius:var(--radius-lg);">
                <div style="font-size:1.2rem;font-weight:bold;margin-bottom:1rem;">"${text}"</div>
                <div style="margin-bottom:1rem;"><strong>Skills Demonstrated:</strong><br>${skills}</div>
                <div style="margin-bottom:1rem;"><strong>Impact Made:</strong><br>${impact}</div>
                <div><strong>Growth Shown:</strong><br>${growth}</div>
            </div>`;
        this.saveData(); this.render();
        Core.Toast.show('Accomplishment amplified!', 'success');
    },
    generateSkills(text) {
        const t = text.toLowerCase();
        const skills = [];
        if (t.includes('finish') || t.includes('complete') || t.includes('done')) skills.push('Follow-through and persistence');
        if (t.includes('help') || t.includes('support') || t.includes('team')) skills.push('Collaboration and empathy');
        if (t.includes('learn') || t.includes('study') || t.includes('read')) skills.push('Curiosity and dedication to growth');
        if (t.includes('fix') || t.includes('solve') || t.includes('figure')) skills.push('Problem-solving and analytical thinking');
        if (t.includes('creat') || t.includes('design') || t.includes('build') || t.includes('wrote') || t.includes('made')) skills.push('Creativity and initiative');
        if (skills.length === 0) skills.push('Taking action despite uncertainty', 'Self-motivation and discipline');
        return skills.join('; ');
    },
    generateImpact(text) {
        const impacts = ['This moved you closer to your goals', 'Others benefit from your effort, even if they don\'t say it', 'This created momentum for future progress', 'You modeled positive behavior for those around you'];
        return impacts[Math.floor(Math.random() * impacts.length)];
    },
    generateGrowth(text) {
        const growths = ['Yesterday\'s you couldn\'t have done this as easily', 'Each small step compounds into remarkable progress', 'This proves you can do hard things', 'You\'re building the identity of someone who follows through'];
        return growths[Math.floor(Math.random() * growths.length)];
    },
    render() {
        document.getElementById('aa-count').textContent = this.entries.length;
        document.getElementById('aa-list').innerHTML = this.entries.slice().reverse().map(e =>
            `<div style="padding:.75rem;border-bottom:1px solid var(--border);">
                <strong>"${e.text}"</strong>
                <div style="font-size:.8rem;color:var(--text-muted);margin-top:.25rem;">${new Date(e.date).toLocaleDateString()} — ${e.skills.split(';')[0]}</div>
            </div>`).join('') || '<p style="color:var(--text-muted);">Amplify your first accomplishment!</p>';
    },
    saveData() { Core.Storage.set('accomplishment-amp', { entries: this.entries }); },
    loadData() { const d = Core.Storage.get('accomplishment-amp'); this.entries = d?.entries || []; }
};

window.EmotionalBandwidth = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Emotional Bandwidth</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <canvas id="eb-gauge" width="250" height="150"></canvas>
                    <div id="eb-val" style="font-size:3rem;font-weight:bold;">75</div>
                    <div id="eb-label" style="color:var(--text-muted);">Good capacity</div>
                    <input type="range" id="eb-slider" min="0" max="100" value="75" style="width:80%;margin:1rem 0;">
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem;">
                    <div><h4 style="margin-bottom:.5rem;">Drains</h4>
                        <button onclick="EmotionalBandwidth.adjust(-20)" class="btn btn-secondary" style="width:100%;margin-bottom:.5rem;">Conflict -20</button>
                        <button onclick="EmotionalBandwidth.adjust(-15)" class="btn btn-secondary" style="width:100%;margin-bottom:.5rem;">Bad news -15</button>
                        <button onclick="EmotionalBandwidth.adjust(-10)" class="btn btn-secondary" style="width:100%;">Support given -10</button>
                    </div>
                    <div><h4 style="margin-bottom:.5rem;">Recharges</h4>
                        <button onclick="EmotionalBandwidth.adjust(20)" class="btn btn-secondary" style="width:100%;margin-bottom:.5rem;">Laughter +20</button>
                        <button onclick="EmotionalBandwidth.adjust(15)" class="btn btn-secondary" style="width:100%;margin-bottom:.5rem;">Rest +15</button>
                        <button onclick="EmotionalBandwidth.adjust(10)" class="btn btn-secondary" style="width:100%;">Nature +10</button>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Today's Log</h3>
                    <div id="eb-log" style="max-height:150px;overflow-y:auto;text-align:left;"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('eb-slider').addEventListener('input', e => { this.level = parseInt(e.target.value); this.update(); });
        this.update();
    },
    adjust(amount) {
        this.level = Math.max(0, Math.min(100, this.level + amount));
        document.getElementById('eb-slider').value = this.level;
        this.log.push({ amount, time: Date.now() });
        this.saveData();
        this.update();
        Core.Toast.show(`Bandwidth ${amount > 0 ? '+' : ''}${amount}`, amount > 0 ? 'success' : 'info');
    },
    update() {
        document.getElementById('eb-val').textContent = this.level;
        const label = this.level > 70 ? 'Good capacity' : this.level > 40 ? 'Moderate' : this.level > 20 ? 'Running low' : 'Depleted';
        document.getElementById('eb-label').textContent = label;
        // Gauge
        const c = document.getElementById('eb-gauge'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 250, 150);
        ctx.beginPath(); ctx.arc(125, 140, 100, Math.PI, 0); ctx.lineWidth = 20; ctx.strokeStyle = '#eee'; ctx.stroke();
        const angle = Math.PI + (this.level / 100) * Math.PI;
        const grad = ctx.createLinearGradient(25, 0, 225, 0);
        grad.addColorStop(0, '#e74c3c'); grad.addColorStop(0.5, '#f39c12'); grad.addColorStop(1, '#2ecc71');
        ctx.beginPath(); ctx.arc(125, 140, 100, Math.PI, angle); ctx.lineWidth = 20; ctx.strokeStyle = grad; ctx.stroke();
        // Log
        const today = new Date().toDateString();
        const todayLog = this.log.filter(l => new Date(l.time).toDateString() === today);
        document.getElementById('eb-log').innerHTML = todayLog.reverse().map(l => `
            <div style="padding:.25rem 0;font-size:.85rem;display:flex;justify-content:space-between;">
                <span>${new Date(l.time).toLocaleTimeString()}</span>
                <span style="color:${l.amount > 0 ? 'var(--success)' : 'var(--danger)'};">${l.amount > 0 ? '+' : ''}${l.amount}</span>
            </div>`).join('') || '<p style="color:var(--text-muted);">No adjustments today</p>';
    },
    saveData() { Core.Storage.set('emotional-bandwidth', { level: this.level, log: this.log.slice(-100) }); },
    loadData() { const d = Core.Storage.get('emotional-bandwidth'); this.level = d?.level ?? 75; this.log = d?.log || []; }
};

window.EnergyVampireDetector = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Energy Vampire Detector</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Log Interaction</h3>
                    <input type="text" id="evd-name" class="input-field" placeholder="Person or activity name" style="width:100%;margin-bottom:.75rem;">
                    <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:.75rem;">
                        <label style="color:var(--text-muted);min-width:80px;">Impact:</label>
                        <input type="range" id="evd-impact" min="-5" max="5" value="0" style="flex:1;">
                        <span id="evd-impact-val" style="min-width:30px;text-align:center;font-weight:bold;">0</span>
                    </div>
                    <button id="evd-log" class="btn btn-primary" style="width:100%;">Log</button>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <h3 style="color:var(--danger);">Energy Vampires</h3>
                        <div id="evd-vampires"></div>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                        <h3 style="color:var(--success);">Energy Radiators</h3>
                        <div id="evd-radiators"></div>
                    </div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('evd-impact').addEventListener('input', e => {
            document.getElementById('evd-impact-val').textContent = e.target.value;
        });
        document.getElementById('evd-log').addEventListener('click', () => this.logEntry());
        this.render();
    },
    logEntry() {
        const name = document.getElementById('evd-name').value.trim();
        const impact = parseInt(document.getElementById('evd-impact').value);
        if (!name) { Core.Toast.show('Enter a name', 'warning'); return; }
        this.entries.push({ name, impact, date: Date.now() });
        document.getElementById('evd-name').value = '';
        document.getElementById('evd-impact').value = 0;
        document.getElementById('evd-impact-val').textContent = '0';
        this.saveData(); this.render();
        Core.Toast.show(impact < 0 ? 'Vampire detected!' : 'Radiator logged!', impact < 0 ? 'warning' : 'success');
    },
    render() {
        const aggregated = {};
        this.entries.forEach(e => {
            if (!aggregated[e.name]) aggregated[e.name] = { total: 0, count: 0 };
            aggregated[e.name].total += e.impact;
            aggregated[e.name].count++;
        });
        const sorted = Object.entries(aggregated).map(([name, data]) => ({ name, avg: data.total / data.count, total: data.total, count: data.count }));
        const vampires = sorted.filter(s => s.avg < 0).sort((a, b) => a.avg - b.avg);
        const radiators = sorted.filter(s => s.avg > 0).sort((a, b) => b.avg - a.avg);
        document.getElementById('evd-vampires').innerHTML = vampires.map(v =>
            `<div style="padding:.5rem;margin-bottom:.5rem;background:var(--bg-secondary);border-radius:var(--radius);border-left:3px solid var(--danger);">
                <strong>${v.name}</strong><br><span style="font-size:.8rem;color:var(--text-muted);">Avg: ${v.avg.toFixed(1)} (${v.count}x)</span>
            </div>`).join('') || '<p style="color:var(--text-muted);font-size:.85rem;">No vampires detected</p>';
        document.getElementById('evd-radiators').innerHTML = radiators.map(r =>
            `<div style="padding:.5rem;margin-bottom:.5rem;background:var(--bg-secondary);border-radius:var(--radius);border-left:3px solid var(--success);">
                <strong>${r.name}</strong><br><span style="font-size:.8rem;color:var(--text-muted);">Avg: +${r.avg.toFixed(1)} (${r.count}x)</span>
            </div>`).join('') || '<p style="color:var(--text-muted);font-size:.85rem;">No radiators yet</p>';
    },
    saveData() { Core.Storage.set('energy-vampire', { entries: this.entries }); },
    loadData() { const d = Core.Storage.get('energy-vampire'); this.entries = d?.entries || []; }
};

window.PersonalNoiseFilter = {
    SOURCES: ['News', 'Social Media', 'Email', 'Meetings', 'Notifications', 'Gossip', 'Ads', 'TV/Streaming'],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Personal Noise Filter</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Rate Your Information Sources</h3>
                    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1rem;">1 = Pure noise, 10 = High signal</p>
                    ${this.SOURCES.map(s => `
                        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem;">
                            <span style="min-width:120px;">${s}</span>
                            <input type="range" class="pnf-range" data-source="${s}" min="1" max="10" value="5" style="flex:1;">
                            <span class="pnf-val" style="min-width:20px;font-weight:bold;">5</span>
                        </div>`).join('')}
                    <button id="pnf-save" class="btn btn-primary" style="width:100%;margin-top:1rem;">Save Assessment</button>
                </div>
                <div id="pnf-results" style="display:none;background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Noise Report</h3>
                    <div id="pnf-ratio" style="text-align:center;font-size:2rem;font-weight:bold;margin:1rem 0;"></div>
                    <h4>Reduce These (High Noise):</h4>
                    <div id="pnf-reduce"></div>
                    <h4 style="margin-top:1rem;">Keep These (High Signal):</h4>
                    <div id="pnf-keep"></div>
                </div>
            </div>`;
        this.loadData();
        document.querySelectorAll('.pnf-range').forEach((r, i) => {
            r.addEventListener('input', e => {
                e.target.nextElementSibling.textContent = e.target.value;
            });
        });
        document.getElementById('pnf-save').addEventListener('click', () => this.assess());
        if (this.lastAssessment) this.showResults(this.lastAssessment);
    },
    assess() {
        const ratings = {};
        document.querySelectorAll('.pnf-range').forEach(r => { ratings[r.dataset.source] = parseInt(r.value); });
        this.lastAssessment = ratings;
        this.saveData();
        this.showResults(ratings);
        Core.Toast.show('Noise assessment saved', 'success');
    },
    showResults(ratings) {
        const el = document.getElementById('pnf-results');
        el.style.display = 'block';
        const vals = Object.values(ratings);
        const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
        document.getElementById('pnf-ratio').textContent = `Signal Score: ${avg}/10`;
        const sorted = Object.entries(ratings).sort((a, b) => a[1] - b[1]);
        document.getElementById('pnf-reduce').innerHTML = sorted.filter(([, v]) => v <= 4).map(([s, v]) =>
            `<div style="padding:.5rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:.25rem;border-left:3px solid var(--danger);">${s} (${v}/10)</div>`
        ).join('') || '<p style="color:var(--text-muted);">All sources seem okay!</p>';
        document.getElementById('pnf-keep').innerHTML = sorted.filter(([, v]) => v >= 7).reverse().map(([s, v]) =>
            `<div style="padding:.5rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:.25rem;border-left:3px solid var(--success);">${s} (${v}/10)</div>`
        ).join('') || '<p style="color:var(--text-muted);">Rate sources higher to identify keepers</p>';
    },
    saveData() { Core.Storage.set('noise-filter', { lastAssessment: this.lastAssessment }); },
    loadData() { const d = Core.Storage.get('noise-filter'); this.lastAssessment = d?.lastAssessment || null; }
};

window.OverwhelmOverflow = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Overwhelm Overflow</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Brain Dump</h3>
                    <textarea id="oo-dump" class="input-field" rows="4" placeholder="Dump everything that's overwhelming you... one thought per line" style="width:100%;resize:vertical;"></textarea>
                    <button id="oo-process" class="btn btn-primary" style="width:100%;margin-top:.75rem;">Process & Categorize</button>
                </div>
                <div id="oo-buckets" style="display:none;display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                    <div style="background:var(--bg);padding:1rem;border-radius:var(--radius-lg);border-top:3px solid var(--success);">
                        <h4>Actionable</h4><div id="oo-action"></div>
                    </div>
                    <div style="background:var(--bg);padding:1rem;border-radius:var(--radius-lg);border-top:3px solid #3498db;">
                        <h4>Delegatable</h4><div id="oo-delegate"></div>
                    </div>
                    <div style="background:var(--bg);padding:1rem;border-radius:var(--radius-lg);border-top:3px solid var(--warning);">
                        <h4>Can't Control</h4><div id="oo-worry"></div>
                        <button onclick="OverwhelmOverflow.clearBucket('worry')" class="btn btn-secondary" style="width:100%;margin-top:.5rem;font-size:.8rem;">Release These</button>
                    </div>
                    <div style="background:var(--bg);padding:1rem;border-radius:var(--radius-lg);border-top:3px solid var(--text-muted);">
                        <h4>Already Handled</h4><div id="oo-done"></div>
                        <button onclick="OverwhelmOverflow.clearBucket('done')" class="btn btn-secondary" style="width:100%;margin-top:.5rem;font-size:.8rem;">Clear Done</button>
                    </div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('oo-process').addEventListener('click', () => this.process());
        this.render();
    },
    process() {
        const text = document.getElementById('oo-dump').value.trim();
        if (!text) { Core.Toast.show('Dump your thoughts first!', 'warning'); return; }
        const lines = text.split('\n').filter(l => l.trim());
        lines.forEach(l => {
            if (!this.items.some(i => i.text === l.trim())) {
                this.items.push({ text: l.trim(), bucket: 'action', id: Date.now() + Math.random() });
            }
        });
        document.getElementById('oo-dump').value = '';
        this.saveData(); this.render();
        Core.Toast.show(`${lines.length} items processed! Drag to categorize.`, 'success');
    },
    moveTo(id, bucket) {
        const item = this.items.find(i => i.id === id);
        if (item) { item.bucket = bucket; this.saveData(); this.render(); }
    },
    clearBucket(bucket) {
        this.items = this.items.filter(i => i.bucket !== bucket);
        this.saveData(); this.render();
        Core.Toast.show('Released!', 'success');
    },
    removeItem(id) { this.items = this.items.filter(i => i.id !== id); this.saveData(); this.render(); },
    render() {
        const buckets = { action: 'oo-action', delegate: 'oo-delegate', worry: 'oo-worry', done: 'oo-done' };
        const bucketNames = { action: 'action', delegate: 'delegate', worry: 'worry', done: 'done' };
        const otherBuckets = { action: ['delegate', 'worry', 'done'], delegate: ['action', 'worry', 'done'], worry: ['action', 'delegate', 'done'], done: ['action', 'delegate', 'worry'] };
        for (const [bucket, elId] of Object.entries(buckets)) {
            const items = this.items.filter(i => i.bucket === bucket);
            document.getElementById(elId).innerHTML = items.map(i => `
                <div style="padding:.5rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:.5rem;font-size:.85rem;">
                    ${i.text}
                    <div style="margin-top:.25rem;display:flex;gap:.25rem;">
                        ${otherBuckets[bucket].map(b => `<button onclick="OverwhelmOverflow.moveTo(${i.id},'${b}')" style="font-size:.65rem;padding:2px 6px;background:var(--bg);border:1px solid var(--border);border-radius:3px;cursor:pointer;">${b}</button>`).join('')}
                        <button onclick="OverwhelmOverflow.removeItem(${i.id})" style="font-size:.65rem;padding:2px 6px;background:none;border:1px solid var(--danger);color:var(--danger);border-radius:3px;cursor:pointer;">x</button>
                    </div>
                </div>`).join('') || '<p style="color:var(--text-muted);font-size:.8rem;">Empty</p>';
        }
        document.getElementById('oo-buckets').style.display = this.items.length ? 'grid' : 'none';
    },
    saveData() { Core.Storage.set('overwhelm-overflow', { items: this.items }); },
    loadData() { const d = Core.Storage.get('overwhelm-overflow'); this.items = d?.items || []; }
};

window.RecoveryTimeCalculator = {
    ACTIVITIES: {
        'Intense meeting': { base: 30, multiplier: 1.5 },
        'Social event': { base: 45, multiplier: 2 },
        'Exercise': { base: 20, multiplier: 0.8 },
        'Creative work': { base: 15, multiplier: 1 },
        'Emotional conversation': { base: 40, multiplier: 1.8 },
        'Presentation': { base: 35, multiplier: 1.5 },
        'Conflict/argument': { base: 60, multiplier: 2.5 },
        'Travel': { base: 30, multiplier: 1.2 }
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        const options = Object.keys(this.ACTIVITIES).map(a => `<option value="${a}">${a}</option>`).join('');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Recovery Time Calculator</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <select id="rtc-type" class="input-field" style="width:100%;margin-bottom:.75rem;">${options}</select>
                    <div style="display:flex;gap:.75rem;margin-bottom:.75rem;">
                        <input type="number" id="rtc-duration" class="input-field" placeholder="Duration (min)" min="1" style="flex:1;">
                        <select id="rtc-intensity" class="input-field" style="flex:1;">
                            <option value="0.5">Low intensity</option>
                            <option value="1" selected>Medium</option>
                            <option value="1.5">High intensity</option>
                        </select>
                    </div>
                    <button id="rtc-calc" class="btn btn-primary" style="width:100%;">Calculate Recovery</button>
                </div>
                <div id="rtc-result" style="display:none;background:linear-gradient(135deg,var(--secondary),var(--secondary-light));color:white;padding:2rem;border-radius:var(--radius-lg);text-align:center;margin-bottom:1.5rem;">
                    <div style="font-size:.9rem;">Estimated Recovery Time</div>
                    <div id="rtc-time" style="font-size:3rem;font-weight:bold;margin:.5rem 0;"></div>
                    <div id="rtc-tips" style="font-size:.9rem;margin-top:1rem;"></div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Recovery History</h3>
                    <div id="rtc-history" style="max-height:200px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('rtc-calc').addEventListener('click', () => this.calculate());
        this.renderHistory();
    },
    calculate() {
        const type = document.getElementById('rtc-type').value;
        const duration = parseInt(document.getElementById('rtc-duration').value);
        const intensity = parseFloat(document.getElementById('rtc-intensity').value);
        if (!duration) { Core.Toast.show('Enter a duration', 'warning'); return; }
        const config = this.ACTIVITIES[type];
        const recovery = Math.round((config.base + duration * 0.3) * config.multiplier * intensity);
        const hours = Math.floor(recovery / 60);
        const mins = recovery % 60;
        const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
        document.getElementById('rtc-result').style.display = 'block';
        document.getElementById('rtc-time').textContent = timeStr;
        const tips = ['Take a walk', 'Hydrate well', 'Do some light stretching', 'Listen to calming music', 'Take a short nap'];
        document.getElementById('rtc-tips').textContent = 'Tip: ' + tips[Math.floor(Math.random() * tips.length)];
        this.history.push({ type, duration, intensity, recovery, date: Date.now() });
        this.saveData(); this.renderHistory();
    },
    renderHistory() {
        document.getElementById('rtc-history').innerHTML = this.history.slice(-10).reverse().map(h => {
            const hours = Math.floor(h.recovery / 60);
            const mins = h.recovery % 60;
            return `<div style="padding:.5rem;border-bottom:1px solid var(--border);font-size:.85rem;">
                <strong>${h.type}</strong> (${h.duration}min) → Recovery: ${hours > 0 ? hours + 'h ' : ''}${mins}m
            </div>`;
        }).join('') || '<p style="color:var(--text-muted);">No calculations yet</p>';
    },
    saveData() { Core.Storage.set('recovery-calc', { history: this.history }); },
    loadData() { const d = Core.Storage.get('recovery-calc'); this.history = d?.history || []; }
};

window.EmotionalLaborTracker = {
    TYPES: ['Active listening', 'Conflict mediation', 'Mood management', 'Emotional support', 'Event planning', 'Remembering details', 'Anticipating needs', 'Keeping the peace'],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Emotional Labor Tracker</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Log Emotional Labor</h3>
                    <select id="elt-type" class="input-field" style="width:100%;margin-bottom:.75rem;">
                        ${this.TYPES.map(t => `<option>${t}</option>`).join('')}
                    </select>
                    <div style="display:flex;gap:.75rem;">
                        <input type="number" id="elt-mins" class="input-field" placeholder="Minutes spent" min="1" style="flex:1;">
                        <select id="elt-cost" class="input-field" style="flex:1;">
                            <option value="1">Low toll</option>
                            <option value="2">Moderate</option>
                            <option value="3">High toll</option>
                            <option value="4">Very draining</option>
                            <option value="5">Exhausting</option>
                        </select>
                    </div>
                    <button id="elt-log" class="btn btn-primary" style="width:100%;margin-top:.75rem;">Log</button>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:center;">
                        <div style="color:var(--text-muted);font-size:.85rem;">This Week</div>
                        <div id="elt-hours" style="font-size:2rem;font-weight:bold;">0h</div>
                        <div style="color:var(--text-muted);font-size:.8rem;">of emotional labor</div>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:center;">
                        <div style="color:var(--text-muted);font-size:.85rem;">Avg Emotional Cost</div>
                        <div id="elt-avg-cost" style="font-size:2rem;font-weight:bold;">-</div>
                        <div style="color:var(--text-muted);font-size:.8rem;">out of 5</div>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Recent Entries</h3>
                    <div id="elt-list" style="max-height:250px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('elt-log').addEventListener('click', () => this.logEntry());
        this.render();
    },
    logEntry() {
        const type = document.getElementById('elt-type').value;
        const mins = parseInt(document.getElementById('elt-mins').value);
        const cost = parseInt(document.getElementById('elt-cost').value);
        if (!mins) { Core.Toast.show('Enter minutes spent', 'warning'); return; }
        this.entries.push({ type, mins, cost, date: Date.now() });
        document.getElementById('elt-mins').value = '';
        this.saveData(); this.render();
        Core.Toast.show('Emotional labor logged. Your work matters.', 'info');
    },
    render() {
        const weekAgo = Date.now() - 7 * 86400000;
        const week = this.entries.filter(e => e.date > weekAgo);
        const totalMins = week.reduce((a, e) => a + e.mins, 0);
        document.getElementById('elt-hours').textContent = totalMins >= 60 ? Math.round(totalMins / 60) + 'h' : totalMins + 'm';
        if (week.length) {
            const avgCost = (week.reduce((a, e) => a + e.cost, 0) / week.length).toFixed(1);
            document.getElementById('elt-avg-cost').textContent = avgCost;
        }
        document.getElementById('elt-list').innerHTML = this.entries.slice(-15).reverse().map(e =>
            `<div style="padding:.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;font-size:.85rem;">
                <div><strong>${e.type}</strong> (${e.mins}m)</div>
                <div>Cost: ${'*'.repeat(e.cost)}<span style="color:var(--text-muted);margin-left:.5rem;">${new Date(e.date).toLocaleDateString()}</span></div>
            </div>`).join('') || '<p style="color:var(--text-muted);">No entries yet</p>';
    },
    saveData() { Core.Storage.set('emotional-labor', { entries: this.entries }); },
    loadData() { const d = Core.Storage.get('emotional-labor'); this.entries = d?.entries || []; }
};

window.PersonalPaceFinder = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Personal Pace Finder</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Experiment: Natural Reading Speed</h3>
                    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1rem;">Read this passage at your comfortable pace, then click "Done".</p>
                    <div id="ppf-passage" style="padding:1rem;background:var(--bg-secondary);border-radius:var(--radius);line-height:1.8;margin-bottom:1rem;">
                        The best pace is the one that feels natural to you. There is no rush, no deadline, no competition. Your body and mind have their own rhythm — a tempo that, when honored, produces your best and most sustainable work. Some people are sprinters, operating in intense bursts. Others are marathoners, maintaining a steady, unhurried cadence. Neither is better. The key is discovering which one you are.
                    </div>
                    <div style="display:flex;gap:1rem;">
                        <button id="ppf-start-read" class="btn btn-primary">Start Reading</button>
                        <button id="ppf-done-read" class="btn btn-secondary" disabled>Done Reading</button>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Experiment: Comfortable Task Speed</h3>
                    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1rem;">Count from 1 to 30 at your natural pace. Click start, count, then click done.</p>
                    <div style="display:flex;gap:1rem;">
                        <button id="ppf-start-count" class="btn btn-primary">Start Counting</button>
                        <button id="ppf-done-count" class="btn btn-secondary" disabled>Done Counting</button>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Your Pace Profile</h3>
                    <div id="ppf-profile" style="text-align:center;padding:1rem;"></div>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('ppf-start-read').addEventListener('click', () => {
            this.readStart = Date.now();
            document.getElementById('ppf-done-read').disabled = false;
            document.getElementById('ppf-start-read').disabled = true;
        });
        document.getElementById('ppf-done-read').addEventListener('click', () => {
            this.readTime = (Date.now() - this.readStart) / 1000;
            this.readWPM = Math.round(74 / (this.readTime / 60)); // 74 words in passage
            this.saveData(); this.render();
            Core.Toast.show(`Reading speed: ~${this.readWPM} WPM`, 'info');
        });
        document.getElementById('ppf-start-count').addEventListener('click', () => {
            this.countStart = Date.now();
            document.getElementById('ppf-done-count').disabled = false;
            document.getElementById('ppf-start-count').disabled = true;
        });
        document.getElementById('ppf-done-count').addEventListener('click', () => {
            this.countTime = (Date.now() - this.countStart) / 1000;
            this.saveData(); this.render();
            Core.Toast.show(`Counting pace: ${this.countTime.toFixed(1)}s for 30`, 'info');
        });
    },
    render() {
        let profile = '';
        if (this.readWPM || this.countTime) {
            let pace = 'moderate';
            if (this.readWPM > 250 || (this.countTime && this.countTime < 15)) pace = 'fast';
            else if (this.readWPM < 150 || (this.countTime && this.countTime > 30)) pace = 'deliberate';
            const descriptions = {
                fast: 'You have a naturally quick pace. You process information rapidly. Schedule bursts of intense work with recovery breaks.',
                moderate: 'You have a balanced, sustainable pace. You can work steadily for extended periods. Leverage this with moderate-length focus blocks.',
                deliberate: 'You have a thoughtful, deliberate pace. You likely process deeply. Protect your time from rushing — your thoroughness is a strength.'
            };
            profile = `<div style="font-size:1.5rem;font-weight:bold;color:var(--secondary);margin-bottom:1rem;">${pace.charAt(0).toUpperCase() + pace.slice(1)} Pacer</div>
                <p style="color:var(--text-muted);">${descriptions[pace]}</p>
                ${this.readWPM ? `<p style="margin-top:.5rem;">Reading: ~${this.readWPM} WPM</p>` : ''}
                ${this.countTime ? `<p>Counting: ${this.countTime.toFixed(1)}s</p>` : ''}`;
        } else {
            profile = '<p style="color:var(--text-muted);">Complete the experiments above to discover your pace</p>';
        }
        document.getElementById('ppf-profile').innerHTML = profile;
    },
    saveData() { Core.Storage.set('personal-pace', { readWPM: this.readWPM, countTime: this.countTime }); },
    loadData() { const d = Core.Storage.get('personal-pace'); this.readWPM = d?.readWPM || 0; this.countTime = d?.countTime || 0; }
};

window.PersonalSeasonality = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Personal Seasonality</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Rate This Month</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
                        <div><label class="input-label">Mood</label><input type="range" id="ps-mood" min="1" max="5" value="3" style="width:100%;"></div>
                        <div><label class="input-label">Energy</label><input type="range" id="ps-energy" min="1" max="5" value="3" style="width:100%;"></div>
                        <div><label class="input-label">Productivity</label><input type="range" id="ps-prod" min="1" max="5" value="3" style="width:100%;"></div>
                    </div>
                    <button id="ps-save" class="btn btn-primary" style="width:100%;margin-top:1rem;">Save for ${months[new Date().getMonth()]}</button>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Your Year</h3>
                    <canvas id="ps-chart" width="650" height="200"></canvas>
                </div>
                <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius);">
                    <div id="ps-insights"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('ps-save').addEventListener('click', () => this.saveMonth());
        this.drawChart();
        this.showInsights();
    },
    saveMonth() {
        const month = new Date().getMonth();
        this.data[month] = {
            mood: parseInt(document.getElementById('ps-mood').value),
            energy: parseInt(document.getElementById('ps-energy').value),
            productivity: parseInt(document.getElementById('ps-prod').value)
        };
        this.saveData();
        this.drawChart();
        this.showInsights();
        Core.Toast.show('Month data saved!', 'success');
    },
    drawChart() {
        const c = document.getElementById('ps-chart'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 650, 200);
        const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
        const colors = { mood: '#e74c3c', energy: '#f39c12', productivity: '#2ecc71' };
        // Grid
        ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) { const y = 180 - i * 32; ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(640, y); ctx.stroke(); }
        // Lines
        for (const [key, color] of Object.entries(colors)) {
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
            let started = false;
            for (let m = 0; m < 12; m++) {
                if (this.data[m]) {
                    const x = 50 + m * 52;
                    const y = 180 - this.data[m][key] * 32;
                    started ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
                    started = true;
                    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
                }
            }
            ctx.stroke();
        }
        ctx.fillStyle = 'var(--text-muted)'; ctx.font = '11px sans-serif';
        months.forEach((m, i) => ctx.fillText(m, 46 + i * 52, 198));
    },
    showInsights() {
        const filled = Object.entries(this.data).filter(([, v]) => v);
        if (filled.length < 2) {
            document.getElementById('ps-insights').innerHTML = '<p style="color:var(--text-muted);">Log more months to see seasonal patterns</p>';
            return;
        }
        const best = filled.sort((a, b) => {
            const avgA = (a[1].mood + a[1].energy + a[1].productivity) / 3;
            const avgB = (b[1].mood + b[1].energy + b[1].productivity) / 3;
            return avgB - avgA;
        });
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        document.getElementById('ps-insights').innerHTML = `
            <p><strong>Best month:</strong> ${months[best[0][0]]} (avg ${((best[0][1].mood + best[0][1].energy + best[0][1].productivity) / 3).toFixed(1)}/5)</p>
            <p style="margin-top:.5rem;color:var(--text-muted);font-size:.85rem;">Legend: <span style="color:#e74c3c;">Mood</span> | <span style="color:#f39c12;">Energy</span> | <span style="color:#2ecc71;">Productivity</span></p>`;
    },
    saveData() { Core.Storage.set('personal-seasonality', { data: this.data }); },
    loadData() { const d = Core.Storage.get('personal-seasonality'); this.data = d?.data || {}; }
};

window.PersonalCompass = {
    VALUES: ['Integrity', 'Creativity', 'Family', 'Growth', 'Adventure', 'Security', 'Freedom', 'Compassion', 'Achievement', 'Health', 'Learning', 'Connection', 'Justice', 'Fun', 'Spirituality', 'Wealth', 'Service', 'Courage', 'Authenticity', 'Balance'],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Personal Compass</h2>
                <div id="pc-setup" style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;${this.myValues.length ? 'display:none;' : ''}">
                    <h3>Choose Your Top 5 Values</h3>
                    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin:1rem 0;">
                        ${this.VALUES.map(v => `<button class="btn btn-secondary pc-val" data-val="${v}" style="font-size:.85rem;">${v}</button>`).join('')}
                    </div>
                    <div id="pc-selected" style="margin:1rem 0;font-weight:bold;"></div>
                    <button id="pc-confirm" class="btn btn-primary" style="width:100%;" disabled>Set My Values</button>
                </div>
                <div id="pc-check" style="${!this.myValues.length ? 'display:none;' : ''}">
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                        <h3>Compass Check</h3>
                        <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:1rem;">Rate how aligned your recent actions are with each value (1-5):</p>
                        <div id="pc-sliders"></div>
                        <button id="pc-save-check" class="btn btn-primary" style="width:100%;margin-top:1rem;">Save Check</button>
                    </div>
                    <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1rem;">
                        <h3>Alignment Score</h3>
                        <div id="pc-score" style="text-align:center;font-size:3rem;font-weight:bold;"></div>
                    </div>
                    <button onclick="PersonalCompass.resetValues()" class="btn btn-secondary" style="font-size:.8rem;">Change Values</button>
                </div>
            </div>`;
        this.attachEvents();
        this.renderCheck();
    },
    attachEvents() {
        const selected = [];
        document.querySelectorAll('.pc-val').forEach(b => b.addEventListener('click', e => {
            const val = e.target.dataset.val;
            const idx = selected.indexOf(val);
            if (idx >= 0) { selected.splice(idx, 1); e.target.style.background = ''; }
            else if (selected.length < 5) { selected.push(val); e.target.style.background = 'var(--secondary)'; e.target.style.color = 'white'; }
            document.getElementById('pc-selected').textContent = selected.join(', ');
            document.getElementById('pc-confirm').disabled = selected.length !== 5;
        }));
        document.getElementById('pc-confirm').addEventListener('click', () => {
            this.myValues = [...selected];
            this.saveData();
            document.getElementById('pc-setup').style.display = 'none';
            document.getElementById('pc-check').style.display = 'block';
            this.renderCheck();
        });
    },
    renderCheck() {
        if (!this.myValues.length) return;
        document.getElementById('pc-sliders').innerHTML = this.myValues.map(v => `
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.5rem;">
                <span style="min-width:100px;">${v}</span>
                <input type="range" class="pc-align" data-val="${v}" min="1" max="5" value="3" style="flex:1;">
                <span class="pc-align-val" style="min-width:20px;">3</span>
            </div>`).join('');
        document.querySelectorAll('.pc-align').forEach(r => r.addEventListener('input', e => {
            e.target.nextElementSibling.textContent = e.target.value;
        }));
        document.getElementById('pc-save-check').addEventListener('click', () => this.saveCheck());
        if (this.checks.length) {
            const last = this.checks[this.checks.length - 1];
            const avg = (Object.values(last.scores).reduce((a, b) => a + b, 0) / this.myValues.length).toFixed(1);
            document.getElementById('pc-score').textContent = avg + '/5';
            document.getElementById('pc-score').style.color = avg >= 3.5 ? 'var(--success)' : avg >= 2.5 ? 'var(--warning)' : 'var(--danger)';
        } else {
            document.getElementById('pc-score').innerHTML = '<span style="color:var(--text-muted);font-size:1rem;">Complete a check first</span>';
        }
    },
    saveCheck() {
        const scores = {};
        document.querySelectorAll('.pc-align').forEach(r => { scores[r.dataset.val] = parseInt(r.value); });
        this.checks.push({ scores, date: Date.now() });
        this.saveData(); this.renderCheck();
        Core.Toast.show('Compass check saved!', 'success');
    },
    resetValues() { this.myValues = []; this.checks = []; this.saveData(); this.init(); },
    saveData() { Core.Storage.set('personal-compass', { myValues: this.myValues, checks: this.checks }); },
    loadData() { const d = Core.Storage.get('personal-compass'); this.myValues = d?.myValues || []; this.checks = d?.checks || []; }
};

// Call loadData in init for PersonalCompass since it needs data before rendering
const _pcOldInit = window.PersonalCompass.init;
window.PersonalCompass.init = function() { this.loadData(); _pcOldInit.call(this); };

console.log('Remaining tools batch 1 loaded.');
