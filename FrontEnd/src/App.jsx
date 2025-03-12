import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import CotizacionList from './components/cotizacionList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CotizacionList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
