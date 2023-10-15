import { Helmet } from 'react-helmet-async';
// sections
import OneView from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>홈</title>
      </Helmet>

      <OneView />
    </>
  );
}
