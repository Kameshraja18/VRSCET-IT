import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignStudents = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    // Fetch mentors and students from API
    axios.get('/api/mentors').then(res => setMentors(res.data));
    axios.get('/api/students').then(res => setStudents(res.data));
  }, []);

  const handleAssign = () => {
    axios.post('/api/assignments', { mentorId: selectedMentor, studentIds: selectedStudents })
      .then(() => alert('Assignments saved!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="card-professional p-6">
      <h2 className="text-xl font-semibold mb-4">Assign Students to Mentor</h2>
      <select className="input-professional mb-4" value={selectedMentor} onChange={e => setSelectedMentor(e.target.value)}>
        <option value="">Select Mentor</option>
        {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>
      <select className="input-professional mb-4" multiple value={selectedStudents} onChange={e => setSelectedStudents([...e.target.selectedOptions].map(o => o.value))}>
        {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <button className="btn-professional" onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default AssignStudents;
