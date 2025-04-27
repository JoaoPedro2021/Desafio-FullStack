import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "./components/providers";
import Niveis from "./pages/niveis";

const App = () => {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/niveis" />} />
          <Route path="/niveis" element={<Niveis />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
