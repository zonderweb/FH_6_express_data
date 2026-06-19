import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './CarsPage.scss';

import { createCar, deleteCar, getCars } from '../../services/carsApi';
import { getManufacturers } from '../../services/manufacturersApi';

function CarsPage() {
  return <>Cars Page</>;
}

export default CarsPage;
