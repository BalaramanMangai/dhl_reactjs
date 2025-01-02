import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import Edit from "@mui/icons-material/Edit";

import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {  useTheme } from "@mui/material/styles";


// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));
const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function ProductList() {

    const { palette } = useTheme();
    const bgError = palette.error.main;
    const bgPrimary = palette.primary.main;
    const bgSecondary = palette.secondary.main;
  
  const [responseMessage, setResponseMessage] = useState('');
  const [update_type, setType] = useState(0);

  const [dataList, setSaleData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  console.log('Assign',auth.userInfo);


  const location = useLocation();
  const { user } = location.state || {};

  console.log('click user',user);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const initialFormState = {
    result_time: '',
    rupees_category: '',
    product_code: '',
    num_products: '',
    sale_id: 0
  };  
  const [formData, setFormData] = useState(initialFormState);

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

    console.log('formData',formData);

   
        const url = 'http://localhost:3000/users/saleProduct';
        const payload = {
          agent_id: (auth.userInfo.user_id)?auth.userInfo.user_id:0,
          user_id:(user.user_id)?user.user_id:0,
          result_time: formData.result_time,
          rupees_category: formData.rupees_category,
          product_code: formData.product_code,
          num_products: formData.num_products,
          sale_id: formData.sale_id,
        };
    
        try {
          const response = await axios.post(url, payload);
          setResponseMessage(`Success: ${response.data.message}`);
          fetchData();
        } catch (error) {
          setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
        }
        console.log('Form submitted successfully:', formData);
    



    

  
    
  };


  
  const deleteSale = async (sale_id) => {
    const url = 'http://localhost:3000/products/deleteSale';

    try {
      
      try {
        
        const payload = {
          sale_id : sale_id,
        };

        const response = await axios.post(url, payload);
        setResponseMessage(`Success: ${response.data.message}`);
        fetchData();
      } catch (error) {
        setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
      }

    } catch (e) {
      console.error(e);
    }
  };
  
  const editProduct = async (product) => {


    console.log('product',product);

    setFormData(prevFormData => ({
      ...prevFormData,
      result_time: product.result_time,
      rupees_category: product.rupees_category,
      product_code: product.product_code,
      num_products: product.no_of_product,
      sale_id: product.sale_id,
  }));



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

    if (!formData.num_products) {
      errors.num_products = 'No of product is required.';
    }
  
    return errors;
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 
  const fetchData = async () => {
    const url = 'http://localhost:3000/products/saleList';
    setLoading(true);

    try {
      
      const response = await axios.get(url, {
        params: {
          user_id : user.user_id,
        },
      });

      console.log('response',response);
      setSaleData(response.data);
      setError(null);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };



const handleClear = () => {
    setFormData(initialFormState); // Reset form to initial state
  };


  useEffect(() => {
    fetchData();
  }, []);



  return (

    
    <Box width="100%" overflow="auto">

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
        Add
      </Button>
      &nbsp;
      <Button type="submit" variant="contained" color="primary" onClick={handleClear}>
        Clear
      </Button>
    </div><br /><br /><hr></hr>
  </form>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Result Time</TableCell>
            <TableCell align="left">Rupees Category</TableCell>
            <TableCell align="left">Product Code</TableCell>
            <TableCell align="left">No.Product</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <TableRow key={index}>
                <TableCell align="left">{product.result_time}</TableCell>
                <TableCell align="left">{product.rupees_category}</TableCell>
                <TableCell align="left">{product.product_code}</TableCell>
                <TableCell align="left">{product.no_of_product}</TableCell>
                <TableCell align="center"><Small bgcolor={bgSecondary}>Pay</Small></TableCell> 
                
                <TableCell align="center">
                  <IconButton><Edit onClick={() => editProduct(product)} color="primary" /></IconButton>
                  <IconButton>
                    <Icon onClick={() => deleteSale(product.sale_id)} color="error">close</Icon>
                  </IconButton>
                </TableCell> 
                
              </TableRow>
            ))}
            {(dataList.length==0)?<TableRow><TableCell></TableCell><TableCell></TableCell><TableCell align="center">No Data Found</TableCell><TableCell></TableCell><TableCell></TableCell></TableRow>:''}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={dataList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}
