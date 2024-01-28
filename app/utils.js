import { getHubRpcClient, Message } from "@farcaster/hub-web";

export const BASE_URL = process.env.BASE_URL;

// generate an html page with the relevant opengraph tags
export function generateFarcasterFrame(image, choice) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${image}" />
      <meta property="fc:frame:post_url" content="${BASE_URL}/api/post" />

      ${
        choice === 2
          ? '<meta property="fc:frame:button:1" content="Yes" />'
          : ""
      }
    </head>
    <body>
      
    </body>
    </html>
  `;
}

export async function validateMessage(messageBytes) {
  const client = getHubRpcClient("https://nemes.farcaster.xyz:2283", {});
  const hubMessage = Message.decode(Buffer.from(messageBytes, "hex"));
  const res = await client.validateMessage(hubMessage);

  if (res.isOk() && res.value.valid) {
    return res.value.valid;
  }
}