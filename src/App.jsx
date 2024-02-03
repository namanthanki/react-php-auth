import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
	return <>
    <div>
      <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
    </div>
  </>;
};

export default App;