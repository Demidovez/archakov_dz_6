import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

function AboutPage() {
  const [aboutInfo, setAboutInfo] = React.useState({});

  React.useEffect(() => {
    setAboutInfo({
      title: "Добро пожаловать!",
      content:
        "This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.",
    });
  }, []);

  return (
    <div className="about-page">
      <Jumbotron>
        <h1>{aboutInfo.title}</h1>
        <p>{aboutInfo.content}</p>
      </Jumbotron>
    </div>
  );
}

export default AboutPage;
