import './App.css';
import Home from './components/Home';
import Evento from './components/Evento';
import Institutos from './components/Instituicoes';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";


function App() {
  return (
    <div className="App">

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={false}
        draggable={true}
        pauseOnHover={false}
        theme="light" />

      <BrowserRouter>

        <Nav variant='tabs'>

          <Nav.Link as={Link} to="/" > Pagina Inicial</Nav.Link>
          <Nav.Link as={Link} to="/institutos" > Instituições</Nav.Link>
          <Nav.Link as={Link} to="/evento" > Evento</Nav.Link>
        </Nav>


        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/institutos' element={<Institutos />}></Route>
          <Route path='/evento' element={<Evento />}></Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
