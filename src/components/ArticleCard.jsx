import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import YouSureModal from "../components/YouSureModal";
import EditArticleModal from "../components/EditArticleModal";
import { ContextApp } from "../reducer";
import axios from "axios";

function ArticleCard({ article }) {
  const [state, dispatch] = React.useContext(ContextApp);

  const [isImageLoadig, setIsImageLoading] = React.useState(true);

  const [editArticle, setEditArticle] = React.useState(article);

  const [showYouSureModal, setShowYouSureModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const history = useHistory();

  const onRemoveArticle = () => {
    let waitDeleteComments = [];

    // Сначала удаляем все комменты, а потом саму статью
    // НО! не всегда удаляются все комменты, я так и не понял почему, возможно проблема в mockapi.io
    if (state.articleComments[article.id]) {
      waitDeleteComments = state.articleComments[article.id].map((comment) =>
        axios.delete(
          `https://5c3755177820ff0014d92711.mockapi.io/articles/${article.id}/comments/${comment.id}`,
        ),
      );
    }

    Promise.all(waitDeleteComments).then(() =>
      axios.delete(`https://5c3755177820ff0014d92711.mockapi.io/articles/${article.id}`),
    );

    dispatch({ type: "REMOVE_ARTICLE", payload: article.id });

    history.push("/");
  };

  const onEditArticle = () => {
    axios.put(
      `https://5c3755177820ff0014d92711.mockapi.io/articles/${editArticle.id}`,
      editArticle,
    );

    dispatch({
      type: "EDIT_ARTICLE",
      payload: editArticle,
    });

    setShowEditModal(false);
  };

  const onChangeArcticle = ({ target }) =>
    setEditArticle({
      ...editArticle,
      [target.name]: target.value,
    });

  return (
    <Card className="article-card">
      {isImageLoadig && <Card.Img variant="top" src="/no-image.jpg" />}
      <Card.Img
        variant="top"
        src={article.image}
        onLoad={() => setIsImageLoading(false)}
        className={isImageLoadig && "loading"}
      />
      <Card.Body>
        <Card.Title as={Link} to={`/article/${article.id}`} className="h5">
          {article.title}
        </Card.Title>
        <Card.Text>{article.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {new Date(article.createdAt).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </small>
        <div className="cntrl-article">
          <Button variant="link" onClick={() => setShowEditModal(true)}>
            Изменить
          </Button>
          <Button variant="link" onClick={() => setShowYouSureModal(true)}>
            Удалить
          </Button>
        </div>
      </Card.Footer>

      <YouSureModal
        show={showYouSureModal}
        onOk={onRemoveArticle}
        onCancel={() => setShowYouSureModal(false)}
      />

      <EditArticleModal
        show={showEditModal}
        onEdit={onEditArticle}
        onCancel={() => setShowEditModal(false)}
        onChange={onChangeArcticle}
        article={editArticle}
      />
    </Card>
  );
}

export default ArticleCard;
