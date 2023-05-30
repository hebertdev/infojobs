import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstanceBackend } from "@/helpers/axiosBackend";
import { setToken , getToken } from "@/helpers/auth";
import { useUserContext } from "./useUserContext";

export const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {handleSetUser , handleGetUser} = useUserContext()
  const authorizeUrl =
    "https://www.infojobs.net/api/oauth/user-authorize/index.xhtml";
  const scopes = "CANDIDATE_PROFILE_WITH_EMAIL,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_EDIT_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_EDIT_CURRICULUM_EDUCATION,CANDIDATE_DELETE_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_EXPERIENCE,CANDIDATE_EDIT_CURRICULUM_EXPERIENCE,CANDIDATE_DELETE_CURRICULUM_EXPERIENCE,CANDIDATE_READ_CURRICULUM_FUTURE_JOB,CANDIDATE_EDIT_CURRICULUM_FUTURE_JOB,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_EDIT_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_SKILLS,MY_APPLICATIONS,APPLICATION_TIMELINE,COVER_LETTER_READ,COVER_LETTER_WRITE,COVER_LETTER_DELETE";
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_INFOJOBS;
  const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_URL;
  const responseType = "code";
  const authUrl = `${authorizeUrl}?scope=${scopes}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

  const handleGetToken = () => {
    if(getToken()) return
    window.location.href = authUrl;
  };

  const { code } = router.query;


  const postAuthorizationCode = async () => {
    if (!code) return;
    try {
      setLoading(true);
      const { data } = await axiosInstanceBackend.post(
        "/autenticacion/",
        {
          code,
        }
      );
      router.push("/");
      setToken(data.tokens.access_token);
      handleSetUser(data.candidate_data)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      postAuthorizationCode();
    }
  }, [code]);

  return {
    handleGetToken,
    loading,
    handleGetUser
  };
};
