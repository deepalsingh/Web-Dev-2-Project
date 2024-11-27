/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '-1': '-0.05rem',
        '-2': '-0.1rem'
      }
    },
  },
  plugins: [],
};
