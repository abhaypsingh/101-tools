/**
 * tool-implementations-mixed.js
 * 15 tool implementations: Mindfulness, Communication, Creativity, Planning
 * Each tool is a window global following the Core API conventions.
 */

/* =========================================================
   1. ThoughtSpeedController
   ========================================================= */
window.ThoughtSpeedController = {
    DELAY_MS: 500,
    _pendingChar: null,
    _lastKeyTime: 0,
    _typingTimer: null,
    _sessionStart: null,
    _charCount: 0,
    _slowChars: 0,

    PROMPTS: [
        'What is one thing I am truly grateful for today, and why does it matter to me?',
        'What assumption am I carrying right now that I have never questioned?',
        'If I could talk to myself five years ago, what would I say?',
        'What does "enough" look like for me in this season of life?',
        'What small act of courage could I take today?',
        'What am I avoiding, and what would happen if I stopped avoiding it?',
        'Who in my life deserves more of my attention, and how can I show up for them?',
        'What belief is quietly driving most of my decisions right now?',
        'What would I do differently if I were not afraid of judgment?',
        'What does the most peaceful version of my day look like?'
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:680px;margin:0 auto;font-family:inherit;">
                <h2 style="margin-bottom:4px;">Thought Speed Controller</h2>
                <p style="color:var(--text-muted,#666);margin-bottom:20px;">Slow your thinking down. Each character only appears after a 500 ms pause — forcing deliberate reflection.</p>

                <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;margin-bottom:16px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                        <span style="font-weight:600;font-size:0.85rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted,#888);">Today's Prompt</span>
                        <button id="tsc-new-prompt" style="font-size:0.8rem;padding:4px 10px;border-radius:6px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;">New prompt</button>
                    </div>
                    <p id="tsc-prompt" style="margin:0;font-size:1.05rem;line-height:1.5;font-style:italic;"></p>
                </div>

                <div style="margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                        <label style="font-weight:600;">Your Response</label>
                        <span id="tsc-speed-display" style="font-size:0.85rem;color:var(--text-muted,#888);">Thought speed: — wpm</span>
                    </div>
                    <div id="tsc-display" style="min-height:120px;background:var(--bg-secondary,#f9f9f9);border:2px solid var(--border,#ddd);border-radius:8px;padding:12px;font-size:1rem;line-height:1.7;white-space:pre-wrap;word-break:break-word;"></div>
                    <input id="tsc-hidden-input" type="text" style="position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;" autocomplete="off" />
                    <div id="tsc-cursor-hint" style="margin-top:6px;font-size:0.82rem;color:var(--text-muted,#999);">Click the response area then begin typing slowly.</div>
                </div>

                <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
                    <button id="tsc-focus-btn" style="padding:8px 18px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;font-size:0.9rem;">Click to Focus</button>
                    <button id="tsc-save-btn" style="padding:8px 18px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;font-size:0.9rem;">Save Session</button>
                    <button id="tsc-clear-btn" style="padding:8px 18px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;font-size:0.9rem;">Clear</button>
                </div>

                <div>
                    <h3 style="margin-bottom:12px;">Past Sessions <span id="tsc-session-count" style="font-size:0.85rem;font-weight:400;color:var(--text-muted,#888);"></span></h3>
                    <div id="tsc-sessions" style="display:flex;flex-direction:column;gap:10px;"></div>
                </div>
            </div>
        `;
        this._sessionStart = null;
        this._charCount = 0;
        this._slowChars = 0;
        this.loadData();
        this.attachEvents();
        this._setPrompt();
    },

    _setPrompt(idx) {
        const p = document.getElementById('tsc-prompt');
        if (!p) return;
        if (idx === undefined) idx = Math.floor(Math.random() * this.PROMPTS.length);
        p.textContent = this.PROMPTS[idx];
        this._currentPrompt = this.PROMPTS[idx];
    },

    attachEvents() {
        document.getElementById('tsc-new-prompt').addEventListener('click', () => this._setPrompt());

        const display = document.getElementById('tsc-display');
        display.style.cursor = 'text';
        display.addEventListener('click', () => {
            document.getElementById('tsc-hidden-input').focus();
            document.getElementById('tsc-cursor-hint').textContent = 'Focused — type slowly. Each character appears after 500 ms.';
            document.getElementById('tsc-focus-btn').textContent = 'Focused';
        });

        document.getElementById('tsc-focus-btn').addEventListener('click', () => {
            document.getElementById('tsc-hidden-input').focus();
            document.getElementById('tsc-cursor-hint').textContent = 'Focused — type slowly. Each character appears after 500 ms.';
            document.getElementById('tsc-focus-btn').textContent = 'Focused';
        });

        document.getElementById('tsc-hidden-input').addEventListener('keydown', (e) => {
            if (!this._sessionStart) this._sessionStart = Date.now();

            if (e.key === 'Backspace') {
                e.preventDefault();
                this._text = (this._text || '').slice(0, -1);
                this._renderText();
                return;
            }
            if (e.key.length !== 1) return;
            e.preventDefault();

            const now = Date.now();
            const gap = now - this._lastKeyTime;
            this._lastKeyTime = now;
            this._charCount++;

            const char = e.key;
            clearTimeout(this._typingTimer);
            this._typingTimer = setTimeout(() => {
                this._text = (this._text || '') + char;
                this._slowChars++;
                this._renderText();
                this._updateSpeed();
            }, this.DELAY_MS);
        });

        document.getElementById('tsc-save-btn').addEventListener('click', () => this._saveSession());
        document.getElementById('tsc-clear-btn').addEventListener('click', () => {
            clearTimeout(this._typingTimer);
            this._text = '';
            this._sessionStart = null;
            this._charCount = 0;
            this._slowChars = 0;
            this._renderText();
            document.getElementById('tsc-speed-display').textContent = 'Thought speed: — wpm';
        });
    },

    _renderText() {
        const display = document.getElementById('tsc-display');
        if (!display) return;
        display.textContent = (this._text || '') + '|';
    },

    _updateSpeed() {
        if (!this._sessionStart) return;
        const mins = (Date.now() - this._sessionStart) / 60000;
        const words = ((this._text || '').trim().split(/\s+/).filter(Boolean).length);
        const wpm = mins > 0 ? Math.round(words / mins) : 0;
        const el = document.getElementById('tsc-speed-display');
        if (el) el.textContent = `Thought speed: ${wpm} wpm`;
    },

    _saveSession() {
        const text = (this._text || '').trim();
        if (!text) { Core.Toast.show('Nothing to save yet.', 'warning'); return; }
        const sessions = Core.Storage.get('tsc_sessions') || [];
        const mins = this._sessionStart ? (Date.now() - this._sessionStart) / 60000 : 0;
        const words = text.split(/\s+/).filter(Boolean).length;
        sessions.unshift({
            id: Date.now(),
            prompt: this._currentPrompt,
            response: text,
            wpm: mins > 0 ? Math.round(words / mins) : 0,
            date: new Date().toLocaleDateString()
        });
        Core.Storage.set('tsc_sessions', sessions.slice(0, 30));
        Core.Toast.show('Session saved.', 'success');
        this._text = '';
        this._sessionStart = null;
        this._charCount = 0;
        this._slowChars = 0;
        this._renderText();
        this.loadData();
    },

    loadData() {
        const sessions = Core.Storage.get('tsc_sessions') || [];
        const container = document.getElementById('tsc-sessions');
        const countEl = document.getElementById('tsc-session-count');
        if (!container) return;
        if (countEl) countEl.textContent = `(${sessions.length})`;
        if (!sessions.length) {
            container.innerHTML = '<p style="color:var(--text-muted,#999);font-style:italic;">No sessions yet. Complete your first reflection above.</p>';
            return;
        }
        container.innerHTML = sessions.map(s => `
            <div style="background:var(--bg-secondary,#f5f5f5);border-radius:8px;padding:14px;border-left:4px solid var(--primary,#6366f1);">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:0.8rem;color:var(--text-muted,#888);">${s.date}</span>
                    <span style="font-size:0.8rem;font-weight:600;color:var(--primary,#6366f1);">${s.wpm} wpm</span>
                </div>
                <p style="margin:0 0 6px;font-size:0.85rem;font-style:italic;color:var(--text-muted,#666);">${s.prompt}</p>
                <p style="margin:0;font-size:0.9rem;line-height:1.5;">${s.response.slice(0, 200)}${s.response.length > 200 ? '…' : ''}</p>
            </div>
        `).join('');
    },

    saveData() {}
};


/* =========================================================
   2. AssumptionChallenger
   ========================================================= */
window.AssumptionChallenger = {
    QUESTIONS: [
        { id: 'evidence_for',     label: 'What evidence supports this assumption?' },
        { id: 'evidence_against', label: 'What evidence contradicts this assumption?' },
        { id: 'friend_say',       label: 'What would a trusted friend say about this?' },
        { id: 'likely_explain',   label: 'What is the most likely, neutral explanation?' },
        { id: 'five_years',       label: 'How important will this be in 5 years?' }
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:680px;margin:0 auto;font-family:inherit;">
                <h2 style="margin-bottom:4px;">Assumption Challenger</h2>
                <p style="color:var(--text-muted,#666);margin-bottom:20px;">Surface an assumption you are holding, then answer 5 questions to examine it objectively.</p>

                <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;margin-bottom:20px;">
                    <label style="font-weight:600;display:block;margin-bottom:8px;">The assumption I am making:</label>
                    <input id="ac-assumption" type="text" placeholder='e.g. "They do not like me" or "I will fail at this"'
                        style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#ddd);font-size:1rem;background:var(--bg,#fff);" />
                    <button id="ac-start" style="margin-top:10px;padding:8px 20px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;">Challenge It</button>
                </div>

                <div id="ac-questions" style="display:none;flex-direction:column;gap:14px;margin-bottom:20px;"></div>

                <div id="ac-action-row" style="display:none;gap:10px;margin-bottom:24px;">
                    <button id="ac-save" style="padding:8px 20px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;">Save Challenge</button>
                    <button id="ac-reset" style="padding:8px 20px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;">Start Over</button>
                </div>

                <div>
                    <h3 style="margin-bottom:12px;">Saved Challenges <span id="ac-count" style="font-weight:400;font-size:0.85rem;color:var(--text-muted,#888);"></span></h3>
                    <div id="ac-history" style="display:flex;flex-direction:column;gap:12px;"></div>
                </div>
            </div>
        `;
        this.loadData();
        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('ac-start').addEventListener('click', () => {
            const assumption = document.getElementById('ac-assumption').value.trim();
            if (!assumption) { Core.Toast.show('Please enter an assumption first.', 'warning'); return; }
            this._renderQuestions(assumption);
        });

        document.getElementById('ac-save').addEventListener('click', () => this._save());
        document.getElementById('ac-reset').addEventListener('click', () => {
            document.getElementById('ac-assumption').value = '';
            document.getElementById('ac-questions').style.display = 'none';
            document.getElementById('ac-action-row').style.display = 'none';
        });
    },

    _renderQuestions(assumption) {
        const qContainer = document.getElementById('ac-questions');
        qContainer.innerHTML = this.QUESTIONS.map(q => `
            <div style="background:var(--bg-secondary,#f5f5f5);border-radius:8px;padding:14px;">
                <label style="font-weight:600;display:block;margin-bottom:8px;">${q.label}</label>
                <textarea id="ac-q-${q.id}" rows="3" style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:6px;border:1px solid var(--border,#ddd);font-size:0.95rem;resize:vertical;background:var(--bg,#fff);"></textarea>
            </div>
        `).join('');
        qContainer.style.display = 'flex';
        document.getElementById('ac-action-row').style.display = 'flex';
    },

    _save() {
        const assumption = document.getElementById('ac-assumption').value.trim();
        if (!assumption) return;
        const answers = {};
        let filled = 0;
        this.QUESTIONS.forEach(q => {
            const val = (document.getElementById(`ac-q-${q.id}`) || {}).value || '';
            answers[q.id] = val.trim();
            if (val.trim()) filled++;
        });
        if (filled === 0) { Core.Toast.show('Please answer at least one question.', 'warning'); return; }
        const history = Core.Storage.get('ac_history') || [];
        history.unshift({ id: Date.now(), assumption, answers, date: new Date().toLocaleDateString() });
        Core.Storage.set('ac_history', history.slice(0, 50));
        Core.Toast.show('Assumption challenge saved.', 'success');
        document.getElementById('ac-assumption').value = '';
        document.getElementById('ac-questions').style.display = 'none';
        document.getElementById('ac-action-row').style.display = 'none';
        this.loadData();
    },

    loadData() {
        const history = Core.Storage.get('ac_history') || [];
        const countEl = document.getElementById('ac-count');
        const container = document.getElementById('ac-history');
        if (countEl) countEl.textContent = `(${history.length})`;
        if (!container) return;
        if (!history.length) {
            container.innerHTML = '<p style="color:var(--text-muted,#999);font-style:italic;">No saved challenges yet.</p>';
            return;
        }
        container.innerHTML = history.map(h => {
            const answers = this.QUESTIONS.map(q => h.answers[q.id]
                ? `<li><strong>${q.label}</strong><br>${h.answers[q.id]}</li>`
                : '').join('');
            return `
                <details style="background:var(--bg-secondary,#f5f5f5);border-radius:8px;padding:14px;border-left:4px solid var(--accent,#f59e0b);">
                    <summary style="cursor:pointer;font-weight:600;">${h.assumption} <span style="font-size:0.8rem;font-weight:400;color:var(--text-muted,#888);">${h.date}</span></summary>
                    <ul style="margin:12px 0 0;padding-left:18px;line-height:1.7;">${answers}</ul>
                </details>
            `;
        }).join('');
    },

    saveData() {}
};


/* =========================================================
   3. CognitiveExitRamp
   ========================================================= */
window.CognitiveExitRamp = {
    STRATEGIES: [
        {
            id: 'name_loop',
            title: '1. Name the Loop',
            icon: '🏷',
            description: 'Label the thought loop explicitly. Say (or write): "This is my {label} loop." Naming it creates distance between you and the thought.',
            action: 'Give your loop a short label (e.g., "worst-case loop", "rejection loop"):'
        },
        {
            id: 'physical_interrupt',
            title: '2. Physical Interrupt',
            icon: '🤸',
            description: 'Break the mental pattern with a deliberate physical action. Your body and mind are connected — movement changes state.',
            action: 'Try one of these right now: 5 jumping jacks · splash cold water on your face · clench fists for 10 seconds then release · walk to a different room.'
        },
        {
            id: 'perspective_shift',
            title: '3. Perspective Shift',
            icon: '🔭',
            description: 'Deliberately adopt a different viewpoint. Ask: "What would someone who loves me think of this situation?" or "What would I advise a friend?"',
            action: 'Write the perspective shift version of your thought:'
        },
        {
            id: 'schedule_it',
            title: '4. Schedule It for Later',
            icon: '📅',
            description: 'Instead of fighting the thought, grant it a specific future time slot. This validates the concern without letting it hijack the present.',
            action: 'Choose a specific time to revisit this thought (e.g., "Thursday at 7 pm"). Write it down:'
        },
        {
            id: 'accept_redirect',
            title: '5. Accept and Redirect',
            icon: '🌊',
            description: 'Acknowledge the thought without judgement, then redirect attention to the present moment. "Yes, this thought is here. And right now I choose to focus on ___."',
            action: 'What will you redirect your attention to right now?'
        }
    ],

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:680px;margin:0 auto;font-family:inherit;">
                <h2 style="margin-bottom:4px;">Cognitive Exit Ramp</h2>
                <p style="color:var(--text-muted,#666);margin-bottom:20px;">Identify a thought loop and choose an exit strategy to break out of it.</p>

                <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;margin-bottom:20px;">
                    <label style="font-weight:600;display:block;margin-bottom:8px;">The repeating thought I am stuck in:</label>
                    <input id="cer-loop" type="text" placeholder='e.g. "I keep replaying what I said at the meeting"'
                        style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#ddd);font-size:1rem;background:var(--bg,#fff);" />
                </div>

                <div id="cer-strategies" style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px;">
                    ${this.STRATEGIES.map(s => `
                        <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;border-left:4px solid var(--primary,#6366f1);">
                            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                                <span style="font-size:1.4rem;">${s.icon}</span>
                                <strong>${s.title}</strong>
                            </div>
                            <p style="margin:0 0 10px;font-size:0.9rem;color:var(--text-muted,#555);">${s.description}</p>
                            <p style="margin:0 0 8px;font-size:0.85rem;font-weight:600;">${s.action}</p>
                            <textarea id="cer-note-${s.id}" rows="2" placeholder="Your notes here..."
                                style="width:100%;box-sizing:border-box;padding:8px 10px;border-radius:6px;border:1px solid var(--border,#ddd);font-size:0.9rem;resize:vertical;background:var(--bg,#fff);"></textarea>
                            <div style="margin-top:8px;">
                                <span style="font-size:0.82rem;font-weight:600;margin-right:8px;">Did this help?</span>
                                ${[1,2,3,4,5].map(n => `<button class="cer-rate-btn" data-strategy="${s.id}" data-rating="${n}"
                                    style="width:28px;height:28px;border-radius:50%;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;margin-right:4px;font-size:0.8rem;">${n}</button>`).join('')}
                                <span id="cer-rated-${s.id}" style="font-size:0.8rem;color:var(--primary,#6366f1);margin-left:6px;"></span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap;">
                    <button id="cer-save" style="padding:8px 20px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;">Save Session</button>
                    <button id="cer-reset" style="padding:8px 20px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;">Clear</button>
                </div>

                <div>
                    <h3 style="margin-bottom:10px;">Strategy Effectiveness <span id="cer-stats-label" style="font-size:0.85rem;font-weight:400;color:var(--text-muted,#888);"></span></h3>
                    <div id="cer-stats" style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;"></div>
                    <h3 style="margin-bottom:10px;">Session History</h3>
                    <div id="cer-history" style="display:flex;flex-direction:column;gap:10px;"></div>
                </div>
            </div>
        `;
        this._ratings = {};
        this.loadData();
        this.attachEvents();
    },

    attachEvents() {
        document.querySelectorAll('.cer-rate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sid = btn.dataset.strategy;
                const rating = parseInt(btn.dataset.rating);
                this._ratings[sid] = rating;
                const label = document.getElementById(`cer-rated-${sid}`);
                if (label) label.textContent = `Rated ${rating}/5`;
                document.querySelectorAll(`.cer-rate-btn[data-strategy="${sid}"]`).forEach(b => {
                    b.style.background = parseInt(b.dataset.rating) <= rating
                        ? 'var(--primary,#6366f1)' : 'var(--bg,#fff)';
                    b.style.color = parseInt(b.dataset.rating) <= rating ? '#fff' : '';
                });
            });
        });

        document.getElementById('cer-save').addEventListener('click', () => this._save());
        document.getElementById('cer-reset').addEventListener('click', () => {
            document.getElementById('cer-loop').value = '';
            this.STRATEGIES.forEach(s => {
                const ta = document.getElementById(`cer-note-${s.id}`);
                if (ta) ta.value = '';
                const lbl = document.getElementById(`cer-rated-${s.id}`);
                if (lbl) lbl.textContent = '';
                document.querySelectorAll(`.cer-rate-btn[data-strategy="${s.id}"]`).forEach(b => {
                    b.style.background = 'var(--bg,#fff)';
                    b.style.color = '';
                });
            });
            this._ratings = {};
        });
    },

    _save() {
        const loop = document.getElementById('cer-loop').value.trim();
        if (!loop) { Core.Toast.show('Describe your thought loop first.', 'warning'); return; }
        const notes = {};
        this.STRATEGIES.forEach(s => {
            notes[s.id] = (document.getElementById(`cer-note-${s.id}`) || {}).value || '';
        });
        const history = Core.Storage.get('cer_history') || [];
        history.unshift({ id: Date.now(), loop, notes, ratings: { ...this._ratings }, date: new Date().toLocaleDateString() });
        Core.Storage.set('cer_history', history.slice(0, 50));
        Core.Toast.show('Session saved.', 'success');
        this.loadData();
    },

    loadData() {
        const history = Core.Storage.get('cer_history') || [];
        // Compute averages
        const totals = {};
        const counts = {};
        this.STRATEGIES.forEach(s => { totals[s.id] = 0; counts[s.id] = 0; });
        history.forEach(h => {
            if (h.ratings) Object.entries(h.ratings).forEach(([sid, r]) => {
                totals[sid] = (totals[sid] || 0) + r;
                counts[sid] = (counts[sid] || 0) + 1;
            });
        });

        const statsEl = document.getElementById('cer-stats');
        const statsLabel = document.getElementById('cer-stats-label');
        if (statsEl) {
            if (!history.length) {
                statsEl.innerHTML = '<p style="color:var(--text-muted,#999);font-style:italic;">No data yet.</p>';
                if (statsLabel) statsLabel.textContent = '';
            } else {
                if (statsLabel) statsLabel.textContent = `(${history.length} sessions)`;
                statsEl.innerHTML = this.STRATEGIES.map(s => {
                    const avg = counts[s.id] ? (totals[s.id] / counts[s.id]).toFixed(1) : '—';
                    const pct = counts[s.id] ? (totals[s.id] / counts[s.id] / 5 * 100) : 0;
                    return `
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span style="width:200px;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.icon} ${s.title}</span>
                            <div style="flex:1;background:var(--bg-secondary,#eee);border-radius:4px;height:10px;">
                                <div style="width:${pct}%;background:var(--primary,#6366f1);border-radius:4px;height:10px;transition:width .3s;"></div>
                            </div>
                            <span style="width:40px;text-align:right;font-size:0.85rem;font-weight:600;">${avg}</span>
                        </div>`;
                }).join('');
            }
        }

        const histEl = document.getElementById('cer-history');
        if (histEl) {
            if (!history.length) {
                histEl.innerHTML = '<p style="color:var(--text-muted,#999);font-style:italic;">No sessions saved yet.</p>';
            } else {
                histEl.innerHTML = history.map(h => `
                    <div style="background:var(--bg-secondary,#f5f5f5);border-radius:8px;padding:12px;border-left:4px solid var(--accent,#f59e0b);">
                        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                            <strong style="font-size:0.95rem;">${h.loop}</strong>
                            <span style="font-size:0.8rem;color:var(--text-muted,#888);">${h.date}</span>
                        </div>
                        <div style="font-size:0.8rem;color:var(--text-muted,#666);">
                            ${this.STRATEGIES.filter(s => h.ratings && h.ratings[s.id]).map(s => `${s.icon} ${s.id.replace(/_/g,' ')}: ${h.ratings[s.id]}/5`).join(' · ') || 'No ratings'}
                        </div>
                    </div>
                `).join('');
            }
        }
    },

    saveData() {}
};


/* =========================================================
   4. FocusPhotography
   ========================================================= */
window.FocusPhotography = {
    FOCUS_PROMPTS: [
        'Notice three different colors in your field of view.',
        'Find the lightest and darkest point in the room.',
        'Identify two textures you can see without touching anything.',
        'What sounds are present? Near, middle, far?',
        'Where is the light coming from, and what shadows does it create?',
        'What is the smallest detail you can observe?',
        'Notice something you have never consciously looked at before.',
        'What is the dominant shape or pattern in your environment?'
    ],

    _timerInterval: null,
    _phase: 'idle', // idle | observing | describing

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:680px;margin:0 auto;font-family:inherit;">
                <h2 style="margin-bottom:4px;">Focus Photography</h2>
                <p style="color:var(--text-muted,#666);margin-bottom:20px;">A mindfulness exercise. Observe your surroundings for 30 seconds, then write what you captured — as if taking a mental photo.</p>

                <div id="fp-camera" style="background:var(--bg-secondary,#f5f5f5);border-radius:12px;padding:24px;text-align:center;margin-bottom:20px;">
                    <div id="fp-phase-label" style="font-size:0.85rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted,#888);margin-bottom:12px;">Ready</div>
                    <div id="fp-timer" style="font-size:3rem;font-weight:700;color:var(--primary,#6366f1);margin-bottom:12px;">30</div>
                    <div id="fp-focus-prompt" style="font-size:1rem;font-style:italic;color:var(--text-secondary,#555);margin-bottom:20px;min-height:28px;"></div>
                    <button id="fp-start" style="padding:10px 28px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;font-size:1rem;">Start Observation (30s)</button>
                </div>

                <div id="fp-describe-section" style="display:none;margin-bottom:20px;">
                    <label style="font-weight:600;display:block;margin-bottom:8px;">Describe your mental photo — what did you capture?</label>
                    <textarea id="fp-description" rows="5" placeholder="Colors, light, textures, sounds, details, mood..."
                        style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#ddd);font-size:1rem;resize:vertical;background:var(--bg,#fff);"></textarea>
                    <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">
                        <button id="fp-save-photo" style="padding:8px 20px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;">Save Photo</button>
                        <button id="fp-discard" style="padding:8px 20px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;">Discard</button>
                    </div>
                </div>

                <div>
                    <h3 style="margin-bottom:12px;">Your Mindfulness Gallery <span id="fp-count" style="font-size:0.85rem;font-weight:400;color:var(--text-muted,#888);"></span></h3>
                    <div id="fp-gallery" style="display:flex;flex-direction:column;gap:12px;"></div>
                </div>
            </div>
        `;
        this._phase = 'idle';
        this.loadData();
        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('fp-start').addEventListener('click', () => this._startObservation());
        document.getElementById('fp-save-photo').addEventListener('click', () => this._savePhoto());
        document.getElementById('fp-discard').addEventListener('click', () => this._reset());
    },

    _startObservation() {
        this._phase = 'observing';
        let remaining = 30;
        this._currentPrompts = [...this.FOCUS_PROMPTS].sort(() => Math.random() - 0.5);
        let promptIdx = 0;

        const timerEl = document.getElementById('fp-timer');
        const phaseEl = document.getElementById('fp-phase-label');
        const promptEl = document.getElementById('fp-focus-prompt');
        const startBtn = document.getElementById('fp-start');

        phaseEl.textContent = 'Observing — look around carefully';
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        promptEl.textContent = this._currentPrompts[0];

        this._timerInterval = setInterval(() => {
            remaining--;
            timerEl.textContent = remaining;

            // Rotate prompts every 6 seconds
            if (remaining % 6 === 0 && remaining > 0) {
                promptIdx = (promptIdx + 1) % this._currentPrompts.length;
                promptEl.textContent = this._currentPrompts[promptIdx];
            }

            if (remaining <= 0) {
                clearInterval(this._timerInterval);
                this._phase = 'describing';
                phaseEl.textContent = 'Now describe what you captured';
                promptEl.textContent = '';
                timerEl.textContent = 'Done';
                document.getElementById('fp-describe-section').style.display = 'block';
                startBtn.style.display = 'none';
            }
        }, 1000);
    },

    _savePhoto() {
        const desc = document.getElementById('fp-description').value.trim();
        if (!desc) { Core.Toast.show('Write your description first.', 'warning'); return; }
        const gallery = Core.Storage.get('fp_gallery') || [];
        gallery.unshift({
            id: Date.now(),
            description: desc,
            date: new Date().toLocaleString()
        });
        Core.Storage.set('fp_gallery', gallery.slice(0, 100));
        Core.Toast.show('Photo saved to your gallery.', 'success');
        this._reset();
        this.loadData();
    },

    _reset() {
        clearInterval(this._timerInterval);
        this._phase = 'idle';
        const timerEl = document.getElementById('fp-timer');
        const phaseEl = document.getElementById('fp-phase-label');
        const promptEl = document.getElementById('fp-focus-prompt');
        const startBtn = document.getElementById('fp-start');
        const descSection = document.getElementById('fp-describe-section');
        const descTA = document.getElementById('fp-description');
        if (timerEl) timerEl.textContent = '30';
        if (phaseEl) phaseEl.textContent = 'Ready';
        if (promptEl) promptEl.textContent = '';
        if (startBtn) { startBtn.style.display = ''; startBtn.disabled = false; startBtn.style.opacity = ''; }
        if (descSection) descSection.style.display = 'none';
        if (descTA) descTA.value = '';
    },

    loadData() {
        const gallery = Core.Storage.get('fp_gallery') || [];
        const countEl = document.getElementById('fp-count');
        const container = document.getElementById('fp-gallery');
        if (countEl) countEl.textContent = `(${gallery.length} photos)`;
        if (!container) return;
        if (!gallery.length) {
            container.innerHTML = '<p style="color:var(--text-muted,#999);font-style:italic;">No photos yet. Complete your first observation above.</p>';
            return;
        }
        container.innerHTML = gallery.map((p, i) => `
            <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;border-left:4px solid #10b981;">
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                    <span style="font-weight:600;font-size:0.85rem;">Photo #${gallery.length - i}</span>
                    <span style="font-size:0.8rem;color:var(--text-muted,#888);">${p.date}</span>
                </div>
                <p style="margin:0;line-height:1.6;font-size:0.95rem;">${p.description}</p>
            </div>
        `).join('');
    },

    saveData() {}
};


/* =========================================================
   5. CommunicationStyleAdapter
   ========================================================= */
window.CommunicationStyleAdapter = {
    STYLES: {
        direct: {
            label: 'Direct',
            subtitle: 'Brief, action-oriented',
            color: '#ef4444',
            tips: ['Lead with the main point', 'Use short sentences', 'State what you need clearly', 'Remove pleasantries', 'Focus on outcome'],
            transform(msg) {
                // Shorten and lead with action
                const sentences = msg.match(/[^.!?]+[.!?]+/g) || [msg];
                const core = sentences[0].trim();
                return `Bottom line: ${core}\n\nNext step: [State the specific action needed].`;
            }
        },
        analytical: {
            label: 'Analytical',
            subtitle: 'Detailed, data-focused',
            color: '#3b82f6',
            tips: ['Include supporting evidence', 'Use numbers and specifics', 'Structure with logic', 'Anticipate questions', 'Provide context and background'],
            transform(msg) {
                return `Background: ${msg}\n\nKey considerations:\n• [Data point 1 — add a specific number or fact]\n• [Data point 2 — provide source or context]\n• [Risk or caveat]\n\nConclusion: [Logical outcome based on the above].`;
            }
        },
        expressive: {
            label: 'Expressive',
            subtitle: 'Enthusiastic, story-based',
            color: '#f59e0b',
            tips: ['Open with energy', 'Use storytelling', 'Share feelings and reactions', 'Paint a picture', 'Connect on a personal level'],
            transform(msg) {
                return `You know what's exciting? ${msg}\n\nImagine if [paint a vivid picture of the positive outcome]. I really feel that [personal connection to the message]. What do you think?`;
            }
        },
        amiable: {
            label: 'Amiable',
            subtitle: 'Warm, relationship-focused',
            color: '#10b981',
            tips: ['Start with connection', 'Acknowledge their feelings', 'Use "we" language', 'Be collaborative', 'Check in and invite input'],
            transform(msg) {
                return `I wanted to reach out because I value our relationship and wanted to share something: ${msg}\n\nI'd love to hear your thoughts on this — how does this sound to you? Happy to work through it together.`;
            }
        }
    },

    init() {
        const workspace = document.getElementById('utility-workspace');
        workspace.innerHTML = `
            <div style="max-width:760px;margin:0 auto;font-family:inherit;">
                <h2 style="margin-bottom:4px;">Communication Style Adapter</h2>
                <p style="color:var(--text-muted,#666);margin-bottom:20px;">Enter your message and see it adapted for all four communication styles side by side.</p>

                <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;margin-bottom:20px;">
                    <label style="font-weight:600;display:block;margin-bottom:8px;">Your original message:</label>
                    <textarea id="csa-input" rows="4" placeholder="Type what you want to communicate..."
                        style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#ddd);font-size:1rem;resize:vertical;background:var(--bg,#fff);"></textarea>
                    <div style="margin-top:10px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                        <button id="csa-adapt" style="padding:8px 20px;border-radius:8px;border:none;background:var(--primary,#6366f1);color:#fff;cursor:pointer;">Adapt Message</button>
                        <button id="csa-clear" style="padding:8px 20px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;">Clear</button>
                    </div>
                </div>

                <div id="csa-results" style="display:none;">
                    <h3 style="margin-bottom:14px;">Adapted Versions</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;" id="csa-grid">
                        ${Object.entries(this.STYLES).map(([key, s]) => `
                            <div style="background:var(--bg-secondary,#f5f5f5);border-radius:10px;padding:16px;border-top:4px solid ${s.color};">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                                    <strong style="color:${s.color};">${s.label}</strong>
                                    <span style="font-size:0.75rem;color:var(--text-muted,#888);">${s.subtitle}</span>
                                </div>
                                <div id="csa-out-${key}" style="font-size:0.9rem;line-height:1.6;white-space:pre-wrap;min-height:80px;margin-bottom:10px;"></div>
                                <div style="border-top:1px solid var(--border,#ddd);padding-top:8px;margin-top:8px;">
                                    <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted,#888);">TIPS:</span>
                                    <ul style="margin:6px 0 0;padding-left:16px;font-size:0.78rem;color:var(--text-muted,#555);">
                                        ${s.tips.map(t => `<li>${t}</li>`).join('')}
                                    </ul>
                                </div>
                                <button class="csa-copy-btn" data-style="${key}" style="margin-top:10px;width:100%;padding:6px;border-radius:6px;border:1px solid var(--border,#ddd);background:var(--bg,#fff);cursor:pointer;font-size:0.82rem;">Copy this version</button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top:24px;">
                    <h3 style="margin-bottom:12px;">Recipient Style Guide</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                        ${Object.entries(this.STYLES).map(([key, s]) => `
                            <div style="background:var(--bg-secondary,#f5f5f5);border-radius:8px;padding:12px;border-left:4px solid ${s.color};">
                                <strong style="color:${s.color};">${s.label}</strong> — ${s.subtitle}
                                <p style="margin:6px 0 0;font-size:0.82rem;color:var(--text-muted,#555);">Look for: ${s.tips[0].toLowerCase()}, ${s.tips[1].toLowerCase()}.</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.attachEvents();
    },

    attachEvents() {
        document.getElementById('csa-adapt').addEventListener('click', () => this._adapt());
        document.getElementById('csa-clear').addEventListener('click', () => {
            document.getElementById('csa-input').value = '';
            document.getElementById('csa-results').style.display = 'none';
        });

        document.getElementById('csa-grid').addEventListener('click', (e) => {
            const btn = e.target.closest('.csa-copy-btn');
            if (!btn) return;
            const key = btn.dataset.style;
            const text = document.getElementById(`csa-out-${key}`).textContent;
            navigator.clipboard.writeText(text).then(() => {
                Core.Toast.show(`${this.STYLES[key].label} version copied.`, 'success');
            }).catch(() => Core.Toast.show('Copy failed — please select and copy manually.', 'error'));
        });
    },

    _adapt() {
        const msg = document.getElementById('csa-input').value.trim();
        if (!msg) { Core.Toast.show('Please enter a message first.', 'warning'); return; }
        Object.entries(this.STYLES).forEach(([key, s]) => {
            const el = document.getElementById(`csa-out-${key}`);
            if (el) el.textContent = s.transform(msg);
        });
        document.getElementById('csa-results').style.display = 'block';
    },

    loadData() {},
    saveData() {}
};
