'use strict';

var plugin = require('tailwindcss/plugin');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var plugin__default = /*#__PURE__*/_interopDefault(plugin);

// src/preset/index.ts
var memelabPreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--ml-bg)",
          0: "var(--ml-surface-0)",
          50: "var(--ml-surface-50)",
          100: "var(--ml-surface-100)",
          200: "var(--ml-surface-200)",
          300: "var(--ml-surface-300)",
          400: "var(--ml-surface-400)"
        },
        primary: {
          DEFAULT: "var(--ml-primary)",
          light: "var(--ml-primary-light)",
          dark: "var(--ml-primary-dark)"
        },
        accent: {
          DEFAULT: "var(--ml-accent)",
          light: "var(--ml-accent-light)",
          dark: "var(--ml-accent-dark)"
        },
        glow: {
          purple: "var(--ml-glow-purple)",
          pink: "var(--ml-glow-pink)"
        },
        success: "var(--ml-success)",
        warning: "var(--ml-warning)",
        danger: "var(--ml-danger)"
      },
      fontFamily: {
        sans: ["var(--ml-font-sans)"]
      },
      borderRadius: {
        surface: "var(--ml-radius-md)"
      },
      boxShadow: {
        surface: "var(--ml-shadow-surface)",
        "surface-hover": "var(--ml-shadow-surface-hover)",
        glow: "var(--ml-shadow-glow)",
        "glow-lg": "var(--ml-shadow-glow-lg)",
        "glow-accent": "var(--ml-shadow-glow-accent)"
      },
      animation: {
        float: "ml-float 6s ease-in-out infinite",
        "float-delayed": "ml-float 6s ease-in-out 2s infinite",
        gradient: "ml-gradient 15s ease infinite",
        "pulse-glow": "ml-pulse-glow 2s ease-in-out infinite",
        "fade-up": "ml-fade-up 0.8s ease-out forwards",
        "fade-up-delayed": "ml-fade-up 0.8s ease-out 0.2s forwards",
        "modal-backdrop": "ml-modal-backdrop 140ms ease-out both",
        "modal-pop": "ml-modal-pop 160ms cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "ml-shimmer 2s ease-in-out infinite"
      },
      keyframes: {
        "ml-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "ml-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "ml-pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" }
        },
        "ml-fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "ml-modal-backdrop": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        "ml-modal-pop": {
          from: { opacity: "0", transform: "translateY(6px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        "ml-shimmer": {
          "0%": { transform: "translateX(-200%)" },
          "100%": { transform: "translateX(200%)" }
        }
      }
    }
  },
  plugins: [
    plugin__default.default(function({ addComponents }) {
      addComponents({
        ".glass": {
          borderRadius: "var(--ml-radius-md, 0.75rem)",
          background: "var(--ml-glass-bg, rgba(255, 255, 255, 0.05))",
          backdropFilter: "blur(var(--ml-glass-blur, 16px))",
          WebkitBackdropFilter: "blur(var(--ml-glass-blur, 16px))",
          boxShadow: "0 1px 3px rgba(0,0,0,0.35), inset 0 0 0 1px var(--ml-glass-border, rgba(255,255,255,0.1))"
        },
        ".surface": {
          borderRadius: "var(--ml-radius-md, 0.75rem)",
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "var(--ml-shadow-surface, 0 1px 3px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08))"
        },
        ".surface-hover": {
          transition: "box-shadow var(--ml-transition-fast, 150ms ease)",
          "&:hover": {
            boxShadow: "var(--ml-shadow-surface-hover, 0 10px 25px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.09))"
          }
        },
        ".text-gradient": {
          background: "linear-gradient(135deg, var(--ml-accent,#667eea) 0%, var(--ml-glow-purple,#764ba2) 50%, var(--ml-glow-pink,#f093fb) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        },
        ".animated-gradient": {
          background: "linear-gradient(270deg, var(--ml-accent,#667eea), var(--ml-glow-purple,#764ba2), var(--ml-glow-pink,#f093fb))",
          backgroundSize: "400% 400%",
          animation: "ml-gradient 15s ease infinite"
        }
      });
    })
  ]
};
var preset_default = memelabPreset;

module.exports = preset_default;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map