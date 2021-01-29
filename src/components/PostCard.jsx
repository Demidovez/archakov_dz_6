import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function PostCard({ post, onEdit, onRemove }) {
  const [isImageLoadig, setIsImageLoading] = React.useState(true);

  return (
    <Card className="post-card">
      {isImageLoadig && <Card.Img variant="top" src="/no-image.jpg" />}
      <Card.Img
        variant="top"
        src={post.image}
        onLoad={() => setIsImageLoading(false)}
        className={isImageLoadig && "loading"}
      />
      <Card.Body>
        <Card.Title as={Link} to={`post/${post.id}`} className="h5">
          {post.title}
        </Card.Title>
        <Card.Text>{post.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {new Date(post.createdAt).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </small>
        <div className="cntrl-article">
          <Button variant="link" onClick={onEdit}>
            Изменить
          </Button>
          <Button variant="link" onClick={onRemove}>
            Удалить
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default PostCard;
