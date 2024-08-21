import { Container, Flex } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function Cancellation() {
	return (
		<Layout>
			<Container size="3" py="8">
				<h1 className="text-4xl font-bold">Cancellation Policy</h1>

				<Flex direction="column" gapY="4" mt="6">
					<div>
						<h2 className="text-xl font-medium">1. Free Tier Users</h2>
						<p>
							If you are using the free tier of our Anime Quotes API Service, you may stop using the
							Service at any time without any further obligation. Your access will be terminated
							automatically if you exceed the usage limits.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">2. Premium Subscribers</h2>
						<p>
							For premium subscribers, you may cancel your subscription at any time through your
							account settings. Upon cancellation, your access to premium features will continue
							until the end of your current billing cycle. No refunds will be provided for the
							remaining period of the billing cycle.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">3. Refund Policy</h2>
						<p>
							Refunds are generally not provided, except in cases of system errors or other
							extenuating circumstances. If you believe you are entitled to a refund, please contact
							our support team at <a href="mailto:support@animechan.io">support@animechan.io.</a>
							within 14 days of the transaction.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">4. Account Termination</h2>
						<p>
							We reserve the right to terminate your account and access to the Service for any
							violation of our Terms of Service or if we suspect fraudulent activity. Upon
							termination, you will lose access to all features and content associated with your
							account.
						</p>
					</div>

					<div>
						<h2 className="text-xl font-medium">5. Contact Information</h2>
						<p>
							For any questions or assistance regarding cancellations, please contact us at{" "}
							<a href="mailto:support@animechan.io">support@animechan.io.</a>.
						</p>
					</div>
				</Flex>
			</Container>
		</Layout>
	);
}
