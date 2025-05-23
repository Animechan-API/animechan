import { DiscordLogoIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Link, Section, Separator, Text } from "@radix-ui/themes";
import StatusIndicator from "./StatusIndicator";

export default function Footer() {
	return (
		<footer className="py-5 text-center text-sm">
			<Section className="py-2" size="2" maxWidth="600px" mx="auto">
				<Separator my="3" size="4" mb="6" />
				<div className="grid lg:grid-cols-3 lg:gap-x-16 lg:gap-y-0 gap-y-8 mt-6 lg:text-left">
					<ul className="space-y-1">
						<li className="font-medium mb-2">Quick Links:</li>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/docs">Documentation</Link>
						</li>
						<li>
							<Link href="/support">Support Animechan</Link>
						</li>
						<li>
							<Link href="/privacy-policy">Privacy Policy</Link>
						</li>
						<li>
							<Link href="/terms">Terms and Conditions</Link>
						</li>
						{/* <li> */}
						{/* 	<Link href="/docs">Blog</Link> */}
						{/* </li> */}
					</ul>
					<ul className="space-y-1">
						<li className="font-medium mb-2">Contact Us:</li>
						<li>
							<Link href="mailto:support@animechan.io">support@animechan.io</Link>
						</li>
					</ul>
					<ul className="space-y-1">
						<li className="font-medium mb-2">Social Links:</li>
						<li>
							<Link href="https://www.linkedin.com/company/animechan-api" target="_blank">
								<LinkedInLogoIcon className="inline-block mb-1" /> LinkedIn
							</Link>
						</li>
						<li>
							<Link href="https://github.com/Animechan-API/animechan" target="_blank">
								<GitHubLogoIcon className="inline-block mb-1" /> Github
							</Link>
						</li>
						<li>
							<Link href="https://discord.gg/yVEDXVYaT3" target="_blank" rel="noreferrer">
								<DiscordLogoIcon className="inline-block mb-1" /> Discord
							</Link>
						</li>
					</ul>
				</div>
			</Section>

			<StatusIndicator />
			<Text as="p" mt="5">
				Created with <span className="text-red-500">❤ </span> by{" "}
				<a href="https://rocktim.dev/">@rocktimsaikia</a> © {new Date().getFullYear()}
			</Text>
		</footer>
	);
}
