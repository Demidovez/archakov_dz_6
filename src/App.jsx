import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FullArticlePage from "./pages/FullArticlePage";
import SearchPage from "./pages/SearchPage";
import { ContextApp, initialState, reducer } from "./reducer";
import { Switch, Route } from "react-router-dom";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    axios.get("https://5c3755177820ff0014d92711.mockapi.io/articles").then((res) =>
      dispatch({
        type: "ADD_ALL_ARTICLES",
        payload: res.data,
      }),
    );
  }, []);

  return (
    <div className="App">
      <Header />
      <ContextApp.Provider value={[state, dispatch]}>
        <Container className="page-wrapper">
          <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/article/:id" component={FullArticlePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Container>
      </ContextApp.Provider>
    </div>
  );
}

export default App;
