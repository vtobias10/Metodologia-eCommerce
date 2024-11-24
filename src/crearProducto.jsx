import React, { useState } from 'react';
import NavbarAdmin from './navbarAdmin'; // Importa el NavbarAdmin

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
    marca: '' // Nueva propiedad para la marca
  });

  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imagen: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Generar el nuevo id autoincrementable
    const newId = productosGuardados.length > 0
      ? productosGuardados[productosGuardados.length - 1].id + 1
      : 1;

    // Agregar el id al nuevo producto
    const nuevoProducto = { ...formData, id: newId };

    // Agregar el producto al array existente y guardar en localStorage
    productosGuardados.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Resetear el formulario y mostrar mensaje de éxito
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      imagen: '',
      categoria: '',
      marca: ''
    });
    setMensaje('Producto creado exitosamente.');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Agrega el NavbarAdmin */}
      <NavbarAdmin />

      {/* Contenido del formulario */}
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-3xl font-bold mb-6">Crear Producto</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Nombre del Producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Selecciona una categoría</option>
              <option value="Procesadores">Procesadores</option>
              <option value="Placas de Video">Placas de Video</option>
              <option value="Memorias RAM">Memorias RAM</option>
              <option value="Auriculares">Auriculares</option>
              <option value="Teclados">Teclados</option>
              <option value="Mouses">Mouses</option>
              <option value="Mouse Pads">Mouse Pads</option>
              <option value="Joysticks">Joysticks</option>
              <option value="Micrófonos">Micrófonos</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Marca <span className="text-red-500">*</span>
            </label>
            <select
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Selecciona una marca</option>
              <option value="Intel">Intel</option>
              <option value="AMD">AMD</option>
              <option value="NVIDIA">NVIDIA</option>
              <option value="Logitech">Logitech</option>
              <option value="Redragon">Redragon</option>
              <option value="Razer">Razer</option>
              <option value="Hyperx">Hyperx</option>
              <option value="Corsair">Corsair</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Precio <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Imagen del Producto <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Crear Producto
          </button>
        </form>
        {mensaje && <p className="mt-4 text-green-500 font-bold">{mensaje}</p>}
      </div>
    </div>
  );
};

export default CrearProducto;
