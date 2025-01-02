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

import { useDispatch, useSelector } from 'react-redux';
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


export default function PaginationTable() {

  const [dataList, setMembersData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  console.log('Memberlist ',auth.userInfo);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    const url = 'http://localhost:3000/users/getMembers';
    setLoading(true);

    try {
      //const response = await axios.get(url);

      const response = await axios.get(url, {
        params: {
          role_id: 1,
          user_id:auth.userInfo.user_id,
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


  const handleClick = (user) => {
    navigate('/members/edit-member', { state: { user } });
  };


  useEffect(() => {
    fetchData();
  }, []);



  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">District</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow key={index}>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.mobile}</TableCell>
                <TableCell align="center">{user.district}</TableCell>
                <TableCell align="center">{user.city}</TableCell>
                <TableCell align="right">
                   

                   <EditIcon onClick={()=>handleClick(user)} style={{ cursor: 'pointer' }} />

                   {/* <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton> */}
                 
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
