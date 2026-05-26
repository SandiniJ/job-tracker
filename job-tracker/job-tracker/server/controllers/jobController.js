const { pool } = require('../db');

const getJobs = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getJob = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const createJob = async (req, res) => {
  const { company, position, status, location, salary, url, notes, applied_date } = req.body;

  if (!company || !position)
    return res.status(400).json({ error: 'Company and position are required' });

  try {
    const result = await pool.query(
      `INSERT INTO jobs (user_id, company, position, status, location, salary, url, notes, applied_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [req.user.id, company, position, status || 'Applied', location, salary, url, notes, applied_date || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateJob = async (req, res) => {
  const { company, position, status, location, salary, url, notes, applied_date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE jobs SET
        company = COALESCE($1, company),
        position = COALESCE($2, position),
        status = COALESCE($3, status),
        location = COALESCE($4, location),
        salary = COALESCE($5, salary),
        url = COALESCE($6, url),
        notes = COALESCE($7, notes),
        applied_date = COALESCE($8, applied_date),
        updated_at = NOW()
       WHERE id = $9 AND user_id = $10 RETURNING *`,
      [company, position, status, location, salary, url, notes, applied_date, req.params.id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM jobs WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob };
