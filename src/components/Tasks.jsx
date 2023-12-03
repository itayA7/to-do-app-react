import React, { useState, useEffect } from 'react'
import './Tasks.css'
import { Check, Trash2, Pencil, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom'
import { wait } from "../lib/utils"
import { error, success } from '../lib/notification';

export const Tasks = () => {
  //react render the page 
  //useState save the varibles although the render
  const [todo, setTodo] = useState('');
  const [todos, setTodods] = useState([]);
  const [todoIndex, setTodoIndex] = useState(-1);
  const [onClickCheck, setOnClickCheck] = useState(false);

  //if useEffect [] is empty the func run once
  //[] means when to call the func (when the varible changes)
  useEffect(() => {
    const todosInStorage = JSON.parse(localStorage.getItem('todos'))
    if (todosInStorage) {
      setTodods(todosInStorage);
    }
  }, [todo])




  const handleAdToDo = async () => {
    if (!todo) return;
    setOnClickCheck(true);
    await wait(1000);
    try {
      if (todoIndex > -1) {
        todos[todoIndex] = todo;
        localStorage.setItem('todos', JSON.stringify(todos))
        setTodoIndex(-1);
        success("task updated successfuly");
      }
      else {
        const allTodos = [...todos, todo];
        localStorage.setItem('todos', JSON.stringify(allTodos))
        success("task added successfuly");
      }
      setTodo('')
    } catch (err) {
      error(err?.message);
    } finally {
      setOnClickCheck(false);
    }
  }

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodods(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const handUpdateTodo = (index) => {
    setTodo(todos[index]);
    setTodoIndex(index);
  }
  const removeAllTasks = () => {
    setTodods([]);
    localStorage.removeItem('todos')
  }

  return (
    <div className='container'>
      <div>
        <input
          onChange={({ target }) => setTodo(target.value)}
          className='task-input' type='text' placeholder='add task' value={todo}
          disabled={onClickCheck}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              handleAdToDo();
            }
          }}
        />
        {!onClickCheck ? (<Check
          onClick={handleAdToDo}
          className='task-icon'
          style={{ cursor: todo ? 'pointer' : 'not-allowed' }}
        />) : (<Loader2 className='task-icon loading' />)}

      </div>
      <div className='todo-wrapper'>
        {todos?.map((todo, index) => (
          <div className='todo-item' key={index}>
            <Link to={`/todo/${index}`} className='todo-link'>
              <span style={{ opacity: todoIndex === index ? 0.5 : 1 }}
                key={index}
              >
                {index + 1}.{todo}
              </span>
            </Link>
            <div>
              <Trash2
                onClick={() => handleDeleteTodo(index)}
                className='trash-icon' />
              <Pencil
                onClick={() => handUpdateTodo(index)}
                className='pencil-icon' />
            </div>
          </div>
        ))}
        <div className='todo-item'>
          {(todoIndex === -1 && onClickCheck) && <span style={{ opacity: 0.5 }}>
            {todos.length + 1}.{todo}</span>}
        </div>
        {todos.length ? (<button onClick={removeAllTasks} className='clear-all-btn'>clear all</button>) : (<></>)}
      </div>
    </div>

  )
}


