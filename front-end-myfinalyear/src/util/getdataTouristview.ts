import 'server-only'

import { TouristInfo } from "@/types";
import { NextResponse, NextRequest } from 'next/server'
import axios from "../axios";
import { cookies } from 'next/headers';
// export const token = async () => {
//   const token = await axios.get('/api/google/redirect')
//   return token
// }
export const fetchApi = async () => {
  const CookieStore = cookies()
  const AccessTokenInCookie = CookieStore.get('token')?.value
  const res = await axios.get('/api/tourist/all',{
    headers: {
      Authorization: 'Bearer ' + AccessTokenInCookie
    }
  })
  return res;
};
export const loginAPI = async (userName : string, hasPassword : string) => {
  try {
    const res = await axios.post('/api/auth/login', { userName, hasPassword })
    return  res
  } catch(err) {
    return null
  }
};