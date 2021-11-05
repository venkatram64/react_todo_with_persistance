
import React, {useContext, useReducer} from 'react';
import {UserContext} from './index';

const initialState = {
  count: 0
}

function reducer(state, action){

  switch(action.type){
    case "increment":
      return {
        count: state.count + 1
      };
    case "decrement":
      return {
        count: state.count - 1
      };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
}

function App() {

  const value = useContext(UserContext)
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    (<div className="container">

      {/*Hello, {value}*/}
      {/*<UserContext.Consumer>
        {(value) => <div>Hello, {value}</div>}
      </UserContext.Consumer>*/}
      <h1 className="m-2">Count: {state.count}</h1>
      <button className="border m-2 p-2" onClick={() => dispatch({type: "increment"})}>Increment</button>
      <button className="border m-2 p-2" onClick={() => dispatch({type: "decrement"})}>Decrement</button>
      <button className="border m-2 p-2" onClick={() => dispatch({type: "reset"})}>Reset</button>
    </div>)
  );
}

export default App;
