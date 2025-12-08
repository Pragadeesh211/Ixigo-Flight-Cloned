import React, { useState, useMemo } from "react";
import { Dropdown, Input, Typography, Divider } from "antd";
import { ClockCircleOutlined, SwapOutlined } from "@ant-design/icons";

const { Text } = Typography;

const FlightSearchDropdown = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");

  const recentSearches = [
    { from: "DEL", to: "HYD", date: "Sun, 19 Oct", details: "1 Traveller • Economy" },
    { from: "DEL", to: "HYD", date: "Sat, 18 Oct", details: "1 Traveller • Economy" },
  ];

  const popularAirports = [
    { code: "DEL", city: "New Delhi, Delhi, India", airport: "Indira Gandhi International Airport" },
    { code: "BOM", city: "Mumbai, Maharashtra, India", airport: "Chhatrapati Shivaji Maharaj International Airport" },
    { code: "HYD", city: "Hyderabad, Telangana, India", airport: "Rajiv Gandhi International Airport" },
    { code: "BLR", city: "Bengaluru, Karnataka, India", airport: "Kempegowda International Airport" },
    { code: "MAA", city: "Chennai, Tamil Nadu, India", airport: "Chennai International Airport" },
    { code: "CCU", city: "Kolkata, West Bengal, India", airport: "Netaji Subhas Chandra Bose International Airport" },
  ];

  // Filter helpers (search by code or city)
  const filteredAirportsFrom = useMemo(() => {
    const q = queryFrom.trim().toLowerCase();
    if (!q) return popularAirports;
    return popularAirports.filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.airport.toLowerCase().includes(q)
    );
  }, [queryFrom, popularAirports]);

  const filteredAirportsTo = useMemo(() => {
    const q = queryTo.trim().toLowerCase();
    if (!q) return popularAirports;
    return popularAirports.filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.airport.toLowerCase().includes(q)
    );
  }, [queryTo, popularAirports]);

  const makeDropdownContent = (isFrom = true) => {
    const recent = recentSearches;
    const filtered = isFrom ? filteredAirportsFrom : filteredAirportsTo;

    return (
      <div
        style={{
          padding: 12,
          width: 360,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <Text strong style={{ fontSize: 14 }}>
          Recent Searches
        </Text>

        {recent.map((item, i) => (
          <div
            key={i}
            onMouseDown={(e) => e.preventDefault()} // prevent input blur
            onClick={() => {
              if (isFrom) {
                setFrom(`${item.from} → ${item.to}`);
                setOpenFrom(false);
                setQueryFrom("");
              } else {
                setTo(`${item.from} → ${item.to}`);
                setOpenTo(false);
                setQueryTo("");
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #f0f0f0",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <ClockCircleOutlined style={{ fontSize: 18, color: "#555" }} />
            <div>
              <Text strong>{`${item.from} → ${item.to}`}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.date} • {item.details}
              </Text>
            </div>
          </div>
        ))}

        <Divider style={{ margin: "10px 0" }} />

        <Text strong style={{ fontSize: 14 }}>
          Popular Airports
        </Text>

        {filtered.map((airport, idx) => (
          <div
            key={idx}
            onMouseDown={(e) => e.preventDefault()} // prevents dropdown closing on click
            onClick={() => {
              const value = `${airport.code} - ${airport.city.split(",")[0]}`;
              if (isFrom) {
                setFrom(value);
                setOpenFrom(false);
                setQueryFrom("");
              } else {
                setTo(value);
                setOpenTo(false);
                setQueryTo("");
              }
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: "10px 0",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 8,
                padding: "6px 8px",
                minWidth: 44,
                textAlign: "center",
                fontWeight: 700,
                color: "#333",
              }}
            >
              {airport.code}
            </div>

            <div>
              <Text strong style={{ display: "block" }}>
                {airport.city}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {airport.airport}
              </Text>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* FROM */}
      <Dropdown
        overlay={makeDropdownContent(true)}
        trigger={[]}
        visible={openFrom}
        onVisibleChange={(v) => setOpenFrom(v)}
      >
        <Input
          value={from}
          placeholder="From"
          onChange={(e) => {
            setFrom(e.target.value);
            setQueryFrom(e.target.value);
            setOpenFrom(true);
          }}
          onFocus={() => setOpenFrom(true)}
          onBlur={() => setTimeout(() => setOpenFrom(false), 150)} // small delay to allow clicks
          style={{
            width: 320,
            background: "#f2f4f7",
            borderRadius: 10,
            border: "1px solid transparent",
            padding: "10px 12px",
            fontWeight: 600,
          }}
        />
      </Dropdown>

      {/* Swap */}
      <div
        onClick={() => {
          setFrom((prev) => {
            setTo((t) => prev);
            return to;
          });
        }}
        style={{
          background: "#fff",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        <SwapOutlined style={{ transform: "rotate(90deg)", color: "#0056D2" }} />
      </div>

      {/* TO */}
      <Dropdown
        overlay={makeDropdownContent(false)}
        trigger={[]}
        visible={openTo}
        onVisibleChange={(v) => setOpenTo(v)}
      >
        <Input
          value={to}
          placeholder="To"
          onChange={(e) => {
            setTo(e.target.value);
            setQueryTo(e.target.value);
            setOpenTo(true);
          }}
          onFocus={() => setOpenTo(true)}
          onBlur={() => setTimeout(() => setOpenTo(false), 150)}
          style={{
            width: 320,
            background: "#f2f4f7",
            borderRadius: 10,
            border: "1px solid transparent",
            padding: "10px 12px",
            fontWeight: 600,
          }}
        />
      </Dropdown>
    </div>
  );
};

export default FlightSearchDropdown;


<Modal
                                          open={openDOB}
                                          footer={null}
                                          onCancel={() => setOpenDOB(false)}
                                          centered
                                          width={450}
                                          className="custom-modal"
                                        >
                                          <div className="date-row">
                                            
                                              <DatePicker defaultValue={dayjs('Feb', monthFormat)} format={monthFormat} picker="month" 
                                              className="hidden-datepicker"/>
                                            
                                           
                                          </div>

                                          <div className="divider"></div>

                                          {/* <div className="date-row">
                                            <div className="col">28</div>
                                            <div className="col">October</div>
                                            <div className="col">2024</div>
                                          </div>

                                          <div className="divider"></div>

                                          <div className="date-row">
                                            <div className="col">29</div>
                                            <div className="col">November</div>
                                            <div className="col">2025</div>
                                          </div> */}

                                          <div className="footer-row">
                                            <button className="cancel-btn" onClick={() => setOpenDOB(false)}>
                                              CANCEL
                                            </button>

                                            <button className="confirm-btn">CONFIRM</button>
                                          </div>
                                        </Modal>




















































































// style={{
//               display: "flex",
//               flexDirection: "column",
//               background: "#fff",
//               padding: 15,
//               paddingBottom: "70px",
//               borderRadius: 20,
//               boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//             }}



          {/* Left Card */}
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

            //   style={{
            //   display:"flex",
            //   background:"#fff",
            //   width:"70%",
            //   borderRadius: "20px",
            //   padding: "20px",
            //   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            //   // minHeight: "auto"
            // }}


{/* Right Section */}
          <div
            
            
          >
            { onewaySelectedFlight.map((item,idx)=>(
                        <div key={idx}>
                          <Text  style={{
                        fontSize:"23px",
                        fontWeight:"bold"
                      }}>{fromCity} <ArrowRightOutlined style={{
                        fontSize:"18px"
                      }}/> {toCity}</Text> <br />
                      <div style={{
                        position:"relative",
                        bottom:"25px"
                      }}>
                      <Text style={{
                        fontWeight:700,
                        fontSize:"15px"
                      }}>{departure}</Text> <Text strong style={{
                      fontSize:"30px",
                      position:"relative",
                        bottom:"4px"
                    }}>.</Text>
                    <Text  style={{
                              fontSize:"14px",
                              fontWeight:500,
                              color:"#2e2e2eff",
                              position:"relative",
                              left:"3px"
                            }}>{item.stops} <Text strong style={{
                      fontSize:"30px",
                      position:"relative",
                        bottom:"4px"
                    }}>.</Text> <Text>
                              {item.durations}
                            </Text> <Text strong style={{
                      fontSize:"30px",
                      position:"relative",
                        bottom:"4px",
                        fontWeight:500
                    }}>.</Text> {travelClass}
                    </Text>
                    </div>
                    <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flex: 1,
                  minWidth: "20%",
                }}>
                      <img src={item.logo} alt={item.airline} style={{ height: 35 }} />
                      <Text strong style={{
                        fontSize:"16px"
                      }}>{item.airline}</Text> <Text strong style={{
                        color:"grey"
                      }}>
                        | {item.stops === "1 stop"
              ? item?.flightCodes?.[0]?.code || "--"
              : item?.flightCodes || "--"}
            
                        
                        
                      
                      </Text>
                    </div>
                    <div style={{
                      display:"flex",
                      flexDirection:"row",
                      marginTop:"15px",
                      gap:35
                    }}>
                      
                    <div style={{
                      width:"140px"
                    }}>
                      <Text strong style={{
                        color:"grey",
                        fontSize:"14px"
            
                      }}>{departure}</Text>
                      <br />
                      <Text style={{
                        fontSize:"30px",
                        fontWeight:"bold" 
                      }}>
                        {/* {selectedFlights?.flightCodes?.[0]?.departureTime} */}
                        {item.stops === "1 stop"
              ?item?.flightCodes?.[0]?.departureTime1 || "--":item?.departureTime || "--"}
            
            </Text>
                      <br />
                      <Text strong>
                        {from}
                      </Text>
                      <Text strong style={{
                        whiteSpace: "wrap",
                      overflow: "hidden",
                      color:"grey",
                      display: "inline-block",
                      maxWidth: "155px",
                      fontSize:"12px",
                      
                      }}>
                        {fromAirport}
                      </Text>
                      <br />
                      <Text strong style={{
                        fontSize:"12px "
                      }}>
                        Terminal {item.fromTerminal}
                      </Text>
                      </div>
                      <div style={{
                        marginTop:"30px",
                        display:"flex",
                        flexDirection:"column",
                        textAlign:"center"
                      }}>
                        <Text style={{
                          color:"gray",
                          fontWeight:400
                        }}>{item.stops === "1 stop"
              ?item?.flightCodes?.[0]?.duration1 || "--":item?.durations || "--"}</Text>
                        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg">
                        </img>
                      </div>
                      <div style={{
                        textAlign:"right",
                        width:"140px"
                      }}>
                        {item.nextDayArrival === true ?(<div>
                          <Text strong style={{
                        color:"grey",
                        fontSize:"14px"
            
                      }}
                          >{dayjs(departure).add(1, "day").format("YYYY-MM-DD")}</Text>
                        
                      </div>):<div><Text strong style={{
                        color:"grey",
                        fontSize:"14px"
            
                      }}>{departure}</Text></div>}
                      <Text style={{
                        fontSize:"30px",
                        fontWeight:"bold"
                      }}>{item.stops === "1 stop"
              ?item?.flightCodes?.[0]?.arrivalTime1 || "--":item?.arrivalTime || "--"}</Text>
                      <br />
                      <Text strong>
                        {item.stops === "1 stop"
              ?`${item?.flightCodes?.[0]?.to} - ${item?.flightCodes?.[0]?.toCity}` || "--":to}
                      </Text>
                      <br />
                      <Text strong style={{
                        whiteSpace: "wrap",
                      overflow: "hidden",
                      color:"grey",
                      display: "inline-block",
                      maxWidth: "155px",
                      fontSize:"12px",
                      
                      }}>
                        {item.stops === "1 stop"
                      ?item?.flightCodes?.[0]?.toAirport1 || "--":toAirport}
                      </Text>
                      <br />
                      <Text strong style={{
                        fontSize:"12px "
                      }}>
                        Terminal {item.stops === "1 stop"
              ?item?.flightCodes?.[0]?.toTerminal1 || "--":item.toTerminal}
                      </Text>
                      </div>
                      <div>
                        <Text strong style={{
                          fontSize:"14px",
                          color:"grey"
                        }}>
                          Baggage
                        </Text>
            
                        <br />
                        <div style={{
                          display:"flex",
                          gap:8
                        }}>
                          
                        <img src={Cabin} style={{
                          height:"20px",
                          width:"20px",
                          marginTop:"20px"
                        }}>
                        </img>  <div style={{
                                marginTop:"17px"
                        }}>
                          <Text style={{
                          fontWeight:500
                        }}>Cabin : </Text> <Text style={{
                          fontWeight:700
                        }}>
                          7 kg per adult
                        </Text>
                        </div>
                        </div>
                        <div style={{
                          display:"flex",
                          gap:8
                        }}>
                        <img src={CheckIn} style={{
                          height:"20px",
                          width:"20px",
                          marginTop:"20px"
                        }}>
                        </img>  <div style={{
                                marginTop:"17px"
                        }}>
                          <Text style={{
                          fontWeight:500
                        }}>Check-in : </Text> <Text style={{
                          fontWeight:700
                        }}>
                          15 kg per adult
                        </Text>
                        </div>
                        </div>
                        
                        
                      </div>
                      
            
                    </div>
                    <div style={{
                      marginTop:"15px",
                      display:"flex",
                      textAlign:"center",
                      gap:10
                    }}>
                          <img src={FlightEngineFilledIcon} style={{
                            height:"20px",
                          }}/>  <Text strong style={{
                            fontSize:"12px"
                          }}>
                            Airbus A320
                          </Text>
                          <img src={AirlineSeat} style={{
                            height:"15px",
                          }}/>  <Text strong style={{
                            fontSize:"12px"
                          }}>
                            Narrow
                          </Text>
                          <AppstoreOutlined />  <Text strong style={{
                            fontSize:"12px"
                          }}>
                            Narrow (Limited seat tilt)
                          </Text>
                          <Tooltip title="Fresh Food - Chargeable" >
                          <img src={NoFoodIcon} style={{
                            height:"20px",
                            cursor:"pointer"
                          }}/></Tooltip>
                          <Tooltip title="No Wi-Fi" >
                          <img src={WifiOffIcon} style={{
                            height:"15px",
                            marginTop:2,
                            cursor:"pointer"
                          }}/>
                          </Tooltip>
                          <Tooltip title="No power outlet" >
                          <img src={NoPowerIcon} style={{
                            height:"15px",
                            marginTop:2,
                            cursor:"pointer",
                            color:"gray"
                          }}/>
                          </Tooltip>
                          <Tooltip title="No Entertainment" >
                          <img src={NoVideoIcon} style={{
                            height:"18px",
                            marginTop:2,
                            cursor:"pointer",
                            color:"gray"
                          }}/>
                          </Tooltip>
                          
            
                        </div>
            
                        {item.stops ==="1 stop" &&  (
                          <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            width:"100%",
                            textAlign:"center",
                            flexDirection:"column",
                            marginTop:"40px"
                          }}>
                          <div style={{
                            
                            width:"85%",
                            border:"1px solid rgb(204, 204, 204)",
                            
                          }}>
            
                          </div>
                          
                         
                  <div
                    style={{
                      textAlign: "center",
                      background: "#ffffffff",
                      
                      borderRadius: "20px",
                      position:"relative",
                      display: "inline-block",
                      bottom:"12px",
                      border:"1px solid #d1d1d1ff",
                      width:"60%"
                      
                    }}
                  >
                    <Text style={{
                      color: "#ad6800",
                      fontSize:"12px",
                      fontWeight:500
                    }}>Change of Planes •</Text> <Text style={{
                      color: "black",
                      fontSize:"13px",
                      fontWeight:700
                    }}>{item.flightCodes[0].waitTime}</Text> <Text style={{
                      fontSize:"13px",
                      fontWeight:500
                    }}> layover in {item.flightCodes[0].toCity}  {onewaySelectedFlight.layoverCity}</Text>
                  </div>
                  </div>
                )}
                       {/* 1 stop design */}
                        {item.stops === "1 stop"?(<div style={{
                          marginTop:"30px"
                        }}>
                          <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flex: 1,
                  minWidth: "20%",
                }}>
                      <img src={item.logo} alt={item.airline} style={{ height: 35 }} />
                      <Text strong style={{
                        fontSize:"16px"
                      }}>{item.airline}</Text> <Text strong style={{
                        color:"grey"
                      }}>
                        | {item.stops === "1 stop"
              ? item?.flightCodes?.[0]?.code || "--"
              : item?.flightCodes || "--"}
            
                        
                        
                      
                      </Text>
                    </div>
                          <div style={{
                      display:"flex",
                      flexDirection:"row",
                      marginTop:"15px",
                      gap:35
                    }}>
                      
                    <div style={{
                      width:"140px"
                    }}>
                      <Text strong style={{
                        color:"grey",
                        fontSize:"14px"
            
                      }}>{departure}</Text>
                      <br />
                      <Text style={{
                        fontSize:"30px",
                        fontWeight:"bold"
                      }}>{item?.flightCodes?.[1]?.departureTime2 || "--"}</Text>
                      <br />
                      <Text strong>
                        {
              `${item?.flightCodes?.[0]?.to} - ${item?.flightCodes?.[0]?.toCity}` || "--"}
                      </Text>
                      <Text strong style={{
                        whiteSpace: "wrap",
                      overflow: "hidden",
                      color:"grey",
                      display: "inline-block",
                      maxWidth: "155px",
                      fontSize:"12px",
                      
                      }}>
                        {item?.flightCodes?.[1]?.toAirport2 || "--"}
                      </Text>
                      <br />
                      <Text strong style={{
                        fontSize:"12px "
                      }}>
                        Terminal {item?.flightCodes?.[1]?.fromTerminal2 || "--"}
                      </Text>
                      </div>
                      <div style={{
                        marginTop:"30px",
                        display:"flex",
                        flexDirection:"column",
                        textAlign:"center"
                      }}>
                        <Text style={{
                          color:"gray",
                          fontWeight:400
                        }}>{item?.flightCodes?.[1]?.duration2 || "--"}</Text>
                        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg">
                        </img>
                      </div>
                      <div style={{
                        textAlign:"right",
                        width:"140px"
                      }}>
                        {item.nextDayArrival === true ?(<div>
                          <Text strong style={{
                        color:"grey",
                        fontSize:"14px"
            
                      }}
                          >{dayjs(departure).add(1, "day").format("YYYY-MM-DD")}</Text>
                        
                      </div>):<div><Text strong style={{
                        color:"grey",
                        fontSize:"14px"
            
                      }}>{departure}</Text></div>}
                      <Text style={{
                        fontSize:"30px",
                        fontWeight:"bold"
                      }}>{item.arrivalTime}</Text>
                      <br />
                      <Text strong>
                        {to}
                      </Text>
                      <br />
                      <Text strong style={{
                        whiteSpace: "wrap",
                      overflow: "hidden",
                      color:"grey",
                      display: "inline-block",
                      maxWidth: "155px",
                      fontSize:"12px",
                      
                      }}>
                        {toAirport}
                      </Text>
                      <br />
                      <Text strong style={{
                        fontSize:"12px "
                      }}>
                        Terminal {item?.flightCodes?.[1]?.toTerminal2 || "--"}
                      </Text>
                      </div>
                      <div>
                        <Text strong style={{
                          fontSize:"14px",
                          color:"grey"
                        }}>
                          Baggage
                        </Text>
            
                        <br />
                        <div style={{
                          display:"flex",
                          gap:8
                        }}>
                          
                        <img src={Cabin} style={{
                          height:"20px",
                          width:"20px",
                          marginTop:"20px"
                        }}>
                        </img>  <div style={{
                                marginTop:"17px"
                        }}>
                          <Text style={{
                          fontWeight:500
                        }}>Cabin : </Text> <Text style={{
                          fontWeight:700
                        }}>
                          7 kg per adult
                        </Text>
                        </div>
                        </div>
                        <div style={{
                          display:"flex",
                          gap:8
                        }}>
                        <img src={CheckIn} style={{
                          height:"20px",
                          width:"20px",
                          marginTop:"20px"
                        }}>
                        </img>  <div style={{
                                marginTop:"17px"
                        }}>
                          <Text style={{
                          fontWeight:500
                        }}>Check-in : </Text> <Text style={{
                          fontWeight:700
                        }}>
                          15 kg per adult
                        </Text>
                        </div>
                        </div>
                        
                        
                      </div>
                      
            
                    </div>
                    <div style={{
                      marginTop:"15px",
                      display:"flex",
                      textAlign:"center",
                      gap:10
                    }}>
                          <img src={FlightEngineFilledIcon} style={{
                            height:"20px",
                          }}/>  <Text strong style={{
                            fontSize:"12px"
                          }}>
                            Airbus A320
                          </Text>
                          <img src={AirlineSeat} style={{
                            height:"15px",
                          }}/>  <Text strong style={{
                            fontSize:"12px"
                          }}>
                            Narrow
                          </Text>
                          <AppstoreOutlined />  <Text strong style={{
                            fontSize:"12px"
                          }}>
                            Narrow (Limited seat tilt)
                          </Text>
                          <Tooltip title="Fresh Food - Chargeable" >
                          <img src={NoFoodIcon} style={{
                            height:"20px",
                            cursor:"pointer"
                          }}/></Tooltip>
                          <Tooltip title="No Wi-Fi" >
                          <img src={WifiOffIcon} style={{
                            height:"15px",
                            marginTop:2,
                            cursor:"pointer"
                          }}/>
                          </Tooltip>
                          <Tooltip title="No power outlet" >
                          <img src={NoPowerIcon} style={{
                            height:"15px",
                            marginTop:2,
                            cursor:"pointer",
                            color:"gray"
                          }}/>
                          </Tooltip>
                          <Tooltip title="No Entertainment" >
                          <img src={NoVideoIcon} style={{
                            height:"18px",
                            marginTop:2,
                            cursor:"pointer",
                            color:"gray"
                          }}/>
                          </Tooltip>
                          
            
                        </div>
                        <div style={{
                          marginTop:200
                        }}></div>
                        </div>):null}
                        </div>
                       ))
                        }
          </div>


// Dropdown Add


{adults.map((person, index) => {
  const isSelected = selectedAdults.some(a => a.key === person.key);
  const disableExtra = selectedAdults.length >= travellers.Adults;

  const handleCheckboxChange = () => {
    if (isSelected) {
      setSelectedAdults(prev => prev.filter(a => a.key !== person.key));
    } else if (!disableExtra) {
      setSelectedAdults(prev => [...prev, person]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAdults(prev =>
      prev.map(a =>
        a.key === person.key ? { ...a, [name]: value } : a
      )
    );
  };

  return (
    <div
      key={person.key}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 20,
        border: "1px solid #ccc",
        padding: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          disabled={disableExtra && !isSelected}
          style={{ height: 20, width: 20 }}
        />
        <span style={{ fontSize: 16 }}>
          {person.firstName} {person.lastName} 
        </span>
      </div>

      {isSelected && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="text"
            name="firstName"
            value={person.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={person.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <select
            name="genderValue"
            value={person.genderValue}
            onChange={handleInputChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      )}
    </div>
  );
})}

<button onClick={() => {
  const newKey = Date.now();
  const newTraveller = {
    key: newKey,
    firstName: '',
    lastName: '',
    genderValue: 'Male',
  };
  setAdults(prev => [...prev, newTraveller]);
}}>Add New Traveller</button>
