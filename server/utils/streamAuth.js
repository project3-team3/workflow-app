// Stream Token Authentication
// Credit: https://getstream.io/chat/docs/javascript/tokens_and_authentication/
const StreamChat = require("stream-chat").StreamChat;
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const generateStreamToken = async (username) => {

  // Provide the API key and secret for authentication
  const api_key = process.env.STREAM_API_KEY;
  const api_secret = process.env.STREAM_API_SECRET;
  const user_id = username;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  try {
    // Create User Token
    const token = serverClient.createToken(user_id);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};

module.exports = { generateStreamToken };
