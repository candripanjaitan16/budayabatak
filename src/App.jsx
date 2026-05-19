import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StickyNavbar from "./components/StickyNavbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import Sejarah from "./pages/Sejarah";
import SejarahDetail from "./pages/SejarahDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSejarah from "./pages/AdminSejarah";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [language, setLanguage] = useState("ID");

  return (
    <Router basename="">
      <div className="bg-white">
        <StickyNavbar language={language} setLanguage={setLanguage} />
        <Routes>
          <Route
            path="/"
            element={<Beranda language={language} setLanguage={setLanguage} />}
          />
          <Route
            path="/sejarah"
            element={<Sejarah language={language} setLanguage={setLanguage} />}
          />
          <Route
            path="/sejarah/:fileName"
            element={<SejarahDetail language={language} />}
          />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard language={language} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/sejarah"
            element={
              <ProtectedRoute>
                <AdminSejarah language={language} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;
