import { configureStore } from "@reduxjs/toolkit";
import flightSearchSlice from './Slices/FlightSearchSlice'
import profileSlice from './Slices/ProfileSlice'
import travellerSlice from "./Slices/TravellerSlice"

const store = configureStore({
  reducer: {
    flightSearch: flightSearchSlice,
    profile: profileSlice,
    traveller: travellerSlice,
  },
});

export default store;