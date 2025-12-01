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
import ReviewTravellerDetails from "./Container/Flights/ReviewTravellerDetails";
import PageSelectionTabs from "./Component/PageSelectionTabs";
import Account from "./Component/Account";
import EditProfile from "./Component/EditProfile";
import MyTravellers from "./Component/MyTravellers";
import AddTraveller from "./Component/AddTraveller";
import EditTraveller from "./Component/EditTraveller";



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

  const showPageSelectTabsRoutes = ["/ReviewTravellerDetails"];

  const showNavbar = showNavbarRoutes.includes(location.pathname);
  const showTabs = showTabsRoutes.includes(location.pathname);
  const showPageSelect = showPageSelectTabsRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {showTabs && <TopTabs />}
      {showPageSelect && <PageSelectionTabs />}
      
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/flightListPage" element={<FlightListPage />} />
        <Route path="/Economy" element={<Economy/>} />
        <Route path="/ReviewTravellerDetails" element={<ReviewTravellerDetails/>} />
        <Route path="/Account" element={<Account/>} />
        <Route path="/editProfile" element={<EditProfile/>} />
        <Route path="/myTravellers" element={<MyTravellers/>} />
        <Route path="/addTraveller" element={<AddTraveller/>} />
        <Route path="/editTraveller" element={<EditTraveller/>} />
      </Routes>
    </>
  );
};



export default App;
