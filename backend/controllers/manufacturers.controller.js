const db = require('../db/connection');

// GET All
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM manufacturers ORDER BY name ASC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
