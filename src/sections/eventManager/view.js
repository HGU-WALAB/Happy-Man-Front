import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {TextField, Button, MenuItem} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useSettingsContext } from 'src/components/settings';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TablePagination from '@mui/material/TablePagination';
import Iconify from "../../components/iconify";
import CustomPopover, {usePopover} from "../../components/custom-popover";



const usersData = [
  { id: 1, name: 'PPS Camp', year: '2023', semester: 'WINTER', manager: '김광 교수님', institution_id: '소중대', status: 'active' },
  { id: 2, name: 'AI Workshop', year: '2023', semester: 'SPRING', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 3, name: 'Data Science Seminar', year: '2023', semester: 'SUMMER', manager: '조성배 교수님', institution_id: '소중대', status: 'active' },
  { id: 4, name: 'Deep Learning Course', year: '2023', semester: 'FALL', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
  { id: 5, name: 'Machine Learning Workshop', year: '2023', semester: 'WINTER', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 6, name: 'AI Conference', year: '2023', semester: 'SPRING', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
  { id: 7, name: 'Data Analysis Seminar', year: '2023', semester: 'SUMMER', manager: '조성배 교수님', institution_id: '소중대', status: 'active' },
  { id: 8, name: 'Python Programming Workshop', year: '2023', semester: 'FALL', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 9, name: 'AI Symposium', year: '2023', semester: 'WINTER', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
  { id: 10, name: 'Deep Learning Seminar', year: '2023', semester: 'SPRING', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 11, name: 'Data Science Course', year: '2023', semester: 'SUMMER', manager: '조성배 교수님', institution_id: '소중대', status: 'active' },
  { id: 12, name: 'Machine Learning Seminar', year: '2023', semester: 'FALL', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
  { id: 13, name: 'Python Programming Course', year: '2023', semester: 'WINTER', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 14, name: 'AI Workshop', year: '2023', semester: 'SPRING', manager: '조성배 교수님', institution_id: '소중대', status: 'active' },
  { id: 15, name: 'Data Analysis Workshop', year: '2023', semester: 'SUMMER', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
  { id: 16, name: 'Python Programming Seminar', year: '2023', semester: 'FALL', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 17, name: 'Data Science Workshop', year: '2023', semester: 'WINTER', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
  { id: 18, name: 'Machine Learning Course', year: '2023', semester: 'SPRING', manager: '조성배 교수님', institution_id: '소중대', status: 'active' },
  { id: 19, name: 'Python Programming Course', year: '2023', semester: 'SUMMER', manager: '장소연 교수님', institution_id: '소중대', status: 'active' },
  { id: 20, name: 'AI Seminar', year: '2023', semester: 'FALL', manager: '안민규 교수님', institution_id: '소중대', status: 'active' },
];

export default function EventManagerView() {
  const settings = useSettingsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(usersData);
  const popover = usePopover();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    setUsers(
      searchTerm
        ? usersData.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : usersData
    );
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  return (
    <>
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 이벤트 관리자 페이지 </Typography>

      <Box sx={{ mt: 5 }}>
        <TextField
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 300, maxWidth: 1300, margin: 'auto', marginTop: '10px' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {['년도', '학기', 'Name', '진행', '관리', '상태', '추가버튼'].map((header) => (
                  <TableCell align="center" key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center">{user.year}</TableCell>
                  <TableCell align="center">{user.semester}</TableCell>
                  <TableCell component="th" scope="row">{user.name}</TableCell>
                  <TableCell align="center">{user.manager}</TableCell>
                  <TableCell align="center">{user.institution_id}</TableCell>
                  <TableCell align="center">{user.status}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={popover.onOpen}>
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Container>

  <CustomPopover
    open={popover.open}
    onClose={popover.onClose}
    arrow="left-top"
    sx={{ width: 120 }}
  >
    <MenuItem
      onClick={() => {
        popover.onClose();
      }}
    >
      <ContentCopyIcon/>
      복제하기
    </MenuItem>

    <MenuItem
      onClick={() => {
        popover.onClose();
      }}
    >
      <EditIcon/>
      수정하기
    </MenuItem>

    <MenuItem
      onClick={() => {
        popover.onClose();
      }}
    >
      <DeleteForeverRoundedIcon/>
      삭제하기
    </MenuItem>
  </CustomPopover>
    </>
  );
}

