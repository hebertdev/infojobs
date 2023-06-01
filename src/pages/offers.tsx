import { useEffect, useRef } from "react";
import Head from "next/head";
//hooks
import { useGetFirstOffers } from "@/hooks/useGetFirstOffers";

//components
import {
  CardOfferSkeleton,
  CardOffer,
  CardOfferDetail,
} from "@/components/Offers";

import {
  ContractButton,
  DateButton,
  ExperiencieButton,
  SalaryButton,
  WorkdayButton,
  WorkplaceButton,
} from "@/components/pages/Offers";

//mantine
import {
  Container,
  Box,
  Text,
  Skeleton,
  Card,
  Pagination,
} from "@mantine/core";

//interfaces
import { Offer } from "@/interfaces/offers";
import { ToggleButtonOffers } from "@/components/ToggleButtonOffers";

export default function OffersPage() {
  const {
    totalResults,
    isLoading,
    allOffers,
    offerDetail,
    handleSetOfferDetail,
    handleGetMoreOffers,
    totalPages,
    currentPage,
    handleSetCurrentPage,
    handleSetUrlParams,
  } = useGetFirstOffers();

  const handleOnChangePagination = (value: number) => {
    handleSetCurrentPage(value);
    handleGetMoreOffers(value);
  };

  useEffect(() => {
    return function cleanup() {
      handleSetUrlParams("teleworking", "");
      handleSetUrlParams("sinceDate", "");
      handleSetUrlParams("contractType", "");
      handleSetUrlParams("experienceMin", "");
      handleSetUrlParams("workday", "");
      handleSetUrlParams("salaryPeriod", "");
    };
  }, []);

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Ofertas de empleo | Infojobs</title>
      </Head>
      <Container
        size={"xl"}
        sx={{
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            margin: "10px 0",
          }}
        >
          <ToggleButtonOffers />

          <WorkplaceButton />
          <DateButton />
          <SalaryButton />
          <WorkdayButton />
          <ContractButton />
          <ExperiencieButton />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 10,
            height: "calc(100vh - 130px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Card
            sx={{
              flex: 2,
              padding: "0px !important",
              height: "100%",
              position: "relative",
            }}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Box
              sx={{
                height: "100%",
                overflow: "auto",
              }}
              ref={boxRef}
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
                    {[1, 2, 3].map((_, index) => (
                      <CardOfferSkeleton key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {allOffers?.map((offer: Offer, index) => (
                      <CardOffer
                        key={index}
                        offer={offer}
                        background={
                          offer.id === offerDetail?.id ? "#e8eff3cc" : ""
                        }
                        handleSetOfferDetail={handleSetOfferDetail}
                      />
                    ))}
                    <div style={{ height: "39px" }} />

                    {allOffers?.length === 0 && (
                      <Box
                        sx={{
                          width: "80%",
                          margin: "auto",
                        }}
                      >
                        Lamentablemente, no hemos encontrado ninguna oferta que
                        se ajuste a tus parámetros de búsqueda. 🥲
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                bottom: 0,
                position: "absolute",
                background: "white",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "0.0625rem solid #dee2e6",
              }}
            >
              <Pagination
                value={currentPage}
                total={totalPages}
                onChange={(value: number) => handleOnChangePagination(value)}
              />
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
              height: "100%",
            }}
          >
            {offerDetail && (
              <>
                <CardOfferDetail offer={offerDetail} />
              </>
            )}
          </Card>
        </Box>
      </Container>
    </>
  );
}
