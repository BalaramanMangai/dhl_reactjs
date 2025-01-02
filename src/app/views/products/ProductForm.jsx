import React, { useState , useRef} from 'react';
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import "../../../css/AddMember.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";



const AddProductForm = () => {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState('');
  const productCodeRef = useRef(null); // Create a ref for the product code input
  const auth = useSelector((state) => state.auth);
  console.log('Assign',auth.userInfo);

  const location = useLocation();
  const { user } = location.state || {}; // Destructure user from state



  const [formData, setFormData] = useState({
    category: '',
    product_name: '',
    product_price: '',
    status: ''
  });

  const [formErrors, setFormErrors] = useState({
    category: '',
    product_name: '',
    product_price: '',
    status: ''
  });
  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '-0.75rem',
    marginRight: '0.50rem',
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


    const url = 'http://localhost:3000/users/saleProduct';
    const payload = {
      agent_id: (auth.userInfo.user_id)?auth.userInfo.user_id:0,
      user_id:(user.user_id)?user.user_id:0,
      result_time: formData.result_time,
      rupees_category: formData.rupees_category,
      product_code: formData.product_code,
      num_products: formData.num_products
    };

    try {
      const response = await axios.post(url, payload);
      setResponseMessage(`Success: ${response.data.message}`);
      navigate('/assign'); 
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
    }

  
    console.log('Form submitted successfully:', formData);
  };
  

  const validateForm = () => {
    const errors = {}; 

    if (!formData.result_time) {
      errors.result_time = 'Result time is required.';
    }

    
  
   if (!formData.rupees_category) {
      errors.rupees_category = 'Rupees category is required.';
    }
    

    if (!formData.product_code) {
      errors.product_code = "Product Code is required.";
    } else if (["1", "6", "8"].includes(formData.result_time)) {
      if (!/^\d{3}$/.test(formData.product_code)) {
        errors.product_code = "Product Code must be exactly 3 digits.";
      }
    } else if (formData.result_time === "3") {
      if (!/^\d{4}$/.test(formData.product_code)) {
        errors.product_code = "Product Code must be exactly 4 digits.";
      }
    } else if (formData.rupees_category === "120" && formData.result_time!=3) {
      if (!/^\d{4}$/.test(formData.product_code)) {
        errors.product_code = "Product Code must be exactly 4 digits for Rupees Category 120.";
      }
    }else if (!/^\d+$/.test(formData.product_code)) {
      errors.product_code = "Product Code must contain only numbers.";
    }
    else {
      errors.result_time = "Select a valid Result Time.";
    }

    if (!formData.num_products) {
      errors.num_products = 'No of product is required.';
    }
  
    return errors;
  };
  

  return (
    <form onSubmit={handleSubmit}>
    <div style={{ color: "green", marginBottom: "10px" }}>{responseMessage}</div>
  
    {/* Form Container */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", maxWidth: "900px" }}>
      
      {/* Result Time */}
      <div style={{ flex: "1 1 45%", marginBottom: "10px" }}>
        <label htmlFor="result_time" style={{ display: "block", marginBottom: "5px" }}>
          Result Time
        </label>
        <select
          id="result_time"
          name="result_time"
          value={formData.result_time}
          onChange={handleChange}
          className="form-input"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="">Time</option>
          <option value="1">1'o clock</option>
          <option value="6">6'o clock</option>
          <option value="8">8'o clock</option>
          <option value="3">3'o clock</option>
        </select>
        {formErrors.result_time && <p style={errorStyle}>{formErrors.result_time}</p>}
      </div>
  
      {/* Rupees Category */}
      <div style={{ flex: "1 1 45%", marginBottom: "10px" }}>
        <label htmlFor="rupees_category" style={{ display: "block", marginBottom: "5px" }}>
          Rupees Category
        </label>
        <select
          id="rupees_category"
          name="rupees_category"
          value={formData.rupees_category}
          onChange={handleChange}
          className="form-input"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="">Rupees</option>
          <option value="30">30 Rupees</option>
          <option value="60">60 Rupees</option>
          <option value="120">120 Rupees</option>
        </select>
        {formErrors.rupees_category && <p style={errorStyle}>{formErrors.rupees_category}</p>}
      </div>
  
      {/* Product Code */}
      <div style={{ flex: "1 1 45%", marginBottom: "10px" }}>
        <label htmlFor="product_code" style={{ display: "block", marginBottom: "5px" }}>
          Product Code
        </label>
        <input
          id="product_code"
          type="text"
          name="product_code"
          placeholder="Product Code"
          value={formData.product_code}
          onChange={handleChange}
          className="form-input"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        {formErrors.product_code && <p style={errorStyle}>{formErrors.product_code}</p>}
      </div>
  
      {/* No. of Products */}
      <div style={{ flex: "1 1 45%", marginBottom: "10px" }}>
        <label htmlFor="num_products" style={{ display: "block", marginBottom: "5px" }}>
          No.of Products
        </label>
        <input
          id="num_products"
          type="text"
          name="num_products"
          placeholder="Ex. 1"
          value={formData.num_products}
          onChange={handleChange}
          className="form-input"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        {formErrors.num_products && <p style={errorStyle}>{formErrors.num_products}</p>}
      </div>
    </div>
  
    {/* Submit Button */}
    <div style={{ marginTop: "20px" }}>
      <Button type="submit" variant="contained" color="primary">
        Assign Now
      </Button>
    </div>
  </form>
  

  );
};

export default AddProductForm;
