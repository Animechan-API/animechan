import dotenv from "dotenv";
dotenv.config();

export const WELCOME_ACTIVATE_EMAIL = (apiKey: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Supporting Animechan!</title>
    <style>
      body {
          font-family: Arial, sans-serif;
          line-height: 1.4;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
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
      <img
        src="https://res.cloudinary.com/animechan/image/upload/v1717068016/assets/5b071025d48339b3baa26dccb0a79e55.png"
        alt="Animechan Logo"
        class="logo"
      />

      <h1>Welcome to Animechan Premium!</h1>
      <p>
        Thank you for joining as a premium member of the Animechan API
        project.<br />Your support helps keep Animechan alive and
        delivering a great experience for all.
      </p>

      <h2>Your Exclusive API Key:</h2>
      <p class="api-key">${apiKey}</p>

      <p>
        Ready to dive in? Check out our
        <a href="https://animechan.io/docs/" target="_blank">documentation</a>
        on how to make authenticated requests.<br />
        For any questions or assistance, please reach out to us at
        <a href="mailto:support@animechan.io">support@animechan.io</a> or our
        discord server.
      </p>

      <p>Thank you once again for your support</p>
    </div>
  </body>
</html>
`;
