import React,{useState,useEffect,useRef,useMemo} from "react";
import FlightListSearchCard from "./FlightListSearchCard";
import Link,{useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RightOutlined,CloseOutlined, CloseCircleFilled,ClockCircleOutlined,ArrowRightOutlined,AppstoreOutlined,CheckOutlined  } from "@ant-design/icons";
import { Typography,Card,Checkbox,Col, InputNumber, Row, Slider, Space,ConfigProvider,Button, Tag, Drawer,Tabs,Badge,Avatar, Tooltip,FloatButton,Segmented } from "antd";
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
import CancellationDetails from "../../Component/CancellationDetails";


dayjs.extend(duration);





 const { Text } = Typography;
const plainOptions=["Non-Stop","Free meal available","Air India", "IndiGo"]

const airlinePlainOptions=[
    {name:"Air India",image:"https://images.ixigo.com/img/common-resources/airline-new/AI.png"}, 
    {name:"IndiGo",image:"https://images.ixigo.com/img/common-resources/airline-new/6E.png"},
    {name:"Air-India Express",image:"https://images.ixigo.com/img/common-resources/airline-new/IX.png"},
    {name:"SpiceJet",image:"https://images.ixigo.com/img/common-resources/airline-new/SG.png"},
    {name:"Alliance Air",image:"https://images.ixigo.com/img/common-resources/airline-new/9I.png"}
]

const EconomyReturn = () =>{
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
      } = useSelector((state) => state.flightSearch);
      
      const navigate = useNavigate();

      


      const depart = dayjs(departure).format("YYYY-MM-DD");
      const returnpart = dayjs(returnDate).add(1,"day").format("YYYY-MM-DD");
        const [selectedDate, setSelectedDate] = useState(depart);
        const [selectedReturnDate, setSelectedReturnDate] = useState(returnpart)

        useEffect(() => {
                const minReturnDate = dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD");

                
                if (dayjs(selectedReturnDate).isBefore(minReturnDate)) {
                  setSelectedReturnDate(minReturnDate);
                  dispatch(setReturnDate(minReturnDate));
                }
              }, [selectedDate]);

              console.log()

      
        console.log("ABCD",returnDate)
        // console.log(fromA)
        const [dateFareData, setDateFareData] = useState([]);
        const [dateFareData1, setDateFareData1] = useState([]);
      
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
    const dep = new Date(departure);

    const todayMatch = dateFareData.find((d) => {
      const dt = new Date(d.date);
      return (
        dt.getDate() === dep.getDate() &&
        dt.getMonth() === dep.getMonth() &&
        dt.getFullYear() === dep.getFullYear()
      );
    });

    

    
    setSelectedDate(todayMatch ? todayMatch.date : dateFareData[0].date);
    const finalPrice = todayMatch ? todayMatch.price : dateFareData[0].price;
    setStartPrice(finalPrice);

   
    
  }
}, [dateFareData, departure]);


//Return Date start

// Format label
const formattedDate = (date) => {
  const d = dayjs(date);
  return `${d.format("ddd")} ${d.format("DD")} ${d.format("MMM")}`;
};

// Generate return date array
useEffect(() => {
  if (!selectedDate) return;

  const base = dayjs(selectedDate).toDate();
  base.setDate(base.getDate() + 1);

  const daysArray = Array.from({ length: 18 }, (_, i) => {
    const date = new Date(base);
    date.setDate(base.getDate() + i);

    const randomPrice = Math.floor(Math.random() * (3500 - 2500 + 1)) + 2500;

    return {
      date: date.toISOString(),        // STORED REAL DATE
      label: formattedDate(date),      // DISPLAY LABEL
      price: randomPrice,
    };
  });

  setDateFareData1(daysArray);
}, [selectedDate]);

// Select correct return date
useEffect(() => {
  if (dateFareData1.length > 0 && returnDate) {
    const match = dateFareData1.find(
      d => dayjs(d.date).isSame(returnDate, "day")
    );


    setSelectedReturnDate(match ? match.date : dateFareData1[0].date);


  }
}, [dateFareData1, returnDate]);

// const today3 = new Date()
//       const date = new Date(dayjs(selectedDate));
//       const check = date.setDate(date.getDate() +1);  
//       const formattedDate1 = date.toLocaleDateString("en-GB", {
//             weekday: "short",
//             day: "2-digit",
//             month: "short",
//           }); 
//       console.log("helooooo",selectedReturnDate) 

console.log("collapse",dateFareData[0]?.date)

const [startReturnPrice,setStartReturnPrice] = useState(dateFareData1[0]?.price)
const [endReturnPrice,setEndReturnPrice] = useState(51275)

useEffect(() => {
  if (dateFareData1.length > 0 && returnDate) {
    const ret = new Date(returnDate);

    const tomorrowMatch = dateFareData1.find((d) => {
      const dt = new Date(d.date);
      return (
        dt.getDate() === ret.getDate() &&
        dt.getMonth() === ret.getMonth() &&
        dt.getFullYear() === ret.getFullYear()
      );
    });

    

    
    setSelectedReturnDate(tomorrowMatch ? tomorrowMatch.date : dateFareData1[0].date);
    const finalPrice = tomorrowMatch ? tomorrowMatch.price : dateFareData1[0].price;
    setStartReturnPrice(finalPrice);
  }
}, [dateFareData1,returnDate]);




      
      
      // console.log(selectedDate)
       const endingprice = 57432;
      
        const [checkedList, setCheckedList] = useState([]);
      
        const [airlineCheckList,setAirlineCheckList] = useState([])
      
        // const [inputValue, setInputValue] = useState(51273);
        
        // console.log(airlineCheckList)
        
      
      //   useEffect(() => {
      //   if (dateFareData.length > 0) {
      //     setStartPrice(dateFareData[0].price);
      //   }
      // }, [dateFareData]);

      const [flights, setFlights] = useState([]);
      const [flightsReturn, setFlightsReturn] = useState([]);
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
      const ret = formatDate(selectedReturnDate)
     

      
      
      const [currentTime,setCurrentTime] = useState(time)


      const [value, setValue] = useState(`${fromCode} - ${toCode}`);

      useEffect(()=>{
        if(value){
          setValue(`${fromCode} - ${toCode}`)
        }
      },[fromCode,toCode])
      

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
          departureTime: "06:30",
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
          airline: "Alliance Air",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/9I.png",
          flightCodes: ["6E532"],
          fromCode: "MAA",
          toCode: "HYD",
          departureTime: "10:25",
          arrivalTime: "12:10",
          durations: "1h 45m",
          stops: "Non-stop",
          nextDayArrival: false,
          price: 5320,
          discount: 140,
          tags: ["Free Meal"],
          fromTerminal:3,
          toTerminal:2,
        },
        {
          id: 10,
          airline: "Alliance Air",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/9I.png",
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
      ]);
      }, [dateFareData]);

      useEffect(() => {
      
        if (dateFareData1.length === 0) return;
        setFlightsReturn ([
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
          fromCode: "DEL",
          toCode: "MAA",
          departureTime: "17:45",
          arrivalTime: "23:45",
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
          fromCode: "DEL",
          toCode: "MAA",
          departureTime: "06:30",
          arrivalTime: "09:10",
          durations: "2h 40m",
          stops: "Non-stop",
          nextDayArrival: false,
          price: dateFareData1[0].price,
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
          fromCode: "DEL",
          toCode: "MAA",
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
          fromCode: "DEL",
          toCode: "MAA",
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
          airline: "Alliance Air",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/9I.png",
          flightCodes: ["UK820"],
          fromCode: "DEL",
          toCode: "MAA",
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
          id: 6,
          airline: "Air-India Express",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/IX.png",
          flightCodes: ["I5142"],
          fromCode: "DEL",
          toCode: "MAA",
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
        id: 7,
          airline: "SpiceJet",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/SG.png",
          flightCodes: ["SG101"],
          fromCode: "DEL",
          toCode: "MAA",
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
          id: 8,
          airline: "IndiGo",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/6E.png",
          flightCodes: ["6E532"],
          fromCode: "DEL",
          toCode: "MAA",
          departureTime: "06:30",
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
          id: 9,
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
          id: 10,
          airline: "Alliance Air",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/9I.png",
          flightCodes: ["6E532"],
          fromCode: "HYD",
          toCode: "MAA",
          departureTime: "10:25",
          arrivalTime: "12:10",
          durations: "1h 45m",
          stops: "Non-stop",
          nextDayArrival: false,
          price: 5320,
          discount: 140,
          tags: ["Free Meal"],
          fromTerminal:3,
          toTerminal:2,
        },
        {
        id: 11,
          airline: "SpiceJet",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/SG.png",
          flightCodes: ["SG101"],
          fromCode: "HYD",
          toCode: "MAA",
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
          id: 12,
          airline: "Alliance Air",
          logo: "https://images.ixigo.com/img/common-resources/airline-new/9I.png",
          flightCodes: ["UK820"],
          fromCode: "HYD",
          toCode: "MAA",
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
      ]);
      }, [dateFareData1]);

      

      const FilterDetailShow = [
                                  // remove duplicates between both filter lists
                                  ...new Set([...checkedList, ...airlineCheckList]),
      
                                  // show price range only if changed
                                  ...(startPrice !== 0 || endPrice !== 51273 ? [`₹${startPrice} - ₹${endPrice}`] : []),

                                  
                                ]
      const FilterDetailShow1 = [
                                  ...(startReturnPrice !== 0 || endReturnPrice !== 51275 ? [`₹${startReturnPrice} - ₹${endReturnPrice}`] : []),
                                ]
      
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
          const airlineFilters = ["Air India", "IndiGo","Air-India Express", "SpiceJet","Alliance Air"];
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
            FilterDetailShow.includes(flight.airline)
          ) {
            return true;
          }
      
          return true; 
        });
      }, [flights, checkedList, airlineCheckList, startPrice, endPrice,fromCode,toCode]);

      //Return logic
       const filteredFlightsReturn = useMemo(() => {
        return flightsReturn.filter((flight) => {
          //  Airline Filter
          if (
            airlineCheckList.length > 0 &&
            !airlineCheckList.includes(flight.airline)
          ) {
            return false;
          }
          if(fromCode.length > 0 && !fromCode.includes(flight.toCode)){
            return false;
          }
          if(toCode.length > 0 && !toCode.includes(flight.fromCode)){
            return false;
          }
          //  Price Range Filter
          if (flight.price < startReturnPrice || flight.price > endReturnPrice) {
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
          const airlineFilters = ["Air India", "IndiGo","Air-India Express", "SpiceJet","Alliance Air"];
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
            FilterDetailShow.includes(flight.airline)
          ) {
            return true;
          }
      
          return true; 
        });
      }, [flights, checkedList, airlineCheckList, startReturnPrice, endReturnPrice,fromCode,toCode]);

      const [selectedFlightId, setSelectedFlightId] = useState(null);
      const [selectedFlightReturnId, setSelectedFlightReturnId] = useState(null);
      

      const [openDrawer, setOpenDrawer] = useState(false);
        const [loadingDrawer, setLoadingDrawer] = useState(true);
        
        const [selectedOnwards,setSelectedOnwards] = useState([])
        const [selectedReturn,setSelectedReturn] = useState([]);

        const showOnwards = (item) =>{
          setSelectedFlightId(item.id)
          setSelectedOnwards([item])
          dispatch(setOnewaySelectedFlight([item]))
        }

        const showReturn = (item) =>{
          setSelectedFlightReturnId(item.id)
          setSelectedReturn([item])
          dispatch(setReturnSelectedFlight([item]))
        }

        useEffect(() => {
        if (filteredFlights.length > 0) {
          setSelectedFlightId(filteredFlights[0].id);
          setSelectedOnwards([filteredFlights[0]]);
          dispatch(setOnewaySelectedFlight([filteredFlights[0]]))
        }
         if (filteredFlightsReturn.length > 0) {
          setSelectedFlightReturnId(filteredFlightsReturn[0].id);
          setSelectedReturn([filteredFlightsReturn[0]]);
          dispatch(setReturnSelectedFlight([filteredFlightsReturn[0]])) 
        }
      }, [filteredFlights,filteredFlightsReturn]);

      const [fullAmount,setFullAmount] = useState(0)
      const [fullDiscount,setFullDiscount] = useState(0)

      const CalculateFullAmount = () =>{
        const a = selectedOnwards[0]?.price;
        const b = selectedReturn[0]?.price;
        setFullAmount(a+b)
      }

      const CalculateFullDiscount = () =>{
        const a = selectedOnwards[0]?.discount;
        const b = selectedReturn[0]?.discount;
        setFullDiscount(a+b)
      }

      useEffect(() => {
        CalculateFullAmount();
        CalculateFullDiscount();
      }, [selectedOnwards, selectedReturn]);





        const showLoading = () => {
          setLoadingDrawer(true);
          // setselectedOnwards([item]);
          setOpenDrawer(true);
          
          setTimeout(() => setLoadingDrawer(false), 700);
        };

        const [activeTab, setActiveTab] = useState("details");
        
          useEffect(() => {
          if (!openDrawer) {
            setActiveTab("details");
          }
        }, [openDrawer]);
        
          console.log("selectefddd",selectedOnwards)
        
          const [open, setOpen] = useState(false);
           const [openReTerm, setOpenReTerm] = useState(false);
          const contentRef = useRef(null);
          const contentRef1 = useRef(null);
          const [height, setHeight] = useState("0px");
          const [height1, setHeight1] = useState("0px");
        
          useEffect(() => {
          if (!contentRef.current) return;
        
          setHeight(`${contentRef.current.scrollHeight}px`);
        }, [open,selectedOnwards]);
        
          useEffect(() => {
          if (!contentRef1.current) return;
        
          setHeight1(`${contentRef1.current.scrollHeight}px`);
        }, [openReTerm,selectedOnwards]);


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
            if (!selectedOnwards[0]?.departureTime) return;
          
            const { finalTime, days } = get8HrsCancelTime(selectedOnwards[0]?.departureTime);
          
            const newDate = dayjs(departure).add(days, "day").format("YYYY-MM-DD");
            setLessDay(newDate);
          
          }, [selectedOnwards[0]?.departureTime]);

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
            if (!selectedReturn[0]?.departureTime) return;
          
            const { finalTime, days } = get8HrsCancelReturnTime(selectedReturn[0]?.departureTime);
          
            const newDate = dayjs(returnDate).add(days, "day").format("YYYY-MM-DD");
            setLessReturnDay(newDate);
          
          }, [selectedReturn[0]?.departureTime]);
          
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
        
        
        const [finalAmount,setFinalAmount] =useState()
        const [removeFeeAdd,setRemoveFeeAdd] = useState(false);
        const [removeRescheduleAdd,setRemoveRescheduleAdd] = useState(false);
        
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
        
        useEffect(() => {
          if (!selectedOnwards || selectedOnwards.length === 0) return;
        
          const price = selectedOnwards[0]?.price || 0;
          const cancelFee = getIxigoCancelFee(selectedOnwards[0]?.price);
          const rescheduleFee = getIxigoRescheduleFee(selectedOnwards[0]?.price);
        
          if (removeFeeAdd) {
            handleAddCancelFee(cancelFee);
          } else if (removeRescheduleAdd) {
            handleAddRescheduleFee(rescheduleFee);
          } else {
            setFinalAmount(price);
          }
        }, [selectedOnwards]);

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
        console.log("toooCity",toCity)
        const items = [
            {
              key: "details",
              label: "Flight Details",
              children: (
                <div style={{
                  fontFamily:"Roboto"
                }}>
                  <div style={{
                    borderBottom: "1px solid #ccccccff",
                    paddingBottom:30
                  }}>
                   <OnewayFlightDetails/>
                  </div>

                    <div style={{
                      marginTop:20
                    }}>
                      <ReturnFlightDetails/>
                    </div>
                  
          
                 
                </div>
              ),
            },
            {
              key: "cancellation",
              label: "Cancellation",
              children: (
                <div>
                
                {selectedOnwards.map((items,idx)=>{
                const calculateCancel = getCancelFee(items.price);
                const calTotalTravellerRefund = getTotalTraveller(items.price);
                const calTotalTravellerOnwardsRefund = getTotalOnwardsTraveller(items.price);
                const calTotalTravellerReturnRefund = getTotalReturnTraveller(selectedReturn[0].price);
                const cal8HrsCancelTime = get8HrsCancelTime(items.departureTime)
                const cal8HrsCancelReturnTime = get8HrsCancelReturnTime(selectedReturn[0].departureTime)
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
                    }}>{ret.day} {ret.month}, {selectedReturn[0].departureTime}</Text>
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
                    }}>{ret.day} {ret.month}, {selectedReturn[0].departureTime}</Text>
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
              ),
            },
            {
              key: "reschedule",
              label: "Rescheduling",
              children: (
                <div>
                
                {selectedOnwards.map((items,idx)=>{
                const calculateReschedule = getRescheduleFee(items.price);
                const calTotalTravellerRefund = getTotalTraveller();
                const calTotalTravellerOnwardsRefund = getTotalOnwardsTraveller(items.price);
                const calTotalTravellerReturnRefund = getTotalReturnTraveller(selectedReturn[0].price);
                const cal8HrsCancelTime = get8HrsCancelTime(items.departureTime)
                const cal8HrsCancelReturnTime = get8HrsCancelReturnTime(selectedReturn[0].departureTime)
                const ixigoRescheduleFee = getIxigoRescheduleFee() 
                console.log("Reschudle",calculateReschedule)
                return(
                  <div style={{
                  fontFamily:"Roboto"
                }}>
                  
                  <Text style={{fontWeight:500}}>*Rescheduling charges applicable (Airline fee + ixigo fee)</Text>
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
                
                        }}>₹0</span> <span><s>₹{calTotalTravellerOnwardsRefund.toLocaleString("en-IN")}</s>
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
                    </div>
                  ):(
                    <div>
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
                
                        }}>₹0</span> <span><s>₹{calTotalTravellerReturnRefund.toLocaleString("en-IN")}</s>
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
                    }}>{ret.day} {ret.month}, {selectedReturn[0].departureTime}</Text>
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
                    }}>{ret.day} {ret.month}, {selectedReturn[0].departureTime}</Text>
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
                onClick={()=>handleAddRescheduleFee(calculateReschedule)}
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
        

        
        
        



      

    return(
        <>
        <div>
          <div style={{
                        display:"flex",
                        flexDirection:"row",
                        width:"90%",
                        position:"relative",
                        left:"20px",
                        
                        // justifyContent: "space-around"
                      }}>
                        <div style={{
      
                            position: "sticky",
                            top: "100px",            
                            alignSelf: "flex-start",
                            height: "fit-content",
                            transition:"all 0.3 ease"
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
                              {checkedList.length !== 0 || airlineCheckList.length !== 0 || startPrice !== startPrice || endPrice !== 51273 || startReturnPrice !== startReturnPrice || endReturnPrice !== 51275
                                                  ?(<Text strong style={{
                                                    color:"#ff7a00",
                                                    cursor:"pointer"
                                                  }}
                                                  onClick={()=>{
                                                    setCheckedList([])
                                                    setAirlineCheckList([])
                                                    setStartPrice(startPrice);
                                                    setEndPrice(51273);
                                                    setStartReturnPrice(startReturnPrice);
                                                    setEndReturnPrice(51275);
                                                    
                                                  }}>Clear All</Text>)
                                                  :null}
                                                  </div>
                                                  
                                                </div>
                                                <div style={{
                                                  
                                                  flex:1,
                                                  flexDirection:"row"
                                                }}>
                                                  {(checkedList.length > 0 || airlineCheckList.length > 0 || startPrice !== startPrice || endPrice !== 51273) && (
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                                      {
                                                        FilterDetailShow.map((item, index) =>{
                                                          if (
                                                                item.includes("₹") &&
                                                                startPrice === startPrice &&
                                                                endPrice === 51273 
                                                              )
                                                                return null;

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
                                                              if (startPrice) {
                                                                setStartPrice(startPrice);
                                                                setEndPrice(51273);
                                                                
                                                                
                                                              }
                                                              if(startPrice === startPrice && endPrice !== 51273){
                                                                  setStartPrice(startPrice);
                                                                setEndPrice(51273);
                                                                
                                                                }
                                                                
                                                                
                                                            }}
                                                          >
                                                            {item}
                              
                                                           
                                                          </Tag>
                                                      )})
                                                      }
                                                    </div>)} {( startReturnPrice !== startReturnPrice || endReturnPrice !== 51275) && (
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px",marginTop:5 }}>
                                                      {
                                                        FilterDetailShow1.map((item, index) =>{
                                                          if (
                                                                item.includes("₹") &&
                                                                startReturnPrice === startReturnPrice &&
                                                                endPrice === 51275
                                                              )
                                                                return null;

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
                                                              
                              
                                                              // reset price if the tag is a price range
                                                              if (item.includes("₹")) {
                                                                setStartReturnPrice(startReturnPrice);
                                                                setEndReturnPrice(51275);
                                                                
                                                                
                                                              }
                                                              if(item.includes("₹") && startReturnPrice === startReturnPrice && endReturnPrice !== 51275){
                                                                  setStartReturnPrice(startReturnPrice);
                                                                setEndReturnPrice(51275);
                                                                
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
                <div style={{
                  borderBottom: "1px solid #ccccccff", 
                }}>
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
                      style={{ transform: "scale(1.1)",border:"1px solid #848794",height:"17.5px",borderRadius:"5px",transformBox:"fill-box" }}
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
                <div style={{
                  display:"flex",
                  justifyContent:"center",
                  padding:10
                }}>
                  <Segmented
                  size="large"
                    value={value}
                    onChange={setValue}
                    options={[`${fromCode} - ${toCode}`,`${toCode} - ${fromCode}`]}
                    style={{
                      background: "#f1f1f1",
                      padding: "4px",
                      borderRadius: "15px",
                      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                      fontWeight:500,
                      border:"1px solid #f1f1f1",
                      textAlign:"center",
                      display:"flex",
                      justifyContent:"center"
                    }}
                  />
                </div>
              </div>
              
              </div>
              {value === `${fromCode} - ${toCode}` ? (
                            <div style={{ padding: "12px" }}>
                              <Text
                                style={{
                                  fontSize: "17px",
                                  fontWeight: 550,
                                  fontFamily: "Roboto",
                                }}
                              >
                                Flight Price
                              </Text>

                              <Row>
                                <Col span={24}>
                                  <ConfigProvider
                                    theme={{
                                      token: {
                                        dotSize: 100,
                                        controlSize: 100,
                                        dotActiveBorderColor: "blue",
                                        colorPrimary: "#0046beff",
                                      },
                                    }}
                                  >
                                    <Slider
                                      min={dateFareData[0]?.price || 0}
                                      max={51273}
                                      value={endPrice}
                                      onChange={(value) => setEndPrice(value)}
                                      style={{ width: "90%" }}
                                    />
                                  </ConfigProvider>
                                </Col>
                              </Row>

                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: 8,
                                  width: "95%",
                                  padding: "2px",
                                }}
                              >
                                <Text style={{ color: "#4f4c4cff" }}>
                                  ₹{startPrice ? startPrice.toLocaleString("en-IN") : "0"}
                                </Text>

                                <Text style={{ color: "#4f4c4cff" }}>
                                  ₹{endPrice.toLocaleString("en-IN")}
                                </Text>
                              </Row>
                            </div>
                                                    ) : (
                           
                            <div style={{ padding: "12px" }}>
                              <Text
                                style={{
                                  fontSize: "17px",
                                  fontWeight: 550,
                                  fontFamily: "Roboto",
                                }}
                              >
                                Flight Price
                              </Text>

                              <Row>
                                <Col span={24}>
                                  <ConfigProvider
                                    theme={{
                                      token: {
                                        dotSize: 100,
                                        controlSize: 100,
                                        dotActiveBorderColor: "blue",
                                        colorPrimary: "#0046beff",
                                      },
                                    }}
                                  >
                                    <Slider
                                      min={dateFareData1[0]?.price || 0}
                                      max={51275}
                                      value={endReturnPrice}
                                      onChange={(value) => setEndReturnPrice(value)}
                                      style={{ width: "90%" }}
                                    />
                                  </ConfigProvider>
                                </Col>
                              </Row>

                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: 8,
                                  width: "95%",
                                  padding: "2px",
                                }}
                              >
                                <Text style={{ color: "#4f4c4cff" }}>
                                  ₹{startReturnPrice ? startReturnPrice.toLocaleString("en-IN") : "0"}
                                </Text>

                                <Text style={{ color: "#4f4c4cff" }}>
                                  ₹{endReturnPrice.toLocaleString("en-IN")}
                                </Text>
                              </Row>
                            </div>
                          )}

          
          
               
                            </div>
                         

                        </div>
                        <div style={{
                        marginTop:100
                      }}>
                        <FloatButton.BackTop visibilityHeight={180} trigger="click"
  type="primary"
  shape="square"  style={{
                          color:"white",left:10

                        }}></FloatButton.BackTop>
                      </div>
                        </div>
                  {/*Departure card*/}
                        <div style={{
                width: "42%",
                position:"relative",
                left:"20px",
                paddingBottom: "170px"
              }}  >
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
                        slidesPerView={3}
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation]}
                        className="dateswiper"
                      >
                        {dateFareData.map((item, index) => (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() => {
                               
                                // console.log(item.date)
                
                            const d = new Date(item.date);
                            const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                              d.getDate()
                            ).padStart(2, "0")}`;
                            setSelectedDate(formattedDate)
                            dispatch(setDeparture(formattedDate));
                  
                              }
                              }
                              style={{
                                background: "#fff",
                                borderRadius: "6px",
                                border:
                                  selectedDate === item.date
                                    ? "1px solid #0066ff"
                                    : "1px solid #e0e0e0",
                                color: selectedDate === item.date ? "#0066ff" : "#000",
                                textAlign: "center",
                                padding: "8px 0",
                                cursor: "pointer",
                                height: selectedDate === item.date? "35.8px":"35px",
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
                      display:"flex",
                      justifyContent:"space-between",
                      marginTop:30,
                    }}>
                      <Text style={{
                        fontSize:"18px",fontWeight:600,fontFamily:"Roboto"
                      }}>{fromCode} - {toCode}</Text>
                      <Text strong type="secondary">
                        {filteredFlights.length === 1? 
                        `${filteredFlights.length} Flight Available`:
                        `${filteredFlights.length} Flights Available`}
                        </Text>
                    </div>
                    <div style={{ width: "100%", }}>
                          {filteredFlights.map((item, idx) =>{
                          
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
                                  background:selectedFlightId === item.id
                                      ?"rgb(242 249 255 / 1)":"white",
                                  border:selectedFlightId === item.id?"1px solid #0770e4":"1px solid white",
                                  display:"flex",
                                  flexDirection:"column",
                                  fontFamily:"Roboto",
                                  transition: "all 0.3s ease",
                                  
                                }}
                                bodyStyle={{
                                padding: "10px"   // <=== Reduce padding here
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
                                  showOnwards(item)
                                
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
                                <Text
                            strong
                            style={{
                              fontSize: "14px",
                              // position: "relative",
                              bottom: "5px",
                            }}
                          >
                            {item.airline}
                          </Text>
                                
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
                          width:"80%",
                          display:"flex",
                          justifyContent:"center",
                          position:"relative",
                          left:"10px",
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
                      <div style={{ textAlign: "right", flex: 1,fontFamily:"Roboto",position:"relative",right:"5px", }}>
                        <Text style={{ fontSize: 24,fontWeight:700 }}>
                          ₹{item.price.toLocaleString("en-IN")}
                        </Text>
                        
            
                      </div>
                    
                      {/* Price & Book */}
                      
                    </div>
                    
                              </Card>
                    
                              {/* Offer Banner after every 3 cards */}
                              
                            </div>
                           );
                           })}
                        </div>
                          
              </div>
              {/*Return card*/}
              <div style={{
                width: "42%",
                position:"relative",
                left:"37px"
              }}  >
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
                        slidesPerView={3}
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation]}
                        className="dateswiper"
                      >
                        {dateFareData1.map((item, index) => (
                          <SwiperSlide key={index}>
                            <div
                              onClick={() => {
                                      const d = new Date(item.date);
                                      const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                                        d.getDate()
                                      ).padStart(2, "0")}`;

                                      
                                      setSelectedReturnDate(formattedDate);

                                      
                                      dispatch(setReturnDate(formattedDate));
                                    }}

                              
                              style={{
                                background: "#fff",
                                borderRadius: "6px",
                                border:
                                  selectedReturnDate === item.date
                                    ? "1px solid #0066ff"
                                    : "1px solid #e0e0e0",
                                color: selectedReturnDate === item.date ? "#0066ff" : "#000",
                                textAlign: "center",
                                padding: "8px 0",
                                cursor: "pointer",
                                height: selectedReturnDate === item.date? "35.8px":"35px",
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
                              {selectedReturnDate === item.label && (
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
                      display:"flex",
                      justifyContent:"space-between",
                      marginTop:30,
                    }}>
                      <Text style={{
                        fontSize:"18px",fontWeight:600,fontFamily:"Roboto"
                      }}>{toCode} - {fromCode}</Text>
                      <Text strong type="secondary">
                        {filteredFlightsReturn.length === 1? 
                        `${filteredFlightsReturn.length} Flight Available`:
                        `${filteredFlightsReturn.length} Flights Available`}
                        </Text>
                    </div>
                    <div style={{ width: "100%", }}>
                          {filteredFlightsReturn.map((item, idx) =>{
                          
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
                                  background:selectedFlightReturnId === item.id
                                      ?"rgb(242 249 255 / 1)":"white",
                                  border:selectedFlightReturnId === item.id?"1px solid #0770e4":"1px solid white",
                                  display:"flex",
                                  flexDirection:"column",
                                  fontFamily:"Roboto",
                                  transition: "all 0.3s ease",
                                  
                                }}
                                bodyStyle={{
                                padding: "10px"   // <=== Reduce padding here
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
                                showReturn(item)
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
                                <Text
                            strong
                            style={{
                              fontSize: "14px",
                              // position: "relative",
                              bottom: "5px",
                            }}
                          >
                            {item.airline}
                          </Text>
                                
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
                          width:"80%",
                          display:"flex",
                          justifyContent:"center",
                          position:"relative",
                          left:"10px",
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
                      <div style={{ textAlign: "right", flex: 1,fontFamily:"Roboto",position:"relative",right:"5px", }}>
                        <Text style={{ fontSize: 24,fontWeight:700 }}>
                          ₹{item.price.toLocaleString("en-IN")}
                        </Text>
                        
            
                      </div>
                    
                      {/* Price & Book */}
                      
                    </div>
                    
                              </Card>
                    
                              {/* Offer Banner after every 3 cards */}
                              
                            </div>
                           );
                           })}
                        </div>
              </div>
              
                       
                      </div>


                      {/* <div style={{
                        marginTop:150,
                        position:"absolute",
                        right:100
                      }}>
                       <Text>d</Text>
                      </div> */}
                      <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "75%",
              height:"13%",
              zIndex: 1000,
              background: "#f2f9ff",
              padding: "10px 20px",
              left:"22%",
              boxShadow: "0 5px 25px rgba(0, 0, 0, 0.3)",
              display:"flex",
              justifyContent:"space-between",
              borderTopLeftRadius:"30px",
              borderTopRightRadius:"30px"
            }}
          >
            
              <div style={{
                display:"flex",
                gap:"20px",
                alignItems:"stretch",
                width:"60%",
                // border:"1px solid"
              }}>
                
                <div style={{
                  gap:10,
                  display:"flex",
                  flexDirection:"column",
                  width:"45%",
                  borderRight:"1px solid #cccccc",
                  padding:5,
                  fontSize:"Roboto"
                }}>
                  {selectedOnwards.map((items, idx) => (
                          <div key={idx}> 
                              <Text style={{
                                  fontWeight: 700,
                              }}>
                                  Onward &nbsp; • &nbsp; 
                                  
                                  <Text  style={{ fontWeight:500  }}>
                                    {items.airline} • </Text>
                                    <Text style={{ fontWeight:500  }}>{items.stops === "1 stop"
                                    ? items.flightCodes[0].code || "--"
                                    : items.flightCodes || "--"}</Text>
                              </Text>
                              <br/>
                              
                              <div style={{
                                marginTop:20,
                                display:"flex",
                                flexDirection:"column",
                                
                              }}>
                                <div>
                              <img src={items.logo} style={{
                                height:"35px"
                              }}>
                              </img>
                              <div style={{
                                display:"flex",
                                flexDirection:"column",
                                position:"relative",
                                left:50,
                                bottom:53
                              }}>
                              <Text style={{
                                fontSize:"24px",
                                fontWeight:700
                              }}>
                                {items.departureTime}  <ArrowRightOutlined style={{
                                  fontSize:"15px",position:"relative",bottom:3
                                }}/> {items.arrivalTime}
                              </Text>
                                <Text type="secondary" style={{
                                  position:"relative",fontSize:"12px",fontWeight:500,
                               
                                }}>{items.durations} &nbsp; • {items.stops}</Text>
                                </div>
                              </div>
                              
                              </div>
                          </div>
                      ))}
                    
                  
                    
                </div>

                <div style={{
                  gap:10,
                  display:"flex",
                  flexDirection:"column",
                  width:"45%",
                  borderRight:"1px solid #cccccc",
                  padding:5,
                  fontSize:"Roboto"
                }}>
                  {selectedReturn.map((items, idx) => (
                          <div key={idx}> 
                              <Text style={{
                                  fontWeight: 700,
                              }}>
                                  Return &nbsp; • &nbsp; 
                                  
                                  <Text  style={{ fontWeight:500  }}>
                                    {items.airline} • </Text>
                                    <Text style={{ fontWeight:500  }}>{items.stops === "1 stop"
                                    ? items.flightCodes[0].code || "--"
                                    : items.flightCodes || "--"}</Text>
                              </Text>
                              <br/>
                              
                              <div style={{
                                marginTop:20,
                                display:"flex",
                                flexDirection:"column",
                                
                              }}>
                                <div>
                              <img src={items.logo} style={{
                                height:"35px"
                              }}>
                              </img>
                              <div style={{
                                display:"flex",
                                flexDirection:"column",
                                position:"relative",
                                left:50,
                                bottom:53
                              }}>
                              <Text style={{
                                fontSize:"24px",
                                fontWeight:700
                              }}>
                                {items.departureTime}  <ArrowRightOutlined style={{
                                  fontSize:"15px",position:"relative",bottom:3
                                }}/> {items.arrivalTime}
                              </Text>
                                <Text type="secondary" style={{
                                  position:"relative",fontSize:"12px",fontWeight:500,
                               
                                }}>{items.durations} &nbsp; • {items.stops}</Text>
                                </div>
                              </div>
                              
                              </div>
                          </div>
                      ))}
                    
                  
                    
                </div>
                
              </div>
            
                <div style={{
                   display:"flex",
                gap:"10px",
                alignItems:"stretch",
                 
                }}>
                  <Text  style={{
                        color:"#ff7a00",
                        position:"relative",
                        top:"10px",
                        fontSize:16,
                        cursor:"pointer",
                        textAlign:"start",
                        right:30,
                        fontWeight:500
                      }} onClick={()=>{
                        showLoading()
                      }}>Flight Details<RightOutlined style={{
                        fontSize:14,
                        color:"#ff7a00",
                        position:"relative",
                        top:".5px"
                      }}/></Text>
                      <div style={{
                            textAlign:"end",
                            marginTop:30
                          }}>
                        <Text style={{
                          fontSize:"24px",fontWeight:700
                        }}>₹{fullAmount.toLocaleString("en-IN")}</Text>
                        <br/>
                        <Text style={{
                          color:"#238C46",fontSize:"14px",fontWeight:700
                        }}>Extra ₹{fullDiscount.toLocaleString("en-IN")} Off</Text>

                        
                      </div>
                          
                          <div style={{ marginTop:45}}>
                            
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
                              }}
                            >
                              Book
                            </button>
                            
                          </div>

                      <div>

                      </div>
                      
                </div>
              
                
            </div>
            <div>
                  
            
          </div>


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
                        
                          <div style={{
                        display:"flex",
                        flexDirection:"column",
                        position:"relative",
                        bottom:"10px"
                      }}>
                            <Text style={{ fontSize: 28, fontWeight: 500 }}>
                              {Number(
                        removeFeeAdd || removeRescheduleAdd 
                        ? finalAmount 
                        : fullAmount
                      ).toLocaleString("en-IN")
                    }
            
                              
                            </Text>
          
                      
                        <Text strong style={{ color: "#238C46",fontWeight:"bold",position:"relative",
                          bottom:"8px",fontSize:"14px"
                         }}>Extra ₹{fullDiscount.toLocaleString("en-IN")} Off</Text>
                    
                          </div>
                       
                      
                      
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
                        navigate("/buses");
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

export default EconomyReturn;