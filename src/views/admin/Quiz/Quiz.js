import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ListQuiz from "./components/ListQuiz";
import AddQuiz from "./components/AddQuiz";
import { removeQuiz } from "api";
import { useLocation } from "react-router";
import EditQuiz from "./components/EditQuiz";
import { getQuiz } from "api";

export default function Quiz() {
  const [data, setData] = useState([]);
  const [quizData, setQuizData] = useState();
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const location = useLocation();

  const fetchQuiz = async (id) => {
    const quizData = await getQuiz(id);
    setData(quizData.data?.data);
  };

  const handleRemoveQuiz = async (item) => {
    console.log(item.id);
    const data = new FormData();
    data.append("id", item.id);
    removeQuiz(data)
      .then(function (response) {
        if (response.data?.Status === true) {
          console.log("deleted quiz successfully", response);
          toast.success("Successfully Deleted Quiz Question");
          setAdd(false);
          setAdd(false);
        } else {
          toast.error(response.data?.message);
          console.log("error", response);
        }
      })
      .catch((err) => {
        console.log("error in delete quiz", err.response);
        toast.error("Unable to delete Quiz Question");
      });
  };

  const onClickEdit = (item) => {
    setQuizData(item);
    setEdit(true);
  };

  useEffect(() => {
    fetchQuiz();
    setEdit(false);
    setAdd(false);
  }, [location.key]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4  ">
          {add ? (
            <AddQuiz
              submitClose={() => setAdd(false)}
              handleClose={() => setAdd(false)}
            />
          ) : edit ? (
            <EditQuiz
              handleClose={() => setEdit(false)}
              quizData={quizData}
              submitClose={() => setEdit(false)}
            />
          ) : (
            <ListQuiz
              onClickRemove={handleRemoveQuiz}
              onClickAdd={() => setAdd(true)}
              onClickEdit={onClickEdit}
              data={data}
            />
          )}
        </div>
      </div>
    </>
  );
}
