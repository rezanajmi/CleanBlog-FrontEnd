/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /^bg-(red|blue|green|yellow|orange|teal|purple|pink|gray|indigo)-(50|100|200|300|400|500|600|700|800|900)$/,
        variants: ['hover']
    },
    {
      pattern:
        /^border-(red|blue|green|yellow|orange|teal|purple|pink|gray|indigo)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern: /^(m|mx|my|ml|mr)-(1|2|3|4|5|6|7|8|9)$/,
    },
    "list-disc",
    "max-w-lg",
    "min-w-md",
  ],
};
