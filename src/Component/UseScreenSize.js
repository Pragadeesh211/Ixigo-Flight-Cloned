import { useState, useEffect } from 'react';


const MOBILE_BREAKPOINT = 768; 

const UseScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setIsMobile(currentWidth < MOBILE_BREAKPOINT);
    };

    // Set up the event listener for window resizing
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, isMobile };
};

export default UseScreenSize;