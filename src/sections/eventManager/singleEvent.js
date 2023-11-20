import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Button
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useSettingsContext } from 'src/components/settings';
import { getSingleEvent,updateIsOpen } from '../../api/event';
import { fetchCertificate } from '../../api/certificate';
import {downloadExcel} from "../../api/excel";
import DeleteParticipantModal from './excel/delete';
import UploadExcel from './excel/excelupload';

export default function SingleEventView() {
    const [eventData, setEventData] = useState(null);
    const settings = useSettingsContext();
    const [isOpen, setIsOpen] = useState(null);
    const [checkedList, setCheckedList] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const {eventId} = useParams();
    const [checkedIds, setCheckedIds] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const data = await getSingleEvent(eventId);  // Replace 'id' with actual event id
                setEventData(data.info);
                setIsOpen(data.info.isOpen);
                setCheckedList(new Array(data.info.participantList.list.length).fill(false));
            } catch (error) {
                console.error('Failed to fetch event data:', error);
            }
        };
        fetchEventData();
    }, [eventId]);

    const handleButtonClick = async (participantId) => {
        const url = await fetchCertificate(participantId);
        window.open(url, '_blank');
    };

    const handleToggle = async () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        await updateIsOpen(eventData.id, { isOpen: newIsOpen });
    };

    const handleCheckAllChange = (event) => {
        setIsAllChecked(event.target.checked);
        setCheckedList(new Array(eventData.participantList.list.length).fill(event.target.checked));
    };

    const handleCheckChange = (index, id) => (event) => {
        const newCheckedList = [...checkedList];
        newCheckedList[index] = event.target.checked;
        setCheckedList(newCheckedList);

        const newCheckedIds = [...checkedIds];
        if (event.target.checked) {
            newCheckedIds.push(id);
        } else {
            const idIndex = newCheckedIds.indexOf(id);
            if (idIndex > -1) {
                newCheckedIds.splice(idIndex, 1);
            }
        }
        setCheckedIds(newCheckedIds);

        if (newCheckedList.every((checked) => checked)) {
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false); // 삭제 모달을 닫는 함수를 추가해주세요.
    };

    const handleDeleteClick = () => {
        if (checkedIds.length > 0) {
            setDeleteModalOpen(true);
        }
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#007867',
                    minHeight: '300px',
                    borderRadius: '10px 10px 0 0',
                    position: 'relative',
                }}>

                    <Stack direction='row' margin='10px'>
                        <Box sx={{width: '50%', display: 'flex', justifyContent: 'end', alignItems: 'center', position: 'relative', marginRight:'20px'}}>
                            <img src={eventData?.image} alt={eventData?.id} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px'}} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', marginLeft:'20px'}}>

                            <Stack sx={{marginBottom:'20px'}}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Switch checked={isOpen} onChange={handleToggle} sx={{ transform: 'scale(1.5)' }} />
                                    <Typography variant="h5" color="white">{isOpen ? '공개' : '미공개'}</Typography>
                                </Box>
                                <Typography variant="h6" color="white"> {eventData?.year} - {eventData?.semester} </Typography>
                                <Typography variant="h2" color="white" width="300px"> {eventData?.name} </Typography>
                            </Stack>
                            <Typography variant="h5" sx={{marginBottom:'10px'}} color="white"> 진행:  {eventData?.professor} </Typography>
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
                            <ListItem>
                                <ListItemText primary={<Typography variant="h4" marginBottom="20px">3. 관리 및 문의</Typography>} secondary={<Typography variant="body1">{`${eventData?.institution?.info?.name} (054-260-1234)`}</Typography>} />
                            </ListItem>
                        </List>
                    </Stack>
                </Box>

                <Box sx={{margin: '40px 60px'}}>
                    <Typography variant="h3">
                        <BeenhereIcon sx={{marginRight: '4px'}}/>
                        수료증 정보
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h4" marginBottom="20px">1. 내용</Typography>}
                                secondary={<Typography variant="body1">위 학생은 전산전자공학부에서 진행한 &quot;{eventData?.name}&quot;에 참가하여 소정의 과정을 이수하였기에 이 증서를 수여합니다.</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h4" marginBottom="20px">2. 학부장</Typography>}
                                secondary={<Typography variant="body1"> 한동대학교 전산전자공학부 황성수</Typography>} />
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{margin: '40px 60px'}}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="h3" display="inline">
                                <SchoolIcon sx={{marginRight:'5px'}}/>수료자 명단
                            </Typography>
                            <Typography variant="h6" display="inline">(수료증 발급일 : {eventData?.certificateIssueDate})</Typography>
                        </Box>
                        <Box>
                            <UploadExcel id={eventData.id}/>
                            <DeleteParticipantModal open={deleteModalOpen} onClose={handleCloseDeleteModal} ids={checkedIds} />
                        </Box>
                    </Box>
                    <TableContainer component={Paper} sx={{width:'98%', margin:'10px'}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell padding="checkbox" style={{backgroundColor: '#007867', color: 'white'}}>
                                        <Checkbox checked={isAllChecked} onChange={handleCheckAllChange} style={{color:'white'}}/>
                                    </TableCell>
                                    <TableCell align="center" style={{backgroundColor: '#007867', color: 'white'}}>이름</TableCell>
                                    <TableCell align="center" style={{backgroundColor: '#007867', color: 'white'}}>학번</TableCell>
                                    <TableCell align="center" style={{backgroundColor: '#007867', color: 'white'}}>학부</TableCell>
                                    <TableCell align="center" style={{backgroundColor: '#007867', color: 'white'}}>수료증 호수</TableCell>
                                    <TableCell align="center" style={{backgroundColor: '#007867', color: 'white'}}>수료증</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventData?.participantList?.list?.map((participant,index) => (
                                    <TableRow key={participant.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={checkedList[index]} onChange={handleCheckChange(index,participant.id)} />
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {participant.user.info.name}
                                        </TableCell>
                                        <TableCell align="center">{participant.user.info.studentId}</TableCell>
                                        <TableCell align="center">{participant.user.info.department}</TableCell>
                                        <TableCell align="center">제 2023-1호</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleButtonClick(participant.id)}>수료증 미리보기 <DownloadForOfflineOutlinedIcon/></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => downloadExcel(eventData.id)}>
                            <SimCardDownloadIcon/> 명단 다운로드
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
