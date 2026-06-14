import Container from 'react-bootstrap/Container';
import MainNavbar from './MainNavbar';

function Layout({ children }) {
  return (
    <>
      <MainNavbar />

      <Container className="mt-4">{children}</Container>
    </>
  );
}

export default Layout;
