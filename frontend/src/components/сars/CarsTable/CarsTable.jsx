import { DatabaseZap, SquarePen } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './CarsTable.scss';

function CarsTable({ cars, onEdit, onDelete }) {
  return (
    <Table hover className='mt-3 сars-table align-middle'>
      <thead className='car-table-header'>
        <tr>
          <th>Year</th>
          <th>Car</th>
          <th>Class</th>
          <th>T.Code</th>
          <th>Power</th>
          <th>FWD</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td>{car.year}</td>
            <td>
              <div className='car-mnf'>{car.manufacturer_name}</div> {car.name}
            </td>

            <td>
              {car.class_letter} {car.class_index}
            </td>
            <td>{car.tuning}</td>
            <td>{car.power} к.Вт</td>
            <td>{car.front_weight_distribution}%</td>
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
