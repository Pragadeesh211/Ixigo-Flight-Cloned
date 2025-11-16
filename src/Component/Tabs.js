import { Link, useLocation } from "react-router-dom";
import React ,{ useRef,useState,useEffect } from "react";
import Flight from "../Images/Flight.png"
import Bus from "../Images/Bus.png"
import Train from "../Images/Train.png"
import Hotel from "../Images/Hotel.png"

const Tabs = () => {
  const menuItems = [
    {id:1,name:"Flights",image:"https://images.ixigo.com/image/upload/Header/2af43f961dddc6cfb02254712f0df058-rbzyb.webp"}, 
    {id:2,name:"Hotels",image:"https://images.ixigo.com/image/upload/Header/2fa9ebf005adc1ed6473d6229aedfaa5-dwtqq.webp"},
    {id:3,name:"Trains",image:"https://images.ixigo.com/image/upload/Header/d2db102bf758f425496336d908a598b8-dttji.webp"},
    {id:4,name:"Buses",image:"https://images.ixigo.com/image/upload/Header/23928375e30875ccd2ba5613aae81763-qqyww.webp"}
  ];
  const location = useLocation();
  const [underlineStyle, setUnderlineStyle] = useState({});
  const liRefs = useRef([]);

 

  const activeIndex = menuItems.findIndex((item) =>
    location.pathname.includes(item.name.toLowerCase())
  );

  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

   useEffect(() => {
    if (liRefs.current[safeActiveIndex]) {
      const li = liRefs.current[safeActiveIndex];
      setUnderlineStyle({
        width: li.offsetWidth,
        left: li.offsetLeft,
      });
    }
  }, [safeActiveIndex,location.pathname]);

  const handlepathchange =(item,index) =>{
    if(index===0){
      return "/"
    }
    else{
      return `/${item.name.toLowerCase()}`
    }
  }
  return (
    <div style={{ padding: "50px",marginTop:20 }}>
    <ul 
    style={{
          listStyle: "none",
          display: "flex",
          gap: 25,
          margin: 0,
          padding: 0,
          position: "relative",
        }}
    >
      {menuItems.map((item, index) => (
        <li
          key={index}
          ref={(el) => (liRefs.current[index] = el)}
           className={safeActiveIndex === index ? "active" : ""}
          style={{ cursor: "pointer", position: "relative", padding: "5px 0" }}
        >
          <Link to={handlepathchange(item,index)}
          style={{ textDecoration: "none", color: "black" }}
          >
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px"
            }}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: "45px", height: "50px" }} 
  /><p style={{
    margin:0,
    color:safeActiveIndex === index ?"black":"#555555",
    fontWeight: safeActiveIndex === index ? "650" : "550",
    fontFamily:"Roboto",
    fontSize:18

  }}>{item.name}</p>
  </div>
  </Link>
        </li>
      ))}
      <span
          style={{
            position: "absolute",
            bottom: 0,
            left: underlineStyle.left || 0,
            width: underlineStyle.width || 0,
            height: 3,
            backgroundColor: "blue",
            borderRadius: 2,
            transition: "all 0.3s ease",
          }}
        ></span>
    </ul>
    </div>
  );
};

export default Tabs;






// import React, { useState, useRef, useEffect } from "react";

// const Tabs = () => {
//   const menuItems = ["Flights", "Hotels", "Trains", "Buses"];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [underlineStyle, setUnderlineStyle] = useState({});
//   const liRefs = useRef([]);

//   useEffect(() => {
//     if (liRefs.current[activeIndex]) {
//       const li = liRefs.current[activeIndex];
//       setUnderlineStyle({
//         width: li.offsetWidth,
//         left: li.offsetLeft,
//       });
//     }
//   }, [activeIndex]);

//   return (
//     <>
//     <div style={{ padding: "50px" }}>
//       <ul
//         style={{
//           listStyle: "none",
//           display: "flex",
//           gap: 25,
//           margin: 0,
//           padding: 0,
//           position: "relative",
//         }}
//       >
//         {menuItems.map((item, index) => (
//           <li
//             key={index}
//             ref={(el) => (liRefs.current[index] = el)}
//             onClick={() => setActiveIndex(index)}
//             style={{ cursor: "pointer", position: "relative", padding: "5px 0" }}
//           >
//             {item}
//           </li>
//         ))}

        
//         <span
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: underlineStyle.left || 0,
//             width: underlineStyle.width || 0,
//             height: 3,
//             backgroundColor: "blue",
//             borderRadius: 2,
//             transition: "all 0.3s ease",
//           }}
//         ></span>
//       </ul>
//     </div>
//     </>
//   );
// };

// export default Tabs;
