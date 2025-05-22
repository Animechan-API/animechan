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
			question: "Is Animechan API free to use? What are the usage limits?",
			answer:
				"Animechan API is completely free to use with all endpoints accessible to everyone. The free tier allows 5 API requests per hour with a 1-hour block if the limit is exceeded. For developers and applications requiring higher usage limits, we offer a supporter tier that provides 1000 API requests per hour with only a 5-minute block if the limit is exceeded. Your support helps keep Animechan running for the entire community.",
		},
		{
			question: "How do I get an API key for higher usage limits?",
			answer: (
				<>
					To get an API key with higher usage limits, you can become a supporter by subscribing to our monthly
					membership plan through our {BMAC_CTA} page. Once subscribed, we'll provide you with a unique API key
					that unlocks 1000 requests per hour. Please note that this is a recurring monthly subscription,
					not a one-time payment. Visit our{" "}
					<Link href="/support" underline="always">
						/support
					</Link>{" "}
					page for detailed information about the benefits of supporting Animechan.
				</>
			),
			jsonLdAnswer:
				"To get an API key with higher usage limits, you can become a supporter by subscribing to our monthly membership plan through our Buy Me A Coffee page. Once subscribed, we'll provide you with a unique API key that unlocks 1000 requests per hour. Please note that this is a recurring monthly subscription, not a one-time payment. Visit our /support page for detailed information about the benefits of supporting Animechan.",
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
