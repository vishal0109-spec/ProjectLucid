import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./controllers/SignUp";
import Login from "./controllers/Login";
import MainDrawer from "./controllers/Drawers/MainDrawer";
import DnsDataDrawer from "./controllers/Drawers/DnsDataDrawer";
import EditDialog from "./controllers/Dialogs/EditDialog";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDrawer />} />
        <Route path="/dnsTableData" element={<DnsDataDrawer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<EditDialog />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
