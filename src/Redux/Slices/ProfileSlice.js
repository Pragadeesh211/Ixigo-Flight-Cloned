import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:"Ixigoer",
    age:0,
    phoneNo:null,
    email:"",
    openDrawer:false
};

const profileSlice = createSlice ({
    name:"profileSlice",
    initialState,
    reducers:{
        setName:(state,action) => {state.name = action.payload},
        setAge:(state,action) => {state.age = action.payload},
        setPhoneNo:(state,action) => {state.phoneNo = action.payload},
        setEmail:(state,action) => {state.email = action.payload},
        setOpenDrawer:(state,action) => {state.openDrawer = action.payload},
    }
})

export const {
    setName,
    setAge,
    setPhoneNo,
    setEmail,
    setOpenDrawer
} = profileSlice.actions;

export default profileSlice.reducer;