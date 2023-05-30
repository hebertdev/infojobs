import { useEffect, useState } from "react";

//helpers
import { axiosInstance } from "@/helpers/axiosClient";
import { getToken } from "@/helpers/auth";

//hooks
import { useJobOffersState } from "./useJobOfferState";
import { useUserContext } from "./useUserContext";

//interfaces
import { JobSearchResponse, Offer } from "@/interfaces/offers";
import { URLParams } from "@/interfaces/JobOffers";

export function useGetFirstOffers() {
  const [jobOffersState, jobOffersActions] = useJobOffersState();
  const {
    allOffers,
    totalResults,
    currentPage,
    isLoading,
    totalPages,
    urlParams,
  } = jobOffersState;
  const {
    handleSetAllOffers,
    handleSetPageSize,
    handleSetTotalPages,
    handleSetTotalResults,
    handleSetIsLoading,
    handleSetCurrentPage,
    handleSetUrlParams,
  } = jobOffersActions;

  const [offerDetail, setOfferDetail] = useState<Offer | null>(null);
  const { userFutureJob } = useUserContext();

  const getOffers = async () => {
    if (allOffers?.length! > 0) return;
    handleSetIsLoading(true);

    const params = new URLSearchParams();
    for (const key in urlParams) {
      if (Object.prototype.hasOwnProperty.call(urlParams, key)) {
        const value = urlParams[key as keyof URLParams] as string;
        params.append(key, value);
      }
    }
    const { data } = await axiosInstance.get<JobSearchResponse>(
      `/api/infojobs/offers?${params.toString()}`
    );
    handleSetAllOffers(data.items);
    handleSetTotalResults(data.totalResults);
    handleSetPageSize(data.pageSize);
    handleSetTotalPages(data.totalPages);
    handleSetIsLoading(false);
  };

  useEffect(() => {
    if (getToken()) {
      if (!userFutureJob) return;
      getOffers();
    } else {
      getOffers();
    }
  }, [userFutureJob]);

  const handleGetMoreOffers = async (page: number) => {
    try {
      handleSetIsLoading(true);
      const params = new URLSearchParams();
      for (const key in urlParams) {
        if (Object.prototype.hasOwnProperty.call(urlParams, key)) {
          const value = urlParams[key as keyof URLParams] as string;
          params.append(key, value);
        }
      }
      if (page) {
        params.append("page", page.toString());
      }
      const { data } = await axiosInstance.get<JobSearchResponse>(
        `/api/infojobs/offers?${params.toString()}`
      );
      handleSetAllOffers([...data.items]);
      handleSetTotalResults(data.totalResults);
      handleSetPageSize(data.pageSize);
      handleSetTotalPages(data.totalPages);
      handleSetIsLoading(false);
    } catch (error) {
      handleSetIsLoading(false);
    }
  };

  const handleSetOfferDetail = (offer: Offer) => {
    setOfferDetail(offer);
  };

  useEffect(() => {
    if (allOffers) {
      setOfferDetail(allOffers[0]);
    }
  }, [allOffers]);

  return {
    totalResults,
    isLoading,
    allOffers,
    offerDetail,
    handleSetOfferDetail,
    handleGetMoreOffers,
    totalPages,
    handleSetCurrentPage,
    currentPage,
    handleSetUrlParams,
  };
}
