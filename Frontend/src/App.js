import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/Forgotpassword"; 
import ResetPassword from "./components/Auth/Resetpassword"; 
// import LogoutButton from "./components/Auth/LogoutButton";
import Dashboard from "./components/Dashboard/Dashboard";
import CanvasPage from "./components/Canvas/CanvasPage";
import Thinkboard from "./components/home/HomePage";
import Terms from "./components/home/Terms";
import Pricing from "./components/home/Pricing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Thinkboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/canvas/:canvasId" element={<CanvasPage />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}

export default App;
