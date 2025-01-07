import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment-timezone";

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
import { useDispatch, useSelector } from 'react-redux';

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

export default function AssignList() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const auth = useSelector((state) => state.auth);
  console.log('Memberlist ',auth.userInfo);

  const [dataList, setMembersData] = useState([]);

  //const [dataList, setProductData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const fetchData = async () => {
    const url = 'http://localhost:3000/users/getOverview';
    setLoading(true);

    try {
      //const response = await axios.get(url);


      const response = await axios.get(url, {
        params: {
          login_user : auth.userInfo.user_id,
          login_role : auth.userInfo.role_id,
        },
      });


      console.log('response',response);
      setMembersData(response.data);
      setError(null);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).tz("Asia/Kolkata").format("DD-MM-YYYY");
  };


  const handleClick = (user) => {
    //navigate('/products/edit-product', { state: { product } });
    navigate('/assign', { state: { user } });
  };


  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Agent Code</TableCell>
            <TableCell align="left">Member Code</TableCell>
            <TableCell align="left">Payment Date</TableCell>
            <TableCell align="left">Result Time</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Code</TableCell>
            <TableCell align="left">Number Of Product</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow key={index}>
                <TableCell align="left">{user.agent_code}</TableCell>
                <TableCell align="left">{user.member_code}</TableCell>
                <TableCell align="left">{formatDate(user.payment_date)}</TableCell>
                <TableCell align="left">{user.result_time}</TableCell>
                <TableCell align="left">{user.price}</TableCell>
                <TableCell align="left">{user.product_code}</TableCell>
                <TableCell align="left">{user.number_product}</TableCell>
                {/* <TableCell align="left"> 
                   <EditIcon onClick={()=>handleClick(product)} style={{ cursor: 'pointer' }} />
                   <Small bgcolor={bgPrimary} onClick={()=>handleClick(user)}>Assign Now</Small>
                   <IconButton><Icon color="error">close</Icon></IconButton>                 
                </TableCell> */}
              </TableRow>
            ))}
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
