import dotenv from "dotenv";
dotenv.config();

export const WELCOME_ACTIVATE_EMAIL = (apiKey: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Supporting Animechan!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }

      .container {
        text-align: center;
      }

      .logo {
        width: 150px;
        height: auto;
        display: block;
        max-width: 150px;
        margin: 0 auto 20px;
      }

      h2 {
        color: #4a4a4a;
        font-weight: 600;
      }

      p {
        font-size: 15px !important;
      }

      .api-key {
        background-color: #f4f4f4;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        word-break: break-all;
      }

      .cta-button {
        display: inline-block;
        background-color: #007bff;
        color: white !important;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://res.cloudinary.com/animechan/image/upload/v1717068016/assets/5b071025d48339b3baa26dccb0a79e55.png" alt="Animechan Logo" class="logo">
      <h1>Thank You for Supporting Animechan!</h1>
      <p>We're incredibly grateful for your sponsorship of the Animechan API project. <br />Your contribution is invaluable and helps us continue to improve our service. </p>
      <h2>Your API Key</h2>
      <p class="api-key">${apiKey}</p>
      <p>You now also have access to our private Discord server for premium members.</p>
      <a href="${process.env.PRIVATE_DISCORD_URL}" class="cta-button">Join Our Discord</a>
      <h2>Getting Started</h2>
      <p>Ready to dive in? Check out our <a href="https://animechan.io/docs/" target="_blank">API documentation</a> to make authenticated requests. <br /> If you have any questions or need assistance, don't hesitate to reach out to us at <a href="mailto:support@animechan.io">support@animechan.io</a> or our private discord server. </p>
      <p>Thank you again for your support!</p>
    </div>
  </body>
</html>
`;
