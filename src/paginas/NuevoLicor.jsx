import React from 'react'
import Formulario from '../components/Formulario'

const NuevoLicor = () => {
  return (
    <div>
      <h1 className='text-4xl font-semibold text-gray-800'>Agregar Licor</h1>
      <hr className='mt-3'/>
      <p className='mt-3'>Completa los siguientes campos para agregar un nuevo Licor</p>
      <Formulario/>
    </div>
  )
}

export default NuevoLicor