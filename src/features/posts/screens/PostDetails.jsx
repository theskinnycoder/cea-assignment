import {
  PencilAltIcon,
  ThumbDownIcon as TDO,
  ThumbUpIcon as TUO,
  TrashIcon
} from "@heroicons/react/outline"
import {
  ThumbDownIcon as TDS,
  ThumbUpIcon as TUS
} from "@heroicons/react/solid"
import { useEffect } from "react"
import { Col, Container, Jumbotron, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  deletePostByID,
  dislikePostByID,
  fetchPostByID,
  likePostByID
} from "../postsThunks"

const PostDetails = ({ match, history }) => {
  const dispatch = useDispatch()
  const id = match.params.id

  const { error, loading, post } = useSelector(state => state.posts)

  useEffect(() => {
    ;(async () => {
      dispatch(fetchPostByID({ id }))
    })()
  }, [dispatch, id])

  const deleteHandler = async () => {
    dispatch(deletePostByID({ id }))
    history.push("/")
  }

  const likeHandler = async () => {
    dispatch(
      likePostByID({
        id,
        liked: post.liked
      })
    )
  }

  const dislikeHandler = async () => {
    dispatch(
      dislikePostByID({
        id: id,
        disliked: post.disliked
      })
    )
  }

  if (loading) return <h1 className="text-center my-5 p-5">Loading...</h1>
  if (error !== "") return <h1 className="text-center my-5 p-5">{error}</h1>

  return (
    <Container className="p-md-5 my-5 p-2">
      <Jumbotron className="my-5 shadow-lg bg-white">
        <Row>
          <Col
            sm={1}
            className="d-flex flex-row justify-content-center align-items-center flex-md-column"
          >
            <button onClick={likeHandler} className="border-0 bg-white">
              {post.liked ? (
                <TUS height="50" width="50" className="text-info" />
              ) : (
                <TUO className="text-primary" height="50" width="50" />
              )}
            </button>
            <button onClick={dislikeHandler} className="border-0 bg-white">
              {post.disliked ? (
                <TDS height="50" width="50" className="text-danger" />
              ) : (
                <TDO className="text-primary" height="50" width="50" />
              )}
            </button>
          </Col>
          <Col sm={10}>
            <h1 className="my-3 text-center">{post.title}</h1>
            <p className="lead text-center">{post.body}</p>
          </Col>
          <Col
            sm={1}
            className="d-flex flex-row justify-content-center align-items-center flex-md-column"
          >
            <button className="border-0 bg-white">
              <Link to={`/posts/${post.id}/edit`}>
                <PencilAltIcon
                  height="50"
                  width="50"
                  className="bg-bg-secondary text-warning"
                />
              </Link>
            </button>
            <button onClick={deleteHandler} className="border-0 bg-white">
              <TrashIcon
                className="bg-secondary border-0 text-danger"
                height="50"
                width="50"
                style={{ cursor: "pointer" }}
              />
            </button>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}

export default PostDetails
