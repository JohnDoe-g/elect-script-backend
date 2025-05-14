import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { usuario, token } = req.body;
  const filePath = path.resolve('data', 'usuarios.json');
  
  try{
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    const storedHash = data[usuario];
    
    if(!storedHash){
      return res.json({ok: false});
    }
    
    const match = await bcrypt.compare(token, storedHash); 
    
    res.json({ok: match})
  }catch(error){
    console.error('Error al verificar usuario: ', error);
    res.status(500).json({ok: false, error: 'Error interno del servidor'});
  }
    
  
}


