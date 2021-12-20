import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { addQuiz } from "api";
import { getCourse } from "api";

// components

export default function AddQuiz({ color, handleClose, submitClose }) {
  const [categoryData, setCategoryData] = useState([]);
  const [courseID, setCourseID] = useState();
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState();
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [marks, setMarks] = useState(1);

  const handleAddQuiz = async (e) => {
    e.preventDefault();

    if (!question || question === "")
      return toast.error("Please Enter Question");
    if (!optionA || optionA === "") return toast.error("Please Enter Option A");
    if (!optionB || optionB === "") return toast.error("Please Enter Option B");
    if (!optionC || optionC === "") return toast.error("Please Enter Option C");
    if (!optionD || optionD === "") return toast.error("Please Enter Option D");
    if (!rightAnswer || rightAnswer === "")
      return toast.error("Please Enter Right Answer");

    const data = new FormData();

    data.append("course_id", courseID);
    data.append("question", question);
    data.append("marks", marks);
    data.append("option1", optionA);
    data.append("option2", optionB);
    data.append("option3", optionC);
    data.append("option4", optionD);
    data.append("answer", rightAnswer);
    console.log(courseID);

    addQuiz(data)
      .then(function (response) {
        if (response.data?.status === true) {
          console.log("added quiz successfully");
          toast.success("Successfully Added Quiz Question");
          submitClose(submitClose);
          console.log(response);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in add quiz", err.response);
        toast.error("Unable to Add Quiz Question");
      });
  };

  const fetchCategory = async () => {
    const { data } = await getCourse();
    await setCategoryData(data?.data);
    console.log(categoryData);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="flex-auto px-4 lg:px-5 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Add Quiz Questions
            </h6>
            <div className="w-full mb-3  px-4">
              <select
                onChange={(e) => setCourseID(e.target.value)}
                value={courseID}
                className="border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value={null}>Select Course</option>

                {categoryData.map((item) => (
                  <>
                    <option value={item.id} key={item.id}>
                      {item.course_title}
                    </option>
                  </>
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

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Question<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="write your question ..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Option A<span className="text-red-500">*</span>
                  {/* <span className="ml-5 text-red-500">
                    &nbsp; &nbsp;Plz Don't Use &nbsp;,&nbsp; in any Option
                  </span> */}
                </label>
                <input
                  type="text"
                  placeholder="option A"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Option B<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="option B"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Option C<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="option C"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Option D<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="option D"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Right Answer<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Right Answer"
                  value={rightAnswer}
                  onChange={(e) => setRightAnswer(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Marks For This Question
                </label>
                <input
                  type="text"
                  placeholder="marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAddQuiz}
              >
                Add
              </button>
              <button
                className="bg-red-500 block w-full  h-10 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

AddQuiz.defaultProps = {
  color: "light",
};

AddQuiz.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
