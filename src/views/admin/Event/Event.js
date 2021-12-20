import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { getEvent } from "api";
import { deleteEvent } from "api";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";
import { useLocation } from "react-router";
import EditEvent from "./components/EditEvent";

export default function Event() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [eventData, setCourseData] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchService = async () => {
    setLoading(true);
    const response = await getEvent();

    setData(response.data?.data);
    setLoading(false);
  };

  const removeCourse = async (item) => {
    const data = new FormData();
    data.append("id", item.id);
    try {
      await deleteEvent(data);
      fetchService();
      toast.success("Successfully Deleted " + item.title);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = (item) => {
    setCourseData(item);
    setEdit(true);
  };

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
            <AddEvent
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : edit ? (
            <EditEvent
              handleClose={() => setEdit(false)}
              eventData={eventData}
              submitClose={() => setEdit(false)}
            />
          ) : (
            <EventList
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
