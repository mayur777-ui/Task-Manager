// Import dependencies
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/show.css'; // Ensure to have styles for the new design
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

export default function Show() {
    const [tasks, setTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const USER_API_END_POINT = 'http://localhost:4000/Task';
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { id } = useParams();
    // const [userId, setUserId] = useState('');

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${USER_API_END_POINT}/showTask/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // setUserId(response.data[0].user);
                setTask(response.data);
            } catch (err) {
                console.error("Error fetching tasks:", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [token, id]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:4000/User/showDetails/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    setUserDetails(response.data);
                } catch (err) {
                    console.error("Error fetching user details:", err.message);
                }
            }
        };
        fetchUserDetails();
    }, [id, token]);

    const handleEdit = (id) => {
        navigate(`/editTask/${id}`);
    };

    const handleDelete = (id) => {
        setTaskToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${USER_API_END_POINT}/deleteTask/${taskToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setTask(tasks.filter(task => task._id !== taskToDelete));
        } catch (err) {
            console.error("Error deleting task:", err.message);
        } finally {
            setShowModal(false);
            setTaskToDelete(null);
        }
    };

    const handleAddTask = () => {
        navigate('/addTask');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="task-container">
            <motion.div 
                className="task-header"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h2 className="task-title">Task List</h2>

                {/* User Info Card */}
                <div className="user-info-card">
                    <h3 className="user-name">{userDetails.name}</h3>
                    <p className="user-email">{userDetails.email}</p>
                </div>

                <div className="action-buttons">
                    <button className="btn-logout" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                    <button className="btn-add" onClick={handleAddTask}>
                        <FaPlus /> Add Task
                    </button>
                </div>
            </motion.div>

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <motion.div 
                    className="task-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {tasks.length > 0 ? tasks.map(task => (
                        <motion.div 
                            className="task-card"
                            key={task._id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="card-content">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-description">{task.description}</p>
                                <div className="card-buttons">
                                    <button className="btn-edit" onClick={() => handleEdit(task._id)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(task._id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="no-tasks">
                            <p>No tasks available.</p>
                        </div>
                    )}
                </motion.div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this task?</h3>
                        <div className="modal-buttons">
                            <button className="btn-confirm" onClick={confirmDelete}>Yes</button>
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Section */}
            <motion.footer
                className="footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <p>Task Manager Application - Manage your tasks efficiently</p>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </motion.footer>
        </div>
    );
}

