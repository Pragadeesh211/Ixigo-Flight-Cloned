import { Card, Menu,Button,Input, DatePicker, Carousel,Row,Col,Divider,Typography,Collapse } from "antd";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Component/Navbar";
import Tabs from "../../Component/Tabs"

import dayjs from "dayjs"
import { DownOutlined,UpOutlined } from "@ant-design/icons";
import CardCarousel from "../../Component/Carousel";
import { image } from "fontawesome";
import FlightTabs from "../../Component/FlightTabs";
import FlightSearchCard from "../../Component/FlightSearchCard";
import LoginPage from "../../Component/LoginPage";
import "../../Component/FlightSearchCard.css";
import useScreenSize from "../../Component/UseScreenSize";

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const { Text, Link } = Typography;
const {Panel} = Collapse;

const flightData = [
  {
    id: 1,
    title: "Mumbai Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/dc24e926a99e52461efb8d18f7997ef8-mrphc.webp",
    destinations: ["Goa", "Delhi", "Bangalore", "Ahmedabad"],
  },
  {
    id: 2,
    title: "Delhi Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/5045a405f1c4dc160abb069992707481-mtvgf.webp",
    destinations: ["Mumbai", "Goa", "Bangalore", "Pune"],
  },
  {
    id: 3,
    title: "Kolkata Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/7ae33a491397e9e25bc483c319db02ac-irvie.webp",
    destinations: ["Mumbai", "Delhi", "Bangalore", "Bagdogra"],
  },
  {
    id: 4,
    title: "Chennai Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/d189a6d913d42962e07dfc924d456118-kyimy.webp",
    destinations: ["Mumbai", "Delhi", "Madurai", "Coimbatore"],
  },
  {
    id: 5,
    title: "Hyderabad Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/a5d4c86e624150e31f81469824653223-rihzk.webp",
    destinations: ["Mumbai", "Goa", "Bangalore", "Delhi"],
  },
  {
    id: 6,
    title: "Bangalore Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/a243c27c42a89fd0ee5a5d4f56e9c6f1-jzcgw.webp",
    destinations: ["Mumbai", "Delhi", "Goa", "Hyderabad"],
  },
  {
    id: 7,
    title: "Ahmedabad Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/f3e32516219efd2fbfd2c0828b286616-qnoxi.webp",
    destinations: ["Mumbai", "Delhi", "Bangalore", "Goa"],
  },
  {
    id: 8,
    title: "Pune Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/2fc754645e39a6eda0a659881c1487ca-lzhpq.webp",
    destinations: ["Mumbai", "Hyderabad", "Delhi", "Goa"],
  },
  {
    id: 9,
    title: "Goa",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100/home/8cd662828d6fe2d32765d398648cf4d6-djmjf.webp",
    destinations: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
  },
];

const Flights = () => {


  const [visibleCount, setVisibleCount] = useState(6);
  const showMore = visibleCount < flightData.length;
  const {isMobile} = useScreenSize();

 


  //Airlines

  const airlines = [
    {id:1,name:"IndiGo",image:"https://images.ixigo.com/img/common-resources/airline-new/6E.png"},
    {id:2,name:"Air India",image:"https://images.ixigo.com/img/common-resources/airline-new/AI.png"},
    {id:3,name:"Air India Express",image:"https://images.ixigo.com/img/common-resources/airline-new/IX.png"},
    {id:4,name:"Akasa Air",image:"https://images.ixigo.com/img/common-resources/airline-new/QP.png"},
    {id:5,name:"Alliance Air",image:"https://images.ixigo.com/img/common-resources/airline-new/9I.png"},
    {id:6,name:"SpiceJet",image:"https://images.ixigo.com/img/common-resources/airline-new/SG.png"},
  ]

  const frequentData=[
    {
      id:1,
      header:"What is your refund policy?",
      para:"Refunds are available up to 24 hours before your booking date. Please contact our support team for assistance."
    },
    {
      id:2,
      header:"Can I change my travel date after booking?",
      para:"Yes, you can modify your travel date subject to availability and airline policies."
    },
    {
      id:3,
      header:"Do I need to print my ticket?",
      para:"No, you can show your e-ticket on your mobile device during check-in."
    },
  ]

 

  return (
    <>
    {isMobile ?(
      <>
      <div style={{ display: "flex", justifyContent: "center",height:"auto",marginTop:100 }}>
            <Card variant="borderless"
              style={{
                width: "95%", boxShadow: "0 0 15px 3px rgba(0, 0, 0, 0.25)",
              }} className="search-card">
                <FlightSearchCard/>
              </Card>
    </div>
      <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto"
      }}>Today's Flight Offers</h2>
    
    <CardCarousel/>
    </div>

    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto"
      }}>Popular Flight Routes</h2>
       <div style={{ width: "95%", margin: "auto", }}>
      <Row gutter={[24, 24]} justify="center">
        {flightData.slice(0, visibleCount).map((flight) => (
          <Col key={flight.id} xs={24} sm={12} md={8}>
            <Card
              
              bordered
              style={{
                borderRadius: "16px",
                height: "auto",
                border: "1px solid #d9d9d9",
              }}
              bodyStyle={{ display: "flex",
            alignItems: "flex-start",
            padding: 0,
           }}
            >
              <img
                src={flight.img}
                alt={flight.title}
                style={{
                  width: "60px",
                  height: "70px",
                  // objectFit: "cover",
                  borderTopLeftRadius:"16px",
                  borderBottomLeftRadius:"16px",
                  
                }}
              />
              <div style={{marginLeft:"16px",marginTop:"10px"}}>
                <Text strong style={{ fontSize: "16px", display: "block",fontFamily:"Roboto" }}>
                  {flight.title}
                </Text>
                <Text type="secondary" style={{fontWeight:400,fontSize:"14px",fontFamily:"Roboto"}}>To: </Text>
                {flight.destinations.map((city, idx) => (
                  <Link
                    
                    key={idx}
                    style={{ color: "#0056D2", marginRight: 6,fontSize:"14px",fontFamily:"Roboto" }}
                    href="#"
                  >
                    {city}
                    {idx !== flight.destinations.length - 1 && " •"}
                  </Link>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* View More Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          type="link"
          onClick={() =>
            showMore
              ? setVisibleCount(flightData.length)
              : setVisibleCount(6)
          }
          style={{
            color: "#ff6600",
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          {showMore ? (
            <>
              View More <DownOutlined />
            </>
          ) : (
            <>
              View Less <UpOutlined />
            </>
          )}
        </Button>
      </div>
    </div>
    </div>

    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto"
      }}>Popular Domestic Airlines</h2>
      <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
      <Card style={{
        border: "1px solid #d9d9d9",
        gap:"15px",
        borderRadius:"20px",
        width:"95%",
        
      }} >
    <Row justify="center"  gutter={[16, 16]} style={{
      display:"flex",
      alignItems:"center",
      flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    }}>
      {airlines.map((item, index)=>(
        <Col span={4}
        key={index}
        xs={12} sm={2} md={4}
        style={{
          display:"flex",
          alignItems:"center",
          flexDirection:"column"
        }}
        >
          <img src={item.image}
          style={{
            height:40,
            width:40
          }}
          >
          </img>
          <p style={{
            fontWeight:500,
            fontSize:16,
            color:"blue"
          }}>{item.name}</p>
        </Col>
      ))}
  
</Row>
      </Card>
      </div>
    </div>

    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto",
        
      }}>Frequently Asked Questions</h2>
      <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>

      
       <Collapse
          accordion
          bordered={true}
          expandIconPosition="end"
          expandIcon={({ isActive }) =>
            isActive ? <UpOutlined /> : <DownOutlined />
          }
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            width:"95%"
            
    
          }}
          
        >
          {frequentData.map((item,index)=>(
            <Panel key={index}
            header={item.header}
            style={{fontSize:"18px",fontWeight:650,fontFamily:"Roboto"}}
            >
            
            <p style={{fontSize:"15px",fontWeight:500,fontFamily:"Roboto",color:"grey"}}>
              {item.para}
            </p>
            </Panel>
          ))}
          
        </Collapse>
        
        </div>
    </div>

    <div style={{
      width:"100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#e9e9e9ff",
      marginTop:"20px"
    }}>
      <div style={{
        display: "flex",
        width: "95%",
        
        
      }}>
      <FlightTabs/>
      </div>

     
    </div>
      </>
    ):(
      <>

    <div style={{ display: "flex", justifyContent: "center",height:"200px" }}>
            <Card variant="borderless"
              style={{
                width: "95%", boxShadow: "0 0 15px 3px rgba(0, 0, 0, 0.25)",
              }} className="search-card">
                <FlightSearchCard/>
              </Card>
    </div>
    
    
    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto"
      }}>Today's Flight Offers</h2>
    
    <CardCarousel/>
    </div>

    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto"
      }}>Popular Flight Routes</h2>
       <div style={{ width: "95%", margin: "auto", }}>
      <Row gutter={[24, 24]} justify="center">
        {flightData.slice(0, visibleCount).map((flight) => (
          <Col key={flight.id} xs={24} sm={12} md={8}>
            <Card
              
              bordered
              style={{
                borderRadius: "16px",
                height: "auto",
                border: "1px solid #d9d9d9",
              }}
              bodyStyle={{ display: "flex",
            alignItems: "flex-start",
            padding: 0,
           }}
            >
              <img
                src={flight.img}
                alt={flight.title}
                style={{
                  width: "60px",
                  height: "70px",
                  // objectFit: "cover",
                  borderTopLeftRadius:"16px",
                  borderBottomLeftRadius:"16px",
                  
                }}
              />
              <div style={{marginLeft:"16px",marginTop:"10px"}}>
                <Text strong style={{ fontSize: "16px", display: "block",fontFamily:"Roboto" }}>
                  {flight.title}
                </Text>
                <Text type="secondary" style={{fontWeight:400,fontSize:"14px",fontFamily:"Roboto"}}>To: </Text>
                {flight.destinations.map((city, idx) => (
                  <Link
                    
                    key={idx}
                    style={{ color: "#0056D2", marginRight: 6,fontSize:"14px",fontFamily:"Roboto" }}
                    href="#"
                  >
                    {city}
                    {idx !== flight.destinations.length - 1 && " •"}
                  </Link>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* View More Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          type="link"
          onClick={() =>
            showMore
              ? setVisibleCount(flightData.length)
              : setVisibleCount(6)
          }
          style={{
            color: "#ff6600",
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          {showMore ? (
            <>
              View More <DownOutlined />
            </>
          ) : (
            <>
              View Less <UpOutlined />
            </>
          )}
        </Button>
      </div>
    </div>
    </div>

    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto"
      }}>Popular Domestic Airlines</h2>
      <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
      <Card style={{
        border: "1px solid #d9d9d9",
        gap:"15px",
        borderRadius:"20px",
        width:"95%",
        
      }} >
    <Row justify="center"  gutter={[16, 16]} style={{
      display:"flex",
      alignItems:"center",
      flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    }}>
      {airlines.map((item, index)=>(
        <Col span={4}
        key={index}
        xs={12} sm={2} md={4}
        style={{
          display:"flex",
          alignItems:"center",
          flexDirection:"column"
        }}
        >
          <img src={item.image}
          style={{
            height:40,
            width:40
          }}
          >
          </img>
          <p style={{
            fontWeight:500,
            fontSize:16,
            color:"blue"
          }}>{item.name}</p>
        </Col>
      ))}
  
</Row>
      </Card>
      </div>
    </div>

    <div>
      <h2 style={{
        display: "flex",
        width: "95%",
        margin: "30px auto",
        fontFamily:"Roboto",
        
      }}>Frequently Asked Questions</h2>
      <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>

      
       <Collapse
          accordion
          bordered={true}
          expandIconPosition="end"
          expandIcon={({ isActive }) =>
            isActive ? <UpOutlined /> : <DownOutlined />
          }
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            width:"95%"
            
    
          }}
          
        >
          {frequentData.map((item,index)=>(
            <Panel key={index}
            header={item.header}
            style={{fontSize:"18px",fontWeight:650,fontFamily:"Roboto"}}
            >
            
            <p style={{fontSize:"15px",fontWeight:500,fontFamily:"Roboto",color:"grey"}}>
              {item.para}
            </p>
            </Panel>
          ))}
          
        </Collapse>
        
        </div>
    </div>

    <div style={{
      width:"100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#e9e9e9ff",
      marginTop:"20px"
    }}>
      <div style={{
        display: "flex",
        width: "95%",
        
        
      }}>
      <FlightTabs/>
      </div>

     
    </div>
    
    <h3 style={{marginTop:10}}></h3>
    <LoginPage/>
    </>
    )}
    </>
    
  );
};

export default Flights;
