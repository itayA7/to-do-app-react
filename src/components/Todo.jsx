import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Todo.css'
import { CornerUpLeft } from 'lucide-react';


export const Todo = () => {
  //The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
  const { todoId } = useParams();
  const [todo, setTodo] = useState('');
  useEffect(() => {
    const todosInStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosInStorage) {
      const selectedTodo = todosInStorage[todoId];
      if (selectedTodo) setTodo(selectedTodo)
    }
  }, []);



  return (
    <div className='container'>
      <h3 className='todo-title'>{todo}</h3>
      <Link to="/tasks"> <CornerUpLeft className='back-icon' /></Link>
    </div>
  )
}
