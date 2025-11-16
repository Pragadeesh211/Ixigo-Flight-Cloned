import React, { useState, useMemo,useEffect } from "react";
import Link,{useNavigate} from "react-router-dom";
import { DatePicker, Card, Button, Input, Row, Col, Dropdown, Typography,Checkbox } from "antd";
import dayjs from "dayjs"
import {  SwapOutlined,RightOutlined,CloseOutlined,InfoCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FlightSearchCard from "../../Component/FlightSearchCard";
import { 
  setFrom,
  setTo,
  swapFromTo,
  toggleReturnTrip,
  setReturnTripUI,
  setDeparture,
  setReturnDate,
  setTravellers,
  setTravelClass,
 } from "../../Redux/Slices/FlightSearchSlice";



const { Text } = Typography;
const CheckboxGroup = Checkbox.Group;
const plainOptions=["Non-Stop","Free meal available","Air India"]

const FlightList = ()=>{
  const dispatch = useDispatch();
  const {
    from,
    to,
    returnTrip,
    returnTripUI,
    departure,
    returnDate,
    travellers,
    travelClass,
  } = useSelector((state) => state.flightSearch);
  
  const navigate = useNavigate();
  
  
    // const [returntrip, setreturntrip] = useState(false);
    // const [departure, setDeparture] = useState(dayjs());
    // const [returnDate, setReturnDate] = useState(dayjs().add(1, "day"));
  
    // const [travellers, setTravellers] = useState(
    //   {
    //     Adults: 1,
    //     Children: 0,
    //     Infants: 0,
    //   }
    // );
  
  
    // const [travelClass, setTravelClass] = useState("Economy");
  
  
    const popularAirports = [
      { code: "MAA", city: "Chennai, Tamil Nadu, India", airport: "Chennai International Airport" },
      { code: "DEL", city: "New Delhi, Delhi, India", airport: "Indira Gandhi International Airport" },
      { code: "BOM", city: "Mumbai, Maharashtra, India", airport: "Chhatrapati Shivaji Maharaj International Airport" },
      { code: "HYD", city: "Hyderabad, Telangana, India", airport: "Rajiv Gandhi International Airport" },
      { code: "BLR", city: "Bengaluru, Karnataka, India", airport: "Kempegowda International Airport" },
      { code: "CCU", city: "Kolkata, West Bengal, India", airport: "Netaji Subhas Chandra Bose International Airport" },
    ];
  
    const travellerOptions = [
      {
        type: "Adults",
        age: "12 yrs or above",
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      {
        type: "Children",
        age: "2 - 12 yrs",
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        type: "Infants",
        age: "0 - 2 yrs",
        values: [0, 1, 2, 3, 4],
      },
    ];
  
  
  
    // const [from, setFrom] = useState(`${popularAirports[0].code} - ${popularAirports[0].city.split(",")[0]}`);
    // const [to, setTo] = useState(`${popularAirports[1].code} - ${popularAirports[1].city.split(",")[0]}`);
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [queryFrom, setQueryFrom] = useState("");
    const [queryTo, setQueryTo] = useState("");
    const [openTC, setOpenTC] = useState(false);
  
    const handleOneWay = () => {
      dispatch(toggleReturnTrip(false))
    }
  
    const handleReturnTrip = () => {
      dispatch(toggleReturnTrip(true))
    }
  
    const handleReturnChange = (date) => {
      // setReturnDate(date)
      dispatch(setReturnDate(date))
      if (!returnTrip) {
        // setReturnDate(ret);
        dispatch(setReturnDate(ret))
      }
    }
  
    const handleSwapChange = () => {
      dispatch(swapFromTo())
    }

    const [errorRoute,setErrorRoute] = useState(false);
  
    const makeDropdownContent = (isFrom = true) => {
      const filtered = isFrom ? filteredAirportsFrom : filteredAirportsTo;
    
      const handleSelect = (airport) => {
        const value = `${airport.code} - ${airport.city.split(",")[0]}`;
        if (isFrom) {
          dispatch(setFrom(value));
          setOpenFrom(false);
          setQueryFrom("");
          if (value === to) {
            setErrorRoute(true);
            setOpenFrom(true);
          } else {
            setErrorRoute(false);
          }
        } else {
          dispatch(setTo(value));
          setOpenTo(false);
          setQueryTo("");
          if (from === value) {
            setErrorRoute(true);
            setOpenTo(true);
          } else {
            setErrorRoute(false);
          }
        }
      };
    
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
          {errorRoute && (
            <div
              style={{
                marginBottom: 10,
                background: "#fff4f4",
                borderRadius: 6,
                padding: "6px 10px",
                backgroundColor: "#f0d4d1ff",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <InfoCircleOutlined style={{color:"red",fontSize:"17px",position:"relative",right:"3px",top:"1px"}} />
              <Text style={{
                fontSize:"14px",
                position:"relative",
                left:"4px"
              }}>
              Departure and arrival airports cannot be the same.
              </Text>
            </div>
          )}
    
          <Text style={{ fontSize: "18px", fontWeight: 600 }}>
            Popular Airports
          </Text>
    
          {filtered.map((airport, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "10px 0",
                cursor: "pointer",
              }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(airport)}
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
  
    const totalTravellers =
      travellers.Adults + travellers.Children + travellers.Infants;
  
    const isDisabled = (type, number) => {
  
      if (totalTravellers - travellers[type] + number > 9) return true;
  
  
      if (type === "Infants" && number > travellers.Adults) return true;
  
      return false;
    };
  
    const [travellersValue, setTravellersValue] = useState(totalTravellers);
    const [travelClassValue, setTravelClassValue] = useState(travelClass)
    
  
    const handleDone = () => {
      setTravellersValue(totalTravellers)
      setTravelClassValue(travelClass)
      setOpenTC(false)
    }
    const maketravellerClass = () => {
      return (
        <div style={{
  
          width: 500,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          fontFamily: "Roboto",
        }}>
          <div
            style={{
              padding: 12,
              borderBottom: "1px solid #ccccccff"
            }}>
            <Text style={{
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              Travellers
            </Text>
            {travellerOptions.map((item, idx) => (
              <div
                key={item.type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                  flexDirection: "row"
                }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 100
                }}>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {item.type}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "gray" }}>
                    {item.age}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  {item.values.map((number) => {
                    const disabled = isDisabled(item.type, number)
                    return (
                      <Button
                        key={number}
                        disabled={disabled}
                        onClick={() => {
                          if (!disabled) {
                            dispatch(
                              setTravellers({
                                ...travellers,            
                                [item.type]: number,      
                              })
                            );
                          }
                        }}
  
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: "30%",
                          background:
                            travellers[item.type] === number
                              ? "#0066ff"
                              : disabled
                                ? "#ffffffff"
                                : "#ffffffff",
                          color: disabled
                            ? "#999"
                            : travellers[item.type] === number
                              ? "#fff"
                              : "#000",
                          cursor: disabled ? "not-allowed" : "pointer",
                          border: "none",
  
                        }}
                      >
                        {number}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
  
            <h3 style={{ marginTop: 16 }}>Class</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {["Economy", "Premium Economy", "Business"].map((cls) => (
                <button
                  key={cls}
                  onClick={() => dispatch(setTravelClass(cls))}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 20,
                    padding: "6px 12px",
                    background: travelClass === cls ? "#0066ff" : "#fff",
                    color: travelClass === cls ? "#fff" : "#000",
                    cursor: "pointer",
                    fontWeight: 500
                  }}
                  onBlur={() => setTimeout(() => setOpenFrom(false), 10)}
                >
                  {cls}
                </button>
              ))}
            </div>
  
  
  
          </div>
          <div style={{
            marginTop: "10px", padding: 8, display: "flex", justifyContent: "flex-end"
          }}>
            <Button
              style={{
                fontFamily: "Roboto",
                fontSize: 17,
  
  
              }}
              size="large"
              color="orange"
              variant="solid"
              onClick={handleDone}>
              Done
            </Button>
          </div>
        </div>
      )
    }
  
  
    const handleChange = (date) => {
      dispatch(setDeparture(date));
      dispatch(setReturnDate(date.add(1, "day")));
    };
  
  
  
    const disabledDate = (current) => {
      return current && current < dayjs().startOf("day");
    };
  
   const formatDate = (date) => {
    if (!date) return { day: "", month: "", weekday: "" };
    return {
      day: date.format("DD"),
      month: date.format("MMM"),
      weekday: date.format("ddd"),
    };
  };
  
  useEffect(() => {
    if (!returnDate && returnTrip) {
      dispatch(toggleReturnTrip(false));
      dispatch(setReturnDate(dayjs().add(1, "day")));
    }
  }, [returnDate, returnTrip, dispatch]);
  
  
    const dep = formatDate(departure);
    const ret = formatDate(returnDate);
  
    
  
  
    //   const onSearch = (value) => {
    //   console.log("Search:", { from, to, value });
    // };
  
    const handleSearch = () => {
    console.log("Flight Search Params:", {
      from,
      to,
      returnTrip,
      departure,
      returnDate,
      travellers,
      travelClass,
    });
     if (from === to) {
        setErrorRoute(true);
        setOpenTo(true);
        
      } else {
        setErrorRoute(false);
        setOpenFrom(false);
        setOpenTo(false);
        navigate("/flightList");
      }
  handleReturnTripUI();
  };

  
  const handleReturnTripUI = () =>{
    if(returnTrip && !errorRoute){
      dispatch(setReturnTripUI(true))
    }
    else{
      dispatch(setReturnTripUI(false))
    }
  }

  //Checkboxcontent
  const [checkedList, setCheckedList] = useState([]);
 
  
  
    return (
    <>
    <div style={{
      backgroundColor:"#f2f4f7",
      
    }}>
    <div style={{ display: "flex", justifyContent: "center",height:"200px", }}>
                <Card variant="borderless"
                
                  style={{
                    width: "100%", boxShadow: "0 0 15px 3px rgba(0, 0, 0, 0.25)",
                    position:"fixed",
                    transition: "all 0.3s ease",zIndex:10
                  }} >
                    <div style={{
                      marginTop:"20px"
                    }}>
                      <>
                            
                                <div style={{ display: "flex", justifyContent: "space-evenly", width: "220px" }}>
                                  <Button shape="round" size="medium" type={returnTrip ? "default" : "primary"}
                                    onClick={handleOneWay}
                                    style={{
                                      fontFamily: "Roboto",
                                      fontSize: 16,
                      
                                    }}>One Way</Button>
                                  <Button shape="round" size="medium" type={returnTrip ? "primary" : "default"}
                                    onClick={handleReturnTrip}
                                    style={{
                                      fontFamily: "Roboto",
                                      fontSize: 16
                                    }}>Return Trip</Button>
                                </div>
                      
                      
                                {/* <FlightSearchDropdown/> */}
                      
                                <div style={{
                                  marginTop: "30px"
                                }}>
                                  <Card style={{
                                    background: "#f2f4f7",
                                    borderRadius: "12px",
                                    display: "flex",
                                    marginTop: "10px",
                                    height: "55px",
                                    alignItems: "center",
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                                    position:"relative"
                      
                                  }} >
                                    <Row justify="space-between"
                                      align="middle"
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center"
                                      }} >
                                      <Col style={{
                                        borderRight: "3px solid white",
                                        width:"310px"
                                      }}>
                                        <p style={{
                                          fontFamily: "Roboto",
                                          color: "grey",
                                          fontSize: "12px",
                                          top: "5px",
                                          position: "relative",
                                        }}>
                                          From
                                        </p>
                                        <Dropdown
                                          popupRender={() => makeDropdownContent(true)}
                                          trigger={[]}
                                          open={openFrom}
                                          onOpenChange={(v) => setOpenFrom(v)}
                                        >
                                          <Input
                                            style={{
                                              position: "relative",
                                              bottom: "13px",
                                              height: "30px",
                                              right: "11px",
                                              fontFamily: "Roboto",
                                              fontSize: "18px",
                                              fontWeight: "550"
                                            }}
                                            variant="borderless"
                                            value={from}
                                            onChange={(e) => {
                                              setFrom(e.target.value);
                                              setQueryFrom(e.target.value);
                                              setOpenFrom(true);
                                            }}
                                            onFocus={(e) => {
                                              e.target.select();
                                              setOpenFrom(true)
                                              setOpenTo(false)
                                            }}
                                            onBlur={() => setTimeout(() => setOpenFrom(false), 10)}
                                          />
                      
                      
                                        </Dropdown>
                                      </Col>
                                      <div
                                        style={{
                                          background: "#fff",
                                          borderRadius: "50%",
                                          width: "36px",
                                          height: "36px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                          cursor: "pointer",
                                          position: "relative",
                                          right: "20px"
                                        }}
                                        onClick={handleSwapChange} >
                                        <SwapOutlined style={{ fontSize: "18px", color: "black" }} />
                                      </div>
                                      <Col style={{
                                        borderRight: "3px solid white",
                                        position: "relative",
                                        width:"310px"
                      
                                      }}>
                                        <p style={{
                                          fontFamily: "Roboto",
                                          color: "grey",
                                          fontSize: "12px",
                                          top: "5px",
                                          position: "relative"
                                        }}>
                                          To
                                        </p>
                                        <Dropdown
                                          popupRender={() => makeDropdownContent(false)}
                                          trigger={[]}
                                          open={openTo}
                                          onOpenChange={(v) => setOpenTo(v)}
                                        >
                                          <Input
                                            style={{
                                              position: "relative",
                                              bottom: "13px",
                                              height: "30px",
                                              right: "11px",
                                              fontFamily: "Roboto",
                                              fontSize: "18px",
                                              fontWeight: "550"
                                            }}
                                            variant="borderless"
                                            value={to}
                                            onChange={(e) => {
                                              setTo(e.target.value);
                                              setQueryTo(e.target.value);
                                              setOpenTo(true);
                                            }}
                                            onFocus={(e) => {
                                              e.target.select();
                                              setOpenTo(true)
                                              setOpenFrom(false)
                                            }}
                                            onBlur={() => setTimeout(() => setOpenTo(false), 10)}>
                      
                                          </Input>
                                        </Dropdown>
                                      </Col >
                      
                                      <Col style={{
                                        borderRight: "3px solid white",
                                        position: "relative",
                                        left: "20px",
                                        width: "135px"
                                      }}>
                                        <p style={{
                                          fontFamily: "Roboto",
                                          color: "grey",
                                          fontSize: "12px",
                                          top: "5px",
                                          position: "relative"
                                        }}>
                                          Departure
                                        </p>
                                        <Text
                                          style={{
                                            position: "relative",
                                            bottom: "13px",
                                            height: "30px",
                                            // right:"11px",
                                            fontFamily: "Roboto",
                                            fontSize: "18px",
                                            fontWeight: "550"
                                          }}
                                        >{dep.weekday}, {dep.day} {dep.month}</Text>
                      
                                        <DatePicker
                                          value={departure}
                                          onChange={handleChange}
                                          disabledDate={disabledDate}
                                          format="YYYY-MM-DD"
                                          className="hidden-datepicker"
                                          style={{
                                            marginBottom:"10px"
                                          }}
                                        />
                                      </Col>
                                      <Col 
                                      
                                      >
                                        {returnTrip ? (
                        <div
                          style={{
                            borderRight: "3px solid white",
                            position: "relative",
                            left: "40px",
                            width: "135px",
                            height: "65px",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Roboto",
                              color: "grey",
                              fontSize: "12px",
                              top: "9px",
                              position: "relative",
                            }}
                          >
                            Return
                          </p>
                      
                          <div style={{ position: "relative", display: "block" }}>
                            <Text
                              style={{
                                position: "relative",
                                bottom: "9px",
                                height: "30px",
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                fontWeight: "550",
                              }}
                            >
                              {ret.weekday}, {ret.day} {ret.month} 
                            </Text>
                      
                            <button
                        style={{
                          position: "absolute",
                          right: "1px",
                          transform: "translateY(-20%)",
                          border: "none",
                          background: "none",
                          fontSize: "16px",
                          color: "#000000ff",
                          cursor: "pointer",
                        }}
                        onClick={() => dispatch(toggleReturnTrip(false))}
                      >
                        <CloseOutlined />
                      </button>
                      
                          </div>
                      
                          <DatePicker
                            value={returnDate}
                            onChange={handleReturnChange}
                            format="YYYY-MM-DD"
                            className="hidden-datepicker"
                            disabledDate={(current) =>
                                              current && current.isBefore(departure.add(1, "day"), "day")
                            }
                            style={{
                              marginBottom: "10px",
                              width: "10px",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            borderRight: "3px solid white",
                            position: "relative",
                            left: "40px",
                            width: "135px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            opacity: 0.6,
                          }}
                          onClick={() => dispatch(toggleReturnTrip(true))}
                        >
                          <Text
                            style={{
                              position: "relative",
                              color: "grey",
                              fontFamily: "Roboto",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                          >
                            Return
                          </Text>
                        </div>
                      )}
                      
                                      </Col>
                                      <div style={{
                                        width: "250px",
                                        
                                      }}>
                                        <Dropdown
                                          trigger={["click"]}
                                          placement="bottomLeft"
                                          arrow
                                          open={openTC}
                                          onOpenChange={(v) => setOpenTC(v)}
                                          popupRender={maketravellerClass}
                                          overlayStyle={{
                                            marginBottom:"10px"
                                          }}
                                        >
                                          {/* ✅ Must be ONE element */}
                                          <div
                                            style={{
                                              borderRight: "3px solid white",
                                              position: "relative",
                                              left: "70px",
                                              cursor: "pointer", // optional: makes it feel clickable
                                              height: "55px",             // ✅ fix the height
                                              display: "flex",
                                              flexDirection: "column",    // stack the label + text vertically
                          
                                            }}
                                          >
                                            <p
                                              style={{
                                                fontFamily: "Roboto",
                                                color: "grey",
                                                fontSize: "12px",
                                                top: "10px",
                                                position: "relative",
                                                margin: 0,
                                              }}
                                            >
                                              Travellers & Class
                                            </p>
                      
                                            <Typography.Text
                                              style={{
                                                position: "relative",
                                                top:"5px",
                                                height: "30px",
                                                fontFamily: "Roboto",
                                                fontSize: "18px",
                                                fontWeight: "550",
                                                whiteSpace: "nowrap",      // keep on one line
                                                overflow: "hidden",        // hide overflow
                                                textOverflow: "ellipsis",  // show "..."
                                                display: "inline-block",   // required for ellipsis to work
                                                maxWidth: "245px",         // adjust width as needed
                                                // verticalAlign: "middle",
                                              }}
                                            >{travellersValue === 1
                                              ? `${travellersValue} Traveller`
                                              : `${travellersValue} Travellers`}, {travelClassValue}
                      
                                            </Typography.Text>
                                          </div>
                                        </Dropdown>
                                      </div>
                                      
                                      <div style={{
                                        
                                      }}>
                                        
                                      <button
                                      style={{
                                  fontFamily: "Roboto",
                                  fontSize: 23,
                                  width: "193px",
                                  height:"55px",  
                                  position: "relative",
                                  left: "70px",
                                  borderTopRightRadius:"10px",
                                  borderBottomRightRadius:"10px",
                                  borderLeftRadius:"none",
                                  background:"orange",
                                  border:"none",
                                  color:"white",
                                  cursor:"pointer",
                                  fontFamily:"Roboto",
                                  fontWeight:500,
                                          
                      
                                }}
                                onClick={handleSearch}
                                >
                                  Search <RightOutlined style={{fontSize:18}}/>
                                      </button>
                                      
                                      </div>
                                      
                      
                                    </Row>
                                  </Card>
                                </div>
                      
                      
                      
                            
                          </>
                      </div>
                    
                  </Card>
        </div>

        <div >
          {!returnTripUI?(
            <div style={{
            fontFamily:"Roboto"
          }}>
            <div style={{
              display:"flex",
              flexDirection:"row",
              width:"90%",
              position:"relative",
              left:"20px",
              
              // justifyContent: "space-around"
            }}>
              <div style={{
                display:"flex",
                alignItems:"flex-start",
                
              }}>
                <div style={{

        width: 300,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
       
      }}>
                  <div style={{
                    height:"35px",
                    display:"flex",
                    alignItems:"center",
                    borderBottom: "1px solid #ccccccff",
                    padding:"12px"
                    
                  }}>
                    <Text style={{
                      position:"relative",
                    
                    fontFamily:"Roboto"
                    }}>Filters</Text>
                  </div>
                  <div
      
    >
      

      {/* Recommended Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          width: "95%",
          padding: "12px",
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: "18px" }}>
          Recommended Filters
        </Text>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Text style={{ fontSize: 12 }}>All</Text>
          <Checkbox
            indeterminate={
              checkedList.length > 0 && checkedList.length < plainOptions.length
            }
            onChange={(e) =>
              setCheckedList(e.target.checked ? [...plainOptions] : [])
            }
            checked={checkedList.length === plainOptions.length}
            style={{ transform: "scale(1.1)", }}
          />
        </div>
      </div>

      {/* Individual Filters */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
          width: "95%",
          padding: "12px",
          marginTop: "-10px",
        }}
      >
        {plainOptions.map((option) => (
          <label
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
          justifyContent: "space-between",
              gap: 10,
              cursor: "pointer",
              fontFamily: "Roboto",
              fontSize: "15px",
            }}
          >
            <Text style={{
              fontWeight:"500"
            }}>{option}</Text>
            <Checkbox
              checked={checkedList.includes(option)}
              onChange={(e) => {
                const newList = e.target.checked
                  ? [...checkedList, option]
                  : checkedList.filter((item) => item !== option);
                setCheckedList(newList);
              }}
              style={{ transform: "scale(1.1)" }}
            />
            
          </label>
        ))}
      </div>
    </div>


     
                  </div>
              </div>
              
              <Card style={{
                  width:"300px"
                }}>Hi</Card>
            </div>
          </div>):(<div>Hello</div>)}
        </div>
    <h3 style={{marginTop:900}}>JJJJ</h3>
    </div>
    </>
  );
}
export default FlightList;