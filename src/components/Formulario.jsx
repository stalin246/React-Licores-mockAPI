import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MensajeValidacion from './MensajeValidacion'

const Formulario = ({licor}) => 
{

  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const [form, setForm] = useState({
      nombre:     licor?.nombre ?? "",
      porcentaje:licor?.porcentaje ??"",
      precio:      licor?.precio ?? "",
      stock:      licor?.stock ??"",
      tipo:   licor?.tipo ??"",
      descripcion:   licor?.descripcion ??""
  })

  const handleChange = (e) =>
  {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }


    const handleSubmit = async(e) =>
    {
      e.preventDefault()
      if(Object.values(form).includes(""))
      {
        console.log("error");
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2500);
        return
      }

      if(licor?.id)
      {
        const url = `https://630b133ef280658a59d5986c.mockapi.io/licores/${licor.id}`
        const peticion = await fetch(url,{
            method:'PUT',
            body:JSON.stringify(form),
            headers:{'Content-Type':'application/json'}
        })
        const respuesta = await peticion.json()
        navigate('/licores')
      }
      else
      {
        try {
          
          const url = "https://630b133ef280658a59d5986c.mockapi.io/licores"
          const peticion = await fetch(url,{
              method:'POST',
              body:JSON.stringify(form),
              headers:{'Content-Type':'application/json'}
          })
          const respuesta = await peticion.json()
          navigate('/licores')
  
        } catch (error) {
          console.log(error);
        }
      }

    }




  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto'>
        
    <h1 className='text-gray-900 font-bold uppercase text-center text-xl mb-4'>
      {licor?.id ? <p>Actualizar Licores</p> : <p>Registrar Licores</p>}
    </h1>

    {
      error && <MensajeValidacion tipo={'bg-red-700'}>Existen campos vacíos</MensajeValidacion>
    }

    <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data" >
        <div>
          <label 
          htmlFor='nombre'
          className='text-gray-700 uppercase font-bold'>Nombre del licor: </label>
          <input 
          id='nombre'
          type="text" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          placeholder='Nombre del licor'
          name='nombre'
          value={form.nombre}
          onChange={handleChange}
          />
        </div>

        <div>
          <label 
          htmlFor='Porcentaje'
          className='text-gray-700 uppercase font-bold'>Porcentaje de alcohol: </label>
          <input 
          id='porcentaje'
          type="number" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          placeholder='Porcentaje de alcochol'
          name='porcentaje'
          value={form.porcentaje}
          onChange={handleChange}
          />
        </div>

        <div>
          <label 
          htmlFor='Precio unitario'
          className='text-gray-700 uppercase font-bold'>Precio unitario: </label>
          <input 
          id='precio'
          type="number" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          placeholder='Precio unitario'
          name='precio'
          value={form.precio}
          onChange={handleChange}
          />
        </div>

        <div>
          <label 
          htmlFor='stock'
          className='text-gray-700 uppercase font-bold'>Stock: </label>
          <input 
          id='stock'
          type="number" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          name='stock'
          placeholder='stock'
          value={form.stock}
          onChange={handleChange}
          />
        </div>
        <div>
          <label 
          htmlFor='Tipo'
          className='text-gray-700 uppercase font-bold'>Tipo de licor: </label>
          <select 
          id='tipo'
          type="text" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          name='tipo'
          value={form.tipo}
          onChange={handleChange}
          >
          <option>Escoge una opción</option>
          <option>Bebidas alcocholicas destiladas</option>
          <option>Bebidas alcocholicas fermentadas</option>
          <option>Bebidas alcocholicas preparadas</option>
          <option>Otras</option>

          </select>

        </div>

        <div>
          <label 
          htmlFor='imagen'
          className='text-gray-700 uppercase font-bold'>Descripcion: </label>
          <textarea 
          id='descripcion'
          type="sumit"
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
          placeholder='descripcion'  
          name='descripcion'
          value={form.imagen}
          onChange={handleChange}/>
        </div>

        <input 
        id='Licor'
        type="submit"
        className='bg-gray-900 w-full p-3 
        text-white uppercase font-bold rounded-lg 
        hover:bg-sky-900 cursor-pointer transition-all'
        value={licor?.id ? 'Actualizar Licor' : 'Registrar Licor'} 
        />

      </form>
    </div>
  )
}

export default Formulario