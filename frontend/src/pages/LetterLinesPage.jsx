import React from "react";

const LetterLinesPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ marginRight: "50px" }}>
        <div style={{ fontSize: "50px", marginBottom: "20px" }}>A</div>
        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100px", borderBottom: "2px solid black" }}></div>
          <div style={{ width: "80px", borderBottom: "2px solid black" }}></div>
          <div style={{ width: "60px", borderBottom: "2px solid black" }}></div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "50px", marginBottom: "20px" }}>a</div>
        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "80px", borderBottom: "2px solid black" }}></div>
          <div style={{ width: "60px", borderBottom: "2px solid black" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LetterLinesPage;
