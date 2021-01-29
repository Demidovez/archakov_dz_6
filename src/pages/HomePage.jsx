import React from "react";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import AddArticleModal from "../components/AddArticleModal";
import { ContextApp } from "../reducer";

function HomePage() {
  const [state, dispatch] = React.useContext(ContextApp);

  const [show, setShow] = React.useState(false);
  const [newArticle, setNewArticle] = React.useState({});
  const [isAddedArticle, setIsAddedArticle] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setIsAddedArticle(false);
    setShow(true);
  };

  const onAddArticle = () => {
    const article = {
      ...newArticle,
      id: state.posts[state.posts.length - 1].id + 1,
      createdAt: new Date(),
    };

    axios
      .post("https://5c3755177820ff0014d92711.mockapi.io/articles", article)
      .then((res) => setIsAddedArticle(true));

    dispatch({
      type: "ADD_ARTICLE",
      payload: article,
    });

    setShow(false);
    setNewArticle({});
  };

  const onChangeNewArcticle = ({ target }) =>
    setNewArticle({
      ...newArticle,
      [target.name]: target.value,
    });

  const onEditArticle = () => {};
  const onRemoveArticle = () => {};

  return (
    <div className="home-page">
      <Button
        variant="primary"
        className="btn-add-article"
        onClick={handleShow}
      >
        Добавить
      </Button>
      {isAddedArticle && <span className="success-add">Статья добавлена!</span>}
      {!state.posts.length && <Loader />}
      <Row lg={3} md={3} sm={2} xs={1}>
        {state.posts.map((post) => (
          <Col key={post.id} className="post-card-wrapper">
            <PostCard
              post={post}
              onEdit={onEditArticle}
              onRemove={onRemoveArticle}
            />
          </Col>
        ))}
      </Row>

      <AddArticleModal
        show={show}
        onAdd={onAddArticle}
        onHide={handleClose}
        onChange={onChangeNewArcticle}
        article={newArticle}
      />
    </div>
  );
}

export default HomePage;
