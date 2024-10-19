import React from "react";
import "./Card.css";
import ThreeDotsPNG from "../../Assets/3dot.png"
import ArrowPNG from "../../Assets/Arrow - Down 2.png"
export default function Card({tile}) {
  return (
    <>
      <div className="card_container">
        <div className="card_heading">
          <div className="card_heading_left">
            <span className="card_heading_dot"> </span>
            LOW PRIORITY
          </div>
          <div className="card_heading_right">
            <img alt="dots" src={ThreeDotsPNG}/>
          </div>
        </div>
        <div className="card_title">{tile}  </div>
        <div className="card_checklist">
          <div className="card_checklist_left">Checklist (0/3)</div>
          <div className="card_checklist_right">
          <img alt="arrow" src={ArrowPNG}/>
          </div>
        </div>
        <div className="card_footer">
          <div className="card_footer_left">Feb 10th</div>
          <div className="card_footer_right">
            <div>Backlog</div>
            <div>Progress</div>
            <div>Done</div>
          </div>
        </div>
      </div>
    </>
  );
}
