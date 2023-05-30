import { useState, useEffect, ReactNode, createContext } from "react";

import { axiosInstanceBackend } from "@/helpers/axiosBackend";
import { axiosInstance as axiosClient } from "@/helpers/axiosClient";

//hooks
import { useJobOffersState } from "@/hooks/useJobOfferState";

//helpers
import { deleteToken, getToken } from "@/helpers/auth";

//interfaces
import { Candidate, Cv, FutureJob } from "@/interfaces/user";
import { AplicationResponse, Application } from "@/interfaces/aplications";

export interface UserContextProps {
  user: Candidate | undefined | null;
  logout: () => void;
  loadingUser: boolean;
  toggleLoadingUser: (value: boolean) => void;
  handleSetUser: (user: Candidate) => void;
  handleGetUser: () => void;
  userFutureJob?: FutureJob;
  userCVs?: Cv[];
  aplications?: Application[];
  handleGetAplications: () => void;
  principalCV?: Cv;
}

interface DarkModeProvider {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: DarkModeProvider) {
  const [_, jobOffersActions] = useJobOffersState();
  const [user, setUser] = useState<Candidate>();
  const [userCVs, setUserCVs] = useState<Cv[]>();
  const [aplications, setAplication] = useState<Application[]>();
  const [userFutureJob, setUserFutureJob] = useState<FutureJob>();
  const [principalCV, setPrincipalCV] = useState<Cv>();
  const [loadingUser, setLoadingUser] = useState(true);
  const logout = () => {
    deleteToken();
    window.location.href = "/";
  };

  const toggleLoadingUser = (value: boolean) => {
    setLoadingUser(value);
  };

  const handleSetUser = (user: Candidate) => {
    setUser(user);
  };

  const handleGetUser = async () => {
    if (!getToken()) return;
    try {
      toggleLoadingUser(true);
      const { data } = await axiosInstanceBackend.get("/users/whoami/");
      setUser(data.candidate);
      toggleLoadingUser(false);
    } catch (error) {
      toggleLoadingUser(false);
    }
  };

  const handleGetCv = async () => {
    if (!user) return;
    if (!getToken()) return;
    try {
      const { data } = await axiosClient.get<Cv[]>("/api/infojobs/listcv");
      setUserCVs(data);
      const principalObj = data.find((obj: Cv) => obj.principal === true);
      jobOffersActions.handleSetAllOffers([]);
      setPrincipalCV(principalObj);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAplications = async () => {
    if (!user) return;
    if (!getToken()) return;
    try {
      const { data } = await axiosClient.get<AplicationResponse>(
        "/api/infojobs/aplications"
      );
      setAplication(data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetFutureJobs = async () => {
    if (!principalCV) return;
    if (!getToken()) return;
    try {
      const { data } = await axiosClient.get(
        `/api/infojobs/cvfuturejob/${principalCV.code}`
      );
      setUserFutureJob(data);
      let subcategories = data?.subcategories;
      let subcategoryParam = subcategories ? subcategories.join(",") : "";
      jobOffersActions.handleSetUrlParams("subcategory", subcategoryParam);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCv();
  }, [user]);

  useEffect(() => {
    handleGetAplications();
  }, [user]);

  useEffect(() => {
    handleGetFutureJobs();
  }, [principalCV]);

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        loadingUser,
        toggleLoadingUser,
        handleSetUser,
        handleGetUser,
        userFutureJob,
        userCVs,
        aplications,
        handleGetAplications,
        principalCV,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
