import {
	ArrowUpIcon,
	InfoCircledIcon,
	LockClosedIcon,
	RocketIcon,
	ThickArrowRightIcon,
} from "@radix-ui/react-icons";
import { Badge, Callout, Flex, IconButton, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { useId } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import Layout from "~/components/Layout";
import Resource from "~/components/resource";

const API_ORIGIN = "https://animechan.io/api/v1";

const AUTH_CODE_SAMPLE = `
		fetch('${API_ORIGIN}/quotes/anime?title=naruto', {
			headers: {
				x-api-key: 'YOUR_API_KEY',
			}
		})
		.then((response) => response.json())
		.then((quotes) => console.log(quotes));

`;

export const API_GUIDES = [
	// Free Endpoints:
	{
		heading: "Get a random quote",
		link: "random-quote",
		isPremium: false,
		codeSample: {
			request: `fetch("${API_ORIGIN}/random")
          .then((response) => response.json())
          .then((quote) => console.log(quote));`,
			response: `{ anime: "", character: "", quote: "" }`,
		},
	},
	{
		heading: "Get 10 random quotes",
		link: "10-quotes",
		isPremium: false,
		codeSample: {
			request: `fetch("${API_ORIGIN}/quotes")
          .then((response) => response.json())
          .then((quotes) => console.log(quotes));`,
			response: `[{ anime: "", character: "", quote: "" }, // 9 more]`,
		},
	},

	// Premium Endpoints:
	{
		heading: "Get a random quote by anime title",
		link: "random-quote-by-anime",
		isPremium: true,
		isNewlyAdded: true,
		codeSample: {
			request: `fetch("${API_ORIGIN}/random/anime?title=naruto")
          .then((response) => response.json())
          .then((quote) => console.log(quote));`,
			response: `{ anime: "Naruto", character: "", quote: "" }`,
		},
	},
	{
		heading: "Get a random quote by anime character",
		link: "random-quote-by-character",
		isPremium: true,
		isNewlyAdded: true,
		codeSample: {
			request: `fetch("${API_ORIGIN}/random/character?name=saitama")
          .then((response) => response.json())
          .then((quote) => console.log(quote));`,
			response: `{ anime: "", character: "", quote: "" }`,
		},
	},
	{
		heading: "Get 10 quotes by anime title",
		link: "10quotes-by-anime",
		isPremium: true,
		codeSample: {
			request: `fetch("${API_ORIGIN}/quotes/anime?title=naruto")
          .then((response) => response.json())
          .then((quotes) => console.log(quotes));`,
			response: `[{ anime: "Naruto", character: "", quote: "" }, // 9 more]`,
		},
	},
	{
		heading: "Get 10 quotes by anime character",
		link: "10quotes-by-character",
		isPremium: true,
		codeSample: {
			request: `fetch("${API_ORIGIN}/quotes/character?name=saitama")
          .then((response) => response.json())
          .then((quotes) => console.log(quotes));`,
			response: `[{ anime: "", character: "Saitama", quote: "" }, // 9 more]`,
		},
	},
	{
		heading: "Pagination",
		isPremium: true,
		subHeading:
			"Pagination works only on the query endpoints. Default pagination count is 10 quotes per page.",
		link: "pagination",
		codeSample: {
			request: `fetch('${API_ORIGIN}/quotes/anime?title=naruto&page=2')
      .then(response => response.json())
      .then(quotes => console.log(quotes))

      // works on character queries too 👇
      // https://animechan.io/api/quotes/character?name=luffy&page=2`,
			response: `[{ anime: "Naruto", character: "", quote: "" }, // 9 more]`,
		},
	},
];

export default function Guide() {
	const metaInfo = {
		title: "Animechan – Guide",
		description: "Documentation for all available API endpoints.",
		image: "https://animechan.io/image/guide.jpeg",
	};

	const UniqueKey = useId();

	return (
		<Layout metaInfo={metaInfo}>
			<div className="container relative lg:mx-auto px-2 max-w-4xl mt-10" id="docs">
				<div>
					<h1 className="text-4xl font-bold">Docs</h1>
					<h2 className="text-lg my-4">
						Below you'll find examples using the standard{" "}
						<a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a> but
						you can use any other http library out there.
					</h2>

					<div className="relative inline-block">
						<Callout.Root size="1" color="blue">
							<Callout.Icon>
								<InfoCircledIcon />
							</Callout.Icon>
							<Callout.Text weight="medium">
								All the free API endpoints has a default Rate Limit of 20 requests per hour only.
							</Callout.Text>
						</Callout.Root>

						<Callout.Root size="1" mt="2">
							<Callout.Icon>
								<RocketIcon />
							</Callout.Icon>
							<Callout.Text weight="medium">
								Get Premium API access for higher rate limits with other better features.
							</Callout.Text>
						</Callout.Root>
					</div>
				</div>

				<div className="my-10">
					<h1 className="text-2xl font-bold">API Endpoints:</h1>
					<Text as="p" my="4">
						Below titles with <LockClosedIcon className="inline-block mb-[4px]" color="green" /> are
						Premium endpoints that requires a API key to use.
					</Text>
					<Flex direction="column" gapY="3" className="text-green-800">
						<a href="#auth">
							<ThickArrowRightIcon className="inline-block" /> Authentication
						</a>
						{API_GUIDES.map((guide) => (
							<a
								href={`#${guide.link}`}
								className={clsx({
									"opacity-60": guide.isPremium,
								})}
								key={UniqueKey}
							>
								<ThickArrowRightIcon className="inline-block" /> {guide.heading}
								{guide.isNewlyAdded && (
									<Badge color="orange" mx="2">
										New
									</Badge>
								)}
								{guide.isPremium && <LockClosedIcon className="inline-block mb-[2px]" />}
							</a>
						))}
					</Flex>
				</div>
				<hr />

				<div className="my-10 space-y-20">
					<div>
						<h2 className="lg:text-2xl text-xl font-bold mb-1">
							<ThickArrowRightIcon className="inline-block mb-1" /> Authentication
						</h2>
						<Text>
							Some of the Premium endpoints require an API key for authentication. The API key needs
							to be passed in the request header as{" "}
							<code className="text-green-800">"x-api-key"</code>. Here is an example:
						</Text>
						<div className="text-sm mt-2">
							<CopyBlock language="javascript" text={AUTH_CODE_SAMPLE} theme={dracula} />
						</div>
					</div>

					{API_GUIDES.map((guide) => (
						<Resource {...guide} key={guide.heading} />
					))}
				</div>

				<div className="text-center">
					<a href="#docs">
						<IconButton radius="full" mx="auto">
							<ArrowUpIcon />
						</IconButton>
						<span className="inline-block text-sm mt-[6px] ml-2">Go to top</span>
					</a>
				</div>
			</div>
		</Layout>
	);
}
