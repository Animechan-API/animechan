import { useEffect, useState } from "react";

export interface Response {
	page: Page;
	status: Status;
}

export interface Page {
	id: string;
	name: string;
	url: string;
	updated_at: string;
}

export interface Status {
	description: string;
	indicator: string;
}

interface Props {
	className?: string;
}

export default function StatusIndicator({ className }: Props) {
	const [statusDescription, setStausDescription] = useState<string | null>(null);

	async function getCurrentStatusUpdate() {
		const endpoint = "https://rr0j88rz2nhd.statuspage.io/api/v2/status.json";
		const response = await fetch(endpoint);

		if (response.ok) {
			const {
				status: { description },
			}: Response = await response.json();
			setStausDescription(description);
		}
	}

	// biome-ignore lint: No dependency required here.
	useEffect(() => {
		getCurrentStatusUpdate();
	}, []);

	const isGreen = statusDescription === "All Systems Operational";

	return (
		<a
			href="https://animechan.statuspage.io/"
			target="_blank"
			rel="noreferrer"
			className={`inline-flex items-center gap-x-2 border border-gray-500 py-2 px-3 text-sm ${className}`}
		>
			<div
				className={`h-3 w-3 m-0 p-0 rounded-full animate-pulse ${isGreen ? "bg-green-400" : "bg-red-400"}`}
			/>
			<div className="m-0 p-0">{statusDescription}</div>
		</a>
	);
}
