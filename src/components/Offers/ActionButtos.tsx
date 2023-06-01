import { useEffect, useState } from "react";

//hooks
import { useUserContext } from "@/hooks/useUserContext";

//components
import { ApplyOfferButton } from "./ApplyOfferButton";

//mantine
import { Button, Box } from "@mantine/core";

//interfaces
import { Offer } from "@/interfaces/offers";
import { OfferDetail } from "@/interfaces/offerDetail";
import { AnalyzeButton } from "./AnalizeButton";

interface AplicationOfferButtonProps {
  offer: Offer;
  offerDetail?: OfferDetail;
}
export function ActionButtons({
  offer,
  offerDetail,
}: AplicationOfferButtonProps) {
  const { user, aplications } = useUserContext();
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const handleVerifiedIsAppliedOffer = () => {
    if (aplications?.length! > 0) {
      const isOfferApplied = aplications!.some(
        (application) => application.jobOffer.code === offer.id
      );
      setIsApplied(isOfferApplied);
    } else {
      setIsApplied(false);
    }
  };

  useEffect(() => {
    handleVerifiedIsAppliedOffer();
  }, [aplications, offer]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <>
        {user ? (
          <>
            {isApplied ? (
              <Button disabled>Ya inscrito</Button>
            ) : (
              <ApplyOfferButton offer={offer} />
            )}
          </>
        ) : (
          <Button disabled>Postularme</Button>
        )}
      </>
      <AnalyzeButton offerDetail={offerDetail} isApplied={isApplied} />
    </Box>
  );
}
