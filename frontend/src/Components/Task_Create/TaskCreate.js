import React, {useState} from "react";
import "./TaskCreate.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import AddTaskPNG from "../../Assets/add2.png"
import DeletePNG from "../../Assets/Delete.png"
import AssignTo from "../../Services/AssignTo";
export default function TaskCreate({close}) {
    const [dueDate, setDueDate] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedPriority,setSelectedPriority]=useState();
    const [title,setTitle]=useState();
    const [assignList, setAssignList]=useState([]);

    const handleAddItem = () => {
      setItems([...items, { checked: false, text: "" }]);
    };
  
    const handleInputChange = (index, event) => {
      const newItems = [...items];
      newItems[index].text = event.target.value;
      setItems(newItems);
    };
  
    const handleCheckboxChange = (index) => {
      const newItems = [...items];
      newItems[index].checked = !newItems[index].checked;
      setItems(newItems);
    };

  const selectedPriorityHandle=(data)=>{
setSelectedPriority(data);
  }
    

  const handleDateChange = (date) => {
    setDueDate(date);
  };
  function formatDateString(dateString) {
    const date = new Date(dateString);
    return format(date, 'MM/dd/yyyy');
  }
  
  console.log(title)
  console.log(selectedPriority)

  return (
    <>
      <div className="task_create_container">
      <div className="task_c_top_part">
      <div className="task_c_title">
        
        <label >Title</label>
        <input type="text" className="task_c_title_input" alt="title" placeholder="Enter Task title"  value={title} onChange={(e)=>setTitle(e.target.value)} required/>
          
        </div>
      
       

        <div className="task_c_priority">
          <div className="task_c_priority_left">Select Priority</div>
          <div className="task_c_priority_right">
            <div className="task_c_priority_right_item1" style={{backgroundColor:selectedPriority==="LOW PRIORITY"? "rgba(238, 236, 236, 1)":""}} onClick={()=>selectedPriorityHandle("LOW PRIORITY")}>
      
              <span style={{backgroundColor:"green"}}></span> LOW PRIORITY
            </div>
            <div className="task_c_priority_right_item2" style={{backgroundColor:selectedPriority==="MODERATE PRIORITY"? "rgba(238, 236, 236, 1)":""}} onClick={()=>selectedPriorityHandle("MODERATE PRIORITY")}>
     
              <span></span> MODERATE PRIORITY
            </div>
            <div className="task_c_priority_right_item3" style={{backgroundColor:selectedPriority==="HIGH PRIORITY"? "rgba(238, 236, 236, 1)":""}} onClick={()=>selectedPriorityHandle("HIGH PRIORITY")}>
         
              <span style={{backgroundColor:"blue"}}></span> HIGH PRIORITY
            </div>
          </div>
        </div>
        <AssignTo/>

        {/* <div className="task_c_display_assigns">
          <div className="task_c_display_assigns_item"> 
          <span class="s1">Anoop Yadav</span>
          <span class="s2" >X</span>
        
          </div>
          <div className="task_c_display_assigns_item"> 
          <span class="s1">Anoop Yadav</span>
          <span class="s2" >X</span>
        
          </div>
          <div className="task_c_display_assigns_item"> 
          <span class="s1">Anoop Yadav</span>
          <span class="s2" >X</span>
        
          </div>
        
          
        </div>
        <div className="task_c_assign">
          <label style={{width:"15vh"}}>Assign to</label>
             <AssignTo/>
          
        </div> */}
        {/* <input type="text" id="email" name="email" className="task_c_title_input" placeholder="Enter Task title" required/> */}
        <div className="task_c_checklist">Checklist (1/3)</div>
<div className="task_c_checklist_container">
{items.map((item, index) => (
          <div key={index} className="task_c_checklist_item">
            <input
              className="checklist_checkbox"
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <input
            className="checklist_input"
              type="text"
              value={item.text}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Type"
            />
            <img alt="delete"  className="checklist_delete_img" src={DeletePNG}/>
          </div>
        ))}
</div>
       
        <div  onClick={handleAddItem} className="task_c_add_checklist">
            <img alt="addtask" src={AddTaskPNG}/> Add New
        </div>
    


      </div>
      <div className="task_c_footer_part">

      <div className="task_c_footer">
          {/* <div className="task_c_footer_left">
            <button className="task_c_f_l_btn1">Select Due Date</button>
          </div> */}


          <div className="task_c_footer_left">
            <button className="task_c_f_l_btn1">
            <DatePicker
          selected={dueDate}
          onChange={handleDateChange}
          placeholderText="Select Due Date" 
          dateFormat="MM/dd/yyyy" 
          className="date-input" 
        />
            </button>
          </div>
        
       



          <div className="task_c_footer_right">
            <button className="task_c_f_r_btn1" onClick={close}>Cancel</button>
            <button className="task_c_f_r_btn2">Save</button>
          </div>
        </div>
      </div>
       
      </div>
    </>
  );
}
