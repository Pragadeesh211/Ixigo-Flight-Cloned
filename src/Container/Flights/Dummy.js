import React, { useEffect, useRef, useState } from "react";
import PageSelectionTabs from "../../Component/PageSelectionTabs";
import { Card, Typography, Input, Button, Radio, Space, ConfigProvider, Drawer, Tooltip, Col, Row, message, Divider, Dropdown, Segmented, Modal, Form, Alert, Select } from "antd";
import { RightOutlined, CloseOutlined, CheckOutlined, EditOutlined, UpOutlined, DownOutlined, CheckCircleFilled } from "@ant-design/icons";
import {
  setOpenDrawer,
  setPhoneNo
} from "../../Redux/Slices/ProfileSlice";
import { setOnewaySelectedFlight, setTotalAmount, setRefundPlan, setRefundFeeAdd } from "../../Redux/Slices/FlightSearchSlice";
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
import "./EconomySwiper.css";
import FloatingInput from "../../Component/FloatInput";
import { addTraveller, editTraveller } from "../../Redux/Slices/TravellerSlice";
import AddTraveller from "../../Component/AddTraveller";

dayjs.extend(duration);

const { Text } = Typography;

const ReviewTravellerDetails = () => {
  const [promoCodeValue, setPromoCodeValue] = useState("")
  const [promoCodeValue2, setPromoCodeValue2] = useState("")
  const [radioValue, setRadioValue] = useState(0);
  const [viewOffers, setViewOffers] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
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
    refundFeeAdd,
    refundValue
  } = useSelector((state) => state.flightSearch);

  const { add, added, dobCheckValue } = useSelector((state) => state.traveller);

  // // // console.log("sddfrafoi", radioValue)


  const shakeref = useRef(null)


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
  const [selectedRefundOption, setSelectedRefundOption] = useState(refundValue.planType);
  const [dobVerify, setDobVerify] = useState();




  const handleRadioValue = (idx) => {
    if (phoneNo === null && setRadioValue !== 0)
      return dispatch(setOpenDrawer(true))

    const updated = moveToTop(promoOfferList, idx);
    setPromoOfferList(updated);



    // setRadioValue(idx)
  }

  // // console.log("items show",promoOfferList[0].amount)

  const moveToTop = (data, index) => {
    const selected = data[index];
    const newarr = [...data];
    newarr.splice(index, 1);
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

  const [tempBase, setTempBase] = useState(0);
  const [tempTax, setTempTax] = useState(0);

  // // console.log("total", totalAmount)


  const slashAmount = totalAmount;
  const CalculateFullAmount = () => {
    const a = onewaySelectedFlight[0]?.fareOptions?.[travelClass]?.price || 0;
    const b = returnSelectedFlight[0]?.fareOptions?.[travelClass]?.price || 0;

    if (returnTripUI) {
      return dispatch(setTotalAmount((a + b) * travellerValue));
    }

    return dispatch(setTotalAmount(a * travellerValue));
  };




  useEffect(() => {
    CalculateFullAmount();
  }, [onewaySelectedFlight, returnSelectedFlight, travellerValue, travelClass, returnTripUI]);




  const baseFare = Math.ceil(totalAmount / 1.34);


  const tax = totalAmount - baseFare;



  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const [currentTime, setCurrentTime] = useState(time)

  const [lessday, setLessDay] = useState()

  const [cancelLess, setcancelLess] = useState(0)


  const get8HrsCancelTime = (departureTime) => {
    if (!departureTime) return { finalTime: "00:00", days: 0 };

    const [h1, m1] = departureTime.split(":").map(Number);
    const t2 = "08:00";
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

  const [lessReturnday, setLessReturnDay] = useState()
  const get8HrsCancelReturnTime = (departureTime) => {
    const [h1, m1] = departureTime.split(":").map(Number);
    const t2 = "08:00";
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

  useEffect(() => {
    if (refundFeeAdd) {
      const depTime = onewaySelectedFlight?.[0]?.departureTime;
      const retTime = returnSelectedFlight?.[0]?.departureTime;

      if (depTime) {
        get8HrsCancelTime(depTime);
      }

      if (retTime) {
        get8HrsCancelReturnTime(retTime);
      }
    }
  }, [refundFeeAdd, onewaySelectedFlight, returnSelectedFlight]);

  const getCancelFee = (price) => {
    if (price > 23000) return 2019;
    if (price > 20000) return 1559;
    if (price > 17000) return 1359;
    if (price > 12500) return 1019;
    if (price > 9000) return 959;
    if (price > 6000) return 719;
    if (price > 4500) return 519;
    if (price > 3500) return 359;
    return 259;
  };

  const getRescheduleFee = (price) => {
    if (price > 23000) return 2519;
    if (price > 20000) return 2319;
    if (price > 17000) return 1559;
    if (price > 12500) return 1419;
    if (price > 9000) return 1259;
    if (price > 6000) return 1019;
    if (price > 4500) return 819;
    if (price > 3500) return 659;
    return 459;
  };

  const [cancelPrice, setCancelPrice] = useState(0);
  const [reschedulePrice, setReschedulePrice] = useState(0);

  useEffect(() => {
    const price = onewaySelectedFlight[0]?.fareOptions?.[travelClass]?.price;

    if (price) {
      setCancelPrice(getCancelFee(price));
      setReschedulePrice(getRescheduleFee(price));
    }
  }, [onewaySelectedFlight, travelClass]);


  const handleSelect = (option) => {
    setSelectedRefundOption(option);

    if (option === "Free Cancellation") {
      dispatch(setRefundFeeAdd(true));
      dispatch(setRefundPlan({
        planType: "Free Cancellation",
        price: cancelPrice,
      }));
    }

    if (option === "Rescheduling") {
      dispatch(setRefundFeeAdd(true));
      dispatch(setRefundPlan({
        planType: "Rescheduling",
        price: reschedulePrice,
      }));
    }

    if (option === "noRefund") {
      dispatch(setRefundFeeAdd(false))
      dispatch(setRefundPlan({
        planType: "norefund",
        price: 0,
      }));
    }


  };

  const getFinalAmount = () => {
    const promoAmount = promoOfferList?.[0]?.amount || 0;

    if (refundValue.planType === "Free Cancellation") {
      const a = cancelPrice * travellerValue || 0;
      return (totalAmount + a) - promoAmount;
    }

    if (refundValue.planType === "Rescheduling") {
      const a = reschedulePrice * travellerValue || 0;
      return (totalAmount + a) - promoAmount;
    }

    return totalAmount - promoAmount;
  };

  const finalAmount = getFinalAmount();

  const startShake = () => {

    setIsShaking(true);


    setTimeout(() => {
      setIsShaking(false);
    }, 2000);
  };







  // // console.log("plantype",refundValue)
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


  // // console.log("return check",returnSelectedFlight[0]?.stops)

  const returnFlight = returnSelectedFlight?.[0];




  // // console.log("Dobbbb",add[0]?.DOBValue.split("/")[0])

  const getAge = (dob) => {
    const birth = dayjs(dob, "DD/MM/YYYY");
    const today = dayjs();

    const years = today.diff(birth, "year");
    return years;
  };

  const adults = add.map((item, index) => ({ ...item, originalIndex: index })).filter(item => getAge(item.DOBValue) >= 12);
  const children = add.map((item, index) => ({ ...item, originalIndex: index })).filter(item => getAge(item.DOBValue) <= 12 && getAge(item.DOBValue) >= 3);
  const infants = add.map((item, index) => ({ ...item, originalIndex: index })).filter(item => getAge(item.DOBValue) <= 2);



  const [selectedAdults, setSelectedAdults] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [selectedInfants, setSelectedInfants] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [DOBError, setDOBError] = useState(false);
  const [tempArray, settempArray] = useState([]);
  const [adultFirstName, setadultFirstName] = useState("")
  const [adultLastName, setadultLastName] = useState("")
  const [adultDOB, setadultDOB] = useState("")
  const [openModal, setOpenModal] = useState(false)

  // const [disable,setdisable] = useState([false])

  const [activeAdultIndex, setactiveAdultIndex] = useState(0)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTraveller, setEditingTraveller] = useState(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editDOB, setEditDOB] = useState("");

  const openEditModal = (person) => {
    setEditingTraveller(person);
    setEditFirstName(person.firstName);
    setEditLastName(person.lastName);
    setEditGender(person.genderValue || "Male");
    setEditDOB(person.DOBValue);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTraveller && editingTraveller.originalIndex !== undefined) {
      const updatedData = {
        firstName: editFirstName,
        lastName: editLastName,
        genderValue: editGender,
        DOBValue: editDOB,
      };

      dispatch(editTraveller({ index: editingTraveller.originalIndex, updatedData }));
      setIsEditModalOpen(false);
      setEditingTraveller(null);
    }
  };


  useEffect(() => {
    if (selectedAdults.length > 0) {
      const list = selectedAdults.map((a, idx) => {
        return {
          key: tempArray.length,
          firstName: a?.firstName,
          lastName: a?.lastName,
          DOBValue: a?.DOBValue,
          genderValue: a?.genderValue,
        };
      });

      settempArray(list);
    }
  }, [selectedAdults]);



  const maxAllowed = typeof travellerValue === "number"
    ? travellers?.Adults
    : null

  const maxAllowedChildren = typeof travellerValue === "number"
    ? travellers?.Children
    : null
  const maxAllowedInfants = typeof travellerValue === "number"
    ? travellers?.Infants
    : null
  const handleSelectAdult = (person) => {


    if (selectedAdults.some(a => a.key === person.key)) {
      setSelectedAdults(prev => prev.filter(a => a.key !== person.key));
      return;
    }

    if (selectedAdults.length >= maxAllowed) {
      messageApi.open({
        content: `You cannot select more than ${travellers?.Adults}  ${travellers?.Adults == 1 ? `Adult` : `Adults`}`,
        duration: 3,
      });
      return;
    }

    setSelectedAdults(prev => [...prev, person]);
  };

  const handleSelectChildren = (person) => {


    if (selectedChildren.some(a => a.key === person.key)) {
      setSelectedChildren(prev => prev.filter(a => a.key !== person.key));
      return;
    }

    if (selectedChildren.length >= maxAllowedChildren) {
      messageApi.open({
        content: `You cannot select more than ${travellers?.Children} ${travellers?.Children == 1 ? `Child` : `Children`}`,
        duration: 3,
      });
      return;
    }

    setSelectedChildren(prev => [...prev, person]);
  };

  const handleSelectInfants = (person) => {


    if (selectedInfants.some(a => a.key === person.key)) {
      setSelectedInfants(prev => prev.filter(a => a.key !== person.key));
      return;
    }

    if (selectedInfants.length >= maxAllowedInfants) {
      messageApi.open({
        content: `You cannot select more than ${travellers?.Infants} Infant`,
        duration: 3,
      });
      return;
    }

    setSelectedInfants(prev => [...prev, person]);
  };
  // // // console.log("adults",selectedAdults) 





  const createTravellerAdultArray = (countsObject) => {
    let travellerList = [];


    for (let i = 0; i < countsObject.Adults; i++) {
      travellerList.push({ type: 'Adult', index: i });
    }



    return travellerList;
  };
  const createTravellerChildArray = (countsObject) => {
    let travellerList = [];


    for (let i = 0; i < countsObject.Children; i++) {
      travellerList.push({ type: 'Child', index: i });
    }

    return travellerList;
  };

  const createTravellerInfantArray = (countsObject) => {
    let travellerList = [];




    for (let i = 0; i < countsObject.Infants; i++) {
      travellerList.push({ type: 'Infants', index: i });
    }

    return travellerList;
  };


  const travellerAdultListMap = createTravellerAdultArray(travellers);
  const travellerChildListMap = createTravellerChildArray(travellers);
  const travellerInfantListMap = createTravellerInfantArray(travellers);


  const handleInput = (index, field, value) => {
    const updated = [...travellerAdultListMap];
    updated[index][field] = value;
    updated[index][field + "Error"] = false;
    // setTravellerAdultListMap(updated);
  };

  const handleFocus = (index, field, bool) => {
    const updated = [...travellerAdultListMap];
    updated[index][field] = bool;
    // setTravellerAdultListMap(updated);
  };

  const getadddetails = (idx) => {
    if (idx === selectedAdults[idx]) {
      settempArray(selectedAdults[idx])
    }
    else {
      settempArray("")
    }
  }



  //   if (!selectedAdults[idx]) {
  //     alert("This slot is uninitialized.");
  //     setactiveAdultIndex(!activeAdultIndex);
  // }
  // else{
  //   setactiveAdultIndex(idx)
  // }
  let alreadySelected;
  const handleAdultInputActive = (idx) => {

    if (activeAdultIndex === idx) {
      setactiveAdultIndex(-1);
      return;
    }

    if (activeAdultIndex !== -1 && activeAdultIndex !== idx) {
      // Optional: Validate current active before switching
      // For now, allowing switch.
    }
    setactiveAdultIndex(idx);
    setFirstNameError(false);
    setLastNameError(false);
    setDOBError(false);
  };


  // // console.log(s)
  // const alreadySelected = selectedAdults.some(
  //   (a) =>
  //     a.firstName === newRecord.firstName &&
  //     a.lastName === newRecord.lastName &&
  //     a.DOBValue === newRecord.DOBValue
  // );

  // const existsInStore = selectedAdults.some(t => t.key === newRecord.key);

  // if (existsInStore) {
  //   setSelectedAdults(prev =>
  //   prev.map(adult =>
  //     adult.key === newRecord.key
  //       ? { ...adult, ...newRecord } // replace with updated record
  //       : adult // keep the rest unchanged
  //   )
  // );

  // } else if (!alreadySelected) {
  //   // ADD new record only if not already selected
  //   // dispatch(addTraveller(newRecord));
  //   setSelectedAdults(prev => [...prev, newRecord]);
  // }


  console.log("loopingg2", tempArray);


  const handleFirstNameChange = (value, idx) => {
    const NAME_REGEX = /^[A-Za-z\s'-]{1,27}$/;

    const isValid = NAME_REGEX.test(value);
    if (value === "" || value.length > 27 || !isValid) {
      setFirstNameError(true)
    }
    else {
      setFirstNameError(false)
    }

    setSelectedAdults((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], firstName: value };
      setadultFirstName(value);
      return updated;
    });
  };

  const handleLastNameChange = (value, idx) => {
    const NAME_REGEX = /^[A-Za-z\s'-]{1,27}$/;

    const isValid = NAME_REGEX.test(value);
    if (value === "" || value.length > 27 || !isValid) {
      setLastNameError(true)
    }
    else {
      setLastNameError(false)
    }

    setSelectedAdults((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], lastName: value };
      setadultLastName(value)
      return updated;
    });
  };

  const handleDOBChange = (value, idx) => {

    setDOBError(false)

    const cleanValue = value.replace(/[^\d]/g, '');


    let maskedValue = '';


    if (cleanValue.length > 0) {
      maskedValue = cleanValue.substring(0, 2);
    }
    if (cleanValue.length >= 3) {
      maskedValue += '/' + cleanValue.substring(2, 4);
    }

    if (cleanValue.length >= 5) {
      maskedValue += '/' + cleanValue.substring(4, 8);
    }


    maskedValue = maskedValue.substring(0, 10);


    setSelectedAdults((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], DOBValue: maskedValue };
      setadultDOB(value);
      return updated;

    });


  }


  // // console.log("selected121212121",tempArray)

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
            display: "flex",
            flexDirection: "row",
            padding: 20,
            gap: 30,
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          {/* Left Card */}
          <div style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            paddingBottom: "100px"
          }}>
            <Col>
              <div style={{
                display: "flex",
                background: "#fff",
                // width:"28%",
                padding: 20, borderRadius: 20,
                paddingBottom: "60px",
                maxHeight: "auto",
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
                      textAlign: "start"

                    }}
                    onClick={() =>
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

                      <>₹{(cancelPrice * travellerValue).toLocaleString("en-IN")}</>



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

                      <>₹{(reschedulePrice * travellerValue).toLocaleString("en-IN")}</>



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
                {promoOfferList[0].amount !== 0 ? (<Row style={{
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
                    -₹{promoOfferList[0].amount.toLocaleString("en-IN")}
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
              <div style={{
                marginTop: 10, padding: 25
              }}>
                <Text style={{
                  fontSize: 16, fontWeight: 500, fontFamily: "Roboto"
                }}>
                  By clicking on continue, I confirm that I have read, understood, and agree with the Fare Rules, Privacy Policy and Terms of Use.
                </Text>
              </div>
            </Col>
          </div>

          {/* Right Section */}
          <Col>
            <div style={{
              display: "flex",
              background: "#fff",
              width: "980px",
              padding: 15, borderRadius: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              //  marginBottom: -150,
            }}>
              <div


              >
                {!returnTripUI ? (<OnewayFlightDetails />) : (
                  <div>
                    <div style={{
                      width: "980px",
                      borderBottom: "1px solid #ccccccff",
                      paddingBottom: 30
                    }}>
                      <OnewayFlightDetails />
                    </div>

                    <div style={{
                      marginTop: 20,
                      marginBottom: returnFlight?.stops === "1 stop" ? -200 : 0,
                    }}>
                      <ReturnFlightDetails />
                    </div>
                  </div>
                )}

              </div>

            </div>
            <div style={{
              display: "flex",
              background: "#fff",
              width: "980px",
              padding: 20, borderRadius: 20,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginTop: 25, flexDirection: "column"

            }}>

              <Text style={{
                fontSize: 24, fontWeight: 700
              }}>
                Refund on Cancellation
              </Text>
              <br />
              <Text style={{
                fontWeight: 600, fontSize: 16
              }}>
                {fromCode} - {toCode}
              </Text>
              {refundFeeAdd ? (
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "60%",
                    alignItems: "center",
                    position: "relative",
                    top: 25,
                    left: "20%"
                  }}>
                    <div style={{
                      textAlign: "center"
                    }}>
                      <Text style={{
                        fontWeight: 500,
                        fontSize: "15px",
                      }}>
                        Full refund of ₹{(onewaySelectedFlight[0]?.fareOptions?.[travelClass]?.price * travellerValue).toLocaleString("en-IN")}
                      </Text>


                    </div>
                    <div>
                      <Text style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        textAlign: "center"
                      }}>Non Refundable</Text>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",

                  }}>
                    <div style={{

                      marginTop: "50px",
                      textAlign: "center",
                      height: "4px",
                      width: "60%",
                      backgroundImage: "linear-gradient(to right, rgb(43, 153, 80), rgb(238, 154, 153))"
                    }}>
                    </div>
                    <div style={{
                      position: "relative",
                      // marginTop:"10px",
                      textAlign: "center",
                      height: "4px",
                      width: "50%",
                      backgroundImage: "linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))",
                      left: "50%",
                      bottom: 4
                    }}></div>
                  </div>





                  <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{
                        background: "rgb(107, 184, 133)",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50px",
                        position: "relative",
                        right: 7,
                        bottom: 21
                      }}>
                        <img src={FlightTicketFilledIcon} style={{

                          height: "20px"
                        }}>
                        </img>
                      </div>
                      <div style={{
                        background: "rgb(231, 114, 112)",
                        height: "15px",
                        width: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50px",
                        position: "relative",
                        left: 485,
                        bottom: 44
                      }}></div>


                    </div>

                    <div>

                      <div style={{
                        background: "rgb(220, 53, 50)",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50px",
                        position: "relative",
                        // left:50,
                        bottom: 21
                      }}>
                        <img src={FlightTakeoffFilledIcon} style={{

                          height: "20px"
                        }}>
                        </img>
                      </div>

                    </div>

                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                    bottom: 18
                  }}>
                    <div style={{
                      flex: 1,
                      textAlign: "left",
                      position: "relative",
                      right: 6,
                      bottom: 8
                    }}>
                      <Text style={{
                        fontSize: "14px",
                        fontWeight: 500
                      }}>
                        Now
                      </Text>
                      <br />
                      <Text type="secondary" strong style={{
                        position: "relative",

                        fontSize: "12px",
                      }}>{currentTime}</Text>
                    </div>
                    <div style={{
                      flex: 1,
                      textAlign: "center",
                      position: "relative",
                      left: 5,
                      bottom: 8
                    }}>
                      <Text style={{
                        fontSize: "14px",
                        fontWeight: 500
                      }}>
                        {lessdep.day} {lessdep.month}
                      </Text>
                      <br />
                      <Text type="secondary" strong style={{
                        position: "relative",
                        fontSize: "12px",
                        //before 8
                      }}>{cancelLess}</Text>
                    </div>
                    <div style={{
                      flex: 1,
                      textAlign: "right",
                      position: "relative",
                      bottom: 8
                    }}>
                      <Text style={{
                        fontSize: "14px",
                        fontWeight: 500
                      }}>
                        Departure
                      </Text>
                      <br />
                      <Text type="secondary" strong style={{
                        position: "relative",

                        fontSize: "12px",
                      }}>{dep.day} {dep.month}, {onewaySelectedFlight[0]?.departureTime}</Text>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{
                    flex: 1,
                    marginTop: "50px",
                    textAlign: "center",
                    height: "4px",
                    width: "98%",
                    backgroundImage: "linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))"
                  }}>
                    <Text style={{
                      fontWeight: 500,
                      fontSize: "15px",
                      position: "relative",
                      textAlign: "center",
                      bottom: 35
                    }}>Non Refundable</Text>

                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{
                        background: "rgb(231, 114, 112)",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50px",
                        position: "relative",
                        right: 7,
                        bottom: 17
                      }}>
                        <img src={FlightTicketFilledIcon} style={{

                          height: "20px"
                        }}>
                        </img>
                      </div>
                      <div style={{
                        flex: 1,
                        textAlign: "left",
                        position: "relative",
                        right: 6,
                        bottom: 8
                      }}>
                        <Text style={{
                          fontSize: "14px",
                          fontWeight: 500
                        }}>
                          Now
                        </Text>
                        <br />
                        <Text type="secondary" strong style={{
                          position: "relative",

                          fontSize: "12px",
                        }}>{currentTime}</Text>
                      </div>
                    </div>

                    <div>

                      <div style={{
                        background: "rgb(220, 53, 50)",
                        height: "30px",
                        width: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50px",
                        position: "relative",
                        left: 40,
                        bottom: 18
                      }}>
                        <img src={FlightTakeoffFilledIcon} style={{

                          height: "20px"
                        }}>
                        </img>
                      </div>
                      <div style={{
                        flex: 1,
                        textAlign: "right",
                        position: "relative",
                        bottom: 8
                      }}>
                        <Text style={{
                          fontSize: "14px",
                          fontWeight: 500
                        }}>
                          Departure
                        </Text>
                        <br />
                        <Text type="secondary" strong style={{
                          position: "relative",

                          fontSize: "12px",
                        }}>{dep.day} {dep.month}, {onewaySelectedFlight[0]?.departureTime}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {returnTripUI && (
                <div>
                  <Text style={{
                    fontWeight: 600, fontSize: 16
                  }}>
                    {toCode} - {fromCode}
                  </Text>
                  {refundFeeAdd ? (
                    <div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "60%",
                        alignItems: "center",
                        position: "relative",
                        top: 25,
                        left: "20%"
                      }}>
                        <div style={{
                          textAlign: "center"
                        }}>
                          <Text style={{
                            fontWeight: 500,
                            fontSize: "15px",
                          }}>
                            Full refund of ₹{(returnSelectedFlight[0]?.fareOptions?.[travelClass]?.price * travellerValue).toLocaleString("en-IN")}
                          </Text>


                        </div>
                        <div>
                          <Text style={{
                            fontWeight: 500,
                            fontSize: "15px",
                            textAlign: "center"
                          }}>Non Refundable</Text>
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",

                      }}>
                        <div style={{

                          marginTop: "50px",
                          textAlign: "center",
                          height: "4px",
                          width: "60%",
                          backgroundImage: "linear-gradient(to right, rgb(43, 153, 80), rgb(238, 154, 153))"
                        }}>
                        </div>
                        <div style={{
                          position: "relative",
                          // marginTop:"10px",
                          textAlign: "center",
                          height: "4px",
                          width: "50%",
                          backgroundImage: "linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))",
                          left: "50%",
                          bottom: 4
                        }}></div>
                      </div>





                      <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}>
                        <div>
                          <div style={{
                            background: "rgb(107, 184, 133)",
                            height: "30px",
                            width: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50px",
                            position: "relative",
                            right: 7,
                            bottom: 21
                          }}>
                            <img src={FlightTicketFilledIcon} style={{

                              height: "20px"
                            }}>
                            </img>
                          </div>
                          <div style={{
                            background: "rgb(231, 114, 112)",
                            height: "15px",
                            width: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50px",
                            position: "relative",
                            left: 485,
                            bottom: 44
                          }}></div>


                        </div>

                        <div>

                          <div style={{
                            background: "rgb(220, 53, 50)",
                            height: "30px",
                            width: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50px",
                            position: "relative",
                            // left:50,
                            bottom: 21
                          }}>
                            <img src={FlightTakeoffFilledIcon} style={{

                              height: "20px"
                            }}>
                            </img>
                          </div>

                        </div>

                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                        bottom: 18
                      }}>
                        <div style={{
                          flex: 1,
                          textAlign: "left",
                          position: "relative",
                          right: 6,
                          bottom: 8
                        }}>
                          <Text style={{
                            fontSize: "14px",
                            fontWeight: 500
                          }}>
                            Now
                          </Text>
                          <br />
                          <Text type="secondary" strong style={{
                            position: "relative",

                            fontSize: "12px",
                          }}>{currentTime}</Text>
                        </div>
                        <div style={{
                          flex: 1,
                          textAlign: "center",
                          position: "relative",
                          left: 5,
                          bottom: 8
                        }}>
                          <Text style={{
                            fontSize: "14px",
                            fontWeight: 500
                          }}>
                            {lessret.day} {lessret.month}
                          </Text>
                          <br />
                          <Text type="secondary" strong style={{
                            position: "relative",
                            fontSize: "12px",
                            //before 8
                          }}>{cancelLess}</Text>
                        </div>
                        <div style={{
                          flex: 1,
                          textAlign: "right",
                          position: "relative",
                          bottom: 8
                        }}>
                          <Text style={{
                            fontSize: "14px",
                            fontWeight: 500
                          }}>
                            Departure
                          </Text>
                          <br />
                          <Text type="secondary" strong style={{
                            position: "relative",

                            fontSize: "12px",
                          }}>{dep.day} {dep.month}, {onewaySelectedFlight[0]?.departureTime}</Text>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        flex: 1,
                        marginTop: "50px",
                        textAlign: "center",
                        height: "4px",
                        width: "98%",
                        backgroundImage: "linear-gradient(to right, rgb(238, 154, 153), rgb(220, 53, 50))"
                      }}>
                        <Text style={{
                          fontWeight: 500,
                          fontSize: "15px",
                          position: "relative",
                          textAlign: "center",
                          bottom: 35
                        }}>Non Refundable</Text>

                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}>
                        <div>
                          <div style={{
                            background: "rgb(231, 114, 112)",
                            height: "30px",
                            width: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50px",
                            position: "relative",
                            right: 7,
                            bottom: 17
                          }}>
                            <img src={FlightTicketFilledIcon} style={{

                              height: "20px"
                            }}>
                            </img>
                          </div>
                          <div style={{
                            flex: 1,
                            textAlign: "left",
                            position: "relative",
                            right: 6,
                            bottom: 8
                          }}>
                            <Text style={{
                              fontSize: "14px",
                              fontWeight: 500
                            }}>
                              Now
                            </Text>
                            <br />
                            <Text type="secondary" strong style={{
                              position: "relative",

                              fontSize: "12px",
                            }}>{currentTime}</Text>
                          </div>
                        </div>

                        <div>

                          <div style={{
                            background: "rgb(220, 53, 50)",
                            height: "30px",
                            width: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50px",
                            position: "relative",
                            left: 40,
                            bottom: 18
                          }}>
                            <img src={FlightTakeoffFilledIcon} style={{

                              height: "20px"
                            }}>
                            </img>
                          </div>
                          <div style={{
                            flex: 1,
                            textAlign: "right",
                            position: "relative",
                            bottom: 8
                          }}>
                            <Text style={{
                              fontSize: "14px",
                              fontWeight: 500
                            }}>
                              Departure
                            </Text>
                            <br />
                            <Text type="secondary" strong style={{
                              position: "relative",

                              fontSize: "12px",
                            }}>{ret.day} {ret.month}, {returnSelectedFlight[0]?.departureTime}</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <br />
              <Text style={{
                fontSize: 18, fontWeight: 600
              }}>Add Free Cancellation to your trip</Text>
              <br />
              <div style={{
                background: isShaking ? "rgb(250,225,225)" : "#daf2e2",
                // height:10,
                border: "0 solid #e5e7eb",
                borderRadius: 20,
              }}
                ref={shakeref}
                tabIndex={0}
                className={`shaking-box ${isShaking ? "shake-effect" : ""}`}>
                <div style={{
                  flex: 1, textAlign: "center", position: "relative", top: 5
                }}>{isShaking ? (<>
                  <Text style={{
                    color: "red", fontWeight: 700, fontSize: 13
                  }}>Please select an option before proceeding</Text>
                </>) : (<>
                  <Text style={{
                    color: "#238c46", fontWeight: 700, fontSize: 13
                  }}>Trusted by most Indian travellers</Text> <span style={{
                    color: "#238c46", fontWeight: 500, fontSize: 9
                  }}>IN</span></>

                )}

                </div>
                <div style={{
                  display: "flex", flexDirection: "row", padding: 10, justifyContent: "space-between"
                }}>
                  <div >
                    <div style={{
                      border: ".5px solid #cccccc",
                      borderRadius: "20px",
                      width: "473px",
                      position: "relative",
                      // right:10
                    }}>

                      <div style={{
                        maxheight: "80px",
                        background: "rgb(242, 249, 255)",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        padding: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        maxHeight: 80,

                      }}
                        onClick={() => handleSelect("Free Cancellation")}
                      >
                        <div >
                          <img src="https://images.ixigo.com/image/upload/icon/8378c73f79f77491eccf58ba345ee5bc-gbjnr.png"
                            style={{
                              height: 25,
                              position: "absolute",
                              zIndex: 10
                            }} />
                          <div style={{
                            background: "linear-gradient(90deg, #c7a2e8, transparent)",
                            paddingBottom: ".5px",
                            paddingTop: ".5px",
                            zIndex: 1,
                            position: "relative",
                            top: 4,
                            left: 73,
                            width: 90,
                            height: 13,
                            color: "#6e18b9",
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,

                          }}>



                            Most Popular

                          </div>
                          <br />
                          <Text style={{
                            fontWeight: 500,
                            fontSize: "17px",
                            bottom: 5,
                            position: "relative"
                          }}>Free Cancellation</Text>
                          <br />
                          <span style={{
                            bottom: 6,
                            position: "relative",
                            color: "#505050ff",
                            fontSize: "12px"
                          }}>@</span> <Text style={{
                            fontSize: "15px", fontWeight: 700, bottom: 5,
                            position: "relative",
                          }}>
                            ₹{cancelPrice.toLocaleString("en-IN")}
                            <Text style={{
                              fontSize: "11px",
                              fontWeight: 500,
                              color: "#00000073"
                            }}>/traveller</Text>
                          </Text>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="refundOption"
                            value="Free Cancellation"
                            checked={selectedRefundOption === "Free Cancellation"}

                            style={{
                              height: "20px", width: "20px", marginTop: 30, cursor: "pointer"
                            }}
                          />

                        </div>
                      </div>
                      <div style={{
                        padding: 15,
                        background: "white",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20
                      }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
                          <span>
                            Instant refund of approx.{" "}
                            <span style={{ fontWeight: "600", color: "#2B9950" }}>
                              ₹{totalAmount.toLocaleString("en-IN")}
                            </span>

                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
                          <span>
                            Cancel up to{" "}
                            <span style={{ fontWeight: "600", color: "#2B9950" }}>8hrs</span> before
                            departure
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
                          <span>No-questions-asked refund</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
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
                      border: ".5px solid #cccccc",
                      borderRadius: "20px",
                      width: "473px",

                    }}
                    >
                      <div style={{
                        height: "80px",
                        background: "rgb(249, 242, 255)",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        padding: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        maxHeight: 80,

                      }}

                        onClick={() => handleSelect("Rescheduling")}
                      >
                        <div >
                          <img src="https://images.ixigo.com/image/upload/icon/8934cfa8cec76c87ada8b3ecda4f0da1-awjph.png"
                            style={{
                              height: 25,
                              position: "absolute",
                              zIndex: 10
                            }} />

                          <br />
                          <Text style={{
                            fontWeight: 500,
                            fontSize: "17px",
                            top: 8,
                            position: "relative"
                          }}>Free Cancellation + Rescheduling</Text>
                          <br />
                          <span style={{
                            top: 6,
                            position: "relative",
                            color: "#505050ff",
                            fontSize: "12px"
                          }}>@</span> <Text style={{
                            fontSize: "15px", fontWeight: 700,
                            position: "relative", top: 8
                          }}>
                            ₹{reschedulePrice.toLocaleString("en-IN")}
                            <Text style={{
                              fontSize: "11px",
                              fontWeight: 500,
                              color: "#00000073"
                            }}>/traveller</Text>
                          </Text>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name="refundOption"
                            value="Rescheduling"
                            checked={selectedRefundOption === "Rescheduling"}

                            style={{
                              height: "20px", width: "20px", marginTop: 30, cursor: "pointer"
                            }}
                          />

                        </div>
                      </div>
                      <div style={{
                        padding: 15,
                        background: "white",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20

                      }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
                          <span>
                            Instant refund of approx.{" "}
                            <span style={{ fontWeight: "600", color: "#2B9950" }}>
                              ₹{totalAmount.toLocaleString("en-IN")}
                            </span>

                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
                          <span>
                            Cancel up to{" "}
                            <span style={{ fontWeight: "600", color: "#2B9950" }}>8hrs</span> before
                            departure
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
                          <span>No-questions-asked refund</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <CheckOutlined style={{ color: "#2B9950" }} />
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
              <div style={{
                display: "flex", flexDirection: "row", marginTop: 20, gap: 5, alignItems: "center"
              }}>
                <input
                  type="radio"
                  name="refundOption"
                  value="noRefund"
                  checked={selectedRefundOption === "noRefund"}

                  style={{
                    height: "20px", width: "20px", cursor: "pointer"
                  }}
                  onClick={() => handleSelect("noRefund")}
                /><Text style={{
                  fontWeight: 500
                }}>I don't want Free Cancellation.</Text>
              </div>
            </div>
            {phoneNo !== null ? (
              <div style={{
                display: "flex",
                background: "#fff",
                width: "980px",
                padding: 20, borderRadius: 20,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                marginTop: 25, flexDirection: "column"
              }}>
                <Text style={{
                  fontSize: 24, fontWeight: 700
                }}>
                  Traveller Details
                </Text>

                <Text type="secondary" style={{
                  position: "relative", bottom: 5, fontSize: 16, fontWeight: 500
                }}>
                  Choose from the saved list or add a new passenger
                </Text>
                <div style={{
                  background: "#ffe9a0ff",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  padding: 5, gap: 5, borderRadius: 10
                }}>
                  <svg width="20" height="20" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Group 4</title><desc>Created with Sketch.</desc><g id="Search/Flight/ixibook" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-4"><path d="M15.3042727,1 L2.70790909,1 C1.765,1 1,1.78281818 1,2.74354545 L1,11.4613636 C1,12.4220909 1.765,13.2049091 2.70790909,13.2049091 L15.2864545,13.2049091 C16.2294545,13.2049091 16.9944545,12.4220909 16.9944545,11.4613636 L16.9944545,2.74354545 C17.0122727,1.78281818 16.2472727,1 15.3042727,1" id="Fill-1" fill="#AA75CC"></path><path d="M15.3042727,0.925885057 L2.70790909,0.925885057 C1.72433588,0.925885057 0.925885057,1.74159524 0.925885057,2.74354545 L0.925885057,11.4613636 C0.925885057,12.4633138 1.72433588,13.279024 2.70790909,13.279024 L15.2864545,13.279024 C16.270104,13.279024 17.0685695,12.4633288 17.0685695,11.4613636 L17.0685695,2.74354545 C17.0871012,1.74503564 16.2910306,0.925885057 15.3042727,0.925885057 Z M2.70790909,1.07411494 L15.3042727,1.07411494 C16.207753,1.07411494 16.9373649,1.82488013 16.9203523,2.74217111 L16.9203396,11.4613636 C16.9203396,12.3821636 16.1875222,13.1307941 15.2864545,13.1307941 L2.70790909,13.1307941 C1.80691889,13.1307941 1.07411494,12.3821499 1.07411494,11.4613636 L1.07411494,2.74354545 C1.07411494,1.82275922 1.80691889,1.07411494 2.70790909,1.07411494 Z" id="Stroke-3" fill="#8537B7" fill-rule="nonzero"></path><path d="M5.85704545,3.3307 C6.81777273,3.3307 7.58277273,4.11351818 7.58277273,5.09206364 C7.58277273,6.05279091 6.81777273,6.85342727 5.85704545,6.85342727 C4.89631818,6.85342727 4.13122727,6.07060909 4.13122727,5.09206364 C4.13122727,4.11351818 4.91404545,3.3307 5.85704545,3.3307" id="Fill-5" fill="#FFFFFF"></path><path d="M8.61468182,11.7460545 L3.09940909,11.7460545 C2.77913636,11.7460545 2.51222727,11.5147818 2.42331818,11.2123273 C2.61895455,9.14850909 4.07786364,7.52950909 5.85704545,7.52950909 C7.63613636,7.52950909 9.09504545,9.13069091 9.29077273,11.2123273 C9.21959091,11.5147818 8.95277273,11.7460545 8.61468182,11.7460545" id="Fill-7" fill="#FFFFFF"></path><path d="M14.7171364,6.81782727 L9.57540909,6.81782727 C9.25513636,6.81782727 9.00613636,6.55091818 9.00613636,6.23073636 C9.00613636,5.91046364 9.25513636,5.64355455 9.57540909,5.64355455 L14.7171364,5.64355455 C15.0374091,5.64355455 15.2865,5.91046364 15.2865,6.23073636 C15.3042273,6.55091818 15.0374091,6.81782727 14.7171364,6.81782727" id="Fill-9" fill="#FFFFFF"></path><path d="M14.7171364,4.48712727 L9.57540909,4.48712727 C9.25513636,4.48712727 9.00613636,4.22021818 9.00613636,3.90003636 C9.00613636,3.57976364 9.25513636,3.31285455 9.57540909,3.31285455 L14.7171364,3.31285455 C15.0374091,3.31285455 15.2865,3.57976364 15.2865,3.90003636 C15.3042273,4.22021818 15.0374091,4.48712727 14.7171364,4.48712727" id="Fill-11" fill="#FFFFFF"></path></g></g></svg>
                  <Text style={{
                    padding: 2, fontSize: 12, fontWeight: 500
                  }}>Please ensure that your name matches your govt. ID such as Aadhaar, Passport or Driver's License</Text>
                </div>

                {add?.length > 0 ? (
                  <div style={{
                    border: ".5px solid #cccccc",
                    borderRadius: "20px",
                    marginTop: 20,
                    background: "white", padding: 20
                  }}>
                    {travellers.Adults > 0 && adults.length > 0 && (
                      <div>
                        <Text style={{
                          fontSize: 15, fontWeight: 500
                        }}>
                          Adults (12 yrs or above)
                        </Text>
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

                        <div style={{
                          display: "flex",
                          gap: "50px",
                          flexWrap: "wrap",
                          marginTop: 10
                        }}>
                          {adults.map((person, index) => {
                            const isSelected = selectedAdults.some(a => a.key === person.key);
                            const existsInStore = selectedAdults.some(t => t.key === person.key);
                            const disableExtra = selectedAdults.length >= travellers.Adults;

                            return (
                              <div
                                key={person.key}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={Boolean(isSelected || alreadySelected)}
                                  // disabled={disableExtra}
                                  onChange={() => handleSelectAdult(person)}
                                  style={{ height: 20, width: 20 }}
                                />

                                <span style={{ fontSize: 16 }}>
                                  {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                  {person.firstName} {person.lastName}
                                </span>
                                <EditOutlined
                                  style={{ marginLeft: "auto", cursor: "pointer", color: "#0770e4" }}
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent toggling selection
                                    openEditModal(person);
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>




                      </div>
                    )}
                    <div style={{
                      marginTop: 10
                    }}>
                      {travellers.Children > 0 && children.length > 0 && (
                        <div>
                          <Divider style={{
                            borderColor: "#8a8a8a"
                          }} />
                          <Text style={{
                            fontSize: 15, fontWeight: 500
                          }}>Child (2-12 yrs)</Text>
                          <div style={{
                            display: "flex",
                            gap: "50px",
                            flexWrap: "wrap",
                            marginTop: 10
                          }}>
                            {children.map((person, index) => {
                              const isSelected = selectedChildren.some(a => a.key === person.key);
                              // const disableExtra = selectedAdults.length >= travellers.Adults;

                              return (
                                <div
                                  key={person.key}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    // disabled={disableExtra}
                                    onChange={() => handleSelectChildren(person)}
                                    style={{ height: 20, width: 20 }}
                                  />

                                  <span style={{ fontSize: 16 }}>
                                    {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                    {person.firstName} {person.lastName}
                                  </span>
                                  <EditOutlined
                                    style={{ marginLeft: "auto", cursor: "pointer", color: "#0770e4" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditModal(person);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )}
                    </div>

                    <div style={{
                      marginTop: 10
                    }}>
                      {travellers.Infants > 0 && infants.length > 0 && (
                        <div>
                          <Divider style={{
                            borderColor: "#8a8a8a"
                          }} />
                          <Text style={{
                            fontSize: 15, fontWeight: 500
                          }}>Infants (0-2 yrs)</Text>
                          <div style={{
                            display: "flex",
                            gap: "50px",
                            flexWrap: "wrap",
                            marginTop: 10
                          }}>
                            {infants.map((person, index) => {
                              const isSelected = selectedInfants.some(a => a.key === person.key);
                              // const disableExtra = selectedAdults.length >= travellers.Infants;

                              return (
                                <div
                                  key={person.key}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    // disabled={disableExtra}
                                    onChange={() => handleSelectInfants(person)}
                                    style={{ height: 20, width: 20 }}
                                  />

                                  <span style={{ fontSize: 16 }}>
                                    {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                    {person.firstName} {person.lastName}
                                  </span>
                                  <EditOutlined
                                    style={{ marginLeft: "auto", cursor: "pointer", color: "#0770e4" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditModal(person);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )}
                    </div>


                  </div>
                ) : null}

                <div style={{
                  marginTop: 20
                }}>
                  <Text style={{
                    fontSize: 18, fontWeight: 500
                  }}>Passengers</Text>
                  <br />
                  <Text style={{
                    fontWeight: 500
                  }}>Adults</Text>
                  {selectedAdults.length > 0 && (
                    <div style={{
                      marginTop: 10
                    }}>
                      {selectedAdults.map((item, idx) => (
                        <div key={idx} style={{
                          display: "flex", justifyContent: "space-between"
                        }}>
                          {/* {item.genderValue === "Male" ? "Mr" : "Ms"} */}
                          {idx + 1} -  {item.firstName} {item.lastName}

                        </div>
                      ))}
                    </div>
                  )}
                  <br />
                  {travellers.Children > 0 && (
                    <div>
                      <Text style={{
                        fontWeight: 500
                      }}>Children</Text>
                      {selectedChildren.length > 0 && (
                        <div style={{
                          marginTop: 10
                        }}>
                          {selectedChildren.map((item, idx) => (
                            <div key={idx} style={{
                              display: "flex", justifyContent: "space-between"
                            }}>
                              {/* {item.genderValue === "Male" ? "Mr" : "Ms"} */}
                              {idx + 1} -  {item.firstName} {item.lastName}

                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>





                <div>
                  {travellerAdultListMap.map((item, idx) => {
                    const isSelected = activeAdultIndex === idx;
                    // Use selectedAdults for data source if available to ensure sync
                    const personData = selectedAdults[idx] || tempArray[idx] || {};
                    const isCompleted = personData.firstName && personData.lastName && personData.title && personData.nationality;

                    return (
                      <div
                        key={idx}
                        style={{
                          height: "auto",
                          marginTop: 15,
                          border: "1px solid #ddd",
                          padding: 10,
                          borderRadius: 8,
                          backgroundColor: "#fff"
                        }}
                      >
                        {/* Accordion Header */}
                        <div
                          style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", alignItems: "center" }}
                          onClick={() => handleAdultInputActive(idx)}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              background: isSelected ? "#000" : "#8a8a8a",
                              color: "#fff",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: 12
                            }}>
                              {isSelected ? <UpOutlined style={{ fontSize: 10 }} /> : <DownOutlined style={{ fontSize: 10 }} />}
                            </div>
                            <Text style={{ fontWeight: 700, fontSize: 16 }}>
                              {`Adult ${idx + 1}`}
                              {personData.firstName ? ` - ${personData.title || ''} ${personData.firstName} ${personData.lastName}` : ''}
                            </Text>
                          </div>

                          {isCompleted ? (
                            <CheckCircleFilled style={{ color: "#238c46", fontSize: 20 }} />
                          ) : null}
                        </div>


                        {isSelected && (
                          <div style={{ marginTop: 15 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
                              <Text style={{ fontSize: 16, fontWeight: 600 }}>Adult {idx + 1}</Text>
                              <Text
                                style={{ color: "#ec5b24", fontWeight: 600, cursor: "pointer" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Clear details
                                  setSelectedAdults(prev => {
                                    const updated = [...prev];
                                    updated[idx] = { ...updated[idx], title: '', firstName: '', lastName: '', genderValue: 'Male', DOBValue: '', nationality: 'India' };
                                    return updated;
                                  });
                                  // Also try to clear tempArray if possible/needed, assuming tempArray is used for display
                                  if (typeof settempArray === 'function') {
                                    settempArray(prev => {
                                      const updated = [...prev];
                                      updated[idx] = { ...updated[idx], title: '', firstName: '', lastName: '', genderValue: 'Male', DOBValue: '', nationality: 'India' };
                                      return updated;
                                    });
                                  }
                                }}
                              >
                                Clear Details
                              </Text>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                              {/* Title */}
                              <div style={{ width: 100 }}>
                                <Form>
                                  <Form.Item>
                                    <Select
                                      placeholder="Title"
                                      value={personData.title || "Mr"}
                                      onChange={(v) => {
                                        setSelectedAdults(prev => {
                                          const updated = [...prev];
                                          updated[idx] = { ...updated[idx], title: v };
                                          return updated;
                                        });
                                      }}
                                      options={[{ value: 'Mr', label: 'Mr' }, { value: 'Ms', label: 'Ms' }, { value: 'Mrs', label: 'Mrs' }]}
                                      style={{ width: "100%", height: 50 }}
                                    />
                                  </Form.Item>
                                </Form>
                              </div>

                              {/* First Name */}
                              <Form style={{ flex: 1 }}>
                                <Form.Item rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                                  <FloatingInput
                                    label="First & Middle Name"
                                    value={personData.firstName || ""}
                                    onChange={(v) => handleFirstNameChange(v, idx)}
                                    error={firstNameError && "Your first name should have 1–27 characters"}
                                  />
                                </Form.Item>
                              </Form>

                              {/* Last Name */}
                              <Form style={{ flex: 1 }}>
                                <Form.Item style={{ marginBottom: 0 }}>
                                  <FloatingInput
                                    label="Last Name"
                                    value={personData.lastName || ""}
                                    onChange={(v) => handleLastNameChange(v, idx)}
                                    error={lastNameError && "Your last name should have 1–27 characters "}
                                  />
                                </Form.Item>
                              </Form>
                            </div>

                            {/* Nationality Row */}
                            <div style={{ width: "100%", marginTop: 15 }}>
                              <Form>
                                <Form.Item style={{ marginBottom: 0 }}>
                                  <Select
                                    placeholder="Select Nationality"
                                    value={personData.nationality || "India"}
                                    onChange={(v) => {
                                      setSelectedAdults(prev => {
                                        const updated = [...prev];
                                        updated[idx] = { ...updated[idx], nationality: v };
                                        return updated;
                                      });
                                    }}
                                    options={[{ value: 'India', label: 'India' }, { value: 'Other', label: 'Other' }]}
                                    style={{ width: "30%", height: 50 }}
                                  />
                                </Form.Item>
                              </Form>
                            </div>

                            {/* Gender and DOB (Keep them as user logic likely needs them) */}
                            <div style={{ display: "flex", gap: 15, marginTop: 15, alignItems: "center" }}>
                              <Form style={{ flex: 1 }}>
                                <Form.Item style={{ marginBottom: 0 }}>
                                  <FloatingInput
                                    label="DOB (DD/MM/YYYY)"
                                    type={dayjs("DD/MM/YYYY")}
                                    value={personData.DOBValue || ""}
                                    onChange={(v) => handleDOBChange(v, idx)}
                                    error={DOBError && "Enter Valid Age"}
                                  />
                                </Form.Item>
                              </Form>
                              <ConfigProvider
                                theme={{
                                  components: {
                                    Segmented: {
                                      itemSelectedBg: "#fc790d",
                                      itemSelectedColor: "white"
                                    },
                                  }
                                }}
                              >
                                <Segmented
                                  value={personData.genderValue || "Male"}
                                  options={["Male", "Female"]}
                                  style={{
                                    background: "#f1f1f1",
                                    borderRadius: "10px",
                                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                    fontWeight: 500,
                                    border: "1.5px solid #c9c9c9",
                                    height: 50,
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 15,
                                    backgroundColor: "white"
                                  }}
                                  onChange={(value) => {
                                    setSelectedAdults((prev) => {
                                      const updated = [...prev];
                                      updated[idx] = { ...updated[idx], genderValue: value };
                                      return updated;
                                    });
                                  }} />
                              </ConfigProvider>
                            </div>

                            {/* Hidden Modal logic preserved if needed */}
                            <Modal footer={null}
                              open={openModal}
                              closable
                              width={"23%"}
                              style={{ marginTop: 100 }}
                              onCancel={() => setOpenModal(false)}>
                            </Modal>
                          </div>
                        )}
                      </div>
                    );
                  })}


                  {travellerChildListMap.map((item, idx) => (
                    <div key={idx}>
                      {item.type === 'Adult' ? `Adult ${idx + 1}` : null}
                      {item.type === 'Child' ? `Child ${idx + 1}` : null}
                      {item.type === 'Infants' ? `Infant ${idx + 1}` : null}
                    </div>
                  ))}



                </div>


              </div>
            ) : null}



            {/* Down Card */}
            <div style={{
              position: "fixed",
              bottom: 0,
              width: "972px",
              height: "7%",
              zIndex: 1000,
              background: "#fff",
              padding: "10px 20px",
              left: "32%",
              boxShadow: "0 5px 25px rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              alignItems: "center"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
              }}>
                <Text style={{
                  fontSize: 24, fontWeight: 600
                }}>
                  ₹{finalAmount.toLocaleString("en-IN")}

                </Text>
                <div style={{
                  display: "flex", marginTop: 12, marginLeft: 5
                }}>
                  <s style={{
                    color: "#b22422"
                  }}>{promoOfferList[0].amount ? (`₹ ${slashAmount.toLocaleString("en-IN")}`) : null}</s>
                  <Text style={{
                    color: "#5e616e", marginTop: -2, fontWeight: 500,
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
                    width: "145px",
                    height: "40px",
                    fontSize: "17px",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    if (!phoneNo) {
                      dispatch(setOpenDrawer(true));
                      return;
                    }

                    if (refundValue.planType === null) {
                      startShake();
                      if (shakeref.current) {
                        shakeref.current.focus();
                      }
                    }
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
            // padding:12
          }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Text style={{
                fontSize: "24px",
                fontWeight: 700
              }}>Offers For You</Text>
              <CloseOutlined
                onClick={() => setViewOffers(false)}
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
              marginTop: 20
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
                        }}>{item?.amount > 0 && `₹${item.amount} Off`}  </Text>) : null}
                        </div>

                      </div>
                      <Text style={{
                        position: "relative",
                        color: radioValue === idx ? "green" : "black",
                        fontFamily: "Roboto",
                        fontSize: 14.5,
                        bottom: 10, left: 25, paddingRight: 15
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
        <LoginPage />
      </div>


      {/* Edit Traveller Modal */}
      <Modal
        title="Edit Traveller Details"
        open={isEditModalOpen}
        onOk={handleSaveEdit}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div>
            <Text strong>First Name</Text>
            <Input
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
          </div>
          <div>
            <Text strong>Last Name</Text>
            <Input
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
          </div>
          <div>
            <Text strong>Gender</Text>
            <Radio.Group
              value={editGender}
              onChange={(e) => setEditGender(e.target.value)}
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </div>
          <div>
            <Text strong>Date of Birth (DD/MM/YYYY)</Text>
            <Input
              value={editDOB}
              onChange={(e) => setEditDOB(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </Modal>
    </>
  )

}
export default ReviewTravellerDetails;















{adults.map((person, index) => {
                            const isSelected = selectedAdults.some(a => a.key === person.key);
                            const existsInStore = selectedAdults.some(t => t.key === person.key);
                            const disableExtra = selectedAdults.length >= travellers.Adults;

                            const handleFirstNameChange = (value) =>{
                              
                              const NAME_REGEX = /^[A-Za-z\s'-]{1,27}$/;

                              const isValid = NAME_REGEX.test(value);
                              if (value === ""  || !isValid) {
                                setFirstNameError(true)
                              }
                              else {
                                setFirstNameError(false)
                              }

                              setSelectedAdults((prev) => {
                                const updated = [...prev];
                                updated = { ...updated, firstName: value };
                                setadultFirstName(value);
                                return updated;
                              });
                            }

                            return (
                              <div
                                key={person.key}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                }}
                              >
                                <div style={{
                                  display:"flex",
                                  flexDirection:"column"  
                                }}>
                                  <div>
                                    <input
                                  type="checkbox"
                                  checked={Boolean(isSelected || alreadySelected)}
                                  // disabled={disableExtra}
                                  onChange={() => handleSelectAdult(person)}
                                  style={{ height: 20, width: 20 }}
                                />

                                <span style={{ fontSize: 16 }}>
                                  {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                  {person.firstName} {person.lastName}
                                </span>
                                </div>
                                <div>
                                {isSelected && (
                                    <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "34px",
                              marginTop: 15,
                            }}
                          >
                            <Form>
                              <Form.Item
                                rules={[{ required: true }]}
                                validateTrigger="onBlur"
                              // validateStatus={firstNameError ? "error" : ""}
                              // help={firstNameError ? "" : ""}
                              >
                                <FloatingInput
                                  label="First Name"
                                  value={person.firstName || ""}
                                  onChange={(v) => handleFirstNameChange(v)} 
                                  error={
                                    firstNameError && "Your first name should have 1–27 characters"
                                  }
                                />
                              </Form.Item>
                            </Form>


                            <Form>
                              <Form.Item>
                                <FloatingInput
                                  label="Last Name"
                                  value={person.lastName || ""}
                                  // onChange={(v) => handleLastNameChange(v, idx)}
                                  error={lastNameError && "Your last name should have 1–27 characters "}
                                />
                              </Form.Item>
                            </Form>

                            <Form>
                              <Form.Item rules={[{ required: true }]}>
                                <FloatingInput
                                  label="DOB (DD/MM/YYYY)"
                                  type={dayjs("DD/MM/YYYY")}
                                  value={person.DOBValue || ""}
                                  // onChange={(v) => handleDOBChange(v, idx)}
                                  error={DOBError && "Enter Valid Age"}


                                />

                              </Form.Item>
                            </Form>

                            <ConfigProvider
                              theme={{
                                components: {
                                  Segmented: {
                                    itemSelectedBg: "#fc790d",
                                    itemSelectedColor: "white"
                                  },
                                }
                              }}
                            >



                              <Segmented
                                value={person.genderValue || "Male"}
                                options={["Male", "Female"]}
                                style={{
                                  background: "#f1f1f1",
                                  borderRadius: "10px",
                                  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                  fontWeight: 500,
                                  border: "1.5px solid #c9c9c9",
                                  textAlign: "center",
                                  justifyContent: "center",
                                  height: 50,
                                  display: "flex",
                                  alignItems: "center",
                                  paddingLeft: 12,
                                  paddingRight: 12,
                                  fontSize: 15,
                                  backgroundColor: "white", transition: "0.2s ease",
                                }}
                                onChange={(value) => {
                                  setSelectedAdults((prev) => {
                                    const updated = [...prev];
                                    updated = { ...updated, genderValue: value };

                                    return updated;

                                  });
                                }} />
                            </ConfigProvider>

                            <Modal footer={null}
                              open={openModal}
                              closable
                              width={"23%"}
                              style={{ marginTop: 100 }}
                              onCancel={() => setOpenModal(false)}>

                            </Modal>

                          </div>
                                  )}
                                </div>
                                <div>
                                  {travellerAdultListMap.map((item,idx)=>( 
                                    <div key={idx}>
                                      <input
                                  type="checkbox"
                                  checked={Boolean(isSelected || alreadySelected)}
                                  // disabled={disableExtra}
                                  onChange={() => handleSelectAdult(person)}
                                  style={{ height: 20, width: 20 }}
                                />

                                <span style={{ fontSize: 16 }}>
                                  {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                  Adult {idx +1}
                                </span>
                                    </div>
                                  ))}
                                </div>
                                </div>
                                
                                
                              </div>
                            );
                          })}


                          //Dummy 2


                          {add?.length > 0 ? (
                                            <div style={{
                                              border: ".5px solid #cccccc",
                                              borderRadius: "20px",
                                              marginTop: 20,
                                              background: "white", padding: 20
                                            }}>
                                              {travellers.Adults > 0 && adults.length > 0 && (
                                                <div>
                                                  <Text style={{
                                                    fontSize: 15, fontWeight: 500
                                                  }}>
                                                    Adults (12 yrs or above)
                                                  </Text>
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
                          
                                                  <div style={{
                                                    display: "flex",
                                                    flexDirection:"column",
                                                    // gap: "50px",
                                                    // flexWrap: "wrap",
                                                    marginTop: 10
                                                  }}>
                                                    <div>
                                                      
                                                      </div>
                          
                                                    <div>
                                                    
                                                    </div>
                          
                                                  </div>
                          
                          
                          
                          
                                                </div>
                                              )}
                                              <div style={{
                                                marginTop: 10
                                              }}>
                                                {travellers.Children > 0 && children.length > 0 && (
                                                  <div>
                                                    <Divider style={{
                                                      borderColor: "#8a8a8a"
                                                    }} />
                                                    <Text style={{
                                                      fontSize: 15, fontWeight: 500
                                                    }}>Child (2-12 yrs)</Text>
                                                    <div style={{
                                                      display: "flex",
                                                      gap: "50px",
                                                      flexWrap: "wrap",
                                                      marginTop: 10
                                                    }}>
                                                      {children.map((person, index) => {
                                                        const isSelected = selectedChildren.some(a => a.key === person.key);
                                                        // const disableExtra = selectedAdults.length >= travellers.Adults;
                          
                                                        return (
                                                          <div
                                                            key={person.key}
                                                            style={{
                                                              display: "flex",
                                                              alignItems: "center",
                                                              gap: 10,
                                                            }}
                                                          >
                                                            <input
                                                              type="checkbox"
                                                              checked={isSelected}
                                                              // disabled={disableExtra}
                                                              onChange={() => handleSelectChildren(person)}
                                                              style={{ height: 20, width: 20 }}
                                                            />
                          
                                                            <span style={{ fontSize: 16 }}>
                                                              {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                                              {person.firstName} {person.lastName}
                                                            </span>
                                                            
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                          
                                                  </div>
                                                )}
                                              </div>
                                              
                          
                                              <div style={{
                                                marginTop: 10
                                              }}>
                                                {travellers.Infants > 0 && infants.length > 0 && (
                                                  <div>
                                                    <Divider style={{
                                                      borderColor: "#8a8a8a"
                                                    }} />
                                                    <Text style={{
                                                      fontSize: 15, fontWeight: 500
                                                    }}>Infants (0-2 yrs)</Text>
                                                    <div style={{
                                                      display: "flex",
                                                      gap: "50px",
                                                      flexWrap: "wrap",
                                                      marginTop: 10
                                                    }}>
                                                      {infants.map((person, index) => {
                                                        const isSelected = selectedInfants.some(a => a.key === person.key);
                                                        // const disableExtra = selectedAdults.length >= travellers.Infants;
                          
                                                        return (
                                                          <div
                                                            key={person.key}
                                                            style={{
                                                              display: "flex",
                                                              alignItems: "center",
                                                              gap: 10,
                                                            }}
                                                          >
                                                            <input
                                                              type="checkbox"
                                                              checked={isSelected}
                                                              // disabled={disableExtra}
                                                              onChange={() => handleSelectInfants(person)}
                                                              style={{ height: 20, width: 20 }}
                                                            />
                          
                                                            <span style={{ fontSize: 16 }}>
                                                              {/* {person.genderValue === "Male" ? "Mr" : "Ms"} */}
                                                              {person.firstName} {person.lastName}
                                                            </span>
                                                            
                                                            
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                          
                                                  </div>
                                                )}
                                              </div>
                          
                          
                                            </div>
                                          ) : null}

                          {adults.map((person,idxx) => {
                                                      const isSelected =  getselected(person) || selectedAdults.some(a => a.key === person.key);
                                                      // const existsInStore = selectedAdults.some(a => a.key === person.key);
                          
                                                      return (
                                                        <div>
                                                        <div key={person.key} style={{ display: "flex", flexDirection: "column" }}>
                                                          
                                                          {/* CHECKBOX FOR EXISTING PERSON */}
                                                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                            <input
                                                              type="checkbox"
                                                              checked={isSelected}
                                                              // onChange={() => {
                                                              //   handleSelectAdult(person);
                                                              //   setactiveAdultIndex(person.key);   
                                                              // }}
                                                              style={{ height: 20, width: 20 }}
                                                            />
                                                            <span>{person.firstName} {person.lastName}</span>
                                                          </div>
                          
                                                          {/* IF SELECTED → SHOW EDIT FORM */}
                                                          {isSelected && activeAdultIndex === person.key && (
                                                            <div>
                                                              <div
                                                      style={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: "34px",
                                                        marginTop: 15,
                                                      }}
                                                    >
                                                      <Form>
                                                        <Form.Item
                                                          rules={[{ required: true }]}
                                                          validateTrigger="onBlur"
                                                        // validateStatus={firstNameError ? "error" : ""}
                                                        // help={firstNameError ? "" : ""}
                                                        >
                                                          <FloatingInput
                                                            label="First Name"
                                                            value={selectedAdults[idxx]?.firstName || ""}
                                                            // onChange={(v) => handleFirstNameChange(v, idxx)}
                                                            error={
                                                              firstNameError && "Your first name should have 1–27 characters"
                                                            }
                                                          />
                                                        </Form.Item>
                                                      </Form>
                          
                          
                                                      <Form>
                                                        <Form.Item>
                                                          <FloatingInput
                                                            label="Last Name"
                                                            value={selectedAdults[idxx]?.lastName || ""}
                                                            // onChange={(v) => handleLastNameChange(v, idxx)}
                                                            error={lastNameError && "Your last name should have 1–27 characters "}
                                                          />
                                                        </Form.Item>
                                                      </Form>
                          
                                                      <Form>
                                                        <Form.Item>
                                                          <FloatingInput
                                                            label="DOB (DD/MM/YYYY)"
                                                            type={dayjs("DD/MM/YYYY")}
                                                            value={selectedAdults[idxx]?.DOBValue || ""}
                                                            // onChange={(v) => handleDOBChange(v, idxx)}
                                                            error={DOBError && "Enter Valid Age"}
                          
                          
                                                          />
                          
                                                        </Form.Item>
                                                      </Form>
                          
                                                      <ConfigProvider
                                                        theme={{
                                                          components: {
                                                            Segmented: {
                                                              itemSelectedBg: "#fc790d",
                                                              itemSelectedColor: "white"
                                                            },
                                                          }
                                                        }}
                                                      >
                          
                          
                          
                                                        <Segmented
                                                          value={selectedAdults[idxx]?.genderValue || "Male"}
                                                          options={["Male", "Female"]}
                                                          style={{
                                                            background: "#f1f1f1",
                                                            borderRadius: "10px",
                                                            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                                            fontWeight: 500,
                                                            border: "1.5px solid #c9c9c9",
                                                            textAlign: "center",
                                                            justifyContent: "center",
                                                            height: 50,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            paddingLeft: 12,
                                                            paddingRight: 12,
                                                            fontSize: 15,
                                                            backgroundColor: "white", transition: "0.2s ease",
                                                          }}
                                                          // onChange={(value) => {
                                                          //   setSelectedAdults((prev) => {
                                                          //     const updated = [...prev];
                                                          //     updated[idxx] = { ...updated[idxx], genderValue: value };
                          
                                                          //     return updated;
                          
                                                          //   });
                                                          // }} 
                                                          />
                                                      </ConfigProvider>
                          
                                          
                          
                                                    </div>
                                                            </div>
                                                          )}
                          
                                                        </div>
                                                        <div>
                                                          {travellerAdultListMap.map((item, idx) => {
                                                      const newKey = `new-${idx}`; // unique key for add-new mode
                                                      const isSelected = activeAdultIndex === newKey;
                                                      const keyy = selectedAdults.length > 0?idxx +1:idx 
                          
                                                      return (
                                                        <div key={idx}>
                          
                                                          {/* ALWAYS SHOW ADD NEW CHECKBOX */}
                                                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                            <input
                                                              type="checkbox"
                                                              checked={isSelected} 
                                                              onChange={() => {
                                                                setactiveAdultIndex(newKey); 
                                                                // if (selectedAdults.some(a => a.key === item.key)) {
                                                                //     setSelectedAdults(prev => prev.filter(a => a.key !== item.key));
                                                                //     return;
                                                                //   } 
                                                                //                                     if (selectedAdults.length >= maxAllowed) {
                                                                //     messageApi.open({
                                                                //       content: `You cannot select more than ${travellers?.Adults}  ${travellers?.Adults == 1 ? `Adult` : `Adults`}`,
                                                                //       duration: 3,
                                                                //     });
                                                                //     return;
                                                                //   } 
                                                              }}
                                                            />
                                                            <span>Adult {idx + 1}</span>
                                                          </div>
                          
                                                          {/* OPEN ADD NEW FORM */}
                                                          {isSelected && (
                                                            <div
                                                      style={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: "34px",
                                                        marginTop: 15,
                                                      }}
                                                    >
                                                      <Form>
                                                        <Form.Item
                                                          rules={[{ required: true }]}
                                                          validateTrigger="onBlur"
                                                        // validateStatus={firstNameError ? "error" : ""}
                                                        // help={firstNameError ? "" : ""}
                                                        >
                                                          <FloatingInput
                                                            label="First Name"
                                                            value={selectedAdults[keyy]?.firstName || ""}
                                                            // onChange={(v) => handleFirstNameChange(v, keyy)}
                                                            error={
                                                              firstNameError && "Your first name should have 1–27 characters"
                                                            }
                                                          />
                                                        </Form.Item>
                                                      </Form>
                          
                          
                                                      <Form>
                                                        <Form.Item>
                                                          <FloatingInput
                                                            label="Last Name"
                                                            value={selectedAdults[keyy]?.lastName || ""}
                                                            // onChange={(v) => handleLastNameChange(v, keyy)}
                                                            error={lastNameError && "Your last name should have 1–27 characters "}
                                                          />
                                                        </Form.Item>
                                                      </Form>
                          
                                                      <Form>
                                                        <Form.Item>
                                                          <FloatingInput
                                                            label="DOB (DD/MM/YYYY)"
                                                            type={dayjs("DD/MM/YYYY")}
                                                            value={selectedAdults[keyy]?.DOBValue || ""}
                                                            // onChange={(v) => handleDOBChange(v, keyy)}
                                                            error={DOBError && "Enter Valid Age"}
                          
                          
                                                          />
                          
                                                        </Form.Item>
                                                      </Form>
                          
                                                      <ConfigProvider
                                                        theme={{
                                                          components: {
                                                            Segmented: {
                                                              itemSelectedBg: "#fc790d",
                                                              itemSelectedColor: "white"
                                                            },
                                                          }
                                                        }}
                                                      >
                          
                          
                          
                                                        <Segmented
                                                          value={selectedAdults[keyy]?.genderValue || "Male"}
                                                          options={["Male", "Female"]}
                                                          style={{
                                                            background: "#f1f1f1",
                                                            borderRadius: "10px",
                                                            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                                            fontWeight: 500,
                                                            border: "1.5px solid #c9c9c9",
                                                            textAlign: "center",
                                                            justifyContent: "center",
                                                            height: 50,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            paddingLeft: 12,
                                                            paddingRight: 12,
                                                            fontSize: 15,
                                                            backgroundColor: "white", transition: "0.2s ease",
                                                          }}
                                                          // onChange={(value) => {
                                                          //   setSelectedAdults((prev) => {
                                                          //     const updated = [...prev];
                                                          //     updated[idx] = { ...updated[idx], genderValue: value };
                          
                                                          //     return updated;
                          
                                                          //   });
                                                          // }} 
                                                          />
                                                      </ConfigProvider>
                          
                                          
                          
                                                    </div>
                                                          )}
                          
                                                        </div>
                                                      );
                                                    })}
                                                        </div>
                                                        </div>
                                                      );
                                                      
                                                      })}



                                                      /// Dummy 33


                                                      {/* Existing Modal */}
                                                                      <Modal 
                                                                      footer={null}
                                                                                              open={existingModal}
                                                                                              closable
                                                                                              width={"30%"}
                                                                                              onCancel={() => {setExistingModal(false)
                                                                                                setSelectedAdults(prev =>
                                                                                                        prev.filter(a => disabledAdults.includes(a.key))
                                                                                                      );
                                                                                              }}
                                                                                              style={{
                                                                                                  marginTop:50 
                                                                                              }}>
                                                                                                {adults.map((person,idx)=>{
                                                                                                  const isSelected = Array.isArray(selectedAdults) && Array.isArray(tempArray) && selectedAdults.some(a => a.key === person.key);
                                                                                                  const isDisabled = disabledAdults.includes(person.key);
                                                                                                  return(
                                                                                                    <>
                                                                                                    <div key={person.key} style={{ display: "flex", flexDirection: "column" }}>
                                                                                      
                                                                                      {/* CHECKBOX FOR EXISTING PERSON */}
                                                                                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          checked={isSelected}
                                                                                           disabled={isDisabled}
                                                                                          onChange={() => {
                                                                                            handleSelectAdult(person);
                                                                                               
                                                                                          }}
                                                                                          style={{ height: 20, width: 20 }}
                                                                                        />
                                                                                        <span>{person.firstName} {person.lastName}</span>
                                                                                      </div>
                                                      
                                                                                     
                                                      
                                                                                    </div>
                                                                                                    </>
                                                                                                  )
                                                                                                })}
                                                                                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20,gap:20 }}>
                                                                                                 <button
                                                                                                      style={{
                                                                                                        borderRadius: 10,
                                                                                                        width: "100px",
                                                                                                        height: "35px",
                                                                                                        fontSize: "16px",
                                                                                                        color: "black",
                                                                                                        background: "white",
                                                                                                        border: "1px solid #b8b8bcff",
                                                                                                      }}
                                                                                                     onClick={() => {
                                                                                                      setSelectedAdults(prev =>
                                                                                                        prev.filter(a => disabledAdults.includes(a.key))
                                                                                                      );
                                                      
                                                                                                      setExistingModal(false); 
                                                                                                    }}
                                                      
                                                                                                    >
                                                                                                      SKIP
                                                                                                    </button>
                                                                                            <button
                                                                                              style={{
                                                                                                background: "#ff7a00",
                                                                                                border: "none",
                                                                                                borderRadius: 10,
                                                                                                width: "100px",
                                                                                                height: "35px",
                                                                                                fontSize: "16px",
                                                                                                color: "white",
                                                                                              }}
                                                                                              onClick={() => {
                                                                                          
                                                                                          setDisabledAdults(prev => [
                                                                                            ...prev,
                                                                                            ...selectedAdults.map(a => a.key)
                                                                                          ]);
                                                      
                                                                                          
                                                                                          setExistingModal(false);
                                                      
                                                                                          
                                                                                          settempArray(prev => [
                                                                                      ...prev,
                                                                                      ...selectedAdults
                                                                                        .filter(a => a && !disabledAdults.includes(a.key)) 
                                                                                        .map((a, idx) => ({
                                                                                          key: prev.length + idx,
                                                                                          firstName: a.firstName || "",
                                                                                          lastName: a.lastName || "",
                                                                                          DOBValue: a.DOBValue || "", 
                                                                                          genderValue: a?.genderValue || "Male",
                                                                                        }))
                                                                                    ]);
                                                      
                                                      
                                                                                        }}
                                                      
                                                                                            >
                                                                                              SELECT
                                                                                            </button>
                                                                                          </div> 
                                                      
                                                                      </Modal>


// Dummy 4
{travellers.Children > 0 && (
                    <div>
                      <Text style={{
                        fontWeight: 500
                      }}>Children</Text>
                      {selectedChildren.length > 0 && (
                        <div style={{
                          marginTop: 10
                        }}>
                          {selectedChildren.map((item, idx) => (
                            <div key={idx} style={{
                              display: "flex", justifyContent: "space-between"
                            }}>
                              {/* {item.genderValue === "Male" ? "Mr" : "Ms"} */}
                              {idx + 1} -  {item.firstName} {item.lastName}

                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {travellerChildListMap.map((item, idx) => (
                    <div key={idx}>
                      {item.type === 'Adult' ? `Adult ${idx + 1}` : null}
                      {item.type === 'Child' ? `Child ${idx + 1}` : null}
                      {item.type === 'Infants' ? `Infant ${idx + 1}` : null}
                    </div>
                  ))}