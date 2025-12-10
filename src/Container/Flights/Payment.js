import React,{useState,useEffect} from 'react';
import { QRCode,Typography,Button } from 'antd';
import { useSelector } from 'react-redux';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const {Text} = Typography; 

const Payment = () => {



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

  const navigate = useNavigate()

    const [visibleCount, setVisibleCount] = useState(1);
    const showMore = visibleCount < travellerDetails.length;
    const [paymentStatus, setPaymentStatus] = useState("pending");


    const checkPaymentStatus = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve("success"), 1000);
    });
  };    

useEffect(() => {
  if (paymentStatus === "success") return;

  const timer = setTimeout(async () => {
    const status = await checkPaymentStatus();
    

    if (status === "success") {
      setPaymentStatus("success");

      Swal.fire({
        title: "Payment Successful 🎉",
        text: "Your transaction has been completed!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, ); 

  
}, []);




    
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
    
  return (
    <div style={{
        backgroundColor: "#4f4f4f14",
        paddingTop: "70px",
        paddingBottom: "350px"
      }}>
        <div style={{
          display: "flex", flexDirection: "row",
          padding: 20, gap: 20, width: "100%", alignItems: "flex-start",
        }}>
            <div style={{
              position: "sticky",
            top: 0,
            height: "100vh",
            paddingBottom: "100px"
            }}>
                <div style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: 20,
              width: 375,
              paddingBottom: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}>
                <div style={{
                    padding:20,display:"flex",justifyContent:"space-between"
                }}>
                    <Text style={{
                        fontSize:18,fontWeight:600
                    }}>Amount To Be Paid</Text>
                    <Text style={{
                  fontSize: 18, fontWeight: 600
                }}>
                  ₹{finalAmount.toLocaleString("en-IN")}

                </Text>

                    </div>
                    <div style={{
                        padding:20,position:"relative",bottom:20,alignItems:"center",justifyContent:"center"
                    }}>
                    <div style={{
                        display:"flex",justifyContent:"center",background:"#caffdaff",height:30,alignItems:"center",borderRadius:10
                    }}
                    ><Text style={{
                        color:"#238c46"
                    }}>🤩 Yay! You saved ₹{promoRadioValue.toLocaleString("en-IN")} on this booking</Text>
                    </div>
                    </div>
                </div>
                <div style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: 20,
              width: 375,
              paddingBottom: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginTop:20
            }}>
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
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: 20,
              width: 1075,
              paddingBottom: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              alignItems:"center"
            }}>
                <div style={{
                    padding:20,display:"flex",textAlign:"center",flexDirection:"column"
                }}>
                    <Text style={{
                        fontSize:20,fontWeight:500
                    }}>Scan QR for Payment</Text>
                    <QRCode
        value="upi://pay?pa=yourupiid@bank&pn=YourName&am=100&cu=INR"
        size={200}
        style={{
            marginTop:20
        }}
      />

      <p style={{ marginTop: 20 }}>
        Status:{" "}
        <b style={{ color: paymentStatus === "success" ? "green" : "red" }}>
          {paymentStatus.toUpperCase()}
        </b>
      </p>
                </div>
                
            </div>
        </div>
      
      
    </div>
  )
}

export default Payment
