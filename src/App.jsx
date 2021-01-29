import React from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FullPostPage from "./pages/FullPostPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [CurrentPage, setCurrentPage] = React.useState();
  const [pageName, setPageName] = React.useState("");

  React.useEffect(() => {
    const [page, ...params] = window.location.pathname.split("/").slice(1);

    switch (page) {
      case "about":
        setCurrentPage(() => () => <AboutPage />);
        break;
      case "post":
        setCurrentPage(() => () => <FullPostPage id={params[0]} />);
        break;
      case "search":
        setCurrentPage(() => () => <SearchPage />);
        break;
      default:
        setCurrentPage(() => () => <HomePage />);
    }

    setPageName(page);
  }, []);

  return (
    <div className="App">
      <Header current={pageName} />
      <Container className="page-wrapper">{CurrentPage && <CurrentPage />}</Container>
    </div>
  );
}

export default App;
