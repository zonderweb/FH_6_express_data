const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();

const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.get('/data', async (req, res) => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'FH_Drift_cars_data!A:Y',
    });

    const rows = result.data.values;
    const headers = rows[0];
    const data = rows.slice(1);

    res.json({
      headers,
      data,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Serve!'));
