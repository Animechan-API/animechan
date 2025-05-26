import {
	CheckboxIcon,
	RocketIcon,
	HeartFilledIcon,
	StackIcon,
	GlobeIcon,
	EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Flex, Link, Section, Strong, Text } from "@radix-ui/themes";
import Layout from "~/components/Layout";
import { BMAC_LINK } from "~/constants/common";

export default function SupportAnimechan() {
	return (
		<Layout>
			<div className="mx-4 lg:mx-0">
				<Section className="mb-10">
					<Flex direction="column" gap="4">
						<Text size="8" weight="bold" className="text-center">
							Help Keep Animechan Free{" "}
							<HeartFilledIcon className="inline-block mb-1 text-red-500" />
						</Text>
						<Text size="4" className="text-center max-w-3xl mx-auto">
							Animechan is a passion project built to serve the anime community with high-quality
							data. All API endpoints are free for everyone, but maintaining this service comes with
							real costs.
						</Text>
					</Flex>
				</Section>

				<Section className="mb-10">
					<Text size="6" weight="bold" as="div" className="mb-6">
						Support Options
					</Text>
					<Flex
						justify="center"
						direction={{
							xl: "row",
							md: "row",
							initial: "column",
						}}
						align={{
							xl: "start",
							md: "start",
							initial: "stretch",
						}}
						gapX={{
							lg: "8",
							md: "8",
							initial: "0",
						}}
						gapY={{
							lg: "0",
							md: "0",
							initial: "8",
						}}
					>
						<FreePricingCard />
						<PremiumPricingCard />
					</Flex>
				</Section>

				<Section className="mt-10">
					<Text size="6" weight="bold" as="div" className="mb-4">
						📬 A Message from the Developer:
					</Text>
					<Text as="p">
						Hey there! I'm a solo developer who built Animechan as a passion project for the anime
						community. I'm committed to keeping the API free and open-source for everyone to use,
						but the reality is that maintaining this service comes with real costs that I cover
						monthly:
					</Text>
					<ul className="list-disc pl-6 space-y-4 my-4">
						<li>
							<Strong>Server Costs</Strong>: Reliable servers to handle thousands of API requests
							daily with minimal downtime. This ensures that your applications using Animechan
							remain responsive and reliable.
						</li>
						<li>
							<Strong>Domain & Hosting</Strong>: Annual domain renewals and hosting services to
							keep the API accessible worldwide. This includes CDN services for faster global
							access.
						</li>
						<li>
							<Strong>Email Services</Strong>: Transactional emails for API key delivery and user
							communications. These systems help me stay in touch with the community and deliver
							API keys securely.
						</li>
						<li>
							<Strong>Development Time</Strong>: Hours spent maintaining, updating, and expanding
							the API and its database. This includes adding new anime quotes, fixing bugs, and
							implementing new features requested by the community.
						</li>
					</ul>
					<Text as="p" className="mt-2">
						Your support through premium subscriptions helps cover these expenses and ensures
						Animechan can continue to be a reliable resource for developers and anime enthusiasts
						alike. Every subscription, no matter how small, makes a significant difference!
					</Text>
					<Text as="p" weight="bold" className="mt-2">
						Thank you for being part of the Animechan community! ❤️
					</Text>
				</Section>
			</div>
		</Layout>
	);
}

export const FreePricingCard = () => {
	return (
		<div className="rounded-xl p-8 text-center bg-[#38394f] max-w-sm border border-gray-600 text-white">
			<div className="font-semibold rounded mb-2 text-xl text-white">Free Tier</div>
			<p className="text-sm mt-5 mb-10 text-gray-300">Available for everyone in the community.</p>

			<Text as="p" className="text-left text-white" ml="4" mb="4" weight="bold">
				FEATURES:
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-gray-400">✓</span> No API key required
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-gray-400">✓</span> 5 API requests per hour
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-gray-400">✓</span> 1-hour block if limit exceeded
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-gray-400">✓</span> Access to all API endpoints
				</Text>
			</Flex>
		</div>
	);
};

export const PremiumPricingCard = () => {
	return (
		<div className="relative overflow-hidden rounded-xl p-8 text-center max-w-sm bg-black text-white border border-yellow-500 shadow-lg shadow-yellow-500/20">
			<div className="absolute top-0 right-0">
				<div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
					PREMIUM
				</div>
			</div>
			<div className="font-semibold rounded mb-2 text-2xl py-2 text-yellow-500">
				Supporter Tier <HeartFilledIcon className="inline-block mb-1 text-red-500" />
			</div>
			<p className="mt-3 mb-5 text-gray-300">
				Your support helps keep Animechan running for everyone while giving you enhanced API access.
			</p>

			<div className="mb-6">
				<a
					href={BMAC_LINK}
					target="_blank"
					rel="noreferrer"
					className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors duration-200"
				>
					Support Animechan
				</a>
				<div className="text-xs text-gray-400 mt-3 space-y-1">
					<p>1. Choose any monthly subscription that fits your budget</p>
					<p>2. Receive your premium API key via email</p>
					<p>3. Enjoy premium benefits! <Link href="/docs/auth" className="text-yellow-500 hover:underline">/docs/auth</Link></p>
				</div>
			</div>

			<Text as="p" className="text-left text-yellow-500" ml="4" mb="4" weight="bold">
				✨ BENEFITS:
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> Premium API key provided
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> 1000 API requests per hour
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> 5-minute block if limit exceeded
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> Access to all API endpoints
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> Frequently updated database
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> Access to upcoming API features
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> Programming help in the
					supporters-only Discord channel
				</Text>
				<Text className="flex items-start gap-2 text-gray-300">
					<span className="text-yellow-500 font-bold">✓</span> Satisfaction of helping keep
					Animechan free for the community
				</Text>
			</Flex>
		</div>
	);
};
