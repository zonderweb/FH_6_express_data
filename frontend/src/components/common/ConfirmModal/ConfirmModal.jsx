import './ConfirmModal.scss';
import { CloudAlert, DatabaseZap, X } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ show, title, message, onConfirm, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className='banner-danger' closeButton>
        <Modal.Title>
          <span className='fs-5 text-muted'>{title}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <span className='fw-medium fs-6'>
          <CloudAlert className='me-2 text-danger' />
          {message}
        </span>
      </Modal.Body>

      <Modal.Footer className='banner-danger'>
        <Button size='sm' variant='secondary' onClick={onClose}>
          <X size={18} className='me-2' />
          Скасувати
        </Button>

        <Button size='sm' variant='danger' onClick={onConfirm}>
          <DatabaseZap size={18} className='me-2' />
          Видалити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
