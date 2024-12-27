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
					display: inline-block;
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

      <h1>Welcome to Animechan Premium 🎉</h1>
      <p>
        Thank you for joining as a premium member of the Animechan API
        project.<br />Your support helps keep Animechan alive and
        delivering a great experience for all.
      </p>

      <h2>Your Exclusive API Key:</h2>
      <p class="api-key">${apiKey}</p>

      <p>
        Check out our <a href="https://animechan.io/docs/" target="_blank">documentation</a>
        on how to make authenticated requests.<br />
        For any questions or assistance, please reach out to us at
        <a href="mailto:support@animechan.io">support@animechan.io</a> or our
        discord server. <br/><br/>
      	Thank you once again for your support.<br/>
				The Animechan Team.
				<a href="https://animechan.io" target="_blank">www.animechan.io</a>
      </p>
    </div>
  </body>
</html>
`;

export const CANCELLATION_EMAIL = `
Hi there, <br/><br/>

We noticed that you've canceled your subscription to Animechan Premium, and we’re truly sorry to see you leave. Your support has meant the world to us, and it’s because of members like you that Animechan can continue growing.<br/><br/>

If there’s anything we can do to improve your experience or if you have any feedback for us, we’d love to hear it. Your input is invaluable in helping us grow and serve our community better.<br/><br/>

Though your premium access has ended, you can still enjoy our free tier of services anytime. Should you decide to return in the future, we’d be thrilled to welcome you back with open arms.<br/><br/>

Thank you once again for being a part of Animechan.<br/>
We’ll miss you! 💗<br/><br/>

Warm regards,<br/>
The Animechan Team<br/>
<a href="https://animechan.io" target="_blank">www.animechan.io</a>
`;
