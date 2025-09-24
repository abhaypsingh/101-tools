// Core System - Router, State, Storage, UI Primitives
const Core = (() => {
    // Storage Adapter
    const Storage = {
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Storage read error:', e);
                return null;
            }
        },

        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    this.showStorageWarning();
                }
                console.error('Storage write error:', e);
                return false;
            }
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        },

        getSize() {
            let size = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    size += localStorage[key].length + key.length;
                }
            }
            return size;
        },

        exportData() {
            const data = {};
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    try {
                        data[key] = JSON.parse(localStorage[key]);
                    } catch (e) {
                        data[key] = localStorage[key];
                    }
                }
            }
            return data;
        },

        importData(data) {
            for (let key in data) {
                this.set(key, data[key]);
            }
        },

        showStorageWarning() {
            Core.Toast.show('Storage limit reached. Please export your data.', 'warning');
        }
    };

    // Event Bus
    const EventBus = {
        events: {},

        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        },

        off(event, callback) {
            if (this.events[event]) {
                this.events[event] = this.events[event].filter(cb => cb !== callback);
            }
        },

        emit(event, data) {
            if (this.events[event]) {
                this.events[event].forEach(callback => callback(data));
            }
        }
    };

    // Router
    const Router = {
        routes: {},
        currentRoute: null,

        init() {
            window.addEventListener('hashchange', () => this.handleRoute());
            this.handleRoute();
        },

        register(path, handler) {
            this.routes[path] = handler;
        },

        navigate(path) {
            window.location.hash = path;
        },

        handleRoute() {
            const hash = window.location.hash.slice(1) || '/';
            const parts = hash.split('/').filter(p => p); // Remove empty parts

            // Check for utility route
            if (parts[0] === 'utility' && parts[1]) {
                const utilityId = parts[1];
                if (this.routes['/utility']) {
                    this.routes['/utility'](utilityId);
                }
            } else if (this.routes[hash]) {
                this.routes[hash]();
            } else if (this.routes['/']) {
                this.routes['/']();
            }

            this.currentRoute = hash;
            this.updateNavigation(hash);
        },

        updateNavigation(hash) {
            document.querySelectorAll('.nav-link').forEach(link => {
                const href = link.getAttribute('href').slice(1);
                link.classList.toggle('active', href === hash || hash.startsWith(href + '/'));
            });
        }
    };

    // State Manager
    const State = {
        global: {
            theme: 'light',
            favorites: [],
            recent: [],
            settings: {
                reducedMotion: false,
                highContrast: false,
                fontSize: 'medium'
            }
        },

        init() {
            const saved = Storage.get('globalState');
            if (saved) {
                this.global = { ...this.global, ...saved };
            }
            this.applySettings();
        },

        save() {
            Storage.set('globalState', this.global);
        },

        applySettings() {
            // Apply theme
            document.documentElement.setAttribute('data-theme', this.global.theme);

            // Apply reduced motion
            if (this.global.settings.reducedMotion) {
                document.documentElement.style.setProperty('--transition', 'none');
            }

            // Apply font size
            const sizes = { small: '14px', medium: '16px', large: '18px' };
            document.documentElement.style.fontSize = sizes[this.global.settings.fontSize];
        },

        toggleTheme() {
            this.global.theme = this.global.theme === 'light' ? 'dark' : 'light';
            this.applySettings();
            this.save();
        },

        addFavorite(utilityId) {
            if (!this.global.favorites.includes(utilityId)) {
                this.global.favorites.push(utilityId);
                this.save();
            }
        },

        removeFavorite(utilityId) {
            this.global.favorites = this.global.favorites.filter(id => id !== utilityId);
            this.save();
        },

        addRecent(utilityId) {
            this.global.recent = this.global.recent.filter(id => id !== utilityId);
            this.global.recent.unshift(utilityId);
            if (this.global.recent.length > 10) {
                this.global.recent.pop();
            }
            this.save();
        }
    };

    // Toast Notifications
    const Toast = {
        show(message, type = 'info', duration = 3000) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            toast.setAttribute('role', 'alert');

            container.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
    };

    // Modal System
    const Modal = {
        show(title, content, buttons = []) {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.onclick = (e) => {
                if (e.target === overlay) this.close();
            };

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', title);

            const header = document.createElement('div');
            header.className = 'modal-header';

            const titleEl = document.createElement('h2');
            titleEl.className = 'modal-title';
            titleEl.textContent = title;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '×';
            closeBtn.setAttribute('aria-label', 'Close dialog');
            closeBtn.onclick = () => this.close();

            header.appendChild(titleEl);
            header.appendChild(closeBtn);

            const body = document.createElement('div');
            body.className = 'modal-body';
            if (typeof content === 'string') {
                body.innerHTML = content;
            } else {
                body.appendChild(content);
            }

            modal.appendChild(header);
            modal.appendChild(body);

            if (buttons.length > 0) {
                const footer = document.createElement('div');
                footer.className = 'modal-footer';
                footer.style.display = 'flex';
                footer.style.gap = '1rem';
                footer.style.justifyContent = 'flex-end';
                footer.style.marginTop = '2rem';

                buttons.forEach(btn => {
                    const button = document.createElement('button');
                    button.className = `btn ${btn.class || 'btn-secondary'}`;
                    button.textContent = btn.text;
                    button.onclick = btn.onClick;
                    footer.appendChild(button);
                });

                modal.appendChild(footer);
            }

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Focus management
            const focusableElements = modal.querySelectorAll('button, input, select, textarea');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        },

        close() {
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    };

    // Capability Detection
    const Capabilities = {
        features: {},

        init() {
            this.features = {
                webgl: this.checkWebGL(),
                webAudio: this.checkWebAudio(),
                localStorage: this.checkLocalStorage(),
                geolocation: 'geolocation' in navigator,
                deviceMotion: 'DeviceMotionEvent' in window,
                speechRecognition: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
                crypto: 'crypto' in window && 'subtle' in window.crypto,
                canvas: this.checkCanvas(),
                dragDrop: this.checkDragDrop(),
                indexedDB: 'indexedDB' in window,
                serviceWorker: 'serviceWorker' in navigator,
                notification: 'Notification' in window
            };
        },

        checkWebGL() {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext &&
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch(e) {
                return false;
            }
        },

        checkWebAudio() {
            return !!(window.AudioContext || window.webkitAudioContext);
        },

        checkLocalStorage() {
            try {
                const test = 'test';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        },

        checkCanvas() {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext && canvas.getContext('2d'));
        },

        checkDragDrop() {
            const div = document.createElement('div');
            return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
        },

        check(feature) {
            return this.features[feature] || false;
        }
    };

    // UI Components
    const UI = {
        createElement(tag, className, content) {
            const el = document.createElement(tag);
            if (className) el.className = className;
            if (content) {
                if (typeof content === 'string') {
                    el.textContent = content;
                } else {
                    el.appendChild(content);
                }
            }
            return el;
        },

        createCard(title, description, badges = []) {
            const card = this.createElement('div', 'utility-card');

            const header = this.createElement('div', 'utility-header');
            const titleEl = this.createElement('h3', 'utility-title', title);

            const badgeContainer = this.createElement('div', 'utility-badges');
            badges.forEach(badge => {
                const badgeEl = this.createElement('span', `badge ${badge.class || ''}`, badge.text);
                badgeContainer.appendChild(badgeEl);
            });

            header.appendChild(titleEl);
            header.appendChild(badgeContainer);

            const desc = this.createElement('p', 'utility-description', description);

            card.appendChild(header);
            card.appendChild(desc);

            return card;
        },

        createInput(type, label, options = {}) {
            const group = this.createElement('div', 'input-group');

            if (label) {
                const labelEl = this.createElement('label', 'input-label', label);
                if (options.id) labelEl.setAttribute('for', options.id);
                group.appendChild(labelEl);
            }

            let input;
            if (type === 'textarea') {
                input = this.createElement('textarea', 'input-field textarea-field');
            } else if (type === 'select') {
                input = this.createElement('select', 'input-field');
                if (options.options) {
                    options.options.forEach(opt => {
                        const option = this.createElement('option');
                        option.value = opt.value;
                        option.textContent = opt.text;
                        input.appendChild(option);
                    });
                }
            } else {
                input = this.createElement('input', 'input-field');
                input.type = type;
            }

            if (options.id) input.id = options.id;
            if (options.placeholder) input.placeholder = options.placeholder;
            if (options.value) input.value = options.value;
            if (options.required) input.required = true;

            group.appendChild(input);

            return group;
        },

        createButton(text, className = 'btn-primary', onClick) {
            const btn = this.createElement('button', `btn ${className}`, text);
            if (onClick) btn.onclick = onClick;
            return btn;
        },

        createLoading() {
            const container = this.createElement('div');
            container.style.textAlign = 'center';
            container.style.padding = '2rem';

            const spinner = this.createElement('div', 'loading-spinner');
            container.appendChild(spinner);

            return container;
        },

        createEmptyState(icon, title, description) {
            const container = this.createElement('div', 'empty-state');

            const iconEl = this.createElement('div', 'empty-state-icon', icon);
            const titleEl = this.createElement('h2', 'empty-state-title', title);
            const descEl = this.createElement('p', 'empty-state-description', description);

            container.appendChild(iconEl);
            container.appendChild(titleEl);
            container.appendChild(descEl);

            return container;
        }
    };

    // Initialize
    const init = () => {
        Capabilities.init();
        State.init();
        Router.init();
    };

    return {
        Storage,
        EventBus,
        Router,
        State,
        Toast,
        Modal,
        Capabilities,
        UI,
        init
    };
})();