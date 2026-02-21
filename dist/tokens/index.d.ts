declare const colors: {
    readonly bg: "#0a0a0f";
    readonly fg: "#f9fafb";
    readonly surface: {
        readonly 0: "#0a0a0f";
        readonly 50: "#0f0f18";
        readonly 100: "#141420";
        readonly 200: "#1a1a2e";
        readonly 300: "#24243a";
        readonly 400: "#2a2a4a";
    };
    readonly primary: {
        readonly DEFAULT: "#8b5cf6";
        readonly light: "#a78bfa";
        readonly dark: "#7c3aed";
    };
    readonly accent: {
        readonly DEFAULT: "#667eea";
        readonly light: "#8b9cf7";
        readonly dark: "#4c5fd4";
    };
    readonly glow: {
        readonly purple: "#764ba2";
        readonly pink: "#f093fb";
    };
    readonly success: "#10b981";
    readonly warning: "#f59e0b";
    readonly danger: "#f43f5e";
};
type MemelabColors = typeof colors;

export { type MemelabColors, colors };
