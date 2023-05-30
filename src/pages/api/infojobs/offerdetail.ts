import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { offerId } = req.query;

    const infoJobsToken = process.env.PUBLIC_BASIC_AUTH; 
    const response = await fetch(`https://api.infojobs.net/api/7/offer/${offerId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${infoJobsToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la oferta');
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}
