import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../redux/reducers/UserSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebse.js";
import UpdateProfile from "./UpdateProfile.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const {
    user: currentUser,
    loading,
    error,
  } = useSelector((state) => state?.auth?.user);
  console.log(currentUser);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState(currentUser?.address || "");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
      setAddress(currentUser.address || "");
    }
  }, [currentUser]);

  const handleProfilePhoto = (photo) => {
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const photoname = new Date().getTime() + photo.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`); //profile-photos - folder name in firebase
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const res = await fetch(
              `/api/user/update-profile-photo/${currentUser._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": " application/json",
                },
                body: JSON.stringify({ avatar: downloadUrl }),
              }
            );
            const data = await res.json();
            if (data?.success) {
              alert(data?.message);
              setFormData({ ...formData, avatar: downloadUrl });
              dispatch(updateUserSuccess(data?.user));
              setProfilePhoto(null);
              return;
            } else {
              dispatch(updateUserFailure(data?.message));
            }
            dispatch(updateUserFailure(data?.message));
            alert(data?.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm(
      "Are you sure? The account will be permanently deleted!"
    );
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          alert("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        alert(data?.message);
      } catch (error) {}
    }
  };

  const handleEditProfileOpen = () => {
    setEditProfile(true);
  };

  const handleEditProfileClose = () => {
    setEditProfile(false);
  };

  const handleAddAddress = () => {
    setShowAddressInput(true);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update-address/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Address updated successfully");
        dispatch(updateUserSuccess(data.user));
        setShowAddressInput(false);
      } else {
        dispatch(updateUserFailure(data.message));
        alert("Failed to update address");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-wrap max-sm:flex-col p-2">
      {currentUser ? (
        <>
          <div className="lg:w-[40%] border-8 border-gray-300 rounded-md m-auto p-3 ">
            <div className="flex flex-col items-center gap-4 p-3">
              <div className="w-full  flex flex-col items-center relative">
                <img
                  src={
                    (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                    formData.avatar
                  }
                  alt="Profile photo"
                  className="w-36 border-8  border-gray-300 rounded-full min-h-24 max-h-36 "
                  onClick={() => fileRef.current.click()}
                  onMouseOver={() => {
                    document
                      .getElementById("photoLabel")
                      .classList.add("block");
                  }}
                  onMouseOut={() => {
                    document
                      .getElementById("photoLabel")
                      .classList.remove("block");
                  }}
                />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  hidden
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                <label
                  htmlFor="photo"
                  id="photoLabel"
                  className="w-64 bg-slate-300 absolute bottom-0 p-2 text-center text-sm  text-white font-semibold rounded-b-lg"
                  hidden
                >
                  Choose Photo
                </label>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 absolute left-[55%] bottom-2 rounded-full border-4 border-gray-200 p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </div>
              {profilePhoto && (
                <div className="flex w-full justify-between gap-1">
                  <button
                    onClick={() => handleProfilePhoto(profilePhoto)}
                    className="bg-green-700 p-2 text-white mt-3 flex-1 hover:opacity-90"
                  >
                    {loading ? `Uploading...(${photoPercentage}%)` : "Upload"}
                  </button>
                </div>
              )}

              <div className="w-full flex items-center justify-between px-1">
                <p className="border-t-8 text-center pt-2 w-full ">
                  <span className="font-semibold uppercase bg-[#fff]">
                    User Details
                  </span>
                </p>

                <button
                  onClick={() => handleEditProfileOpen()}
                  className="text-blue-500 text-lg self-end bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full flex flex-col gap-1 p-3 break-all">
                <p className="text-3xl font-semibold m-1 ">
                  Hi {currentUser.username}!
                </p>
                <p className="flex gap-4 text-md border-2 rounded-xl p-2">
                  {currentUser.email}
                </p>
                {currentUser.phone ? (
                  <div>
                    <p className="flex text-md border-2 rounded-xl p-2">
                      {currentUser.phone}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleAddAddress}
                    className="text-blue-600 w-full p-2 bg-gray-200 hover:bg-blue-500 hover:text-white"
                  >
                    Add Phone
                  </button>
                )}

                {currentUser.address ? (
                  <div className="border-2 border-dashed rounded-xl p-3 w-full h-24">
                    <input
                      type="radio"
                      className=""
                      checked={!showAddressInput}
                      readOnly
                    />
                    <p className="flex text-md">{currentUser.address}</p>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleAddAddress}
                      className="text-red-600 w-full p-2 bg-gray-200 hover:bg-red-500 hover:text-white"
                    >
                      Add Address
                    </button>
                    {showAddressInput && (
                      <form onSubmit={handleAddressSubmit} className="w-full">
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your address"
                          className="w-full p-2 border rounded-md"
                        />
                        <button
                          type="submit"
                          className="w-full p-2 mt-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Save Address
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
              <button
                onClick={handleDeleteAccount}
                className="text-red-600 w-full p-2 bg-gray-200 hover:bg-red-500 hover:text-white"
              >
                Change Password
              </button>

              <button
                onClick={handleDeleteAccount}
                className="text-red-600 w-full p-2 bg-gray-200 hover:bg-red-500 hover:text-white"
              >
                Delete account
              </button>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------------- */}
          {/* Update profile */}
          <div>
            <UpdateProfile
              open={editProfile}
              handleClose={handleEditProfileClose}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex gap-2 items-center">
            <p className="text-red-700">Sign in First:</p>
            <span
              onClick={() => navigate("/signin")}
              className="text-blue-500 underline cursor-pointer"
            >
              Sign in
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
