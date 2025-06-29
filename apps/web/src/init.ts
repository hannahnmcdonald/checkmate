// Define `global` for environments where it's not defined
// Common issue for Vite, thought this usually is not needed for Webpack

window.global ||= window;