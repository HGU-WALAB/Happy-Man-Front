import { Helmet } from 'react-helmet-async';
// sections
import OneView from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>상세 페이지</title>
      </Helmet>

      <OneView />
    </>
  );
}
