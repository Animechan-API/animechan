import { LockClosedIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";
import { Badge, Text } from "@radix-ui/themes";
import clsx from "clsx";
import CodeBlock from "~/components/codeblock";
import type { IApiGuide } from "~/pages/docs";

export default function Resource({
	heading,
	subHeading,
	codeSample,
	link,
	isPremium,
	isNewlyAdded,
}: IApiGuide) {
	return (
		<div id={link}>
			<h2
				className={clsx("lg:text-2xl text-xl font-bold mb-1", {
					"opacity-60": isPremium,
				})}
			>
				<ThickArrowRightIcon className="inline-block mb-1" /> {heading}
				{isPremium && <span className="text-base inline-block ml-1">(Requires auth)</span>}
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
