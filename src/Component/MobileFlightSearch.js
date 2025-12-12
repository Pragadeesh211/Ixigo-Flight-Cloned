import React, { useState, useMemo, useEffect, useRef } from "react";
import Link, { useNavigate } from "react-router-dom";
import { DatePicker, Card, Button, Input, Row, Col, Dropdown, Typography } from "antd";
import dayjs from "dayjs"
import { SwapOutlined, RightOutlined, CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "./FlightSearchCard.css"
import { useDispatch, useSelector } from "react-redux";
import {
  setFrom,
  setFromAirport,
  setTo,
  setToAirport,
  setFromCode,
  setToCode,
  swapFromTo,
  toggleReturnTrip,
  setReturnTripUI,
  setDeparture,
  setReturnDate,
  setTravellers,
  setTravellerValue,
  setTravelClass,
} from "../Redux/Slices/FlightSearchSlice";
import useScreenSize from "./UseScreenSize";


const { Text } = Typography;

const MobileFlightSearch = () => {

  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();
  const {
    from,
    fromAirport,
    to,
    toAirport,
    fromCode,
    toCode,
    returnTrip,
    returnTripUI,
    departure,
    returnDate,
    travellers,
    travellerValue,
    travelClass,
    fromCity,
    toCity 
  } = useSelector((state) => state.flightSearch);

  const navigate = useNavigate();





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
    setRetTemp(date)
    if (!returnTrip) {
      // setReturnDate(ret);
      dispatch(setReturnDate(ret))
    }
  }

  const handleSwapChange = () => {
      const tempFrom = from;
    const tempDisplayFrom = displayFrom;
    const tempFromAirport = fromAirpotValue;
  
    
    dispatch(swapFromTo())
  
    
    setDisplayFrom(displayTo);
    setDisplayTo(tempDisplayFrom);
    setFromAirportValue(toAirpotValue);
    setToAirportValue(tempFromAirport);
    }

  const inputFromRef = useRef(null)
  const inputToRef = useRef(null)

  const [errorRoute, setErrorRoute] = useState(false);
  const [displayFrom, setDisplayFrom] = useState(from);
  const [displayTo, setDisplayTo] = useState(to);
  const [fromAirpotValue, setFromAirportValue] = useState("")
  const [toAirpotValue, setToAirportValue] = useState("")

  const makeDropdownContent = (isFrom = true) => {
    const filtered = isFrom ? filteredAirportsFrom : filteredAirportsTo;

    const handleSelect = (airport) => {
      const value = `${airport.code} - ${airport.city.split(",")[0]}`;
      if (isFrom) {
        dispatch(setFrom(value));
        dispatch(setFromCode(airport.code))
        dispatch(setFromAirport(airport.airport))
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
        dispatch(setToCode(airport.code))
        dispatch(setToAirport(airport.airport))
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
          width: 320,
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
            <InfoCircleOutlined style={{ color: "red", fontSize: "17px", position: "relative", right: "3px", top: "1px" }} />
            <Text style={{
              fontSize: "14px",
              position: "relative",
              left: "4px"
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


  const focusHandledRef = useRef(false);
  useEffect(() => {
    if (inputFromRef.current) {
      if (openFrom) {
        inputFromRef.current.select();
      } else {
        inputFromRef.current.blur();
      }
    }

    if (inputToRef.current) {
      if (openTo) {
        inputToRef.current.select();
      } else {
        inputToRef.current.blur();
      }
    }

    if (errorRoute && !focusHandledRef.current) {
      focusHandledRef.current = true;

      // If FROM input is open and same as TO
      if (!openFrom && inputToRef.current) {
        inputFromRef.current?.blur();
        inputToRef.current.focus();
        inputToRef.current.select();
        setOpenTo(false)
        setOpenFrom(true)
      }

      // If TO input is open and same as FROM
      else if (!openTo && inputFromRef.current) {
        inputToRef.current?.blur();
        inputFromRef.current.focus();
        inputFromRef.current.select();
        setOpenFrom(false)
        setOpenTo(true)
      }

      // Reset the flag after a short delay so next time it can trigger again
      setTimeout(() => {
        focusHandledRef.current = false;
      }, 300);
    }
  }, [openTo, openFrom, errorRoute]);

  // const q = queryFrom.trim().toLowerCase();

  // const filteredAirportsFrom = !q
  //   ? popularAirports
  //   : popularAirports.filter(
  //       (a) =>
  //         a.code.toLowerCase().includes(q) ||
  //         a.city.toLowerCase().includes(q) ||
  //         a.airport.toLowerCase().includes(q)
  //     );


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

  const [tempTravellers, setTempTravellers] = useState(travellers);

  const totalTravellers =
    tempTravellers.Adults + tempTravellers.Children + tempTravellers.Infants;

  const isDisabled = (type, number) => {

    if (totalTravellers - tempTravellers[type] + number > 9) return true;


    if (type === "Infants" && number > tempTravellers.Adults) return true;

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

        width: isMobile? 350:500, 
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
            fontSize: "16px",
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
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", flexWrap:isMobile?"wrap":null,position:"relative",top:isMobile?10:null }}>
                {item.values.map((number) => {
                  const disabled = isDisabled(item.type, number)
                  return (
                    <Button
                      key={number}
                      disabled={disabled}
                      onClick={() => {
                        if (!disabled) {

                          setTempTravellers({
                            ...travellers,
                            [item.type]: number,
                          })

                        }
                      }}

                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "30%",
                        background:
                          tempTravellers[item.type] === number
                            ? "#0066ff"
                            : disabled
                              ? "#ffffffff"
                              : "#ffffffff",
                        color: disabled
                          ? "#999"
                          : tempTravellers[item.type] === number
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
  const depToday = dayjs
  // console.log("tempTravellers",travellers)

  const [depTemp, setDepTemp] = useState(dayjs().format("YYYY-MM-DD"));
  const [retTemp, setRetTemp] = useState(dayjs().add(1, "day").format("YYYY-MM-DD"));

  const handleChange = (date) => {
    if (!date) return;

    setDepTemp(date.format("YYYY-MM-DD"));
    setRetTemp(date.add(1, "day").format("YYYY-MM-DD"));
  };


  // console.log("depTemp",depTemp)
  // console.log("retTemp",retTemp)


  const disabledDate = (date) => {
    if (!date) return false;
    return date.isBefore(dayjs().startOf("day"));
  };



  const formatDate = (date) => {
    if (!date) return { day: "", month: "", weekday: "" };
    const d = dayjs(date);
    return {
      day: d.format("DD"),
      month: d.format("MMM"),
      weekday: d.format("ddd"),
    };
  };

  useEffect(() => {
    if (!returnDate && returnTrip) {
      dispatch(toggleReturnTrip(false));
      dispatch(setReturnDate(dayjs().add(1, "day")));
    }

  }, [returnDate, returnTrip, dispatch]);



  const dep = formatDate(depTemp);
  const ret = formatDate(retTemp);




  //   const onSearch = (value) => {
  //   // console.log("Search:", { from, to, value });
  // };

  const handleSearch = () => {
    // // console.log("Flight Search Params:", {
    //   from,
    //   to,
    //   returnTrip,
    //   departure,
    //   returnDate,
    //   travellers,
    //   travelClass,
    // });
    if (from === to) {
      setErrorRoute(true);
      setOpenTo(true);

    } else {
      setErrorRoute(false);
      setOpenFrom(false);
      setOpenTo(false);
      // if(travelClassValue === "Economy"){
      //   navigate("/Economy")
      // }
      navigate("/flightListPage");
    }
    // // console.log(travelClassValue)
    handleReturnTripUI();
    handleinput();
    handleTravellersClass();
  };


  const handleinput = () => {
    dispatch(setDeparture(depTemp));
    dispatch(setReturnDate(retTemp))
  }


  const handleReturnTripUI = () => {
    if (returnTrip) {
      dispatch(setReturnTripUI(true))
    }
    else {
      dispatch(setReturnTripUI(false))
    }
  }
  const handleTravellersClass = () => {
    dispatch(setTravellers(tempTravellers))
    dispatch(setTravelClass(travelClassValue))
    dispatch(setTravellerValue(travellersValue))
  }

  return (
    
   
        <>
          <div style={{ display: "flex", justifyContent: "space-evenly", width: "90%", alignItems: "center" }}>
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
          <div
            style={{
              width: "95%",
              border: "1px solid",
              marginTop: 10,
              display: "flex",
              borderRadius: 10,
              height: "auto",
              padding: 10,
              flexDirection:"column"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems:"center",
                border:"1px solid grey",
                borderRadius:10,
                height:50
              }}
            >
              <div
                style={{
                  width: "50%",
                  padding: "5px",
                 
                  
                }}
              >
                <p style={{
                    fontFamily: "Roboto",
                    color: "grey",
                    fontSize: "12px",
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
                      ref={inputFromRef}
                      style={{
                        position: "relative",
                        bottom: "15px",
                        height: "30px",
                        right: "11px",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "550"
                      }}
                      variant="borderless"
                      value={displayFrom}
                      onChange={(e) => {
                        setDisplayFrom(e.target.value);
                        setQueryFrom(e.target.value);
                        setOpenFrom(true);
                      }}
                      onFocus={(e) => {
                        const city = from?.split(" - ")[1];
                        if (city) setDisplayFrom(city);
                        setOpenFrom(true)
                        setOpenTo(false)
                      }}

                      onBlur={() => {
                        setTimeout(() => setOpenFrom(false), 10)
                        setDisplayFrom(from);
                      }
                      }
                    />


                  </Dropdown>
              </div>
              <div >
                <SwapOutlined style={{ fontSize: "18px", color: "black" }} onClick={()=>handleSwapChange()}/>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",   
                  textAlign: "end"
                }}
              >
                <p style={{
                    fontFamily: "Roboto",
                    color: "grey",
                    fontSize: "12px",
                    position: "relative",
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
                      ref={inputToRef}
                      style={{
                        position: "relative",
                        bottom: "15px",
                        height: "30px",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: "550",
                        textAlign: "end" ,
                        left:10
                      }}
                      variant="borderless"
                      value={displayTo}
                      onChange={(e) => {
                        setDisplayTo(e.target.value)
                        setQueryTo(e.target.value);
                        setOpenTo(true);
                      }}
                      onFocus={(e) => {
                        const city = to?.split(" - ")[1];
                        if (city) setDisplayTo(city);
                        setOpenTo(true)
                        setOpenFrom(false)

                      }}
                      onBlur={(e) => {
                        setTimeout(() => setOpenTo(false), 10)
                        setDisplayTo(to);
                      }}>

                    </Input>
                  </Dropdown>
              </div>
               
            </div>
            
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems:"center",
                border:"1px solid grey",
                borderRadius:10,
                height:50,
                marginTop:10
              }}>
              <div style={{
                width:"50%",
                padding:5
              }}>
                <p style={{
                    fontFamily: "Roboto",
                    color: "grey",
                    fontSize: "12px",
                    position: "relative",
                    top:45
                  }}>
                    Departure
                  </p>
                  <Text
                    style={{
                      position: "relative",
                      height: "30px",
                      // right:"11px",
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: "550",
                      top:35
                    }}
                  >{dep.weekday}, {dep.day} {dep.month}</Text>

                  <DatePicker
                    value={dayjs(depTemp, "YYYY-MM-DD")}
                    onChange={handleChange}
                    disabledDate={disabledDate}
                    format="YYYY-MM-DD"
                    className="hidden-datepicker1"
                    style={{
                      marginBottom: "60px",

                    }}
                  />
              </div>
              {returnTrip && <Text style={{
                fontSize:18,fontWeight:700
              }}>-</Text>}
              <div style={{
                  width: "50%",
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",   
                  textAlign: "end"
                }}>
                {returnTrip? 
                (
                  <>
                  <p style={{
                    fontFamily: "Roboto",
                    color: "grey",
                    fontSize: "12px",
                    position: "relative",
                    top:25
                  }}>
                    Return
                  </p>
                  <Text
                    style={{
                      position: "relative",
                      height: "30px",

                      fontFamily: "Roboto",
                      fontSize: "14px",
                      fontWeight: "550",
                      top:13
                    }}
                  >{ret.weekday}, {ret.day} {ret.month}</Text>
                  <DatePicker
                        value={dayjs(retTemp, "YYYY-MM-DD")}
                        onChange={handleReturnChange}
                        format="YYYY-MM-DD"
                        className="hidden-datepicker1"
                        disabledDate={(current) => current && current < dayjs().add(1, "day").startOf("day")}
                        style={{
                          marginBottom: "10px",
                        
                        }}
                      />
                  </>
                ):(
                  null
                )}
              </div>
            </div>
             <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems:"center",
                textAlign:"center",
                width: "100%",
                alignItems:"center",
                border:"1px solid grey",
                borderRadius:10,
                height:50,
                marginTop:10
              }}>
                <Dropdown
                    trigger={["click"]}
                    placement="bottom"
                    arrow
                    open={openTC}
                    onOpenChange={(v) => setOpenTC(v)}
                    popupRender={maketravellerClass}
                    overlayStyle={{
                      marginBottom: "10px",
                    }}
                  >
                    {/* ✅ Must be ONE element */}
                    <div
                      style={{
                        borderRight: "3px solid white",
                        position: "relative",
                      
                        cursor: "pointer", 
                        height: "55px",             
                        display: "flex",
                        flexDirection: "column",    

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
                          alignItems:"center",
                          textAlign:"center"
                        }}
                      >
                        Travellers & Class
                      </p>

                      <Typography.Text
                        style={{
                          position: "relative",
                          top: "5px",
                          height: "30px",
                          fontFamily: "Roboto",
                          fontSize: "18px",
                          fontWeight: "550",
                        
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                alignItems:"center",
                background:"#ff7a00",
                borderRadius:10,
                height:50,
                marginTop:10,
                cursor:"pointer",
                color:"white",
                fontSize:20
              }} onClick={handleSearch}>
                Search
              </div>
          </div>
          

        </>
     

  )
}

export default MobileFlightSearch;