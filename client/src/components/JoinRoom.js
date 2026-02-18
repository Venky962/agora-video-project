import React, { useState } from "react";

function JoinRoom({ onJoin }) {
  const [channelName, setChannelName] = useState("");

  const handleJoin = () => {
    if (!channelName) return alert("Enter channel name");
    const randomUid = Math.floor(Math.random() * 10000);
    onJoin(channelName, randomUid);
  };

  return (
    <div>
      <h2>Join Video Call</h2>
      <input
        type="text"
        placeholder="Enter Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <br /><br />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}

export default JoinRoom;
