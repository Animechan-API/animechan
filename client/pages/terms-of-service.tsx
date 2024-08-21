import { Container, Flex } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function TermsOfService() {
	return (
		<Layout>
			<Container size="3" py="8">
				<h1 className="text-4xl font-bold">Terms of Service</h1>

				<Flex direction="column" gapY="4" mt="6">
					<div>
						<h2 className="text-xl font-medium">1. Acceptance of Terms</h2>
						<p>
							By accessing or using our Anime Quotes API service ("Service"), you agree to be bound
							by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not
							use the Service. We reserve the right to modify these Terms at any time, and your
							continued use of the Service constitutes your acceptance of the revised Terms.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">2. Description of Service</h2>
						<p>
							Our Service provides access to a curated collection of Anime quotes, available through
							a freemium API. The free tier offers limited access, while premium subscriptions
							unlock additional features and content.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">3. User Obligations</h2>
						<p>
							You agree to use the Service in compliance with all applicable laws and regulations.
							You are responsible for maintaining the security of your API key and account, and for
							all activities that occur under your account. You agree not to misuse the Service,
							including but not limited to: reverse engineering, scraping, or excessive API calls
							beyond the limits defined in your subscription plan.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">4. Intellectual Property</h2>
						<p>
							All content provided through the Service, including quotes, images, and metadata, is
							the intellectual property of Animechan. You are granted a limited, non-exclusive,
							non-transferable license to use the content for personal or commercial purposes,
							subject to the terms of this agreement. You may not reproduce, distribute, or create
							derivative works from the content without express written permission.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">5. Termination</h2>
						<p>
							We reserve the right to suspend or terminate your access to the Service at our
							discretion, with or without notice, for any violation of these Terms or for any reason
							that we deem necessary. Upon termination, your right to use the Service will
							immediately cease, and any data associated with your account may be deleted.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">6. Disclaimer of Warranties</h2>
						<p>
							The Service is provided "as is" without any warranties, express or implied. We do not
							guarantee that the Service will be available at all times, error-free, or secure. We
							disclaim all liability for any damages resulting from your use of the Service.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">7. Limitation of Liability</h2>
						<p>
							In no event shall Animechan be liable for any indirect, incidental, special, or
							consequential damages arising out of or in connection with your use of the Service,
							whether based on contract, tort, or any other legal theory.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">8. Governing Law</h2>
						<p>
							These Terms shall be governed by and construed in accordance with the laws of
							Animechan, without regard to its conflict of law principles.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">9. Contact Information</h2>
						<p>
							For any questions or concerns about these Terms, please contact us at{" "}
							<a href="mailto:support@animechan.io">support@animechan.io.</a>
						</p>
					</div>
				</Flex>
			</Container>
		</Layout>
	);
}
