import React, {useState} from "react";
import "./TaskCreate.css";
import AddTaskPNG from "../../Assets/add2.png"
import DeletePNG from "../../Assets/Delete.png"
import AssignTo from "../../Services/AssignTo";
export default function TaskCreate({close}) {

    const [items, setItems] = useState([]);

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

   const close1=()=>{
    close()
   }
  return (
    <>
      <div className="task_create_container">
      <div className="task_c_top_part">
      <div className="task_c_title">
          <label>Title</label>
          <div>
            <input type="text" className="task_c_title_input" placeholder="Enter Task title" required/>
          </div>
        </div>

        <div className="task_c_priority">
          <div className="task_c_priority_left">Select Priority</div>
          <div className="task_c_priority_right">
            <div className="task_c_priority_right_item1">
      
              <span style={{backgroundColor:"green"}}></span> LOW PRIORITY
            </div>
            <div className="task_c_priority_right_item2">
     
              <span></span> MODERATE PRIORITY
            </div>
            <div className="task_c_priority_right_item3">
         
              <span style={{backgroundColor:"blue"}}></span> HIGH PRIORITY
            </div>
          </div>
        </div>
        <div className="task_c_assign">
          <label style={{width:"15vh"}}>Assign to</label>
             <AssignTo/>
          {/* <input type="text" id="email" name="email" className="task_c_title_input" placeholder="Enter Task title" required/> */}
        </div>
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
          <div className="task_c_footer_left">
            <button className="task_c_f_l_btn1">Select Due Date</button>
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
