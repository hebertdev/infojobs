import Link from "next/link";

//hooks
import { useGetFirstOffers } from "@/hooks/useGetFirstOffers";
import { useJobOffersState } from "@/hooks/useJobOfferState";

//components
import { CardOffer } from "@/components/Offers/CardOffer";
import { CardOfferDetail } from "@/components/Offers/CardOfferDetail";

//mantine
import {
  Container,
  SegmentedControl,
  Center,
  Box,
  Text,
  Skeleton,
} from "@mantine/core";
import { Card, Button } from "@mantine/core";

//interfaces
import { Offer } from "@/interfaces/offers";
import { CardOfferSkeleton } from "@/components/Offers";
import { ToggleButtonOffers } from "@/components/ToggleButtonOffers";

export function Jobs() {
  const {
    totalResults,
    isLoading,
    allOffers,
    offerDetail,
    handleSetOfferDetail,
  } = useGetFirstOffers();

  return (
    <Container
      size={"xl"}
      sx={{
        padding: "20px",
      }}
    >
      <Center>
        <ToggleButtonOffers />
      </Center>
      <Text
        sx={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        Disfruta de la mejor experiencia, desde la búsqueda del empleo perfecto
        hasta la postulación.
      </Text>
      <Box
        sx={{
          display: "flex",
          gap: 10,
          marginTop: "20px",
          height: "600px",
          overflow: "hidden",
          position: "relative",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          "::before": {
            position: "absolute",
            content: '" "',
            bottom: 0,
            // background:
            //   "linear-gradient(to top, #ffffff, #ffffffad , #2088c200)",f9fbfc
            background:
              "linear-gradient(to top, #f9fbfc, #ffffffad , #2088c200)",
            width: "100%",
            height: "80px",
            zIndex: 1,
          },
        }}
      >
        <Card
          sx={{
            flex: 2,
            padding: "0px !important",
          }}
          shadow="sm"
          radius="md"
          withBorder
        >
          <Text
            weight={500}
            sx={{
              padding: "15px",
              borderBottom: "0.0625rem solid #dee2e6",
            }}
          >
            {isLoading ? (
              <Skeleton width={"60%"} height={16} />
            ) : (
              <>{totalResults} Ofertas de empleo</>
            )}
          </Text>

          <Box>
            {isLoading ? (
              <>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <CardOfferSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {allOffers?.map((offer: Offer) => (
                  <CardOffer
                    key={offer.id}
                    offer={offer}
                    background={offer.id === offerDetail?.id ? "#e8eff3cc" : ""}
                    handleSetOfferDetail={handleSetOfferDetail}
                  />
                ))}
                {allOffers?.length === 0 && (
                  <Box
                    sx={{
                      width: "80%",
                      margin: "40px auto",
                    }}
                  >
                    Lamentablemente, no hemos encontrado ninguna oferta que se
                    ajuste a tus parámetros de búsqueda. 🥲
                  </Box>
                )}
              </>
            )}
          </Box>
        </Card>

        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          sx={{
            flex: 3,
            overflow: "auto",
          }}
        >
          {offerDetail && (
            <>
              <CardOfferDetail offer={offerDetail} />
            </>
          )}
        </Card>
      </Box>
      <Center>
        <Link href={"/offers"}>
          <Button
            radius={"xl"}
            sx={{
              marginTop: "15px",
            }}
          >
            Ver más ofertas
          </Button>
        </Link>
      </Center>
    </Container>
  );
}
