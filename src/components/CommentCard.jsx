import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function CommentCard({ comment }) {
  return (
    <Container className="comment-card">
      <Row>
        <Col className="avatar" lg={1}>
          <img src={comment.avatar} alt={comment.name} />
        </Col>
        <Col lg={11}>
          <h6>{comment.name}</h6>
          <small className="text-muted">
            {new Date(comment.createdAt).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </small>
          <p>{comment.text}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default CommentCard;
