/* eslint-disable react-hooks/exhaustive-deps */

import { Col, Container, Nav, Row, Tab } from "react-bootstrap"
import { RenderPosts } from "../components"
import SearchBar from "../components/SearchBar"

const DisplayPosts = () => {
  return (
    <Container className="py-5 my-5">
      <SearchBar />
      <Tab.Container defaultActiveKey="all">
        <Row>
          <Col sm={2} className="mt-5 ml-4 ml-md-0">
            <Nav variant="pills" className="flex-column mt-5">
              {["all", "liked", "disliked"].map(type => (
                <Nav.Item key={type}>
                  <Nav.Link
                    eventKey={type}
                    className="font-weight-bold text-center text-md-left"
                  >
                    {type.toUpperCase()}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              {["all", "liked", "disliked"].map(type => (
                <Tab.Pane eventKey={type} key={type}>
                  <RenderPosts type={type} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default DisplayPosts
