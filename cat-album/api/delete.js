import { del } from '@vercel/blob';

export default async function handler(req, res) {
  const { path } = req.body;
  await del(path);
  res.status(200).json({ success: true });
}