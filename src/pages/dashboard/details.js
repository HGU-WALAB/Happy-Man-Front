import { Helmet } from 'react-helmet-async';
// sections
import EMView from 'src/sections/eventManager/singleEvent';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> 이벤트 상세 페이지 </title>
            </Helmet>

            <EMView />
        </>
    );
}
