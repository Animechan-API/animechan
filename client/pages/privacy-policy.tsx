import { Container, Flex } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function PrivacyPolicy() {
	return (
		<Layout>
			<Container size="3" py="8">
				<h1 className="text-4xl font-bold">Privacy Policy</h1>

				<Flex direction="column" gapY="4" mt="6">
					<div>
						<h2 className="text-xl font-medium">1. Introduction</h2>
						<p>
							This Privacy Policy explains how Animechan ("we", "us", "our") collects, uses, and
							protects your personal information when you use our Anime Quotes API Service
							("Service").
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">2. Information We Collect</h2>
						<p>
							We may collect personal information from you when you register for the Service,
							including your name, email address, and payment information. We also collect technical
							data such as your IP address, browser type, and usage data through cookies and similar
							technologies.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">Use of Information</h2>
						<p>
							We use your personal information to provide and improve our Service, process
							transactions, and communicate with you. We may also use your information for marketing
							purposes, such as sending promotional emails, unless you opt out.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">4. Sharing of Information</h2>
						<p>
							We do not sell or share your personal information with third parties, except as
							necessary to provide the Service (e.g., payment processors) or as required by law. We
							may share anonymized data with third parties for analytics and research purposes.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">5. Data Security</h2>
						<p>
							We implement reasonable security measures to protect your personal information from
							unauthorized access, disclosure, or destruction. However, no security system is
							completely secure, and we cannot guarantee the absolute security of your data.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">6. Your Rights</h2>
						<p>
							You have the right to access, correct, or delete your personal information. You may
							also object to the processing of your data or request data portability. To exercise
							these rights, please contact us at{" "}
							<a href="mailto:support@animechan.io">support@animechan.io.</a>
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">7. Retention of Information</h2>
						<p>
							We retain your personal information for as long as necessary to fulfill the purposes
							for which it was collected, or as required by law. When your information is no longer
							needed, we will securely delete or anonymize it.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">8. Changes to this Policy</h2>
						<p>
							We may update this Privacy Policy from time to time. We will notify you of any
							significant changes by posting the new policy on our website and updating the date at
							the top of the policy.
						</p>
					</div>
					<div>
						<h2 className="text-xl font-medium">9. Contact Information</h2>
						<p>
							If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
							<a href="mailto:support@animechan.io">support@animechan.io.</a>
						</p>
					</div>
				</Flex>
			</Container>
		</Layout>
	);
}
