/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-whity': '#e6e6e6',
				whity: '#f2f2f2',
				dark: '#141414'
			},
			backgroundImage: {
				header: 'linear-gradient(45deg,#202020,#3a3a3a)'
			},
			boxShadow: {
				searchResults: '0 1px 3px rgba(0,0,0,0.1)'
			}
		}
	},
	plugins: []
}
