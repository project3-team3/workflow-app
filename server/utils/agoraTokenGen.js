// Agora Video Chat Token Generator
// Credit: https://docs.agora.io/en/video-calling/develop/integrate-token-generation?platform=web

const path = require("path");
const dotenv = require("dotenv").config({ path: path.resolve(__dirname, "../../.env")});

const {
  RtcTokenBuilder,
  RtcRole,
} = require("agora-token");

const generateRtcToken = (userChannelName, userUid) => {
  try {
    // RTC parameters
    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const channelName = userChannelName;
    const uid = userUid;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    return tokenA;

  } catch (error) {
    console.error("Error generating RTC token:", error.message);
    throw error;
  }
};

module.exports = generateRtcToken;
