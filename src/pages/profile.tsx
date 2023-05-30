import { useState } from "react";

//hooks
import { useUserContext } from "@/hooks/useUserContext";

import { Container, Divider, Text, Button } from "@mantine/core";

export default function ProfilePage() {
  const { user, logout } = useUserContext();
  const [code, setCode] = useState<string>();

  return (
    <>
      <Container>
        <h1>mi perfil </h1>
        <Divider />
        <Text>{user?.email}</Text>
        <Text>{user?.name}</Text>
        <Text>{user?.surname1}</Text>
        <Text>{user?.city}</Text>
        <Text>{user?.province.value}</Text>
        <Button variant="outline" onClick={() => logout()}>
          Cerrar sesión
        </Button>
      </Container>
    </>
  );
}
