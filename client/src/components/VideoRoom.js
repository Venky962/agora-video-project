import React, { useEffect, useState } from "react";
import axios from "axios";
import client from "../services/agoraClient";
import AgoraRTC from "agora-rtc-sdk-ng";

function VideoRoom({ channel, uid, leaveRoom }) {
  const [localTracks, setLocalTracks] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        // Get token from backend
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/get-token?channelName=${channel}&uid=${uid}`
        );

        const { appId, token } = response.data;

        // Join Agora channel
        await client.join(appId, channel, token, uid);

        // Create local tracks
        const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalTracks(tracks);

        // Publish local tracks
        await client.publish(tracks);

        tracks[1].play("local-video");

        // Listen for remote user
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            user.videoTrack.play("remote-video");
          }

          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        });

      } catch (error) {
        console.error("Error initializing video:", error);
      }
    };

    init();

    return () => {
      localTracks.forEach(track => track.close());
      client.leave();
    };

  }, []);

  const handleLeave = async () => {
    localTracks.forEach(track => track.close());
    await client.leave();
    leaveRoom();
  };

  return (
    <div>
      <h2>Channel: {channel}</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div>
          <h4>Local Video</h4>
          <div id="local-video" style={{ width: "300px", height: "200px" }}></div>
        </div>

        <div>
          <h4>Remote Video</h4>
          <div id="remote-video" style={{ width: "300px", height: "200px" }}></div>
        </div>
      </div>

      <br />
      <button onClick={handleLeave}>Leave Call</button>
    </div>
  );
}

export default VideoRoom;
