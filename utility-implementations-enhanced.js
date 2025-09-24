// Enhanced implementations for remaining utilities with full functionality
(() => {
    'use strict';

    // Utility 52: Dream Symbol Dictionary
    window.DreamSymbolDictionary = {
        init() {
            this.symbols = this.loadSymbols();
            return `
                <div class="dream-dictionary">
                    <h2>Dream Symbol Dictionary</h2>
                    <div class="search-section">
                        <input type="text" id="symbol-search" placeholder="Search symbols or add new...">
                        <button onclick="DreamSymbolDictionary.searchOrAdd()">Search/Add</button>
                    </div>
                    <div class="categories">
                        <button onclick="DreamSymbolDictionary.filterCategory('all')" class="active">All</button>
                        <button onclick="DreamSymbolDictionary.filterCategory('animals')">Animals</button>
                        <button onclick="DreamSymbolDictionary.filterCategory('objects')">Objects</button>
                        <button onclick="DreamSymbolDictionary.filterCategory('people')">People</button>
                        <button onclick="DreamSymbolDictionary.filterCategory('places')">Places</button>
                        <button onclick="DreamSymbolDictionary.filterCategory('actions')">Actions</button>
                        <button onclick="DreamSymbolDictionary.filterCategory('personal')">Personal</button>
                    </div>
                    <div id="symbol-results"></div>
                    <div class="dream-journal">
                        <h3>Recent Dreams</h3>
                        <textarea id="dream-entry" placeholder="Record a dream..."></textarea>
                        <button onclick="DreamSymbolDictionary.saveDream()">Save Dream</button>
                        <div id="dream-list"></div>
                    </div>
                    <div class="symbol-stats">
                        <h3>Symbol Frequency</h3>
                        <canvas id="symbol-chart"></canvas>
                    </div>
                </div>
            `;
        },

        loadSymbols() {
            const saved = localStorage.getItem('dreamSymbols');
            return saved ? JSON.parse(saved) : this.getDefaultSymbols();
        },

        getDefaultSymbols() {
            return {
                water: { category: 'objects', meanings: ['emotions', 'unconscious', 'purification'], personal: [] },
                flying: { category: 'actions', meanings: ['freedom', 'escape', 'ambition'], personal: [] },
                teeth: { category: 'objects', meanings: ['anxiety', 'loss', 'appearance concerns'], personal: [] },
                chase: { category: 'actions', meanings: ['avoidance', 'fear', 'pursuit'], personal: [] },
                death: { category: 'actions', meanings: ['transformation', 'endings', 'new beginnings'], personal: [] },
                house: { category: 'places', meanings: ['self', 'psyche', 'family'], personal: [] },
                car: { category: 'objects', meanings: ['control', 'direction in life', 'progress'], personal: [] },
                snake: { category: 'animals', meanings: ['transformation', 'hidden fears', 'healing'], personal: [] },
                baby: { category: 'people', meanings: ['new beginnings', 'innocence', 'vulnerability'], personal: [] },
                falling: { category: 'actions', meanings: ['loss of control', 'insecurity', 'letting go'], personal: [] }
            };
        },

        searchOrAdd() {
            const input = document.getElementById('symbol-search').value.toLowerCase().trim();
            if (!input) return;

            if (this.symbols[input]) {
                this.displaySymbol(input, this.symbols[input]);
            } else {
                this.addNewSymbol(input);
            }
        },

        addNewSymbol(symbol) {
            const meaning = prompt(`What does "${symbol}" mean to you?`);
            if (meaning) {
                const category = prompt('Category? (animals/objects/people/places/actions/personal)') || 'personal';
                this.symbols[symbol] = {
                    category: category,
                    meanings: [],
                    personal: [meaning]
                };
                localStorage.setItem('dreamSymbols', JSON.stringify(this.symbols));
                this.displaySymbol(symbol, this.symbols[symbol]);
            }
        },

        displaySymbol(name, data) {
            const results = document.getElementById('symbol-results');
            results.innerHTML = `
                <div class="symbol-card">
                    <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    <p class="category">Category: ${data.category}</p>
                    <div class="meanings">
                        <h4>Common Meanings:</h4>
                        <ul>${data.meanings.map(m => `<li>${m}</li>`).join('')}</ul>
                    </div>
                    ${data.personal.length ? `
                        <div class="personal-meanings">
                            <h4>Your Personal Meanings:</h4>
                            <ul>${data.personal.map(m => `<li>${m}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    <button onclick="DreamSymbolDictionary.addPersonalMeaning('${name}')">Add Personal Meaning</button>
                </div>
            `;
        },

        filterCategory(category) {
            const results = document.getElementById('symbol-results');
            const filtered = category === 'all' ?
                Object.entries(this.symbols) :
                Object.entries(this.symbols).filter(([_, data]) => data.category === category);

            results.innerHTML = `
                <div class="symbol-grid">
                    ${filtered.map(([name, data]) => `
                        <div class="symbol-tile" onclick="DreamSymbolDictionary.displaySymbol('${name}', DreamSymbolDictionary.symbols['${name}'])">
                            <strong>${name}</strong>
                            <small>${data.category}</small>
                        </div>
                    `).join('')}
                </div>
            `;

            document.querySelectorAll('.categories button').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        },

        saveDream() {
            const entry = document.getElementById('dream-entry').value;
            if (!entry) return;

            const dreams = JSON.parse(localStorage.getItem('dreams') || '[]');
            dreams.unshift({
                date: new Date().toISOString(),
                content: entry,
                symbols: this.extractSymbols(entry)
            });
            localStorage.setItem('dreams', JSON.stringify(dreams.slice(0, 50)));

            document.getElementById('dream-entry').value = '';
            this.displayDreams();
            this.updateSymbolChart();
        },

        extractSymbols(text) {
            const words = text.toLowerCase().split(/\s+/);
            return words.filter(word => this.symbols[word]);
        },

        displayDreams() {
            const dreams = JSON.parse(localStorage.getItem('dreams') || '[]');
            const list = document.getElementById('dream-list');
            list.innerHTML = dreams.slice(0, 5).map(dream => `
                <div class="dream-entry">
                    <small>${new Date(dream.date).toLocaleDateString()}</small>
                    <p>${dream.content.substring(0, 100)}...</p>
                    ${dream.symbols.length ? `<em>Symbols: ${dream.symbols.join(', ')}</em>` : ''}
                </div>
            `).join('');
        },

        addPersonalMeaning(symbol) {
            const meaning = prompt(`Add personal meaning for "${symbol}":`);
            if (meaning) {
                this.symbols[symbol].personal.push(meaning);
                localStorage.setItem('dreamSymbols', JSON.stringify(this.symbols));
                this.displaySymbol(symbol, this.symbols[symbol]);
            }
        },

        updateSymbolChart() {
            const canvas = document.getElementById('symbol-chart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 200;

            const dreams = JSON.parse(localStorage.getItem('dreams') || '[]');
            const frequency = {};

            dreams.forEach(dream => {
                dream.symbols.forEach(symbol => {
                    frequency[symbol] = (frequency[symbol] || 0) + 1;
                });
            });

            const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 5);
            if (sorted.length === 0) return;

            const maxCount = sorted[0][1];
            const barWidth = canvas.width / sorted.length;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#4a90e2';

            sorted.forEach(([symbol, count], i) => {
                const height = (count / maxCount) * (canvas.height - 30);
                ctx.fillRect(i * barWidth + 10, canvas.height - height - 20, barWidth - 20, height);

                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.fillText(symbol, i * barWidth + 10, canvas.height - 5);
                ctx.fillText(count, i * barWidth + barWidth/2 - 5, canvas.height - height - 25);
                ctx.fillStyle = '#4a90e2';
            });
        }
    };

    // Utility 53: Confidence Calibrator
    window.ConfidenceCalibrator = {
        init() {
            this.predictions = this.loadPredictions();
            this.currentPrediction = null;
            return `
                <div class="confidence-calibrator">
                    <h2>Confidence Calibrator</h2>
                    <div class="calibration-score">
                        <h3>Your Calibration Score</h3>
                        <div id="calibration-display"></div>
                    </div>
                    <div class="new-prediction">
                        <h3>Make a Prediction</h3>
                        <textarea id="prediction-text" placeholder="What do you predict will happen?"></textarea>
                        <div class="confidence-slider">
                            <label>Confidence Level: <span id="confidence-value">50%</span></label>
                            <input type="range" id="confidence-level" min="0" max="100" value="50"
                                   oninput="ConfidenceCalibrator.updateConfidence(this.value)">
                        </div>
                        <input type="date" id="prediction-date" min="${new Date().toISOString().split('T')[0]}">
                        <button onclick="ConfidenceCalibrator.savePrediction()">Save Prediction</button>
                    </div>
                    <div class="pending-predictions">
                        <h3>Pending Predictions</h3>
                        <div id="pending-list"></div>
                    </div>
                    <div class="resolved-predictions">
                        <h3>Resolved Predictions</h3>
                        <div id="resolved-list"></div>
                    </div>
                    <div class="calibration-chart">
                        <canvas id="calibration-graph"></canvas>
                    </div>
                </div>
            `;
        },

        loadPredictions() {
            return JSON.parse(localStorage.getItem('predictions') || '{"pending": [], "resolved": []}');
        },

        updateConfidence(value) {
            document.getElementById('confidence-value').textContent = value + '%';
        },

        savePrediction() {
            const text = document.getElementById('prediction-text').value;
            const confidence = parseInt(document.getElementById('confidence-level').value);
            const date = document.getElementById('prediction-date').value;

            if (!text || !date) {
                alert('Please enter prediction text and target date');
                return;
            }

            const prediction = {
                id: Date.now(),
                text,
                confidence,
                targetDate: date,
                createdDate: new Date().toISOString()
            };

            this.predictions.pending.push(prediction);
            localStorage.setItem('predictions', JSON.stringify(this.predictions));

            document.getElementById('prediction-text').value = '';
            document.getElementById('confidence-level').value = 50;
            document.getElementById('prediction-date').value = '';

            this.displayPredictions();
            this.updateCalibrationScore();
        },

        displayPredictions() {
            // Check for due predictions
            const today = new Date().toISOString().split('T')[0];
            const due = this.predictions.pending.filter(p => p.targetDate <= today);

            if (due.length > 0) {
                due.forEach(p => this.promptResolution(p));
            }

            // Display pending
            const pendingList = document.getElementById('pending-list');
            pendingList.innerHTML = this.predictions.pending
                .filter(p => p.targetDate > today)
                .map(p => `
                    <div class="prediction-card">
                        <p>${p.text}</p>
                        <div class="prediction-meta">
                            <span>Confidence: ${p.confidence}%</span>
                            <span>Due: ${p.targetDate}</span>
                        </div>
                        <button onclick="ConfidenceCalibrator.editPrediction(${p.id})">Edit</button>
                    </div>
                `).join('');

            // Display resolved
            const resolvedList = document.getElementById('resolved-list');
            resolvedList.innerHTML = this.predictions.resolved
                .slice(0, 10)
                .map(p => `
                    <div class="prediction-card ${p.correct ? 'correct' : 'incorrect'}">
                        <p>${p.text}</p>
                        <div class="prediction-meta">
                            <span>Confidence: ${p.confidence}%</span>
                            <span>Result: ${p.correct ? '✓' : '✗'}</span>
                        </div>
                    </div>
                `).join('');
        },

        promptResolution(prediction) {
            const result = confirm(`Your prediction: "${prediction.text}"\n\nDid this come true?`);

            prediction.correct = result;
            prediction.resolvedDate = new Date().toISOString();

            this.predictions.pending = this.predictions.pending.filter(p => p.id !== prediction.id);
            this.predictions.resolved.unshift(prediction);

            localStorage.setItem('predictions', JSON.stringify(this.predictions));
            this.displayPredictions();
            this.updateCalibrationScore();
        },

        updateCalibrationScore() {
            const display = document.getElementById('calibration-display');
            const resolved = this.predictions.resolved;

            if (resolved.length === 0) {
                display.innerHTML = '<p>No resolved predictions yet</p>';
                return;
            }

            // Calculate calibration
            const buckets = {};
            for (let i = 0; i <= 10; i++) {
                buckets[i * 10] = { correct: 0, total: 0 };
            }

            resolved.forEach(p => {
                const bucket = Math.round(p.confidence / 10) * 10;
                buckets[bucket].total++;
                if (p.correct) buckets[bucket].correct++;
            });

            let totalError = 0;
            let count = 0;

            Object.entries(buckets).forEach(([conf, data]) => {
                if (data.total > 0) {
                    const expected = parseInt(conf) / 100;
                    const actual = data.correct / data.total;
                    totalError += Math.abs(expected - actual);
                    count++;
                }
            });

            const calibrationScore = count > 0 ? Math.max(0, 100 - (totalError / count * 100)) : 0;

            display.innerHTML = `
                <div class="score-display">
                    <h1>${calibrationScore.toFixed(1)}%</h1>
                    <p>Based on ${resolved.length} predictions</p>
                    <p class="interpretation">${this.interpretScore(calibrationScore)}</p>
                </div>
            `;

            this.drawCalibrationChart(buckets);
        },

        interpretScore(score) {
            if (score >= 90) return 'Excellent calibration!';
            if (score >= 75) return 'Good calibration';
            if (score >= 60) return 'Fair calibration';
            if (score >= 40) return 'Needs improvement';
            return 'Poor calibration - practice more!';
        },

        drawCalibrationChart(buckets) {
            const canvas = document.getElementById('calibration-graph');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 400;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw perfect calibration line
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(canvas.width, 0);
            ctx.stroke();

            // Draw actual calibration
            ctx.strokeStyle = '#4a90e2';
            ctx.lineWidth = 3;
            ctx.beginPath();

            Object.entries(buckets).forEach(([conf, data]) => {
                if (data.total > 0) {
                    const x = (parseInt(conf) / 100) * canvas.width;
                    const y = canvas.height - (data.correct / data.total * canvas.height);

                    if (parseInt(conf) === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    // Draw point
                    ctx.fillStyle = '#4a90e2';
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            ctx.stroke();

            // Labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.fillText('0%', 5, canvas.height - 5);
            ctx.fillText('100%', canvas.width - 30, canvas.height - 5);
            ctx.fillText('Actual', 5, 15);
        },

        editPrediction(id) {
            const prediction = this.predictions.pending.find(p => p.id === id);
            if (!prediction) return;

            const newText = prompt('Edit prediction:', prediction.text);
            if (newText) {
                prediction.text = newText;
                localStorage.setItem('predictions', JSON.stringify(this.predictions));
                this.displayPredictions();
            }
        }
    };

    // Utility 54: Relationship Map Visualizer
    window.RelationshipMapVisualizer = {
        init() {
            this.nodes = this.loadNodes();
            this.selectedNode = null;
            this.draggedNode = null;
            return `
                <div class="relationship-visualizer">
                    <h2>Relationship Map Visualizer</h2>
                    <div class="controls">
                        <button onclick="RelationshipMapVisualizer.addPerson()">Add Person</button>
                        <button onclick="RelationshipMapVisualizer.addConnection()">Connect People</button>
                        <button onclick="RelationshipMapVisualizer.exportMap()">Export Map</button>
                        <button onclick="RelationshipMapVisualizer.importMap()">Import Map</button>
                        <select id="view-mode" onchange="RelationshipMapVisualizer.changeView(this.value)">
                            <option value="network">Network View</option>
                            <option value="circles">Circle of Trust</option>
                            <option value="timeline">Timeline View</option>
                            <option value="energy">Energy Map</option>
                        </select>
                    </div>
                    <canvas id="relationship-canvas"></canvas>
                    <div class="node-details" id="node-details"></div>
                    <div class="relationship-insights">
                        <h3>Insights</h3>
                        <div id="insights-panel"></div>
                    </div>
                </div>
            `;
        },

        loadNodes() {
            const saved = localStorage.getItem('relationshipNodes');
            if (saved) return JSON.parse(saved);

            return {
                people: [
                    {
                        id: 'self',
                        name: 'Me',
                        x: 400,
                        y: 300,
                        type: 'self',
                        energy: 100,
                        notes: ''
                    }
                ],
                connections: []
            };
        },

        addPerson() {
            const name = prompt('Person\'s name:');
            if (!name) return;

            const type = prompt('Relationship type (family/friend/colleague/acquaintance):') || 'friend';

            const person = {
                id: 'person_' + Date.now(),
                name,
                type,
                x: 300 + Math.random() * 200,
                y: 200 + Math.random() * 200,
                energy: 50,
                notes: '',
                lastContact: new Date().toISOString()
            };

            this.nodes.people.push(person);
            this.saveNodes();
            this.render();
        },

        addConnection() {
            if (this.nodes.people.length < 2) {
                alert('Add at least 2 people first');
                return;
            }

            const from = prompt('From person (name):');
            const to = prompt('To person (name):');

            const fromNode = this.nodes.people.find(p => p.name.toLowerCase() === from.toLowerCase());
            const toNode = this.nodes.people.find(p => p.name.toLowerCase() === to.toLowerCase());

            if (!fromNode || !toNode) {
                alert('People not found');
                return;
            }

            const strength = parseInt(prompt('Connection strength (1-10):', '5')) || 5;
            const type = prompt('Connection type:', 'friendship') || 'friendship';

            this.nodes.connections.push({
                from: fromNode.id,
                to: toNode.id,
                strength,
                type,
                notes: ''
            });

            this.saveNodes();
            this.render();
        },

        render() {
            const canvas = document.getElementById('relationship-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            this.nodes.connections.forEach(conn => {
                const from = this.nodes.people.find(p => p.id === conn.from);
                const to = this.nodes.people.find(p => p.id === conn.to);

                if (!from || !to) return;

                ctx.strokeStyle = `rgba(100, 150, 200, ${conn.strength / 10})`;
                ctx.lineWidth = conn.strength / 2;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();

                // Connection label
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                ctx.fillStyle = '#666';
                ctx.font = '10px Arial';
                ctx.fillText(conn.type, midX - 20, midY);
            });

            // Draw nodes
            this.nodes.people.forEach(person => {
                const radius = person.type === 'self' ? 30 : 20;

                // Node circle
                ctx.fillStyle = this.getNodeColor(person);
                ctx.beginPath();
                ctx.arc(person.x, person.y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Node border
                ctx.strokeStyle = person === this.selectedNode ? '#ff6b6b' : '#333';
                ctx.lineWidth = person === this.selectedNode ? 3 : 1;
                ctx.stroke();

                // Node label
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(person.name, person.x, person.y + radius + 15);
            });

            // Set up mouse events
            canvas.onmousedown = (e) => this.handleMouseDown(e);
            canvas.onmousemove = (e) => this.handleMouseMove(e);
            canvas.onmouseup = () => this.handleMouseUp();

            this.updateInsights();
        },

        getNodeColor(person) {
            const colors = {
                self: '#4a90e2',
                family: '#e74c3c',
                friend: '#2ecc71',
                colleague: '#f39c12',
                acquaintance: '#95a5a6'
            };
            return colors[person.type] || '#95a5a6';
        },

        handleMouseDown(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const clicked = this.nodes.people.find(p => {
                const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
                return dist < 30;
            });

            if (clicked) {
                this.selectedNode = clicked;
                this.draggedNode = clicked;
                this.showNodeDetails(clicked);
            }
        },

        handleMouseMove(e) {
            if (!this.draggedNode) return;

            const rect = e.target.getBoundingClientRect();
            this.draggedNode.x = e.clientX - rect.left;
            this.draggedNode.y = e.clientY - rect.top;

            this.render();
        },

        handleMouseUp() {
            this.draggedNode = null;
            this.saveNodes();
        },

        showNodeDetails(node) {
            const details = document.getElementById('node-details');
            details.innerHTML = `
                <h3>${node.name}</h3>
                <p>Type: ${node.type}</p>
                <p>Energy Level: <input type="range" min="0" max="100" value="${node.energy}"
                    onchange="RelationshipMapVisualizer.updateEnergy('${node.id}', this.value)"></p>
                <p>Last Contact: ${node.lastContact ? new Date(node.lastContact).toLocaleDateString() : 'Never'}</p>
                <textarea placeholder="Notes about ${node.name}..."
                    onchange="RelationshipMapVisualizer.updateNotes('${node.id}', this.value)">${node.notes || ''}</textarea>
                <button onclick="RelationshipMapVisualizer.recordContact('${node.id}')">Record Contact</button>
                ${node.id !== 'self' ? `<button onclick="RelationshipMapVisualizer.removeNode('${node.id}')">Remove</button>` : ''}
            `;
        },

        updateEnergy(id, value) {
            const node = this.nodes.people.find(p => p.id === id);
            if (node) {
                node.energy = parseInt(value);
                this.saveNodes();
                this.render();
            }
        },

        updateNotes(id, value) {
            const node = this.nodes.people.find(p => p.id === id);
            if (node) {
                node.notes = value;
                this.saveNodes();
            }
        },

        recordContact(id) {
            const node = this.nodes.people.find(p => p.id === id);
            if (node) {
                node.lastContact = new Date().toISOString();
                this.saveNodes();
                this.showNodeDetails(node);
                this.render();
            }
        },

        removeNode(id) {
            if (confirm('Remove this person and all their connections?')) {
                this.nodes.people = this.nodes.people.filter(p => p.id !== id);
                this.nodes.connections = this.nodes.connections.filter(c => c.from !== id && c.to !== id);
                this.saveNodes();
                this.render();
            }
        },

        changeView(mode) {
            // Different visualization modes
            switch(mode) {
                case 'circles':
                    this.arrangeInCircles();
                    break;
                case 'timeline':
                    this.arrangeByTimeline();
                    break;
                case 'energy':
                    this.arrangeByEnergy();
                    break;
                default:
                    this.render();
            }
        },

        arrangeInCircles() {
            const self = this.nodes.people.find(p => p.id === 'self');
            if (!self) return;

            // Place self in center
            self.x = 400;
            self.y = 300;

            // Arrange others in concentric circles by relationship strength
            const others = this.nodes.people.filter(p => p.id !== 'self');
            const circles = { family: 100, friend: 150, colleague: 200, acquaintance: 250 };

            others.forEach((person, i) => {
                const radius = circles[person.type] || 250;
                const angle = (i / others.length) * Math.PI * 2;
                person.x = 400 + Math.cos(angle) * radius;
                person.y = 300 + Math.sin(angle) * radius;
            });

            this.saveNodes();
            this.render();
        },

        arrangeByTimeline() {
            // Arrange by last contact date
            const sorted = [...this.nodes.people].sort((a, b) => {
                const dateA = a.lastContact ? new Date(a.lastContact) : new Date(0);
                const dateB = b.lastContact ? new Date(b.lastContact) : new Date(0);
                return dateB - dateA;
            });

            sorted.forEach((person, i) => {
                person.x = 100 + (i % 5) * 150;
                person.y = 100 + Math.floor(i / 5) * 100;
            });

            this.saveNodes();
            this.render();
        },

        arrangeByEnergy() {
            // Arrange by energy levels
            const sorted = [...this.nodes.people].sort((a, b) => b.energy - a.energy);

            sorted.forEach((person, i) => {
                const radius = 150 + (100 - person.energy) * 2;
                const angle = (i / sorted.length) * Math.PI * 2;
                person.x = 400 + Math.cos(angle) * radius;
                person.y = 300 + Math.sin(angle) * radius;
            });

            this.saveNodes();
            this.render();
        },

        updateInsights() {
            const panel = document.getElementById('insights-panel');
            if (!panel) return;

            const totalPeople = this.nodes.people.length - 1; // Exclude self
            const avgEnergy = this.nodes.people.reduce((sum, p) => sum + p.energy, 0) / this.nodes.people.length;

            const neglected = this.nodes.people.filter(p => {
                if (p.id === 'self') return false;
                const daysSince = p.lastContact ?
                    (Date.now() - new Date(p.lastContact)) / (1000 * 60 * 60 * 24) : 999;
                return daysSince > 30;
            });

            panel.innerHTML = `
                <p>Total connections: ${totalPeople}</p>
                <p>Average energy: ${avgEnergy.toFixed(1)}%</p>
                <p>Need attention: ${neglected.length} people</p>
                ${neglected.length > 0 ? `
                    <div class="neglected-list">
                        <strong>Haven't connected with:</strong>
                        <ul>${neglected.map(p => `<li>${p.name}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            `;
        },

        saveNodes() {
            localStorage.setItem('relationshipNodes', JSON.stringify(this.nodes));
        },

        exportMap() {
            const data = JSON.stringify(this.nodes, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relationship-map.json';
            a.click();
        },

        importMap() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        this.nodes = JSON.parse(event.target.result);
                        this.saveNodes();
                        this.render();
                    } catch (err) {
                        alert('Invalid file format');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }
    };

    // Utility 55: Skill Tree Builder
    window.SkillTreeBuilder = {
        init() {
            this.skills = this.loadSkills();
            this.selectedSkill = null;
            return `
                <div class="skill-tree-builder">
                    <h2>Skill Tree Builder</h2>
                    <div class="controls">
                        <button onclick="SkillTreeBuilder.addRootSkill()">Add Root Skill</button>
                        <button onclick="SkillTreeBuilder.saveTree()">Save Tree</button>
                        <button onclick="SkillTreeBuilder.loadTree()">Load Tree</button>
                        <select id="tree-template" onchange="SkillTreeBuilder.loadTemplate(this.value)">
                            <option value="">Select Template...</option>
                            <option value="programming">Programming</option>
                            <option value="music">Music</option>
                            <option value="language">Language Learning</option>
                            <option value="fitness">Fitness</option>
                        </select>
                    </div>
                    <div class="skill-canvas-container">
                        <canvas id="skill-tree-canvas"></canvas>
                    </div>
                    <div class="skill-details" id="skill-details"></div>
                    <div class="progress-summary">
                        <h3>Progress Summary</h3>
                        <div id="progress-stats"></div>
                    </div>
                </div>
            `;
        },

        loadSkills() {
            const saved = localStorage.getItem('skillTree');
            if (saved) return JSON.parse(saved);

            return {
                skills: [],
                connections: []
            };
        },

        addRootSkill() {
            const name = prompt('Root skill name:');
            if (!name) return;

            const skill = {
                id: 'skill_' + Date.now(),
                name,
                level: 0,
                maxLevel: 5,
                progress: 0,
                x: 400,
                y: 50,
                isRoot: true,
                prerequisites: [],
                unlocked: true,
                notes: '',
                timeSpent: 0
            };

            this.skills.skills.push(skill);
            this.saveSkills();
            this.render();
        },

        addChildSkill(parentId) {
            const parent = this.skills.skills.find(s => s.id === parentId);
            if (!parent) return;

            const name = prompt('Child skill name:');
            if (!name) return;

            const skill = {
                id: 'skill_' + Date.now(),
                name,
                level: 0,
                maxLevel: 5,
                progress: 0,
                x: parent.x + (Math.random() - 0.5) * 150,
                y: parent.y + 100,
                isRoot: false,
                prerequisites: [parentId],
                unlocked: parent.level > 0,
                notes: '',
                timeSpent: 0
            };

            this.skills.skills.push(skill);
            this.skills.connections.push({
                from: parentId,
                to: skill.id
            });

            this.saveSkills();
            this.render();
        },

        render() {
            const canvas = document.getElementById('skill-tree-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            this.skills.connections.forEach(conn => {
                const from = this.skills.skills.find(s => s.id === conn.from);
                const to = this.skills.skills.find(s => s.id === conn.to);

                if (!from || !to) return;

                ctx.strokeStyle = to.unlocked ? '#4a90e2' : '#ccc';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y + 25);
                ctx.lineTo(to.x, to.y - 25);
                ctx.stroke();
            });

            // Draw skills
            this.skills.skills.forEach(skill => {
                // Skill node
                const gradient = ctx.createRadialGradient(skill.x, skill.y, 0, skill.x, skill.y, 30);
                if (skill.unlocked) {
                    gradient.addColorStop(0, '#4a90e2');
                    gradient.addColorStop(1, '#2c5aa0');
                } else {
                    gradient.addColorStop(0, '#999');
                    gradient.addColorStop(1, '#666');
                }

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(skill.x, skill.y, 30, 0, Math.PI * 2);
                ctx.fill();

                // Progress ring
                if (skill.level > 0) {
                    ctx.strokeStyle = '#2ecc71';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.arc(skill.x, skill.y, 35, -Math.PI / 2,
                           -Math.PI / 2 + (skill.level / skill.maxLevel) * Math.PI * 2);
                    ctx.stroke();
                }

                // Skill icon/level
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`${skill.level}/${skill.maxLevel}`, skill.x, skill.y + 5);

                // Skill name
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.fillText(skill.name, skill.x, skill.y + 50);
            });

            // Mouse events
            canvas.onclick = (e) => this.handleClick(e);
            canvas.oncontextmenu = (e) => {
                e.preventDefault();
                this.handleRightClick(e);
            };

            this.updateProgressStats();
        },

        handleClick(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const clicked = this.skills.skills.find(s => {
                const dist = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);
                return dist < 30;
            });

            if (clicked) {
                this.selectedSkill = clicked;
                this.showSkillDetails(clicked);
            }
        },

        handleRightClick(e) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const clicked = this.skills.skills.find(s => {
                const dist = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);
                return dist < 30;
            });

            if (clicked) {
                this.addChildSkill(clicked.id);
            }
        },

        showSkillDetails(skill) {
            const details = document.getElementById('skill-details');
            details.innerHTML = `
                <h3>${skill.name}</h3>
                <div class="skill-progress">
                    <label>Level: ${skill.level}/${skill.maxLevel}</label>
                    <button onclick="SkillTreeBuilder.levelUp('${skill.id}')"
                            ${!skill.unlocked || skill.level >= skill.maxLevel ? 'disabled' : ''}>Level Up</button>
                </div>
                <div class="skill-xp">
                    <label>Progress to next level:</label>
                    <progress value="${skill.progress}" max="100"></progress>
                    <button onclick="SkillTreeBuilder.addProgress('${skill.id}', 10)">+10 XP</button>
                </div>
                <div class="skill-time">
                    <p>Time invested: ${this.formatTime(skill.timeSpent)}</p>
                    <button onclick="SkillTreeBuilder.logTime('${skill.id}')">Log Time</button>
                </div>
                <textarea placeholder="Notes about this skill..."
                          onchange="SkillTreeBuilder.updateNotes('${skill.id}', this.value)">${skill.notes || ''}</textarea>
                <div class="skill-actions">
                    <button onclick="SkillTreeBuilder.addChildSkill('${skill.id}')">Add Child Skill</button>
                    ${!skill.isRoot ? `<button onclick="SkillTreeBuilder.removeSkill('${skill.id}')">Remove</button>` : ''}
                </div>
            `;
        },

        levelUp(id) {
            const skill = this.skills.skills.find(s => s.id === id);
            if (!skill || !skill.unlocked || skill.level >= skill.maxLevel) return;

            if (skill.progress >= 100) {
                skill.level++;
                skill.progress = 0;

                // Unlock children
                this.skills.skills.forEach(s => {
                    if (s.prerequisites.includes(id)) {
                        s.unlocked = true;
                    }
                });

                this.saveSkills();
                this.render();
                this.showSkillDetails(skill);
            } else {
                alert('Not enough XP to level up!');
            }
        },

        addProgress(id, amount) {
            const skill = this.skills.skills.find(s => s.id === id);
            if (!skill || !skill.unlocked) return;

            skill.progress = Math.min(100, skill.progress + amount);

            if (skill.progress >= 100 && skill.level < skill.maxLevel) {
                alert('Ready to level up!');
            }

            this.saveSkills();
            this.showSkillDetails(skill);
        },

        logTime(id) {
            const minutes = parseInt(prompt('Minutes spent practicing:'));
            if (!minutes) return;

            const skill = this.skills.skills.find(s => s.id === id);
            if (skill) {
                skill.timeSpent += minutes;
                skill.progress += Math.floor(minutes / 6); // 10 XP per hour
                this.saveSkills();
                this.showSkillDetails(skill);
                this.render();
            }
        },

        updateNotes(id, value) {
            const skill = this.skills.skills.find(s => s.id === id);
            if (skill) {
                skill.notes = value;
                this.saveSkills();
            }
        },

        removeSkill(id) {
            if (confirm('Remove this skill and all its children?')) {
                // Find all descendants
                const toRemove = new Set([id]);
                let changed = true;

                while (changed) {
                    changed = false;
                    this.skills.skills.forEach(s => {
                        if (s.prerequisites.some(p => toRemove.has(p))) {
                            if (!toRemove.has(s.id)) {
                                toRemove.add(s.id);
                                changed = true;
                            }
                        }
                    });
                }

                this.skills.skills = this.skills.skills.filter(s => !toRemove.has(s.id));
                this.skills.connections = this.skills.connections.filter(c =>
                    !toRemove.has(c.from) && !toRemove.has(c.to)
                );

                this.saveSkills();
                this.render();
            }
        },

        formatTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}h ${mins}m`;
        },

        updateProgressStats() {
            const stats = document.getElementById('progress-stats');
            if (!stats) return;

            const totalSkills = this.skills.skills.length;
            const unlockedSkills = this.skills.skills.filter(s => s.unlocked).length;
            const totalLevels = this.skills.skills.reduce((sum, s) => sum + s.level, 0);
            const totalTime = this.skills.skills.reduce((sum, s) => sum + s.timeSpent, 0);

            stats.innerHTML = `
                <p>Total Skills: ${totalSkills}</p>
                <p>Unlocked: ${unlockedSkills}</p>
                <p>Total Levels: ${totalLevels}</p>
                <p>Time Invested: ${this.formatTime(totalTime)}</p>
                <div class="skill-chart">
                    <canvas id="skill-distribution"></canvas>
                </div>
            `;

            this.drawDistributionChart();
        },

        drawDistributionChart() {
            const canvas = document.getElementById('skill-distribution');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = 250;
            canvas.height = 150;

            const distribution = {};
            this.skills.skills.forEach(s => {
                distribution[s.level] = (distribution[s.level] || 0) + 1;
            });

            const maxCount = Math.max(...Object.values(distribution));
            const barWidth = canvas.width / 6;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let level = 0; level <= 5; level++) {
                const count = distribution[level] || 0;
                const height = (count / maxCount) * (canvas.height - 20);

                ctx.fillStyle = level === 0 ? '#999' : '#4a90e2';
                ctx.fillRect(level * barWidth + 5, canvas.height - height - 20, barWidth - 10, height);

                ctx.fillStyle = '#333';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`L${level}`, level * barWidth + barWidth/2, canvas.height - 5);
                if (count > 0) {
                    ctx.fillText(count, level * barWidth + barWidth/2, canvas.height - height - 25);
                }
            }
        },

        loadTemplate(template) {
            if (!template) return;

            const templates = {
                programming: {
                    skills: [
                        { name: 'Programming', x: 400, y: 50, children: [
                            { name: 'Web Dev', x: 250, y: 150, children: [
                                { name: 'HTML/CSS', x: 200, y: 250 },
                                { name: 'JavaScript', x: 300, y: 250 }
                            ]},
                            { name: 'Backend', x: 400, y: 150, children: [
                                { name: 'Databases', x: 350, y: 250 },
                                { name: 'APIs', x: 450, y: 250 }
                            ]},
                            { name: 'DevOps', x: 550, y: 150, children: [
                                { name: 'CI/CD', x: 500, y: 250 },
                                { name: 'Cloud', x: 600, y: 250 }
                            ]}
                        ]}
                    ]
                },
                music: {
                    skills: [
                        { name: 'Music', x: 400, y: 50, children: [
                            { name: 'Theory', x: 250, y: 150, children: [
                                { name: 'Scales', x: 200, y: 250 },
                                { name: 'Harmony', x: 300, y: 250 }
                            ]},
                            { name: 'Practice', x: 400, y: 150, children: [
                                { name: 'Technique', x: 350, y: 250 },
                                { name: 'Repertoire', x: 450, y: 250 }
                            ]},
                            { name: 'Performance', x: 550, y: 150, children: [
                                { name: 'Stage Presence', x: 500, y: 250 },
                                { name: 'Recording', x: 600, y: 250 }
                            ]}
                        ]}
                    ]
                }
            };

            const selected = templates[template];
            if (!selected) return;

            this.skills = { skills: [], connections: [] };
            this.buildFromTemplate(selected.skills, null);
            this.saveSkills();
            this.render();
        },

        buildFromTemplate(nodes, parentId) {
            nodes.forEach(node => {
                const skill = {
                    id: 'skill_' + Date.now() + Math.random(),
                    name: node.name,
                    level: 0,
                    maxLevel: 5,
                    progress: 0,
                    x: node.x,
                    y: node.y,
                    isRoot: !parentId,
                    prerequisites: parentId ? [parentId] : [],
                    unlocked: !parentId,
                    notes: '',
                    timeSpent: 0
                };

                this.skills.skills.push(skill);

                if (parentId) {
                    this.skills.connections.push({
                        from: parentId,
                        to: skill.id
                    });
                }

                if (node.children) {
                    this.buildFromTemplate(node.children, skill.id);
                }
            });
        },

        saveSkills() {
            localStorage.setItem('skillTree', JSON.stringify(this.skills));
        },

        saveTree() {
            const data = JSON.stringify(this.skills, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'skill-tree.json';
            a.click();
        },

        loadTree() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        this.skills = JSON.parse(event.target.result);
                        this.saveSkills();
                        this.render();
                    } catch (err) {
                        alert('Invalid file format');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }
    };

    // Register all enhanced utilities
    window.addEventListener('DOMContentLoaded', () => {
        console.log('Enhanced utilities loaded - Dream Dictionary, Confidence Calibrator, Relationship Visualizer, Skill Tree Builder');
    });
})();