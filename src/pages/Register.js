import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [category, setCategory] = useState("T");
  const [regPassword, setRegPassword] = useState("");
  const [error,setError] = useState('')

  const regFNameInp = (e) => {
    setRegFirstName(e.target.value);
  };
  const regLNameInp = (e) => {
    setRegLastName(e.target.value);
  };
  const regEmailInp = (e) => {
    setRegEmail(e.target.value);
  };
  const categorySelect = (e) => {
    setCategory(e.target.value);
  };
  const regPasswordInp = (e) => {
    setRegPassword(e.target.value);
  };

  const registerSubmit = (e) => {
    console.log(e);
    e.preventDefault();

    const dataRegister = {
        first_name: regFirstName,
        last_name: regLastName,
        email: regEmail,
        category: category,
        password: regPassword,
      };
      
      console.log(dataRegister);
      
      axios.post("https://itticoursebaku.pythonanywhere.com/api/register/", dataRegister, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
        }
      }).then(resp=>{
        console.log(resp);
      });
      
  };
  return (
    <div className='register_container'>
      <h1 className='register_topic'>SIGN UP</h1>
      <form onSubmit={registerSubmit} className='register_form'>
<label htmlFor="reg_fname">First Name</label>
  <input required value={regFirstName} onChange={regFNameInp} id='reg_fname' className='log_reg_inp' type="text" placeholder='Enter your first name' />
  <label htmlFor="reg_lname">Last Name</label>
  <input required value={regLastName} onChange={regLNameInp} id='reg_lname' className='log_reg_inp' type="text" placeholder='Enter your last name' />
  <label htmlFor="reg_email">Email</label>
  <input required value={regEmail} onChange={regEmailInp} id='reg_email' className='log_reg_inp' type="email" placeholder='Enter your email' />
  <label htmlFor="reg_category">Category</label>
  <select value={category} onChange={categorySelect} className="reg_category_inp" name="" id="reg_category">
          <option value="T">Teacher</option>
          <option value="S">Student</option>
        </select>
  <label htmlFor="reg_pass">Password</label>
  <input required value={regPassword} onChange={regPasswordInp} id='reg_pass' className='log_reg_inp' type="password" placeholder='Enter your password' />
  
  <Link to={"/login"}><span className='go_login'>Already have an account?</span></Link>
  <p>{error}</p>
  <button className='login_reg_btn'>Sign up</button>
</form>
    </div>
  );
};

export default Register;
