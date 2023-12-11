import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Main/Home";
import Sizing from "./components/Sizing/Sizing";
import MaterialSelect from "./util/MaterialSelect";
import SingleCam from "./components/Sizing/SingleCam";
import Kiln from "./components/Kiln/Kiln";
import KilnSingleCam from "./components/Kiln/KilnSingleCam";
import Sinterflame from "./components/SinterFlame/Sinterflame";
import SinterflameSingle from "./components/SinterFlame/SinterflameSingle";
import Manpower from "./components/Manpower/Manpower";
import BlendComplianceTracking from "./components/BlendComplianceTracking/BlendComplianceTracking";
import WorkforceSafety from "./components/WorkforceSafety/WorkforceSafety";
import Quality from "./components/QualityTracking/Quality";
import QualitySingleCam from "./components/QualityTracking/QualitySingleCam";
import Login from "./components/Auth/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import AiAdvisor from "./components/Main/AIAdvisor";
import NavContext from "./components/NavContext";
import BF_Dashboard from "./components/BlastFurnace/BF_Components/BF_Dashboard";
import ConatctUs from "./components/ContactUs/ConatctUs";
import NavBox from "./components/NavBox";
import Demo from "./components/Main/Demo";
import Setting from "./components/ContactUs/Setting";
import UserProfile from "./components/ContactUs/UserProfile";
import AskAnExpert from "./components/Main/AskAnExpert";
import ClientSelect from "./components/Main/ClientSelect";
import Messages from "./components/Main/Messages/Messages";
import SingleMessage from "./components/Main/Messages/SingleMessage";
import BfClientSelect from "./components/BlastFurnace/BF_Components/BfClientSelect";
import Redirect from "./components/Main/Redirect";
import Expert from "./components/Main/Expert";
import CreditBuy from "./components/Main/CreditBuy";
import AdminHome from "./components/Admin/Home";
import BillingHome from "./components/Billing/Home";
import EmailActivation from "./components/Admin/EmailActivation";
import TransactionHistory from "./components/Admin/TransactionHistory/TransactionHistory";
import AiAdvisorHistory from "./components/community/AiAdvisorHistory";
import AiExpertHistory from "./components/community/AiExpertHistory";
import AskAnExpertHistory from "./components/community/AskAnExpertHistory";
import Dashboard from "./components/SelfService/pages/Dashboard";
import CreateNew from "./components/SelfService/pages/CreateNew";
import CreateForm from "./components/SelfService/pages/CreateForm"
import mixpanel from "mixpanel-browser";
import DetailView from "./components/SelfService/pages/DetailView";
import AddClients from "./components/SuperAdmin/AddClients/AddClients";

function App() {
  const [login, setLogin] = useState(localStorage.getItem("logged_in")); // used on Login.jsx to set login provider to true
  const [auth, setAuth] = useState(localStorage.getItem("auth_token")); // used on Login.jsx to set auth provider to true
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [userType, setUserType] = useState(localStorage.getItem("user_type"));
  const [organisation, setOrganisation] = useState(
    localStorage.getItem("organization")
  );
  const [location, setLocation] = useState(localStorage.getItem("location"));
  const [fullName, setFullName] = useState(localStorage.getItem("fullname"));
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem("phone"));

  useEffect(() => {
    if (phoneNumber === null) {
      setLogin(false);
    }
  }, []);

  useEffect(() => {
    setAuth(localStorage.getItem("auth_token"));
    setEmail(localStorage.getItem("email"));
    setUserType(localStorage.getItem("user_type"));
    setLocation(localStorage.getItem("location"));
    setOrganisation(localStorage.getItem("organisation"));
    setFullName(localStorage.getItem("fullname"));
    setPhoneNumber(localStorage.getItem("phone"));
  }, [login]);

  useEffect(() => {
    if (login) {
      mixpanel.identify(localStorage.getItem("email"));
      mixpanel.people.set("$email", localStorage.getItem("email"));
      mixpanel.people.set("$name", localStorage.getItem("fullname"));
      mixpanel.people.set(
        "organisation",
        localStorage.getItem("organisation")
      ) &&
        console.log(
          "Mixpanel organisation",
          localStorage.getItem("organisation")
        );
      mixpanel.people.set("role", localStorage.getItem("user_type"));
      mixpanel.people.set("$region", localStorage.getItem("location"));
      mixpanel.people.set("$phone", localStorage.getItem("phone"));
      mixpanel.register({
        email: localStorage.getItem("email"),
        role: localStorage.getItem("user_type"),
        organisation: localStorage.getItem("organisation"),
      });
    }
  }, [login, organisation, fullName, phoneNumber, userType, location]);

  const pageLocation = useLocation();
  const { hash, pathname, search } = pageLocation;

  useEffect(() => {
    if (pathname === "/vision/Sizing/woodchips/grasim-local") {
      mixpanel.track("Grasim woodchips page visited");
    } else if (
      pathname === "/vision/ProcessMonitoring/sinterflame/hindustanzinc"
    ) {
      mixpanel.track("Hindustanzinc sinterflame page visited");
    } else if (
      pathname === "/vision/workforceMonitoring/workforcesafety/asianpaints"
    ) {
      mixpanel.track("Asianpaints workforcesafety page visited");
    }
  }, [pathname]);

  return (
    <>
      <NavContext.Provider
        value={{ setLogin, login, setAuth, auth, setEmail, email }}
      >
        <div>
          {login ? (
            <>
              <Navbar />
              <NavBox />
              <Sidebar />
              <div className="!font-roboto" style={{ display: "flex" }}>
                <div className="md:ml-32 md:mr-10 md:mt-[12vh] w-full mr-2 ml-2 mt-28 mb-10 md:mb-10">
                  <Routes>
                    {/* Home Pages */}
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home state={"home"} />} />
                    <Route path="/vision" element={<Home state={"vision"} />} />
                    <Route
                      path="/optimus"
                      element={<Home state={"optimus"} />}
                    />
                    {/* Community Pages */}
                    <Route
                      path="/community"
                      element={<Home state={"community"} />}
                    />
                    <Route path="/community/advisor" element={<AiAdvisor />} />
                    <Route
                      path="/community/advisor/buycredits"
                      element={<CreditBuy />}
                    />
                    <Route
                      path="/community/askanexpert"
                      element={<AskAnExpert />}
                    />
                    <Route
                      path="/community/expert/:questionId"
                      element={<Expert />}
                    />
                    {/* Client Select Page */}
                    <Route path="/client_select" element={<ClientSelect />} />
                    {/* Optimus Pages */}
                    <Route
                      path="/optimus/blastfurnace"
                      element={<BfClientSelect />}
                    />
                    <Route
                      path="/optimus/blastfurnace/:clientId"
                      element={<BF_Dashboard />}
                    />
                    <Route
                      path="/optimus/blastfurnace/:clientId/:material"
                      element={
                        <BF_Dashboard>
                          <Sizing />
                        </BF_Dashboard>
                      }
                    />
                    <Route
                      path="/optimus/blastfurnace/:clientId/:material/:plantId/:cameraId"
                      element={
                        <BF_Dashboard>
                          <SingleCam />
                        </BF_Dashboard>
                      }
                    />
                    {/* Vision Pages */}
                    <Route
                      path="/vision/:category"
                      element={<MaterialSelect />}
                    />
                    <Route
                      path="/vision/:category/:material"
                      element={<ClientSelect />}
                    />
                    {/*Sizing pages */}
                    <Route
                      path="/vision/Sizing/:material/:clientId"
                      element={<Sizing />}
                    />
                    <Route
                      path="/vision/Sizing/:material/:clientId/:plantId/:cameraId"
                      element={<SingleCam />}
                    />
                    {/*Process and Kiln Pages */}
                    <Route
                      path="/vision/ProcessMonitoring/kilnhealth/:clientId"
                      element={<Kiln />}
                    />
                    <Route
                      path="/vision/ProcessMonitoring/kilnhealth/:clientId/:plantId/:cameraId"
                      element={<KilnSingleCam />}
                    />
                    {/*Sinter Flame Analysis*/}
                    <Route
                      path="/vision/ProcessMonitoring/sinterflame/:clientId"
                      element={<Sinterflame />}
                    />
                    <Route
                      path="/vision/ProcessMonitoring/sinterflame/:clientId/:plantId/:cameraId"
                      element={<SinterflameSingle />}
                    />
                    {/*Quality Tracking pages */}
                    <Route
                      path="/vision/qualityTracking/:material/:clientId"
                      element={<Quality />}
                    />
                    <Route
                      path="/vision/qualityTracking/:material/:clientId/:plantId/:cameraId"
                      element={<QualitySingleCam />}
                    />
                    {/*Manpower pages */}
                    <Route path="/Optimus/Manpower" element={<Manpower />} />
                    {/*Workforce pages*/}
                    {/*Workforcesafety */}
                    <Route
                      path="/vision/workforceMonitoring/workforcesafety/:clientId"
                      element={<WorkforceSafety />}
                    />
                    {/*Workforcesafety */}
                    <Route
                      path="/vision/workforceMonitoring/blendcompliance/:clientId"
                      element={<BlendComplianceTracking />}
                    />
                    {/* Profile Pages */}
                    <Route path="/contactus" element={<ConatctUs />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/bookdemo/:product" element={<Demo />} />
                    {/* Notification Pages */}
                    <Route path="/notifications" element={<Messages />} />
                    <Route
                      path="/notifications/singleMessage"
                      element={<SingleMessage />}
                    />
                    <Route path="/community/sso" element={<Redirect />} />
                    {/* Admin Pages */}
                    <Route
                      path="/admin/usermanagement"
                      element={<AdminHome />}
                    />
                    <Route path="/admin/billing" element={<BillingHome />} />
                    <Route
                      path="/admin/activatesubscription"
                      element={<EmailActivation />}
                    />
                    {/*Community pages */}
                    <Route
                      path="/community/advisor/history"
                      element={<AiAdvisorHistory />}
                    />
                    <Route
                      path="community/askanexpert/history"
                      element={<AskAnExpertHistory />}
                    />
                    <Route
                      path="/community/expert/:questionId"
                      element={<Expert />}
                    />
                    <Route
                      path="/user/transactionhistory"
                      element={<TransactionHistory />}
                    />
                    {/*Super admin pages */}
                    <Route
                      path="/superadmin/addclient"
                      element={<AddClients />}
                    />
                    {/*Self service pages */}
                    <Route path="/Sandbox" element={<Dashboard />} />
                    <Route path="/Sandbox/Create" element={<CreateForm />} />
                    <Route path="/Sandbox/View" element={<DetailView />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </div>
      </NavContext.Provider>
    </>
  );
}

export default App;
