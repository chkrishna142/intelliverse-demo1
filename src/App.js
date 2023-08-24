import { Box } from '@chakra-ui/layout';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Main/Home';
import Sizing from "./components/Sizing/Sizing"
import MaterialSelect from './components/Sizing/MaterialSelect';
import Login from './components/Auth/Login';
import { get_auth_status } from './redux/Auth/auth.selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import AiAdvisor from './components/Main/AIAdvisor';
import NavContext from './components/NavContext';
import { useState } from 'react';
import BF_Dashboard from './components/BlastFurnace/BF_Components/BF_Dashboard';

function App() {
  const { isAuth, default_plant } = useSelector(get_auth_status);
  const [login, setLogin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [])

 
  return (
    <>
      <NavContext.Provider value={{ setLogin}}>
        <Box
          maxW="100vw"
          boxSizing="border-box"
          bgColor="#FAFAFA"
          color="#000000"
          overflowX="hidden"
        >
          {login ? (
            <>
              <Navbar />
              <Sidebar />
              <div className="overall_container" style={{ display: 'flex' }}>
                <div
                  className="routes_container"
                  style={{ width: '100%', marginTop: '70px', marginLeft:'130px', marginRight:'40px' }}
                >
                  <Routes>
                    {default_plant?.length > 0 ? (
                      <Route
                        path="/"
                        element={
                          <Navigate to={`/home`} />
                        }
                      />
                    ) : (
                      <Route path="/" element={<Navigate to="/home" />} />
                    )}       
                    <Route path="/home" element={<Home state={"home"} />} />
                    <Route path="/vision" element={<Home state={"vision"}/>} />
                    <Route path="/optimus" element={<Home state={"optimus"}/>} />
                    <Route path="/advisor" element={<AiAdvisor />} /> 


                    <Route path="/optimus/blastfurnace" element={<BF_Dashboard />} />

                    <Route path="/vision/Sizing" element={<MaterialSelect/>} />  
                    <Route path="/vision/Sizing/:material" element={<Sizing/>} />


                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Login />
          )}
        </Box>
      </NavContext.Provider>
    </>
  );
}

export default App;
