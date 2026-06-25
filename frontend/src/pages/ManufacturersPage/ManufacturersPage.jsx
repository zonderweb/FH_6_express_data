import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ConfirmModal from '../../components/common/ConfirmModal/ConfirmModal';
import ManufacturerForm from '../../components/manufacturers/ManufacturerForm/ManufacturerForm';
import ManufacturerTable from '../../components/manufacturers/ManufacturerTable/ManufacturerTable';
import {
  createManufacturer,
  deleteManufacturer,
  getManufacturers,
  updateManufacturer,
} from '../../services/manufacturersApi';
import './ManufacturersPage.scss';

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [manufacturerToDelete, setManufacturerToDelete] = useState(null);

  const handleDelete = (manufacturer) => {
    setManufacturerToDelete(manufacturer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!manufacturerToDelete) {
      return;
    }

    await deleteManufacturer(manufacturerToDelete.id);

    setShowDeleteModal(false);
    setManufacturerToDelete(null);

    loadManufacturers();
  };

  const loadManufacturers = async () => {
    const response = await getManufacturers();
    setManufacturers(response.data);
  };

  useEffect(() => {
    loadManufacturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    if (editing) {
      await updateManufacturer(editing.id, { name });
      setEditing(null);
    } else {
      await createManufacturer({ name });
    }

    setName('');
    loadManufacturers();
  };

  const handleEdit = (manufacturer) => {
    setEditing(manufacturer);
    setName(manufacturer.name);
  };

  return (
    <Container>
      <h1 className='h6 mb-4 page-title'>
        <span>Data</span> Виробники авто
      </h1>
      <Card>
        <Card.Header>
          <h2 className='h5 page-title'>
            Зведена таблиця <span>Виробників Авто</span>
          </h2>
        </Card.Header>
        <Card.Body>
          <ManufacturerForm
            name={name}
            editing={editing}
            onNameChange={setName}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditing(null);
              setName('');
            }}
          />
        </Card.Body>

        <ManufacturerTable
          manufacturers={manufacturers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ConfirmModal
          show={showDeleteModal}
          title='Видалення виробника'
          message={manufacturerToDelete ? `Видалити виробника "${manufacturerToDelete.name}"?` : ''}
          onConfirm={confirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setManufacturerToDelete(null);
          }}
        />
      </Card>
    </Container>
  );
}
