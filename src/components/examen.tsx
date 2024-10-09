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
    const [filter, setFilter] = useState("all"); // Filtro: all, completed, pending

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

    // Filtrar tareas basado en el filtro seleccionado y evitar recalculo innecesario
    const filteredTasks = useMemo(() => {
        if (filter === "completed") {
            return state.filter((task) => task.completed);
        } else if (filter === "pending") {
            return state.filter((task) => !task.completed);
        }
        return state; // Retorna todas las tareas si el filtro es "all"
    }, [state, filter]);

    const completeCount = useMemo(
        () => state.filter((task: ITask) => task.completed).length,
        [state]
    );

    return (
        <div className="todo-container">
            <div className="top">
                <div className="title">
                    <h2>Lista de elementos :)</h2>
                </div>
                <div className="input">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Añadir un nuevo elemento"
                    />
                    <button onClick={add}>Agregar</button>
                </div>
            </div>

            <div className="buttons-top">
                <button onClick={() => setFilter("all")}>Mostrar Todos</button>
                <button onClick={() => setFilter("completed")}>Completados</button>
                <button onClick={() => setFilter("pending")}>Pendientes</button>
            </div>

            <div className="list">
                <ul>
                    {filteredTasks.map((todo) => (
                        <li key={todo.id}>
                            <p
                                style={{
                                    textDecoration: todo.completed
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {todo.text}
                            </p>
                            <button onClick={() => toggleToDo(todo.id)}>
                                {todo.completed ? "Pendiente" : "Completa"}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="last">
                <p className="completed">
                    Elementos completados: <span>{completeCount}</span>
                </p>
                <p className="completed">
                    Elementos totales: <span>{state.length}</span>
                </p>
            </div>
        </div>
    );
};

export default ToDo;
