// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
// components
import { useSettingsContext } from 'src/components/settings';
// api
import {getSingleEvent} from "../../api/event";


// ----------------------------------------------------------------------

export default function SingleEvent() {
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography variant="h4"> 이벤트 상세 페이지 </Typography>

            <Box
                sx={{
                    mt: 5,
                    width: 1,
                    height: 320,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                }}
            >
                <Stack>
                    이미지
                </Stack>


            </Box>
        </Container>
    );
}
