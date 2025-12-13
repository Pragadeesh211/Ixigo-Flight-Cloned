// SeatSelectionPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import "./AddOns.css";
import { useSelector } from "react-redux";
import { Button, Col, ConfigProvider, Divider, Row, Skeleton, Typography, message } from "antd";
import dayjs from "dayjs";
import { DownOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";
import ContinueButton from "../../Component/ContinueButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentState } from "../../Redux/Slices/FlightSearchSlice";
import useScreenSize from "../../Component/UseScreenSize";

const { Text } = Typography;




const ROWS = ["A", "B", "C", "D", "E", "F"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];


const buildSeats = () => {
  const seats = [];
  for (let r = 0; r < ROWS.length; r++) {
    for (let c = 0; c < COLS.length; c++) {
      const id = `${ROWS[r]}${COLS[c]}`;
      // make some booked and some premium for demo
      const rand = Math.random();
      seats.push({
        id,
        row: ROWS[r],
        col: COLS[c],
        status: rand < 0.12 ? "booked" : "available",
        type: rand > 0.85 ? "premium" : "standard",
        // price: rand > 0.85 ? 1900 : 350 + Math.round(Math.random() * 650),
      });
    }
  }
  return seats;
}




const responsiveStyles = `
  /* Mobile First Defaults */
  .addon-page-wrapper {
    background-color: #4f4f4f14;
    padding-top: 70px;
    padding-bottom: 200px;
    min-height: 100vh;
  }

  .addon-main-layout {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
  }

  .addon-sidebar1 {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 20px;
    width: 100%;
    padding-bottom: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
    .addon-sidebar {
    margin-top: 30px;
    background: #fff;
    width: 325px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    border-radius: 20px;
  }

 

  .addon-content {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 20px;
    width: 100%;
    padding-bottom: 50px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  
  .skeleton-sidebar {
    width: 100%;
    background: #fff;
    border-radius: 20px;
    padding-bottom: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  //  .addon-sidebar-sticky{
  //  margin-bottom: 20px;
  //  } 

  .skeleton-content {
    width: 100%;
    background: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    height: 600px;
  }

  /* Updated Seat Map with CSS Grid */
  .seat-map-container {
    padding: 20px;
    overflow-x: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .seat-grid-wrapper {
    display: grid;
    /* 1 column for row label, then N columns for seats */
    grid-template-columns: 40px repeat(8, 45px); 
    gap: 12px;
    align-items: center;
  }

  .seat-header-row {
     display: contents; /* Allows children to participate in the grid */
  }

  .seat-col-header {
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
  }

  .seat-row-label {
    font-weight: bold;
    position: sticky;
    left: 0;
    background: white;
    z-index: 10;
    text-align: center;
  }

  .seat-item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .seat-spacer {
    grid-column: 1 / -1; /* Span full width */
    height: 20px;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    z-index: 1000;
    background-color: #fff;
    padding: 0px 20px;
    left: 0;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .bottom-bar-price {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
    .continue-btn{
    background: rgb(255, 122, 0);
    border: none;
    border-radius: 10px;
    width: 145px;
    height: 40px;
    font-size: 17px;
    color: white;
    cursor: pointer;
    // margin-right: 40px;
}

  @media (min-width: 768px) {
    .addon-main-layout {
      flex-direction: row;
      align-items: flex-start;
      padding: 20px;
      justify-content: center;
    }
    
    .addon-sidebar {
      max-width: 365px;
      flex-shrink: 0;
    }
    
    .addon-sidebar-sticky {
      position: sticky;
      top: 90px;
      height: fit-content;
    }
    
    .skeleton-sidebar {
      width: 375px;
      margin-bottom: 0;
    }
    
    .skeleton-content {
      width: 975px;
    }

    .addon-content {
      width: auto;
      flex: 1;
      max-width: 975px;
    }

    .bottom-bar {
      width: 938px;
        left: 30.5%;
       padding: 0px 20px;
        flex-wrap: nowrap;
        height: 90px!important;
        
    }

    
    .bottom-bar-price {
      flex-direction: row;
      align-items: center;
    }
    
    .continue-btn{
     background: rgb(255, 122, 0);
    border: none;
    border-radius: 10px;
    width: 125px;
    height: 40px;
    font-size: 17px;
    color: white;
    cursor: pointer;
    margin-right: 40px;
    
    }
  }
`;

export default function AddOns() {
  const [seats] = useState(buildSeats());
  const [selected, setSelected] = useState([]);
  const [seats2] = useState(buildSeats());
  const [selected2, setSelected2] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {isMobile} = useScreenSize();

  useEffect(() => {
    if (location.pathname === "/addOns") {
      dispatch(setCurrentState(2));

    }
  }, [location, dispatch]);


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
    refundFeeAdd,
    refundValue,
    shouldReset,
    currentState,
    travellerDetails,
    finalAmount,
    promoRadioValue
  } = useSelector((state) => state.flightSearch);

  const [assignSeats, setAssignSeats] = useState([travellerDetails]);
  const [travellerIndex, setTravellerIndex] = useState(0);
  console.log("jjjj", assignSeats)

  console.log("endaa2", refundValue)
  const [visibleCount, setVisibleCount] = useState(1);
  const showMore = visibleCount < travellerDetails.length;

  const [swapButton, setSwapButton] = useState(false)
  const handleOnwardSwap = () => {
    setSwapButton(false)
  }
  const handleReturnSwap = () => {
    if (selected.length !== travellerValue) {
      messageApi.destroy("check");
      messageApi.open({
        key: "check",
        type: "error",
        content: `Please select ${travellerValue} ${travellerValue === 1 ? "Seat" : "Seats"} from  ${fromCode} - ${toCode} then move to next flight`,
        duration: 3,
      });
      return;
    }
    setSwapButton(true)
  }


  const baseFare = Math.ceil(totalAmount / 1.34);


  const tax = totalAmount - baseFare;




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
  const ret = formatDate(returnDate)





  const seatMap = useMemo(() => {

    const map = {};
    ROWS.forEach(r => map[r] = []);
    seats.forEach(s => map[s.row].push(s));
    return map;
  }, [seats]);


  const seatMap2 = useMemo(() => {

    const map = {};
    ROWS.forEach(r => map[r] = []);
    seats.forEach(s => map[s.row].push(s));
    return map;
  }, [seats2]);

  const toggleSelect = (seat) => {
    if (seat.status === "booked") return;
    setSelected(prev => {

      if (prev.includes(seat.id)) {
        return prev.filter(x => x !== seat.id);
      }
      if (prev.length < travellerValue) {
        return [...prev, seat.id];
      }
      return [...prev.slice(0, travellerValue - 1), seat.id];;

    });




  };

  const toggleSelect2 = (seat) => {
    if (seat.status === "booked") return;
    setSelected2(prev => {

      if (prev.includes(seat.id)) {
        return prev.filter(x => x !== seat.id);
      }
      if (prev.length < travellerValue) {
        return [...prev, seat.id];
      }
      return [...prev.slice(0, travellerValue - 1), seat.id];;

    });




  };



  console.log("aaaaaaa", selected)




  const [pageLoading, setPageLoading] = useState(true);




  useEffect(() => {
    setPageLoading(true);

    const timer = setTimeout(() => setPageLoading(false), 1500);

    return () => clearTimeout(timer);
  }, []);



  return (

    <>
      {pageLoading ? (
        <>
          <div className="addon-main-layout" style={{ marginTop: 70 }}>


            <div
              className="skeleton-sidebar"
            >
              <Skeleton active paragraph={{ rows: 16 }} />
            </div>

            <div
              className="skeleton-content"
            >
              <Skeleton active paragraph={{ rows: 16 }} />
            </div>




          </div>
        </>
      ) : (
        <>
          <style>{responsiveStyles}</style>
          <div className="addon-page-wrapper">
            <div className="addon-main-layout">
              <div className="addon-sidebar-sticky">
                <div className="addon-sidebar1">
                  <div style={{
                    padding: 20,
                    borderBottom: "1px solid #b8b8bcff"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                    }}>
                      <Text style={{ fontSize: 18, fontWeight: 700 }}>Your Flight</Text>
                      {returnTripUI ? <Text type="secondary" style={{ fontSize: 16, fontWeight: 500 }}>Round Trip</Text> : <Text type="secondary" style={{ fontSize: 16, fontWeight: 500 }}>One Way</Text>}

                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", background: "#ffe1b3", width: 100, justifyContent: "center",
                      borderRadius: 5, marginTop: 10
                    }}>
                      <Text style={{
                        fontSize: 14, fontWeight: 500
                      }}>{dep.weekday}, {dep.day} {dep.month}</Text>

                    </div>
                    <div style={{
                      marginTop: 15, height: 35
                    }}>
                      {onewaySelectedFlight.map((item, idx) => (
                        <div key={idx} style={{
                          display: "flex", flexDirection: "row", gap: 20
                        }}>
                          <img src={item?.logo} style={{
                            height: 35
                          }} />
                          <div style={{
                            display: "flex", flexDirection: "column", position: "relative", bottom: 8
                          }}>
                            <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.departureTime}</Text>
                            <Text>{fromCity}</Text>
                          </div>
                          <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center", position: "relative", bottom: 8
                          }}>
                            <Text >{item.durations}</Text>
                            <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg">
                            </img>
                            <Text>{item.stops}</Text>
                          </div>
                          <div style={{
                            display: "flex", flexDirection: "column", position: "relative", bottom: 8
                          }}>
                            <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.arrivalTime}</Text>
                            <Text>{toCity}</Text>
                          </div>

                        </div>
                      ))}


                    </div>

                    {returnTripUI && (
                      <>
                        <div style={{
                          marginTop: 20, borderTop: "1px solid #b8b8bcff"
                        }}>
                          <div style={{
                            display: "flex", alignItems: "center", background: "#ffe1b3", width: 100, justifyContent: "center",
                            borderRadius: 5, marginTop: 10
                          }}>
                            <Text style={{
                              fontSize: 14, fontWeight: 500
                            }}>{ret.weekday}, {ret.day} {ret.month}</Text>

                          </div>

                          <div style={{
                            marginTop: 15, height: 35,
                          }}>
                            {returnSelectedFlight.map((item, idx) => (
                              <div key={idx} style={{
                                display: "flex", flexDirection: "row", gap: 20,
                              }}>
                                <img src={item?.logo} style={{
                                  height: 35
                                }} />
                                <div style={{
                                  display: "flex", flexDirection: "column", position: "relative", bottom: 8
                                }}>
                                  <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.departureTime}</Text>
                                  <Text>{toCity}</Text>
                                </div>
                                <div style={{
                                  display: "flex", flexDirection: "column", alignItems: "center", position: "relative", bottom: 8
                                }}>
                                  <Text >{item.durations}</Text>
                                  <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg">
                                  </img>
                                  <Text>{item.stops}</Text>
                                </div>
                                <div style={{
                                  display: "flex", flexDirection: "column", position: "relative", bottom: 8
                                }}>
                                  <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.arrivalTime}</Text>
                                  <Text>{fromCity}</Text>
                                </div>

                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}


                  </div>
                  <div style={{
                    padding: 20, display: "flex", flexDirection: "column"
                  }}>
                    <Text style={{ fontSize: 18, fontWeight: 700 }}>
                      Travellers
                    </Text>
                    {travellerDetails.slice(0, visibleCount).map((item, idx) => (
                      <Text key={idx} style={{
                        fontSize: 15, fontWeight: 500, transition: "all 0.5s ease"
                      }}>
                        {idx + 1} {item.firstName} {item.lastName}
                      </Text>
                    ))}
                    {travellerDetails.length > 1 && (
                      <Button
                        type="link"
                        onClick={() =>
                          showMore
                            ? setVisibleCount(travellerDetails.length)
                            : setVisibleCount(1)
                        }
                        style={{
                          color: "#ff6600",
                          fontWeight: 500,
                          fontSize: "14px",
                        }}
                      >
                        {showMore ? (
                          <>
                            +{travellerDetails.length - 1} More <DownOutlined style={{ fontSize: 11 }} />
                          </>
                        ) : (
                          <>
                            Hide <UpOutlined style={{ fontSize: 11 }} />
                          </>
                        )}
                      </Button>
                    )}

                  </div>
                </div>

                <div className="addon-sidebar" style={{
                  marginTop: 30,
                  padding: 20,
                  paddingBottom: "30px",
                }}>

                  <Row style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}>

                    <Text style={{
                      fontSize: 24, fontWeight: 700
                    }}>Fare Summary</Text>


                    <Text style={{
                      fontSize: 14, fontWeight: 500, marginTop: 5, color: "#5e616e"
                    }}>
                      {travellerValue === 1
                        ? `${travellerValue} Traveller`
                        : `${travellerValue} Travellers`}
                    </Text>
                  </Row>
                  <Row style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%", marginTop: 8
                  }}>

                    <Text style={{
                      fontSize: 16, fontWeight: 500
                    }}>Fare Type</Text>


                    <Text type="secondary" style={{
                      fontSize: 16, fontWeight: 600, color: "#238c46"
                    }}>
                      Partially Refundable
                    </Text>
                  </Row>
                  <Row style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%", marginTop: 8
                  }}>

                    <Text style={{
                      fontSize: 16, fontWeight: 500
                    }}>Base Fare</Text>


                    <Text style={{
                      fontSize: 16, fontWeight: 600
                    }}>
                      ₹{baseFare.toLocaleString("en-IN")}
                    </Text>
                  </Row>

                  {/* Assured fee */}

                  {refundValue.planType === "Free Cancellation" && (
                    <Row style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%", marginTop: 8
                    }}>

                      <Text style={{
                        fontSize: 16, fontWeight: 500
                      }}>Assured Fee*</Text>


                      <Text style={{
                        fontSize: 16, fontWeight: 600
                      }}>

                        <>₹{refundValue.price > 0 ? (refundValue?.price * travellerValue).toLocaleString("en-IN") : null}</>



                      </Text>
                    </Row>)}
                  {refundValue.planType === "Rescheduling" && (
                    <Row style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%", marginTop: 8
                    }}>

                      <Text style={{
                        fontSize: 16, fontWeight: 500
                      }}>Assured Fee*</Text>


                      <Text style={{
                        fontSize: 16, fontWeight: 600
                      }}>

                        <>₹{refundValue.price > 0 ? (refundValue?.price * travellerValue).toLocaleString("en-IN") : null}</>



                      </Text>
                    </Row>)}


                  <Row style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%", marginTop: 8, borderBottom: "1px solid #dcd3d3ff", paddingBottom: "10px"
                  }}>

                    <Text style={{
                      fontSize: 16, fontWeight: 500
                    }}>Taxes & Fees</Text>


                    <Text style={{
                      fontSize: 16, fontWeight: 600
                    }}>
                      ₹{tax.toLocaleString("en-IN")}
                    </Text>
                  </Row>
                  {promoRadioValue !== 0 ? (<Row style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%", marginTop: 8, borderBottom: "1px solid #dcd3d3ff", paddingBottom: "10px"
                  }}>

                    <Text style={{
                      fontSize: 16, fontWeight: 500
                    }}>Instant Off</Text>


                    <Text style={{
                      fontSize: 16, fontWeight: 600, color: "#238c46"
                    }}>
                      -₹{promoRadioValue?.toLocaleString("en-IN")}
                    </Text>
                  </Row>) : null}
                  <Row style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%", marginTop: 8
                  }}>

                    <Text style={{
                      fontSize: 17, fontWeight: 700
                    }}>Total Amount</Text>


                    <Text style={{
                      fontSize: 17, fontWeight: 700
                    }}>
                      ₹{finalAmount.toLocaleString("en-IN")}
                    </Text>
                  </Row>
                </div>
              </div>

              <div className="addon-content">
                <div style={{
                  borderBottom: "1px solid #b8b8bcff", padding: 20
                }}>
                  <Text style={{
                    fontSize: 18, fontWeight: 700
                  }}>Seat</Text>
                  {returnTripUI && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", maxWidth: "300px", marginTop: 10, alignSelf: "center" }}>
                        <Button shape="round" size="medium"
                          onClick={handleOnwardSwap}
                          style={{
                            fontFamily: "Roboto",
                            fontSize: 16,
                            color: swapButton ? "black" : "#288ee7ff",
                            backgroundColor: swapButton ? "white" : "#f2f9ff",
                            borderColor: swapButton ? null : "#288ee7ff",
                            transition: "all 0.15 cubic-bezier(.4,0,.2,1)",

                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = swapButton ? "#eeeeeeff" : "#f2f9ff";
                            e.currentTarget.style.color = swapButton ? "black" : "#288ee7ff";

                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white";
                            e.currentTarget.style.color = swapButton ? "black" : "288ee7ff";
                          }}>{`${fromCode} - ${toCode}`}</Button>
                        <Button shape="round" size="medium" type={swapButton ? "primary" : "default"}
                          onClick={handleReturnSwap}
                          style={{
                            fontFamily: "Roboto",
                            fontSize: 16,
                            color: !swapButton ? "black" : "#288ee7ff",
                            backgroundColor: !swapButton ? "white" : "#f2f9ff",
                            borderColor: !swapButton ? null : "#288ee7ff",
                            transition: "all 0.15 cubic-bezier(.4,0,.2,1)",

                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = !swapButton ? "#eeeeeeff" : "#f2f9ff";
                            e.currentTarget.style.color = !swapButton ? "black" : "#288ee7ff";

                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white";
                            e.currentTarget.style.color = !swapButton ? "black" : "288ee7ff";
                          }}>{`${toCode} - ${fromCode}`}</Button>
                      </div>

                      <div className="seat-map-container">

                        {!swapButton ?
                          (
                            <div className="seat-grid-wrapper">
                              {/* Header Row */}
                              <div className="seat-header-row">
                                <div className="seat-col-header"></div> {/* Empty corner for row labels */}
                                {COLS.map((item) => (
                                  <div key={item} className="seat-col-header">{item}</div>
                                ))}
                              </div>

                              {/* Rows */}
                              {ROWS.map((row, idx) => (
                                <React.Fragment key={row}>
                                  {/* Row Label */}
                                  <div className="seat-row-label">{row}</div>

                                  {/* Seats */}
                                  {seatMap[row].map(seat => {
                                    const isSelected = selected.includes(seat.id);

                                    let imgSrc =
                                      "https://images.ixigo.com/image/upload/ancillary/seats/f722b864dd8d6029f649ec48099e5bb5-ihhyv.png"; // default
                                    if (seat.status === "booked") {
                                      imgSrc =
                                        "https://images.ixigo.com/image/upload/ancillary/seats/c3a8ebbd804267a4872852e41b362aa6-tgzpa.png";
                                    } if (seat.type === "premium") {
                                      imgSrc =
                                        "https://images.ixigo.com/image/upload/ancillary/seats/f722b864dd8d6029f649ec48099e5bb5-ihhyv.png";
                                    }
                                    if (isSelected) {
                                      imgSrc = "https://images.ixigo.com/image/upload/ancillary/seats/6dd356549245a947848af23d8a189302-uxuow.png"
                                    }

                                    return (
                                      <div
                                        key={seat.id}
                                        className="seat-item"
                                        onClick={() => toggleSelect(seat)}
                                        style={{
                                          cursor: seat.status === "booked" ? "not-allowed" : "pointer",
                                        }}
                                      >
                                        <img
                                          src={imgSrc}
                                          alt={seat.id}
                                          style={{
                                            width: 32,
                                            height: 32,
                                            opacity: seat.status === "booked" ? 0.6 : 1,
                                            transform: "rotate(-90deg)",
                                            backgroundImage: "https://images.ixigo.com/image/upload/ancillary/seats/6dd356549245a947848af23d8a189302-uxuow.png"
                                          }}
                                        />
                                      </div>
                                    );
                                  })}

                                  {/* Spacer after every 3rd row (optional, matching original logic) */}
                                  {(idx + 1) % 3 === 0 && <div className="seat-spacer"></div>}
                                </React.Fragment>
                              ))}
                            </div>
                          ) : (
                            <div className="seat-grid-wrapper">
                              {/* Header Row */}
                              <div className="seat-header-row">
                                <div className="seat-col-header"></div>
                                {COLS.map((item) => (
                                  <div key={item} className="seat-col-header">{item}</div>
                                ))}
                              </div>

                              {/* Rows */}
                              {ROWS.map((row, idx) => (
                                <React.Fragment key={row}>
                                  <div className="seat-row-label">{row}</div>
                                  {seatMap2[row].map(seat => {
                                    const isSelected = selected2.includes(seat.id);

                                    let imgSrc =
                                      "https://images.ixigo.com/image/upload/ancillary/seats/f722b864dd8d6029f649ec48099e5bb5-ihhyv.png"; // default
                                    if (seat.status === "booked") {
                                      imgSrc =
                                        "https://images.ixigo.com/image/upload/ancillary/seats/c3a8ebbd804267a4872852e41b362aa6-tgzpa.png";
                                    } if (seat.type === "premium") {
                                      imgSrc =
                                        "https://images.ixigo.com/image/upload/ancillary/seats/f722b864dd8d6029f649ec48099e5bb5-ihhyv.png";
                                    }
                                    if (isSelected) {
                                      imgSrc = "https://images.ixigo.com/image/upload/ancillary/seats/6dd356549245a947848af23d8a189302-uxuow.png"
                                    }

                                    return (
                                      <div
                                        key={seat.id}
                                        className="seat-item"
                                        onClick={() => toggleSelect2(seat)}
                                        style={{
                                          cursor: seat.status === "booked" ? "not-allowed" : "pointer",
                                        }}
                                      >
                                        <img
                                          src={imgSrc}
                                          alt={seat.id}
                                          style={{
                                            width: 32,
                                            height: 32,
                                            opacity: seat.status === "booked" ? 0.6 : 1,
                                            transform: "rotate(-90deg)",
                                            backgroundImage: "https://images.ixigo.com/image/upload/ancillary/seats/6dd356549245a947848af23d8a189302-uxuow.png"
                                          }}
                                        />
                                      </div>
                                    );
                                  })}
                                  {(idx + 1) % 3 === 0 && <div className="seat-spacer"></div>}
                                </React.Fragment>
                              ))}
                            </div>
                          )}

                      </div>
                    </>
                  )}

                  <div>
                    {!returnTripUI && (
                      <div className="seat-map-container">
                        <div className="seat-grid-wrapper">
                          {/* Header Row */}
                          <div className="seat-header-row">
                            <div className="seat-col-header"></div>
                            {COLS.map((item) => (
                              <div key={item} className="seat-col-header">{item}</div>
                            ))}
                          </div>

                          {/* Rows */}
                          {ROWS.map((row, idx) => (
                            <React.Fragment key={row}>
                              {/* Row Label */}
                              <div className="seat-row-label">{row}</div>

                              {/* Seats */}
                              {seatMap[row].map(seat => {
                                const isSelected = selected.includes(seat.id);

                                let imgSrc =
                                  "https://images.ixigo.com/image/upload/ancillary/seats/f722b864dd8d6029f649ec48099e5bb5-ihhyv.png"; // default
                                if (seat.status === "booked") {
                                  imgSrc =
                                    "https://images.ixigo.com/image/upload/ancillary/seats/c3a8ebbd804267a4872852e41b362aa6-tgzpa.png";
                                } if (seat.type === "premium") {
                                  imgSrc =
                                    "https://images.ixigo.com/image/upload/ancillary/seats/f722b864dd8d6029f649ec48099e5bb5-ihhyv.png";
                                }
                                if (isSelected) {
                                  imgSrc = "https://images.ixigo.com/image/upload/ancillary/seats/6dd356549245a947848af23d8a189302-uxuow.png"
                                }

                                return (
                                  <div
                                    key={seat.id}
                                    className="seat-item"
                                    onClick={() => toggleSelect(seat)}
                                    style={{
                                      cursor: seat.status === "booked" ? "not-allowed" : "pointer",
                                    }}
                                  >
                                    <img
                                      src={imgSrc}
                                      alt={seat.id}
                                      style={{
                                        width: 32,
                                        height: 32,
                                        opacity: seat.status === "booked" ? 0.6 : 1,
                                        transform: "rotate(-90deg)",
                                        backgroundImage: "https://images.ixigo.com/image/upload/ancillary/seats/6dd356549245a947848af23d8a189302-uxuow.png"
                                      }}
                                    />
                                  </div>
                                );
                              })}

                              {/* Spacer */}
                              {(idx + 1) % 3 === 0 && <div className="seat-spacer"></div>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>



                </div>
                {!returnTripUI && (
                  <div style={{
                    display: "flex", flexWrap: "wrap", padding: 20, gap: 20
                  }}>

                    {travellerDetails?.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        border: "1px solid #b8b8bcff",
                        padding: 10, flexDirection: "column", borderRadius: 10, height: 45
                      }}>
                        <Text style={{ fontSize: 15, fontWeight: 500 }}>{item.firstName} {item.lastName}</Text>
                        <div>
                          {!selected[idx]
                            ? <Text type="secondary" style={{ fontWeight: 500 }}>Select seat</Text>
                            : (
                              <>
                                <Text type="secondary" style={{ fontWeight: 500 }}>
                                  {selected[idx]} -
                                </Text>
                                <Text type="secondary" style={{ fontWeight: 500 }}>
                                  {(selected[idx].charAt(0) === "A" || selected[idx].charAt(0) === "F")
                                    ? "Window Seat"
                                    : null}
                                  {(selected[idx].charAt(0) === "B" || selected[idx].charAt(0) === "E")
                                    ? "Middle Seat"
                                    : null}
                                  {(selected[idx].charAt(0) === "C" || selected[idx].charAt(0) === "D")
                                    ? "Aisle Seat"
                                    : null}
                                </Text>
                              </>
                            )
                          }

                        </div>


                      </div>
                    ))}

                  </div>
                )}
                <div>
                  {returnTripUI && (
                    <>
                      {!swapButton ? (
                        <div style={{
                          display: "flex", flexWrap: "wrap", padding: 20, gap: 20
                        }}>

                          {travellerDetails?.map((item, idx) => (
                            <div key={idx} style={{
                              display: "flex",
                              border: "1px solid #b8b8bcff",
                              padding: 10, flexDirection: "column", borderRadius: 10, height: 45
                            }}>
                              <Text style={{ fontSize: 15, fontWeight: 500 }}>{item.firstName} {item.lastName}</Text>
                              <div>
                                {!selected[idx]
                                  ? <Text type="secondary" style={{ fontWeight: 500 }}>Select seat</Text>
                                  : (
                                    <>
                                      <Text type="secondary" style={{ fontWeight: 500 }}>
                                        {selected[idx]} -
                                      </Text>
                                      <Text type="secondary" style={{ fontWeight: 500 }}>
                                        {(selected[idx].charAt(0) === "A" || selected[idx].charAt(0) === "F")
                                          ? "Window Seat"
                                          : null}
                                        {(selected[idx].charAt(0) === "B" || selected[idx].charAt(0) === "E")
                                          ? "Middle Seat"
                                          : null}
                                        {(selected[idx].charAt(0) === "C" || selected[idx].charAt(0) === "D")
                                          ? "Aisle Seat"
                                          : null}
                                      </Text>
                                    </>
                                  )
                                }

                              </div>


                            </div>
                          ))}

                        </div>
                      ) : (

                        <div style={{
                          display: "flex", flexWrap: "wrap", padding: 20, gap: 20
                        }}>

                          {travellerDetails?.map((item, idx) => (
                            <div key={idx} style={{
                              display: "flex",
                              border: "1px solid #b8b8bcff",
                              padding: 10, flexDirection: "column", borderRadius: 10, height: 45
                            }}>
                              <Text style={{ fontSize: 15, fontWeight: 500 }}>{item.firstName} {item.lastName}</Text>
                              <div>
                                {!selected2[idx]
                                  ? <Text type="secondary" style={{ fontWeight: 500 }}>Select seat</Text>
                                  : (
                                    <>
                                      <Text type="secondary" style={{ fontWeight: 500 }}>
                                        {selected2[idx]} -
                                      </Text>
                                      <Text type="secondary" style={{ fontWeight: 500 }}>
                                        {(selected2[idx].charAt(0) === "A" || selected2[idx].charAt(0) === "F")
                                          ? "Window Seat"
                                          : null}
                                        {(selected2[idx].charAt(0) === "B" || selected2[idx].charAt(0) === "E")
                                          ? "Middle Seat"
                                          : null}
                                        {(selected2[idx].charAt(0) === "C" || selected2[idx].charAt(0) === "D")
                                          ? "Aisle Seat"
                                          : null}
                                      </Text>
                                    </>
                                  )
                                }

                              </div>


                            </div>
                          ))}

                        </div>
                      )}
                    </>

                  )}
                </div>

              </div>

            </div>

            <div className="bottom-bar" style={{
              height: isMobile ? "100px" : null,
              justifyContent: isMobile ? "space-around" : "space-between", padding: isMobile ? "0px 5px" : null 
            }}>
              <div className="bottom-bar-price">
                <Text style={{
                  fontSize: 24, fontWeight: 600
                }}>
                  ₹{finalAmount.toLocaleString("en-IN")}

                </Text>
                <div style={{
                  display: "flex", marginLeft: 5, alignItems: "center"
                }}>
                  <s style={{
                    color: "#b22422"
                  }}>{promoRadioValue ? `₹ ${(
                    totalAmount +
                    (refundValue?.planType === "Free Cancellation" || refundValue?.planType === "Rescheduling"
                      ? refundValue.price * travellerValue
                      : 0)
                  ).toLocaleString("en-IN")
                    }`
                    : null}</s>
                  <Text style={{
                    color: "#5e616e", marginTop: -2, fontWeight: 500,
                  }}> &nbsp;  {travellerValue === 1
                    ? null
                    : `•  ${travellerValue} Travellers`}</Text>
                </div>

              </div>
              <ConfigProvider
                theme={{
                  token: {
                    colorBgElevated: "black",
                    colorText: "white",
                  },
                }}
              >
                {contextHolder}

              </ConfigProvider>
              <div>
                {!returnTripUI ? (
                  <>
                    <ContinueButton
                     
                      text="Continue"
                      className="continue-btn"
                      onClick={() => {
                        if (selected.length !== travellerValue) {
                          messageApi.destroy("child-check");
                          messageApi.open({
                            key: "child-check",
                            type: "error",
                            content: `Please select ${travellerValue} ${travellerValue === 1 ? "Seat" : "Seats"} to Continue`,
                            duration: 3,
                          });
                          return;
                        }
                        dispatch(setCurrentState(3))
                        navigate("/payment")
                      }}
                    />


                  </>
                ) : (
                  <>
                    {!swapButton ? (
                      <>
                        <ContinueButton
                          text="Next Flight"
                          onClick={() => {
                            if (selected.length !== travellerValue) {
                              messageApi.destroy("check");
                              messageApi.open({
                                key: "check",
                                type: "error",
                                content: `Please select ${travellerValue} ${travellerValue === 1 ? "Seat" : "Seats"} from  ${fromCode} - ${toCode} then move to next flight`,
                                duration: 3,
                              });
                              return;
                            }
                            setSwapButton(true)
                          }}
                        >

                        </ContinueButton>
                      </>
                    ) : (
                      <>
                        <ContinueButton
                          text="Continue"
                          onClick={() => {


                            if (selected2.length !== travellerValue) {
                              messageApi.destroy("check");
                              messageApi.open({
                                key: "check",
                                type: "error",
                                content: `Please select ${travellerValue} ${travellerValue === 1 ? "Seat" : "Seats"} from  ${toCode} - ${fromCode} to Continue`,
                                duration: 3,
                              });
                              return;
                            }
                            dispatch(setCurrentState(3))
                            navigate("/payment")
                          }}


                        />


                      </>
                    )}
                  </>
                )}


              </div>
            </div>
          </div >
        </>
      )
      }

    </>
  );
}
