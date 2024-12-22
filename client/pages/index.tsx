import { RocketIcon } from "@radix-ui/react-icons";
import { Button, Callout, Heading, Section, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Element } from "react-scroll";
import stringifyObject from "stringify-object";
import CodeBlock from "~/components/codeblock";
import Faq from "~/components/faq";
import Layout from "~/components/Layout";
import { SPLITBEE_EVENTS } from "~/constants/common";
import type { CodeBlock as CodeBlockType } from "~/types";

export default function Home() {
	const requestCodeBlock: CodeBlockType = {
		language: "javascript",
		snippet: `fetch('https://animechan.io/api/v1/quotes/random')
    .then(response => response.json())
    .then(quote => console.log(quote))`,
	};

	const exampleResponse = {
		status: "success",
		data: {
			content:
				"The final door is about to open! And I am the one opening it! Then the world that we know of will come to an end! This world of insatiable desires will end!",
			anime: {
				id: 575,
				name: "Mobile Suit Gundam SEED",
				altName: "Kidou Senshi Gundam SEED",
			},
			character: {
				id: 1486,
				name: "Rau Le Creuset",
			},
		},
	};

	const responseCodeBlock: CodeBlockType = {
		language: "javascript",
		snippet: stringifyObject(exampleResponse),
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
					<h2 className="mt-4 text-lg lg:max-w-2xl lg:mx-auto">
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
				<div className="relative py-10">
					<Text size="6" weight="medium" as="p">
						Example Usage:
					</Text>

					<div className="relative inline-block my-3">
						<Callout.Root size="1" color="blue">
							<Callout.Text weight="medium">
								The below piece of code to returns a random quote.
							</Callout.Text>
						</Callout.Root>
					</div>

					<CodeBlock {...requestCodeBlock} />
					<div className="mt-2">
						<CodeBlock {...responseCodeBlock} />
					</div>
				</div>
			</Element>

			<Faq />
		</Layout>
	);
}
