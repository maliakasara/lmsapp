import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../../Redux/Slices/AuthSlice";
import InputBox from "../../Components/InputBox/InputBox";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock, IoIosRefresh } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userInput, setUserInput] = useState({
    name: userData?.fullName || "",
    avatar: null,
    previewImage: null,
    userId: null,
  });
  const avatarInputRef = useRef(null);
  const [isChanged, setIschanged] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          avatar: uploadImage,
        });
      });
    }
  }

  async function onFormSubmit(e) {
    setIsUpdating(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", userInput.name);
    if (userInput.avatar) {
      formData.append("avatar", userInput.avatar);
    }
    const data = { formData, id: userInput.userId };
    const response = await dispatch(updateUserData(data));
    if (response?.payload?.success) {
      await dispatch(getUserData());
      setIschanged(false);
    }
    setIsUpdating(false);
  }

  async function handleCancelSubscription() {
    const res = await dispatch(cancelCourseBundle());
    if (res?.payload?.success) {
      await dispatch(getUserData());
    }
  }

  useEffect(() => {
    setIschanged(userInput.name !== userData?.fullName || userInput.avatar);
  }, [userInput]);

  useEffect(() => {
    async function fetchUser() {
      await dispatch(getUserData());
    }
    if (Object.keys(userData).length < 1) fetchUser();
  }, []);

  useEffect(() => {
    setUserInput({
      ...userInput,
      name: userData?.fullName,
      userId: userData?._id,
    });
  }, [userData]);

  return (
    <Layout hideFooter={true}>
      <section className="flex justify-center items-center py-12 min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-[#0f0f0f] dark:to-[#1a1a1a] text-gray-800 dark:text-white">
        <form
          autoComplete="off"
          noValidate
          onSubmit={onFormSubmit}
          className="w-full max-w-2xl bg-white dark:bg-base-100 shadow-xl rounded-2xl px-6 py-8 space-y-8 relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold font-inter text-violet-600 dark:text-purple-400">
              Profile Settings
            </h2>
            <button
              type="button"
              onClick={() => setIsDialogOpen((prev) => !prev)}
              className="text-gray-600 dark:text-gray-300 relative"
              title="More"
            >
              <FiMoreVertical size={22} />
              {isDialogOpen && (
                <div className="absolute right-0 top-6 z-10 w-48 bg-white dark:bg-base-300 border dark:border-gray-600 rounded-lg shadow-md">
                  <button
                    onClick={() => navigate("change-password")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                  >
                    <IoIosLock /> Change Password
                  </button>
                  <button
                    onClick={() => navigate("reset-password")}
                    className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-300 flex items-center gap-2 text-sm"
                  >
                    <IoIosRefresh /> Reset Password
                  </button>
                </div>
              )}
            </button>
          </div>

          {/* Avatar */}
          <div className="flex justify-center">
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => avatarInputRef.current.click()}
            >
              {userInput.previewImage || userData?.avatar?.secure_url ? (
                <img
                  src={userInput.previewImage || userData?.avatar?.secure_url}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400 dark:text-gray-600" />
              )}
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                ref={avatarInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <InputBox
              label={"Full Name"}
              name={"name"}
              type={"text"}
              placeholder={"Enter full name"}
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
            />
            <InputBox
              label={"Email"}
              name={"email"}
              type={"email"}
              value={userData?.email || ""}
              disabled={true}
            />
            <InputBox
              label={"Role"}
              name={"role"}
              type={"text"}
              value={userData?.role || ""}
              disabled={true}
            />
            <InputBox
              label={"Subscription"}
              name={"subscription"}
              type={"text"}
              value={userData?.subscription?.status || "Not Active"}
              disabled={true}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className={`py-3 rounded-md bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold w-full ${
                (!isChanged || isUpdating) && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isChanged || isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>

            {userData?.subscription?.status === "active" && (
              <button
                type="button"
                onClick={handleCancelSubscription}
                className="py-3 rounded-md bg-red-500 hover:bg-red-600 transition text-white font-semibold w-full"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </form>
      </section>
    </Layout>
  );
}
