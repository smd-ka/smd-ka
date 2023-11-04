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
				corperate: '#E84C05',
				primary: '#F78861',
				'light-blue': '#7E93AE',
				'secondary-text': '#555555',
				lime: '#ccd4bf'
			}
		}
	},
	plugins: []
};
