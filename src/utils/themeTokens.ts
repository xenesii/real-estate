/**
 * SHITJE PRONASH Design System Tokens
 * Single source of truth for colors, typography scale, radii, spacing, heights, and shadows.
 */

export const THEME_TOKENS = {
  colors: {
    // Primary Forest Green Palette
    forest: {
      950: '#0C1E14', // Deepest background / footer
      900: '#10241A', // Dark surface / hero overlay / top bar
      800: '#142C20', // Primary brand green / cards / buttons
      700: '#1A3E2C', // Hover green / accents
      600: '#234F37', // Active green borders
      500: '#2E6347', // Muted green
    },
    // Champagne Gold Accent Palette
    gold: {
      100: '#FAF5EC', // Lightest gold tint
      200: '#F4E7D0', // Subtle gold border
      300: '#EADBBE', // Medium gold border / badge
      400: '#DFBE89', // Highlight gold / icons
      500: '#C5A880', // Primary accent gold
      600: '#B89758', // Muted text gold
      700: '#947132', // High-contrast text gold
    },
    // Warm Ivory Canvas & Neutrals
    canvas: {
      base: '#FAF8F5', // Warm ivory body background
      elevated: '#FFFFFF', // Elevated white surface
      subtle: '#F4EFEA', // Light grey-cream section tint
      muted: '#ECE7DE', // Standard hairline divider
      borderHover: '#D5CEBF', // Border on hover
    },
    text: {
      primary: '#12291E', // High-contrast forest-tinted black
      secondary: '#4A5550', // Medium contrast descriptive text
      muted: '#737F78', // Low contrast metadata / timestamps
      inverse: '#FFFFFF', // Text on dark green
      gold: '#DFBE89', // Gold text on dark
    }
  },

  // Consistent Height Scale for Inputs & Buttons
  heights: {
    sm: '36px', // Compact UI (chips, small buttons)
    md: '42px', // Standard buttons, selector triggers, inputs
    lg: '48px', // Hero buttons, search inputs, large CTAs
  },

  // Standard Border Radius System
  radii: {
    xs: '6px',
    sm: '8px',   // Badges, small tags, sub-menus
    md: '12px',  // Inputs, buttons, controls
    lg: '16px',  // Standard cards, dropdown popovers
    xl: '20px',  // Main section containers, modals
    full: '9999px', // Circle buttons, avatar pills
  },

  // Strict Spacing Scale
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },

  // Container Max Widths
  containers: {
    content: '1240px', // Standard desktop grid width
    narrow: '880px',   // Concentrated forms, articles
    wide: '1440px',    // Header and full-width wrappers
  },

  // Shadows
  shadows: {
    subtle: '0 1px 3px 0 rgba(18, 41, 30, 0.04), 0 1px 2px -1px rgba(18, 41, 30, 0.02)',
    elevated: '0 4px 14px -2px rgba(18, 41, 30, 0.06), 0 2px 6px -1px rgba(18, 41, 30, 0.03)',
    hover: '0 16px 36px -8px rgba(18, 41, 30, 0.08), 0 4px 12px -2px rgba(18, 41, 30, 0.04)',
    popover: '0 20px 40px -8px rgba(18, 41, 30, 0.12), 0 6px 16px -2px rgba(18, 41, 30, 0.05)',
  }
} as const;
