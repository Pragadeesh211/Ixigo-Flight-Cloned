import React, { useState } from "react";
import PageSelectionTabs from "../../Component/PageSelectionTabs";
import { Card, Typography, Input, Button, Radio, Space, ConfigProvider, Drawer, Tooltip, Col } from "antd";
import { RightOutlined, CloseOutlined,ArrowRightOutlined,AppstoreOutlined } from "@ant-design/icons";
import {
  setOpenDrawer,
  setPhoneNo
} from "../../Redux/Slices/ProfileSlice";
import { setOnewaySelectedFlight } from "../../Redux/Slices/FlightSearchSlice";
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
    returnSelectedFlight
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

  console.log("items show",onewaySelectedFlight)

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
  
  console.log("return check",returnSelectedFlight[0].stops)

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
           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
                                      }}><span style={{
                                        fontSize: 14, fontWeight: 700
                                      }}>₹</span> {item.amount} Off</Text>) : null}
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
          <div>Hi</div>
          </Col> 

          {/* Right Section */}
          <Col>
          <div style={{
            display:"flex",
            background:"#fff",
            width:"980px",
           padding:15,borderRadius:20,
           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
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
                                     marginBottom: returnSelectedFlight[0].stops ==="1 stop" ? -200:0,
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
           padding:15,borderRadius:20,
           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
           marginTop:25
          }}>
            <div style={{
              display:"flex",flexDirection:"row"
            }}>
                <Text style={{
              fontSize:24,fontWeight:700
            }}>
              Refund on Cancellation
            </Text>
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
                                onChange={() => handleRadioValue(idx)}>
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