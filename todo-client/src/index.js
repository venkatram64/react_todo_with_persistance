import React, {useState,useEffect, useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from "axios";

import 'tailwindcss/dist/tailwind-dark.min.css';

//custom use effect function for fetching the data
const useAPI = endPoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get(endPoint);
    setData(response.data);
  }
  return data;
}

const App = () =>{

  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);

  const savedTodos = useAPI("http://localhost:3001/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    })
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{state, dispatch}}>
      <TodoForm />
      <TodoList/>
    </TodosContext.Provider>
  )

}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

