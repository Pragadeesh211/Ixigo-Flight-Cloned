import React,{useEffect, useState} from "react";
import { Button, message, Steps, theme, ConfigProvider,Dropdown,Space,Typography } from 'antd';
import ReviewTravellerDetails from "../Container/Flights/ReviewTravellerDetails";
import "./PageSelect.css"
import CircleTick from "../Images/CircleTick.png"
import {
  setOpenDrawer,
  setPhoneNo,
} from "../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import AddOns from "../Container/Flights/AddOns";


const {Text} = Typography;

const PageSelectionTabs = () =>{

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    openDrawer,
    phoneNo,
    name
  } = useSelector((state) => state.profile);
  const {
    currentState
  } = useSelector((state) => state.flightSearch);

  const [open,setOpen] = useState(false)
    const steps = [
  {
    title: 'Flight Selection',
    content: 'Flight Selection',
  },
  {
    title: 'Review & Traveller Details',
    content: <ReviewTravellerDetails/>,
  },
  {
    title: 'Add-ons',
    content: <AddOns/>,
  },
  {
    title: 'Payment',
    content: 'Payment',
  },
];
const [current, setCurrent] = useState(currentState);
const { token } = theme.useToken();
useEffect(()=>{
setCurrent(currentState)
},[currentState])
  

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((step, index) => ({
  key: step.title,
  title: step.title,
  // status: current === index ? "process" : null,
   
}));

const handleOpen = () =>{
  dispatch(setOpenDrawer(true))
}

   return(
        <>
        
        <div className={"navbarSteps"} style={{
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
      <div className="logo">GMPM</div>
      
        <div style={{display:"flex",justifyContent:"space-between",gap:5 }}>
            
      

    <div className="steps-container">
      {steps.map((step, index) => {
        const isCompleted = index < current;
        const isActive = index === current;

        return (
          <div key={index} className="step-item">
            {/* COMPLETED STEP (BLUE TICK) */}
            {isCompleted ? (
              <svg
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="step-tick"
              >
                <path
                  fillRule="evenodd"
                  d="M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9m-4.6559-2.7172a.75.75 0 0 1 0 1.0607l-2.5688 2.518-2.5 2.5a.75.75 0 0 1-1.0519.0086l-2.5525-2.4913a.7501.7501 0 0 1 1.043-1.0779l2.0224 1.9782 1.9783-1.9782 2.5688-2.518a.75.75 0 0 1 1.0607 0"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              /* ACTIVE + INACTIVE CIRCLES */
              <div
                className={`step-circle ${
                  isActive ? "active-circle" : "inactive-circle"
                }`}
              >
                <p
                  className={`step-number ${
                    isActive ? "active-text" : "inactive-text"
                  }`}
                >
                  {index + 1}
                </p>
              </div>
            )}

            {/* TITLE */}
            <p
              className={`step-title ${
                isActive
                  ? "title-active"
                  : isCompleted
                  ? "title-completed"
                  : "title-inactive"
              }`}
            >
              {step.title}
            </p>

            {/* DIVIDER */}
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        );
      })}
    </div>
 

            </div>
            <LoginDropdown/>
      
      

        </div>
        
        </>
    )
}
export default PageSelectionTabs;

{/* <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}