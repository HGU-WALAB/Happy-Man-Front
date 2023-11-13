import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TextField, Select, MenuItem, FormControl, InputLabel, Grid} from '@mui/material';
import Box from "@mui/material/Box";

import { getAllInstitutions } from '../../api/institution';
import { createEvent } from "../../api/event";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const [formState, setFormState] = useState({
    name: '',
    year: new Date().getFullYear().toString(),
    semester: 'SPRING',
    professor: '',
    image: '',
    applicationDate: '',
    startDate: '',
    endDate: '',
    certificateIssueDate: '',
    content: ''
  });

  const [selectedInstitution, setSelectedInstitution] = useState('');

  const handleClickOpen = () => {
    if (!open) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    const dateValue = new Date(value).toISOString().split('T')[0];

    setFormState({
      ...formState,
      [name]: dateValue
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - 2018}, (_, i) => currentYear - i+1);

  const isFormComplete = () => {
    const requiredFields = ['name', 'manager', 'startDate', 'endDate'];
    return requiredFields.every((field) => formState[field] && (field !== 'selectedInstitution' || selectedInstitution));
  };

  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInstitutions();
        setInstitutions(data.list);
      } catch (error) {
        console.error(error);
        setInstitutions([]);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedInstitution(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const matchingInstitution = institutions.find((institution) => institution.name === selectedInstitution);

    if (!matchingInstitution) {
      console.error('No matching institution found');
      return;
    }

    try {
      const newEvent = {
        ...formState,
        institutionId: matchingInstitution.id
      };

      await createEvent(newEvent);

      setFormState({
        name: '',
        year: new Date().getFullYear().toString(),
        semester: 'SPRING',
        professor: '',
        image: '',
        applicationDate: '',
        startDate: '',
        endDate: '',
        certificateIssueDate: '',
        content: ''
      });

      setSelectedInstitution('');
      handleClose();

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        이벤트 추가
      </Button>
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
              이벤트 추가하기
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
                  <Grid item>
                    <FormControl sx={{ margin:'5px' }}>
                      <InputLabel>년도</InputLabel>
                      <Select name="year" value={formState.year} onChange={handleInputChange}>
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ margin:'5px' }}>
                      <InputLabel sx={{ color: '#00A76F' }}>학기</InputLabel>
                      <Select name="semester" value={formState.semester} onChange={handleInputChange}>
                        {['SPRING', 'SUMMER', 'FALL', 'WINTER'].map((semester) => (
                          <MenuItem key={semester} value={semester}>{semester}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField sx={{ width: '100%' }} label="이벤트 이름" name="name" onChange={handleInputChange} />
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


                    <TextField sx={{ flex: 1 }} label="담당자" name="professor" onChange={handleInputChange} />
                  </Grid>


                  <Grid item>
                    <TextField sx={{ width: '100%' }} label="이미지 주소" name="image" onChange={handleInputChange} />
                  </Grid>
                  <Grid item container>
                    <TextField
                      label='이벤트 시작일'
                      type='date'
                      name='startDate'
                      sx={{ flex: '1' }}
                      InputLabelProps={{shrink:true}}
                      inputProps={{
                        min: formState.applicationDate,
                      }}
                      onChange= {handleDateChange}
                    />
                    <TextField
                      label='이벤트 종료일'
                      type='date'
                      name='endDate'
                      sx={{ flex: '1' }}
                      InputLabelProps={{shrink:true}}
                      inputProps={{
                        min: formState.startDate,
                      }}
                      onChange= {handleDateChange}
                    />
                  </Grid>
                  <Grid item>

                    <TextField
                      label="수료증 발급일"
                      type="date"
                      name="certificateIssueDate"
                      sx={{ width: '100%' }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: formState.endDate,
                      }}
                      onChange= {handleDateChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="세부사항"
                      name="content"
                      multiline
                      rows={4}
                      sx={{ width: '100%' }}
                      defaultValue=""
                      variant="outlined"
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item container justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary" disabled={!isFormComplete()}>
                      제출하기
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
