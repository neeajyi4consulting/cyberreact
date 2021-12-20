import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getCourse } from "api";
import { getQuiz } from "api";
import { toast } from "react-toastify";

// components

export default function ListQuiz({
  color,
  onClickRemove,
  onClickAdd,
  onClickEdit,
}) {
  const [courseID, setCourseID] = useState();
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const fetchQuiz = async (id) => {
    const response = await getQuiz(id);
    setData(response.data?.data);
    console.log("fetchQuiz response", response.data?.data);
  };

  const fetchCourse = async () => {
    const response = await getCourse();
    setCategoryData(response.data?.data);
    console.log("this is category ID", categoryData);
  };

  const handleDeleteTry = (item) => {
    if (window.confirm("Are You Sure")) {
      onClickRemove(item);
      fetchQuiz(courseID);
    } else {
      toast.warn("You cancelled Delete Action");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  useEffect(() => {
    fetchQuiz(courseID);
  }, [courseID]);
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="flex items-center justify-between relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Quiz List
              </h3>
              <button
                onClick={onClickAdd}
                className="mr-4 p-2 bg-red-400 text-white rounded"
              >
                Add Quiz
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mb-3  px-4">
          <select
            onChange={(e) => setCourseID(e.target.value)}
            value={courseID}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            <option>Choose Course</option>
            {categoryData.map((item) => (
              <option value={item.id} key={item.id}>
                {item.course_title}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2  pointer-events-none">
            <svg className="w-4 h-4  fill-current" viewBox="0 0 20 20">
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Question
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Option 1
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Option 2
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Option 3
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Option 4
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <th className="border-t-0 px-6 justify-start border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {/* <img
                      src={require("assets/img/bootstrap.jpg").default}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "} */}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {item.question}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.option1}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.option2}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.option3}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.option4}
                  </td>

                  <td className="border-t-0  px-6 self-end border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <div className="flex self-end justify-end  ">
                      <svg
                        onClick={() => onClickEdit(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="hover:animate-bounce cursor-pointer "
                        style={{
                          height: 22,
                          width: 22,
                          color: "blue",
                          marginRight: 20,
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      <svg
                        onClick={() => handleDeleteTry(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: 22, width: 22, color: "red" }}
                        className="hover:animate-bounce cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ListQuiz.defaultProps = {
  color: "light",
};

ListQuiz.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
