import { BackspaceIcon, PencilAltIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { Button, Container, Form, Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createPost } from "../postsThunks"

const CreatePost = ({ history }) => {
  const { posts } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const submitHandler = async e => {
    e.preventDefault()
    dispatch(createPost({ title, body }))
    history.push("/")
  }

  return posts.length >= 10 ? (
    <Container className="p-5 my-5">
      <h1 className="p-5 mt-5 text-center">
        There can't be more than 10 posts...
      </h1>
      <h6 className="lead text-center font-weight-bold">
        Try deleting some posts
      </h6>
    </Container>
  ) : (
    <Container className="p-5 my-5">
      <h1 className="my-5 text-center">Add a new Blog Post</h1>
      <Jumbotron className="shadow-lg bg-white">
        <Form onSubmit={submitHandler} autoComplete="off">
          <Form.Group controlId="validationCustom01">
            <Form.Label as="h5">Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter a catchy title..."
              style={{ backgroundColor: "aliceblue" }}
              autoFocus={true}
              value={title}
              onChange={e => setTitle(e.target.value)}
              size="lg"
            />
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label as="h5">Body</Form.Label>
            <Form.Control
              style={{ backgroundColor: "aliceblue" }}
              as="textarea"
              value={body}
              onChange={e => setBody(e.target.value)}
              size="lg"
              placeholder="The content of your post..."
              rows={10}
            />
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center flex-column flex-md-row">
            <Button
              variant="success"
              type="submit"
              className="mb-2 mr-md-3 mr-0 mb-md-0 d-flex justify-content-center align-items-center"
            >
              <span>Post</span>
              <PencilAltIcon height="18" width="18" />
            </Button>
            <Button
              variant="info"
              as={Link}
              to="/"
              className="d-flex justify-content-center align-items-center"
            >
              <BackspaceIcon height="18" width="18" />
              <span>Back</span>
            </Button>
          </div>
        </Form>
      </Jumbotron>
    </Container>
  )
}

export default CreatePost
