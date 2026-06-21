import { DatabaseZap, Plus, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ConfirmModal from '../../components/common/ConfirmModal/ConfirmModal';
import './CarsPage.scss';

import { createCar, deleteCar, getCars, updateCar } from '../../services/carsApi';
import { getManufacturers } from '../../services/manufacturersApi';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    manufacturer_id: '',
    name: '',
    year: '',
    class_letter: '',
    class_index: '',
    tuning: '',
    power: '',
    weight: '',
    front_weight_distribution: '',
    displacement: '',
  });

  const [editingCar, setEditingCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const loadCars = async () => {
    const res = await getCars();
    setCars(res.data);
  };

  const loadManufacturers = async () => {
    const res = await getManufacturers();
    setManufacturers(res.data);
  };

  useEffect(() => {
    loadCars();
    loadManufacturers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCar) {
        await updateCar(editingCar.id, form);
      } else {
        await createCar(form);
      }

      await loadCars();

      setEditingCar(null);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (car) => {
    console.log(car);

    setEditingCar(car);

    setForm({
      manufacturer_id: car.manufacturer_id,
      name: car.name,
      year: car.year,
      class_letter: car.class_letter,
      class_index: car.class_index,
      tuning: car.tuning,
      power: car.power,
      weight: car.weight,
      front_weight_distribution: car.front_weight_distribution,
      displacement: car.displacement,
    });

    setShow(true);
  };

  const handleConfirmDelete = async () => {
    if (!carToDelete) return;

    try {
      await deleteCar(carToDelete.id);

      setShowDeleteModal(false);
      setCarToDelete(null);

      await loadCars();
    } catch (error) {
      console.error(error);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCarToDelete(null);
  };

  return (
    <>
      <h1 className='mb-4 h2'>Page of Cars</h1>
      <Button onClick={() => setShow(true)}>
        <Plus className='me-2' />
        Add Car
      </Button>

      <Table className='mt-3'>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Year</th>
            <th>Class</th>
            <th>PI</th>
            <th>Power</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.manufacturer_name}</td>
              <td>{car.name}</td>
              <td>{car.year}</td>
              <td>
                {car.class_letter} {car.class_index}
              </td>
              <td>{car.tuning}</td>
              <td>{car.power}</td>
              <td>
                <Button
                  variant='success'
                  size='sm'
                  className='me-3'
                  onClick={() => handleEdit(car)}
                >
                  <SquarePen size={18} className='me-2' />
                  Edit
                </Button>

                <Button
                  variant='danger'
                  size='sm'
                  onClick={() => {
                    setCarToDelete(car);
                    setShowDeleteModal(true);
                  }}
                >
                  <DatabaseZap size={18} className='me-2' />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* # 4. Modal форма додавання */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingCar ? 'Edit Car' : 'Add Car'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              name='manufacturer_id'
              value={form.manufacturer_id}
              onChange={handleChange}
            >
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

            <Button type='submit' className='mt-3' variant='success'>
              {editingCar ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Підтвердження видалення */}

      <ConfirmModal
        show={showDeleteModal}
        title='Видалення автомобіля'
        message={`Видалити автомобіль "${carToDelete?.name ?? ''}"?`}
        onConfirm={handleConfirmDelete}
        onClose={closeDeleteModal}
      />
    </>
  );
}

export default CarsPage;
