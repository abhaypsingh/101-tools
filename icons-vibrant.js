// Vibrant, more visible SVG Icons for all 101 utilities
window.UtilityIcons = {
    // Wellness & Mindfulness Icons - More colorful and bold
    'breathing-pacer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="breathGrad">
                <stop offset="0%" style="stop-color:#4FC3F7;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#29B6F6;stop-opacity:0.3" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#breathGrad)" opacity="0.3">
            <animate attributeName="r" values="35;40;35" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="50" r="25" fill="none" stroke="#29B6F6" stroke-width="3">
            <animate attributeName="r" values="25;30;25" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="50" r="15" fill="#4FC3F7" opacity="0.8">
            <animate attributeName="r" values="15;20;15" dur="4s" repeatCount="indefinite"/>
        </circle>
    </svg>`,

    'micro-decision-dice': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#C44569;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect x="20" y="20" width="60" height="60" rx="12" fill="url(#diceGrad)"/>
        <circle cx="35" cy="35" r="5" fill="white"/>
        <circle cx="65" cy="35" r="5" fill="white"/>
        <circle cx="35" cy="65" r="5" fill="white"/>
        <circle cx="65" cy="65" r="5" fill="white"/>
        <circle cx="50" cy="50" r="5" fill="white"/>
        <rect x="22" y="22" width="56" height="56" rx="10" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
    </svg>`,

    'pomodoro-garden': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="tomatoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E74C3C;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="40" r="22" fill="url(#tomatoGrad)"/>
        <path d="M50 18 Q45 12 50 8 Q55 12 50 18" fill="#4CAF50" stroke="#388E3C" stroke-width="1"/>
        <rect x="30" y="65" width="8" height="20" fill="#8D6E63"/>
        <rect x="46" y="65" width="8" height="20" fill="#8D6E63"/>
        <rect x="62" y="65" width="8" height="20" fill="#8D6E63"/>
        <path d="M28 65 Q50 55 72 65" fill="#66BB6A"/>
    </svg>`,

    'thought-untangler': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="tangleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#9C27B0;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#673AB7;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3F51B5;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M25 50 Q35 25 50 50 T75 50" stroke="url(#tangleGrad)" stroke-width="4" fill="none"/>
        <path d="M20 60 Q35 35 50 60 T80 60" stroke="#E91E63" stroke-width="3" fill="none" opacity="0.7"/>
        <path d="M30 70 Q45 45 60 70 T75 70" stroke="#FF9800" stroke-width="2" fill="none" opacity="0.5"/>
        <circle cx="25" cy="50" r="5" fill="#9C27B0"/>
        <circle cx="50" cy="50" r="5" fill="#673AB7"/>
        <circle cx="75" cy="50" r="5" fill="#3F51B5"/>
    </svg>`,

    'time-capsule-messenger': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="capsuleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#00BCD4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0097A7;stop-opacity:1" />
            </linearGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="22" ry="38" fill="url(#capsuleGrad)"/>
        <ellipse cx="50" cy="28" rx="22" ry="6" fill="#00ACC1"/>
        <ellipse cx="50" cy="72" rx="22" ry="6" fill="#00838F"/>
        <path d="M38 45 L50 57 L62 45" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="3" fill="white"/>
        <text x="50" y="85" text-anchor="middle" fill="#006064" font-size="8" font-weight="bold">FUTURE</text>
    </svg>`,

    'personal-value-sorter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="25" height="18" fill="#4CAF50" rx="3"/>
        <rect x="15" y="41" width="35" height="18" fill="#2196F3" rx="3"/>
        <rect x="15" y="62" width="45" height="18" fill="#FF9800" rx="3"/>
        <text x="75" y="32" fill="#4CAF50" font-size="10" font-weight="bold">1st</text>
        <text x="75" y="53" fill="#2196F3" font-size="10" font-weight="bold">2nd</text>
        <text x="75" y="74" fill="#FF9800" font-size="10" font-weight="bold">3rd</text>
    </svg>`,

    'silent-auction-timer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FFC107;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF9800;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="32" fill="url(#clockGrad)"/>
        <circle cx="50" cy="50" r="28" fill="white"/>
        <path d="M50 50 L50 22" stroke="#FF5722" stroke-width="4" stroke-linecap="round"/>
        <path d="M50 50 L68 40" stroke="#FF5722" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="5" fill="#FF5722"/>
        <path d="M35 12 L45 22 M65 12 L55 22" stroke="#FF5722" stroke-width="3"/>
    </svg>`,

    'color-emotion-mapper': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="40" r="18" fill="#E91E63" opacity="0.7"/>
        <circle cx="50" cy="35" r="18" fill="#3F51B5" opacity="0.7"/>
        <circle cx="65" cy="40" r="18" fill="#FFEB3B" opacity="0.7"/>
        <circle cx="42" cy="55" r="18" fill="#4CAF50" opacity="0.7"/>
        <circle cx="58" cy="55" r="18" fill="#FF9800" opacity="0.7"/>
        <circle cx="50" cy="70" r="10" fill="white" stroke="#9C27B0" stroke-width="3"/>
    </svg>`,

    'habit-stacker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="68" width="60" height="12" fill="#4CAF50" rx="2"/>
        <rect x="25" y="54" width="50" height="12" fill="#66BB6A" rx="2"/>
        <rect x="30" y="40" width="40" height="12" fill="#81C784" rx="2"/>
        <rect x="35" y="26" width="30" height="12" fill="#A5D6A7" rx="2"/>
        <path d="M15 85 L85 85" stroke="#2E7D32" stroke-width="3"/>
        <text x="50" y="10" text-anchor="middle" fill="#2E7D32" font-size="10" font-weight="bold">STACK</text>
    </svg>`,

    'memory-palace-builder': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="palaceGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style="stop-color:#795548;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#D7CCC8;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M20 80 L20 38 L50 15 L80 38 L80 80 Z" fill="url(#palaceGrad)"/>
        <rect x="35" y="55" width="15" height="25" fill="#5D4037" stroke="#3E2723" stroke-width="2"/>
        <rect x="55" y="55" width="15" height="15" fill="#FFD54F" stroke="#F57C00" stroke-width="2"/>
        <circle cx="50" cy="40" r="5" fill="#FFD54F" stroke="#F57C00" stroke-width="2"/>
        <path d="M15 80 L85 80" stroke="#3E2723" stroke-width="3"/>
    </svg>`,

    'focus-soundscape': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00BCD4;stop-opacity:0.3" />
                <stop offset="50%" style="stop-color:#00ACC1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#00BCD4;stop-opacity:0.3" />
            </linearGradient>
        </defs>
        <rect x="20" y="35" width="4" height="30" fill="#00BCD4" rx="2">
            <animate attributeName="height" values="30;45;30" dur="1s" repeatCount="indefinite"/>
        </rect>
        <rect x="30" y="30" width="4" height="40" fill="#00ACC1" rx="2">
            <animate attributeName="height" values="40;50;40" dur="1.2s" repeatCount="indefinite"/>
        </rect>
        <rect x="40" y="25" width="4" height="50" fill="#0097A7" rx="2">
            <animate attributeName="height" values="50;60;50" dur="1.4s" repeatCount="indefinite"/>
        </rect>
        <rect x="50" y="20" width="4" height="60" fill="#00838F" rx="2">
            <animate attributeName="height" values="60;65;60" dur="1.6s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="25" width="4" height="50" fill="#0097A7" rx="2">
            <animate attributeName="height" values="50;60;50" dur="1.4s" repeatCount="indefinite"/>
        </rect>
        <rect x="70" y="30" width="4" height="40" fill="#00ACC1" rx="2">
            <animate attributeName="height" values="40;50;40" dur="1.2s" repeatCount="indefinite"/>
        </rect>
        <rect x="80" y="35" width="4" height="30" fill="#00BCD4" rx="2">
            <animate attributeName="height" values="30;45;30" dur="1s" repeatCount="indefinite"/>
        </rect>
    </svg>`,

    'micro-journal': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="journalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#8BC34A;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#689F38;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect x="22" y="12" width="56" height="76" rx="4" fill="url(#journalGrad)"/>
        <rect x="27" y="17" width="46" height="66" rx="2" fill="white"/>
        <line x1="35" y1="30" x2="65" y2="30" stroke="#4CAF50" stroke-width="2"/>
        <line x1="35" y1="40" x2="55" y2="40" stroke="#66BB6A" stroke-width="2"/>
        <line x1="35" y1="50" x2="60" y2="50" stroke="#81C784" stroke-width="2"/>
        <line x1="35" y1="60" x2="50" y2="60" stroke="#A5D6A7" stroke-width="2"/>
        <circle cx="35" cy="70" r="3" fill="#4CAF50"/>
        <rect x="18" y="45" width="4" height="10" fill="#558B2F"/>
    </svg>`,

    'decision-matrix': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" fill="#E3F2FD" stroke="#1976D2" stroke-width="3"/>
        <line x1="20" y1="50" x2="80" y2="50" stroke="#1976D2" stroke-width="2"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="#1976D2" stroke-width="2"/>
        <circle cx="35" cy="35" r="5" fill="#4CAF50"/>
        <circle cx="65" cy="35" r="5" fill="#FFC107"/>
        <circle cx="35" cy="65" r="5" fill="#FF9800"/>
        <circle cx="65" cy="65" r="5" fill="#F44336"/>
        <text x="50" y="10" text-anchor="middle" fill="#1976D2" font-size="10" font-weight="bold">DECIDE</text>
    </svg>`,

    'gratitude-jar': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="jarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#FFB300;stop-opacity:0.5" />
            </linearGradient>
        </defs>
        <path d="M30 35 Q30 30 35 30 L65 30 Q70 30 70 35 L70 75 Q70 82 63 82 L37 82 Q30 82 30 75 Z"
              fill="url(#jarGrad)" stroke="#FF6F00" stroke-width="3"/>
        <ellipse cx="50" cy="30" rx="20" ry="4" fill="#FF6F00"/>
        <rect x="40" y="24" width="20" height="8" fill="#FFB300" rx="2"/>
        <circle cx="40" cy="50" r="3" fill="#FFD54F"/>
        <circle cx="50" cy="45" r="3" fill="#FFECB3"/>
        <circle cx="60" cy="52" r="3" fill="#FFE082"/>
        <circle cx="45" cy="60" r="3" fill="#FFD54F"/>
        <circle cx="55" cy="58" r="3" fill="#FFECB3"/>
        <text x="50" y="95" text-anchor="middle" fill="#FF6F00" font-size="8" font-weight="bold">GRATEFUL</text>
    </svg>`,

    'social-battery-meter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="28" width="44" height="54" rx="6" fill="#37474F" stroke="#263238" stroke-width="3"/>
        <rect x="37" y="22" width="20" height="6" fill="#263238" rx="2"/>
        <rect x="30" y="60" width="34" height="17" fill="#F44336" rx="2"/>
        <rect x="30" y="43" width="34" height="15" fill="#FFC107" rx="2"/>
        <rect x="30" y="33" width="34" height="8" fill="#4CAF50" rx="2">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
        </rect>
        <text x="47" y="92" text-anchor="middle" fill="#263238" font-size="8" font-weight="bold">SOCIAL</text>
    </svg>`,

    'energy-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FFEB3B;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFC107;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M35 15 L25 50 L45 50 L35 85 L65 35 L45 35 L60 15 Z"
              fill="url(#boltGrad)" stroke="#F57C00" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="75" cy="25" r="4" fill="#FFEB3B" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="50" r="4" fill="#FFC107" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="75" r="4" fill="#FF9800" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`,

    'worry-window': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="23" width="64" height="54" fill="#E1F5FE" stroke="#0288D1" stroke-width="3" rx="2"/>
        <line x1="50" y1="23" x2="50" y2="77" stroke="#0288D1" stroke-width="2"/>
        <line x1="18" y1="50" x2="82" y2="50" stroke="#0288D1" stroke-width="2"/>
        <path d="M28 62 Q35 55 42 62" stroke="#FF5722" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M58 38 Q65 31 72 38" stroke="#9C27B0" stroke-width="2" fill="none" opacity="0.7"/>
        <rect x="14" y="19" width="72" height="4" fill="#01579B"/>
        <rect x="14" y="77" width="72" height="4" fill="#01579B"/>
    </svg>`,

    'mindful-eating-timer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="28" fill="#FFF3E0" stroke="#FF6F00" stroke-width="3"/>
        <path d="M35 48 Q50 38 65 48" fill="#8BC34A" stroke="#558B2F" stroke-width="2"/>
        <circle cx="40" cy="43" r="4" fill="#F44336"/>
        <circle cx="50" cy="40" r="4" fill="#FF9800"/>
        <circle cx="60" cy="43" r="4" fill="#4CAF50"/>
        <path d="M22 75 L28 52 M78 75 L72 52" stroke="#795548" stroke-width="3"/>
        <path d="M40 60 Q50 65 60 60" stroke="#FF6F00" stroke-width="2" fill="none"/>
    </svg>`,

    'task-friction-analyzer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 50 L35 50" stroke="#4CAF50" stroke-width="5" stroke-linecap="round"/>
        <rect x="35" y="38" width="24" height="24" fill="#F44336" rx="3"/>
        <path d="M59 44 Q66 38 66 50 Q66 62 59 56" stroke="#FF9800" stroke-width="3" fill="none"/>
        <path d="M66 50 L85 50" stroke="#4CAF50" stroke-width="5" stroke-linecap="round" stroke-dasharray="6,4"/>
        <circle cx="90" cy="50" r="5" fill="#4CAF50"/>
        <text x="47" y="54" text-anchor="middle" fill="white" font-size="12" font-weight="bold">!</text>
    </svg>`,

    'meeting-cost-calculator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="dollarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="45" r="25" fill="url(#dollarGrad)"/>
        <text x="50" y="52" text-anchor="middle" font-size="22" fill="white" font-weight="bold">$</text>
        <rect x="30" y="72" width="10" height="15" fill="#FFC107"/>
        <rect x="45" y="68" width="10" height="19" fill="#FF9800"/>
        <rect x="60" y="74" width="10" height="13" fill="#FF5722"/>
    </svg>`,

    // Default vibrant icon
    'default': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="defaultGrad">
                <stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1976D2;stop-opacity:1" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#defaultGrad)"/>
        <circle cx="50" cy="50" r="30" fill="white" opacity="0.3"/>
        <circle cx="50" cy="50" r="5" fill="white"/>
        <path d="M50 30 L50 70 M30 50 L70 50" stroke="white" stroke-width="3" stroke-linecap="round"/>
    </svg>`
};

// Continue with more vibrant icons...
Object.assign(window.UtilityIcons, {
    'life-pie-chart': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#E8EAF6" stroke="#3F51B5" stroke-width="3"/>
        <path d="M50 50 L50 15 A35 35 0 0 1 78 32 Z" fill="#4CAF50"/>
        <path d="M50 50 L78 32 A35 35 0 0 1 78 68 Z" fill="#2196F3"/>
        <path d="M50 50 L78 68 A35 35 0 0 1 50 85 Z" fill="#FF9800"/>
        <path d="M50 50 L50 85 A35 35 0 0 1 22 68 Z" fill="#F44336"/>
        <path d="M50 50 L22 68 A35 35 0 0 1 22 32 Z" fill="#9C27B0"/>
        <path d="M50 50 L22 32 A35 35 0 0 1 50 15 Z" fill="#00BCD4"/>
        <circle cx="50" cy="50" r="5" fill="white" stroke="#3F51B5" stroke-width="2"/>
    </svg>`,

    'random-acts-generator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFB300;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M50 20 L57 40 L78 40 L61 52 L68 72 L50 60 L32 72 L39 52 L22 40 L43 40 Z"
              fill="url(#starGrad)" stroke="#FF6F00" stroke-width="2"/>
        <circle cx="20" cy="20" r="4" fill="#E91E63">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="20" r="4" fill="#9C27B0">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="20" cy="80" r="4" fill="#3F51B5">
            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="80" r="4" fill="#00BCD4">
            <animate attributeName="opacity" values="1;0.3;1" dur="3.5s" repeatCount="indefinite"/>
        </circle>
    </svg>`

    // Productivity Tools - Bold and Professional
    'focus-flow-timer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#673AB7;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#512DA8;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#flowGrad)" stroke-width="4"/>
        <path d="M50 20 L50 50 L65 65" stroke="#7E57C2" stroke-width="3" stroke-linecap="round" fill="none"/>
        <circle cx="50" cy="50" r="4" fill="#9575CD"/>
        <path d="M50 15 L50 10 M50 85 L50 90 M15 50 L10 50 M85 50 L90 50" stroke="#B39DDB" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    'task-roulette': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="rouletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF5722;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#DD2C00;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#rouletteGrad)" opacity="0.9"/>
        <path d="M50 15 A35 35 0 0 1 85 50" fill="#FFC107" opacity="0.8"/>
        <path d="M50 15 A35 35 0 0 1 50 85" fill="#4CAF50" opacity="0.8" transform="rotate(120 50 50)"/>
        <path d="M50 15 A35 35 0 0 1 50 85" fill="#2196F3" opacity="0.8" transform="rotate(240 50 50)"/>
        <circle cx="50" cy="50" r="8" fill="white"/>
        <polygon points="50,10 45,20 55,20" fill="#D32F2F">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite"/>
        </polygon>
    </svg>`,

    'habit-streak-garden': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="70" width="80" height="20" fill="#8D6E63" opacity="0.7"/>
        <circle cx="25" cy="55" r="8" fill="#4CAF50"/>
        <circle cx="50" cy="45" r="10" fill="#66BB6A"/>
        <circle cx="75" cy="50" r="9" fill="#81C784"/>
        <path d="M25 55 Q25 40 20 35 Q25 38 30 35" fill="#388E3C"/>
        <path d="M50 45 Q50 25 45 20 Q50 23 55 20" fill="#43A047"/>
        <path d="M75 50 Q75 35 70 30 Q75 33 80 30" fill="#4CAF50"/>
        <circle cx="30" cy="75" r="3" fill="#FFC107">
            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="78" r="2" fill="#FF9800">
            <animate attributeName="r" values="2;3;2" dur="2.5s" repeatCount="indefinite"/>
        </circle>
    </svg>`,

    'energy-level-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="energyGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style="stop-color:#FF9800;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFC107;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFEB3B;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M40 20 L35 50 L50 50 L45 80 L65 40 L50 40 L60 20 Z" fill="url(#energyGrad)" stroke="#F57C00" stroke-width="2"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#FFB300" stroke-width="3" opacity="0.5"/>
    </svg>`,

    'mood-mandala': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="mandalaGrad">
                <stop offset="0%" style="stop-color:#E91E63;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#9C27B0;stop-opacity:0.7" />
                <stop offset="100%" style="stop-color:#673AB7;stop-opacity:0.4" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#mandalaGrad)" opacity="0.3"/>
        <g transform="translate(50,50)">
            <path d="M0,-30 Q-10,-20 0,-10 Q10,-20 0,-30" fill="#E91E63" opacity="0.8" transform="rotate(0)"/>
            <path d="M0,-30 Q-10,-20 0,-10 Q10,-20 0,-30" fill="#9C27B0" opacity="0.8" transform="rotate(60)"/>
            <path d="M0,-30 Q-10,-20 0,-10 Q10,-20 0,-30" fill="#673AB7" opacity="0.8" transform="rotate(120)"/>
            <path d="M0,-30 Q-10,-20 0,-10 Q10,-20 0,-30" fill="#3F51B5" opacity="0.8" transform="rotate(180)"/>
            <path d="M0,-30 Q-10,-20 0,-10 Q10,-20 0,-30" fill="#2196F3" opacity="0.8" transform="rotate(240)"/>
            <path d="M0,-30 Q-10,-20 0,-10 Q10,-20 0,-30" fill="#00BCD4" opacity="0.8" transform="rotate(300)"/>
        </g>
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.9"/>
    </svg>`,

    // Creativity Tools
    'creativity-cards': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="25" width="40" height="55" rx="5" fill="#FF6B6B" transform="rotate(-10 35 52.5)"/>
        <rect x="30" y="20" width="40" height="55" rx="5" fill="#4ECDC4" transform="rotate(5 50 47.5)"/>
        <rect x="45" y="25" width="40" height="55" rx="5" fill="#45B7D1" transform="rotate(15 65 52.5)"/>
        <text x="50" y="50" text-anchor="middle" font-size="24" fill="white" font-weight="bold">?</text>
    </svg>`,

    'color-palette-explorer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#F5F5F5" stroke="#9E9E9E" stroke-width="2"/>
        <path d="M50 15 A35 35 0 0 1 85 50 L50 50 Z" fill="#FF5252"/>
        <path d="M85 50 A35 35 0 0 1 67.5 77.5 L50 50 Z" fill="#FF9800"/>
        <path d="M67.5 77.5 A35 35 0 0 1 32.5 77.5 L50 50 Z" fill="#FFEB3B"/>
        <path d="M32.5 77.5 A35 35 0 0 1 15 50 L50 50 Z" fill="#4CAF50"/>
        <path d="M15 50 A35 35 0 0 1 32.5 22.5 L50 50 Z" fill="#2196F3"/>
        <path d="M32.5 22.5 A35 35 0 0 1 50 15 L50 50 Z" fill="#9C27B0"/>
        <circle cx="35" cy="65" r="8" fill="#424242"/>
    </svg>`,

    'story-dice': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(25,35)">
            <rect x="0" y="0" width="30" height="30" rx="5" fill="#E91E63" stroke="#C2185B" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" font-size="20">🎭</text>
        </g>
        <g transform="translate(45,25)">
            <rect x="0" y="0" width="30" height="30" rx="5" fill="#3F51B5" stroke="#303F9F" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" font-size="20">🌟</text>
        </g>
        <g transform="translate(35,50)">
            <rect x="0" y="0" width="30" height="30" rx="5" fill="#4CAF50" stroke="#388E3C" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" font-size="20">🎨</text>
        </g>
    </svg>`,

    'music-mood-matcher': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#C44569;stop-opacity:1" />
            </linearGradient>
        </defs>
        <ellipse cx="50" cy="60" r="25" ry="15" fill="url(#musicGrad)" opacity="0.3"/>
        <rect x="48" y="25" width="4" height="35" fill="#C44569"/>
        <rect x="68" y="30" width="4" height="30" fill="#C44569"/>
        <ellipse cx="43" cy="60" rx="8" ry="6" fill="#FF6B9D"/>
        <ellipse cx="63" cy="60" rx="8" ry="6" fill="#FF6B9D"/>
        <path d="M52 25 Q60 20 68 30" fill="#C44569"/>
    </svg>`,

    'idea-lottery': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="bulbGrad">
                <stop offset="0%" style="stop-color:#FFEB3B;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFC107;stop-opacity:0.8" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="40" r="20" fill="url(#bulbGrad)"/>
        <rect x="40" y="55" width="20" height="10" fill="#9E9E9E"/>
        <path d="M42 65 L42 70 L58 70 L58 65" stroke="#757575" stroke-width="2" fill="none"/>
        <path d="M42 72 L58 72" stroke="#757575" stroke-width="2"/>
        <path d="M42 75 L58 75" stroke="#757575" stroke-width="2"/>
        <path d="M45 40 Q50 35 55 40" stroke="#FFF59D" stroke-width="3" fill="none" stroke-linecap="round">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
        </path>
    </svg>`,

    // Decision Making Tools
    'coin-flip-history': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFA000;stop-opacity:1" />
            </linearGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="30" ry="25" fill="url(#coinGrad)">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"/>
        </ellipse>
        <text x="50" y="58" text-anchor="middle" font-size="24" fill="#795548" font-weight="bold">$</text>
    </svg>`,

    'pro-con-scale': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="50" y2="60" stroke="#795548" stroke-width="3"/>
        <line x1="20" y1="50" x2="80" y2="40" stroke="#795548" stroke-width="3"/>
        <path d="M15 50 L25 50 L20 65 Z" fill="#4CAF50"/>
        <path d="M75 40 L85 40 L80 55 Z" fill="#F44336"/>
        <circle cx="50" cy="20" r="3" fill="#795548"/>
        <rect x="15" y="70" width="70" height="5" fill="#9E9E9E"/>
    </svg>`,

    'option-matrix': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="30" height="30" fill="#2196F3" opacity="0.8"/>
        <rect x="50" y="20" width="30" height="30" fill="#4CAF50" opacity="0.8"/>
        <rect x="20" y="50" width="30" height="30" fill="#FF9800" opacity="0.8"/>
        <rect x="50" y="50" width="30" height="30" fill="#F44336" opacity="0.8"/>
        <text x="35" y="40" text-anchor="middle" font-size="16" fill="white" font-weight="bold">A</text>
        <text x="65" y="40" text-anchor="middle" font-size="16" fill="white" font-weight="bold">B</text>
        <text x="35" y="70" text-anchor="middle" font-size="16" fill="white" font-weight="bold">C</text>
        <text x="65" y="70" text-anchor="middle" font-size="16" fill="white" font-weight="bold">D</text>
    </svg>`,

    'choice-compass': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#ECEFF1" stroke="#455A64" stroke-width="3"/>
        <polygon points="50,20 60,50 50,45 40,50" fill="#F44336"/>
        <polygon points="50,80 40,50 50,55 60,50" fill="#607D8B"/>
        <text x="50" y="18" text-anchor="middle" font-size="12" fill="#F44336" font-weight="bold">N</text>
        <text x="50" y="92" text-anchor="middle" font-size="12" fill="#607D8B" font-weight="bold">S</text>
        <text x="88" y="54" text-anchor="middle" font-size="12" fill="#455A64" font-weight="bold">E</text>
        <text x="12" y="54" text-anchor="middle" font-size="12" fill="#455A64" font-weight="bold">W</text>
    </svg>`,

    'priority-pyramid': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,20 20,80 80,80" fill="#FFC107" opacity="0.9"/>
        <line x1="30" y1="60" x2="70" y2="60" stroke="#FF6F00" stroke-width="2"/>
        <line x1="35" y1="50" x2="65" y2="50" stroke="#FF6F00" stroke-width="2"/>
        <line x1="40" y1="40" x2="60" y2="40" stroke="#FF6F00" stroke-width="2"/>
        <text x="50" y="75" text-anchor="middle" font-size="10" fill="#795548">LOW</text>
        <text x="50" y="55" text-anchor="middle" font-size="10" fill="#795548">MED</text>
        <text x="50" y="35" text-anchor="middle" font-size="10" fill="#795548">HIGH</text>
    </svg>`,

    // Organization Tools
    'digital-declutter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="60" height="40" rx="5" fill="#78909C" stroke="#455A64" stroke-width="2"/>
        <rect x="25" y="35" width="50" height="30" fill="#263238"/>
        <rect x="30" y="40" width="10" height="8" fill="#F44336" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
        </rect>
        <rect x="45" y="45" width="10" height="8" fill="#4CAF50" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="60" y="50" width="10" height="8" fill="#2196F3" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
        </rect>
        <path d="M35 75 L35 85 L65 85 L65 75" stroke="#455A64" stroke-width="3" fill="none"/>
    </svg>`,

    'life-categories': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="25" height="25" rx="5" fill="#E91E63"/>
        <rect x="55" y="20" width="25" height="25" rx="5" fill="#3F51B5"/>
        <rect x="20" y="55" width="25" height="25" rx="5" fill="#4CAF50"/>
        <rect x="55" y="55" width="25" height="25" rx="5" fill="#FF9800"/>
        <text x="32.5" y="37" text-anchor="middle" font-size="20">❤️</text>
        <text x="67.5" y="37" text-anchor="middle" font-size="20">💼</text>
        <text x="32.5" y="72" text-anchor="middle" font-size="20">🏠</text>
        <text x="67.5" y="72" text-anchor="middle" font-size="20">🎯</text>
    </svg>`,

    'minimalist-counter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="none" stroke="#424242" stroke-width="3"/>
        <text x="50" y="60" text-anchor="middle" font-size="32" fill="#424242" font-weight="300">42</text>
        <path d="M30 30 L30 25 L35 25" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"/>
        <path d="M70 30 L70 25 L65 25" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"/>
        <path d="M30 70 L30 75 L35 75" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"/>
        <path d="M70 70 L70 75 L65 75" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    'collection-sorter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="20" height="15" fill="#F44336"/>
        <rect x="20" y="40" width="30" height="15" fill="#2196F3"/>
        <rect x="20" y="60" width="40" height="15" fill="#4CAF50"/>
        <rect x="20" y="80" width="50" height="15" fill="#FF9800"/>
        <path d="M75 30 L75 85 M70 80 L75 85 L80 80" stroke="#424242" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,

    'bookmark-curator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 20 L25 80 L40 65 L55 80 L55 20 Z" fill="#FF5252" stroke="#D32F2F" stroke-width="2"/>
        <path d="M45 25 L45 75 L50 70 L60 80 L70 70 L75 75 L75 25 Z" fill="#448AFF" stroke="#1976D2" stroke-width="2" opacity="0.7"/>
        <circle cx="35" cy="35" r="3" fill="white"/>
        <circle cx="35" cy="45" r="3" fill="white"/>
    </svg>`,

    // Communication Tools
    'conversation-starter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="45" rx="25" ry="20" fill="#42A5F5" stroke="#1E88E5" stroke-width="2"/>
        <ellipse cx="60" cy="50" rx="25" ry="20" fill="#66BB6A" stroke="#43A047" stroke-width="2"/>
        <path d="M35 55 L30 65 L40 55" fill="#42A5F5"/>
        <path d="M65 60 L70 70 L60 60" fill="#66BB6A"/>
        <text x="40" y="50" text-anchor="middle" font-size="20">💬</text>
        <text x="60" y="55" text-anchor="middle" font-size="20">💭</text>
    </svg>`,

    'emoji-mood-log': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="15" fill="#FFEB3B" stroke="#FBC02D" stroke-width="2"/>
        <circle cx="25" cy="28" r="2" fill="#795548"/>
        <circle cx="35" cy="28" r="2" fill="#795548"/>
        <path d="M25 35 Q30 38 35 35" stroke="#795548" stroke-width="2" fill="none" stroke-linecap="round"/>

        <circle cx="70" cy="30" r="15" fill="#81C784" stroke="#66BB6A" stroke-width="2"/>
        <circle cx="65" cy="28" r="2" fill="#2E7D32"/>
        <circle cx="75" cy="28" r="2" fill="#2E7D32"/>
        <path d="M65 34 Q70 36 75 34" stroke="#2E7D32" stroke-width="2" fill="none" stroke-linecap="round"/>

        <circle cx="50" cy="65" r="15" fill="#90CAF9" stroke="#64B5F6" stroke-width="2"/>
        <circle cx="45" cy="63" r="2" fill="#1565C0"/>
        <circle cx="55" cy="63" r="2" fill="#1565C0"/>
        <line x1="45" y1="70" x2="55" y2="70" stroke="#1565C0" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    'compliment-generator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B9D;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#C44569;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M50 30 C50 20, 30 20, 30 35 C30 35, 30 50, 50 70 C70 50, 70 35, 70 35 C70 20, 50 20, 50 30 Z"
              fill="url(#heartGrad)" stroke="#C44569" stroke-width="2">
            <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="1.5s" repeatCount="indefinite" additive="sum"/>
        </path>
        <circle cx="35" cy="35" r="3" fill="white" opacity="0.8"/>
        <circle cx="65" cy="35" r="3" fill="white" opacity="0.8"/>
    </svg>`,

    'letter-template': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="25" width="60" height="50" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
        <line x1="30" y1="35" x2="70" y2="35" stroke="#F57F17" stroke-width="2"/>
        <line x1="30" y1="45" x2="70" y2="45" stroke="#F57F17" stroke-width="1" opacity="0.7"/>
        <line x1="30" y1="55" x2="70" y2="55" stroke="#F57F17" stroke-width="1" opacity="0.7"/>
        <line x1="30" y1="65" x2="50" y2="65" stroke="#F57F17" stroke-width="1" opacity="0.7"/>
        <path d="M20 25 L50 45 L80 25" stroke="#F9A825" stroke-width="2" fill="none"/>
    </svg>`,

    'active-listening': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 40 C30 25, 45 20, 50 20 C55 20, 70 25, 70 40 L70 55 C70 60, 65 60, 65 55 L65 40"
              fill="none" stroke="#7E57C2" stroke-width="3"/>
        <rect x="25" y="45" width="8" height="20" rx="4" fill="#9575CD"/>
        <rect x="67" y="45" width="8" height="20" rx="4" fill="#9575CD"/>
        <path d="M35 60 Q50 65 65 60" stroke="#7E57C2" stroke-width="2" fill="none"/>
        <circle cx="40" cy="50" r="3" fill="#D1C4E9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="50" r="3" fill="#D1C4E9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </circle>
    </svg>`,

    // Planning Tools
    'goal-breakdown': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="25" r="10" fill="#FF6F00" stroke="#E65100" stroke-width="2"/>
        <circle cx="30" cy="50" r="8" fill="#FF9800" stroke="#F57C00" stroke-width="2"/>
        <circle cx="50" cy="50" r="8" fill="#FF9800" stroke="#F57C00" stroke-width="2"/>
        <circle cx="70" cy="50" r="8" fill="#FF9800" stroke="#F57C00" stroke-width="2"/>
        <circle cx="25" cy="75" r="6" fill="#FFB300" stroke="#FF8F00" stroke-width="1"/>
        <circle cx="40" cy="75" r="6" fill="#FFB300" stroke="#FF8F00" stroke-width="1"/>
        <circle cx="60" cy="75" r="6" fill="#FFB300" stroke="#FF8F00" stroke-width="1"/>
        <circle cx="75" cy="75" r="6" fill="#FFB300" stroke="#FF8F00" stroke-width="1"/>
        <line x1="50" y1="35" x2="30" y2="42" stroke="#FF6F00" stroke-width="2"/>
        <line x1="50" y1="35" x2="50" y2="42" stroke="#FF6F00" stroke-width="2"/>
        <line x1="50" y1="35" x2="70" y2="42" stroke="#FF6F00" stroke-width="2"/>
    </svg>`,

    'milestone-mapper': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80 Q30 60 40 65 T60 50 T80 30" stroke="#4CAF50" stroke-width="3" fill="none"/>
        <circle cx="20" cy="80" r="5" fill="#388E3C"/>
        <circle cx="40" cy="65" r="5" fill="#43A047"/>
        <circle cx="60" cy="50" r="5" fill="#4CAF50"/>
        <circle cx="80" cy="30" r="5" fill="#66BB6A"/>
        <path d="M75 20 L85 20 L85 35 L80 30 L75 35 Z" fill="#FFC107" stroke="#F57C00" stroke-width="1"/>
    </svg>`,

    'project-estimator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="60" width="15" height="20" fill="#90CAF9"/>
        <rect x="35" y="45" width="15" height="35" fill="#64B5F6"/>
        <rect x="50" y="30" width="15" height="50" fill="#42A5F5"/>
        <rect x="65" y="40" width="15" height="40" fill="#2196F3"/>
        <path d="M15 85 L85 85" stroke="#1565C0" stroke-width="2"/>
        <path d="M15 85 L15 20" stroke="#1565C0" stroke-width="2"/>
        <circle cx="50" cy="20" r="3" fill="#FF6F00"/>
        <text x="50" y="18" text-anchor="middle" font-size="10" fill="#E65100">EST</text>
    </svg>`,

    'buffer-time-calculator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="none" stroke="#607D8B" stroke-width="3"/>
        <path d="M50 15 A35 35 0 0 1 85 50" fill="#4CAF50" opacity="0.7"/>
        <path d="M50 50 L85 50 A35 35 0 0 1 67.5 77.5 Z" fill="#FFC107" opacity="0.7"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#455A64" stroke-width="1" stroke-dasharray="2,3"/>
        <text x="65" y="35" text-anchor="middle" font-size="10" fill="#2E7D32">WORK</text>
        <text x="70" y="65" text-anchor="middle" font-size="10" fill="#F57C00">BUFFER</text>
        <circle cx="50" cy="50" r="3" fill="#263238"/>
        <line x1="50" y1="50" x2="50" y2="20" stroke="#263238" stroke-width="2"/>
        <line x1="50" y1="50" x2="75" y2="65" stroke="#F57C00" stroke-width="2"/>
    </svg>`,

    'deadline-visualizer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="deadlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFC107;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#F44336;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect x="15" y="45" width="70" height="10" fill="url(#deadlineGrad)" rx="5"/>
        <circle cx="65" cy="50" r="8" fill="#F44336" stroke="white" stroke-width="2">
            <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite"/>
        </circle>
        <text x="65" y="55" text-anchor="middle" font-size="10" fill="white" font-weight="bold">!</text>
        <text x="15" y="70" font-size="8" fill="#4CAF50">START</text>
        <text x="65" y="70" font-size="8" fill="#F44336">DEADLINE</text>
    </svg>`,

    // Mindfulness Tools
    'gratitude-prompter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="sunGrad">
                <stop offset="0%" style="stop-color:#FFEB3B;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFC107;stop-opacity:0.6" />
            </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="15" fill="url(#sunGrad)"/>
        <g transform="translate(50,50)">
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(0)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(45)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(90)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(135)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(180)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(225)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(270)"/>
            <path d="M0,-25 L0,-35" stroke="#FFB300" stroke-width="3" stroke-linecap="round" transform="rotate(315)"/>
        </g>
    </svg>`,

    'mindful-walking': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 80 Q35 70 40 80" stroke="#8D6E63" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M45 75 Q50 65 55 75" stroke="#8D6E63" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M60 70 Q65 60 70 70" stroke="#8D6E63" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
        <circle cx="50" cy="30" r="8" fill="#FFB74D"/>
        <line x1="50" y1="38" x2="50" y2="55" stroke="#5D4037" stroke-width="3"/>
        <line x1="50" y1="45" x2="40" y2="40" stroke="#5D4037" stroke-width="2"/>
        <line x1="50" y1="45" x2="60" y2="40" stroke="#5D4037" stroke-width="2"/>
        <line x1="50" y1="55" x2="45" y2="70" stroke="#5D4037" stroke-width="2"/>
        <line x1="50" y1="55" x2="55" y2="70" stroke="#5D4037" stroke-width="2"/>
    </svg>`,

    'intention-setter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="intentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#B39DDB;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#7E57C2;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#intentGrad)" stroke-width="3"/>
        <circle cx="50" cy="30" r="4" fill="#7E57C2"/>
        <circle cx="65" cy="40" r="4" fill="#9575CD"/>
        <circle cx="65" cy="60" r="4" fill="#B39DDB"/>
        <circle cx="50" cy="70" r="4" fill="#D1C4E9"/>
        <circle cx="35" cy="60" r="4" fill="#B39DDB"/>
        <circle cx="35" cy="40" r="4" fill="#9575CD"/>
        <line x1="50" y1="30" x2="65" y2="40" stroke="#9575CD" stroke-width="1"/>
        <line x1="65" y1="40" x2="65" y2="60" stroke="#9575CD" stroke-width="1"/>
        <line x1="65" y1="60" x2="50" y2="70" stroke="#9575CD" stroke-width="1"/>
        <line x1="50" y1="70" x2="35" y2="60" stroke="#9575CD" stroke-width="1"/>
        <line x1="35" y1="60" x2="35" y2="40" stroke="#9575CD" stroke-width="1"/>
        <line x1="35" y1="40" x2="50" y2="30" stroke="#9575CD" stroke-width="1"/>
    </svg>`,

    'body-scan': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="30" rx="8" ry="10" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/>
        <rect x="42" y="38" width="16" height="25" rx="3" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/>
        <rect x="38" y="40" width="6" height="18" rx="2" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/>
        <rect x="56" y="40" width="6" height="18" rx="2" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/>
        <rect x="44" y="60" width="5" height="20" rx="2" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/>
        <rect x="51" y="60" width="5" height="20" rx="2" fill="#FFCCBC" stroke="#FF8A65" stroke-width="2"/>
        <circle cx="50" cy="45" r="15" fill="none" stroke="#81C784" stroke-width="2" opacity="0.6" stroke-dasharray="2,3">
            <animate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
        </circle>
    </svg>`,

    'calm-sounds': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 50 Q35 40 40 50 T50 50 T60 50 T70 50" stroke="#29B6F6" stroke-width="3" fill="none" opacity="0.7">
            <animate attributeName="d" values="M30 50 Q35 40 40 50 T50 50 T60 50 T70 50;M30 50 Q35 60 40 50 T50 50 T60 50 T70 50;M30 50 Q35 40 40 50 T50 50 T60 50 T70 50" dur="3s" repeatCount="indefinite"/>
        </path>
        <path d="M25 60 Q30 55 35 60 T45 60 T55 60 T65 60 T75 60" stroke="#4FC3F7" stroke-width="2" fill="none" opacity="0.5">
            <animate attributeName="d" values="M25 60 Q30 55 35 60 T45 60 T55 60 T65 60 T75 60;M25 60 Q30 65 35 60 T45 60 T55 60 T65 60 T75 60;M25 60 Q30 55 35 60 T45 60 T55 60 T65 60 T75 60" dur="4s" repeatCount="indefinite"/>
        </path>
        <circle cx="20" cy="50" r="3" fill="#0288D1"/>
        <circle cx="80" cy="50" r="3" fill="#0288D1"/>
    </svg>`,

    // Personal Growth Tools
    'strength-finder': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF7043;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF5722;stop-opacity:1" />
            </linearGradient>
        </defs>
        <path d="M35 50 Q25 40 30 35 Q35 33 40 35 Q42 40 40 45 L50 50 L60 45 Q58 40 60 35 Q65 33 70 35 Q75 40 65 50"
              fill="url(#muscleGrad)" stroke="#E64A19" stroke-width="2"/>
        <circle cx="35" cy="37" r="5" fill="#FFCCBC"/>
        <circle cx="65" cy="37" r="5" fill="#FFCCBC"/>
        <path d="M45 55 L45 70 M55 55 L55 70" stroke="#E64A19" stroke-width="3" stroke-linecap="round"/>
    </svg>`,

    'fear-facing': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#263238" opacity="0.8"/>
        <circle cx="50" cy="50" r="25" fill="#37474F" opacity="0.7"/>
        <circle cx="50" cy="50" r="15" fill="#546E7A" opacity="0.6"/>
        <circle cx="50" cy="50" r="8" fill="#FFEB3B">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M50 15 L55 5 M50 15 L45 5" stroke="#FFC107" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    'value-clarifier': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 60,40 85,40 65,55 75,80 50,65 25,80 35,55 15,40 40,40"
                 fill="none" stroke="#FFD700" stroke-width="3"/>
        <circle cx="50" cy="50" r="12" fill="#FFD700"/>
        <text x="50" y="55" text-anchor="middle" font-size="16" fill="white" font-weight="bold">V</text>
    </svg>`,

    'growth-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="70" width="10" height="10" fill="#FFCDD2"/>
        <rect x="35" y="60" width="10" height="20" fill="#EF9A9A"/>
        <rect x="50" y="45" width="10" height="35" fill="#E57373"/>
        <rect x="65" y="30" width="10" height="50" fill="#EF5350"/>
        <path d="M25 75 Q40 55 55 40 T75 20" stroke="#C62828" stroke-width="2" fill="none" stroke-dasharray="2,2"/>
        <circle cx="75" cy="20" r="3" fill="#C62828"/>
    </svg>`,

    'skill-tree': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="20" r="8" fill="#4CAF50"/>
        <circle cx="30" cy="40" r="6" fill="#66BB6A"/>
        <circle cx="50" cy="40" r="6" fill="#66BB6A"/>
        <circle cx="70" cy="40" r="6" fill="#66BB6A"/>
        <circle cx="20" cy="60" r="5" fill="#81C784"/>
        <circle cx="35" cy="60" r="5" fill="#81C784"/>
        <circle cx="50" cy="60" r="5" fill="#81C784"/>
        <circle cx="65" cy="60" r="5" fill="#81C784"/>
        <circle cx="80" cy="60" r="5" fill="#81C784"/>
        <line x1="50" y1="28" x2="30" y2="34" stroke="#388E3C" stroke-width="2"/>
        <line x1="50" y1="28" x2="50" y2="34" stroke="#388E3C" stroke-width="2"/>
        <line x1="50" y1="28" x2="70" y2="34" stroke="#388E3C" stroke-width="2"/>
        <line x1="30" y1="46" x2="20" y2="55" stroke="#388E3C" stroke-width="1"/>
        <line x1="30" y1="46" x2="35" y2="55" stroke="#388E3C" stroke-width="1"/>
        <line x1="50" y1="46" x2="50" y2="55" stroke="#388E3C" stroke-width="1"/>
        <line x1="70" y1="46" x2="65" y2="55" stroke="#388E3C" stroke-width="1"/>
        <line x1="70" y1="46" x2="80" y2="55" stroke="#388E3C" stroke-width="1"/>
        <rect x="15" y="75" width="70" height="10" fill="#795548" opacity="0.5"/>
    </svg>`,

    // Fun & Entertainment Tools
    'would-you-rather': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30 L40 30 L40 70 L20 70 Z" fill="#E91E63" stroke="#C2185B" stroke-width="2"/>
        <text x="30" y="55" text-anchor="middle" font-size="24" fill="white" font-weight="bold">A</text>
        <text x="50" y="55" text-anchor="middle" font-size="20" fill="#424242">OR</text>
        <path d="M60 30 L80 30 L80 70 L60 70 Z" fill="#3F51B5" stroke="#303F9F" stroke-width="2"/>
        <text x="70" y="55" text-anchor="middle" font-size="24" fill="white" font-weight="bold">B</text>
    </svg>`,

    'fortune-cookie': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="35" ry="25" fill="#FFECB3" stroke="#FFB300" stroke-width="2"/>
        <path d="M15 50 Q50 30 85 50" fill="#FFD54F"/>
        <rect x="35" y="45" width="30" height="10" fill="white" opacity="0.9"/>
        <text x="50" y="52" text-anchor="middle" font-size="8" fill="#795548">FORTUNE</text>
    </svg>`,

    'name-generator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#AB47BC;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#7B1FA2;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect x="20" y="35" width="60" height="30" rx="15" fill="url(#nameGrad)"/>
        <text x="50" y="55" text-anchor="middle" font-size="16" fill="white" font-family="monospace">NAME_01</text>
        <circle cx="25" cy="50" r="3" fill="white" opacity="0.8"/>
        <circle cx="75" cy="50" r="3" fill="white" opacity="0.8"/>
    </svg>`,

    'emoji-story': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="70" height="60" rx="5" fill="#E1F5FE" stroke="#01579B" stroke-width="2"/>
        <text x="25" y="40" font-size="20">🏰</text>
        <text x="45" y="40" font-size="20">👸</text>
        <text x="65" y="40" font-size="20">🐉</text>
        <text x="25" y="65" font-size="20">⚔️</text>
        <text x="45" y="65" font-size="20">💎</text>
        <text x="65" y="65" font-size="20">🌟</text>
    </svg>`,

    'random-wikipedia': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#F5F5F5" stroke="#757575" stroke-width="2"/>
        <text x="50" y="60" text-anchor="middle" font-size="32" fill="#424242" font-weight="bold">W</text>
        <path d="M30 30 Q25 20 35 25 M70 30 Q75 20 65 25" stroke="#757575" stroke-width="2" fill="none" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite"/>
        </path>
    </svg>`,

    // Health & Wellness Tools
    'water-reminder': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="waterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style="stop-color:#0288D1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#81D4FA;stop-opacity:0.8" />
            </linearGradient>
        </defs>
        <path d="M50 20 Q30 40 30 60 Q30 80 50 80 Q70 80 70 60 Q70 40 50 20 Z"
              fill="url(#waterGrad)" stroke="#01579B" stroke-width="2"/>
        <ellipse cx="45" cy="35" rx="3" ry="5" fill="white" opacity="0.7"/>
        <text x="50" y="65" text-anchor="middle" font-size="20" fill="white">💧</text>
    </svg>`,

    'stretch-timer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="25" r="6" fill="#FF8A65"/>
        <line x1="50" y1="31" x2="50" y2="50" stroke="#FF7043" stroke-width="3"/>
        <line x1="50" y1="35" x2="35" y2="25" stroke="#FF7043" stroke-width="2"/>
        <line x1="50" y1="35" x2="65" y2="45" stroke="#FF7043" stroke-width="2"/>
        <line x1="50" y1="50" x2="40" y2="70" stroke="#FF7043" stroke-width="2"/>
        <line x1="50" y1="50" x2="60" y2="70" stroke="#FF7043" stroke-width="2"/>
        <path d="M35 25 Q30 15 25 25" stroke="#FF5722" stroke-width="2" fill="none" stroke-linecap="round">
            <animate attributeName="d" values="M35 25 Q30 15 25 25;M35 25 Q30 20 25 25;M35 25 Q30 15 25 25" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M65 45 Q70 40 75 45" stroke="#FF5722" stroke-width="2" fill="none" stroke-linecap="round">
            <animate attributeName="d" values="M65 45 Q70 40 75 45;M65 45 Q70 35 75 45;M65 45 Q70 40 75 45" dur="2s" repeatCount="indefinite"/>
        </path>
    </svg>`,

    'posture-checker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="20" x2="50" y2="70" stroke="#4CAF50" stroke-width="4"/>
        <circle cx="50" cy="25" r="5" fill="#4CAF50"/>
        <line x1="50" y1="35" x2="40" y2="45" stroke="#4CAF50" stroke-width="3"/>
        <line x1="50" y1="35" x2="60" y2="45" stroke="#4CAF50" stroke-width="3"/>
        <line x1="50" y1="70" x2="45" y2="85" stroke="#4CAF50" stroke-width="3"/>
        <line x1="50" y1="70" x2="55" y2="85" stroke="#4CAF50" stroke-width="3"/>
        <path d="M30 20 Q20 50 30 80" stroke="#F44336" stroke-width="2" stroke-dasharray="3,3" opacity="0.5"/>
        <text x="70" y="50" font-size="20">✅</text>
    </svg>`,

    'meal-planner': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="#FFF9C4" stroke="#F57F17" stroke-width="2"/>
        <path d="M50 20 A30 30 0 0 1 80 50 L50 50 Z" fill="#FFD54F"/>
        <path d="M80 50 A30 30 0 0 1 50 80 L50 50 Z" fill="#4CAF50"/>
        <path d="M50 80 A30 30 0 0 1 20 50 L50 50 Z" fill="#FF7043"/>
        <circle cx="50" cy="50" r="5" fill="white"/>
        <text x="60" y="35" font-size="12">🥗</text>
        <text x="60" y="65" font-size="12">🥦</text>
        <text x="35" y="65" font-size="12">🍎</text>
    </svg>`,

    'sleep-calculator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 30 Q70 30 70 50 Q70 70 40 70 Q50 60 50 50 Q50 40 40 30 Z"
              fill="#3949AB" opacity="0.8"/>
        <circle cx="25" cy="25" r="2" fill="#FFF59D"/>
        <circle cx="75" cy="20" r="1" fill="#FFF59D"/>
        <circle cx="80" cy="35" r="1.5" fill="#FFF59D"/>
        <circle cx="20" cy="45" r="1" fill="#FFF59D"/>
        <circle cx="70" cy="75" r="2" fill="#FFF59D"/>
        <circle cx="30" cy="80" r="1" fill="#FFF59D"/>
        <text x="52" y="55" font-size="16" fill="#E8EAF6">Zzz</text>
    </svg>`,

    // Learning Tools
    'memory-palace': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 20,40 20,80 80,80 80,40" fill="#B39DDB" stroke="#7E57C2" stroke-width="2"/>
        <rect x="35" y="50" width="15" height="20" fill="#FFF9C4"/>
        <rect x="50" y="50" width="15" height="20" fill="#FFECB3"/>
        <rect x="35" y="70" width="15" height="10" fill="#FFE0B2"/>
        <rect x="50" y="70" width="15" height="10" fill="#FFCCBC"/>
        <polygon points="50,15 30,30 70,30" fill="#9575CD"/>
        <circle cx="50" cy="35" r="3" fill="#FFC107"/>
    </svg>`,

    'quiz-maker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="5" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
        <circle cx="30" cy="35" r="3" fill="#1976D2"/>
        <line x1="38" y1="35" x2="70" y2="35" stroke="#90CAF9" stroke-width="2"/>
        <circle cx="30" cy="50" r="3" fill="#1976D2"/>
        <line x1="38" y1="50" x2="70" y2="50" stroke="#90CAF9" stroke-width="2"/>
        <circle cx="30" cy="65" r="3" fill="#1976D2"/>
        <line x1="38" y1="65" x2="70" y2="65" stroke="#90CAF9" stroke-width="2"/>
        <text x="50" y="90" text-anchor="middle" font-size="20">❓</text>
    </svg>`,

    'speed-reader': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="35" width="70" height="30" fill="#263238" rx="5"/>
        <text x="50" y="55" text-anchor="middle" font-size="16" fill="#00E676" font-family="monospace">WORD</text>
        <path d="M10 50 L5 50 M90 50 L95 50" stroke="#00E676" stroke-width="3" stroke-linecap="round">
            <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite"/>
        </path>
    </svg>`,

    'concept-connector': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="10" fill="#FF6F00"/>
        <circle cx="70" cy="30" r="10" fill="#1976D2"/>
        <circle cx="30" cy="70" r="10" fill="#388E3C"/>
        <circle cx="70" cy="70" r="10" fill="#7B1FA2"/>
        <line x1="40" y1="30" x2="60" y2="30" stroke="#757575" stroke-width="2"/>
        <line x1="30" y1="40" x2="30" y2="60" stroke="#757575" stroke-width="2"/>
        <line x1="70" y1="40" x2="70" y2="60" stroke="#757575" stroke-width="2"/>
        <line x1="40" y1="70" x2="60" y2="70" stroke="#757575" stroke-width="2"/>
        <line x1="37" y1="37" x2="63" y2="63" stroke="#757575" stroke-width="1" stroke-dasharray="2,2"/>
        <line x1="63" y1="37" x2="37" y2="63" stroke="#757575" stroke-width="1" stroke-dasharray="2,2"/>
    </svg>`,

    'revision-scheduler': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="3" fill="none" stroke="#455A64" stroke-width="2"/>
        <line x1="20" y1="35" x2="80" y2="35" stroke="#455A64" stroke-width="1"/>
        <line x1="35" y1="20" x2="35" y2="80" stroke="#455A64" stroke-width="1"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="#455A64" stroke-width="1"/>
        <line x1="65" y1="20" x2="65" y2="80" stroke="#455A64" stroke-width="1"/>
        <rect x="22" y="40" width="11" height="10" fill="#4CAF50" opacity="0.8"/>
        <rect x="37" y="45" width="11" height="10" fill="#FFC107" opacity="0.8"/>
        <rect x="52" y="50" width="11" height="10" fill="#FF9800" opacity="0.8"/>
        <rect x="67" y="55" width="11" height="10" fill="#F44336" opacity="0.8"/>
    </svg>`,

    // Financial Tools
    'expense-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="50" height="40" rx="5" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
        <text x="50" y="55" text-anchor="middle" font-size="24" fill="white" font-weight="bold">$</text>
        <path d="M35 25 L35 20 M50 25 L50 20 M65 25 L65 20" stroke="#2E7D32" stroke-width="2" stroke-linecap="round"/>
        <circle cx="75" cy="70" r="3" fill="#F44336">
            <animate attributeName="cy" values="70;75;70" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`,

    'savings-visualizer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="30" ry="15" fill="#FFB74D" stroke="#F57C00" stroke-width="2"/>
        <path d="M20 50 L20 65 Q20 80 50 80 Q80 80 80 65 L80 50" fill="#FFB74D" stroke="#F57C00" stroke-width="2"/>
        <ellipse cx="50" cy="65" rx="30" ry="15" fill="#FF9800" stroke="#F57C00" stroke-width="2"/>
        <text x="50" y="70" text-anchor="middle" font-size="16" fill="white" font-weight="bold">$$$</text>
        <circle cx="50" cy="30" r="5" fill="#FFC107">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`,

    'budget-wheel': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="none" stroke="#757575" stroke-width="2"/>
        <path d="M50 15 A35 35 0 0 1 85 50 L50 50 Z" fill="#4CAF50" opacity="0.8"/>
        <path d="M85 50 A35 35 0 0 1 67.5 77.5 L50 50 Z" fill="#2196F3" opacity="0.8"/>
        <path d="M67.5 77.5 A35 35 0 0 1 32.5 77.5 L50 50 Z" fill="#FFC107" opacity="0.8"/>
        <path d="M32.5 77.5 A35 35 0 0 1 15 50 L50 50 Z" fill="#FF9800" opacity="0.8"/>
        <path d="M15 50 A35 35 0 0 1 50 15 L50 50 Z" fill="#F44336" opacity="0.8"/>
        <circle cx="50" cy="50" r="10" fill="white" stroke="#757575" stroke-width="1"/>
        <text x="50" y="55" text-anchor="middle" font-size="12" fill="#424242">100%</text>
    </svg>`,

    'goal-thermometer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="20" height="50" rx="10" fill="#E0E0E0" stroke="#757575" stroke-width="2"/>
        <rect x="43" y="40" width="14" height="27" rx="7" fill="#F44336"/>
        <circle cx="50" cy="75" r="12" fill="#F44336" stroke="#D32F2F" stroke-width="2"/>
        <text x="50" y="80" text-anchor="middle" font-size="10" fill="white" font-weight="bold">75%</text>
        <line x1="65" y1="30" x2="70" y2="30" stroke="#757575" stroke-width="1"/>
        <line x1="65" y1="40" x2="70" y2="40" stroke="#757575" stroke-width="1"/>
        <line x1="65" y1="50" x2="70" y2="50" stroke="#757575" stroke-width="1"/>
        <line x1="65" y1="60" x2="70" y2="60" stroke="#757575" stroke-width="1"/>
    </svg>`,

    'money-mindset': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="20" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
        <text x="50" y="47" text-anchor="middle" font-size="20" fill="#F57F17">💰</text>
        <path d="M30 55 Q35 65 40 55 Q45 65 50 55 Q55 65 60 55 Q65 65 70 55"
              stroke="#4CAF50" stroke-width="2" fill="none"/>
        <circle cx="35" cy="70" r="3" fill="#4CAF50"/>
        <circle cx="50" cy="75" r="3" fill="#4CAF50"/>
        <circle cx="65" cy="70" r="3" fill="#4CAF50"/>
    </svg>`,

    // Social Tools
    'icebreaker-questions': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,30 40,15 50,25 60,10 70,30 65,35 60,32 55,37 50,34 45,39 40,36 35,40"
                 fill="#81D4FA" stroke="#039BE5" stroke-width="2"/>
        <rect x="25" y="40" width="50" height="40" rx="5" fill="#E1F5FE" stroke="#0277BD" stroke-width="2"/>
        <text x="50" y="65" text-anchor="middle" font-size="24" fill="#01579B">?</text>
    </svg>`,

    'relationship-check': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 35 C35 25, 20 25, 20 35 C20 35, 20 45, 35 60 C50 45, 50 35, 50 35 C50 25, 35 25, 35 35 Z"
              fill="#E91E63" opacity="0.8"/>
        <path d="M65 35 C65 25, 50 25, 50 35 C50 35, 50 45, 65 60 C80 45, 80 35, 80 35 C80 25, 65 25, 65 35 Z"
              fill="#E91E63" opacity="0.8"/>
        <line x1="42" y1="60" x2="58" y2="60" stroke="#C2185B" stroke-width="2" stroke-dasharray="2,2"/>
    </svg>`,

    'gift-idea-gen': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="40" width="50" height="40" fill="#9C27B0" stroke="#6A1B9A" stroke-width="2"/>
        <rect x="25" y="35" width="50" height="10" fill="#AB47BC" stroke="#7B1FA2" stroke-width="2"/>
        <path d="M50 35 L50 80" stroke="#6A1B9A" stroke-width="2"/>
        <path d="M40 35 Q35 25 40 20 Q45 18 45 25 L45 35" fill="#FFC107" stroke="#F57C00" stroke-width="1"/>
        <path d="M60 35 Q65 25 60 20 Q55 18 55 25 L55 35" fill="#FFC107" stroke="#F57C00" stroke-width="1"/>
    </svg>`,

    'friend-matcher': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="40" r="12" fill="#42A5F5"/>
        <circle cx="70" cy="40" r="12" fill="#66BB6A"/>
        <path d="M42 40 Q50 30 58 40" stroke="#FFB300" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="25" cy="65" r="8" fill="#90CAF9"/>
        <circle cx="50" cy="70" r="8" fill="#FFA726"/>
        <circle cx="75" cy="65" r="8" fill="#A5D6A7"/>
        <text x="50" y="50" text-anchor="middle" font-size="16">🤝</text>
    </svg>`,

    'event-countdown': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="60" height="50" rx="5" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
        <rect x="20" y="30" width="60" height="15" fill="#FF6F00"/>
        <circle cx="30" cy="25" r="3" fill="#E65100"/>
        <circle cx="70" cy="25" r="3" fill="#E65100"/>
        <text x="50" y="60" text-anchor="middle" font-size="20" fill="#E65100" font-weight="bold">23</text>
        <text x="50" y="75" text-anchor="middle" font-size="10" fill="#FF6F00">DAYS</text>
    </svg>`
});

console.log('Vibrant icons loaded - much more colorful and visible!');