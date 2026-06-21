import { DatabaseZap, SquarePen } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './CarsTable.scss';

function CarsTable({ cars, onEdit, onDelete }) {
  return (
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
              <Button variant='success' size='sm' className='me-3' onClick={() => onEdit(car)}>
                <SquarePen size={18} className='me-2' />
                Edit
              </Button>

              <Button variant='danger' size='sm' onClick={() => onDelete(car)}>
                <DatabaseZap size={18} className='me-2' />
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CarsTable;
