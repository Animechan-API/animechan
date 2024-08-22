export const WELCOME_ACTIVATE_EMAIL = (apiKey: string) => `
<div style="text-align: center;">
  <img src="https://res.cloudinary.com/animechan/image/upload/v1717068016/assets/5b071025d48339b3baa26dccb0a79e55.png" style="width: 150px; height: auto; display: block; max-width: 150px; margin: 0 auto;" />
  <h1>Thank You for Supporting Animechan!</h1>
  <p>We're incredibly grateful for your sponsorship of the Animechan API project. Your contribution is invaluable and helps us continue to improve our service.</p>
  <br>
  <p>Here’s your API key: <pre style="font-size: 14px;">${apiKey}</pre></p>
  <br>
  <p>Ready to get started? Check out our <a href="https://animechan.io/docs/" target="_blank" tabindex="-1">API documentation</a> to make authenticated requests. If you have any questions or need help, feel free to reach out to us at <a href="mailto:support@animechan.io">support@animechan.io</a>.</p>
  <br>
</div>
`;
