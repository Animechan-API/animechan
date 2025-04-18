import { Heading, Link } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { useId } from "react";
import type { FAQPage, WithContext } from "schema-dts";
import { BMAC_LINK } from "~/constants/common";

const BMAC_CTA = (
	<Link href={BMAC_LINK} target="_blank" underline="always">
		Buy Me A Coffee
	</Link>
);

interface IFaq {
	question: string;
	answer: ReactNode;
	jsonLdAnswer?: string;
}

function generateFaqSchema(faqs: IFaq[]) {
	const mainEntity = faqs.map((faq) => ({
		"@type": "Question",
		name: faq.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: faq?.jsonLdAnswer || faq.answer,
		},
	}));
	const jsonLd: WithContext<FAQPage> = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		// @ts-ignore
		mainEntity,
	};
	return jsonLd;
}

export default function Faq() {
	const FAQs: IFaq[] = [
		{
			question: "What is Animechan API and what anime data does it provide?",
			answer:
				"Animechan is an anime quotes and information API service that provides developers with access to a vast curated collection of anime content. Our API delivers episode counts, detailed show summaries, character information, and memorable quotes from thousands of anime series. You can easily filter and search quotes by specific anime titles or character names, making it perfect for anime-focused applications and websites.",
		},
		{
			question: "Is Animechan API free to use? What are the pricing options?",
			answer:
				"Animechan offers both free and premium API access. The free tier includes essential features with standard rate limits for developers. Our premium version provides increased rate limits, priority access, and additional API endpoints through a dedicated API key. The premium features are designed for applications requiring higher usage limits and enhanced capabilities.",
		},
		{
			question: "How do I upgrade to Animechan Premium and get an API key?",
			answer: (
				<>
					To access Animechan Premium, simply subscribe to our monthly membership plan through our{" "}
					{BMAC_CTA} page. Once subscribed, we'll provide you with a unique API key for accessing
					premium endpoints and features. Please note that this is a recurring monthly subscription,
					not a one-time payment. Visit our{" "}
					<Link href="/get-premium" underline="always">
						/get-premium
					</Link>{" "}
					page for detailed pricing information and subscription benefits.
				</>
			),
			jsonLdAnswer:
				"To access Animechan Premium, simply subscribe to our monthly membership plan through our {BMAC_CTA} page. Once subscribed, we'll provide you with a unique API key for accessing premium endpoints and features. Please note that this is a recurring monthly subscription, not a one-time payment. Visit our /get-premium page for detailed pricing information and subscription benefits.",
		},
		{
			question: "What is Animechan's subscription cancellation policy?",
			answer: (
				<>
					You can cancel your Animechan Premium subscription at any time through your{" "}
					<span className="font-medium">“Buy Me A Coffee”</span> account settings. Upon
					cancellation, your premium API key access will be automatically revoked
				</>
			),
			jsonLdAnswer:
				"You can cancel your Animechan Premium subscription at any time through your “Buy Me A Coffee” account settings. Upon cancellation, your premium API key access will be automatically revoked",
		},
	];

	const jsonLd = generateFaqSchema(FAQs);

	return (
		<article className="flex flex-col space-y-10 mt-16 px-2">
			{/* Schema.org FAQ markup */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Heading as="h3">Frequently Asked Questions:</Heading>
			{FAQs.map(({ question, answer }) => (
				<section key={useId()}>
					<Heading as="h4" size="5" mb="2">
						{question}
					</Heading>
					<div>
						<p>{answer}</p>
					</div>
				</section>
			))}
		</article>
	);
}
