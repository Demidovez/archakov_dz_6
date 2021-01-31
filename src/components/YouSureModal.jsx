import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function YouSureModal({ show, onOk, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить статью?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Нет
        </Button>
        <Button variant="primary" onClick={onOk}>
          Да
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default YouSureModal;
