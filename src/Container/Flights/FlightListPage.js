import React, { useEffect, useState } from "react";
import FlightListSearchCard from "./FlightListSearchCard";
import Oneway from "./Oneway";
import RoundTrip from "./RoundTrip";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import Link,{useNavigate} from "react-router-dom";
import { 
  setFrom,
  setTo,
  swapFromTo,
  toggleReturnTrip,
  setReturnTripUI,
  setDeparture,
  setReturnDate,
  setTravellers,
  setTravelClass,
 } from "../../Redux/Slices/FlightSearchSlice";
import LoginPage from "../../Component/LoginPage";


const FlightListPage = () =>{
    const dispatch = useDispatch();
      const {
        from,
        to,
        returnTrip,
        returnTripUI,
        departure,
        returnDate,
        travellers,
        travelClass,
      } = useSelector((state) => state.flightSearch);
      
    //   const navigate = useNavigate();
    // const [loading,setloading] = useState(true);
    // useEffect(()=>{
    //     setTimeout(() => {
            
    //     }, timeout);
    // })

    return(
        <>
        <div style={{
            backgroundColor: "#f2f4f7",
        }}>
            <FlightListSearchCard/>
            <div>
                {
                    !returnTripUI?(<div>
                    <Oneway/>
                </div>):(
                    <RoundTrip/>
                )
                
                }
            {/* {travelClass === "Economy" &&(
                !returnTripUI?(<div>
                    <Economy/>
                </div>):(
                    <EconomyReturn/>
                )
                )}
            {travelClass === "Premium Economy" &&(<p>Hi</p>)} */}
            </div>
        </div>
        <LoginPage/>
        </>
    )
}

export default FlightListPage;