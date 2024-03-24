import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './controllers/Context/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
  <ToastContainer style={{fontSize:"1.2rem"}}/>
    <App />
  </AppProvider>,
)
