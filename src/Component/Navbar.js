import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Button } from "antd";
import Tabs from "./Tabs";
import TopTabs from "./TopTabs";

const Navbar = () => {
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

  return (
    <>
    {scrolled?(<TopTabs/>):(<div className={`navbar`}>
      <div className="logo">GMPM</div>
      
      <div className="right-menu">
        <Button>Log in / Sign up</Button>
      </div>
    </div>)}
    <Tabs/>
    
    </>
  );
};

export default Navbar;
