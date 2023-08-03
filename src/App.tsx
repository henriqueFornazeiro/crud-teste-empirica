import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './module/Layout';
import ListaUsuarios from './module/Usuario/ListaUsuarios';
import FormularioCadastro from './module/Usuario/FormularioUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ListaUsuarios />}></Route>
          <Route path="/create" element={<FormularioCadastro />}></Route>
          <Route path="/edit/:id" element={<FormularioCadastro isEditPage={true} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
