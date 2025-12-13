import React, { useState, useEffect } from 'react';
import { QRCode, Typography, Button } from 'antd';
import { useSelector } from 'react-redux';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

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
  const showMore = visibleCount < travellerDetails?.length;
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const responsiveStyles = `
    .payment-page-container {
      background-color: #f4f5f5;
      padding-top: 70px;
      padding-bottom: 100px;
      min-height: 100vh;
      width: 100%;
    }

    .payment-main-layout {
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 20px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      align-items: flex-start;
    }

    /* Sidebar area for Amount & Flight Details */
    .payment-sidebar {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Content area for QR Code */
    .payment-content {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .payment-card {
      background: #fff;
      border-radius: 20px;
      width: 100%;
      padding-bottom: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .amount-header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .promo-banner {
      padding: 0 20px 20px 20px;
      display: flex;
      justify-content: center;
    }

    .promo-box {
      display: flex;
      justify-content: center;
      background: #caffdaff;
      height: 30px;
      align-items: center;
      border-radius: 10px;
      padding: 0 10px;
      width: 100%;
    }

    .flight-card-header {
       padding: 20px;
       border-bottom: 1px solid #b8b8bcff;
    }

    .date-badge {
       display: flex;
       align-items: center;
       background: #ffe1b3;
       width: fit-content;
       padding: 5px 10px;
       justify-content: center;
       border-radius: 5px;
       margin-top: 10px;
    }

    .flight-details-list {
       margin-top: 15px;
       display: flex;
       flex-direction: column;
       gap: 15px;
    }

    .flight-segment {
       display: flex;
       flex-direction: row;
       gap: 15px;
       flex-wrap: wrap; 
       align-items: center;
       justify-content: space-between;
    }
    
    .segment-info {
       display: flex;
       flex-direction: column;
       align-items: center;
    }

    /* Desktop View */
    @media (min-width: 768px) {
      .payment-main-layout {
        flex-direction: row;
        padding: 20px;
      }

      .payment-sidebar {
         width: 350px; /* Fixed width sidebar */
         position: sticky;
         top: 90px;
         flex-shrink: 0;
      }

      .payment-content {
         flex: 1; /* Takes remaining space */
      }
      
      .flight-segment {
         flex-wrap: nowrap;
         gap: 20px;
      }
    }
  `;

  const handlePayment = () => {
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
    <>
      <style>{responsiveStyles}</style>
      <div className="payment-page-container">
        <div className="payment-main-layout">

          {/* LEFT SIDEBAR (Mobile: Top, Desktop: Left) */}
          <div className="payment-sidebar">

            {/* Amount Card */}
            <div className="payment-card">
              <div className="amount-header">
                <Text style={{ fontSize: 18, fontWeight: 600 }}>Amount To Be Paid</Text>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  ₹{finalAmount?.toLocaleString("en-IN")}
                </Text>
              </div>
              <div className="promo-banner">
                <div className="promo-box">
                  <Text style={{ color: "#238c46", fontSize: 13, textAlign: 'center' }}>
                    🤩 Yay! You saved ₹{promoRadioValue?.toLocaleString("en-IN") || 0} on this booking
                  </Text>
                </div>
              </div>
            </div>

            {/* Flight Details Card */}
            <div className="payment-card">
              <div className="flight-card-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>Your Flight</Text>
                  <Text type="secondary" style={{ fontSize: 16, fontWeight: 500 }}>
                    {returnTripUI ? "Round Trip" : "One Way"}
                  </Text>
                </div>

                <div className="date-badge">
                  <Text style={{ fontSize: 14, fontWeight: 500 }}>
                    {dep.weekday}, {dep.day} {dep.month}
                  </Text>
                </div>

                <div className="flight-details-list">
                  {onewaySelectedFlight?.map((item, idx) => (
                    <div key={idx} className="flight-segment">
                      <img src={item?.logo} style={{ height: 35 }} alt="logo" />
                      <div className="segment-info" style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.departureTime}</Text>
                        <Text>{fromCity}</Text>
                      </div>
                      <div className="segment-info">
                        <Text>{item.durations}</Text>
                        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg" alt="line" />
                        <Text>{item.stops}</Text>
                      </div>
                      <div className="segment-info" style={{ alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.arrivalTime}</Text>
                        <Text>{toCity}</Text>
                      </div>
                    </div>
                  ))}
                </div>

                {returnTripUI && (
                  <div style={{ marginTop: 20, borderTop: "1px solid #b8b8bcff", paddingTop: 20 }}>
                    <div className="date-badge" style={{ marginTop: 0 }}>
                      <Text style={{ fontSize: 14, fontWeight: 500 }}>
                        {ret.weekday}, {ret.day} {ret.month}
                      </Text>
                    </div>

                    <div className="flight-details-list">
                      {returnSelectedFlight?.map((item, idx) => (
                        <div key={idx} className="flight-segment">
                          <img src={item?.logo} style={{ height: 35 }} alt="logo" />
                          <div className="segment-info" style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.departureTime}</Text>
                            <Text>{toCity}</Text>
                          </div>
                          <div className="segment-info">
                            <Text>{item.durations}</Text>
                            <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg" alt="line" />
                            <Text>{item.stops}</Text>
                          </div>
                          <div className="segment-info" style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.arrivalTime}</Text>
                            <Text>{fromCity}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Traveller List */}
              <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
                <Text style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Travellers</Text>
                {travellerDetails?.slice(0, visibleCount).map((item, idx) => (
                  <Text key={idx} style={{ fontSize: 15, fontWeight: 500, marginBottom: 5 }}>
                    {idx + 1}. {item.firstName} {item.lastName}
                  </Text>
                ))}

                {travellerDetails?.length > 1 && (
                  <Button
                    type="link"
                    onClick={() => showMore ? setVisibleCount(travellerDetails.length) : setVisibleCount(1)}
                    style={{ color: "#ff6600", fontWeight: 500, fontSize: "14px", padding: 0, textAlign: 'left', width: 'fit-content' }}
                  >
                    {showMore ? (
                      <>+{travellerDetails.length - 1} More <DownOutlined style={{ fontSize: 11 }} /></>
                    ) : (
                      <>Hide <UpOutlined style={{ fontSize: 11 }} /></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (Mobile: Bottom, Desktop: Right) */}
          <div className="payment-content">
            <div className="payment-card" style={{ alignItems: "center", display: "flex", flexDirection: 'column' }}>
              <div style={{ padding: 20, display: "flex", textAlign: "center", flexDirection: "column", alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 500 }}>Scan QR for Payment</Text>
                <QRCode
                  value="true"
                  onClick={handlePayment}
                  size={200}
                  style={{ marginTop: 20, cursor: "pointer" }}
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
      </div>
    </>
  );
}

export default Payment;
