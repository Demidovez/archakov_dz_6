import React from "react";
import Card from "react-bootstrap/Card";

function PostCard({ post }) {
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
        <Card.Title as={"a"} href={`post/${post.id}`} className="h5">
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
      </Card.Footer>
    </Card>
  );
}

export default PostCard;
