import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/Register.css";

function RegisterForm() {
  const [name, setName] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          fullname,
          email,
          password
        })
      });

      if (response.status === 400) {
        setError('The email address already exists. Please enter another email address or try reactivating your account from the login screen.');
        setIsSubmitting(false);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        setIsSubmitting(false);
        return;
      }

      // Si el registro es exitoso, redirigir a la página del diario
      navigate('/diary');
    } catch (error) {
      setError('Error during registration: ' + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <h2>Registro de usuario</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nombres'
              required
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder='Apellidos'
              required
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Direcciòn de Correo'
              required
            />
          </label>
          <label>
            Clave:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Clave de acceso'
              required
            />
          </label>
          <button type="submit" disabled={!name || !fullname || !email || !password || isSubmitting}>
            Registrarse
          </button>
          <button
            onClick={() => navigate("/")}
            className='cancel-button'
            type='button'
          >
             Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
