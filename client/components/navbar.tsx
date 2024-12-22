import { RocketIcon } from "@radix-ui/react-icons";
import { Button, Flex, Link, Text } from "@radix-ui/themes";
import { useWindowSize } from "@uidotdev/usehooks";
import { SPLITBEE_EVENTS } from "~/constants/common";

export default function Navbar() {
	const windowSize = useWindowSize();

	return (
		<div className="shadow-md" id="navbar">
			<nav className="container relative lg:mx-auto px-2 max-w-4xl py-3 navbar-expand-lg mb-3 text-green-700">
				<div className="container mx-auto flex flex-wrap items-center justify-between">
					<div className="md:w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<Link href="/">
							<Text weight="medium" className="cursor-default">
								Animechan
							</Text>
						</Link>
					</div>

					<Flex gapX="4" align="center" justify="end">
						<a href="/docs">
							<Button variant="ghost">
								<Text weight="medium" size="3">
									{windowSize.width <= 500 ? "Docs" : "Documentation"}
								</Text>
							</Button>
						</a>

						<a data-splitbee-event={SPLITBEE_EVENTS.PREMIUM_CTA} href="/get-premium">
							<Button>
								Get Premium API <RocketIcon />
							</Button>
						</a>
					</Flex>
				</div>
			</nav>
		</div>
	);
}
