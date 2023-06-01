import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  createStyles,
  Navbar,
  Title,
  rem,
  getStylesRef,
  Box,
} from "@mantine/core";
import {
  IconUserCircle,
  IconSettings,
  IconFileCertificate,
  IconBriefcase,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    background: "#f9fbfc",
  },

  main: {
    flex: 1,
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
  },

  link: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    borderRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.xs}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
}));

interface NavbarProfileProps {
  children: JSX.Element | JSX.Element[];
}

export function NavbarProfile({ children }: NavbarProfileProps) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (router.asPath === "/profile") {
      setActiveLink("cuenta");
    }

    if (router.asPath === "/profile/cv") {
      setActiveLink("cv");
    }
  }, [router]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 5,
          marginTop: "2px",
        }}
      >
        <Navbar
          height={750}
          width={{ sm: 250 }}
          sx={{
            background: "#f9fbfc",
            border: "none",
          }}
        >
          <Navbar.Section grow>
            <div className={classes.main}>
              <Title
                order={3}
                sx={{
                  margin: "20px 0",
                }}
              >
                Configuración
              </Title>
              <Link href={"/profile"}>
                <p
                  className={cx(classes.link, {
                    [classes.linkActive]: activeLink === "cuenta",
                  })}
                >
                  <IconSettings
                    className={classes.linkIcon}
                    stroke={1.5}
                    style={{ color: "inherit" }}
                  />
                  <span>Cuenta</span>
                </p>
              </Link>

              <Link href={"/profile/cv"}>
                <p
                  className={cx(classes.link, {
                    [classes.linkActive]: activeLink === "cv",
                  })}
                >
                  <IconUserCircle
                    className={classes.linkIcon}
                    stroke={1.5}
                    style={{ color: "inherit" }}
                  />
                  <span>Perfil profesional</span>
                </p>
              </Link>
              <a
                href="#"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <IconFileCertificate
                  className={classes.linkIcon}
                  stroke={1.5}
                />
                <span>Carta de presentación</span>
              </a>
              <a
                href="#"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <IconBriefcase className={classes.linkIcon} stroke={1.5} />
                <span>Mis ofertas</span>
              </a>
            </div>
          </Navbar.Section>
        </Navbar>
        <Box
          sx={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
