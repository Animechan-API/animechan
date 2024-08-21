import {
	CheckboxIcon,
	HeartFilledIcon,
	InfoCircledIcon,
	RocketIcon,
	ThickArrowRightIcon,
} from "@radix-ui/react-icons";
import { Callout, Container, Flex, Section, Text } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function GetPremium() {
	return (
		<Layout>
			<Flex justify="center" align="start" mt="100px" gapX="8" className="text-[#423e62]">
				<FreePricingCard />
				<PremiumPricingCard />
			</Flex>

			<Container size="2">
				<Section>
					<Text size="6" weight="bold" as="div">
						HOW TO GET A PREMIUM API KEY:
					</Text>
					<Flex direction="column" gapY="3" mt="3" className="">
						<Text>
							1. Go to our buy me a coffee page here:
							<a
								href="https://buymeacoffee.com/animechan_api"
								className="block text-blue-500 underline underline-offset-2"
								target="_blank"
								rel="noreferrer"
							>
								https://buymeacoffee.com/animechan_api
							</a>
						</Text>
						<Text>
							2. Subscribe to a <b>monthly plan</b> of your choice. As long as it is a membership
							subscription, you can use our premium API.
						</Text>
						<Text>
							3. Once subscribed, you will get a premium API key in your email address that is
							associated with your buymeacoffee account.
						</Text>
						<Callout.Root size="1">
							<Callout.Icon>
								<InfoCircledIcon />
							</Callout.Icon>
							<div className="flex flex-col space-y-2 text-sm font-medium">
								<p>That's it 🎉 </p>
								<p>
									You now have access to all the premium API endpoints. You can use the provided API
									key in the email to make authenticated requests with higher rate-limits.{" "}
								</p>
								<p>
									Check how to make authenticated requests with the API key{" "}
									<ThickArrowRightIcon className="inline-block" />
									<a href="/docs" className="text-blue-500 font-semibold">
										here.
									</a>
								</p>
							</div>
						</Callout.Root>
					</Flex>
				</Section>

				<Flex direction="column" gapY="3" mt="3">
					<Text size="6" weight="bold" as="div">
						<HeartFilledIcon className="inline-block" color="red" /> Developers Note:
					</Text>
					<Text as="p">
						We are a small team of developers dedicated to creating the best free and open-source
						Anime information API available. While our project is open-source on GitHub and driven
						by a love for the community, maintaining and scaling this service comes with significant
						costs—such as DigitalOcean servers, MySQL databases, Redis instances, domain renewals,
						and general upkeep.
					</Text>

					<Text as="p">
						Though we aim to keep this project free, our expenses make it challenging. If you value
						this project and want to see it thrive, please consider supporting us by subscribing to
						one of our monthly plans. Your support is greatly appreciated and will help ensure the
						continued growth of Animechan.
					</Text>

					<Text as="p">Thank you from the Animechan team.</Text>
				</Flex>
			</Container>
		</Layout>
	);
}

export const FreePricingCard = () => {
	return (
		<div className="rounded-xl p-8 text-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] max-w-sm bg-white">
			<div className="uppercase font-semibold rounded mb-2 text-xl">BASIC</div>
			<p className="text-sm mt-5 mb-10">Good for testing out the API and learning.</p>

			<Text as="p" className="text-left" ml="4" mb="4" weight="bold">
				FEATURES
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> No API key required
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> 20 API requests per hour
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> 1-hour block if limit
					exceeded
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> Access to few API
					endpoints
				</Text>
			</Flex>
		</div>
	);
};

export const PremiumPricingCard = () => {
	return (
		<div className="rounded-xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-sm bg-white">
			<div className="uppercase font-semibold rounded mb-2 text-xl">
				PREMIUM <RocketIcon className="inline-block mb-1" color="green" />
			</div>
			<p className="text-sm mt-5 mb-10">
				Best suited for both commercial projects and personal projects with high traffic and usage.
			</p>

			<Text as="p" className="text-left" ml="4" mb="4" weight="bold">
				FEATURES
			</Text>
			<Flex direction="column" align="start" gapY="4" className="px-4 text-left">
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> Premium API key provided
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> 800 API requests per hour
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> 10-minute block if limit
					exceeded
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> Access to all API
					endpoints
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> Frequently updated
					database
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> Access to upcoming API
					features
				</Text>
				<Text>
					<CheckboxIcon className="inline-block mb-[2px]" color="green" /> Any programming related
					help in the premium Discord community channel.
				</Text>
			</Flex>
		</div>
	);
};
