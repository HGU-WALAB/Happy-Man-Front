import { Helmet } from 'react-helmet-async';
// sections
import ThreeView from 'src/sections/three/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> 기관</title>
      </Helmet>

      <ThreeView />
    </>
  );
}
