import React,{useState,useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Typography, Tooltip,Button } from "antd";
import duration from "dayjs/plugin/duration";
import { ArrowRightOutlined,AppstoreOutlined,CheckOutlined } from "@ant-design/icons";
import FlightTicketFilledIcon from "../Images/FlightTicketFilledIcon.png"
import FlightTakeoffFilledIcon from "../Images/FlightTakeoffFilledIcon.png"


dayjs.extend(duration);

const { Text } = Typography;

const CancellationDetails = () =>{

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

      const [fullAmount,setFullAmount] = useState(0)
      const [fullDiscount,setFullDiscount] = useState(0)
      const [openDrawer, setOpenDrawer] = useState(false);
      const [finalAmount,setFinalAmount] =useState()
      const [removeFeeAdd,setRemoveFeeAdd] = useState(false);
      const [removeRescheduleAdd,setRemoveRescheduleAdd] = useState(false);
      const [open, setOpen] = useState(false);
      const now = new Date();
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const [currentTime,setCurrentTime] = useState(time)

      useEffect(()=>{
          if(removeFeeAdd || removeRescheduleAdd){
            setRemoveFeeAdd(false);
            setRemoveRescheduleAdd(false)
          }
          },[travellerValue,from,to,departure,returnDate,returnTrip,returnTripUI,travelClass])

           const handleAddCancelFee = (calculateCancel) =>{
        const final = fullAmount + calculateCancel
        setFinalAmount(final)
        
        setRemoveFeeAdd(true)
        if(removeRescheduleAdd){
          setRemoveRescheduleAdd(false)
        }
        
        
        }
        
        const handleAddRescheduleFee = (calculateReschedule) =>{
        const final = fullAmount + calculateReschedule
        setFinalAmount(final)
        //  animateValue(finalAmount, final, 600, (val) => {
        //     setFinalAmount(val);
        //   });
        
        setRemoveRescheduleAdd(true)
        
        if(removeFeeAdd){
          setRemoveFeeAdd(false)
        }
        }
        
              const CalculateFullAmount = () =>{
                const a = onewaySelectedFlight[0]?.price;
                const b = returnSelectedFlight[0]?.price;
                setFullAmount(a+b)
              }
        
              const CalculateFullDiscount = () =>{
                const a = onewaySelectedFlight[0]?.discount;
                const b = returnSelectedFlight[0]?.discount;
                setFullDiscount(a+b)
              }
        
        useEffect(() => {
                CalculateFullAmount();
                CalculateFullDiscount();
              }, [onewaySelectedFlight, returnSelectedFlight]);


      const getCancelFee = (price) => {
                if (price > 6000) return 719;
                if (price > 4500) return 519;
                if (price > 3500) return 359;
                return 259;
              };
      
              
              
                const getRescheduleFee = (price) => {
                if (price > 6000) return 1019;
                if (price > 4500) return 819;
                if (price > 3500) return 659;
                return 459;
              };
      
      
              const getTotalTraveller = () =>{
                  if(travellerValue>1) return fullAmount * travellerValue;
              
                return fullAmount;
              }
      
              const getTotalOnwardsTraveller = (price) =>{
                if(travellerValue>1) return price * travellerValue;
              
                return price;
      
              }
      
              const getTotalReturnTraveller = (price) =>{
                if(travellerValue>1) return price * travellerValue;
              
                return price;
              }
      
              const [lessday,setLessDay] = useState()
              
      
              const get8HrsCancelTime = (departureTime) =>{
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

                 useEffect(() => {
                            if (!onewaySelectedFlight[0]?.departureTime) return;
                          
                            const { finalTime, days } = get8HrsCancelTime(onewaySelectedFlight[0]?.departureTime);
                          
                            const newDate = dayjs(departure).add(days, "day").format("YYYY-MM-DD");
                            setLessDay(newDate);
                          
                          }, [onewaySelectedFlight[0]?.departureTime]);
                
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
                
                          useEffect(() => {
                            if (!returnSelectedFlight[0]?.departureTime) return;
                          
                            const { finalTime, days } = get8HrsCancelReturnTime(returnSelectedFlight[0]?.departureTime);
                          
                            const newDate = dayjs(returnDate).add(days, "day").format("YYYY-MM-DD");
                            setLessReturnDay(newDate);
                          
                          }, [returnSelectedFlight[0]?.departureTime]);

                           const [swapButton,setSwapButton] = useState(false)
                          
                                  const handleOnwardSwap = () =>{
                                    setSwapButton(false)
                                  }
                                  const handleReturnSwap = () =>{
                                    setSwapButton(true)
                                  }
                                  useEffect(()=>{
                                    if(!openDrawer){
                                      setSwapButton(false)
                                    }
                                  },[openDrawer])
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
                          
                          const lessdep = formatDate(lessday);
                          const lessret = formatDate(lessReturnday);
                        
                        
                        const getIxigoCancelFee = ()=>{
                          if(travellerValue>1) return 300 * travellerValue;
                           return 300;
                        }
                        
                        const getIxigoRescheduleFee = ()=>{
                          if(travellerValue>1) return 499 * travellerValue;
                           return 499;
                        }

                        useEffect(() => {
                                  if (!onewaySelectedFlight || onewaySelectedFlight.length === 0) return;
                                
                                  const price = onewaySelectedFlight[0]?.price || 0;
                                  const cancelFee = getIxigoCancelFee(onewaySelectedFlight[0]?.price);
                                  const rescheduleFee = getIxigoRescheduleFee(onewaySelectedFlight[0]?.price);
                                
                                  if (removeFeeAdd) {
                                    handleAddCancelFee(cancelFee);
                                  } else if (removeRescheduleAdd) {
                                    handleAddRescheduleFee(rescheduleFee);
                                  } else {
                                    setFinalAmount(price);
                                  }
                                }, [onewaySelectedFlight]);

                                const [openReTerm, setOpenReTerm] = useState(false);

                                const contentRef = useRef(null);
                                          const contentRef1 = useRef(null);
                                          const [height, setHeight] = useState("0px");
                                          const [height1, setHeight1] = useState("0px");
                                        
                                          useEffect(() => {
                                          if (!contentRef.current) return;
                                        
                                          setHeight(`${contentRef.current.scrollHeight}px`);
                                        }, [open,onewaySelectedFlight]);
                                        
                                          useEffect(() => {
                                          if (!contentRef1.current) return;
                                        
                                          setHeight1(`${contentRef1.current.scrollHeight}px`);
                                        }, [openReTerm,onewaySelectedFlight]);


    return(
        <>
        <div>
                        
                        {onewaySelectedFlight.map((items,idx)=>{
                        const calculateCancel = getCancelFee(items.price);
                        const calTotalTravellerRefund = getTotalTraveller(items.price);
                        const calTotalTravellerOnwardsRefund = getTotalOnwardsTraveller(items.price);
                        const calTotalTravellerReturnRefund = getTotalReturnTraveller(returnSelectedFlight[0].price);
                        const cal8HrsCancelTime = get8HrsCancelTime(items.departureTime)
                        const cal8HrsCancelReturnTime = get8HrsCancelReturnTime(returnSelectedFlight[0].departureTime)
                        const ixigoCancelFee = getIxigoCancelFee() 
                        console.log("cancelfee",calculateCancel)
                        return(
                          <div style={{
                          fontFamily:"Roboto"
                        }}>
                          
                          <Text style={{fontWeight:500}}>*Cancellation charges applicable (Airline fee + ixigo fee)</Text>
                          <div style={{ display: "flex", justifyContent: "space-evenly", width: "250px",marginTop:10}}>
                                      <Button shape="round" size="medium" 
                                        onClick={handleOnwardSwap} 
                                        style={{
                                          fontFamily: "Roboto",
                                          fontSize: 16,
                                          color:swapButton?"black":"#288ee7ff",
                                          backgroundColor:swapButton?"white":"#f2f9ff",
                                          borderColor:swapButton?null:"#288ee7ff",
                                          transition:"all 0.15 cubic-bezier(.4,0,.2,1)",
                          
                                        }}
                                        onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = swapButton?"#eeeeeeff":"#f2f9ff";
                                                        e.currentTarget.style.color = swapButton?"black":"#288ee7ff";
                                                       
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = "white";
                                                        e.currentTarget.style.color = swapButton?"black":"288ee7ff";
                                                      }}>{`${fromCode} - ${toCode}`}</Button>
                                      <Button shape="round" size="medium" type={swapButton ? "primary" : "default"}
                                        onClick={handleReturnSwap}
                                        style={{
                                          fontFamily: "Roboto",
                                          fontSize: 16,
                                          color:!swapButton?"black":"#288ee7ff",
                                          backgroundColor:!swapButton?"white":"#f2f9ff",
                                          borderColor:!swapButton?null:"#288ee7ff",
                                          transition:"all 0.15 cubic-bezier(.4,0,.2,1)",
                          
                                        }}
                                        onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = !swapButton?"#eeeeeeff":"#f2f9ff";
                                                        e.currentTarget.style.color = !swapButton?"black":"#288ee7ff";
                                                       
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = "white";
                                                        e.currentTarget.style.color = !swapButton?"black":"288ee7ff";
                                                      }}>{`${toCode} - ${fromCode}`}</Button>
                                    </div>
                                    {!swapButton?(
                                      <div>
                                        {removeFeeAdd?(
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
                                  Full refund of ₹{calTotalTravellerOnwardsRefund.toLocaleString("en-IN")}
                                </Text>
                                <br/>
                                <Text style={{
                                  fontSize:"12px",
                                  fontWeight:500,
                                  color:"#5e616e"
                                }}>(<span style={{
                                  color:"green",
                        
                                }}>₹0</span> <span><s>₹{calTotalTravellerOnwardsRefund.toLocaleString("en-IN")}</s>
                                  </span> + ₹{ixigoCancelFee.toLocaleString("en-IN")})* </Text>
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
                            width:"50%",
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
                              left:410,
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
                            }}>{cal8HrsCancelTime.finalTime}</Text>
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
                            }}>{dep.day} {dep.month}, {items.departureTime}</Text>
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
                            }}>{dep.day} {dep.month}, {items.departureTime}</Text>
                            </div>
                            </div>
                          </div>
                          </div>
                          )}
                                      </div>
                                    ):(
                                      <div>
                                        {removeFeeAdd?(
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
                                  Full refund of ₹{calTotalTravellerReturnRefund.toLocaleString("en-IN")}
                                </Text>
                                <br/>
                                <Text style={{
                                  fontSize:"12px",
                                  fontWeight:500,
                                  color:"#5e616e"
                                }}>(<span style={{
                                  color:"green",
                        
                                }}>₹0</span> <span><s>₹{calTotalTravellerReturnRefund.toLocaleString("en-IN")}</s>
                                  </span> + ₹{ixigoCancelFee.toLocaleString("en-IN")})* </Text>
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
                            width:"50%",
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
                              left:410,
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
                            }}>{cal8HrsCancelReturnTime.finalTime}</Text>
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
                            }}>{ret.day} {ret.month}, {returnSelectedFlight[0].departureTime}</Text>
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
                            }}>{ret.day} {ret.month}, {returnSelectedFlight[0].departureTime}</Text>
                            </div>
                            </div>
                          </div>
                          </div>
                          )}
                                      </div>
                                    )}
        
                          
                          
                          
                          <Text style={{fontSize:"15px",fontWeight:500,
                            position:"relative",
                            right:7
                          }}>Total refund amount applicable for 1 traveller.</Text>
                          <div style={{ fontFamily: "Roboto",position:"relative",
                            right:7 }}>
                      
                      
                      
                
                      
                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight: open?height:"0px",
                          transition: "all 0.5s ease",
                        }}
                      >
                        <div ref={contentRef} style={{ paddingBottom: "10px", }}>
                          <h3 style={{ marginBottom: "10px" }}>Terms & Conditions</h3>
                
                          <ol style={{ lineHeight: "24px" }}>
                            <Text type="secondary" style={{fontSize:"15px",fontWeight:500}}>
                            <li>Cancellation charges are applicable per passenger per sector.</li>
                            <li>Discount and Assured fee, if any, will be adjusted in the final refund amount.</li>
                            <li>Partial cancellation cannot be made for tickets booked under special or discounted fares.</li>
                            <li>
                              In case of a no-show or for tickets cancelled post a specific time, only statutory taxes are refundable.
                            </li>
                            <li>
                              Penalty charged by the airline is indicative only and may change without prior notice.
                            </li>
                            <li>Cancellation request will be processed only within the mentioned time period.</li>
                            <li>
                              If the flight fare is less than default cancellation penalty then taxes will be refundable.
                            </li>
                            <li>
                              In the event of cancellation, the applied discount will be non-refundable and recovered from the refund.
                            </li>
                            </Text>
                          </ol>
                        </div>
                      </div>
                      <Text
                        onClick={() => setOpen(!open)}
                        style={{
                          color: "#2d79c7",
                          cursor: "pointer",
                          fontWeight: 500,
                          marginBottom: "10px",
                          fontSize:"16px",
                          textDecoration:"underline"
                        }}
                      >
                        {open ? "Hide Terms & Conditions" : "View Terms & Conditions"}
                      </Text>
                    </div>
                      <div style={{
                        border:".5px solid #cccccc",
                        borderRadius:"20px",
                        width:"100%",
                        marginTop:30,
                        // padding:15,
                        position:"relative",
                        right:10
                      }}> 
                        {removeFeeAdd?(
                          <div>
                          <div  style={{
                          height:"50px",
                          background:"rgb(242, 249, 255)",
                          borderTopLeftRadius:"20px",
                          borderTopRightRadius:"20px",
                          padding:10,
                          display:"flex",
                          justifyContent:"space-between",
                          cursor:"pointer",
                          
                        }}
                        
                        >
                          <div>
                        <img src="https://images.ixigo.com/image/upload/icon/8378c73f79f77491eccf58ba345ee5bc-gbjnr.png"
                        style={{
                          height:25,
                          position:"absolute",
                          zIndex:10
                        }}/>
                        
                        <br />
                        <Text style={{
                          fontWeight:500,
                          fontSize:"17px",
                          bottom:5,
                          position:"relative",
                          top:5
                        }}>Free Cancellation</Text>
                        <br />
                        
                        </div>
                        <div>
                          <button style={{
                            background:"transparent",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            borderRadius:"5px",
                            border:"none",
                            position:"relative",
                            top:20,
                            cursor:"pointer",
                          }} onClick={()=>setRemoveFeeAdd(false)}>
                            <Text style={{
                              color:"#fc790d",
                              fontWeight:500,
                              fontSize:"16px",
                            }}>Remove</Text>
                          </button>
                        </div>
                        </div>
                        </div>
                        ):(
                          <div  style={{
                          maxheight:"80px",
                          background:"rgb(242, 249, 255)",
                          borderTopLeftRadius:"20px",
                          borderTopRightRadius:"20px",
                          padding:10,
                          display:"flex",
                          justifyContent:"space-between",
                          cursor:"pointer",
                          // maxHeight: height,
                          
                        }}
                        onClick={()=>handleAddCancelFee(calculateCancel)}
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
                          ₹{calculateCancel.toLocaleString("en-IN")}<Text style={{
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
                        )}
                        
                        <div style={{
                          padding:15,
                          
                        }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px",gap:5 }}>
                    <CheckOutlined style={{color:"#2B9950"}}/>
                    <span>
                      Instant refund of approx.{" "}
                      <span style={{ fontWeight: "600", color: "#2B9950" }}>₹{calTotalTravellerRefund.toLocaleString("en-IN")}</span>
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
                        
                            
                          )})}
                          </div>
        </>
    )
}

export default CancellationDetails;