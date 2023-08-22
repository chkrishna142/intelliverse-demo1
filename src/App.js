import { Box } from '@chakra-ui/layout';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReportDash from './components/Dashboard/ReportDash';
import HeadDash from './components/CXO Dashboard/HeadDash';
import CombReal from './components/CXO Dashboard/CombReal';
import RealDash from './components/Dashboard/RealDash';
import Login from './components/Auth/Login';
import { get_auth_status } from './redux/Auth/auth.selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import IntelliVerse from './components/CXO Dashboard/IntelliVerse';
import AiAdvisor from './components/CXO Dashboard/AIAdvisor';
import NavContext from './components/NavContext';
import { useState } from 'react';

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
                  style={{ width: '100%', marginTop: '70px' }}
                >
                  <Routes>
                    {default_plant?.length > 0 ? (
                      <Route
                        path="/"
                        element={
                          <Navigate to={`/intelliverse`} />
                        }
                      />
                    ) : (
                      <Route path="/" element={<Navigate to="/intelliverse" />} />
                    )}
                    <Route path="/home" element={<CombReal />} />
                    <Route path="/intelliverse" element={<IntelliVerse />} />
                    <Route path="/advisor" element={<AiAdvisor />} />
                   
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
