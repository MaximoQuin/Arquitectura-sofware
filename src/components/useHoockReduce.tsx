import { useReducer } from "react";
// import "./formulario.css";
import "./useHoockReduce.css";

interface State {
    count: number;
}

interface Action {
    type: 'increment' | 'decrement'
}

const initialState = { count: 0 };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="counter">
            <p><strong>Count:</strong> {state.count}</p>
            <div className="buttons">
                <button className="button" style={{background: 'blue'}} onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button className="button" style={{background: 'red'}} onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </div>
        </div>
    )
}