import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Add Framer Motion for animations
import '../styles/addtask.css'; // Ensure your styles are updated

export default function Addtask() {
  const USER_API_END_POINT = 'http://localhost:4000/Task';
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({
      ...input, [name]: value
    });
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/addtask`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      const id = response.data.newtask.user;
      setInput({
        title: "",
        description: "",
      });
      navigate(`/showtask/${id}`);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="form-container mt-5" // Changed class name
    >
      <div className="enhanced-card"> {/* New unique class name */}
        <div className="form-body">
          <h2 className="form-title">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="task-title" className="form-label">Title</label>
              <input
                type="text"
                id="task-title"
                name="title"
                className="form-input" // Keep this updated
                placeholder="Enter task title"
                value={input.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="task-description" className="form-label">Description</label>
              <textarea
                id="task-description"
                name="description"
                className="form-input" // Keep this updated
                placeholder="Enter task description"
                
                rows={10}
                value={input.description}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
