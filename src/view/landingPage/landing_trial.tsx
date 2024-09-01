import React from "react";
import ResumeEdit from "../mainPage/resumeEdit/resumeEdit";

const LandingTrial = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "130vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "10.938vw",
          top: "10vh",
          fontFamily: "Pretendard-Semibold",
          color: "#005840",
          fontSize: "1.042vw",
        }}
      >
        TRY IT OUT
      </div>
      <div
        style={{
          width: "100%",
          paddingTop: "10vh",
        }}
      >
        <ResumeEdit />
      </div>
    </div>
  );
};

export default LandingTrial;
