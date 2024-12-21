import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "~/components/footer";
import HelloBar from "~/components/hello-bar";
import Navbar from "~/components/navbar";

interface MetaInformation {
	title: string;
	description: string;
	image: string;
	type: string;
}

interface Props {
	children: React.ReactNode;
	metaInfo?: Partial<MetaInformation>;
}

export default function Layout({ children, metaInfo }: Props) {
	const router = useRouter();

	const host = "https://animechan.io";

	const currentPath = host + router.asPath;

	const meta: MetaInformation = {
		title: "Animechan – Anime Quotes & Information API for Developers & Fans",
		description:
			"Animechan is the ultimate API for curated anime quotes and comprehensive anime information. Explore character details, anime series data, and inspiring quotes from your favorite shows. Perfect for developers, anime enthusiasts, and fans worldwide!",
		image: `${host}/image/home.jpeg`,
		type: "website",
		...metaInfo,
	};

	return (
		<div>
			<Head>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta property="og:url" content={currentPath} />
				<link rel="canonical" href={currentPath} />
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="Animechan" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />
			</Head>
			<HelloBar />
			<Navbar />
			<main className="container relative max-w-4xl px-2 py-10 lg:mx-auto">{children}</main>
			<Footer />
		</div>
	);
}
