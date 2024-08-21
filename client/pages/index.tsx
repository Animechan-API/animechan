import { PlayIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button, Callout, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Element } from "react-scroll";
import stringifyObject from "stringify-object";
import CodeBlock from "~/components/codeblock";
import Layout from "~/components/Layout";
import type { CodeBlock as CodeBlockType, Quote } from "~/types";

export default function Home() {
	const [randomQuote, setRandomQuote] = useState<Quote>();
	const [fetching, setFetching] = useState<boolean>(false);
	const [clickCount, setClickCount] = useState<number>(0);

	const requestCodeBlock: CodeBlockType = {
		language: "javascript",
		snippet: `fetch('https://animechan.io/api/random')
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
				<h1 className="lg:text-7xl text-6xl font-display font-bold text-shadow-md">
					Anime-chan
				</h1>
				<div className="py-5">
					<h2 className="text-2xl">
						A restful API serving quality anime quotes
					</h2>
				</div>

				<Link href="/docs">
					<Button variant="surface" size="3" mr="4">
						Get Started
					</Button>
				</Link>

				<Link href="/get-premium">
					<Button size="3">
						Get Premium API <RocketIcon />
					</Button>
				</Link>
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
						loading={fetching}
						disabled={fetching}
						onClick={handleClick}
						my="2"
					>
						<PlayIcon />
						Run code
					</Button>

					<CodeBlock {...responseCodeBlock} />

					{randomQuote && (
						<p className="mt-3 text-md">
							Here is {clickCount > 1 ? "another" : "a"} random quote by -{" "}
							<span className="font-semibold">
								{randomQuote?.character}{" "}
								<span className="font-normal">from</span> {randomQuote?.anime}{" "}
								😃 🎉
							</span>
						</p>
					)}
				</div>
			</Element>
		</Layout>
	);
}
