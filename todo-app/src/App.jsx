import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TodoItem from "./Components/TodoItem.jsx";

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);

    const [newTodo, setNewTodo] = useState('');

    const apiBaseUrl = window.location.origin.replace(window.location.port, '5096');

    const fetchTodos = async () => {
        setFetching(true);
        try {
            const response = await axios.get(`${apiBaseUrl}/api/Todo`);
            if (Array.isArray(response.data)) {
                setTodos(response.data);
            } else {
                console.error('API response is not an array:', response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setLoading(false);
        }
        setTimeout(() => setFetching(false), 1000); // Add a delay before setting fetching to false
    };

    useEffect(() => {
        fetchTodos();
        const interval = setInterval(fetchTodos, 30000);
        return () => clearInterval(interval);
    }, [apiBaseUrl]);

    const markDone = async (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = true;
            }
            return todo;
        }));
    }

    const markundone = async (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = false;
            }
            return todo;
        }));
    }

    const deleteTodo = async (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleAddTodo = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${apiBaseUrl}/api/Todo`, {
                title: newTodo
            });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    const updateTodo = async (id, updatedTodo) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.title = updatedTodo.title;
                todo.description = updatedTodo.description;
            }
            return todo;
        }));
    }

    return (
        loading ? <h1>Loading...</h1> :
            <div>
                <div className={`relative bg-[#242424] mx-auto p-4 border-2 border-gray-500 rounded-lg ${fetching ? 'pulse-border' : ''} ${todos.length <= 0 ? 'hidden' : ''}`}>
                    {todos.map(todo =>
                        <TodoItem key={todo.id} {...todo}
                                  markdone={markDone}
                                  markundone={markundone}
                                  deleteTodo={deleteTodo}
                                  updateTodo={updateTodo}
                        />)}
                </div>
                <div>
                    <form onSubmit={handleAddTodo}
                          className="flex mx-auto p-4 border-2 border-gray-500 rounded-lg my-4 *:mx-2">
                        <input
                            type="text"
                            className="p-4 border-2 border-gray-500 rounded-lg w-full"
                            value={newTodo}
                            onChange={event => setNewTodo(event.target.value)}
                            placeholder="Add a new todo"
                        />
                        <button type="submit" className="p-4 border-2 border-gray-500 rounded-lg text-2xl font-bold">
                            <span>Add</span>
                        </button>
                    </form>
                    <small>*hint: double click the titles to update</small>
                </div>
            </div>
    );
}

export default App;