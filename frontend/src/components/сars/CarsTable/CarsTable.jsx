import { SquarePen, Trash2 } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './CarsTable.scss';

function CarsTable({ cars, onEdit, onDelete }) {
  return (
    <Table hover className='сars-table align-middle mb-0'>
      <thead>
        <tr>
          <th className='text-center'>Year</th>
          <th>Car</th>
          <th>Class</th>
          <th>T.Code</th>
          <th>Pwr</th>
          <th>Weight</th>
          <th>Displ.</th>
          <th>FWD</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td className='text-center'>{car.year}</td>
            <td>
              <div className='car-mnf'>{car.manufacturer_name}</div> {car.name}
            </td>

            <td>
              {car.class_letter} {car.class_index}
            </td>
            <td>{car.tuning}</td>
            <td>{car.power} кВт</td>
            <td>{car.weight} кг</td>
            <td>{car.displacement} L</td>
            <td>{car.front_weight_distribution}%</td>
            <td>
              <Button variant='primary' size='sm' className='me-3' onClick={() => onEdit(car)}>
                <SquarePen size={18} />
              </Button>

              <Button variant='danger' size='sm' onClick={() => onDelete(car)}>
                <Trash2 size={18} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CarsTable;
