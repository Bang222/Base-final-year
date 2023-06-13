import { apiEndpoints } from "../../../constants";
import axios from "axios";
import { User } from "@/types";

export const login = async (type: "login" | "register",userName: string | undefined, hasPassword: string | undefined) => {
  try{
    let url: string;
  if(type === "login") url = process.env.NEXT_APP_BACKEND_URL + apiEndpoints.login
  else if (type === "register") url = apiEndpoints.register;
  if (!url || !userName || !hasPassword) return null;
  const {data} = await axios.post<{user: User;
    accessToken: string;
    refreshToken: string;}> (url, {userName,hasPassword})
    if (data) return data;
    return null
  } catch(e){
    return null;
  }
};