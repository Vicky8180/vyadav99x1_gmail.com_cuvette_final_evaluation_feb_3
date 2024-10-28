import { createSlice } from "@reduxjs/toolkit";

const ErrorMessageSlice = createSlice({
  name: "errormessage",
  initialState: {
    errorMessage: [],
  },
  reducers: {
    addError: (state, action) => {
     
        state.errorMessage=action.payload;
        // console.log(state.inputFormData)
    },
  },
});

export const { addError  } = ErrorMessageSlice.actions;

export default ErrorMessageSlice.reducer;