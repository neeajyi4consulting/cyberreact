import CardAddCategory from "./components/CardAddCategory";
import React, { Fragment, useState, useEffect } from "react";

import CategoryCard from "./components/CategoryCard";
import { getCategory } from "api";
import { deleteCategory } from "api";
import { toast } from "react-toastify";
import EditCategory from "./components/EditCategory";
import { useLocation } from "react-router";

export default function CreateCategory() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [catData, setCatData] = useState();
  const [add, setAdd] = useState(false);
  const location = useLocation();

  const fetchCategory = async () => {
    try {
      const categoryData = await getCategory();
      setData(categoryData.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCategory = async (item) => {
    try {
      await deleteCategory(item.id);
      fetchCategory();

      toast.success("Successfully Deleted " + item.title);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEdit = (item) => {
    setCatData(item);
    setEdit(true);
    // setAdd(true);
  };

  useEffect(() => {
    fetchCategory();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

  // if (loading) {
  //   return (
  //     <div className="flex mt-24 items-center justify-center  w-screen">
  //       <ReactLoading type={"bars"} color={"blue"} height={200} width={200} />
  //     </div>
  //   );
  // } else
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full h-auto xl:w-12/12 mb-12 xl:mb-0 px-4">
          {/* {loading ? (
            <div className="flex items-center justify-center  w-screen">
              <ReactLoading
                type={"bars"}
                color={"blue"}
                height={200}
                width={200}
              />
            </div>
          ) : ( */}

          {add ? (
            <CardAddCategory
              handleClose={() => setAdd(false)}
              fetchCategory={fetchCategory()}
              submitClose={() => setAdd(false)}
            />
          ) : edit ? (
            <EditCategory
              handleClose={() => setEdit(false)}
              // fetchCategory={fetchCategory}
              catData={catData}
              submitClose={() => setEdit(false)}
            />
          ) : (
            <CategoryCard
              data={data}
              onClickRemove={removeCategory}
              onClickEdit={onClickEdit}
              onClickAdd={() => setAdd(true)}
            />
          )}

          {/* )} */}
        </div>
        {/* <div className="w-full xl:w-4/12 px-4  ">
          {!edit ? (
            <CardAddCategory fetchCategory={fetchCategory()} />
          ) : (
            <EditCategory fetchCategory={fetchCategory()} catData={catData} />
          )}
        </div> */}
      </div>
    </>
  );
}
