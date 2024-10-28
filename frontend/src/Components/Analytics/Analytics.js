import React, { useEffect, useState } from "react";
import "./Analytics.css";
import axios from "axios";
import Toast from "../../Services/Toast/Toast"
export default function Analytics() {
  const userId = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const analyticsAPI = async () => {
    try {
      const response = await axios.post(
         `${process.env.REACT_APP_BASE_URL_PORT}/api/task/analytics`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  console.log(response.data.data)
      setData(response.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching analytics";
      Toast(errorMessage, false);
    }
  };

  useEffect(() => {
    analyticsAPI();
  }, []);

  return (
    <>
      <div className="analytics_container">
        <div
          className="analytics_heading"
          style={{ fontSize: "2.2vh", fontWeight: "600" }}
        >
          {" "}
          Analytics
        </div>

        <div className="analytics_data_box">
          <div className="analytics_each_box">
            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>Backlog Tasks</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.backlogCount : 0}
              </div>
            </div>

            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>To-do Tasks</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.todoCount : 0}
              </div>
            </div>
            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>In-Progress Tasks</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.progressCount : 0}
              </div>
            </div>

            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>Done Tasks</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.doneCount : 0}
              </div>
            </div>
          </div>

          <div className="analytics_each_box">
            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>Low Priority</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.lowPriorityCount : 0}
              </div>
            </div>
            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>Moderate Priority</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.mediumPriorityCount : 0}
              </div>
            </div>{" "}
            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>High Priority</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.highPriorityCount : 0}
              </div>
            </div>{" "}
            <div className="analytics_each_line">
              <div>
                <div className="analytics_dot"></div>
                <div>Due Date Tasks</div>
              </div>

              <div
                className="analytics_number"
                style={{ fontSize: "2vh", fontWeight: "600" }}
              >
                {data ? data.dueDates : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
