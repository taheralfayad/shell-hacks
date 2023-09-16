import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import CompanyInputScreen from "./screens/CompanyInputScreen";
import CompanyInfoScreen from "./screens/CompanyInfoScreen";
import LoginScreen from "./screens/LoginScreen"
import UploadScreen from "./screens/UploadScreen"
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
        <Route path="/signin" element={<LoginScreen />}/>
        <Route path="/upload" element={<UploadScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Auth0Provider
    domain="dev-tpp5o2umanpjtxff.us.auth0.com"
    clientId="h4wSHfihlmieepcPPYdSoBZNl2PezEir"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
>
  <App />
</Auth0Provider>,);
