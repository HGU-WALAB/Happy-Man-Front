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
    } catch (error) {
      console.error(error);
    }

    alert('이벤트가 생성되었습니다.');
    window.location.reload();
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h2"> HAPPY CAMP </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", margin:"1% 1%" }}>
          {currentEventsData.map((event) => (
            <Card key={event.id} sx={{ width: "23%", margin: "1%" }} >
              <Settingbt id={event.id}/>
              <CardActionArea onClick={() => handleCardClick(event.id)}>
                  <CardMedia component="img" height="140" image={event.image} alt={event.name} />
                <CardContent>
                  <Stack direction="row" alignItems="center" >
                    <Typography gutterBottom variant="body2" color="primary" component="div">
                      {event.year} - {event.semester}
                    </Typography>
                    <Badge
                      color="success"
                      badgeContent={new Date() <= new Date(event.applicationDate) ?
                        <Typography variant="body2">신청 가능</Typography>
                        : null}
                      sx={{ zIndex: 1, position: 'absolute',top: '58.5%', right:'45%',width:'80px' }}
                    />
                  </Stack>
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
