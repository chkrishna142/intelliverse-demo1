import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Main/Home';
import Sizing from "./components/Sizing/Sizing"
import MaterialSelect from './components/Sizing/MaterialSelect';
import SingleCam from './components/Sizing/SingleCam';
import Login from './components/Auth/Login';
import Sidebar from './components/Sidebar/Sidebar';
import AiAdvisor from './components/Main/AIAdvisor';
import NavContext from './components/NavContext';
import BF_Dashboard from './components/BlastFurnace/BF_Components/BF_Dashboard';
import ConatctUs from "./components/ContactUs/ConatctUs";
import NavBox from "./components/NavBox";
import Demo from './components/Main/Demo';
import Setting from './components/ContactUs/Setting';
import UserProfile from './components/ContactUs/UserProfile';
import AskAnExpert from './components/Main/AskAnExpert';
import ClientSelect from './components/Main/ClientSelect';
import Messages from './components/Main/Messages/Messages';
import SingleMessage from './components/Main/Messages/SingleMessage';

function App() {

  const [login, setLogin] = useState(false);  // used on Login.jsx to set login provider to true
  const [auth, setAuth] = useState("") // used on Login.jsx to set auth provider to true

  useEffect(() => {
    if (localStorage.getItem("logged_in") && localStorage.getItem('auth_token')) {
      setLogin(true);
      setAuth(localStorage.getItem('auth_token'))
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <>
      <NavContext.Provider value={{ setLogin, login, setAuth, auth }}>
        <div>
          {login ? (
            <>
              <Navbar />
              <NavBox />
              <Sidebar />
              <div className="" style={{ display: "flex" }}>
                <div className="md:ml-32 md:mr-10 md:mt-[12vh] w-full mr-2 ml-2 mt-28 mb-10 md:mb-10">
                  <Routes>
                    {/* Home Pages */}
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home state={"home"} />} />
                    <Route path="/vision" element={<Home state={"vision"} />} />
                    <Route path="/optimus" element={<Home state={"optimus"} />} />
                    {/* Community Pages */}
                    <Route path="/community" element={<Home state={"community"} />} />
                    <Route path="/community/advisor" element={<AiAdvisor />} />
                    <Route path="/community/askanexpert" element={<AskAnExpert />} />
                    {/* Client Select Page */}
                    <Route path="/client_select" element={<ClientSelect />} />
                    {/* Optimus Pages */}
                    <Route path="/optimus/blastfurnace" element={<BF_Dashboard />} />
                    <Route path="/optimus/blastfurnace/Sizing/:material" element={<BF_Dashboard><ClientSelect /></BF_Dashboard>} />
                    <Route path="/optimus/blastfurnace/Sizing/:material/:clientId" element={<BF_Dashboard><Sizing /></BF_Dashboard>} />
                    <Route path="/optimus/blastfurnace/Sizing/:material/:clientId/:plantId/:cameraId" element={<BF_Dashboard><SingleCam /></BF_Dashboard>} />
                    {/* Vision Pages */}
                    <Route path="/vision/Sizing" element={<MaterialSelect />} />
                    <Route path="/vision/Sizing/:material" element={<ClientSelect />} />
                    <Route path="/vision/Sizing/:material/:clientId" element={<Sizing />} />
                    <Route path="/vision/Sizing/:material/:clientId/:plantId/:cameraId" element={<SingleCam />} />
                    {/* Profile Pages */}
                    <Route path="/contactus" element={<ConatctUs />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/bookdemo" element={<Demo />} />
                    {/* Notification Pages */}
                    <Route path="/notifications" element={<Messages />} />
                    <Route path="/notifications/singleMessage" element={<SingleMessage />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Login />
          )}
        </div>
      </NavContext.Provider>
    </>
  );
}

export default App;
