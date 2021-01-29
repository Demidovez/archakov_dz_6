import Row from "react-bootstrap/Row";
import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const [posts, setPosts] = React.useState();
  const query = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    axios
      .get(
        `https://5c3755177820ff0014d92711.mockapi.io/articles?title=${query.get(
          "title"
        )}`
      )
      .then(({ data: posts }) => setPosts(posts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-page">
      {!posts && <Loader />}
      {posts && posts.length === 0 && (
        <p className="search-empty">Постов не найдено :(</p>
      )}
      <Row lg={3} md={3} sm={2} xs={1}>
        {posts &&
          posts.map((post) => (
            <Col key={post.id} className="post-card-wrapper">
              <PostCard post={post} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default SearchPage;
