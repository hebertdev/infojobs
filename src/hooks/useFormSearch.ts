import {useState} from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

//helpers
import { axiosInstance } from '@/helpers/axiosClient';


//hooks
import { useJobOffersState } from "./useJobOfferState";
import { URLParams } from '@/interfaces/JobOffers';


export function useFormSearch() {
  
  const router = useRouter();
  const [jobOffersState, jobOffersActions] = useJobOffersState();
  const {
    isLoading,
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

  const handleSubmitSearch = async () => {
    if (router.asPath !== "/offers") {
      router.push("/offers");
    }
    try {
      handleSetIsLoading(true);
      const params = new URLSearchParams();
      for (const key in urlParams) {
        if (Object.prototype.hasOwnProperty.call(urlParams, key)) {
          const value = urlParams[key as keyof URLParams] as string;
          params.append(key, value);
        }
      }

      if(urlParams.q?.length!>0){
        handleSetUrlParams("subcategory","")
        params.delete("subcategory");
      }

      const url = `/api/infojobs/offers?${params.toString()}`;
      const { data } = await axiosInstance.get(url);
      handleSetAllOffers(data.items);
      handleSetTotalResults(data.totalResults);
      handleSetPageSize(data.pageSize);
      handleSetTotalPages(data.totalPages);
      handleSetAllOffers(data.items);
      handleSetIsLoading(false);
      handleSetCurrentPage(data.currentPage)
    } catch (error) {
      console.log(error);
      handleSetIsLoading(false);
    }
  };

  const getPronvices = async () => {
    const { data } = await axiosInstance.get("/api/infojobs/provinces");
    return data;
  };

  const { data: provinces } = useQuery(["provinces"], getPronvices);

  const handleOnChangeSelect = (value: string) => {
    handleSetUrlParams("province", value);
  };

  return {
    handleSetUrlParams,
    urlParams,
    handleSetAllOffers,
    handleSetIsLoading,
    isLoading,
    handleSetCurrentPage,
    handleSetTotalResults,
    handleSetTotalPages,
    handleSetPageSize,
    handleSubmitSearch,
    handleOnChangeSelect,
    provinces
  };
}
