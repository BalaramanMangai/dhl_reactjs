import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import "../../../css/AddMember.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const EditProductForm = (props) => {

  console.log('props',props.product);
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState('');
  const [formData, setFormData] = useState({
    category: props.product.category,
    product_name: props.product.product_name,
    product_price: props.product.product_price,
    status: props.product.status,
    product_id: props.product.product_id
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


    const url = 'http://localhost:3000/products/updateProduct'; // Replace with your API endpoint
    const payload = {
      product_name: formData.product_name,
      product_price: formData.product_price,
      category: formData.category,
      status: formData.status,
      product_id: formData.product_id,
    };

    try {
      const response = await axios.post(url, payload);
      setResponseMessage(`Success: ${response.data.message}`);
      navigate('/products'); 
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
    }

  
    console.log('Form submitted successfully:', formData);
  };
  

  const validateForm = () => {
    const errors = {}; 

    if (!formData.category) {
      errors.category = 'category is required.';
    }
  
   if (!formData.product_name) {
      errors.product_name = 'Product name is required.';
    }
       if (!formData.product_price) {
      errors.product_price = 'Product price is required.';
    }

    if (!formData.status) {
      errors.status = 'Product price is required.';
    }
  
    return errors;
  };
  

  return (
    <form onSubmit={handleSubmit}>
  <div style={{ color: "green", marginBottom: "5px" }}>{responseMessage}</div>

  <div style={{ position: "relative", width: "450px", marginBottom: "5px" }}>
    <label htmlFor="category">Category</label>
    <select
      id="category"
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="form-input"
    >
      <option value="">Select a Category</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    {formErrors.category && <p style={errorStyle}>{formErrors.category}</p>}
  </div>

  <div style={{ position: "relative", width: "450px", marginBottom: "5px" }}>
    <label htmlFor="product_name">Product Name</label>
    <input
      id="product_name"
      type="text"
      name="product_name"
      placeholder="Product Name"
      value={formData.product_name}
      onChange={handleChange}
      className="form-input"
    />
    {formErrors.product_name && <p style={errorStyle}>{formErrors.product_name}</p>}
  </div>

  <div style={{ position: "relative", width: "450px", marginBottom: "5px" }}>
    <label htmlFor="product_price">Product Price</label>
    <input
      id="product_price"
      type="text"
      name="product_price"
      placeholder="Product Price"
      value={formData.product_price}
      onChange={handleChange}
      className="form-input"
    />
    {formErrors.product_price && <p style={errorStyle}>{formErrors.product_price}</p>}
  </div>

  <div style={{ position: "relative", width: "450px", marginBottom: "5px" }}>
  <label htmlFor="status">Status</label>
  <select
    id="status"
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="form-input"
  >
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Pending">Pending</option>
  </select>
  {formErrors.status && <p style={errorStyle}>{formErrors.status}</p>}
</div>


  <div>
    <Button type="submit" variant="contained" color="primary">
      Update Product
    </Button>
  </div>
</form>

  );
};

export default EditProductForm;
