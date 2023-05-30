import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//interfaces
import { Offer } from "@/interfaces/offers";
import { OfferDetail } from "@/interfaces/offerDetail";

//hooks
import { useUserContext } from "@/hooks/useUserContext";

//components
import { ActionButtons } from "./ActionButtos";

//mantine
import { Box, Text, Image, Badge, Tabs } from "@mantine/core";
import { IconMapPin, IconBuildingEstate } from "@tabler/icons-react";

//assets
import logo_empresa from "@/assets/empresa_logo.webp";

interface Props {
  offer: Offer;
}

export function CardOfferDetail({ offer }: Props) {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState<string | null>("SKILLS");
  const getOfferDetail = async (offerId: string): Promise<OfferDetail> => {
    const res = await fetch(`/api/infojobs/offerdetail?offerId=${offerId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = (await res.json()) as OfferDetail;
    return data;
  };

  const query = useQuery([`offerdetail-${offer.id}`], () =>
    getOfferDetail(offer.id)
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <Box>
          <Text weight={500} size={"xl"}>
            {offer.title}
          </Text>
          <Text weight={500}>Experiencia: {offer.experienceMin.value}</Text>
        </Box>
        <Image
          src={offer.author.logoUrl || logo_empresa.src}
          width={60}
          alt={
            offer.author.name.length > 10
              ? `${offer.author.name.slice(0, 10)}...`
              : offer.author.name
          }
        />
      </Box>

      <Text
        size="sm"
        color="dimmed"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconBuildingEstate size={"15px"} />
        {offer.author.name} -
        <IconMapPin
          size={"15px"}
          style={{
            marginLeft: "2px",
          }}
        />
        {offer.city}
      </Text>

      <Box
        sx={{
          marginTop: "15px",
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Text size="sm" color="dimmed">
          Contrato: {query.data?.contractType.value}
        </Text>
        <Text size="sm" color="dimmed">
          Jornada: {query.data?.journey.value}
        </Text>
        <Text size="sm" color="dimmed">
          {offer.teleworking?.value}
        </Text>
        <Text size="sm" color="dimmed">
          Salario: {query.data?.salaryDescription}
        </Text>
      </Box>
      {!user && (
        <small style={{ color: "red" }}>
          Inicia sesión para activar estas funciones
        </small>
      )}

      <ActionButtons offer={offer} offerDetail={query.data} />

      {/*  <Divider color="#dee2e6" /> */}

      <Tabs defaultValue={activeTab} onTabChange={setActiveTab}>
        <Tabs.List position="apart">
          <Tabs.Tab value="SKILLS">SKILLS</Tabs.Tab>
          <Tabs.Tab value="RESPONSABILIDADES">RESPONSABILIDADES</Tabs.Tab>
          <Tabs.Tab value="REQUISITOS">REQUISITOS</Tabs.Tab>
          <Tabs.Tab value="EMPRESA">EMPRESA</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="SKILLS" pt="xs">
          <Text weight={"bold"}>NIVEL</Text>
          <Text> {query.data?.jobLevel.value} </Text>
          <Text weight={"bold"}>PERSONAL A CARGO</Text>
          <Text> {query.data?.staffInCharge.value} </Text>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            {query.data?.skillsList.map((skill: any, index) => (
              <Badge color="green" key={index}>
                {skill.skill}
              </Badge>
            ))}
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="RESPONSABILIDADES" pt="xs">
          <Text weight={"bold"}>DESCRIPCIÓN</Text>
          <Text
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            {query?.data?.description}
          </Text>
        </Tabs.Panel>

        <Tabs.Panel value="REQUISITOS" pt="xs">
          <Text weight={"bold"}>Estudios mínimos</Text>
          <Text> {query?.data?.studiesMin.value}</Text>
          <Text weight={"bold"}>Experiencia mínima</Text>
          <Text> {query?.data?.experienceMin.value}</Text>
          <Text weight={"bold"}>Requisitos mínimos</Text>
          <Text
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {query?.data?.minRequirements}
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="EMPRESA" pt="xs">
          <Text weight={"bold"}>EMPRESA</Text>
          <Text>
            {query.data?.profile.name}{" "}
            {query.data?.profile.url && (
              <>
                -{" "}
                <a
                  href={query.data?.profile.url}
                  target="_blank"
                  style={{ color: "#228be6" }}
                >
                  {query.data?.profile.url}
                </a>
              </>
            )}
          </Text>
          <Text weight={"bold"}>INDUSTRIA</Text>
          <Text> {query.data?.profile.typeIndustry.value} </Text>
          <Text weight={"bold"}>VACANTES</Text>
          <Text> {query.data?.vacancies} </Text>
          <Text weight={"bold"}>DESCRIPCIÓN</Text>
          <Text
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {query.data?.profile.description}
          </Text>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
