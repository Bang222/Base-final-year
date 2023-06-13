"use client";

import { TouristInfo } from "@/types";
import { FC } from "react";

interface ViewsProps extends TouristInfo {
}

const Views: FC<ViewsProps> = (viewsProps: ViewsProps) => {
  return (
    <>
      <div>{viewsProps.id}</div>
      <div>{viewsProps.name}</div>
      <div>{viewsProps.description}</div>
      <div>{viewsProps.createdTime}</div>
    </>
  );
};

export default Views;