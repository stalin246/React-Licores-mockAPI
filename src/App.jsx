
import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import Dashboard from "./layout/Dashboard";
import Login from "./layout/Login";
import FormularioLogin from "./paginas/FormularioLogin";
import LandingPage from "./paginas/LandingPage";
import ActualizarLicores from "./paginas/ActualizarLicores";
import MostrarLicor from "./paginas/MostrarLicor";
import ListarLicores from "./paginas/ListarLicores";
import NuevoLicor from "./paginas/NuevoLicor";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />}>
        </Route>

        <Route path="/login" element={<Login />}>
          <Route index element={<FormularioLogin/>}/>
        </Route>

        <Route path="/licores" element={<Dashboard />}>
        <Route index element={<ListarLicores/>}/>
          <Route path='detalle/:id' element={<MostrarLicor/>}/>
          <Route path='nuevo' element={<NuevoLicor/>}/>
          <Route path='editar/:id' element={<ActualizarLicores/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
