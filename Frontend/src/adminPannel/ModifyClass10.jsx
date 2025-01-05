import React, { useState, useEffect } from 'react';
import { Edit, Trash2, X, Save } from 'lucide-react';

const Class9Management = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    subject: '',
    teacherId: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/MainAdmin/class9');
      if (!response.ok) throw new Error('Failed to fetch teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (err) {
      setError('Failed to load teachers data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);
    setEditForm({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      teacherId: teacher.teacherId,
      amount: teacher.amount,
      description: teacher.description
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (id) => {
    try {
      const formDataToSend = {
        ...editForm,
        Amount: editForm.amount // Convert to match backend
      };
  
      const response = await fetch(`http://localhost:3000/MainAdmin/class9/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });
  
      if (!response.ok) throw new Error('Failed to update teacher');
      
      setTeachers(teachers.map(teacher => 
        teacher._id === id ? { ...teacher, ...editForm } : teacher
      ));
      setSuccess('Teacher updated successfully');
      setEditingId(null);
    } catch (err) {
      setError('Failed to update teacher');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/MainAdmin/class9/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete teacher');
      
      setTeachers(teachers.filter(teacher => teacher._id !== id));
      setSuccess('Teacher deleted successfully');
    } catch (err) {
      setError('Failed to delete teacher');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
     
     <h1 className="text-2xl font-bold mb-6">Class 9 Teachers Management</h1>

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4">
          {success}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map(teacher => (
          <div key={teacher._id} className="bg-white rounded-lg shadow-md relative">
            <div className="p-4">
              {editingId === teacher._id ? (
                <div className="space-y-4">
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                  />
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <input
                    name="subject"
                    value={editForm.subject}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Subject"
                  />
                  <input
                    name="teacherId"
                    value={editForm.teacherId}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Teacher ID"
                  />
                  <input
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description"
                    rows="3"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleSave(teacher._id)}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(teacher)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <div className="space-y-2">
                    <p className="font-bold text-gray-800">{teacher.name}</p>
                    <p className="text-gray-600">{teacher.email}</p>
                    <p className="text-gray-600">Subject: {teacher.subject}</p>
                    <p className="text-gray-600">ID: {teacher.teacherId}</p>
                    <p className="text-gray-600">Amount: ${teacher.Amount}</p> 
                    <p className="text-gray-600 text-sm">{teacher.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Class9Management;