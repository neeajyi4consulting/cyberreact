import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CardSendEmail from "./components/CardSendEmail";
import { useLocation } from "react-router";

export default function SendEmail() {
  const location = useLocation();
  useEffect(() => {}, [location.key]);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardSendEmail
            onClickSend={() =>
              toast.error("Please Provide SMTP Details in Backend")
            }
          />
        </div>
      </div>
    </>
  );
}
