import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Button, Checkbox, ListItem, Stack} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from '@mui/icons-material/School';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useSettingsContext } from 'src/components/settings';
import { getSingleEvent } from '../../api/event';
import { fetchCertificate } from '../../api/certificate';



export default function OneView() {
    const [eventData, setEventData] = useState(null);
    const settings = useSettingsContext();
    const [certificateUrl, setCertificateUrl] = useState(null);


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const data = await getSingleEvent('2');  // Replace 'id' with actual event id
                setEventData(data.info);
                console.log(data.info);
            } catch (error) {
                console.error('Failed to fetch event data:', error);
            }
        };
        fetchEventData();
    }, []);

    const handleButtonClick = async (participantId) => {
        const url = await fetchCertificate(participantId);
        setCertificateUrl(url);
        console.log("성공");
    };


    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box
                sx={{
                    mt: 5,
                    width: 1,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                    maxWidth: '90%',
                }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                bgcolor: '#004B50',
                minHeight: '300px',
                borderRadius: '10px 10px 0 0', // 상단 모서리 둥글게
              }}>
                <Stack direction='row' margin='10px'>
                  <Box sx={{width: '50%', height: 'auto',  display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                    <img src={eventData?.image} alt={eventData?.id} style={{maxWidth: '80%', height: 'auto', borderRadius: '10px'}} />
                  </Box>

                  <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', margin: 'auto'}}>
                    <Stack sx={{marginBottom:'20px'}}>
                      <Typography variant="h6" color="white"> {eventData?.year} - {eventData?.semester} </Typography>
                      <Typography variant="h2" color="white"> {eventData?.name} </Typography>
                    </Stack>
                    <Typography variant="h5" sx={{marginBottom:'10px'}} color="white"> 진행:  {eventData?.manager} </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{margin: '40px 60px'}}>
                <Typography variant="h3">
                  <BeenhereIcon sx={{marginRight: '4px'}}/>
                  강좌 정보
                </Typography>
                <Stack direction='row'>
                  <List sx={{width:'60%'}}>
                    <ListItem>
                      <ListItemText primary={<Typography variant="h4" marginBottom="20px">1. 기간</Typography>} secondary={<Typography variant="body1">{`${eventData?.startDate  } - ${  eventData?.endDate}`}</Typography>} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={<Typography variant="h4" marginBottom="20px">2. 기타 안내사항</Typography>} secondary={<Typography variant="body1" dangerouslySetInnerHTML={{ __html: eventData?.content.replace(/\n/g, '<br/>')}} />} />
                    </ListItem>
                  </List>
                  <TableContainer component={Paper} sx={{margin: '20px 0px', width:'35%'}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={{backgroundColor: '#004B50', color: 'white'}}>
                            <Typography variant="h4">관리 및 문의</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">
                            <Typography variant="h6">{eventData?.institution?.info?.name}</Typography>
                            <br />
                            <Typography variant="h6">054-260-1234</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Box>

              <Box sx={{margin: '40px 60px'}}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h3" display="inline">
                      <SchoolIcon sx={{marginRight:'5px'}}/>수료자 명단
                    </Typography>
                    <Typography variant="h6" display="inline">({eventData?.certificateIssueDate})</Typography>
                  </Box>
                  <Box>
                    <Button variant="outlined" color="primary" sx={{marginRight: '5px'}}> 수료생 등록</Button>
                    <Button variant="outlined" color="error"> 수료생 삭제</Button>
                  </Box>
                </Box>
                <TableContainer component={Paper} sx={{width:'98%', margin:'10px'}}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow >
                        <TableCell padding="checkbox" style={{backgroundColor: '#004B50', color: 'white'}}>
                          <Checkbox />
                        </TableCell>
                        <TableCell align="center" style={{backgroundColor: '#004B50', color: 'white'}}>이름</TableCell>
                        <TableCell align="center" style={{backgroundColor: '#004B50', color: 'white'}}>학번</TableCell>
                        <TableCell align="center" style={{backgroundColor: '#004B50', color: 'white'}}>학부</TableCell>
                        <TableCell align="center" style={{backgroundColor: '#004B50', color: 'white'}}>수료증 호수</TableCell>
                        <TableCell align="center" style={{backgroundColor: '#004B50', color: 'white'}}>수료증</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventData?.participantList?.list?.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {participant.user.info.name}
                          </TableCell>
                          <TableCell align="center">{participant.user.info.studentId}</TableCell>
                          <TableCell align="center">{participant.user.info.department}</TableCell>
                          <TableCell align="center">제 2023-1호</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => handleButtonClick(participant.id)}>인증서 가져오기 <DownloadForOfflineOutlinedIcon/></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" color="primary"> <SimCardDownloadIcon/> 명단 다운로드 </Button>
                </Box>
              </Box>
            </Box>
        </Container>
    );
}
