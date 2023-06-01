import { useEffect, useState } from "react";

//helpers
import { axiosInstance } from "@/helpers/axiosClient";

import {
  Text,
  Button,
  Box,
  Paper,
  Avatar,
  Group,
  Title,
  Badge,
} from "@mantine/core";

import { Accordion } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";

//interfaces
import { CvExperienseResponse, Experience } from "@/interfaces/cv";
import { SkeletonText } from "@/components/Offers/SkeletonText";

interface WorkExperienceProps {
  code?: string;
}

export function WorkExperience({ code }: WorkExperienceProps) {
  const [cvExperiences, setCvExperiences] = useState<Experience[]>();
  const [loading, setLoading] = useState(true);

  const handleGetCvExperience = async () => {
    setLoading(true);
    const { data } = await axiosInstance.get<CvExperienseResponse>(
      `/api/infojobs/cv/cvexperience/${code}`
    );
    setCvExperiences(data.experience);
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
        Te recomendamos complementar tu perfil con las experiencias y logros
        relacionados a tu conjunto de habilidades y tecnologías.
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
              {cvExperiences?.map((experience) => (
                <AcordionExperience
                  key={experience.id}
                  experience={experience}
                />
              ))}
            </>
          )}
        </Accordion>
      </Box>
      <Button size="xs">Añadir experiencia</Button>
    </Paper>
  );
}

interface AcordionExperienceProps {
  experience?: Experience;
}

function AcordionExperience({ experience }: AcordionExperienceProps) {
  const formatted = (date: any) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    });
  };

  return (
    <Accordion.Item value={experience!.id.toString()}>
      <Accordion.Control>
        <Group noWrap>
          <Avatar radius="xl" size="lg">
            <IconBuilding />
          </Avatar>
          <div>
            <Title order={4}> {experience?.job} </Title>
            <Text> {experience?.company} </Text>
            <Text size="sm" color="dimmed" weight={400}>
              {experience?.startingDate && (
                <>{formatted(experience?.startingDate)}</>
              )}
              {experience?.finishingDate && (
                <>- {formatted(experience?.finishingDate)}</>
              )}
            </Text>
          </div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{experience?.description}</Text>
        {experience?.expertise.map((expert, index) => (
          <Badge key={index}> {expert.skill} </Badge>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
}
