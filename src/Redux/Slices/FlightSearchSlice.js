import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";


const initialState = {
  from: "MAA - Chennai",
  fromAirport:"Chennai International Airport",
  to: "DEL - New Delhi",
  toAirport:"Indira Gandhi International Airport",
  fromCode:"MAA",
  toCode:"DEL",
  fromCity:"Chennai",
  toCity:"New Delhi",
  returnTrip: false,
  returnTripUI:false,
  departure: dayjs().format("YYYY-MM-DD"),
  returnDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
  travellers: { Adults: 1, Children: 0, Infants: 0 },
  travellerValue:1,
  travelClass: "Economy",
  cancelFeeAdd:false,
  rescheduleFeeAdd:false,
  promoRadioValue:0,
  onewaySelectedFlight:[],
  returnSelectedFlight:[],
};

const flightSearchSlice = createSlice({
    name:'flightSearch',
    initialState,
    reducers:{
        setFrom:(state,action) => {state.from = action.payload},
        setFromAirport:(state,action) => {state.fromAirport = action.payload},
        setTo:(state,action) => {state.to = action.payload},
        setToAirport:(state,action) => {state.toAirport = action.payload},
        setFromCode:(state,action) => {state.fromCode = action.payload},
        setToCode:(state,action) => {state.toCode = action.payload},
        setFromCity:(state,action) => {state.fromCity = action.payload},
        setToCity:(state,action) => {state.toCity = action.payload},
        swapFromTo:(state) => {
            const temp = state.from;
            state.from = state.to;
            state.to = temp;
        },
        toggleReturnTrip: (state, action) => { state.returnTrip = action.payload; },
        setReturnTripUI: (state, action) => { state.returnTripUI = action.payload; },
        setDeparture: (state, action) => { state.departure = action.payload; },
        setReturnDate: (state, action) => { state.returnDate = action.payload; },
        setTravellers: (state, action) => { state.travellers = action.payload; },
        setTravellerValue: (state, action) => { state.travellerValue = action.payload; },
        setTravelClass: (state, action) => { state.travelClass = action.payload; },
        setCancelFeeAdd: (state, action) => { state.cancelFeeAdd = action.payload; },
        setRescheduleFeeAdd: (state, action) => { state.rescheduleFeeAdd = action.payload; },
        setPromoRadioValue: (state, action) => { state.promoRadioValue = action.payload; },
        setOnewaySelectedFlight: (state, action) => { state.onewaySelectedFlight = action.payload; },
        setReturnSelectedFlight: (state, action) => { state.returnSelectedFlight = action.payload; },
        resetSearch: () => initialState,
    }
})

export const {
  setFrom,
  setFromAirport,
  setTo,
  setToAirport,
  setFromCode,
  setToCode,
  setFromCity,
  setToCity,
  swapFromTo,
  toggleReturnTrip,
  setReturnTripUI,
  setDeparture,
  setReturnDate,
  setTravellers,
  setTravellerValue,
  setTravelClass,
  setCancelFeeAdd,
  setRescheduleFeeAdd,
  setPromoRadioValue,
  resetSearch,
  setOnewaySelectedFlight,
  setReturnSelectedFlight,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;