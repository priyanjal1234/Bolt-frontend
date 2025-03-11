import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPrompt: "",
  allPrompts: [],
  allResponses: [],
  fileData: [],
  currentFileCode: "",
  
};

export const AiSlice = createSlice({
  name: "AI",
  initialState,
  reducers: {
    setCurrentPrompt: function (state, action) {
      state.currentPrompt = action.payload;
    },
    setAllPrompts: function (state, action) {
      state.allPrompts = [...state.allPrompts, action.payload];
    },
    setAllResponses: function (state, action) {
      state.allResponses = [...state.allResponses, action.payload];
    },
    setFileData: function (state, action) {
      state.fileData = action.payload;
    },
    setCurrentFileCode: function (state, action) {
      state.currentFileCode = action.payload;
    },
   
  },
});

export default AiSlice.reducer;

export const {
  setCurrentPrompt,
  setAllPrompts,
  setAllResponses,
  setFileData,
  setCurrentFileCode,
  
} = AiSlice.actions;
