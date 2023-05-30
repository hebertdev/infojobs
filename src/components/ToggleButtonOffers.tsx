import { useJobOffersState } from "@/hooks/useJobOfferState";
import { useGetOffersForYou } from "@/hooks/useGetOfferForYou";
import { SegmentedControl } from "@mantine/core";
import { useFormSearch } from "@/hooks/useFormSearch";
import { useUserContext } from "@/hooks/useUserContext";
import { notifications } from "@mantine/notifications";

type isForYou = "yes" | "no";

export function ToggleButtonOffers() {
  const [state, actions] = useJobOffersState();
  const { isForYou } = state;
  const { handleSetIsForYou } = actions;
  const { getUserSkill } = useGetOffersForYou();
  const { handleSubmitSearch } = useFormSearch();
  const { user } = useUserContext();

  const handleOnChage = (value: isForYou) => {
    if (user) {
      handleSetIsForYou(value);
    } else {
      handleSetIsForYou("no");
      notifications.show({
        title: "Error",
        message: "Inicia sesíon para entrar a esta opción",
        color: "red",
      });
      return;
    }
    handleSetIsForYou(value);
    if (value === "yes") {
      getUserSkill();
    } else {
      handleSubmitSearch();
    }
  };

  return (
    <SegmentedControl
      value={isForYou}
      onChange={handleOnChage}
      data={[
        { label: "Explorar", value: "no" },
        { label: "Para tí", value: "yes" },
      ]}
    />
  );
}
