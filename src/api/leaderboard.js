// api/leaderboard.js
export default function handler(req, res) {
  // TODO: Ambil top 20 dari DB
  res.status(200).json([
    { fid: 1, username: "demo", score: 100 }
  ]);
}
