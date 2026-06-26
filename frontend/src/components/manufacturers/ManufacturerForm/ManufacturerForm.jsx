import { Plus, RotateCcw } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './ManufacturerForm.scss';

function ManufacturerForm({ name, editing, onNameChange, onSubmit, onCancel }) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Row>
          <Col lg={6} md={6} className='pe-2'>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder='Назва виробника'
              className='mb-3 mb-md-0'
            />
          </Col>
          <Col lg={6} md={6}>
            <Button variant='info' type='submit' className='me-3 fw-medium'>
              <Plus className='me-2' size={18} />
              {editing ? 'Оновити' : 'Додати'}
            </Button>

            {editing && (
              <Button variant='warning' type='button' onClick={onCancel}>
                <RotateCcw className='me-2' size={18} />
                Скасувати
              </Button>
            )}
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default ManufacturerForm;
