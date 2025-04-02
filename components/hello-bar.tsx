import { Cross2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface IHelloBarEvent {
	message: string;
}

export default function HelloBar() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const handleShowHelloBar = (event: CustomEvent<IHelloBarEvent>) => {
			setMessage(event.detail.message);
		};
		window.addEventListener("showHelloBar", handleShowHelloBar);
		return () => window.removeEventListener("showHelloBar", handleShowHelloBar);
	}, []);

	return (
		<div className="relative w-full">
			<div className="text-center hellobar-gradient h-1" />
			{message && (
				<div className="flex items-center justify-between py-3 px-5 space-x-2 bg-[var(--accent-a3)] text-green-700 text-sm">
					<div className="flex items-center justify-center flex-grow space-x-2">
						<InfoCircledIcon />
						<p>{message}</p>
					</div>
					<Cross2Icon className="cursor-pointer" onClick={() => setMessage("")} />
				</div>
			)}
		</div>
	);
}

export function showHelloBar({ message }: IHelloBarEvent) {
	window.dispatchEvent(
		new CustomEvent("showHelloBar", {
			detail: { message },
		}),
	);
}
