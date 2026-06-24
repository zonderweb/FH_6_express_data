import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './DataDriftTable.scss';

function DataDriftTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/data')
      .then((res) => {
        setRows(res.data.data);
      })
      .catch(console.error);
  }, []);

  if (!rows.length) {
    return <p>Loading...</p>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <>
      <h1 className='h5 mb-4 page-title'>
        <span>DATA</span> Drift Google Table
      </h1>

      <Card>
        <Card.Body>
          <h2 className='h4 page-title'>
            Зведена таблиця <span>Drift заїздів</span>
          </h2>
        </Card.Body>
        <div className='table-wrapper'>
          <table className='data-table'>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column}>{row[column] || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

export default DataDriftTable;
