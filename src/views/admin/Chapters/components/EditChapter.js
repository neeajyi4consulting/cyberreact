import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getCourse } from "api";
import { editChapter } from "api";

// components

export default function EditChapter({
  color,
  chapterData,
  handleClose,
  submitClose,
}) {
  const [courseData, setCourseData] = useState([]);
  const [courseTitle, setCourseTitle] = useState(chapterData.chapter_name);
  const [about, setAbout] = useState(chapterData.about);
  const [file, setFile] = useState();
  const [attachment, setAttachment] = useState();
  const [attachmentSize, setAttachmentSize] = useState(false);
  const [fileSize, setFileSize] = useState(false);
  const [courseID, setCourseID] = useState(chapterData.course);
  const [courseLink, setCourseLink] = useState(chapterData.link);

  const handleFile = (e) => {
    if (!e.target.files[0]) {
      return;
    } else if (e.target.files[0].size < 2097152) {
      setFileSize(false);
      setFile(e.target.files[0]);
    } else {
      setFileSize(true);
    }
  };
  const handleAttachment = (e) => {
    if (!e.target.files[0]) {
      return;
    } else if (e.target.files[0].size < 2097152) {
      setAttachmentSize(false);
      setAttachment(e.target.files[0]);
    } else {
      setAttachmentSize(true);
    }
    // if (!e.target.files[0]) return;
  };
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
  );

  const handleAddChapter = async (e) => {
    e.preventDefault();

    if (!courseTitle || courseTitle === "")
      return toast.error("Please Enter Course Name");
    if (!about || about === "") return toast.error("Please Enter About");
    if (!courseLink || courseLink === "" || !regex.test(courseLink))
      return toast.error("Please Enter Chapter URL");
    if (!courseID || courseID === "")
      return toast.error("Please Select Course");
    if (attachmentSize)
      return toast.error(
        "Attachment File Size Too Big Maximum file Size is 2MB",
      );
    if (fileSize)
      return toast.error("Pdf Size Too Big Maximum file Size is 2MB");

    console.log("chapter Data", chapterData);
    const data = new FormData();
    data.append("chapter_id", chapterData.id);
    data.append("chapter_name", courseTitle);
    data.append("course_id", courseID);
    data.append("about", about);
    data.append("discussion", "");
    data.append("bookmarks", "");
    data.append("attachment", attachment);
    data.append("link", courseLink);
    data.append("chapter_file", file);

    editChapter(data)
      .then(function (response) {
        if (response.data?.status === true) {
          console.log("Edited chapter successfully");
          toast.success("Successfully Edited Chapter");
          submitClose(submitClose);
          console.log(response);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in edit chapter", err);
        toast.error("Something Went Wrong");
      });
  };

  const fetchCourse = async () => {
    const { data } = await getCourse();
    setCourseData(data?.data);
    console.log(data?.data);
  };

  useEffect(() => {
    fetchCourse();
    return () => {};
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
              Edit Chapter
            </h6>
            <div className="w-full mb-3  px-4">
              <select
                onChange={(e) => setCourseID(e.target.value)}
                value={courseID}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option>Select Course</option>

                {courseData.map((item) => (
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
            {/* <div className="w-full mb-3  px-4">
              <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <option>Choose Course</option>
                <option>React</option>
                <option>Angular</option>
                <option>Figma</option>
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
            </div> */}

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Chapter / Module Name<span className="text-red-500">*</span>
                </label>
                <input
                  value={courseTitle}
                  type="text"
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Title"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative h-auto w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  About Chapter<span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Discription"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Chapter URL (Only Vimeo Link)
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="URL"
                  value={courseLink}
                  onChange={(e) => setCourseLink(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className=" w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Chapter File (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className=" w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Chapter Attachment (ZIP) OPTIONAL
                </label>
                <input
                  type="file"
                  accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                  onChange={handleAttachment}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAddChapter}
              >
                Update
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

EditChapter.defaultProps = {
  color: "light",
};

EditChapter.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
