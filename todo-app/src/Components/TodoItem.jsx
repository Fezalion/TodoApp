import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const styles = {
    todoDone: "border-2 rounded-lg border-green-400",
    todoUndone: "border-2 rounded-lg border-gray-400"
};

const TodoItem = ({ id, title, isComplete, markdone, markundone, deleteTodo }) => {
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
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2>Todo Details</h2>
                <p>Title: {title}</p>
                <p>Status: {isComplete ? "Complete" : "Incomplete"}</p>
            </Modal>
        </>
    );
};

export default TodoItem;