import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import {uploadExcel} from "../../../api/excel";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const UploadModal = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            uploadExcel(id,selectedFile)
                .then((response) => {
                    console.log('파일 업로드 성공:', response);
                    handleClose();
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('파일 업로드 실패:', error);
                });
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}> 수료생 등록</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>파일 업로드</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        수료생 정보가 담긴 파일을 선택하세요.
                    </DialogContentText>
                    <input type="file" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleUpload} disabled={!selectedFile}>업로드</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

UploadModal.propTypes = {
    id: PropTypes.string.isRequired,
};
export default UploadModal;
