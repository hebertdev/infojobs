import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/useUserContext";

//components
import { NavbarProfile } from "@/components/pages/Profile";
import { WorkExperience, Education } from "@/components/pages/Cv";

import { Container, Box, Select } from "@mantine/core";
import { axiosInstance } from "@/helpers/axiosClient";
import { CVMin } from "@/interfaces/cv";

interface ObjetSelect {
  value: string;
  label: string;
  main: string;
}

export default function CvPage() {
  const { user } = useUserContext();
  const [cvs, setCvs] = useState<ObjetSelect[]>([]);
  const [valueCv, setValueCv] = useState("");

  const handleGetAllCv = async () => {
    const { data } = await axiosInstance.get<CVMin[]>(
      "/api/infojobs/cv/getall"
    );
    const transformedArray: ObjetSelect[] = data?.map((obj) => {
      return {
        value: obj.code,
        label: `${obj.name} ${obj.principal ? "(Principal)" : ""}`,
        main: obj.principal.toString(),
      };
    });

    setCvs(transformedArray);
    const principalCv = transformedArray.find((obj) => obj.main === "true");
    if (principalCv) {
      setValueCv(principalCv.value);
    }
  };

  const handleGetCV = (value: string) => {
    setValueCv(value);
  };

  useEffect(() => {
    if (user) {
      handleGetAllCv();
    }
  }, [user]);

  return (
    <>
      {user ? (
        <Container size={"lg"}>
          <NavbarProfile>
            <Box
              sx={{
                marginBottom: "10px",
              }}
            >
              <Select
                label="Mis CV"
                placeholder="Elige uno"
                sx={{
                  width: "250px",
                }}
                radius={"md"}
                data={cvs || []}
                value={valueCv}
                onChange={handleGetCV}
              />
            </Box>
            <WorkExperience code={valueCv} />
            <div style={{ height: "15px" }} />
            <Education code={valueCv} />
            <small>Esta sección esta en construcción</small>
          </NavbarProfile>
        </Container>
      ) : (
        <>
          <Container size={"lg"}>
            <br />
            Necesitas autenticación
          </Container>{" "}
        </>
      )}
    </>
  );
}
