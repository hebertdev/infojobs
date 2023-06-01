import { useEffect, useState } from "react";

//mantine
import { Text, Button, Box, Paper, Avatar, Group, Title } from "@mantine/core";

import { Accordion } from "@mantine/core";
import { IconBook2 } from "@tabler/icons-react";
import { CvEducationResponse, EducationRes } from "@/interfaces/cv";
import { axiosInstance } from "@/helpers/axiosClient";
import { SkeletonText } from "@/components/Offers/SkeletonText";

interface EducationProps {
  code?: string;
}

export function Education({ code }: EducationProps) {
  const [cvEducations, setCvEducations] = useState<EducationRes[]>();
  const [loading, setLoading] = useState(true);

  const handleGetCvExperience = async () => {
    setLoading(true);
    const { data } = await axiosInstance.get<CvEducationResponse>(
      `/api/infojobs/cv/cveducation/${code}`
    );
    console.log(data);
    setCvEducations(data.education);
    setLoading(false);
  };

  useEffect(() => {
    if (code) {
      handleGetCvExperience();
    }
  }, [code]);

  return (
    <Paper
      sx={{
        borderRadius: "10px",
        border: "0.0625rem solid #dee2e680",
        padding: "15px",
      }}
    >
      <Text weight={"bolder"}>Experiencia laboral</Text>
      <Text size="sm" color="dimmed" weight={400}>
        Te recomendamos agregar solo la licenciatura y estudios posteriores como
        postgrados, maestrías y diplomados.
      </Text>
      <Box
        sx={{
          display: "flex",
          gap: 10,
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Accordion
          chevronPosition="right"
          variant="contained"
          sx={{
            width: "100%",
          }}
        >
          {loading ? (
            <SkeletonText />
          ) : (
            <>
              {cvEducations?.map((education) => (
                <AcordionEducation key={education.id} education={education} />
              ))}
            </>
          )}
        </Accordion>
      </Box>

      <Button size="xs">Añadir experiencia</Button>
    </Paper>
  );
}

interface AcordionEducationProps {
  education?: EducationRes;
}

function AcordionEducation({ education }: AcordionEducationProps) {
  const formatted = (date: any) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    });
  };

  return (
    <Accordion.Item value={"1"}>
      <Accordion.Control>
        <Group noWrap>
          <Avatar radius="xl" size="lg">
            <IconBook2 />
          </Avatar>
          <div>
            <Title order={4}> {education?.educationLevelCode} </Title>
            <Text> {education?.institutionName} </Text>
            <Text size="sm" color="dimmed" weight={400}>
              {education?.startingDate && (
                <>{formatted(education?.startingDate)}</>
              )}
              {education?.finishingDate && (
                <>- {formatted(education?.finishingDate)}</>
              )}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">En desarrollo</Text>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
