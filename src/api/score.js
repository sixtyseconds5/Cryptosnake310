// api/score.js
export default function handler(req, res) {
  if (req.method === "POST") {
    const { fid, username, score } = req.body;
    // TODO: Simpan ke DB
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
