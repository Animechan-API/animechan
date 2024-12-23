import {
	CheckboxIcon,
	HeartFilledIcon,
	InfoCircledIcon,
	RocketIcon,
	ThickArrowRightIcon,
} from "@radix-ui/react-icons";
import { Callout, Container, Flex, Link, Section, Strong, Text } from "@radix-ui/themes";
import Layout from "~/components/Layout";
import { SPLITBEE_EVENTS } from "~/constants/common";

export default function GetPremium() {
	const steps = [
		<>
			First visit our <Strong>Buy Me A Coffee</Strong> page.
		</>,
	];

	return (
		<Layout>
			<div className="mx-4 lg:mx-0">
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
					mt={{
						xl: "100px",
						md: "100px",
						initial: "50px",
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

				<div>
					<Section>
						<Text size="6" weight="bold" as="div">
							How to Subscribe to the Premium Plan:
						</Text>
						<div className="grid lg:grid-cols-3 gap-10 lg:gap-6 mt-10">
							<div id="step-1">
								<Text size="5" weight="bold" className="bg-yellow-400 text-gray-800 px-4 py-2">
									1
								</Text>
								<Text className="inline-block mt-3 lg:mt-4">
									Visit to our <Strong>Buy Me A Coffee</Strong> page and subscribe to any monthly
									plan to unlock access to our premium API.
								</Text>
								<div className="mt-4">
									<a
										href="https://www.buymeacoffee.com/animechan_api"
										target="_blank"
										rel="noreferrer"
									>
										<img
											src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=animechan_api&button_colour=BD5FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
											alt="Animechan"
										/>
									</a>
								</div>
							</div>
							<div id="step-2">
								<Text size="5" weight="bold" className="bg-yellow-400 text-gray-800 px-4 py-2">
									2
								</Text>
								<Text className="inline-block mt-3 lg:mt-4">
									After subscribing, your premium API key will be sent to the email linked to your{" "}
									<Strong>Buy Me A Coffee</Strong> account.
								</Text>
							</div>
							<div id="step-2">
								<Text size="5" weight="bold" className="bg-yellow-400 text-gray-800 px-4 py-2">
									3
								</Text>
								<Text className="inline-block mt-3 lg:mt-4">
									That’s it! ✅ Use your API key to access premium endpoints with higher limits.
									Learn more here: <Link href="/docs/auth">/docs/auth</Link>.
								</Text>
							</div>
						</div>
					</Section>

					<Flex direction="column" gapY="3" mt="3">
						<Text size="6" weight="bold" as="div">
							💌 A Note from the Developer:
						</Text>
						<Text as="p">
							Hey! I’m a solo developer building this Anime information API out of love for the
							community. While I keep it free and open-source, there are ongoing costs for servers,
							databases, email services and maintenance. If you enjoy the project and want to help
							it grow, please consider subscribing to one of the monthly plans. Your support means a
							lot and keeps Animechan running!
						</Text>
						<Text as="p">Thank you from the Animechan team.</Text>
					</Flex>
				</div>
			</div>
		</Layout>
	);
}

export const FreePricingCard = () => {
	return (
		<div className="rounded-xl p-8 text-center bg-[#38394f] max-w-sm border border-gray-600">
			<div className="font-semibold rounded mb-2 text-xl">Basic Plan</div>
			<p className="text-sm mt-5 mb-10">Good for testing out the API and learning.</p>

			<Text as="p" className="text-left" ml="4" mb="4" weight="bold">
				HIGHLIGHTS:
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> No API key required
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 20 API requests per hour
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 1-hour block if limit exceeded
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Access to few API endpoints
				</Text>
			</Flex>
		</div>
	);
};

export const PremiumPricingCard = () => {
	return (
		<div className="relative overflow-hidden rounded-xl p-8 text-center shadow-lg shadow-yellow-500/50 max-w-sm bg-[#38394f] text-white border-2 border-yellow-400">
			<div className="absolute  inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			<div className="font-semibold rounded mb-2 text-2xl py-2">
				Premium Plan <RocketIcon className="inline-block mb-1" />
			</div>
			<p className="mt-5 mb-10">
				Best suited for both personal projects and commercial applications with high traffic and
				usage.
			</p>

			<Text as="p" className="text-left" ml="4" mb="4" weight="bold">
				✨ HIGHLIGHTS:
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> Premium API key provided
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 800 API requests per hour
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" /> 10-minute block if limit exceeded
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
					<CheckboxIcon className="inline-block mb-[2px]" /> Any programming related help in the
					premium Discord community channel.
				</Text>
			</Flex>
		</div>
	);
};
