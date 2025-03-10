import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import Edit from "@mui/icons-material/Edit";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../material-kit/style.css"; // Assuming your CSS is saved here
import { format } from "date-fns";


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
//import { addSales , clearSales } from '../../../../features/auth/saleSlice';
import { addSales , removeSales} from '../../../../features/auth/saleSlice';


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
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const bgError = palette.error.main;
    const bgPrimary = palette.primary.main;
    const bgSecondary = palette.secondary.main;
  
  const [responseMessage, setResponseMessage] = useState('');
  const [update_type, setType] = useState(0);

 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);



  const location = useLocation();
  // const { user } = location.state || {};

  // console.log('click user',user);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(new Date());
  const [AgentList, setMembersData] = useState([]);
  const [memberList, setApiResponse] = useState([]);
  const [memberdata, setMemberAllData] = useState([]);

  //const sales = useSelector((state) => state.sales);
 const [dataList, setSaleData] = useState([]);
  //console.log('sales',sales.sales);
  

  const [value, setValue] = useState(null);  
  const [valueMem, setValueMem] = useState(null);
  const initialFormState = {
    agent_id:0,
    user_id:0,
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
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
        const url = 'http://localhost:3000/users/saleProduct';
        const formattedDate = format(new Date(startDate.toISOString()), "yyyy-MM-dd");

        const payload = {
          agent_id: value.user_id,
          user_id: valueMem.user_id,
          payment_dte: formattedDate,
          result_time: formData.result_time,
          rupees_category: formData.rupees_category,
          product_code: formData.product_code,
          num_products: formData.num_products,
        };
        //dispatch(addSales(payload));       
    
        try {
          const response = await axios.post(url, payload);
          //setResponseMessage(`Success: ${response.data.message}`);
          navigate('/salesoverview'); 

        } catch (error) {
          setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
        }
        console.log('Form submitted successfully:', formData);
    
    
  };

  const submitRow = async (e) => {
    e.preventDefault();
   
        const url = 'http://localhost:3000/users/saleProduct';
        const formattedDate = format(new Date(startDate.toISOString()), "yyyy-MM-dd");       
          // Additional fields
          const additionalFields = {
            login_user : auth.userInfo.user_id,
            agent_id: value.user_id,
            user_id: valueMem.user_id,
            payment_date: formattedDate,
          };
        
          // Combine data with additional fields
          const payload = {
            rows,
            ...additionalFields,
          };

          console.log('payload',payload);

          //dispatch(addSales(rows));   
          //setSaleData(rows);
        
          try {
            const response = await axios.post("http://localhost:3000/users/saleProduct", payload);
            console.log("Response:", response.data);
            navigate('/salesoverview');
          } catch (error) {
            console.error("Error sending data:", error);
          }       


        //dispatch(addSales(payload));       
    
        // try {
        //   const response = await axios.post(url, payload);
        //   setResponseMessage(`Success: ${response.data.message}`);
        //   fetchData();
        // } catch (error) {
        //   setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
        // }
        // console.log('Form submitted successfully:', formData);
    
    
  };

  
  const deleteSale = async (product) => {console.log(product);
    // const url = 'http://localhost:3000/products/deleteSale';

    // try {
      
    //   try {
        
    //     const payload = {
    //       sale_id : sale_id,
    //     };

    //     const response = await axios.post(url, payload);
    //     setResponseMessage(`Success: ${response.data.message}`);
    //     fetchData();
    //   } catch (error) {
    //     setResponseMessage(`Error: ${error.response ? error.response.status : error.message}`);
    //   }

    // } catch (e) {
    //   console.error(e);
    // }

    //dispatch(removeSales({ id: sale_id })); 
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


 
  // const fetchData = async () => {
  //   const url = 'http://localhost:3000/products/saleList';
  //   setLoading(true);

  //   try {
      
  //     const response = await axios.get(url, {
  //       params: {
  //         user_id : user.user_id,
  //       },
  //     });

  //     console.log('response',response);
  //     setSaleData(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setError(`Error: ${err.message}`);
  //     console.error('Error fetching data:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getAgentList = async () => {
    const url = 'http://localhost:3000/users/getMembers';
    setLoading(true);

    try {
      const response = await axios.get(url, {
        params: {
          role_id: 2,
          user_id:auth.userInfo.user_id,
          login_role : auth.userInfo.role_id,
        },
      });
      console.log('response',response);
      const resPonseData = response.data;
      const Agent_List = resPonseData.map(item => ({
        user_id: item.user_id,
        username: item.username
      }));
    
      setMembersData(Agent_List);

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

  const handleUserChange = async (event, newValue) => {
    if (newValue) {
      setApiResponse([]);
      setValue(newValue);

      try {
        const url = 'http://localhost:3000/users/getMembers';
        const response = await axios.get(url, {
          params: {
            role_id: 1,
            user_id:newValue.user_id,
            login_role : 2,
          },
        });  
        
        //setMemberAllData(response.data);

        const Member_List = response.data.map(item => ({
          user_id: item.user_id,
          username: item.username
        }));

        
        setApiResponse(Member_List);
        if(Member_List.length==0){
          setApiResponse([]);
          setValue([]);
        }
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

 ///New code
 const [rows, setRows] = useState([
  { id: 1, result_time: "", rupees_category: "", product_code: "", num_products: "" },
]);

// Add a new row
const addRow = () => {
  setRows([
    ...rows,
    {
      id: rows.length + 1,
      result_time: "",
      rupees_category: "",
      product_code: "",
      num_products: "",
    },
  ]);
};

// Remove a row
const removeRow = (id) => {alert(id);
  setRows(rows.filter((row) => row.id !== id));
  console.log('rows',rows);
};

// Handle input change
const handleInputChange = (id, field, value) => {
  setRows(
    rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    )
  );
};
///End 

const handleMemberChange = async (event, newValue) => {console.log('>>>',memberList); 
    if (newValue) {
      
      setValueMem(newValue);   
    }
  };

  useEffect(() => {
   // fetchData();
    dispatch(removeSales([{}])); 
    getAgentList();
  }, []);



  return (

    
    <Box width="100%" overflow="auto">

<form onSubmit={handleSubmit}>
    <div style={{ color: "green", marginBottom: "10px" }}>{responseMessage}</div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px", // Vertical spacing between rows
        width: "350px", // Adjust width as needed
      }}
    >
      {/* First Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "flex-start", // Align content to the left
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>Agent Code</span>
        <Autocomplete
          options={AgentList}
          value={value}
          getOptionLabel={(option) => option.username}
          onChange={handleUserChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select agent"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "12px",
                  top: "-5px",
                },
              }}
            />
          )}
    
          sx={{
            "& .MuiAutocomplete-listbox": {
              maxHeight: "150px",
              fontSize: "12px",
            },
          }}
          style={{ flex: 1 }}
        />
      </div>

      {/* Second Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "flex-start", // Align content to the left
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>Mem Code</span>
        <Autocomplete
          options={memberList}
          value={valueMem}
          getOptionLabel={(option) => option.username}
          onChange={handleMemberChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select Member"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "12px",
                  top: "-5px",
                },
              }}
            />
          )}
          sx={{
            "& .MuiAutocomplete-listbox": {
              maxHeight: "150px",
              fontSize: "12px",
            },
          }}
          style={{ flex: 1 }}
        />
      </div>

   <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          justifyContent: "flex-start",
          width :"600px"
        }}
      >
        <span style={{ whiteSpace: "nowrap"}}>Date  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          class="custom-datepicker-container"
        />
      </div>
      
    </div>


    <div>
      <h3>Dynamic Rows Example</h3>
      <table cellPadding="10" border="0" width={"100%"} >
        <thead>
          <tr>
            <th>Time</th>
            <th>Price</th>
            <th>Product Purchase</th>
            <th>Number Ticket</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                {/* <input type="time" value={row.time} onChange={(e) =>handleInputChange(row.id, "time", e.target.value)}/> */}

                <select
                  id="result_time"
                  name="result_time"
                  value={row.result_time}
                  onChange={(e) =>handleInputChange(row.id, "result_time", e.target.value)}
                  className="form-input"
                 
                >
              <option value="">Time</option>
              <option value="1">1'o clock</option>
              <option value="6">6'o clock</option>
              <option value="8">8'o clock</option>
              <option value="3">3'o clock</option>
            </select>

              </td>
              <td>
                {/* <input type="number" placeholder="Price" value={row.price} onChange={(e) =>handleInputChange(row.id, "price", e.target.value)}/> */}
                  
                <select
                      id="rupees_category"
                      name="rupees_category"
                      value={row.rupees_category}
                      onChange={(e) =>handleInputChange(row.id, "rupees_category", e.target.value)}
                      className="form-input"
                   
                    >
                      <option value="">Rupees</option>
                      <option value="30">30 Rupees</option>
                      <option value="60">60 Rupees</option>
                      <option value="120">120 Rupees</option>
                    </select>
              
              </td>
              <td>
                {/* <input type="text" placeholder="Product Purchase" value={row.productPurchase} onChange={(e) =>handleInputChange(row.id, "productPurchase", e.target.value)}/> */}
                <input id="product_code" type="text" name="product_code" placeholder="Product Code" value={row.product_code} 
                onChange={(e) =>handleInputChange(row.id, "product_code", e.target.value)} className="form-input" />
              </td>
              <td>
                {/* <input type="number" placeholder="Number Ticket" value={row.numberTicket} onChange={(e) =>handleInputChange(row.id, "numberTicket", e.target.value)}/> */}
                <input id="num_products" type="text" name="num_products" placeholder="Ex. 1" value={row.num_products} onChange={(e) =>handleInputChange(row.id, "num_products", e.target.value)} className="form-input"
    />
    </td>
              <td>
              {(row.id!==1)?<Button type="submit" variant="contained" color="primary" onClick={() => removeRow(row.id)}>Remove</Button>:''}&nbsp;
                {(row.id==1)?<Button onClick={addRow} variant="contained" color="primary" >Add Row</Button>:''}&nbsp;
                {/* {(row.id==1)?<Button onClick={submitRow} variant="contained" color="primary" >Save</Button>:''}&nbsp; */}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      
    </div>

  
   <br /><br /><hr></hr>
  </form>

  <StyledTable>
  <TableHead>
    <TableRow>
      <TableCell align="left">S.No</TableCell>
      <TableCell align="left">RT</TableCell>
      <TableCell align="left">Price</TableCell>
      <TableCell align="left">Code</TableCell>
      <TableCell align="center">Number Ticket</TableCell>
      <TableCell align="center">Total</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((product, index) => {
        const calculatedTotal = product.rupees_category * product.num_products;
        return (
          <TableRow key={product.id || index}>
            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
            <TableCell align="left">{product.result_time}</TableCell>
            <TableCell align="left">₹{product.rupees_category}</TableCell>
            <TableCell align="left">{product.product_code}</TableCell>
            <TableCell align="center">{product.num_products}</TableCell>
            <TableCell align="center">₹{calculatedTotal}</TableCell>
            {/* Uncomment and validate if action buttons are needed */}
            {/* <TableCell align="center">
              <IconButton onClick={() => editProduct(product)} color="primary">
                <Edit />
              </IconButton> */}
              {/* Uncomment if removeRow logic is implemented */}
              {/* <IconButton onClick={() => removeRow(product.id)} color="error">
                <Icon>close</Icon>
              </IconButton> */}
            {/* </TableCell> */}
          </TableRow>
        );
      })}
    {/* Total Calculation Row */}
    <TableRow>
      <TableCell colSpan={4} align="right">
        <strong>Total</strong>
      </TableCell>
      <TableCell></TableCell>
      <TableCell align="center">
        <strong>
        ₹{rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .reduce(
              (sum, product) =>
                sum + product.rupees_category * product.num_products,
              0
            )}
        </strong>
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell colSpan={4} align="right"><Button variant="contained" color="primary" >Pay Online</Button></TableCell>
      <TableCell><Button variant="contained" color="primary" onClick={submitRow} >Pay Cash</Button></TableCell>
      <TableCell align="center"></TableCell>
    </TableRow>

  </TableBody>
</StyledTable>


      {/* <TablePagination
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
      /> */}
    </Box>
  );
}
