import './ManufacturerModal.scss';
import { Trash2, X } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ManufacturerModal({ show, title, message, onConfirm, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button size='sm' variant='secondary' onClick={onClose}>
          <X size={18} className='me-2' />
          Скасувати
        </Button>

        <Button size='sm' variant='danger' onClick={onConfirm}>
          <Trash2 size={18} className='me-2' />
          Видалити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ManufacturerModal;
