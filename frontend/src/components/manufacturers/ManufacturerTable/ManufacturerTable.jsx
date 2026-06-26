import { SquarePen, Trash2 } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './ManufacturerTable.scss';

function ManufacturerTable({ manufacturers, onEdit, onDelete }) {
  return (
    <Table hover className='align-middle manufacturer-table mb-0'>
      <thead>
        <tr>
          <th className='text-center'>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {manufacturers.map((manufacturer) => (
          <tr key={manufacturer.id}>
            <td className='text-center'>{manufacturer.id}</td>
            <td>{manufacturer.name}</td>
            <td>
              <Button
                variant='success'
                size='sm'
                className='me-3'
                onClick={() => onEdit(manufacturer)}
              >
                <SquarePen size={18} className='me-2' />
                Редагувати
              </Button>

              <Button
                variant='danger'
                size='sm'
                title='Видалити'
                onClick={() => onDelete(manufacturer)}
              >
                <Trash2 size={18} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ManufacturerTable;
