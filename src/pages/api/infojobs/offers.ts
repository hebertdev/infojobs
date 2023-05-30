import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const infoJobsToken = process.env.PUBLIC_BASIC_AUTH;
    const {
      q,
      province,
      subcategory,
      page,
      sinceDate,
      salaryMin,
      salaryMax,
      salaryPeriod,
      workday,
      teleworking,
      experienceMin,
      contractType
    } = req.query; // Obtén los parámetros de la consulta

    const baseUrl = "https://api.infojobs.net/api/9/offer";
    const params = new URLSearchParams();



    if (q) {
      params.append("q", q.toString());
    }
    
    if (subcategory) {
      params.append("subcategory", subcategory.toString());
    }

    if (page) {
      params.append("page", page.toString());
    }

    if (sinceDate) {
      params.append("sinceDate", sinceDate.toString());
    }

    if (salaryPeriod) {
      params.append("salaryPeriod", salaryPeriod.toString());
    }

    if (salaryMin) {
      params.append("salaryMin", salaryMin.toString());
    }

    if (salaryMax) {
      params.append("salaryMax", salaryMax.toString());
    }

    if (workday) {
      params.append("workday", workday.toString());
    }

    if(teleworking) {
      params.append("teleworking", teleworking.toString())
    }

    if(experienceMin){
      params.append("experienceMin", experienceMin.toString())
    }

    if(contractType){
      params.append("contractType", contractType.toString())
    }

    if (province) {
      params.append("province", province.toString());
    }

    //console.log(req.query);
    // Agrega otros parámetros según tus necesidades
    const url = `${baseUrl}?${params.toString()}`;
    //console.log(url)
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${infoJobsToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos de la API de Infojobs");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}
