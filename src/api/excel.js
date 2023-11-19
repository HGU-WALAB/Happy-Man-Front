import axios from 'axios';
import { getSingleEvent } from './event';

const apiUrl = "http://localhost:8080/api/happyman/event";

// Download Excel
export const downloadExcel = async (id) => {
    // 먼저 이벤트 정보를 가져옵니다.
    const eventData = await getSingleEvent(id);

    const response = await axios.get(`${apiUrl}/excel/download/${id}`, {
        responseType: 'blob', // Blob 데이터로 응답을 받아야 합니다.
    });

    // Blob 데이터를 다운로드 가능한 URL로 변환
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // 파일 이름을 이벤트의 이름과 학기 정보를 이용하여 설정합니다.
    const fileName = `${eventData.info.year}_${eventData.info.semester}_${eventData.info.name}.xlsx`;

    // 가상의 링크를 생성하고 클릭하여 파일을 다운로드
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // 파일 이름 설정
    document.body.appendChild(link);
    link.click();
};


// Upload Excel
export const uploadExcel = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${apiUrl}/excel/upload/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
