import { createSlice } from "@reduxjs/toolkit";

const AssignListSlice = createSlice({
  name: "assignList",
  initialState: {
    assignList: [],
  },
  reducers: {
    addItem: (state, action) => {
      var tempData = [];
      for (let i = 0; i < action.payload.length; i++) {
        if ("assignee" in action.payload[i]) {
          tempData.push(action.payload[i]);
        } else {
          const newItem = {
            assignee: action.payload[i]._id,
            name: action.payload[i].name,
            when: "whilecreating",
          };
          tempData.push(newItem);
        }
      }
      // const newAction= action.payload.map(assignee => ({
      //       assignee: assignee._id,
      //       name: assignee.name,
      //       when: "whilecreating"
      //   })) : [],
      state.assignList = tempData;
    },
  },
});

export const { addItem } = AssignListSlice.actions;

export default AssignListSlice.reducer;
