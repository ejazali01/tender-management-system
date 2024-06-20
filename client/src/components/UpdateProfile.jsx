import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updatePassStart,
  updatePassSuccess,
  updatePassFailure,
} from "../redux/reducers/UserSlice.js";
import { profileSchema } from "../../utils/Validation.js";

const UpdateProfile = ({ open, handleClose }) => {
  const { user: currentUser, loading, error } = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const [updateProfileDetailsPanel, setUpdateProfileDetailsPanel] = useState(true);

  const passwordSchema = Yup.object().shape({
    oldpassword: Yup.string().required("Old password is required"),
    newpassword: Yup.string().required("New password is required"),
  });

  const formikProfile = useFormik({
    initialValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      address: currentUser?.address || "",
      phone: currentUser?.phone || "",
      avatar: currentUser?.avatar || "",
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (
        currentUser.username === values.username &&
        currentUser.email === values.email &&
        currentUser.address === values.address &&
        currentUser.phone === values.phone
      ) {
        alert("Change at least 1 field to update details");
        return;
      }
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.success === false && res.status !== 201 && res.status !== 200) {
          dispatch(updateUserSuccess());
          dispatch(updateUserFailure(data?.message));
          alert("Session Ended! Please login again");
          navigate("/login");
          return;
        }
        if (data.success && res.status === 201) {
          alert(data?.message);
          dispatch(updateUserSuccess(data?.user));
          return;
        }
        alert(data?.message);
        return;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      if (
        values.oldpassword === "" ||
        values.newpassword === "" ||
        values.oldpassword === values.newpassword
      ) {
        alert("New password can't be same!");
        return;
      }
      try {
        dispatch(updatePassStart());
        const res = await fetch(`/api/user/update-password/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.success === false && res.status !== 201 && res.status !== 200) {
          dispatch(updateUserSuccess());
          dispatch(updatePassFailure(data?.message));
          alert("Session Ended! Please login again");
          navigate("/login");
          return;
        }
        dispatch(updatePassSuccess());
        alert(data?.message);
        formikPassword.resetForm();
        return;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Dialog
      className="p-4 md:w-96 lg:w-96 xl:w-96 2xl:w-96"
      open={open}
      handler={handleClose}
    >
      <div className="flex justify-between">
        <div className="flex justify-center w-full">
          <h1 className="text-center uppercase">
            Update Profile
          </h1>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <DialogBody>
        <div
          className={`updateProfile w-full p-3 m-1 transition-all duration-300 flex justify-center`}
        >
          {updateProfileDetailsPanel ? (
            <form
              className="flex flex-col self-center p-2 h-fit gap-2 sm:w-[320px]"
              onSubmit={formikProfile.handleSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="username" className="">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="p-1 rounded border border-black"
                  value={formikProfile.values.username}
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                />
                {formikProfile.touched.username &&
                  formikProfile.errors.username && (
                    <div className="text-red-500 text-sm">
                      {formikProfile.errors.username}
                    </div>
                  )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-1 rounded border border-black"
                  value={formikProfile.values.email}
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                />
                {formikProfile.touched.email && formikProfile.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formikProfile.errors.email}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="">
                  Address:
                </label>
                <textarea
                  maxLength={200}
                  type="text"
                  id="address"
                  className="p-1 rounded border border-black resize-none"
                  value={formikProfile.values.address}
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                />
                {formikProfile.touched.address &&
                  formikProfile.errors.address && (
                    <div className="text-red-500 text-sm">
                      {formikProfile.errors.address}
                    </div>
                  )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  className="p-1 rounded border border-black"
                  value={formikProfile.values.phone}
                  onChange={formikProfile.handleChange}
                  onBlur={formikProfile.handleBlur}
                />
                {formikProfile.touched.phone && formikProfile.errors.phone && (
                  <div className="text-red-500 text-sm">
                    {formikProfile.errors.phone}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="p-2 text-white bg-slate-700 rounded hover:opacity-95"
              >
                {loading ? "Loading..." : "Update"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => setUpdateProfileDetailsPanel(false)}
                className="p-2 text-white bg-red-700 rounded hover:opacity-95"
              >
                {loading ? "Loading..." : "Change Password"}
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col border border-black rounded-lg p-2 w-72 h-fit gap-2 sm:w-[320px]"
              onSubmit={formikPassword.handleSubmit}
            >
              <h1 className="text-2xl text-center">
                Change Password
              </h1>
              <div className="flex flex-col">
                <label htmlFor="oldpassword" className="">
                  Enter old password:
                </label>
                <input
                  type="password"
                  id="oldpassword"
                  className="p-1 rounded border border-black"
                  value={formikPassword.values.oldpassword}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                />
                {formikPassword.touched.oldpassword &&
                  formikPassword.errors.oldpassword && (
                    <div className="text-red-500 text-sm">
                      {formikPassword.errors.oldpassword}
                    </div>
                  )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="newpassword" className="">
                  Enter new password:
                </label>
                <input
                  type="password"
                  id="newpassword"
                  className="p-1 rounded border border-black"
                  value={formikPassword.values.newpassword}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                />
                {formikPassword.touched.newpassword &&
                  formikPassword.errors.newpassword && (
                    <div className="text-red-500 text-sm">
                      {formikPassword.errors.newpassword}
                    </div>
                  )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="p-2 text-white bg-slate-700 rounded hover:opacity-95"
              >
                {loading ? "Loading..." : "Update Password"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setUpdateProfileDetailsPanel(true);
                  formikPassword.resetForm();
                }}
                className="p-2 text-white bg-red-700 rounded hover:opacity-95 w-24"
              >
                {loading ? "Loading..." : "Back"}
              </button>
            </form>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default UpdateProfile;
