import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Usuario from "./pages/Usuario";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SigninForm />} />
        <Route path="/registrar" element={<SignupForm />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </Router>
  );
}

export default App;