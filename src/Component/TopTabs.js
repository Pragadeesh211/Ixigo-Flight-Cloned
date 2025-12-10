import React, {useState, useEffect} from "react";
import "./Navbar.css";
import Tabs from "./Tabs";
import {Typography} from "antd";
import {
  setOpenDrawer
} from "../Redux/Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginDropdown from "./LoginDropdown";

const {Text} = Typography;

const TopTabs = () =>{
  const dispatch = useDispatch();

  const {
    openDrawer
  } = useSelector((state) => state.profile);
    const [scrolled, setScrolled] = useState(false);

    const handleOpen = () =>{
      dispatch(setOpenDrawer(true))
    }
    
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

      return(
        <>
        <div className={`navbar ${scrolled ? "navbar" : ""}`}>
      <div><img src="https://images.ixigo.com/image/upload/Header/aac1498d8f956aa99344f08773c70fb6-evncq.webp" style={{
        height:40
      }}/></div>
      <Tabs/>
      <LoginDropdown/>
    </div>
        </>
      )
    
}
export default TopTabs;