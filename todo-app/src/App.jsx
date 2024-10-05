import { useEffect, useState } from 'react';
import './App.css';
import TodoItem from "./Components/TodoItem.jsx";

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5096/api/Todo')
            .then(response => response.json())
            .then(data => {
                setTodos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div>
                {loading ? <h1>Loading...</h1> : todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
            </div>
        </>
    );
}

export default App;