import React, {useState, useEffect} from "react";
import "./Navbar.css";
import Tabs from "./Tabs";
import { Button } from "antd";

const TopTabs = () =>{
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

      return(
        <>
        <div className={`navbar ${scrolled ? "navbar" : ""}`}>
      <div className="logo">GMPM</div>
      <Tabs/>
      <div className="right-menu">
        
        <Button>Log in / Sign up</Button>
      </div>
    </div>
        </>
      )
    
}
export default TopTabs;