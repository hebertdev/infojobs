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
import { SkeletonText } from "./SkeletonText";

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

  const { data: query, isLoading } = useQuery([`offerdetail-${offer.id}`], () =>
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
          marginTop: "10px",
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Text size="sm" color="dimmed">
          Contrato: {query?.contractType.value}
        </Text>
        <Text size="sm" color="dimmed">
          Jornada: {query?.journey.value}
        </Text>
        <Text size="sm" color="dimmed">
          {offer.teleworking?.value}
        </Text>
        <Text size="sm" color="dimmed">
          Salario: {query?.salaryDescription}
        </Text>
      </Box>

      <small style={{ color: "red", marginTop: "10px", display: "block" }}>
        {!user && <>Inicia sesión para activar estas funciones </>}
      </small>

      <ActionButtons offer={offer} offerDetail={query} />
      <Text
        size="sm"
        color="dimmed"
        sx={{
          marginBottom: "10px",
          marginTop: "5px",
        }}
      >
        {query?.applications! > 0 && (
          <>
            {" "}
            {query?.applications} Inscrito{query?.applications !== 0 && "s"}{" "}
          </>
        )}
      </Text>
      {/*  <Divider color="#dee2e6" /> */}
      <Tabs defaultValue={activeTab} onTabChange={setActiveTab}>
        <Tabs.List position="apart">
          <Tabs.Tab value="SKILLS">SKILLS</Tabs.Tab>
          <Tabs.Tab value="RESPONSABILIDADES">RESPONSABILIDADES</Tabs.Tab>
          <Tabs.Tab value="REQUISITOS">REQUISITOS</Tabs.Tab>
          <Tabs.Tab value="EMPRESA">EMPRESA</Tabs.Tab>
        </Tabs.List>

        {isLoading ? (
          <SkeletonText />
        ) : (
          <>
            <Tabs.Panel value="SKILLS" pt="xs">
              <Text weight={"bold"}>NIVEL</Text>
              <Text> {query?.jobLevel.value} </Text>
              {query?.staffInCharge.id !== 0 && (
                <>
                  <Text weight={"bold"}>PERSONAL A CARGO</Text>
                  <Text>
                    {query?.staffInCharge.value === "0"
                      ? "Ninguno"
                      : query?.staffInCharge.value}
                  </Text>
                </>
              )}

              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                {query?.skillsList.map((skill: any, index) => (
                  <Badge color="yellow" key={index} size="lg">
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
                {query?.description}
              </Text>
            </Tabs.Panel>

            <Tabs.Panel value="REQUISITOS" pt="xs">
              <Text weight={"bold"}>Estudios mínimos</Text>
              <Text> {query?.studiesMin.value}</Text>
              <Text weight={"bold"}>Experiencia mínima</Text>
              <Text> {query?.experienceMin.value}</Text>
              {query?.minRequirements! && (
                <>
                  <Text weight={"bold"}>Requisitos mínimos</Text>
                  <Text
                    sx={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {query?.minRequirements}
                  </Text>
                </>
              )}
            </Tabs.Panel>
            <Tabs.Panel value="EMPRESA" pt="xs">
              <Text weight={"bold"}>EMPRESA</Text>
              <Text>
                {query?.profile.name}{" "}
                {query?.profile.url && (
                  <>
                    -{" "}
                    <a
                      href={query?.profile.url}
                      target="_blank"
                      style={{ color: "#228be6" }}
                    >
                      {query?.profile.url}
                    </a>
                  </>
                )}
              </Text>
              {query?.profile.typeIndustry.id !== 0 && (
                <>
                  <Text weight={"bold"}>INDUSTRIA</Text>
                  <Text> {query?.profile.typeIndustry.value} </Text>
                </>
              )}

              <Text weight={"bold"}>VACANTES</Text>
              <Text> {query?.vacancies} </Text>
              <Text weight={"bold"}>DESCRIPCIÓN</Text>
              <Text
                sx={{
                  whiteSpace: "pre-line",
                }}
              >
                {query?.profile.description}
              </Text>
            </Tabs.Panel>
          </>
        )}
      </Tabs>
    </>
  );
}
