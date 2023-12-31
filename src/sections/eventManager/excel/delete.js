import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControlLabel, Checkbox } from '@mui/material';
import { deleteParticipant } from '../../../api/parti';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DeleteModal = ({ ids }) => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCheckboxChange = (event) => setChecked(event.target.checked);

    const handleDelete = () => {
        if (checked) {
            deleteParticipant(ids)
                .then((response) => {
                    console.log('수료생 삭제 성공:', response);
                    handleClose();
                    window.location.reload();

                })
                .catch((error) => {
                  console.log(ids);
                    console.error('수료생 삭제 실패:', error);
                });
        }
    };

    return (
        <div>
            <Button variant="outlined" color="error" onClick={handleClickOpen}> 수료생 삭제</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>수료자 삭제</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        삭제 시 복구가 불가능하며 관련된 모든 정보(이름, 수료증 등)가 삭제됩니다.
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
    ids: PropTypes.array.isRequired,
};

export default DeleteModal;
