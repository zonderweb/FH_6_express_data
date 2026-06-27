import { CarFront } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ConfirmModal from '../../components/common/ConfirmModal/ConfirmModal';
import CarFormModal from '../../components/сars/CarFormModal/CarFormModal';
import CarsTable from '../../components/сars/CarsTable/CarsTable';
import { createCar, deleteCar, getCars, updateCar } from '../../services/carsApi';
import { getManufacturers } from '../../services/manufacturersApi';
import './CarsPage.scss';

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
      <Container>
        <h1 className='mb-4 h6 page-title'>
          <span>Data</span> Drift Cars
        </h1>
      </Container>
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className='h5 page-title'>
              Зведена таблиця <span>Drift Cars</span>
            </h2>
            <Button variant='info' onClick={() => setShow(true)}>
              <CarFront className='me-2' />
              Add Car
            </Button>
          </div>
        </Card.Header>

        <CarsTable
          cars={cars}
          onEdit={handleEdit}
          onDelete={(car) => {
            setCarToDelete(car);
            setShowDeleteModal(true);
          }}
        />
      </Card>

      <CarFormModal
        show={show}
        onClose={() => {
          setShow(false);
          setEditingCar(null);
          setForm({
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
        }}
        onSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        manufacturers={manufacturers}
        editingCar={editingCar}
      />

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
