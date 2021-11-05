import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';

import TodosContext from '../context';

export default function TodoForm(){

    const [todo, setTodo] = useState("");
    const {state: {currentTodo={}}, dispatch} = useContext(TodosContext);
    const todoInputRef = useRef();

    useEffect(() => {
        //this is for updation
        if(currentTodo.text){
            setTodo(currentTodo.text)
        }else{
            setTodo("")
        }
    },[currentTodo.id])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        //for updation
        if(currentTodo.text){
            const response = await axios.patch(`http://localhost:3001/todos/${currentTodo.id}`,{
                text: todo
            });
            dispatch({type: "UPDATE_TODO", payload: response.data});
        }else{
            const response = await axios.post('http://localhost:3001/todos', {
                id: Math.random(),
                text: todo,
                complete: false
            });
            //will dispatch into reducer function
            dispatch({type:"ADD_TODO", payload: response.data});
        }
        setTodo("");
        todoInputRef.current.focus();
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center p-5">
            <input 
                type="text"
                className="p-1 border-black border-solid border-2 rounded"
                onChange={event =>setTodo(event.target.value)}
                value={todo}
                ref={todoInputRef}
            />
            <button className="m-2 p-2 border-black border-solid border-2" type="submit">Submit</button>
        </form>
    )

}