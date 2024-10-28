import React, { useState } from "react";
import "./Setting.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Toast from "../../Services/Toast/Toast";
import { useNavigate } from "react-router-dom";
export default function Setting() {
  const userId = JSON.parse(localStorage.getItem("userData"));
  const [formData, setFormData] = useState({
    name: userId?userId.name:"",
    email:userId?userId.email:"",
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
 
  const navigate = useNavigate();
  const updateUserDetailAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/auth/updateuserdetail`,
        {
          ...formData,
          userId: userId._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.what !== "name") {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/");
      }
      Toast(`Successfully updated ${response.data.what}`, true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast(error.response?.data?.message || "An error occurred while updating", false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    if (name === "name" && value.trim() === "") {
      error = "Name is required";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email address";
    } else if (name === "oldPassword" && value.length < 6) {
      error = "Password must be at least 6 characters";
    } else if (name === "newPassword" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (
      !formData.name &&
      !formData.email &&
      !formData.oldPassword &&
      !formData.newPassword
    ) {
      newErrors.general = "Please fill out at least one field to update";
    }
    if (formData.name && formData.name.trim() === "")
      newErrors.name = "Name is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (formData.oldPassword && formData.oldPassword.length < 6)
      newErrors.oldPassword = "Password must be at least 6 characters";
    if (formData.newPassword && formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      updateUserDetailAPI();
    } else {
      const specificError =
        newErrors[focusedField] ||
        newErrors.general ||
        Object.values(newErrors)[0];
      Toast(specificError, false);
    }
  };

  return (
    <>
      <div className="setting_container">
        {loading && <Loader />}
        <div className="setting_box">
          <div className="setting_heading">Setting</div>
          <div className="setting_form_box">
            <form onSubmit={handleSubmit}>
              <div className="form_container" style={{ height: "37vh" }}>
                <div>
                  <input
                    type="text"
                    id="name"
                    className={`form_name ${errors.name ? "error" : ""}`}
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ minWidth: "32vh", maxWidth: "32vh" }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={`form_email ${errors.email ? "error" : ""}`}
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ minWidth: "32vh", maxWidth: "32vh" }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="oldPassword"
                    className={`form_password ${
                      errors.oldPassword ? "error" : ""
                    }`}
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ minWidth: "32vh", maxWidth: "32vh" }}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="newPassword"
                    className={`form_password ${
                      errors.newPassword ? "error" : ""
                    }`}
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ minWidth: "32vh", maxWidth: "32vh" }}
                  />
                </div>

                <div style={{ position: "relative", marginBottom: "4vh" }}>
                  <div
                    className="display_error"
                    style={{ justifyContent: "flex-start" }}
                  >
                    {errors[focusedField]}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="setting_update_btn"
                disabled={loading}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
