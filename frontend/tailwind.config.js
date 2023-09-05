/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                '1': '0.5px',
            },
            borderRadius: {
                '5': '5px',
            },
            colors: {
                primary: '#106CCA',
                primary_hover: '#2a81e7',
                page_bg: '#F1F3F9',
                // secondary: '#4c946b',
                // secondary_hover: '#5dac7f'
            },
        },
    },
    plugins: [],
};
