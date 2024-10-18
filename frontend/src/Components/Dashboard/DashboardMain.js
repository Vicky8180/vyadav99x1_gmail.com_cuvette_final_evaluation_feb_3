import React from "react";
import Logo from "../Logo/Logo";
import "./Dashboard.css";
import BoardPNG from "../../Assets/layout (2).png";
import SettingPNG from "../../Assets/setting.png";
import AnalyticsPNG from "../../Assets/database.png";
import LogoutPNG from "../../Assets/Logout.png";
import Board from "../Board/Board";
export default function DashboardMain() {
  return (
    <>
      <div className="dashboard_main_container">
        <div className="d_m_left">
          <div className="d_m_heading">
            <Logo />
          </div>

          <div className="d_m_options">
            <div className="d_m_options_items">
              <div className="d_m_options_items_1">
                <img alt="board" src={BoardPNG} />
                <div className="d_m_options_items_text"> Board</div>
              </div>
            </div>
            <div className="d_m_options_items">
              <div className="d_m_options_items_1">
                <img alt="analytics" src={AnalyticsPNG} />
                <div className="d_m_options_items_text">Analytics</div>
              </div>
            </div>
            <div className="d_m_options_items">
              <div className="d_m_options_items_1">
                <img alt="setting" src={SettingPNG} />
                <div className="d_m_options_items_text">Setting</div>
              </div>
            </div>
          </div>
          <div className="d_m_logout">
            <div className="d_m_options_items">
              <div className="d_m_options_items_1">
                <img alt="setting" src={LogoutPNG} />
                <div
                  className="d_m_options_items_text"
                  style={{ color: " rgba(207, 54, 54, 1)" }}
                >
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d_m_right">


         <Board/>

        </div>
      </div>
    </>
  );
}
