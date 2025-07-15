import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableData from './TableData.json'
import axios from 'axios'
import { useState, useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, firstName, lastName, email) {
  return { id, firstName, lastName, email};
}

export default function DataTable() {
  const [recentUsers, setRecentUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchRecentUsers() {
  //     try {
  //       const response = await axios.get('http://localhost:3001/dashboard');
  //       setRecentUsers(response.data); // Assuming response.data is an array of recent users
  //       console.log("recent users are ", recentUsers)
  //     } catch (error) {
  //       console.error('Error fetching recent users:', error);
  //     }
  //   }

  //   fetchRecentUsers();
  // }, []);
  return (
    <TableContainer component={Paper} style={{width:"100%"}} >
      <Table className='table'  aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
            <StyledTableCell align="center">date</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">item</StyledTableCell>
            <StyledTableCell align="center">target</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TableData.map((row) => (
            <StyledTableRow key={row.id}>
              {/* <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell> */}
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.action}</StyledTableCell>
              <StyledTableCell align="center">{row.item}</StyledTableCell>
              <StyledTableCell align="center">{row.target}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}