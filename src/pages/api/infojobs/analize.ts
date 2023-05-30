import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi,
} from "openai";

import { NextApiRequest, NextApiResponse } from "next";

const openaiToken = process.env.OPENAI_TOKEN ?? "";
const configuration = new Configuration({ apiKey: openaiToken });
const openai = new OpenAIApi(configuration);

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.Assistant,
    content: `
      Quiero que, 
      cuando te envíe una OFERTA DE EMPLEO junto con mi CV en formato JSON,
      actues como un reclutador experto en la industria de la empresa y si la industria no esta en la oferta actúes como un reclutador general,
      y analices la compatibilidad entre mi cv y la oferta. 
      A continuación, asigna una puntuación del 1 al 10 según tus criterios de análisis,  si el puesto de la oferta no tiene nada que ver con mi carrera o skills ponme una nota super baja de 2 a 3. 
      Sé consico, extrico y directo, expresa tu respuesta como asistente hacia mi persona. 
      Selecciona habilidades faltantes de mi persona y muestra una lista de las mismas. 
      Además,
      proporciona una lista de consultas de búsqueda en YouTube para la lista de habilidades faltantes. 
      Por último, para "respuesta_asistente" y  "recomendacion_general" tienes 400 caracteres como máximox, devuelve el análisis en formato JSON, excluyendo cualquier comentario adicional. Aquí tienes un ejemplo de cómo debe ser la estructura de respuesta en formato JSON
      {
        "respuesta_asistente": String,
        "puntuacion_compatibilidad": Number,
        "habilidades_faltantes": String[],
        "recomendacion_general": String,
        "youtube_queries": String[]
      }
      `,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const oferrandcv = req.body.oferrandcv;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...INITIAL_MESSAGES,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: JSON.stringify(oferrandcv),
        },
      ],
    });
    const data = completion.data.choices[0].message?.content ?? "";
    res.status(200).json(data);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
}
