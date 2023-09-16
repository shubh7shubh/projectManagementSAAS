import axios from "axios";
import { useCookies } from "react-cookie";

export const useAxios = () => {
  const [cookies, setCookes] = useCookies(["jwtToken"]);
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_baseUrl,
    // baseURL: "https://login-signup-apii.onrender.com",
    // baseURL: "http://localhost:8080/api",
    headers: {
    //   Authorization: `Bearer ${cookies.jwtToken}`,
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYwMzljNjM4NTA2OWI0ZDhkYmY5OTMiLCJpYXQiOjE2OTQ4NTM4NjMsImV4cCI6MTY5NTI4NTg2M30.qSfS2MAm5Ss0nUZpPbF-LXQHAgN2YRivDutYDlwexnI`,
    },
  });
  return instance;
};
