/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#E6F3E8",
					200: "#CCE7D2",
					300: "#B3DBBC",
					400: "#99CFA6",
					500: "#8FBE9A",
					600: "#7AA486",
					700: "#658A72",
					800: "#506F5E",
					900: "#3B554A",
				},
				"custom-green": {
					100: "#ECF7DA",
					200: "#D8EF9D",
					300: "#C4E75F",
					400: "#AFDF22",
					500: "#8FC440", // Base color
					600: "#73A737",
					700: "#587B2C",
					800: "#3D5E21",
					900: "#233D17",
				},
			},
			keyframes: {
				upDown: {
					"0%, 100%": {
						top: "0",
					},
					"50%": {
						top: "-20px",
					},
				},
			},
			animation: {
				upDown: "upDown 3s linear infinite",
			},
			fontFamily: {
				"new-amsterdam": ['"New Amsterdam"', "sans-serif"],
				Roboto: ["Roboto", "sans-serif"],
				Changa: ["Changa", "sans-serif"],
			},
		},
	},
	plugins: [],
};
