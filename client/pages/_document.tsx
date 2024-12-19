import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
					rel="stylesheet"
				/>
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5475485771562496"
					crossOrigin="anonymous"
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
