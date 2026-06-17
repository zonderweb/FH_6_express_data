import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DataDriftTable from '../DataDriftTable/DataDriftTable';
import ManufacturersPage from '../pages/ManufacturersPage';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
