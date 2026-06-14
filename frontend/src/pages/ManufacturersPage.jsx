import { useEffect, useState } from 'react';
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
    <>
      <h1>Виробники авто</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Назва виробника"
        />

        <button type="submit">{editing ? 'Оновити' : 'Додати'}</button>

        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setName('');
            }}
          >
            Скасувати
          </button>
        )}
      </form>

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
    </>
  );
}
