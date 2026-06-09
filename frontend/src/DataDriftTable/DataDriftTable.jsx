import axios from 'axios';
import { useEffect, useState } from 'react';
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
    <div className="table-wrapper">
      <table className="data-table">
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
  );
}

export default DataDriftTable;
