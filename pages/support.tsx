import { Link } from "@radix-ui/themes";
import Layout from "~/components/Layout";

export default function Support() {
	return (
		<Layout>
			<div>
				<div>
					<h1 className="text-2xl font-medium">Welcome to Animechan Support</h1>
					<p className="mt-5">
						Thank you for choosing our freemium API service for anime quotes. We are here to help
						you make the most of our service. If you have any questions, feedback, or issues, please
						feel free to contact us at{" "}
						<Link href="mailto:support@animechan.io">support@animechan.io</Link>. For feature
						requests or bug reports the best place to connect with us would be our{" "}
						<Link href="https://github.com/rocktimsaikia">Github Repository</Link> as we are quite
						active there and will be able help you fast.
					</p>
				</div>
			</div>
		</Layout>
	);
}
