import fs from 'fs/promises';
import path from 'path';

const ADMIN_SECRET = 'mi_super_clave_admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { adminSecret, nuevoUsuario, nuevoToken } = req.body;
  if (adminSecret !== ADMIN_SECRET) {
    return res.status(403).json({ ok: false, error: 'No autorizado' });
  }

  const filePath = path.resolve('data', 'usuarios.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  data[nuevoUsuario] = nuevoToken;

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  res.json({ ok: true, mensaje: `Usuario '${nuevoUsuario}' creado.` });
}