import { getStore } from '@netlify/blobs';

export default async function handler(req, res) {
  const store = getStore({ name: 'cat-images' });
  // ...处理文件并保存到 store
}
