import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Usuario from "./components/Usuario";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
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