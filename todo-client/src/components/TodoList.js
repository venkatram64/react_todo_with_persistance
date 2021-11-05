
import React, {useContext} from 'react';
import TodosContext from '../context';
import axios from 'axios';

//https://icons8.com/icons/set/edit
export default function TodoList(){
    const {state, dispatch} = useContext(TodosContext);

    const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";

    return (
        <div className="container mx-auto max-w-md text-center font-mono">
            <h1 className="text-bold">{title}</h1>
            <ul className="list-reset text-grey p-0">
                { state.todos.map(todo =>(
                    <li className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4" key={todo.id}>
                        <span onDoubleClick={async ()=> {
                            const response = await axios.patch(`http://localhost:3001/todos/${todo.id}`,{
                                complete: !todo.complete
                            });
                            dispatch({type:"TOGGLE_TODO", payload: response.data});
                            }} 
                            className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through text-grey-darkest"}`}>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({type: "SET_CURRENT_TODO", payload: todo})}
                        >
                            <img className="h-6" src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png" alt="Edit Icon"/>
                        </button>
                        <button
                            onClick={async () => {
                                await axios.delete(`http://localhost:3001/todos/${todo.id}`);
                                dispatch({type: "REMOVE_TODO", payload: todo});
                            }}
                        >
                            <img className="h-6" className="h-6"src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png" alt="Delete Icon"/>
                        </button>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}