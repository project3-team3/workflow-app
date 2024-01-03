const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const generateStreamToken = async (username) => {
  console.log("[streamAuth.js] In generateStreamToken. username:", username);

  // Define values.
  const api_key = process.env.STREAM_API_KEY;
  const api_secret = process.env.STREAM_API_SECRET;
  const user_id = username;

  console.log(
    "[streamAuth.js] api_key:",
    api_key,
    "api_secret:",
    api_secret,
    "user_id:",
    user_id
  );

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  console.log("[streamAuth.js] Server initialized?", serverClient);

  try {
    // Create User Token
    const token = serverClient.createToken(user_id);
    console.log("[streamAuth.js] Token generated?", token);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};

module.exports = { generateStreamToken };
