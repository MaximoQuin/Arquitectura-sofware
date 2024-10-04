import { useCallback, useMemo, useReducer, useState } from "react";
import "./formulario.css";

interface ITask {
    id: any;
    text: string;
    completed: boolean;
}

const initialState: ITask[] = [];

const todoReducer = (state: ITask[], action: any) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map((todo: ITask) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        default:
            return state;
    }
};

export const ToDo = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodo, setNewToDo] = useState('');

    const add = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        if (newTodo.trim()) {
            dispatch({
                type: 'ADD_TODO',
                payload: newTodo
            });
            setNewToDo('');
        }
    }, [newTodo]);

    const toggleToDo = useCallback((id: any) => {
        dispatch({
            type: 'TOGGLE_TODO',
            payload: id
        });
    }, []);

    // const completeCount = useMemo(
    //     () => state.filter((todo: ITask) => todo.completed).length,
    //     [state]
    // );

    return (
        <div>
            <h1>Lista de Tareas</h1>
            <form onSubmit={add} className="form">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <label style={{ fontSize: '20px' }} htmlFor="taskInput">Tarea:</label>
                    <input
                        className="input"
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewToDo(e.target.value)}
                        id="taskInput"
                    />
                    <button type="submit" style={{ background: 'green', width: '30px' }} className="button">+</button>
                </div>
            </form>

            {/* <h2>Tareas completadas: {completeCount}</h2> */}

            <div className="tasks">
                <ul className="task">
                    {state.map((task, index) => (
                        <li key={task.id} style={{ marginBottom: '10px' }}>
                            <strong>Id:</strong> {index + 1} <br />
                            <strong>Tarea:</strong> {task.text} <br />
                            <strong>Completado:</strong> {task.completed ? 'Lista' : 'Pendiente'} <br />
                            <button
                                onClick={() => toggleToDo(task.id)}
                                style={{ background: task.completed ? 'gray' : 'orange' }}
                                className="button"
                            >
                                {task.completed ? 'Activar' : 'Completar'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
