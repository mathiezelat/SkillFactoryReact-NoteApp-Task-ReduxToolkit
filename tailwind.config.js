/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'move-bg': {
					to: {
						backgroundPosition: '1000% 50%',
					},
				},
			},
			animation: {
				'move-bg': 'move-bg 60s infinite linear alternate',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
