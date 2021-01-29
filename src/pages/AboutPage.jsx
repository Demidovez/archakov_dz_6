import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

function AboutPage() {
  return (
    <div className="about-page">
      <Jumbotron>
        <h1>Добро пожаловать!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
      </Jumbotron>
    </div>
  );
}

export default AboutPage;
