import React, { useEffect } from "react";

// components

import CardSettings from "./components/CardSettings.js";
// import CardProfile from "components/Cards/CardProfile.js";
import { useLocation } from "react-router";

export default function Settings() {
  const location = useLocation();

  useEffect(() => {}, [location.key]);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}
