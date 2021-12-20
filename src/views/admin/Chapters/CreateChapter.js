import React, { useState, useEffect } from "react";
import ChapterListCard from "./components/ChapterListCard";
import CardCreateChapter from "./components/CardCreateChapter";
import { toast } from "react-toastify";
import { getChapter } from "api";
import { deleteChapter } from "api";
import EditChapter from "./components/EditChapter";
import { useLocation } from "react-router";

export default function CreateChapter() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [chapterData, setChapterData] = useState();
  const location = useLocation();

  const fetchChapter = async (id) => {
    const chapterData = await getChapter(id);
    setData(chapterData.data?.data);
  };

  const removeChapter = async (item) => {
    try {
      await deleteChapter(item.id);
      toast.success("Successfully Deleted ");
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = (item) => {
    setChapterData(item);
    setEdit(true);
  };

  useEffect(() => {
    fetchChapter();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

  // if (loading) {
  //   return (
  //     <div className="flex  relative  z-10  items-center justify-center h-screen rounded-lg text-white font-bold text-4xl bg-black  w-screen">
  //       Please Wait ....
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 px-4  ">
          {add ? (
            <CardCreateChapter
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : edit ? (
            <EditChapter
              chapterData={chapterData}
              handleClose={() => setEdit(false)}
              submitClose={() => setEdit(false)}
            />
          ) : (
            <ChapterListCard
              onClickRemove={removeChapter}
              onClickEdit={onClickEdit}
              data={data}
              onClickAdd={() => setAdd(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
