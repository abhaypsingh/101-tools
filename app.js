// Main Application Controller
const App = {
    init() {
        Core.init();
        this.setupEventListeners();
        this.registerRoutes();
        this.loadUtilityImplementations();
    },

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            Core.State.toggleTheme();
            const icon = Core.State.global.theme === 'dark' ? '☀️' : '🌙';
            document.getElementById('theme-toggle').textContent = icon;
        });

        // Search
        document.getElementById('search').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.handleCategoryFilter(e.target.value);
        });

        // Surprise me button
        document.getElementById('surprise-me').addEventListener('click', () => {
            const random = Utilities.getRandom();
            Core.Router.navigate(`/utility/${random.id}`);
        });

        // Mobile menu toggle
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const menuToggle = document.getElementById('menu-toggle');
            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !menuToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    },

    registerRoutes() {
        Core.Router.register('/', () => this.showHome());
        Core.Router.register('/favorites', () => this.showFavorites());
        Core.Router.register('/recent', () => this.showRecent());
        Core.Router.register('/about', () => this.showAbout());
        Core.Router.register('/settings', () => this.showSettings());
        Core.Router.register('/data', () => this.showData());
        Core.Router.register('/system', () => this.showSystemCheck());
        Core.Router.register('/utility', (utilityId) => this.showUtility(utilityId));
    },

    showHome(searchQuery = '', category = '') {
        const content = document.getElementById('content');

        let utilities = Utilities.registry;
        if (searchQuery) {
            utilities = Utilities.search(searchQuery);
        } else if (category) {
            utilities = Utilities.getByCategory(category);
        }

        const grid = Core.UI.createElement('div', 'utility-grid');

        utilities.forEach(utility => {
            const card = Core.UI.createCard(
                utility.name,
                utility.description,
                utility.badges.map(b => ({ text: b, class: b }))
            );

            // Add icon to card
            const iconContainer = Core.UI.createElement('div', 'card-icon');
            iconContainer.style.cssText = 'position: absolute; top: 1rem; left: 1rem; width: 40px; height: 40px; opacity: 0.7;';
            iconContainer.innerHTML = window.UtilityIcons[utility.id] || window.UtilityIcons['default'];
            card.insertBefore(iconContainer, card.firstChild);

            card.onclick = () => {
                Core.Router.navigate(`/utility/${utility.id}`);
            };

            // Add favorite button
            const favBtn = Core.UI.createElement('button', 'fav-btn');
            favBtn.innerHTML = Core.State.global.favorites.includes(utility.id) ? '⭐' : '☆';
            favBtn.style.position = 'absolute';
            favBtn.style.top = '1rem';
            favBtn.style.right = '1rem';
            favBtn.style.background = 'transparent';
            favBtn.style.border = 'none';
            favBtn.style.fontSize = '1.5rem';
            favBtn.style.cursor = 'pointer';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                this.toggleFavorite(utility.id);
                favBtn.innerHTML = Core.State.global.favorites.includes(utility.id) ? '⭐' : '☆';
            };
            card.appendChild(favBtn);

            const categoryTag = Core.UI.createElement('div', 'utility-category', utility.category);
            card.appendChild(categoryTag);

            grid.appendChild(card);
        });

        if (utilities.length === 0) {
            content.appendChild(Core.UI.createEmptyState(
                '🔍',
                'No utilities found',
                'Try adjusting your search or filters'
            ));
        } else {
            content.innerHTML = '';
            const header = Core.UI.createElement('h2');
            header.textContent = searchQuery ? `Search results for "${searchQuery}"` :
                              category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tools` :
                              'All Tools';
            header.style.marginBottom = '2rem';
            content.appendChild(header);
            content.appendChild(grid);
        }
    },

    handleSearch(query) {
        if (window.location.hash === '#/' || window.location.hash === '') {
            this.showHome(query);
        }
    },

    handleCategoryFilter(category) {
        if (window.location.hash === '#/' || window.location.hash === '') {
            this.showHome('', category);
        }
    },

    showFavorites() {
        const content = document.getElementById('content');
        const favorites = Utilities.getFavorites();

        if (favorites.length === 0) {
            content.innerHTML = '';
            content.appendChild(Core.UI.createEmptyState(
                '⭐',
                'No favorites yet',
                'Star your favorite utilities to see them here'
            ));
        } else {
            const grid = Core.UI.createElement('div', 'utility-grid');
            favorites.forEach(utility => {
                const card = Core.UI.createCard(
                    utility.name,
                    utility.description,
                    utility.badges.map(b => ({ text: b, class: b }))
                );

                // Add icon to card
                const iconContainer = Core.UI.createElement('div', 'card-icon');
                iconContainer.style.cssText = 'position: absolute; top: 1rem; left: 1rem; width: 40px; height: 40px; opacity: 0.7;';
                iconContainer.innerHTML = window.UtilityIcons[utility.id] || window.UtilityIcons['default'];
                card.insertBefore(iconContainer, card.firstChild);

                card.onclick = () => Core.Router.navigate(`/utility/${utility.id}`);
                grid.appendChild(card);
            });

            content.innerHTML = '';
            const header = Core.UI.createElement('h2', '', 'Your Favorites');
            header.style.marginBottom = '2rem';
            content.appendChild(header);
            content.appendChild(grid);
        }
    },

    showRecent() {
        const content = document.getElementById('content');
        const recent = Utilities.getRecent();

        if (recent.length === 0) {
            content.innerHTML = '';
            content.appendChild(Core.UI.createEmptyState(
                '🕐',
                'No recent utilities',
                'Your recently used utilities will appear here'
            ));
        } else {
            const grid = Core.UI.createElement('div', 'utility-grid');
            recent.forEach(utility => {
                const card = Core.UI.createCard(
                    utility.name,
                    utility.description,
                    utility.badges.map(b => ({ text: b, class: b }))
                );

                // Add icon to card
                const iconContainer = Core.UI.createElement('div', 'card-icon');
                iconContainer.style.cssText = 'position: absolute; top: 1rem; left: 1rem; width: 40px; height: 40px; opacity: 0.7;';
                iconContainer.innerHTML = window.UtilityIcons[utility.id] || window.UtilityIcons['default'];
                card.insertBefore(iconContainer, card.firstChild);

                card.onclick = () => Core.Router.navigate(`/utility/${utility.id}`);
                grid.appendChild(card);
            });

            content.innerHTML = '';
            const header = Core.UI.createElement('h2', '', 'Recently Used');
            header.style.marginBottom = '2rem';
            content.appendChild(header);
            content.appendChild(grid);
        }
    },

    showUtility(utilityId) {
        const utility = Utilities.getById(utilityId);
        if (!utility) {
            Core.Router.navigate('/');
            return;
        }

        Core.State.addRecent(utilityId);

        const content = document.getElementById('content');
        content.innerHTML = '';

        const page = Core.UI.createElement('div', 'utility-page');

        // Header
        const header = Core.UI.createElement('div', 'utility-page-header');
        const title = Core.UI.createElement('h1', 'utility-page-title', utility.name);
        const tagline = Core.UI.createElement('p', 'utility-page-tagline', utility.description);

        header.appendChild(title);
        header.appendChild(tagline);
        page.appendChild(header);

        // Workspace
        const workspace = Core.UI.createElement('div', 'utility-workspace');
        workspace.id = 'utility-workspace';
        page.appendChild(workspace);

        // Privacy notice
        const privacy = Core.UI.createElement('div', 'privacy-notice');
        const icon = Core.UI.createElement('div', 'privacy-notice-icon', '🔒');
        const text = Core.UI.createElement('p', '', 'Your data stays on this device');
        privacy.appendChild(icon);
        privacy.appendChild(text);
        page.appendChild(privacy);

        content.appendChild(page);

        // Initialize the specific utility
        if (utility.init) {
            utility.init();
        } else {
            workspace.innerHTML = '<p>This utility is coming soon!</p>';
        }
    },

    showAbout() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
                <h1 style="margin-bottom: 2rem;">About 101 Tools</h1>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h2>Our Philosophy</h2>
                    <p style="line-height: 1.8; color: var(--text-muted);">
                        101 Tools is a collection of delightful utilities designed to solve the micro-frictions of daily life.
                        Each tool targets those tiny pain points you didn't know you had until you found the solution.
                    </p>
                </div>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h2>Complete Privacy</h2>
                    <p style="line-height: 1.8; color: var(--text-muted);">
                        Everything runs 100% in your browser. No servers. No tracking. No external connections.
                        Your data never leaves your device unless you explicitly export it.
                    </p>
                </div>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h2>Works Offline</h2>
                    <p style="line-height: 1.8; color: var(--text-muted);">
                        Once loaded, all utilities work completely offline. Perfect for airplane mode,
                        remote locations, or when you simply want to disconnect.
                    </p>
                </div>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg);">
                    <h2>Accessibility First</h2>
                    <p style="line-height: 1.8; color: var(--text-muted);">
                        Every utility is built with keyboard navigation, screen reader support,
                        and respect for reduced motion preferences. Tools for everyone.
                    </p>
                </div>
            </div>
        `;
    },

    showSettings() {
        const content = document.getElementById('content');
        const state = Core.State.global.settings;

        content.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
                <h1 style="margin-bottom: 2rem;">Settings</h1>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg);">
                    <div style="margin-bottom: 2rem;">
                        <label style="display: flex; align-items: center; gap: 1rem; cursor: pointer;">
                            <input type="checkbox" id="reduced-motion" ${state.reducedMotion ? 'checked' : ''}
                                style="width: 20px; height: 20px;">
                            <div>
                                <div style="font-weight: bold;">Reduce Motion</div>
                                <div style="color: var(--text-muted); font-size: 0.9rem;">
                                    Minimize animations and transitions
                                </div>
                            </div>
                        </label>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <label style="display: flex; align-items: center; gap: 1rem; cursor: pointer;">
                            <input type="checkbox" id="high-contrast" ${state.highContrast ? 'checked' : ''}
                                style="width: 20px; height: 20px;">
                            <div>
                                <div style="font-weight: bold;">High Contrast</div>
                                <div style="color: var(--text-muted); font-size: 0.9rem;">
                                    Increase color contrast for better visibility
                                </div>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label style="font-weight: bold; display: block; margin-bottom: 1rem;">
                            Text Size
                        </label>
                        <select id="font-size" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border);
                            border-radius: var(--radius); background: var(--bg); color: var(--text);">
                            <option value="small" ${state.fontSize === 'small' ? 'selected' : ''}>Small</option>
                            <option value="medium" ${state.fontSize === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="large" ${state.fontSize === 'large' ? 'selected' : ''}>Large</option>
                        </select>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('reduced-motion').addEventListener('change', (e) => {
            Core.State.global.settings.reducedMotion = e.target.checked;
            Core.State.applySettings();
            Core.State.save();
        });

        document.getElementById('high-contrast').addEventListener('change', (e) => {
            Core.State.global.settings.highContrast = e.target.checked;
            Core.State.applySettings();
            Core.State.save();
        });

        document.getElementById('font-size').addEventListener('change', (e) => {
            Core.State.global.settings.fontSize = e.target.value;
            Core.State.applySettings();
            Core.State.save();
        });
    },

    showData() {
        const content = document.getElementById('content');
        const storageSize = Core.Storage.getSize();

        content.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
                <h1 style="margin-bottom: 2rem;">Your Data</h1>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h2 style="margin-bottom: 1rem;">Storage Usage</h2>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">
                        Currently using ${(storageSize / 1024).toFixed(2)} KB of local storage
                    </p>
                    <div style="width: 100%; height: 20px; background: var(--bg); border-radius: 10px; overflow: hidden;">
                        <div style="width: ${Math.min((storageSize / 5242880) * 100, 100)}%; height: 100%;
                            background: linear-gradient(90deg, var(--secondary), var(--secondary-light));"></div>
                    </div>
                </div>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h2 style="margin-bottom: 1rem;">Export Data</h2>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">
                        Download all your data as a JSON file
                    </p>
                    <button id="export-data" class="btn btn-primary">Export All Data</button>
                </div>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h2 style="margin-bottom: 1rem;">Import Data</h2>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">
                        Restore data from a previous export
                    </p>
                    <input type="file" id="import-file" accept=".json" style="margin-bottom: 1rem;">
                    <button id="import-data" class="btn btn-secondary">Import Data</button>
                </div>

                <div style="background: #fee; padding: 2rem; border-radius: var(--radius-lg); border: 2px solid #fcc;">
                    <h2 style="margin-bottom: 1rem; color: var(--danger);">Danger Zone</h2>
                    <p style="color: #c00; margin-bottom: 1rem;">
                        This action cannot be undone. All data will be permanently deleted.
                    </p>
                    <button id="clear-data" class="btn btn-danger">Erase All Data</button>
                </div>
            </div>
        `;

        // Export data
        document.getElementById('export-data').addEventListener('click', () => {
            const data = Core.Storage.exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `101tools-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            Core.Toast.show('Data exported successfully', 'success');
        });

        // Import data
        document.getElementById('import-data').addEventListener('click', () => {
            const fileInput = document.getElementById('import-file');
            const file = fileInput.files[0];

            if (!file) {
                Core.Toast.show('Please select a file', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    Core.Storage.importData(data);
                    Core.State.init();
                    Core.Toast.show('Data imported successfully', 'success');
                    setTimeout(() => location.reload(), 1000);
                } catch (err) {
                    Core.Toast.show('Invalid file format', 'error');
                }
            };
            reader.readAsText(file);
        });

        // Clear data
        document.getElementById('clear-data').addEventListener('click', () => {
            Core.Modal.show(
                'Confirm Data Deletion',
                'Are you absolutely sure you want to erase all data? This cannot be undone.',
                [
                    {
                        text: 'Cancel',
                        class: 'btn-secondary',
                        onClick: () => Core.Modal.close()
                    },
                    {
                        text: 'Yes, Erase Everything',
                        class: 'btn-danger',
                        onClick: () => {
                            Core.Storage.clear();
                            Core.Toast.show('All data erased', 'success');
                            setTimeout(() => location.reload(), 1000);
                        }
                    }
                ]
            );
        });
    },

    showSystemCheck() {
        const content = document.getElementById('content');
        const caps = Core.Capabilities.features;

        const checkMark = '✅';
        const crossMark = '❌';

        content.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
                <h1 style="margin-bottom: 2rem;">System Check</h1>

                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-lg);">
                    <h2 style="margin-bottom: 1.5rem;">Browser Capabilities</h2>

                    <div style="display: grid; gap: 1rem;">
                        ${Object.entries(caps).map(([feature, supported]) => `
                            <div style="display: flex; justify-content: space-between; padding: 1rem;
                                background: var(--bg); border-radius: var(--radius);">
                                <span style="font-weight: 500;">${feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span>${supported ? checkMark : crossMark}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div style="margin-top: 2rem; padding: 1rem; background: var(--bg); border-radius: var(--radius);">
                        <h3>Browser Information</h3>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">
                            User Agent: ${navigator.userAgent}
                        </p>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">
                            Screen: ${screen.width}x${screen.height}
                        </p>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">
                            Color Depth: ${screen.colorDepth}-bit
                        </p>
                        <p style="color: var(--text-muted); margin-top: 0.5rem;">
                            Online: ${navigator.onLine ? 'Yes' : 'No (Offline Mode)'}
                        </p>
                    </div>
                </div>
            </div>
        `;
    },

    toggleFavorite(utilityId) {
        if (Core.State.global.favorites.includes(utilityId)) {
            Core.State.removeFavorite(utilityId);
            Core.Toast.show('Removed from favorites', 'info');
        } else {
            Core.State.addFavorite(utilityId);
            Core.Toast.show('Added to favorites', 'success');
        }
    },

    loadUtilityImplementations() {
        // This would normally load the actual implementations
        // For brevity, I'll include a few sample implementations
    }
};

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + H for home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        Core.Router.navigate('/');
    }
    // Alt + S for search focus
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('search').focus();
    }
    // Alt + F for favorites
    if (e.altKey && e.key === 'f') {
        e.preventDefault();
        Core.Router.navigate('/favorites');
    }
    // Alt + R for recent
    if (e.altKey && e.key === 'r') {
        e.preventDefault();
        Core.Router.navigate('/recent');
    }
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        Core.State.toggleTheme();
        const icon = Core.State.global.theme === 'dark' ? '☀️' : '🌙';
        document.getElementById('theme-toggle').textContent = icon;
    }
    // Escape to close modals
    if (e.key === 'Escape') {
        Core.Modal.close();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();

        // Initialize floating action button
        const fabButton = document.querySelector('.fab-main');
        const fabContainer = document.querySelector('.floating-creator-button');

        if (fabButton) {
            fabButton.addEventListener('click', (e) => {
                e.stopPropagation();
                fabContainer.classList.toggle('active');
            });

            // Close FAB menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!fabContainer.contains(e.target)) {
                    fabContainer.classList.remove('active');
                }
            });
        }
    });
} else {
    App.init();

    // Initialize floating action button
    const fabButton = document.querySelector('.fab-main');
    const fabContainer = document.querySelector('.floating-creator-button');

    if (fabButton) {
        fabButton.addEventListener('click', (e) => {
            e.stopPropagation();
            fabContainer.classList.toggle('active');
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabContainer.contains(e.target)) {
                fabContainer.classList.remove('active');
            }
        });
    }
}