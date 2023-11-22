import axiosInstance from "../utils/axios";

const apiUrl = "http://localhost:8080/api/happyman/admin";

export const fetchCertificate = async (participantIds) => {
    const response = await axiosInstance.get(`${apiUrl}/certificate`, {
        params: {
            participantIds, // 참가자 ID를 배열로 전달합니다. 실제 값을 채워주세요.
        },
        responseType: 'blob', // PDF 파일을 받기 위해 responseType을 'blob'으로 설정합니다.
    });

    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

    return URL.createObjectURL(pdfBlob);
};
