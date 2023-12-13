import './App.css';
import Admin from "./views/admin/Admin"
import Client from './views/client/Client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./views/admin/Admin.scss"
import LoginAdmin from "./views/admin/Login/LoginAdmin";

function App() {
  // const [catalog, setCatalog] = useState([
  //   { id: '1', title: 'Dashboard', img: 'bx bxs-dashboard', link: 'admin' },
  //   { id: '2', title: 'Khóa luận', img: 'bx bxs-shopping-bag-alt', link: 'khoaluan' },
  //   { id: '3', title: 'Thực tập', img: 'bx bxs-doughnut-chart', link: 'thuctap' },
  //   { id: '4', title: 'Cải thiện', img: 'bx bxs-message-dots', link: 'caithien' },
  //   { id: '5', title: 'Buộc thôi học', img: 'bx bxs-dashboard', link: 'thoihoc' },
  // ]);

  const [hiddenDB, setHiddenDB] = useState(false);
  const [switchmode, setSwitchmode] = useState(false);
  const [accessToken, SetAccessToken] = useState("");
  const changleHidden = () => {
    setHiddenDB(!hiddenDB);
  }
  const changleSwitchMode = () => {
    setSwitchmode(!switchmode);
  }

  const [loggedIn, setLoggedIn] = useState();
  // useEffect(() => {
  //   let token = localStorage.getItem("accessToken");
  //   token ? setLoggedIn(true) : setLoggedIn(false)
  // }, [])
  // const [loggedInClient, setLoggedInClient] = useState(false);
  const CheckLogin = () => {
    let token = localStorage.getItem("accessToken");
    token ? setLoggedIn(true) : setLoggedIn(false)
  }

  return (
    <BrowserRouter>
      {/* Admin */}
      <div className='App'>
        <Routes>
          <Route path='/admin/login' element={<LoginAdmin loggedIn={loggedIn} CheckLogin={() => CheckLogin()} />}></Route>
          <Route path='admin/*' element={localStorage.getItem("accessToken") && localStorage.getItem("MaGV") ?
            <Admin /> : <Navigate to="/admin/login" />}>
          </Route>
          <Route path='/*' element={<Client />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </div>
    </BrowserRouter >
  )




}

export default App;
