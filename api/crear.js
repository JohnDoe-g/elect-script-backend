import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'

const filePath = path.resolve('./data/usuarios.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { adminSecret, nuevoUsuario, nuevoToken } = req.body;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  try {
    const usuarios = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : {};

    const hashedToken ) await bcrypt.hash(nuevoToken, 10);
    
    usuarios[nuevoUsuario] = nuevoToken;

    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));

    return res.status(200).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
    console.error('Error al guardar usuario:', error)
    return res.status(500).json({ error: 'Error al guardar usuario' });
  }
}
