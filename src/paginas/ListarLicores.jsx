import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const ListarLicores = () => 
{
  const navigate = useNavigate()
  const [licores, setLicores] = useState([]);
  const [lista, setLista]= useState([]);
  const [busqueda, setBusqueda]= useState("");

  useEffect(() => 
  {
    const consultarLicores = async() => 
    {
      console.log("PETICIÓN")
      let respuesta
      try 
      {
        const peticion = await fetch("https://630b133ef280658a59d5986c.mockapi.io/licores/")
        const respuesta = await peticion.json()
        setLicores(respuesta)
      } 
      catch (error) 
      {
        console.log(error);
      }
    }
    consultarLicores()
  }, [])

  const handleDelete = async (id) =>
  { 
      try 
        {
          const confirmar = confirm("Vas a eliminar un licor")
          if(confirmar)
          {
              const url = `https://630b133ef280658a59d5986c.mockapi.io/licores/${id}`
              const peticion = await fetch(url,{
                  method:'DELETE',
              })
              const nuevosLicores = licores.filter(licores => licores.id !== id)
              setLicores(nuevosLicores)
          }
        }
        catch(error)
        {
          console.log(error);
        }
  }
    const peticionGet=async()=>{

      axios.get("https://630b133ef280658a59d5986c.mockapi.io/licores/")
      .then(response=>{

        setLista(response.data);
        setLicores(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }

    const handleChange=e=>{
      setBusqueda(e.target.value);
      filtrar(e.target.value);
    }
    
    const filtrar=(terminoBusqueda)=>{
      var resultadosBusqueda=lista.filter((elemento)=>{
        if(elemento.porcentaje.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        ){
          return elemento;
        }
      });
      setLicores(resultadosBusqueda);
    }

    useEffect(()=>{
      peticionGet();
    },[])

  return (

    <div>
      <h1 className='font-black text-4xl text-gray-900'>Mostrar Licores</h1>
      <hr className='mt-3'/>
      <p className='mt-3'>Módulo para listar todos los licores que se han registrado</p>
      <div className="relative mt-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>

        <input type="text" className="w-[18rem] py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" 
        onChange={handleChange}
        placeholder="Buscar por nombre o porcentaje "
     
        />
    </div>
    
  
      <table className='w-full mt-5 table-auto shadow bg-white' >
            <thead className='dark:bg-gray-900 text-white'>
                <tr>
                  <th className='p-2'>Nombre de la Licor</th>
                  <th className='p-2'>Porcentaje de alcochol</th>
                  <th className='p-2'>Precio</th>
                  <th className='p-2'>Stock</th>
                  <th className='p-2'>Tipo</th>
                  <th className='p-2'>Descripcion</th>
                  <th className='p-2'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                  licores.map(licores => (
                    <tr key={licores.id} className="border-b hover:bg-gray-100">
                        <td className='p-3'>{licores.nombre}</td>
                        <td className='p-3'>{licores.porcentaje}</td>
                        <td className='p-3'>{licores.precio}</td>
                        <td className='p-3'>{licores.stock}</td>
                        <td className='p-3'>{licores.tipo}</td>
                        <td className='p-3 '>{licores.descripcion}</td>
                        <td className='p-3'>
                        <button type='button' className='bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl' onClick={() => navigate(`/licores/detalle/${licores.id}`)}>Visualizar</button>
                        <button type='button' className='bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl'
                        onClick={() => navigate(`/licores/editar/${licores.id}`)}>Editar</button>
                        <button type='button' className='bg-red-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl'onClick={()=>{handleDelete(licores.id)}}>Eliminar</button>
                        </td>
                    </tr>
                  ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListarLicores