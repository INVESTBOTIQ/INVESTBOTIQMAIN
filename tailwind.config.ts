import type { Config } from "tailwindcss";

export default {
  safelist: [
    'bg-background',
    'text-foreground',
    'border-border',
    'bg-card',
    'text-card-foreground',
    'bg-popover',
    'text-popover-foreground',
    'bg-primary',
    'text-primary-foreground',
    'bg-secondary',
    'text-secondary-foreground',
    'bg-muted',
    'text-muted-foreground',
    'bg-accent',
    'text-accent-foreground',
    'bg-destructive',
    'text-destructive-foreground',
    'border-input',
    'ring-ring',
    'bg-sidebar',
    'text-sidebar-foreground',
    'border-sidebar-border',
    'bg-investbotiq-primary',
    'bg-investbotiq-secondary',
    'bg-investbotiq-accent',
    'bg-investbotiq-light',
    'bg-investbotiq-dark',
  ],
  semanticTokens: {
    colors: {
      background: 'background',
      foreground: 'foreground',
      card: 'card',
      'card-foreground': 'card-foreground',
      popover: 'popover',
      'popover-foreground': 'popover-foreground',
      primary: 'primary',
      'primary-foreground': 'primary-foreground',
      secondary: 'secondary',
      'secondary-foreground': 'secondary-foreground',
      muted: 'muted',
      'muted-foreground': 'muted-foreground',
      accent: 'accent',
      'accent-foreground': 'accent-foreground',
      destructive: 'destructive',
      'destructive-foreground': 'destructive-foreground',
      border: 'border',
      input: 'input',
      ring: 'ring',
      sidebar: 'sidebar',
      'sidebar-foreground': 'sidebar-foreground',
      'sidebar-border': 'sidebar-border',
      'investbotiq-primary': 'investbotiq.primary',
      'investbotiq-secondary': 'investbotiq.secondary',
      'investbotiq-accent': 'investbotiq.accent',
      'investbotiq-light': 'investbotiq.light',
      'investbotiq-dark': 'investbotiq.dark',
    },
  },
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        investbotiq: {
          primary: '#3B82F6',
          secondary: '#6366F1',
          accent: '#8B5CF6',
          light: '#EEF2FF',
          dark: '#1E293B'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'], // Modern font voor Home
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
