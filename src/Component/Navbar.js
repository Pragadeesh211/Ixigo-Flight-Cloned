import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Tabs from "./Tabs";
import TopTabs from "./TopTabs";
import {Typography} from "antd";
import CircleTick from "../Images/CircleTick.png"
import {
  setOpenDrawer
} from "../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginDropdown from "./LoginDropdown";
import useScreenSize from "./UseScreenSize";

const {Text} = Typography;

const Navbar = () => {
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();
  
    const {
      openDrawer
    } = useSelector((state) => state.profile);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () =>{
    dispatch(setOpenDrawer(true))
  }

  return (

    <>
    {isMobile ?(
      <>
        <div className="mob-navbar">
          <img src="https://images.ixigo.com/image/upload/Header/aac1498d8f956aa99344f08773c70fb6-evncq.webp" style={{
        height:40
      }}/>
      <LoginDropdown/>
        </div>
        <div>
          <Tabs/>
        </div>
      </>
    ):(
      <>
      {scrolled?(<TopTabs/>):(<div className={`navbar`}>
      <div><img src="https://images.ixigo.com/image/upload/Header/aac1498d8f956aa99344f08773c70fb6-evncq.webp" style={{
        height:40
      }}/></div>
      <LoginDropdown/>
      
    </div>)}
    <Tabs/>
      </>
    )}
    
    
    </>
  );
};

export default Navbar;
