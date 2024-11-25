import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Destacado from './Destacado';
import { useCarrito } from './CarritoContext';
import intelLogo from './assets/intelLogo.png';
import amdLogo from './assets/amdLogo.png';
import nvidiaLogo from './assets/nvidiaLogo.png';
import logitechLogo from './assets/logitechLogo.png';
import img1 from './assets/imgProductos/g502.png';
import img2 from './assets/imgProductos/amd55600g.jpg';
import img3 from './assets/imgProductos/razervipermini.jpg';
import img4 from './assets/imgProductos/rtx2060.jpg';
import img5 from './assets/imgProductos/redragonh260.webp';
import img6 from './assets/imgProductos/teclado nisuta.webp';
import img7 from './assets/imgProductos/bluesnowball.jpg';
import img8 from './assets/imgProductos/mousepadcorsair.webp';
import img9 from './assets/imgProductos/mousepadgamernoga.jpg';
import img10 from './assets/imgProductos/ramhyperx.jpg';
import img11 from './assets/imgProductos/sades903.webp';
import img12 from './assets/imgProductos/rtx3060.jpg'

const Catalogo = ({ esAdmin = false, onModificar, onEliminar }) => {
  const [productos, setProductos] = useState([]);
  const [relevantes, setRelevantes] = useState([]);
  const [mostrarMasNovedades, setMostrarMasNovedades] = useState(false);
  const [mostrarMasRelevantes, setMostrarMasRelevantes] = useState(false);
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
  const [modalProducto, setModalProducto] = useState(null);
  const [mostrarModalRelevantes, setMostrarModalRelevantes] = useState(false);

  const navigate = useNavigate();
  
  const { carrito, actualizarCarrito } = useCarrito(); // Usamos el contexto

  const productosVistaPrevia = [
    {
      nombre: 'Logitech G502',
      descripcion: '',
      precio: '50.000',
      stock: '92',
      id: 1,
      imagen: img1,
      categoria: 'Mouses',
      marca: 'Logitech',
    },{
      nombre: 'AMD Ryzen 5 5600G',
      descripcion: '',
      precio: '150.000',
      stock: '67',
      id: 2,
      imagen: img2,
      categoria: 'Procesadores',
      marca: 'AMD',
    },{
      nombre: 'Razer Viper Mini',
      descripcion: '',
      precio: '90.000',
      stock: '41',
      id: 3,
      imagen: img3,
      categoria: 'Mouses',
      marca: 'Razer',
    },{
      nombre: 'NVIDIA RTX 2060',
      descripcion: '',
      precio: '250.000',
      stock: '23',
      id: 4,
      imagen: img4,
      categoria: 'Placas de Video',
      marca: 'NVIDIA',
    },{
      nombre: 'Auriculares Redragon H260',
      descripcion: '',
      precio: '30.000',
      stock: '34',
      id: 5,
      imagen: img5,
      categoria: 'Auriculares',
      marca: 'Redragon',
    },{
      nombre: 'Teclado NISUTA 60% Gamer',
      descripcion: '',
      precio: '90.000',
      stock: '66',
      id: 6,
      imagen: img6,
      categoria: 'Teclados',
      marca: 'Otros',
    },{
      nombre: 'Microfono Blue Snowball',
      descripcion: '',
      precio: '110.000',
      stock: '22',
      id: 7,
      imagen: img7,
      categoria: 'Micrófonos',
      marca: 'Otros',
    },{
      nombre: 'Mouse Pad Corsair XXL',
      descripcion: '',
      precio: '20.000',
      stock: '82',
      id: 8,
      imagen: img8,
      categoria: 'Mouse Pads',
      marca: 'Corsair',
    },{
      nombre: 'Mpuse Pad Noga XXL',
      descripcion: '',
      precio: '15.000',
      stock: '62',
      id: 9,
      imagen: img9,
      categoria: 'Mouse Pads',
      marca: 'Otros',
    },{
      nombre: 'Memoria RAM HyperX 8 GB GDDR4',
      descripcion: '',
      precio: '70.000',
      stock: '49',
      id: 10,
      imagen: img10,
      categoria: 'Memorias RAM',
      marca: 'NVIDIA',
    },{
      nombre: 'Auriculares SADES SA-903',
      descripcion: '',
      precio: '70.000',
      stock: '56',
      id: 11,
      imagen: img11,
      categoria: 'Auriculares',
      marca: 'Otros',
    },{
      nombre: 'NVIDIA RTX 3060 OC',
      descripcion: '',
      precio: '350.000',
      stock: '37',
      id: 12,
      imagen: img12,
      categoria: 'Placas de Video',
      marca: 'NVIDIA',
    }
  ];
  
  useEffect(() => {
    // Obtener productos del localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Si no hay productos en el localStorage, agregar productosVistaPrevia
    if (productosGuardados.length === 0) {
      localStorage.setItem('productos', JSON.stringify(productosVistaPrevia));
      setProductos(productosVistaPrevia);
    } else {
      setProductos(productosGuardados);
    }
  
    // Obtener relevantes del localStorage
    const relevantesGuardados = JSON.parse(localStorage.getItem('relevantes')) || [];
  
    // Si relevantes está vacío, agregar los primeros 4 productos de productos a relevantes
    if (relevantesGuardados.length === 0) {
      const primerosCuatroProductos = productosGuardados.slice(0, 4);
      localStorage.setItem('relevantes', JSON.stringify(primerosCuatroProductos));
      setRelevantes(primerosCuatroProductos);
    } else {
      setRelevantes(relevantesGuardados);
    }
  }, []);
  

  const guardarRelevantes = (relevantesActualizados) => {
    setRelevantes(relevantesActualizados);
    localStorage.setItem('relevantes', JSON.stringify(relevantesActualizados));
  };

  const agregarRelevante = (producto) => {
    if (!relevantes.find((p) => p.id === producto.id)) {
      const nuevosRelevantes = [...relevantes, producto];
      guardarRelevantes(nuevosRelevantes);
    }
    setMostrarModalRelevantes(false);
  };

  const eliminarRelevante = (id) => {
    const nuevosRelevantes = relevantes.filter((p) => p.id !== id);
    guardarRelevantes(nuevosRelevantes);
  };

  const anadirAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);
    const nuevoCarrito = productoExistente
      ? carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      : [...carrito, { ...producto, cantidad: 1 }];
    actualizarCarrito(nuevoCarrito); // Actualizamos el carrito con la función del contexto
    alert(`${producto.nombre} ha sido añadido al carrito.`);
  };

  const abrirModalProducto = (producto) => {
    setModalProducto(producto);
    setMostrarModalDetalles(true);
  };

  const cerrarModalProducto = () => {
    setMostrarModalDetalles(false);
    setModalProducto(null);
  };

  const verProducto = (producto) => {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    navigate('/vistaProductos');
  };  

  return (
    <div className="p-4">
      <Destacado />
      <div id="novedades"></div>
      {/* Novedades */}
<div className="max-w-7xl mx-auto mt-12 text-center">
  <h1 className="text-3xl font-bold text-gray-800">Novedades</h1>
  <p className="text-gray-600 mt-2">Descubre los últimos productos agregados</p>
</div>

<div className="max-w-7xl mx-auto mt-8">

  {/* Espacio entre productos predeterminados y los creados */}
  <div className="mt-12"> {/* Esto agrega un margen entre las dos secciones */}
    {/* Productos creados por el usuario */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {productos.slice(0, mostrarMasNovedades ? productos.length : 8).map((producto) => (
        <div
          key={producto.id}
          className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer"
          onClick={() => verProducto(producto)} // Llama a la función verProducto
        >
          <p className="text-gray-600 text-center">{producto.categoria}</p>
          {producto.imagen && (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-32 h-32 object-cover mb-4"
            />
          )}
          <h2 className="text-xl font-bold text-center">
            {esAdmin ? `${producto.id} - ${producto.nombre}` : producto.nombre}
          </h2>
          <p className="text-green-600 font-bold mt-2 text-center">${producto.precio}</p>
          <p className="text-gray-700 text-center">Stock: {producto.stock}</p>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita la navegación al hacer clic en el botón
              anadirAlCarrito(producto);
            }}
            className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-600 transition duration-300"
          >
            Añadir al carrito
          </button>

          {esAdmin && (
            <div className="mt-4 flex flex-col space-y-2">
    <button
      onClick={(e) => {
        e.stopPropagation(); // Detén la propagación del evento al contenedor padre
        abrirModalProducto(producto);
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Ver Detalles
    </button>
              <div className="flex space-x-4">
              <button
        onClick={(e) => {
          e.stopPropagation(); // Detén la propagación del evento al contenedor padre
          onModificar(producto.id);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Modificar
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Detén la propagación del evento al contenedor padre
          onEliminar(producto.id);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Eliminar
      </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>

  {productos.length > 8 && (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setMostrarMasNovedades(!mostrarMasNovedades)}
        className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition"
      >
        {mostrarMasNovedades ? 'Ver Menos' : 'Ver Más'}
      </button>
    </div>
  )}
</div>


      {/* Más Relevantes */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Más Relevantes</h1>
        <p className="text-gray-600 mt-2">Productos destacados seleccionados</p>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relevantes.slice(0, mostrarMasRelevantes ? relevantes.length : 4).map((producto) => (
            <div
              onClick={() => verProducto(producto)} // Llama a la función verProducto
              key={producto.id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer"
            >
              <p className="text-gray-600 text-center">{producto.categoria}</p>
              {producto.imagen && (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-32 h-32 object-cover mb-4"
                />
              )}
              <h2 className="text-xl font-bold text-center">
                {esAdmin ? `${producto.id} - ${producto.nombre}` : producto.nombre}
              </h2>
              <p className="text-green-600 font-bold mt-2 text-center">${producto.precio}</p>
              <p className="text-gray-700 text-center">Stock: {producto.stock}</p>

              <button
    onClick={(e) => {
      e.stopPropagation(); // Detén la propagación del evento al contenedor padre
      anadirAlCarrito(producto);
    }}
    className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-600 transition duration-300"
  >
    Añadir al carrito
  </button>

              {esAdmin && (
                <div className="flex flex-col space-y-2 mt-4">
                  <button
        onClick={(e) => {
          e.stopPropagation(); // Detén la propagación del evento al contenedor padre
          eliminarRelevante(producto.id);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Quitar de Relevantes
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Detén la propagación del evento al contenedor padre
          abrirModalProducto(producto);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Ver Detalles
      </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {relevantes.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setMostrarMasRelevantes(!mostrarMasRelevantes)}
              className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition"
            >
              {mostrarMasRelevantes ? 'Ver Menos' : 'Ver Más'}
            </button>
          </div>
        )}

        {esAdmin && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setMostrarModalRelevantes(true)}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-600 transition duration-300"
            >
              Agregar Más Relevantes
            </button>
          </div>
        )}
        
      </div>
      

      {/* Modal para detalles del producto */}
      {mostrarModalDetalles && modalProducto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{modalProducto.nombre}</h2>
            <p><strong>ID:</strong> {modalProducto.id}</p>
            <p><strong>Categoría:</strong> {modalProducto.categoria}</p>
            <p><strong>Marca:</strong> {modalProducto.marca}</p>
            <p><strong>Descripción:</strong> {modalProducto.descripcion}</p>
            <p><strong>Precio:</strong> ${modalProducto.precio}</p>
            <p><strong>Stock:</strong> {modalProducto.stock}</p>
            {modalProducto.imagen && (
              <img
                src={modalProducto.imagen}
                alt={modalProducto.nombre}
                className="w-full h-32 object-cover mt-4"
              />
            )}
            <button
              onClick={cerrarModalProducto}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Sección Buscar por Marcas */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Buscar por Marcas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <button
            onClick={() => navigate(`/filtroMarcas?marca=Intel}`)}
            className="bg-gray-100 rounded-lg shadow-lg p-6 flex items-center justify-center"
          >
            <img src={intelLogo} alt="Intel" className="w-32" />
          </button>
          <button
          onClick={() => navigate(`/filtroMarcas?marca=AMD`)}
            className="bg-gray-100 rounded-lg shadow-lg p-6 flex items-center justify-center"
          >
            <img src={amdLogo} alt="AMD" className="w-32" />
          </button>
          <button
          onClick={() => navigate(`/filtroMarcas?marca=NVIDIA`)}
            className="bg-gray-100 rounded-lg shadow-lg p-6 flex items-center justify-center"
          >
             <img src={nvidiaLogo} alt="NVIDIA" className="w-32" />
          </button>
          <button
            onClick={() => navigate(`/filtroMarcas?marca=Logitech`)}
            className="bg-gray-100 rounded-lg shadow-lg p-6 flex items-center justify-center"
          >
             <img src={logitechLogo} alt="Logitech" className="w-32" />
          </button>
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate('/filtroMarcas')}
            className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            Ver Todas
          </button>
        </div>
      </div>

      {/* Modal para agregar relevantes */}
      {mostrarModalRelevantes && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[70vh] overflow-y-auto">
      {/* Botón de cerrar */}
      <button
        onClick={() => setMostrarModalRelevantes(false)} // Cierra el modal
        className="absolute top-4 right-4 text-gray-700 text-2xl hover:text-red-600"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Selecciona un Producto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-gray-100 p-4 rounded-lg flex flex-col items-center"
          >
            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-20 h-20 object-cover mb-2"
              />
            )}
            <h3 className="text-lg font-bold text-center">{producto.nombre}</h3>
            <button
              onClick={() => agregarRelevante(producto)}
              className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
};



export default Catalogo;
