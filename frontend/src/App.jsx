import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import Home from "./pages/Home/Home";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import "./reset.css";
import "./App.css";
import "./variables.scss";

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
