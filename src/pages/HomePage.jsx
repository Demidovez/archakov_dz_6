import React from "react";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ArticleCard from "../components/ArticleCard";
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
      id: state.articles.length ? parseInt(state.articles[0].id) + 1 : 1,
      createdAt: new Date(),
    };

    axios
      .post("https://5c3755177820ff0014d92711.mockapi.io/articles", article)
      .then(() => setIsAddedArticle(true))
      // Добавил автоматическое создание 2-х комментов, чтобы сделать 5-е задание
      .then(() =>
        axios.post(`https://5c3755177820ff0014d92711.mockapi.io/articles/${article.id}/comments`, {
          avatar: `https://robohash.org/${article.title}.png`,
        }),
      )
      .then(() =>
        axios.post(`https://5c3755177820ff0014d92711.mockapi.io/articles/${article.id}/comments`, {
          avatar: `https://robohash.org/${article.text}.png`,
        }),
      );

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

  return (
    <div className="home-page">
      <Button variant="primary" className="btn-add-article" onClick={handleShow}>
        Добавить
      </Button>
      {isAddedArticle && <span className="success-add">Статья добавлена!</span>}
      {!state.articles.length && <Loader />}
      <Row lg={3} md={3} sm={2} xs={1}>
        {state.articles.map((article) => (
          <Col key={article.id} className="article-card-wrapper">
            <ArticleCard article={article} />
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
