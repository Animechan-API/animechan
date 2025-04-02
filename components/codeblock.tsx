import { Highlight, themes } from "prism-react-renderer";
import { useId } from "react";
import type { CodeBlock } from "~/types";

export default function Codeblock({ language, snippet }: CodeBlock) {
	const keyId = useId();
	return (
		<Highlight theme={themes.dracula} code={snippet} language={language}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={`${className} relative rounded-md p-6 whitespace-pre-wrap overflow-auto lg:text-sm text-xs`}
					style={style}
				>
					{tokens.map((line, i) => (
						<div {...getLineProps({ line, key: i })} key={keyId}>
							{line.map((token, key) => (
								<span {...getTokenProps({ token, key })} key={keyId} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
}
