import React, { useState, useEffect } from "react";
import CourseListCard from "./components/CourseListCard";
import CardCreateCourse from "./components/CardCreateCourse";
import { getCourse, deleteCourse } from "api";
import { toast } from "react-toastify";
import EditCourse from "./components/EditCourse";
import { useLocation } from "react-router";

export default function CreateCourse() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [courseData, setCourseData] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchCourse = async () => {
    setLoading(true);
    const response = await getCourse();

    setData(response.data?.data);
    setLoading(false);
  };

  const removeCourse = async (item) => {
    try {
      await deleteCourse(item.id);
      fetchCourse();
      toast.success("Successfully Deleted Course");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = (item) => {
    setCourseData(item);
    setEdit(true);
  };

  useEffect(() => {
    fetchCourse();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

  useEffect(() => {
    fetchCourse();
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
            <CardCreateCourse
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : edit ? (
            <EditCourse
              handleClose={() => setEdit(false)}
              courseData={courseData}
              submitClose={() => setEdit(false)}
            />
          ) : (
            <CourseListCard
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
