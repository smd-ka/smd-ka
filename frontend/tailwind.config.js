/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['roboto', 'sans-serif']
		},
		extend: {
			colors: {
				'primary-text': '#212427',
				corperate: '#',
				primary: '#F78861',
				'light-blue': '#7E93AE'
			}
		}
	},
	plugins: []
};
