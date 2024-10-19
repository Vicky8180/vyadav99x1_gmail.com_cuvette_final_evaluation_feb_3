import React, { useState } from "react";
import "./Board.css";
import PeoplePNG from "../../Assets/people.png"
import AddPNG from "../../Assets/add2.png"
import CollapsePNG from "../../Assets/collapse.png"
import Card from "../Card/Card"
import Portal from "../../Services/Portal";
import TaskCreate from "../Task_Create/TaskCreate";
export default function Board() {
const [toggleStateForTaskCreate,setToggleStateForTaskCreate]=useState(false);

const toggleHandleTaskCreate=()=>{
  console.log("dd")
  setToggleStateForTaskCreate(!toggleStateForTaskCreate);
}

  return (
    <>

    {toggleStateForTaskCreate? <> <Portal close={toggleHandleTaskCreate} component={<TaskCreate close={toggleHandleTaskCreate}/>}/> </>:""}
      <div className="board_container">
        <div className="board_heading_one">
          <div className="board_heading_one_left">Welcom1! Kumar</div>
          <div className="board_heading_one_right">12th Jan, 2024 </div>
        </div>
        <div className="board_heading_two">
          <div className="board_heading_two_left">
            Board
            <div className="board_heading_two_left_addpeople">  <img alt="analytics" src={PeoplePNG} />
            <div className="board_heading_two_left_text">Add People</div></div>
          </div>
          <div className="board_heading_two_right">This Week</div>
        </div>

        <div className="board_cell_container">
          <div className="board_cells">
          <div className="board_cell_heading"> <div className="board_cells_left">Backlog</div>
            <div className="board_cell_right">
            <img alt="collapse" className="collapse_task_cell" src={CollapsePNG}/>
            </div></div>
           
          </div>
          <div className="board_cells">
          <div className="board_cell_heading">
            <div className="board_cells_left">Todo</div>
          <div className="board_cell_right">
            <img alt="add_task" className="add_task_cell" src={AddPNG}  onClick={toggleHandleTaskCreate}/>
            <img alt="collapse" className="collapse_task_cell" src={CollapsePNG}/>
          </div>
          </div>
          
          </div>
          <div className="board_cells">
          <div className="board_cell_heading"> <div className="board_cells_left">Backlog</div>
            <div className="board_cell_right">
            <img alt="collapse" className="collapse_task_cell" src={CollapsePNG}/>
            </div></div>
            <div className="cells_card_container">
            <Card tile={"Hero 2"}/>
            <Card  tile={"Hero Sections"}/>
            <Card  tile={"Hero "}/>
            <Card  tile={"Hero Sections"}/>
            <Card  tile={"Hero "}/>
            </div>
           
          </div>
          <div className="board_cells">
          <div className="board_cell_heading"> <div className="board_cells_left">Backlog</div>
            <div className="board_cell_right">
            <img alt="collapse" className="collapse_task_cell" src={CollapsePNG}/>
            </div></div>
          </div>
        </div>
      </div>
    </>
  );
}
