import { Helmet } from 'react-helmet-async';
// sections
import TwoView from 'src/sections/events/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> 이벤트 </title>
      </Helmet>

      <TwoView />
    </>
  );
}
