import { ExternalLinkIcon } from "@heroicons/react/solid"
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const PostCard = ({ post }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-lg border-0">
      <Card.Body>
        <Card.Title as="h5" className="text-truncate text-center">
          {post.title}
        </Card.Title>
        <Card.Text className="text-truncate text-center">{post.body}</Card.Text>
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="primary" as={Link} to={`/posts/${post.id}`}>
            <div className="d-flex justify-content-center align-items-center">
              <span>Visit</span>
              <ExternalLinkIcon height="18" width="18" />
            </div>
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PostCard
