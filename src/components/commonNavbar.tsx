import React from "react";
import { useNavigate } from "react-router-dom";

export const CommonNavbar = () => {
  const navigate = useNavigate();
  return (
    <div
      className="landing-page-navbar"
      style={{
        height: "7vh",
        backgroundColor: "#0DC291",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        padding: "0 12vw",
      }}
    >
      <div
        style={{
          fontSize: "1.8vw",
          color: "white",
          fontFamily: "Pretendard-Medium",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        REDITOR
      </div>
      <div
        style={{
          fontSize: "1vw",
          display: "flex",
          columnGap: "3vw",
          fontFamily: "Pretendard-bold",
          color: "white",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/auth/signup");
          }}
        >
          회원가입
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          로그인
        </div>
      </div>
    </div>
  );
};
