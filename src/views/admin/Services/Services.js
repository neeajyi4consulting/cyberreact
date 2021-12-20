import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import AddServices from "./components/AddServices";

import ServicesList from "./components/ServicesList";
import { deleteService } from "api";
import { getService } from "api";
import { useLocation } from "react-router";

export default function Services() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  // const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchService = async () => {
    setLoading(true);
    const response = await getService();
    setData(response.data?.data);
    setLoading(false);
  };

  const removeCourse = async (item) => {
    const data = new FormData();
    data.append("id", item.id);
    try {
      await deleteService(data);
      fetchService();
      toast.success("Successfully Deleted " + item.title);
    } catch (error) {
      console.log(error);
    }
  };

  // const onClickEdit = (item) => {
  //   setCourseData(item);
  //   setEdit(true);
  // };

  useEffect(() => {
    fetchService();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

  useEffect(() => {
    fetchService();
  }, [edit]);

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
            <AddServices
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : (
            <ServicesList
              // onClickEdit={onClickEdit}
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
