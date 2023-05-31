import { useState, Fragment } from "react";

//services
import { searchVideos } from "@/services/youtube";

//helpers
import { axiosInstance } from "@/helpers/axiosClient";

//hooks
import { useUserContext } from "@/hooks/useUserContext";

//mantine
import { Button, Collapse, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Text, Progress, Box, RingProgress, Badge } from "@mantine/core";
import {
  IconSparkles,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

//data
import { languages } from "@/data/languages";
import { OfferDetail } from "@/interfaces/offerDetail";

interface Props {
  offerDetail?: OfferDetail;
  isApplied: boolean;
}

export function AnalyzeButton({ offerDetail, isApplied }: Props) {
  const { user } = useUserContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>();
  const [progressValue, setProgressValue] = useState(0);
  const [learningSuggestion, setLearningSuggestion] = useState<any>();

  const handleClose = () => {
    close();
    setRecommendation(null);
    setProgressValue(0);
    setLearningSuggestion(null);
  };

  const handleGetAllInformation = async () => {
    if (loading) return;
    try {
      setLoading(true);
      animateProgress();
      const { data } = await axiosInstance.get("/api/infojobs/listcv");
      const principalObj = data.find((obj: any) => obj.principal === true);
      const principalCode = principalObj.code;
      if (principalCode) {
        const { data: skills } = await axiosInstance.get(
          `/api/infojobs/cvskill/${principalCode}`
        );
        const { data: futureJob } = await axiosInstance.get(
          `/api/infojobs/cvfuturejob/${principalCode}`
        );
        const { data: experience } = await axiosInstance.get(
          `/api/infojobs/cvexperience/${principalCode}`
        );

        const userLanguages = skills.language;
        const newLanguageArray = userLanguages.map((item: any) => {
          const language = languages.find((lang) => lang.id === item.id);
          return {
            name: language ? language.value : "",
            level: item.comments,
            writing: item.writing,
            reading: item.reading,
            speaking: item.speaking,
          };
        });

        const newJobsArray = experience?.experience?.map((job: any) => {
          return {
            position: job.job,
            expertise: job.expertise,
          };
        });

        const mi_cv = {
          my_name: user?.name,
          previousJobs: [...newJobsArray],
          skills: [...skills.expertise],
          languages: [...newLanguageArray],
          dreamJob: {
            position: futureJob.preferredPosition,
            workDay: futureJob.workDay,
            salaryMin: futureJob.salaryMin,
          },
        };

        const job_offer = {
          job: offerDetail?.title,
          industria: offerDetail?.profile.typeIndustry.value,
          description: offerDetail?.description,
          skills: [...offerDetail?.skillsList!],
          requirements: {
            experienceMin: offerDetail?.experienceMin.value,
            minRequirements: offerDetail?.minRequirements,
          },
          workday: offerDetail?.journey.value,
          salary: offerDetail?.salaryDescription,
        };

        const json = {
          job_offer,
          mi_cv,
        };
        if (json) {
          const { data: analize } = await axiosInstanceBackend.post(
            "/analize/",
            { texto: JSON.stringify(json) }
          );

          const analize_json = analize.respuesta;

          setRecommendation(analize_json);
          if (analize_json) {
            console.log(analize_json);
            let resultados: any = [];
            const promesas = analize_json.youtube_queries.map((query: string) =>
              searchVideos(query)
            );
            // Esperar a que todas las promesas se resuelvan
            await Promise.all(promesas).then((res: any[]) => {
              // Almacenar los resultados de las búsquedas en el array de resultados
              res.forEach((data: any, index: number) => {
                resultados.push({
                  query: analize_json.youtube_queries[index],
                  videos: data.data.items,
                });
              });
            });

            setLearningSuggestion(resultados);
          }
        }

        setLoading(false);
      }

      notifications.show({
        title: "Success",
        message: `Análisis terminado`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `Ocurrió un error al analizar, intentelo de nuevo.`,
        color: "red",
      });
      setLoading(false);
    }
  };

  const animateProgress = () => {
    let value = 0;
    const increment = 0.5;
    const interval = 30;

    const timer = setInterval(() => {
      if (value >= 97) {
        clearInterval(timer);
      } else {
        value += increment;
        setProgressValue(value);
      }
    }, interval);
  };

  return (
    <>
      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: "#4cdbd5", to: "#2088c2", deg: 90 }}
        leftIcon={<IconSparkles />}
        sx={{
          marginLeft: "5px",
        }}
        disabled={!user ? true : isApplied ? true : false}
      >
        Análisis
      </Button>
      <Modal
        opened={opened}
        onClose={handleClose}
        size={"xl"}
        title={
          <Text
            sx={{
              fontWeight: "normal",
              display: "flex",
              alignItems: "center",
            }}
          >
            Análisis de compatibilidad laboral con ayuda de IA
          </Text>
        }
        centered
      >
        {loading ? (
          <>
            <Box>
              <Text>
                Analizando... Este análisis se esta basando en tu CV(principal)
                de Infojobs y la oferta seleecionada.
              </Text>
              <Progress
                value={progressValue}
                role="progressbar"
                animate={true}
                color="cyan"
              />
            </Box>
            <SkeletonText />
          </>
        ) : (
          <>
            {recommendation ? (
              <>
                <AnalysisResult
                  recommendation={recommendation}
                  learningSuggestion={learningSuggestion}
                />
              </>
            ) : (
              <>
                Analizar la compatibilidad entre la oferta laboral y tu CV puede
                darte información valiosa para mejorar tus habilidades y
                aumentar tus oportunidades de destacarte en el proceso de
                selección.
                <br />
                <br />
                El análisis se esta basará en tu CV(principal) de Infojobs y la
                oferta seleecionada.
                <Button
                  variant="gradient"
                  gradient={{ from: "#4cdbd5", to: "#2088c2", deg: 90 }}
                  leftIcon={<IconSparkles />}
                  fullWidth
                  sx={{
                    marginTop: "10px",
                  }}
                  onClick={handleGetAllInformation}
                >
                  Comenzar análisis
                </Button>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

interface AnalysisResultProps {
  recommendation: any;
  learningSuggestion: any;
}

function AnalysisResult({
  recommendation,
  learningSuggestion,
}: AnalysisResultProps) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <RingProgress
          sections={[
            {
              value: parseInt(recommendation.puntuacion_compatibilidad) * 10,
              color:
                parseInt(recommendation.puntuacion_compatibilidad) >= 8
                  ? "#2ECC40"
                  : parseInt(recommendation.puntuacion_compatibilidad) >= 6
                  ? "#FFDC00"
                  : "#FF4136",
            },
          ]}
          label={
            <Text
              color={
                parseInt(recommendation.puntuacion_compatibilidad) >= 8
                  ? "green"
                  : parseInt(recommendation.puntuacion_compatibilidad) >= 6
                  ? "yellow"
                  : "red"
              }
              weight={700}
              align="center"
              size="xl"
            >
              {parseInt(recommendation.puntuacion_compatibilidad) * 10}%
            </Text>
          }
        />
        <Box>
          <Text
            sx={{
              fontSize: "15px",
            }}
          >
            <IconSparkles size={"15px"} /> {recommendation.respuesta_asistente}
          </Text>
        </Box>
      </Box>
      {recommendation.habilidades_faltantes?.length !== 0 && (
        <Box>
          <Text sx={{ fontWeight: "bolder", marginBottom: "10px" }}>
            Habilidades requeridas
          </Text>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {recommendation.habilidades_faltantes.map(
              (skill: any, index: any) => (
                <Badge key={index} color="orange">
                  {skill}
                </Badge>
              )
            )}
          </Box>
        </Box>
      )}
      <Box>
        <Text sx={{ fontWeight: "bolder", margin: "10px 0" }}>
          Recomendación general
        </Text>
        <Box>
          <Text
            sx={{
              fontSize: "15px",
            }}
          >
            {recommendation.recomendacion_general}
          </Text>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text sx={{ fontWeight: "bolder", margin: "10px 0" }}>
            Sugerencia de aprendizaje
          </Text>
          <ActionIcon onClick={toggle} sx={{ marginLeft: "10px" }}>
            {opened ? <IconChevronUp /> : <IconChevronDown />}
          </ActionIcon>
        </Box>
        <Collapse in={opened}>
          <CarrouselVideos learningSuggestion={learningSuggestion} />
        </Collapse>
        {/* {recommendation.puntuacion_compatibilidad >= 8 && (
          <Button>Postular ahora</Button>
        )} */}
      </Box>
      {/* recommendation.youtube_queries */}
    </>
  );
}

interface CarrouselVideosProps {
  learningSuggestion: any;
}

function CarrouselVideos({ learningSuggestion }: CarrouselVideosProps) {
  return (
    <>
      {/* Recorrer cada objeto de resultados */}
      {learningSuggestion?.map((resultado: any, index: any) => (
        <Fragment key={index}>
          <Text
            weight={"bold"}
            sx={{ fontSize: "14px", color: "grey", marginBottom: "3px" }}
          >
            {resultado.query}
          </Text>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              marginBottom: "10px",
            }}
          >
            {resultado.videos.map((video: any, videoIndex: any) => (
              <Box
                key={videoIndex}
                sx={{
                  width: "33.3%",
                }}
              >
                <Video video={video} />
              </Box>
            ))}
          </Box>
        </Fragment>
      ))}
    </>
  );
}

import { Card, Image, Group } from "@mantine/core";
import { ApplyOfferButton } from "./ApplyOfferButton";
import { SkeletonText } from "./SkeletonText";
import { axiosInstanceBackend } from "@/helpers/axiosBackend";
import { notifications } from "@mantine/notifications";

interface VideoProps {
  video: any;
}
function Video({ video }: VideoProps) {
  let videoUrl;
  if (video.id.kind === "youtube#playlist") {
    videoUrl = `https://www.youtube.com/playlist?list=${video.id.playlistId}`;
  } else if (video.id.kind === "youtube#video") {
    videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
  }
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        height: "200px",
        userSelect: "none",
        width: "100%",
      }}
    >
      <Card.Section
        component="a"
        href={videoUrl}
        target="_blank"
        sx={{
          maxHeight: "132px",
          overflow: "hidden",
        }}
      >
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          sx={{
            userSelect: "none",
          }}
        />
      </Card.Section>

      <Group position="apart" mt="md">
        <Text
          weight={500}
          sx={{ fontSize: "13px" }}
          component="a"
          href={videoUrl}
          target="_blank"
        >
          {video.snippet.title.length > 55
            ? `${video.snippet.title.slice(0, 55)}...`
            : video.snippet.title}
        </Text>
      </Group>
    </Card>
  );
}
