import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { PostCard } from "../components"
import { fetchPosts } from "../postsThunks"

const RenderPosts = ({ type }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const {
    error,
    loading,
    posts,
    likedPosts,
    dislikedPosts,
    searchText
  } = useSelector(state => state.posts)

  let articles = []
  if (!loading) {
    if (type === "liked") {
      articles =
        searchText !== ""
          ? likedPosts.filter(post =>
              post.title.toLowerCase().includes(searchText.toLowerCase())
            )
          : likedPosts
    } else if (type === "disliked") {
      articles =
        searchText !== ""
          ? dislikedPosts.filter(post =>
              post.title.toLowerCase().includes(searchText.toLowerCase())
            )
          : dislikedPosts
    } else {
      articles =
        searchText !== ""
          ? posts.filter(post =>
              post.title.toLowerCase().includes(searchText.toLowerCase())
            )
          : posts
    }
  }

  if (loading) return <h1 className="text-center mt-5">Loading...</h1>
  if (error !== "") return <h1>{error}</h1>

  return (
    <Container className="mt-5">
      {articles.length !== 0 ? (
        <>
          <h1 className="text-center">{type.toUpperCase()} Posts</h1>
          <Row>
            {articles.map(post => (
              <Col key={post.id} sm={12} md={6}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <h1 className="text-center">
          There are no {type === "all" ? "" : type.toUpperCase()} Posts
        </h1>
      )}
    </Container>
  )
}

export default RenderPosts
