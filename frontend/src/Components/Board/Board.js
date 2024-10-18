import React from "react";
import "./Board.css";
import PeoplePNG from "../../Assets/people.png"
export default function Board() {
  return (
    <>
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
          <div className="board_cells"></div>
          <div className="board_cells"></div>
          <div className="board_cells"></div>
          <div className="board_cells"></div>
        </div>
      </div>
    </>
  );
}
