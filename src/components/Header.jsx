import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Header(props) {
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearch = ({ target }) => setSearchValue(target.value);

  const onStartSearch = () => (window.location.href = `/search?title=${searchValue}`);

  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Мой блог</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/" active={props.current === ""}>
              Главная
            </Nav.Link>
            <Nav.Link href="/about" active={props.current === "about"}>
              Обо мне
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Поиск статьи..."
              className="mr-sm-2"
              value={searchValue}
              onChange={onChangeSearch}
            />
            <Button className="btn btn-primary" onClick={onStartSearch} disabled={!searchValue}>
              Найти
            </Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
