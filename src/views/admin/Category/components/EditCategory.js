import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { editCategory } from "api";

// components

export default function EditCategory({
  color,
  catData,
  fetchCategory,
  handleClose,
  submitClose,
}) {
  const [categoryName, setCategoryName] = useState(catData.title);
  const [about, setAbout] = useState(catData.about);
  const [image, setImage] = useState();

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    console.log(catData.id);
    if (!categoryName || categoryName === "")
      return toast.error("Please Enter Category Name");
    // if (!about || about === "") return toast.error("Please Enter About");
    // if (!image || image === "") return toast.error("Please Enter About");
    const data = new FormData();
    data.append("category_id", catData.id);
    data.append("title", categoryName);
    data.append("about", about);
    data.append("category_image", image);

    editCategory(data)
      .then(function (response) {
        if (response) {
          console.log("Edited category successfully");
          toast.success("Successfully Updated Category");
          console.log(response);
          submitClose(submitClose);
          fetchCategory();
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("error in update category", err);
        // toast.error("Unable to Update Category");
      });
  };

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
              Edit Category
            </h6>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Write Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
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
                  Category About
                </label>
                <input
                  type="text"
                  placeholder="Write Category About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
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
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  // value={image}
                  onChange={handleImage}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>

            <div className="w-full flex mt-5 lg:w-12/12 justify-between items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full h-10  text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleEditCategory}
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

EditCategory.defaultProps = {
  color: "light",
};

EditCategory.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
