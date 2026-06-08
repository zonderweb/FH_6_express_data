import axios from 'axios';
import { useEffect, useState } from 'react';
import './scss/App.scss';
import './scss/Table.scss';

function App() {
  const [table, setTable] = useState({
    headers: [],
    data: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:3000/data')
      .then((res) => setTable(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <h2>FH 6 Drift Cars track result</h2>
      <div>
        <table className="table-data">
          <thead>
            <tr>
              {table.headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.data.map((row, rowIDX) => (
              <tr key={rowIDX}>
                {table.headers.map((_, colIDX) => (
                  <td key={colIDX}>{row[colIDX] || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
