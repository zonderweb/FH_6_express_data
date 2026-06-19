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

// GET by id
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM manufacturers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No records found' });
    }

    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [result] = await db.query('INSERT INTO manufacturers (name) VALUES (?)', [name]);

    res.status(201).json({
      id: result.insertId,
      name,
    });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ e: e.message });
    }
    res.status(500).json({ error: e.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await db.query('UPDATE manufacturers SET name = ? WHERE id = ?', [
      name,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM manufacturers WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Removed' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
