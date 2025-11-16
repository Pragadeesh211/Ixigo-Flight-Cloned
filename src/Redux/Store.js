import { configureStore } from "@reduxjs/toolkit";
import flightSearchSlice from './Slices/FlightSearchSlice'

const store = configureStore({
  reducer: {
    flightSearch: flightSearchSlice,
  },
});

export default store;