const express = require('express');
const router = express.Router();
const db = require('../db'); // Assume a database connection module

// Create assignment
router.post('/', (req, res) => {
  const { mentorId, studentIds } = req.body;
  // Insert into database (e.g., assignments table with mentor_id and student_id)
  studentIds.forEach(studentId => {
    db.query('INSERT INTO assignments (mentor_id, student_id) VALUES (?, ?)', [mentorId, studentId]);
  });
  res.status(201).send('Assignments created');
});

// Get assignments for a mentor
router.get('/:mentorId', (req, res) => {
  db.query('SELECT * FROM assignments WHERE mentor_id = ?', [req.params.mentorId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
