import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControlLabel, MenuItem, Typography, Checkbox } from '@mui/material';
import { deleteEvent } from '../../api/event';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DeleteModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCheckboxChange = (event) => setChecked(event.target.checked);

  const handleDelete = () => {
    if (checked) {
      deleteEvent(id)
        .then((response) => {
          console.log('이벤트 삭제 성공:', response);
          handleClose();

        })
        .catch((error) => {
          console.error('이벤트 삭제 실패:', error);
        });
    }
    alert('이벤트가 삭제되었습니다.');
    window.location.reload();
  };

  return (
    <div>
      <MenuItem variant="outlined" onClick={handleClickOpen}>
        <Typography variant="inherit" color="error" sx={{ fontWeight: 'bold' }}>
          삭제하기
        </Typography>
      </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>이벤트 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            삭제 시 복구가 불가능하며 관련된 모든 정보(수료자, 참가자 등)가 삭제됩니다.
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            정말 삭제하시겠습니까?
          </DialogContentText>
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="동의하십니까?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleDelete} disabled={!checked}>삭제</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteModal.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DeleteModal;
