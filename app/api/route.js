import { BASE_URL, generateFarcasterFrame, validateMessage } from "../utils";

export async function POST(req, res) {
  const signedMessage = await req.json();

  // Validate the signed message if it exists
  if (signedMessage.trustedData) {
    const isMessageValid = await validateMessage(
      signedMessage.trustedData.messageBytes
    );

    if (!isMessageValid) {
      return res.status(400).json({ error: "Invalid message" });
    }
  }

  const choice = signedMessage.untrustedData.buttonIndex;
  let html = "";

  // Generate HTML based on the choice
  if (choice === 1) {
    html = generateFarcasterFrame(`${BASE_URL}/happy.jpg`, choice);
  } else {
    html = generateFarcasterFrame(`${BASE_URL}/threat.jpg`, choice);
  }

  // Send the response
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
}