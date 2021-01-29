import Row from "react-bootstrap/Row";
import React from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

function HomePage() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/posts")
      .then(({ data: posts }) => setPosts(posts));
  }, []);

  return (
    <div className="home-page">
      {!posts.length && <Loader />}
      <Row lg={3} md={3} sm={2} xs={1}>
        {posts.map((post) => (
          <Col key={post.id} className="post-card-wrapper">
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
