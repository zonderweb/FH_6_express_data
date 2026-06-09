const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { google } = require('googleapis');

const sheets = google.sheets({ version: 'v4', auth });

router.get('/', async function (req, res, next) {
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

module.exports = router;
