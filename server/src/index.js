require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { generateRtcToken } = require("./agoraToken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

// Health check route
app.get("/", (req, res) => {
  res.send("Agora Token Server is running...");
});

// Generate token route
app.get("/get-token", (req, res) => {
  try {
    const { channelName, uid } = req.query;

    if (!channelName || !uid) {
      return res.status(400).json({
        error: "channelName and uid are required",
      });
    }

    const token = generateRtcToken(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      Number(uid)
    );

    return res.json({
      appId: APP_ID,
      token,
    });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://192.168.1.12:${PORT}`);
});

