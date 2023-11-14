import React, { useState, useEffect } from 'react';
// components
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  IconButton,
  TablePagination,
  Stack,
  Divider, Chip
} from '@mui/material';

import {
  ContentCopy as ContentCopyIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';

import { useSettingsContext } from 'src/components/settings';
import Iconify from "../../components/iconify";
import CustomPopover, {usePopover} from "../../components/custom-popover";
import CreateForm from "./createForm";
import EventDeleteModal from './delete-modal';
import UpdateForm from "./update";
import {getAllEvents} from "../../api/event";





export default function EventManagerView() {
  const settings = useSettingsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const popover = usePopover();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedUserKey, setSelectedUserKey] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEvents();
        setOriginalUsers(data.list); // 원본 사용자 목록 저장
        setUsers(data.list);
        setEventsData(data.list); // 이벤트 데이터 상태도 업데이트
        console.log(data);

      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredUsers = originalUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [searchTerm, originalUsers]);



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

  useEffect(() => {
    setUsers(eventsData);
  }, [eventsData]);



  return (
    <>
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h3">
        <ManageAccountsIcon sx={{ fontSize: 30, verticalAlign: 'middle' }}/>
        이벤트 관리자 페이지
      </Typography>

      <Box sx={{ mt: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{margin: '10px 0px ', maxWidth:1300}}>
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
          <Stack direction="row">
            <CreateForm setEventsData={setEventsData} eventData={selectedUserData} />
          </Stack>
        </Stack>

        <TableContainer component={Paper} sx={{ maxHeight: 750 , minWidth: 300, maxWidth: 1300, margin: 'auto'}}>
          <Table>
            <TableHead>
              <TableRow>
                {['년도', '학기', '캠프명', '진행', '관리', '공개/미공개', ''].map((header) => (
                  <TableCell
                    align="center"
                    key={header}
                    sx={{
                      color: 'white',
                      backgroundColor: '#007867',
                    }}
                  >
                    {header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.year}</TableCell>
                    <TableCell align="center">{user.semester}</TableCell>
                    <TableCell component="th" scope="row" align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.professor}</TableCell>
                    <TableCell align="center">{user.institution.info.name}</TableCell>
                    <TableCell align="center">
                      {user.isOpen ? (
                        <Chip label="공개" color="success" />
                      ) : (
                        <Chip label="미공개" color="error" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(event) => { setSelectedUserKey(user.id); popover.onOpen(event); }}>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{minWidth: 300, maxWidth: 1300, margin: 'auto'}}
        />
      </Box>
    </Container>

  <CustomPopover
    open={popover.open}
    onClose={() => {
      popover.onClose();
      setSelectedUserData(null); // 팝오버가 닫힐 때 선택된 사용자 데이터 초기화
    }}
    arrow="right-top"
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

    <Divider sx={{ borderStyle: 'dashed' }} />

      <UpdateForm eventId={selectedUserKey} />

    <Divider sx={{ borderStyle: 'dashed' }} />

    {selectedUserKey && <EventDeleteModal id={selectedUserKey} />}

  </CustomPopover>
    </>
  );
}

