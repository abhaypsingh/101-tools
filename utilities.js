// Utility Registry and Implementations
const Utilities = {
    registry: [
        {
            id: 'breathing-pacer',
            name: 'Breathing Pacer',
            description: 'Visual breathing guide that adapts to your stress level',
            category: 'wellness',
            tags: ['mindfulness', 'stress', 'health'],
            badges: ['offline', 'advanced'],
            init: () => BreathingPacer.init()
        },
        {
            id: 'micro-decision-dice',
            name: 'Micro Decision Dice',
            description: 'Weighted probability dice for life choices',
            category: 'decision',
            tags: ['decisions', 'random', 'fun'],
            badges: ['offline'],
            init: () => MicroDecisionDice.init()
        },
        {
            id: 'silent-auction-timer',
            name: 'Silent Auction Timer',
            description: 'Multi-item countdown for household chores',
            category: 'organization',
            tags: ['timer', 'tasks', 'family'],
            badges: ['offline'],
            init: () => SilentAuctionTimer.init()
        },
        {
            id: 'color-emotion-mapper',
            name: 'Color Emotion Mapper',
            description: 'Map your mood to a color palette',
            category: 'wellness',
            tags: ['emotion', 'creativity', 'tracking'],
            badges: ['offline'],
            init: () => ColorEmotionMapper.init()
        },
        {
            id: 'habit-stacker',
            name: 'Habit Stacker',
            description: 'Chain tiny habits visually',
            category: 'productivity',
            tags: ['habits', 'routine', 'tracking'],
            badges: ['offline'],
            init: () => HabitStacker.init()
        },
        {
            id: 'focus-soundscape',
            name: 'Focus Soundscape',
            description: 'Generate productivity soundscapes',
            category: 'productivity',
            tags: ['focus', 'audio', 'concentration'],
            badges: ['offline', 'advanced'],
            init: () => FocusSoundscape.init()
        },
        {
            id: 'memory-palace-builder',
            name: 'Memory Palace Builder',
            description: '3D rooms for memorization',
            category: 'learning',
            tags: ['memory', '3d', 'education'],
            badges: ['offline', 'advanced'],
            init: () => MemoryPalaceBuilder.init()
        },
        {
            id: 'micro-journal',
            name: 'Micro Journal',
            description: 'One sentence daily entries',
            category: 'wellness',
            tags: ['journal', 'writing', 'reflection'],
            badges: ['offline'],
            init: () => MicroJournal.init()
        },
        {
            id: 'decision-matrix',
            name: 'Decision Matrix',
            description: 'Visual choice comparison',
            category: 'decision',
            tags: ['decisions', 'analysis', 'planning'],
            badges: ['offline'],
            init: () => DecisionMatrix.init()
        },
        {
            id: 'time-capsule-messenger',
            name: 'Time Capsule Messenger',
            description: 'Write messages to future self',
            category: 'wellness',
            tags: ['reflection', 'time', 'messages'],
            badges: ['offline', 'advanced'],
            init: () => TimeCapsuleMessenger.init()
        },
        {
            id: 'pomodoro-garden',
            name: 'Pomodoro Garden',
            description: 'Grow plants with focus time',
            category: 'productivity',
            tags: ['focus', 'timer', 'gamification'],
            badges: ['offline'],
            init: () => PomodoroGarden.init()
        },
        {
            id: 'social-battery-meter',
            name: 'Social Battery Meter',
            description: 'Track social energy levels',
            category: 'wellness',
            tags: ['social', 'energy', 'tracking'],
            badges: ['offline'],
            init: () => SocialBatteryMeter.init()
        },
        {
            id: 'thought-untangler',
            name: 'Thought Untangler',
            description: 'Map racing thoughts visually',
            category: 'mindfulness',
            tags: ['thoughts', 'clarity', 'visualization'],
            badges: ['offline'],
            init: () => ThoughtUntangler.init()
        },
        {
            id: 'gratitude-jar',
            name: 'Gratitude Jar',
            description: 'Collect daily gratitudes',
            category: 'wellness',
            tags: ['gratitude', 'positivity', 'daily'],
            badges: ['offline'],
            init: () => GratitudeJar.init()
        },
        {
            id: 'energy-tracker',
            name: 'Energy Tracker',
            description: 'Hourly energy patterns',
            category: 'wellness',
            tags: ['energy', 'tracking', 'patterns'],
            badges: ['offline'],
            init: () => EnergyTracker.init()
        },
        {
            id: 'boundary-script-writer',
            name: 'Boundary Script Writer',
            description: 'Generate assertive phrases',
            category: 'communication',
            tags: ['boundaries', 'communication', 'scripts'],
            badges: ['offline'],
            init: () => BoundaryScriptWriter.init()
        },
        {
            id: 'compliment-generator',
            name: 'Compliment Generator',
            description: 'Meaningful specific compliments',
            category: 'communication',
            tags: ['social', 'positivity', 'relationships'],
            badges: ['offline'],
            init: () => ComplimentGenerator.init()
        },
        {
            id: 'sleep-debt-calculator',
            name: 'Sleep Debt Calculator',
            description: 'Track cumulative sleep loss',
            category: 'wellness',
            tags: ['sleep', 'health', 'tracking'],
            badges: ['offline'],
            init: () => SleepDebtCalculator.init()
        },
        {
            id: 'worry-window',
            name: 'Worry Window',
            description: 'Scheduled worry time',
            category: 'mindfulness',
            tags: ['anxiety', 'worry', 'mental-health'],
            badges: ['offline'],
            init: () => WorryWindow.init()
        },
        {
            id: 'meal-dice',
            name: 'Meal Dice',
            description: 'Random meal suggestions',
            category: 'planning',
            tags: ['food', 'planning', 'random'],
            badges: ['offline'],
            init: () => MealDice.init()
        },
        {
            id: 'screen-break-enforcer',
            name: 'Screen Break Enforcer',
            description: 'Full-screen break reminders',
            category: 'wellness',
            tags: ['breaks', 'health', 'productivity'],
            badges: ['offline'],
            init: () => ScreenBreakEnforcer.init()
        },
        {
            id: 'task-friction-analyzer',
            name: 'Task Friction Analyzer',
            description: 'Find why tasks feel hard',
            category: 'productivity',
            tags: ['procrastination', 'analysis', 'tasks'],
            badges: ['offline'],
            init: () => TaskFrictionAnalyzer.init()
        },
        {
            id: 'emotion-color-picker',
            name: 'Emotion Color Picker',
            description: 'Pick colors by feeling',
            category: 'creativity',
            tags: ['colors', 'emotion', 'design'],
            badges: ['offline'],
            init: () => EmotionColorPicker.init()
        },
        {
            id: 'reading-time-bank',
            name: 'Reading Time Bank',
            description: 'Save reading time for later',
            category: 'learning',
            tags: ['reading', 'goals', 'tracking'],
            badges: ['offline'],
            init: () => ReadingTimeBank.init()
        },
        {
            id: 'conversation-starter-spinner',
            name: 'Conversation Starter Spinner',
            description: 'Ice breaker questions',
            category: 'communication',
            tags: ['social', 'conversation', 'ice-breakers'],
            badges: ['offline'],
            init: () => ConversationStarterSpinner.init()
        },
        {
            id: 'digital-detox-timer',
            name: 'Digital Detox Timer',
            description: 'Lock yourself out gracefully',
            category: 'wellness',
            tags: ['detox', 'digital-wellness', 'timer'],
            badges: ['offline'],
            init: () => DigitalDetoxTimer.init()
        },
        {
            id: 'motivation-momentum',
            name: 'Motivation Momentum',
            description: 'Chain successful days',
            category: 'productivity',
            tags: ['motivation', 'streaks', 'habits'],
            badges: ['offline'],
            init: () => MotivationMomentum.init()
        },
        {
            id: 'idea-collision-tool',
            name: 'Idea Collision Tool',
            description: 'Combine random concepts',
            category: 'creativity',
            tags: ['creativity', 'ideas', 'brainstorming'],
            badges: ['offline'],
            init: () => IdeaCollisionTool.init()
        },
        {
            id: 'personal-inflation-tracker',
            name: 'Personal Inflation Tracker',
            description: 'Track your personal costs',
            category: 'planning',
            tags: ['finance', 'tracking', 'budget'],
            badges: ['offline'],
            init: () => PersonalInflationTracker.init()
        },
        {
            id: 'walking-meeting-pacer',
            name: 'Walking Meeting Pacer',
            description: 'Pace virtual walking meetings',
            category: 'wellness',
            tags: ['meetings', 'walking', 'health'],
            badges: ['offline', 'advanced'],
            init: () => WalkingMeetingPacer.init()
        },
        {
            id: 'mindful-transition-bell',
            name: 'Mindful Transition Bell',
            description: 'Between-task mindfulness',
            category: 'mindfulness',
            tags: ['transitions', 'mindfulness', 'audio'],
            badges: ['offline', 'advanced'],
            init: () => MindfulTransitionBell.init()
        },
        {
            id: 'goal-thermometer',
            name: 'Goal Thermometer',
            description: 'Visual progress tracking',
            category: 'productivity',
            tags: ['goals', 'progress', 'visualization'],
            badges: ['offline'],
            init: () => GoalThermometer.init()
        },
        {
            id: 'declutter-roulette',
            name: 'Declutter Roulette',
            description: 'Random declutter targets',
            category: 'organization',
            tags: ['decluttering', 'random', 'cleaning'],
            badges: ['offline'],
            init: () => DeclutterRoulette.init()
        },
        {
            id: 'validation-generator',
            name: 'Validation Generator',
            description: 'Self-compassion phrases',
            category: 'wellness',
            tags: ['self-care', 'validation', 'mental-health'],
            badges: ['offline'],
            init: () => ValidationGenerator.init()
        },
        {
            id: 'time-perception-test',
            name: 'Time Perception Test',
            description: 'Check your time sense',
            category: 'mindfulness',
            tags: ['time', 'perception', 'awareness'],
            badges: ['offline'],
            init: () => TimePerceptionTest.init()
        },
        {
            id: 'fidget-pattern-maker',
            name: 'Fidget Pattern Maker',
            description: 'Digital fidget toy',
            category: 'creativity',
            tags: ['fidget', 'patterns', 'relaxation'],
            badges: ['offline'],
            init: () => FidgetPatternMaker.init()
        },
        {
            id: 'commitment-thermometer',
            name: 'Commitment Thermometer',
            description: 'Measure commitment level',
            category: 'planning',
            tags: ['commitments', 'capacity', 'planning'],
            badges: ['offline'],
            init: () => CommitmentThermometer.init()
        },
        {
            id: 'micro-learning-queue',
            name: 'Micro Learning Queue',
            description: '2-minute learning bites',
            category: 'learning',
            tags: ['learning', 'education', 'micro'],
            badges: ['offline'],
            init: () => MicroLearningQueue.init()
        },
        {
            id: 'argument-mapper',
            name: 'Argument Mapper',
            description: 'Structure disagreements',
            category: 'communication',
            tags: ['arguments', 'conflict', 'communication'],
            badges: ['offline'],
            init: () => ArgumentMapper.init()
        },
        {
            id: 'life-pie-chart',
            name: 'Life Pie Chart',
            description: 'Time allocation visualizer',
            category: 'planning',
            tags: ['balance', 'time', 'visualization'],
            badges: ['offline'],
            init: () => LifePieChart.init()
        },
        {
            id: 'impulse-purchase-delay',
            name: 'Impulse Purchase Delay',
            description: 'Cooling-off calculator',
            category: 'planning',
            tags: ['shopping', 'impulse', 'finance'],
            badges: ['offline'],
            init: () => ImpulsePurchaseDelay.init()
        },
        {
            id: 'body-scan-guide',
            name: 'Body Scan Guide',
            description: 'Progressive relaxation',
            category: 'mindfulness',
            tags: ['relaxation', 'body-scan', 'mindfulness'],
            badges: ['offline'],
            init: () => BodyScanGuide.init()
        },
        {
            id: 'task-delegator',
            name: 'Task Delegator',
            description: 'Delegation decision tree',
            category: 'productivity',
            tags: ['delegation', 'tasks', 'management'],
            badges: ['offline'],
            init: () => TaskDelegator.init()
        },
        {
            id: 'creativity-unlocker',
            name: 'Creativity Unlocker',
            description: 'Overcome creative blocks',
            category: 'creativity',
            tags: ['creativity', 'blocks', 'inspiration'],
            badges: ['offline'],
            init: () => CreativityUnlocker.init()
        },
        {
            id: 'meeting-cost-calculator',
            name: 'Meeting Cost Calculator',
            description: 'Real-time meeting cost',
            category: 'productivity',
            tags: ['meetings', 'cost', 'efficiency'],
            badges: ['offline'],
            init: () => MeetingCostCalculator.init()
        },
        {
            id: 'priority-pyramid',
            name: 'Priority Pyramid',
            description: '3D priority visualization',
            category: 'planning',
            tags: ['priorities', '3d', 'visualization'],
            badges: ['offline', 'advanced'],
            init: () => PriorityPyramid.init()
        },
        {
            id: 'stress-signal-decoder',
            name: 'Stress Signal Decoder',
            description: 'Identify stress patterns',
            category: 'wellness',
            tags: ['stress', 'patterns', 'awareness'],
            badges: ['offline'],
            init: () => StressSignalDecoder.init()
        },
        {
            id: 'productivity-wave-tracker',
            name: 'Productivity Wave Tracker',
            description: 'Natural productivity cycles',
            category: 'productivity',
            tags: ['productivity', 'cycles', 'tracking'],
            badges: ['offline'],
            init: () => ProductivityWaveTracker.init()
        },
        {
            id: 'communication-style-adapter',
            name: 'Communication Style Adapter',
            description: 'Adjust message tone',
            category: 'communication',
            tags: ['communication', 'tone', 'adaptation'],
            badges: ['offline'],
            init: () => CommunicationStyleAdapter.init()
        },
        {
            id: 'personal-value-sorter',
            name: 'Personal Value Sorter',
            description: 'Clarify core values',
            category: 'wellness',
            tags: ['values', 'clarity', 'self-discovery'],
            badges: ['offline'],
            init: () => PersonalValueSorter.init()
        },
        {
            id: 'distraction-logger',
            name: 'Distraction Logger',
            description: 'Track distraction patterns',
            category: 'productivity',
            tags: ['distractions', 'focus', 'tracking'],
            badges: ['offline'],
            init: () => DistractionLogger.init()
        },
        {
            id: 'energy-investment-portfolio',
            name: 'Energy Investment Portfolio',
            description: 'Visualize energy spending',
            category: 'wellness',
            tags: ['energy', 'portfolio', 'visualization'],
            badges: ['offline'],
            init: () => EnergyInvestmentPortfolio.init()
        },
        {
            id: 'small-win-collector',
            name: 'Small Win Collector',
            description: 'Celebrate tiny victories',
            category: 'wellness',
            tags: ['wins', 'celebration', 'positivity'],
            badges: ['offline'],
            init: () => SmallWinCollector.init()
        },
        {
            id: 'boundary-visualizer',
            name: 'Boundary Visualizer',
            description: 'See your boundaries',
            category: 'wellness',
            tags: ['boundaries', 'visualization', 'self-care'],
            badges: ['offline'],
            init: () => BoundaryVisualizer.init()
        },
        {
            id: 'task-estimator-trainer',
            name: 'Task Estimator Trainer',
            description: 'Improve time estimates',
            category: 'productivity',
            tags: ['estimation', 'time', 'training'],
            badges: ['offline'],
            init: () => TaskEstimatorTrainer.init()
        },
        {
            id: 'emotion-thermometer',
            name: 'Emotion Thermometer',
            description: 'Track emotional temperature',
            category: 'wellness',
            tags: ['emotions', 'tracking', 'awareness'],
            badges: ['offline'],
            init: () => EmotionThermometer.init()
        },
        {
            id: 'cognitive-load-meter',
            name: 'Cognitive Load Meter',
            description: 'Monitor mental capacity',
            category: 'productivity',
            tags: ['cognitive-load', 'capacity', 'monitoring'],
            badges: ['offline'],
            init: () => CognitiveLoadMeter.init()
        },
        {
            id: 'habit-breaker',
            name: 'Habit Breaker',
            description: 'Disrupt bad patterns',
            category: 'wellness',
            tags: ['habits', 'breaking', 'change'],
            badges: ['offline'],
            init: () => HabitBreaker.init()
        },
        {
            id: 'focus-photography',
            name: 'Focus Photography',
            description: 'Capture focus moments',
            category: 'mindfulness',
            tags: ['focus', 'capture', 'moments'],
            badges: ['offline'],
            init: () => FocusPhotography.init()
        },
        {
            id: 'guilt-liberator',
            name: 'Guilt Liberator',
            description: 'Release unnecessary guilt',
            category: 'wellness',
            tags: ['guilt', 'release', 'mental-health'],
            badges: ['offline'],
            init: () => GuiltLiberator.init()
        },
        {
            id: 'task-multiplier',
            name: 'Task Multiplier',
            description: 'Find task synergies',
            category: 'productivity',
            tags: ['tasks', 'efficiency', 'synergy'],
            badges: ['offline'],
            init: () => TaskMultiplier.init()
        },
        {
            id: 'comfort-zone-expander',
            name: 'Comfort Zone Expander',
            description: 'Gradual challenge tracker',
            category: 'wellness',
            tags: ['growth', 'challenges', 'comfort-zone'],
            badges: ['offline'],
            init: () => ComfortZoneExpander.init()
        },
        {
            id: 'listening-mode-indicator',
            name: 'Listening Mode Indicator',
            description: 'Show listening style',
            category: 'communication',
            tags: ['listening', 'communication', 'awareness'],
            badges: ['offline'],
            init: () => ListeningModeIndicator.init()
        },
        {
            id: 'personal-bandwidth-monitor',
            name: 'Personal Bandwidth Monitor',
            description: 'Available capacity tracker',
            category: 'wellness',
            tags: ['capacity', 'bandwidth', 'monitoring'],
            badges: ['offline'],
            init: () => PersonalBandwidthMonitor.init()
        },
        {
            id: 'micro-adventure-generator',
            name: 'Micro Adventure Generator',
            description: 'Daily adventure ideas',
            category: 'creativity',
            tags: ['adventure', 'daily', 'spontaneity'],
            badges: ['offline'],
            init: () => MicroAdventureGenerator.init()
        },
        {
            id: 'thought-speed-controller',
            name: 'Thought Speed Controller',
            description: 'Slow racing thoughts',
            category: 'mindfulness',
            tags: ['thoughts', 'speed', 'control'],
            badges: ['offline'],
            init: () => ThoughtSpeedController.init()
        },
        {
            id: 'decision-fatigue-meter',
            name: 'Decision Fatigue Meter',
            description: 'Track decision capacity',
            category: 'productivity',
            tags: ['decisions', 'fatigue', 'capacity'],
            badges: ['offline'],
            init: () => DecisionFatigueMeter.init()
        },
        {
            id: 'perfectionism-dimmer',
            name: 'Perfectionism Dimmer',
            description: 'Adjust perfectionism level',
            category: 'wellness',
            tags: ['perfectionism', 'balance', 'adjustment'],
            badges: ['offline'],
            init: () => PerfectionismDimmer.init()
        },
        {
            id: 'social-script-library',
            name: 'Social Script Library',
            description: 'Conversation templates',
            category: 'communication',
            tags: ['scripts', 'social', 'templates'],
            badges: ['offline'],
            init: () => SocialScriptLibrary.init()
        },
        {
            id: 'task-decomposer',
            name: 'Task Decomposer',
            description: 'Break down overwhelming tasks',
            category: 'productivity',
            tags: ['tasks', 'breakdown', 'simplification'],
            badges: ['offline'],
            init: () => TaskDecomposer.init()
        },
        {
            id: 'motivation-weather',
            name: 'Motivation Weather',
            description: 'Forecast motivation patterns',
            category: 'productivity',
            tags: ['motivation', 'patterns', 'forecast'],
            badges: ['offline'],
            init: () => MotivationWeather.init()
        },
        {
            id: 'comparison-blocker',
            name: 'Comparison Blocker',
            description: 'Stop social comparison',
            category: 'wellness',
            tags: ['comparison', 'social', 'mindset'],
            badges: ['offline'],
            init: () => ComparisonBlocker.init()
        },
        {
            id: 'permission-slip-generator',
            name: 'Permission Slip Generator',
            description: 'Give yourself permission',
            category: 'wellness',
            tags: ['permission', 'self-care', 'acceptance'],
            badges: ['offline'],
            init: () => PermissionSlipGenerator.init()
        },
        {
            id: 'cognitive-reframe-tool',
            name: 'Cognitive Reframe Tool',
            description: 'Reframe negative thoughts',
            category: 'wellness',
            tags: ['thoughts', 'reframing', 'cognitive'],
            badges: ['offline'],
            init: () => CognitiveReframeTool.init()
        },
        {
            id: 'personal-ritual-builder',
            name: 'Personal Ritual Builder',
            description: 'Create meaningful rituals',
            category: 'wellness',
            tags: ['rituals', 'routine', 'meaning'],
            badges: ['offline'],
            init: () => PersonalRitualBuilder.init()
        },
        {
            id: 'stress-fingerprint',
            name: 'Stress Fingerprint',
            description: 'Unique stress signature',
            category: 'wellness',
            tags: ['stress', 'patterns', 'personal'],
            badges: ['offline'],
            init: () => StressFingerprint.init()
        },
        {
            id: 'accomplishment-amplifier',
            name: 'Accomplishment Amplifier',
            description: 'Magnify small wins',
            category: 'wellness',
            tags: ['accomplishments', 'amplification', 'celebration'],
            badges: ['offline'],
            init: () => AccomplishmentAmplifier.init()
        },
        {
            id: 'context-switcher',
            name: 'Context Switcher',
            description: 'Manage context switches',
            category: 'productivity',
            tags: ['context', 'switching', 'management'],
            badges: ['offline'],
            init: () => ContextSwitcher.init()
        },
        {
            id: 'emotional-bandwidth',
            name: 'Emotional Bandwidth',
            description: 'Track emotional capacity',
            category: 'wellness',
            tags: ['emotions', 'capacity', 'bandwidth'],
            badges: ['offline'],
            init: () => EmotionalBandwidth.init()
        },
        {
            id: 'task-aging-tracker',
            name: 'Task Aging Tracker',
            description: 'See task staleness',
            category: 'productivity',
            tags: ['tasks', 'aging', 'procrastination'],
            badges: ['offline'],
            init: () => TaskAgingTracker.init()
        },
        {
            id: 'energy-vampire-detector',
            name: 'Energy Vampire Detector',
            description: 'Identify energy drains',
            category: 'wellness',
            tags: ['energy', 'drains', 'awareness'],
            badges: ['offline'],
            init: () => EnergyVampireDetector.init()
        },
        {
            id: 'micro-commitment-tracker',
            name: 'Micro Commitment Tracker',
            description: 'Tiny promise keeper',
            category: 'productivity',
            tags: ['commitments', 'micro', 'tracking'],
            badges: ['offline'],
            init: () => MicroCommitmentTracker.init()
        },
        {
            id: 'flow-state-timer',
            name: 'Flow State Timer',
            description: 'Track flow states',
            category: 'productivity',
            tags: ['flow', 'focus', 'timing'],
            badges: ['offline'],
            init: () => FlowStateTimer.init()
        },
        {
            id: 'personal-noise-filter',
            name: 'Personal Noise Filter',
            description: 'Filter information intake',
            category: 'wellness',
            tags: ['information', 'filtering', 'focus'],
            badges: ['offline'],
            init: () => PersonalNoiseFilter.init()
        },
        {
            id: 'task-momentum-visualizer',
            name: 'Task Momentum Visualizer',
            description: 'See task velocity',
            category: 'productivity',
            tags: ['tasks', 'momentum', 'visualization'],
            badges: ['offline'],
            init: () => TaskMomentumVisualizer.init()
        },
        {
            id: 'overwhelm-overflow',
            name: 'Overwhelm Overflow',
            description: 'Dump overwhelming thoughts',
            category: 'wellness',
            tags: ['overwhelm', 'thoughts', 'release'],
            badges: ['offline'],
            init: () => OverwhelmOverflow.init()
        },
        {
            id: 'recovery-time-calculator',
            name: 'Recovery Time Calculator',
            description: 'Calculate recovery needs',
            category: 'wellness',
            tags: ['recovery', 'calculation', 'rest'],
            badges: ['offline'],
            init: () => RecoveryTimeCalculator.init()
        },
        {
            id: 'attention-span-trainer',
            name: 'Attention Span Trainer',
            description: 'Build focus endurance',
            category: 'productivity',
            tags: ['attention', 'training', 'focus'],
            badges: ['offline'],
            init: () => AttentionSpanTrainer.init()
        },
        {
            id: 'priority-shuffler',
            name: 'Priority Shuffler',
            description: 'Randomize low priorities',
            category: 'productivity',
            tags: ['priorities', 'random', 'decisions'],
            badges: ['offline'],
            init: () => PriorityShuffler.init()
        },
        {
            id: 'emotional-labor-tracker',
            name: 'Emotional Labor Tracker',
            description: 'Track invisible work',
            category: 'wellness',
            tags: ['emotional-labor', 'tracking', 'awareness'],
            badges: ['offline'],
            init: () => EmotionalLaborTracker.init()
        },
        {
            id: 'personal-pace-finder',
            name: 'Personal Pace Finder',
            description: 'Find your natural pace',
            category: 'wellness',
            tags: ['pace', 'rhythm', 'discovery'],
            badges: ['offline'],
            init: () => PersonalPaceFinder.init()
        },
        {
            id: 'obligation-auditor',
            name: 'Obligation Auditor',
            description: 'Audit your obligations',
            category: 'planning',
            tags: ['obligations', 'audit', 'review'],
            badges: ['offline'],
            init: () => ObligationAuditor.init()
        },
        {
            id: 'mental-load-distributor',
            name: 'Mental Load Distributor',
            description: 'Share mental load',
            category: 'wellness',
            tags: ['mental-load', 'distribution', 'sharing'],
            badges: ['offline'],
            init: () => MentalLoadDistributor.init()
        },
        {
            id: 'transition-ritual-creator',
            name: 'Transition Ritual Creator',
            description: 'Smooth transitions',
            category: 'wellness',
            tags: ['transitions', 'rituals', 'smoothing'],
            badges: ['offline'],
            init: () => TransitionRitualCreator.init()
        },
        {
            id: 'personal-compass',
            name: 'Personal Compass',
            description: 'Find your direction',
            category: 'wellness',
            tags: ['direction', 'values', 'compass'],
            badges: ['offline'],
            init: () => PersonalCompass.init()
        },
        {
            id: 'assumption-challenger',
            name: 'Assumption Challenger',
            description: 'Question assumptions',
            category: 'mindfulness',
            tags: ['assumptions', 'questioning', 'awareness'],
            badges: ['offline'],
            init: () => AssumptionChallenger.init()
        },
        {
            id: 'energy-recipe-book',
            name: 'Energy Recipe Book',
            description: 'Energy-giving activities',
            category: 'wellness',
            tags: ['energy', 'activities', 'recipes'],
            badges: ['offline'],
            init: () => EnergyRecipeBook.init()
        },
        {
            id: 'micro-progress-bar',
            name: 'Micro Progress Bar',
            description: 'Tiny step tracker',
            category: 'productivity',
            tags: ['progress', 'micro', 'tracking'],
            badges: ['offline'],
            init: () => MicroProgressBar.init()
        },
        {
            id: 'cognitive-exit-ramp',
            name: 'Cognitive Exit Ramp',
            description: 'Leave thought loops',
            category: 'mindfulness',
            tags: ['thoughts', 'loops', 'exit'],
            badges: ['offline'],
            init: () => CognitiveExitRamp.init()
        },
        {
            id: 'personal-seasonality',
            name: 'Personal Seasonality',
            description: 'Track personal seasons',
            category: 'wellness',
            tags: ['seasons', 'patterns', 'personal'],
            badges: ['offline'],
            init: () => PersonalSeasonality.init()
        },
        {
            id: 'tomorrow-visualizer',
            name: 'Tomorrow Visualizer',
            description: 'Picture tomorrow clearly',
            category: 'planning',
            tags: ['tomorrow', 'visualization', 'planning'],
            badges: ['offline'],
            init: () => TomorrowVisualizer.init()
        }
    ],

    getById(id) {
        return this.registry.find(u => u.id === id);
    },

    getByCategory(category) {
        if (!category) return this.registry;
        return this.registry.filter(u => u.category === category);
    },

    search(query) {
        const q = query.toLowerCase();
        return this.registry.filter(u =>
            u.name.toLowerCase().includes(q) ||
            u.description.toLowerCase().includes(q) ||
            u.tags.some(tag => tag.includes(q))
        );
    },

    getRandom() {
        const index = Math.floor(Math.random() * this.registry.length);
        return this.registry[index];
    },

    getFavorites() {
        const favIds = Core.State.global.favorites;
        return this.registry.filter(u => favIds.includes(u.id));
    },

    getRecent() {
        const recentIds = Core.State.global.recent;
        return recentIds.map(id => this.getById(id)).filter(Boolean);
    }
};