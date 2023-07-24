/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['roboto', 'sans-serif']
		},
		extend: {
			colors: {
				platinum: '#D7D7D7',
				cerulean: '#0075A2',
				'curulean-dark': '#005A7F',
				persimmon: '#F45D01',
				purple: '#982649',
				'dark-green': '#002626'
			}
		}
	},
	plugins: []
};
