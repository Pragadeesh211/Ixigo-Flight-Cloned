import { useEffect, useState } from "react";
import Flights from "../src/Container/Flights/Flights";
import Buses from "./Container/Buses";
import Trains from "./Container/Trains";
import Hotels from "./Container/Hotels";
import FlightList from "./Container/Flights/FlightList";
import { Route,Routes,BrowserRouter,useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import TopTabs from "./Component/TopTabs";
import Oneway from "./Container/Flights/Oneway";
import FlightListPage from "./Container/Flights/FlightListPage";
import ReviewTravellerDetails from "./Container/Flights/ReviewTravellerDetails";
import PageSelectionTabs from "./Component/PageSelectionTabs";
import Account from "./Component/Account";
import EditProfile from "./Component/EditProfile";
import MyTravellers from "./Component/MyTravellers";
import AddTraveller from "./Component/AddTraveller";
import EditTraveller from "./Component/EditTraveller";
import AddOns from "./Container/Flights/AddOns";
import Payment from "./Container/Flights/Payment";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";



const App = () => {

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};
  

  const MainLayout = () => {
  const location = useLocation();
  const {
    openDrawer,
    phoneNo
  } = useSelector((state) => state.profile); 

  
  const showNavbarRoutes = ["/", "/hotels", "/trains", "/buses"];

  
  const showTabsRoutes = ["/flightListPage"];

  const showPageSelectTabsRoutes = ["/ReviewTravellerDetails","/addOns","/payment"];

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
        <Route path="/ReviewTravellerDetails" element={<ReviewTravellerDetails/>} />
        <Route 
          path="/addOns" 
          element={
            <ProtectedRoute phone={phoneNo}>
              <AddOns />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute phone={phoneNo}>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Account" 
          element={
            <ProtectedRoute phone={phoneNo}>
              <Account />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editProfile" 
          element={
            <ProtectedRoute phone={phoneNo}>
              <EditProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/myTravellers" 
          element={
            <ProtectedRoute phone={phoneNo}> 
              <MyTravellers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/addTraveller" 
          element={
            <ProtectedRoute phone={phoneNo}>
              <AddTraveller />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editTraveller" 
          element={
            <ProtectedRoute phone={phoneNo}>
              <EditTraveller />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </>
  );
};



export default App;

