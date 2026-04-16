import { put } from '@vercel/blob';

export default async function handler(req, res) {
  const file = req.files.file;
  const desc = req.body.desc || '';
  const blob = await put(file.name, file.data, {
    access: 'public',
    metadata: { desc }
  });
  res.status(200).json(blob);
}

export const config = {
  api: { bodyParser: false }
};