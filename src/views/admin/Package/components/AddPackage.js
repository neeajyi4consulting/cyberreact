import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Select from "react-select";
import { getCourse } from "api";
import { addPackage } from "api";

export default function AddPackage({ color, submitClose, handleClose }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState();
  const [courses, setCourses] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [price, setPrice] = useState("");

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const fetchCourse = async () => {
    try {
      const response = await getCourse();
      console.log("couses", response.data?.data);
      setCourses(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPackage = async (e) => {
    e.preventDefault();

    if (!name || name === "") return toast.error("Please Enter Category Name");
    // if (!about || about === "") return toast.error("Please Enter About");
    if (!image || image === "") return toast.error("Please Select Image");
    const data = new FormData();
    console.log(data);
    data.append("name", name);
    data.append("about", about);
    data.append("price", price);
    data.append("image", image);
    data.append("course", [courseList]);
    // data.append("payment_link", paymentURL);

    addPackage(data)
      .then(function (response) {
        if (response.data?.status === true) {
          toast.success("Successfully Added Membership");
          console.log(response);
          setName("");
          setAbout("");
          setPrice("");
          setCourseList([]);
          setImage();
          submitClose(submitClose);
        } else {
          toast.error(response.data?.message);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log("Error in add Membership", err.response);
      });
  };

  const onChangeInput = (value) => {
    console.log(value);
    const item = value.map((item) => item.id);
    setCourseList(item);
  };

  useEffect(() => {
    fetchCourse();
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
              Create membership
            </h6>

            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Membership Name
                </label>
                <input
                  type="text"
                  placeholder="Write Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  Membership Price
                </label>
                <input
                  type="text"
                  placeholder="Membership Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            {/* <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Payment Link
                </label>
                <input
                  type="text"
                  placeholder="Payment url"
                  value={paymentURL}
                  onChange={(e) => setPaymentURL(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div> */}
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  About
                </label>
                <input
                  type="text"
                  placeholder="Write About Membership"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <Select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  getOptionLabel={(option) => option.course_title}
                  getOptionValue={(option) => option.id}
                  placeholder={"Select Membership Courses"}
                  isMulti
                  options={courses}
                  onChange={(value) => onChangeInput(value)}
                />
              </div>
            </div>

            <div className=" w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Membership Image
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
                onClick={handleAddPackage}
              >
                Create Membership
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

AddPackage.defaultProps = {
  color: "light",
};

AddPackage.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
