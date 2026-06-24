import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';

function Layout() {
  return (
    <>
      <MainNavbar />
      <div className='content-block mt-4 mx-4'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
