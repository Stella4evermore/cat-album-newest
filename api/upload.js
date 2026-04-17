import { getStore } from '@netlify/blobs';

export default async function handler(req, res) {
  // 1. 允许跨域（前端能拿到响应）
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 2. 只接受 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = file.name || `image_${Date.now()}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    
    const store = getStore({ name: 'cat-images' });
    
    // 3. 存文件（Netlify 用 key-value 存，key 就是文件名）
    await store.set(fileName, buffer, {
      metadata: { uploadedAt: new Date().toISOString() }
    });

    // 4. 返回可直接访问的 URL（Netlify 会自动生成 CDN 链接）
    const url = store.url(fileName);
    
    res.status(200).json({ 
      success: true, 
      url, 
      key: fileName 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
}
