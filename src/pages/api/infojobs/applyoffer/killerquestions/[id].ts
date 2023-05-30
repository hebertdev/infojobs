import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const infoJobsToken = process.env.PUBLIC_BASIC_AUTH;
    const { id } = req.query; // obtener el "id" de los parámetros de la URL

    const response = await fetch(
      `https://api.infojobs.net/api/1/offer/${id}/killerquestion`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${infoJobsToken} , ${req.headers.authorization}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los datos de la API de Infojobs");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}
