import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function MainNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Forza Stats</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/manufacturers">
              Виробники
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cars">
              Автомобілі
            </Nav.Link>

            <Nav.Link as={NavLink} to="/tracks">
              Треки
            </Nav.Link>

            <Nav.Link as={NavLink} to="/results">
              Результати
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
