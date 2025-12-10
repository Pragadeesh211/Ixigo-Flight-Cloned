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
  drawerOpen:false,
  refundFeeAdd:false,
  promoRadioValue:0,
  onewaySelectedFlight:[],
  returnSelectedFlight:[],
  totalAmount:0,
  finalAmount:0,
  refundValue:{
    planType: null,
    price: 0},
  travellerDetails:[],
  currentState:1,
  decrementState:1,
  shouldReset:false
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
        setRefundFeeAdd: (state, action) => { state.refundFeeAdd = action.payload; },
        setDrawerOpen: (state, action) => { state.drawerOpen = action.payload; },
        
        setPromoRadioValue: (state, action) => { state.promoRadioValue = action.payload; },
        setOnewaySelectedFlight: (state, action) => { state.onewaySelectedFlight = action.payload; },
        setReturnSelectedFlight: (state, action) => { state.returnSelectedFlight = action.payload; },
        setTotalAmount: (state, action) => { state.totalAmount = action.payload; },
        setFinalAmount: (state, action) => { state.finalAmount = action.payload; },
        setRefundPlan: (state, action) => {
          state.refundValue.planType = action.payload.planType;
          state.refundValue.price = action.payload.price;
        },
        setTravellerDetails: (state, action) => { state.travellerDetails = action.payload; },
        incrementCurrentState: (state) => {
      state.currentState += 1;
    },
    decrementCurrentState: (state) => {
      state.currentState -= 1;
    },
    setCurrentState: (state, action) => {
  console.log("Setting currentState to", action.payload);
  state.currentState = action.payload;
},

        setShouldReset: (state, action) => { state.shouldReset = action.payload; },
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
  setRefundFeeAdd,
  setPromoRadioValue,
  resetSearch,
  setOnewaySelectedFlight,
  setReturnSelectedFlight,
  setDrawerOpen,
  setTotalAmount,
  setFinalAmount,
  setTravellerDetails,
  setCurrentState,
  incrementCurrentState,
  decrementCurrentState,
  setRefundPlan,
  setShouldReset,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;