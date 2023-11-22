import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box
} from '@mui/material';
import {
    ContentCopy as ContentCopyIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { getAllInstitutions } from '../../api/institution';
import { createEvent, getSingleEvent } from "../../api/event";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


// eslint-disable-next-line react/prop-types
export default function CopyDialog({eventId}) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    year: '',
    semester: '',
    professor: '',
    image: '',
    applicationDate: '',
    startDate: '',
    endDate: '',
    certificateIssueDate: '',
    content: '',
    stamp: '',
    issuingName: '',
  });
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInstitutions();
        setInstitutions(data.list);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchEventData = async () => {
    if (!eventId) {
      console.error("Invalid eventId:", eventId);
      return;
    }
    try {
      const { info } = await getSingleEvent(eventId);

      // 필요한 프로퍼티만 추출
      const {
        name,
        professor,
        image,
        content,
        stamp,
        issuingName,
      } = info;

      // institution 프로퍼티 처리
      const institutionName = info.institution?.info?.name;

      setFormState({
        name,
        professor,
        image,
        content,
        stamp,
        issuingName,
      });
      setSelectedInstitution(institutionName);
    } catch (error) {
      console.error(error);
    }
  };


  const handleClickOpen = async () => {
    if (!open) {
      setOpen(true);
      await fetchEventData();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    let value;

    if (type === 'date') {
      value = new Date(event.target.value).toISOString().split('T')[0];
    } else {
      // eslint-disable-next-line prefer-destructuring
      value = event.target.value;
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isFormComplete = () => ['name', 'professor', 'startDate', 'endDate'].every((field) => formState[field]);

  const handleSelectChange = event => setSelectedInstitution(event.target.value);

  const getInstitutionIdByName = name => institutions.find((institution) => institution.name === name)?.id || '';

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedEvent = {
        ...formState,
        institutionId: getInstitutionIdByName(selectedInstitution)
      };

      console.log('Sending data to server:', updatedEvent);  // Add logging here

      await createEvent(eventId, updatedEvent);

      setFormState(prevState => ({
        name: '',
        year: '',
        semester: 'SPRING',
        professor: '',
        image: '',
        applicationDate: '',
        startDate: '',
        endDate: '',
        certificateIssueDate: '',
        content: '',
        stamp: '',
        issuingName: '',
      }));

      setSelectedInstitution('');
      handleClose();
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - 2018}, (_, i) => currentYear - i+1);


  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ContentCopyIcon/>
        복제하기
      </MenuItem>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon sx={{ color: 'white' }}/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h4" component="div">
              이벤트 복제하기
            </Typography>
          </Toolbar>
        </AppBar>


        <Box sx={{ mt: '50px',mx: 'auto', display: 'flex', flexDirection: ['column', 'row'], justifyContent: 'center',width: ['95%', '80%', '60%'] }}>
          <Box sx={{ flex: 1, mr: [0, '16px'], mb: ['16px', 0] }}>
            <Box sx={{ borderBottom: '2px solid #00A76F', width:'80%' }}>
              <Typography variant="h4">기본 정보</Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 3, backgroundColor:'white', borderRadius: '16px', border: '5px solid #00A76F'}}>
            <form onSubmit={handleSubmit}>
              <Box sx={{margin:'20px'}}>
                <Grid container direction="column" spacing={2}>
                  <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <FormControl sx={{ margin:'5px', width:'100px' }}>
                        <InputLabel>년도</InputLabel>
                        <Select name="year" value={formState.year} onChange={handleInputChange}>
                          {years.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl sx={{ margin:'5px', width:'120px' }}>
                        <InputLabel sx={{ color: '#00A76F' }}>학기</InputLabel>
                        <Select name="semester" value={formState.semester} onChange={handleInputChange}>
                          {['SPRING', 'SUMMER', 'FALL', 'WINTER'].map((semester) => (
                            <MenuItem key={semester} value={semester}>{semester}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField sx={{ width: '100%' }} label="이벤트 이름" value={formState.name} name="name" onChange={handleInputChange} />
                  </Grid>
                  <Grid item container>
                    <FormControl sx={{ flex: 1, marginRight:'5px'}}>
                      <InputLabel>담당 기관</InputLabel>
                      <Select value={selectedInstitution} onChange={handleSelectChange}>
                        {institutions.map((institution) => (
                          <MenuItem key={institution.id} value={institution.name}>
                            {institution.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField sx={{ flex: 1 }} label="교수님" value={formState.professor} name="professor" onChange={handleInputChange} />
                  </Grid>


                  <Grid item>
                    <TextField sx={{ width: '100%' }} label="캠프대표 이미지" value={formState.image} name="image" onChange={handleInputChange} />
                  </Grid>
                  <Grid item container>
                    <TextField
                      label='이벤트 시작일'
                      type='date'
                      value={formState.startDate}
                      name='startDate'
                      sx={{ flex: '1' }}
                      InputLabelProps={{shrink:true}}
                      inputProps={{
                        min: formState.applicationDate,
                      }}
                      onChange= {handleInputChange}
                    />
                    <TextField
                      label='이벤트 종료일'
                      type='date'
                      value={formState.endDate}
                      name='endDate'
                      sx={{ flex: '1' }}
                      InputLabelProps={{shrink:true}}
                      inputProps={{
                        min: formState.startDate,
                      }}
                      onChange= {handleInputChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="세부사항"
                      value={formState.content}
                      name="content"
                      multiline
                      rows={4}
                      sx={{ width: '100%' }}
                      variant="outlined"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="수료증 발급일"
                      value={formState.certificateIssueDate}
                      type="date"
                      name="certificateIssueDate"
                      sx={{ width: '100%' }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: formState.endDate,
                      }}
                      onChange= {handleInputChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="직인 이미지"
                      value={formState.stamp}
                      name="stamp"
                      sx={{ width: '100%' }}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="발급자명"
                      value={formState.issuingName}
                      name="issuingName"
                      sx={{ width: '100%' }}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item container justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary" disabled={!isFormComplete()}>
                      복제하기
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
