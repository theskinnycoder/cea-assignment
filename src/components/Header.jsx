import { ClipboardListIcon, DocumentAddIcon } from "@heroicons/react/solid"
import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Header = () => {
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
        fixed="top"
        className="shadow-lg"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Blogster</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link className="d-flex justify-content-center align-items-center">
                  <span>All Posts</span>
                  <ClipboardListIcon height="20" width="20" />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/add">
                <Nav.Link className="d-flex justify-content-center align-items-center">
                  <span>Add New Post</span>
                  <DocumentAddIcon height="20" width="20" />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
