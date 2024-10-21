const mongoose = require("mongoose");

const Task_Schema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true
    },
    selectedPriority: { 
      type: String, 
      required: true, 
      // enum: ['High', 'Medium', 'Low'], 
      trim: true 
    },
    assignTo: [
      {
        assignee: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "user" 
        },
        when: { 
          type: String, 

          default: "whilecreating"
        }
      }
    ],
    checklist: [
      {
        checkOrNot: { 
          type: Boolean, 
          required: true, 
          default: false 
        },
        inputValue: { 
          type: String, 
          required: true, 
          trim: true  
        }
      }
    ],
    category: { 
      type: String, 
      required: true, 
      default: "Todo", 
      trim: true 
    },
    dueDate: { 
      type: Date  
    }
  },
  { 
    timestamps: true 
  }
);

const Task_Model = mongoose.model("task", Task_Schema);

module.exports = Task_Model;
