/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00FF00',
        'terminal-amber': '#FFB000',
        'terminal-cyan': '#00FFFF',
        'terminal-bg': '#0A0E27',
        'terminal-bg-light': '#1A1E37',
        'matrix-green': '#00FF41',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
      },
      keyframes: {
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          'from, to': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        glow: {
          '0%, 100%': {
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
            opacity: '1'
          },
          '50%': {
            textShadow: '0 0 20px #00FF00, 0 0 30px #00FF00, 0 0 40px #00FF00',
            opacity: '0.8'
          }
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
      backgroundImage: {
        'terminal-gradient': 'radial-gradient(ellipse at center, #1A1E37 0%, #0A0E27 100%)',
        'matrix-gradient': 'linear-gradient(0deg, transparent, #00FF41 50%, transparent)',
      },
      boxShadow: {
        'terminal': '0 0 40px rgba(0, 255, 0, 0.1), inset 0 0 40px rgba(0, 255, 0, 0.05)',
        'neon-green': '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
        'neon-cyan': '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
      }
    },
  },
  plugins: [],
}