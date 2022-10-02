// import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route  path="/" element={<HomePage />} />
        <Route path="coins:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
