import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Home from './Views/Home/Home.jsx';
import Adm from './Views/Dashboard/Adm.jsx';
import LoginAdmin from './Views/LoginAdmin/loginAdmin';
import BossAdmin from './Views/BossAdmin/BossAdmin.jsx';
import Error from './Views/Error/Error';
import ProtecteRouterBoss from './components/ProtecteRouter/protecteRouterBoss.jsx';
import LoginBoosAdmin from './Views/BossAdmin/LoginBossAdmin/LoginBossAdmin.jsx';
import ProtecteRouter from './components/ProtecteRouter/protecteRouter.jsx';
import { RefreshToken, RefreshTokenBossAdmin } from './Redux/action.js';
import io from "socket.io-client";

const socket = io("http://localhost:3001")// cambiar

function App() {

  const dataBoss = useSelector((state) => state.userBossAdmin)
  const refreshBoss = useSelector((state) => state.refreshBossAdmin)
  const data = useSelector((state) => state.userAdmin)
  const refresh = useSelector((state) => state.refresh)

  const dispatch = useDispatch()

  const [tokenData, setTokenData] = useState(null);
  const [tokenDataBoss, setTokenDataBoss] = useState(null)
  const [loading, setLoading] = useState(true);

  //console.log(tokenData, "datos estado access o refresh")

  useEffect(() => {
    if (data) {
      setTokenData(data);
      setLoading(false);
    } else if (refresh) {
      setTokenData(refresh);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [data, refresh]);

  useEffect(() => {
    if (!tokenData) {
      // Aquí se verifica si hay un refresh token y se usa para obtener un nuevo token de acceso
      dispatch(RefreshToken())
        .then((response) => {
          setTokenData(response.payload);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al refrescar el token:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, tokenData]);

  const user =  JSON.parse(localStorage.getItem("user"))
  const userBossAdminLocal = JSON.parse(localStorage.getItem("userBossAdmin"))

  useEffect(() => {
    if (dataBoss) {
      setTokenDataBoss(dataBoss);
      setLoading(false);
    } else if (refreshBoss) {
      setTokenDataBoss(refreshBoss);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [dataBoss, refreshBoss]);

  useEffect(() => {
    if (!tokenDataBoss) {
      // Aquí se verifica si hay un refresh token y se usa para obtener un nuevo token de acceso
      dispatch(RefreshTokenBossAdmin())
        .then((response) => {
          setTokenDataBoss(response.payload);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al refrescar el token:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, tokenDataBoss]);

  if (loading) {
    return <div style={{color : "red"}} >Cargando...</div>;
    // despues arreglar esto
  }

  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        {
          tokenData && (
            <Route path='/panelAdmin' element={
              <ProtecteRouter data={tokenData} >
                <Adm user={user} socket={socket} />
              </ProtecteRouter>
            } />
          )
        }
        <Route exact caseSensitive path='/loginAdmin' element={<LoginAdmin socket={socket} />} />
        {

          tokenDataBoss && (
            <Route exact caseSensitive path='/AdminCreate' element={
              <ProtecteRouterBoss dataBoss={tokenDataBoss} >
                <BossAdmin userBoss={userBossAdminLocal} socket={socket} />
              </ProtecteRouterBoss>
            } />
          )
        }
        <Route exact caseSensitive  path='/loginBossAdmin' element={<LoginBoosAdmin/>} />

        <Route path='*' element={<Error/>}/>
        
      </Routes>

    </div>
  );
}

export default App;
