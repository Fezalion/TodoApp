import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { AnimatePresence } from 'framer-motion';

const styles = {
    todoDone: "border-2 rounded-lg border-green-400",
    todoUndone: "border-2 rounded-lg border-gray-400"
};

const TodoItem = ({ id, title, description, isComplete, markdone, markundone, deleteTodo, updateTodo }) => {
    const [showModal, setShowModal] = useState(false);

    const handleMarkDone = async () => {
        try {
            await axios.put(`http://localhost:5096/api/Todo/${id}/markdone`);
            markdone(id);
        } catch (error) {
            console.error('Error marking todo done:', error);
        }
    };

    const handleMarkUnDone = async () => {
        try {
            await axios.put(`http://localhost:5096/api/Todo/${id}/markundone`);
            markundone(id);
        } catch (error) {
            console.error('Error marking todo undone:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5096/api/Todo/${id}`);
            deleteTodo(id);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleDoubleClick = () => {
        setShowModal(true);
    };

    const handleUpdate = async (updatedTodo) => {        
        try {
            const newtodo = {
                title: updatedTodo.title,
                description: updatedTodo.description
            };
            await axios.put(`http://localhost:5096/api/Todo/${id}`, newtodo);
            updateTodo(id, newtodo);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <>
            <div className={"flex flex-col group text-4xl my-2 p-2 " + (isComplete ? styles.todoDone : styles.todoUndone)}>
                <span className={"flex flex-row justify-between *:px-2 "} onDoubleClick={handleDoubleClick}>
                    {isComplete ?
                        <span onClick={handleMarkUnDone} className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0 transition duration-100 ease-in-out cursor-pointer">✓</span> :
                        <span onClick={handleMarkDone} className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0 transition duration-100 ease-in-out cursor-pointer">☐</span>
                    }
                    <p className="group-hover:text-center text-left">{title}</p>
                    <span onClick={handleDelete} className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0 transition duration-100 ease-in-out cursor-pointer">X</span>
                </span>
            </div>
            <AnimatePresence>
                {showModal && (
                    <Modal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        onSubmit={handleUpdate}
                        initialTitle={title}
                        initialDescription={description}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default TodoItem;