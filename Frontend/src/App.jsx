import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './features/auth/AuthContext';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import Home from './features/shared/pages/Home';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;