import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import {Backdrop} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// api
import {getSingleEvent} from "../../api/event";



// eslint-disable-next-line react/prop-types
function EventDetailModal({ open, onClose, eventId }) {
  const [eventData, setEventData] = useState(null);

  // eventId가 변경될 때마다 데이터를 가져옵니다.
  useEffect(() => {
    async function fetchEvent() {
      try {
        const event = await getSingleEvent(eventId); // API 호출 함수
        setEventData(event);
        console.log(event);
      } catch (error) {
        console.error(error);
      }
    }

    if (eventId) fetchEvent();
  }, [eventId]);

  const handleClose = () => {
    setEventData(null); // Dialog를 닫을 때 데이터 초기화
    onClose();
  }

  if (!eventData) return null;

  return (
    <Dialog open={open}
            onClose={onClose}
            sx={{ maxWidth: '500px',margin: 'auto' }}
            BackdropComponent={Backdrop}
            BackdropProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 투명도 조절
              },
            }}
            >
      <DialogTitle sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button onClick={handleClose} color="primary" sx={{backgroundColor: 'black'}}>상세 페이지로 이동</Button>
      </DialogTitle>
      <DialogContent sx={{color: '#004B50',  minWidth: '450px'}}>
        <Box sx={{ position: 'relative' }}>
          <img src={eventData.info.image} style={{width: '100%', maxHeight:'200px' ,opacity: '0.1'}} alt="event"/>
          <Box sx={{ position: 'absolute', bottom: '10px', left: '10px' }}>
            <Typography variant="h5">
              {eventData.info.year} - {eventData.info.semester}
            </Typography>
            <Typography variant="h3">
              {eventData.info.name}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: '10px',marginBottom: '10px' }}>
          <Typography variant="h6">담당자</Typography>
          <Typography variant="body1">{eventData.info.manager} ( {eventData.info.institution.info.name} )</Typography>
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="h6">신청 마감일</Typography>
          <Typography variant="body1">{new Date(eventData.info.applicationDate).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="h6">참여 기간</Typography>
          <Typography variant="body1">{new Date(eventData.info.startDate).toLocaleDateString()} ~ {new Date(eventData.info.endDate).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="h6">기타 세부사항</Typography>
          <Typography variant="body1">{eventData.info.content}</Typography>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          신청하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDetailModal;
