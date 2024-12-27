import { Container, Flex, Heading, Link } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function PrivacyPolicy() {
	return (
		<Layout>
			<h1 className="text-4xl font-bold">Privacy Policy</h1>
			<p className="mt-4">
				This Privacy Policy explains how Animechan collects, uses, and protects your personal
				information when you use our Service.
			</p>

			<Flex direction="column" gapY="6" mt="6">
				<div>
					<Heading as="h2" className="text-xl font-medium">
						1. Information We Collect
					</Heading>
					<p>
						At Animechan, we only collects your email address when you subscribe and become a
						premium member via our{" "}
						<Link href="https://buymeacoffee.com/animechan_api" target="_blank" rel="noreferrer">
							Buy Me A Coffee page
						</Link>
						.
					</p>
				</div>

				<div>
					<Heading as="h2" className="text-xl font-medium">
						2. Use of Information
					</Heading>
					<p>
						We use your personal information to provide and improve our Service, process
						transactions, and communicate with you. We may also use your information for marketing
						purposes, such as sending promotional emails, unless you opt out.
					</p>
				</div>

				<div>
					<Heading as="h2" className="text-xl font-medium">
						3. Sharing of Information
					</Heading>
					<p>
						We do not sell or share your personal information with third parties. We may share
						anonymized data with third parties for analytics and research purposes.
					</p>
				</div>

				<div>
					<Heading as="h2" className="text-xl font-medium">
						4. Retention of Information
					</Heading>
					<p>
						We retain your personal information for as long as necessary to fulfill the purposes for
						which it was collected, or as required by law. When your information is no longer
						needed, we will securely delete or anonymize it.
					</p>
				</div>

				<div>
					<Heading as="h2" className="text-xl font-medium">
						5. Changes to this Policy
					</Heading>
					<p>
						We may update this Privacy Policy from time to time. We will notify you of any
						significant changes by posting the new policy on our website and updating the date at
						the top of the policy.
					</p>
				</div>
				<div>
					<Heading as="h2" className="text-xl font-medium">
						6. Contact Information
					</Heading>
					<p>
						If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
						<Link href="mailto:support@animechan.io">support@animechan.io.</Link>
					</p>
				</div>
			</Flex>
		</Layout>
	);
}
