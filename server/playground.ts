import { WELCOME_ACTIVATE_EMAIL } from "~/constants/email";
import { sendEmail } from "~/libs/common";

(async () => {
	await sendEmail({
		to: "srocktim61@gmail.com",
		subject: "Welcome to Animechan Premium | Animechan.io",
		content: WELCOME_ACTIVATE_EMAIL("5f7e9a94-5c2e-4dab-b618-707734bb64da"),
	});
})();
