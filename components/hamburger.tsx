import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";

export default function HamburgerMenu() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button className="outline-none">
					<HamburgerMenuIcon fontSize={20} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content variant="solid" className="w-40">
				<Link href="/dashboard/account">
					<DropdownMenu.Item className="outline-none">Account</DropdownMenu.Item>
				</Link>
				<Link href="/dashboard/billing">
					<DropdownMenu.Item className="outline-none">Billing</DropdownMenu.Item>
				</Link>
				<DropdownMenu.Separator />
				<a href="/logout">
					<DropdownMenu.Item className="outline-none">Logout</DropdownMenu.Item>
				</a>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
