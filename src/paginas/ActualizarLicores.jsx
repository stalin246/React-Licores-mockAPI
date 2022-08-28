import React from 'react'
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActualizarLicor = () => 
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
          console.log(respuesta);
          setLicor(respuesta)
        }
      } catch (error) 
      {
        console.log(error);
      }
    }
    consultarLicor()
  },[])
  
  return (
    <div>
      <h1 className='font-black text-4xl text-sky-900'>Actualizar Licor</h1>
      <hr className='mt-3'/>
      <p className='mt-3'>En este módulo te permite actualizar los datos de un licor</p>
      {
        Object.keys(licor).length > 0 ?
          (
            <Formulario licor={licor}/>
          )
          :
          (
            <p className="bg-red-900 border-t border-b border-red-900 text-white px-4 py-3 m-5 text-center rounded-lg">No existe los datos de ese licor</p>
          ) 
      }
    </div>
  )
}

export default ActualizarLicor