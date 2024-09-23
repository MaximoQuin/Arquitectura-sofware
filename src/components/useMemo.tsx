import React, { useReducer, useState, useCallback, useMemo } from "react";


interface ITask {
    id: any,
    text: any,
    completed: any,
}

const initialState: ITask[] = [];

// Reducer para manejar las acciones de agregar y marcar como completa
const todoReducer = (state: any, action: any) => {

    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: Date.now(),
                text: action.payload,
                completed: false,
            }];
        case 'TOGLE_TODO':
            return state.mao((todo: any) =>
                todo.id === action.payload ?
                    { ...todo, completed: !todo.completed } : todo);
        default: return state;
    }
}

const ToDo = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodo, setNewTodo] = useState('');

    const add = useCallback(() => {
        if (newTodo.trim()) {
            dispatch({
                type: 'ADD_TODO',
                payload: newTodo
            });
            setNewTodo('')
        }
    }, [newTodo]);

    // Para marcar como completeda
    const toggleToDo = useCallback((id: any) => {
        dispatch({
            type: 'TOGGLE_TODO',
            payload: id
        });
    }, []);


    // Para guardar el estado de las tareas
    const completeCount = useMemo(
        () => state.filter((todo: any) =>
            todo.completed).length, [state]
    )


    return (
        <div className="">
            
        </div>
    );

}


export default ToDo;

