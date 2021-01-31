import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditArticleModal({ show, onEdit, onCancel, onChange, article }) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить статью</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Заголовок</Form.Label>
          <Form.Control type="text" name="title" value={article.title} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Изображение</Form.Label>
          <Form.Control type="text" name="image" value={article.image} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Текст</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="text"
            value={article.text}
            onChange={onChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="success" onClick={onEdit}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditArticleModal;
