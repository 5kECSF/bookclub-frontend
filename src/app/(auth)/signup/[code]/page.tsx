"use client";
import "@/assets/css/style.css";
import { API } from "@/lib/constants/routes";
import VerifyCodeComponent from "../../_components/verificationCode";

const VerifyCode = (props: any) => {
  return (
    <>
      <VerifyCodeComponent url={API.activate} />
    </>
  );
};

export default VerifyCode;
