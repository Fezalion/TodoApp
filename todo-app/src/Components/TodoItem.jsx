import React, {useState} from 'react';
import axios from 'axios';
import Modal from './Modal';
import {AnimatePresence} from 'framer-motion';

const styles = {
    todoDone: "border-2 rounded-lg border-green-400", todoUndone: "border-2 rounded-lg border-gray-400"
};

const TodoItem = ({id, title, description, isComplete, markdone, markundone, deleteTodo, updateTodo}) => {
    const [showModal, setShowModal] = useState(false);

    const apiBaseUrl = window.location.origin.replace(window.location.port, '5096');

    const handleMarkDone = async () => {
        try {
            await axios.put(`${apiBaseUrl}/api/Todo/${id}/markdone`);
            markdone(id);
        } catch (error) {
            console.error('Error marking todo done:', error);
        }
    };

    const handleMarkUnDone = async () => {
        try {
            await axios.put(`${apiBaseUrl}/api/Todo/${id}/markundone`);
            markundone(id);
        } catch (error) {
            console.error('Error marking todo undone:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiBaseUrl}/api/Todo/${id}`);
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
                title: updatedTodo.title, description: updatedTodo.description
            };
            await axios.put(`${apiBaseUrl}/api/Todo/${id}`, newtodo);
            updateTodo(id, newtodo);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (<>
            <div
                className={"flex flex-col group text-4xl my-2 p-2 " + (isComplete ? styles.todoDone : styles.todoUndone)}>
                <span className={"flex flex-row justify-between *:px-2 items-center"} onDoubleClick={handleDoubleClick}>
                    {isComplete ? <span onClick={handleMarkUnDone}
                                        className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0 transition duration-100 ease-in-out cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
                            </svg>
                        </span> : <span onClick={handleMarkDone}
                                        className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0 transition duration-100 ease-in-out cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                            </svg> 
                        </span>}
                    <p className="text-center cursor-pointer">{title}</p>
                    <span onClick={handleDelete}
                          className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-0 transition duration-100 ease-in-out cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                        </svg>
                    </span>
                </span>
            </div>
        <AnimatePresence>
            {showModal && (<Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleUpdate}
                initialTitle={title}
                initialDescription={description}
            />)}
        </AnimatePresence>
    </>);
};

export default TodoItem;