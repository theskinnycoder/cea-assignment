/* eslint-disable react-hooks/exhaustive-deps */

import { BackspaceIcon, PencilAltIcon } from "@heroicons/react/solid"
import { useEffect, useRef } from "react"
import { Button, Container, Form, Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { editPostByID, fetchPostByID } from "../postsThunks"

const EditPost = ({ history, match }) => {
  const dispatch = useDispatch()
  const titleRef = useRef(null)
  const bodyRef = useRef(null)

  const postID = match.params.id

  useEffect(() => {
    ;(async () => {
      dispatch(fetchPostByID({ id: postID }))
    })()
  }, [postID])

  const { loading, error, post } = useSelector(state => state.posts)

  const submitHandler = async e => {
    e.preventDefault()
    dispatch(
      editPostByID({
        id: postID,
        title: titleRef.current.value,
        body: bodyRef.current.value
      })
    )
    history.push("/")
  }

  if (loading) <h1 className="text-center my-5 p-5">Loading...</h1>
  if (error !== "") <h1>{error}</h1>

  return (
    <Container className="p-5 my-5">
      <h1 className="my-5 text-center">Update the Blog Post</h1>
      <Jumbotron className="shadow-lg bg-white">
        <Form onSubmit={submitHandler} autoComplete="off">
          <Form.Group>
            <Form.Label as="h5">Title</Form.Label>
            <Form.Control
              style={{ backgroundColor: "aliceblue" }}
              autoFocus={true}
              type="text"
              required
              defaultValue={post.title}
              ref={titleRef}
              placeholder="Enter a catchy title..."
              size="lg"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label as="h5">Body</Form.Label>
            <Form.Control
              style={{ backgroundColor: "aliceblue" }}
              as="textarea"
              required
              defaultValue={post.body}
              ref={bodyRef}
              placeholder="The content of your post..."
              rows={10}
              size="lg"
            />
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center flex-column flex-md-row">
            <Button
              variant="success"
              type="submit"
              className="mb-2 mr-md-3 mr-0 mb-md-0 d-flex justify-content-center align-items-center"
            >
              <span>Update</span>
              <PencilAltIcon height="18" width="18" />
            </Button>
            <Button
              variant="info"
              as={Link}
              to={`/posts/${postID}`}
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

export default EditPost
