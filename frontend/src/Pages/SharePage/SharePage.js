import React, { useEffect, useState } from "react";
import Logo from "../../Components/Logo/Logo";
import "./SharePage.css";
import axios from "axios";
import Tooltips from "../../Services/ToolTips/Tooltips";
import Toast from "../../Services/Toast/Toast";
export default function SharePage() {
  const [data, setData] = useState(null);
 
  function applyResponsiveStyles() {
    const element = document.querySelector(".task_c_checklist_container");
    if (element) {
      element.style.maxHeight = window.innerWidth <= 480 ? "60vh" : "45vh";
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const ordinalSuffix = (day) =>
      ["th", "st", "nd", "rd"][
        day % 10 > 3 || [11, 12, 13].includes(day % 100) ? 0 : day % 10
      ];
    return `${month} ${day}${ordinalSuffix(day)}`;
  };

  useEffect(() => {
    applyResponsiveStyles();
    window.addEventListener("resize", applyResponsiveStyles);
    return () => {
      window.removeEventListener("resize", applyResponsiveStyles);
    };
  }, []);

  const extract = (str) => {
    const newStr = str.toString();
    const splitArray = newStr.split("/");
    return splitArray.length > 3
      ? splitArray[splitArray.length - 1]
      : "00000000000000000000";
  };

  const fetchTasks = async () => {
    try {
      const urlId = extract(window.location.href);
      const response = await axios.get(
       `${process.env.REACT_APP_BASE_URL_PORT}/api/share/getcard/${urlId}`
      );
      setData(response.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while saving the task. Please try again.";

      Toast(errorMessage, false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const priorityColors = {
    "MODERATE PRIORITY": "rgba(24, 176, 255, 1)",
    "HIGH PRIORITY": "rgba(255, 36, 115, 1)",
    "LOW PRIORITY": "rgba(99, 192, 91, 1)",
  };

  const category = "Done";
  const selectedPriority = data?.taskId?.selectedPriority || "HIGH PRIORITY";
  const dotColor = priorityColors[selectedPriority];

  return (
    <>
      <div className="sharepage_container">
        <div className="sharepage_heading">
          <Logo />
        </div>
        <div className="sharepage_outer">
          <div className="sharepage_box">
            {data ? (
              <div className="card_container" style={{ width: "100%" }}>
                <div className="card_heading">
                  <div className="card_heading_left">
                    {dotColor && (
                      <span
                        className="card_heading_dot"
                        style={{ backgroundColor: dotColor }}
                      ></span>
                    )}
                    {selectedPriority}
                  </div>
                </div>

                <Tooltips text={data.taskId.title}>
                  <div className="card_title">
                    {data ? data.taskId.title : "Heading"}
                  </div>
                </Tooltips>

                {/* <div className="card_title">{data? data.taskId.title:"Heading"}</div> */}
                <div className="card_checklist">
                  <div className="card_checklist_left">
                    Checklist(
                    {data?.taskId?.checklist?.filter((item) => item.checkOrNot)
                      .length || 0}
                    /{data?.taskId?.checklist?.length || 0})
                  </div>
                </div>

                <div
                  className="task_c_checklist_container"
                  style={{
                    width: "100%",
                    maxHeight: "45vh",
                    gap: "1vh",
                    marginBottom: "2vh",
                    marginTop: "2vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  {data?.taskId?.checklist?.map((item, index) => (
                    <div
                      key={index}
                      className="task_c_checklist_item"
                      style={{ width: "96%", minHeight: "5vh" }}
                    >
                      <input
                        className="checklist_checkbox"
                        type="checkbox"
                        checked={item.checkOrNot}
                        onChange={() => {}}
                        style={{ marginLeft: "1.2vh" }}
                      />
                      <div className="checklist_input_textarea">
                        {item.inputValue}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card_footer">
                  {/* <div
                    className="card_footer_left"
                    style={{
                      backgroundColor:
                        new Date(data?.taskId.dueDate) < new Date() 
                          ? "rgba(207, 54, 54, 1)" 
                          : selectedPriority === "HIGH PRIORITY"
                          ? "rgba(207, 54, 54, 1)" 
                          : "", 
                      color:
                        new Date(data?.taskId.dueDate) < new Date() ||
                        selectedPriority === "HIGH PRIORITY"
                          ? "white" 
                          : "",
                    }}
                  >
                  {console.log(data)}
                    {data ?data.taskId.dueDate!==null? formatDate(data.taskId.dueDate) : "":""}
                  </div> */}

                  {data?.taskId.dueDate && (
                    <div>
                   
  <div
    className="card_footer_left"
    style={{
      backgroundColor:
        new Date(data.taskId.dueDate) < new Date() ||
        selectedPriority === "HIGH PRIORITY"
          ? "rgba(207, 54, 54, 1)"
          : "",
      color:
        new Date(data.taskId.dueDate) < new Date() ||
        selectedPriority === "HIGH PRIORITY"
          ? "white"
          : "",
    }}
  >
   {formatDate(data.taskId.dueDate)}
  </div>
                      
                    </div>
                
)}

                </div>
              </div>
            ) : (
              <h1 style={{ textAlign: "center" }}>Server Error!</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}