import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./Dashboard.css";
import BoardPNG from "../../Assets/layout (2).png";
import SettingPNG from "../../Assets/settings.png";
import AnalyticsPNG from "../../Assets/database.png";
import LogoutPNG from "../../Assets/Logout.png";
import Board from "../Board/Board";
import Analytics from "../Analytics/Analytics";
import Setting from "../Setting/Setting";
import { useDispatch } from "react-redux";
import { addItem, setLoggin } from "../../Store/Slices/LoggedOrNot";
import { useNavigate } from "react-router-dom";
import Portal from "../../Services/Portal";
import ConfirmIt from "../Delete/Delete";

export default function DashboardMain() {
  const [selectedComponent, setSelectedComponent] = useState("Board");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirmIt, setOpenConfirmIt] = useState(false);

  const loggout = () => {
    dispatch(setLoggin(false));
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Board":
        return <Board />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Setting />;

      default:
        return <Board />;
    }
  };

  const getActiveStyle = (componentName) => {
    return selectedComponent === componentName
      ? { backgroundColor: "rgba(211, 232, 255, 1)", color: "black" }
      : {};
  };
  const toggleConfirmItPortal = () => {
    setOpenConfirmIt(!openConfirmIt);
  };

  return (
    <>
      {openConfirmIt ? (
        <Portal
          component={
            <ConfirmIt
              close={toggleConfirmItPortal}
              confirmDelete={loggout}
              logout={true}
            />
          }
        />
      ) : null}
      <div className="dashboard_main_container">
        <div className="d_m_left">
          <div className="d_m_heading">
            <Logo />
          </div>

          <div className="d_m_options">
            <div
              className="d_m_options_items"
              onClick={() => setSelectedComponent("Board")}
              style={getActiveStyle("Board")}
            >
              <div className="d_m_options_items_1">
                <img alt="board" src={BoardPNG} />
                <div
                  className="d_m_options_items_text"
                  style={getActiveStyle("Board")}
                >
                  Board
                </div>
              </div>
            </div>

            <div
              className="d_m_options_items"
              onClick={() => setSelectedComponent("Analytics")}
              style={getActiveStyle("Analytics")}
            >
              <div className="d_m_options_items_1">
                <img
                  alt="analytics"
                  src={AnalyticsPNG}
                  style={getActiveStyle("Analytics")}
                />
                <div
                  className="d_m_options_items_text"
                  style={getActiveStyle("Analytics")}
                >
                  Analytics
                </div>
              </div>
            </div>

            <div
              className="d_m_options_items"
              onClick={() => setSelectedComponent("Settings")}
              style={getActiveStyle("Settings")}
            >
              <div className="d_m_options_items_1">
                <img
                  alt="setting"
                  src={SettingPNG}
                  style={getActiveStyle("Settings")}
                />
                <div
                  className="d_m_options_items_text"
                  style={getActiveStyle("Settings")}
                >
                  Setting
                </div>
              </div>
            </div>
          </div>

          <div className="d_m_logout">
            <div className="d_m_options_items">
              <div className="d_m_options_items_1">
                <img alt="logout" src={LogoutPNG} />
                <div
                  className="d_m_options_items_text"
                  style={{ color: " rgba(207, 54, 54, 1)" }}
                  onClick={toggleConfirmItPortal}
                >
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d_m_right">{renderComponent()}</div>
      </div>
    </>
  );
}
