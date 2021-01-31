import Row from "react-bootstrap/Row";
import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const [articles, setArticles] = React.useState();
  const query = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    axios
      .get(`https://5c3755177820ff0014d92711.mockapi.io/articles?title=${query.get("title")}`)
      .then(({ data: articles }) => setArticles(articles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-page">
      {!articles && <Loader />}
      {articles && articles.length === 0 && <p className="search-empty">Постов не найдено :(</p>}
      <Row lg={3} md={3} sm={2} xs={1}>
        {articles &&
          articles.map((article) => (
            <Col key={article.id} className="article-card-wrapper">
              <ArticleCard article={article} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default SearchPage;
