import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Modal = ({ show, onClose, onSubmit, initialTitle, initialDescription }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
    };

    if (!show) {
        return null;
    }

    return (
        <motion.div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-pointer"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.2 }}
        >
            <motion.div
                className="bg-gray-700 p-4 rounded-lg shadow-lg cursor-default border-2 border-amber-300"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <h2>Update Todo</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 mt-2 mb-4"
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 mt-2 mb-4"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Modal;