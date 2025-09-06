import React, { useState } from 'react';

// Mock data for mentors and students (replace with API calls)
const mentors = [
  { id: 1, name: 'Dr. Alice Johnson' },
  { id: 2, name: 'Prof. Bob Smith' },
];

const students = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alex Brown' },
];

const AssignMentors = () => {
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleStudentChange = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssign = () => {
    if (!selectedMentor || selectedStudents.length === 0) {
      alert('Please select a mentor and at least one student.');
      return;
    }
    console.log('Assigned students:', selectedStudents, 'to mentor:', selectedMentor);
    // TODO: Send to backend API
    alert('Assignments saved!');
    setSelectedMentor('');
    setSelectedStudents([]);
  };

  return (
    <div className="page-transition p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Assign Students to Faculty Mentors</h1>
      <div className="card-professional p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Mentor:</label>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="input-professional"
          >
            <option value="">Choose a mentor</option>
            {mentors.map(mentor => (
              <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Students:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {students.map(student => (
              <label key={student.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleStudentChange(student.id)}
                  className="mr-2"
                />
                {student.name}
              </label>
            ))}
          </div>
        </div>
        <button onClick={handleAssign} className="btn-professional">
          Assign Students
        </button>
      </div>
    </div>
  );
};

export default AssignMentors;
