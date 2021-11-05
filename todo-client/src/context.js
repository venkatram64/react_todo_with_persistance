import React from 'react';

const TodosContext = React.createContext({
    todos:[
        /*{id: 1, text: "Eat breakfast", complete: false},
        {id: 2, text: "Do laudry", complete: true},
        {id: 3, text: "Finish project", complete: false},*/
    ],
    currentTodo:{}
});


export default TodosContext;