import React, { useState , useEffect,useCallback} from 'react';
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import "../../../css/AddMember.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';



const AddMemberForm = () => {

  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);



  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('isAuthenticated',isAuthenticated);

  const [responseMessage, setResponseMessage] = useState('');

  const [getAgent, setAgentList] = useState({});
  
  const [formData, setFormData] = useState({
    agent_id:'',
    username: '',
    password: '',
    name: '',
    email: '',
    mobile: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
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


    const url = 'http://localhost:3000/users/addMember'; // Replace with your API endpoint
    const payload = {
      agent_id:formData.agent_id,
      role_id:1,
      username: formData.username,
      password: formData.password,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      whatsap_number: formData.whatsap_number,
      gpay_number: formData.gpay_number,
      upi_id: formData.upi_id,
      district: formData.district,
      city: formData.city,
      address: formData.address,
      status:1
    };

    try {
      const response = await axios.post(url, payload);
      setResponseMessage(`Success: ${response.data.message}`);
      navigate('/members'); 
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
    }

  
    console.log('Form submitted successfully:', formData);
  };


  const getAgentList_ = async () => {
    const url = 'http://localhost:3000/users/getAgents';

    try {
      const response = await axios.get(url, {
        params: {
          role_id: 2,
        },
      });
      console.log('response',response);
      setAgentList(response.data);
      setError(null);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };


  const getAgents = useCallback(async () => {
    try {
      const url = 'http://localhost:3000/users/getAgents';
      const response = await axios.get(url);
      console.log('response',response);
      setAgentList(response.data);
      setError(null);

      


    } catch (error) {

      setError(`Error: ${err.message}`);
      console.error('Error fetching data:', err);
    }
  }, []); // Empty dependency array because it doesn't depend on props/state

  
  

  const validateForm = () => {
    const errors = {};
  
    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required.';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters long.';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    } else if (formData.password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
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
   if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required.';
    }
    
  
    return errors;
  };

  const getUserCode = async () =>{

    const url = 'http://localhost:3000/users/getUserCode';

    try {
      const response = await axios.get(url, {
        params: {
          role_id: 1
        }});

      console.log('code',response.data);

      setFormData(prevFormData => ({
        ...prevFormData,
        username: response.data, // Default value
    }));
      setCode(response.data);
    } catch (error) {
      console.log('error',error);
    }
  }
  

    useEffect(() => {

     

      

       getUserCode();
    }, []);


  useEffect(() => {

    getAgents();
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate,getAgents]);

  if (!isAuthenticated) {
    return null;
  }

  

  return (
    <form onSubmit={handleSubmit}>

      
  <div style={{ position: "relative", width: "450px", marginBottom: "5px" }}>
    <label htmlFor="category">Agent</label>

    <select
      id="agent_id"
      name="agent_id"
      value={formData.agent_id}
      onChange={handleChange}
      className="form-input"
    >
      <option value="0">Select Agent</option>
      {Array.isArray(getAgent)  && getAgent.map((agent) => (
        <option key={agent.user_id} value={agent.user_id}>
          {agent.name}
        </option>
      ))}
    </select>

    {formErrors.agent_id && <p style={errorStyle}>{formErrors.agent_id}</p>}
  </div>

      <div style={{color:'green'}}>{responseMessage}</div>
      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          readOnly
        />
        {formErrors.username && <p style={errorStyle}>{formErrors.username}</p>}
      </div>

      <div style={{ position: "relative", width: "450px" }}>
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && <p style={errorStyle}>{formErrors.password}</p>}
      </div>

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
        Add Member
      </Button>
    </form>
  );
};

export default AddMemberForm;
