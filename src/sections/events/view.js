// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import {Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import Pagination from '@mui/material/Pagination';
// api
import React, { useState, useEffect } from 'react';
import { getAllEvents, createEvent } from "../../api/event";
import CreateButton from "./creat";
import EventDetailModal from './detail-modal';
import Settingbt from './setting';


// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();

  const [eventsData, setEventsData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; // 한 페이지당 카드 개수
  const [currentEventsData, setCurrentEventsData] = useState([]);

  // eventsData 업데이트
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllEvents();
        console.log(result);
        setEventsData(result.list);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // currentPage 업데이트
  useEffect(() => {
    setCurrentEventsData(eventsData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage));
  }, [eventsData, currentPage]);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEventId(null); // 선택된 이벤트 초기화
  };

  const handleCardClick = (id) => {
    setSelectedEventId(id);
    setModalOpen(true);
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      await createEvent(newEvent);
      const result = await getAllEvents();
      setEventsData(result.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 이벤트 </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <div style={{padding: "20px", margin: "10px",display:"flex",justifyContent: "flex-end"}}>
          <Button variant="outlined">이벤트 복사</Button>
          <CreateButton setEventsData={handleCreateEvent} />
        </div>
        <div>
          <h3>검색 필터</h3>
        </div>
        <h3>이벤트 카드</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", marginRight: '5%',marginLeft:'5%' }}>
          {currentEventsData.map((event) => (
            <Card key={event.id} sx={{ width: "300px", margin: "8px" }} >
              <Settingbt id={event.id}/>
              <CardActionArea onClick={() => handleCardClick(event.id)}>
                <Stack position="relative">
                  <CardMedia component="img" height="140" image={event.image} alt={event.name} />
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    color="success"
                    badgeContent={new Date() <= new Date(event.applicationDate) ?
                      <Typography variant="h6">신청 가능</Typography>
                      : null}
                    sx={{ zIndex: 1, position: 'absolute', top: 120, right: 50, width: '80px' }}
                  />
                </Stack>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    담당자 : {event.manager} {event.institution && event.institution.info ? `(${event.institution.info.name})` : ''}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    기간 : {new Date(event.startDate).toLocaleDateString()} ~
                    {new Date(event.endDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <EventDetailModal
                open={modalOpen}
                onClose={handleCloseModal}
                eventId={selectedEventId}
              />
              <CardActions>
                <Box display="flex" justifyContent="flex-end" width="100%" margin-right="1">
                  <Button size="small" color="primary" disabled={new Date() > new Date(event.applicationDate)}>
                    신청하기
                  </Button>
                </Box>
              </CardActions>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(eventsData.length / cardsPerPage)}
            color="primary"
            onChange={(event, page) => setCurrentPage(page)}
          />
        </div>
      </Box>

    </Container>
  );
}
