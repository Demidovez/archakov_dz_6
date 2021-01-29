import React from "react";
import Button from "react-bootstrap/Button";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import Loader from "../components/Loader";
import axios from "axios";

function FullPostPage(props) {
  const [post, setPost] = React.useState();
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://5c3755177820ff0014d92711.mockapi.io/posts/${props.id}`)
      .then(({ data: post }) => setPost(post));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    axios
      .get(`https://5c3755177820ff0014d92711.mockapi.io/posts/${props.id}/comments`)
      .then(({ data: comments }) => setComments(comments));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <div className="full-post-page">
      <Button className="btn btn-primary btn-back" onClick={() => window.history.back()}>
        Назад
      </Button>
      {post ? <PostCard post={post} /> : <Loader />}
      <div className="comments-wrapper">
        <p>Комментарии:</p>
        {!comments.length && <Loader />}
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default FullPostPage;
