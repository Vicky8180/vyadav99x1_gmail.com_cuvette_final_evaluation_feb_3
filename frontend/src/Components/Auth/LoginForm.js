import React from "react";
import { useState } from "react";
export default function LoginForm() {
  const [formData, setFormData] = useState({

    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form >
      <div className="form_container">
   

        <div>  
          <input type="email" id="email" name="email"  className="form_email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>

        <div>     
          <input type="password" id="password" className="form_password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        </div>
      </div>
       
      </form>
    </>
  );
}
