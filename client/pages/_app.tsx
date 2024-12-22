import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Router from "next/router";
import "~/styles/globals.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
	NProgress.done();
});

Router.events.on("routeChangeError", () => {
	NProgress.done();
});

export default function MyApp({ Component, pageProps }) {
	return (
		<Theme
			accentColor="amber"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			appearance="dark"
		>
			<Component {...pageProps} />
		</Theme>
	);
}
