import React, { useEffect, useState } from "react";
import { initFarcaster } from "./hooks/farcaster";
import Leaderboard from "./Leaderboard";
import Game from "./Game";

export default function App() {
  const [user, setUser] = useState(null);
  const [playsLeft, setPlaysLeft] = useState(5);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    initFarcaster().then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">🐍 CryptoSnake</h1>
      <p>Hello {user.username}, plays left today: {playsLeft}/5</p>

      {playing ? (
        <Game onEnd={(score) => {
          fetch("/api/score", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ fid: user.fid, username: user.username, score })
          });
          setPlaysLeft(playsLeft - 1);
          setPlaying(false);
        }}/>
      ) : playsLeft > 0 ? (
        <button 
          onClick={() => setPlaying(true)} 
          className="px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
        >
          Start Playing
        </button>
      ) : (
        <p className="text-red-500 mt-4">You've used up all your plays for today!</p>
      )}

      <Leaderboard />
    </div>
  );
}
