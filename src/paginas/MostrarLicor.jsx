import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MostrarLicor = () => 
{
  const {id} = useParams()
  const [url, setURL] = useState(id)
  const [licor, setLicor] = useState({})

  useEffect(() => 
  {
        const consultarLicor = async() => {
          try 
          {
            const peticion = await fetch(`https://630b133ef280658a59d5986c.mockapi.io/licores/${url}`)
            const respuesta = await peticion.json()
            if(url == respuesta.id)
            {
              setLicor(respuesta)
            }
          } catch (error) 
          {
            console.log(error);
          }
      }
      consultarLicor()
  }, [])
  

  return (
    <div>
      
      <h1 className='font-black text-4xl text-sky-900'>Detalle del Licor</h1>
      <hr className='mt-3'/>
      <p className='mt-3'>Módulo para mostrar el detall completo de un Licor</p>
      
      {
        Object.keys(licor).length > 0 ?
        (
          <div  className='m-5 flex justify-between'>
            <div>
                <p className="text-2xl text-gray-00 mt-4">
                    <span className="text-gray-600 uppercase font-bold">* Nombre del Licor: </span>
                    {licor.nombre}
                </p>
                <p className="text-2xl text-gray-00 mt-4">
                    <span className="text-gray-600 uppercase font-bold">* Porcentaje de alcohol: </span>
                    {licor.porcentaje}
                </p>
                <p className="text-2xl text-gray-00 mt-4">
                    <span className="text-gray-600 uppercase font-bold">* Precio: </span>
                    {licor.precio}
                </p>
                <p className="text-2xl text-gray-00 mt-4">
                    <span className="text-gray-600 uppercase font-bold">* Stock: </span>
                    {licor.stock}
                </p>
                <p className="text-2xl text-gray-00 mt-4">
                    <span className="text-gray-600 uppercase font-bold">* tipo: </span>
                    {licor.tipo}
                </p>
                <p className="text-2xl text-gray-00 mt-4">
                    <span className="text-gray-600 uppercase font-bold">* Descripcion: </span>
                    {licor.descripcion}
                </p>
            </div>
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/5381/5381224.png" alt="dogandcat" className='h-80 w-80'  />
            </div>
          </div>
        )
        :
        (
          <p className="bg-red-900 border-t border-b border-red-900 text-white px-4 py-3 m-5 text-center rounded-lg">No existe los datos de ese licor</p>
        )
      }
    </div>
  )
}

export default MostrarLicor