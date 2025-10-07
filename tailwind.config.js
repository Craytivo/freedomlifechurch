module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.02em' }],
      },
      fontFamily: {
        // Primary font families inspired by modern church websites
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        // Primary brand colors - Based on FLC logo
        primary: {
          50: '#1a1a1a',    // Lightest dark
          100: '#171717',   // Very dark gray
          200: '#141414',   // Darker gray
          300: '#111111',   // Dark gray
          400: '#0e0e0e',   // Very dark
          500: '#0b0b0b',   // Main brand dark
          600: '#080808',   // Darker
          700: '#050505',   // Much darker
          800: '#030303',   // Almost black
          900: '#000000',   // Pure black (logo background)
        },
        // FLC Gold - The signature orange/gold from the logo
        flc: {
          50: '#fff9f0',    // Very light cream
          100: '#fef2e0',   // Light cream
          200: '#fde4c1',   // Light gold
          300: '#fbd59e',   // Medium light gold
          400: '#f4c574',   // Light version of main gold
          500: '#eba73e',   // MAIN FLC gold color
          600: '#d18b1a',   // Darker gold
          700: '#b5720f',   // Dark gold
          800: '#935c0c',   // Very dark gold
          900: '#7a4b0e',   // Darkest gold
        },
        // Brand whites and off-whites
        brand: {
          white: '#ffffff',     // Pure white (logo text)
          cream: '#fefbf7',     // Warm off-white
          light: '#faf8f5',     // Light warm background
          pearl: '#f7f5f3',     // Pearl white
        },
        // Supporting colors for church content
        church: {
          // Primary text colors
          dark: '#1f2937',      // Main dark text
          gray: '#4b5563',      // Secondary text
          light: '#9ca3af',     // Light text
          // Background variations
          bg: '#f9fafb',        // Main background
          section: '#f3f4f6',   // Section backgrounds
        },
        // Functional colors
        accent: {
          // Spiritual/Prayer (deep blue)
          spirit: '#1e40af',
          // Growth/Life (forest green)
          life: '#16a34a',
          // Community/Welcome (warm red)
          community: '#dc2626',
          // Hope/Joy (bright blue)
          hope: '#0ea5e9',
          // Success states
          success: '#10b981',
          // Warning states  
          warning: '#f59e0b',
          // Error states
          error: '#ef4444',
        },
        // Extended grays for design flexibility
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
    },
  },
  variants: {},
  plugins: [],
}
