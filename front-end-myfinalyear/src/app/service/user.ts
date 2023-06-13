import { cookies } from "next/headers";
import axios from "axios";
import { User } from "@/types";
import { apiEndpoints } from "../../../constants";

export const getMe = async (accessToken: string | undefined) => {
  try {
    if(!accessToken) return;
    const { data }= await axios.get<User>(apiEndpoints.login)
  }
}