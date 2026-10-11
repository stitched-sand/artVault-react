import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ArtworkDetail from "./pages/ArtworkDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/browse" element={<Browse/>}/>
      <Route path="/artwork/:id" element={<ArtworkDetail/>}/>
    </Routes>

    <Footer />
    </>
  )
}

export default App