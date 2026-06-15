import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';

function Layout() {
  return (
    <>
      <MainNavbar />

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
