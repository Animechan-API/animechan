import { PlayIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button, Callout, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { Element } from "react-scroll";
import stringifyObject from "stringify-object";
import CodeBlock from "~/components/codeblock";
import Layout from "~/components/Layout";
import { SPLITBEE_EVENTS } from "~/constants/common";
import type { CodeBlock as CodeBlockType, Quote } from "~/types";

export default function Home() {
	const [randomQuote, setRandomQuote] = useState<Quote>();
	const [fetching, setFetching] = useState<boolean>(false);
	const [clickCount, setClickCount] = useState<number>(0);

	const requestCodeBlock: CodeBlockType = {
		language: "javascript",
		snippet: `fetch('https://animechan.io/api/v1/quotes/random')
    .then(response => response.json())
    .then(quote => console.log(quote))`,
	};

	const responseCodeBlock: CodeBlockType = {
		language: "javascript",
		snippet: stringifyObject(randomQuote),
	};

	const handleClick = () => {
		setFetching(true);
		setClickCount(clickCount + 1);
		setRandomQuote(null);

		fetch("/api/v1/quotes/random")
			.then((response) => response.json())
			.then((json) => {
				setFetching(false);
				setRandomQuote(json);
			});
	};

	return (
		<Layout>
			<Section className="text-center">
				<Image src="/logo.png" width="200" height="200" priority />
				<div className="lg:text-7xl text-6xl font-display font-bold text-shadow-md">Animechan</div>
				<div className="py-5 px-4">
					<Heading as="h1">
						Your Ultimate API for Anime Quotes & Comprehensive Anime Information
					</Heading>
					<h2 className="mt-4 text-lg lg:max-w-2xl lg:mx-auto text-gray-800">
						Explore a rich collection of anime quotes, character details, and series information.
						Perfect for developers, fans, and enthusiasts.
					</h2>
				</div>

				<a href="/docs">
					<Button variant="surface" size="3" mr="4">
						Get Started
					</Button>
				</a>

				<a data-splitbee-event={SPLITBEE_EVENTS.PREMIUM_CTA} href="/get-premium">
					<Button size="3">
						Get Premium API <RocketIcon />
					</Button>
				</a>
			</Section>

			<Element name="tryThis">
				<div className="container relative max-w-4xl px-2 py-10 lg:mx-auto">
					<Text size="6" weight="medium" as="p">
						Try here:
					</Text>

					<div className="relative inline-block my-3">
						<Callout.Root size="1" color="blue">
							<Callout.Icon>
								<PlayIcon />
							</Callout.Icon>
							<Callout.Text weight="medium">
								Run the below piece of code to get a random quote.
							</Callout.Text>
						</Callout.Root>
					</div>

					<CodeBlock {...requestCodeBlock} />

					<Button
						data-splitbee-event={SPLITBEE_EVENTS.RUN_CODE}
						loading={fetching}
						disabled={fetching}
						onClick={handleClick}
						my="2"
					>
						<PlayIcon />
						Run code
					</Button>

					<CodeBlock {...responseCodeBlock} />
				</div>
			</Element>
		</Layout>
	);
}
