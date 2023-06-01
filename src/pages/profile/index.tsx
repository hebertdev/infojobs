//hooks
import { useUserContext } from "@/hooks/useUserContext";

//components
import { NavbarProfile } from "@/components/pages/Profile";

import { Container, Text, Button, Box, Paper, Avatar } from "@mantine/core";

import { Input } from "@mantine/core";

export default function ProfilePage() {
  const { user, logout } = useUserContext();

  return (
    <>
      <Container size={"lg"}>
        <NavbarProfile>
          <Paper
            sx={{
              borderRadius: "10px",
              border: "0.0625rem solid #dee2e680",
              padding: "15px",
            }}
          >
            <Text weight={"bolder"}>Datos personales</Text>
            <Box
              sx={{
                marginTop: "10px",
              }}
            >
              <Avatar
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 10,
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Input.Wrapper
                label="Nombre"
                required
                sx={{
                  width: "100%",
                }}
              >
                <Input<any> placeholder="Nombre" disabled value={user?.name} />
              </Input.Wrapper>
              <Input.Wrapper
                label="Apellidos"
                required
                sx={{
                  width: "100%",
                }}
              >
                <Input<any>
                  placeholder="Apellidos"
                  disabled
                  value={user?.surname1}
                />
              </Input.Wrapper>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 10,
              }}
            >
              <Input.Wrapper
                label="Email"
                required
                sx={{
                  width: "100%",
                }}
              >
                <Input<any> placeholder="Email" disabled value={user?.email} />
              </Input.Wrapper>
              <Input.Wrapper
                label="Ciudad"
                required
                sx={{
                  width: "100%",
                }}
              >
                <Input<any> placeholder="Ciudad" disabled value={user?.city} />
              </Input.Wrapper>
            </Box>
            <Button
              sx={{
                marginTop: "15px",
              }}
              onClick={logout}
            >
              Cerrar sesión
            </Button>
          </Paper>
        </NavbarProfile>
      </Container>
    </>
  );
}
