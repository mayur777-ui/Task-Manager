import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/editTask.css';

export default function EditTask() {
    const USER_API_END_POINT = 'http://localhost:4000/Task';
    const navigate = useNavigate();
    const { id } = useParams();
    const [input, setInput] = useState({
        title: "",
        description: "",
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/showOne/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setInput({
                    title: response.data.title,
                    description: response.data.description,
                });
            } catch (err) {
                console.log(err.message);
            }
        };
        fetch();
    }, [id]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setInput({
            ...input, [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${USER_API_END_POINT}/editTask/${id}`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const id1 = response.data.editTask.user;
            navigate(`/showTask/${id1}`);
        } catch (error) {
            console.error("Error updating task:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="edit-task-container">
            <div className="enhanced-edit-card"> {/* New unique class name */}
                <div className="form-body">
                    <h2 className="form-title text-center mb-4">Edit Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
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
                        <div className="form-group mb-3">
                            <label htmlFor="task-description" className="form-label">Description</label>
                            <textarea
                                id="task-description"
                                name="description"
                                className="form-input"
                                rows={10} // Keep this updated
                                placeholder="Enter task description"
                                value={input.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn w-100"> {/* Updated class name */}
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
