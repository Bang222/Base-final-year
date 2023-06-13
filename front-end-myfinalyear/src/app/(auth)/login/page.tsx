import { FC, useState } from "react";
import { loginAPI } from "@/util/getdataTouristview";

interface PageProps {
  userName: string,
  hasPassword: string
}

//bang

const Page: ({}: {}) => Promise<JSX.Element> = async ({userName,hasPassword}) => {
  const login = await loginAPI(userName, hasPassword)
  return (
    // <formLogin userName={userName} hasPassword={hasPassword} />
    <a href={''}></a>
  );
};

export default Page;