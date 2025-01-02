import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
// GLOBAL CUSTOM COMPONENTS
import MatxLogo from "app/components/MatxLogo";
import MatxDivider from "app/components/MatxDivider";
import { Paragraph, Span } from "app/components/Typography";
// GLOBAL CUSTOM HOOKS
import useAuth from "app/hooks/useAuth";

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, loginSuccess, loginFailure } from '../../../features/auth/authSlice';


// STYLED COMPONENTS
const GoogleButton = styled(Button)(({ theme }) => ({
  color: "rgba(0, 0, 0, 0.87)",
  boxShadow: theme.shadows[0],
  backgroundColor: "#e0e0e0",
  "&:hover": { backgroundColor: "#d5d5d5" }
}));

const Logo = styled("div")({
  gap: 10,
  display: "flex",
  alignItems: "center",
  "& span": { fontSize: 26, lineHeight: 1.3, fontWeight: 800 }
});

const FirebaseRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": { maxWidth: 800, margin: "1rem" },
  "& .cardLeft": {
    color: "#fff",
    height: "100%",
    display: "flex",
    padding: "32px 56px",
    flexDirection: "column",
    backgroundSize: "cover",
    background: "#161c37 url(/assets/images/bg-3.png) no-repeat",
    [theme.breakpoints.down("sm")]: { minWidth: 200 },
    "& img": { width: 32, height: 32 }
  },
  "& .mainTitle": {
    fontSize: 18,
    lineHeight: 1.3,
    marginBottom: 24
  },
  "& .item": {
    position: "relative",
    marginBottom: 12,
    paddingLeft: 16,
    "&::after": {
      top: 8,
      left: 0,
      width: 4,
      height: 4,
      content: '""',
      borderRadius: 4,
      position: "absolute",
      backgroundColor: theme.palette.error.main
    }
  }
}));

// initial login credentials
const initialValues = {
  email: "admin@admin.com",
  password: "dummyPass",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function Login() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);


  // const theme = useTheme();
  // const navigate = useNavigate();
  // const { state } = useLocation();
  // const { enqueueSnackbar } = useSnackbar();
  // const { signInWithEmail, signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });
  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '-0.75rem',
    // marginLeft: '0.75rem',
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


    const url = 'http://localhost:3000/users/login';
    const payloaddata = {
      password: formData.password,
      username: formData.username
    };
    
    try {
        const response = await axios.post(url, payloaddata);

        console.log('response',response);

        if(response.data.success){
          //dispatch(setCredentials({ username, password }));
          dispatch(loginSuccess(response.data.data));
          //localStorage.setItem('user', JSON.stringify(response.data.data));
          navigate('/dashboard/default'); 
        }
        // if(!response.success){
        //   alert("Invalid username and Password");
        //   localStorage.clear();
        // }
        // const storedUser = JSON.parse(localStorage.getItem('user'));
        // console.log(storedUser); // { name: 'John', age: 30 }
        console.log('Response:', response.data.success);
    } catch (error) {

      console.log('error.response',error.response.data.success);

      if(!error.response.data.success){
                 dispatch(loginFailure(error.response.data));
                 //dispatch(loginFailure(loginResult.message));

          alert("Invalid username and Password");
          //localStorage.clear();
        }

        console.error('Error:', error.response ? error.response.data : error.message);
    }
    

  
     console.log('sasas:', formData);
  };
  

  const validateForm = () => {
    const errors = {}; 

    if (!formData.username) {
      errors.username = 'Username is required.';
    }
  
   if (!formData.password) {
      errors.password = 'Password is required.';
    }
  
    return errors;
  };
  

  return (
    <FirebaseRoot>
      <Card className="card">
        <Grid item xs={8} style={{ textAlign: 'center' , marginPadding: "10px" }}>
    <h2>Admin</h2>
   </Grid>
      <Grid container justifyContent="center" alignItems="center">
 
  <Grid item md={4} xs={8}>
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative", width: "350px", marginBottom: "3px" }}>
          <TextField
            fullWidth
            size="small"
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            sx={{ mb: 3, width: '340px' }} 
          />
          {formErrors.username && <p style={errorStyle}>{formErrors.username}</p>}
        </div>

        <div style={{ position: "relative", width: "350px", marginBottom: "3px" }}>
          <TextField
            fullWidth
            size="small"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3, width: '340px' }} 
          />
          {formErrors.password && <p style={errorStyle}>{formErrors.password}</p>}
        </div>

        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          sx={{ my: 2 }}>
          Login
        </LoadingButton>
      </form>
    </Box>
  </Grid>
</Grid>

      </Card>
    </FirebaseRoot>
  );
}
