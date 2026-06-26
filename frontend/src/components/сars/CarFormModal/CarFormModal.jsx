import { CloudCheck } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './CarFormModal.scss';

function CarFormModal({ show, onClose, onSubmit, form, handleChange, manufacturers, editingCar }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className='banner-info' closeButton>
        <Modal.Title>{editingCar ? 'Форма редагування авто' : 'Форма додавання авто'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Select name='manufacturer_id' value={form.manufacturer_id} onChange={handleChange}>
            <option value=''>Select manufacturer</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            name='name'
            value={form.name}
            placeholder='Car name'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='year'
            value={form.year}
            placeholder='Year'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='class_letter'
            value={form.class_letter}
            placeholder='Class (S1, A...)'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='class_index'
            value={form.class_index}
            placeholder='PI'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='tuning'
            value={form.tuning}
            placeholder='Tuning'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='power'
            value={form.power}
            placeholder='Power'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='weight'
            value={form.weight}
            placeholder='Weight'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='front_weight_distribution'
            value={form.front_weight_distribution}
            placeholder='Front weight %'
            onChange={handleChange}
            className='mt-2'
          />

          <Form.Control
            name='displacement'
            value={form.displacement}
            placeholder='Engine size'
            onChange={handleChange}
            className='mt-2'
          />

          <Button type='submit' className='mt-3 w-100' variant='success'>
            <CloudCheck className='me-2' size={22} />
            {editingCar ? 'Update' : 'Save'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CarFormModal;
