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

export function useGetOffersForYou() {
  const [jobOffersState, jobOffersActions] = useJobOffersState();
  const {
    allOffers,
    totalResults,
    currentPage,
    isLoading,
    totalPages,
    urlParams,
    isForYou,
  } = jobOffersState;
  const {
    handleSetAllOffersForYou,
    handleSetPageSize,
    handleSetTotalPages,
    handleSetTotalResults,
    handleSetIsLoading,
    handleSetCurrentPage,
    handleSetUrlParams,
  } = jobOffersActions;

  const [offerDetail, setOfferDetail] = useState<Offer | null>(null);
  const { principalCV } = useUserContext();

  const getUserSkill = async () => {
    try {
        handleSetIsLoading(true);
      const { data: skills } = await axiosInstance.get(
        `/api/infojobs/cvskill/${principalCV?.code}`
      );

      const expertiseSkills = skills.expertise
        .filter((skillObj: any) => skillObj.level === "alto")
        .slice(0, 3);
      const skillsString = expertiseSkills
        .map((skillObj: any) => skillObj.skill)
        .join(",");

      let skilllist;

      if (skillsString) {
        skilllist = skillsString;
      } else {
        const fallbackSkills = skills.expertise
          .slice(0, 2)
          .map((skillObj: any) => skillObj.skill)
          .join(",");
        skilllist = fallbackSkills;
      }

      const params = new URLSearchParams();
      for (const key in urlParams) {
        if (Object.prototype.hasOwnProperty.call(urlParams, key)) {
          const value = urlParams[key as keyof URLParams] as string;
          params.append(key, value);
        }
      }
      params.delete("q");
      params.delete("subcategory");
      params.append("q", skilllist);

      const { data } = await axiosInstance.get<JobSearchResponse>(
        `/api/infojobs/offers?${params.toString()}`
      );
      handleSetAllOffersForYou(data.items);
      handleSetTotalResults(data.totalResults);
      handleSetPageSize(data.pageSize);
      handleSetTotalPages(1);
      handleSetIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


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
      handleSetAllOffersForYou([...data.items]);
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
    getUserSkill,
  };
}
