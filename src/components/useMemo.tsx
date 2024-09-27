import React, { useReducer, useState, useCallback, useMemo } from "react";
import './memo.css'

interface ITask {
    id: number;
    text: string;
    completed: boolean;
}

const initialState: ITask[] = [];

// Reducer para manejar las acciones de agregar y marcar como completada
const todoReducer = (state: ITask[], action: any) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                },
            ];
        case "TOGGLE_TODO":
            return state.map((todo: ITask) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        default:
            return state;
    }
};

const ToDo: React.FC = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodo, setNewTodo] = useState("");

    const add = useCallback(() => {
        if (newTodo.trim()) {
            dispatch({
                type: "ADD_TODO",
                payload: newTodo,
            });
            setNewTodo("");
        }
    }, [newTodo]);

    const toggleToDo = useCallback((id: number) => {
        dispatch({
            type: "TOGGLE_TODO",
            payload: id,
        });
    }, []);

    // Para calcular la cantidad de tareas completadas
    const completeCount = useMemo(
        () => state.filter((todo: ITask) => todo.completed).length,
        [state]
    );

    return (
        <div className="todo-container">
            <div className="top">
                <div className="title">
                    <h2>Lista de tareas</h2>
                </div>
                <div className="input">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Añadir una nueva tarea"
                    />
                    <button onClick={add}>Añadir</button>
                </div>
            </div>
            <div className="list">
                <ul>
                    {state.map((todo) => (
                        <li key={todo.id} >
                            <p style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}> {todo.text} </p>
                            <button onClick={() => toggleToDo(todo.id)}>
                                {todo.completed ? "Pendiente" : "Completa"}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="completed">Tareas Completadas: <span>{completeCount}</span></p>
        </div>
    );
};

export default ToDo;
