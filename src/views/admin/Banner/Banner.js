import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import AddBanner from "./components/AddBanner";
import BannerList from "./components/ListBanner";
import { getBanner } from "api";
import { deleteBanner } from "api";
import { useLocation } from "react-router";
import EditBanner from "./components/EditBanner";

export default function Banner() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [bannerData, setbannerData] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchBanner = async () => {
    setLoading(true);
    const response = await getBanner();
    setData(response.data?.data);
    setLoading(false);
  };

  const removeCourse = async (item) => {
    const data = new FormData();
    data.append("id", item.id);
    try {
      await deleteBanner(data);
      fetchBanner();
      toast.success("Successfully Deleted ");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = (item) => {
    setbannerData(item);
    setEdit(true);
  };

  useEffect(() => {
    fetchBanner();
    setEdit(false);
    setAdd(false);
  }, []);

  useEffect(() => {
    fetchBanner();
  }, [edit]);

  useEffect(() => {
    fetchBanner();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

  if (loading) {
    return (
      <div className="flex  relative  z-10  items-center justify-center h-screen rounded-lg text-white font-bold text-4xl bg-black  w-screen">
        Please Wait ....
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4  ">
          {add ? (
            <AddBanner
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : edit ? (
            <EditBanner
              handleClose={() => setEdit(false)}
              bannerData={bannerData}
              submitClose={() => setEdit(false)}
            />
          ) : (
            <BannerList
              onClickEdit={onClickEdit}
              onClickRemove={removeCourse}
              onClickAdd={() => setAdd(true)}
              data={data}
            />
          )}
        </div>
      </div>
    </>
  );
}
