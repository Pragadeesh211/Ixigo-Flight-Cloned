import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  add: [],     
  added: false 
};

const travellerSlice = createSlice({
  name: "TravellerSlice",
  initialState,
  reducers: {

    addTraveller: (state, action) => {
      state.add.push(action.payload);  
                    
    },
    setadded:(state,action) =>{state.added = action.payload},
    editTraveller: (state, action) => {
  
  const { index, updatedData } = action.payload; 
  if (index >= 0 && index < state.add.length) {
    state.add[index] = { ...state.add[index], ...updatedData };
  }
},

    deleteTraveller: (state, action) => {
       state.add.splice(action.payload, 1);
      
    },

    resetTravellers: (state) => {
      state.add = [];
      state.added = false;
    }
  }
});

export const {
  addTraveller,
  setadded,
  editTraveller,
  deleteTraveller,
  resetTravellers
} = travellerSlice.actions;

export default travellerSlice.reducer;
