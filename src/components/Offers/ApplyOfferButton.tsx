//ya no habia tiempo, son las 29/05/23 11pm en peru, el componetizar y tipar todo me iba a costar mucho tiempo :(

import { useEffect, useState, ChangeEvent } from "react";

//hooks
import { useUserContext } from "@/hooks/useUserContext";

//helpers
import { axiosInstance } from "@/helpers/axiosClient";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Box, Textarea, Select } from "@mantine/core";
import { Timeline, Text } from "@mantine/core";
import { Radio, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUserQuestion } from "@tabler/icons-react";

interface ApplyOfferButtonProps {
  offer: Offer;
}

export function ApplyOfferButton({ offer }: ApplyOfferButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open}>Postularme</Button>
      <ModalForm opened={opened} close={close} offer={offer} />
    </>
  );
}

//intefaces
import { CoverLetterDetail, CoverLetterMin } from "@/interfaces/coverletter";
import { CVMin } from "@/interfaces/cv";
import { Offer } from "@/interfaces/offers";
import { KillerQuestion, OpenQuestion } from "@/interfaces/offerquestions";
import {
  ApplyOfferBody,
  OfferKillerQuestion,
  OfferOpenQuestion,
} from "@/interfaces/applyofferbody";
import { SkeletonText } from "./SkeletonText";

interface ModalFormProps {
  opened: boolean;
  close: () => void;
  offer: Offer;
}

interface ObjetSelect {
  value: string;
  label: string;
  main: string;
}

const INITIAL_APPLY_OFFER_BODY: ApplyOfferBody = {
  curriculumCode: "",
  offerOpenQuestions: [],
  offerKillerQuestions: [],
};

function ModalForm({ opened, close, offer }: ModalFormProps) {
  const { handleGetAplications } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [coverLetters, setCoverLetters] = useState<ObjetSelect[]>();
  const [cvs, setCvs] = useState<ObjetSelect[]>();
  const [killerQuestions, setKillerQuestion] = useState<KillerQuestion[]>();
  const [openQuestions, setOpenQuestions] = useState<OpenQuestion[]>();
  const [applyOfferBody, setApplyOfferBody] = useState<ApplyOfferBody>(
    INITIAL_APPLY_OFFER_BODY
  );
  const [coverLetterDetail, setCoverLetterDetail] =
    useState<CoverLetterDetail | null>();

  const handleGetKillerquestions = async () => {
    const { data } = await axiosInstance.get<KillerQuestion[]>(
      `/api/infojobs/applyoffer/killerquestions/${offer.id}`
    );
    setKillerQuestion(data);
  };

  const handleGetOpenQuestion = async () => {
    const { data } = await axiosInstance.get<OpenQuestion[]>(
      `/api/infojobs/applyoffer/openquestions/${offer.id}`
    );
    setOpenQuestions(data);
  };

  const handleGetConverLetters = async () => {
    const { data } = await axiosInstance.get<CoverLetterMin[]>(
      "/api/infojobs/coverletter/getall"
    );
    const transformedArray: ObjetSelect[] = data?.map((obj) => {
      return {
        value: obj.key,
        label: `${obj.name} ${obj.main === true ? "(Principal)" : ""} `,
        main: obj.main.toString(),
      };
    });
    setCoverLetters(transformedArray);
  };

  const handleGetAllCv = async () => {
    const { data } = await axiosInstance.get<CVMin[]>(
      "/api/infojobs/cv/getall"
    );
    const transformedArray: ObjetSelect[] = data?.map((obj) => {
      return {
        value: obj.code,
        label: `${obj.name} ${obj.principal ? "(Principal)" : ""} `,
        main: obj.principal.toString(),
      };
    });
    setCvs(transformedArray);
  };

  const getAllfunction = async () => {
    try {
      setLoading(true);
      await handleGetConverLetters();
      await handleGetAllCv();
      await handleGetKillerquestions();
      await handleGetOpenQuestion();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (opened) {
      getAllfunction();
    }
  }, [opened]);

  const handleApplyOfferChange = (key: keyof ApplyOfferBody, value: any) => {
    setApplyOfferBody((prevState) => ({
      ...prevState!,
      [key]: value,
    }));
  };

  const handleGetDetailCoverLetter = async (value: string) => {
    if (!value) {
      setCoverLetterDetail(null);
      return;
    }
    const { data } = await axiosInstance.get<CoverLetterDetail>(
      `/api/infojobs/coverletter/detail/${value}`
    );
    setCoverLetterDetail(data);
    handleApplyOfferChange("coverLetter", data);
  };

  const handleGetCV = (value: string) => {
    if (!value) {
      handleApplyOfferChange("curriculumCode", "");
      return;
    }
    handleApplyOfferChange("curriculumCode", value);
  };

  const handleEditText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetterDetail({
      ...coverLetterDetail!,
      text: e.target.value,
    });
  };

  const handleSubmitApplyOffer = async () => {
    if (
      killerQuestions &&
      parseInt(killerQuestions.length.toString()) !==
        applyOfferBody.offerKillerQuestions.length
    ) {
      notifications.show({
        title: "Error",
        message: "Todos los campos son requeridos, marca una opción",
        color: "red",
      });
      return;
    }

    if (openQuestions?.length !== applyOfferBody.offerOpenQuestions.length) {
      notifications.show({
        title: "Error",
        message: "Todos los campos son requeridos, responde a la pregunta",
        color: "red",
      });
      return;
    }

    if (applyOfferBody.curriculumCode === "") {
      notifications.show({
        title: "Error",
        message: "Todos los campos son requeridos, selecciona tu CV",
        color: "red",
      });
      return;
    }

    for (let i = 0; i < applyOfferBody.offerOpenQuestions.length; i++) {
      if (applyOfferBody.offerOpenQuestions[i].answer === "") {
        notifications.show({
          title: "Error",
          message: "Todos los campos son requeridos, responde a la pregunta",
          color: "red",
        });
        return;
      }
    }

    try {
      setLoadingSubmit(true);
      const { data } = await axiosInstance.post(
        `/api/infojobs/applyoffer/aplication/${offer.id}`,
        {
          applyOfferBody: applyOfferBody,
        }
      );

      if (data) {
        await handleGetAplications();
        notifications.show({
          title: "Success",
          message: "Te postulaste a esta oferta correctamente",
          color: "green",
        });
      }

      setLoadingSubmit(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Ocurrió un error, intenta nuevamente más tarde",
        color: "red",
      });
      setLoadingSubmit(false);
    }
  };

  const handleCloseModal = async () => {
    close();
  };

  useEffect(() => {
    setApplyOfferBody({
      curriculumCode: "",
      offerOpenQuestions: [],
      offerKillerQuestions: [],
    });
    setCoverLetters([]);
    setKillerQuestion([]);
    setOpenQuestions([]);
  }, [opened]);
  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      centered
      size={"xl"}
      title={
        <Box>
          <Text
            sx={{
              fontSize: "15px",
            }}
          >
            Inscripción en:
          </Text>
          <Text
            sx={{
              fontSize: "20px",
              fontWeight: "bolder",
            }}
          >
            {offer.title}
          </Text>
        </Box>
      }
    >
      {loading ? (
        <>
          <SkeletonText />
          <SkeletonText />
        </>
      ) : (
        <form>
          <TimelineApplyOffer
            killerQuestions={killerQuestions!}
            openQuestions={openQuestions!}
            handleApplyOfferChange={handleApplyOfferChange}
            applyOfferBody={applyOfferBody}
          />
          <Box>
            <Text
              sx={{
                fontSize: "18px",
                marginTop: "15px",
              }}
            >
              Selecciona el CV con el que quieres inscribirte:
            </Text>
            <Select
              clearable
              data={cvs || []}
              onChange={handleGetCV}
              required
            />
          </Box>
          <Box>
            {coverLetters?.length! > 0 && (
              <>
                <Text
                  sx={{
                    fontSize: "18px",
                    marginTop: "15px",
                  }}
                >
                  Carta de presentación para esta oferta (Opcional):
                </Text>
                <Select
                  clearable
                  data={coverLetters || []}
                  onChange={handleGetDetailCoverLetter}
                />
                {coverLetterDetail && (
                  <>
                    <Textarea
                      sx={{
                        marginTop: "5px",
                      }}
                      placeholder="Carta de presentación"
                      autosize
                      minRows={4}
                      maxRows={9}
                      value={coverLetterDetail?.text}
                      onChange={(value) => handleEditText(value)}
                    />
                    <small>
                      * La modificación no se guardará en tu carta presentación
                      seleccionada, solo es para esta postulación.
                    </small>
                  </>
                )}
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 10,
            }}
          >
            <Button
              sx={{
                marginTop: "10px",
              }}
              fullWidth
              onClick={handleSubmitApplyOffer}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "Enviando postulación" : " Postular ahora"}
            </Button>
          </Box>
        </form>
      )}
    </Modal>
  );
}

interface TimeLineProps {
  killerQuestions?: KillerQuestion[];
  openQuestions?: OpenQuestion[];
  handleApplyOfferChange: (key: keyof ApplyOfferBody, value: any) => void;
  applyOfferBody?: ApplyOfferBody;
}

function TimelineApplyOffer({
  killerQuestions,
  openQuestions,
  handleApplyOfferChange,
  applyOfferBody,
}: TimeLineProps) {
  return (
    <>
      {killerQuestions?.length! > 0 ||
        (openQuestions?.length! > 0 && (
          <Text
            sx={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Cuestionario de la empresa:
          </Text>
        ))}

      <Timeline bulletSize={24} lineWidth={2}>
        {killerQuestions?.map((question, index) => (
          <Timeline.Item
            key={index}
            bullet={<IconUserQuestion size={12} />}
            title={question.question}
          >
            <Answers
              question={question}
              handleApplyOfferChange={handleApplyOfferChange}
              applyOfferBody={applyOfferBody}
            />
          </Timeline.Item>
        ))}

        {openQuestions?.map((question, index) => (
          <Timeline.Item
            key={index}
            title={question.question}
            bullet={<IconUserQuestion size={12} />}
          >
            <TextAreaResponse
              question={question}
              handleApplyOfferChange={handleApplyOfferChange}
              applyOfferBody={applyOfferBody}
            />
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}

interface AnswersProps {
  question: any;
  handleApplyOfferChange: (key: keyof ApplyOfferBody, value: any) => void;
  applyOfferBody?: ApplyOfferBody;
}

function Answers({
  question,
  handleApplyOfferChange,
  applyOfferBody,
}: AnswersProps) {
  const [value, setValue] = useState("");
  const handleChangeRadio = (value: string) => {
    setValue(value);
    let new_array: OfferKillerQuestion[] =
      applyOfferBody!.offerKillerQuestions || [];
    let objIndex = new_array.findIndex((obj) => obj.id === question.id);
    if (objIndex !== -1) {
      // Si ya existe un objeto con el mismo question.id, actualiza el valor answerId
      new_array[objIndex].answerId = parseInt(value);
    } else {
      // Si no existe un objeto con el mismo question.id, agrega un nuevo objeto
      let obj: OfferKillerQuestion = {
        id: question.id,
        answerId: parseInt(value),
      };
      new_array.push(obj);
    }
    handleApplyOfferChange("offerKillerQuestions", new_array);
  };

  return (
    <Radio.Group
      value={value}
      onChange={handleChangeRadio}
      name={question.id}
      withAsterisk
    >
      <Group mt="xs">
        {question.answers.map((answer: any, index: number) => (
          <Radio
            key={index}
            value={answer.id.toString()}
            label={answer.answer}
          />
        ))}
      </Group>
    </Radio.Group>
  );
}

interface TextAreaResponseProps {
  question: OpenQuestion;
  handleApplyOfferChange: (key: keyof ApplyOfferBody, value: any) => void;
  applyOfferBody?: ApplyOfferBody;
}

function TextAreaResponse({
  question,
  handleApplyOfferChange,
  applyOfferBody,
}: TextAreaResponseProps) {
  const [value, setValue] = useState("");

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    let new_array = applyOfferBody?.offerOpenQuestions || [];
    let objIndex = new_array.findIndex((obj) => obj.id === question.id);
    if (objIndex !== -1) {
      // Si ya existe un objeto con el mismo question.id, actualiza el valor answer
      new_array[objIndex].answer = e.target.value;
    } else {
      // Si no existe un objeto con el mismo question.id, agrega un nuevo objeto
      let obj: OfferOpenQuestion = {
        id: question.id,
        answer: e.target.value,
      };
      new_array.push(obj);
    }
    handleApplyOfferChange("offerOpenQuestions", new_array);
  };

  return (
    <Textarea
      placeholder="Máximo 400 caracteres"
      autosize
      minRows={2}
      maxRows={4}
      onChange={handleChangeValue}
      value={value}
    />
  );
}
