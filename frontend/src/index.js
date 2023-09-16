import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyInputScreen from "./screens/CompanyInputScreen";
import CompanyInfoScreen from "./screens/CompanyInfoScreen";
import LoginScreen from "./screens/LoginScreen"
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompanyInputScreen />} />
        <Route path="/:stockSymbol" element={<CompanyInfoScreen />} />
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        <Route path="/login" element={<LoginScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
