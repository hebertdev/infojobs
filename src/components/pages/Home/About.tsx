//components
import { SearchForm } from "@/components/SearchForm";

import { Text, Container, Box, Title } from "@mantine/core";

//assets
import banner from "assets/banner_infojobs.webp";

export function About() {
  return (
    <Box
      sx={{
        backgroundColor: "orange",
        height: "500px",
        background: `url('${banner.src}')`,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100% - 100px)",
        }}
      >
        <Container size={"md"}>
          <Box>
            <Title
              order={1}
              sx={{
                textAlign: "center",
                fontSize: "40px",
                display: "block",
                width: "600px",
                margin: "auto",
                marginBottom: "10px",
                color: "white",
              }}
            >
              Potencia tu perfil profesional con CareerUp de Infojobs{" "}
            </Title>
            <Text
              sx={{
                textAlign: "center",
                fontSize: "22px",
                color: "white",
              }}
            >
              Encuentra el empleo ideal, mejora tu CV y desarrolla tus
              habilidades. Únete a CareerUp y lleva tu carrera al siguiente
              nivel
            </Text>
          </Box>
          <SearchForm />
          <Text
            sx={{
              textAlign: "center",
              color: "white",
            }}
          >
            Inicia sesión y activa herramientas exclusivas, Encuentra resultados
            personalizados y potencia tu carrera.
          </Text>
        </Container>
      </Box>
      <Box
        sx={{
          height: 150,
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M0.00,49.98 C131.77,91.30 361.45,92.28 500.84,57.73 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: "none", fill: "#FFF" }}
          />
        </svg>
      </Box>
    </Box>
  );
}
