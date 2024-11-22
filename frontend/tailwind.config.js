/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['roboto', 'sans-serif'],
			anton: ['Anton', 'sans-serif'],
			merriweather: ['Merriweather Sans Variable', 'sans-serif'],
			bebas: ['Bebas Neue', 'sans-serif'],
			zcool: ['ZCOOL QingKe HuangYou', 'sans-serif'],
			mokoto: ['Mokoto', 'sans-serif'],
			mincho: ['Shippori Mincho B1', 'serif'],
			caveat: ['Caveat Variable', 'cursive'],
			gagalin: ['Gagalin', 'sans-serif']
		},
		extend: {
			colors: {
				'primary-text': '#212427',
				primary: '#E84C05',
				'old-primary': '#F78861',
				'light-blue': '#7E93AE',
				'secondary-text': '#555555',
				lime: '#ccd4bf',
				lilac: '#D0B0D4',
				grey: '#323232',
				'background-gray': '#EEEEEE'
			}
		}
	},
	plugins: []
};
