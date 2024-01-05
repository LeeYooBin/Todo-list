import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Login from "../Login";
import Home from "../Home";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuth();

  return isLogged ? children :  <Navigate to="/login" />;
};


const Layouts = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Layouts;
