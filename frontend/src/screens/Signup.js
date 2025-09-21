
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
//import ReCAPTCHA from "react-google-recaptcha";

//  const SITE_KEY = "6LdpmqwrAAAAAAPseX6FYyrt_cGd2PdvgDVde0Im";

//const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

 
 
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  //  const [captcha, setCaptcha] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  //  if (!captcha) {
  //    alert("Please verify that you are not a robot.");
  //    return;
  //  }
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
  //captcha: captcha,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      alert("Signup successful!");
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            {/* <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={setCaptcha}
            /> */}
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );

}