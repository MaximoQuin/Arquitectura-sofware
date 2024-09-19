import React, { useState } from "react";
import "./formulario.css";

interface Usuario {
  nombre: string;
  edad: number;
  esEstudiante: boolean;
  direccion: string;
}

export default function Formulario() {
  // Declaración de variables de estado utilizando un solo objeto para el formulario
  const [formulario, setFormulario] = useState<Usuario>({
    nombre: '',
    edad: 0,
    esEstudiante: true,
    direccion: 'Villas otoch paraiso',
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Manejador del evento del formulario
  const agregarUsuario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Agregar el usuario al array de usuarios
    setUsuarios([...usuarios, formulario]);

    // Limpiar el formulario después de agregar el usuario
    setFormulario({
      nombre: '',
      edad: 0,
      esEstudiante: true,
      direccion: 'Villas otoch paraiso',
    });
  };

  const clearData = () => {
    setUsuarios([]);
  };

  return (
    <div className="users">
      <div>
        <h2 className="title">Formulario de usuario</h2>
        <form className="form" onSubmit={agregarUsuario}>
          <label><strong>Nombre:</strong></label>
          <input
            className="input"
            id="nombre"
            required
            type="text"
            value={formulario.nombre}
            onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
          />

          <label><strong>Edad:</strong></label>
          <input
            className="input"
            id="edad"
            required
            type="number"
            value={formulario.edad}
            onChange={(e) => setFormulario({ ...formulario, edad: Number(e.target.value) })}
          />

          <label><strong>¿Es estudiante?:</strong></label>
          <input
            className="input"
            id="esEstudiante"
            type="checkbox"
            checked={formulario.esEstudiante}
            onChange={(e) => setFormulario({ ...formulario, esEstudiante: e.target.checked })}
          />

          <label><strong>¿Dónde vive?:</strong></label>
          <select
            className="input"
            id="direccion"
            value={formulario.direccion}
            onChange={(e) => setFormulario({ ...formulario, direccion: e.target.value })}
          >
            <option className="input" value="Villas otoch paraiso">Villas otoch paraiso</option>
            <option className="input" value="Pedregal">Pedregal</option>
          </select>

          <div className="buttons">
            <button style={{ background: 'blue' }} className="button" type="submit">Agregar Usuario</button>
            <button style={{ background: 'red' }} className="button" type="button" onClick={clearData}>
              Limpiar Usuarios
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="title">Lista de Usuarios</h2>
        <ul className="list">
          {usuarios.map((user, index) => (
            <li key={index}>
              <strong>Nombre:</strong> {user.nombre} <br />
              <strong>Edad:</strong> {user.edad} <br />
              <strong>Estudiante:</strong> {user.esEstudiante ? 'Sí' : 'No'} <br />
              <strong>Dirección:</strong> {user.direccion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
