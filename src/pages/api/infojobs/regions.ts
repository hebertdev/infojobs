import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const infoJobsToken = process.env.PUBLIC_BASIC_AUTH; // Reemplaza 'tu_token_aqui' con tu token de autenticación de Infojobs
    const response = await fetch('https://api.infojobs.net/api/1/dictionary/region', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${infoJobsToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API de Infojobs');
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error:unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}
