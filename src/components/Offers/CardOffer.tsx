import { Box, Text } from "@mantine/core";
import { Card, Image, Badge } from "@mantine/core";
import { Offer } from "@/interfaces/offers";
import { IconMapPin } from "@tabler/icons-react";
//assets
import logo_empresa from "@/assets/empresa_logo.webp";

interface Props {
  offer: Offer;
  handleSetOfferDetail: (offer: Offer) => void;
  background?: string;
}

export function CardOffer({ offer, handleSetOfferDetail, background }: Props) {
  return (
    <Card
      shadow="sm"
      sx={{
        borderRadius: "0px",
        borderBottom: "0.0625rem solid #dee2e6",
        cursor: "pointer",
        background: background ? background : "",
        userSelect: "none",
      }}
      onClick={() => handleSetOfferDetail(offer)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Text weight={500}> {offer.title} </Text>
        {offer.bold && (
          <Badge color="pink" variant="light">
            URGENTE
          </Badge>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Text
            sx={{
              fontSize: "18px",
            }}
            color="dimmed"
          >
            {offer.author.name}
          </Text>
          <Text
            sx={{
              fontSize: "17px",
              display: "flex",
              alignItems: "center",
            }}
            color="dimmed"
          >
            <IconMapPin
              size={"20px"}
              style={{
                marginLeft: "2px",
              }}
            />
            {offer.city}
          </Text>
          <Badge
            size="md"
            sx={{
              margin: "8px 0",
            }}
          >
            {offer.teleworking?.value}
          </Badge>
          <Text size="xs" color="dimmed">
            Publicado el{" "}
            {new Date(offer.published).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
          {new Date(offer.published).toLocaleDateString("es-ES") !==
            new Date(offer.updated).toLocaleDateString("es-ES") && (
            <Text size="xs" color="dimmed">
              Actualizado el{" "}
              {new Date(offer.updated).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Text>
          )}
        </Box>
        <Box>
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
      </Box>
    </Card>
  );
}
