import React from "react";
import Button from "react-bootstrap/Button";
import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";
import Loader from "../components/Loader";
import axios from "axios";
import { ContextApp } from "../reducer";
import { useParams, useHistory } from "react-router-dom";

function FullPostPage() {
  const [state, dispatch] = React.useContext(ContextApp);

  const { id: postId } = useParams();
  const history = useHistory();

  const post = state.posts.find((post) => post.id === postId);
  const comments = state.postComments[postId];

  React.useEffect(() => {
    if (!comments) {
      axios
        .get(
          `https://5c3755177820ff0014d92711.mockapi.io/posts/${postId}/comments`
        )
        .then((res) =>
          dispatch({
            type: "ADD_COMMENTS",
            payload: {
              postId,
              comments: res.data,
            },
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-post-page">
      <Button
        className="btn btn-primary btn-back"
        onClick={() => history.goBack()}
      >
        Назад
      </Button>
      {post ? <PostCard post={post} /> : <Loader />}
      <div className="comments-wrapper">
        <p>Комментарии:</p>
        {comments &&
          comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
      </div>
    </div>
  );
}

export default FullPostPage;
