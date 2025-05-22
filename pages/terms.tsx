import { Heading, Section, Text } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function TermsAndConditions() {
	return (
		<Layout>
			<div className="mx-4 lg:mx-0 max-w-4xl mx-auto">
				<Section className="mb-10">
					<Heading as="h1" size="8" className="mb-6">
						Terms and Conditions
					</Heading>
					<Text as="p" className="mb-4">
						Last Updated: May 23, 2025
					</Text>

					<div className="space-y-6">
						<div>
							<Heading as="h2" size="5" className="mb-2">
								1. Acceptance of Terms
							</Heading>
							<Text as="p">
								By accessing and using the Animechan API service ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								2. Description of Service
							</Heading>
							<Text as="p">
								Animechan provides an API service that offers anime quotes, character information, and series data for developers to use in their applications. All API endpoints are free to use with rate limitations.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								3. API Usage and Rate Limits
							</Heading>
							<Text as="p">
								The free tier allows 5 API requests per hour with a 1-hour block if the limit is exceeded. Users who support Animechan receive an API key that enables 1000 requests per hour with a 5-minute block if the limit is exceeded.
							</Text>
							<Text as="p" className="mt-2">
								You agree not to attempt to circumvent these rate limits or use the API in a manner that could damage, disable, or impair our servers.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								4. User Responsibilities
							</Heading>
							<Text as="p">
								When using our Service, you agree to:
							</Text>
							<ul className="list-disc pl-6 space-y-1 mt-2">
								<li>Use the API in compliance with all applicable laws and regulations</li>
								<li>Not use the API for any illegal or unauthorized purpose</li>
								<li>Not distribute, sell, or lease API keys to third parties</li>
								<li>Properly attribute Animechan as the source of data when appropriate</li>
							</ul>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								5. Intellectual Property
							</Heading>
							<Text as="p">
								The Animechan service, including its API, website, and database, is owned by Animechan. The anime quotes and information provided through the API are sourced from various anime series and are the intellectual property of their respective owners.
							</Text>
							<Text as="p" className="mt-2">
								You may use the data provided by our API in your applications, but you may not claim ownership of the data itself.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								6. Disclaimer of Warranties
							</Heading>
							<Text as="p">
								The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the API will be uninterrupted, timely, secure, or error-free.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								7. Limitation of Liability
							</Heading>
							<Text as="p">
								In no event shall Animechan be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								8. Modifications to Terms
							</Heading>
							<Text as="p">
								We reserve the right to modify these Terms and Conditions at any time. We will provide notice of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the Service after such modifications constitutes your acceptance of the revised terms.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								9. Termination
							</Heading>
							<Text as="p">
								We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms and Conditions.
							</Text>
						</div>

						<div>
							<Heading as="h2" size="5" className="mb-2">
								10. Contact Information
							</Heading>
							<Text as="p">
								If you have any questions about these Terms and Conditions, please contact us at support@animechan.io.
							</Text>
						</div>
					</div>
				</Section>
			</div>
		</Layout>
	);
}
