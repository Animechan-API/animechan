import Link from "next/link";
import React, { useId } from "react";
import Layout from "~/components/Layout";

const faqs = [
	{
		question: "What is Animechan?",
		answer:
			"Animechan is a freemium API service that provides anime quotes. You can use our API to get quotes from various anime characters and series.",
	},
	{
		question: "How do I subscribe to the premium plan?",
		answer: (
			<>
				Visit our{" "}
				<Link href="/get-premium" className="underline text-green-700">
					Subscription Page
				</Link>{" "}
				and choose the premium plan for $5/month. Follow the instructions to set up your payment
				through Stripe.
			</>
		),
	},
	{
		question: "How do I cancel my subscription?",
		answer:
			'You can cancel your subscription at any time by logging into your account, and clicking the "Cancel my subscription" button on the Billing page.',
	},
	{
		question: "What is the rate limit for the free plan?",
		answer:
			"The free plan has a rate limit of 30 requests per day. If you need more requests, you can subscribe to the premium plan which has a rate limit of 24000 requests per day.",
	},
];

export default function Support() {
	const keyId = useId();
	return (
		<Layout>
			<div className="max-w-4xl mx-auto text-[#423e62] mt-10">
				<div>
					<h1 className="text-2xl font-medium">Welcome to Animechan Support</h1>
					<p className="mt-5">
						Thank you for choosing our freemium API service for anime quotes. We are here to help
						you make the most of our service. If you have any questions, feedback, or issues, please
						feel free to contact us at{" "}
						<a href="mailto:support@animechan.io" className="underline text-green-700">
							support@animechan.io
						</a>
						.
					</p>
				</div>

				<div className="mt-10">
					<h2 className="text-2xl font-medium">Frequently Asked Questions</h2>
					<div className="grid grid-cols-2 mt-4 gap-5">
						{faqs.map((faq) => (
							<div className="flex flex-col space-y-2" key={keyId}>
								<h2 className="font-medium">{faq.question}</h2>
								<p style={{ fontSize: "15px" }}>{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
