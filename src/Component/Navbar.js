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

const {Text} = Typography;

const Navbar = () => {
  const dispatch = useDispatch();
  
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
    {scrolled?(<TopTabs/>):(<div className={`navbar`}>
      <div className="logo">GMPM</div>
      <LoginDropdown/>
      
    </div>)}
    <Tabs/>
    
    </>
  );
};

export default Navbar;
