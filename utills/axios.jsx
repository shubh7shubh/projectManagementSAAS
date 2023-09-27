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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYwMzljNjM4NTA2OWI0ZDhkYmY5OTMiLCJpYXQiOjE2OTU3OTM1NzgsImV4cCI6MTY5NjIyNTU3OH0.dU-3SAdqKHMNAEo74JOzeiv08d5rWZ90pK4ZBKLPeJ8`,
    },
  });
  return instance;
};
