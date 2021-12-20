import {
  changePassword,
  editUserDetails,
  getUserDetails,
} from "../../../../api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function CardSettings() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUserDetails() {
    setLoading(true);
    const response = await getUserDetails(currentUser.user_id);

    const profileData = response.data?.data;
    console.log("Its Profile data", response.data);

    setFirstName(profileData?.first_name);
    setLastName(profileData.last_name);
    setEmail(profileData.email);
    setPhone(profileData.phone);
    setLoading(false);
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!firstName || firstName === "")
      return toast.error("Please Enter First Name");
    if (!email || email === "") return toast.error("Please Enter Email");
    if (!phone || phone === "" || phone.length !== 10)
      return toast.error("Please Enter a valid Phone Number");
    const data = new FormData();
    data.append("user_id", currentUser?.user_id);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("phone", phone);
    data.append("email", email);

    editUserDetails(data)
      .then(function (response) {
        setLoading(true);
        console.log("updated profile successfully", response);
        toast.success("Successfully Updated Profile");
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in update profile ", err.response);
        toast.error("Unable to Update Profile");
      });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || oldPassword === "")
      return toast.error("Please Enter Old Password");
    if (!newPassword || newPassword === "")
      return toast.error("Please Enter New Password");
    if (!confirmPassword || confirmPassword === "")
      return toast.error("Please Confirm New Password");
    if (confirmPassword !== newPassword) {
      return toast.error("New Password And Confirm Password Are Not Same");
    }
    if (newPassword.length < 8)
      return toast.error("Password must be 8 Character Long");
    const data = new FormData();
    data.append("user_id", currentUser?.user_id);
    data.append("old_password", oldPassword);
    data.append("new_password", newPassword);
    data.append("confirm_password", newPassword);

    changePassword(data)
      .then(function (response) {
        console.log("updated password successfully", response);
        if (!response.data?.status) {
          toast.error(response.data?.message);
        } else toast.success(response.data?.message);
      })
      .catch((err) => {
        console.log("error in update password ", err.response);
        toast.error("Unable to Change Password");
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentUser]);
  if (loading) {
    return (
      <div className="flex  relative  z-10  items-center justify-center h-screen rounded-lg text-white font-bold text-4xl bg-black  w-screen">
        Please Wait ....
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={firstName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={lastName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={email}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={phone}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
              <button
                className="bg-lightBlue-500 block w-full text-md  text-white active:bg-lightBlue-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleUpdateProfile}
              >
                Update
              </button>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mb-6 mt-10 font-bold uppercase">
              Change Password
            </h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Current Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Current Password"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    New Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Please Confirm New Password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full flex mt-5 lg:w-12/12 justify-center items-center px-4">
                <button
                  className="bg-lightBlue-500 block w-full  text-white active:bg-lightBlue-600 font-bold uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleChangePassword}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
