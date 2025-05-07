import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { usuario, token } = req.body;
  const filePath = path.resolve('data', 'usuarios.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  if (data[usuario] === token) {
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
}