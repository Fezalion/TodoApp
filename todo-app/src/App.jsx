import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TodoItem from "./Components/TodoItem.jsx";

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5096/api/Todo')
            .then(response => {
                setTodos(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setLoading(false);
            });
    }, []);

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
            const response = await axios.post('http://localhost:5096/api/Todo', {
                title: newTodo
            });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
    return (
        <>
            <div className={"mx-auto p-4 border-2 border-gray-500 rounded-lg " + todos.count <= 0 ? "hidden" : ""}>
                {loading ?
                    <h1>Loading...</h1> :
                    todos.map(todo =>
                        <TodoItem key={todo.id} {...todo}
                                  markdone={markDone}
                                  markundone={markundone}
                                  deleteTodo={deleteTodo}
                        />)}
            </div>
            <div>                
                <form onSubmit={handleAddTodo}
                      className="flex mx-auto p-4 border-2 border-gray-500 rounded-lg my-2 *:mx-2">
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
            </div>
        </>
    );
}

export default App;