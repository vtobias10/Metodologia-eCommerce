import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar nombre y apellido
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/;
    if (!nameRegex.test(formData.firstName)) {
      setError('El nombre solo debe contener letras.');
      return;
    }
    if (!nameRegex.test(formData.lastName)) {
      setError('El apellido solo debe contener letras.');
      return;
    }

    // Validar longitud del teléfono
    if (formData.phone.length < 8 || formData.phone.length > 15) {
      setError('El teléfono debe tener entre 8 y 15 dígitos.');
      return;
    }

    // Validar contraseñas
    if (formData.password.length < 6 || formData.password.length > 50) {
      setError('La contraseña debe tener entre 6 y 50 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.some((user) => user.email === formData.email);

    if (emailExists) {
      setError('El correo ya está registrado.');
      return;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'client',
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/userLogin');
  };

  const handleLoginRedirect = () => {
    navigate('/userLogin');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 px-4 py-3 flex justify-between items-center">
        <span className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          Hi Fenix
        </span>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleLoginRedirect}
        >
          Iniciar Sesión
        </button>
      </nav>

      <div className="w-full max-w-md mt-20 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="30"
              pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$"
              title="El nombre solo debe contener letras."
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="30"
              pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$"
              title="El apellido solo debe contener letras."
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="15"
              minLength="8"
              pattern="^\d+$"
              title="El teléfono solo debe contener números."
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="50"
              minLength="6"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="50"
              minLength="6"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
