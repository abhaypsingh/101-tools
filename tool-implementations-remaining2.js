// Remaining Tool Implementations - Batch 2 (12 tools)

window.EmotionColorPicker = {
    EMOTIONS: {
        '#e74c3c': { name: 'Anger/Passion', desc: 'Intensity, urgency, strong feeling' },
        '#e67e22': { name: 'Excitement', desc: 'Enthusiasm, warmth, anticipation' },
        '#f1c40f': { name: 'Joy/Optimism', desc: 'Happiness, hope, energy' },
        '#2ecc71': { name: 'Calm/Growth', desc: 'Peace, balance, renewal' },
        '#1abc9c': { name: 'Serenity', desc: 'Tranquility, clarity, healing' },
        '#3498db': { name: 'Trust/Sadness', desc: 'Depth, reflection, melancholy' },
        '#9b59b6': { name: 'Creativity', desc: 'Imagination, mystery, inspiration' },
        '#e91e63': { name: 'Love/Compassion', desc: 'Affection, tenderness, care' },
        '#795548': { name: 'Stability', desc: 'Grounding, comfort, reliability' },
        '#607d8b': { name: 'Neutral/Detached', desc: 'Objectivity, distance, composure' },
        '#212121': { name: 'Heaviness', desc: 'Grief, exhaustion, overwhelm' },
        '#fafafa': { name: 'Clarity/Emptiness', desc: 'Openness, purity, fresh start' }
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        const colorBtns = Object.entries(this.EMOTIONS).map(([color, info]) =>
            `<button class="ecp-color" data-color="${color}" data-name="${info.name}" style="width:60px;height:60px;background:${color};border:3px solid transparent;border-radius:50%;cursor:pointer;transition:transform .2s;" title="${info.name}"></button>`
        ).join('');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Emotion Color Picker</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>How do you feel right now? Pick a color.</h3>
                    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin:1.5rem 0;">
                        ${colorBtns}
                    </div>
                    <div id="ecp-selected" style="display:none;padding:1.5rem;border-radius:var(--radius);margin-top:1rem;">
                        <div id="ecp-name" style="font-size:1.3rem;font-weight:bold;"></div>
                        <div id="ecp-desc" style="color:var(--text-muted);margin-top:.25rem;"></div>
                        <textarea id="ecp-note" class="input-field" placeholder="Optional note about this feeling..." rows="2" style="width:100%;margin-top:1rem;"></textarea>
                        <button id="ecp-save" class="btn btn-primary" style="width:100%;margin-top:.75rem;">Save This Feeling</button>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Your Color Timeline</h3>
                    <div id="ecp-timeline" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin-top:1rem;"></div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Dominant Colors</h3>
                    <div id="ecp-stats"></div>
                </div>
            </div>`;
        this.loadData();
        this.selectedColor = null;
        document.querySelectorAll('.ecp-color').forEach(b => b.addEventListener('click', e => {
            const color = e.target.dataset.color;
            this.selectedColor = color;
            document.querySelectorAll('.ecp-color').forEach(c => { c.style.transform = c.dataset.color === color ? 'scale(1.3)' : 'scale(1)'; c.style.borderColor = c.dataset.color === color ? 'var(--text)' : 'transparent'; });
            const info = this.EMOTIONS[color];
            document.getElementById('ecp-selected').style.display = 'block';
            document.getElementById('ecp-selected').style.background = color + '22';
            document.getElementById('ecp-name').textContent = info.name;
            document.getElementById('ecp-desc').textContent = info.desc;
        }));
        document.getElementById('ecp-save').addEventListener('click', () => this.saveFeeling());
        this.render();
    },
    saveFeeling() {
        if (!this.selectedColor) return;
        const note = document.getElementById('ecp-note').value.trim();
        this.entries.push({ color: this.selectedColor, name: this.EMOTIONS[this.selectedColor].name, note, date: Date.now() });
        document.getElementById('ecp-note').value = '';
        this.saveData(); this.render();
        Core.Toast.show('Feeling captured!', 'success');
    },
    render() {
        document.getElementById('ecp-timeline').innerHTML = this.entries.slice(-50).map(e =>
            `<div style="width:24px;height:24px;background:${e.color};border-radius:50%;cursor:pointer;" title="${e.name} - ${new Date(e.date).toLocaleDateString()}"></div>`
        ).join('') || '<p style="color:var(--text-muted);">Pick colors to build your timeline</p>';
        const freq = {};
        this.entries.forEach(e => { freq[e.color] = (freq[e.color] || 0) + 1; });
        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        document.getElementById('ecp-stats').innerHTML = sorted.slice(0, 5).map(([color, count]) =>
            `<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem;">
                <div style="width:30px;height:30px;background:${color};border-radius:50%;"></div>
                <span>${this.EMOTIONS[color]?.name || 'Unknown'}</span>
                <span style="color:var(--text-muted);">${count}x</span>
            </div>`).join('') || '<p style="color:var(--text-muted);">No data yet</p>';
    },
    saveData() { Core.Storage.set('emotion-color-picker', { entries: this.entries }); },
    loadData() { const d = Core.Storage.get('emotion-color-picker'); this.entries = d?.entries || []; }
};

window.TransitionRitualCreator = {
    TEMPLATES: [
        { name: 'Work to Home', steps: ['Close all work tabs', 'Write tomorrow\'s top 3 tasks', 'Take 3 deep breaths', 'Change clothes', 'Short walk or stretch'] },
        { name: 'Morning Startup', steps: ['Drink water', 'Stretch for 2 min', 'Review today\'s priorities', 'Set intention for the day'] },
        { name: 'Task to Task', steps: ['Save current work', 'Stand and stretch', 'Take 3 breaths', 'Review next task requirements'] }
    ],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Transition Ritual Creator</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Create New Ritual</h3>
                    <input type="text" id="trc-name" class="input-field" placeholder="Ritual name (e.g., Work to Home)" style="width:100%;margin-bottom:.75rem;">
                    <div id="trc-steps">
                        <div style="display:flex;gap:.5rem;margin-bottom:.5rem;">
                            <input type="text" class="input-field trc-step" placeholder="Step 1" style="flex:1;">
                            <input type="number" class="input-field trc-dur" placeholder="Sec" min="10" value="30" style="width:80px;">
                        </div>
                    </div>
                    <button id="trc-add-step" class="btn btn-secondary" style="font-size:.85rem;margin-bottom:.75rem;">+ Add Step</button>
                    <button id="trc-save" class="btn btn-primary" style="width:100%;">Save Ritual</button>
                </div>
                <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius);margin-bottom:1.5rem;">
                    <h4>Quick Templates</h4>
                    <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem;">
                        ${this.TEMPLATES.map((t, i) => `<button class="btn btn-secondary trc-template" data-idx="${i}" style="font-size:.8rem;">${t.name}</button>`).join('')}
                    </div>
                </div>
                <div id="trc-rituals"></div>
                <div id="trc-runner" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.9);color:white;display:none;align-items:center;justify-content:center;z-index:1000;flex-direction:column;">
                    <div id="trc-runner-step" style="font-size:2rem;margin-bottom:1rem;"></div>
                    <div id="trc-runner-timer" style="font-size:4rem;font-weight:bold;font-family:monospace;"></div>
                    <button id="trc-runner-skip" class="btn btn-secondary" style="margin-top:2rem;">Skip Step</button>
                    <button id="trc-runner-close" class="btn btn-danger" style="margin-top:1rem;">End Ritual</button>
                </div>
            </div>`;
        this.loadData();
        this.attachEvents();
        this.render();
    },
    attachEvents() {
        document.getElementById('trc-add-step').addEventListener('click', () => {
            const container = document.getElementById('trc-steps');
            const count = container.children.length + 1;
            const div = document.createElement('div');
            div.style.cssText = 'display:flex;gap:.5rem;margin-bottom:.5rem;';
            div.innerHTML = `<input type="text" class="input-field trc-step" placeholder="Step ${count}" style="flex:1;">
                <input type="number" class="input-field trc-dur" placeholder="Sec" min="10" value="30" style="width:80px;">`;
            container.appendChild(div);
        });
        document.getElementById('trc-save').addEventListener('click', () => this.saveRitual());
        document.querySelectorAll('.trc-template').forEach(b => b.addEventListener('click', e => {
            const t = this.TEMPLATES[e.target.dataset.idx];
            document.getElementById('trc-name').value = t.name;
            document.getElementById('trc-steps').innerHTML = t.steps.map((s, i) =>
                `<div style="display:flex;gap:.5rem;margin-bottom:.5rem;">
                    <input type="text" class="input-field trc-step" placeholder="Step ${i + 1}" value="${s}" style="flex:1;">
                    <input type="number" class="input-field trc-dur" placeholder="Sec" min="10" value="30" style="width:80px;">
                </div>`).join('');
        }));
        document.getElementById('trc-runner-close').addEventListener('click', () => this.stopRunner());
        document.getElementById('trc-runner-skip').addEventListener('click', () => { this.runnerStepIdx++; this.runStep(); });
    },
    saveRitual() {
        const name = document.getElementById('trc-name').value.trim();
        const stepEls = document.querySelectorAll('.trc-step');
        const durEls = document.querySelectorAll('.trc-dur');
        const steps = [];
        stepEls.forEach((el, i) => { if (el.value.trim()) steps.push({ name: el.value.trim(), duration: parseInt(durEls[i].value) || 30 }); });
        if (!name || !steps.length) { Core.Toast.show('Add a name and at least one step', 'warning'); return; }
        this.rituals.push({ name, steps, id: Date.now(), completions: 0 });
        document.getElementById('trc-name').value = '';
        document.getElementById('trc-steps').innerHTML = '<div style="display:flex;gap:.5rem;margin-bottom:.5rem;"><input type="text" class="input-field trc-step" placeholder="Step 1" style="flex:1;"><input type="number" class="input-field trc-dur" placeholder="Sec" min="10" value="30" style="width:80px;"></div>';
        this.saveData(); this.render();
        Core.Toast.show('Ritual created!', 'success');
    },
    startRitual(id) {
        const ritual = this.rituals.find(r => r.id === id);
        if (!ritual) return;
        this.currentRitual = ritual;
        this.runnerStepIdx = 0;
        document.getElementById('trc-runner').style.display = 'flex';
        this.runStep();
    },
    runStep() {
        if (this.runnerStepIdx >= this.currentRitual.steps.length) {
            this.currentRitual.completions++;
            this.saveData();
            this.stopRunner();
            this.render();
            Core.Toast.show('Ritual complete!', 'success');
            return;
        }
        const step = this.currentRitual.steps[this.runnerStepIdx];
        document.getElementById('trc-runner-step').textContent = step.name;
        let remaining = step.duration;
        clearInterval(this._ri);
        this._ri = setInterval(() => {
            remaining--;
            document.getElementById('trc-runner-timer').textContent = remaining + 's';
            if (remaining <= 0) { clearInterval(this._ri); this.runnerStepIdx++; this.runStep(); }
        }, 1000);
        document.getElementById('trc-runner-timer').textContent = remaining + 's';
    },
    stopRunner() { clearInterval(this._ri); document.getElementById('trc-runner').style.display = 'none'; },
    deleteRitual(id) { this.rituals = this.rituals.filter(r => r.id !== id); this.saveData(); this.render(); },
    render() {
        document.getElementById('trc-rituals').innerHTML = this.rituals.map(r =>
            `<div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">
                    <h3 style="margin:0;">${r.name}</h3>
                    <span style="color:var(--text-muted);font-size:.8rem;">${r.completions} times</span>
                </div>
                <div style="margin-bottom:.75rem;">${r.steps.map((s, i) => `<div style="font-size:.85rem;padding:.25rem 0;color:var(--text-muted);">${i + 1}. ${s.name} (${s.duration}s)</div>`).join('')}</div>
                <div style="display:flex;gap:.5rem;">
                    <button onclick="TransitionRitualCreator.startRitual(${r.id})" class="btn btn-primary" style="flex:1;font-size:.85rem;">Start</button>
                    <button onclick="TransitionRitualCreator.deleteRitual(${r.id})" class="btn btn-secondary" style="font-size:.85rem;">Delete</button>
                </div>
            </div>`).join('') || '';
    },
    saveData() { Core.Storage.set('transition-rituals', { rituals: this.rituals }); },
    loadData() { const d = Core.Storage.get('transition-rituals'); this.rituals = d?.rituals || []; }
};

window.EnergyRecipeBook = {
    DEFAULTS: [
        { name: '5-Minute Walk', category: 'physical', ingredients: ['Walking shoes', 'Fresh air'], prepTime: 1, boost: 4, bestTime: 'afternoon' },
        { name: 'Power Playlist', category: 'mental', ingredients: ['Headphones', 'Upbeat music'], prepTime: 1, boost: 3, bestTime: 'morning' },
        { name: 'Cold Water Splash', category: 'physical', ingredients: ['Cold water', 'Towel'], prepTime: 0, boost: 3, bestTime: 'any' },
        { name: 'Gratitude Burst', category: 'mental', ingredients: ['2 minutes', 'Pen & paper'], prepTime: 0, boost: 3, bestTime: 'morning' },
        { name: 'Dance Break', category: 'physical', ingredients: ['Music', '3 minutes'], prepTime: 0, boost: 5, bestTime: 'afternoon' },
        { name: 'Call a Friend', category: 'social', ingredients: ['Phone', '10 minutes'], prepTime: 0, boost: 4, bestTime: 'evening' }
    ],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Energy Recipe Book</h2>
                <div style="display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap;">
                    <button class="btn btn-primary erb-filter active" data-cat="all">All</button>
                    <button class="btn btn-secondary erb-filter" data-cat="physical">Physical</button>
                    <button class="btn btn-secondary erb-filter" data-cat="mental">Mental</button>
                    <button class="btn btn-secondary erb-filter" data-cat="social">Social</button>
                    <button class="btn btn-secondary erb-filter" data-cat="creative">Creative</button>
                    <button id="erb-random" class="btn btn-secondary" style="margin-left:auto;">I Need Energy Now!</button>
                </div>
                <div id="erb-recipes"></div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-top:1.5rem;">
                    <h3>Add Custom Recipe</h3>
                    <input type="text" id="erb-name" class="input-field" placeholder="Recipe name" style="width:100%;margin-bottom:.5rem;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:.5rem;">
                        <select id="erb-cat" class="input-field"><option value="physical">Physical</option><option value="mental">Mental</option><option value="social">Social</option><option value="creative">Creative</option></select>
                        <input type="number" id="erb-boost" class="input-field" placeholder="Boost (1-5)" min="1" max="5">
                    </div>
                    <input type="text" id="erb-ingredients" class="input-field" placeholder="Ingredients (comma separated)" style="width:100%;margin-bottom:.5rem;">
                    <button id="erb-add" class="btn btn-primary" style="width:100%;">Add Recipe</button>
                </div>
            </div>`;
        this.loadData();
        this.filter = 'all';
        document.querySelectorAll('.erb-filter').forEach(b => b.addEventListener('click', e => {
            this.filter = e.target.dataset.cat;
            document.querySelectorAll('.erb-filter').forEach(f => f.className = `btn btn-secondary erb-filter`);
            e.target.className = 'btn btn-primary erb-filter active';
            this.render();
        }));
        document.getElementById('erb-random').addEventListener('click', () => {
            const r = this.recipes[Math.floor(Math.random() * this.recipes.length)];
            Core.Toast.show(`Try: ${r.name} (Boost: ${'*'.repeat(r.boost)})`, 'success');
        });
        document.getElementById('erb-add').addEventListener('click', () => this.addRecipe());
        this.render();
    },
    addRecipe() {
        const name = document.getElementById('erb-name').value.trim();
        const category = document.getElementById('erb-cat').value;
        const boost = parseInt(document.getElementById('erb-boost').value) || 3;
        const ingredients = document.getElementById('erb-ingredients').value.split(',').map(s => s.trim()).filter(Boolean);
        if (!name) { Core.Toast.show('Enter a recipe name', 'warning'); return; }
        this.recipes.push({ name, category, boost, ingredients, prepTime: 0, bestTime: 'any', id: Date.now(), favorite: false });
        document.getElementById('erb-name').value = '';
        document.getElementById('erb-ingredients').value = '';
        this.saveData(); this.render();
        Core.Toast.show('Recipe added!', 'success');
    },
    toggleFav(id) { const r = this.recipes.find(r => r.id === id); if (r) { r.favorite = !r.favorite; this.saveData(); this.render(); } },
    render() {
        const filtered = this.filter === 'all' ? this.recipes : this.recipes.filter(r => r.category === this.filter);
        const catColors = { physical: '#2ecc71', mental: '#3498db', social: '#e67e22', creative: '#9b59b6' };
        document.getElementById('erb-recipes').innerHTML = filtered.map(r =>
            `<div style="background:var(--bg);padding:1.25rem;border-radius:var(--radius-lg);margin-bottom:.75rem;border-left:4px solid ${catColors[r.category] || 'var(--secondary)'};">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div><strong>${r.name}</strong> <span style="font-size:.75rem;background:${catColors[r.category]}22;color:${catColors[r.category]};padding:2px 8px;border-radius:10px;">${r.category}</span></div>
                    <span onclick="EnergyRecipeBook.toggleFav(${r.id})" style="cursor:pointer;font-size:1.2rem;">${r.favorite ? '*' : 'o'}</span>
                </div>
                <div style="font-size:.85rem;color:var(--text-muted);margin-top:.5rem;">Boost: ${'*'.repeat(r.boost)}${'·'.repeat(5 - r.boost)}</div>
                ${r.ingredients?.length ? `<div style="font-size:.8rem;color:var(--text-muted);margin-top:.25rem;">Needs: ${r.ingredients.join(', ')}</div>` : ''}
            </div>`).join('') || '<p style="color:var(--text-muted);text-align:center;">No recipes in this category</p>';
    },
    saveData() { Core.Storage.set('energy-recipes', { recipes: this.recipes }); },
    loadData() {
        const d = Core.Storage.get('energy-recipes');
        this.recipes = d?.recipes || this.DEFAULTS.map((r, i) => ({ ...r, id: i + 1, favorite: false }));
    }
};

window.ListeningModeIndicator = {
    MODES: {
        active: { name: 'Active Listening', color: '#2ecc71', tips: ['Maintain eye contact', 'Paraphrase what you hear', 'Ask clarifying questions', 'Avoid interrupting', 'Show engagement with nods'] },
        supportive: { name: 'Supportive Listening', color: '#3498db', tips: ['Validate their feelings', 'Say "I hear you"', 'Avoid giving advice unless asked', 'Be present and patient', 'Offer empathy, not solutions'] },
        critical: { name: 'Critical Listening', color: '#e67e22', tips: ['Evaluate claims carefully', 'Look for evidence', 'Identify assumptions', 'Consider the source', 'Note logical fallacies'] },
        passive: { name: 'Passive Listening', color: '#95a5a6', tips: ['It\'s okay to just be present', 'Let your mind absorb', 'No pressure to respond immediately', 'Background awareness is valid', 'Rest your analytical mind'] }
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Listening Mode Indicator</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Select Your Listening Mode</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0;">
                        ${Object.entries(this.MODES).map(([key, mode]) =>
                            `<button class="btn btn-secondary lmi-mode" data-mode="${key}" style="padding:1.25rem;border-left:4px solid ${mode.color};">${mode.name}</button>`
                        ).join('')}
                    </div>
                </div>
                <div id="lmi-tips" style="display:none;background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;text-align:left;">
                    <h3 id="lmi-mode-name"></h3>
                    <ul id="lmi-tip-list" style="margin-top:.75rem;padding-left:1.5rem;"></ul>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Listening Log</h3>
                    <div id="lmi-log" style="text-align:left;max-height:200px;overflow-y:auto;"></div>
                    <div style="margin-top:1rem;"><strong>Most used:</strong> <span id="lmi-most">-</span></div>
                </div>
            </div>`;
        this.loadData();
        document.querySelectorAll('.lmi-mode').forEach(b => b.addEventListener('click', e => this.selectMode(e.target.dataset.mode)));
        this.render();
    },
    selectMode(modeKey) {
        const mode = this.MODES[modeKey];
        document.querySelectorAll('.lmi-mode').forEach(b => { b.style.background = b.dataset.mode === modeKey ? mode.color : ''; b.style.color = b.dataset.mode === modeKey ? 'white' : ''; });
        document.getElementById('lmi-tips').style.display = 'block';
        document.getElementById('lmi-mode-name').textContent = mode.name;
        document.getElementById('lmi-tip-list').innerHTML = mode.tips.map(t => `<li style="margin-bottom:.5rem;">${t}</li>`).join('');
        this.log.push({ mode: modeKey, name: mode.name, date: Date.now() });
        this.saveData(); this.render();
    },
    render() {
        document.getElementById('lmi-log').innerHTML = this.log.slice(-10).reverse().map(l =>
            `<div style="padding:.25rem 0;font-size:.85rem;border-bottom:1px solid var(--border);">
                ${l.name} — ${new Date(l.date).toLocaleString()}
            </div>`).join('') || '<p style="color:var(--text-muted);">No listening sessions logged</p>';
        const freq = {};
        this.log.forEach(l => { freq[l.name] = (freq[l.name] || 0) + 1; });
        const most = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
        document.getElementById('lmi-most').textContent = most ? `${most[0]} (${most[1]}x)` : '-';
    },
    saveData() { Core.Storage.set('listening-mode', { log: this.log }); },
    loadData() { const d = Core.Storage.get('listening-mode'); this.log = d?.log || []; }
};

window.SocialScriptLibrary = {
    SCRIPTS: {
        'Small Talk': [
            { title: 'Starting a conversation', script: 'Hi! I noticed [observation]. Have you [related question]?' },
            { title: 'Keeping it going', script: 'That\'s interesting! What got you into [their topic]?' },
            { title: 'Graceful exit', script: 'It was really great talking with you! I need to [reason], but let\'s catch up again soon.' }
        ],
        'Professional': [
            { title: 'Networking intro', script: 'Hi, I\'m [name]. I work in [field] at [company]. I\'m really interested in [their area]. What drew you to this event?' },
            { title: 'Following up', script: 'Hi [name], it was great meeting you at [event]. I loved our conversation about [topic]. Would you be open to [next step]?' },
            { title: 'Asking for help', script: 'I really admire your work in [area]. I\'m working on [project] and would love your perspective. Would you have 15 minutes for a quick chat?' }
        ],
        'Difficult Conversations': [
            { title: 'Giving feedback', script: 'I\'ve noticed [specific behavior]. The impact is [effect]. I\'d like to discuss [desired change]. What are your thoughts?' },
            { title: 'Saying no', script: 'I appreciate you thinking of me. Unfortunately, I can\'t take this on right now because [honest reason]. Could we [alternative]?' },
            { title: 'Addressing conflict', script: 'I value our relationship, and I want to address something. When [situation happened], I felt [emotion]. Can we talk about how to move forward?' }
        ],
        'Boundaries': [
            { title: 'Time boundary', script: 'I have a hard stop at [time]. Let\'s make sure we cover the most important points first.' },
            { title: 'Emotional boundary', script: 'I care about you, and I\'m not in a place to discuss [topic] right now. Can we revisit this [when]?' },
            { title: 'Work boundary', script: 'I\'m committed to doing great work during business hours. This request falls outside my current capacity. Let\'s discuss priorities.' }
        ]
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        const categories = Object.keys(this.SCRIPTS);
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Social Script Library</h2>
                <div style="display:flex;gap:.5rem;margin-bottom:1.5rem;flex-wrap:wrap;">
                    ${categories.map(c => `<button class="btn btn-secondary ssl-cat" data-cat="${c}">${c}</button>`).join('')}
                </div>
                <div id="ssl-scripts"></div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-top:1.5rem;">
                    <h3>Add Custom Script</h3>
                    <select id="ssl-custom-cat" class="input-field" style="width:100%;margin-bottom:.5rem;">
                        ${categories.map(c => `<option>${c}</option>`).join('')}
                        <option>Custom</option>
                    </select>
                    <input type="text" id="ssl-title" class="input-field" placeholder="Title" style="width:100%;margin-bottom:.5rem;">
                    <textarea id="ssl-text" class="input-field" rows="3" placeholder="Your script with [blanks] for customization..." style="width:100%;margin-bottom:.5rem;"></textarea>
                    <button id="ssl-add" class="btn btn-primary" style="width:100%;">Save Script</button>
                </div>
            </div>`;
        this.loadData();
        document.querySelectorAll('.ssl-cat').forEach(b => b.addEventListener('click', e => this.showCategory(e.target.dataset.cat)));
        document.getElementById('ssl-add').addEventListener('click', () => this.addScript());
        this.showCategory(categories[0]);
    },
    showCategory(cat) {
        document.querySelectorAll('.ssl-cat').forEach(b => { b.className = `btn ${b.dataset.cat === cat ? 'btn-primary' : 'btn-secondary'} ssl-cat`; });
        const allScripts = { ...this.SCRIPTS };
        this.custom.forEach(s => {
            if (!allScripts[s.category]) allScripts[s.category] = [];
            allScripts[s.category].push(s);
        });
        const scripts = allScripts[cat] || [];
        document.getElementById('ssl-scripts').innerHTML = scripts.map(s => `
            <div style="background:var(--bg);padding:1.25rem;border-radius:var(--radius-lg);margin-bottom:.75rem;">
                <h4 style="margin-bottom:.5rem;">${s.title}</h4>
                <div style="padding:1rem;background:var(--bg-secondary);border-radius:var(--radius);font-style:italic;line-height:1.6;">${s.script}</div>
                <button onclick="navigator.clipboard.writeText('${s.script.replace(/'/g, "\\'")}').then(()=>Core.Toast.show('Copied!','success'))" class="btn btn-secondary" style="font-size:.8rem;margin-top:.5rem;">Copy</button>
            </div>`).join('') || '<p style="color:var(--text-muted);text-align:center;">No scripts in this category</p>';
    },
    addScript() {
        const category = document.getElementById('ssl-custom-cat').value;
        const title = document.getElementById('ssl-title').value.trim();
        const script = document.getElementById('ssl-text').value.trim();
        if (!title || !script) { Core.Toast.show('Enter title and script', 'warning'); return; }
        this.custom.push({ category, title, script });
        document.getElementById('ssl-title').value = '';
        document.getElementById('ssl-text').value = '';
        this.saveData();
        this.showCategory(category);
        Core.Toast.show('Script saved!', 'success');
    },
    saveData() { Core.Storage.set('social-scripts', { custom: this.custom }); },
    loadData() { const d = Core.Storage.get('social-scripts'); this.custom = d?.custom || []; }
};

window.MicroAdventureGenerator = {
    ADVENTURES: {
        indoor: [
            { title: 'Rearrange a Room', desc: 'Move your furniture into a completely new layout', difficulty: 'easy', time: '30 min', needs: 'Nothing' },
            { title: 'Cook Blind', desc: 'Pick 5 random ingredients and make something with them', difficulty: 'medium', time: '45 min', needs: 'Kitchen access' },
            { title: 'Photo Scavenger Hunt', desc: 'Find and photograph 10 things of the same color in your home', difficulty: 'easy', time: '15 min', needs: 'Phone camera' },
            { title: 'Letter to Future Self', desc: 'Write a heartfelt letter to yourself 1 year from now', difficulty: 'easy', time: '20 min', needs: 'Pen & paper' }
        ],
        outdoor: [
            { title: 'Sunrise Mission', desc: 'Wake up early and watch the sunrise from the best spot near you', difficulty: 'medium', time: '1 hour', needs: 'Early alarm' },
            { title: 'Wrong Turn Walk', desc: 'Take a walk and always turn in the direction you never go', difficulty: 'easy', time: '30 min', needs: 'Walking shoes' },
            { title: 'Cloud Safari', desc: 'Lie on grass and identify animal shapes in the clouds', difficulty: 'easy', time: '20 min', needs: 'Outdoor space' },
            { title: 'Neighborhood Explorer', desc: 'Walk every street in a 3-block radius you\'ve never been on', difficulty: 'medium', time: '45 min', needs: 'Comfortable shoes' }
        ],
        social: [
            { title: 'Compliment Spree', desc: 'Give genuine compliments to 5 different people today', difficulty: 'medium', time: '1 day', needs: 'Courage' },
            { title: 'Random Act Marathon', desc: 'Do 3 random acts of kindness before lunch', difficulty: 'medium', time: '3 hours', needs: 'Creativity' },
            { title: 'Old Friend Reconnect', desc: 'Message someone you haven\'t talked to in over a year', difficulty: 'easy', time: '10 min', needs: 'Phone' }
        ],
        solo: [
            { title: 'Silent Hour', desc: 'Spend one full hour without speaking, screens, or music', difficulty: 'bold', time: '1 hour', needs: 'Quiet space' },
            { title: 'Sketch Your View', desc: 'Draw whatever you see from where you\'re sitting right now', difficulty: 'easy', time: '15 min', needs: 'Pen & paper' },
            { title: 'Memory Lane Walk', desc: 'Visit a place that holds an old memory and sit with it', difficulty: 'medium', time: '1 hour', needs: 'Transportation' }
        ],
        creative: [
            { title: '6-Word Story', desc: 'Write 10 different 6-word stories', difficulty: 'easy', time: '15 min', needs: 'Pen & paper' },
            { title: 'Sounds Composer', desc: 'Record 5 interesting sounds and arrange them into a beat', difficulty: 'bold', time: '30 min', needs: 'Phone' },
            { title: 'Texture Collage', desc: 'Collect 10 different textures and arrange them on paper', difficulty: 'medium', time: '30 min', needs: 'Glue, paper' }
        ]
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Micro Adventure Generator</h2>
                <div style="text-align:center;margin-bottom:1.5rem;">
                    <button id="mag-surprise" class="btn btn-primary" style="font-size:1.2rem;padding:1rem 2.5rem;">Surprise Me!</button>
                </div>
                <div id="mag-result" style="display:none;background:linear-gradient(135deg,var(--secondary),var(--secondary-light));color:white;padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;text-align:center;">
                    <div id="mag-title" style="font-size:1.5rem;font-weight:bold;"></div>
                    <div id="mag-desc" style="margin:.75rem 0;"></div>
                    <div id="mag-meta" style="font-size:.85rem;opacity:.8;"></div>
                    <button id="mag-done" class="btn btn-secondary" style="margin-top:1rem;background:rgba(255,255,255,.2);border:none;color:white;">Mark as Done!</button>
                </div>
                <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem;">
                    ${Object.keys(this.ADVENTURES).map(c => `<button class="btn btn-secondary mag-cat" data-cat="${c}" style="text-transform:capitalize;">${c}</button>`).join('')}
                </div>
                <div id="mag-list"></div>
                <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius);margin-top:1.5rem;">
                    <strong>Adventures completed:</strong> <span id="mag-completed">0</span>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('mag-surprise').addEventListener('click', () => this.surprise());
        document.getElementById('mag-done').addEventListener('click', () => { this.completed++; this.saveData(); this.render(); Core.Toast.show('Adventure completed!', 'success'); });
        document.querySelectorAll('.mag-cat').forEach(b => b.addEventListener('click', e => this.showCategory(e.target.dataset.cat)));
        this.render();
    },
    surprise() {
        const cats = Object.keys(this.ADVENTURES);
        const cat = cats[Math.floor(Math.random() * cats.length)];
        const adventures = this.ADVENTURES[cat];
        const a = adventures[Math.floor(Math.random() * adventures.length)];
        document.getElementById('mag-result').style.display = 'block';
        document.getElementById('mag-title').textContent = a.title;
        document.getElementById('mag-desc').textContent = a.desc;
        document.getElementById('mag-meta').textContent = `${a.difficulty} | ${a.time} | Needs: ${a.needs}`;
    },
    showCategory(cat) {
        document.querySelectorAll('.mag-cat').forEach(b => b.className = `btn ${b.dataset.cat === cat ? 'btn-primary' : 'btn-secondary'} mag-cat`);
        const adventures = this.ADVENTURES[cat] || [];
        document.getElementById('mag-list').innerHTML = adventures.map(a => `
            <div style="background:var(--bg);padding:1rem;border-radius:var(--radius);margin-bottom:.5rem;">
                <strong>${a.title}</strong> <span style="font-size:.75rem;padding:2px 8px;background:var(--bg-secondary);border-radius:10px;">${a.difficulty}</span>
                <div style="font-size:.85rem;color:var(--text-muted);margin-top:.25rem;">${a.desc}</div>
                <div style="font-size:.8rem;color:var(--text-muted);margin-top:.25rem;">${a.time} | Needs: ${a.needs}</div>
            </div>`).join('');
    },
    render() { document.getElementById('mag-completed').textContent = this.completed; },
    saveData() { Core.Storage.set('micro-adventure', { completed: this.completed }); },
    loadData() { const d = Core.Storage.get('micro-adventure'); this.completed = d?.completed || 0; }
};

window.CreativityUnlocker = {
    CONSTRAINTS: ['Use only 3 colors', 'Complete in exactly 5 minutes', 'Make it reversible', 'Include a circle', 'No straight lines allowed', 'Use your non-dominant hand', 'Work with eyes closed for 30 seconds', 'Start from the end', 'Use only found materials', 'Combine two unrelated ideas', 'Set a 2-minute timer', 'Remove the most obvious element', 'Double everything', 'Make it tiny', 'Make it huge'],
    WHAT_IFS: ['What if gravity reversed?', 'What if colors had sounds?', 'What if time moved backward?', 'What if everyone could fly?', 'What if animals could talk?', 'What if you had unlimited resources?', 'What if there were no rules?', 'What if it had to be done by a child?'],
    PROMPTS: ['Draw your current emotion', 'Write about an object in the room as if it were alive', 'Design a house for your favorite animal', 'Create a new holiday and its traditions', 'Invent a tool that doesn\'t exist', 'Write a haiku about right now', 'Sketch a map of your imagination', 'Describe a color to someone who can\'t see'],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Creativity Unlocker</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div id="cu-output" style="font-size:1.3rem;padding:1.5rem;background:linear-gradient(135deg,var(--secondary),var(--secondary-light));color:white;border-radius:var(--radius);min-height:60px;display:flex;align-items:center;justify-content:center;">
                        Choose a technique below
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem;">
                    <button id="cu-constraint" class="btn btn-secondary" style="padding:1rem;">Random Constraint</button>
                    <button id="cu-whatif" class="btn btn-secondary" style="padding:1rem;">What If...?</button>
                    <button id="cu-prompt" class="btn btn-secondary" style="padding:1rem;">Creative Prompt</button>
                    <button id="cu-words" class="btn btn-secondary" style="padding:1rem;">Word Association</button>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>What Worked?</h3>
                    <div style="display:flex;gap:.5rem;margin-top:.5rem;">
                        <button onclick="CreativityUnlocker.logTechnique('constraint')" class="btn btn-secondary" style="flex:1;font-size:.8rem;">Constraint</button>
                        <button onclick="CreativityUnlocker.logTechnique('whatif')" class="btn btn-secondary" style="flex:1;font-size:.8rem;">What If</button>
                        <button onclick="CreativityUnlocker.logTechnique('prompt')" class="btn btn-secondary" style="flex:1;font-size:.8rem;">Prompt</button>
                        <button onclick="CreativityUnlocker.logTechnique('words')" class="btn btn-secondary" style="flex:1;font-size:.8rem;">Words</button>
                    </div>
                    <div id="cu-stats" style="margin-top:1rem;font-size:.85rem;color:var(--text-muted);"></div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('cu-constraint').addEventListener('click', () => {
            document.getElementById('cu-output').textContent = this.CONSTRAINTS[Math.floor(Math.random() * this.CONSTRAINTS.length)];
        });
        document.getElementById('cu-whatif').addEventListener('click', () => {
            document.getElementById('cu-output').textContent = this.WHAT_IFS[Math.floor(Math.random() * this.WHAT_IFS.length)];
        });
        document.getElementById('cu-prompt').addEventListener('click', () => {
            document.getElementById('cu-output').textContent = this.PROMPTS[Math.floor(Math.random() * this.PROMPTS.length)];
        });
        document.getElementById('cu-words').addEventListener('click', () => {
            const words = ['river', 'clock', 'mirror', 'garden', 'shadow', 'bridge', 'storm', 'key', 'whisper', 'flame', 'drift', 'echo', 'bloom', 'rust', 'pulse'];
            const w1 = words[Math.floor(Math.random() * words.length)];
            const w2 = words[Math.floor(Math.random() * words.length)];
            document.getElementById('cu-output').textContent = `Combine: "${w1}" + "${w2}"`;
        });
        this.renderStats();
    },
    logTechnique(t) {
        this.techniques[t] = (this.techniques[t] || 0) + 1;
        this.saveData(); this.renderStats();
        Core.Toast.show('Noted! Keep creating!', 'success');
    },
    renderStats() {
        const entries = Object.entries(this.techniques);
        if (!entries.length) { document.getElementById('cu-stats').textContent = 'Log what works for you'; return; }
        const best = entries.sort((a, b) => b[1] - a[1])[0];
        document.getElementById('cu-stats').textContent = `Your best technique: ${best[0]} (${best[1]} times)`;
    },
    saveData() { Core.Storage.set('creativity-unlocker', { techniques: this.techniques }); },
    loadData() { const d = Core.Storage.get('creativity-unlocker'); this.techniques = d?.techniques || {}; }
};

window.MotivationWeather = {
    WEATHER: {
        sunny: { icon: '*', label: 'Sunny - Highly Motivated', color: '#f1c40f' },
        partly: { icon: '~', label: 'Partly Cloudy', color: '#f39c12' },
        overcast: { icon: '=', label: 'Overcast - Meh', color: '#95a5a6' },
        rainy: { icon: '.', label: 'Rainy - Low Motivation', color: '#3498db' },
        stormy: { icon: '!', label: 'Stormy - Very Low', color: '#2c3e50' }
    },
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;text-align:center;">
                <h2 style="margin-bottom:1.5rem;">Motivation Weather</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Today's Motivation Forecast</h3>
                    <div style="display:flex;justify-content:space-around;margin:1.5rem 0;">
                        ${Object.entries(this.WEATHER).map(([key, w]) =>
                            `<button class="btn btn-secondary mw-pick" data-weather="${key}" style="padding:1rem;border-bottom:3px solid ${w.color};">${w.label.split(' - ')[0]}</button>`
                        ).join('')}
                    </div>
                    <textarea id="mw-factors" class="input-field" rows="2" placeholder="What's affecting your motivation today?" style="width:100%;margin-top:1rem;"></textarea>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>7-Day Forecast</h3>
                    <div id="mw-history" style="display:flex;justify-content:space-around;margin-top:1rem;"></div>
                </div>
                <div id="mw-suggestions" style="display:none;background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);text-align:left;"></div>
            </div>`;
        this.loadData();
        document.querySelectorAll('.mw-pick').forEach(b => b.addEventListener('click', e => this.setWeather(e.target.dataset.weather)));
        this.render();
    },
    setWeather(key) {
        const factors = document.getElementById('mw-factors').value.trim();
        this.entries.push({ weather: key, factors, date: Date.now(), dateStr: new Date().toDateString() });
        document.getElementById('mw-factors').value = '';
        document.querySelectorAll('.mw-pick').forEach(b => { b.style.background = b.dataset.weather === key ? this.WEATHER[key].color : ''; b.style.color = b.dataset.weather === key ? 'white' : ''; });
        this.saveData(); this.render();
        this.showSuggestions(key);
        Core.Toast.show(`Weather: ${this.WEATHER[key].label}`, 'info');
    },
    showSuggestions(key) {
        const suggestions = {
            sunny: ['Tackle your hardest task!', 'Start something new', 'Help someone else with their work'],
            partly: ['Work on routine tasks', 'Break big tasks into smaller ones', 'Listen to energizing music'],
            overcast: ['Focus on easy wins', 'Organize your workspace', 'Review your goals'],
            rainy: ['Do only the essentials', 'Take extra breaks', 'Be kind to yourself'],
            stormy: ['Rest if you can', 'Do one tiny thing and celebrate', 'Reach out to someone supportive']
        };
        const el = document.getElementById('mw-suggestions');
        el.style.display = 'block';
        el.innerHTML = `<h3>Suggestions for ${this.WEATHER[key].label}</h3>
            <ul style="margin-top:.5rem;padding-left:1.5rem;">${(suggestions[key] || []).map(s => `<li style="margin-bottom:.5rem;">${s}</li>`).join('')}</ul>`;
    },
    render() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(); d.setDate(d.getDate() - i);
            const ds = d.toDateString();
            const entry = this.entries.filter(e => e.dateStr === ds).pop();
            days.push({ date: d, entry, label: d.toLocaleDateString('en', { weekday: 'short' }) });
        }
        document.getElementById('mw-history').innerHTML = days.map(d => {
            const w = d.entry ? this.WEATHER[d.entry.weather] : null;
            return `<div style="text-align:center;">
                <div style="width:40px;height:40px;border-radius:50%;background:${w ? w.color : 'var(--bg-secondary)'};margin:0 auto .5rem;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">${w ? w.icon : '?'}</div>
                <div style="font-size:.75rem;color:var(--text-muted);">${d.label}</div>
            </div>`;
        }).join('');
    },
    saveData() { Core.Storage.set('motivation-weather', { entries: this.entries.slice(-60) }); },
    loadData() { const d = Core.Storage.get('motivation-weather'); this.entries = d?.entries || []; }
};

window.ObligationAuditor = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:700px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Obligation Auditor</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Add Obligation</h3>
                    <input type="text" id="oa-name" class="input-field" placeholder="Obligation..." style="width:100%;margin-bottom:.5rem;">
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.5rem;margin-bottom:.5rem;">
                        <select id="oa-cat" class="input-field"><option>Work</option><option>Social</option><option>Family</option><option>Personal</option><option>Volunteer</option></select>
                        <select id="oa-imp" class="input-field"><option value="1">Low importance</option><option value="2">Moderate</option><option value="3" selected>Important</option><option value="4">Very important</option><option value="5">Critical</option></select>
                        <select id="oa-enjoy" class="input-field"><option value="1">Dislike</option><option value="2">Tolerate</option><option value="3" selected>Neutral</option><option value="4">Enjoy</option><option value="5">Love</option></select>
                    </div>
                    <label style="display:flex;align-items:center;gap:.5rem;margin-bottom:.75rem;cursor:pointer;">
                        <input type="checkbox" id="oa-imposed"> This was imposed on me (not self-chosen)
                    </label>
                    <button id="oa-add" class="btn btn-primary" style="width:100%;">Add</button>
                </div>
                <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius);margin-bottom:1.5rem;">
                    <strong>Load Score:</strong> <span id="oa-score">0</span>/100
                    <div style="width:100%;height:10px;background:var(--bg);border-radius:5px;margin-top:.5rem;">
                        <div id="oa-bar" style="height:100%;background:var(--success);border-radius:5px;transition:width .3s;"></div>
                    </div>
                </div>
                <div id="oa-flags" style="display:none;background:var(--warning);color:#333;padding:1rem;border-radius:var(--radius);margin-bottom:1.5rem;">
                    <strong>Consider dropping/renegotiating:</strong>
                    <div id="oa-flag-list"></div>
                </div>
                <div id="oa-list"></div>
            </div>`;
        this.loadData();
        document.getElementById('oa-add').addEventListener('click', () => this.addObligation());
        this.render();
    },
    addObligation() {
        const name = document.getElementById('oa-name').value.trim();
        if (!name) { Core.Toast.show('Enter an obligation', 'warning'); return; }
        this.obligations.push({
            name,
            category: document.getElementById('oa-cat').value,
            importance: parseInt(document.getElementById('oa-imp').value),
            enjoyment: parseInt(document.getElementById('oa-enjoy').value),
            imposed: document.getElementById('oa-imposed').checked,
            id: Date.now()
        });
        document.getElementById('oa-name').value = '';
        document.getElementById('oa-imposed').checked = false;
        this.saveData(); this.render();
    },
    removeObligation(id) { this.obligations = this.obligations.filter(o => o.id !== id); this.saveData(); this.render(); },
    render() {
        const score = Math.min(100, this.obligations.length * 8);
        document.getElementById('oa-score').textContent = score;
        document.getElementById('oa-bar').style.width = score + '%';
        document.getElementById('oa-bar').style.background = score > 70 ? 'var(--danger)' : score > 40 ? 'var(--warning)' : 'var(--success)';
        const flags = this.obligations.filter(o => o.importance <= 2 && o.enjoyment <= 2 && o.imposed);
        if (flags.length) {
            document.getElementById('oa-flags').style.display = 'block';
            document.getElementById('oa-flag-list').innerHTML = flags.map(f => `<div style="margin-top:.5rem;">- ${f.name} (${f.category})</div>`).join('');
        } else { document.getElementById('oa-flags').style.display = 'none'; }
        document.getElementById('oa-list').innerHTML = this.obligations.map(o => `
            <div style="background:var(--bg);padding:1rem;border-radius:var(--radius);margin-bottom:.5rem;display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <strong>${o.name}</strong> ${o.imposed ? '<span style="font-size:.7rem;background:var(--warning);color:#333;padding:1px 6px;border-radius:8px;">imposed</span>' : ''}
                    <div style="font-size:.8rem;color:var(--text-muted);">${o.category} | Imp: ${o.importance}/5 | Enjoy: ${o.enjoyment}/5</div>
                </div>
                <button onclick="ObligationAuditor.removeObligation(${o.id})" class="btn btn-secondary" style="font-size:.8rem;">Drop</button>
            </div>`).join('') || '<p style="color:var(--text-muted);text-align:center;">No obligations tracked</p>';
    },
    saveData() { Core.Storage.set('obligation-auditor', { obligations: this.obligations }); },
    loadData() { const d = Core.Storage.get('obligation-auditor'); this.obligations = d?.obligations || []; }
};

window.MentalLoadDistributor = {
    CATEGORIES: ['Household', 'Work', 'Family', 'Social', 'Admin', 'Health'],
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Mental Load Distributor</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Rate Your Load (1-10)</h3>
                    ${this.CATEGORIES.map(c => `
                        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem;">
                            <span style="min-width:90px;font-size:.9rem;">${c}</span>
                            <input type="range" class="mld-range" data-cat="${c}" min="1" max="10" value="5" style="flex:1;">
                            <span class="mld-val" style="min-width:25px;font-weight:bold;">5</span>
                        </div>`).join('')}
                    <button id="mld-save" class="btn btn-primary" style="width:100%;margin-top:1rem;">Save Assessment</button>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Load Distribution</h3>
                    <canvas id="mld-chart" width="500" height="200"></canvas>
                </div>
                <div id="mld-suggestions" style="background:var(--bg-secondary);padding:1.5rem;border-radius:var(--radius-lg);"></div>
            </div>`;
        this.loadData();
        document.querySelectorAll('.mld-range').forEach(r => r.addEventListener('input', e => {
            e.target.nextElementSibling.textContent = e.target.value;
        }));
        document.getElementById('mld-save').addEventListener('click', () => this.saveAssessment());
        this.render();
    },
    saveAssessment() {
        const ratings = {};
        document.querySelectorAll('.mld-range').forEach(r => { ratings[r.dataset.cat] = parseInt(r.value); });
        this.history.push({ ratings, date: Date.now() });
        this.saveData(); this.render();
        Core.Toast.show('Assessment saved', 'success');
    },
    render() {
        const latest = this.history.length ? this.history[this.history.length - 1].ratings : null;
        const c = document.getElementById('mld-chart'); if (!c) return;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 500, 200);
        if (!latest) { ctx.fillStyle = 'gray'; ctx.fillText('Save an assessment to see distribution', 150, 100); return; }
        const barW = 60;
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
        this.CATEGORIES.forEach((cat, i) => {
            const h = (latest[cat] / 10) * 170;
            const x = 20 + i * 80;
            ctx.fillStyle = colors[i];
            ctx.fillRect(x, 190 - h, barW, h);
            ctx.fillStyle = 'var(--text)';
            ctx.font = '10px sans-serif';
            ctx.fillText(cat.slice(0, 6), x + 5, 205);
            ctx.fillText(latest[cat], x + barW / 2 - 4, 185 - h);
        });
        // Suggestions
        const overloaded = this.CATEGORIES.filter(c => latest[c] >= 7);
        const suggestions = { Household: 'Automate or delegate chores', Work: 'Prioritize and say no to non-essentials', Family: 'Share responsibilities with family members', Social: 'Reduce social obligations temporarily', Admin: 'Batch admin tasks into one session', Health: 'Schedule appointments and prep meals in advance' };
        document.getElementById('mld-suggestions').innerHTML = overloaded.length ?
            `<h3>Overloaded Areas</h3>` + overloaded.map(c => `<div style="padding:.5rem;margin-bottom:.5rem;border-left:3px solid var(--danger);padding-left:1rem;"><strong>${c}:</strong> ${suggestions[c]}</div>`).join('') :
            '<p style="color:var(--text-muted);">Your load seems balanced. Keep it up!</p>';
    },
    saveData() { Core.Storage.set('mental-load', { history: this.history.slice(-30) }); },
    loadData() { const d = Core.Storage.get('mental-load'); this.history = d?.history || []; }
};

window.TomorrowVisualizer = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Tomorrow Visualizer</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <h3>Plan Tomorrow's Blocks</h3>
                    <div id="tv-blocks">
                        ${['Morning (6-9)', 'Mid-Morning (9-12)', 'Afternoon (12-3)', 'Late Afternoon (3-6)', 'Evening (6-9)'].map((slot, i) => `
                            <div style="display:flex;gap:.5rem;margin-bottom:.5rem;align-items:center;">
                                <span style="min-width:140px;font-size:.85rem;color:var(--text-muted);">${slot}</span>
                                <input type="text" class="input-field tv-activity" placeholder="Activity..." style="flex:1;" data-slot="${i}">
                                <select class="input-field tv-energy" data-slot="${i}" style="width:80px;">
                                    <option value="low">Low</option>
                                    <option value="med" selected>Med</option>
                                    <option value="high">High</option>
                                </select>
                            </div>`).join('')}
                    </div>
                    <button id="tv-save" class="btn btn-primary" style="width:100%;margin-top:1rem;">Save Plan</button>
                </div>
                <div id="tv-visual" style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1rem;">
                    <h3>Tomorrow at a Glance</h3>
                    <div id="tv-timeline" style="margin-top:1rem;"></div>
                </div>
                <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius);font-size:.85rem;color:var(--text-muted);">
                    Tip: Schedule high-energy tasks for your peak hours.
                </div>
            </div>`;
        this.loadData();
        document.getElementById('tv-save').addEventListener('click', () => this.savePlan());
        this.render();
    },
    savePlan() {
        const blocks = [];
        const slots = ['Morning', 'Mid-Morning', 'Afternoon', 'Late Afternoon', 'Evening'];
        document.querySelectorAll('.tv-activity').forEach((input, i) => {
            const energy = document.querySelectorAll('.tv-energy')[i].value;
            if (input.value.trim()) blocks.push({ slot: slots[i], activity: input.value.trim(), energy });
        });
        if (!blocks.length) { Core.Toast.show('Add at least one activity', 'warning'); return; }
        this.plans.push({ blocks, date: Date.now(), forDate: new Date(Date.now() + 86400000).toDateString() });
        this.saveData(); this.render();
        Core.Toast.show('Tomorrow planned!', 'success');
    },
    render() {
        const latest = this.plans.length ? this.plans[this.plans.length - 1] : null;
        const energyColors = { low: '#2ecc71', med: '#f39c12', high: '#e74c3c' };
        if (latest) {
            document.getElementById('tv-timeline').innerHTML = latest.blocks.map(b => `
                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem;">
                    <div style="width:8px;height:50px;background:${energyColors[b.energy]};border-radius:4px;"></div>
                    <div>
                        <div style="font-weight:bold;">${b.activity}</div>
                        <div style="font-size:.8rem;color:var(--text-muted);">${b.slot} - ${b.energy} energy</div>
                    </div>
                </div>`).join('');
        } else {
            document.getElementById('tv-timeline').innerHTML = '<p style="color:var(--text-muted);">Save a plan to see your visual timeline</p>';
        }
    },
    saveData() { Core.Storage.set('tomorrow-viz', { plans: this.plans.slice(-14) }); },
    loadData() { const d = Core.Storage.get('tomorrow-viz'); this.plans = d?.plans || []; }
};

window.PriorityPyramid = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Priority Pyramid</h2>
                <div style="background:var(--bg);padding:2rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <div style="text-align:center;">
                        <div style="margin:0 auto 1rem;">
                            <div style="background:#e74c3c;color:white;padding:1rem;width:30%;margin:0 auto;border-radius:var(--radius) var(--radius) 0 0;text-align:center;min-height:60px;">
                                <div style="font-size:.75rem;font-weight:bold;">CRITICAL (1)</div>
                                <div id="pp-top" style="font-size:.9rem;margin-top:.25rem;"></div>
                            </div>
                            <div style="background:#f39c12;color:white;padding:1rem;width:60%;margin:0 auto;text-align:center;min-height:60px;">
                                <div style="font-size:.75rem;font-weight:bold;">IMPORTANT (3)</div>
                                <div id="pp-mid" style="font-size:.85rem;margin-top:.25rem;"></div>
                            </div>
                            <div style="background:#2ecc71;color:white;padding:1rem;width:90%;margin:0 auto;border-radius:0 0 var(--radius) var(--radius);text-align:center;min-height:60px;">
                                <div style="font-size:.75rem;font-weight:bold;">NICE TO HAVE (5)</div>
                                <div id="pp-bot" style="font-size:.85rem;margin-top:.25rem;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Add Item</h3>
                    <div style="display:flex;gap:.5rem;">
                        <input type="text" id="pp-input" class="input-field" placeholder="Priority item..." style="flex:1;">
                        <select id="pp-tier" class="input-field" style="width:120px;">
                            <option value="top">Critical</option>
                            <option value="mid">Important</option>
                            <option value="bot">Nice to have</option>
                        </select>
                        <button id="pp-add" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>`;
        this.loadData();
        document.getElementById('pp-add').addEventListener('click', () => this.addItem());
        document.getElementById('pp-input').addEventListener('keypress', e => { if (e.key === 'Enter') this.addItem(); });
        this.render();
    },
    addItem() {
        const text = document.getElementById('pp-input').value.trim();
        const tier = document.getElementById('pp-tier').value;
        if (!text) return;
        const limits = { top: 1, mid: 3, bot: 5 };
        if (this.items[tier].length >= limits[tier]) { Core.Toast.show(`${tier === 'top' ? 'Critical' : tier === 'mid' ? 'Important' : 'Nice to have'} tier is full!`, 'warning'); return; }
        this.items[tier].push({ text, id: Date.now() });
        document.getElementById('pp-input').value = '';
        this.saveData(); this.render();
    },
    removeItem(tier, id) { this.items[tier] = this.items[tier].filter(i => i.id !== id); this.saveData(); this.render(); },
    render() {
        for (const tier of ['top', 'mid', 'bot']) {
            document.getElementById(`pp-${tier}`).innerHTML = this.items[tier].map(i =>
                `<span style="display:inline-block;background:rgba(255,255,255,.2);padding:2px 8px;border-radius:10px;margin:2px;font-size:.85rem;cursor:pointer;" onclick="PriorityPyramid.removeItem('${tier}',${i.id})">${i.text} x</span>`
            ).join('') || '<span style="opacity:.6;">Empty</span>';
        }
    },
    saveData() { Core.Storage.set('priority-pyramid', { items: this.items }); },
    loadData() { const d = Core.Storage.get('priority-pyramid'); this.items = d?.items || { top: [], mid: [], bot: [] }; }
};

window.TaskDelegator = {
    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:500px;margin:0 auto;">
                <h2 style="margin-bottom:1.5rem;">Task Delegator</h2>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);margin-bottom:1.5rem;">
                    <input type="text" id="tdel-task" class="input-field" placeholder="Task to evaluate..." style="width:100%;margin-bottom:1rem;">
                    <div id="tdel-questions" style="display:none;"></div>
                    <button id="tdel-start" class="btn btn-primary" style="width:100%;">Evaluate for Delegation</button>
                </div>
                <div id="tdel-result" style="display:none;padding:2rem;border-radius:var(--radius-lg);text-align:center;margin-bottom:1.5rem;"></div>
                <div style="background:var(--bg);padding:1.5rem;border-radius:var(--radius-lg);">
                    <h3>Decision History</h3>
                    <div id="tdel-history" style="max-height:200px;overflow-y:auto;"></div>
                </div>
            </div>`;
        this.loadData();
        this.qIndex = 0;
        this.answers = {};
        document.getElementById('tdel-start').addEventListener('click', () => this.startEval());
        this.render();
    },
    QUESTIONS: [
        { key: 'unique', q: 'Does only YOU have the skills for this?', yes: 'You may need to do it yourself', no: 'Others can potentially handle this' },
        { key: 'urgent', q: 'Is this urgent (needed today)?', yes: 'Consider doing it yourself for speed', no: 'There\'s time to delegate' },
        { key: 'explain', q: 'Would it take longer to explain than to do?', yes: 'Might be faster to do yourself this time', no: 'Worth delegating' },
        { key: 'learn', q: 'Could someone learn/grow from doing this?', yes: 'Great delegation opportunity!', no: 'Consider automating instead' }
    ],
    startEval() {
        const task = document.getElementById('tdel-task').value.trim();
        if (!task) { Core.Toast.show('Enter a task name', 'warning'); return; }
        this.currentTask = task;
        this.qIndex = 0;
        this.answers = {};
        this.showQuestion();
    },
    showQuestion() {
        if (this.qIndex >= this.QUESTIONS.length) { this.showResult(); return; }
        const q = this.QUESTIONS[this.qIndex];
        document.getElementById('tdel-questions').style.display = 'block';
        document.getElementById('tdel-questions').innerHTML = `
            <div style="padding:1rem;background:var(--bg-secondary);border-radius:var(--radius);margin-bottom:1rem;">
                <p style="font-weight:bold;margin-bottom:1rem;">${q.q}</p>
                <div style="display:flex;gap:1rem;">
                    <button class="btn btn-primary" style="flex:1;" onclick="TaskDelegator.answer('${q.key}', true)">Yes</button>
                    <button class="btn btn-secondary" style="flex:1;" onclick="TaskDelegator.answer('${q.key}', false)">No</button>
                </div>
            </div>`;
    },
    answer(key, val) { this.answers[key] = val; this.qIndex++; this.showQuestion(); },
    showResult() {
        document.getElementById('tdel-questions').style.display = 'none';
        let recommendation, color;
        if (this.answers.unique && this.answers.urgent) { recommendation = 'Do it yourself'; color = '#3498db'; }
        else if (!this.answers.unique && !this.answers.explain && this.answers.learn) { recommendation = 'Delegate fully'; color = '#2ecc71'; }
        else if (!this.answers.unique && this.answers.explain) { recommendation = 'Delegate with guidance'; color = '#f39c12'; }
        else if (!this.answers.unique && !this.answers.learn) { recommendation = 'Automate if possible'; color = '#9b59b6'; }
        else { recommendation = 'Delegate with oversight'; color = '#e67e22'; }
        document.getElementById('tdel-result').style.display = 'block';
        document.getElementById('tdel-result').style.background = color;
        document.getElementById('tdel-result').style.color = 'white';
        document.getElementById('tdel-result').innerHTML = `<div style="font-size:1.5rem;font-weight:bold;">${recommendation}</div><div style="margin-top:.5rem;">for "${this.currentTask}"</div>`;
        this.history.push({ task: this.currentTask, recommendation, date: Date.now() });
        this.saveData(); this.render();
    },
    render() {
        document.getElementById('tdel-history').innerHTML = this.history.slice(-10).reverse().map(h =>
            `<div style="padding:.5rem;border-bottom:1px solid var(--border);font-size:.85rem;">
                <strong>${h.task}</strong> → ${h.recommendation}
            </div>`).join('') || '<p style="color:var(--text-muted);">No evaluations yet</p>';
    },
    saveData() { Core.Storage.set('task-delegator', { history: this.history }); },
    loadData() { const d = Core.Storage.get('task-delegator'); this.history = d?.history || []; }
};

console.log('Remaining tools batch 2 loaded.');
