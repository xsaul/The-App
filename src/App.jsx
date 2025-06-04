import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TablePage from "./components/TablePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </Router>
  );
}

export default App;

