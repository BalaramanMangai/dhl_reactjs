import React, { useState,useEffect } from 'react';
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import "../../../css/AddMember.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditAgentForm = (props) => {
 const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState('');
  const [formData, setFormData] = useState({
    username: props.user.username,
    name: props.user.name,
    email: props.user.email,
    mobile: props.user.mobile,
    whatsap_number: props.user.whatsap_number,
    gpay_number: props.user.gpay_number,
    upi_id: props.user.upi_id,
    account_name: props.user.account_name,
    account_no: props.user.account_no,
    bank_name: props.user.bank_name,
    ifsc_code: props.user.ifsc_code,
    district: props.user.district,
    city: props.user.city,
    address: (props.user.address) ? props.user.address : '',
    user_id: props.user.user_id,
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    name: '',
    email: '',
    mobile: '',
  });
  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '-0.75rem',
    marginLeft: '0.75rem',
  };  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update the form data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Validate the field
    const errors = validateForm();
    setFormErrors(errors);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields on submit
    const errors = validateForm();
    setFormErrors(errors);
  
    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return; // Do not submit the form
    }
    

    const url = 'http://localhost:3000/users/updateMember'; // Replace with your API endpoint
    const payload = {
      role_id:2,
      username: formData.username,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      whatsap_number: formData.whatsap_number,
      gpay_number: formData.gpay_number,
      upi_id: formData.upi_id,
      account_name: formData.account_name,
      account_no: formData.account_no,
      bank_name: formData.bank_name,
      ifsc_code: formData.ifsc_code,
      district: formData.district,
      city: formData.city,
      address: formData.address,
      status:1,
      user_id:formData.user_id
    };



    try {
      const response = await axios.post(url, payload);
      console.log('response',response);
      setResponseMessage(`Success: ${response.data.message}`);
      navigate('/agents'); 
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
    }

  
    console.log('Form submitted successfully:', formData);
  };
  

  const validateForm = () => {
    const errors = {};
  
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required.';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters long.';
    }
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
   if (!formData.mobile) {
      errors.mobile = 'Mobile number is required.';
    }
    
  
    return errors;
  };



  return (
    <form onSubmit={handleSubmit}>

      <div style={{color:'green'}}>{responseMessage}</div>
      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {formErrors.username && <p style={errorStyle}>{formErrors.username}</p>}
      </div>

      {/* <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <p style={errorStyle}>{formErrors.password}</p>}
      </div> */}

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {formErrors.name && <p style={errorStyle}>{formErrors.name}</p>}
      </div>
      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        {formErrors.mobile && <p style={errorStyle}>{formErrors.mobile}</p>}
      </div>

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p style={errorStyle}>{formErrors.email}</p>}
      </div>

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="whatsap_number"
          placeholder="Whatsap Number"
          value={formData.whatsap_number}
          onChange={handleChange}
        />
        {formErrors.whatsap_number && <p style={errorStyle}>{formErrors.whatsap_number}</p>}
      </div>

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="gpay_number"
          placeholder="Gpay Number"
          value={formData.gpay_number}
          onChange={handleChange}
        />
        {formErrors.gpay_number && <p style={errorStyle}>{formErrors.gpay_number}</p>}
      </div>


      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="upi_id"
          placeholder="UPI ID"
          value={formData.upi_id}
          onChange={handleChange}
        />
        {formErrors.upi_id && <p style={errorStyle}>{formErrors.upi_id}</p>}
      </div>


      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="account_name"
          placeholder="Account Name"
          value={formData.account_name}
          onChange={handleChange}
        />
      </div>

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="account_no"
          placeholder="Account NO"
          value={formData.account_no}
          onChange={handleChange}
        />
      </div>


      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="bank_name"
          placeholder="Bank Name"
          value={formData.bank_name}
          onChange={handleChange}
        />
      </div>

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="ifsc_code"
          placeholder="Bank IFSC Code"
          value={formData.ifsc_code}
          onChange={handleChange}
        />
      </div>
      

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
        />
        {formErrors.district && <p style={errorStyle}>{formErrors.district}</p>}
      </div>


      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        {formErrors.city && <p style={errorStyle}>{formErrors.city}</p>}
      </div>


<div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        {formErrors.address && <p style={errorStyle}>{formErrors.address}</p>}
      </div>
      

    

      <Button type="submit" variant="contained" color="primary">
        Update Agent
      </Button>
    </form>
  );
};

export default EditAgentForm;
