import { ThickArrowRightIcon } from "@radix-ui/react-icons";
import { Badge, Text } from "@radix-ui/themes";
import CodeBlock from "~/components/codeblock";
import type { Guide } from "~/types";

export default function Resource({ heading, subHeading, codeSample, link, isNewlyAdded }: Guide) {
	return (
		<div id={link}>
			<h2 className="lg:text-2xl text-xl font-bold mb-1">
				<ThickArrowRightIcon className="inline-block mb-1" /> {heading}
				{isNewlyAdded && (
					<Badge color="orange" mx="2">
						New
					</Badge>
				)}
			</h2>
			{subHeading && (
				<p className="lg:text-lg text-base mb-2">
					Pagination works only on the query endpoints. Default pagination count is 10 quotes per
					page.
				</p>
			)}
			<CodeBlock language="javascript" snippet={codeSample.request} />
			<Text size="2" as="span" weight="medium">
				Response:
			</Text>
			<CodeBlock language="javascript" snippet={codeSample.response} />
		</div>
	);
}
