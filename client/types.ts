import type { Language } from "prism-react-renderer";

export interface Quote {
	anime: string;
	character: string;
	quote: string;
}

export interface CodeSample {
	request: string;
	response: string;
}

export interface CodeBlock {
	language: Language;
	snippet: string;
}
