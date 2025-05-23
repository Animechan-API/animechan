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

				<div>
					<Section>
						<Text size="6" weight="bold" as="div">
							How to Support Animechan:
						</Text>
						<div className="grid lg:grid-cols-3 gap-10 lg:gap-6 mt-10">
							<div id="step-1">
								<Text size="5" weight="bold" className="bg-yellow-400 text-gray-800 px-4 py-2">
									1
								</Text>
								<Text className="inline-block mt-3 lg:mt-4">
									Visit our <Strong>Buy Me A Coffee</Strong> page and choose any monthly
									subscription that fits your budget. Your support helps keep our servers running!
								</Text>
								<div className="mt-4">
									<a href={BMAC_LINK} target="_blank" rel="noreferrer">
										<img
											src="https://img.buymeacoffee.com/button-api/?text=Support Animechan&emoji=💖&slug=rocktimsaikia&button_colour=BD5FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
											alt="Support Animechan"
										/>
									</a>
								</div>
							</div>
							<div id="step-2">
								<Text size="5" weight="bold" className="bg-yellow-400 text-gray-800 px-4 py-2">
									2
								</Text>
								<Text className="inline-block mt-3 lg:mt-4">
									As a thank you for your support, you'll receive a premium API key sent to the
									email linked to your <Strong>Buy Me A Coffee</Strong> account.
								</Text>
							</div>
							<div id="step-3">
								<Text size="5" weight="bold" className="bg-yellow-400 text-gray-800 px-4 py-2">
									3
								</Text>
								<Text className="inline-block mt-3 lg:mt-4">
									That's it! ✅ Your support keeps Animechan alive, and you get premium API access
									with higher limits. Learn more here: <Link href="/docs/auth">/docs/auth</Link>.
								</Text>
							</div>
						</div>
					</Section>

					<Flex
						direction="column"
						gapY="3"
						mt="3"
						className="bg-[#38394f] p-6 rounded-xl border border-gray-600"
					>
						<Text size="6" weight="bold" as="div">
							💌 A Message from the Developer:
						</Text>
						<Text as="p">
							Hey there! I'm a solo developer who built Animechan as a passion project for the anime
							community. I'm committed to keeping the API free and open-source for everyone to
							use, but the reality is that maintaining this service comes with real costs that I cover
							monthly:
						</Text>
						<ul className="list-disc pl-6 space-y-4 my-4">
							<li>
								<Strong>Server Costs</Strong>: Reliable servers to handle thousands of API requests daily
								with minimal downtime. This ensures that your applications using Animechan remain
								responsive and reliable.
							</li>
							<li>
								<Strong>Domain & Hosting</Strong>: Annual domain renewals and hosting services to keep
								the API accessible worldwide. This includes CDN services for faster global access.
							</li>
							<li>
								<Strong>Email Services</Strong>: Transactional emails for API key delivery and user
								communications. These systems help me stay in touch with the community and deliver
								API keys securely.
							</li>
							<li>
								<Strong>Development Time</Strong>: Hours spent maintaining, updating, and expanding the
								API and its database. This includes adding new anime quotes, fixing bugs, and
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
					</Flex>
				</div>
			</div>
		</Layout>
	);
}

export const FreePricingCard = () => {
	return (
		<div className="rounded-xl p-8 text-center bg-[#38394f] max-w-sm border border-gray-600">
			<div className="font-semibold rounded mb-2 text-xl">Free Tier</div>
			<p className="text-sm mt-5 mb-10">Available for everyone in the community.</p>

			<Text as="p" className="text-left" ml="4" mb="4" weight="bold">
				FEATURES:
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> No API key required
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 5 API requests per hour
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 1-hour block if limit exceeded
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Access to all API endpoints
				</Text>
			</Flex>
		</div>
	);
};

export const PremiumPricingCard = () => {
	return (
		<div className="relative overflow-hidden rounded-xl p-8 text-center shadow-lg shadow-yellow-500/50 max-w-sm bg-[#38394f] text-white border-2 border-yellow-400">
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			<div className="font-semibold rounded mb-2 text-2xl py-2">
				Supporter Tier <HeartFilledIcon className="inline-block mb-1 text-red-500" />
			</div>
			<p className="mt-5 mb-10">
				Your support helps keep Animechan running for everyone while giving you enhanced API access.
			</p>

			<Text as="p" className="text-left" ml="4" mb="4" weight="bold">
				✨ BENEFITS:
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Premium API key provided
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 1000 API requests per hour
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 5-minute block if limit exceeded
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Access to all API endpoints
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Frequently updated database
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Access to upcoming API features
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Programming help in the supporters-only
					Discord channel
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Satisfaction of helping keep Animechan
					free for the community
				</Text>
			</Flex>
		</div>
	);
};
