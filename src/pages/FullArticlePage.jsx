import React from "react";
import Button from "react-bootstrap/Button";
import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";
import Loader from "../components/Loader";
import axios from "axios";
import { ContextApp } from "../reducer";
import { useParams, useHistory } from "react-router-dom";

function FullArticlePage() {
  const [state, dispatch] = React.useContext(ContextApp);

  const { id: articleId } = useParams();
  const history = useHistory();

  const article = state.articles.find((article) => parseInt(article.id) === parseInt(articleId));
  const comments = state.articleComments[articleId];

  React.useEffect(() => {
    if (!comments) {
      axios
        .get(`https://5c3755177820ff0014d92711.mockapi.io/articles/${articleId}/comments`)
        .then((res) =>
          dispatch({
            type: "ADD_COMMENTS",
            payload: {
              articleId,
              comments: res.data,
            },
          }),
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-article-page">
      <Button className="btn btn-primary btn-back" onClick={() => history.goBack()}>
        Назад
      </Button>
      {article ? <ArticleCard article={article} /> : <Loader />}
      {comments && !!comments.length && (
        <div className="comments-wrapper">
          <p>Комментарии:</p>
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FullArticlePage;
