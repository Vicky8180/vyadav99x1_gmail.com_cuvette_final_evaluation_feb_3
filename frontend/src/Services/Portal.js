import React from "react";
import ReactDOM from "react-dom";

const Portal = ({ close, component }) => {
  const target = document.getElementById("root-model");
  const removePortal = () => {
    close();
  };
  const handleClickContent = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div style={overlayStyle} onClick={handleClickContent}>
        <div style={portalContentStyle} onClick={handleClickContent}>
          {component}
        </div>
      </div>
    </>,
    target
  );
};

export default Portal;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // background: 'rgba(0, 0, 0, 0.5)',
  background: " rgba(48, 61, 67, 0.55)",
  backdropFilter: "blur(0px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const portalContentStyle = {
  // background: "white",

  borderRadius: "8px",
  // boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  zIndex: 1001,
  position: "relative",
};