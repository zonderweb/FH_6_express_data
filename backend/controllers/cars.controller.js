const db = require('../db/connection');

// GET All /api/cars
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT
                c.*,
                m.name AS manufacturer_name
            FROM cars c
                     JOIN manufacturers m
                          ON m.id = c.manufacturer_id
            ORDER BY m.name, c.name
        `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET by id /api/cars/:id
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    if (!rows.length) {
      return res.status(404).json({
        message: 'No cars found with id ' + req.params.id,
      });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST CREATE cars /api/cars
exports.create = async (req, res) => {
  try {
    const {
      manufacturer_id,
      name,
      year,
      class_letter,
      class_index,
      tuning,
      power,
      weight,
      front_weight_distribution,
      displacement,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO cars (
                manufacturer_id,
                name,
                year,
                class_letter,
                class_index,
                tuning,
                power,
                weight,
                front_weight_distribution,
                displacement
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        manufacturer_id,
        name,
        year,
        class_letter,
        class_index,
        tuning,
        power,
        weight,
        front_weight_distribution,
        displacement,
      ]
    );

    res.status(201).json({
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PUT /api/cars/:id
exports.update = async (req, res) => {
  try {
    const {
      manufacturer_id,
      name,
      year,
      class_letter,
      class_index,
      tuning,
      power,
      weight,
      front_weight_distribution,
      displacement,
    } = req.body;

    const [result] = await db.query(
      `UPDATE cars SET
                manufacturer_id = ?,
                name = ?,
                year = ?,
                class_letter = ?,
                class_index = ?,
                tuning = ?,
                power = ?,
                weight = ?,
                front_weight_distribution = ?,
                displacement = ?
            WHERE id = ?`,
      [
        manufacturer_id,
        name,
        year,
        class_letter,
        class_index,
        tuning,
        power,
        weight,
        front_weight_distribution,
        displacement,
        req.params.id,
      ]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }

    res.json({
      message: 'Updated',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/cars/:id
exports.remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM cars WHERE id = ?', [req.params.id]);

    if (!result.affectedRows) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }

    res.json({
      message: 'Deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
