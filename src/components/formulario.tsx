import React, { useState } from "react";

interface Usuario {
  name: string,
  age: number,
  isStudent: boolean,
  direction: string,
}

const FormUsers: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("")
  const [users, setusers] = useState<Usuario[]>([])

  const addusers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUsers: Usuario = { name, age, isStudent, direction }

    setusers([...users, newUsers]);

    setName("");
    setAge(0);
    setDirection("");
    setIsStudent(false);

  };

  const clearData = () => {
    setusers([])
  }

  return (
    <div className="Form">
      <form onSubmit={addusers}>
        <div className="label">
          <label>Nombre:</label>
          <input type="text" required value={name} onChange={(e) => setName(String(e.target.value))} />
        </div>
        <div className="label">
          <label>Edad:</label>
          <input type="text" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <div className="label check">
          <label>Estudiante:</label>
          <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(Boolean(e.target.value))} />
        </div>
        <div className="label">
          <label>Direccion:</label>
          <input type="text" value={direction} onChange={(e) => setDirection(String(e.target.value))} />
        </div>

        <div className="buttons">
          <button >Guardar</button>
          <button type="button" onClick={clearData} >Borrar</button>
        </div>

        <div className="list">
          <h2>Lista de Usuarios:</h2>
          <ul className="all">
            {users.map((user, index) => (
              <li key={index} >
                <div className="row">
                  <strong>Index:</strong> {index + 1}
                </div>
                <div className="row">
                  <strong>Nombre:</strong> {user.name}
                </div>
                <div className="row">
                  <strong>Edad:</strong> {user.age}
                </div>
                <div className="row">
                  <strong>Estudiante:</strong> {user.isStudent ? 'Sí' : 'No'}
                </div>
                <div className="row">
                  <strong>Direccion:</strong> {user.direction}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );

}

export default FormUsers;