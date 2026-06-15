import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ManufacturerForm from '../components/manufacturers/ManufacturerForm';
import {
  createManufacturer,
  deleteManufacturer,
  getManufacturers,
  updateManufacturer,
} from '../services/manufacturersApi';

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити виробника?')) {
      return;
    }

    await deleteManufacturer(id);
    loadManufacturers();
  };

  return (
    <Card>
      <Card.Body>
        <h2>Виробники авто</h2>
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

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {manufacturers.map((manufacturer) => (
              <tr key={manufacturer.id}>
                <td>{manufacturer.id}</td>
                <td>{manufacturer.name}</td>
                <td>
                  <button onClick={() => handleEdit(manufacturer)}>Редагувати</button>

                  <button onClick={() => handleDelete(manufacturer.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
