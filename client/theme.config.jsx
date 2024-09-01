import { Text } from "@radix-ui/themes";
import Footer from "components/footer";

export default {
	nextThemes: {
		defaultTheme: "light",
	},
	logo: (
		<Text weight="medium" className="cursor-default" color="green">
			Animechan
		</Text>
	),
	project: {
		link: "https://github.com/Animechan-API/animechan",
	},
	search: {
		component: null,
	},
	footer: {
		component: (
			<Footer></Footer>
		)
	}
};
