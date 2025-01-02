import React, { useState, useEffect } from 'react';
import axios from 'axios';

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


export default function ProductList() {

  const [dataList, setProductData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const fetchData = async () => {
  //   const url = 'http://localhost:3000/products/getProduct';
  //   setLoading(true);

  //   try {
  //     const response = await axios.get(url);
  //     console.log('response',response);return;
  //     setProductData(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setError(`Error: ${err.message}`);
  //     console.error('Error fetching data:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  
  const fetchData = async () => {
    const url = 'http://localhost:3000/products/getProduct';
    setLoading(true);

    try {
      //const response = await axios.get(url);

      const response = await axios.get(url);


      console.log('response',response);
      setProductData(response.data);
      setError(null);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };



  const handleClick = (product) => {
    navigate('/products/edit-product', { state: { product } });
  };


  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Category</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <TableRow key={index}>
                <TableCell align="left">{product.category}</TableCell>
                <TableCell align="center">{product.product_name}</TableCell>
                <TableCell align="center">{product.product_price}</TableCell>
                <TableCell align="center">{product.status}</TableCell>
                <TableCell align="right">
                   

                   <EditIcon onClick={()=>handleClick(product)} style={{ cursor: 'pointer' }} />

                   {/* <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                  */}
                </TableCell>
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
