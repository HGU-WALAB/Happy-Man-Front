import { Helmet } from 'react-helmet-async';
// sections
import EMView from 'src/sections/eventManager/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> 이벤트 관리자 </title>
      </Helmet>

      <EMView />
    </>
  );
}
