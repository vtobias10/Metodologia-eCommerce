import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminCredentials = {
      email: 'admin@admin',
      password: 'admin',
      role: 'admin',
    };

    // Verificar si es administrador
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const token = 'jwt-admin-token-simulado-1234567890';
      localStorage.setItem('authToken', token);
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ email: adminCredentials.email, role: adminCredentials.role })
      );

      navigate('/menuAdmin');
      return;
    }

    // Verificar usuarios registrados
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      const token = 'jwt-token-simulado-1234567890';
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      // Migrar el carrito de invitado al usuario logueado
      const guestCarrito = JSON.parse(localStorage.getItem('carrito_guest')) || [];
      const userCarrito = JSON.parse(localStorage.getItem(`carrito_${foundUser.email}`)) || [];
      
      // Combinar los carritos, manejando duplicados
      const carritoFinal = [...userCarrito];
      guestCarrito.forEach((itemGuest) => {
        const itemExistente = carritoFinal.find((item) => item.id === itemGuest.id);
        if (itemExistente) {
          itemExistente.cantidad += itemGuest.cantidad;
        } else {
          carritoFinal.push(itemGuest);
        }
      });

      // Guardar el carrito actualizado y limpiar el carrito de invitado
      localStorage.setItem(`carrito_${foundUser.email}`, JSON.stringify(carritoFinal));
      localStorage.removeItem('carrito_guest');

      navigate('/');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/userRegister');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 px-4 py-3 flex justify-between items-center">
        <button>
          <span className="text-xl font-bold" onClick={() => navigate('/')}>
            Hi Fenix
          </span>
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleRegisterRedirect}
        >
          Registrarse
        </button>
      </nav>

      <div className="w-full max-w-md mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
