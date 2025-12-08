import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  add: [{
    key:0,
    firstName:"Pragadeesh",
    lastName:"Go",
    genderValue:"Male",
      DOBValue:"21/11/2000",

  }],     
  added: false,
  dobCheckValue:[]
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
    setDobCheckValue:(state, action) => {
      state.add.push(action.payload);  
                    
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
  setDobCheckValue,
  resetTravellers
} = travellerSlice.actions;

export default travellerSlice.reducer;
