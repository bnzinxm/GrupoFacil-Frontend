// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',  // Substitua pela sua cor de fundo principal do dashboard
        secondary: '#4B5563', // Cor secundária
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1E293B",   // Sua cor principal
          "secondary": "#4B5563", // Cor secundária
          "accent": "#D1D5DB",    // Cor de destaque
          "neutral": "#2F3B47",   // Cor neutra
          "base-100": "#F4F5F7",  // Cor de fundo principal
          "base-200": "#E5E7EB",  // Cor de fundo secundária
          "base-300": "#D1D5DB",  // Cor de fundo terciária
        },
      },
    ],
  },
}