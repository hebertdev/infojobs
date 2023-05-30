import { useSelector, useDispatch } from "react-redux";
import { setAllOffers,setTotalPages ,setTotalResults, setPageSize , setCurrentPage , setIsLoading , setUrlParams  , setIsForYou, setAllOffersForYou } from "@/store/slices/JobOfferSlice";

//interfaces
import { Offer } from "@/interfaces/offers";
import { JobOfferState, URLParams , IsForYou} from "@/interfaces/JobOffers";

interface JobOffersAction {
  handleSetTotalPages: (value: number) => void;
  handleSetCurrentPage: (value: number) => void;
  handleSetTotalResults: (value: number) => void;
  handleSetPageSize: (value: number) => void;
  handleSetAllOffers: (offers: Offer[]) => void;
  handleSetAllOffersForYou: (offers: Offer[]) => void;
  handleSetIsLoading:(value: boolean) => void;
  handleSetUrlParams: (key: keyof URLParams, value: any) => void;
  handleSetIsForYou:(value:IsForYou) => void
}

export const useJobOffersState = (): [JobOfferState, JobOffersAction] => {
  const dispatch = useDispatch();
  const jobOffersState = useSelector(
    (state: { JobOfferSlice: JobOfferState }) => state.JobOfferSlice
  );

  const handleSetIsForYou = (value:IsForYou) => {
    dispatch(setIsForYou(value))
  }

  const handleSetUrlParams = (key: keyof URLParams, value: any) => {
    dispatch(setUrlParams({ key, value }));
  };

  const handleSetIsLoading = (value:boolean) => {
    dispatch(setIsLoading(value))
  }

  const handleSetTotalPages = (value:number) => {
    dispatch(setTotalPages(value))
  }
  
  const handleSetCurrentPage = (value:number) => {
    dispatch(setCurrentPage(value))
  }

  const handleSetTotalResults = (value:number) => {
    dispatch(setTotalResults(value))
  }

  const handleSetPageSize = (value:number) => {
    dispatch(setPageSize(value))
  }

  const handleSetAllOffers = (offers: Offer[]) => {
    dispatch(setAllOffers(offers));
  };

  const handleSetAllOffersForYou = (offers: Offer[]) => {
    dispatch(setAllOffersForYou(offers));
  };



  
  const jobOffersActions: JobOffersAction = {
    handleSetTotalPages,
    handleSetCurrentPage,
    handleSetTotalResults,
    handleSetPageSize,
    handleSetAllOffers,
    handleSetIsLoading,
    handleSetUrlParams,
    handleSetIsForYou,
    handleSetAllOffersForYou
  };

  return [jobOffersState, jobOffersActions];
};