//mantine
import { Container, Title, Text, Box, Image } from "@mantine/core";
import image_recommendation from "@/assets/recomendación.png";
import image_recommendation2 from "@/assets/recomendacion2.png";
import form_submit from "@/assets/form_submit.png";
import { Carousel } from "@mantine/carousel";

export function Analize() {
  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% )",
          width: "98%",
          margin: "auto",
          borderRadius: "20px",
          marginTop: "50px",
        }}
      >
        <Container
          size={"xl"}
          sx={{
            padding: "20px",
          }}
          id="ia_analize"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Title
                order={2}
                sx={{
                  fontSize: "40px",
                }}
              >
                Recibe feedback de nuestra IA
              </Title>
              <Text
                sx={{
                  fontSize: "20px",
                }}
              >
                ¡Obtén una ventaja en tu búsqueda de empleo con nuestra nueva
                función de análisis de cv y oferta de empleo basada en la
                inteligencia artificial! Simplemente dirigete a una oferta de
                empleo que te interese, y nuestro sistema generará un análisis
                detallado y personalizado. Descubre cómo tus habilidades y
                experiencia se alinean con los requisitos del trabajo, obtén
                recomendaciones para mejorar tu CV y aumenta tus posibilidades
                de conseguir entrevistas.
              </Text>
            </Box>
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Carousel mx="auto" withIndicators>
                <Carousel.Slide>
                  <Image src={image_recommendation.src} alt="recomendation" />
                </Carousel.Slide>
                <Carousel.Slide>
                  <Image src={image_recommendation2.src} alt="recomendation" />
                </Carousel.Slide>
              </Carousel>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: "40px",
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Image src={form_submit.src} alt="form submit" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Title
                order={2}
                sx={{
                  fontSize: "40px",
                }}
              >
                Postula al Instante
              </Title>
              <Text
                sx={{
                  fontSize: "20px",
                }}
              >
                La mejor experiencia de usuario para postular a una nueva oferta
                de empleo
              </Text>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
