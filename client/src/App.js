import React, { useState } from "react";
import JoinRoom from "./components/JoinRoom";
import VideoRoom from "./components/VideoRoom";

function App() {
  const [channel, setChannel] = useState("");
  const [uid, setUid] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {!channel ? (
        <JoinRoom onJoin={(channelName, userId) => {
          setChannel(channelName);
          setUid(userId);
        }} />
      ) : (
        <VideoRoom channel={channel} uid={uid} leaveRoom={() => {
          setChannel("");
          setUid(null);
        }} />
      )}
    </div>
  );
}

export default App;
