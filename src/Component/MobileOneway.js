import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Cabin from "../Images/Cabin.png";
import CheckIn from "../Images/Chech-in.png";
import AirlineSeat from "../Images/AirlineSeat.png"
import FlightEngineFilledIcon from "../Images/FlightEngineFilledIcon.png"
import NoFoodIcon from "../Images/NoFoodIcon.png"
import WifiOffIcon from "../Images/wifi.png"
import NoPowerIcon from "../Images/NoPowerIcon.png"
import NoVideoIcon from "../Images/NoVideoIcon.png"
import { Typography, Tooltip } from "antd";
import { ArrowRightOutlined,AppstoreOutlined } from "@ant-design/icons";
import useScreenSize from "./UseScreenSize";

dayjs.extend(duration);

const { Text } = Typography;

const MobileOneway = () =>{
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

  const formatDate = (date) => {
      if (!date) return { day: "", month: "", weekday: "" };
      const d = dayjs(date);
      return {
        day: d.format("DD"),
        month: d.format("MMM"),
        weekday: d.format("ddd"),
      };
    };
    
    const dep = formatDate(departure)

    const {isMobile} = useScreenSize(); 


  return(
    <>
    {isMobile && (
        <>
        <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        }}>
        { onewaySelectedFlight.map((item,idx)=>(
                        <div key={idx} style={{
                        width:"90%",
                        }}>
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
                      }}>{dep.weekday}, {dep.day} {dep.month}</Text> <Text strong style={{
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
            
                      }}>{dep.weekday}, {dep.day} {dep.month}</Text>
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
            
                      }}>{dep.weekday}, {dep.day} {dep.month}</Text></div>}
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
                          {item?.fareOptions?.[travelClass]?.baggage} per adult
                        </Text>
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
                          {/* <Tooltip title="Fresh Food - Chargeable" >
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
                          </Tooltip> */}
                          
            
                        </div>
            
                        {item.stops ==="1 stop" &&  (
                          <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            width:"100%",
                            textAlign:"center",
                            flexDirection:"column",
                            marginTop:"60px",
                            
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
                      bottom:"25px",
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
                          marginTop:"30px",marginBottom:-195
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
            
                      }}>{dep.weekday}, {dep.day} {dep.month}</Text>
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
            
                      }}>{dep.weekday}, {dep.day} {dep.month}</Text></div>}
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
                          {item?.fareOptions?.[travelClass]?.baggage} per adult
                        </Text>
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
                          {/* <Tooltip title="Fresh Food - Chargeable" >
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
                           */}
            
                        </div>
                        <div style={{
                          marginTop:200
                        }}></div>
                        </div>):null}
                        </div>
                       ))
                        }
    </div>
        </>
    )}
    
    </>
  )
}

export default MobileOneway;