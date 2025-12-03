import React, { useEffect, useState } from "react";
import PageSelectionTabs from "../../Component/PageSelectionTabs";
import { Card, Typography, Input, Button, Radio, Space, ConfigProvider, Drawer, Tooltip, Col,Row } from "antd";
import { RightOutlined, CloseOutlined,CheckOutlined } from "@ant-design/icons";
import {
  setOpenDrawer,
  setPhoneNo
} from "../../Redux/Slices/ProfileSlice";
import { setOnewaySelectedFlight, setTotalAmount } from "../../Redux/Slices/FlightSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../../Component/LoginPage";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Cabin from "../../Images/Cabin.png";
import CheckIn from "../../Images/Chech-in.png";
import AirlineSeat from "../../Images/AirlineSeat.png"
import FlightEngineFilledIcon from "../../Images/FlightEngineFilledIcon.png"
import FlightTicketFilledIcon from "../../Images/FlightTicketFilledIcon.png"
import FlightTakeoffFilledIcon from "../../Images/FlightTakeoffFilledIcon.png"
import NoFoodIcon from "../../Images/NoFoodIcon.png"
import WifiOffIcon from "../../Images/wifi.png"
import NoPowerIcon from "../../Images/NoPowerIcon.png"
import NoVideoIcon from "../../Images/NoVideoIcon.png"
import OnewayFlightDetails from "../../Component/OnewayFlightDetails";
import ReturnFlightDetails from "../../Component/ReturnFlightDetails";

dayjs.extend(duration);

const { Text } = Typography;

const ReviewTravellerDetails = () => {
  const [promoCodeValue, setPromoCodeValue] = useState("")
  const [promoCodeValue2, setPromoCodeValue2] = useState("")
  const [radioValue, setRadioValue] = useState(0);
  const [viewOffers, setViewOffers] = useState(false);
  const dispatch = useDispatch();
  const {
    openDrawer,
    phoneNo
  } = useSelector((state) => state.profile);
  const {
    from,
  fromAirport,
  to,
  fromCode,
  toCode,
  fromCity,
  toCity,
  toAirport,
  returnTrip,
  returnTripUI,
  departure,
  returnDate,
  travellers,
  travellerValue,
  travelClass,
    onewaySelectedFlight,
    returnSelectedFlight,
    totalAmount,
    cancelFeeAdd,
    rescheduleFeeAdd,
    refundFeeAdd
  } = useSelector((state) => state.flightSearch);

  // console.log("sddfrafoi", radioValue)

  
 
  

  const promoOffer = [
    {
      id: 1,
      name: "SALE",
      amount: 650,
      descriptions: "Coupon applied! Enjoy an instant discount of ₹650 and receive a Hotel discount code after your booking."
    },
    {
      id: 2,
      name: "IXKOTAKRD",
      amount: 668,
      descriptions: "Get Flat 10% Off up to ₹1,200 with Kotak Retail Credit Card+Interest Free EMI. Receive a Hotel discount code after your booking."
    },
    {
      id: 3,
      name: "IPHONE17",
      amount: 0,
      descriptions: "Get a chance to win brand new iPhone 17 post this booking. Receive a Hotel discount code after your booking."
    },
    {
      id: 4,
      name: "IXRBLEMI",
      amount: 802,
      descriptions: "Get Flat 12% Off up to ₹1,500 with RBL Bank Credit Card + Interest Free EMI. Receive a Hotel discount code after your booking."
    }
  ]

  const [promoOfferList, setPromoOfferList] = useState(promoOffer);


  const handleRadioValue = (idx) =>{
    if(phoneNo === null && setRadioValue !== 0)
      return dispatch(setOpenDrawer(true))
  
      const updated = moveToTop(promoOfferList, idx);
      setPromoOfferList(updated);
      
    
    
    // setRadioValue(idx)
  }

  console.log("items show",promoOfferList[0].amount)

  const moveToTop = (data,index) =>{
    const selected = data[index];
    const newarr = [...data];
    newarr.splice(index,1);
    newarr.unshift(selected)
    setRadioValue(0)
    return newarr
  }
  
  
  const formatDate = (date) => {
    if (!date) return { day: "", month: "", weekday: "" };
    const d = dayjs(date);
    return {
      day: d.format("DD"),
      month: d.format("MMM"),
      weekday: d.format("ddd"),
    };
  };

  const [tempBase,setTempBase] = useState(0);
  const [tempTax,setTempTax] = useState(0);

  console.log("total", totalAmount)

  
  const slashAmount = totalAmount;
  const CalculateFullAmount = () =>{
          const a = onewaySelectedFlight[0]?.fareOptions?.[travelClass]?.price || 0;
          const b = returnSelectedFlight[0]?.fareOptions?.[travelClass]?.price || 0;
          if (travellerValue > 1) {
              return dispatch(setTotalAmount((a + b) * travellerValue));
            }

            dispatch(setTotalAmount(a + b));
        }
  
        
  
        useEffect(() => {
          CalculateFullAmount();
          ;
        }, [onewaySelectedFlight, returnSelectedFlight]); 

  
    
  const baseFare = Math.ceil(totalAmount / 1.34); 
  

  const tax = totalAmount - baseFare;

  const finalAmount = totalAmount - promoOfferList[0].amount

  const now = new Date();
const time = now.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const [currentTime,setCurrentTime] = useState(time)

const [lessday,setLessDay] = useState()

const [cancelLess,setcancelLess] = useState(0)
                 
         
                 const get8HrsCancelTime = (departureTime) =>{
                    if (!departureTime) return { finalTime: "00:00", days: 0 };

                     const [h1, m1] = departureTime.split(":").map(Number);
                     const t2= "08:00";
                     const [h2, m2] = t2.split(":").map(Number);
         
                     let totalMinutes1 = h1 * 60 + m1;
                     let totalMinutes2 = h2 * 60 + m2;
         
                     let diff = totalMinutes1 - totalMinutes2;
         
                     
                     const days = Math.floor(diff / (24 * 60));
                     
                     diff = diff % (24 * 60);
         
                     
                     if (diff < 0) diff += 24 * 60;
         
                     const hours = Math.floor(diff / 60);
                     const minutes = diff % 60;
         
                     const finalTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
         
         
                     return { finalTime, days };
                     
                   }

                   const [lessReturnday,setLessReturnDay] = useState() 
                   const get8HrsCancelReturnTime = (departureTime) =>{
            const [h1, m1] = departureTime.split(":").map(Number);
            const t2= "08:00";
            const [h2, m2] = t2.split(":").map(Number);

            let totalMinutes1 = h1 * 60 + m1;
            let totalMinutes2 = h2 * 60 + m2;

            let diff = totalMinutes1 - totalMinutes2;

            
            const days = Math.floor(diff / (24 * 60));
            
            diff = diff % (24 * 60);

            
            if (diff < 0) diff += 24 * 60;

            const hours = Math.floor(diff / 60);
            const minutes = diff % 60;

            const finalTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;


            return { finalTime, days };
          }
                   const dep = formatDate(departure)
                   const ret = formatDate(returnDate)
                   const lessdep = formatDate(lessday);
                   const lessret = formatDate(lessReturnday);
  
  useEffect(()=>{
    if(refundFeeAdd){
      get8HrsCancelTime(onewaySelectedFlight[0]?.departureTime)
      get8HrsCancelReturnTime(returnSelectedFlight[0]?.departureTime)
    }
    
  })

  useEffect(() => {
    if (!onewaySelectedFlight[0]?.departureTime) return;
  
    const { finalTime, days } = get8HrsCancelTime(onewaySelectedFlight[0]?.departureTime);
  
    const newDate = dayjs(departure).add(days, "day").format("YYYY-MM-DD");
    setLessDay(newDate);

    
    setcancelLess(finalTime)
  
  }, [onewaySelectedFlight[0]?.departureTime]); 

  useEffect(() => {
              if (!returnSelectedFlight[0]?.departureTime) return;
            
              const { finalTime, days } = get8HrsCancelReturnTime(returnSelectedFlight[0]?.departureTime);
            
              const newDate = dayjs(returnDate).add(days, "day").format("YYYY-MM-DD");
              setLessReturnDay(newDate);
            
            }, [returnSelectedFlight[0]?.departureTime]);
  
  
  console.log("return check",returnSelectedFlight[0]?.stops)

  const returnFlight = returnSelectedFlight?.[0];

  return (
    <>
      <div
        style={{
          backgroundColor: "#4f4f4f14",
          paddingTop: "70px",
          paddingBottom: "180px"
        }}
      >
        <div
          style={{
            display:"flex",
            flexDirection:"row",
            padding:20,
            gap:30,
            alignItems: "flex-start",
            justifyContent:"space-between"
          }}
        >
          {/* Left Card */}
          <Col>
          <div style={{
            display:"flex",
            background:"#fff",
            // width:"28%",
           padding:20,borderRadius:20,
           paddingBottom:"60px",
           maxHeight:"auto",
           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}>
            <div
                        
                      >
                        <Text style={{
                          fontSize: "24px",
                          fontWeight: 700
                        }}>Offers For You</Text>
            
                        <div
                          style={{
                            height: "45px",
                            border: "1px solid #8a8a8a",
                            marginTop: 10,
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            background: "#fff",
                          }}
                        >
                          <Input
                            placeholder="Have a promocode? Redeem here"
                            variant="borderless"
                            style={{
                              fontSize: "16px",
                              fontWeight: 500,
                              width: 300,
                            }}
                            value={promoCodeValue}
                            onChange={(e) => {
                              const text = e.target.value || "";
                              setPromoCodeValue(text.toLocaleUpperCase());
                            }}
                          />
            
                          {promoCodeValue ? (
                            <button
                              style={{
                                color: "#0770e4",
                                border: "none",
                                background: "none",
                                fontSize: "16px",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              Apply
                            </button>
                          ) : null}
                        </div>
                        <div style={{
                          marginTop: 15,
                          borderBottom: "1px solid #b8b8bcff"
                        }}>
                          <Radio.Group
                            value={radioValue}
            
                            style={{ color: "black" }}
                          >
                            <Space direction="vertical">
                              {promoOfferList.map((item, idx) => (
            
                                idx <= 2 && (
                                  <div key={idx} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
            
                                  }}>
                                    <div style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      padding: "5px 0",
                                      justifyContent: "space-between",
                                      width: 395
                                    }}>
                                      <>
                                        <style>
                                          {`
                            .custom-radio .ant-radio-inner {
                                border: 1px solid #848794 !important;
                            }
            
                            .custom-radio.ant-radio-wrapper-checked .ant-radio-inner {
                                border: 1px solid #0770e4 !important; /* selected border (blue) */
                            }
                            `}
                                        </style>
            
                                        <ConfigProvider>
                                          <Radio value={idx} className="custom-radio" style={{
                                            fontSize: "16px",
                                            fontWeight: 600, textTransform: "uppercase", fontFamily: "Roboto"
                                          }}
                                            onChange={() => handleRadioValue(idx)}>
                                            {item.name}
                                          </Radio>
                                        </ConfigProvider>
                                      </>
            
                                      <div style={{
                                        flex: 1, textAlign: "end"
                                      }}>{item.amount >= 0 ? (<Text style={{
                                        fontSize: "14px", fontWeight: 700
                                      }}>{item?.amount > 0 && `₹${item.amount} Off`}  </Text>) : null} 
                                      </div>
            
                                    </div>
                                    <Text style={{
                                      position: "relative",
                                      left: 25,
                                      width: 360,
                                      color: radioValue === idx ? "green" : "black",
                                      fontFamily: "Roboto",
                                      fontSize: 14.5,
                                      bottom: 10
                                    }}>
                                      {item.descriptions}
                                    </Text>
                                  </div>)
                              )
                              )}
            
                            </Space>
                          </Radio.Group>
            
            
            
            
            
                        </div>
                        <button
                          style={{
                            color: "#fc790d",
                            border: "none",
                            background: "none",
                            fontSize: "15px",
                            fontWeight: 500,
                            cursor: "pointer",
                            position: "relative",
                            top: 20,
                            textAlign:"start"
            
                          }}
                          onClick={()=>
                            setViewOffers(true)
                          }
                        >
                          View All Offer <RightOutlined style={{
                            fontSize: "13px", position: "relative", top: 1
                          }} />
                        </button>
                      </div>
          </div>
          <div style={{
            background: "#fff",
            marginTop: 30,
            padding: 20,
            borderRadius: 20,
            paddingBottom: "30px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}>
          
            <Row style={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%", 
          }}>
           
            <Text style={{
              fontSize:24,fontWeight:700
            }}>Fare Summary</Text> 
            
            
            <Text style={{
              fontSize:14,fontWeight:500,marginTop:5,color:"#5e616e"
            }}>
              {travellerValue === 1
                              ? `${travellerValue} Traveller`
                              : `${travellerValue} Travellers`}
              </Text> 
          </Row>
          <Row style={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%",marginTop:8 
          }}>
           
            <Text style={{
              fontSize:16,fontWeight:500
            }}>Fare Type</Text> 
            
            
            <Text type="secondary" style={{
              fontSize:16,fontWeight:600,color:"#238c46"
            }}>
              Partially Refundable
              </Text> 
          </Row>
          <Row style={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%", marginTop:8
          }}>
           
            <Text style={{
              fontSize:16,fontWeight:500
            }}>Base Fare</Text> 
            
            
            <Text style={{
              fontSize:16,fontWeight:600
            }}>
              ₹{baseFare.toLocaleString("en-IN")}
              </Text> 
          </Row>
          <Row style={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%", marginTop:8,borderBottom:"1px solid #dcd3d3ff",paddingBottom:"10px"
          }}>
           
            <Text style={{
              fontSize:16,fontWeight:500
            }}>Taxes & Fees</Text> 
            
            
            <Text style={{
              fontSize:16,fontWeight:600
            }}>
              ₹{tax.toLocaleString("en-IN")}
              </Text> 
          </Row>
          {promoOfferList[0].amount !== 0?(<Row style={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%", marginTop:8,borderBottom:"1px solid #dcd3d3ff",paddingBottom:"10px"
          }}>
           
            <Text style={{
              fontSize:16,fontWeight:500
            }}>Instant Off</Text> 
            
            
            <Text style={{
              fontSize:16,fontWeight:600,color:"#238c46"
            }}>
              -₹{promoOfferList[0].amount.toLocaleString("en-IN")}
              </Text> 
          </Row>):null}
          <Row style={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%", marginTop:8
          }}>
           
            <Text style={{
              fontSize:17,fontWeight:700
            }}>Total Amount</Text> 
            
            
            <Text style={{
              fontSize:17,fontWeight:700
            }}>
              ₹{finalAmount.toLocaleString("en-IN")}
              </Text> 
          </Row>
          </div>
          <div style={{
            marginTop:10,padding:25
          }}>
            <Text style={{
              fontSize:16,fontWeight:500,fontFamily:"Roboto"
            }}>
              By clicking on continue, I confirm that I have read, understood, and agree with the Fare Rules, Privacy Policy and Terms of Use.
            </Text>
          </div>
          </Col> 

          {/* Right Section */}
          <Col>
          <div style={{
            display:"flex",
            background:"#fff",
            width:"980px",
           padding:15,borderRadius:20,
           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          //  marginBottom: -150,
          }}>
            <div
            
            
          >
            {!returnTripUI?(<OnewayFlightDetails/>):(
              <div>
              <div style={{       width:"980px",
                                  borderBottom: "1px solid #ccccccff",
                                  paddingBottom:30
                                }}>
                                 <OnewayFlightDetails/>
                                </div>
              
                                  <div style={{
                                    marginTop:20,
                                     marginBottom: returnFlight?.stops === "1 stop" ? -200 : 0,
                                  }}>
                                    <ReturnFlightDetails/>
                                  </div>
                                  </div>
          )}
            
          </div>

          </div>
          <div style={{
            display:"flex",
            background:"#fff",
            width:"980px",
           padding:20,borderRadius:20,
           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
           marginTop:25,flexDirection: "column"
           
          }}>
           
                <Text style={{
              fontSize:24,fontWeight:700
            }}>
              Refund on Cancellation
            </Text>
            <br/>
            <Text style={{
              fontWeight:600,fontSize:16
            }}>
              {fromCode} - {toCode}
            </Text>
           {refundFeeAdd?(
            <div>
              <div style={{
                display:"flex",
                justifyContent:"space-between",
                width:"60%",
                alignItems:"center",
                position:"relative",
                top:25,
                left:"20%"
              }}>
                <div style={{
                  textAlign:"center"
                }}>
                <Text style={{
                  fontWeight:500,
              fontSize:"15px",
                }}>
                  Full refund of ₹{onewaySelectedFlight[0]?.fareOptions?.[travelClass]?.price.toLocaleString("en-IN")}
                </Text>
                
                
                </div>
                <div>
                <Text style={{
                  fontWeight:500,
              fontSize:"15px",
              textAlign:"center"
                }}>Non Refundable</Text>
                </div>
              </div>
              <div style={{
                display:"flex",
                flexDirection:"column",
                
              }}>
                <div style={{
            
            marginTop:"50px",
            textAlign:"center",
            height:"4px",
            width:"60%",
            backgroundImage:"linear-gradient(to right, rgb(43, 153, 80), rgb(238, 154, 153))"
          }}>
            </div>
            <div style={{
            position:"relative",
            // marginTop:"10px",
            textAlign:"center",
            height:"4px",
            width:"50%",
            backgroundImage:"linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))",
            left:"50%",
            bottom:4
          }}></div>
              </div>
              
            
              
          
          
          <div style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
            <div>
            <div style={{
              background:"rgb(107, 184, 133)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              right:7,
              bottom:21
            }}>
            <img src={FlightTicketFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            <div style={{
              background:"rgb(231, 114, 112)",
              height:"15px",
              width:"15px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              left:485,
              bottom:44
            }}></div>
            
            
            </div>
            
            <div>
            
            <div style={{
              background:"rgb(220, 53, 50)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              // left:50,
              bottom:21
            }}>
            <img src={FlightTakeoffFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            
            </div>
            
          </div>
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            position:"relative",
            bottom:18
          }}>
            <div style={{
              flex:1,
              textAlign:"left",
              position:"relative",
              right:6,
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Now
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{currentTime}</Text>
            </div>
            <div style={{
              flex:1,
              textAlign:"center",
              position:"relative",
              left:5,
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              {lessdep.day} {lessdep.month}
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              fontSize:"12px",
              //before 8
            }}>{cancelLess}</Text>
            </div>
            <div style={{
              flex:1,
              textAlign:"right",
              position:"relative",
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Departure
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{dep.day} {dep.month}, {onewaySelectedFlight[0]?.departureTime}</Text>
            </div>
          </div>
          </div>
          ):(
            <div>
          <div style={{
            flex:1,
            marginTop:"50px",
            textAlign:"center",
            height:"4px",
            width:"98%",
            backgroundImage:"linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))"
          }}>
            <Text style={{fontWeight:500,
              fontSize:"15px",
              position:"relative",
              textAlign:"center",
              bottom:35}}>Non Refundable</Text>
              
          </div>
          <div style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
            <div>
            <div style={{
              background:"rgb(231, 114, 112)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              right:7,
              bottom:17
            }}>
            <img src={FlightTicketFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            <div style={{
              flex:1,
              textAlign:"left",
              position:"relative",
              right:6,
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Now
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{currentTime}</Text>
            </div>
            </div>
            
            <div>
            
            <div style={{
              background:"rgb(220, 53, 50)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              left:40,
              bottom:18
            }}>
            <img src={FlightTakeoffFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            <div style={{
              flex:1,
              textAlign:"right",
              position:"relative",
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Departure
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{dep.day} {dep.month}, {onewaySelectedFlight[0]?.departureTime}</Text> 
            </div>
            </div>
          </div>
          </div>
          )}

          {returnTripUI && (
            <div>
              <Text style={{
              fontWeight:600,fontSize:16
            }}>
              {toCode} - {fromCode} 
            </Text>
            {refundFeeAdd?(
            <div>
              <div style={{
                display:"flex",
                justifyContent:"space-between",
                width:"60%",
                alignItems:"center",
                position:"relative",
                top:25,
                left:"20%"
              }}>
                <div style={{
                  textAlign:"center"
                }}>
                <Text style={{
                  fontWeight:500,
              fontSize:"15px",
                }}>
                  Full refund of ₹{returnSelectedFlight[0]?.fareOptions?.[travelClass]?.price.toLocaleString("en-IN")}
                </Text>
                
                
                </div>
                <div>
                <Text style={{
                  fontWeight:500,
              fontSize:"15px",
              textAlign:"center"
                }}>Non Refundable</Text>
                </div>
              </div>
              <div style={{
                display:"flex",
                flexDirection:"column",
                
              }}>
                <div style={{
            
            marginTop:"50px",
            textAlign:"center",
            height:"4px",
            width:"60%",
            backgroundImage:"linear-gradient(to right, rgb(43, 153, 80), rgb(238, 154, 153))"
          }}>
            </div>
            <div style={{
            position:"relative",
            // marginTop:"10px",
            textAlign:"center",
            height:"4px",
            width:"50%",
            backgroundImage:"linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))",
            left:"50%",
            bottom:4
          }}></div>
              </div>
              
            
              
          
          
          <div style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
            <div>
            <div style={{
              background:"rgb(107, 184, 133)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              right:7,
              bottom:21
            }}>
            <img src={FlightTicketFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            <div style={{
              background:"rgb(231, 114, 112)",
              height:"15px",
              width:"15px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              left:485,
              bottom:44
            }}></div>
            
            
            </div>
            
            <div>
            
            <div style={{
              background:"rgb(220, 53, 50)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              // left:50,
              bottom:21
            }}>
            <img src={FlightTakeoffFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            
            </div>
            
          </div>
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            position:"relative",
            bottom:18
          }}>
            <div style={{
              flex:1,
              textAlign:"left",
              position:"relative",
              right:6,
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Now
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{currentTime}</Text>
            </div>
            <div style={{
              flex:1,
              textAlign:"center",
              position:"relative",
              left:5,
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              {lessret.day} {lessret.month}
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              fontSize:"12px",
              //before 8
            }}>{cancelLess}</Text>
            </div>
            <div style={{
              flex:1,
              textAlign:"right",
              position:"relative",
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Departure
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{dep.day} {dep.month}, {onewaySelectedFlight[0]?.departureTime}</Text>
            </div>
          </div>
          </div>
          ):(
            <div>
          <div style={{
            flex:1,
            marginTop:"50px",
            textAlign:"center",
            height:"4px",
            width:"98%",
            backgroundImage:"linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))"
          }}>
            <Text style={{fontWeight:500,
              fontSize:"15px",
              position:"relative",
              textAlign:"center",
              bottom:35}}>Non Refundable</Text>
              
          </div>
          <div style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
            <div>
            <div style={{
              background:"rgb(231, 114, 112)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              right:7,
              bottom:17
            }}>
            <img src={FlightTicketFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            <div style={{
              flex:1,
              textAlign:"left",
              position:"relative",
              right:6,
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Now
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{currentTime}</Text>
            </div>
            </div>
            
            <div>
            
            <div style={{
              background:"rgb(220, 53, 50)",
              height:"30px",
              width:"30px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50px",
              position:"relative",
              left:40,
              bottom:18
            }}>
            <img src={FlightTakeoffFilledIcon} style={{
              
              height:"20px"
            }}>
            </img>
            </div>
            <div style={{
              flex:1,
              textAlign:"right",
              position:"relative",
              bottom:8
            }}>
            <Text style={{
              fontSize:"14px",
              fontWeight:500
            }}>
              Departure
            </Text>
            <br />
            <Text type="secondary" strong style={{
              position:"relative",
              
              fontSize:"12px",
            }}>{ret.day} {ret.month}, {returnSelectedFlight[0]?.departureTime}</Text> 
            </div>
            </div>
          </div>
          </div>
          )}
            </div>
          )}
          <br/>
          <Text style={{
            fontSize:18,fontWeight:600
          }}>Add Free Cancellation to your trip</Text>
            <br/>
            <div style={{
              background:"#daf2e2",
              // height:10,
              border:"0 solid #e5e7eb",
              borderRadius:20,
            }}>
              <div style={{
                flex:1,textAlign:"center",position:"relative",top:5
              }}>
                <Text style={{
                  color:"#238c46",fontWeight:700,fontSize:13
                }}>Trusted by most Indian travellers</Text> <span style={{
                  color:"#238c46",fontWeight:500,fontSize:9
                }}>IN</span>
              </div>
              <div style={{
                display:"flex",flexDirection:"row",padding:10,justifyContent:"space-between"
              }}>
                <div >
                  <div style={{
        border:".5px solid #cccccc",
        borderRadius:"20px",
        width:"473px",
        position:"relative",
        // right:10
      }}>
        
          <div  style={{
          maxheight:"80px",
          background:"rgb(242, 249, 255)",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px",
          padding:10,
          display:"flex",
          justifyContent:"space-between",
          cursor:"pointer",
          maxHeight: 80,
          
        }}
        // onClick={()=>handleAddCancelFee(items?.fareOptions?.[travelClass]?.price,calculateCancel)}
        >
          <div >
        <img src="https://images.ixigo.com/image/upload/icon/8378c73f79f77491eccf58ba345ee5bc-gbjnr.png"
        style={{
          height:25,
          position:"absolute",
          zIndex:10
        }}/>
        <div style={{
          background: "linear-gradient(90deg, #c7a2e8, transparent)",
          paddingBottom: ".5px",
          paddingTop: ".5px",
          zIndex:1,
          position:"relative",
          top:4,
          left:73,
          width:90,
          height:13,
          color:"#6e18b9",
          fontSize:"12px",
          textAlign:"center",
          fontWeight:500,
          
        }}>
          
           
        
          Most Popular
          
        </div>
        <br />
        <Text style={{
          fontWeight:500,
          fontSize:"17px",
          bottom:5,
          position:"relative"
        }}>Free Cancellation</Text>
        <br />
        <span style={{
          bottom:6,
          position:"relative",
          color:"#505050ff",
          fontSize:"12px"
        }}>@</span> <Text style={{
          fontSize:"15px",fontWeight:700,bottom:5,
          position:"relative",
        }}>
          {/* ₹{calculateCancel.toLocaleString("en-IN")} */} 
          <Text style={{
            fontSize:"11px",
            fontWeight:500,
            color:"#00000073"
          }}>/traveller</Text>
        </Text>
        </div>
        <div>
          <button style={{
            background:"transparent",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:"5px",
            border:"1px solid #fc790d",
            height:30,
            width:50,
            position:"relative",
            top:50,
            cursor:"pointer",
          }}>
            <Text style={{
              color:"#fc790d",
              fontWeight:500,
              fontSize:"15px",
            }}>Add</Text>
          </button>
        </div>
        </div>
        <div style={{
                  padding:15,
                  background:"white",
                  borderBottomLeftRadius:20,
                  borderBottomRightRadius:20
                }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>
              Instant refund of approx.{" "}
              <span style={{ fontWeight: "600", color: "#2B9950" }}>₹</span>
            </span> 
          </div>
        
          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>
              Cancel up to{" "}
              <span style={{ fontWeight: "600", color: "#2B9950" }}>8hrs</span> before
              departure
            </span>
          </div>
        
          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>No-questions-asked refund</span>
          </div>
        
          <div style={{ display: "flex", alignItems: "center",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>
              <span style={{ fontWeight: "600", color: "#2B9950" }}>24x7</span> priority
              customer service
            </span>
          </div>
          </div>
        </div>
       
        </div>
        <div>
         <div style={{
        border:".5px solid #cccccc",
        borderRadius:"20px",
        width:"473px",
        
      }}>
        <div  style={{
          height:"80px",
          background:"rgb(249, 242, 255)",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px",
          padding:10,
          display:"flex",
          justifyContent:"space-between",
          cursor:"pointer",
          maxHeight: 80,
          
        }}
        // onClick={()=>handleAddRescheduleFee(items?.fareOptions?.[travelClass]?.price,calculateReschedule)}
        >
          <div >
        <img src="https://images.ixigo.com/image/upload/icon/8934cfa8cec76c87ada8b3ecda4f0da1-awjph.png"
        style={{
          height:25,
          position:"absolute",
          zIndex:10
        }}/>
        
        <br />
        <Text style={{
          fontWeight:500,
          fontSize:"17px",
          top:8,
          position:"relative"
        }}>Free Cancellation + Rescheduling</Text>
        <br />
        <span style={{
          top:6,
          position:"relative",
          color:"#505050ff",
          fontSize:"12px"
        }}>@</span> <Text style={{
          fontSize:"15px",fontWeight:700,
          position:"relative",top:8
        }}>
          {/* ₹{calculateReschedule.toLocaleString("en-IN")} */} 
          <Text style={{
            fontSize:"11px",
            fontWeight:500,
            color:"#00000073"
          }}>/traveller</Text>
        </Text>
        </div>
        <div>
          <button style={{
            background:"transparent",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:"5px",
            border:"1px solid #fc790d",
            height:30,
            width:50,
            position:"relative",
            top:50,
            cursor:"pointer",
          }}>
            <Text style={{
              color:"#fc790d",
              fontWeight:500,
              fontSize:"15px",
            }}>Add</Text>
          </button>
        </div>
        </div>
        <div style={{
                  padding:15,
                  background:"white",
                  borderBottomLeftRadius:20,
                  borderBottomRightRadius:20
                  
                }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>
              Instant refund of approx.{" "}
              <span style={{ fontWeight: "600", color: "#2B9950" }}>₹
                {/* {calTotalTravellerRefund.toLocaleString("en-IN")} */} 

              </span>
            </span>
          </div>
        
          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>
              Cancel up to{" "}
              <span style={{ fontWeight: "600", color: "#2B9950" }}>8hrs</span> before
              departure
            </span>
          </div>
        
          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>No-questions-asked refund</span>
          </div>
        
          <div style={{ display: "flex", alignItems: "center",gap:5 }}>
            <CheckOutlined style={{color:"#2B9950"}}/>
            <span>
              <span style={{ fontWeight: "600", color: "#2B9950" }}>24x7</span> priority
              customer service
            </span>
          </div>
          </div>
         </div>
      </div>
              </div>
            </div>
            
          </div>

          {/* Down Card */}
          <div style={{
              position: "fixed",
              bottom: 0,
              width: "972px",
              height:"7%",
              zIndex: 1000,
              background: "#fff",
              padding: "10px 20px",
              left:"32%",
              boxShadow: "0 5px 25px rgba(0, 0, 0, 0.3)",
              display:"flex",
              justifyContent:"space-between",
              borderTopLeftRadius:"30px",
              borderTopRightRadius:"30px",
              alignItems:"center"
            }}>
            <div style={{
              display:"flex",
              flexDirection:"row",
            }}>
              <Text style={{
              fontSize:24,fontWeight:600
            }}>
              ₹{finalAmount.toLocaleString("en-IN")}

              </Text>
              <div style={{
                display:"flex",marginTop:12,marginLeft:5
              }}>
                <s style={{
                  color:"#b22422"
                }}>{promoOfferList[0].amount?(`₹ ${slashAmount.toLocaleString("en-IN")}`):null}</s> 
                <Text style={{
                  color:"#5e616e",marginTop:-2,fontWeight:500,
                }}> &nbsp;  {travellerValue === 1
                              ? null
                              : `•  ${travellerValue} Travellers`}</Text>
              </div>
              
            </div>
            <div>
              <button
                                            type="primary"
                                            style={{
                                              background: "#ff7a00",
                                              border: "none",
                                              borderRadius: 10,
                                              width:"145px",
                                              height:"40px",
                                              fontSize:"17px",
                                              color:"white",
                                              cursor:"pointer"
                                            }}
                                            onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          if(phoneNo === null)
                                          return dispatch(setOpenDrawer(true))
                                          
                                            }}
                                          >
                                            Continue <RightOutlined style={{ fontSize: 13 }} />
                                          </button>
            </div>
          </div>
          </Col>
        </div>
        <Drawer
          title={null}
          closable={false}
          destroyOnHidden
          placement="right"
          trigger={["click"]}
          arrow
          open={viewOffers}
          onClose={() => setViewOffers(false)}

          overlayStyle={{
            marginBottom: "10px"
          }}
          maskClosable={true}
          width={"28%"}
          style={{
            // padding: "24px",
            background: "#fff",
            // borderRadius: "8px 0 0 8px",
            overflow: "auto",
          }}>
            <div style={{
              padding:12
            }}>
              <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between"
              }}>
                 <Text style={{
              fontSize: "24px",
              fontWeight: 700
            }}>Offers For You</Text>
            <CloseOutlined
                        onClick={()=>setViewOffers(false)}
                        style={{
                          fontSize: 14,
                          cursor: "pointer",
                          // marginLeft: 8,
                          
                        }}
                      />
              </div>

              <div
              style={{
                height: "45px",
                border: "1px solid #8a8a8a",
                marginTop: 10,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                paddingLeft: "10px",
                paddingRight: "10px",
                background: "#fff",
              }}
            >
              <Input
                placeholder="Have a promocode? Redeem here"
                variant="borderless"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  width: 300,
                  
                }}
                value={promoCodeValue2}
                onChange={(e) => {
                  const text = e.target.value || "";
                  setPromoCodeValue2(text.toLocaleUpperCase());
                }}
              />

              {promoCodeValue2 ? (
                <button
                  style={{
                    color: "#0770e4",
                    border: "none",
                    background: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
              ) : null}

              
            </div>
              <div style={{
                marginTop:20
              }}>
                <Radio.Group
                value={radioValue}

                style={{ color: "black" }}
              >
                <Space direction="vertical">
                  {promoOfferList.map((item, idx) => (

                    
                      <div key={idx} style={{
                        display: "flex",
                        flexDirection: "column",
                        // width: "100%",

                      }}>
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "5px 0",
                          justifyContent: "space-between",
                          
                        }}>
                          <>
                            <style>
                              {`
                .custom-radio .ant-radio-inner {
                    border: 1px solid #848794 !important;
                }

                .custom-radio.ant-radio-wrapper-checked .ant-radio-inner {
                    border: 1px solid #0770e4 !important; /* selected border (blue) */
                }
                `}
                            </style>

                            <ConfigProvider>
                              <Radio value={idx} className="custom-radio" style={{
                                fontSize: "16px",
                                fontWeight: 600, textTransform: "uppercase", fontFamily: "Roboto"
                              }}
                                onChange={() => {
                                  handleRadioValue(idx)
                                  setViewOffers(false)
                                }
                                }>
                                {item.name}
                              </Radio>
                            </ConfigProvider>
                          </>

                          <div style={{
                            flex: 1, textAlign: "end"
                          }}>{item.amount >= 0 ? (<Text style={{
                            fontSize: "14px", fontWeight: 700
                          }}><span style={{
                            fontSize: 14, fontWeight: 700
                          }}>₹</span> {item.amount} Off</Text>) : null}
                          </div>

                        </div>
                        <Text style={{
                          position: "relative",
                          color: radioValue === idx ? "green" : "black",
                          fontFamily: "Roboto",
                          fontSize: 14.5,
                          bottom: 10
                        }}>
                          {item.descriptions}
                        </Text>
                      </div>
                  )
                  )}

                </Space>
              </Radio.Group>
              </div>
            </div>
            
        </Drawer>
        <LoginPage/>
      </div>

    </>
  )

}
export default ReviewTravellerDetails;