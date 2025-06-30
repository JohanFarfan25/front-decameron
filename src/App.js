import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListHotels from './pages/Hotels/ListHotels';
import HotelForm from './pages/Hotels/HotelForm';
import HotelRooms from './pages/Rooms/HotelRooms';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout actúa como contenedor principal */}
        <Route element={<Layout />}>
          {/* Ruta de inicio */}
          <Route index element={<ListHotels />} />
          
          {/* Rutas de hoteles */}
          <Route path="hotels">
            <Route index element={<ListHotels />} />
            <Route path="new" element={<HotelForm />} />
            <Route path=":id/edit" element={<HotelForm isEdit />} />
            <Route path=":id/rooms" element={<HotelRooms />} />
          </Route>
          
          {/* Ruta comodín */}
          <Route path="*" element={<ListHotels />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;