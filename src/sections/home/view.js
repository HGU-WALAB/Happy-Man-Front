import React from 'react';
import { alpha } from '@mui/material/styles';
import {
    Box,
    Container,
} from "@mui/material";


export default function OneView() {

    return (
        <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box
                sx={{
                    mt: 5,
                    width: 1,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                    maxWidth: '90%',
                }}
            >
                home 화면 입니다.
            </Box>
        </Container>
    );
}
