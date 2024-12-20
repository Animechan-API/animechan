import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
					rel="stylesheet"
				/>
				<script async src="https://cdn.splitbee.io/sb.js" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
