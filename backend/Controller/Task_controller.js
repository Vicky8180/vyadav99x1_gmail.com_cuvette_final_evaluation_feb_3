// const express = require("express");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const Task_Model = require("../Model/taskModel");
// const User_Model = require("../Model/userModel")
// const app = express();


// const createTask = async (req, res) => {
//     try {
     
//       const { title, selectedPriority, assignTo, checklist, category, dueDate ,ownerId} = req.body;
  

//       if (!title || !selectedPriority || !checklist) {
//         return res.status(400).json({ message: "Required fields are missing" });
//       }
  
      
//       const newTask = new Task_Model({
//         title,
//         selectedPriority,
//         checklist,
//         category,
//         assignTo: assignTo || null,  
//         dueDate: dueDate || null,    
//       });
  
     
//       const taskcreated= await newTask.save();

//            await User_Model.findOneAndUpdate(
//         { _id: ownerId },
//         { $push: { tasks: taskcreated._id } }
//       );
//            await User_Model.findOneAndUpdate(
//         { _id: assignTo },
//         { $push: { tasks: taskcreated._id } }
//       );

//       return res.status(201).json({
//         message: "Task created successfully",
//         task: newTask,
//       });
  
//     } catch (error) {
//       console.error("Error creating task:", error);
//       return res.status(500).json({ message: "Server error" });
//     }
//   };


// module.exports={createTask}



const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Task_Model = require("../Model/taskModel");
const User_Model = require("../Model/userModel");
const app = express();

const createTask = async (req, res) => {
  try {
    const { title, selectedPriority, assignTo, checklist, category, dueDate, ownerId } = req.body;

   
    if (!title || !selectedPriority || !checklist) {
      return res.status(400).json({ message: "Required fields: title, selectedPriority, and checklist are missing" });
    }

    const owner = await User_Model.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }


    let assignee = null;
    if (assignTo) {
      assignee = await User_Model.findById({_id:assignTo});
      if (!assignee) {
        return res.status(404).json({ message: "Assigned user not found" });
      }
    }

    const newTask = new Task_Model({
      title,
      selectedPriority,
      checklist,
      category,
      assignTo: assignee ? assignee._id : null,  
      dueDate: dueDate || null,    
    });


    const taskCreated = await newTask.save();

  
    await User_Model.findByIdAndUpdate(
     {_id: ownerId},
      { $push: { tasks: taskCreated._id } },
      { new: true }  
    );

    if (assignee) {
      await User_Model.findByIdAndUpdate(
        {_id:assignTo},
        { $push: { tasks: taskCreated._id } },
        { new: true }
      );
    }

 
    return res.status(201).json({
      message: "Task created successfully",
      task: taskCreated,
    });

  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Server error" });
  }
};







module.exports = { createTask};
