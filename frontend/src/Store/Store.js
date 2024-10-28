import { configureStore } from '@reduxjs/toolkit';
import AssignList from './Slices/AssignList';
import InputFormData from "./Slices/InputFormData"
import ErrorMessage from "./Slices/ErrorMessage"
import LoggedOrNot from "./Slices/LoggedOrNot"
import AccessToMultipleAssignee from "./Slices/AsseccToMultipleAssignee"
const store = configureStore({
  reducer: {
    AssignList:AssignList,
    InputFormData:InputFormData,
    ErrorMessage:ErrorMessage,
    LoggedOrNot:LoggedOrNot,
    AccessToMultipleAssignee:AccessToMultipleAssignee
  },
});

export default store;