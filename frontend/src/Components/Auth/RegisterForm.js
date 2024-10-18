import React from "react";
import { useState } from "react";
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  return (
    <>
      <form >
      <div className="form_container">
      <div>
          <input type="text" id="name" className="form_name" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required/>
        </div>

        <div>  
          <input type="email" id="email" name="email"  className="form_email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>

        <div>     
          <input type="password" id="password" className="form_password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </div>

        <div>
          <input type="password" id="confirmPassword" className="form_password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required/>
        </div>
      </div>
       
      </form>
    </>
  );
}
