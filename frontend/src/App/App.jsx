import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataDriftTable from '../components/DataDriftTable/DataDriftTable';
import Layout from '../components/layout/Layout';
import CarsPage from '../pages/CarsPage/CarsPage';
import ManufacturersPage from '../pages/ManufacturersPage/ManufacturersPage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<DataDriftTable />} />
        </Route>
        <Route element={<Layout />}>
          <Route path='/manufacturers' element={<ManufacturersPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path='/cars' element={<CarsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
