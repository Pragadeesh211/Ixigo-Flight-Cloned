import { useEffect, useState } from "react";
import Flights from "../src/Container/Flights/Flights";
import Buses from "./Container/Buses";
import Trains from "./Container/Trains";
import Hotels from "./Container/Hotels";
import FlightList from "./Container/Flights/FlightList";
import { Route,Routes,BrowserRouter,useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import TopTabs from "./Component/TopTabs";
import Economy from "./Container/Flights/Economy";
import FlightListPage from "./Container/Flights/FlightListPage";



const App = () => {

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};
  

  const MainLayout = () => {
  const location = useLocation();

  // Define routes where Navbar should appear
  const showNavbarRoutes = ["/", "/hotels", "/trains", "/buses"];

  // Define route where Tabs should appear
  const showTabsRoutes = ["/flightListPage","/Economy"];

  const showNavbar = showNavbarRoutes.includes(location.pathname);
  const showTabs = showTabsRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {showTabs && <TopTabs />}
      
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/flightListPage" element={<FlightListPage />} />
        <Route path="/Economy" element={<Economy/>} />
      </Routes>
    </>
  );
};



export default App;
