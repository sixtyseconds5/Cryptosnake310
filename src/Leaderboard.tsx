import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(setLeaders);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">🏆 Top 20 Leaderboard</h2>
      <ol className="mt-4">
        {leaders.map((p, i) => (
          <li key={p.fid}>
            #{i+1} {p.username} — {p.score} pts
          </li>
        ))}
      </ol>
    </div>
  );
}
