const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

function generateRtcToken(appId, appCertificate, channelName, uid) {
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600; // 1 hour
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  return token;
}

module.exports = { generateRtcToken };
