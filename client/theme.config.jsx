import Footer from "components/footer";
import Navbar from "components/navbar";

export default {
	darkMode: false,
	nextThemes: {
		defaultTheme: "dark",
	},
	navbar: {
		component: <Navbar isInDocsPage={true} />,
	},
	project: {
		link: "https://github.com/Animechan-API/animechan",
	},
	search: {
		component: null,
	},
	footer: {
		component: <Footer />,
	},
	editLink: {
		component: null,
	},
	feedback: {
		content: null,
	},
};
