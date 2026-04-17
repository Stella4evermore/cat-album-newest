import { getStore } from '@netlify/blobs';

export default async function handler(req, res) {
  try {
    // 1. 连接到 Netlify Blob 存储（storeId 随便起个名，如 'cat-images'）
    const store = getStore({ name: 'cat-images' });
    
    // 2. 列出所有图片（Netlify 返回的是 { blobs: [...] }）
    const { blobs } = await store.list();
    
    // 3. 返回给前端
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ 
      success: true, 
      images: blobs.map(item => ({ url: item.url, name: item.key }))
    });
  } catch (error) {
    console.error('Netlify Blob List Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
