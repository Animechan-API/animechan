import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Flex, Section, Separator, Text } from "@radix-ui/themes";

export default function Footer() {
	return (
		<footer className="py-5 text-center text-sm text-gray-700">
			<Section size="2" maxWidth="500px" mx="auto">
				<Separator my="3" size="4" mb="6" />
				<Text>
					Created ❤ by <a href="https://rocktimsaikia.dev/">rocktimsaikia</a> ©{" "}
					{new Date().getFullYear()}
				</Text>
				<Flex gap="3" align="center" justify="center" className="mt-2">
					<a href="https://github.com/rocktimsaikia/animechan">
						<GitHubLogoIcon className="inline-block mb-1" /> Github
					</a>
					<Separator orientation="vertical" />
					<a href="#">
						<DiscordLogoIcon className="inline-block mb-1" /> Discord
					</a>
				</Flex>
			</Section>
		</footer>
	);
}
