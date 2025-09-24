// SVG Icons for all 101 utilities
const UtilityIcons = {
    // Wellness & Mindfulness Icons
    'breathing-pacer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 35 L50 65 M35 50 L65 50" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    </svg>`,

    'micro-decision-dice': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="35" cy="35" r="4" fill="currentColor"/>
        <circle cx="65" cy="35" r="4" fill="currentColor"/>
        <circle cx="35" cy="65" r="4" fill="currentColor"/>
        <circle cx="65" cy="65" r="4" fill="currentColor"/>
        <circle cx="50" cy="50" r="4" fill="currentColor"/>
    </svg>`,

    'pomodoro-garden': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 20 Q45 15 50 10 Q55 15 50 20" fill="currentColor"/>
        <path d="M30 70 Q30 60 35 65 Q40 60 45 65 Q50 60 55 65 Q60 60 65 65 Q70 60 70 70"
              stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="35" y1="65" x2="35" y2="85" stroke="currentColor" stroke-width="2"/>
        <line x1="50" y1="65" x2="50" y2="85" stroke="currentColor" stroke-width="2"/>
        <line x1="65" y1="65" x2="65" y2="85" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'thought-untangler': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 50 Q40 30 50 50 T70 50" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M25 60 Q35 40 45 60 T65 60" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M35 70 Q45 50 55 70 T75 70" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/>
        <circle cx="30" cy="50" r="3" fill="currentColor"/>
        <circle cx="50" cy="50" r="3" fill="currentColor"/>
        <circle cx="70" cy="50" r="3" fill="currentColor"/>
    </svg>`,

    'time-capsule-messenger': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="20" ry="35" fill="none" stroke="currentColor" stroke-width="2"/>
        <ellipse cx="50" cy="30" rx="20" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <ellipse cx="50" cy="70" rx="20" ry="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M40 45 L50 55 L60 45" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="50" cy="50" r="2" fill="currentColor"/>
    </svg>`,

    'personal-value-sorter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="20" height="15" fill="currentColor" opacity="0.8"/>
        <rect x="15" y="40" width="30" height="15" fill="currentColor" opacity="0.6"/>
        <rect x="15" y="60" width="40" height="15" fill="currentColor" opacity="0.4"/>
        <path d="M55 27 L80 27 M55 47 L80 47 M55 67 L80 67" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    </svg>`,

    'silent-auction-timer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 50 L50 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 50 L65 45" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M35 15 L45 25 M65 15 L55 25" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="3" fill="currentColor"/>
    </svg>`,

    'color-emotion-mapper': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="40" r="15" fill="currentColor" opacity="0.3"/>
        <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.5"/>
        <circle cx="70" cy="40" r="15" fill="currentColor" opacity="0.7"/>
        <circle cx="40" cy="55" r="15" fill="currentColor" opacity="0.4"/>
        <circle cx="60" cy="55" r="15" fill="currentColor" opacity="0.6"/>
        <circle cx="50" cy="70" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'habit-stacker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="70" width="60" height="10" fill="currentColor" opacity="0.9"/>
        <rect x="25" y="55" width="50" height="10" fill="currentColor" opacity="0.7"/>
        <rect x="30" y="40" width="40" height="10" fill="currentColor" opacity="0.5"/>
        <rect x="35" y="25" width="30" height="10" fill="currentColor" opacity="0.3"/>
        <path d="M15 85 L85 85" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'memory-palace-builder': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80 L20 40 L50 20 L80 40 L80 80 L20 80" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="35" y="55" width="15" height="25" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <rect x="55" y="55" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50 20 L50 35" stroke="currentColor" stroke-width="1"/>
        <circle cx="50" cy="40" r="3" fill="currentColor"/>
    </svg>`,

    'focus-soundscape': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 40 Q30 30 30 50 T30 60" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M40 35 Q40 25 40 50 T40 65" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M50 30 Q50 20 50 50 T50 70" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M60 35 Q60 25 60 50 T60 65" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M70 40 Q70 30 70 50 T70 60" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>`,

    'micro-journal': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="15" width="50" height="70" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="35" y1="30" x2="65" y2="30" stroke="currentColor" stroke-width="1.5"/>
        <line x1="35" y1="40" x2="55" y2="40" stroke="currentColor" stroke-width="1.5"/>
        <line x1="35" y1="50" x2="60" y2="50" stroke="currentColor" stroke-width="1.5"/>
        <line x1="35" y1="60" x2="50" y2="60" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="35" cy="70" r="2" fill="currentColor"/>
    </svg>`,

    'decision-matrix': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="1.5"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="65" cy="35" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="35" cy="65" r="3" fill="currentColor" opacity="0.9"/>
        <circle cx="65" cy="65" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`,

    'gratitude-jar': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 35 Q30 30 35 30 L65 30 Q70 30 70 35 L70 75 Q70 80 65 80 L35 80 Q30 80 30 75 Z"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <ellipse cx="50" cy="30" rx="20" ry="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="40" y="25" width="20" height="5" fill="currentColor" opacity="0.5"/>
        <circle cx="40" cy="50" r="2" fill="currentColor"/>
        <circle cx="50" cy="45" r="2" fill="currentColor"/>
        <circle cx="60" cy="52" r="2" fill="currentColor"/>
        <circle cx="45" cy="60" r="2" fill="currentColor"/>
        <circle cx="55" cy="58" r="2" fill="currentColor"/>
    </svg>`,

    'social-battery-meter': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="40" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="35" y="25" width="20" height="5" fill="currentColor"/>
        <rect x="30" y="60" width="30" height="15" fill="currentColor" opacity="0.3"/>
        <rect x="30" y="45" width="30" height="12" fill="currentColor" opacity="0.5"/>
        <rect x="30" y="35" width="30" height="8" fill="currentColor" opacity="0.7"/>
    </svg>`,

    'energy-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 20 L30 50 L45 50 L35 80 L60 40 L45 40 L55 20 Z"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="70" cy="30" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="75" cy="50" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="70" cy="70" r="3" fill="currentColor" opacity="0.9"/>
    </svg>`,

    'worry-window': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="25" width="60" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="1.5"/>
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="1.5"/>
        <path d="M30 60 Q35 55 40 60" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M60 40 Q65 35 70 40" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
    </svg>`,

    'mindful-eating-timer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M35 50 Q50 40 65 50" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="40" cy="45" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="50" cy="42" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="60" cy="45" r="3" fill="currentColor" opacity="0.7"/>
        <path d="M25 75 L30 50 M75 75 L70 50" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    'task-friction-analyzer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 50 L35 50" stroke="currentColor" stroke-width="3"/>
        <rect x="35" y="40" width="20" height="20" fill="currentColor" opacity="0.5"/>
        <path d="M55 45 Q60 40 60 50 Q60 60 55 55" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M60 50 L80 50" stroke="currentColor" stroke-width="3" stroke-dasharray="5,5"/>
        <circle cx="85" cy="50" r="3" fill="currentColor"/>
    </svg>`,

    'meeting-cost-calculator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="45" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="50" y="50" text-anchor="middle" font-size="16" fill="currentColor">$</text>
        <path d="M30 70 L35 75 L40 70 M45 70 L50 75 L55 70 M60 70 L65 75 L70 70"
              stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>`,

    'life-pie-chart': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 50 L50 20 A30 30 0 0 1 73 35 Z" fill="currentColor" opacity="0.3"/>
        <path d="M50 50 L73 35 A30 30 0 0 1 73 65 Z" fill="currentColor" opacity="0.5"/>
        <path d="M50 50 L73 65 A30 30 0 0 1 50 80 Z" fill="currentColor" opacity="0.7"/>
        <path d="M50 50 L50 80 A30 30 0 0 1 27 65 Z" fill="currentColor" opacity="0.4"/>
        <path d="M50 50 L27 65 A30 30 0 0 1 27 35 Z" fill="currentColor" opacity="0.6"/>
    </svg>`,

    'random-acts-generator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="80" cy="20" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="20" cy="80" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="80" cy="80" r="3" fill="currentColor" opacity="0.5"/>
    </svg>`,

    'mood-palette': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="25" height="25" fill="currentColor" opacity="0.9"/>
        <rect x="50" y="20" width="25" height="25" fill="currentColor" opacity="0.7"/>
        <rect x="20" y="50" width="25" height="25" fill="currentColor" opacity="0.5"/>
        <rect x="50" y="50" width="25" height="25" fill="currentColor" opacity="0.3"/>
        <path d="M80 30 Q85 25 90 30 Q85 70 80 75 Q75 70 80 30" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'emotional-weather-report': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="12" fill="currentColor" opacity="0.5"/>
        <path d="M60 30 Q55 25 55 35 Q55 45 60 40 Q70 40 70 35 Q70 25 60 30"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M30 60 L35 70 M40 55 L45 65 M50 60 L55 70 M60 55 L65 65"
              stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
    </svg>`,

    'interruption-log': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30 L45 30" stroke="currentColor" stroke-width="2"/>
        <path d="M40 30 L40 40 L50 40" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M50 40 L70 40" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3"/>
        <path d="M20 55 L35 55" stroke="currentColor" stroke-width="2"/>
        <path d="M35 55 L35 65 L45 65" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M45 65 L75 65" stroke="currentColor" stroke-width="2"/>
        <text x="75" y="35" font-size="12" fill="currentColor">!</text>
    </svg>`,

    'daily-highlight-picker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="15" fill="currentColor" opacity="0.3"/>
        <path d="M50 25 L45 15 L50 5 L55 15 Z" fill="currentColor"/>
        <path d="M35 40 L25 35 L15 40 L25 45 Z" fill="currentColor"/>
        <path d="M65 40 L75 35 L85 40 L75 45 Z" fill="currentColor"/>
        <rect x="30" y="60" width="40" height="25" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="40" y1="70" x2="60" y2="70" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    'compliment-bank': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 75 Q30 60 25 45 Q25 35 35 35 Q45 35 50 45 Q55 35 65 35 Q75 35 75 45 Q70 60 50 75"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="40" cy="50" r="2" fill="currentColor"/>
        <circle cx="50" cy="55" r="2" fill="currentColor"/>
        <circle cx="60" cy="50" r="2" fill="currentColor"/>
    </svg>`,

    'anxiety-reframer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="50" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(15 50 50)"/>
        <rect x="25" y="25" width="50" height="50" rx="5" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-15 50 50)" opacity="0.5"/>
        <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>`,

    'motivation-momentum': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q30 60 40 65 Q50 55 60 60 Q70 50 80 55"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M75 55 L80 55 L77 50" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="30" cy="65" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="50" cy="57" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="70" cy="52" r="3" fill="currentColor" opacity="0.9"/>
    </svg>`,

    'idea-collision-tool': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="65" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M48 45 L52 45 L50 40 Z" fill="currentColor"/>
        <path d="M48 55 L52 55 L50 60 Z" fill="currentColor"/>
        <path d="M45 48 L45 52 L40 50 Z" fill="currentColor"/>
        <path d="M55 48 L55 52 L60 50 Z" fill="currentColor"/>
    </svg>`,

    'personal-inflation-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 70 L30 60 L40 60 L40 50 L50 50 L50 40 L60 40 L60 30 L70 30 L70 20"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="30" cy="65" r="3" fill="currentColor"/>
        <circle cx="40" cy="55" r="3" fill="currentColor"/>
        <circle cx="50" cy="45" r="3" fill="currentColor"/>
        <circle cx="60" cy="35" r="3" fill="currentColor"/>
        <circle cx="70" cy="25" r="3" fill="currentColor"/>
        <path d="M20 80 L80 80" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 80 L20 20" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    'walking-meeting-pacer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 33 L50 55" stroke="currentColor" stroke-width="2"/>
        <path d="M50 40 L35 45 M50 40 L65 45" stroke="currentColor" stroke-width="2"/>
        <path d="M50 55 L40 75 M50 55 L60 75" stroke="currentColor" stroke-width="2"/>
        <path d="M30 75 L35 80 L40 75 M60 75 L65 80 L70 75" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>`,

    'mindful-transition-bell': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 60 Q35 40 50 35 Q65 40 65 60 L65 65 L35 65 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="30" r="3" fill="currentColor"/>
        <path d="M30 65 L70 65" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="73" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'goal-thermometer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="20" width="20" height="50" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="75" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="45" y="50" width="10" height="20" fill="currentColor" opacity="0.7"/>
        <circle cx="50" cy="75" r="8" fill="currentColor" opacity="0.7"/>
        <line x1="35" y1="30" x2="37" y2="30" stroke="currentColor" stroke-width="1.5"/>
        <line x1="35" y1="40" x2="37" y2="40" stroke="currentColor" stroke-width="1.5"/>
        <line x1="35" y1="50" x2="37" y2="50" stroke="currentColor" stroke-width="1.5"/>
        <line x1="35" y1="60" x2="37" y2="60" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    'declutter-roulette': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 50 L50 20" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50 50 L70 35" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50 50 L70 65" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50 50 L30 65" stroke="currentColor" stroke-width="1.5"/>
        <path d="M50 50 L30 35" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="5" fill="currentColor"/>
        <path d="M45 15 L50 5 L55 15" fill="currentColor"/>
    </svg>`,

    'validation-generator': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 45 Q25 35 35 35 L65 35 Q75 35 75 45 L75 55 Q75 65 65 65 L60 65 L50 75 L50 65 L35 65 Q25 65 25 55 Z"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="40" cy="50" r="2" fill="currentColor"/>
        <circle cx="50" cy="50" r="2" fill="currentColor"/>
        <circle cx="60" cy="50" r="2" fill="currentColor"/>
    </svg>`,

    'time-perception-test': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M30 50 L30 40" stroke="currentColor" stroke-width="2"/>
        <path d="M30 50 L38 50" stroke="currentColor" stroke-width="2"/>
        <circle cx="70" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="70" y="55" text-anchor="middle" font-size="16" fill="currentColor">?</text>
        <path d="M48 50 L52 50" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'boredom-transformer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="35" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M50 45 L55 40 L65 40 L70 45 L70 55 L65 60 L55 60 L50 55"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M45 50 L50 50" stroke="currentColor" stroke-width="2"/>
        <circle cx="60" cy="50" r="3" fill="currentColor"/>
    </svg>`,

    'context-switch-logger': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="15" height="15" fill="currentColor" opacity="0.7"/>
        <path d="M35 37 L45 37 L42 34 M42 40 L45 37" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <rect x="45" y="30" width="15" height="15" fill="currentColor" opacity="0.5"/>
        <path d="M60 37 L70 37 L67 34 M67 40 L70 37" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <rect x="70" y="30" width="15" height="15" fill="currentColor" opacity="0.3"/>
        <line x1="30" y1="55" x2="30" y2="70" stroke="currentColor" stroke-width="2"/>
        <line x1="52" y1="55" x2="52" y2="65" stroke="currentColor" stroke-width="2"/>
        <line x1="75" y1="55" x2="75" y2="60" stroke="currentColor" stroke-width="2"/>
    </svg>`,

    'productivity-weather': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="10" fill="currentColor" opacity="0.5"/>
        <path d="M40 25 L40 20 M40 60 L40 55 M25 40 L20 40 M60 40 L55 40" stroke="currentColor" stroke-width="2"/>
        <path d="M60 50 Q55 45 55 55 Q55 65 60 60 Q70 60 70 55 Q70 45 60 50"
              fill="currentColor" opacity="0.3"/>
        <rect x="30" y="70" width="40" height="5" fill="currentColor" opacity="0.7"/>
    </svg>`,

    'future-letter-writer': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="60" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M20 30 L50 50 L80 30" stroke="currentColor" stroke-width="1.5"/>
        <path d="M60 55 L75 55 L70 50 M70 60 L75 55" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="35" cy="50" r="2" fill="currentColor"/>
        <circle cx="45" cy="50" r="2" fill="currentColor"/>
        <circle cx="55" cy="50" r="2" fill="currentColor"/>
    </svg>`,

    'nostalgia-box': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="40" width="50" height="35" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M25 40 L50 25 L75 40" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="20" y="35" width="60" height="8" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="40" cy="55" r="3" fill="currentColor" opacity="0.5"/>
        <rect x="50" y="52" width="8" height="8" fill="currentColor" opacity="0.5"/>
        <path d="M63 58 L68 53" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    'personal-mantra-builder': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="50" y="45" text-anchor="middle" font-size="20" fill="currentColor">॰</text>
        <path d="M35 55 Q50 60 65 55" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="50" cy="20" r="2" fill="currentColor"/>
        <circle cx="50" cy="80" r="2" fill="currentColor"/>
        <circle cx="20" cy="50" r="2" fill="currentColor"/>
        <circle cx="80" cy="50" r="2" fill="currentColor"/>
    </svg>`,

    'emergency-joy-kit': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="35" width="50" height="40" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="40" y="30" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <line x1="50" y1="45" x2="50" y2="65" stroke="currentColor" stroke-width="3"/>
        <line x1="40" y1="55" x2="60" y2="55" stroke="currentColor" stroke-width="3"/>
        <circle cx="35" cy="45" r="2" fill="currentColor"/>
        <circle cx="65" cy="45" r="2" fill="currentColor"/>
    </svg>`,

    'mind-clutter-dump': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M40 35 Q45 30 40 40 M50 30 Q55 35 45 35 M60 35 Q55 40 60 30"
              stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M35 50 L35 70 L65 70 L65 50" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3"/>
        <path d="M40 70 L40 75 M50 70 L50 75 M60 70 L60 75" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,

    'decision-journal': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="40" height="60" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M35 35 L45 35 L40 30 M40 40 L45 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <line x1="50" y1="35" x2="55" y2="35" stroke="currentColor" stroke-width="1.5"/>
        <path d="M35 50 L45 50 L40 45 M40 55 L45 50" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <line x1="50" y1="50" x2="55" y2="50" stroke="currentColor" stroke-width="1.5"/>
        <rect x="65" y="25" width="5" height="50" fill="currentColor" opacity="0.3"/>
    </svg>`,

    'creativity-spark-bank': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 20 L45 35 L55 35 L50 50 L45 65 L55 65 L50 80"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="70" cy="30" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="30" cy="70" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="70" cy="70" r="3" fill="currentColor" opacity="0.5"/>
    </svg>`,

    'stress-signature-tracker': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 50 Q25 40 30 50 T40 50 Q45 35 50 50 Q55 65 60 50 T70 50 Q75 40 80 50"
              fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="30" cy="50" r="2" fill="currentColor"/>
        <circle cx="50" cy="50" r="2" fill="currentColor"/>
        <circle cx="70" cy="50" r="2" fill="currentColor"/>
    </svg>`,

    // Default icon for any missing utilities
    'default': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="50" r="3" fill="currentColor"/>
        <path d="M50 35 L50 65 M35 50 L65 50" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    </svg>`
};

// Export for use
window.UtilityIcons = UtilityIcons;