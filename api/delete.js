import { getStore } from '@netlify/blobs';

export default async function handler(req, res) {
  try {
    const { key } = req.body; // 注意：Netlify 叫 key，不叫 path
    
    if (!key) {
      return res.status(400).json({ success: false, error: 'Missing key' });
    }

    const store = getStore({ name: 'cat-images' });
    await store.delete(key);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
