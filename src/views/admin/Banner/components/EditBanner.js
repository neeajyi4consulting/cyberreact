import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import { editBanner } from "api";

export default function EditBanner({
  color,
  bannerData,
  handleClose,
  submitClose,
}) {
  const [title, setTitle] = useState(bannerData.title);
  const [link, setLink] = useState(bannerData.link);
  const [image, setImage] = useState();

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
  );

  const handleEditbanner = async (e) => {
    e.preventDefault();

    if (!title || title === "") {
      toast.warn("Please Enter Title");
    }
    if (!link || link === "" || !regex.test(link)) {
      toast.warn("Please Enter A Valid Link");
    }
    const data = new FormData();
    data.append("id", bannerData?.id);
    data.append("title", title);
    data.append("image", image);
    data.append("link", link);

    await editBanner(data)
      .then(function (response) {
        if (response.data?.Status === true) {
          submitClose(submitClose);
          toast.success("Successfully Updated banner");
          console.log("this is response if true", response);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in update banner", err.response);
        // toast.error("Unable to Add course");
      });
  };

  return (
    <div>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="flex-auto px-4 lg:px-5 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Edit banner
            </h6>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  banner Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  Link<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
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
                  Course Image
                </label>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleImage}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleEditbanner}
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
    </div>
  );
}
EditBanner.defaultProps = {
  color: "light",
};

EditBanner.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
