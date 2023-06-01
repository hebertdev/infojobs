import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Link as LinkScroll } from "react-scroll";

//hooks
import { useDisclosure } from "@mantine/hooks";
import { useAuthentication } from "hooks/useAuthentication";
import { useUserContext } from "@/hooks/useUserContext";

//interfaces
import { Candidate } from "@/interfaces/user";

import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Box,
  Text,
  Divider,
} from "@mantine/core";

//components
import { SearchForm } from "./SearchForm";

//icons
import { IconUserCircle } from "@tabler/icons-react";
import { LogoMinInfojobs } from "./SvgIcons";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function AppHeader() {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { handleGetToken, loading, handleGetUser } = useAuthentication();

  useEffect(() => {
    handleGetUser();
  }, []);

  const router = useRouter();

  return (
    <>
      <Header
        height={HEADER_HEIGHT}
        sx={{ borderBottom: 0, position: "fixed", zIndex: 3 }}
      >
        <Container className={classes.inner} size={"xl"}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <Link href={"/"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LogoMinInfojobs
                  style={{
                    width: "40px",
                  }}
                />
                <Text
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginLeft: "5px",
                  }}
                >
                  CareerUp
                </Text>
              </Box>
            </Link>
          </Group>
          <Group spacing={5} className={classes.links}>
            {router.asPath === "/" && (
              <Box
                sx={{
                  display: "flex",
                  gap: 20,
                }}
              >
                <LinkScroll spy={true} smooth={true} to="ia_analize">
                  <Text
                    sx={{
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Análisis IA
                  </Text>
                </LinkScroll>

                <Link href={"/"}>
                  <Text
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    CV Digital
                  </Text>
                </Link>
              </Box>
            )}

            {/* <Menu trigger="hover">
              <Menu.Target>
                <p style={{ cursor: "pointer" }}>Home</p>
              </Menu.Target>
              <Menu.Dropdown>HOMECITO</Menu.Dropdown>
            </Menu> */}
            {router.asPath !== "/" && <SearchForm />}
          </Group>
          <ButtonAuth handleGetToken={handleGetToken} loading={loading} />
        </Container>
        <Divider
          sx={{
            borderColor: "rgba(0,0,0,0.05)",
          }}
        />
      </Header>
      <div style={{ height: HEADER_HEIGHT }}></div>
    </>
  );
}

interface ButtonAuthProps {
  handleGetToken: () => void;
  loading: boolean;
}

function ButtonAuth({ handleGetToken, loading }: ButtonAuthProps) {
  const { user } = useUserContext();

  return (
    <>
      {user ? (
        <UserButton user={user} />
      ) : (
        <Button onClick={handleGetToken} leftIcon={<IconUserCircle />}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </Button>
      )}
    </>
  );
}

interface UserButtonProps {
  user: Candidate;
}

function UserButton({ user }: UserButtonProps) {
  return (
    <>
      <Link href={"/profile"}>
        <Button variant="default" leftIcon={<IconUserCircle />}>
          {user.name}
        </Button>
      </Link>
    </>
  );
}
