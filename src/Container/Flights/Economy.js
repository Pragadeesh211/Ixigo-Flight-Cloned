import React,{useState,useEffect,useRef,useMemo} from "react";
import FlightListSearchCard from "./FlightListSearchCard";
import Link,{useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RightOutlined,CloseOutlined, CloseCircleFilled,ClockCircleOutlined,ArrowRightOutlined,AppstoreOutlined,CheckOutlined  } from "@ant-design/icons";
import { Typography,Card,Checkbox,Col, InputNumber, Row, Slider, Space,ConfigProvider,Button, Tag, Drawer,Tabs,Badge,Avatar, Tooltip,Skeleton } from "antd";
import { 
  setFrom,
  setTo,
  setFromCode,
  setToCode,
  swapFromTo,
  setFromCity,
  setToCity,
  toggleReturnTrip,
  setReturnTripUI,
  setDeparture,
  setReturnDate,
  setTravellers,
  setTravellerValue,
  setTravelClass,
  setCancelFeeAdd,
  setRescheduleFeeAdd,
  setOnewaySelectedFlight,
  setReturnSelectedFlight,
 } from "../../Redux/Slices/FlightSearchSlice";
 import {Swiper,SwiperSlide} from "swiper/react";
 import 'swiper/css';
 import "./EconomySwiper.css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation,Pagination,Autoplay } from "swiper/modules";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import FlightTicketFilledIcon from "../../Images/FlightTicketFilledIcon.png"
import FlightTakeoffFilledIcon from "../../Images/FlightTakeoffFilledIcon.png"
import OnewayFlightDetails from "../../Component/OnewayFlightDetails";



dayjs.extend(duration);





 const { Text } = Typography;
const plainOptions=["Non-Stop","Free meal available","Air India", "IndiGo"]

const airlinePlainOptions=[
    {name:"Air India",image:"https://images.ixigo.com/img/common-resources/airline-new/AI.png"}, 
    {name:"IndiGo",image:"https://images.ixigo.com/img/common-resources/airline-new/6E.png"},
    {name:"Air-India Express",image:"https://images.ixigo.com/img/common-resources/airline-new/IX.png"},
    {name:"SpiceJet",image:"https://images.ixigo.com/img/common-resources/airline-new/SG.png"}
]



const Economy = () =>{
    const dispatch = useDispatch();
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
  cancelFeeAdd,
  rescheduleFeeAdd
  } = useSelector((state) => state.flightSearch);
  
  const navigate = useNavigate();
  


const depart = dayjs(departure).format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(depart);

  // console.log(departure.length)
  // console.log(fromA)
  const [dateFareData, setDateFareData] = useState([]);

// Generate 18 days starting from TODAY
useEffect(() => {
  const today = new Date();
  const daysArray = Array.from({ length: 18 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

    const randomPrice = Math.floor(Math.random() * (3500 - 2500 + 1)) + 2500;
    

    return {
      date: date.toISOString(),
      label: formattedDate,
      price: randomPrice,
    };
  });

  setDateFareData(daysArray);
  
}, []);

// console.log("Ran price",dateFareData.price);

// Set selected date based on departure (default: today)

const [startPrice,setStartPrice] = useState(dateFareData[0]?.price)
const [endPrice,setEndPrice] = useState(51273)
useEffect(() => {
  if (dateFareData.length > 0 && departure) {
    const depDate = new Date(departure);

    const match = dateFareData.find((d) => {
      const parsedDate = new Date(d.date);
      return (
        parsedDate.getDate() === depDate.getDate() &&
        parsedDate.getMonth() === depDate.getMonth() &&
        parsedDate.getFullYear() === depDate.getFullYear()
      );
    });

    setSelectedDate(match ? match.label : dateFareData[0].label);
    const finalPrice = match ? match.price : dateFareData[0].price;
    setStartPrice(finalPrice);
    
  }
}, [dateFareData, departure]);

// console.log(selectedDate)
 const endingprice = 57432;

  const [checkedList, setCheckedList] = useState([]);

  const [airlineCheckList,setAirlineCheckList] = useState([])

  // const [inputValue, setInputValue] = useState(51273);
  
  // console.log(airlineCheckList)
  

//   useEffect(() => {
//   if (dateFareData.length > 0) {
//     setStartPrice(dateFareData[0]?.price);
//   }
// }, [dateFareData,departure]);
  //   const formatCurrency = (value) =>
  //   new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //     maximumFractionDigits: 0,
  //   }).format(value);

 
  // useEffect(() => {
  //   setStartPrice(formatCurrency(7499)); 
  //   setEndPrice(formatCurrency(inputValue)); 
  // }, [inputValue]);

  const cardOfferData = [
    {id:1,image:"https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Foffers_and_deals%2Fcc010d785f911bb56ca68b6a67ccc816-nkpvm.webp&w=640&q=75"},
    {id:2,image:"https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Foffers_and_deals%2F04c789a4cc77a80f3d2a63a51e1460f0-ltytr.webp&w=640&q=75"},
    {id:3,image:"https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Foffers_and_deals%2F7b3fbcd82e484eba9cf1a73a5b3a867b-ggvxt.webp&w=640&q=75"},
    {id:4,image:"https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Foffers_and_deals%2F3b6cfff01aecdf5281a68d9412e5f674-gjyal.webp&w=640&q=75"},
    {id:5,image:"https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Foffers_and_deals%2F154855b11b6045aeab42a17044646433-brciy.webp&w=640&q=75"},
    
  ]
const [flights, setFlights] = useState([]);
const now = new Date();
const time = now.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});


const formatDate = (date) => {
  if (!date) return { day: "", month: "", weekday: "" };
  const d = dayjs(date);
  return {
    day: d.format("DD"),
    month: d.format("MMM"),
    weekday: d.format("ddd"),
  };
};

const dep = formatDate(selectedDate)


const [currentTime,setCurrentTime] = useState(time)

useEffect(() => {

  if (dateFareData.length === 0) return;
  setFlights ([
  {
    id: 1,
    airline: "Air India",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/AI.png",
    flightCodes: [
      {
        code: "AI2740",
        from: "MAA",
        to: "BLR",
        toCity:"Bengaluru",
        toAirport1:"Kempegowda International Airport",
        departureTime1: "15:45",
        arrivalTime1: "17:30",
        duration1: "1h 45m",
        fromTerminal1: 1,
        toTerminal1: 2,
        waitTime:"03h 15m"
      },
      {
        code: "AI2470",
        from: "BLR",
        to: "DEL",
        toCity:"Bengaluru",
        toAirport2:"Kempegowda International Airport",
        departureTime2: "20:45",
        arrivalTime2: "21:45",
        duration2: "1h 35m",
        fromTerminal2: 1,
        toTerminal2: 3
      }
    ]
    ,
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "15:45",
    arrivalTime: "21:45",
    durations: "6h 0m",
    stops: "1 stop",
    nextDayArrival: false,
    price: 10395,
    discount: 670,
    tags: ["Earliest", "Free Meal"],
  },
  {
    id: 2,
    airline: "IndiGo",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/6E.png",
    flightCodes: ["6E532"],
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "06:30",
    arrivalTime: "09:10",
    durations: "2h 40m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: dateFareData[0].price,
    discount: 100,
    tags: ["Cheapest"],
    fromTerminal:3,
    toTerminal:2,
  },
  {
    id: 3,
    airline: "Air India",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/AI.png",
    flightCodes: ["UK820"],
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "10:00",
    arrivalTime: "12:45",
    durations: "2h 45m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 7390,
    discount: 300,
    tags: ["Best Overall"],
    fromTerminal:1,
    toTerminal:3,
  },
  {
    id: 4,
    airline: "SpiceJet",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/SG.png",
    flightCodes: ["SG101"],
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "08:20",
    arrivalTime: "10:55",
    durations: "2h 35m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 6890,
    discount: 150,
    tags: ["Earliest"],
    fromTerminal:2,
    toTerminal:2,
  },
  {
    id: 5,
    airline: "Air-India Express",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/IX.png",
    flightCodes: ["I5142"],
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "13:15",
    arrivalTime: "16:05",
    durations: "2h 50m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 4230,
    discount: 200,
    tags: ["Free Meal"],
    fromTerminal:1,
    toTerminal:1,
  },
  {
  id: 6,
    airline: "SpiceJet",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/SG.png",
    flightCodes: ["SG101"],
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "08:20",
    arrivalTime: "10:55",
    durations: "2h 35m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 6890,
    discount: 150,
    tags: ["Free Meal"],
    fromTerminal:3,
    toTerminal:3,
  },
  {
    id: 7,
    airline: "IndiGo",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/6E.png",
    flightCodes: ["6E532"],
    fromCode: "MAA",
    toCode: "DEL",
    departureTime: "04:30",
    arrivalTime: "09:10",
    durations: "2h 40m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 4230,
    discount: 120,
    tags: ["Free Meal"],
    fromTerminal:2,
    toTerminal:3,
  },
  {
    id: 8,
    airline: "IndiGo",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/6E.png",
    flightCodes: ["6E532"],
    fromCode: "MAA",
    toCode: "HYD",
    departureTime: "06:30",
    arrivalTime: "09:10",
    durations: "2h 40m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 4230,
    discount: 120,
    tags: ["Free Meal"],
    fromTerminal:3,
    toTerminal:2,
  },
  {
    id: 9,
    airline: "SpiceJet",
    logo: "https://images.ixigo.com/img/common-resources/airline-new/SG.png",
    flightCodes: ["6E532"],
    fromCode: "MAA",
    toCode: "HYD",
    departureTime: "08:00",
    arrivalTime: "09:10",
    durations: "2h 10m",
    stops: "Non-stop",
    nextDayArrival: false,
    price: 4230,
    discount: 120,
    tags: ["Free Meal"],
    fromTerminal:3,
    toTerminal:2,
  },
  
]);
}, [dateFareData]);

const offerImage = [
  {id:1,image:"https://images.ixigo.com/image/upload/offers_and_deals/ea3ab668b0f11ed600a767bc6c02feca-hudru.webp"},
  {id:2,image:"https://images.ixigo.com/image/upload/offers_and_deals/c20561591ae9af4a69920bafeaf29cda-ydzdm.webp"},
  {id:2,image:"https://images.ixigo.com/image/upload/offers_and_deals/03fe7864ceb6107b956224ddcca3cfe7-rbabl.webp"},
]

const FilterDetailShow = [
                            // remove duplicates between both filter lists
                            ...new Set([...checkedList, ...airlineCheckList]),

                            // show price range only if changed
                            ...(startPrice !== 0 || endPrice !== 51273 ? [`₹${startPrice} - ₹${endPrice}`] : []),
                          ]
      const today = dayjs().format("YYYY-MM-DD")
      const today1 = formatDate(today)

    const toMinutes = (t) =>{
      const [h,m] = t.split(":").map(Number)
      return h * 60 + m;

    }

  const handleCurrentTimeFilter =(departureTime) =>{
    
  const bufferMinutes = toMinutes("03:00");
  const nowMinutes = toMinutes(currentTime);
  const finalminutes = bufferMinutes + nowMinutes;

  const finaldep = toMinutes(departureTime)

  
  // const minReturnDate = dayjs(selectedDate).format("YYYY-MM-DD");
  // const a = dayjs(selectedDate).isAfter(today)
  console.log("ddddddddddddddddddd",today)
   console.log("ffffffffffff",depart)

  if(today !== depart) return finaldep;
  
  return finalminutes<=finaldep;

   

    
  }

// --- FILTER LOGIC ---
const filteredFlights = useMemo(() => {
  return flights.filter((flight) => {
    //  Airline Filter
    if (
      airlineCheckList.length > 0 &&
      !airlineCheckList.includes(flight.airline)
    ) {
      return false;
    }
    if(fromCode.length > 0 && !fromCode.includes(flight.fromCode)){
      return false;
    }
    if(toCode.length > 0 && !toCode.includes(flight.toCode)){
      return false;
    }
    //  Price Range Filter
    if (flight.price < startPrice || flight.price > endPrice) {
      return false;
    }

    
    //  Recommended Filters
    if (checkedList.includes("Non-Stop") && flight.stops !== "Non-stop") {
      return false;
    }

    if (FilterDetailShow.includes("Non-Stop") && flight.stops === "Non-stop") {
      return true;
    }

    if (
      checkedList.includes("Free meal available") &&
      !flight.tags.includes("Free Meal")
    ) {
      return false;
    }

    if (
      FilterDetailShow.includes("Free meal available") &&
      flight.tags.includes("Free Meal")
    ) {
      return true;
    }

    //  Airline-specific filters 
    const airlineFilters = ["Air India", "IndiGo","Air-India Express", "SpiceJet"];
    let selectedAirlineFilters = checkedList.filter((f) =>
      airlineFilters.includes(f)
    );
    selectedAirlineFilters = airlineCheckList.filter((f) =>
      airlineFilters.includes(f)
    );

    if (
      selectedAirlineFilters.length > 0 &&
      !selectedAirlineFilters.includes(flight.airline)
    ) {
      return false;
    }

     if (
      FilterDetailShow.length > 0 &&
      FilterDetailShow.includes(flight)
    ) {
      return true;
    }

    if(!handleCurrentTimeFilter(flight.departureTime)){
      return false;
    }
    
    console.log("checklist", flight.departureTime)
    return true; 
  });
}, [flights, checkedList, airlineCheckList, startPrice, endPrice,fromCode,toCode]);





console.log("checklist", airlineCheckList)



                          console.log("FilterdetailShow", FilterDetailShow)

  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingDrawer, setLoadingDrawer] = useState(true);
  const [selectedFlights,setSelectedFlights] = useState([])
  const showLoading = (item) => {
    setLoadingDrawer(true);
    dispatch(setOnewaySelectedFlight([item]));
    setSelectedFlights([item]);
    setOpenDrawer(true);
    
    setTimeout(() => setLoadingDrawer(false), 700);
  };
// let depart = departure.format("YYYY-MM-DD")
// console.log("dsdsdds",depart)
console.log("dssdsfc x", flights.departureTime)

// console.log("filterssdfdfd",selectedFlights.flightCodes[0].departureTime1)
const calculateNextDayArrival = (departureTime, arrivalTime,durations) => {
  // Convert both to minutes from midnight
  const [depHour, depMin] = departureTime.split(":").map(Number);
  const [durHour, durMin] = durations.split(":").map(Number);
  
  console.log(depMin)

  const depTotal = depHour + depMin/60;
  const durTotal = durHour + durMin/60;
  const arrday= depTotal + durTotal;
  let nextDayArrival;
  

  console.log("saasax",depTotal)

  // If arrival time is less than departure time → next day
  // const isNextDay = arrTotal < depTotal;

  return;
};

// const calculateDuration = (departure, departureTime, arrivalTime) => {
//   // Combine departure date & time
//   const dep = dayjs(`${departure} ${departureTime}`, "YYYY-MM-DD HH:mm");
//   let arr = dayjs(`${departure} ${arrivalTime}`, "YYYY-MM-DD HH:mm");

//   // If arrival time is before departure → next day arrival
//   if (arr.isBefore(dep)) {
//     arr = arr.add(1, "day");
//   }

//   // Duration calculation
//   const diffMinutes = arr.diff(dep, "minute");
//   const dur = dayjs.duration(diffMinutes, "minutes");

//   const hours = Math.floor(dur.asHours());
//   const minutes = dur.minutes();

//   return {
//     nextDayArrival: arr.isAfter(dep.add(1, "day"), "day"), // optional flag
//     arrivalDate: arr.format("YYYY-MM-DD"),
//     departureDateTime: dep.format("YYYY-MM-DD HH:mm"),
//     arrivalDateTime: arr.format("YYYY-MM-DD HH:mm"),
//     duration: `${hours}h ${minutes}m`,
//   };
// };
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
  if (!openDrawer) {
    setActiveTab("details");
  }
}, [openDrawer]);

  console.log("selectefddd",selectedFlights)

  const [open, setOpen] = useState(false);
   const [openReTerm, setOpenReTerm] = useState(false);
  const contentRef = useRef(null);
  const contentRef1 = useRef(null);
  const [height, setHeight] = useState("0px");
  const [height1, setHeight1] = useState("0px");

  useEffect(() => {
  if (!contentRef.current) return;

  setHeight(`${contentRef.current.scrollHeight}px`);
}, [open,selectedFlights]);

  useEffect(() => {
  if (!contentRef1.current) return;

  setHeight1(`${contentRef1.current.scrollHeight}px`);
}, [openReTerm,selectedFlights]);


  // useEffect(() => {
  //   if (open) {
  //     setHeight(`${contentRef.current.scrollHeight}px`); // Expand
  //   } else {
  //     setHeight("1px"); 
  //   }
    
  // }, [openReTerm]);

  //  useEffect(() => {
  //   if (openReTerm) {
  //     setHeight1(`${contentRef1.current.scrollHeight}px`); // Expand
  //   } else {
  //     setHeight1("1px"); 
  //   }
    
  // }, [openReTerm]);

  

  const [cancelFee,setCancelFee] = useState(259);

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



  const getTotalTraveller = (price) =>{
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
  if (!selectedFlights[0]?.departureTime) return;

  const { finalTime, days } = get8HrsCancelTime(selectedFlights[0]?.departureTime);

  const newDate = dayjs(departure).add(days, "day").format("YYYY-MM-DD");
  setLessDay(newDate);

}, [selectedFlights[0]?.departureTime]);

const lessdep = formatDate(lessday);

console.log("lessdaydsfdfdfdfgxkfhgyugfhdxgfd",lessday)

const getIxigoCancelFee = ()=>{
  if(travellerValue>1) return 300 * travellerValue;
   return 300;
}

const getIxigoRescheduleFee = ()=>{
  if(travellerValue>1) return 499 * travellerValue;
   return 499;
}


const [finalAmount,setFinalAmount] =useState()
const [removeFeeAdd,setRemoveFeeAdd] = useState(false);
const [removeRescheduleAdd,setRemoveRescheduleAdd] = useState(false);

useEffect(()=>{
  if(removeFeeAdd || removeRescheduleAdd){
    setRemoveFeeAdd(false);
    setRemoveRescheduleAdd(false)
  }

},[travellerValue,from,to,departure,returnDate,returnTrip,returnTripUI,travelClass])

 
//   const animateValue = (start, end, duration, callback) => {
//   let startTime = null;

//   const step = (timestamp) => {
//     if (!startTime) startTime = timestamp;
//     const progress = Math.min((timestamp - startTime) / duration, 1);

//     const value = Math.floor(start + (end - start) * progress);
//     callback(value);

//     if (progress < 1) {
//       requestAnimationFrame(step);
//     }
//   };

//   requestAnimationFrame(step);
// };

// useEffect(() => {

// },[finalAmount])




const handleAddCancelFee = (price,calculateCancel) =>{
const final = price + calculateCancel
setFinalAmount(final)
//  animateValue(finalAmount, final, 600, (val) => {
//     setFinalAmount(val);
//   });

setRemoveFeeAdd(true)
if(removeRescheduleAdd){
  setRemoveRescheduleAdd(false)
}


}

const handleAddRescheduleFee = (price,calculateReschedule) =>{
const final = price + calculateReschedule
setFinalAmount(final)
//  animateValue(finalAmount, final, 600, (val) => {
//     setFinalAmount(val);
//   });

setRemoveRescheduleAdd(true)

if(removeFeeAdd){
  setRemoveFeeAdd(false)
}


}

useEffect(() => {
  if (!selectedFlights || selectedFlights.length === 0) return;

  const price = selectedFlights[0]?.price || 0;
  const cancelFee = getIxigoCancelFee(selectedFlights[0]?.price);
  const rescheduleFee = getIxigoRescheduleFee(selectedFlights[0]?.price);

  if (removeFeeAdd) {
    handleAddCancelFee(price, cancelFee);
  } else if (removeRescheduleAdd) {
    handleAddRescheduleFee(price, rescheduleFee);
  } else {
    setFinalAmount(price);
  }
}, [selectedFlights]);

useEffect(()=>{
  setOnewaySelectedFlight([])
})


// console.log("jxbfjdpppppp",selectedFlights[0]?.price)

  //color:#8a8a8a

  const items = [
    {
      key: "details",
      label: "Flight Details",
      children: (
        <div style={{
          fontFamily:"Roboto"
           ,paddingBottom:"60px"
        }}>
          
           <OnewayFlightDetails/>
          
  
         
        </div>
      ),
    },
    {
      key: "cancellation",
      label: "Cancellation",
      children: (
        <div>
        
        {selectedFlights.map((items,idx)=>{
        const calculateCancel = getCancelFee(items.price);
        const calTotalTravellerRefund = getTotalTraveller(items.price);
        const cal8HrsCancelTime = get8HrsCancelTime(items.departureTime)
        const ixigoCancelFee = getIxigoCancelFee();
        return(
          <div style={{
          fontFamily:"Roboto"
        }}>
          
          <Text style={{fontWeight:500}}>*Cancellation charges applicable (Airline fee + ixigo fee)</Text>
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
                  Full refund of ₹{items.price.toLocaleString("en-IN")}
                </Text>
                <br/>
                <Text style={{
                  fontSize:"12px",
                  fontWeight:500,
                  color:"#5e616e"
                }}>(<span style={{
                  color:"green",
        
                }}>₹0</span> <span><s>₹{calTotalTravellerRefund.toLocaleString("en-IN")}</s>
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
        onClick={()=>handleAddCancelFee(items.price,calculateCancel)}
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
      ),
    },
    {
      key: "reschedule",
      label: "Rescheduling",
      children: (
        <div>
        
        {selectedFlights.map((items,idx)=>{
        const calculateReschedule = getRescheduleFee(items.price);
        const calTotalTravellerRefund = getTotalTraveller(items.price);
        const cal8HrsCancelTime = get8HrsCancelTime(items.departureTime)
        const ixigoRescheduleFee = getIxigoRescheduleFee() 
        return(
          <div style={{
          fontFamily:"Roboto"
        }}>
          
          <Text style={{fontWeight:500}}>*Rescheduling charges applicable (Airline fee + ixigo fee)</Text>
          {removeRescheduleAdd?(
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
                  ₹0 + fare difference
                </Text>
                <br/>
                <Text style={{
                  fontSize:"12px",
                  fontWeight:500,
                  color:"#5e616e"
                }}>(<span style={{
                  color:"green",
        
                }}>₹0</span> <span><s>₹{calTotalTravellerRefund.toLocaleString("en-IN")}</s>
                  </span> + ₹{ixigoRescheduleFee.toLocaleString("en-IN")})* </Text>
                </div>
                <div>
                <Text style={{
                  fontWeight:500,
              fontSize:"15px",
              textAlign:"center"
                }}>Non Changeable</Text>
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
              bottom:35}}>Non Changeable</Text>
              
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
          
          
          <Text style={{fontSize:"15px",fontWeight:500,
            position:"relative",
            right:7
          }}>Rescheduling fee is applicable for 1 traveller.</Text>
          <div style={{ fontFamily: "Roboto", position: "relative", right: 7 }}>
  
  <div
    style={{
      overflow: "hidden",
      maxHeight: openReTerm ? height1 : "0px",
      transition: "all 0.5s ease",
    }}
  >
    <div ref={contentRef1} style={{ paddingBottom: "10px" }}>
      <h3 style={{ marginBottom: "10px" }}>Terms & Conditions</h3>

      <ol style={{ lineHeight: "24px" }}>
        <Text
          type="secondary"
          style={{ fontSize: "15px", fontWeight: 500 }}
        >
          <li>Penalty charged by the airline is indicative only and may change without any prior notice. ixigo does not guarantee the accuracy of this information.</li>
          <li>Get one free change of date, sector and airline per passenger with ixigo Flex.</li>
          <li>Discount and Flex fee, if any, will be adjusted in the final refund amount.</li>
          <li>Reschedule request will be processed only within the mentioned time period.</li>
          <li>The difference in fares between the old and the new booking will also be payable by the user.</li>
        </Text>
      </ol>
    </div>
  </div>

  <Text
    onClick={() => setOpenReTerm(!openReTerm)}
    style={{
      color: "#2d79c7",
      cursor: "pointer",
      fontWeight: 500,
      marginBottom: "10px",
      fontSize: "16px",
      textDecoration: "underline",
    }}
  >
    {openReTerm ? "Hide Terms & Conditions" : "View Terms & Conditions"}
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
        {removeRescheduleAdd?(
          <div>
          <div  style={{
          height:"50px",
          background:"rgb(249, 242, 255)",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px",
          padding:10,
          display:"flex",
          justifyContent:"space-between",
          cursor:"pointer",
          
        }}
        
        >
          <div>
        <img src="https://images.ixigo.com/image/upload/icon/8934cfa8cec76c87ada8b3ecda4f0da1-awjph.png"
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
        }}>Free Cancellation + Rescheduling</Text>
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
          }} onClick={()=>setRemoveRescheduleAdd(false)}>
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
          height:"80px",
          background:"rgb(249, 242, 255)",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px",
          padding:10,
          display:"flex",
          justifyContent:"space-between",
          cursor:"pointer",
          // maxHeight: height,
          
        }}
        onClick={()=>handleAddRescheduleFee(items.price,calculateReschedule)}
        >
          <div >
        <img src="https://images.ixigo.com/image/upload/icon/8934cfa8cec76c87ada8b3ecda4f0da1-awjph.png"
        style={{
          height:25,
          position:"absolute",
          zIndex:10
        }}/>
        
        <br />
        <Text style={{
          fontWeight:500,
          fontSize:"17px",
          top:8,
          position:"relative"
        }}>Free Cancellation + Rescheduling</Text>
        <br />
        <span style={{
          top:6,
          position:"relative",
          color:"#505050ff",
          fontSize:"12px"
        }}>@</span> <Text style={{
          fontSize:"15px",fontWeight:700,
          position:"relative",top:8
        }}>
          ₹{calculateReschedule.toLocaleString("en-IN")}<Text style={{
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
      ),
    },
  ];

const [pageLoading, setPageLoading] = useState(true);




useEffect(() => {
  setPageLoading(true);

  const timer = setTimeout(() => setPageLoading(false), 1500);

  return () => clearTimeout(timer);
}, [toCity, fromCity, selectedDate,travellerValue]);







  // const progressCircle = useRef(null);
  // const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };
    return(
        <>
        {pageLoading ? (
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
    
    {/* LEFT FILTER SKELETON */}
    <div
      style={{
        width: "300px",
        background: "#fff",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        height: "600px"
      }}
    >
      <Skeleton active paragraph={{ rows: 16 }} />
    </div>

    {/* CENTER LIST SKELETON (multiple flight cards) */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "10px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            height: "60px",
            width:"75%"
          }}
        >
          <Skeleton active paragraph={{ rows: 1 }} />
        </div>
      ))}
    </div>


    

  </div>
    ):(
      <>
                 <div >
          
          
            <div style={{
            fontFamily:"Roboto"
          }}>
            <div style={{
              display:"flex",
              flexDirection:"row",
              width:"90%",
              position:"relative",
              left:"30px",
              
              // justifyContent: "space-around"
            }}>
              <div style={{
      
                            position: "sticky",
                            top: "10px",            
                            alignSelf: "flex-start",
                            height: "fit-content",
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
          borderBottom: "1px solid #ccccccff",
                    padding:"12px",
        }}>
                  <div style={{
                    height:"35px",
                    alignItems:"center",
                    
                  }}>
                    <div style={{
                      display:"flex",
                      flexDirection:"row",
                      justifyContent:"space-between",
                    }}>
                    <Text strong style={{
                      position:"relative",
                      fontSize:"17px",
                    fontFamily:"Roboto"
                    }}>Filters</Text>
                    {checkedList.length !== 0 || airlineCheckList.length !== 0 || startPrice !== startPrice || endPrice !== 51273
                    ?(<Text strong style={{
                      color:"#ff7a00",
                      cursor:"pointer"
                    }}
                    onClick={()=>{
                      setCheckedList([])
                      setAirlineCheckList([])
                      setStartPrice(startPrice);
                      setEndPrice(51273);
                    }}>Clear All</Text>)
                    :null}
                    </div>
                    
                  </div>
                  <div>
                    {(checkedList.length > 0 || airlineCheckList.length > 0 || startPrice !== startPrice || endPrice !== 51273) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {
                          FilterDetailShow.map((item, index) =>{
                            if (item.includes("₹") && startPrice === startPrice && endPrice === 51273) return null;
                            return(
                            <Tag
                              key={index}
                              color="blue"
                              style={{
                                border: "1px solid #1890ff",
                                background: "#f0f8ff",
                                borderRadius: "20px",
                                display: "flex",
                                alignItems: "center",
                                fontSize: "11px",
                                maxWidth: "150px",
                              }}
                              closable
                              closeIcon={
                                <CloseCircleFilled
                                  style={{
                                    fontSize: "11px",
                                    color: "#1890ff",
                                    background: "#f0f8ff",
                                    position: "relative",
                                    top: "1px",
                                  }}
                                />
                              }
                              onClose={() => {
                                // remove from both lists if it exists
                                setCheckedList((prev) => prev.filter((x) => x !== item));
                                setAirlineCheckList((prev) => prev.filter((x) => x !== item));

                                // reset price if the tag is a price range
                                if (item.includes("₹")) {
                                  setStartPrice(startPrice);
                                  setEndPrice(51273);
                                  
                                }
                                if(item.includes("₹") && startPrice === startPrice && endPrice === 51273){
                                    setStartPrice(startPrice);
                                  setEndPrice(51273);
                                  }
                              }}
                            >
                              {item}

                             
                            </Tag>
                        )})
                        }
                      </div>
                    )}
                  </div>
                  </div>
                  <div>
      

      {/* Recommended Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          width: "90%",
          padding: "12px",
        }}
      >
        <Text style={{ fontWeight: 550, fontSize: "17px",fontFamily:"Roboto" }}>
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
            style={{ transform: "scale(1.1)",border:"1px solid #848794",height:"17.5px",borderRadius:"5px" }}
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
          width: "90%",
          padding: "12px",
          marginTop: "-10px",
        }}
      >
        {plainOptions.map((option) =>
        
        (
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
              fontWeight:"500",
              fontFamily:"Roboto",
            }}>{option}</Text>
            <Checkbox
              checked={checkedList.includes(option)}
              onChange={(e) => {
                const newList = e.target.checked
                  ? [...checkedList, option]
                  : checkedList.filter((item) => item !== option);
                setCheckedList(newList);

                if (["Air India", "IndiGo"].includes(option)) {
      if (e.target.checked) {
        setAirlineCheckList((prev) => [...new Set([...prev, option])]);
      } else {
        setAirlineCheckList((prev) => prev.filter((a) => a !== option));
      }
    }
  
              }}
              style={{ transform: "scale(1.1)",border:"1px solid #848794",height:"17.5px",borderRadius:"5px" }}
            />
            
          </label>
        ))}
      </div>
      <div style={{
        padding:"12px"
      }}>
        <Text style={{
            fontSize:"17px",
            fontWeight:550,
            fontFamily:"Roboto"
        }}>
            Flight Price
        </Text>

         <Row>
      <Col span={24}>
       <ConfigProvider
    theme={{
      token: {
        dotSize:100,
        controlSize:100,
        dotActiveBorderColor:"blue",
        // Seed Token
        colorPrimary: '#0046beff',
        // borderRadius: 2,

        // // Alias Token
        // colorBgContainer: '#f6ffed',
      },
    }}
  >
        <Slider
          min={dateFareData[0]?.price || 0}
          max={51273}
          value={endPrice}
        onChange={(value) => setEndPrice(value)} 
        // tooltip={{ open: false }}
          
          style={{
            width:"90%"
          }}
        />
        </ConfigProvider>
      </Col>
      {/* <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col> */}
    </Row>
        <Row style={{
            display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          width: "95%",
          padding: "2px",
        }}>
            <Text style={{ color:"#4f4c4cff" }}>
              ₹{startPrice ? startPrice.toLocaleString("en-IN") : "0"}
            </Text>
            <Text style={{
                color:"#4f4c4cff"
            }}> ₹{endPrice.toLocaleString("en-IN")} </Text>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          width: "90%",
          padding: "12px",
        }}
      >
        <Text style={{ fontWeight: 550, fontSize: "17px",fontFamily:"Roboto" }}>
          Airlines
        </Text>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Text style={{ fontSize: 12 }}>All</Text>
          <Checkbox
            indeterminate={
              airlineCheckList.length > 0 && airlineCheckList.length < airlinePlainOptions.length
            }
            onChange={(e) =>{
              
              setAirlineCheckList(e.target.checked ? [...airlinePlainOptions.map(item=>item.name)] : [])
            }}
            checked={airlineCheckList.length === airlinePlainOptions.length}
            style={{ transform: "scale(1.1)",border:"1px solid #848794",height:"17.5px",borderRadius:"5px" }}
          />
        </div>
        
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
          width: "90%",
          padding: "12px",
          marginTop: "-10px",
        }}
      >
        {airlinePlainOptions.map((option) => 
         (
            <label
              key={option.name}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                cursor: "pointer",
                fontFamily: "Roboto",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              <div>
                <img
                  style={{
                    height: 25,
                    width: 30,
                    position: "relative",
                    top: "8px",
                  }}
                  src={option.image}
                  alt={option.name}
                />
                <Text
                  style={{
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    position: "relative",
                    left: "5px",
                  }}
                >
                  {option.name} 
                  {/* ({filteredFlights.filter(f => f.airline === option.name).length}) */}
                </Text>
              </div>

              <div>
                <Checkbox
                  checked={airlineCheckList.includes(option.name)}
                  onChange={(e) => {
                    const newList = e.target.checked
                      ? [...airlineCheckList, option.name]
                      : airlineCheckList.filter((item) => item !== option.name);
                    setAirlineCheckList(newList);

                    if (["Air India", "IndiGo"].includes(option.name)) {
                      if (e.target.checked) {
                        setCheckedList((prev) => [...new Set([...prev, option.name])]);
                      } else {
                        setCheckedList((prev) => prev.filter((a) => a !== option.name));
                      }
                    }
                  }}
                  style={{ transform: "scale(1.1)",border:"1px solid #848794",height:"17.5px",borderRadius:"5px" }}
                />
              </div>
            </label>
          )
        )}

      </div>
    </div>


     
                  </div>
              </div>
            </div>
              <div style={{
                width: "65%",
                position:"relative",
                left:"30px",
                paddingBottom:"30px"
              }}  >
                <Swiper
        slidesPerView={3}
        spaceBetween={30}
        // centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}

        breakpoints={{
          0: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{
          transition: "all 0.3s ease",
        }}
        
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="offer-swiper"
      //   style={{  
      // paddingBottom: "40px"
      //   }}  
      >
        {cardOfferData.map((card) => (
          <SwiperSlide key={card.id}>
            <Card 
            style={{
              height: "53px"
            }}
            // hoverable
            cover={
                <img
                src={card.image}
                style={{
                  borderRadius:"8px",
                  marginTop:"0.5px"
                }}
                />
            }
            >
              
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div
      style={{
        background: "#f7f8fa",
        borderRadius: "10px",
        // padding: "10px 0",
        width: "100%",
        // margin: "auto",
        height:"50px"
      }}
    >
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dateswiper"
      >
        {dateFareData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => {
                setSelectedDate(item.label);
                // console.log(item.date)

  const d = new Date(item.date);
const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
  d.getDate()
).padStart(2, "0")}`;


  dispatch(setDeparture(formattedDate));
  
              }
              }
              style={{
                background: "#fff",
                borderRadius: "6px",
                border:
                  selectedDate === item.label
                    ? "1px solid #0066ff"
                    : "1px solid #e0e0e0",
                color: selectedDate === item.label ? "#0066ff" : "#000",
                textAlign: "center",
                padding: "8px 0",
                cursor: "pointer",
                height: selectedDate === item.label? "35.8px":"35px",
                transition: "0.2s ease",
              }}
              
            >
              <div style={{ fontSize: "14px", fontWeight: 500 }}>
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginTop: "4px",
                }}
              >
                ₹{item.price.toLocaleString("en-IN")}
              </div>
              {selectedDate === item.label && (
                <div
                  style={{
                    height: "3px",
                    backgroundColor: "#0066ff",
                    borderRadius: "3px",
                    marginTop: "5px",
                    width: "60%",
                    margin: "auto",
                  }}
                ></div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div style={{
      textAlign:"right",
      marginTop:"10px"
    }}>
      <Text strong type="secondary">
        {filteredFlights.length === 1? 
        `${filteredFlights.length} Flight Available`:
        `${filteredFlights.length} Flights Available`}
        </Text>
      </div>
    <div style={{ width: "100%", }}>
      {filteredFlights.map((item, index) =>{
      
        return(
        <div key={item.id}>
          {/* Flight Card */}
          <Card
            hoverable
            style={{
              width: "100%",
              marginTop: 20,
              borderRadius: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display:"flex",
              flexDirection:"column",
              fontFamily:"Roboto",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "scale(1.01)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={()=>
              showLoading(item)
            }
          >
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "15px",
                display: "flex",
                gap: "8px",
                zIndex: 1, // ensures it stays above
              }}
            >
              {item.tags?.map((tag, idx) => {
                if (tag === "Free Meal") {
                  return (
                   
                      
                      <img key={idx} style={{
                        width:"85px",
                        height:"20px"
                      }} src="https://images.ixigo.com/image/upload/b33f8ceebd2c632debc8d5bc4c5c00e6-cfqvx.png"></img>
                    
                  );
                }
                if (tag === "Earliest") {
                return (<Tag
                  key={idx}
            color="blue"
            style={{
              background: "#fcfcfcff",
              borderRadius: "20px",
              border: "1px solid #1890ff",
              fontSize: "12px",
              fontWeight: 500,
              
            }}
          >
            <ClockCircleOutlined  color="blue"/> {tag}
                </Tag>)
                }
                return(
                <Tag
                key={idx}
            color="blue"
            style={{
              background: "#fcfcfcff",
              borderRadius: "20px",
              border: "1px solid #1890ff",
              fontSize: "12px",
              fontWeight: 500,}}
              >
                {tag}
                </Tag>
                )
              })}
            </div>
            
           <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    
  }}
>
  <div style={{
    display:"flex",
    flexDirection:"row",
    width:"60%"
  }}>
  {/* Airline Info */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      flex: 1,
      minWidth: "20%",
    }}
  >
    <img src={item.logo} alt={item.airline} style={{ height: 35 }} />
    <div>
      <Text
        strong
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block",
          maxWidth: "110px",
          fontSize: "17px",
          position: "relative",
          // bottom: "5px",
        }}
      >
        {item.airline}
      </Text>
      <br />
      <Text
        type="secondary"
        strong
        style={{
          position: "relative",
          bottom: "2px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block",
          maxWidth: "110px",
        }}
      >
        {item.stops === "1 stop"
  ? `${item.flightCodes[0].code} , ${item.flightCodes[1].code}`
  : item.flightCodes}
          {/* {item.flightCodes[0].code} */}
                  

      </Text>
    </div>
  </div>

  {/* Flight From Timings */}
  <div style={{ textAlign: "center", flex: 1,position:"relative",left:"10px" }}>
    <Text  style={{ fontSize: 20,fontWeight:700 }}>
      {item.departureTime}
    </Text>
    <br />
    <Text strong style={{ fontSize: 16,position:"relative",bottom:"5px" }} type="secondary">
      {item.fromCode}
    </Text>
  </div>

  {/* Duration & Stops */}
  <div style={{ textAlign: "center", flex: 1 }}>
    <Text strong type="secondary">{item.durations}</Text>
    <br />
    <div style={{
      borderBottom: "1px solid #ccccccff",
      width:"70%",
      display:"flex",
      justifyContent:"center",
      position:"relative",
      left:"20px",
      top:"5px"
    }}>

    </div>
    <Text strong type="secondary" style={{
      position:"relative",
      top:"5px"
    }}>{item.stops}</Text>
  </div>

  
  {/* Flight To Timings */}
  <div style={{ textAlign: "center", flex: 1 }}>
    <Text  style={{ fontSize: 20,fontWeight:700 }}>
      {item.arrivalTime}
      <Text>
      {item.nextDayArrival && <sup style={{ 
        color: "red",
        fontWeight:500,
        position:"relative",
        bottom:5
       }}>+1</sup>}
      </Text>
    </Text>
    <br />
    <Text strong style={{ fontSize: 16,position:"relative",bottom:"5px" }} type="secondary">
      {item.toCode}
    </Text>
  </div>
</div>
  
  {/* Price and Offer */}
  <div style={{ textAlign: "right", flex: 1,fontFamily:"Roboto",position:"relative",right:"5px",bottom:"10px" }}>
    <Text style={{ fontSize: 18,fontWeight:700 }}>
      ₹{item.price.toLocaleString("en-IN")}
    </Text>
    <br />
    {item.discount > 0 && (
      <Text strong style={{ color: "green",fontWeight:500 }}>Extra ₹{item.discount} Off</Text>
    )}
  </div>

  {/* Price & Book */}
  <div style={{ textAlign: "right", flex: 1 }}>
    
    <button
      type="primary"
      style={{
        background: "#ff7a00",
        border: "none",
        borderRadius: 10,
        width:"185px",
        height:"40px",
        fontSize:"17px",
        color:"white"

      }}
      onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate("/ReviewTravellerDetails");
    dispatch(setCancelFeeAdd(removeFeeAdd))
    dispatch(setRescheduleFeeAdd(removeRescheduleAdd))
    dispatch(setOnewaySelectedFlight([item]))
      }}
    >
      Book
    </button>
    <br/>
    <Text strong style={{
      color:"#ff7a00",
      position:"relative",
      top:"10px"
    }}>Flight Details<RightOutlined style={{
      fontSize:14,
      color:"#ff7a00",
      position:"relative",
      top:".5px"
    }}/></Text>
  </div>
</div>

          </Card>

          {/* Offer Banner after every 3 cards */}
          {(index + 1) % 3 === 0 && (
  <div
    style={{
      width: "100%",
      marginTop: 20,
      display: "flex",
      justifyContent: "center",
    }}
  >
    {(() => {
      const offerIndex = Math.floor(index / 3) % offerImage.length;
      const offer = offerImage[offerIndex];
      return offer ? (
        <img
          src={offer.image}
          alt={`Offer ${offer.id}`}
          style={{
            width: "100%",
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      ) : null;
    })()}
  </div>
)}
        </div>
       );
       })}
    </div>
      
              </div>

              
             
            </div>
          </div>
        </div>
        <div>
          <Drawer
             title={null}
            closable={false}
            destroyOnHidden
            placement="right"
            open={openDrawer}
            loading={loadingDrawer}
            onClose={() => setOpenDrawer(false)}
            maskClosable={true}  
             width={"60%"}
            style={{
          // padding: "24px",
          background: "#fff",
          // borderRadius: "8px 0 0 8px",
          overflow: "auto",
        }}>
          <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <Tabs
          activeKey={!openDrawer?"details":activeTab}
          onChange={(key) => setActiveTab(key)}
          items={items.map(({ key, label }) => ({ key, label: (
      <span
        style={{
          fontFamily: "Roboto",
          fontSize: "16px",
          fontWeight: 500,
          color: activeTab === key ? "#1677ff" : "#000",
          
        }}
      >
        {label}
      </span>) }))}
          style={{ flex: 1,fontFamily:"Roboto", }}
          tabBarStyle={{
            marginBottom: 0,
            
          }}
        />
        <CloseOutlined
          onClick={()=>setOpenDrawer(false)}
          style={{
            fontSize: 16,
            cursor: "pointer",
            marginLeft: 8,
            color: "#b1b1b1ff",
          }}
        />
      </div>
       <div style={{ padding: "20px",overflowY:"hidden" }}>
        {items.find((t) => t.key === activeTab)?.children}
        <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "60%",
              height:"7%",
              zIndex: 1000,
              background: "#fff",
              padding: "10px 20px",
              left:"40%",
              boxShadow: "0 5px 25px rgba(0, 0, 0, 0.3)",
              display:"flex",
              justifyContent:"space-between"
            }}
          >
            <div >
              {selectedFlights.map((item,idx)=>(
                <div style={{
              display:"flex",
              flexDirection:"column",
              position:"relative",
              bottom:"10px"
            }}>
                  <Text style={{ fontSize: 28, fontWeight: 500 }}>
  ₹
                    {Number(
                        removeFeeAdd || removeRescheduleAdd 
                        ? finalAmount 
                        : item.price
                      ).toLocaleString("en-IN")
                    }
                  </Text>

            {item.discount > 0 && (
              <Text strong style={{ color: "#238C46",fontWeight:"bold",position:"relative",
                bottom:"8px",fontSize:"14px"
               }}>Extra ₹{item.discount} Off</Text>
            )}
                </div>
              ))}
            
            
            </div>
            <div style={{
              padding:"7px 15px"
            }}>
              <button
                type="primary"
                style={{
                  background: "#ff7a00",
                  border: "none",
                  borderRadius: 10,
                  width:"140px",
                  height:"40px",
                  fontSize:"17px",
                  color:"white",
                  position:"relative",
                  right:"40px"

                }}
                onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate("/ReviewTravellerDetails");
              dispatch(setOnewaySelectedFlight(selectedFlights))
              console.log("selecteddddddddd",selectedFlights)
                }}
              >
                Book
              </button>
            </div>
          </div>

      </div>

            </Drawer>
        </div>
      </>
    )
  }

        
      
        </>
    )
}

export default Economy ;


// const airlineCount = filteredFlights.filter(f => f.airline === option.name).length;

          // return airlineCount > 0 && 


          // const filterCount = filteredFlights.filter((f) => {
        //       if (option === "Free meal available") {
        //         return f.tags.includes("Free Meal");
        //       }
        //       if (option === "Non-Stop") {
        //         return f.stops === "Non-stop";
        //       }
        //       if (option === f.airline) {
        //         return true;
        //       }
        //       return false;
        //     });


        // return filterCount.length > 0 && 